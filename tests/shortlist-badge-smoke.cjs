'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const http=require('http'),fs=require('fs'),path=require('path');
const root=process.cwd();
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const relative=(pathname.startsWith('/')?pathname.slice(1):pathname)||'index.html';
  const filename=path.join(root,relative);
  try{
    const ext=path.extname(filename).toLowerCase();
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.geojson':'application/geo+json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8'};
    res.setHeader('Content-Type',types[ext]||'application/octet-stream');
    res.end(fs.readFileSync(filename));
  }catch{res.statusCode=404;res.end();}
});
const waitForCount=(page,count)=>page.waitForFunction(value=>{
  return document.querySelector('#uxDrawerLauncher [data-ux-shortlist-count]')?.textContent===value;
},count,{timeout:15000});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']});
  const page=await browser.newPage({viewport:{width:1365,height:900}});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
    localStorage.setItem('phivos-onboarding-v1','1');
    localStorage.setItem('phivos-onboarding-profile-v1',JSON.stringify({
      region:'',environment:'mixed',priorities:[],salary:'',hours:'',community:'some'
    }));
  });
  await page.route('https://**/*',route=>{
    const url=route.request().url();
    if(url.includes('api.postcodes.io/postcodes/'))return route.fulfill({json:{result:{latitude:51.501,longitude:-0.142}}});
    if(url.includes('api.postcodes.io'))return route.fulfill({json:{result:[]}});
    return route.abort();
  });
  const url='http://127.0.0.1:'+server.address().port;
  fs.mkdirSync('/tmp/oriel-map-theme-smoke',{recursive:true});
  await page.goto(url+'/?qa=shortlist',{waitUntil:'domcontentloaded'});
  await page.locator('#results .placement').first().waitFor({state:'visible',timeout:60000});
  await page.locator('#uxDrawerLauncher [data-ux-shortlist-count]').waitFor({state:'attached',timeout:20000});
  await page.locator('#undoDesk').waitFor({state:'attached',timeout:20000});
  await waitForCount(page,'(0)');
  // An empty shortlist should teach users where to begin, not expose the footer.
  await page.locator('nav.tabs [data-tab="shortlist"]').click();
  await page.locator('#atlasShortlistWelcome').waitFor({state:'visible',timeout:15000});
  assert(await page.locator('#shortlist').evaluate(el=>el.classList.contains('atlasShortlistEmpty')),
    'Empty shortlist discovery panel should activate with no programmes');
  assert(await page.locator('#atlasShortlistWelcome [data-atlas-welcome]').count()>=9,
    'Empty shortlist should offer useful linked prompts');
  await page.screenshot({path:'/tmp/oriel-map-theme-smoke/placement-atlas-shortlist-empty.png',fullPage:true});
  await page.locator('#atlasShortlistWelcome [data-atlas-welcome="explore"]').first().click();
  await page.locator('#explore.active').waitFor({state:'visible',timeout:10000});
  const first=page.locator('#results .placement').first();
  await first.locator('[data-action=prefer]').click();
  await waitForCount(page,'(1)');
  await page.locator('nav.tabs [data-tab="shortlist"]').click();
  await page.waitForFunction(()=>document.getElementById('atlasShortlistWelcome')?.hidden===true,null,{timeout:15000});
  assert(!(await page.locator('#shortlist').evaluate(el=>el.classList.contains('atlasShortlistEmpty'))),
    'Discovery panel must disappear as soon as a programme is shortlisted');
  await page.locator('nav.tabs [data-tab="explore"]').click();
  await page.waitForFunction(()=>!!document.getElementById('undoDesk')&&!document.getElementById('undoDesk').disabled,null,{timeout:10000});
  assert.equal(await page.locator('#uxDrawerLauncher [data-ux-shortlist-count]').innerText(),'(1)',
    'Bottom-right shortlist count did not update after adding a programme');
  await page.locator('.atlasHistoryDisclosure > summary').click();
  await page.waitForFunction(()=>!!document.getElementById('undoDesk')&&!document.getElementById('undoDesk').disabled,null,{timeout:10000});
  await page.locator('#undoDesk').click();
  await waitForCount(page,'(0)');
  await page.waitForFunction(()=>!!document.getElementById('redoDesk')&&!document.getElementById('redoDesk').disabled,null,{timeout:10000});
  assert.equal(await page.locator('#uxDrawerLauncher [data-ux-shortlist-count]').innerText(),'(0)',
    'Bottom-right shortlist count did not update after undo');
  await page.locator('#redoDesk').click();
  await waitForCount(page,'(1)');
  await page.waitForFunction(()=>!!document.getElementById('undoDesk')&&!document.getElementById('undoDesk').disabled,null,{timeout:10000});
  await first.locator('[data-action=prefer]').click();
  await waitForCount(page,'(0)');
  assert.equal(await page.locator('#uxDrawerLauncher [data-ux-shortlist-count]').innerText(),'(0)',
    'Bottom-right shortlist count did not update after removing a programme');
  await first.locator('[data-action=prefer]').click();
  await waitForCount(page,'(1)');
  await page.locator('nav.tabs [data-tab="shortlist"]').click();
  await page.waitForFunction(()=>document.querySelector('#exportRanked')?.dataset.atlasPdfBound==='1',null,{timeout:15000});
  assert.equal((await page.locator('#exportRanked').innerText()).trim(),'Make it a PDF',
    'Shortlist export action should be clearly labelled as a PDF');
  const headingSize=Number(await page.locator('#shortlist .sectionHero h2').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)));
  assert(headingSize>=25,'Your shortlist heading should have clear page-title hierarchy');
  assert.equal(await page.evaluate(()=>window.AtlasFormatShortlistTitle("Chelsea&Westminster Hospital + South Southwark PCN(Dr Aru's Practice)")),
    "Chelsea & Westminster Hospital + South Southwark PCN (Dr Aru's Practice)",
    'Shortlist title formatter did not clean spacing and abbreviations');
  const firstShortlistCard=page.locator('#shortlistList .rank-row .placement').first();
  const layoutMetrics=await firstShortlistCard.evaluate(card=>{
    const fit=card.querySelector('.fit.fitExpanded.uxFitWithLocation');
    const score=fit?.querySelector('.score');
    const map=fit?.querySelector('.uxLocationPanel');
    const hourly=card.querySelector('.hourly');
    return {
      scoreWidth:score?.getBoundingClientRect().width||0,
      pageZoom:Number(getComputedStyle(document.querySelector('.shell')).zoom)||1,
      scoreOverflow:score?score.scrollWidth>score.clientWidth+2:false,
      fitWidth:fit?.getBoundingClientRect().width||0,
      mapWidth:map?.getBoundingClientRect().width||0,
      hourlyDisplay:hourly?getComputedStyle(hourly).display:'missing',
      hourlyText:hourly?.textContent.trim()||''
    };
  });
  // Compare unzoomed logical width; the 70% laptop default scales the pixels.
  assert(layoutMetrics.scoreWidth/layoutMetrics.pageZoom>=145,
    'Personal Fit panel should have enough logical width: '+JSON.stringify(layoutMetrics));
  assert(!layoutMetrics.scoreOverflow,'Personal Fit content should not overflow: '+JSON.stringify(layoutMetrics));
  assert(layoutMetrics.mapWidth<layoutMetrics.fitWidth*.68,'Location map should not dominate the shortlist card: '+JSON.stringify(layoutMetrics));
  assert(!/\/hr/i.test(layoutMetrics.hourlyText),'Hourly pay should not appear in the shortlist: '+JSON.stringify(layoutMetrics));
  if(layoutMetrics.hourlyText){
    assert(/\/mo gross$/.test(layoutMetrics.hourlyText),'The secondary salary line should show gross monthly pay: '+JSON.stringify(layoutMetrics));
    assert.equal(layoutMetrics.hourlyDisplay,'block','Gross monthly salary should remain visible: '+JSON.stringify(layoutMetrics));
  }
  // Grid is a shortlist overview: keep decisions visible, hide information
  // duplicated in the expandable card and keep original detail data intact.
  await page.locator('#shortlist .shortlist-toolbar [data-ux-layout="grid"]').click();
  await page.waitForFunction(()=>document.documentElement.dataset.layout==='grid',null,{timeout:10000});
  await page.waitForFunction(()=>!!document.querySelector('#shortlistList .rank-row .atlasCompactDate'),null,{timeout:10000});
  const compact=await page.locator('#shortlistList .rank-row').first().evaluate(row=>{
    const card=row.querySelector('.placement');
    const shown=sel=>{
      const el=card.querySelector(sel);
      return el&&getComputedStyle(el).display!=='none';
    };
    return {
      expanded:row.classList.contains('uxExpanded'),
      details:shown('.uxDetailButton'),
      note:shown('.controls input[data-action="note"]'),
      monthly:shown('.atlasGrossMonthly'),
      takehome:shown('.uxTakeHome'),
      fullName:shown('.atlasWorkspaceTitleExpand'),
      largeDates:shown('.programmeDates'),
      inlineDates:shown('.atlasCompactDate'),
      dateText:card.querySelector('.atlasCompactDate')?.textContent||'',
      code:card.querySelector('.atlasCompactProgrammeCode strong')?.textContent||'',
      visa:card.querySelector('.badges .badge[class*="sponsorship"],.badges .badge.good')?.textContent||'',
      eyebrow:getComputedStyle(document.querySelector('#shortlist .sectionHero .eyebrow')).display
    };
  });
  assert.equal(compact.expanded,false,'Grid card should start collapsed');
  assert(compact.details&&compact.inlineDates&&!compact.largeDates,
    'Collapsed grid must show brief dates and a real expand action: '+JSON.stringify(compact));
  assert(!compact.note&&!compact.monthly&&!compact.takehome&&!compact.fullName,
    'Collapsed grid must hide secondary salary/name/note controls: '+JSON.stringify(compact));
  assert(/^\d+$/.test(compact.code),'Programme ID must remain bold and identifiable: '+JSON.stringify(compact));
  assert(/\b(Yes|No|Unconfirmed)\b/.test(compact.visa),'Visa badge should be concise: '+JSON.stringify(compact));
  assert.equal(compact.eyebrow,'none','Shortlist page should not repeat its own title');
  await page.screenshot({path:'/tmp/oriel-map-theme-smoke/placement-atlas-shortlist-grid-compact.png',fullPage:true});
  await page.locator('#shortlistList .rank-row .uxDetailButton').first().click();
  await page.locator('#shortlistList .rank-row.uxExpanded').first().waitFor({state:'attached',timeout:10000});
  const expandedDetail=await page.locator('#shortlistList .rank-row.uxExpanded').first().evaluate(row=>{
    const el=row.querySelector('.placement .programmeDates');
    const note=row.querySelector('.placement .controls input[data-action="note"]');
    return {date:!!el&&getComputedStyle(el).display!=='none',
      note:!!note&&getComputedStyle(note).display!=='none'};
  });
  assert(expandedDetail.date&&expandedDetail.note,'Expanded grid must restore full dates and note');
  await page.locator('#shortlist .shortlist-toolbar [data-ux-layout="list"]').click();
  await page.waitForFunction(()=>document.documentElement.dataset.layout==='list',null,{timeout:10000});
  await page.screenshot({path:'/tmp/oriel-map-theme-smoke/placement-atlas-shortlist-desktop.png',fullPage:true});
  const desktopRemove=page.locator('#shortlistList .rank-row .rank-controls [data-atlas-remove-shortlist]').first();
  await page.locator('#shortlistList .rank-row').first().hover();
  await desktopRemove.waitFor({state:'visible',timeout:15000});
  await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('#shortlistList .rank-row .rank-controls [data-atlas-remove-shortlist]')).opacity)>0.99,null,{timeout:3000});
  assert(Number(await desktopRemove.evaluate(el=>getComputedStyle(el).opacity))>0.99,'Desktop shortlist remove control should be visible in the ranking rail');
  assert(await desktopRemove.evaluate(el=>el.getAttribute('aria-label')==='Remove programme from shortlist'),
    'Desktop remove control should explain its action to assistive technology');
  const popupPromise=page.waitForEvent('popup');
  await page.locator('#exportRanked').click();
  const pdfPopup=await popupPromise;
  await pdfPopup.locator('header h1').waitFor({state:'visible',timeout:10000});
  const pdfText=await pdfPopup.locator('body').innerText();
  assert(pdfText.includes('Ranked shortlist'),'PDF print view should contain the ranked shortlist heading');
  assert(pdfText.includes('PREFERENCE 1'),'PDF print view should preserve the first preference rank');
  await pdfPopup.close();
  await desktopRemove.click();
  await waitForCount(page,'(0)');
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  mobile.on('pageerror',error=>errors.push(error.message));
  await mobile.addInitScript(()=>{localStorage.setItem('phivos-onboarding-v1','1');localStorage.setItem('phivos-onboarding-profile-v1',JSON.stringify({region:'',environment:'mixed',priorities:[],salary:'',hours:'',community:'some'}));});
  await mobile.route('https://**/*',route=>{const u=route.request().url();if(u.includes('api.postcodes.io/postcodes/'))return route.fulfill({json:{result:{latitude:51.501,longitude:-0.142}}});if(u.includes('api.postcodes.io'))return route.fulfill({json:{result:[]}});return route.abort();});
  await mobile.goto(url+'/?qa=shortlist-mobile',{waitUntil:'domcontentloaded'});
  // Respect the privacy prompt instead of trying to click through its overlay.
  // The floating shortlist should be tested only after the visitor makes a choice.
  const rejectTracking=mobile.locator('#atlasCookieNotice .atlasCookieReject');
  if(await rejectTracking.count())await rejectTracking.click();
  await mobile.locator('#results .placement').first().waitFor({state:'visible',timeout:60000});
  await mobile.locator('#results .placement').first().locator('[data-action=prefer]').click();
  await mobile.waitForFunction(()=>document.querySelector('#uxDrawerLauncher [data-ux-shortlist-count]')?.textContent==='(1)',null,{timeout:15000});
  assert(await mobile.locator('#uxDrawerLauncher').evaluate(el=>el.parentElement===document.body),'Floating shortlist must escape the app content stacking context');
  const overlayMetrics=await mobile.evaluate(()=>{
    const node=document.getElementById('uxDrawerLauncher'), rect=node.getBoundingClientRect(),
      style=getComputedStyle(node),shell=document.querySelector('.shell'),shellStyle=getComputedStyle(shell),
      x=rect.left+rect.width/2,y=rect.top+rect.height/2,top=document.elementFromPoint(x,y);
    return {parent:node.parentElement?.tagName,rect:{x,y,width:rect.width,height:rect.height},
      launcher:{z:style.zIndex,position:style.position,pointerEvents:style.pointerEvents,opacity:style.opacity,visibility:style.visibility},
      shell:{z:shellStyle.zIndex,position:shellStyle.position,transform:shellStyle.transform},
      hit:{tag:top?.tagName,className:String(top?.className).slice(0,150),id:top?.id},bodyChildren:[...document.body.children].slice(-6).map(n=>n.tagName+'.'+n.className)};
  });
  console.log('Floating shortlist hit-test: '+JSON.stringify(overlayMetrics));
  await mobile.locator('#uxDrawerLauncher').click();
  const mobileItem=mobile.locator('#uxDrawerItems .uxDrawerItem').first();
  await mobileItem.waitFor({state:'visible',timeout:15000});
  const mobileRemove=mobileItem.locator('[data-atlas-remove-shortlist]');
  assert.equal(await mobileRemove.evaluate(el=>getComputedStyle(el).opacity),'0','Phone drawer X should stay hidden before a swipe');
  await mobile.evaluate(()=>{const item=document.querySelector('#uxDrawerItems .uxDrawerItem');const start=new Event('touchstart',{bubbles:true});Object.defineProperty(start,'touches',{value:[{clientX:320,clientY:240}]});item.dispatchEvent(start);const end=new Event('touchend',{bubbles:true});Object.defineProperty(end,'changedTouches',{value:[{clientX:205,clientY:243}]});item.dispatchEvent(end);});
  assert(await mobileItem.evaluate(el=>el.classList.contains('atlasSwipeOpen')),'Swiping left did not reveal the shortlist X');
  await mobile.waitForFunction(()=>getComputedStyle(document.querySelector('#uxDrawerItems .uxDrawerItem [data-atlas-remove-shortlist]')).opacity==='1',null,{timeout:2500});
  assert.equal(await mobileRemove.evaluate(el=>getComputedStyle(el).opacity),'1','Phone drawer X did not appear after swiping left');
  await mobileRemove.click();
  await mobile.waitForFunction(()=>document.querySelector('#uxDrawerLauncher [data-ux-shortlist-count]')?.textContent==='(0)',null,{timeout:15000});
  assert(!errors.some(error=>/shortlist|updateCounts|mark is not defined/i.test(error)),
    'Shortlist logic raised a browser runtime error: '+errors.join('; '));
  console.log('PASS: shortlist count, compact layout, title cleanup, PDF print view, desktop removal, and mobile swipe-to-reveal removal');
  await browser.close();server.close();
})().catch(error=>{console.error(error);server.close();process.exit(1);});
