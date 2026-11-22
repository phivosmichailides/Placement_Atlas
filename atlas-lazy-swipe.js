/* Load Swipe Mode's large interaction bundle only when requested.
   The first-paint tab stays clickable; the selected page opens after mount. */
(()=>{
 'use strict';
 const src='tinder-mode.js?v=20261122close1';
 const tab=()=>document.querySelector('nav.tabs [data-tab="tinderMode"]');
 let loading=false,loaded=false,pendingOpen=false,waitCount=0;
 const showWhenReady=()=>{
   if(!pendingOpen)return;
   const page=document.getElementById('tinderMode');
   const button=tab();
   if(page&&button&&!button.disabled){
     pendingOpen=false;waitCount=0;
     button.click();
   }else if(++waitCount<150){
     setTimeout(showWhenReady,100);
   }else{
     pendingOpen=false;
     const button=tab();
     if(button)button.title='Swipe Mode is unavailable. Select again to retry.';
   }
 };
 const load=()=>{
   if(loading||loaded)return;
   loading=true;
   const script=document.createElement('script');
   script.src=src;
   script.async=true;
   script.dataset.atlasLazySwipe='1';
   script.onload=()=>{
     loaded=true;loading=false;
     if(pendingOpen)showWhenReady();
   };
   script.onerror=()=>{
     loading=false;pendingOpen=false;
     const button=tab();
     if(button)button.title='Could not load Swipe Mode. Select again to retry.';
     script.remove();
   };
   document.body.append(script);
 };
 const open=event=>{
   if(document.getElementById('tinderMode'))return;
   // The first-paint tab exists before the Swipe Mode module is loaded.
   // Intercept only this provisional click, then replay after mounting.
   event.preventDefault();
   event.stopImmediatePropagation();
   pendingOpen=true;waitCount=0;
   load();
   if(loaded)showWhenReady();
 };
 const setup=()=>{
   const button=tab();
   if(!button)return;
   button.disabled=false;
   button.removeAttribute('title');
   button.addEventListener('click',open,true);
   if(button.classList.contains('active')){pendingOpen=true;load();}
 };
 document.addEventListener('desk:after-navigation',event=>{
   if(event.detail?.to==='tinderMode'&&!document.getElementById('tinderMode')){
     pendingOpen=true;load();
   }
 });
 document.addEventListener('mouseover',event=>{
   if(event.target.closest('[data-tab="tinderMode"]'))load();
 },{passive:true});
 document.addEventListener('focusin',event=>{
   if(event.target.closest('[data-tab="tinderMode"]'))load();
 });
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});
 else setup();
})();