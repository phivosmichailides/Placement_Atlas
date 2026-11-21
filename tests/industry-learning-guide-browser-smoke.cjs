'use strict';
/* Browser-level coverage for the independent, sourced Learning Hub industry guide. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.TARGET||'http://127.0.0.1:8000/';
(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1280,height:920}});
  const page=await context.newPage();
  const pageErrors=[];
  page.on('pageerror',err=>pageErrors.push(err.message));
  try{
    await page.addInitScript(()=>localStorage.setItem('phivos-onboarding-v1','1'));
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
    const reject=page.locator('#atlasCookieNotice .atlasCookieReject');
    if(await reject.count())await reject.click();
    const tab=page.locator('nav.tabs [data-tab="learn"]');
    await tab.waitFor({state:'visible',timeout:30000});
    await tab.click();
    // On a live connection the app's cloud/data bootstrap may finish after
    // Learning Hub has already appeared in the navigation. Early taps are queued.
    await page.locator('#learn.active').waitFor({state:'visible',timeout:85000});
    assert(await page.locator('#atlasLearnHome .atlasIndustryHubTeaser').isVisible(),
      'The Learning Hub home should prominently feature the new guide');
    for(const id of ['atlasLearnSettings','atlasLearnStructure','atlasLearnRegions','atlasLearnPay','atlasLearnResearch']){
      assert.equal(await page.locator('#'+id).count(),1,'Existing topic was lost: '+id);
    }
    await page.locator('[data-industry-open]').click();
    const section=page.locator('#atlasLearnIndustry');
    await section.waitFor({state:'visible',timeout:15000});
    assert.equal(await section.locator('details.atlasIndustryAnswer').count(),16);
    assert.equal(await section.locator('.atlasIndustryExperienceGrid a').count(),4,
      'The embedded guide must link directly to four verified first-person and careers resources');
    for(const link of await section.locator('.atlasIndustryExperienceGrid a').all()){
      assert.equal(await link.getAttribute('target'),'_blank');
      assert((await link.getAttribute('href')).startsWith('https://'),
        'Reading list should link to verified source pages');
    }
    const answers=section.locator('details.atlasIndustryAnswer');
    await page.locator('[data-industry-expand="all"]').click();
    assert.equal(await answers.evaluateAll(els=>els.filter(el=>el.open).length),16);
    await page.locator('[data-industry-expand="none"]').click();
    assert.equal(await answers.evaluateAll(els=>els.filter(el=>el.open).length),0);
    await answers.nth(6).locator('summary').click();
    assert.equal(await answers.nth(6).evaluate(el=>el.open),true);
    assert(await answers.nth(6).locator('a[href*="abpi.org.uk"]').count()>=1,
      'Drug-safety answer should link to original ABPI guidance');
    await page.locator('#learn .atlasLearnHubNav [data-atlas-learn-view="home"]').click();
    assert(await page.locator('#atlasLearnHome .atlasIndustryHubTeaser').isVisible(),
      'Navigation back to Learning Hub home must remain functional');
    await page.goto(new URL('/industry-foundation-training.html',base).href,
      {waitUntil:'domcontentloaded',timeout:30000});
    assert.match(await page.title(),/Industry, hospital and community split/);
    assert.equal(await page.locator('article details.atlasIndustryAnswer').count(),16);
    assert.equal(await page.locator('article .atlasIndustryExperienceGrid a').count(),4,
      'Public, searchable guide should expose the same first-hand links');
    assert.equal(await page.locator('.atlasIndustrySectionIndex li').count(),16);
    assert(await page.locator('article .atlasIndustryCitations a').count()>=30);
    await page.setViewportSize({width:390,height:844});
    const measure=await page.evaluate(()=>({
      viewport:window.innerWidth,
      document:document.documentElement.scrollWidth,
      question:document.querySelector('.atlasIndustryAnswer summary')?.getBoundingClientRect().width
    }));
    assert(measure.document<=measure.viewport+2,
      'Public article must not overflow narrow mobile screens: '+JSON.stringify(measure));
    await page.locator('article details.atlasIndustryAnswer').nth(1).locator('summary').click();
    assert(await page.locator('article details.atlasIndustryAnswer').nth(1).evaluate(el=>el.open),
      'The stand-alone accordion must be interactive without JavaScript');
    assert.deepEqual(pageErrors.filter(x=>/learn|industry/i.test(x)),[],
      'Industry guide must not cause script errors');
    console.log('PASS: Learning Hub home, long guide, 16 sourced answers, reveal/close, preserved sections and mobile static article');
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
