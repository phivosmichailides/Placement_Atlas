'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const parity=read('atlas-i18n-parity.js'),quiz=read('atlas-i18n-quiz.js');
const i18n=read('atlas-i18n.js'),html=read('index.html');
const ctx={window:{}};
vm.runInNewContext(parity+'\n'+quiz,ctx);
const packs=ctx.window.PlacementAtlasLocalePacks;
const expected=['el','ur','ar','zh-CN','zh-TW','pa','bn','hi','gu','ta','pl','ro','es','fr','pt','it','de','nl','fa','tr','ps','ckb','so','uk'];
test('every non-English language has the same programme and quiz vocabulary',()=>{
  assert.deepEqual(Object.keys(packs).sort(),expected.sort());
  for(const [language,words] of Object.entries(packs)){
    assert.equal(Object.keys(words).length,86,language+' should have 53 shared and 33 quiz terms');
    for(const key of [
      'Add to shortlist','Remove from shortlist','Compare','Exclude',
      'Show filters','Hide filters','Sort results','Locate missing sites','Show all matching',
      'Congratulations on your offer.','Your placement workspace',
      'What matters to you?','Show me all regions','Pay','Work-life balance','Flexible',
      'Avoid community-heavy','Your colour theme','Retake setup'
    ]){
      assert.ok(typeof words[key]==='string'&&words[key].trim().length>0,
        language+' missing '+key);
    }
  }
});
test('translation uses a shareable query code and honours all official programme data',()=>{
  assert.match(i18n,/url\.searchParams\.set\('lang',code\)/);
  assert.match(i18n,/url\.searchParams\.delete\('lang'\)/);
  assert.match(i18n,/OFFICIAL_TERMS/);
  assert.match(i18n,/\.placementTop h3/);
  assert.match(i18n,/\.placementTop \.employer/);
  assert.match(i18n,/\.tdProgrammeName/);
  assert.match(i18n,/\.tdLocationText/);
  assert.doesNotMatch(i18n,/'#results', '#reco', '#shortlistList'/,
    'Protect individual data fields, not entire cards and buttons');
  assert.match(i18n,/MutationObserver/);
});
test('translation packs are loaded before interface translator',()=>{
  const parityIndex=html.indexOf('atlas-i18n-parity.js?v=20261121parity1');
  const quizIndex=html.indexOf('atlas-i18n-quiz.js?v=20261121quiz1');
  const i18nIndex=html.indexOf('atlas-i18n.js?v=20261121parity1');
  assert.ok(parityIndex>0&&quizIndex>parityIndex&&i18nIndex>quizIndex);
});
