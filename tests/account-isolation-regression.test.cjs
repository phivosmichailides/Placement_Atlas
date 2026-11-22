'use strict';
/* Placement Atlas account isolation / neutral-first-visit regression checks.
   These tests use only fixture state, never real applicants or Supabase rows. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const source=name=>fs.readFileSync(path.resolve(__dirname,'..',name),'utf8');
const cloud=source('supabase-cloud.js');
const generic=source('generic-public.js');
const onboarding=source('onboarding.js');
const index=source('index.html');
const sw=source('sw.js');

function cloudDetectors(values={}){
  const start=cloud.indexOf('  const hasChosenProfile=');
  const end=cloud.indexOf('  const setMarker=',start);
  assert.ok(start>=0&&end>start,'Account detection helpers must remain discoverable');
  const block=cloud.slice(start,end);
  const read=key=>Object.prototype.hasOwnProperty.call(values,key)?values[key]:null;
  return new Function('read',block+'\nreturn {hasChosenProfile,meaningfulLocalData};')(read);
}
const neutralWeights={money:3,hospital:3,gp:3,lifestyle:3,location:3,progression:3,independence:3,communityPenalty:2};
const neutralDesk=()=>({prefs:{weights:{...neutralWeights},likes:'',avoids:'',locationLikes:[],locationBlacklist:[],preferredAreasOnly:false},filters:{search:'',sector:'',region:'',sort:'fit',decision:'all',quick:[]},marks:{},compare:[]});

test('fresh session / neutral placeholders are never treated as applicant choices',()=>{
  const values={
    'phivos-desk-v2':JSON.stringify(neutralDesk()),
    'phivos-onboarding-profile-v1':JSON.stringify({region:'',environment:'',priorities:[],salary:'',hours:'',community:''}),
    'phivos-onboarding-v1':'1',
    'placement-atlas-visited-v1':'1'
  };
  const {meaningfulLocalData,hasChosenProfile}=cloudDetectors(values);
  assert.equal(hasChosenProfile(JSON.parse(values['phivos-onboarding-profile-v1'])),false);
  assert.equal(meaningfulLocalData(),false);
});

test('real guest shortlist or selected location is recognised for explicit import',()=>{
  const markDesk=neutralDesk();
  markDesk.marks['TEST-PROGRAMME']={status:'yes',rating:0,note:'',priority:''};
  assert.equal(cloudDetectors({'phivos-desk-v2':JSON.stringify(markDesk)}).meaningfulLocalData(),true);
  const p={region:'London',environment:'',priorities:[],salary:'',hours:'',community:''};
  assert.equal(cloudDetectors({'phivos-onboarding-profile-v1':JSON.stringify(p)}).meaningfulLocalData(),true);
});

test('new account defaults empty and requires an explicit import choice',()=>{
  assert.match(cloud,/id="cloudStartEmpty">Start with an empty workspace/);
  assert.match(cloud,/if\(choice==='empty'\)applyWorkspace\(\{version:VERSION,storage:\{\}\},user\.id,isoNow\(\)\)/);
  assert.match(cloud,/else\{\s*\/\/ Remove neutral boot placeholders[\s\S]*?applyWorkspace\(\{version:VERSION,storage:\{\}\},user\.id,isoNow\(\)\)/);
  assert.match(cloud,/if\(owner&&owner!==user\.id\)[\s\S]*?Never migrate another applicant/);
  assert.match(cloud,/if\(syncActive\)\{window\.location\.reload\(\);return;\}/);
});

test('onboarding does not create false completed quiz for visitors who skip',()=>{
  assert.match(onboarding,/window\.__placementDeskWasFresh!==true/);
  assert.doesNotMatch(onboarding,/if\(!done&&returning\)\{localStorage\.setItem\(DONE_KEY/);
  assert.doesNotMatch(onboarding,/overlay\.remove\(\);previousFocus\?\.focus\(\);try\{localStorage\.setItem\(DONE_KEY/);
  assert.match(onboarding,/6 of 6/);
  assert.doesNotMatch(onboarding,/[1-5] of 5 ·/);
  assert.doesNotMatch(generic,/localStorage\.setItem\(PROFILE_KEY,JSON\.stringify\(\{region:''/);
});

test('reset is complete and persisted, including specialist exclusions',()=>{
  assert.match(generic,/state\.filters=clone\(FILTER_DEFAULTS\)/);
  assert.match(generic,/applySavedFilters\(\)/);
  assert.match(generic,/persistFilters\(\)/);
  assert.match(generic,/pageLimit=36/);
});

test('new-account script versions and PWA assets match to avoid stale logic',()=>{
  const versions={'supabase-cloud.js':'20261120accountaudit1','app.js':'20261122mapstable1',
    'app-base.js':'20261122mapstable1','app-product.js':'20261122mapstable1',
    'generic-public.js':'20261122mapstable1','onboarding.js':'20261121quiz2'};
  for(const [file,bundle] of Object.entries(versions)){
    if(file==='supabase-cloud.js'||file==='app.js')
      assert.ok(index.includes(file+'?v='+bundle),'index cache bust missing: '+file);
    assert.ok(sw.includes(file+'?v='+bundle),'service worker cache bust missing: '+file);
  }
});

test('new app account storage isolation covers independent UI settings',()=>{
  for(const key of ['phivos-desk-v2','oriel-simulator-v1','oriel-tinder-mode-v1','oriel-desk-page-size-v2','oriel-onboarding-applied-quick-v1','placement-atlas-shortlist-display-order-v1']){
    assert.ok(cloud.includes("'"+key+"'"),'Tracked account key missing: '+key);
  }
  assert.match(cloud,/\bKEYS\.forEach\(rawRemove\)/);
});

test('guest recommendations avoid wasteful scoring and private Oriel defaults',()=>{
  const product=source('app-product.js'),core=source('app-base.js');
  const start=product.indexOf('    reco=()=>{');
  const end=product.indexOf('    const fitCurrentMap=',start);
  assert.ok(start>=0&&end>start);
  const rec=product.slice(start,end);
  assert.ok(rec.indexOf('if(!state.prefs.onboarding)')<rec.indexOf('const arr=placements.filter'),
    'Guest recommendations must return before scoring the full catalogue');
  assert.match(product,/let fitStatsCache=/);
  assert.doesNotMatch(core,/2026-10-13-2126/);
  assert.ok(core.includes("ORIEL_SNAPSHOT={version:'public-neutral-20261120'"));
});

test('region selection has only one enhanced full-refresh handler',()=>{
  const core=source('app-base.js'),product=source('app-product.js');
  assert.match(core,/if\(id==='region'&&window\.__atlasRegionEnhanced\)return/);
  assert.match(product,/window\.__atlasRegionEnhanced=true/);
  assert.match(product,/regionEl\.addEventListener\('change'/);
});
