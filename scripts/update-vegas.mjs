import fs from 'node:fs/promises';
const key=process.env.ODDS_API_KEY;if(!key)throw Error('Missing ODDS_API_KEY');
const api='https://api.the-odds-api.com/v4',sport='americanfootball_nfl',markets=['player_pass_rush_reception_yds','player_pass_rush_reception_tds','player_receptions'];
const med=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;let m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2};
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const sleeper=await fetch('https://api.sleeper.app/v1/players/nfl').then(r=>r.json()),byName=new Map();
for(const p of Object.values(sleeper)){if(!p?.player_id)continue;const n=p.full_name||`${p.first_name||''} ${p.last_name||''}`.trim();if(n)byName.set(norm(n),{id:p.player_id,name:n,pos:p.position||''})}
const events=await fetch(`${api}/sports/${sport}/events?apiKey=${encodeURIComponent(key)}`).then(async r=>{if(!r.ok)throw Error(await r.text());return r.json()}),acc=new Map();
for(const ev of events){const u=`${api}/sports/${sport}/events/${ev.id}/odds?apiKey=${encodeURIComponent(key)}&regions=us&markets=${markets.join(',')}&oddsFormat=american`;const d=await fetch(u).then(async r=>r.ok?r.json():null);if(!d)continue;for(const b of d.bookmakers||[])for(const m of b.markets||[])for(const o of m.outcomes||[]){if(!o.description||!Number.isFinite(+o.point))continue;const k=norm(o.description),r=acc.get(k)||{};(r[m.key]??=[]).push(+o.point);acc.set(k,r)}}
const players={};for(const [k,r] of acc){const s=byName.get(k);if(!s)continue;const y=med(r.player_pass_rush_reception_yds||[]),td=med(r.player_pass_rush_reception_tds||[]),rec=med(r.player_receptions||[]);const signal=(y??0)*(s.pos==='QB'?.04:.10)+(td??0)*(s.pos==='QB'?4:6)+(rec??0)*.5;players[s.id]={name:s.name,position:s.pos,signal:+signal.toFixed(2),props:{combined_yards:y,combined_tds:td,receptions:rec}}}
await fs.writeFile('vegas-signals.json',JSON.stringify({updated_at:new Date().toISOString(),source:'The Odds API consensus',players},null,2)+'\n');
console.log(`Vegas signals updated for ${Object.keys(players).length} players.`);
