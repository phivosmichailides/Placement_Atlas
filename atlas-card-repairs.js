'use strict';
/* Small, per-programme UI enhancements only; does not touch saved decisions,
   data, search, ranking or the existing delegated action handlers. */
(()=>{
  if(new URLSearchParams(location.search).get('atlasClassic')==='1')return;
  const results=document.getElementById('results');
  if(!results)return;
  let queued=false;
  let pending=null;
  const enhance=()=>{
    queued=false;
    for(const card of results.querySelectorAll(':scope > .placement.atlasSampleCard[data-atlas-detail-tabs="1"]')){
      if(card.dataset.atlasCardRepairs==='1')continue;
      const top=card.querySelector(':scope > .placementTop');
      const first=top?.firstElementChild;
      const summary=card.querySelector(':scope > .atlasCompactSummary');
      // Move, never clone: all existing content and its handlers remain intact.
      if(first&&summary){
        first.append(summary);
        card.dataset.atlasCardRepairs='1';
      }
      const fit=card.querySelector('.atlasCardCompactFit');
      const band=fit?.querySelector('small')?.textContent?.trim().toLowerCase();
      if(fit)fit.classList.toggle('atlasFitStrong',band==='strong fit');
    }
    if(pending){
      const {id,wasSelected}=pending;
      const card=Array.from(results.querySelectorAll(':scope > .placement[data-id]'))
        .find(el=>el.dataset.id===id);
      const button=card?.querySelector('[data-action="prefer"]');
      if(button&&card.dataset.atlasDetailTabs==='1'){
        if(!wasSelected&&button.classList.contains('selected')){
          button.classList.add('atlasJustShortlisted');
          button.addEventListener('animationend',()=>button.classList.remove('atlasJustShortlisted'),{once:true});
        }
        pending=null;
      }
    }
  };
  const queue=()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(enhance);
  };
  // A saved decision rerenders multiple cards; associate feedback with the
  // clicked card ID, not the globally selected CSS state.
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('#results .placement[data-id] [data-action="prefer"]');
    if(!button)return;
    const card=button.closest('.placement[data-id]');
    if(!card)return;
    pending={id:card.dataset.id,wasSelected:button.classList.contains('selected')};
    queue();
  },true);
  new MutationObserver(queue).observe(results,{childList:true,subtree:false});
  document.addEventListener('desk:cards-ready',queue);
  document.addEventListener('desk:after-navigation',queue);
  // The async card enhancer may complete after the first ready event.
  setTimeout(queue,220);
  setTimeout(queue,700);
  queue();
})();