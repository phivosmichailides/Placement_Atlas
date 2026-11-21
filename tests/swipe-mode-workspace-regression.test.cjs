'use strict';
/* Desktop Swipe Mode fits inside the viewport at changing in-app zoom while
   leaving mobile rules and every other section untouched. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),css=read('swipe-mode-workspace.css'),sw=read('sw.js');

test('viewport-compensated shell is scoped to desktop Swipe Mode',()=>{
  assert.match(css,/@media\s*\(min-width:900px\)\s*and\s*\(hover:hover\)\s*and\s*\(pointer:fine\)/);
  assert.match(css,/body\[data-atlas-view="tinderMode"\] \.shell/);
  assert.match(css,/width:var\(--ux-viewport-compensated-width,var\(--ux-shell-width,100%\)\)!important/);
  assert.match(css,/max-width:var\(--ux-shell-max-width,1540px\)!important/);
  assert.match(css,/margin-inline:auto!important/);
  assert.match(css,/body\[data-atlas-view="tinderMode"\] #tinderMode\.active/);
  assert.match(css,/min-height:calc\(100svh \/ var\(--ux-page-zoom,1\) - 135px\)!important/);
  assert.match(css,/justify-content:center!important/);
});

test('swipe card and shortcuts are contained and comfortable rather than oversized',()=>{
  assert.match(css,/width:min\(100%,920px\)!important/);
  assert.match(css,/width:min\(100%,780px\)!important/);
  assert.match(css,/\.tdProgrammeName\s*\{\s*font-size:clamp\(22px,1\.6vw,29px\)!important/);
  assert.match(css,/\.tdAction\s*\{\s*width:61px!important;height:61px!important/);
  assert.match(css,/\.tdFloatingDecisions \.tdLauncher\s*\{\s*min-width:67px!important;min-height:43px!important/);
  assert.doesNotMatch(css,/\.tdCardDeck\s*\{[^}]*min-height:clamp\(520px/s);
});

test('the workspace stylesheet is versioned in the page and PWA cache',()=>{
  const asset='swipe-mode-workspace.css?v=20261121swipe-layout3';
  assert.ok(html.includes(asset),'Homepage must load the workspace stylesheet');
  assert.ok(sw.includes(asset),'Offline cache must include the workspace stylesheet');
  assert.match(sw,/CACHE_NAME='placement-atlas-shell-2026-11-21-v\d+-[^']+'/);
  assert.match(html,/atlas-release" content="2026-11-21-[^"]+"/);
});
