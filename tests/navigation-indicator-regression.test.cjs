'use strict';
/* Prevent the "ghost pill" overlapping navigation tabs on reload, scroll,
   resize or first paint in any palette or color theme. */
const test=require('node:test');
const assert=require('node:assert/strict');
const {assertCssLoaded}=require('./css-bundle-assertions.cjs');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),script=read('motion-effects.js');
const styles=read('motion-effects.css'),sw=read('sw.js');

test('no detached slider is constructed in navigation',()=>{
  assert.doesNotMatch(script,/createElement\s*\(\s*['"]span['"]\s*\)/);
  assert.doesNotMatch(script,/nav\.append\(marker\)|active\.offsetLeft|translate3d\(/);
  assert.match(script,/classList\.remove\(['"]tabMotionReady['"]\)/);
  assert.match(script,/querySelectorAll\(['"]\.atlasTabIndicator['"]\)/);
});
test('a legacy slider stays hidden, even with stale JavaScript',()=>{
  assert.match(styles,/\.atlasTabIndicator\s*\{\s*display:none!important\s*\}/);
  assert.doesNotMatch(styles,/\.tab\.active\s*\{\s*background:transparent!important/);
});
test('new versions of both assets are loaded and prefetched by the PWA',()=>{
  const css='motion-effects.css?v=20261121nav-pill-fix1';
  const js='motion-effects.js?v=20261121nav-pill-fix1';
  assertCssLoaded(html,sw,'motion-effects.css');
  assert.ok(html.includes(js),'Homepage missing: '+js);
  assert.ok(sw.includes(js),'Offline shell missing: '+js);
  const swipeCss='swipe-mode-workspace.css?v=20261121swipe-layout4';
  assertCssLoaded(html,sw,'swipe-mode-workspace.css');
  assert.match(sw,/CACHE_NAME='placement-atlas-shell-2026-11-21-v\d+-[^']+'/);
});
test('primary tab controls remain in the markup and operate via existing handlers',()=>{
  for(const id of ['explore','shortlist','simulator','tinderMode','learn','prefs']){
    assert.match(html,new RegExp('data-tab="'+id+'"'),'Missing nav tab '+id);
  }
});
