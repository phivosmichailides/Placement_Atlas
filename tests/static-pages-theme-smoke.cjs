'use strict';
/* Validate the separate reading pages inherit the same appearance and header. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
let browser=null;
(async()=>{
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']});
 const base=(process.env.TARGET||'http://127.0.0.1:8000/').replace(/\/$/,'')+'/';
 const page=await browser.newPage({viewport:{width:1365,height:900}});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'privacy.html',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>localStorage.setItem('oriel-desk-theme-v1','dark'));
 const paths=['privacy.html','terms.html','about.html','guide.html','programme-snapshot.html','industry-foundation-training.html'];
 let expectedWidth=null;
 for(const path of paths){
  console.log('Checking static article: '+path);
  await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('.paDocHeader .paDocBrand').waitFor({state:'visible',timeout:10000});
  const state=await page.evaluate(()=>{
   const header=document.querySelector('.paDocHeader');
   return {
    theme:document.documentElement.dataset.theme,
    bg:getComputedStyle(document.body).backgroundColor,
    width:header.getBoundingClientRect().width,
    nav:!!header.querySelector('nav[aria-label="Site navigation"]'),
    toggle:!!header.querySelector('#paDocTheme'),
    content:!!document.querySelector('main')
   };
  });
  assert.equal(state.theme,'dark',path+' should use the saved dark appearance');
  assert.equal(state.bg,'rgb(15, 16, 17)',path+' should have the dark page background');
  assert(state.nav&&state.toggle&&state.content,path+' should keep navigation and article content');
  if(expectedWidth===null)expectedWidth=state.width;
  assert(Math.abs(state.width-expectedWidth)<3,path+' header should match other reading pages: '+JSON.stringify(state));
 }
 await page.locator('#paDocTheme').click();
 assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Theme toggle should switch to light');
 await page.goto(base+'privacy.html',{waitUntil:'domcontentloaded'});
 assert.equal(await page.locator('html').getAttribute('data-theme'),'light','Reading pages should remember the chosen theme');
 assert(!errors.length,'Reading pages must not throw: '+errors.join(' | '));
 await browser.close();
 console.log('Static reading pages share an accessible header and persistent light/dark mode.');
})().catch(async error=>{console.error(error);try{await browser?.close()}catch{}process.exitCode=1});