'use strict';
const $=id=>document.getElementById(id), esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='phivos-desk-v2', DATAKEY='phivos-desk-csv-v2';
const DEFAULT={weights:{money:5,hospital:5,gp:5,lifestyle:4,location:4,progression:5,independence:4,communityPenalty:4},likes:'',avoids:'',locationLikes:[],locationBlacklist:[],locationAllowed:{},preferredAreasOnly:false,visaPriority:'none'};
const FILTER_DEFAULTS={search:'',sector:'',region:'',hours:'',salary:'',sort:'fit',decision:'all',visa:'',hideAvoid:false,hideOuterLondon:false,hideExcluded:false,hideShortlisted:false,hideJustice:false,hideMental:false,hideOtherSpecialist:false,specialistView:'all',quick:[]};
const FILTER_QUICK_KEYS=new Set(['london','hospital','gp','industry','community','hospitalgp','split','lowcommunity','desk','cv','hours','pay']);
const STATUSES=[['','Unmarked'],['love',' Love'],['yes',' Strong yes'],['maybe',' Maybe'],['backup',' Only if needed'],['no',' No'],['never',' Absolutely not']];
const SHORT=new Set(['love','yes','maybe','backup']);
let pageLimit=40;let placements=[],state=loadState(),quick=new Set(state.filters.quick||[]);
function clone(x){return JSON.parse(JSON.stringify(x))}
function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}'),savedPrefs=x.prefs||{},profile=savedPrefs.onboarding||{},profileQuick=[];const environmentQuick={hospital:'hospital',gp:'gp',mixed:'split',industry:'industry',community:'community'}[profile.environment];if(environmentQuick)profileQuick.push(environmentQuick);if(['less','avoid'].includes(profile.community)&&profile.environment!=='community')profileQuick.push('lowcommunity');const filters=x.filters&&typeof x.filters==='object'?{...FILTER_DEFAULTS,...x.filters,quick:Array.isArray(x.filters.quick)?x.filters.quick.filter(key=>FILTER_QUICK_KEYS.has(key)):[]}:{...FILTER_DEFAULTS,region:profile.region||'',salary:profile.salary||'',hours:profile.hours||'',quick:profileQuick};return{prefs:{...clone(DEFAULT),...savedPrefs,weights:{...DEFAULT.weights,...(savedPrefs.weights||{})},locationLikes:Array.isArray(savedPrefs.locationLikes)?savedPrefs.locationLikes:[],locationBlacklist:Array.isArray(savedPrefs.locationBlacklist)?savedPrefs.locationBlacklist:[],locationAllowed:savedPrefs.locationAllowed||{}},filters,marks:x.marks||{},compare:x.compare||[],orielSnapshot:x.orielSnapshot||null}}catch{return{prefs:clone(DEFAULT),filters:clone(FILTER_DEFAULTS),marks:{},compare:[],orielSnapshot:null}}}
const FILTER_VALUE_IDS=['search','sector','region','hours','salary','sort','decision','visa','specialistView'];
const FILTER_CHECK_IDS=['hideAvoid','hideOuterLondon','hideExcluded','hideShortlisted','hideJustice','hideMental','hideOtherSpecialist'];
function applySavedFilters(){const f={...FILTER_DEFAULTS,...(state.filters||{})};FILTER_VALUE_IDS.forEach(id=>{const el=$(id);if(el&&f[id]!==undefined)el.value=String(f[id])});FILTER_CHECK_IDS.forEach(id=>{const el=$(id);if(el)el.checked=!!f[id]});quick=new Set((Array.isArray(f.quick)?f.quick:[]).filter(key=>FILTER_QUICK_KEYS.has(key)));document.querySelectorAll('.chip[data-q]').forEach(el=>el.classList.toggle('on',quick.has(el.dataset.q)));state.filters={...f,quick:[...quick]};}
function persistFilters(){const next={...FILTER_DEFAULTS,quick:[...quick]};FILTER_VALUE_IDS.forEach(id=>{const el=$(id);if(el)next[id]=el.value});FILTER_CHECK_IDS.forEach(id=>{const el=$(id);if(el)next[id]=el.checked});state.filters=next;save();document.dispatchEvent(new CustomEvent('desk:filters-saved'));}
window.OrielSaveFilters=persistFilters;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));document.dispatchEvent(new CustomEvent('desk:state-saved'))}catch{toast('Browser storage is unavailable. Download a backup to keep your choices.')}}function toast(m){const x=$('toast');x.textContent=m;x.classList.add('show');clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove('show'),1800)}function money(v){return Number(String(v??'').replace(/[£,\s]/g,''))||0}
function parseCSV(source){
  // Oriel exports are RFC-4180-style CSV: quoted commas, escaped quotes
  // and newlines inside descriptions must all be preserved.
  // Same state machine as before, but runs of ordinary characters are copied with one slice instead of one array push
  // per character, which made parsing the 4 MB catalogue a large part of the startup work on phones.
  const input=String(source??'').replace(/^\uFEFF/,'');
  const records=[];
  const length=input.length;
  let record=[],field='',quoted=false,index=0,runStart=0;
  const flushRun=end=>{if(end>runStart)field+=input.slice(runStart,end);};
  const finishField=()=>{record.push(field);field='';};
  const finishRecord=()=>{
    finishField();
    if(record.some(value=>value.trim()!==''))records.push(record);
    record=[];
  };
  while(index<length){
    const code=input.charCodeAt(index);
    if(code===34){
      flushRun(index);index++;
      if(quoted&&input.charCodeAt(index)===34){field+='"';index++;}
      else if(quoted){quoted=false;}
      else if(field.length===0){quoted=true;}
      else{field+='"';}
      runStart=index;
    }else if(!quoted&&code===44){
      flushRun(index);index++;
      finishField();
      runStart=index;
    }else if(!quoted&&(code===10||code===13)){
      flushRun(index);index++;
      if(code===13&&input.charCodeAt(index)===10)index++;
      finishRecord();
      runStart=index;
    }else{
      index++;
    }
  }
  flushRun(index);
  if(quoted)throw Error('CSV contains a quoted field without a closing quote');
  if(record.length||field.length)finishRecord();
  return records;
}
function normSetting(s){return String(s||'').trim().replace(/^general practice$/i,'General Practice').replace(/^industry\s*$/i,'Industry')}
function rowsToPlacements(csv){const R=parseCSV(csv);if(R.length<2)throw Error('No placement rows found');const h=R[0].map(x=>x.trim());if(!h.includes('Employer Name')||!h.includes('Programme Title'))throw Error('This does not look like an Oriel preference CSV');return R.slice(1).map((r,i)=>{const o={};h.forEach((k,j)=>o[k]=r[j]??'');const st=[];for(let n=1;n<5;n++){const s=normSetting(o['Setting '+n]),w=Number(o['Length '+n])||0;if(s)st.push([s,w])}const title=String(o['Programme Title']||'').trim();const employer=String(o['Employer Name']||'').trim();let locationText=(title+' '+employer).toUpperCase();locationText=locationText.replace(/\b([A-Z]{1,2})O(?=\s*\d[A-Z]{2}\b)/g,(_,prefix)=>prefix+'0').replace(/\b([A-Z]{1,2}\d[A-Z\d]?)\s*O(?=[A-Z]{2}\b)/g,(_,prefix)=>prefix+' 0');const postcodePattern=/\b[A-Z]{1,2}\s*\d[A-Z\d]?\s*\d[A-Z]{2}\b/g;const pcs=[...locationText.matchAll(postcodePattern)].map(x=>x[0].toUpperCase().replace(/\s+/g,' '));const fullOutcodes=new Set(pcs.map(pc=>(pc.match(/^[A-Z]{1,2}\d[A-Z\d]?/)||[])[0]).filter(Boolean));const candidates=[...locationText.replace(postcodePattern,' ').matchAll(/\b[A-Z]{1,2}\d[A-Z\d]?\b/g)].map(x=>x[0]);let outcodes=[...new Set(candidates.filter(code=>!fullOutcodes.has(code)&&!([...fullOutcodes].some(full=>full.startsWith(code)))))];if(!pcs.length&&!outcodes.length&&/\bWORKSOP\b/.test(locationText))outcodes.push('S80');return{id:String(o['Programme Number']||o.Preference||title||i),employer,title,desc:String(o['Programme Description']||'').trim(),region:String(o.Region||'').trim(),area:String(o['Area(Sector)']||'').trim(),type:String(o['Employer Type']||'Other').trim(),salary:money(o.Salary),hours:Number(o['Hours Per Week'])||0,places:Number(o['Places Available'])||0,provider:String(o['Training Provider']||'').trim(),website:String(o['Employer Website']||'').trim(),visa:/^yes$/i.test(String(o['Skilled worker visa']||'').trim())?true:/^no$/i.test(String(o['Skilled worker visa']||'').trim())?false:/\bSWV\b/i.test(String(o.Preference||''))?true:null,settings:st,postcodes:pcs,outcodes,orielRank:String(o['Current Assigned Rank']||'').trim(),start:String(o['Start Date']||'').trim()}}).filter(x=>x.title||x.employer)}
// The canonical 2026 catalogue is a direct Oriel CSV export supplied by the
// product owner. Public programme data is stored separately from application
// code, and we retain the original Preference identifiers so cloud decisions
// and shortlist priorities continue to match after the data-source switch.
const CATALOGUE_PARTS=Object.freeze([
  'data/oriel-2026.part-01.txt',
  'data/oriel-2026.part-02.txt',
  'data/oriel-2026.part-03.txt',
  'data/oriel-2026.part-04.txt',
  'data/oriel-2026.part-05.txt'
]);
async function loadData(){
  let saved=null;
  try{saved=localStorage.getItem(DATAKEY)}catch{}
  if(saved){
    try{placements=rowsToPlacements(JSON.parse(saved).csv);return;}
    catch(error){
      console.warn('Invalid applicant-provided CSV; reverting to the included catalogue.',error);
      try{localStorage.removeItem(DATAKEY)}catch{}
    }
  }
  try{
    const parts=await Promise.all(CATALOGUE_PARTS.map(async path=>{
      const response=await fetch('./'+path,{cache:'force-cache'});
      if(!response.ok)throw Error('Catalogue part missing: '+path+' ('+response.status+')');
      return response.text();
    }));
    const rows=rowsToPlacements(parts.join(''));
    if(rows.length!==4064)throw Error('Incomplete programme catalogue: '+rows.length+' of 4,064 rows');
    const ids=new Set(rows.map(p=>p.id));
    if(ids.size!==rows.length)throw Error('Programme catalogue contains duplicate identifiers');
    const existingIds=Object.keys(state.marks||{});
    // A stale catalogue must never make all of an applicant's decisions
    // disappear. Fall back to the previously deployed dataset if no IDs match.
    if(existingIds.length>=2&&!existingIds.some(id=>ids.has(id))){
      throw Error('New catalogue identifiers do not match your saved decisions');
    }
    placements=rows;
    document.documentElement.dataset.catalogue='oriel-owner-export-2026';
    return;
  }catch(error){
    console.error('Direct Oriel catalogue could not be loaded.',error);
    throw Error('The public Oriel catalogue is unavailable. Refresh the page or upload your Oriel CSV. Your saved decisions have not been changed.');
  }
}
// text(p) is rebuilt for every programme on every render, and the fit score then searches it for keywords. The text only
// changes when the programme does, so build it once and remember the keyword answers for that exact string.
const TEXT_CACHE=new WeakMap(),TEXT_KEYWORDS=new Map();
function text(p){const sig=(p.title||'').length+'|'+(p.desc||'').length+'|'+p.settings.length;const c=TEXT_CACHE.get(p);if(c&&c.sig===sig)return c.t;
const t=`${p.title} ${p.employer} ${p.desc} ${p.region} ${p.area} ${p.type} ${p.provider} ${p.settings.map(x=>x[0]).join(' ')}`.toLowerCase();
if(c&&c.t!==t)TEXT_KEYWORDS.delete(c.t);
TEXT_CACHE.set(p,{sig,t});if(!TEXT_KEYWORDS.has(t))TEXT_KEYWORDS.set(t,new Map());return t}function weeks(p,s){return p.settings.filter(x=>x[0].toLowerCase().includes(s)).reduce((a,x)=>a+x[1],0)}function has(p,s){return p.settings.some(x=>x[0].toLowerCase().includes(s))||(!p.settings.length&&p.type.toLowerCase().includes(s))}function hourly(p){return p.salary&&p.hours?p.salary/(p.hours*52):0}
function sector(p){const h=weeks(p,'hospital'),g=weeks(p,'general practice'),c=weeks(p,'community'),i=weeks(p,'industry');if(i>=13)return'Industry';if(h>=26)return'Hospital';if(g>=26)return'General Practice';if(c>=26)return'Community Pharmacy';if(has(p,'hospital')&&h)return'Hospital';if(has(p,'general practice')&&g)return'General Practice';return p.type||'Other'}
function split(p){return p.settings.length?p.settings.map(x=>`${x[0]} ${x[1]}w`).join(' · '):'Single setting / not specified'}function tokens(s){return String(s||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean)}
function areaPref(p){const t=`${p.title} ${p.area}`.toLowerCase(),a=tokens(state.prefs.avoids),l=tokens(state.prefs.likes);const areaMatch=x=>(' '+t.replace(/[^a-z0-9]+/g,' ')+' ').includes(' '+x.replace(/[^a-z0-9]+/g,' ')+' ');if(window.OrielGeoBlacklist?.assess(p).kind==='blocked')return-2;if(l.some(areaMatch))return 2;if(p.region.toLowerCase()==='london'){const out=(p.postcodes[0]||'').replace(/\s/g,'').slice(0,-3);if(/^(EC\d[A-Z]?|WC\d[A-Z]?|W1[A-Z]?|SW1[A-Z]?|SE1|N1|E1)$/.test(out))return 2;return 1}return-1}
function any(t,a){const memo=TEXT_KEYWORDS.get(t);if(!memo)return a.some(x=>t.includes(x));const k=a.join('\u0001');let v=memo.get(k);if(v===undefined){v=a.some(x=>t.includes(x));memo.set(k,v)}return v}
function analyse(p){const w=state.prefs.weights,t=text(p);let raw=0,max=0;const good=[],bad=[];const add=(v,k,msg)=>{raw+=v*k;max+=2*k;if(v>0&&msg)good.push(msg)};const h=weeks(p,'hospital'),g=weeks(p,'general practice'),c=weeks(p,'community'),i=weeks(p,'industry');const pay=p.salary>=37000?2:p.salary>=32000?1.4:p.salary>=29000?.8:p.salary>=26000?.2:0;const hr=hourly(p);add(p.salary?(hr?pay*.7+Math.max(0,Math.min(2,(hr-12)/4))*.3:pay):0,w.money,p.salary>=32000?' Strong pay':' Pay signal');if(!p.salary)bad.push('Salary not stated');add(h>=26?2:h>=13?1:0,w.hospital,h>=26?' Major hospital exposure':h>=13?' Hospital rotation':null);add(g>=26?2:g>=13?1:0,w.gp,g>=26?' Major GP exposure':g>=13?' GP rotation':null);const life=p.hours&&p.hours<=35?2:p.hours&&p.hours<=37.5?1.5:p.hours&&p.hours<=40?.7:p.hours>=44?-1.5:0;add(life,w.lifestyle,p.hours&&p.hours<=37.5?` ${p.hours}h week`:null);const loc=areaPref(p);add(loc,w.location,loc===2?' Area matches your preferences':loc===1?' London location':null);let prog=0;if(any(t,['clinical trials','research','medicines information','digital','data','industry','gsk','viatris','glaxosmithkline','pharmacovigilance','regulatory','clinical procurement','academia']))prog+=1.3;if(any(t,['teaching hospital','specialist','tertiary','leadership','quality improvement','audit','cardiology','oncology','paediatrics','renal','neurology']))prog+=.8;add(Math.min(2,prog),w.progression,prog>=1.5?' Excellent CV / transferable exposure':prog>.5?' Strong progression signals':null);let ind=0;if(any(t,['medication review','medicines optimisation','medicines information','audit','quality improvement','repeat prescribing','clinical trial','data','hybrid','remote']))ind+=1.2;if(g>=26||h>=26)ind+=.3;if(any(t,['high-volume','busy retail','retail pharmacy'])&&c>=39)ind-=.7;add(Math.max(-2,Math.min(2,ind)),w.independence,ind>=1?' More independent/desk-work signals':null);max+=w.communityPenalty*2;if(c>=39){raw-=w.communityPenalty*1.2;bad.push(' Mostly community-facing')}else if(c>=26)raw-=w.communityPenalty*.4;if(i>=13){raw+=w.progression*1.7;good.push(' Industry exposure')}if(any(t,['protected study','study time','work from home study']))good.push(' Protected study time mentioned');if(any(t,['monday to friday','no weekend','no weekends']))good.push(' Better schedule wording');if(any(t,['late night','late nights','weekend working','bank holidays'])&&!any(t,['no weekends','no weekend','no bank holidays']))bad.push(' Late/weekend working mentioned');if(p.hours>=44)bad.push(` ${p.hours}h/week`);if(loc===-2)bad.push(' Area you said you would rather avoid');if(p.settings.length>1)good.push(` ${split(p)}`);const visaPreference=state.prefs.visaPriority||'none';if(visaPreference==='prefer'||visaPreference==='require'){const priority=visaPreference==='require'?5:3;raw+=(p.visa===true?2:p.visa===false?-2:-1)*priority;max+=2*priority;}if(p.visa===true)good.unshift('Skilled Worker visa sponsorship advertised');else if(visaPreference==='require')bad.unshift(p.visa===false?'Skilled Worker visa sponsorship not offered':'Skilled Worker visa sponsorship not confirmed');const score=Math.max(0,Math.min(100,Math.round(50+raw/Math.max(1,max)*50)));return{score,band:score>=78?'Strong fit':score>=66?'Worth a look':score>=54?'Mixed fit':'Probably not you',good:[...new Set(good)].slice(0,6),bad:[...new Set(bad)].slice(0,4)}}
// The fit score is pure in the programme, the weights, the visa preference and the area preference, and it is
// recomputed for all 4,064 programmes on every render. Reuse it while none of those inputs change, and hand out copies
// because callers adjust the returned lists.
const analyseUncached=analyse,ANALYSE_CACHE=new WeakMap();
analyse=function analyse(p){const w=state.prefs.weights;
const key=areaPref(p)+'|'+(state.prefs.visaPriority||'none')+'|'+JSON.stringify(w)+'|'+p.salary+'|'+p.hours+'|'+p.visa+'|'+p.settings.length+'|'+(p.desc||'').length+'|'+(p.title||'').length;
const c=ANALYSE_CACHE.get(p);
if(c&&c.key===key)return{score:c.v.score,band:c.v.band,good:c.v.good.slice(),bad:c.v.bad.slice()};
const fresh=analyseUncached(p);
ANALYSE_CACHE.set(p,{key,v:{score:fresh.score,band:fresh.band,good:fresh.good.slice(),bad:fresh.bad.slice()}});
return fresh};
// Public builds never ship or apply the creator's private Oriel ranking.
// Older workspaces retain their own saved marks and priorities unchanged.
const ORIEL_SNAPSHOT={version:'public-neutral-20261120',noPreference:[],codes:[]};
function applyOrielSnapshot(){return;}
function mark(p){return state.marks[p.id]||{status:'',rating:0,note:'',priority:''}}function setMark(p,patch,rerender=true){const wasShort=SHORT.has(mark(p).status);state.marks[p.id]={...mark(p),...patch};const m=state.marks[p.id];if(!m.status&&!m.rating&&!m.note&&!m.priority)delete state.marks[p.id];save();const isShort=SHORT.has(mark(p).status);if(wasShort!==isShort)document.dispatchEvent(new CustomEvent('desk:action',{detail:{name:isShort?'shortlist_added':'shortlist_removed'}}));if(rerender){$('mapSelection').innerHTML='';renderAll()}}
function matches(p){if(!decisionMatches(p))return false;const q=$('search').value.trim().toLowerCase();if(q&&!q.split(/\s+/).filter(Boolean).every(term=>`${p.id} ${text(p)}`.toLowerCase().includes(term)))return false;if($('sector').value&&sector(p)!==$('sector').value)return false;if($('region').value&&p.region!==$('region').value)return false;if($('hours').value&&(!p.hours||p.hours>Number($('hours').value)))return false;if($('salary').value&&p.salary<Number($('salary').value))return false;if(quick.has('london')&&p.region.toLowerCase()!=='london')return false;const sectors=[['hospital','hospital'],['gp','general practice'],['industry','industry']].filter(([k])=>quick.has(k));if(sectors.length&&!sectors.some(([,v])=>has(p,v)))return false;if(quick.has('split')&&p.settings.length<2)return false;if(quick.has('hours')&&(!p.hours||p.hours>40))return false;if(quick.has('pay')&&p.salary<30000)return false;return true}
function sorted(a){
  const mode=$('sort').value;
  if(mode==='fit'){
    // Analyse each programme once, then sort the small scored records.
    // Calling analyse() inside Array.sort's comparator repeats expensive
    // preference and location checks O(n log n) times on the full catalogue.
    const scored=a.map((programme,index)=>({programme,score:analyse(programme).score,index}));
    scored.sort((x,y)=>y.score-x.score||y.programme.salary-x.programme.salary||x.index-y.index);
    return scored.map(item=>item.programme);
  }
  if(mode==='salary')return a.sort((x,y)=>y.salary-x.salary);
  if(mode==='hourly')return a.sort((x,y)=>hourly(y)-hourly(x));
  if(mode==='hours')return a.sort((x,y)=>(x.hours||999)-(y.hours||999));
  return a.sort((x,y)=>x.employer.localeCompare(y.employer));
}
function statusOpts(v){return STATUSES.map(x=>`<option value="${x[0]}" ${x[0]===v?'selected':''}>${x[1]}</option>`).join('')}
function card(p,compact=false){const a=analyse(p),m=mark(p),inComp=state.compare.includes(p.id),h=weeks(p,'hospital'),g=weeks(p,'general practice'),c=weeks(p,'community'),i=weeks(p,'industry'),icon=sector(p)==='Hospital'?'':sector(p)==='General Practice'?'':sector(p)==='Industry'?'':'';const tags=[`Skilled Worker visa: ${p.visa===true?'offered':p.visa===false?'not offered':'not confirmed'}`,p.region&&` ${p.region}`,`${icon} ${sector(p)}`,p.hours&&` ${p.hours}h/week`,p.settings.length>1&&' Split',h&&`Hospital: ${h}w`,g&&`GP: ${g}w`,c&&`Community: ${c}w`,i&&`Industry: ${i}w`].filter(Boolean);return `<article class="placement card" data-id="${esc(p.id)}"><div class="placementTop"><div><div class="eyebrow">${esc(p.postcodes.join(' · ')||p.area||p.region)}</div><h3>${esc(p.title||p.employer)}</h3><div class="employer">${esc(p.employer)}</div></div><div><div class="salary">${p.salary?'£'+p.salary.toLocaleString():'Salary n/a'}</div><div class="hourly">${hourly(p)?'≈ £'+hourly(p).toFixed(2)+'/hr gross':''}</div></div></div><div class="badges">${tags.map(x=>`<span class="badge">${esc(x)}</span>`).join('')}${a.bad.map(x=>`<span class="badge warn">${esc(x)}</span>`).join('')}</div><div class="fit"><div class="score"><span>For you</span><b>${a.score}</b><small>${esc(a.band)}</small></div><div class="why">${(a.good.length?a.good:[' Not enough strong signals either way']).map(x=>`<span class="reason">${esc(x)}</span>`).join('')}</div></div>${compact?'':`<p class="desc">${esc(p.desc||'No programme description supplied.')}</p><button class="more" data-action="more">Read more</button>`}<div class="decision-quick"><button class="btn ${SHORT.has(m.status)?'selected':''}" data-action="prefer">${SHORT.has(m.status)?'Remove from shortlist':'Add to shortlist'}</button><button class="btn ${isExcluded(p)?'excluded':''}" data-action="exclude">${isExcluded(p)?'Excluded — undo':'Exclude'}</button><span class="smallnote">Programme ${esc(p.id.split('/').pop())}${ORIEL_SNAPSHOT.codes.includes(p.id.split('/').pop())?' · Saved in Oriel #'+(ORIEL_SNAPSHOT.codes.indexOf(p.id.split('/').pop())+1):ORIEL_SNAPSHOT.noPreference.includes(p.id.split('/').pop())?' · Oriel: No Preference':''}</span></div><div class="controls"><select aria-label="Placement decision" data-action="status">${statusOpts(m.status)}</select><input class="manualPriority" type="number" min="1" step="1" data-action="priority" inputmode="numeric" value="${esc(m.priority||'')}" placeholder="#" title="Manual priority"><input data-action="note" value="${esc(m.note||'')}" placeholder=" Your note…"><button class="btn compare ${inComp?'on':''}" data-action="compare">${inComp?' Comparing':' Compare'}</button></div></article>`}
function populate(){const sec=[...new Set(placements.map(sector).filter(Boolean))].sort(),reg=[...new Set(placements.map(p=>p.region).filter(Boolean))].sort();$('sector').innerHTML='<option value="">Any</option>'+sec.map(x=>`<option>${esc(x)}</option>`).join('');$('region').innerHTML='<option value="">Any</option>'+reg.map(x=>`<option>${esc(x)}</option>`).join('');applySavedFilters()}
function stats(){const marks=Object.values(state.marks),short=marks.filter(x=>SHORT.has(x.status)).length,london=placements.filter(x=>x.region.toLowerCase()==='london').length,hosp=placements.filter(x=>sector(x)==='Hospital').length,gp=placements.filter(x=>sector(x)==='General Practice').length,max=Math.max(...placements.map(x=>x.salary),0),strong=placements.filter(x=>analyse(x).score>=78).length;const d=[['',short,'Shortlisted'],['',london,'London options'],['',hosp,'Hospital-led'],['',gp,'GP-led'],['',max?'£'+Math.round(max/1000)+'k':'—','Highest salary'],['',strong,'Strong-fit flags']];$('stats').innerHTML=d.map(x=>`<div class="stat"><div class="k">${x[0]} ${x[1]}</div><div class="l">${x[2]}</div></div>`).join('')}
function explore(){if(typeof window.uxWorkspaceRenderExplore==='function'){window.uxWorkspaceRenderExplore();return}const a=sorted(placements.filter(matches));$('count').textContent=`${a.length.toLocaleString()} placements`;const shown=a.slice(0,pageLimit);$('results').innerHTML=shown.length?shown.map(p=>card(p)).join(''):'<div class="card empty">No placements match those filters.</div>';if(a.length>pageLimit)$('results').insertAdjacentHTML('beforeend',`<button class="btn" id="loadMore">Show more (${shown.length} of ${a.length})</button>`);if($('loadMore'))$('loadMore').onclick=()=>{pageLimit+=40;explore()};drawMap(a)}
function reco(){const arr=placements.filter(p=>p.region.toLowerCase()==='london'&&!isExcluded(p)&&(!$('hideAvoid').checked||areaPref(p)!==-2)&&visaMatches(p)).map(p=>({p,a:analyse(p)})).sort((x,y)=>y.a.score-x.a.score||y.p.salary-x.p.salary).slice(0,18);$('reco').innerHTML=arr.map((x,i)=>`<article class="reco card"><div class="eyebrow">#${i+1} TO LOOK AT · ${x.a.score}/100</div><h3>${esc(x.p.title)}</h3><div class="badges"><span class="badge good"> ${esc(x.a.band)}</span><span class="badge"> ${x.p.salary?'£'+x.p.salary.toLocaleString():'n/a'}</span><span class="badge"> ${x.p.hours||'?'}h</span></div><p>${esc(x.a.good.slice(0,4).join(' · ')||'Worth a closer look based on your current preferences.')}</p><button class="btn" data-open="${esc(x.p.id)}">Open in Explore</button></article>`).join('')}
function shortlist(){const a=ranked();$('shortlistList').innerHTML=a.length?a.map((p,i)=>`<div class="rank-row"><div class="rank-controls"><strong>#${i+1}</strong><button class="btn" data-move="up" data-id="${esc(p.id)}" ${i===0?'disabled':''} aria-label="Move up">↑</button><button class="btn" data-move="down" data-id="${esc(p.id)}" ${i===a.length-1?'disabled':''} aria-label="Move down">↓</button></div>${card(p,true)}</div>`).join(''):'<div class="card empty">Nothing shortlisted yet. Mark placements    or  and they’ll appear here.</div>'}
function compare(){const a=state.compare.map(id=>placements.find(p=>p.id===id)).filter(Boolean);if(!a.length){$('compareArea').innerHTML='<div class="card empty">Pick up to five placements from Explore.</div>';return}const rows=[['Salary',p=>p.salary?'£'+p.salary.toLocaleString():'—'],['Est. take-home / month',p=>window.OrielPay?.estimate(p.salary)?window.OrielPay.money(window.OrielPay.estimate(p.salary).monthly):'—'],['Est. take-home / year',p=>window.OrielPay?.estimate(p.salary)?window.OrielPay.money(window.OrielPay.estimate(p.salary).annual):'—'],['Hours',p=>p.hours?p.hours+'h/week':'—'],['Effective hourly',p=>hourly(p)?'£'+hourly(p).toFixed(2):'—'],['Skilled Worker visa sponsorship',p=>p.visa===true?'Advertised as offered':p.visa===false?'Not offered':'Not confirmed'],['Sector',sector],['Split',split],['Hospital weeks',p=>weeks(p,'hospital')||'—'],['GP weeks',p=>weeks(p,'general practice')||'—'],['Community weeks',p=>weeks(p,'community')||'—'],['Industry weeks',p=>weeks(p,'industry')||'—'],['For You',p=>`${analyse(p).score}/100 · ${analyse(p).band}`],['Good signals',p=>analyse(p).good.slice(0,4).join(' · ')||'—'],['Cautions',p=>analyse(p).bad.join(' · ')||'—'],['Your status',p=>STATUSES.find(x=>x[0]===mark(p).status)?.[1]||'Unmarked'],['Manual priority',p=>mark(p).priority||'—']];$('compareArea').innerHTML=`<table class="compareTable"><thead><tr><th>Attribute</th>${a.map(p=>`<th>${esc(p.employer)}<br><span class="smallnote">${esc(p.postcodes[0]||'')}</span></th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><th>${r[0]}</th>${a.map(p=>`<td>${esc(r[1](p))}</td>`).join('')}</tr>`).join('')}</tbody></table>`}
function prefs(){const visaPriorityControl=$('visaPriorityPreference');if(visaPriorityControl)visaPriorityControl.value=state.prefs.visaPriority||'none';const lab={money:'Pay',hospital:'Hospital training',gp:'GP training',lifestyle:'Working hours',location:'Location',progression:'Career development',independence:'Work independence',communityPenalty:'Limit community-heavy training'};$('weights').innerHTML=Object.entries(state.prefs.weights).map(x=>`<div class="weight"><b>${lab[x[0]]}</b><input type="range" min="0" max="5" step="1" value="${x[1]}" data-weight="${x[0]}"><span>${x[1]}</span></div>`).join('');$('likes').value=state.prefs.likes;$('avoids').value=state.prefs.avoids}
function renderAll(){stats();explore();reco();shortlist();compare();prefs()}
function switchTab(id){const previousTab=document.querySelector('.tab.active')?.dataset.tab||'explore';document.dispatchEvent(new CustomEvent('desk:before-navigation',{detail:{from:previousTab,to:id}}));document.dispatchEvent(new CustomEvent('desk:action',{detail:{name:id==='foryou'?'matches_viewed':id==='compare'&&state.compare.length>=2?'comparison_viewed':'navigation'}}));document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id===id));if(id==='shortlist')shortlist();if(id==='compare')compare();if(id==='prefs')prefs();if(id==='foryou')reco();if(id==='explore'){explore();setTimeout(()=>placementMap?.invalidateSize({pan:false,animate:false}),0)}document.dispatchEvent(new CustomEvent('desk:after-navigation',{detail:{from:previousTab,to:id}}))}
function download(name,text,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function exportDecisions(){const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"',rows=[['Programme ID','Priority','Status','Employer','Programme','Region','Postcodes','Salary','Hours','For You','Note']];[...placements].sort((a,b)=>(Number(mark(a).priority)||999999)-(Number(mark(b).priority)||999999)).forEach(p=>{const m=mark(p);if(m.status||m.note||m.priority)rows.push([p.id,m.priority,STATUSES.find(x=>x[0]===m.status)?.[1]||'',p.employer,p.title,p.region,p.postcodes.join('; '),p.salary,p.hours,analyse(p).score,m.note])});download('phivos-oriel-decisions.csv',rows.map(r=>r.map(q).join(',')).join('\n'),'text/csv')}
function backup(){download('phivos-placement-desk-backup.json',JSON.stringify({v:2,exportedAt:new Date().toISOString(),state,uploaded:localStorage.getItem(DATAKEY)?JSON.parse(localStorage.getItem(DATAKEY)):null},null,2),'application/json')}
function bind(){const visaPriorityControl=$('visaPriorityPreference');if(visaPriorityControl)visaPriorityControl.addEventListener('change',()=>{state.prefs.visaPriority=visaPriorityControl.value;if(state.prefs.onboarding)state.prefs.onboarding.visaPriority=visaPriorityControl.value;try{const previous=JSON.parse(localStorage.getItem('phivos-onboarding-profile-v1')||'null');if(previous)localStorage.setItem('phivos-onboarding-profile-v1',JSON.stringify({...previous,visaPriority:visaPriorityControl.value}));}catch{}save();if(visaPriorityControl.value==='require')$('visa').value='yes';persistFilters();renderAll();});document.querySelectorAll('.tab').forEach(x=>x.onclick=()=>switchTab(x.dataset.tab));['search','sector','region','hours','salary','sort','decision','visa','hideAvoid','hideOuterLondon','hideExcluded','hideShortlisted','hideJustice','hideMental','hideOtherSpecialist','specialistView'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',()=>{if(id==='region'&&window.__atlasRegionEnhanced)return;persistFilters();explore()}));$('quick').onclick=e=>{const b=e.target.closest('[data-q]');if(!b)return;quick.has(b.dataset.q)?quick.delete(b.dataset.q):quick.add(b.dataset.q);b.classList.toggle('on');persistFilters();explore()};$('resetBtn').onclick=()=>{$('decision').value='all';$('visa').value='';$('hideAvoid').checked=false;$('hideOuterLondon').checked=false;$('hideExcluded').checked=false;$('hideShortlisted').checked=false;$('hideJustice').checked=false;$('hideMental').checked=false;$('hideOtherSpecialist').checked=false;$('specialistView').value='all';$('search').value='';$('sector').value='';$('region').value='';$('hours').value='';$('salary').value='';$('sort').value='fit';quick=new Set();document.querySelectorAll('.chip[data-q]').forEach(x=>x.classList.remove('on'));persistFilters();explore()};$('uploadBtn').onclick=()=>$('fileInput').click();$('fileInput').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const csv=await f.text();const test=rowsToPlacements(csv);placements=test;localStorage.setItem(DATAKEY,JSON.stringify({csv,name:f.name,date:new Date().toISOString()}));populate();renderAll();document.dispatchEvent(new CustomEvent('desk:dataset'));toast(`Loaded ${placements.length.toLocaleString()} placements`)}catch(err){alert(err.message)}e.target.value=''};$('exportBtn').onclick=exportDecisions;$('backupBtn').onclick=backup;$('savePrefs').onclick=()=>{state.prefs.likes=$('likes').value;state.prefs.avoids=$('avoids').value;save();renderAll();toast('Preferences saved ')};$('clearData').onclick=()=>{if(confirm('Clear your saved Placement Desk data on this browser?')){localStorage.removeItem(KEY);localStorage.removeItem(DATAKEY);localStorage.removeItem('phivos-onboarding-v1');localStorage.removeItem('phivos-onboarding-profile-v1');localStorage.removeItem('oriel-research-v1');sessionStorage.removeItem('phivos-onboarding-skip-session');location.reload()}};$('clearCompare').onclick=()=>{state.compare=[];save();compare();explore()};document.body.addEventListener('input',e=>{if(e.target.dataset.weight){state.prefs.weights[e.target.dataset.weight]=Number(e.target.value);e.target.nextElementSibling.textContent=e.target.value;save()}const c=e.target.closest('.placement');if(!c)return;const p=placements.find(x=>x.id===c.dataset.id);if(!p)return;if(e.target.dataset.action==='note')setMark(p,{note:e.target.value},false);if(e.target.dataset.action==='priority')setMark(p,{priority:e.target.value},false)});document.body.addEventListener('change',e=>{if(e.target.dataset.weight){stats();explore();reco();shortlist();compare();return}const c=e.target.closest('.placement');if(!c)return;const p=placements.find(x=>x.id===c.dataset.id);if(!p)return;if(e.target.dataset.action==='priority'){shortlist();return}if(e.target.dataset.action==='status')setMark(p,{status:e.target.value})});document.body.addEventListener('click',e=>{const move=e.target.closest('[data-move]');if(move){moveRank(move.dataset.id,move.dataset.move);return}const o=e.target.closest('[data-open]');if(o){const p=placements.find(x=>x.id===o.dataset.open);switchTab('explore');$('search').value=p?.id||'';$('sector').value='';$('region').value='';$('hours').value='';$('salary').value='';$('visa').value='';$('decision').value='all';$('hideAvoid').checked=false;$('hideOuterLondon').checked=false;$('hideExcluded').checked=false;$('hideShortlisted').checked=false;$('hideJustice').checked=false;$('hideMental').checked=false;$('hideOtherSpecialist').checked=false;$('specialistView').value='all';quick.clear();document.querySelectorAll('.chip[data-q]').forEach(x=>x.classList.remove('on'));persistFilters();renderAll();document.dispatchEvent(new CustomEvent('desk:action',{detail:{name:'programme_opened'}}));scrollTo({top:0,behavior:'smooth'});return}const c=e.target.closest('.placement');if(!c)return;const p=placements.find(x=>x.id===c.dataset.id);if(!p)return;const a=e.target.closest('[data-action]');if(!a)return;if(a.dataset.action==='prefer'){setMark(p,{status:SHORT.has(mark(p).status)?'':'yes'});return}if(a.dataset.action==='exclude'){setMark(p,{status:isExcluded(p)?'':'no'});return}if(a.dataset.action==='more'){c.classList.toggle('open');a.textContent=c.classList.contains('open')?'Show less':'Read more';return}if(a.dataset.action==='compare'){const i=state.compare.indexOf(p.id);if(i>=0)state.compare.splice(i,1);else if(state.compare.length<5)state.compare.push(p.id);else return toast('Compare up to five placements');save();explore();compare()}})}
let placementMap=null,mapLayer=null,geo={},geoBusy=false,mapTileFailed=false,mapDrawRevision=0;
const pcKey=p=>p.replace(/\s/g,'').toUpperCase();
function isExcluded(p){return ['no','never'].includes(mark(p).status)}
function visaMatches(p){return !$('visa').value||($('visa').value==='yes'?p.visa===true:$('visa').value==='no'?p.visa===false:p.visa===null)}
function decisionMatches(p){
  // Permanent location blacklist applies irrespective of optional Explore filters.
  if(window.OrielGeoBlacklist?.shouldHide(p))return false;
  if($('hideAvoid')?.checked){const avoided=tokens(state.prefs.avoids),placeText=`${p.title} ${p.area} ${p.region}`.toLowerCase().replace(/[^a-z0-9]+/g,' ');if(avoided.some(name=>(' '+placeText+' ').includes(' '+name.toLowerCase().replace(/[^a-z0-9]+/g,' ')+' ')))return false;}
  if(window.OrielSpecialist?.filterOut(p))return false;
  const d=$('decision').value,m=mark(p);
  if($('hideShortlisted')?.checked&&SHORT.has(m.status))return false;
  if(d!=='excluded'&&$('hideExcluded')?.checked&&isExcluded(p))return false;
  if(d==='orielNoPreference'&&!ORIEL_SNAPSHOT.noPreference.includes(p.id.split('/').pop()))return false;
  if((d==='active'&&isExcluded(p))||(d==='shortlist'&&!SHORT.has(m.status))||(d==='unmarked'&&m.status)||(d==='excluded'&&!isExcluded(p)))return false;
  // A programme with even one site in a far-out town is omitted when the
  // applicant explicitly chooses the optional inner-London browsing filter.
  const london=($('region')?.value==='London')||(quick.has('london')&&!$('region')?.value);
  if(london&&$('hideOuterLondon')?.checked&&window.OrielAreaRules?.isOuterTown(p))return false;
  return visaMatches(p);
}
function ranked(){return placements.filter(p=>SHORT.has(mark(p).status)).sort((x,y)=>(Number(mark(x).priority)>0?Number(mark(x).priority):Infinity)-(Number(mark(y).priority)>0?Number(mark(y).priority):Infinity)||analyse(y).score-analyse(x).score||x.id.localeCompare(y.id))}
function moveRank(id,direction){const a=ranked(),i=a.findIndex(p=>p.id===id),j=i+(direction==='up'?-1:1);if(i<0||j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];a.forEach((p,n)=>state.marks[p.id]={...mark(p),priority:n+1});save();shortlist()}
function exportRanked(){const a=ranked();if(!a.length)return toast('Add programmes to your shortlist first.');const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const rows=[['Rank','Programme ID','Programme','Employer','Decision','Salary','Hours','Sponsorship','Note'],...a.map((p,i)=>[i+1,p.id,p.title,p.employer,mark(p).status,p.salary,p.hours,p.visa===null?'Unknown':p.visa?'Yes':'No',mark(p).note])];download('phivos-ranked-shortlist.csv',rows.map(r=>r.map(q).join(',')).join('\r\n'),'text/csv');document.dispatchEvent(new CustomEvent('desk:action',{detail:{name:'shortlist_exported'}}));toast('Ranked shortlist exported. Transfer your choices into Oriel.')}
async function initMap(){
  const status=$('mapStatus');
  const mapHost=$('placementMap');
  if(typeof L==='undefined'){
    if(status)status.textContent='Map library unavailable. Programme results remain accessible.';
    return;
  }
  // A committed public postcode index makes pin rendering synchronous,
  // independent of a slow/failed request for locations.json.
  geo=Object.assign({},window.ORIEL_BUNDLED_LOCATIONS||{},geo);
  try{
    const cached=JSON.parse(localStorage.getItem('phivos-geo-v1')||'{}');
    if(cached&&typeof cached==='object'&&!Array.isArray(cached))Object.assign(geo,cached);
  }catch{}
  if(!placementMap)createBaseMap();
  // Pins are added only once the catalogue has rendered, exactly as before; until this layer exists drawMap() is a no-op.
  mapLayer=L.layerGroup().addTo(placementMap);
  requestAnimationFrame(()=>placementMap?.invalidateSize({pan:false,animate:false}));
}
// The base map always opens on the same London view and needs nothing from the catalogue, so it is created as soon as
// this script runs. Its tiles then download alongside the catalogue instead of after it (the map is the page's largest
// image). Pins and every data-driven step still happen in initMap() after the first render.
function createBaseMap(){
  if(placementMap||typeof L==='undefined'||!$('placementMap'))return;
  const mapHost=$('placementMap');
  placementMap=L.map('placementMap',{
    zoomControl:false,minZoom:3,maxZoom:19,preferCanvas:true,scrollWheelZoom:false,doubleClickZoom:'center',touchZoom:'center',zoomAnimation:true,fadeAnimation:true,zoomSnap:0.1,zoomDelta:1
  }).setView([51.5074,-.1278],10.4);
  if(mapHost){
    mapHost.dataset.loading='true';
    mapHost.setAttribute('aria-busy','true');
  }
  // No CARTO: its current public tiles can contain an HTTP-200
  // "API KEY REQUIRED" watermark, which does not trigger tileerror.
  // OpenStreetMap's standard tile service requires no API key.
  // Restore a beautifully legible, modern Positron-style map.
  // Underlying markers/filtering remain on Leaflet; fallback never needs an API key.
  if(window.OrielBasemap?.addTo)window.OrielBasemap.addTo(placementMap);
  else L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,attribution:'© OpenStreetMap contributors'
  }).addTo(placementMap);
  const markMapReady=()=>{
    if(!mapHost)return;
    delete mapHost.dataset.loading;
    mapHost.setAttribute('aria-busy','false');
  };
  placementMap.once('load',markMapReady);
  window.setTimeout(markMapReady,2500);
  requestAnimationFrame(()=>placementMap?.invalidateSize({pan:false,animate:false}));
}
function drawMap(list,options={}){
  if(!placementMap||!mapLayer)return;
  const revision=++mapDrawRevision;
  const selection=$('mapSelection');
  if(selection)selection.replaceChildren();
  mapLayer.clearLayers();

  const programmes=Array.isArray(list)?list:[];
  const groups=new Map();
  let located=0;
  for(const p of programmes){
    let found=false;
    const postcodes=new Set((Array.isArray(p.postcodes)?p.postcodes:[]).map(pcKey));
    for(const pc of postcodes){
      const coordinate=geo[pc];
      if(!coordinate)continue;
      found=true;
      const key=coordinate.join(',');
      let group=groups.get(key);
      if(!group){group={c:coordinate,entries:[]};groups.set(key,group);}
      group.entries.push(p);
    }
    if(found)located++;
  }

  const grouped=[...groups.values()];
  const status=$('mapStatus');
  const scopeLabel=options.scopeLabel?' · '+options.scopeLabel:'';
  if(status&&!mapTileFailed)status.textContent='Preparing '+grouped.length.toLocaleString()+' map locations…';
  let cursor=0;
  const drawBatch=()=>{
    if(revision!==mapDrawRevision)return;
    const stop=Math.min(cursor+80,grouped.length);
    for(;cursor<stop;cursor++){
      const {c,entries}=grouped[cursor];
      const preferred=entries.some(p=>SHORT.has(mark(p).status));
      const excluded=entries.every(isExcluded);
      const colour=preferred?'#13795b':excluded?'#b74444':'#4a69bd';
      const pin=L.circleMarker(c,{
        radius:entries.length>1?9:6,
        color:'#fff',weight:2,fillColor:colour,fillOpacity:.95
      }).addTo(mapLayer).bindTooltip(
        entries.length+' programme'+(entries.length===1?'':'s')+' · '+entries[0].postcodes.join(', ')
      );
      const openPin=()=>{
        if(!selection)return;
        selection.innerHTML='<div class="map-selection-head"><b>'+entries.length+' programme'+(entries.length===1?'':'s')+' at this location</b><button class="textbtn" id="closeSelection">Close</button></div>'+sorted([...entries]).map(p=>card(p)).join('');
        const close=$('closeSelection');
        if(close)close.onclick=()=>selection.replaceChildren();
        selection.scrollIntoView({behavior:'smooth',block:'nearest'});
      };
      pin.on('click',openPin);
      // SVG fallbacks still expose focusable marker elements; Canvas mode
      // keeps the primary map lightweight while the programme cards remain
      // the keyboard-accessible route to every result.
      const element=pin.getElement?.();
      if(element){
        element.setAttribute('tabindex','0');
        element.setAttribute('role','button');
        element.setAttribute('aria-label','Show '+entries.length+' programmes at '+entries[0].postcodes.join(', '));
        element.addEventListener('keydown',event=>{
          if(event.key==='Enter'||event.key===' '){event.preventDefault();openPin();}
        });
      }
    }
    if(cursor<grouped.length){requestAnimationFrame(drawBatch);return;}
    if(!mapTileFailed&&status){
      status.textContent=located+' of '+programmes.length+' programmes mapped · '+groups.size+' locations'+(located<programmes.length?' · Unlocated programmes remain in the list':'')+scopeLabel;
    }
  };
  if(grouped.length)requestAnimationFrame(drawBatch);
  else if(!mapTileFailed&&status)status.textContent='0 of '+programmes.length+' programmes mapped · 0 locations'+scopeLabel;
}
async function locateMissing(){if(geoBusy)return;const pcs=[...new Set(placements.filter(matches).flatMap(p=>p.postcodes.map(pcKey)))].filter(pc=>!geo[pc]);if(!pcs.length)return toast('All available postcodes are mapped.');geoBusy=true;$('locateBtn').disabled=true;try{for(let i=0;i<pcs.length;i+=100){$('mapStatus').textContent=`Locating ${Math.min(i+100,pcs.length)} of ${pcs.length} postcodes…`;const r=await fetch('https://api.postcodes.io/postcodes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({postcodes:pcs.slice(i,i+100)}),signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error();const j=await r.json();j.result.forEach(x=>{if(x.result)geo[pcKey(x.query)]=[x.result.latitude,x.result.longitude]})}try{localStorage.setItem('phivos-geo-v1',JSON.stringify(geo))}catch{}drawMap(placements.filter(matches));toast('Locations updated.')}catch{$('mapStatus').textContent='Postcode lookup unavailable. Existing pins and all list results remain usable.'}finally{geoBusy=false;$('locateBtn').disabled=false}}
function validBackup(j){if(!j||j.v!==2||!j.state||typeof j.state.marks!=='object'||Array.isArray(j.state.marks)||!j.state.marks||!Array.isArray(j.state.compare))throw Error('Choose a Placement Atlas v2 backup JSON file.');const allowed=new Set(STATUSES.map(x=>x[0]));for(const m of Object.values(j.state.marks)){if(!m||!allowed.has(m.status||'')||!Number.isFinite(Number(m.rating||0))||Number(m.rating||0)<0||Number(m.rating||0)>5||typeof(m.note||'')!=='string')throw Error('Backup contains invalid decisions.')}if(j.uploaded)rowsToPlacements(j.uploaded.csv);const prefs={...clone(DEFAULT),...j.state.prefs,weights:{...DEFAULT.weights,...j.state.prefs?.weights},locationLikes:Array.isArray(j.state.prefs?.locationLikes)?j.state.prefs.locationLikes:[],locationBlacklist:Array.isArray(j.state.prefs?.locationBlacklist)?j.state.prefs.locationBlacklist:[]};for(const [k,v] of Object.entries(prefs.weights))if(!(k in DEFAULT.weights)||!Number.isFinite(v)||v<0||v>5)throw Error('Backup contains invalid weights.');if(typeof prefs.likes!=='string'||typeof prefs.avoids!=='string')throw Error('Backup contains invalid areas.');if(prefs.onboarding){const p=prefs.onboarding;if(typeof p!=='object'||typeof p.region!=='string'||!['hospital','gp','mixed','industry','community','unsure'].includes(p.environment)||!Array.isArray(p.priorities)||p.priorities.length>3||p.priorities.some(x=>!['money','lifestyle','progression','location','independence','clinical'].includes(x))||!['','26000','28000','30000','32000','36000'].includes(p.salary)||!['','35','37.5','40','42.5'].includes(p.hours)||!['happy','some','less','avoid'].includes(p.community))throw Error('Backup contains invalid setup answers.');}if(prefs.mapColours&&(typeof prefs.mapColours!=='object'||Object.values(prefs.mapColours).some(c=>typeof c!=='string'||!/^#[0-9a-f]{6}$/i.test(c))))throw Error('Backup contains invalid map colours.');const filters={...FILTER_DEFAULTS,...(j.state.filters||{}),quick:Array.isArray(j.state.filters?.quick)?j.state.filters.quick.filter(key=>FILTER_QUICK_KEYS.has(key)):[]};return {prefs,filters,marks:j.state.marks,compare:j.state.compare.filter(x=>typeof x==='string').slice(0,5)}}
function bindUpgrade(){
$('exportRanked').onclick=exportRanked;$('fitMap').onclick=()=>{if(!mapLayer||!placementMap)return;if(typeof window.OrielFitMapToScope==='function'&&window.OrielFitMapToScope())return;const pts=mapLayer.getLayers().map(l=>l.getLatLng());if(pts.length)placementMap.fitBounds(L.latLngBounds(pts),{padding:[30,30],maxZoom:14,animate:true});else toast('No mapped results match these filters.')};$('fitMap').insertAdjacentHTML('beforebegin','<button class="btn" id="locateBtn" title="Resolve postcodes for programmes matching your active filters">Locate matching sites</button>');$('locateBtn').onclick=locateMissing;$('restoreBtn').onclick=()=>$('restoreInput').click();$('restoreInput').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text()),next=validBackup(j);if(!confirm('Merge saved decisions from this backup? Matching programme decisions and preferences will use the backup values.'))return;state={...next,marks:{...state.marks,...next.marks}};if(j.uploaded){localStorage.setItem(DATAKEY,JSON.stringify(j.uploaded));placements=rowsToPlacements(j.uploaded.csv);populate()}state.orielSnapshot=ORIEL_SNAPSHOT.version;const profile=state.prefs.onboarding;localStorage.removeItem('phivos-onboarding-profile-v1');localStorage.removeItem('phivos-onboarding-v1');if(profile){localStorage.setItem('phivos-onboarding-profile-v1',JSON.stringify(profile));localStorage.setItem('phivos-onboarding-v1','1')}applySavedFilters();persistFilters();renderAll();document.dispatchEvent(new CustomEvent('desk:palette'));toast('Backup restored.')}catch(err){alert(err.message)}finally{e.target.value=''}};document.body.addEventListener('change',e=>{if(['hideAvoid','visa'].includes(e.target.id))reco()});}

(async()=>{
  try{createBaseMap()}catch(err){console.warn('Base map will be created after the catalogue loads.',err);placementMap=null;}
  try{
    bind();bindUpgrade();
    await loadData();
    populate();
  }catch(err){
    $('results').innerHTML=`<div class="errorBox"><b>Couldn’t load the built-in placement list.</b><br>${esc(err.message)}<br><br>You can still upload your latest Oriel CSV.</div>`;
    $('count').textContent='Data load error';
    console.error('Placement data loading failed',err);
    return;
  }
  // Render the catalogue before the map work so the first useful interaction
  // is available while tiles are still arriving.
  try{
    renderAll();
    document.dispatchEvent(new CustomEvent('desk:cards-ready'));
  }catch(err){
    console.error('Programme rendering failed',err);
    const results=$('results');
    if(results&&!results.querySelector('.placement')){
      results.innerHTML='<div class="errorBox">Programme details could not render. Reload to retry; your saved decisions are unchanged.</div>';
    }
  }
  // Main map is independent of errors in any card enhancement or optional
  // directions/commute feature. Its pin layer is populated once here, after
  // the initial result list has painted.
  try{
    await initMap();
    if(typeof window.OrielRefreshMapScope==='function')window.OrielRefreshMapScope();
    else drawMap(placements.filter(matches).slice(0,36),{scopeLabel:'current page'});
  }catch(err){
    $('mapStatus').textContent='Map unavailable. Programme results and saved decisions remain accessible.';
    console.error('Main map initialisation failed',err);
  }
})();

