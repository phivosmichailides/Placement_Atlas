'use strict';
const fs=require('node:fs'),path=require('node:path');
const folder=process.argv[2]||'/tmp/atlas-lighthouse';
const ids=[
 ['FCP','first-contentful-paint'],
 ['LCP','largest-contentful-paint'],
 ['TBT','total-blocking-time'],
 ['CLS','cumulative-layout-shift'],
 ['Speed index','speed-index'],
 ['JS execution','bootup-time'],
 ['Main thread','mainthread-work-breakdown']
];
const get=(mode,ver)=>JSON.parse(fs.readFileSync(path.join(folder,mode+'-'+ver+'.json'),'utf8'));
const format=(n,unit)=>n===undefined?'n/a':Number(n).toFixed(unit==='CLS'?3:unit==='Score'?0:0);
const show=(mode,ver,lhr)=>{
 const audits=lhr.audits;
 console.log('\n'+mode.toUpperCase()+' '+ver.toUpperCase()+' — Lighthouse '+lhr.lighthouseVersion);
 console.log('Score '+Math.round((lhr.categories.performance?.score||0)*100)+'/100');
 for(const [label,id] of ids){
  const item=audits[id]; if(!item)continue;
  if(id==='mainthread-work-breakdown'||id==='bootup-time')continue;
  console.log(label+': '+(item.displayValue||Math.round(item.numericValue||0)));
 }
 const boot=audits['bootup-time']?.details?.items||[];
 console.log('Most expensive JavaScript sources:');
 boot.slice().sort((a,b)=>(b.total||0)-(a.total||0)).slice(0,10).forEach(x=>
   console.log('  '+Math.round(x.total||0)+'ms '+(x.url||'unknown').replace(/^https?:\/\/[^/]+/,''))
 );
 const breakdown=audits['mainthread-work-breakdown']?.details?.items||[];
 console.log('Main-thread work: '+breakdown.map(x=>x.groupLabel+':'+Math.round(x.duration||0)+'ms').join(' | '));
 const tasks=audits['long-tasks']?.details?.items||[];
 console.log('Long tasks: '+tasks.length);
 const requests=audits['network-requests']?.details?.items||[];
 console.log('Network requests: '+requests.length+', transfer: '+Math.round(requests.reduce((s,x)=>s+(x.transferSize||0),0)/1024)+'KiB');
};
for(const mode of ['desktop','mobile']){
 const a=get(mode,'baseline'),b=get(mode,'candidate');
 show(mode,'baseline',a);show(mode,'candidate',b);
 const first=(lhr,id)=>lhr.audits[id]?.numericValue||0;
 const score=Math.round((b.categories.performance.score-a.categories.performance.score)*100);
 console.log('\n'+mode+' score difference (candidate - baseline): '+(score>=0?'+':'')+score+' points');
 for(const [label,id] of ids.slice(0,5)){
  const diff=first(b,id)-first(a,id);
  console.log(label+' difference: '+(diff>=0?'+':'')+diff.toFixed(id==='cumulative-layout-shift'?3:0)+(id==='cumulative-layout-shift'?'':'ms'));
 }
}
