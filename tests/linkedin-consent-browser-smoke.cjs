'use strict';
/* Isolated Chromium consent-layout + opt-in regression. No real user account. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const target=(process.env.TARGET||'http://127.0.0.1:8000/').replace(/\/$/,'')+'/privacy.html';

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try {
    const desktop=await browser.newContext({viewport:{width:1440,height:900}});
    const page=await desktop.newPage();
    // No third-party LinkedIn request even when the visitor chooses Allow.
    await page.route('https://snap.licdn.com/**',route=>route.abort());
    await page.goto(target,{waitUntil:'domcontentloaded',timeout:60000});
    const notice=page.locator('#atlasCookieNotice');
    await notice.waitFor({state:'visible',timeout:15000});
    const frame=await notice.boundingBox();
    assert(frame&&frame.width<=405&&frame.width>=320,
      'Desktop notice should be a compact card: '+JSON.stringify(frame));
    assert(frame.x>=1000&&frame.x+frame.width<=1441,
      'Consent notice should sit at bottom-right: '+JSON.stringify(frame));
    assert(frame.y+frame.height>=860&&frame.y+frame.height<=901,
      'Consent notice should sit near the viewport bottom: '+JSON.stringify(frame));
    assert.equal(await notice.locator('.atlasCookieActions button').count(),2);
    assert.match(await notice.innerText(),/optional tracking cookies/i);
    assert(!(await page.locator('#atlas-linkedin-insight-script').count()),
      'No tracking script may be injected before opt-in');
    const stacking=await notice.evaluate(el=>Number(getComputedStyle(el).zIndex));
    assert(stacking<5000,'Cookie notice must not sit above the personalisation dialog');

    await notice.locator('.atlasCookieReject').click();
    assert.equal(await notice.count(),0,'Reject must dismiss notice');
    assert(!(await page.locator('#atlas-linkedin-insight-script').count()),
      'Reject must not inject LinkedIn tracking');
    await page.reload({waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#atlasCookieNotice').count(),0,
      'Saved rejection should suppress the prompt on reload');

    await page.evaluate(()=>window.PlacementAtlasMarketing.openSettings());
    await notice.waitFor({state:'visible'});
    assert.match(await notice.innerText(),/Current choice: Rejected/);
    await notice.locator('.atlasCookieAllow').click();
    await page.locator('#atlas-linkedin-insight-script').waitFor({state:'attached',timeout:7000});
    const consent=await page.evaluate(()=>JSON.parse(localStorage.getItem('placement-atlas-marketing-consent-v1')));
    assert.equal(consent.choice,'allow','Allow choice must be saved explicitly');
    await desktop.close();

    const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const mpage=await mobile.newPage();
    await mpage.goto(target,{waitUntil:'domcontentloaded',timeout:60000});
    const mnotice=mpage.locator('#atlasCookieNotice');
    await mnotice.waitFor({state:'visible'});
    const compact=await mnotice.boundingBox();
    assert(compact&&compact.width<=380&&compact.x>=0&&compact.x+compact.width<=391,
      'Mobile privacy notice must fit viewport: '+JSON.stringify(compact));
    assert(compact.height<260,'Mobile notice must remain short: '+JSON.stringify(compact));
    const buttons=await mnotice.locator('.atlasCookieActions button').evaluateAll(items=>items.map(el=>{
      const r=el.getBoundingClientRect();
      return {x:r.x,y:r.y,w:r.width,h:r.height};
    }));
    assert.equal(buttons.length,2);
    assert(Math.abs(buttons[0].y-buttons[1].y)<2,'Mobile Reject and Allow must stay side by side');
    assert(Math.abs(buttons[0].w-buttons[1].w)<2,'Reject and Allow must be equally sized');
    assert.equal(await mpage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,
      'Consent UI must not introduce horizontal scrolling');
    await mobile.close();
    console.log('PASS: compact LinkedIn consent on desktop and mobile; no pre-consent tracking; choices persist.');
  } finally {
    await browser.close();
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
