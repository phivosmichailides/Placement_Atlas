'use strict';
/* Placement Atlas · active filters summary.
   This reads canonical filters, never maintains a second filter state. */
(()=>{
  const byId=id=>document.getElementById(id);
  const summary=byId('atlasActiveFilters');
  if(!summary)return;
  const pick=id=>String(byId(id)?.value||'').trim();
  const checked=id=>Boolean(byId(id)?.checked);
  const pounds=value=>{const n=Number(value);return Number.isFinite(n)?'£'+(n/1000).toLocaleString('en-GB',{maximumFractionDigits:1})+'k+':value};
  const quickText={
    london:'London',hospital:'Hospital-led',gp:'GP-heavy',
    hospitalgp:'Hospital + GP',split:'Split placements',industry:'Industry',
    community:'Community',lowcommunity:'Low community',desk:'Desk exposure',
    cv:'Transferable experience',hours:'40h or less',pay:'£30k+ quick filter'
  };
  const setValue=(id,value)=>{
    const control=byId(id);if(!control)return;
    control.value=value;
    control.dispatchEvent(new Event(id==='search'?'input':'change',{bubbles:true}));
  };
  const clearQuick=name=>{
    const button=document.querySelector('#quick .chip[data-q="'+name+'"]');
    if(button?.classList.contains('on'))button.click();
  };
  const clearLondon=()=>{
    // Both the region select and the London quick chip can independently
    // constrain results. Remove both, in one canonical refresh.
    const chip=document.querySelector('#quick .chip[data-q="london"]');
    chip?.classList.remove('on');
    try{if(typeof quick!=='undefined'&&quick instanceof Set)quick.delete('london')}catch{}
    byId('allRegionsBtn')?.classList.add('on');
    setValue('region','');
  };
  const clearCheck=id=>{
    const control=byId(id);if(!control)return;
    control.checked=false;
    control.dispatchEvent(new Event('change',{bubbles:true}));
  };
  const values=()=>{
    const out=[];
    const add=(key,label,remove)=>out.push({key,label,remove});
    const quickButtons=[...document.querySelectorAll('#quick .chip[data-q].on')];
    const quickOn=key=>quickButtons.some(button=>button.dataset.q===key);
    const region=pick('region');
    if(region==='London'||quickOn('london'))add('location',region&&region!=='London'?region:'London',clearLondon);
    else if(region)add('location',region,()=>setValue('region',''));
    const sector=pick('sector');if(sector)add('sector',sector,()=>setValue('sector',''));
    const salary=pick('salary');if(salary)add('salary',pounds(salary),()=>setValue('salary',''));
    const hours=pick('hours');if(hours)add('hours','≤'+hours+'h/week',()=>setValue('hours',''));
    const visa=pick('visa');
    const visaLabels={yes:'Visa sponsorship only',no:'No sponsorship',unknown:'Sponsorship unconfirmed'};
    if(visa)add('visa',visaLabels[visa]||'Visa: '+visa,()=>setValue('visa',''));
    const decision=pick('decision');
    const decisionLabels={active:'Rejected decisions hidden',shortlist:'Shortlist only',unmarked:'Undecided only',excluded:'Excluded only'};
    if(decision&&decision!=='all')add('decision',decisionLabels[decision]||decision,()=>setValue('decision','all'));
    const search=pick('search');
    if(search)add('search','Search: '+(search.length>27?search.slice(0,26)+'…':search),()=>setValue('search',''));
    const specialist=pick('specialistView');
    if(specialist==='only')add('specialistView','Specialist programmes only',()=>setValue('specialistView','all'));
    const toggles=[
      ['hideAvoid','Avoided areas hidden'],
      ['hideJustice','Prisons / justice hidden'],
      ['hideMental','Mental health hidden'],
      ['hideOtherSpecialist','Specialist centres hidden'],
      ['hideOuterLondon','Outer London hidden'],
      ['hideExcluded','Excluded hidden'],
      ['hideShortlisted','Shortlisted hidden']
    ];
    for(const [id,label] of toggles)if(checked(id))add(id,label,()=>clearCheck(id));
    for(const b of quickButtons){
      const name=b.dataset.q;
      if(name==='london')continue;
      if(quickText[name])add('quick:'+name,quickText[name],()=>clearQuick(name));
    }
    return out;
  };
  let pending=false;
  const render=()=>{
    pending=false;
    const active=values();
    const fragment=document.createDocumentFragment();
    if(!active.length){
      const empty=document.createElement('span');empty.className='atlasNoFilters';
      empty.textContent='All programmes · no filters applied';
      fragment.append(empty);
    }else{
      for(const entry of active){
        const button=document.createElement('button');
        button.type='button';button.className='atlasFilterChip';
        button.dataset.filterKey=entry.key;
        button.title='Remove '+entry.label+' filter';
        button.setAttribute('aria-label','Remove filter: '+entry.label);
        const name=document.createElement('span');name.textContent=entry.label;
        const close=document.createElement('span');close.className='atlasFilterRemove';
        close.textContent='×';close.setAttribute('aria-hidden','true');
        button.append(name,close);
        button.addEventListener('click',event=>{
          event.preventDefault();
          entry.remove();
          schedule();
        });
        fragment.append(button);
      }
    }
    summary.replaceChildren(fragment);
  };
  const schedule=()=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(render);
  };
  for(const name of ['desk:filters-saved','desk:ready','desk:after-navigation',
    'desk:dataset','desk:state-saved','desk:geo-blacklist-changed']){
    document.addEventListener(name,schedule);
  }
  document.addEventListener('input',event=>{
    if(event.target?.id==='search')schedule();
  });
  document.addEventListener('change',event=>{
    if(event.target?.closest?.('#uxFilterSidebar,#uxExploreToolbar'))schedule();
  });
  document.addEventListener('click',event=>{
    if(event.target?.closest?.('#quick,#resetBtn,#allRegionsBtn,#uxHideExcludedBtn,#uxHideShortlistedBtn'))schedule();
  });
  window.addEventListener('pageshow',schedule);
  // The browser may restore state after this script initially attaches.
  schedule();
})();
