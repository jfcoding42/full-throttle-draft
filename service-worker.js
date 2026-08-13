const CACHE='full-throttle-v8';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
function patchHtml(text){
  const polish=`
<style id="ft-public-polish">
:root{--surface:#0a1d12;--surface2:#0d2617;--gold:#f2c94c;--soft:#b7c6b9}
body{background-attachment:fixed}
header{position:sticky;top:0;z-index:40;box-shadow:0 8px 28px rgba(0,0,0,.28)}
header .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px}
header h1{letter-spacing:.025em}.sub{letter-spacing:.055em}
.card{box-shadow:0 12px 28px rgba(0,0,0,.18);backdrop-filter:blur(4px)}
.card h2{margin-top:2px}.call{border-color:#3a6547}.player{transition:background .15s ease}.player:hover{background:rgba(28,74,45,.42)}
button{transition:transform .12s ease,filter .12s ease}button:hover{filter:brightness(1.05)}button:active{transform:translateY(1px)}
.sitebar{max-width:1400px;margin:0 auto;padding:9px 14px 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center}.sitechip{font-size:11px;color:var(--soft);border:1px solid #31553b;background:#081a10;border-radius:999px;padding:5px 9px}.sitechip strong{color:var(--gold)}
.adrail{position:fixed;top:128px;width:145px;min-height:460px;border:1px dashed #45634c;border-radius:12px;background:rgba(7,23,14,.75);display:flex;align-items:center;justify-content:center;text-align:center;color:#829487;font-size:11px;line-height:1.45;padding:14px;z-index:5}.adrail.left{left:12px}.adrail.right{right:12px}.adrail b{display:block;color:#b6c4b8;margin-bottom:5px}.adrail span{opacity:.78}
.public-info{max-width:1400px;margin:18px auto 42px;padding:0 14px}.info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;align-items:start}.info-box{background:#081a10;border:1px solid #31553b;border-radius:12px;padding:13px;align-self:start}.info-box summary{cursor:pointer;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:12px;color:#e9eee9}.info-box p{font-size:11px;line-height:1.55;color:#aebcaf;margin:10px 0 0}.legal{font-size:10px;color:#809085;text-align:center;margin-top:14px;line-height:1.5}.mobile-ad{display:none;margin:12px 10px 0;border:1px dashed #45634c;border-radius:10px;text-align:center;color:#829487;font-size:10px;padding:9px}
@media(max-width:1710px){.adrail{display:none}}
@media(max-width:1000px){header{position:static}.info-grid{grid-template-columns:1fr 1fr}.sitebar{padding-top:7px}.mobile-ad{display:block}}
@media(max-width:650px){header .wrap{display:block}.sitebar{gap:5px}.sitechip{font-size:10px;padding:4px 7px}.info-grid{grid-template-columns:1fr}.public-info{margin-top:10px}.card{box-shadow:none}}
</style>`;
  const sitebar=`<div class="sitebar"><span class="sitechip"><strong>FULL THROTTLE</strong> Dynasty Draft Intelligence</span><span class="sitechip">Sleeper League Adaptive</span><span class="sitechip">Market + FT Blend</span><span class="sitechip">Built for Live Drafts</span></div><div class="mobile-ad">AD SPACE • reserved for a future sponsor or ad network</div>`;
  const ads=`<aside class="adrail left"><div><b>AD SPACE</b><span>Reserved for a future sponsor or ad network.</span></div></aside><aside class="adrail right"><div><b>AD SPACE</b><span>Reserved for a future sponsor or ad network.</span></div></aside>`;
  const footer=`<section class="public-info"><div class="info-grid"><details class="info-box"><summary>About</summary><p>Full Throttle is an independent fantasy-football draft assistant built to help dynasty managers compare market value with league-specific roster value in real time.</p></details><details class="info-box"><summary>How It Works</summary><p>Load a Sleeper league, choose your draft slot, and sync picks. The board blends dynasty startup market value with Full Throttle adjustments for scoring, lineup requirements, positional scarcity, age and roster construction.</p></details><details class="info-box"><summary>Privacy</summary><p>The app uses the public Sleeper API to read league and draft information you request. Draft preferences and lightweight state may be stored locally in your browser. Full Throttle does not require a Sleeper password.</p></details><details class="info-box"><summary>Disclaimer</summary><p>Rankings and recommendations are informational fantasy-football analysis, not guarantees of player performance or financial outcomes. Full Throttle is not affiliated with Sleeper or the NFL.</p></details></div><div class="legal">© Full Throttle Draft Lab • Independent fantasy-football tool • Player, team and league names belong to their respective owners.</div></section>`;
  const accordion=`<script id="ft-info-accordion">document.addEventListener('toggle',function(e){if(e.target&&e.target.matches('.info-box')&&e.target.open){document.querySelectorAll('.info-box').forEach(function(box){if(box!==e.target)box.open=false;});}},true);</script>`;
  return text
    .replace("function save(){localStorage.setItem('ftAdaptiveV3',JSON.stringify(state))}","function save(){try{const slim={teams:state.teams,slot:state.slot,overall:state.overall,rounds:state.rounds,draftId:state.draftId,drafted:state.drafted,league:state.league};localStorage.setItem('ftAdaptiveV3',JSON.stringify(slim));}catch(e){console.warn('Save skipped',e)}}")
    .replace('60% Full Throttle + 40% dynasty startup market. Market rank is no longer Sleeper search order.','60% Full Throttle + 40% dynasty startup market.')
    .replace('</head>',polish+'</head>')
    .replace('</header>','</header>'+sitebar+ads)
    .replace('</body>',footer+accordion+'</body>');
}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const u=new URL(event.request.url);
  if(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html'))){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(async resp=>{
      const text=patchHtml(await resp.text());
      return new Response(text,{status:resp.status,statusText:resp.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return resp;}).catch(()=>caches.match(event.request)));
});
