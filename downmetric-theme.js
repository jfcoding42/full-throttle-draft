(()=>{
const css=`
:root{--g:#45b832!important;--p:#0b0f0c!important;--y:#45b832!important;--t:#f5f7f5!important;--m:#98a39c!important;--l:#253229!important;--dm-surface:#0c110d;--dm-surface2:#101612;--dm-line:#26332a;--dm-green:#47b936;--dm-green2:#2f8525}
*{box-sizing:border-box}
html{background:#050806}
body{background:radial-gradient(circle at 50% -8%,rgba(69,184,50,.12),transparent 32%),linear-gradient(180deg,#050806 0%,#07100a 44%,#050806 100%)!important;color:#f5f7f5!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;letter-spacing:0}
header{background:rgba(5,8,6,.96)!important;border-bottom:1px solid #1e2922!important;padding:0!important}
header .wrap{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(330px,470px)!important;grid-template-areas:"brand account" "sub account"!important;gap:6px 28px!important;align-items:center!important;padding:14px 18px!important}
header h1{grid-area:brand!important;font-size:0!important;margin:0!important;display:flex!important;align-items:center!important;min-width:0!important}
.dm-lockup{display:block;min-width:0}
.dm-lockup img{display:block!important;width:auto!important;height:72px!important;max-width:min(620px,100%)!important;object-fit:contain!important;object-position:left center!important;border-radius:0!important;box-shadow:none!important;transform:none!important}
#subtitle{grid-area:sub!important;margin:0!important;color:#7f8b84!important;font-size:10px!important;font-weight:650!important;letter-spacing:.12em!important;text-transform:uppercase!important}
#dmAccount{grid-area:account!important;margin:0!important;min-width:0!important}
.dmbrand{display:none!important}
.dmnav{max-width:1400px!important;margin:14px auto 0!important;padding:0 18px!important;display:flex!important;gap:7px!important;overflow-x:auto!important}
.wrap,.dmpane,.dmnav{max-width:1400px!important}
main.wrap.grid{padding:16px 18px 24px!important}.grid{grid-template-columns:320px minmax(0,1fr) 360px!important;gap:14px!important;align-items:start!important}
.card,.dmcard{background:linear-gradient(180deg,rgba(15,20,16,.98),rgba(8,12,9,.99))!important;border:1px solid #26332a!important;border-radius:13px!important;padding:16px!important}
.card>h2,.dmcard>h2{margin:0 0 14px!important;padding:0 0 11px!important;border-bottom:1px solid #202b23!important;color:#f5f7f5!important;font-size:13px!important;font-weight:800!important;letter-spacing:.075em!important;text-transform:uppercase!important}
input,select{background:#070b08!important;border:1px solid #2a3930!important;color:#f1f4f1!important}button{background:linear-gradient(180deg,#3da62e,#2e7f24)!important;color:#fff!important;border:1px solid #48a93a!important}.secondary{background:#111813!important}.call{background:#090e0b!important;border-color:#28362d!important}.small,.meta{color:#8d9891!important}.board{background:#080c09!important}.rec{background:linear-gradient(180deg,#101711,#0b110c)!important;border-color:#2d4031!important}.score{color:#58c447!important}
@media(max-width:980px){header .wrap{grid-template-columns:1fr!important;grid-template-areas:"brand" "sub" "account"!important}.grid{grid-template-columns:1fr!important}}
@media(max-width:650px){header .wrap{padding:11px 12px!important}.dm-lockup img{height:54px!important;max-width:100%!important}#subtitle{font-size:8px!important;letter-spacing:.09em!important}.dmnav{padding:8px 12px!important}main.wrap.grid,.dmpane{padding-left:10px!important;padding-right:10px!important}}
`;
let s=document.getElementById('dmPremiumTheme');if(!s){s=document.createElement('style');s.id='dmPremiumTheme';document.head.appendChild(s)}s.textContent=css;
function mount(){
 document.body.classList.add('dm-premium');
 const h=document.querySelector('header .wrap h1');
 if(h)h.innerHTML='<span class="dm-lockup"><img src="./downmetric-shield-approved.png?v=31" alt="DownMetric Fantasy Football Intelligence"></span>';
 const sub=document.getElementById('subtitle');if(sub&&!sub.dataset.dmTheme){sub.dataset.dmTheme='1';sub.textContent='DRAFT SMARTER • MANAGE SMARTER • WIN MORE'}
 const recTitle=document.getElementById('recs')?.closest('.card')?.querySelector('h2');if(recTitle)recTitle.textContent='Recommended Picks';
 const m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#07100a');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();setTimeout(mount,250);setTimeout(mount,900);
const perf=document.createElement('script');perf.src='./downmetric-performance.js?v=28';perf.defer=true;document.head.appendChild(perf);
})();