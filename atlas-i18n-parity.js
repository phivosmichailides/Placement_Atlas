/* Reviewed common interface vocabulary for all supported locales.
   Only visible UI copy; programme records and official labels remain original. */
(()=>{
'use strict';
const KEYS=[
'Add to shortlist','Remove from shortlist','Exclude','Excluded — undo','Compare','Comparing','Read more',
'View all details ↓','Hide details ↑','Show details','Personalise','Programme highlights','Potential trade-offs',
'Show filters','Hide filters','Sort results','Show all matching','Show current page','Locate all sites',
'Locate missing sites','Remove preferences','Your placement workspace','More statistics','Fewer statistics',
'Congratulations on your offer.','View your offer','Shortlisted','Training places stated','Hospital-led','GP-led',
'Strong-fit flags','Personalise to see fit','Compare selected','Mixed / split','Underground',
'Map pin colour legend','Programme results shown:','Map colours','Restore default map colours',
'programmes','total programmes','shown','Where are you looking?',
'What kind of environment sounds most like you?','What matters most to you?','Any practical limits?',
'How do you feel about community pharmacy exposure?','Choose your Placement Atlas look',
'Continue','Back','Not now','Set my preferences','Finish'
];
const PACKS=window.PlacementAtlasLocalePacks=window.PlacementAtlasLocalePacks||{};
const put=(lang,row)=>{
 const values=row.split('|');
 if(values.length!==KEYS.length)throw new Error('Incomplete '+lang+' translation row: '+values.length+'/'+KEYS.length);
 PACKS[lang]=Object.fromEntries(KEYS.map((key,i)=>[key,values[i]]));
};

})();
