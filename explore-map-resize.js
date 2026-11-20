/* Placement Atlas — keep the Explore map sized to its real responsive container. */
'use strict';
(()=>{
  const explore=document.getElementById('explore');
  const map=document.getElementById('placementMap');
  if(!explore||!map)return;
  let frame=0,lastWidth=0,lastHeight=0;
  const refresh=()=>{
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      const rect=map.getBoundingClientRect();
      const width=Math.round(rect.width),height=Math.round(rect.height);
      if(width<80||height<80)return;
      if(width===lastWidth&&height===lastHeight)return;
      lastWidth=width;lastHeight=height;
      try{
        if(typeof placementMap!=='undefined'&&placementMap){
          placementMap.invalidateSize(false);
          window.OrielFitMapToScope?.();
        }
      }catch(error){console.debug('Explore map resize deferred.',error);}
    });
  };
  if('ResizeObserver'in window){
    const observer=new ResizeObserver(refresh);
    observer.observe(map);
    const workspace=explore.querySelector('.workspace');
    if(workspace)observer.observe(workspace);
  }
  const classObserver=new MutationObserver(refresh);
  classObserver.observe(explore,{attributes:true,attributeFilter:['class']});
  document.getElementById('uxToolbarFilters')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(refresh)));
  document.getElementById('uxCollapseFilters')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(refresh)));
  document.querySelectorAll('[data-ux-layout]').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(refresh)));
  window.addEventListener('resize',refresh,{passive:true});
  document.addEventListener('desk:after-navigation',event=>{if(event.detail?.to==='explore')refresh();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});
  else refresh();
})();
