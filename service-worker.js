const CACHE='downmetric-v24';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
function patchHtml(text){
 text=text.replaceAll('FULL THROTTLE','DOWNMETRIC').replaceAll('Full Throttle','DownMetric').replaceAll('FT #','DM #');
 text=text.replace('60% DownMetric + 40% dynasty startup market. Market rank is no longer Sleeper search order.','60% DownMetric + 40% dynasty startup market.');
 text=text.replace('Adaptive Scouting Formula','DownMetric Scouting Formula');
 text=text.replace('<h1>🏈 DownMetric Football Draft Lab</h1>','<h1>DownMetric Draft Lab</h1>');
 text=text.replace('</head>','<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32.png?v=24"><link rel="icon" type="image/png" sizes="64x64" href="./favicon-64.png?v=24"><link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=24"><meta name="apple-mobile-web-app-title" content="DownMetric"></head>');
 text=text.replace("function save(){localStorage.setItem('ftAdaptiveV3',JSON.stringify(state))}","function save(){try{const slim={teams:state.teams,slot:state.slot,overall:state.overall,rounds:state.rounds,draftId:state.draftId,drafted:state.drafted,league:state.league};localStorage.setItem('ftAdaptiveV3',JSON.stringify(slim));}catch(e){console.warn('Save skipped',e)}}");
 text=text.replace('</body>','<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script src="./downmetric-ui.js?v=24"></script><script src="./league-mode.js?v=24"></script><script src="./dm-redraft.js?v=24"></script><script src="./downmetric-account.js?v=24"></script><script src="./downmetric-footer.js?v=24"></script><script src="./downmetric-picklog.js?v=24"></script><script src="./downmetric-theme.js?v=24"></script></body>');
 return text;
}
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url);if(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html'))){event.respondWith(fetch(event.request,{cache:'no-store'}).then(async r=>new Response(patchHtml(await r.text()),{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})));return;}event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));});
