'use strict';
/* Regression checks for Grid cards, the collapsed map and filter scrolling. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TARGET||'http://127.0.0.1:8000/';

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1440,height:960}});
  try{
    await page.addInitScript(()=>{
      localStorage.clear();
      localStorage.setItem('phivos-onboarding-v1','1');
      localStorage.setItem('oriel-desk-layout-v1','grid');
      localStorage.setItem('oriel-desk-page-size-v1','100');
    });
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
    await page.waitForFunction(()=>typeof placements!=='undefined'&&placements.length===4064&&
      document.querySelector('#results .placement.atlasSampleCard .atlasSampleExpandButton'),null,{timeout:90000});
    await page.waitForFunction(()=>document.querySelectorAll('#results .placement.atlasSampleCard').length===100,null,{timeout:45000});

    const card=page.locator('#results .placement.atlasSampleCard').first();
    const expand=card.locator('.atlasSampleExpandButton');
    await expand.waitFor({state:'visible',timeout:15000});
    const footer=await expand.evaluate(button=>{
      const b=button.getBoundingClientRect(),c=button.closest('.placement').getBoundingClientRect();
      return {buttonHeight:b.height,buttonBottom:b.bottom,cardBottom:c.bottom};
    });
    assert(footer.buttonHeight>=38,'Grid detail button is too short: '+JSON.stringify(footer));
    assert(footer.buttonBottom<=footer.cardBottom+1,'Grid detail button is clipped: '+JSON.stringify(footer));

    await expand.click();
    await page.waitForFunction(()=>document.querySelector('#results .placement.atlasSampleCard')?.classList.contains('uxExpanded'),null,{timeout:7000});
    const expanded=await card.evaluate(el=>{
      const fit=el.querySelector('.fit.fitExpanded.atlasTabbedFit');
      const breakdown=fit?.querySelector('.fitBreakdown');
      const panels=[...fit?.querySelectorAll('.fitColumn')||[]];
      const firstPoint=fit?.querySelector('.fitPoint');
      return {
        gridColumnEnd:getComputedStyle(el).gridColumnEnd,
        cardWidth:el.getBoundingClientRect().width,
        resultsWidth:el.parentElement.getBoundingClientRect().width,
        panelWidths:panels.map(panel=>panel.getBoundingClientRect().width),
        promptsInExplanations:breakdown?.querySelectorAll('[data-atlas-start-quiz]').length||0,
        promptsInPersonalFit:fit?.querySelectorAll('.score [data-atlas-start-quiz]').length||0,
        bulletLayout:firstPoint?getComputedStyle(firstPoint).display:'missing'
      };
    });
    assert.equal(expanded.gridColumnEnd,'-1','Expanded grid card must span the full results row');
    assert(expanded.cardWidth>=expanded.resultsWidth-3,'Expanded card is still narrower than the results area: '+JSON.stringify(expanded));
    assert(expanded.panelWidths.length===2&&expanded.panelWidths.every(width=>width>160),'Explanation panels are too narrow: '+JSON.stringify(expanded));
    assert.equal(expanded.promptsInExplanations,0,'Programme highlights/trade-offs must not prompt the quiz');
    assert.equal(expanded.promptsInPersonalFit,1,'The unpersonalised Personal Fit panel should retain its quiz prompt');
    assert.equal(expanded.bulletLayout,'flex','Fit bullets should sit beside the first line of text');

    const collapse=page.locator('#uxCollapseFilters');
    if(await collapse.isVisible())await collapse.click();
    else await page.locator('#uxToolbarFilters').click();
    await page.waitForFunction(()=>document.getElementById('explore')?.classList.contains('uxFiltersCollapsed'),null,{timeout:7000});
    const mapLayout=await page.evaluate(()=>{
      const layout=document.querySelector('#explore .layout').getBoundingClientRect();
      const workspace=document.querySelector('#explore .workspace').getBoundingClientRect();
      const mapCard=document.querySelector('#explore .map-card').getBoundingClientRect();
      const map=document.getElementById('placementMap').getBoundingClientRect();
      return {layout:layout.width,workspace:workspace.width,mapCard:mapCard.width,map:map.width};
    });
    assert(mapLayout.workspace>=mapLayout.layout-4,'Collapsed filters still leave a blank grid column: '+JSON.stringify(mapLayout));
    assert(mapLayout.mapCard>=mapLayout.workspace-4,'Map card did not expand with the workspace: '+JSON.stringify(mapLayout));
    assert(mapLayout.map>=mapLayout.mapCard*.75,'Leaflet map did not resize with its card: '+JSON.stringify(mapLayout));

    await page.setViewportSize({width:1024,height:900});
    const toolbar=page.locator('#uxToolbarFilters');
    if((await toolbar.innerText()).toLowerCase().includes('show'))await toolbar.click();
    await page.waitForFunction(()=>!document.getElementById('explore')?.classList.contains('uxFiltersCollapsed'),null,{timeout:7000});
    const filters=await page.locator('#uxFilterSidebar').evaluate(el=>{
      const style=getComputedStyle(el);
      return {position:style.position,maxHeight:style.maxHeight,overflowY:style.overflowY,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight};
    });
    assert.equal(filters.position,'static','Filters should be part of normal page flow');
    assert.equal(filters.maxHeight,'none','Filters should not have a viewport-height cap');
    assert.equal(filters.overflowY,'visible','Filters should not have their own vertical scrollbar');
    assert(filters.scrollHeight<=filters.clientHeight+4,'Filter panel still has internally clipped content: '+JSON.stringify(filters));
  }finally{
    await browser.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
