/* Swipe Mode's mobile-first header. Does not alter other tabs or app state. */
(()=>{
'use strict';
const isMobile=()=>matchMedia('(max-width:690px) and (pointer:coarse)').matches;
const isSwipe=()=>document.body.dataset.atlasView==='tinderMode';
let hideTimer=0,lastY=scrollY,lastTouchY=null;
const reveal=()=>{
  document.body.classList.remove('tdMobileHeaderHidden');
  scheduleHide();
};
const hide=()=>{
  if(!isMobile()||!isSwipe())return;
  if(document.querySelector('.atlasLanguageMenu:not([hidden])'))return scheduleHide();
  if(document.querySelector('.shell > header.top:focus-within'))return scheduleHide();
  document.body.classList.add('tdMobileHeaderHidden');
};
const scheduleHide=()=>{
  clearTimeout(hideTimer);
  if(isMobile()&&isSwipe())hideTimer=setTimeout(hide,2100);
};
const sync=()=>{
  clearTimeout(hideTimer);
  if(!isMobile()||!isSwipe()){
    document.body.classList.remove('tdMobileHeaderHidden');
    return;
  }
  lastY=window.scrollY;
  document.body.classList.remove('tdMobileHeaderHidden');
  scheduleHide();
};
const scroll=()=>{
  if(!isMobile()||!isSwipe())return;
  const y=window.scrollY,delta=y-lastY;
  if(delta < -5)reveal();
  else if(delta > 7)hide();
  lastY=y;
};
const touchStart=event=>{
  if(!isMobile()||!isSwipe()||!event.touches?.length)return;
  lastTouchY=event.touches[0].clientY;
};
const touchMove=event=>{
  if(!isMobile()||!isSwipe()||lastTouchY==null||!event.touches?.length)return;
  const y=event.touches[0].clientY;
  const delta=y-lastTouchY;
  // Ignore short horizontal card gestures; vertical movement can reveal menu.
  if(Math.abs(delta)>45){
    const x=event.touches[0].clientX;
    const start=event.target?.getBoundingClientRect?.();
    if(!start||Math.abs(x-(start.left+start.width/2))<9999){
      if(delta>0)reveal(); else hide();
    }
    lastTouchY=y;
  }
};
const init=()=>{
  let button=document.getElementById('tdSwipeHeaderReveal');
  if(!button){
    button=document.createElement('button');
    button.type='button';
    button.id='tdSwipeHeaderReveal';
    button.className='tdSwipeHeaderReveal';
    button.textContent='Menu';
    button.setAttribute('aria-label','Show Placement Atlas navigation');
    document.body.append(button);
  }
  button.addEventListener('click',reveal);
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',sync,{passive:true});
  document.addEventListener('touchstart',touchStart,{passive:true});
  document.addEventListener('touchmove',touchMove,{passive:true});
  document.addEventListener('desk:after-navigation',sync);
  document.addEventListener('placementatlas:languagechange',()=>scheduleHide());
  const bodyObserver=new MutationObserver(records=>{
    if(records.some(r=>r.attributeName==='data-atlas-view'))sync();
  });
  bodyObserver.observe(document.body,{attributes:true,attributeFilter:['data-atlas-view']});
  sync();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();