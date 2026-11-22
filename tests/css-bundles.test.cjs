'use strict';
// The stylesheet bundles served by index.html must match the source files listed in its atlas-css-bundle blocks.
const test=require('node:test');
const assert=require('node:assert');
const path=require('path');
const {execFileSync}=require('child_process');
const root=path.join(__dirname,'..');

test('stylesheet bundles are rebuilt from the current CSS files',()=>{
  let output='';
  try{output=execFileSync('python3',[path.join(root,'scripts','build_css_bundles.py'),'--check'],{cwd:root,encoding:'utf8'});}
  catch(error){assert.fail((error.stdout||'')+(error.stderr||'')+'\nRun: python3 scripts/build_css_bundles.py');}
  assert.match(output,/stylesheet bundles are up to date/);
});
