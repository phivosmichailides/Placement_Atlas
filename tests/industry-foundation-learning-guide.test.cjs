'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=n=>fs.readFileSync(path.resolve(__dirname,'..',n),'utf8');
const app=read('learning-library.js');
const index=read('index.html');
const page=read('industry-foundation-training.html');
const css=read('learning-industry-guide.css');
const sw=read('sw.js');
const map=read('sitemap.xml');
test('Learning Hub retains its existing sections and adds an industry guide',()=>{
  for(const id of ['atlasLearnSettings','atlasLearnStructure','atlasLearnRegions','atlasLearnPay',
    'atlasLearnYear','atlasLearnChecklist','atlasLearnResearch','atlasLearnIndustry']){
    assert.ok(app.includes('id="'+id+'"'),'Missing Learning Hub section '+id);
  }
  assert.match(app,/data-industry-open/);
  assert.match(app,/data-industry-expand="all"/);
  assert.match(app,/data-industry-expand="none"/);
  assert.match(app,/data-atlas-learn-view="guide"/);
});
test('Industry guide includes 16 substantial sourced answers',()=>{
  const matches=[...app.matchAll(/<details class="atlasIndustryAnswer" id="industry-[^"]+"/g)];
  const published=[...page.matchAll(/<details class="atlasIndustryAnswer" id="industry-[^"]+"/g)];
  assert.equal(matches.length,16);
  assert.equal(published.length,16);
  for(const term of ['medical affairs','regulatory affairs','pharmacovigilance','clinical trials',
    'community pharmacy','registration assessment','designated supervisor',
    'case study','industry','project','confidential','supervised','career']){
    assert.ok(app.toLowerCase().includes(term.toLowerCase()),'Missing guide topic '+term);
    assert.ok(page.toLowerCase().includes(term.toLowerCase()),'Missing public article topic '+term);
  }
  assert.ok((page.match(/target="_blank" rel="noopener noreferrer"/g)||[]).length>=30,
    'Each subsection should point to genuine primary sources');
  assert.ok(page.length>30000,'Long-form article must have substantial content');
  assert.ok((app.match(/atlasIndustryCitations/g)||[]).length>=16,'Every answer needs source links');
});
test('Primary sources and qualification safeguards are present',()=>{
  for(const domain of ['abpi.org.uk','london.wtepharmacy.nhs.uk','gov.uk',
    'pharmacistsupport.org','careers.ed.ac.uk','pharmacyregulation.org']){
    assert.ok(page.includes(domain),'Missing corroborating source '+domain);
  }
  assert.match(page,/illustrative/i);
  assert.match(page,/not a guaranteed job offer/i);
  assert.match(page,/Official employer training plans and regulator requirements take precedence/i);
  assert.match(page,/Independent of Oriel, NHS England and the GPhC/);
});
test('Public article is indexable, stand-alone and uses accessible native details',()=>{
  assert.match(page,/<html lang="en-GB">/);
  assert.match(page,/<main>/);
  assert.match(page,/<h1>Industry, hospital and community split foundation training/);
  assert.match(page,/schema.org/);
  assert.match(page,/rel="canonical" href="https:\/\/placementatlas.co.uk\/industry-foundation-training.html"/);
  assert.match(page,/<nav class="atlasIndustrySectionIndex"/);
  assert.match(page,/<details class="atlasIndustryAnswer"/);
  assert.match(css,/@media\(max-width:700px\)/);
  assert.match(css,/prefers-reduced-motion/);
  assert.ok(!page.includes('<script src="learning-library.js"'),'Article must not depend on the SPA');
  assert.match(map,/industry-foundation-training.html/);
});
test('New guide scripts, styles and public article are synchronised with PWA',()=>{
  for(const asset of ['learning-library.js?v=20261121industry1','learning-industry-guide.css?v=20261121industry1']){
    assert.ok(index.includes(asset),'Index missing '+asset);
    assert.ok(sw.includes(asset),'Offline cache missing '+asset);
  }
  assert.match(sw,/industry-foundation-training.html/);
  assert.match(page,/learning-industry-guide.css\?v=20261121industry1/);
});
