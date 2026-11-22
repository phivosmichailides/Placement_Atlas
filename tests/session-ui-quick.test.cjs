'use strict';
/* Regression for PLACEMENT_ATLAS-V: session-ui.js must not spread the #quick
   element (window named access) before app-base.js declares the `quick` Set. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const src=fs.readFileSync(path.join(__dirname,'..','session-ui.js'),'utf8');
const start=src.indexOf('const appQuick=');
const fnStart=src.indexOf('function currentFilters(){');
const end=src.indexOf('\n',fnStart);
assert.ok(start>0&&fnStart>start&&end>fnStart,'currentFilters helpers not found');
const snippet=src.slice(start,end)+'\nthis.currentFilters=currentFilters;';

const makeContext=quick=>{
  const chips=[{dataset:{q:'london'}},{dataset:{q:'pay'}}];
  const ctx={
    ids:['search','sort'],
    $:id=>({search:{value:'uclh'},sort:{value:'fit'}})[id]||null,
    document:{querySelectorAll:sel=>sel==='#quick .chip[data-q].on'?chips:[]},
    Set
  };
  if(quick!==undefined)ctx.quick=quick;
  vm.createContext(ctx);
  vm.runInContext(snippet,ctx);
  return ctx;
};

test('currentFilters does not spread the #quick element before app-base.js loads',()=>{
  const element={id:'quick',children:[]}; // non-iterable, like an HTMLDivElement
  const ctx=makeContext(element);
  let filters;
  assert.doesNotThrow(()=>{filters=ctx.currentFilters()});
  assert.deepEqual([...filters.quick],['london','pay']);
  assert.equal(filters.fields.search,'uclh');
});

test('currentFilters falls back to active chips when quick is undeclared',()=>{
  const ctx=makeContext(undefined);
  assert.deepEqual([...ctx.currentFilters().quick],['london','pay']);
});

test('currentFilters uses the app quick Set once it exists',()=>{
  const ctx=makeContext(new Set(['hospital']));
  assert.deepEqual([...ctx.currentFilters().quick],['hospital']);
});

test('session restore only rewrites quick filters when the Set exists',()=>{
  assert.match(src,/if\(Array\.isArray\(f\.quick\)&&appQuick\(\)\)\{/);
  assert.doesNotMatch(src,/typeof quick!=='undefined'\?\[\.\.\.quick\]/);
});
