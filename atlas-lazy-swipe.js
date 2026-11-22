/* Swipe Mode is independent of the Explore first paint. Load its 57KB
   interaction module only when needed; keep offline service-worker caching. */
(()=>{
 'use strict';
 const src='tinder-mode.js?v=20261122close1';
 let loading=false,loaded=false;
 const load=()=>{
   if(loading||loaded)return;
   loading=true;
   const script=document.createElement('script');
   script.src=src;
   script.async=true;
   script.dataset.atlasLazySwipe='1';
   script.onload=()=>{loaded=true;loading=false};
   script.onerror=()=>{
     loading=false;
     const panel=document.getElementById('tinderMode');
     if(!panel||panel.querySelector('[data-atlas-swipe-retry]'))return;
     const retry=document.createElement('button');
     retry.type='button';
     retry.className='btn';
     retry.dataset.atlasSwipeRetry='1';
     retry.textContent='Retry loading Swipe Mode';
     retry.addEventListener('click',()=>{retry.remove();load()});
     panel.append(retry);
   };
   document.body.append(script);
 };
 const check=()=>{
   if(document.querySelector('.tab[data-tab="tinderMode"].active')||
      document.getElementById('tinderMode')?.classList.contains('active'))load();
 };
 document.addEventListener('desk:after-navigation',event=>{
   if(event.detail?.to==='tinderMode')load();
 });
 // Prepare the module on direct interaction, even before a delayed tab
 // navigation handler has finished binding.
 document.addEventListener('click',event=>{
   if(event.target.closest('[data-tab="tinderMode"],[data-atlas-welcome="swipe"]'))load();
 },true);
 // Prefetch when someone shows explicit intent by hovering/focusing Swipe.
 document.addEventListener('mouseover',event=>{
   if(event.target.closest('[data-tab="tinderMode"]'))load();
 },{passive:true});
 document.addEventListener('focusin',event=>{
   if(event.target.closest('[data-tab="tinderMode"]'))load();
 });
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',check,{once:true});
 else check();
})();