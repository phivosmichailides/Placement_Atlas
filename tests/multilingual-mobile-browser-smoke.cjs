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
    assert((await page.locator('nav.tabs .tab[data-tab="tinderMode"]').innerText()).includes('Swipe Mode'),
      'Protected Swipe Mode name must remain English');
    await page.locator('#atlasLanguageTrigger').click();
    await page.locator('#atlasLanguageMenu button[data-language="ar"]').click();
    assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
    await page.locator('#atlasLanguageTrigger').click();
    await page.locator('#atlasLanguageMenu button[data-language="en"]').click();
    assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
    assert.equal(await page.locator('html').getAttribute('lang'),'en');

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
    assert(metrics.card.height <= 552,'Card exceeds reasonable phone height: '+JSON.stringify(metrics));
    assert(metrics.actionPosition==='sticky','Actions should stay visible while moving down the page');
    assert(metrics.action.left>=0&&metrics.action.right<=metrics.viewport.width+1,
      'Action buttons are too wide for phone: '+JSON.stringify(metrics));
    assert(metrics.scrollWidth<=metrics.viewport.width+2,
      'Page should not require horizontal zoom: '+JSON.stringify(metrics));
    for(const id of ['tinderUndo','tinderNo','tinderYes','tinderSuper']){
      assert(await page.locator('#'+id).isVisible(),'Missing swipe action '+id);
    }
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
    assert(!errors.some(msg=>/atlasLanguage|i18n|tinderSwipeBadge/i.test(msg)),
      'New language or swipe feature raised a browser error: '+errors.join('; '));
    console.log('PASS: 25-language picker, Greek/Arabic/English switching, protected terminology, mobile swipe layout and feedback');
  } finally {
    await browser.close();
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
