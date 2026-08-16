const CACHE='downmetric-v23';
const API_CACHE='dm-api-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('downmetric-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
function patchHtml(text){
 text=text.replaceAll('FULL THROTTLE','DOWNMETRIC').replaceAll('Full Throttle','DownMetric').replaceAll('FT #','DM #');
 text=text.replace('60% DownMetric + 40% dynasty startup market. Market rank is no longer Sleeper search order.','60% DownMetric + 40% dynasty startup market.');
 text=text.replace('Adaptive Scouting Formula','DownMetric Scouting Formula');
 text=text.replace('<h1>🏈 DownMetric Football Draft Lab</h1>','<h1>DownMetric Draft Lab</h1>');
 text=text.replace('</head>','<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32.png?v=23"><link rel="icon" type="image/png" sizes="64x64" href="./favicon-64.png?v=23"><link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=23"><meta name="apple-mobile-web-app-title" content="DownMetric"></head>');
 text=text.replace("function save(){localStorage.setItem('ftAdaptiveV3',JSON.stringify(state))}","function save(){try{const slim={teams:state.teams,slot:state.slot,overall:state.overall,rounds:state.rounds,draftId:state.draftId,drafted:state.drafted,league:state.league};localStorage.setItem('ftAdaptiveV3',JSON.stringify(slim));}catch(e){console.warn('Save skipped',e)}}");
 text=text.replace('async function loadLeague(){',`async function dmFetchPlayers(){const url='https://api.sleeper.app/v1/players/nfl';try{const c=await caches.open('${API_CACHE}');const hit=await c.match(url);if(hit){fetch(url).then(r=>{if(r.ok)c.put(url,r.clone())}).catch(()=>{});return hit.clone()}const r=await fetch(url);if(r.ok)c.put(url,r.clone());return r}catch(e){return fetch(url)}}async function loadLeague(){`);
 text=text.replace("fetch('https://api.sleeper.app/v1/players/nfl')","dmFetchPlayers()");
 text=text.replace('</body>','<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script src="./downmetric-ui.js?v=23"></script><script src="./league-mode.js?v=23"></script><script src="./dm-redraft.js?v=23"></script><script src="./downmetric-account.js?v=23"></script><script src="./downmetric-footer.js?v=23"></script><script src="./downmetric-picklog.js?v=23"></script><script src="./downmetric-theme.js?v=23"></script></body>');
 return text;
}
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const u=new URL(event.request.url);
 if(u.origin!==location.origin)return;
 if(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')){
   event.respondWith(fetch(event.request,{cache:'no-store'}).then(async r=>new Response(patchHtml(await r.text()),{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})).catch(()=>caches.match(event.request)));
   return;
 }
 event.respondWith(caches.open(CACHE).then(async c=>{
   const hit=await c.match(event.request);
   if(hit){event.waitUntil(fetch(event.request).then(r=>{if(r.ok)c.put(event.request,r.clone())}).catch(()=>{}));return hit}
   const r=await fetch(event.request);
   if(r.ok)c.put(event.request,r.clone());
   return r;
 }));
});
