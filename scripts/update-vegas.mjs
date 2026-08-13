import fs from 'node:fs/promises';
const key=process.env.ODDS_API_KEY;if(!key)throw Error('Missing ODDS_API_KEY');
const api='https://api.the-odds-api.com/v4',sport='americanfootball_nfl';
const med=a=>{a=(a||[]).filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2};
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const TEAM={
'Arizona Cardinals':'ARI','Atlanta Falcons':'ATL','Baltimore Ravens':'BAL','Buffalo Bills':'BUF','Carolina Panthers':'CAR','Chicago Bears':'CHI','Cincinnati Bengals':'CIN','Cleveland Browns':'CLE','Dallas Cowboys':'DAL','Denver Broncos':'DEN','Detroit Lions':'DET','Green Bay Packers':'GB','Houston Texans':'HOU','Indianapolis Colts':'IND','Jacksonville Jaguars':'JAX','Kansas City Chiefs':'KC','Las Vegas Raiders':'LV','Los Angeles Chargers':'LAC','Los Angeles Rams':'LAR','Miami Dolphins':'MIA','Minnesota Vikings':'MIN','New England Patriots':'NE','New Orleans Saints':'NO','New York Giants':'NYG','New York Jets':'NYJ','Philadelphia Eagles':'PHI','Pittsburgh Steelers':'PIT','San Francisco 49ers':'SF','Seattle Seahawks':'SEA','Tampa Bay Buccaneers':'TB','Tennessee Titans':'TEN','Washington Commanders':'WAS'};
async function getJson(url,label){const r=await fetch(url);const used=r.headers.get('x-requests-used'),remain=r.headers.get('x-requests-remaining'),last=r.headers.get('x-requests-last');console.log(`${label}: HTTP ${r.status} | credits last=${last??'?'} used=${used??'?'} remaining=${remain??'?'}`);const text=await r.text();if(!r.ok){console.warn(`${label} response: ${text.slice(0,500)}`);return null}try{return JSON.parse(text)}catch{console.warn(`${label}: invalid JSON`);return null}}
const sleeper=await fetch('https://api.sleeper.app/v1/players/nfl').then(r=>r.json());
const byName=new Map();for(const p of Object.values(sleeper)){if(!p?.player_id)continue;const n=p.full_name||`${p.first_name||''} ${p.last_name||''}`.trim();if(n)byName.set(norm(n),{id:String(p.player_id),name:n,pos:p.position||'',team:p.team||''})}

// Cheap, reliable layer: one request gets totals + spreads for the whole NFL slate.
const odds=await getJson(`${api}/sports/${sport}/odds?apiKey=${encodeURIComponent(key)}&regions=us&markets=totals,spreads&oddsFormat=american`,'NFL totals/spreads')||[];
const teamEnv={};
for(const game of odds){const totals=[],homeSpreads=[];for(const b of game.bookmakers||[])for(const m of b.markets||[]){if(m.key==='totals')for(const o of m.outcomes||[])if(o.name==='Over'&&Number.isFinite(+o.point))totals.push(+o.point);if(m.key==='spreads')for(const o of m.outcomes||[])if(o.name===game.home_team&&Number.isFinite(+o.point))homeSpreads.push(+o.point)}const total=med(totals),hs=med(homeSpreads);if(total==null)continue;const homeImp=hs==null?total/2:total/2-hs/2,awayImp=total-homeImp;const home=TEAM[game.home_team],away=TEAM[game.away_team];if(home)teamEnv[home]={implied:+homeImp.toFixed(2),spread:hs==null?null:+hs.toFixed(2),total:+total.toFixed(2)};if(away)teamEnv[away]={implied:+awayImp.toFixed(2),spread:hs==null?null:+(-hs).toFixed(2),total:+total.toFixed(2)}}
console.log(`Team Vegas environments built for ${Object.keys(teamEnv).length} teams.`);

// Optional player layer. Query only the four nearest games to protect the free quota.
const events=await getJson(`${api}/sports/${sport}/events?apiKey=${encodeURIComponent(key)}`,'NFL events')||[];
const now=Date.now(),near=events.filter(e=>new Date(e.commence_time).getTime()>now-2*3600000).sort((a,b)=>new Date(a.commence_time)-new Date(b.commence_time)).slice(0,4);
const propMarkets=['player_pass_rush_reception_yds','player_receptions'];const propAcc=new Map();let propEvents=0;
for(const ev of near){const u=`${api}/sports/${sport}/events/${ev.id}/odds?apiKey=${encodeURIComponent(key)}&regions=us&markets=${propMarkets.join(',')}&oddsFormat=american`;const d=await getJson(u,`Props ${ev.away_team} @ ${ev.home_team}`);if(!d)continue;let found=0;for(const b of d.bookmakers||[])for(const m of b.markets||[])for(const o of m.outcomes||[]){if(!o.description||!Number.isFinite(+o.point))continue;const k=norm(o.description),r=propAcc.get(k)||{};(r[m.key]??=[]).push(+o.point);propAcc.set(k,r);found++}if(found)propEvents++;}
console.log(`Player props found in ${propEvents}/${near.length} checked games for ${propAcc.size} named players.`);

const players={};
for(const p of Object.values(sleeper)){if(!p?.player_id||!['QB','RB','WR','TE'].includes(p.position)||!p.team)continue;const env=teamEnv[p.team];if(!env)continue;let signal=(env.implied-22)*0.32;if(p.position==='RB'&&env.spread!=null&&env.spread<0)signal+=Math.min(1.5,Math.abs(env.spread)*0.08);const n=p.full_name||`${p.first_name||''} ${p.last_name||''}`.trim(),pr=propAcc.get(norm(n));let propY=null,rec=null;if(pr){propY=med(pr.player_pass_rush_reception_yds||[]);rec=med(pr.player_receptions||[]);if(propY!=null)signal+=(propY-(p.position==='QB'?250:55))*(p.position==='QB'?.012:.025);if(rec!=null)signal+=(rec-3.5)*.18}players[String(p.player_id)]={name:n,position:p.position,team:p.team,signal:+Math.max(-6,Math.min(8,signal)).toFixed(2),team_implied:env.implied,game_total:env.total,team_spread:env.spread,props:{combined_yards:propY,receptions:rec}}}
const output={updated_at:new Date().toISOString(),source:'The Odds API consensus',mode:propAcc.size?'team lines + available player props':'team lines fallback',teams:teamEnv,players};
await fs.writeFile('vegas-signals.json',JSON.stringify(output,null,2)+'\n');
console.log(`Vegas signals updated for ${Object.keys(players).length} players (${propAcc.size} with raw prop-name matches available).`);
