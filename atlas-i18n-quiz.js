/* Core Personalisation quiz vocabulary across every available locale.
   Official setting names (Hospital, General Practice, GP) are deliberately not translated. */
(()=>{
'use strict';
const KEYS=["PERSONALISE YOUR SEARCH","What matters to you?","You stay in control.","1 of 6 · Location","Show me all regions","2 of 6 · Pharmacy","A good mix","Industry / research / data","I’m not sure yet","3 of 6 · Priorities","Pay","Work-life balance","Career value","Independence","Clinical variety","4 of 6 · Practical details","No minimum","Maximum weekly hours","Flexible","Not needed / any programme","Prefer programmes offering sponsorship","Show sponsored programmes only","Home area (optional)","5 of 6 · Training mix","Happy with community","Some is fine","Prefer less community","Avoid community-heavy","6 of 6 · Make it yours","Your colour theme","Light","Dark","Retake setup"];
const PACKS=window.PlacementAtlasLocalePacks=window.PlacementAtlasLocalePacks||{};
const put=(code,terms)=>{
  const values=terms.split('|');
  if(values.length!==KEYS.length)throw new Error('Quiz translation pack '+code+' has '+values.length+' entries; expected '+KEYS.length);
  Object.assign(PACKS[code]||(PACKS[code]={}),Object.fromEntries(KEYS.map((key,i)=>[key,values[i]])));
};
})();
