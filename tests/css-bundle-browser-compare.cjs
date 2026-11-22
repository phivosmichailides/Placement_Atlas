'use strict';
/* Verify the proposed CSS bundles do not alter the current homepage's computed
   appearance in the real browser. Both servers run the same app commit except
   that the candidate consolidates the existing CSS in exact source order. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const roots={main:'http://127.0.0.1:8001/',bundle:'http://127.0.0.1:8000/'};
const configs=[
 {name:'desktop-light',width:1365,height:900,theme:'light',palette:'mono'},
 {name:'mobile-light',width:390,height:844,theme:'light',palette:'mono'},
 {name:'desktop-dark',width:1365,height:900,theme:'dark',palette:'forest'},
 {name:'mobile-dark',width:390,height:844,theme:'dark',palette:'forest'}
];
// Compare CSS rules, not content-derived used heights: asynchronous map and
// onboarding content can differ in height even when the CSS cascade is identical.
const cssProperties=['display','visibility','position','color','backgroundColor','fontFamily','fontSize','fontWeight',
  'letterSpacing','lineHeight','borderRadius','borderColor','boxShadow','padding','margin',
  'gridTemplateColumns','flexDirection','width','maxHeight','minHeight','overflow'];
const selectors=[
 'html','body','.shell','header.top','.brand','nav.tabs','nav.tabs .tab.active',
 '.productIntro','.productIntro h2','.productIntro .introActions .btn',
 '#explore','#uxFilterSidebar','#uxFilterSidebar .secthead','#quick',
 '#placementMap','#results','#results .placement','#results .placement h3',
 '#results .placement .btn','#atlasCookieNotice'
];
async function snapshot(browser,url,config){
 const context=await browser.newContext({viewport:{width:config.width,height:config.height},deviceScaleFactor:1});
 await context.addInitScript(({theme,palette})=>{
   localStorage.setItem('oriel-desk-theme-v1',theme);
   localStorage.setItem('oriel-desk-palette-v1',palette);
   sessionStorage.setItem('phivos-onboarding-skip-session','1');
 },config);
 const page=await context.newPage();
 try{
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>typeof placements!=='undefined'&&placements.length===4064
    &&document.querySelectorAll('#results .placement').length>=36,null,{timeout:90000});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(300);
  const data=await page.evaluate(({selectors,properties})=>{
    const result={};
    for(const selector of selectors){
      const el=document.querySelector(selector);
      if(!el){result[selector]=null;continue;}
      const style=getComputedStyle(el);
      result[selector]=Object.fromEntries(properties.map(property=>[property,style[property]]));
    }
    return result;
  },{selectors,properties:cssProperties});
  return data;
 }finally{await context.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const config of configs){
    const baseline=await snapshot(browser,roots.main,config);
    const candidate=await snapshot(browser,roots.bundle,config);
    assert.deepEqual(candidate,baseline,
      'Bundling must not alter computed styles in '+config.name);
    console.log('PASS '+config.name+': computed styles unchanged for '+selectors.length+' critical elements');
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
