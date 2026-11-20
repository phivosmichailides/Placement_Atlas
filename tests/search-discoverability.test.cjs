'use strict';
/* Search discoverability assertions: static, crawler-readable pages only. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const index=read('index.html'),about=read('about.html'),sitemap=read('sitemap.xml');
const readme=read('README.md'),llms=read('llms.txt'),robots=read('robots.txt');
const tag=(html,pattern)=>html.match(pattern)?.[1]||'';
const jsonLd=html=>[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const canonical=html=>tag(html,/<link rel="canonical" href="([^"]+)"/);
const desc=html=>tag(html,/<meta name="description" content="([^"]+)"/);

test('home title, canonical and description identify the independent Oriel tool',()=>{
  assert.match(index,/<title>Placement Atlas \| Independent Oriel Pharmacy Placement Tool<\/title>/);
  assert.equal(canonical(index),'https://placementatlas.co.uk/');
  assert.ok(desc(index).length>=120&&desc(index).length<=160,'Homepage description should be concise');
  assert.match(desc(index),/UK MPharm students/);
  assert.match(desc(index),/Oriel/);
  assert.doesNotMatch(index,/<meta\s+name="robots"\s+content="noindex/);
});
test('homepage explanation is real static HTML, visible without executing JavaScript',()=>{
  const start=index.indexOf('<section class="atlasStaticExplainer"');
  const end=index.indexOf('</section>',start);
  assert.ok(start>0&&end>start,'Missing static information section');
  const content=index.slice(start,end);
  assert.match(content,/<h2[^>]*>What is Placement Atlas\?<\/h2>/);
  assert.match(content,/4,064 programmes/);
  assert.match(content,/October 2026 Oriel CSV export/);
  assert.match(content,/7 November 2026/);
  assert.match(content,/not a live vacancy or offer feed/i);
  assert.match(content,/href="\/about\.html"/);
  assert.match(content,/href="\/guide\.html"/);
  assert.ok(!/display:\s*none|hidden(?:="|>|\s)/i.test(content),'Site explanation should not be hidden');
});
test('WebApplication schema has truthful source description, author and free access',()=>{
  const ld=jsonLd(index);
  assert.equal(ld.length,2,'Expect one WebSite and one WebApplication');
  assert.ok(ld.some(item=>item['@type']==='WebSite'));
  const app=ld.find(item=>item['@type']==='WebApplication');
  assert.ok(app);
  assert.equal(app['@id'],'https://placementatlas.co.uk/#app');
  assert.equal(app.name,'Placement Atlas');
  assert.equal(app.applicationCategory,'EducationalApplication');
  assert.equal(app.creator.name,'Phivos Michailides');
  assert.equal(app.isAccessibleForFree,true);
  assert.equal(app.offers.price,'0');
  assert.match(app.description,/4,064 programmes/);
  assert.doesNotMatch(app.description,/live vacancy feed/i);
});
test('About is a separately indexable static HTML page with consistent identity',()=>{
  assert.equal(canonical(about),'https://placementatlas.co.uk/about.html');
  assert.ok(desc(about).length>=120&&desc(about).length<=160);
  assert.match(about,/<h1>/);
  assert.match(about,/<strong>Phivos Michailides<\/strong>/);
  assert.match(about,/October 2026 Oriel CSV export supplied to the project on 7 November 2026/);
  const ld=jsonLd(about);
  assert.ok(ld.some(x=>x['@type']==='AboutPage'&&x.mainEntity.creator.name==='Phivos Michailides'));
});
test('canonical indexable pages and sitemap are consistent',()=>{
  for(const url of ['https://placementatlas.co.uk/','https://placementatlas.co.uk/about.html',
    'https://placementatlas.co.uk/guide.html','https://placementatlas.co.uk/privacy.html',
    'https://placementatlas.co.uk/terms.html']){
    assert.ok(sitemap.includes('<loc>'+url+'</loc>'),'Missing canonical sitemap URL: '+url);
  }
  assert.match(sitemap,/<loc>https:\/\/placementatlas\.co\.uk\/<\/loc>\s*<lastmod>2026-11-20<\/lastmod>/);
  assert.match(robots,/User-agent: \*/);
  assert.match(robots,/Allow: \//);
  assert.match(robots,/Sitemap: https:\/\/placementatlas\.co\.uk\/sitemap\.xml/);
});
test('optional machine-readable summary links to canonical pages without promises',()=>{
  assert.match(llms,/https:\/\/placementatlas\.co\.uk\/about\.html/);
  assert.match(llms,/October 2026 Oriel CSV export/);
  assert.match(llms,/not an official Google AI Mode indexing requirement/);
  assert.match(readme,/Oriel pharmacy foundation programme comparison tool for UK MPharm students/);
  assert.match(readme,/https:\/\/placementatlas\.co\.uk\/about\.html/);
});
