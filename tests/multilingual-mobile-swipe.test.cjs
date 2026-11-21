'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');
const i18n=read('atlas-i18n.js');
const pickerCss=read('atlas-i18n.css');
const mobileCss=read('swipe-mobile-viewport.css');
const swipe=read('tinder-mode.js');
const html=read('index.html');
const sw=read('sw.js');

test('25 language options have country flags, with English first and defaults',()=>{
  const choices=[...i18n.matchAll(/^\s*\['([^']+)',\s*'([^']+)'\],?$/gm)]
    .filter(match=>match.index<i18n.indexOf('const DICTIONARIES'));
  const codes=choices.map(m=>m[1]);
  assert.equal(codes.length,25,'the language list should include 25 options');
  assert.equal(codes[0],'en','English is the default');
  for(const code of ['el','ar','ur','zh-CN','zh-TW','pa','bn','hi','gu','ta','pl','ro','es','fr','pt','it','de','nl','fa','tr','ps','ckb','so','uk']){
    assert.ok(codes.includes(code),'missing language '+code);
  }
  for(const m of choices){
    assert.match(m[2],/^\p{Regional_Indicator}{2} /u,'missing country emoji before '+m[1]);
  }
  assert.match(i18n,/localStorage\.getItem\('placement-atlas-language-v1'\)\|\|'en'/);
  assert.match(i18n,/function applyLanguage\(language\)/);
  assert.match(i18n,/document\.documentElement\.lang = activeLanguage/);
});

test('rounded language menu supports keyboard, selected state, persistent choice',()=>{
  for(const string of [
    'atlasLanguageMenu','atlasLanguageTrigger','aria-haspopup','menuitemradio',
    'aria-checked','ArrowDown','ArrowUp','Escape','Tab','Home','End',
    "localStorage.setItem('placement-atlas-language-v1',code)",
    'header.append(picker)','document.body.append(popup)'
  ])assert.ok(i18n.includes(string),'missing language control behavior: '+string);
  assert.match(pickerCss,/\.atlasLanguageMenu\s*\{[^}]*border-radius:18px/s);
  assert.match(pickerCss,/\.atlasLanguageOption\s*\{[^}]*min-height:44px/s);
  assert.match(pickerCss,/\.atlasLanguageMenu\[hidden\]\{display:none!important\}/);
  assert.match(pickerCss,/@media\(max-width:650px\)/);
  assert.match(i18n,/if\(utility\)utility\.append\(picker\)/,'Language control should share the profile/theme row');
  assert.doesNotMatch(pickerCss,/position:absolute;top:8px/,'The selector must not overlay profile controls');
});

test('official programme names, salary values and map text are not machine translated',()=>{
  for(const selector of [
    "'.placement'","'.tdProgrammeName'","'.tdEmployer'","'.tdCardCode'",
    "'.tdMetrics strong'","'.tdLocationText'","'#placementMap'","'#compareArea'"
  ])assert.ok(i18n.includes(selector),'missing protected selector '+selector);
  assert.match(i18n,/const rtl = \['ar','ur','fa','ps','ckb'\]/);
  assert.doesNotMatch(i18n,/'Swipe Mode'\s*:/);
  assert.doesNotMatch(i18n,/'Oriel'\s*:/);
});

test('mobile Swipe Mode uses viewport-bound card, scrollable details and stable buttons',()=>{
  assert.match(mobileCss,/@media \(max-width: 690px\) and \(pointer: coarse\)/);
  assert.match(mobileCss,/100dvh/);
  assert.match(mobileCss,/env\(safe-area-inset-bottom/);
  assert.match(mobileCss,/\.tdCardSlot > \.tdSwipeCard:not\(\.tdNextCard\)/);
  assert.match(mobileCss,/overflow-y: auto/);
  assert.match(mobileCss,/touch-action: pan-y/);
  assert.match(mobileCss,/\.tdActions\s*\{[^}]*position:sticky/s);
  assert.match(mobileCss,/#tinderMode \.tdSwipeBadge\{display:none\}/);
  assert.match(mobileCss,/\.tdSwipeBadge\.tdSwipeBadgeShow/);
});

test('Like, Like No and Super Like feedback stays anchored above scrollable card',()=>{
  assert.match(swipe,/id="tinderSwipeBadge"/);
  assert.match(swipe,/const feedbackBadge=kind=>/);
  assert.match(swipe,/feedbackBadge\(status\)/);
  assert.match(swipe,/feedbackBadge\(dx< -50\?'no':dx>50\?'yes':''\)/);
  assert.match(swipe,/cardSlot\.replaceChildren\(\);\s*feedbackBadge\(''\)/);
  for(const name of ['tinderUndo','tinderNo','tinderYes','tinderSuper']) {
    assert.ok(swipe.includes('id="'+name+'"'),'missing decision action '+name);
  }
});

test('both stylesheet and script assets are wired and available to the offline app',()=>{
  for(const asset of [
    'atlas-i18n.js?v=20261121i18n4',
    'atlas-i18n.css?v=20261121i18n4',
    'swipe-mobile-viewport.css?v=20261121mobile2',
    'tinder-mode.js?v=20261121mobile2'
  ]){
    assert.ok(html.includes(asset),'homepage is missing '+asset);
    assert.ok(sw.includes(asset),'offline cache is missing '+asset);
  }
});
