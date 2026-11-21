'use strict';
/* Navigation repair: no floating selection indicator.
   It used absolute pixel offsets within a horizontally scrolling nav, so after
   scroll, layout changes and deferred tabs it occasionally appeared behind the
   wrong label. The selected button already has an accessible native .active
   appearance in atlas-completion.css. Keep selection attached to the button
   itself; do not create an independent overlay, timer or animation. */
(()=>{
  const nav=document.querySelector('nav.tabs');
  if(!nav)return;
  nav.classList.remove('tabMotionReady');
  nav.querySelectorAll('.atlasTabIndicator').forEach(node=>node.remove());
})();
