(()=>{
  const clean=s=>String(s??'').trim();
  function playerFor(id){
    try{return state?.players?.find(p=>String(p.player_id)===String(id))||null}catch(e){return null}
  }
  function labelFor(id){
    const p=playerFor(id);
    if(!p)return null;
    const nm=p.full_name||`${p.first_name||''} ${p.last_name||''}`.trim();
    const tm=clean(p.team)||'FA';
    const pos=clean(p.position);
    return `${nm}${pos?` • ${pos}`:''} • ${tm}`;
  }
  function enhance(){
    const log=document.getElementById('log');
    if(!log)return;
    for(const row of log.children){
      const raw=row.dataset.dmRaw||row.textContent||'';
      if(!row.dataset.dmRaw)row.dataset.dmRaw=raw;
      const m=raw.match(/^\s*#(\d+)\s+(\d+)\s+•\s*Slot\s+(\d+)(.*)$/i);
      if(!m)continue;
      const [,pick,id,slot,tail]=m;
      const lab=labelFor(id);
      if(lab)row.textContent=`#${pick} ${lab} • Slot ${slot}${tail||''}`;
    }
  }
  const log=document.getElementById('log');
  if(log)new MutationObserver(enhance).observe(log,{childList:true,subtree:true,characterData:true});
  document.getElementById('sync')?.addEventListener('click',()=>setTimeout(enhance,400));
  document.getElementById('load')?.addEventListener('click',()=>setTimeout(enhance,700));
  setInterval(enhance,1200);
  enhance();
})();
