'use strict';
/* Map camera/pop-up regressions: no browser credentials or external calls. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
const map=read('sector-map.js');
const resize=read('explore-map-resize.js');
const session=read('session-ui.js');
const base=read('app-base.js');
const css=read('map-focus.css');
const html=read('index.html');
const boot=read('app.js');
const product=read('app-product.js');
const sw=read('sw.js');

test('map code and new popup actions remain syntactically valid',()=>{
  for(const file of [map,resize,session,base]){
    assert.doesNotThrow(()=>new Function(file));
  }
});
test('zoom controls change scale without moving map center',()=>{
  assert.match(map,/const centre=placementMap\.getCenter\(\)/);
  assert.match(map,/placementMap\.setView\(centre,Math\.round\(\(currentZoom\+delta\)\*10\)\/10,\{animate:false\}\)/);
});
test('clicking a cluster opens details; drilling down is an explicit action',()=>{
  assert.match(map,/pin\.on\('click',openPin\)/);
  assert.match(map,/data-atlas-zoom-sites/);
  assert.match(map,/popup\.getElement\(\)\?\.querySelector/);
  assert.doesNotMatch(map,/pin\.on\('click',group\.cluster\?zoomIntoCluster:openPin\)/);
  assert.match(css,/\.atlasPopupDrilldown/);
});
test('a camera redraw preserves open programme details, but filters can dismiss them',()=>{
  assert.match(map,/if\(options\.dismissPopup\|\|\(!options\.preservePopup&&!interactivePopup\)\)/);
  assert.match(map,/drawMap\(currentMapList,\{preservePopup:true\}\)/);
});
test('responsive map invalidations do not pan unexpectedly',()=>{
  assert.match(resize,/map\.clientWidth,height=map\.clientHeight/);
  assert.doesNotMatch(resize,/map\.getBoundingClientRect\(\)/);
  for(const script of [resize,session,base])assert.doesNotMatch(script,/placementMap\?*\.invalidateSize\(false\)/);
  assert.match(resize,/invalidateSize\(\{pan:false,animate:false\}\)/);
});
test('all versioned entrypoints load new map assets and the PWA retains them',()=>{
  for(const name of ['map-focus.css','explore-map-resize.js','app.js']){
    assert.ok(html.includes(name+'?v=20261122mapstable1'),'Outdated HTML asset: '+name);
  }
  assert.ok(html.includes('session-ui.js?v=20261122contextfilters1'),'Outdated HTML asset: session-ui.js');
  assert.ok(boot.includes('sector-map.js?v=20261122mapstable1'));
  assert.ok(boot.includes('app-product.js?v=20261122mapstable1'));
  assert.ok(product.includes('app-base.js?v=20261122mapstable1'));
  for(const name of ['sector-map.js','app-product.js','app-base.js','app.js'])
    assert.ok(sw.includes(name+'?v=20261122mapstable1'),'Outdated offline asset: '+name);
  assert.ok(sw.includes('session-ui.js?v=20261122contextfilters1'),'Outdated offline asset: session-ui.js');
});
