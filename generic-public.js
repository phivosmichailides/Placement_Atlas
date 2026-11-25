'use strict';
(()=>{
  const KEY='phivos-desk-v2';
  const DATAKEY='phivos-desk-csv-v2';
  const DONE_KEY='phivos-onboarding-v1';
  const PROFILE_KEY='phivos-onboarding-profile-v1';
  const OLD_LIKES='London Bridge, Southwark, Borough, Waterloo, Holborn, Bloomsbury, Clerkenwell, Angel, Islington, Shoreditch, Camden, Fitzrovia, Westminster, Vauxhall, Battersea, Kensington, Chelsea, Hammersmith, Fulham, Ealing, Wembley';
  const OLD_AVOIDS='Croydon, Barnet, Wood Green, Morden, New Addington, Romford, Dagenham, Enfield, Lewisham';

  const readJSON=(k)=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
  const has=(k)=>{try{return !!localStorage.getItem(k)}catch{return false}};

  const ready=()=>{
    try{return typeof state!=='undefined'&&typeof placements!=='undefined'&&placements.length&&typeof renderAll==='function'&&document.getElementById('decision')&&document.getElementById('region');}catch{return false;}
  };

  const install=()=>{
    if(window.__genericPublicInstalled)return true;
    if(!ready())return false;
    window.__genericPublicInstalled=true;

    const profile=state.prefs.onboarding||readJSON(PROFILE_KEY);
    const hasChosenProfile=p=>!!p&&typeof p==='object'&&(
      ['region','environment','salary','hours','community','homePostcode'].some(k=>String(p[k]||'').trim()!=='')||
      (Array.isArray(p.priorities)&&p.priorities.length>0)||['prefer','require'].includes(p.visaPriority)
    );
    if(profile&&has(DONE_KEY)&&hasChosenProfile(profile))state.prefs.onboarding=profile;
    else if(state.prefs.onboarding&&!hasChosenProfile(state.prefs.onboarding))delete state.prefs.onboarding;
    const onboardingDone=has(DONE_KEY);
    const uploaded=has(DATAKEY);
    const wasFresh=window.__placementDeskWasFresh===true;
    const looksLikeOldPersonalDefaults=state?.prefs?.likes===OLD_LIKES&&state?.prefs?.avoids===OLD_AVOIDS;

    // Migrate the old public build away from Phivos-specific defaults without touching
    // a visitor who has already personalised the desk or uploaded their own Oriel data.
    if((wasFresh||(!onboardingDone&&!uploaded&&looksLikeOldPersonalDefaults))&&!profile){
      state.prefs.likes='';
      state.prefs.avoids='';
      state.prefs.weights={money:3,hospital:3,gp:3,lifestyle:3,location:3,progression:3,independence:3,communityPenalty:2};
      state.marks={};
      state.compare=[];
      // Mark the old embedded snapshot as handled so app-base does not re-import it next visit.
      try{if(typeof ORIEL_SNAPSHOT!=='undefined')state.orielSnapshot=ORIEL_SNAPSHOT.version}catch{}
      try{save()}catch{}
      // The onboarding questionnaire already supplies neutral defaults in memory.
      // Do not persist a dummy profile: it looks like a completed personalisation.
    }

    // Public identity: authored by Phivos, but designed for any applicant.
    // The page title is set per tab and language by session-ui.js; keep the descriptive HTML title on Explore.
    const title=document.querySelector('header.top h1');
    if(title)title.textContent='Placement Atlas';
    const topEyebrow=document.querySelector('header.top .brand .eyebrow');
    if(topEyebrow)topEyebrow.textContent='ORIEL 2027/28 · PERSONALISED';
    const topSub=document.querySelector('header.top .brand p');
    if(topSub)topSub.textContent='Explore every included England & Wales programme. Then make the desk yours.';

    // Remove remnants of the creator's own 13 Oct Oriel snapshot from the public UI.
    document.querySelector('#decision option[value="orielNoPreference"]')?.remove();
    const restore=document.getElementById('restoreOrielOrder');
    if(restore)restore.closest('.notice')?.remove();

    // Keep programme IDs useful without showing Phivos's personal saved-Oriel labels.
    const baseCard=card;
    card=(p,compact=false)=>{
      let html=baseCard(p,compact)
        .replace(/ · Saved in Oriel #\d+/g,'')
        .replace(/ · Oriel: No Preference/g,'')
        .replace(/ · Not in saved Oriel export/g,'');
      if(p.orielRank){
        const code=String(p.id).split('/').pop();
        html=html.replace(`Programme ${esc(code)}</span>`,`Programme ${esc(code)} · Your uploaded Oriel rank ${esc(p.orielRank)}</span>`);
      }
      return html;
    };

    // A first visit starts broad. Returning visitors keep the temporary filters
    // they saved in the local workspace; app-base.js has already restored them.
    const preserveSavedFilters=!wasFresh&&(has(KEY)||onboardingDone);
    const region=document.getElementById('region');
    const decision=document.getElementById('decision');
    const salary=document.getElementById('salary');
    const hours=document.getElementById('hours');
    const hideAvoid=document.getElementById('hideAvoid');
    const visa=document.getElementById('visa');
    if(!preserveSavedFilters){
      quick.clear();
      document.querySelectorAll('.chip[data-q]').forEach(x=>x.classList.remove('on'));
      if(region)region.value=profile?.region||'';
      if(decision)decision.value='all';
      if(salary)salary.value=profile?.salary||'';
      if(hours)hours.value=profile?.hours||'';
      if(hideAvoid)hideAvoid.checked=false;
      if(visa)visa.value='';
    }

    const allBtn=document.getElementById('allRegionsBtn');
    if(allBtn)allBtn.classList.toggle('on',!region?.value&&!quick.size);

    // Copy should describe the product, not the creator's personal London search.
    const notice=document.querySelector('.notice');
    if(notice)notice.innerHTML='<b> Start broad, then make it yours.</b><br>You can explore every programme in the England & Wales dataset, or narrow the map by region, setting, pay, hours and your own preferences. Nothing is hidden just because it would not suit the creator.';

    const principles=[...document.querySelectorAll('.productPrinciples>div')];
    if(principles[2])principles[2].innerHTML='<span>03</span><b>Personalise without limiting</b><small>Start with the full dataset, then let each applicant decide what matters to them.</small>';

    const context=document.querySelector('.contextStrip>span:first-child');
    if(context)context.innerHTML='<b>Designed for a cleaner decision:</b> start across all included programmes or choose a region, then compare options using your own criteria, pros/cons, map and ranking tools.';

    document.querySelectorAll('#prefs .settingsCard').forEach(card=>{
      const eye=card.querySelector('.eyebrow');
      if(eye?.textContent.trim()==='LONDON')eye.textContent='LOCATION';
    });

    // Reset should mean "show me the whole product", not "restore Phivos's London view".
    const reset=document.getElementById('resetBtn');
    if(reset)reset.onclick=()=>{
      // Reset every filter, including hidden specialist exclusions, and persist
      // the cleared values so old choices cannot reappear on the next render.
      state.filters=clone(FILTER_DEFAULTS);
      applySavedFilters();
      pageLimit=36;
      persistFilters();
      document.getElementById('allRegionsBtn')?.classList.add('on');
      try{renderAll()}catch{try{explore();stats();reco()}catch{}}
      requestAnimationFrame(()=>{try{placementMap?.invalidateSize({pan:false,animate:false})}catch{}});
    };

    // Keep the All regions chip visually and functionally meaningful.
    allBtn?.addEventListener('click',()=>{
      allBtn.classList.add('on');
      requestAnimationFrame(()=>{try{placementMap?.invalidateSize({pan:false,animate:false})}catch{}});
    });
    region?.addEventListener('change',()=>allBtn?.classList.toggle('on',!region.value&&!quick.size));
    document.getElementById('quick')?.addEventListener('click',()=>requestAnimationFrame(()=>allBtn?.classList.toggle('on',!region?.value&&!quick.size)));
    document.querySelector('[data-q="london"]')?.addEventListener('click',()=>allBtn?.classList.remove('on'));

    if(window.__atlasFirstRenderPending){
      // app-base.js draws the cards right after this, already with the settings above; announce readiness after it.
      document.addEventListener('desk:cards-ready',()=>document.dispatchEvent(new CustomEvent('desk:ready')),{once:true});
    }else{
      try{renderAll()}catch{}
      document.dispatchEvent(new CustomEvent('desk:ready'));
    }

    // Instant map: render the 760 bundled postcode coordinates on first paint.
    // Further lookups are opt-in through "Locate missing", or limited to the chosen region.
    requestAnimationFrame(()=>{try{placementMap?.invalidateSize({pan:false,animate:false})}catch{}});

    return true;
  };

  // Install the moment the catalogue arrives (before the first draw) when this script is already loaded.
  document.addEventListener('desk:catalogue-loaded',()=>{try{install()}catch(error){console.warn('Public defaults will apply after the first draw.',error)}},{once:true});
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(install()||tries>150)clearInterval(timer);
  },80);
})();
