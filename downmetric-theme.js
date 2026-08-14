(()=>{
const css=`
:root{--g:#48b52d!important;--p:#0b0e0c!important;--y:#48b52d!important;--t:#f7f8f5!important;--m:#9da6a0!important;--l:#263329!important}
html{background:#050706}
body{background:
radial-gradient(circle at 50% -10%,rgba(56,145,43,.18),transparent 34%),
linear-gradient(180deg,#050706 0%,#07100a 48%,#050706 100%)!important;color:#f7f8f5!important}
body:before{content:'';position:fixed;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent 0 49.8%,rgba(82,166,52,.035) 50%,transparent 50.2%),repeating-linear-gradient(0deg,transparent 0 119px,rgba(255,255,255,.012) 120px);z-index:-1}
header{background:rgba(4,7,5,.96)!important;border-bottom:1px solid #213126!important;padding:14px 0!important;box-shadow:0 10px 30px rgba(0,0,0,.28)}
header .wrap{padding-top:8px!important;padding-bottom:8px!important}
header h1{font-size:0!important;margin:0!important;text-transform:none!important;display:flex!important;align-items:center!important;gap:12px!important}
.dm-lockup{display:flex;align-items:center;gap:12px;min-width:0}
.dm-lockup img{width:58px;height:58px;border-radius:16px;box-shadow:0 6px 24px rgba(53,170,35,.18)}
.dm-lockup-copy{display:flex;flex-direction:column;line-height:1}
.dm-lockup-name{font-size:25px;font-weight:950;letter-spacing:-.04em;font-style:italic;color:#f5f5f3}
.dm-lockup-name span{color:#50b93a}
.dm-lockup-tag{font-size:9px;margin-top:5px;letter-spacing:.16em;text-transform:uppercase;color:#a2aaa4}
#subtitle{margin-top:8px!important;color:#8d9891!important;letter-spacing:.05em}
.dmbrand{display:none!important}
.dmnav{max-width:1400px!important;margin:12px auto 0!important;padding:0 14px 4px!important;gap:8px!important}
.dmtab{background:#090d0a!important;border:1px solid #27342a!important;color:#cdd4cf!important;border-radius:9px!important;box-shadow:none!important;font-weight:750!important;transition:.18s ease!important}
.dmtab:hover{border-color:#4aa43a!important;color:white!important;transform:translateY(-1px)}
.dmtab.active{background:linear-gradient(180deg,#2f8d24,#246e1c)!important;border-color:#56bc3d!important;color:white!important;box-shadow:0 5px 18px rgba(55,153,38,.18)!important}
.wrap{max-width:1400px!important}
.grid{gap:16px!important}
.card,.dmcard{background:linear-gradient(180deg,rgba(15,19,16,.97),rgba(7,10,8,.98))!important;border:1px solid #27342a!important;border-radius:14px!important;box-shadow:0 16px 40px rgba(0,0,0,.18)!important}
.card h2,.dmcard h2{color:#f7f8f5!important;font-weight:900!important;letter-spacing:.085em!important}
.card h3{color:#8fa095!important}
.call{background:linear-gradient(180deg,#0b100d,#080c09)!important;border:1px solid #29372c!important;border-radius:10px!important;color:#e5e9e6!important}
input,select{background:#070a08!important;border:1px solid #304035!important;color:#f5f7f5!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.018)!important}
input:focus,select:focus{outline:none!important;border-color:#4daf39!important;box-shadow:0 0 0 3px rgba(76,174,55,.10)!important}
button{background:linear-gradient(180deg,#42a92f,#2f8024)!important;color:white!important;border:1px solid #56b941!important;box-shadow:0 8px 18px rgba(34,112,27,.15)!important}
button:hover{filter:brightness(1.08)}
.secondary{background:#101712!important;color:#eef2ef!important;border-color:#304034!important;box-shadow:none!important}
.player{border-bottom-color:#202c23!important}
.player:hover{background:rgba(61,151,43,.055)!important}
.rec{background:linear-gradient(180deg,#101810,#0b110c)!important;border:1px solid #34543a!important}
.score{color:#58c43f!important}
.pill{background:#0a0f0b!important;border-color:#304035!important;color:#edf0ed!important}
#dmAccount .call{background:#080c09!important;border-color:#29372c!important;box-shadow:0 12px 30px rgba(0,0,0,.16)!important}
#dmAccount button{min-height:36px!important;padding:7px 12px!important;font-size:12px!important}
#dmAccount select{min-height:38px!important}
#dmFooter{color:#89958d!important}
#dmFooter .call{background:#080b09!important}
@media(max-width:1000px){.grid{gap:12px!important}.card,.dmcard{box-shadow:none!important}}
@media(max-width:650px){
 body{background:linear-gradient(180deg,#030504 0%,#07100a 50%,#040605 100%)!important}
 header{padding:8px 0!important}
 .dm-lockup img{width:46px;height:46px;border-radius:13px}
 .dm-lockup-name{font-size:20px}
 .dm-lockup-tag{font-size:7px;letter-spacing:.12em}
 .dmnav{position:sticky!important;top:0!important;background:rgba(3,6,4,.96)!important;border-bottom:1px solid #1f2c22!important;padding-top:8px!important;padding-bottom:8px!important;backdrop-filter:blur(12px)}
 .dmtab{font-size:11px!important;padding:8px 10px!important}
 .card,.dmcard{border-radius:13px!important;padding:14px!important}
}
`;
const s=document.createElement('style');s.id='dmPremiumTheme';s.textContent=css;document.head.appendChild(s);
function mount(){
 document.body.classList.add('dm-premium');
 const h=document.querySelector('header .wrap h1');
 if(h&&!h.querySelector('.dm-lockup')) h.innerHTML='<span class="dm-lockup"><img src="./icon-192.png?v=21" alt="DownMetric"><span class="dm-lockup-copy"><span class="dm-lockup-name">DOWN<span>METRIC</span></span><span class="dm-lockup-tag">Fantasy Football Intelligence</span></span></span>';
 const sub=document.getElementById('subtitle'); if(sub&&!sub.dataset.dmTheme){sub.dataset.dmTheme='1';sub.textContent='DRAFT SMARTER • MANAGE SMARTER • WIN MORE';}
 let m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#07100a');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
setTimeout(mount,400);
})();