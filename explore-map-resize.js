/* Placement Atlas — keep the Explore map sized to its real responsive container. */
'use strict';
(()=>{
  const explore=document.getElementById('explore');
  const map=document.getElementById('placementMap');
  if(!explore||!map)return;
  let frame=0,lastWidth=0,lastHeight=0;
  const measure=()=>{
    // Leaflet sizes its map in unscaled CSS pixels; getBoundingClientRect()
    // includes the site's 70% page zoom and is not the right measurement.
    const width=map.clientWidth,height=map.clientHeight;
    if(width<80||height<80)return;
    if(width===lastWidth&&height===lastHeight)return;
    lastWidth=width;lastHeight=height;
    try{
      if(typeof placementMap!=='undefined'&&placementMap){
        placementMap.invalidateSize({pan:false,animate:false});
      }
    }catch(error){console.debug('Explore map resize deferred.',error);}
  };
  const refresh=()=>{
    if(frame)return;
    frame=requestAnimationFrame(()=>{frame=0;measure();});
  };
  if('ResizeObserver'in window){
    // Resize callbacks run right after layout, so measuring here is free; a later animation frame often found the page
    // already changed again and forced a fresh layout.
    const observer=new ResizeObserver(()=>{if(frame){cancelAnimationFrame(frame);frame=0;}measure();});
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
  // With ResizeObserver the first observation already measures the map; otherwise measure once the DOM is ready.
  if(!('ResizeObserver'in window)){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});
    else refresh();
  }
})();
