'use strict';
/* Desktop Swipe Mode must occupy the available application viewport while
   leaving mobile layouts and every other tab untouched. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),css=read('swipe-mode-workspace.css'),sw=read('sw.js');

test('full-width workspace is scoped to desktop Swipe Mode',()=>{
  assert.match(css,/@media\s*\(min-width:900px\)\s*and\s*\(hover:hover\)\s*and\s*\(pointer:fine\)/);
  assert.match(css,/body\[data-atlas-view="tinderMode"\] \.shell/);
  assert.match(css,/max-width:none!important/);
  assert.match(css,/width:var\(--ux-shell-width,100%\)!important/);
  assert.match(css,/min-height:calc\(100svh \/ var\(--ux-page-zoom,1\)\)!important/);
  assert.match(css,/body\[data-atlas-view="tinderMode"\] #tinderMode\.active/);
  assert.match(css,/display:flex!important/);
  assert.match(css,/justify-content:center!important/);
});

test('swipe card and controls expand for wide screens',()=>{
  assert.match(css,/width:min\(100%,clamp\(760px,70vw,1360px\)\)!important/);
  assert.match(css,/width:min\(100%,clamp\(680px,54vw,1120px\)\)!important/);
  assert.match(css,/\.tdProgrammeName\s*\{\s*font-size:clamp\(24px,1\.25vw,38px\)!important/);
  assert.match(css,/\.tdAction\s*\{\s*width:clamp\(66px,2\.8vw,86px\)!important/);
});

test('the new workspace stylesheet is versioned in the page and PWA cache',()=>{
  const asset='swipe-mode-workspace.css?v=20261121swipe-layout1';
  assert.ok(html.includes(asset),'Homepage must load the workspace stylesheet');
  assert.ok(sw.includes(asset),'Offline cache must include the workspace stylesheet');
  assert.match(sw,/CACHE_NAME='placement-atlas-shell-2026-11-21-v\d+-[^']+'/);
  assert.match(html,/atlas-release" content="2026-11-21-[^"]+"/);
});
