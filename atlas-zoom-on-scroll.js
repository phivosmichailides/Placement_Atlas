/* One discreet zoom controller across all Placement Atlas views.
   Page zoom remains owned by session-ui.js; this only controls visibility. */
(()=>{
 'use strict';
 const dock=document.getElementById('uxPageZoomDock');
 if(!dock)return;
 let hideTimer=0;
 let over=false;
 const controls=[...dock.querySelectorAll('button')];
 const hide=()=>{
   window.clearTimeout(hideTimer);
   if(over||dock.matches(':focus-within'))return;
   dock.classList.remove('atlasZoomActive');
   controls.forEach(control=>control.tabIndex=-1);
 };
 const schedule=()=>{
   window.clearTimeout(hideTimer);
   hideTimer=window.setTimeout(hide,2700);
 };
 const show=()=>{
   if(document.body.classList.contains('atlasFooterInView'))return;
   dock.classList.add('atlasZoomActive');
   controls.forEach(control=>control.removeAttribute('tabindex'));
   schedule();
 };
 controls.forEach(control=>control.tabIndex=-1);
 window.addEventListener('scroll',show,{passive:true});
 dock.addEventListener('pointerenter',()=>{over=true;window.clearTimeout(hideTimer)});
 dock.addEventListener('pointerleave',()=>{over=false;schedule()});
 dock.addEventListener('focusin',()=>window.clearTimeout(hideTimer));
 dock.addEventListener('focusout',()=>requestAnimationFrame(schedule));
 dock.addEventListener('click',show);
 document.addEventListener('desk:after-navigation',()=>{over=false;hide()});
 hide();
})();