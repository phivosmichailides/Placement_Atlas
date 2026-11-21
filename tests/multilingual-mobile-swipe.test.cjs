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

test('28 ordered language options have country flags and English as default',()=>{
  const choices=[...i18n.matchAll(/^\s*\['([^']+)',\s*'([^']+)'\],?$/gm)]
    .filter(match=>match.index<i18n.indexOf('const DICTIONARIES'));
  const codes=choices.map(m=>m[1]);
  assert.equal(codes.length,28,'the language list should include 28 options');
  assert.deepEqual(codes.slice(0,13),['en','el','fr','es','it','nl','de','zh-CN','yue-HK','ja','ko','hi','ar'],'honour the requested menu order');
  assert.equal(codes[0],'en','English is the default');
  for(const code of ['el','ar','ur','zh-CN','yue-HK','ja','ko','zh-TW','pa','bn','hi','gu','ta','pl','ro','es','fr','pt','it','de','nl','fa','tr','ps','ckb','so','uk']){
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
    "'.placementTop h3'","'.placementTop .employer'","'.tdProgrammeName'",
    "'.tdEmployer'","'.tdLocationText'","'#placementMap'"
  ])assert.ok(i18n.includes(selector),'missing protected selector '+selector);
  assert.match(i18n,/const rtl = \['ar','ur','fa','ps','ckb'\]/);
  assert.match(i18n,/OFFICIAL_TERMS/);
  assert.match(i18n,/OFFICIAL_TERMS\.has\(key\)/);
  assert.match(i18n,/Oriel/);
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

test('updated assets load in the website and offline application',()=>{
  for(const asset of [
    "atlas-i18n.js?v=20261121clarity1",
    "atlas-i18n-east-asia.js?v=20261121eastasia1",
    "atlas-i18n-parity.js?v=20261121parity1",
    "atlas-i18n-quiz.js?v=20261121quiz1",
    "atlas-i18n.css?v=20261121el7",
    "swipe-mobile-viewport.css?v=20261121mobile2",
    "swipe-mobile-workspace.css?v=20261121mobile3",
    "swipe-mobile-navigation.js?v=20261121mobile3",
    "tinder-mode.js?v=20261121mobile3"
]) {
    assert.ok(html.includes(asset),'homepage is missing '+asset);
    assert.ok(sw.includes(asset),'offline cache is missing '+asset);
  }
});

test('phone Swipe Mode has a non-floating actions row, real redo and auto-hiding header',()=>{
  const gameCss=read('swipe-mobile-workspace.css');
  const headerJs=read('swipe-mobile-navigation.js');
  for(const selector of ['tdMobileControlRow','tdMobileHistory','tdMobileUndo','tdMobileRedo','tdFloatingDecisions']){
    assert.ok(gameCss.includes(selector)||swipe.includes(selector),'missing mobile control '+selector);
  }
  assert.match(gameCss,/#atlasOfferCongrats/);
  assert.match(gameCss,/position:static!important/);
  assert.match(gameCss,/tdMobileHeaderHidden/);
  assert.match(headerJs,/desk:after-navigation/);
  assert.match(headerJs,/touchmove/);
  assert.match(swipe,/const redo=\(\)=>/);
  assert.match(swipe,/game\.future\.push/);
  assert.match(swipe,/game\.future=\[\]/);
  assert.match(swipe,/mountMobileHistory\(\)/);
});
