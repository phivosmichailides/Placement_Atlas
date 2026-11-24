'use strict';
/* In-browser session restore, global zoom and non-jumping filters.
   Does not write to the existing Placement Atlas shortlist storage. */
(()=>{
 const $=id=>document.getElementById(id);
 const SESSION='oriel-desk-last-view-v1',COLLAPSE='oriel-desk-sidebar-collapsed-v1',ZOOM='oriel-desk-page-zoom-v1';
 const root=document.documentElement,explorePanel=$('explore'),sidebar=$('uxFilterSidebar');
 const storage={get:(s,k)=>{try{return s.getItem(k)}catch{return null}},set:(s,k,v)=>{try{s.setItem(k,v)}catch{}}};
 const S=window.sessionStorage,L=window.localStorage;
 const ids=['search','sector','region','hours','salary','sort','decision','visa','specialistView'];
 const getTab=()=>document.querySelector('.tab.active')?.dataset.tab||'explore';
 let lastTab=getTab(),restoreDone=false,restoreInProgress=false;
 // Filters start open on every screen; returning visitors can keep their saved choice.
 let collapsed=storage.get(L,COLLAPSE)==='1';
 // Start compact on laptop/desktop, while retaining a visitor's saved choice.
 // Touch/narrow screens keep native-size controls for accessibility.
 const recommendedZoom=()=>{
   const desktop=window.matchMedia?.('(min-width:950px) and (hover:hover) and (pointer:fine)').matches;
   return desktop?(window.innerWidth<=1600?70:80):100;
 };
 const savedZoom=storage.get(L,ZOOM);
 let userChoseZoom=savedZoom!==null;
 let zoom=userChoseZoom?Number(savedZoom):recommendedZoom();
 if(!Number.isFinite(zoom)||zoom<70||zoom>130){
   zoom=recommendedZoom();userChoseZoom=false;
 }
 function currentFilters(){const fields={};ids.forEach(id=>fields[id]=$(id)?.value??'');return {fields,quick:typeof quick!=='undefined'?[...quick]:[],hideAvoid:!!$('hideAvoid')?.checked,hideExcluded:!!$('hideExcluded')?.checked,hideOuterLondon:!!$('hideOuterLondon')?.checked,hideShortlisted:!!$('hideShortlisted')?.checked,hideJustice:!!$('hideJustice')?.checked,hideMental:!!$('hideMental')?.checked,hideOtherSpecialist:!!$('hideOtherSpecialist')?.checked}}
 const getSaved=()=>{try{const v=JSON.parse(storage.get(S,SESSION)||'null');return v&&v.version===1?v:null}catch{return null}};
 function snapshot(position=true){
   if(restoreInProgress)return;
   const current=getSaved()||{};
   const tab=getTab();
   const positions={...(current.positions||{})};
   if(position)positions[tab]=Math.max(0,Math.round(window.scrollY||0));
   storage.set(S,SESSION,JSON.stringify({version:1,tab,positions,filters:currentFilters(),explorePage:window.uxGetExplorePage?.()||1,savedAt:Date.now()}));
 }
 function applyZoom(next,manual=false){
   if(manual)userChoseZoom=true;
   zoom=Math.max(70,Math.min(130,Math.round(next/5)*5));
   root.style.setProperty('--ux-page-zoom',String(zoom/100));
   const inverse=100/zoom;
   root.style.setProperty('--ux-shell-width',(inverse*100)+'%');
   // CSS zoom changes the percentage containing block in Chromium. Use exact
   // viewport pixels for Swipe Mode's full-width shell, with small gutters.
   root.style.setProperty('--ux-viewport-compensated-width',
     (Math.max(320,window.innerWidth-32)*inverse)+'px');
   root.style.setProperty('--ux-shell-max-width',(1540*inverse)+'px');
   if($('uxPageZoomValue'))$('uxPageZoomValue').textContent=zoom+'%';
   if($('uxPageZoomIn'))$('uxPageZoomIn').disabled=zoom>=130;
   if($('uxPageZoomOut'))$('uxPageZoomOut').disabled=zoom<=70;
   if(userChoseZoom)storage.set(L,ZOOM,String(zoom));
   document.dispatchEvent(new CustomEvent('desk:zoom-change',{detail:{zoom}}));
   requestAnimationFrame(()=>{try{placementMap?.invalidateSize({pan:false,animate:false})}catch{}});
 }
 const adjustScroll=()=>{let y=window.scrollY;requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'})))};
 $('uxPageZoomIn')?.addEventListener('click',()=>{applyZoom(zoom+5,true);adjustScroll()});
 $('uxPageZoomOut')?.addEventListener('click',()=>{applyZoom(zoom-5,true);adjustScroll()});
 $('uxPageZoomReset')?.addEventListener('click',()=>{
   userChoseZoom=false;
   try{L.removeItem(ZOOM)}catch{}
   applyZoom(recommendedZoom());
 });
 applyZoom(zoom);
 // Only automatic zoom follows a window resize; explicit user choices win.
 window.addEventListener('resize',()=>{
   // Always adjust the shell to the actual viewport width. Only the suggested
   // zoom level adapts automatically; visitors retain their chosen zoom.
   root.style.setProperty('--ux-viewport-compensated-width',
     (Math.max(320,window.innerWidth-32)*100/zoom)+'px');
   if(!userChoseZoom){
     const next=recommendedZoom();
     if(next!==zoom)applyZoom(next);
   }
 },{passive:true});
 const setCollapsed=(value,save=true)=>{
   collapsed=!!value;explorePanel?.classList.toggle('uxFiltersCollapsed',collapsed);
   const b=$('uxCollapseFilters');if(b){b.setAttribute('aria-expanded',String(!collapsed));b.setAttribute('aria-label',collapsed?'Show filter sidebar':'Collapse filter sidebar');b.title=collapsed?'Show filters':'Hide filters'}
   const visible=$('uxToolbarFilters');if(visible){
     visible.setAttribute('aria-expanded',String(!collapsed));
     visible.textContent=collapsed?'☷ Show filters':'☷ Hide filters';
     visible.title=collapsed?'Show the filter sidebar again':'Collapse the filter sidebar';
   }
   if(save)storage.set(L,COLLAPSE,collapsed?'1':'0');
   updateFloating();
   requestAnimationFrame(()=>{try{placementMap?.invalidateSize({pan:false,animate:false})}catch{}});
 };
 $('uxCollapseFilters')?.addEventListener('click',()=>setCollapsed(!collapsed));
 $('uxToolbarFilters')?.addEventListener('click',()=>setCollapsed(!collapsed));
 $('uxOpenFilters')?.addEventListener('click',()=>{
   setCollapsed(!collapsed);$('uxFloatInner').hidden=true;$('uxFloatToggle')?.setAttribute('aria-expanded','false');
   // Toggle without automatically jumping the scroll position.
   updateFloating();
 });
 const dock=$('uxFloatingTools'),dockToggle=$('uxFloatToggle'),dockInner=$('uxFloatInner'),topBtn=$('uxBackTop');
 const closeDock=()=>{if(dockInner)dockInner.hidden=true;dockToggle?.setAttribute('aria-expanded','false')};
 dockToggle?.addEventListener('click',()=>{
   if(!dockInner)return;
   dockInner.hidden=!dockInner.hidden;dockToggle.setAttribute('aria-expanded',String(!dockInner.hidden));
   if(!dockInner.hidden)syncFloating();
 });
 document.addEventListener('click',e=>{if(dock&&!dock.contains(e.target))closeDock()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDock()});
 function syncFloating(){
   const s=$('uxFloatSalary'),t=$('uxFloatSort'),v=$('uxFloatHideShortlisted');
   if(s&&$('salary'))s.value=$('salary').value||'';
   if(t&&$('sort'))t.value=$('sort').value||'fit';
   const resultsSort=$('uxResultsSort');if(resultsSort&&$('sort'))resultsSort.value=$('sort').value||'fit';
   if(v&&$('hideShortlisted'))v.checked=$('hideShortlisted').checked;
 }
 const forward=(from,to)=>{
   const e=$(from),t=$(to);if(!e||!t)return;
   e.addEventListener('change',()=>{
     const oldY=window.scrollY;
     t[e.type==='checkbox'?'checked':'value']=e[e.type==='checkbox'?'checked':'value'];
     t.dispatchEvent(new Event('change',{bubbles:true}));
     requestAnimationFrame(()=>window.scrollTo({top:oldY,behavior:'instant'}));
     snapshot();
   });
 };
 forward('uxFloatSalary','salary');forward('uxFloatSort','sort');forward('uxResultsSort','sort');forward('uxFloatHideShortlisted','hideShortlisted');
 const isExplore=()=>getTab()==='explore';
 // A quick filter shortcut belongs beside the map and cards, not the hero.
 const floatTargets=['placementMap','results'].map(id=>$(id)).filter(Boolean);
 const floatIntersecting=new Set();
 const floatObserver=typeof IntersectionObserver!=='undefined'
   ?new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting)floatIntersecting.add(entry.target);
       else floatIntersecting.delete(entry.target);
     });
     updateFloating();
   },{rootMargin:'-48px 0px -80px 0px',threshold:0})
   :null;
 floatTargets.forEach(target=>floatObserver?.observe(target));
 const floatRelevant=()=>{
   if(!$('results')?.querySelector('.placement'))return false;
   if(floatObserver)return floatIntersecting.size>0;
   return floatTargets.some(target=>{
     const rect=target.getBoundingClientRect();
     return rect.height>0&&rect.bottom>48&&rect.top<window.innerHeight-80;
   });
 };
 function updateFloating(){
   const y=window.scrollY||0;
   if(dock){
     const visible=isExplore()&&(collapsed||y>300)&&floatRelevant();
     dock.classList.toggle('uxFloatVisible',visible);
     if(!visible)closeDock();
   }
   const paneToggle=$('uxOpenFilters');if(paneToggle)paneToggle.textContent=collapsed?'☷ Show full sidebar':'☷ Hide full sidebar';
   if(topBtn)topBtn.classList.toggle('uxTopVisible',y>420);
 }
 setCollapsed(collapsed,false);
 // Viewport changes should not silently override the chosen sidebar state.
 // The existing responsive layout stacks filters and content on small screens.
 topBtn?.addEventListener('click',()=>{
   window.scrollTo({top:0,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 let scrollTimer=0;
 window.addEventListener('scroll',()=>{
   updateFloating();
   if(scrollTimer)return;
   scrollTimer=setTimeout(()=>{scrollTimer=0;snapshot()},230);
 },{passive:true});
 ['desk:dataset','desk:cards-ready','desk:ready'].forEach(name=>document.addEventListener(name,updateFloating));
 document.addEventListener('desk:after-navigation',e=>{
   lastTab=e.detail?.to||getTab();updateFloating();
   setTimeout(()=>snapshot(),150);
 });
 document.addEventListener('desk:before-navigation',e=>{lastTab=e.detail?.from||getTab();snapshot()});
 // Capture the scroll position before a filter re-renders the results list.
 let pendingY=null;
 const isFilterTarget=e=>e.target.closest?.('#uxFilterSidebar')||e.target.closest?.('#uxExploreToolbar');
 document.addEventListener('input',e=>{if(isFilterTarget(e)&&e.target.id==='search'){pendingY=window.scrollY;requestAnimationFrame(()=>{if(pendingY!==null){window.scrollTo({top:pendingY,behavior:'instant'});pendingY=null}});snapshot()}},true);
 document.addEventListener('change',e=>{
   if(!isFilterTarget(e))return;
   const y=window.scrollY;
   requestAnimationFrame(()=>requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'instant'});syncFloating();snapshot()}));
 },true);
 document.addEventListener('click',e=>{
   if(!e.target.closest?.('#quick, #resetBtn, #uxHideShortlistedBtn'))return;
   const y=window.scrollY;
   requestAnimationFrame(()=>requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'instant'});syncFloating();snapshot()}));
 },true);
 window.addEventListener('pagehide',()=>snapshot());
 document.addEventListener('desk:filters-saved',()=>snapshot(false));
 // Keep whole-interface colours and map-pin colours adjacent, but independent.
 const arrangePreferenceColours=()=>{
   const settings=document.querySelector('#prefs .settings'),appearance=settings?.querySelector('.uxAppearanceSettings');
   if(!settings||!appearance)return false;
   const mapCard=[...settings.querySelectorAll('.settingsCard')].find(c=>c.querySelector('h2')?.textContent.trim()==='Map colours');
   if(!mapCard)return false;
   mapCard.classList.add('uxMapColourSettings');
   if(mapCard.previousElementSibling!==appearance)appearance.after(mapCard);
   mapCard.querySelector('h2').textContent='🗺 Map pin colours';
   const description=mapCard.querySelector('p.muted');
   if(description)description.textContent='Choose soft, harmonious map-marker colours below. The entire interface theme is selected in the neighbouring box. Use Custom only when you want an exact colour.';
   if(!mapCard.dataset.uxCurated){
     mapCard.dataset.uxCurated='1';
     const sets={
       'Hospital':['#57799c','#6d95b3','#829dbd','#496f95','#80adca','#aac4d5'],
       'General Practice':['#4e8d80','#70a597','#5d8f76','#83a79d','#416e68','#a4c6af'],
       'Community Pharmacy':['#9076a6','#ac93b7','#7c6a9b','#bca7c7','#69578a','#9e87be'],
       'Industry':['#b5895b','#c09b75','#d3b086','#a77554','#deb99a','#8e755e'],
       'Mixed':['#af7187','#cb8da5','#98677c','#cba1ad','#ad8299','#d6b7c1'],
       'Other':['#8c969e','#9ba5ac','#758995','#a9b5b7','#656f76','#c2c3c2']
     };
     const updateOne=(input,palette)=>{
       const chosen=input.value.toLowerCase();
       palette.querySelectorAll('button[data-ux-map-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.uxMapChoice===chosen)));
     };
     mapCard.querySelectorAll('input[data-sector-colour]').forEach(input=>{
       const label=input.closest('.colourChoice');if(!label)return;
       const group=document.createElement('div');group.className='uxMapSwatchOptions';group.setAttribute('role','group');
       const key=input.dataset.sectorColour;
       group.setAttribute('aria-label','Preset colours for '+key);
       (sets[key]||sets.Other).forEach(value=>{
         const b=document.createElement('button');b.type='button';b.dataset.uxMapChoice=value;
         b.className='uxMapSwatch';b.style.setProperty('--ux-map-choice',value);
         b.title=value+' for '+key;b.setAttribute('aria-label','Choose '+value+' for '+key);
         b.setAttribute('aria-pressed','false');
         b.addEventListener('click',()=>{input.value=value;input.dispatchEvent(new Event('change',{bubbles:true}));updateOne(input,group)});
         group.append(b);
       });
       const custom=document.createElement('button');custom.type='button';custom.className='uxMapCustom';
       custom.textContent='Custom';custom.setAttribute('aria-label','Choose custom colour for '+key);
       custom.addEventListener('click',()=>input.click());group.append(custom);
       input.classList.add('uxNativeColourInput');
       label.after(group);
       input.addEventListener('change',()=>updateOne(input,group));
       updateOne(input,group);
     });
     const sync=()=>mapCard.querySelectorAll('input[data-sector-colour]').forEach(input=>{
       const group=input.closest('label')?.nextElementSibling;
       if(group?.classList.contains('uxMapSwatchOptions'))updateOne(input,group);
     });
     document.addEventListener('desk:palette',()=>setTimeout(sync,0));
   }
   return true;
 };
 let colourTries=0;
 const colourTimer=setInterval(()=>{colourTries++;if(arrangePreferenceColours()||colourTries>150)clearInterval(colourTimer)},140);
 // ---- Tab addresses: #/shortlist etc. Back/Forward move between tabs; a link opens the named tab. ----
 const ROUTES={explore:'',foryou:'for-you',shortlist:'shortlist',compare:'compare',simulator:'simulation',tinderMode:'swipe',learn:'learn',prefs:'preferences',outcome:'outcome'};
 const TABS_BY_ROUTE=Object.fromEntries(Object.entries(ROUTES).filter(([,r])=>r).map(([t,r])=>[r,t]));
 const routeTab=()=>{const m=location.hash.match(/^#\/([a-z-]+)\/?$/);return m?TABS_BY_ROUTE[m[1]]||null:null};
 const linkedTab=routeTab();
 let routeReplace=true,routeFromHistory=false;
 const writeRoute=tab=>{
   if(!(tab in ROUTES))return;
   const hash=ROUTES[tab]?'#/'+ROUTES[tab]:'';
   if(hash===(location.hash.startsWith('#/')?location.hash:''))return;
   // Never replace a non-route hash: sign-in, magic-link and password-recovery links carry their tokens there.
   if(location.hash&&!location.hash.startsWith('#/'))return;
   const url=location.pathname+location.search+hash;
   try{routeReplace?history.replaceState(history.state,'',url):history.pushState({atlasTab:tab},'',url)}catch{}
 };
 document.addEventListener('desk:after-navigation',e=>{
   const to=e.detail?.to;
   if(routeFromHistory){routeFromHistory=false;return;}
   writeRoute(to);
 });
 window.addEventListener('popstate',()=>{
   const tab=routeTab()||(location.hash.startsWith('#/')||!location.hash?'explore':null);
   if(!tab||typeof switchTab!=='function'||!document.getElementById(tab))return;
   if(document.querySelector('.tab.active')?.dataset.tab===tab)return;
   routeFromHistory=true;
   try{switchTab(tab)}catch{routeFromHistory=false}
 });
 // ---- Page title per tab and language: "<tab name> · Placement Atlas", using the tab's visible (translated) label.
 const HOME_TITLE=document.title||'Placement Atlas | Independent Oriel Pharmacy Placement Tool';
 const TAB_FALLBACK={foryou:'For You',shortlist:'Shortlist',compare:'Compare',simulator:'Oriel Simulation',tinderMode:'Swipe Mode',learn:'Learning Hub',prefs:'Preferences',outcome:'Offer & outcome'};
 const updateTitle=()=>{
   const tab=document.querySelector('.tab.active')?.dataset.tab||'explore';
   const english=(document.documentElement.lang||'en').startsWith('en');
   if(tab==='explore'){
     const label=document.querySelector('.tab[data-tab="explore"] .atlasTabLabel, .tab[data-tab="explore"] span:last-child')?.textContent?.trim();
     document.title=english||!label?HOME_TITLE:label+' · Placement Atlas';
     return;
   }
   const holder=document.querySelector('.tab[data-tab="'+tab+'"]')||document.querySelector('[data-atlas-subtab="'+tab+'"]');
   const label=(holder?.querySelector('.atlasTabLabel')||holder)?.textContent?.replace(/\s+/g,' ').trim()||TAB_FALLBACK[tab]||'';
   document.title=label?label+' · Placement Atlas':HOME_TITLE;
 };
 document.addEventListener('desk:after-navigation',()=>requestAnimationFrame(updateTitle));
 document.addEventListener('placementatlas:languagechange',()=>requestAnimationFrame(updateTitle));
 let initialRouteDone=false;
 const finishInitialRoute=()=>{
   if(initialRouteDone)return;initialRouteDone=true;
   requestAnimationFrame(updateTitle);
   // A shared link wins over the remembered tab; the startup switch replaces history rather than adding to it.
   const want=linkedTab;
   if(want&&typeof switchTab==='function'&&document.getElementById(want)&&document.querySelector('.tab.active')?.dataset.tab!==want){
     try{switchTab(want)}catch{}
   }else writeRoute(document.querySelector('.tab.active')?.dataset.tab||'explore');
   setTimeout(()=>{routeReplace=false},0);
 };
 const saved=getSaved();
 if(saved&&linkedTab)saved.tab=linkedTab;
 function restore(){
   if(!saved||restoreDone)return;
   if(typeof switchTab!=='function'||!document.querySelector('.tab'))return;
   restoreDone=true;restoreInProgress=true;
   const f=saved.filters||{};
   for(const id of ids){
     const input=$(id);if(input&&f.fields&&typeof f.fields[id]==='string'){
       const option=[...input.options||[]].some(x=>x.value===f.fields[id]);
       if(input.tagName==='SELECT'&&!option)continue;
       input.value=f.fields[id];
     }
   }
   if($('hideAvoid'))$('hideAvoid').checked=!!f.hideAvoid;
   if($('hideExcluded')&&f.hideExcluded!==undefined)$('hideExcluded').checked=!!f.hideExcluded;
   if($('hideOuterLondon')&&f.hideOuterLondon!==undefined)$('hideOuterLondon').checked=!!f.hideOuterLondon;
   if($('hideShortlisted'))$('hideShortlisted').checked=!!f.hideShortlisted;
   for(const id of ['hideJustice','hideMental','hideOtherSpecialist'])if($(id))$(id).checked=f[id]===undefined?true:!!f[id];
   if(Array.isArray(f.quick)&&typeof quick!=='undefined'){
     // Persistent app state is authoritative when it exists. The session
     // snapshot can lag behind a chip click because capture-phase snapshots
     // run before the chip's own click handler.
     const canonicalQuick=!window.__placementDeskWasFresh&&typeof state!=='undefined'&&Array.isArray(state?.filters?.quick)
       ?state.filters.quick:f.quick;
     quick=new Set(canonicalQuick);
     document.querySelectorAll('.chip[data-q]').forEach(x=>x.classList.toggle('on',quick.has(x.dataset.q)));
   }
   try{explore()}catch{}
   try{window.uxSetExplorePage?.(saved.explorePage||1)}catch{}
   try{if(typeof reco==='function')reco()}catch{}
   const available=new Set([...document.querySelectorAll('.panel')].map(x=>x.id));
   const tab=available.has(saved.tab)?saved.tab:'explore';
   try{switchTab(tab)}catch{}
   const y=Math.max(0,Math.min(Number(saved.positions?.[tab])||0,100000));
   setTimeout(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
     window.scrollTo({top:y,behavior:'instant'});
     restoreInProgress=false;snapshot(false);updateFloating();syncFloating();
   })),160);
   finishInitialRoute();
 }
 let tries=0;
 const timer=setInterval(()=>{
   tries++;
   const ready=(typeof placements!=='undefined'&&placements.length>0)&&typeof switchTab==='function';
   if(ready||tries>160){clearInterval(timer);if(saved)restore();finishInitialRoute();}
 },100);
 if(!saved){restoreDone=true;syncFloating();updateFloating()}
})();
