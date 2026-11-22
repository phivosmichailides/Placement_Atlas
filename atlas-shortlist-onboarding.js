/* Contextual shortlist discovery. Never writes to decision storage or ranking. */
(()=>{
 'use strict';
 const panel=document.getElementById('shortlist');
 const list=document.getElementById('shortlistList');
 if(!panel||!list)return;
 const root=document.createElement('section');
 root.id='atlasShortlistWelcome';
 root.hidden=true;
 root.setAttribute('aria-label','Explore programmes to start your shortlist');
 root.innerHTML=`
  <div class="atlasWelcomeIntro">
   <span class="atlasWelcomeKicker">✦ YOUR NEXT MOVE</span>
   <h3>Your shortlist starts with a little curiosity.</h3>
   <p>No saved programmes yet — and that's perfectly fine. Explore a few possibilities, figure out what matters to you, and keep the ones worth comparing. Your actual shortlist will take over this space as soon as you add something.</p>
   <div class="atlasWelcomeMainActions">
    <button type="button" class="atlasWelcomePrimary" data-atlas-welcome="explore">Explore programmes</button>
    <button type="button" class="atlasWelcomeSecondary" data-atlas-welcome="swipe">Try Swipe Mode ♡</button>
   </div>
  </div>
  <div class="atlasWelcomeDivider" aria-hidden="true"></div>
  <div class="atlasWelcomeQuestionLabel">Not sure where to begin? Pick a question.</div>
  <div class="atlasWelcomeChoices">
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="swipe"><span>💘 Could your perfect placement be one swipe away?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="hospitalgp"><span>🏥 Curious about a hospital + GP split?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="salary"><span>💷 What could £32k+ placements offer?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="hours"><span>⏰ Prefer a shorter working week?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="industry"><span>🧪 Have you explored industry placements?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="prefs"><span>✨ What matters most to you?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="learn"><span>📚 What actually happens during training?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="explore"><span>🗺️ Ready to discover somewhere new?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
   <button type="button" class="atlasWelcomePrompt" data-atlas-welcome="simulator"><span>📋 How does Oriel ranking work?</span><span class="atlasWelcomeArrow" aria-hidden="true">↗</span></button>
  </div>
  <p class="atlasWelcomeFootnote">Suggestions use the same programme catalogue, filters and saved decisions as the rest of Placement Atlas.</p>`;
 list.after(root);
 const go=tab=>{
  const button=document.querySelector('.tab[data-tab="'+tab+'"]');
  if(!button||button.disabled)return false;
  button.click();
  return true;
 };
 const setSelect=(id,value)=>{
  const field=document.getElementById(id);
  if(!field)return;
  field.value=value;
  field.dispatchEvent(new Event('change',{bubbles:true}));
 };
 root.addEventListener('click',event=>{
  const action=event.target.closest('button[data-atlas-welcome]')?.dataset.atlasWelcome;
  if(!action)return;
  if(action==='swipe')return void go('tinderMode');
  if(action==='learn')return void go('learn');
  if(action==='prefs')return void go('prefs');
  if(action==='simulator')return void go('simulator');
  if(!go('explore'))return;
  if(action==='salary')setSelect('salary','32000');
  if(action==='hours')setSelect('hours','37.5');
  if(action==='hospitalgp'||action==='industry'){
    const filter=document.querySelector('.chip[data-q="'+action+'"]');
    if(filter&&!filter.classList.contains('on'))filter.click();
  }
 });
 let pending=false,seenReady=false;
 const sync=()=>{
   pending=false;
   const cards=list.querySelectorAll(':scope > .rank-row');
   let count=cards.length;
   // Match the native shortlist source of truth, including account sync.
   try{if(typeof ranked==='function')count=Math.max(count,ranked().length)}catch{}
   const isEmpty=count===0&&(seenReady||!!list.querySelector('.card.empty'));
   panel.classList.toggle('atlasShortlistEmpty',isEmpty);
   root.hidden=!isEmpty;
 };
 const schedule=()=>{if(pending)return;pending=true;requestAnimationFrame(sync)};
 new MutationObserver(schedule).observe(list,{childList:true});
 ['desk:ready','desk:cards-ready','desk:state-saved','desk:dataset','desk:after-navigation','desk:profile-updated'].forEach(name=>{
   document.addEventListener(name,()=>{seenReady=true;schedule()});
 });
 window.addEventListener('load',()=>{seenReady=true;schedule()},{once:true});
 schedule();
})();