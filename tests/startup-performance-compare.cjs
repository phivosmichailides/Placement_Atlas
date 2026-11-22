'use strict';
/*
 * Compare initial desktop browser work in this PR with the unchanged main
 * branch on the same Chromium runner. These values are diagnostic proxies,
 * not a PageSpeed Insights/Lighthouse score or real-user field metrics.
 */
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

const median=values=>{
  const v=[...values].sort((a,b)=>a-b);
  return v.length%2?v[(v.length-1)/2]:(v[v.length/2-1]+v[v.length/2])/2;
};

async function sample(browser,url,label){
  const context=await browser.newContext({viewport:{width:1365,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  const cdp=await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:3});
  await page.addInitScript(()=>{
    window.__atlasBenchmark={cls:0,longTaskBlocking:0,longTaskCount:0,largestContentfulPaint:0,firstContentfulPaint:0,topLayoutShifts:[]};
    try{
      new PerformanceObserver(list=>{
        for(const entry of list.getEntries()){
          if(entry.entryType==='longtask'){
            window.__atlasBenchmark.longTaskCount++;
            window.__atlasBenchmark.longTaskBlocking+=Math.max(0,entry.duration-50);
          }else if(entry.entryType==='layout-shift'&&!entry.hadRecentInput){
            window.__atlasBenchmark.cls+=entry.value;
            const label=node=>{
              if(!node)return '[disconnected]';
              if(node.id)return '#'+node.id;
              const cls=typeof node.className==='string'?node.className.trim().split(/\\s+/).slice(0,2).join('.'):'';
              return String(node.tagName||'node').toLowerCase()+(cls?'.'+cls:'');
            };
            const affected=(entry.sources||[]).slice(0,3).map(s=>({
              element:label(s.node),
              fromY:Math.round(s.previousRect?.y||0),
              toY:Math.round(s.currentRect?.y||0)
            }));
            window.__atlasBenchmark.topLayoutShifts.push({
              value:Number(entry.value.toFixed(4)),
              time:Math.round(entry.startTime),
              affected
            });
            window.__atlasBenchmark.topLayoutShifts.sort((a,b)=>b.value-a.value);
            window.__atlasBenchmark.topLayoutShifts.length=Math.min(7,window.__atlasBenchmark.topLayoutShifts.length);
          }else if(entry.entryType==='largest-contentful-paint'){
            window.__atlasBenchmark.largestContentfulPaint=entry.startTime;
          }else if(entry.entryType==='paint'&&entry.name==='first-contentful-paint'){
            window.__atlasBenchmark.firstContentfulPaint=entry.startTime;
          }
        }
      }).observe({entryTypes:['longtask','layout-shift','largest-contentful-paint','paint']});
    }catch(error){window.__atlasBenchmark.observerError=error.message;}
  });
  const failures=[];
  page.on('pageerror',error=>failures.push(error.message));
  try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
    await page.waitForFunction(()=>typeof placements!=='undefined'&&placements.length===4064
      &&document.querySelector('#results .placement')&&document.querySelector('.productIntro'),
      null,{timeout:90000});
    // Observe startup recalculation and late content enhancements.
    await page.waitForTimeout(1500);
    const measurements=await page.evaluate(()=>{
      const p=window.__atlasBenchmark||{};
      return {
        cls:Number((p.cls||0).toFixed(4)),
        longTaskBlockingMs:Math.round(p.longTaskBlocking||0),
        longTasks:p.longTaskCount||0,
        fcpMs:Math.round(p.firstContentfulPaint||0),
        lcpMs:Math.round(p.largestContentfulPaint||0),
        cards:document.querySelectorAll('#results .placement').length,
        programmes:typeof placements==='undefined'?0:placements.length,
        heroCount:document.querySelectorAll('.productIntro').length,
        programmeDates:document.querySelectorAll('#results .programmeDates').length,
        loaded:Math.round(performance.now()),
        topLayoutShifts:p.topLayoutShifts||[]
      };
    });
    if(measurements.programmes!==4064||measurements.heroCount!==1){
      throw Error(label+' invalid programme/hero state '+JSON.stringify(measurements));
    }
    console.log(label+' '+JSON.stringify({...measurements,pageErrors:failures.slice(0,3)}));
    return measurements;
  }finally{
    await context.close();
  }
}
(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const items={main:[],candidate:[]};
  try{
    for(let i=0;i<2;i++){
      for(const [label,url] of [['main','http://127.0.0.1:8001/'],['candidate','http://127.0.0.1:8000/']]){
        items[label].push(await sample(browser,url,label+' run '+(i+1)));
      }
    }
    const metrics=['longTaskBlockingMs','cls','fcpMs','lcpMs','loaded'];
    const summary={};
    for(const key of metrics){
      const original=median(items.main.map(x=>x[key]));
      const candidate=median(items.candidate.map(x=>x[key]));
      summary[key]={main:original,candidate,change:Number((candidate-original).toFixed(2))};
    }
    console.log('PR VERSUS MAIN, median of two fresh contexts: '+JSON.stringify(summary));
    fs.writeFileSync(path.join(process.cwd(),'startup-performance-results.json'),JSON.stringify({summary,runs:items},null,2));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
