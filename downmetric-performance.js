(()=>{
'use strict';
function dmScoreRow(x){return Math.max(1,Math.min(99,Math.round(100-(x?.blend||100)*.72)))}
function dmRankedFast(){
  const drafted=new Set(state.drafted.map(x=>x.id));
  const a=state.players.filter(p=>!drafted.has(p.player_id)&&['QB','RB','WR','TE'].includes(p.position)&&p.active!==false);
  if(!a.length)return [];
  const playerById=new Map(state.players.map(p=>[p.player_id,p]));
  const c={QB:0,RB:0,WR:0,TE:0};
  for(const x of state.drafted){
    if(x.slot!==state.slot)continue;
    const p=playerById.get(x.id);
    if(p&&c[p.position]!=null)c[p.position]++;
  }
  const fcfg=cfg(),round=Math.ceil(state.overall/state.teams);
  const mrank=new Map(),fscore=new Map();
  function fitFast(p){
    let b=0;
    if(p.position==='QB'){
      if(fcfg.sf)b+=24+(c.QB<2?12:0)+(state.teams>=12?4:0);
      else {b-=12+(round<6?6:0)+(state.teams<=10?4:0);b+=(c.QB===0&&round>=8?8:0);b-=(c.QB>0?8:0)}
    }
    if(p.position==='WR')b+=Math.round(fcfg.ppr*5)+Math.min(6,fcfg.flex*2)+(c.WR<fcfg.wr?5:0);
    if(p.position==='RB')b+=(c.RB<fcfg.rb?5:0)+((+p.age||26)<26?4:0);
    if(p.position==='TE')b+=(c.TE<fcfg.te?4:0)+Math.min(12,Math.round(fcfg.tep*8));
    return b;
  }
  for(const p of a){
    const m=marketRank(p);mrank.set(p.player_id,m);
    fscore.set(p.player_id,105-m*.62+ageAdj(p)+fitFast(p));
  }
  const m=[...a].sort((x,y)=>mrank.get(x.player_id)-mrank.get(y.player_id));
  const f=[...a].sort((x,y)=>fscore.get(y.player_id)-fscore.get(x.player_id)||mrank.get(x.player_id)-mrank.get(y.player_id));
  const mr=new Map(),fr=new Map();
  m.forEach((p,i)=>mr.set(p.player_id,i+1));f.forEach((p,i)=>fr.set(p.player_id,i+1));
  return a.map(p=>{const mm=mr.get(p.player_id),ff=fr.get(p.player_id);return{p,m:mm,f:ff,blend:.4*mm+.6*ff,gap:mm-ff}}).sort((x,y)=>x.blend-y.blend||x.m-y.m);
}
function dmRenderFast(){
  if($('slot').options.length!==state.teams)$('slot').innerHTML=Array.from({length:state.teams},(_,i)=>`<option>${i+1}</option>`).join('');
  $('slot').value=state.slot;$('overall').value=state.overall;
  const playerById=new Map(state.players.map(p=>[p.player_id,p]));
  const c={QB:0,RB:0,WR:0,TE:0};
  for(const x of state.drafted){if(x.slot!==state.slot)continue;const p=playerById.get(x.id);if(p&&c[p.position]!=null)c[p.position]++}
  $('roster').innerHTML=Object.entries(c).map(([k,v])=>`<span class="pill"><b>${k}</b> ${v}</span>`).join('');
  const n=myNext();$('clock').innerHTML=n===state.overall?`<b>You are on the clock at ${state.overall}.</b>`:`Current pick <b>${state.overall}</b> • your next pick <b>${n||'—'}</b>`;
  const allRank=dmRankedFast();
  const q=$('search').value.toLowerCase(),po=$('pos').value;
  const rows=allRank.filter(x=>(!po||x.p.position===po)&&(!q||(`${name(x.p)} ${x.p.team||''}`).toLowerCase().includes(q))).slice(0,250);
  $('board').innerHTML=rows.map((x,i)=>{const p=x.p,flag=x.gap>=8?` • 🔥 +${x.gap} value`:x.gap<=-8?` • ⚠ ${x.gap} fade`:'';return `<div class="player"><div><b>#${i+1} ${name(p)}</b><span class="meta">${p.team||'FA'} • ${p.position} • Market #${x.m} • DM #${x.f}${flag}</span></div><span>${dmScoreRow(x)}</span><button onclick="add('${p.player_id}')">Pick</button></div>`}).join('');
  const top=allRank.slice(0,5),fcfg=cfg();
  $('recs').innerHTML=top.map(x=>{const p=x.p;return `<div class="rec"><span class="score">${dmScoreRow(x)}</span><b>${name(p)}</b><div class="meta">${p.position} • ${p.team||'FA'} • Market #${x.m} • DM #${x.f}</div><div class="small" style="margin-top:7px">${fcfg.sf&&p.position==='QB'?'Superflex QB scarcity boost. ':''}${!fcfg.sf&&p.position==='QB'?'1QB scarcity discount. ':''}Adjusted for your league and roster.</div><button style="margin-top:8px" onclick="add('${p.player_id}',state.slot,state.overall)">Draft for my team</button></div>`}).join('');
  $('log').innerHTML=state.drafted.slice().sort((a,b)=>b.overall-a.overall).map(x=>{const p=playerById.get(x.id);return `<div class="pick">#${x.overall} ${p?name(p):x.id} • Slot ${x.slot}${x.slot===state.slot?' • YOU':''}</div>`}).join('');
}
function mount(){
  if(typeof state==='undefined'||typeof $!=='function'||!$('board'))return setTimeout(mount,50);
  window.ranked=dmRankedFast;window.render=dmRenderFast;
  window.pickScore=p=>{const x=dmRankedFast().find(r=>r.p.player_id===p.player_id);return dmScoreRow(x)};
  $('search').oninput=dmRenderFast;$('pos').onchange=dmRenderFast;
  $('slot').onchange=()=>{state.slot=+$('slot').value;save();dmRenderFast()};
  $('overall').onchange=()=>{state.overall=+$('overall').value;save();dmRenderFast()};
  dmRenderFast();
}
mount();
})();