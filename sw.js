'use strict';
const CACHE_NAME='placement-atlas-shell-2026-11-21-v134-css-bundle-pruned';
const ROOT=new URL('./',self.registration.scope).href;
const EXTRA_ASSETS=[
  'css-bundle-preflight.css?v=20261122bundle1',
  'css-bundle-core.css?v=20261122bundle1',
  'css-bundle-refinements.css?v=20261122bundle1',
  'css-bundle-workspace-a.css?v=20261122bundle1',
  'css-bundle-workspace-b.css?v=20261122bundle1',
  'css-bundle-final.css?v=20261122bundle1',
  'linkedin-consent.js?v=20261121b',
  'linkedin-consent.css?v=20261120a',
  'member-profile.js?v=20261120latin1',
  'footer-viewport.js?v=20261113responsive1',
  'offer-journey.js?v=20261120compacthero1',
  'atlas-navigation.js?v=20261121clarity1',
  'shortlist-refinement.js?v=20261120ranking-menu1',
  'learning-library.js?v=20261121industry3',
  'learning-industry-guide.css?v=20261121industry2',
  'industry-foundation-training.html',
  'atlas-interactions.js?v=20261110reset1',
  'premium-discovery-preview.js?v=20261121clarity1',
  'premium-card-tabs.js?v=20261119swv1',
  'premium-workspace.js?v=20261111workspace2',
  'placement-fixes.js?v=20261111fix3',
  'placement-mobile-navigation.js?v=20261113identity1',
  'placement-profile.js?v=20261113turnstile1',
  'placement-titles.js?v=20261120cardfix1',
  'placement-atlas-globe.svg',
  'favicon.svg',
  'placement-atlas-compass-pin.webp?v=20261111logo2',
  'manifest.webmanifest',
  'pwa.js?v=20261114vector1',
  'atlas-turnstile.js?v=20261113turnstile1',
  'cloud-password-auth.js?v=20261113turnstile1',
  'supabase-cloud.js?v=20261120accountaudit1',
  'google-identity.js?v=20261113turnstile1',
  'supabase-config.js?v=20261112gsi2',
  'app.js?v=20261121clarity1',
  'app-base.js?v=20261120auditperf2',
  'app-product.js?v=20261121clarity1',
  'generic-public.js?v=20261120accountaudit1',
  'sector-map.js?v=20261121clarity1',
  'onboarding.js?v=20261121quiz2',
  'deadline-dates.js?v=20261120compacthero1',
  'map-basemap.js?v=20261119roads1',
  'workspace-ux.js?v=20261120compacthero2',
  'rail-stations.js?v=20261109national1',
  'location-blacklist.js?v=20261111copy4',
  'specialist-settings.js',
  'area-rules.js',
  'locations-bundled.js?v=20261106a',
  'tube-stations.js?v=20261108tfl2',
  'desk-enhancements.js?v=20261111quiet5',
  'tinder-mode.js?v=20261121mobile3',
  'swipe-mobile-navigation.js?v=20261121mobile3',
  'atlas-i18n-parity.js?v=20261121parity1',
  'atlas-i18n-quiz.js?v=20261121quiz1',
  'atlas-i18n-east-asia.js?v=20261121eastasia1',
  'atlas-i18n.js?v=20261121clarity1',
  'commute-guide.js?v=20261106a',
  'commute-profile.js?v=20261106pcfix',
  'programme-preview.js?v=20261111preview2',
  'location-guides.js?v=20261109national1',
  'pay-estimate.js?v=20261105c',
  'research-core.js?v=1',
  'research.js?v=20261015-no-ratings',
  'preferences-ui.js?v=20261111slider2',
  'theme-outcome.js?v=20261106i',
  'simulator.js?v=20261120simnav1',
  'motion-effects.js?v=20261121nav-pill-fix1',
  'explore-efficiency.js?v=20261120hero1',
  'atlas-card-repairs.js?v=20261120cardfix1',
  'session-ui.js?v=20261121zoom70b',
  'interface-polish.js?v=20261107responsive2',
  'data/oriel-2026.part-01.txt',
  'data/oriel-2026.part-02.txt',
  'data/oriel-2026.part-03.txt',
  'data/oriel-2026.part-04.txt',
  'data/oriel-2026.part-05.txt',
  'data/london-borough-labels.geojson',
  'data/tube-stations.json',
  'data/rail-stations-ew.json?v=20261109national1',
  'data/rail-stations-ew-ODbL.txt',
  'data/rail-stations-ew-ATTRIBUTION.md',
  'locations.json',
  'map-styles/editorial-light.json?v=20261109roads3',
  'map-styles/editorial-dark.json?v=20261109roads3',
  'vendor/leaflet.js',
  'vendor/leaflet.css',
  'icons/placement-atlas-192.png',
  'icons/placement-atlas-512.png',
  'fonts/PlusJakartaSans-VariableFont_wght.ttf'
];
const localURL=value=>new URL(value,ROOT).href;
const MAP_ASSET_CACHE='placement-atlas-map-assets-v1';
const MAP_TILE_CACHE='placement-atlas-map-tiles-v1';
const REMOTE_MAP_ASSETS=[
 'https://cdn.jsdelivr.net/npm/maplibre-gl@5.0.0/dist/maplibre-gl.js',
 'https://cdn.jsdelivr.net/npm/maplibre-gl@5.0.0/dist/maplibre-gl.css',
 'https://cdn.jsdelivr.net/npm/@maplibre/maplibre-gl-leaflet@0.1.4/leaflet-maplibre-gl.js'
];
const MAP_TILE_HOSTS=new Set(['api.maptiler.com','tile.openstreetmap.org']);
const trimMapTileCache=async cache=>{
 const keys=await cache.keys();
 for(let i=0;i<keys.length-700;i++)await cache.delete(keys[i]);
};
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    const urls=new Set([localURL('./'),localURL('index.html'),localURL('manifest.webmanifest'),localURL('icons/placement-atlas-192.png'),localURL('pwa.js?v=20261114vector1'),...EXTRA_ASSETS.map(localURL)]);
    // Do not activate a new worker unless the current app shell was
    // successfully fetched. This preserves the previous working offline app
    // if an update is attempted during a connection failure.
    const response=await fetch(localURL('index.html'),{cache:'reload'});
    if(!response.ok)throw Error('Placement Atlas app shell could not be refreshed.');
    await cache.put(localURL('index.html'),response.clone());
    const html=await response.text();
    for(const match of html.matchAll(/(?:src|href)=["']([^"'#]+)["']/g)){
      try{const url=new URL(match[1],ROOT);if(url.origin===self.location.origin)urls.add(url.href)}catch{}
    }
    await Promise.all([...urls].map(async url=>{
      try{const response=await fetch(url,{cache:'reload'});if(response.ok&&response.type==='basic')await cache.put(url,response.clone())}catch{}
    }));
    // WebGL packages are optional. Cache them on first Editorial use rather
    // than downloading large CDN assets during the fast Streets install.
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('placement-atlas-shell-')&&key!==CACHE_NAME).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||request.headers.has('range'))return;
  const url=new URL(request.url);
  if(REMOTE_MAP_ASSETS.includes(url.href)){
    event.respondWith((async()=>{
      const cache=await caches.open(MAP_ASSET_CACHE);
      const cached=await cache.match(request,{ignoreVary:true});
      if(cached)return cached;
      try{
        const response=await fetch(request);
        if(response.ok)await cache.put(url.href,response.clone());
        return response;
      }catch{return Response.error();}
    })());
    return;
  }
  if(MAP_TILE_HOSTS.has(url.hostname)){
    event.respondWith((async()=>{
      const cache=await caches.open(MAP_TILE_CACHE);
      const cached=await cache.match(request,{ignoreVary:true});
      if(cached)return cached;
      try{
        const response=await fetch(request);
        if(response.ok||response.type==='opaque'){
          try{await cache.put(request,response.clone());await trimMapTileCache(cache)}catch{}
        }
        return response;
      }catch{return Response.error();}
    })());
    return;
  }
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request);
        if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(request,response.clone())}
        return response;
      }catch{
        return await caches.match(request)||await caches.match(localURL('index.html'))||new Response('Placement Atlas is offline. Reconnect and refresh to continue.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  if(!/\.(?:js|css|json|geojson|txt|svg|png|webp|webmanifest|html|ttf)$/i.test(url.pathname))return;
  event.respondWith((async()=>{
    const cached=await caches.match(request);
    try{
      const response=await fetch(request);
      if(response.ok&&response.type==='basic'){const cache=await caches.open(CACHE_NAME);await cache.put(request,response.clone())}
      return response;
    }catch{return cached||Response.error()}
  })());
});
