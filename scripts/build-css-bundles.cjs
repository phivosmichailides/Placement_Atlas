'use strict';
/*
 * Non-destructive CSS aggregation for the Placement Atlas homepage.
 * Keep original files, selectors, declarations and source order identical.
 * Bundle boundaries correspond to existing <style> blocks in index.html.
 * JS runs only in development/CI; never in the browser.
 */
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const VERSION='20261122bundle1';
const BUNDLES=[
 ['css-bundle-preflight.css',['map-focus.css','pwa.css']],
 ['css-bundle-core.css',['desk.css','theme-outcome.css','workspace-themes.css','simulator-refinement.css','desk-polish.css','cloud-auth.css','cloud-password-auth.css']],
 ['css-bundle-refinements.css',['design-refresh.css','programme-preview.css','controls-refinement.css','preferences-ui.css','location-blacklist.css','tinder-mode.css','motion-effects.css','interface-polish.css']],
 ['css-bundle-workspace-a.css',['atlas-navigation.css','atlas-map-tones.css','atlas-interactions.css','atlas-footer.css','premium-discovery-preview.css','premium-card-tabs.css','premium-editorial-palettes.css','placement-refinements.css','placement-profile.css','placement-makeover.css','placement-fixes.css','premium-workspace.css']],
 ['css-bundle-workspace-b.css',['premium-quiet-interface.css','atlas-completion.css','shortlist-refinement.css','member-profile.css','atlas-experience.css','learning-industry-guide.css','responsive-fit.css','explore-layout-fixes.css','atlas-grid-performance.css','explore-efficiency.css','atlas-card-repairs.css']],
 ['css-bundle-final.css',['linkedin-consent.css','atlas-i18n.css','swipe-mobile-viewport.css','swipe-mode-workspace.css','swipe-mobile-workspace.css','explore-clarity.css']]
];
module.exports={BUNDLES,VERSION};
if(require.main===module){
const header='/* Placement Atlas: source-order-preserving CSS bundle. Regenerate with scripts/build-css-bundles.cjs. */\n';
const files=BUNDLES.flatMap(([,sources])=>sources);
assert.equal(new Set(files).size,files.length,'CSS source should appear in exactly one bundle');
let combinedBytes=0;
for(const [bundle,sources] of BUNDLES){
 let content=header;
 for(const src of sources){
  const s=fs.readFileSync(path.join(root,src),'utf8');
  assert(!/@(?:import|charset|namespace)\b|url\(\s*['"]?\.\.\//i.test(s),'Unsafe relative URL or CSS directive in '+src);
  content+='\n/* SOURCE: '+src+' */\n'+s+'\n';
 }
 combinedBytes+=Buffer.byteLength(content);
 const out=path.join(root,bundle);
 if(process.argv.includes('--check')){
   assert(fs.existsSync(out),bundle+' is missing');
   assert.equal(fs.readFileSync(out,'utf8'),content,bundle+' is stale; run node scripts/build-css-bundles.cjs');
 }else{
   fs.writeFileSync(out,content);
 }
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const links=[...html.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map(match=>match[1]);
for(const [bundle,sources] of BUNDLES){
 const ref=bundle+'?v='+VERSION;
 assert.equal(links.filter(s=>s===ref).length,1,'Bundle missing or duplicated: '+ref);
 for(const original of sources){
  assert.equal(links.filter(s=>s.replace(/^\//,'').split('?')[0]===original).length,0,'Source still blocking page: '+original);
 }
}
console.log((process.argv.includes('--check')?'Verified':'Built')+' '+BUNDLES.length+' lossless CSS bundles from '+files.length+' original files; '+combinedBytes+' bytes; no selectors or rules removed.');
}
