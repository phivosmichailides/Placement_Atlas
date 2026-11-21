'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');

test('all modified browser scripts parse',()=>{
  for(const name of ['app-base.js','app-product.js','onboarding.js','map-basemap.js','sector-map.js','app.js','premium-card-tabs.js','sw.js']){
    assert.doesNotThrow(()=>new Function(read(name)),name);
  }
});

test('Skilled Worker sponsorship filters strictly by explicit status',()=>{
  const source=read('app-base.js').match(/function visaMatches\(p\)\{[^\n]*\}/)?.[0];
  assert.ok(source,'visaMatches helper exists');
  let requested='';
  const check=new Function('$',source+';return visaMatches;')(()=>({value:requested}));
  const values=[{visa:true},{visa:false},{visa:null}];
  requested='yes';assert.deepEqual(values.map(check),[true,false,false]);
  requested='no';assert.deepEqual(values.map(check),[false,true,false]);
  requested='unknown';assert.deepEqual(values.map(check),[false,false,true]);
  requested='';assert.deepEqual(values.map(check),[true,true,true]);
});

test('Sponsorship improves personal fit only when requested and remains a visible pro',()=>{
  const code=read('app-base.js').match(/function analyse\(p\)\{[^\n]*\}/)?.[0];
  assert.ok(code,'analyse helper exists');
  const state={prefs:{visaPriority:'none',weights:{money:3,hospital:3,gp:3,lifestyle:3,location:3,progression:3,independence:3,communityPenalty:3}}};
  const t=p=>(p.title||'').toLowerCase();
  const weeks=()=>0,areaPref=()=>0,any=(str,words)=>words.some(word=>str.includes(word));
  const hourly=p=>p.salary&&p.hours?p.salary/(52*p.hours):0;
  const split=()=>''; 
  const analyse=new Function('state','text','weeks','areaPref','any','hourly','split',code+';return analyse;')(state,t,weeks,areaPref,any,hourly,split);
  const p={title:'Training programme',salary:30000,hours:37.5,settings:[],visa:false};
  const unsponsored=analyse(p);
  const sponsored=analyse({...p,visa:true});
  assert.equal(sponsored.score,unsponsored.score,'Visa should not distort a user who has not requested it');
  assert.ok(sponsored.good.some(msg=>msg.includes('Skilled Worker visa')));
  state.prefs.visaPriority='require';
  assert.ok(analyse({...p,visa:true}).score>analyse({...p,visa:false}).score);
  assert.ok(analyse({...p,visa:true}).score>analyse({...p,visa:null}).score);
});

test('map avoids catalogue-wide automatic geocoding and offscreen marker work',()=>{
  const app=read('app-product.js'),map=read('sector-map.js'),basemap=read('map-basemap.js');
  assert.match(app,/const source=placements\.filter\(matches\)/);
  assert.match(app,/if\(auto&&\(!activeRegion\(\)\|\|source.length>650\)\)return/);
  assert.match(map,/const visibleBounds=placementMap\.getBounds\(\)\.pad\(\.30\)/);
  assert.match(map,/if\(cachedGroupList===list&&cachedGroupData\)/);
  assert.match(map,/redrawTimer=setTimeout/);
  assert.match(basemap,/if\(preference==='fast'\)return raster\(map,'Reliable Streets basemap'\)/);
  assert.ok(!read('index.html').includes('<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.0.0/dist/maplibre-gl.js"'));
});

test('the app and offline shell both reference the new versions',()=>{
  const index=read('index.html'),app=read('app.js'),product=read('app-product.js'),sw=read('sw.js');
  for(const item of ['app.js?v=20261119swvmap1','map-basemap.js?v=20261119roads1','premium-card-tabs.js?v=20261119swv1'])
    assert.ok(index.includes(item),'index missing '+item);
  for(const item of ['app-product.js?v=20261119swv1','onboarding.js?v=20261119swv1','sector-map.js?v=20261121clarity1'])
    assert.ok(app.includes(item),'loader missing '+item);
  assert.ok(product.includes('app-base.js?v=20261119swv1'));
  assert.ok(sw.includes('placement-atlas-shell-2026-11-19-v94-swv-fast-map'));
  assert.ok(index.includes('id="visaPriorityPreference"'));
});
