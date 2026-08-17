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
function dmRecommend(allRank,c,fcfg){
  const starters={
    QB:Math.max(1,fcfg.qb||1),
    RB:Math.max(1,fcfg.rb||0),
    WR:Math.max(1,fcfg.wr||0),
    TE:Math.max(1,fcfg.te||0)
  };
  if(fcfg.sf)starters.QB=Math.max(2,starters.QB);
  const deficits={};
  for(const pos of ['QB','RB','WR','TE'])deficits[pos]=Math.max(0,starters[pos]-c[pos]);
  const flexFilled=Math.max(0,c.RB-starters.RB)+Math.max(0,c.WR-starters.WR)+Math.max(0,c.TE-starters.TE);
  const flexNeed=Math.max(0,(fcfg.flex||0)-flexFilled);
  function needBoost(p){
    const pos=p.position;let b=0;
    if(deficits[pos]>0){
      if(pos==='QB')b+=fcfg.sf?28:18;
      else if(pos==='RB'||pos==='WR')b+=22;
      else if(pos==='TE')b+=20;
      b+=Math.min(10,(deficits[pos]-1)*5);
    }
    if(flexNeed>0&&['RB','WR','TE'].includes(pos))b+=8;
    if(pos==='WR')b+=Math.round((fcfg.ppr||0)*4);
    if(pos==='TE')b+=Math.min(10,Math.round((fcfg.tep||0)*8));
    if(pos==='QB'&&fcfg.sf&&c.QB<2)b+=8;
    if(pos==='QB'&&!fcfg.sf&&c.QB>=1)b-=12;
    return b;
  }
  function reason(x,boost){
    const p=x.p,pos=p.position;
    if(deficits[pos]>0){
      if(pos==='QB'&&fcfg.sf)return c.QB===0?'Fills your biggest Superflex QB need.':'Helps fill your QB2 / Superflex spot.';
      return `Fills a starting ${pos} need on your roster.`;
    }
    if(flexNeed>0&&['RB','WR','TE'].includes(pos))return 'Helps fill your remaining FLEX spots while keeping strong board value.';
    if(pos==='TE'&&(fcfg.tep||0)>0)return 'TE-premium scoring increases this pick’s value for your league.';
    if(pos==='QB'&&fcfg.sf)return 'Quarterback scarcity matters more in Superflex.';
    if(x.gap>=8)return 'Strong DownMetric value compared with the market.';
    return 'Best combination of remaining board value and roster fit.';
  }
  return allRank.slice(0,100).map(x=>{
    const boost=needBoost(x.p);
    return {...x,needBoost:boost,recMetric:x.blend-boost*.72,reason:reason(x,boost)};
  }).sort((a,b)=>a.recMetric-b.recMetric||a.blend-b.blend).slice(0,5);
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
  const fcfg=cfg(),top=dmRecommend(allRank,c,fcfg);
  const recTitle=$('recs')?.closest('.card')?.querySelector('h2');if(recTitle)recTitle.textContent='Recommended Picks';
  $('recs').innerHTML=top.map((x,i)=>{const p=x.p;const score=Math.max(1,Math.min(99,dmScoreRow(x)+Math.round(x.needBoost*.35)));return `<div class="rec"><span class="score">${score}</span><b>${i===0?'★ ':''}${name(p)}</b><div class="meta">${p.position} • ${p.team||'FA'} • Board #${Math.round(x.blend)}${x.needBoost?` • Need +${x.needBoost}`:''}</div><div class="small" style="margin-top:7px">${x.reason}</div><button style="margin-top:8px" onclick="add('${p.player_id}',state.slot,state.overall)">Draft for my team</button></div>`}).join('');
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