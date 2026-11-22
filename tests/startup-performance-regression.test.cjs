'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),product=read('app-product.js');
const dates=read('deadline-dates.js'),enhancer=read('premium-discovery-preview.js');
const app=read('app.js'),sw=read('sw.js');

test('default introduction renders before the Explore panel and is reused',()=>{
  const match=product.match(/intro\.innerHTML=classicIntro\?`([\s\S]*?)`:`([\s\S]*?)`;/);
  assert(match,'The original hero templates should remain available');
  const start=html.indexOf('<section class="productIntro card" data-atlas-prerendered="1">');
  assert(start>0&&start<html.indexOf('id="explore"'),'Hero must be prerendered above Explore');
  assert(html.includes(match[2]),'Initial hero content must match the existing JS template');
  assert.equal(html.split('data-atlas-prerendered="1"').length-1,1,'Exactly one prerendered hero');
  assert.equal(html.split('class="contextStrip"').length-1,1,'Context strip must be rendered exactly once');
  assert.match(product,/if\(!isPrerendered\|\|classicIntro\)intro\.innerHTML/);
  assert.match(product,/intro\.dataset\.atlasProductIntroReady='1'/);
  assert.match(enhancer,/intro\.dataset\.atlasPrerendered==='1'&&intro\.dataset\.atlasProductIntroReady!=='1'/);
  assert.match(html,/id="atlasDeadlineRow"[^>]*min-height:86px/,'Reserve countdown space to limit layout shifts');
});

test('programme date formatting is shared and existing cards are updated without a full rerender',()=>{
  assert.equal((dates.match(/new Intl\.DateTimeFormat\(/g)||[]).length,1,
    'Use exactly one shared date formatter for all cards');
  assert.match(dates,/const fmtDate=d=>d\?dateFormatter\.format\(d\):''/);
  const body=dates.slice(dates.indexOf('const installDates='),dates.indexOf('const installCountdown='));
  assert.doesNotMatch(body,/renderAll\(\)/,'Adding dates must not regenerate every application panel');
  assert.match(body,/details\.insertAdjacentHTML\('beforebegin',dateRow\(placement\)\)/);
  assert.match(body,/card=\(p,compact=false\)=>/,'Future cards must still receive programme dates');
});

test('updated startup scripts are cache-busted consistently for returning visitors',()=>{
  for(const [file,version] of [
    ['app-product.js','20261122faststartup1'],
    ['deadline-dates.js','20261122fastdate1'],
    ['premium-discovery-preview.js','20261122faststartup1']
  ]){
    const reference=file+'?v='+version;
    assert(sw.includes(reference),'Offline shell cache missing '+reference);
    assert((file==='premium-discovery-preview.js'?html:app).includes(reference),
      'Website loader missing '+reference);
  }
  assert.match(sw,/placement-atlas-shell-2026-11-22-v133-fast-startup/);
});
