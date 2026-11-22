'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const {BUNDLES,VERSION}=require('../scripts/build-css-bundles.cjs');
const cssBundleFor=source=>{
  const matching=BUNDLES.filter(([,sources])=>sources.includes(source));
  assert.equal(matching.length,1,'CSS must be included in exactly one bundle: '+source);
  return matching[0][0];
};
const assertCssLoaded=(html,sw,source)=>{
  const bundle=cssBundleFor(source),reference=bundle+'?v='+VERSION;
  assert.ok(html.includes('href="'+reference+'"'),
    'Homepage must actually load bundled '+source+' through '+reference);
  assert.ok(sw.includes("'"+reference+"'"),
    'Offline service worker must cache '+reference);
  const content=fs.readFileSync(path.join(root,bundle),'utf8');
  const original=fs.readFileSync(path.join(root,source),'utf8');
  assert.ok(content.includes('\n/* SOURCE: '+source+' */\n'+original+'\n'),
    'Bundle content must contain unchanged CSS source: '+source);
  return reference;
};
module.exports={cssBundleFor,assertCssLoaded};
