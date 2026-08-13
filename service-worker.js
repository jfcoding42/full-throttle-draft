const CACHE='full-throttle-v6';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
function patchHtml(text){
  return text
    .replace("function save(){localStorage.setItem('ftAdaptiveV3',JSON.stringify(state))}","function save(){try{const slim={teams:state.teams,slot:state.slot,overall:state.overall,rounds:state.rounds,draftId:state.draftId,drafted:state.drafted,league:state.league};localStorage.setItem('ftAdaptiveV3',JSON.stringify(slim));}catch(e){console.warn('Save skipped',e)}}")
    .replace('60% Full Throttle + 40% dynasty startup market. Market rank is no longer Sleeper search order.','60% Full Throttle + 40% dynasty startup market.');
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
