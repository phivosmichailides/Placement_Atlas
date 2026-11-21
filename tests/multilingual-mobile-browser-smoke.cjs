'use strict';
/* Real Chromium checks for the language picker and phone-sized Swipe Mode.
   This test only uses its own browser context; no real account is required. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.TARGET || 'http://127.0.0.1:8000/';

(async () => {
  const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
  const context = await browser.newContext({
    viewport:{width:430,height:932},
    deviceScaleFactor:3,
    isMobile:true,
    hasTouch:true
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror',e=>errors.push(e.message));
  try {
    await page.addInitScript(()=>{
      localStorage.setItem('phivos-onboarding-v1','1');
    });
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
    const reject = page.locator('#atlasCookieNotice .atlasCookieReject');
    if (await reject.count()) await reject.click();
    await page.locator('#atlasLanguageTrigger').waitFor({state:'visible',timeout:20000});
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    assert.match(await page.locator('#atlasLanguageTrigger').getAttribute('aria-label'),/English/);
    await page.locator('#atlasLanguageTrigger').click();
    const menu = page.locator('#atlasLanguageMenu');
    assert(await menu.isVisible(),'Language options must open');
    assert.equal(await menu.locator('[role=menuitemradio]').count(),25);
    const menuRect = await menu.boundingBox();
    assert(menuRect && menuRect.x >= 0 &&
      menuRect.x+menuRect.width <= 431 &&
      menuRect.y >= 0 &&
      menuRect.y+menuRect.height <= 933,
      'Language menu must fit within mobile viewport: '+JSON.stringify(menuRect));
    const el = page.locator('#atlasLanguageMenu button[data-language="el"]');
    assert.match((await el.innerText()).trim(),/Ελληνικά/);
    await el.click();
    await page.waitForFunction(()=>document.documentElement.lang==='el');
    await page.waitForFunction(()=>document.querySelector('nav.tabs .tab[data-tab="explore"]')?.textContent?.includes('Εξερεύνηση'));
    assert.match(await page.locator('nav.tabs .tab[data-tab="shortlist"]').innerText(),/Λίστα επιλογών/,
      'The Greek navigation must use the same terminology as the shortlist page');
    assert.match(await page.locator('nav.tabs .tab[data-tab="tinderMode"]').innerText(),/Swipe Mode/,
      'Protected product label Swipe Mode must remain unchanged');
    assert.equal(await page.locator('#region option').first().innerText(),'Οποιαδήποτε',
      'Region is feminine in Greek: Οποιαδήποτε');
    assert.equal(await page.locator('#hours option').first().innerText(),'Χωρίς όριο');
    assert.equal(await page.locator('#salary option').first().innerText(),'Χωρίς όριο');
    assert.match(await page.locator('.map-heading h2').innerText(),/Τοποθεσίες προγραμμάτων/,
      'Map heading should be translated and concise');
    const greekUI=await page.evaluate(()=>{
      const map=document.querySelector('.map-heading h2');
      return {font:getComputedStyle(map).fontFamily,
        overflows:document.documentElement.scrollWidth-innerWidth,
        textWidth:map.scrollWidth,boxWidth:map.clientWidth};
    });
    assert(greekUI.font.includes('system-ui'), 'Greek must use a consistent full-script font: '+JSON.stringify(greekUI));
    assert(greekUI.overflows<=2&&greekUI.textWidth<=greekUI.boxWidth+2,
      'Longer translated labels must not cause clipping or horizontal scrolling: '+JSON.stringify(greekUI));
    assert.equal(new URL(page.url()).searchParams.get('lang'),'el',
      'Language switching must create a shareable locale URL');
    await page.waitForFunction(()=>document.querySelector('#results .placement [data-action="prefer"]')?.textContent?.includes('Προσθήκη')||document.querySelector('#results .placement [data-action="prefer"]')?.textContent?.includes('Αφαίρεση'),null,{timeout:20000});
    await page.evaluate(()=>window.openOrielPersonalisation?.());
    await page.locator('.onboardCard').waitFor({state:'visible',timeout:15000});
    await page.waitForFunction(()=>document.querySelector('.onboardCard h2')?.textContent?.includes('Τι έχει σημασία'),null,{timeout:12000});
    assert.match(await page.locator('.onboardCard h2').innerText(),/Τι έχει σημασία/,'Quiz welcome screen should use Greek');
    await page.locator('#obStart').click();
    // Translation of the newly rendered step is scheduled on the next frame.
    await page.waitForFunction(()=>document.querySelector('.onboardCard h3')?.textContent?.includes('Πού αναζητάς'),null,{timeout:12000});
    assert.match(await page.locator('.onboardCard h3').innerText(),/Πού αναζητάς/,'Quiz location prompt should be Greek');
    await page.locator('.onboardClose').click();
    await page.locator('#atlasLanguageTrigger').click();
    await page.locator('#atlasLanguageMenu button[data-language="ar"]').click();
    assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
    assert.equal(new URL(page.url()).searchParams.get('lang'),'ar');
    await page.locator('#atlasLanguageTrigger').click();
    await page.locator('#atlasLanguageMenu button[data-language="en"]').click();
    assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    assert.equal(new URL(page.url()).searchParams.has('lang'),false,'English should use the canonical URL');

    await page.waitForFunction(()=>typeof placements!=='undefined'&&placements.length===4064,null,{timeout:90000});
    const swipeTab=page.locator('header.top nav.tabs [data-tab="tinderMode"]');
    await swipeTab.click();
    await page.locator('#tinderActiveCard').waitFor({state:'visible',timeout:20000});
    const metrics=await page.evaluate(()=>{
      const panel=document.getElementById('tinderMode');
      const card=document.querySelector('#tinderActiveCard');
      const action=document.querySelector('#tinderMode .tdActions');
      const badge=document.querySelector('#tinderSwipeBadge');
      const box=el=>{
        const r=el.getBoundingClientRect();
        return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height,width:r.width};
      };
      const style=getComputedStyle(card);
      return {viewport:{width:innerWidth,height:innerHeight},panel:box(panel),
        card:box(card),action:box(action),badge:box(badge),
        scroll:style.overflowY,actionPosition:getComputedStyle(action).position,
        cardWidth:card.clientWidth,scrollWidth:document.documentElement.scrollWidth};
    });
    assert(metrics.scroll==='auto','Card content should scroll inside the card: '+JSON.stringify(metrics));
    assert(metrics.card.height <= 577,'Card exceeds reasonable phone height: '+JSON.stringify(metrics));
    assert(metrics.actionPosition==='sticky','Actions should stay visible while moving down the page');
    assert(metrics.action.left>=0&&metrics.action.right<=metrics.viewport.width+1,
      'Action buttons are too wide for phone: '+JSON.stringify(metrics));
    assert(metrics.action.top>=0&&metrics.action.bottom<=metrics.viewport.height+2,
      'Action buttons must be within the phone viewport without zooming out: '+JSON.stringify(metrics));
    assert(metrics.scrollWidth<=metrics.viewport.width+2,
      'Page should not require horizontal zoom: '+JSON.stringify(metrics));
    for(const id of ['tdMobileUndo','tdMobileRedo','tdOpenRejected','tdOpenLiked','tinderNo','tinderYes','tinderSuper']){
      assert(await page.locator('#'+id).isVisible(),'Missing compact mobile control '+id);
    }
    assert.equal(await page.locator('#tinderUndo').isVisible(),false,'Duplicate Undo should be hidden on mobile');
    assert.equal(await page.locator('.atlasHistoryDisclosure').isVisible(),false,'History menu should not take space in Swipe Mode');
    const inlineRow=page.locator('#tdMobileControlRow');
    const rowBox=await inlineRow.boundingBox();
    assert(rowBox && rowBox.x>=0 && rowBox.x+rowBox.width<=431,'Mobile controls must be centred and fit viewport');
    const navControl=page.locator('#tdSwipeHeaderReveal');
    await page.waitForTimeout(1450);
    assert(await page.locator('body').evaluate(el=>el.classList.contains('tdMobileHeaderHidden')),
      'Swipe Mode header should auto-hide after entering the game');
    assert(await navControl.isVisible(),'Navigation reveal should remain accessible');
    await navControl.click();
    assert(!(await page.locator('body').evaluate(el=>el.classList.contains('tdMobileHeaderHidden'))),
      'Navigation reveal must restore the header');
    // Simulate moving a card right while maintaining the current decision state.
    const badgeStatus=await page.evaluate(()=>{
      const card=document.getElementById('tinderActiveCard');
      const r=card.getBoundingClientRect();
      const cx=r.left+r.width/2, cy=r.top+Math.min(90,r.height/2);
      card.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:31,button:0,clientX:cx,clientY:cy}));
      card.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerId:31,button:0,clientX:cx+72,clientY:cy}));
      const badge=document.getElementById('tinderSwipeBadge');
      const state={label:badge.textContent,shown:badge.classList.contains('tdSwipeBadgeShow')};
      card.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:31,button:0,clientX:cx+72,clientY:cy}));
      return state;
    });
    assert(badgeStatus.shown&&badgeStatus.label==='LIKE',
      'Swiping right must reveal the persistent LIKE badge: '+JSON.stringify(badgeStatus));
    const firstCardName=await page.locator('#tinderActiveCard .tdProgrammeName').innerText();
    await page.locator('#tinderYes').click();
    await page.waitForFunction(()=>!document.getElementById('tdMobileUndo')?.disabled,null,{timeout:15000});
    await page.locator('#tdMobileUndo').click();
    await page.waitForFunction(()=>!document.getElementById('tdMobileRedo')?.disabled,null,{timeout:15000});
    assert.equal(await page.locator('#tinderActiveCard .tdProgrammeName').innerText(),firstCardName,
      'Undo must restore the same programme card');
    await page.locator('#tdMobileRedo').click();
    await page.waitForFunction(()=>{
      const data=JSON.parse(localStorage.getItem('oriel-tinder-mode-v1')||'{}');
      return Array.isArray(data.future)&&data.future.length===0&&data.history?.length===1;
    },null,{timeout:15000});
    assert(await page.locator('#tdMobileRedo').isDisabled(),
      'Redo button must disable when the redo stack is empty');

    assert(!errors.some(msg=>/atlasLanguage|i18n|tinderSwipeBadge/i.test(msg)),
      'New language or swipe feature raised a browser error: '+errors.join('; '));
    console.log('PASS: 25-language picker, Greek/Arabic/English switching, contextual Greek selects, typography, mobile swipe layout and feedback');
  } finally {
    await browser.close();
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
