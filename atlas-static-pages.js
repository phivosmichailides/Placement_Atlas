/* Shared article navigation and appearance. Content is fully readable without JS. */
(()=>{
 'use strict';
 const doc=document.documentElement;
 const themeKey='oriel-desk-theme-v1',paletteKey='oriel-desk-palette-v1';
 const appearance=window.matchMedia?.('(prefers-color-scheme: dark)');
 const read=k=>{try{return localStorage.getItem(k)}catch{return null}};
 const theme=()=>['light','dark'].includes(read(themeKey))?read(themeKey):(appearance?.matches?'dark':'light');
 const apply=next=>{
  doc.dataset.theme=next;
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=next==='dark'?'#0f1011':'#f7f7f6';
  const button=document.getElementById('paDocTheme');
  if(button){
   button.textContent=next==='dark'?'☀':'☾';
   button.setAttribute('aria-label','Switch to '+(next==='dark'?'light':'dark')+' mode');
   button.setAttribute('aria-pressed',String(next==='dark'));
  }
 };
 const palettes=['forest','copper','mauve','amber','cocoa','mono'];
 doc.dataset.palette=palettes.includes(read(paletteKey))?read(paletteKey):'mono';
 apply(theme());
 const render=()=>{
  const old=document.querySelector('body > header, body > .wrap > header');
  if(!old)return;
  // Guide has a narrow reading wrapper. Keep the header full width like the main app.
  if(old.parentElement!==document.body)document.body.insertBefore(old,document.body.firstElementChild);
  const current=location.pathname.replace(/\/$/,'/')||'/';
  const links=[
   ['/','Explore'],['/about.html','About'],['/guide.html','How it works'],
   ['/programme-snapshot.html','2026 data'],['/privacy.html','Privacy'],['/terms.html','Terms']
  ];
  const nav=links.map(([href,label])=>'<a href="'+href+'"'+(current===href?' aria-current="page"':'')+'>'+label+'</a>').join('');
  old.className='paDocHeader';
  old.setAttribute('aria-label','Placement Atlas navigation');
  old.innerHTML='<div class="paDocBar"><a class="paDocBrand" href="/" aria-label="Placement Atlas home">'+
   '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="32" cy="32" r="25" stroke-width="4.4"/><path d="M7 32h50M13 19.4c6.1 3.3 12.3 5.1 19 5.1s12.9-1.8 19-5.1M13 44.6c6.1-3.3 12.3-5.1 19-5.1s12.9 1.8 19 5.1" stroke-width="3.5" stroke-linecap="round"/><path d="M32 7c-8.8 7-13.7 15.4-13.7 25S23.2 50 32 57M32 7c8.8 7 13.7 15.4 13.7 25S40.8 50 32 57" stroke-width="3.7" stroke-linecap="round"/></svg>'+
   '<span>Placement Atlas</span></a><nav class="paDocNav" aria-label="Site navigation">'+nav+
   '<button id="paDocTheme" class="paDocTheme" type="button"></button></nav></div>';
  const toggle=document.getElementById('paDocTheme');
  toggle?.addEventListener('click',()=>{
   const next=doc.dataset.theme==='dark'?'light':'dark';
   try{localStorage.setItem(themeKey,next)}catch{}
   apply(next);
  });
  apply(doc.dataset.theme);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
 appearance?.addEventListener?.('change',()=>{if(!['light','dark'].includes(read(themeKey)))apply(theme())});
 window.addEventListener('storage',e=>{
  if(e.key===themeKey)apply(theme());
  if(e.key===paletteKey)doc.dataset.palette=palettes.includes(read(paletteKey))?read(paletteKey):'mono';
 });
})();