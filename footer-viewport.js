'use strict';
/* Context-aware floating controls.
   They should never obscure the site footer, regardless of viewport size,
   browser zoom, page zoom, or the currently selected application tab. */
(()=>{
 const footer=document.querySelector('footer.app-footer.atlasFooter');
 if(!footer)return;
 let pending=0;
 const sync=()=>{
   pending=0;
   const rect=footer.getBoundingClientRect();
   // The footer may be taller than a small phone viewport: hide as soon as
   // any part of it is visible; restore the controls above it.
   const touchesFooter=rect.top<window.innerHeight-12&&rect.bottom>12;
   document.body.classList.toggle('atlasFooterInView',touchesFooter);
   // Several older styles explicitly force shortcuts visible with !important.
   // Set a direct control state so no legacy launcher selector can override it.
   for(const id of ['uxPageZoomDock','uxBackTop','uxDrawerLauncher','uxFloatingTools','tdFloatingDecisions']){
     const control=document.getElementById(id);
     if(!control)continue;
     if(touchesFooter)control.setAttribute('data-atlas-footer-hidden','');
     else control.removeAttribute('data-atlas-footer-hidden');
   }
   // Close the quick-filter popover if its launcher just became obscured.
   if(touchesFooter){
     const panel=document.getElementById('uxFloatInner');
     const handle=document.getElementById('uxFloatToggle');
     if(panel&&!panel.hidden)panel.hidden=true;
     handle?.setAttribute('aria-expanded','false');
   }
 };
 const schedule=()=>{
   if(pending)return;
   pending=requestAnimationFrame(sync);
 };
 if('IntersectionObserver' in window){
   // Match the 12px band used by sync(), so entering or leaving the hide zone
   // always crosses a threshold. Ratio thresholds alone can miss small moves
   // and leave the controls stuck hidden after a resize or scroll.
   const observer=new IntersectionObserver(schedule,{rootMargin:'-12px 0px -12px 0px',threshold:[0,0.01,0.25,1]});
   observer.observe(footer);
 }
 // Late layout changes (lazy content, map resize, zoom) can move the footer
 // without any scroll or resize event, so re-check when page size changes.
 if('ResizeObserver' in window)new ResizeObserver(schedule).observe(document.body);
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',sync,{passive:true});
 window.visualViewport?.addEventListener('resize',schedule,{passive:true});
 document.addEventListener('desk:after-navigation',sync);
 document.addEventListener('desk:zoom-change',schedule);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
 sync();
})();
