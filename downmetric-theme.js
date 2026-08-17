(()=>{
const css=`
:root{--g:#45b832!important;--p:#0b0f0c!important;--y:#45b832!important;--t:#f5f7f5!important;--m:#98a39c!important;--l:#253229!important;--dm-surface:#0c110d;--dm-surface2:#101612;--dm-line:#26332a;--dm-green:#47b936;--dm-green2:#2f8525}
*{box-sizing:border-box}
html{background:#050806}
body{background:radial-gradient(circle at 50% -8%,rgba(69,184,50,.12),transparent 32%),linear-gradient(180deg,#050806 0%,#07100a 44%,#050806 100%)!important;color:#f5f7f5!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;letter-spacing:0}
body:before{content:'';position:fixed;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent 0 49.9%,rgba(70,180,52,.025) 50%,transparent 50.1%);z-index:-1}
header{background:rgba(5,8,6,.96)!important;border-bottom:1px solid #1e2922!important;padding:0!important;box-shadow:0 12px 34px rgba(0,0,0,.24)}
header .wrap{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(330px,470px)!important;grid-template-areas:"brand account" "sub account"!important;column-gap:28px!important;row-gap:6px!important;align-items:center!important;padding:18px 18px 16px!important}
header h1{grid-area:brand!important;font-size:0!important;margin:0!important;text-transform:none!important;display:flex!important;align-items:center!important;min-width:0!important}
.dm-lockup{display:flex;align-items:center;gap:14px;min-width:0}
.dm-lockup img{width:60px;height:60px;display:block;object-fit:contain;border-radius:0!important;flex:0 0 60px;box-shadow:none!important}
.dm-lockup-copy{display:flex;flex-direction:column;justify-content:center;min-width:0;line-height:1}
.dm-lockup-name{font-size:25px;font-weight:900;letter-spacing:-.045em;font-style:italic;color:#f4f6f4;white-space:nowrap}
.dm-lockup-name span{color:#4fc43a}
.dm-lockup-tag{font-size:9px;margin-top:6px;letter-spacing:.17em;text-transform:uppercase;color:#8f9a93;white-space:nowrap}
#subtitle{grid-area:sub!important;margin:0 0 0 74px!important;color:#7f8b84!important;font-size:10px!important;font-weight:650!important;letter-spacing:.12em!important;text-transform:uppercase!important}
#dmAccount{grid-area:account!important;margin:0!important;min-width:0!important}
#dmAccount .call{margin:0!important;background:#090d0a!important;border:1px solid #243128!important;border-radius:12px!important;box-shadow:none!important;padding:10px 11px!important}
#dmAccount .small{color:#87928b!important}
#dmAccount button{width:auto!important;min-height:34px!important;padding:6px 11px!important;font-size:11px!important;border-radius:8px!important}
#dmAccount input,#dmAccount select{min-height:36px!important;font-size:12px!important;padding:7px 9px!important}
.dmbrand{display:none!important}
.dmnav{max-width:1400px!important;margin:14px auto 0!important;padding:0 18px!important;display:flex!important;gap:7px!important;overflow-x:auto!important;scrollbar-width:none!important}
.dmnav::-webkit-scrollbar{display:none}
.dmtab{width:auto!important;min-width:max-content!important;min-height:38px!important;padding:8px 13px!important;background:#090d0a!important;border:1px solid #26342b!important;color:#aeb8b1!important;border-radius:9px!important;box-shadow:none!important;font-size:11px!important;font-weight:700!important;letter-spacing:.01em!important;text-transform:none!important;transition:border-color .15s ease,background .15s ease,color .15s ease,transform .15s ease!important}
.dmtab:hover{border-color:#3f7e39!important;color:#fff!important;transform:translateY(-1px)}
.dmtab.active{background:#17301c!important;border-color:#3f9d32!important;color:#eef8ec!important;box-shadow:inset 0 0 0 1px rgba(79,196,58,.12)!important}
.wrap,.dmpane,.dmnav{max-width:1400px!important}
main.wrap.grid{padding:16px 18px 24px!important}
.grid{grid-template-columns:320px minmax(0,1fr) 360px!important;gap:14px!important;align-items:start!important}
.card,.dmcard{background:linear-gradient(180deg,rgba(15,20,16,.98),rgba(8,12,9,.99))!important;border:1px solid #26332a!important;border-radius:13px!important;padding:16px!important;box-shadow:0 14px 34px rgba(0,0,0,.14)!important;overflow:hidden}
.card>h2,.dmcard>h2{margin:0 0 14px!important;padding:0 0 11px!important;border-bottom:1px solid #202b23!important;color:#f5f7f5!important;font-size:13px!important;font-weight:800!important;letter-spacing:.075em!important;line-height:1.25!important;text-transform:uppercase!important}
.card h3{margin:18px 0 8px!important;color:#87958c!important;font-size:10px!important;font-weight:750!important;letter-spacing:.09em!important}
label{margin:9px 0 5px!important;color:#8e9992!important;font-size:11px!important;font-weight:600!important}
input,select{min-height:42px!important;background:#070b08!important;border:1px solid #2a3930!important;color:#f1f4f1!important;border-radius:9px!important;padding:8px 10px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.018)!important;transition:border-color .15s ease,box-shadow .15s ease!important}
input::placeholder{color:#66716a!important}
input:focus,select:focus{outline:none!important;border-color:#479f3a!important;box-shadow:0 0 0 3px rgba(71,159,58,.10)!important}
button{min-height:40px!important;background:linear-gradient(180deg,#3da62e,#2e7f24)!important;color:#fff!important;border:1px solid #48a93a!important;border-radius:9px!important;font-weight:750!important;font-size:12px!important;letter-spacing:.01em!important;text-transform:none!important;box-shadow:none!important;transition:filter .15s ease,transform .15s ease,border-color .15s ease!important}
button:hover{filter:brightness(1.06);transform:translateY(-1px)}
button:active{transform:translateY(0)}
.secondary{background:#111813!important;color:#dfe5e1!important;border-color:#2b3a30!important;box-shadow:none!important}
.row{gap:8px!important}
.call{background:#090e0b!important;border:1px solid #28362d!important;border-radius:10px!important;padding:10px 11px!important;color:#dfe4e0!important;line-height:1.5!important}
.small,.meta{color:#8d9891!important}
.board{max-height:70vh!important;border:1px solid #202b23!important;border-radius:10px!important;background:#080c09!important;overflow:auto!important;margin-top:10px!important}
.player{grid-template-columns:minmax(0,1fr) 52px 64px!important;gap:8px!important;min-height:56px!important;padding:10px 11px!important;border-bottom:1px solid #1e2921!important;transition:background .12s ease!important}
.player:last-child{border-bottom:0!important}
.player:hover{background:#0d1510!important}
.player b{font-size:12px!important;line-height:1.3!important}
.player .meta{display:block!important;margin-top:3px!important;font-size:10px!important;line-height:1.35!important}
.player>span{font-size:12px!important;font-weight:800!important;text-align:center!important;color:#53be42!important}
.player button{min-height:32px!important;padding:5px 8px!important;font-size:10px!important;border-radius:7px!important}
.rec{background:linear-gradient(180deg,#101711,#0b110c)!important;border:1px solid #2d4031!important;border-radius:11px!important;padding:12px!important;margin:0 0 9px!important;box-shadow:none!important}
.rec:last-child{margin-bottom:0!important}
.rec>b{display:block!important;padding-right:44px!important;font-size:13px!important;line-height:1.3!important}
.rec .meta{margin-top:4px!important;font-size:10px!important}
.rec .small{font-size:10px!important;line-height:1.45!important}
.rec button{min-height:34px!important;margin-top:9px!important;font-size:10px!important}
.score{color:#58c447!important;font-size:18px!important;font-weight:850!important}
.pills{gap:6px!important}.pill{background:#0a0f0b!important;border:1px solid #2a3930!important;border-radius:7px!important;padding:5px 8px!important;color:#dfe5e1!important}
.log{border-top:1px solid #202b23!important}.pick{padding:7px 2px!important;border-bottom:1px solid #1e2921!important;color:#aab3ad!important}
.dmpane{margin:16px auto!important;padding:0 18px 24px!important}
#dmFooter{color:#7d8981!important}#dmFooter .call{background:#080c09!important;border-color:#202b23!important}
@media(max-width:1180px){.grid{grid-template-columns:300px minmax(0,1fr) 330px!important}header .wrap{grid-template-columns:minmax(0,1fr) minmax(300px,400px)!important}}
@media(max-width:980px){
 header .wrap{grid-template-columns:1fr!important;grid-template-areas:"brand" "sub" "account"!important;row-gap:8px!important}
 #dmAccount{margin-top:4px!important}
 .grid{grid-template-columns:1fr!important;gap:12px!important}
 .board{max-height:56vh!important}
 .card,.dmcard{box-shadow:none!important}
}
@media(max-width:650px){
 body{background:linear-gradient(180deg,#040604 0%,#07100a 52%,#040604 100%)!important}
 header .wrap{padding:13px 12px 12px!important}
 .dm-lockup{gap:10px!important}
 .dm-lockup img{width:50px;height:50px;flex-basis:50px!important;border-radius:0!important}
 .dm-lockup-name{font-size:20px!important}
 .dm-lockup-tag{font-size:7px!important;letter-spacing:.13em!important;margin-top:5px!important}
 #subtitle{font-size:8px!important;letter-spacing:.09em!important;margin-left:60px!important}
 #dmAccount .row{grid-template-columns:1fr!important}
 #dmAccount button{width:100%!important}
 .dmnav{position:sticky!important;top:0!important;z-index:35!important;margin-top:0!important;padding:8px 12px!important;background:rgba(4,7,5,.96)!important;border-bottom:1px solid #1d2820!important;backdrop-filter:blur(12px)!important}
 .dmtab{font-size:10px!important;padding:7px 10px!important;min-height:34px!important}
 main.wrap.grid,.dmpane{padding-left:10px!important;padding-right:10px!important}
 .card,.dmcard{padding:13px!important;border-radius:11px!important}
 .card>h2,.dmcard>h2{font-size:12px!important;margin-bottom:12px!important;padding-bottom:10px!important}
 .player{grid-template-columns:minmax(0,1fr) 42px 58px!important;padding:9px!important}
 .player b{font-size:11px!important}.player .meta{font-size:9px!important}.player button{font-size:9px!important;padding:4px 6px!important}
 .rec{padding:11px!important}
}
`;
let s=document.getElementById('dmPremiumTheme');if(!s){s=document.createElement('style');s.id='dmPremiumTheme';document.head.appendChild(s)}s.textContent=css;
function mount(){
 document.body.classList.add('dm-premium');
 const h=document.querySelector('header .wrap h1');
 if(h&&!h.querySelector('.dm-lockup'))h.innerHTML='<span class="dm-lockup"><img src="./downmetric-logo.png?v=28" alt="DownMetric"><span class="dm-lockup-copy"><span class="dm-lockup-name">DOWN<span>METRIC</span></span><span class="dm-lockup-tag">Fantasy Football Intelligence</span></span></span>';
 const existing=h?.querySelector('.dm-lockup img');if(existing)existing.src='./downmetric-logo.png?v=28';
 const sub=document.getElementById('subtitle');if(sub&&!sub.dataset.dmTheme){sub.dataset.dmTheme='1';sub.textContent='DRAFT SMARTER • MANAGE SMARTER • WIN MORE'}
 const recTitle=document.getElementById('recs')?.closest('.card')?.querySelector('h2');if(recTitle)recTitle.textContent='Recommended Picks';
 const m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#07100a');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
setTimeout(mount,250);setTimeout(mount,900);
const perf=document.createElement('script');perf.src='./downmetric-performance.js?v=27';perf.defer=true;document.head.appendChild(perf);
})();