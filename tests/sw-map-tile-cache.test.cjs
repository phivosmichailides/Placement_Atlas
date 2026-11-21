'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

test('map tile writes prune CacheStorage in batches without unbounded growth',async()=>{
  const listeners={};
  let keyEnumerations=0;
  const entries=new Map();
  const tileCache={
    async match(request){return entries.get(request.url);},
    async put(request,response){entries.set(request.url,response);},
    async keys(){keyEnumerations++;return [...entries.keys()].map(url=>({url}));},
    async delete(request){return entries.delete(request.url);}
  };
  const response={ok:true,type:'cors',clone(){return this;}};
  const ctx={
    URL,
    self:{
      location:{origin:'https://placementatlas.co.uk'},
      registration:{scope:'https://placementatlas.co.uk/'},
      addEventListener(name,callback){listeners[name]=callback;}
    },
    caches:{async open(){return tileCache;}},
    fetch:async()=>response,
    Response:{error(){throw Error('Unexpected network failure');}},
    console
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','sw.js'),'utf8'),ctx,{filename:'sw.js'});
  assert.equal(typeof listeners.fetch,'function');
  async function fetchTile(id){
    const request={
      method:'GET',
      url:'https://api.maptiler.com/maps/streets-v4/256/8/'+id+'/0.png?key=test',
      headers:{has:()=>false}
    };
    let result;
    listeners.fetch({request,respondWith(promise){result=promise;}});
    assert.ok(result,'Expected worker to handle map tiles');
    return result;
  }
  for(let i=0;i<31;i++)await fetchTile(i);
  assert.equal(keyEnumerations,0,'Do not enumerate cache after each new tile');
  await fetchTile(31);
  assert.equal(keyEnumerations,1,'Prune after the first batch of 32 tiles');
  await fetchTile(31);
  assert.equal(keyEnumerations,1,'Cached tile hits must not trigger more pruning');
  for(let i=32;i<768;i++)await fetchTile(i);
  assert.equal(keyEnumerations,24,'Pruning should happen once every 32 new tile writes');
  assert.ok(entries.size<=700+31,'Cache must stay bounded with a small batch allowance');
});
