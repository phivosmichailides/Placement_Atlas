'use strict';
/* Real Chromium checks for the Placement Atlas account UI.
   Uses a local in-browser mock, never creates real accounts or sends passwords. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const out='/tmp/oriel-map-theme-smoke';
fs.mkdirSync(out,{recursive:true});
const base=(process.env.TARGET||'http://127.0.0.1:8000/').replace(/\/$/,'')+'/';
const run=async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const errors=[];
 try{
  for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
   const page=await context.newPage();
   page.on('pageerror',e=>errors.push(name+': '+e.message));
   await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>!!window.PlacementAtlasPasswordAuth?.open,null,{timeout:25000});
   await page.evaluate(()=>{
     window.PlacementAtlasTurnstile={
       create:()=>({ready:Promise.resolve(),getToken:async()=>('test-only-token'),reset:()=>{},destroy:()=>{}})
     };
     const client={auth:{
       signInWithPassword:async()=>({error:{message:'Mock sign-in prevented'},data:{session:null}}),
       signUp:async()=>({error:{message:'Mock sign-up prevented'},data:{session:null}}),
       signInWithOAuth:async()=>({error:{message:'Mock OAuth prevented'}}),
       resetPasswordForEmail:async()=>({error:{message:'Mock password reset prevented'}}),
       signInWithOtp:async()=>({error:{message:'Mock email link prevented'}}),
       verifyOtp:async()=>({error:{message:'Mock OTP prevented'}}),
       updateUser:async()=>({error:{message:'Mock recovery prevented'}})
     }};
     window.PlacementAtlasPasswordAuth.open({client,googleClientId:'',redirectUrl:()=>location.origin+'/'});
   });
   const overlay=page.locator('.cloudOverlay[data-atlas-auth="true"]');
   const dialog=page.locator('.cloudPasswordDialog');
   await overlay.waitFor({state:'visible',timeout:15000});
   assert(await dialog.isVisible(),name+': auth dialog must render');
   assert.equal(await dialog.locator('.cloudAuthBrand').innerText(),'Placement Atlas');
   assert.equal(await dialog.locator('.cloudAuthGlobe').count(),2,'Brand and central globe must match');
   assert.equal((await dialog.locator('#cloudDialogTitle').innerText()).trim(),'Sign in to Placement Atlas');
   assert.equal(await dialog.locator('#cloudAuthTabs button[aria-pressed="false"]').innerText(),'Create an account');
   assert(await dialog.locator('#cloudGoogleSignIn').isVisible(),'Existing Google fallback remains available');
   assert(await dialog.locator('#cloudPasswordForm').isVisible());
   const bounds=await page.evaluate(()=>{
     const modal=document.querySelector('.cloudPasswordDialog').getBoundingClientRect();
     return {width:modal.width,left:modal.left,right:modal.right,
       viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
       background:getComputedStyle(document.querySelector('.cloudOverlay')).backgroundColor,
       brand:getComputedStyle(document.querySelector('.cloudAuthEmblem')).color};
   });
   assert(bounds.left>=0&&bounds.right<=width+2,name+': form must fit viewport: '+JSON.stringify(bounds));
   assert(bounds.scrollWidth<=width+3,name+': no horizontal scrolling: '+JSON.stringify(bounds));
   await page.screenshot({path:out+'/placement-atlas-auth-'+name+'-signin.png',fullPage:false});

   await dialog.locator('[data-auth-mode="signup"]').click();
   assert.equal((await dialog.locator('#cloudDialogTitle').innerText()).trim(),'Create your account');
   assert(await dialog.locator('#cloudConfirmWrap').isVisible(),name+': signup requires password confirmation');
   assert(await dialog.locator('#cloudPasswordHelp').isVisible());
   assert.equal(await dialog.locator('#cloudPassword').getAttribute('minlength'),'12');
   assert.equal(await dialog.locator('[data-auth-mode="signin"]').isVisible(),true);
   await page.screenshot({path:out+'/placement-atlas-auth-'+name+'-signup.png',fullPage:false});

   await dialog.locator('#cloudEmail').fill('example@example.com');
   await dialog.locator('#cloudPassword').fill('short');
   await dialog.locator('#cloudConfirmPassword').fill('short');
   await dialog.locator('#cloudPasswordSubmit').click();
   assert(/12 characters/.test(await dialog.locator('#cloudAuthError').innerText()),'Password length validation intact');
   await dialog.locator('#cloudPassword').fill('notarealpassword123');
   await dialog.locator('#cloudConfirmPassword').fill('differentpassword123');
   await dialog.locator('#cloudPasswordSubmit').click();
   assert(/don.t match/.test(await dialog.locator('#cloudAuthError').innerText()),'Password confirmation validation intact');

   await dialog.locator('[data-auth-mode="signin"]').click();
   assert(!await dialog.locator('#cloudConfirmWrap').isVisible(),'Sign-in hides confirmation');
   await dialog.locator('#cloudForgotButton').click();
   assert(await dialog.locator('#cloudForgotForm').isVisible(),'Recovery remains available');
   assert(!await dialog.locator('#cloudGoogleRegion').isVisible(),'Google is hidden in recovery mode');
   await dialog.locator('#cloudBackButton').click();
   await dialog.locator('#cloudLinkButton').click();
   assert(await dialog.locator('#cloudLinkForm').isVisible(),'Magic-link flow remains available');
   await dialog.locator('#cloudBackButton').click();
   await dialog.locator('#cloudPassword').fill('never-a-real-secret');
   await dialog.locator('[data-toggle-password="cloudPassword"]').click();
   assert.equal(await dialog.locator('#cloudPassword').getAttribute('type'),'text','Show password must work');
   await dialog.locator('[data-toggle-password="cloudPassword"]').click();
   assert.equal(await dialog.locator('#cloudPassword').getAttribute('type'),'password','Hide password must work');
   await page.keyboard.press('Escape');
   assert.equal(await overlay.count(),0,'Escape should close modal');

   // Also exercise the *real* account button and lazy-Supabase handoff.
   // The SDK is replaced with a harmless mock before clicking, so this makes
   // no requests to Supabase and never creates an account.
   await page.evaluate(()=>{
     const fake={auth:{
       getSession:async()=>({data:{session:null},error:null}),
       onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})
     }};
     window.supabase={createClient:()=>fake};
   });
   const entry=page.locator('#orielCloudAccount .cloudAccountButton').first();
   await entry.waitFor({state:'visible',timeout:15000});
   assert(/sign in/i.test(await entry.innerText()),'Real account entry must be labelled Sign in');
   await entry.click();
   await overlay.waitFor({state:'visible',timeout:15000});
   assert(await dialog.locator('.cloudAuthBrand').isVisible(),'Real account entry opens branded modal');
   await dialog.locator('.cloudClose').click();
   assert.equal(await overlay.count(),0,'Real account modal must close');
   await context.close();
  }
  // Existing theme selection must style the auth screen without changing the user's choice.
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push('dark: '+e.message));
  await page.addInitScript(()=>localStorage.setItem('oriel-desk-theme-v1','dark'));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!!window.PlacementAtlasPasswordAuth?.open);
  await page.evaluate(()=>{
    window.PlacementAtlasTurnstile={create:()=>({ready:Promise.resolve(),getToken:async()=>'test-only',reset(){},destroy(){}})};
    window.PlacementAtlasPasswordAuth.open({client:{auth:{}},googleClientId:'',redirectUrl:()=>location.origin+'/'});
  });
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  assert(await page.locator('#cloudDialogTitle').isVisible());
  await page.screenshot({path:out+'/placement-atlas-auth-dark.png',fullPage:false});
  await context.close();
  assert.deepEqual(errors,[],'No uncaught browser JavaScript errors');
  console.log('Auth UI passes desktop, mobile, dark mode, signup, password and recovery flow checks.');
 }finally{await browser.close()}
};
run().catch(err=>{console.error(err);process.exitCode=1});
