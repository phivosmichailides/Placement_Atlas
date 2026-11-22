'use strict';
/* Live Chromium interaction test against a local checkout, never user accounts. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const target=process.env.TARGET||'http://127.0.0.1:8000/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 try{
  await page.addInitScript(()=>{
   localStorage.setItem('phivos-onboarding-v1','1');
   localStorage.setItem('phivos-onboarding-profile-v1',JSON.stringify({region:'',environment:'mixed',priorities:[],salary:'',hours:'',community:'some'}));
   localStorage.removeItem('oriel-desk-page-zoom-v1');
  });
  await page.goto(target,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>typeof placementMap!=='undefined'&&!!placementMap&&!!window.OrielMapStats&&
   window.OrielMapStats.programmes===4064&&document.querySelectorAll('#placementMap .oriel-cluster-marker').length>0,
   null,{timeout:90000});
  const before=await page.evaluate(()=>({center:placementMap.getCenter(),zoom:placementMap.getZoom(),pageZoom:getComputedStyle(document.querySelector('.shell')).zoom}));
  assert.equal(before.pageZoom,'0.7','The regression must be exercised at the problematic 70% page zoom');
  const marker=page.locator('#placementMap .oriel-cluster-marker:visible').first();
  await marker.click({timeout:20000});
  await page.locator('#placementMap .atlasProgrammePopup').waitFor({timeout:10000});
  // Popup autopan triggers moveend. The camera redraw must not dismiss it.
  await page.waitForTimeout(650);
  assert(await page.locator('#placementMap .atlasProgrammePopup').isVisible(),
   'Cluster click opened and then immediately dismissed its programme details');
  assert(await page.locator('#placementMap .atlasPopupDrilldown').count()>0,
   'The explicit zoom-into-sites action is missing');
  await page.evaluate(()=>placementMap.closePopup());
  await page.locator('#atlasMapZoom [data-atlas-zoom="in"]').click();
  await page.waitForFunction(z=>placementMap.getZoom()>z,before.zoom,{timeout:8000});
  const afterIn=await page.evaluate(()=>({center:placementMap.getCenter(),zoom:placementMap.getZoom()}));
  await page.locator('#atlasMapZoom [data-atlas-zoom="out"]').click();
  await page.waitForFunction(z=>Math.abs(placementMap.getZoom()-z)<0.01,before.zoom,{timeout:8000});
  const afterOut=await page.evaluate(()=>({center:placementMap.getCenter(),zoom:placementMap.getZoom()}));
  for(const c of [afterIn.center,afterOut.center]){
   assert(Math.abs(c.lat-before.center.lat)<0.08&&Math.abs(c.lng-before.center.lng)<0.08,
    'Zoom buttons moved the map diagonally away from the London view: '+JSON.stringify({before,afterIn,afterOut}));
  }
  await page.locator('#atlasMapExpand').click();
  await page.waitForFunction(()=>!document.getElementById('atlasMapFocus')?.hidden,null,{timeout:7000});
  await page.locator('#atlasMapZoom [data-atlas-zoom="in"]').click();
  const inFocus=await page.evaluate(()=>placementMap.getCenter());
  assert(Math.abs(inFocus.lat-afterOut.center.lat)<0.08&&Math.abs(inFocus.lng-afterOut.center.lng)<0.08,
    'Expanded map zoom shifted the view unexpectedly');
  await page.locator('#atlasMapFocusClose').click();
  assert(await page.locator('#placementMap').isVisible(),'Closing the expanded map lost the map');
  assert.equal(errors.length,0,'Unexpected browser JavaScript errors: '+errors.join('; '));
  console.log('Map camera, programme popup and expanded-map interaction passed at 70% zoom');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
