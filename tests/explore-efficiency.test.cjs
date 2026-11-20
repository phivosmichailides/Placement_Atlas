'use strict';
/* Pure Node regressions for compact Explore layout and removable filter chips.
   No browser account, external service or saved applicant data is accessed. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');

const html=read('index.html'),css=read('explore-efficiency.css'),
  js=read('explore-efficiency.js'),deadline=read('deadline-dates.js'),
  offer=read('offer-journey.js'),nav=read('atlas-navigation.js'),
  sw=read('sw.js'),workspace=read('workspace-ux.js'),app=read('app.js');

test('countdown belongs in the hero and does not leave a full-width spacer',()=>{
  assert.match(deadline,/hero\.append\(statusRow\)/);
  assert.doesNotMatch(deadline,/hero\.insertAdjacentElement\('beforebegin',statusRow\)/);
  assert.match(offer,/const anchor=document\.querySelector\('\.productIntro'\)/);
  assert.match(css,/\.productIntro\.card\{[\s\S]*?display:grid!important/);
  assert.match(css,/#atlasDeadlineRow\{[\s\S]*?grid-column:2/);
  assert.match(css,/@media\(max-width:860px\)/);
});

test('single underlying shortlist and excluded toggles are in the filter sidebar',()=>{
  for(const id of ['uxHideExcludedBtn','uxHideShortlistedBtn']){
    const hits=[...html.matchAll(new RegExp('id="'+id+'"','g'))];
    assert.equal(hits.length,1,'Duplicate button '+id);
    const index=html.indexOf('id="'+id+'"');
    assert.ok(index>html.indexOf('id="uxFilterSidebar"')&&index<html.indexOf('</aside>'));
    assert.ok(index<html.indexOf('id="decision"'),'Toggle should sit immediately after salary/hours');
  }
  assert.match(css,/label\.check:has\(> #hideExcluded\)/);
  assert.match(css,/label\.check:has\(> #hideShortlisted\)/);
  assert.match(workspace,/excludedBtn\.setAttribute\('aria-pressed',String\(!excludedFilter\.checked\)\)/);
  assert.match(workspace,/desk:filters-saved/);
});

test('Undo and Redo stay inside Explore filter sidebar, without repeated reparenting',()=>{
  assert.match(nav,/panel\.id==='explore'\?panel\.querySelector\('#uxFilterSidebar'\)/);
  assert.match(nav,/heading\.nextElementSibling!==history/);
  assert.match(css,/#uxFilterSidebar > \.historyControls/);
});

test('results toolbar has a single authoritative and accessible active filter area',()=>{
  assert.equal([...html.matchAll(/id="atlasActiveFilters"/g)].length,1);
  assert.match(html,/Programme results shown:/);
  assert.match(html,/aria-label="Active filters for programme results and map"/);
  assert.match(css,/#explore:not\(\.uxFiltersCollapsed\) #uxExploreToolbar #uxToolbarFilters/);
  assert.match(css,/#explore\.uxFiltersCollapsed #uxExploreToolbar #uxToolbarFilters/);
  assert.doesNotMatch(js,/localStorage\.setItem/);
});

test('new files and changed scripts are versioned consistently for the PWA',()=>{
  const assets=[
    'explore-efficiency.css?v=20261120hero2',
    'explore-efficiency.js?v=20261120hero1',
    'atlas-navigation.js?v=20261120compacthero2',
    'workspace-ux.js?v=20261120compacthero2',
    'offer-journey.js?v=20261120compacthero1',
    'app.js?v=20261120compacthero1'
  ];
  for(const asset of assets){
    assert.ok(html.includes(asset),'Missing HTML asset: '+asset);
    assert.ok(sw.includes(asset),'Missing PWA asset: '+asset);
  }
  assert.ok(app.includes('deadline-dates.js?v=20261120compacthero1'));
  assert.ok(sw.includes('deadline-dates.js?v=20261120compacthero1'));
});

test('HTML static IDs are unique and active-filter script parses',()=>{
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size,'Duplicate IDs found');
  assert.doesNotThrow(()=>new Function(js));
});

function demo(config={}){
  const values={region:'London',salary:'30000',visa:'yes',hours:'',sector:'',
    decision:'all',search:'',specialistView:'all',...(config.values||{})};
  const flags={hideAvoid:true,hideJustice:true,hideMental:false,
    hideOtherSpecialist:false,hideOuterLondon:false,hideExcluded:false,
    hideShortlisted:true,...(config.flags||{})};
  const calls=[],listeners={},controls={};
  const node=tag=>({
    tagName:tag,children:[],dataset:{},attrs:{},handlers:{},
    append(...items){this.children.push(...items)},
    setAttribute(key,value){this.attrs[key]=value},
    addEventListener(key,fn){this.handlers[key]=fn},
    replaceChildren(...items){this.children=items.flatMap(item=>item.tagName==='fragment'?item.children:[item])}
  });
  const summary=node('div');controls.atlasActiveFilters=summary;
  const setup=(id,fields)=>controls[id]={
    id,...fields,closest:()=>true,dispatchEvent(event){
      calls.push({id,type:event.type});
      for(const listener of listeners[event.type]||[])listener({target:this});
    }
  };
  for(const [id,value] of Object.entries(values))setup(id,{value,checked:false});
  for(const [id,checked] of Object.entries(flags))setup(id,{value:'',checked});
  const quick=new Set(config.quick||[]);
  const quickButtons=[...quick].map(name=>({
    dataset:{q:name},
    isOn:true,
    classList:{contains(v){return v==='on'&&this.owner.isOn},remove(v){if(v==='on')this.owner.isOn=false}},
    click(){this.isOn=!this.isOn;if(this.isOn)quick.add(name);else quick.delete(name)}
  }));
  quickButtons.forEach(b=>b.classList.owner=b);
  const document={
    getElementById:id=>controls[id]||null,
    querySelectorAll:selector=>selector==='#quick .chip[data-q].on'?quickButtons.filter(b=>b.isOn):[],
    querySelector:selector=>{
      const result=selector.match(/#quick \.chip\[data-q="([^"]+)"\]/);
      return result?quickButtons.find(b=>b.dataset.q===result[1])||null:null;
    },
    createDocumentFragment:()=>node('fragment'),
    createElement:node,
    addEventListener:(name,fn)=>{(listeners[name]??=[]).push(fn)}
  };
  const window={addEventListener(){}};
  function Event(type){this.type=type}
  new Function('document','window','requestAnimationFrame','Event','quick',js)(
    document,window,fn=>fn(),Event,quick
  );
  const labels=()=>summary.children.filter(x=>x.tagName==='button')
    .map(x=>x.children[0].textContent);
  const remove=key=>{
    const chip=summary.children.find(x=>x.dataset?.filterKey===key);
    assert.ok(chip,'Missing removable '+key);
    chip.handlers.click({preventDefault(){}});
  };
  return {controls,calls,quick,labels,remove};
}

test('filter chips reflect active programme refinements and clear the right controls',()=>{
  const app=demo();
  for(const label of ['London','£30k+','Visa sponsorship only',
    'Avoided areas hidden','Prisons / justice hidden','Shortlisted hidden']){
    assert.ok(app.labels().includes(label),'Missing active filter label: '+label);
  }
  app.remove('salary');
  assert.equal(app.controls.salary.value,'');
  assert.equal(app.calls.at(-1).type,'change');
  assert.ok(!app.labels().includes('£30k+'));
  app.remove('hideJustice');
  assert.equal(app.controls.hideJustice.checked,false);
  assert.ok(!app.labels().includes('Prisons / justice hidden'));
});

test('search removal dispatches input; London removal also clears the quick shortcut',()=>{
  const app=demo({values:{search:'UCLH'},quick:['london']});
  assert.ok(app.labels().includes('Search: UCLH'));
  app.remove('search');
  assert.equal(app.controls.search.value,'');
  assert.ok(app.calls.some(x=>x.id==='search'&&x.type==='input'));
  app.remove('location');
  assert.equal(app.controls.region.value,'');
  assert.equal(app.quick.has('london'),false);
  assert.equal(app.labels().includes('London'),false);
});
