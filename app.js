import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getAuth,signInAnonymously} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {getDatabase,ref,push,update,remove,onValue,onChildAdded,query,limitToLast,runTransaction,set,onDisconnect,get} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
/* Paste the three PASTE_ values from Firebase Console > Project settings > Your apps */
const FB={apiKey:"AIzaSyCDM0TAa-X-mb51fw-M8OM4HTUEG9uVPPI",authDomain:"casn-2026.firebaseapp.com",databaseURL:"https://casn-2026-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"casn-2026",storageBucket:"casn-2026.firebasestorage.app",messagingSenderId:"332258820354",appId:"1:332258820354:web:6e860766dbf928c353821b"};
const app=initializeApp(FB);
const db=getDatabase(app),ROOT="chai_bench_gang",STU=ROOT+"/students_v4",LOTS=ROOT+"/lots_v5",CHAT=ROOT+"/chats/everyone",PRES=ROOT+"/presence_v4",POLLS=ROOT+"/polls_v1",GRP=ROOT+"/groups_v1",SITE=ROOT+"/site_v1",CH=ROOT+"/chats";
/* Credentials are stored only as salted SHA-256 hashes. */
const SALT="casn-chai-v4",ADM_U="25fdd47772002194d5f426c16650090808678247439586afa19e001b7e0f0d9d",ADM_P="1c6dc4777379d629518967561ce66c20dd31c22534cfb4b2fc4b688208e4e7cb";
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,"0")).join("");
const H=(k,p)=>sha(`${SALT}:${k}:${String(p).trim().toLowerCase()}`);
const SEED=[["athiradh","Athiradh","2404f7d1d167adde3e653806a131f449af97724ce8dfbc061b8b513b81e524ab"],["ameen","Ameen","a69538f3f5cc4c16b6c77f42fa54bd041d75874551d2ce8aa3409fe87a275596"],["ahalya","Ahalya","a15b36ace10361635f2074a53a38c190b9c61785cc11225429a0760c4cde8d04"],["ameya","Ameya","e11d896d3b2e302a3cc8511f0e857e97991bcd9993e6eaf93e62247e72293182"],["ashwin","Ashwin","a3a4afeb18941ace04492c18f841d694148315748a8151c1202e22be901872ee"],["ashdharmik","Ashdharmik","54a0fa8f9ed9f603707453adc36e157d38b0c9b61b5103a643143355071414e7"],["nived","Nived","a348b9594e41ce5b5d667d2d1f0425996942a9c8534e6f1f6ae61f6db8c176e5"],["yadhu","Yadhu","1fee79b1fa5f7995dc21a48dc03e08e046b5c989a3bc33d0b77e225e951e56fe"],["yadhu-a","Yadhu A","ee02a46f86541289d8d6eaef80fc96167991b439a35a3f57ce08684d86ac9258"],["nishal","Nishal","f94133aff0f3bdc2f765f7dfb78f15013ae593cec8c0ee18e68b200e7f38ac56"],["sivani","Sivani","fc4a5a6f1750cfcaf33334987d061a9c428f012e38480b86436f0f672da9b980"],["thanima","Thanima","6e8feaadd26441665f8f892914efe1d0b942c4ef06b40c87909e2c9bfd0ee902"],["anand","Anand","067d054cd436e2e4ccd1e3bc4e443d70284db746899e6f45cfb0fd20ba993f42"],["pranav","Pranav","cdea2ee6ec0da91970ea22a075f5ed4b18407885cfd00d535e4bc124af5cc62a"],["akhil","Akhil","b4a0fddf48b9efbfd4f9bb5ac1bd9f151c4f73ae69cf277b1795a2e4d938cf02"],["anurag","Anurag","ca037e24d8e4a3c66d77656253ad8090c72413e257f399e89cd76de8b935a6c7"],["karthik","Karthik","852814ec0d96fb97d3f800c63295cb76c2a9e6b3435a20026e0929082a63fcbc"]]; /* [id, name, passwordHash] */
const GIRLS=new Set(["ahalya","ameya","sivani","thanima"]);
const SK=["#f2c9a0","#d9a06b","#b9794a","#8d5a37","#e8b88a"],HC=["#1d1410","#3a2418","#0f0f12","#6b4423","#8a3b1f"],SH=["#a8452a","#3f6b3a","#2f5663","#c98a1b","#8a3b5c","#4d6a2a","#3a4a7a"];
const HB=["Short","Side part","Spiky","Curly","Cap","Buzz cut"],HG=["Long","Bun","Ponytail","Bob","Braid"],AB=["None","Glasses","Shades","Beard"],AG=["None","Glasses","Bindi","Earrings"];
const $=i=>document.getElementById(i);const BN=document.querySelector("#pol img")?.src||"";const SC=window.CASScene||{mount(){},pause(){},next(){return""}};
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rnd=n=>{const a=new Uint32Array(1),m=4294967296-4294967296%n;do crypto.getRandomValues(a);while(a[0]>=m);return a[0]%n};
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
let wxt="",polls={},groups={},site={},clockOff=0,room="everyone",roomUn=null,at="lots",liveSeen=null,liveT=null,liveR=0,roster={},lots={},msgs=[],online={},sess=null,tab="home",sel=null,booted=false,seeded=false,draft=null;
const toast=m=>{const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2800)};
/* ---------- roster ---------- */
const ids=()=>Object.keys(roster).length?Object.keys(roster):SEED.map(x=>x[0]);
const HI=["anand","akhil","pranav","anurag","yadhu-a"],LG={hi:"Hindi",ml:"Malayalam"};
const rec=id=>{const r=roster[id]||{},i=SEED.findIndex(x=>x[0]===id),d=SEED[i]||[];return{id,ord:r.ord??i,n:r.n||d[1]||id,c:r.c==="BCE"?"BSc":(r.c||"BCA"),bio:r.bio||"",pic:r.pic||"",h:r.h??i,sk:r.sk??i*2,hc:r.hc??i*3,sh:r.sh??i,acc:r.acc??i,pw:r.pw||d[2],lg:(r.lang==="hi"||r.lang==="ml")?r.lang:HI.includes(id)?"hi":"ml"}};
const list=()=>ids().map(rec).sort((a,b)=>a.ord-b.ord);
/* ---------- characters (boys and girls have their own styles) ---------- */
function face(s){
 const g=GIRLS.has(s.id),A=v=>Math.abs(+v||0),h=A(s.h)%(g?5:6),sk=SK[A(s.sk)%5],hc=HC[A(s.hc)%5],sh=SH[A(s.sh)%7],ac=A(s.acc)%4,D="#2a1c12",F=`fill="${hc}" stroke="${D}" stroke-width="2.5" stroke-linejoin="round"`;
 let B="",T="";const cap=`<path d="M26 42Q24 15 50 15Q76 15 74 42Q64 28 50 30Q36 28 26 42Z" ${F}/>`;
 if(g){[()=>{B=`<path d="M22 46Q20 12 50 12Q80 12 78 46V90Q70 92 68 70V46H32V70Q30 92 22 90Z" ${F}/>`;T=cap},
  ()=>{T=`<circle cx="50" cy="11" r="10" ${F}/>`+cap},
  ()=>{B=`<path d="M70 28Q98 30 90 74Q82 58 72 50Z" ${F}/>`;T=cap},
  ()=>{B=`<path d="M21 44Q19 14 50 13Q81 14 79 44V68Q74 74 69 62V46H31V62Q26 74 21 68Z" ${F}/>`;T=cap},
  ()=>{B=`<path d="M27 48Q12 66 20 96Q30 82 31 54Z" ${F}/>`;T=cap}][h]()}
 else{[()=>{T=cap},
  ()=>{T=`<path d="M25 44Q22 14 52 15Q78 16 75 44Q70 26 56 26Q36 22 25 44Z" ${F}/>`},
  ()=>{T=`<path d="M25 40L26 12L38 24L47 7L55 24L67 10L74 25L75 40Q64 28 50 30Q36 28 25 40Z" ${F}/>`},
  ()=>{T=`<g ${F}><circle cx="30" cy="31" r="11"/><circle cx="42" cy="21" r="12"/><circle cx="58" cy="21" r="12"/><circle cx="70" cy="31" r="11"/></g>`},
  ()=>{T=`<path d="M25 40Q27 13 50 13Q73 13 75 40Z" fill="${sh}" stroke="${D}" stroke-width="2.5"/><path d="M68 38H94" stroke="${sh}" stroke-width="8" stroke-linecap="round"/>`},
  ()=>{T=`<path d="M28 38Q30 21 50 21Q70 21 72 38Q62 31 50 32Q38 31 28 38Z" ${F} opacity=".7"/>`}][h]()}
 const shades=!g&&ac==2,m=(s.id.length+s.id.charCodeAt(0))%3;
 const X=ac==1?`<g fill="rgba(255,255,255,.3)" stroke="${D}" stroke-width="2.4"><circle cx="40" cy="48" r="7.5"/><circle cx="60" cy="48" r="7.5"/><path d="M47.5 48H52.5" fill="none"/></g>`
  :ac==2?(g?`<circle cx="50" cy="37" r="2.6" fill="#b3261e"/>`:`<g fill="#14313a" stroke="${D}" stroke-width="2.2"><rect x="30" y="43" width="17" height="10" rx="3"/><rect x="53" y="43" width="17" height="10" rx="3"/><path d="M47 46H53" fill="none"/></g>`)
  :ac==3?(g?`<g fill="#e6a21a" stroke="${D}" stroke-width="2"><circle cx="24" cy="57" r="3.5"/><circle cx="76" cy="57" r="3.5"/></g>`:`<path d="M30 56Q50 86 70 56Q50 68 30 56Z" fill="${hc}"/>`):"";
 const lash=g?`<path d="M34 43L31 40M40 41V37M46 43L49 40M54 43L51 40M60 41V37M66 43L69 40" stroke="${D}" stroke-width="2" stroke-linecap="round"/>`:"";
 const mc=!g&&ac==3?"#fff6df":D,mouth=m==1?`<path d="M39 57Q50 70 61 57Z" fill="#fff6df" stroke="${D}" stroke-width="2.6" stroke-linejoin="round"/>`:m==2?`<path d="M41 61Q52 65 61 56" stroke="${mc}" stroke-width="3" fill="none" stroke-linecap="round"/>`:`<path d="M40 58Q50 68 60 58" stroke="${mc}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice"><path d="M12 100Q15 73 50 71Q85 73 88 100Z" fill="${sh}" stroke="${D}" stroke-width="3"/>${g?`<path d="M36 72Q50 88 64 72" fill="none" stroke="#fcf6e2" stroke-width="3" opacity=".8"/>`:`<path d="M40 72L50 84L60 72" fill="none" stroke="#fcf6e2" stroke-width="3" opacity=".8"/>`}<rect x="43" y="61" width="14" height="13" rx="4" fill="${sk}" stroke="${D}" stroke-width="2.5"/>${B}<circle cx="25" cy="48" r="5" fill="${sk}" stroke="${D}" stroke-width="2.5"/><circle cx="75" cy="48" r="5" fill="${sk}" stroke="${D}" stroke-width="2.5"/><ellipse cx="50" cy="46" rx="24" ry="26" fill="${sk}" stroke="${D}" stroke-width="3"/>${ac==3&&!g?X:""}${shades?"":`<circle cx="40" cy="48" r="3.5" fill="${D}"/><circle cx="60" cy="48" r="3.5" fill="${D}"/>`}${lash}<circle cx="33" cy="57" r="4" fill="#c4512b" opacity=".25"/><circle cx="67" cy="57" r="4" fill="#c4512b" opacity=".25"/>${mouth}${T}${ac==3&&!g?"":X}</svg>`}
const av=(s,c="")=>s.pic?`<img class="pic ${c}" src="${esc(s.pic)}" alt="">`:`<span class="pic ${c}">${face(s)}</span>`;
/* ---------- captcha (client-side deterrent) ---------- */
function mkCap(el){
 el.innerHTML='<canvas width="170" height="54" aria-label="Captcha image"></canvas><button type="button" class="rf" aria-label="New captcha">↻</button><input placeholder="Type the letters" autocomplete="off" maxlength="5" aria-label="Captcha letters">';
 const cv=el.querySelector("canvas"),inp=el.querySelector("input");let code="";
 const draw=()=>{code=Array.from({length:5},()=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[rnd(32)]).join("");const x=cv.getContext("2d");x.fillStyle="#101a2e";x.fillRect(0,0,170,54);
  for(let i=0;i<9;i++){x.strokeStyle=`hsla(${rnd(360)},60%,65%,.5)`;x.lineWidth=1+rnd(2);x.beginPath();x.moveTo(rnd(170),rnd(54));x.bezierCurveTo(rnd(170),rnd(54),rnd(170),rnd(54),rnd(170),rnd(54));x.stroke()}
  [...code].forEach((c,i)=>{x.save();x.translate(14+i*30,34+rnd(10)-5);x.rotate((rnd(50)-25)/100);x.font=`bold ${28+rnd(6)}px Georgia`;x.fillStyle=["#3ee0b0","#ffb547","#8ab4ff","#f4f6fb"][rnd(4)];x.fillText(c,0,0);x.restore()});
  for(let i=0;i<50;i++){x.fillStyle="rgba(255,255,255,.3)";x.fillRect(rnd(170),rnd(54),2,2)}inp.value=""};
 el.querySelector(".rf").onclick=draw;draw();
 return{renew:draw,ok:()=>inp.value.trim().toUpperCase()===code}}
const cs=mkCap($("cs")),ca=mkCap($("ca"));
/* ---------- login ---------- */
const lockLeft=()=>{try{const f=JSON.parse(localStorage.getItem("cas_f")||"{}");return Math.max(0,Math.ceil(((f.until||0)-Date.now())/1000))}catch(e){return 0}};
const setErr=m=>$("err").textContent=m||"";
function fail(m){let f={};try{f=JSON.parse(localStorage.getItem("cas_f")||"{}")}catch(e){}
 f.n=(f.n||0)+1;if(f.n>=5){f={n:0,until:Date.now()+60000};m="Too many wrong tries. Wait 60 seconds."}localStorage.setItem("cas_f",JSON.stringify(f));
 setErr(m);cs.renew();ca.renew();$("sp").value="";$("ap").value=""}
const blocked=()=>{const s=lockLeft();if(s){setErr(`Locked. Try again in ${s}s.`);return true}return false};
function renderPick(){$("pick").innerHTML=list().map(s=>`<button type="button" class="pk${s.id===sel?" on":""}" data-pk="${s.id}">${av(s)}${esc(s.n)}</button>`).join("")}
$("pick").onclick=e=>{const b=e.target.closest("[data-pk]");if(!b)return;sel=b.dataset.pk;renderPick();$("sel").innerHTML=`Signing in as <b>${esc(rec(sel).n)}</b>`;$("sp").focus();setErr("")};
const swap=a=>{$("fs").hidden=a;$("fa").hidden=!a;$("toA").hidden=a;$("toS").hidden=!a;setErr("");cs.renew();ca.renew()};
$("toA").onclick=()=>swap(true);$("toS").onclick=()=>swap(false);
$("eye").onclick=()=>{const p=$("sp");p.type=p.type==="password"?"text":"password"};
$("fs").onsubmit=async e=>{e.preventDefault();if(blocked())return;
 if(!sel)return setErr("Tap your name first.");
 if(!cs.ok()){cs.renew();return setErr("Captcha letters don't match. Try the new one.")}
 const h=await H(sel,$("sp").value);
 if(h===rec(sel).pw){localStorage.removeItem("cas_f");start({role:"student",id:sel})}else fail(`Wrong password for ${rec(sel).n}.`)};
$("fa").onsubmit=async e=>{e.preventDefault();if(blocked())return;
 if(!ca.ok()){ca.renew();return setErr("Captcha letters don't match. Try the new one.")}
 const[u,p]=await Promise.all([H("adminu",$("au").value),H("adminp",$("ap").value)]);
 if(u===ADM_U&&p===ADM_P){localStorage.removeItem("cas_f");start({role:"admin"})}else fail("Wrong admin username or password.")};
function start(s){sess=s;sessionStorage.setItem("cas_s",JSON.stringify(s));$("login").hidden=true;setErr("");
 if(s.role==="admin"){SC.pause();$("adm").hidden=false;renderAdmin();return}
 $("shell").hidden=false;$("who").textContent=rec(s.id).n;
 const p=ref(db,`${PRES}/${s.id}`);set(p,true).catch(()=>{});onDisconnect(p).remove();show("home")}
function out(){if(sess?.role==="student")remove(ref(db,`${PRES}/${sess.id}`)).catch(()=>{});sessionStorage.removeItem("cas_s");location.reload()}
$("out").onclick=$("aout").onclick=out;
/* ---------- student views ---------- */
const TABS=[["home","🏠","Home"],["class","👥","Class"],["chat","💬","Chat"],["lots","🎟️","Lots"],["me","👤","Me"]];
$("dock").innerHTML=TABS.map(t=>`<button data-t="${t[0]}"><span>${t[1]}</span>${t[2]}</button>`).join("");
$("dock").onclick=e=>{const b=e.target.closest("button");if(b)show(b.dataset.t)};
function show(t,k){tab=t;if(t!=="home")SC.pause();if(t!=="chat"&&roomUn){roomUn();roomUn=null}[...$("dock").children].forEach(b=>b.classList.toggle("on",b.dataset.t===t));({home:vHome,class:vClass,chat:vChat,lots:vLots,me:vMe})[t]();k||window.scrollTo(0,0)}
const drawn=()=>Object.entries(lots).map(([id,l])=>({id,...l})).filter(l=>l.result).sort((a,b)=>b.result.at-a.result.at);
const allLots=()=>Object.entries(lots).map(([id,l])=>({id,...l})).sort((a,b)=>(b.created||0)-(a.created||0));
const fmt=t=>new Date(t).toLocaleString([],{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
const rows=(l,n)=>`<ol class="ord">${(l.result.order||[]).slice(0,n||99).map((id,i)=>{const s=rec(id),t=(l.result.topics||{})[id];return`<li><b>${i+1}</b>${av(s,"s")}<div>${esc(s.n)}${t?`<em>${esc(t)}</em>`:""}</div></li>`}).join("")}</ol>`;
function vHome(){const me=rec(sess.id),L=drawn()[0],h=new Date().getHours(),g=h<5?"Still up":h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night",on=Object.keys(online).filter(k=>roster[k]),od=L?(L.result.order||[]):[],mine=od.indexOf(sess.id)+1,top=[1,0,2].filter(i=>od[i]),lm=[...msgs].reverse().find(m=>m.text);
 $("onl").textContent=`${on.length} online`;
 $("v").innerHTML=`<section class="hs" id="hs"></section>
 ${site.note?`<div class="plank note">📢 ${esc(site.note)}</div>`:""}${liveLot()?`<button class="plank go" data-live="${liveLot().id}"><b>🔴 Live draw: ${esc(liveLot().name)}</b><span class="mut">Tap to watch</span></button>`:""}<div class="live">${on.map(k=>`<button class="lv" data-stu="${k}">${av(rec(k))}<span class="n">${esc(rec(k).n)}</span></button>`).join("")||'<p class="mut">Nobody is online yet.</p>'}</div>
 <div class="plank">${L?`<p class="kick">Latest draw</p><h3>${esc(L.name)}</h3><p class="mut">${fmt(L.result.at)}</p>${mine?`<div class="mypos"><b>#${mine}</b><span>${esc((L.result.topics||{})[sess.id]||"Your place in the order")}</span></div>`:""}<div class="pod">${top.map(i=>{const s=rec(od[i]);return`<div class="p${i}">${av(s)}<b>${i+1}</b><span>${esc(s.n)}</span></div>`}).join("")}</div><div class="row"><button class="btn sm" data-view="${L.id}">Full order</button><button class="btn sm ghost" data-pdf="${L.id}">PDF</button></div>`:'<p class="mut">No lot has been drawn yet.</p>'}</div>
 <div class="two2"><button class="plank go" data-go="chat"><span class="e">💬</span><b>Class chat</b><span class="mut">${lm?esc(rec(lm.from).n+": "+lm.text):"Say hello to everyone"}</span></button><button class="plank go" data-go="class"><span class="e">👥</span><b>Our class</b><span class="mut">${list().length} classmates</span></button></div>`;
 const gr=`<p class="kick">${g}</p><h2>${esc(me.n)}</h2>`;if(heroEl&&heroEl.dataset.u===sess.id){$("hs").replaceWith(heroEl);heroEl.querySelector(".hg").innerHTML=gr}else{heroEl=$("hs");heroEl.dataset.u=sess.id;heroEl.innerHTML=`${SC.failed?`<img class="fbimg" src="${BN}" alt="">`:""}<span class="wxb"></span><img class="orig" src="${BN}" alt="The real college building"><div class="hg">${gr}</div>`}SC.mount(heroEl);heroEl.querySelectorAll(".wxb").forEach(e=>e.textContent=wxt)}
let cq="",cfl="all",heroEl=null;
const cg=()=>list().filter(s=>(cfl==="all"||(cfl==="on"?online[s.id]:(cfl==="hi"||cfl==="ml")?s.lg===cfl:s.c===cfl))&&s.n.toLowerCase().includes(cq)).map(s=>`<button class="card idc" data-stu="${s.id}">${online[s.id]?'<i class="dot" title="Online"></i>':""}${av(s)}<b>${esc(s.n)}</b><div class="tags"><span class="tag${s.c==="BSc"?" bsc":""}">${s.c}</span><span class="tag lang">${LG[s.lg]}</span></div>${s.bio?`<p>${esc(s.bio)}</p>`:""}</button>`).join("")||'<p class="mut">No one matches. Try another filter.</p>';
function vClass(){$("v").innerHTML=`<h2>Our class</h2><input id="cs2" class="sr" placeholder="Search a name" value="${esc(cq)}" autocomplete="off"><div class="chips">${[["all","All"],["on","Online"],["BCA","BCA"],["BSc","BSc"],["hi","Hindi"],["ml","Malayalam"]].map(c=>`<button class="ch${cfl===c[0]?" on":""}" data-f="${c[0]}">${c[1]}</button>`).join("")}</div><div class="grid" id="cg">${cg()}</div>`;
 $("cs2").oninput=e=>{cq=e.target.value.toLowerCase();$("cg").innerHTML=cg()};
 document.querySelector(".chips").onclick=e=>{const b=e.target.closest("[data-f]");if(b){cfl=b.dataset.f;vClass()}}}
const pollCard=(id,p,adm)=>{const v=p.votes||{},c=(p.opts||[]).map((_,i)=>Object.values(v).filter(x=>x===i).length),tot=c.reduce((a,b)=>a+b,0),my=adm?-1:v[sess.id];
 return`<div class="plank"><h3>${esc(p.q)}</h3><p class="mut">${tot} vote${tot===1?"":"s"}${p.closed?" · closed":""}</p>${(p.opts||[]).map((o,i)=>`<button class="pv${my===i?" on":""}" ${adm||p.closed?"disabled":`data-vote="${id}|${i}"`}><i style="width:${tot?c[i]/tot*100:0}%"></i><span>${esc(o)}</span><b>${c[i]}</b></button>`).join("")}${adm?`<p class="mut">${(p.opts||[]).map((o,i)=>esc(o)+": "+(Object.entries(v).filter(x=>x[1]===i).map(x=>esc(nm(x[0]))).join(", ")||"–")).join("<br>")}</p><div class="row"><button class="btn sm ghost" data-pc="${id}">${p.closed?"Reopen":"Close poll"}</button><button class="btn sm ghost" data-pd="${id}">Delete</button></div>`:""}</div>`};
const pollList=()=>Object.entries(polls).filter(([,p])=>p&&p.q).sort((a,b)=>(b[1].created||0)-(a[1].created||0));
const liveLot=()=>allLots().find(l=>l.live&&!l.result&&now()<(l.live.start||0)+864e5);
function vLots(){const L=allLots(),P=pollList();
 $("v").innerHTML=`${P.length?`<h2 style="margin-bottom:12px">Polls</h2>${P.map(([id,p])=>pollCard(id,p)).join("")}`:""}<div class="row" style="justify-content:space-between;align-items:center;margin:8px 0 14px"><h2>Lots</h2><button class="btn sm" data-latest="1">Latest PDF</button></div>${L.length?L.map(l=>`<div class="plank lotcard"><h3>${esc(l.name)}<span class="mut">${l.result?fmt(l.result.at):l.live?"🔴 live":"waiting"}</span></h3>${l.result?rows(l,3)+`<div class="row"><button class="btn sm" data-view="${l.id}">Full order</button><button class="btn sm ghost" data-pdf="${l.id}">PDF</button></div>`:l.live?`<button class="btn sm" data-live="${l.id}">Watch live</button>`:'<p class="mut">The admin has not drawn this lot yet.</p>'}</div>`).join(""):'<div class="plank"><p>No lots yet.</p></div>'}`}
const timed=v=>v.mode!=="manual"&&v.mode!=="wheel",shownN=L=>{const v=L.live,N=v.order.length;return timed(v)?Math.max(0,Math.min(N,Math.floor((now()-v.start)/v.step)+1)):Math.min(N,v.shown||0)};
function drawWheel(cv,ids,rot){const x=cv.getContext("2d"),W=cv.width,c=W/2,m=ids.length,a=2*Math.PI/m,C=["#ffbe3d","#ff6a4d","#b9a8ff","#5fe3a1","#ff7a90","#7fc4ff"];x.clearRect(0,0,W,W);
 ids.forEach((s,i)=>{x.beginPath();x.moveTo(c,c);x.arc(c,c,c-6,rot-Math.PI/2+i*a,rot-Math.PI/2+(i+1)*a);x.fillStyle=C[i%6];x.fill();x.save();x.translate(c,c);x.rotate(rot-Math.PI/2+(i+.5)*a);x.fillStyle="#1d1540";x.font="700 13px sans-serif";x.textAlign="right";x.fillText(nm(s).slice(0,10),c-18,4);x.restore()});
 x.beginPath();x.arc(c,c,16,0,7);x.fillStyle="#1d1540";x.fill();x.beginPath();x.moveTo(c-10,2);x.lineTo(c+10,2);x.lineTo(c,26);x.fillStyle="#fff";x.fill()}
function liveDlg(id){const l=lots[id];if(!l?.live)return;const dl=$("dlg"),A=sess?.role==="admin",md=l.live.mode;
 dl.innerHTML=`<div id="lv2"><p class="kick" id="lk"></p><h3 id="lh"></h3><canvas id="lw" width="280" height="280" hidden></canvas><p class="mut" id="lt2"></p><ol class="ord" id="ll"></ol></div>${A?`<div class="row">${md==="manual"||md==="wheel"?`<button class="btn" data-nxt="${id}">${md==="wheel"?"🎡 Spin":"Next pick"}</button>`:""}<button class="btn ghost sm" data-all="${id}">Reveal all and save</button></div>`:""}<div class="row"><button class="btn ghost" data-x="1">Close</button></div>`;
 if(!dl.open)dl.showModal();clearInterval(liveT);cancelAnimationFrame(liveR);
 const draw=()=>{const L=lots[id],cv=$("lw");if(!L?.live||!cv)return;const v=L.live,N=v.order.length,n=L.result?N:shownN(L);
  if(v.mode==="wheel"&&n<N){const rem=v.order.slice(n).sort(),sp=v.spin&&v.spin.n===n?v.spin:null;cv.hidden=false;let rot=0;if(sp){const p=Math.min(1,Math.max(0,(now()-sp.at)/4200)),ti=Math.max(0,rem.indexOf(sp.to));rot=(Math.PI*12-(ti+.5)*2*Math.PI/rem.length)*(1-Math.pow(1-p,3))}drawWheel(cv,rem,rot)}else cv.hidden=true;liveR=requestAnimationFrame(draw)};
 const tick=()=>{const L=lots[id];if(!L?.live||!$("lv2")){clearInterval(liveT);return}const v=L.live,o=v.order,N=o.length,n=L.result?N:shownN(L),done=n>=N;
  $("lk").textContent=L.result?"Final result":done?"Draw complete":timed(v)&&now()<v.start?"Starting…":"🔴 Live draw";$("lh").textContent=L.name;
  $("lt2").textContent=done?"":v.mode==="wheel"?"The wheel picks each place in turn.":v.mode==="manual"?"The admin reveals one place at a time.":"Places appear one by one.";
  $("ll").innerHTML=o.slice(0,n).map((s,j)=>`<li><b>${j+1}</b>${avs(s,"s")}<div>${esc(nm(s))}${(v.topics||{})[s]?`<em>${esc(v.topics[s])}</em>`:""}</div></li>`).join("")||'<li class="mut">Waiting for the first pick…</li>'};
 tick();liveT=setInterval(tick,400);draw()}
const autoLive=()=>{const l=liveLot();if(l&&sess&&l.id!==liveSeen){liveSeen=l.id;liveDlg(l.id)}};
function lotDialog(id){const l=lots[id];if(!l?.result)return;$("dlg").innerHTML=`<h3>${esc(l.name)}</h3><p class="mut">Random draw · ${fmt(l.result.at)}</p>${rows({...l})}<div class="row"><button class="btn" data-pdf="${id}">Download PDF</button><button class="btn ghost" data-x="1">Close</button></div>`;$("dlg").showModal()}
const me=()=>sess.role==="admin"?"admin":sess.id,nm=id=>id==="admin"?"Admin":rec(id).n,avs=(id,c="")=>id==="admin"?`<span class="pic ${c}" style="display:grid;place-items:center;font-size:${c==="s"?16:26}px">🛡️</span>`:av(rec(id),c);
const now=()=>Date.now()+clockOff,dmId=s=>"dm_admin_"+s;
const myRooms=()=>{const r=[];if(sess.role==="admin"||site.chatOpen!==false)r.push(["everyone","📣 Everyone"]);if(sess.role==="admin")list().forEach(s=>r.push([dmId(s.id),"✉️ "+s.n]));else r.push([dmId(sess.id),"✉️ Admin"]);
 Object.entries(groups).filter(([k,g])=>sess.role==="admin"||(g.members||[]).includes(sess.id)).forEach(([k,g])=>r.push(["g_"+k,"👥 "+g.name]));return r};
async function send(o){if(sess.role!=="admin"&&site.muted&&room==="everyone")return toast("Chat is muted by the admin.");if(Date.now()-(send.l||0)<500)return;send.l=Date.now();try{await push(ref(db,`${CH}/${room}`),{from:me(),ts:now(),...o})}catch(e){toast("Message not sent.")}}
function vChat(host=$("v")){const R=myRooms();if(!R.some(r=>r[0]===room))room=R[0][0];const A=sess.role==="admin";
 host.innerHTML=`<div class="chips" id="rl">${R.map(r=>`<button class="ch${r[0]===room?" on":""}" data-room="${r[0]}">${esc(r[1])}</button>`).join("")}${A?'<button class="ch" data-ng="1">＋ Group</button>':""}</div>${A?`<div class="row" style="margin:0 0 8px"><button class="btn sm ghost" data-clr="1">Clear room</button><button class="btn sm ghost" data-mute="1">${site.muted?"Unmute students":"Mute students"}</button></div>`:""}<div class="plank" style="padding:10px"><div id="ml"></div><form id="cf"><label class="btn ghost sm" style="margin:0;cursor:pointer">📎<input id="cfile" type="file" hidden></label><input id="ci" maxlength="1000" autocomplete="off" placeholder="Message"><button class="btn">Send</button></form></div>`;
 roomUn&&roomUn();msgs=[];roomUn=onValue(query(ref(db,`${CH}/${room}`),limitToLast(80)),s=>{msgs=Object.entries(s.val()||{}).map(([k,v])=>({k,...v})).sort((a,b)=>a.ts-b.ts);renderMsgs()});
 $("cf").onsubmit=e=>{e.preventDefault();const t=$("ci").value.trim();if(!t)return;$("ci").value="";send({type:"text",text:t})};
 $("cfile").onchange=e=>{const f=e.target.files[0];e.target.value="";if(!f)return;const fr=new FileReader();
  if(f.type.startsWith("image/")){fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);send({type:"img",media:c.toDataURL("image/jpeg",.75)})};im.src=fr.result};fr.readAsDataURL(f)}
  else if(f.size>300000)toast("Files must be under 300 KB.");else{fr.onload=()=>send({type:"file",media:fr.result,name:f.name.slice(0,60)});fr.readAsDataURL(f)}}}
function renderMsgs(){const ml=$("ml");if(!ml)return;const end=ml.scrollTop+ml.clientHeight>=ml.scrollHeight-40||!ml.children.length;
 ml.innerHTML=msgs.map(m=>{const b=m.type==="img"&&/^data:image\//.test(m.media||"")?`<img class="cimg" src="${esc(m.media)}" data-big="1" alt="">`:m.type==="file"&&/^data:/.test(m.media||"")?`<a class="cfile" download="${esc(m.name)}" href="${esc(m.media)}">📄 ${esc(m.name)}</a>`:`<p>${esc(m.text)}</p>`;
  return`<div class="m${m.from===me()?" me":""}">${avs(m.from,"s")}<div><small>${esc(nm(m.from))} · ${new Date(m.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}${sess.role==="admin"?` <i data-delm="${m.k}" style="cursor:pointer">✕</i>`:""}</small>${b}</div></div>`}).join("")||'<p class="mut">No messages yet. Say hello.</p>';if(end)ml.scrollTop=ml.scrollHeight}
function vMe(){draft={...rec(sess.id)};const g=GIRLS.has(draft.id),HL=g?HG:HB,AL=g?AG:AB,sw=(k,a)=>`<div class="sws" data-k="${k}">${a.map((c,i)=>`<i class="sw${i===Math.abs(draft[k])%a.length?" on":""}" data-v="${i}" style="background:${c}" role="button" tabindex="0"></i>`).join("")}</div>`,op=(a,c)=>a.map((x,i)=>`<option value="${i}"${i===Math.abs(c)%a.length?" selected":""}>${x}</option>`).join("");
 $("v").innerHTML=`<h2 style="margin-bottom:14px">My profile</h2><div class="plank edit"><div class="c"><div id="pv">${av(draft,"xl")}</div><div class="row" style="justify-content:center"><label class="btn sm ghost" style="margin:0;cursor:pointer">Upload photo<input id="pf" type="file" accept="image/*" hidden></label><button class="btn sm ghost" id="np0" type="button">Use character</button></div></div>
 <div><label>Name<input id="en" maxlength="24" value="${esc(draft.n)}"></label><label>Bio<textarea id="eb" maxlength="120" rows="2" placeholder="Write something about you">${esc(draft.bio)}</textarea></label>
 <p class="lab">Character</p><label>Hair style<select data-sel="h">${op(HL,draft.h)}</select></label><label>Extra<select data-sel="acc">${op(AL,draft.acc)}</select></label>
 <p class="lab">Skin</p>${sw("sk",SK)}<p class="lab">Hair colour</p>${sw("hc",HC)}<p class="lab">Outfit colour</p>${sw("sh",SH)}
 <label>New password (leave empty to keep)<input id="ep" type="password" autocomplete="new-password"></label>
 <div class="row"><button class="btn" id="sv">Save profile</button></div></div></div>`;
 const pv=()=>$("pv").innerHTML=av(draft,"xl");
 $("v").onclick=e=>{const w=e.target.closest(".sw");if(w){const k=w.parentNode.dataset.k;draft[k]=+w.dataset.v;[...w.parentNode.children].forEach(x=>x.classList.toggle("on",x===w));pv()}
  if(e.target.id==="np0"){draft.pic="";pv()}
  if(e.target.id==="sv")saveMe()};
 $("v").onchange=e=>{const t=e.target;if(t.dataset.sel){draft[t.dataset.sel]=+t.value;pv()}
  if(t.id==="pf"&&t.files[0]){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement("canvas"),m=Math.min(im.width,im.height);c.width=c.height=240;c.getContext("2d").drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,240,240);draft.pic=c.toDataURL("image/jpeg",.8);pv()};im.src=fr.result};fr.readAsDataURL(t.files[0])}}}
async function saveMe(){const n=$("en").value.trim();if(!n)return toast("Name can't be empty.");const pw=$("ep").value.trim();if(pw&&pw.length<6)return toast("Password needs 6+ characters.");
 const p={n,bio:$("eb").value.trim(),pic:draft.pic||"",h:draft.h,sk:draft.sk,hc:draft.hc,sh:draft.sh,acc:draft.acc};if(pw)p.pw=await H(sess.id,pw);
 try{await update(ref(db,`${STU}/${sess.id}`),p);$("who").textContent=n;$("ep").value="";toast("Profile saved.")}catch(e){toast("Could not save. Check your connection.")}}
/* ---------- dialogs & shared clicks ---------- */
document.addEventListener("click",e=>{const t=e.target.closest("[data-go],[data-stu],[data-view],[data-pdf],[data-draw],[data-del],[data-latest],[data-x]");if(!t)return;const d=t.dataset,dl=$("dlg");
 if(d.x)dl.close();
 if(d.go){if(dl.open)dl.close();show(d.go)}
 if(d.stu){const s=rec(d.stu);dl.innerHTML=`<div style="text-align:center">${av(s,"xl")}<h3 style="margin-top:10px">${esc(s.n)}</h3><div class="tags"><span class="tag${s.c==="BSc"?" bsc":""}">${s.c}</span><span class="tag lang">${LG[s.lg]}</span></div>${s.bio?`<p>${esc(s.bio)}</p>`:""}<div class="row" style="justify-content:center">${s.id===sess?.id?'<button class="btn" data-go="me">Edit my profile</button>':""}<button class="btn ghost" data-x="1">Close</button></div></div>`;dl.showModal()}
 if(d.view)lotDialog(d.view);
 if(d.pdf)pdf(lots[d.pdf]);
 if(d.latest){const l=drawn()[0];l?pdf(l):toast("No lot has been drawn yet.")}
 if(d.draw)drawLot(d.draw);
 if(d.del&&confirm("Delete this lot for everyone? This cannot be undone."))remove(ref(db,`${LOTS}/${d.del}`)).catch(()=>toast("Could not delete."))});
$("dlg").addEventListener("click",e=>{if(e.target===$("dlg"))$("dlg").close()});
/* ---------- PDF ---------- */
function pdf(l){const J=window.jspdf;if(!l?.result)return toast("Nothing to download yet.");if(!J)return toast("PDF tool not loaded. Check your connection.");
 const d=new J.jsPDF(),r=l.result;d.setFillColor(16,26,46);d.rect(0,0,210,30,"F");d.setTextColor(252,246,226);d.setFont("helvetica","bold");d.setFontSize(22);d.text("CAS Nadapuram",14,14);d.setFontSize(11);d.setFont("helvetica","normal");d.text("College of Applied Science, Nadapuram",14,23);
 d.setTextColor(42,28,18);d.setFont("helvetica","bold");d.setFontSize(17);d.text(String(l.name),14,44);d.setFont("helvetica","normal");d.setFontSize(10);d.text("Random draw on "+new Date(r.at).toLocaleString()+". Result is final.",14,51);
 let y=64;(r.order||[]).forEach((id,i)=>{const s=rec(id),t=(r.topics||{})[id],ls=t?d.splitTextToSize(String(t),100):[""],h=Math.max(9,ls.length*5+4);
  if(y+h>285){d.addPage();y=20}if(i%2===0){d.setFillColor(226,233,246);d.rect(12,y-6,186,h,"F")}
  d.setFont("helvetica","bold");d.setFontSize(12);d.text(String(i+1).padStart(2,"0"),15,y);d.text(`${s.n} (${s.c})`,30,y);d.setFont("helvetica","normal");d.setFontSize(10);if(t)d.text(ls,92,y);y+=h});
 d.save(String(l.name).replace(/[^\w]+/g,"-").toLowerCase()+"-lot-result.pdf")}
/* ---------- admin ---------- */
const ATABS=[["lots","🎟️","Lots"],["polls","📊","Polls"],["chat","💬","Chat"],["people","👥","People"],["data","🗄️","Data"],["site","⚙️","Site"]];
function renderAdmin(force){if(sess?.role!=="admin")return;const dk=$("adock");if(!dk.children.length){dk.innerHTML=ATABS.map(t=>`<button data-t="${t[0]}"><span>${t[1]}</span>${t[2]}</button>`).join("");dk.onclick=e=>{const b=e.target.closest("button");if(b){at=b.dataset.t;window.scrollTo(0,0);renderAdmin(true)}}}
 [...dk.children].forEach(b=>b.classList.toggle("on",b.dataset.t===at));if(at!=="chat"&&roomUn){roomUn();roomUn=null}
 if(at==="chat"&&!force)return;const f=document.activeElement;if(f&&/INPUT|TEXTAREA|SELECT/.test(f.tagName)&&$("av").contains(f))return;if(at==="lots"&&$("ln")&&($("ln").value||$("av").querySelector("[data-nx].on")))return;
 ({lots:aLots,polls:aPolls,chat:()=>vChat($("av")),people:aPeople,data:aData,site:aSite})[at]()}
function aLots(){const L=allLots(),S=list();
 $("av").innerHTML=`<section class="plank"><h3>Create a lot</h3><form id="nl"><label>Lot name<input id="ln" maxlength="40" placeholder="e.g. Seminar order"></label><label>Topics (optional, one per line)<textarea id="lt" rows="3"></textarea></label><p class="lab">Leave out of this lot (tap to exclude)</p><div class="chips" style="flex-wrap:wrap;margin-top:8px">${S.map(s=>`<button type="button" class="ch" data-nx="${s.id}">${esc(s.n)}</button>`).join("")}</div><button class="btn">Create lot</button></form></section>`+
 L.map(l=>{const ex=l.excl||[];return`<section class="plank lotcard"><h3>${esc(l.name)}<span class="mut">${l.result?"Drawn "+fmt(l.result.at):l.live?"🔴 live":"Not drawn"}</span></h3>${l.result?rows(l)+`<div class="row"><button class="btn sm ghost" data-pdf="${l.id}">PDF</button><button class="btn sm ghost" data-del="${l.id}">Delete lot</button></div>`:`<p class="mut">${S.length-ex.length} in the lot${(l.topics||[]).length?` · ${l.topics.length} topics`:""}. Highlighted names are left out:</p><div class="chips" style="flex-wrap:wrap">${S.map(s=>`<button class="ch${ex.includes(s.id)?" on":""}" data-ex="${l.id}|${s.id}">${esc(s.n)}</button>`).join("")}</div><p class="lab">How to draw</p><div class="row" style="margin-top:6px"><button class="btn sm" data-dm="${l.id}|instant">⚡ Instant</button><button class="btn sm" data-dm="${l.id}|auto">🔴 Live auto</button><button class="btn sm" data-dm="${l.id}|manual">👆 One by one</button><button class="btn sm" data-dm="${l.id}|wheel">🎡 Wheel</button></div><div class="row">${l.live?`<button class="btn ghost sm" data-live="${l.id}">Open live controls</button><button class="btn ghost sm" data-fin="${l.id}">Save now</button>`:""}<button class="btn ghost sm" data-del="${l.id}">Delete lot</button></div>`}</section>`}).join("");
 $("nl").onsubmit=async e=>{e.preventDefault();const name=$("ln").value.trim();if(!name)return toast("Give the lot a name.");const topics=$("lt").value.split("\n").map(x=>x.trim().slice(0,60)).filter(Boolean).slice(0,40),ex=[...$("av").querySelectorAll("[data-nx].on")].map(b=>b.dataset.nx),o={name:name.slice(0,40),created:Date.now()};if(topics.length)o.topics=topics;if(ex.length)o.excl=ex;
  try{await push(ref(db,LOTS),o);toast("Lot created. Press Draw live when ready.");aLots()}catch(x){toast("Could not create the lot.")}}}
function aPolls(){const P=pollList();$("av").innerHTML=`<section class="plank"><h3>New poll</h3><form id="pf"><label>Question<input id="pq" maxlength="120"></label><label>Options (one per line, 2 to 8)<textarea id="po" rows="4"></textarea></label><button class="btn">Publish poll</button></form></section>`+P.map(([id,p])=>pollCard(id,p,1)).join("");
 $("pf").onsubmit=async e=>{e.preventDefault();const q=$("pq").value.trim(),o=$("po").value.split("\n").map(x=>x.trim().slice(0,60)).filter(Boolean).slice(0,8);if(!q||o.length<2)return toast("Add a question and at least 2 options.");try{await push(ref(db,POLLS),{q,opts:o,created:Date.now()});toast("Poll is live for everyone.");aPolls()}catch(x){toast("Could not publish.")}}}
function aPeople(){const S=list();
 $("av").innerHTML=`<div class="row" style="justify-content:space-between;align-items:center;margin:0 0 6px"><h2>People</h2><button class="btn sm" data-add="1">＋ Add student</button></div><p class="mut" style="margin:0 0 12px">${S.length} students · ${S.filter(s=>s.lg==="hi").length} Hindi · ${S.filter(s=>s.lg==="ml").length} Malayalam</p>`+
 S.map(s=>`<button class="plank prow" data-ed="${s.id}">${av(s,"s")}<span class="pn"><b>${esc(s.n)}</b>${online[s.id]?' <i class="dot" style="position:static;display:inline-block"></i>':""}</span><span class="tag${s.c==="BSc"?" bsc":""}">${s.c}</span><span class="tag lang">${LG[s.lg]}</span><span class="mut">Edit ›</span></button>`).join("")}
const selx=(id,a,v)=>`<select id="${id}">${a.map(x=>`<option value="${x[0]}"${x[0]===v?" selected":""}>${x[1]}</option>`).join("")}</select>`,CRS=[["BCA","BCA"],["BSc","BSc"]],LNG=[["ml","Malayalam"],["hi","Hindi"]];
function editDlg(id){const s=rec(id),dl=$("dlg");
 dl.innerHTML=`<h3>Edit student</h3><div style="text-align:center;margin:10px 0">${av(s,"xl")}</div><form id="aef"><label>Name<input id="aen" maxlength="24" value="${esc(s.n)}"></label><label>Course${selx("aec",CRS,s.c)}</label><label>Language${selx("ael",LNG,s.lg)}</label><label>Bio<textarea id="aeb" rows="2" maxlength="120">${esc(s.bio)}</textarea></label><div class="row"><button class="btn">Save</button><button type="button" class="btn ghost sm" data-rp="${id}">Reset password</button></div><div class="row">${s.pic?'<button type="button" class="btn ghost sm" id="aep">Remove photo</button>':""}<button type="button" class="btn ghost sm" id="aed">Delete student</button><button type="button" class="btn ghost sm" data-x="1">Cancel</button></div></form>`;dl.showModal();
 $("aef").onsubmit=async e=>{e.preventDefault();const n=$("aen").value.trim();if(!n)return toast("Name cannot be empty.");if(list().some(x=>x.id!==id&&x.n.toLowerCase()===n.toLowerCase()))return toast("Another student already has that name.");
  try{await update(ref(db,`${STU}/${id}`),{n,c:$("aec").value,lang:$("ael").value,bio:$("aeb").value.trim()});dl.close();toast("Saved.")}catch(x){toast("Could not save.")}};
 if($("aep"))$("aep").onclick=async()=>{try{await remove(ref(db,`${STU}/${id}/pic`));dl.close();toast("Photo removed.")}catch(x){toast("Could not remove the photo.")}};
 $("aed").onclick=async()=>{if(!confirm(`Delete ${s.n}? Their profile, private chat and poll votes are removed. Old lot results will show a plain ID for them.`))return;const m={};m[`students_v4/${id}`]=null;m[`presence_v4/${id}`]=null;m[`chats/${dmId(id)}`]=null;Object.keys(polls).forEach(p=>m[`polls_v1/${p}/votes/${id}`]=null);
  try{await update(ref(db,ROOT),m);dl.close();toast("Student deleted.")}catch(x){toast("Could not delete. Publish the new database rules.")}}}
function addDlg(){const dl=$("dlg");
 dl.innerHTML=`<h3>Add student</h3><form id="aaf"><label>Name<input id="aan" maxlength="24"></label><label>Course${selx("aac",CRS,"BCA")}</label><label>Language${selx("aal",LNG,"ml")}</label><label>Password (6+ characters)<input id="aap" type="text" autocomplete="off"></label><div class="row"><button class="btn">Add student</button><button type="button" class="btn ghost" data-x="1">Cancel</button></div></form>`;dl.showModal();
 $("aaf").onsubmit=async e=>{e.preventDefault();const n=$("aan").value.trim(),p=$("aap").value.trim();if(!n)return toast("Enter a name.");if(p.length<6)return toast("Password needs 6+ characters.");if(list().some(x=>x.n.toLowerCase()===n.toLowerCase()))return toast("That name already exists.");
  let id=n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"student",k=2,b=id;while(roster[id])id=b+"-"+k++;
  try{await update(ref(db,`${STU}/${id}`),{n,c:$("aac").value,lang:$("aal").value,ord:Math.max(-1,...list().map(x=>x.ord))+1,pw:await H(id,p)});dl.close();toast("Student added.")}catch(x){toast("Could not add the student.")}}}
function aSite(){const s=site.scene||{},S=list(),sel=Array.isArray(s.students)?s.students:[],o=(a,v)=>a.map(x=>`<option value="${x[0]}"${x[0]===v?" selected":""}>${x[1]}</option>`).join(""),ck=(id,l,v)=>`<label style="display:flex;gap:10px;align-items:center"><input id="${id}" type="checkbox" style="width:auto"${v?" checked":""}>${l}</label>`;
 $("av").innerHTML=`<section class="plank"><h3>Climate and scene</h3><p class="mut">Changes show live on every student's phone.</p><label>Time of day<select id="sc_t">${o([["auto","Auto (real sun at Nadapuram)"],["morning","Morning"],["noon","Noon"],["evening","Evening"],["night","Night"]],s.time||"auto")}</select></label><label>Weather<select id="sc_w">${o([["auto","Auto (real weather, Nadapuram)"],["clear","Sunny"],["cloudy","Cloudy"],["rain","Rain"],["storm","Thunderstorm"],["fog","Fog"]],s.weather||"auto")}</select></label><p class="lab">Rare animal visit</p><div class="row" style="margin-top:6px"><button class="btn sm ghost" data-visit="tiger">🐅 Tiger</button><button class="btn sm ghost" data-visit="giraffe">🦒 Giraffe</button><button class="btn sm ghost" data-visit="elephant">🐘 Elephant</button></div></section>
 <section class="plank"><h3>Site settings</h3><form id="sf"><label>Site title<input id="st" maxlength="30" value="${esc(site.title||"")}" placeholder="CAS Nadapuram"></label><label>Tagline<input id="sg" maxlength="60" value="${esc(site.tag||"")}"></label><label>Accent colour<input id="sa" type="color" value="${site.accent||"#ffbe3d"}" style="height:46px;padding:4px"></label><label>Announcement on every home screen<textarea id="sn2" rows="2" maxlength="200">${esc(site.note||"")}</textarea></label>${ck("sc","Class chat open",site.chatOpen!==false)}${ck("sm","Mute students in Everyone chat",site.muted)}
 <p class="lab">People and animals in the 3D scene</p>${ck("sp","Show people",s.people!==false)}${ck("sa2","Show animals",s.animals!==false)}${ck("sr2","Allow rare animals (tiger, giraffe, elephant)",s.rare!==false)}${ck("sl","Show name tags always (tapping a person shows the name anyway)",s.labels)}
 <label>Most people at once (1 to 8)<input id="scr" type="number" min="1" max="8" value="${+s.crowd||4}"></label><label>Principal name<input id="spn" maxlength="30" value="${esc(s.principal||"")}" placeholder="Principal"></label><label>Teacher names (one per line)<textarea id="stn" rows="3" maxlength="300">${esc(s.teachers||"")}</textarea></label>
 <p class="lab">Students who walk in the scene (none selected = everyone)</p><div class="chips" style="flex-wrap:wrap;margin-top:8px">${S.map(x=>`<button type="button" class="ch${sel.includes(x.id)?" on":""}" data-ss="${x.id}">${esc(x.n)}</button>`).join("")}</div><div class="row"><button class="btn">Save all</button></div></form></section>`;
 const live=()=>update(ref(db,`${SITE}/scene`),{time:$("sc_t").value,weather:$("sc_w").value}).then(()=>toast("Scene updated.")).catch(()=>toast("Could not update."));$("sc_t").onchange=$("sc_w").onchange=live;
 $("sf").onsubmit=async e=>{e.preventDefault();const sc={time:$("sc_t").value,weather:$("sc_w").value,people:$("sp").checked,animals:$("sa2").checked,rare:$("sr2").checked,labels:$("sl").checked,crowd:Math.max(1,Math.min(8,+$("scr").value||4)),principal:$("spn").value.trim(),teachers:$("stn").value.trim(),students:[...$("av").querySelectorAll("[data-ss].on")].map(b=>b.dataset.ss)};if(s.visit)sc.visit=s.visit;
  try{await update(ref(db,SITE),{title:$("st").value.trim(),tag:$("sg").value.trim(),accent:$("sa").value==="#ffbe3d"?"":$("sa").value,note:$("sn2").value.trim(),chatOpen:$("sc").checked,muted:$("sm").checked,scene:sc});toast("Saved for everyone.")}catch(x){toast("Could not save.")}}}
function applySite(){document.title=site.title||"CAS Nadapuram · Class space";if($("ttl"))$("ttl").textContent=site.title||"CAS Nadapuram";if($("tag"))$("tag").textContent=site.tag||"Under the old tiled roof.";document.body.style.setProperty("--mint",site.accent||"");document.body.style.setProperty("--mint2",site.accent||"")}
async function startDraw(id,mode){const l=lots[id];if(!l||l.result)return;const st=list().filter(s=>!(l.excl||[]).includes(s.id));if(st.length<2)return toast("Need at least 2 students in the lot.");
 if(!confirm(`Start "${{instant:"instant",auto:"live auto",manual:"one by one",wheel:"spin wheel"}[mode]}" draw for "${l.name}" with ${st.length} students?\nThe order is random and final.`))return;
 const order=shuffle(st.map(s=>s.id)),tp=shuffle(l.topics||[]),topics={};order.forEach((s,i)=>{if(tp[i])topics[s]=tp[i]});
 if(mode==="instant"){try{const r=await runTransaction(ref(db,`${LOTS}/${id}/result`),c=>c?undefined:{order,topics,at:Date.now()});toast(r.committed?"Draw saved. Result is final.":"Already drawn.")}catch(e){toast("Could not save the draw.")}return}
 try{await update(ref(db,`${LOTS}/${id}`),{live:{mode,order,topics,start:now()+(mode==="auto"?4000:0),step:1500,shown:0}})}catch(e){return toast("Could not start the draw.")}
 liveSeen=id;setTimeout(()=>liveDlg(id),300);if(mode==="auto")setTimeout(()=>commit(id),4000+order.length*1500+800)}
const drawLot=id=>startDraw(id,"auto");
async function stepLive(id,all){const l=lots[id];if(!l?.live||l.result)return;const v=l.live,N=v.order.length,s=v.shown||0,P=ref(db,`${LOTS}/${id}/live`);
 try{if(all){await update(P,{shown:N});return commit(id)}if(timed(v)||s>=N)return s>=N?commit(id):null;
  if(v.mode==="manual"){await update(P,{shown:s+1});if(s+1>=N)setTimeout(()=>commit(id),1500)}
  else{if(v.spin&&v.spin.n===s&&now()<v.spin.at+4500)return;await update(P,{spin:{at:now(),to:v.order[s],n:s}});setTimeout(async()=>{try{await update(P,{shown:s+1});if(s+1>=N)setTimeout(()=>commit(id),1500)}catch(e){}},4500)}}catch(e){toast("Action failed.")}}
async function commit(id){const l=lots[id];if(!l?.live||l.result)return;try{const r=await runTransaction(ref(db,`${LOTS}/${id}/result`),c=>c?undefined:{order:l.live.order,topics:l.live.topics||{},at:Date.now()});toast(r.committed?"Draw saved. Result is final.":"Already drawn.")}catch(e){toast("Could not save the result.")}}
let scan=null;const ago=d=>Date.now()-d*864e5,kb=n=>Math.round(n/1024)+" KB";
const roomName=r=>r==="everyone"?"Everyone":r.startsWith("dm_admin_")?"Admin ↔ "+rec(r.slice(9)).n:r.startsWith("g_")?"👥 "+(groups[r.slice(2)]?.name||"Deleted group"):r;
async function doScan(){try{toast("Scanning chats…");const s=await get(ref(db,CH)),v=s.val()||{};scan=Object.fromEntries(Object.entries(v).map(([r,m])=>[r,Object.entries(m||{}).map(([k,x])=>({k,ts:x.ts||0,t:x.type,sz:(x.media||"").length+(x.text||"").length}))]));renderAdmin(true)}catch(e){toast("Scan failed.")}}
function aData(){const L=allLots(),P=pollList(),G=Object.keys(groups),dr=L.filter(l=>l.result).length,b=(k,t)=>`<button class="btn sm ghost" data-dd="${k}">${t}</button>`,R=scan?Object.entries(scan):null,tot=R?R.reduce((a,[,m])=>a+m.reduce((x,y)=>x+y.sz,0),0):0;
 $("av").innerHTML=`<h2 style="margin-bottom:12px">Database manager</h2>
 <div class="plank"><h3>Lots</h3><p class="mut">${L.length} lots · ${dr} drawn · ${L.length-dr} waiting</p><div class="row">${b("lots-undrawn","Delete waiting")}${b("lots-drawn","Delete drawn")}${b("lots-30","Older than 30 days")}${b("lots-all","Delete all")}</div></div>
 <div class="plank"><h3>Polls</h3><p class="mut">${P.length} polls · ${P.filter(p=>p[1].closed).length} closed</p><div class="row">${b("polls-closed","Delete closed")}${b("polls-30","Older than 30 days")}${b("polls-all","Delete all")}</div></div>
 <div class="plank"><h3>Groups</h3><p class="mut">${G.length} groups</p><div class="row">${b("groups-all","Delete all groups and their chats")}</div></div>
 <div class="plank"><h3>Chats</h3>${R?`<p class="mut">${R.reduce((a,[,m])=>a+m.length,0)} messages · about ${kb(tot)}</p>${R.map(([r,m])=>`<div class="drow"><span>${esc(roomName(r))} <span class="mut">${m.length} · ${kb(m.reduce((x,y)=>x+y.sz,0))}</span></span>${b("room:"+r,"Clear")}</div>`).join("")||'<p class="mut">No chat data.</p>'}<div class="row">${b("chat-30","Older than 30 days")}${b("chat-media","Images and files only")}${b("chat-all","Clear all chats")}</div>`:'<p class="mut">Scan to see what is stored. Images and files use the most space.</p><div class="row"><button class="btn sm" data-scan="1">Scan chats</button></div>'}</div>
 <div class="plank"><h3>Other</h3><div class="row">${b("presence","Clear online list")}${b("site","Reset site settings")}</div></div>
 <div class="plank"><h3>Danger zone</h3><p class="mut">Deletes every lot, poll, group, chat, the online list and site settings. Students and profiles are kept.</p><div class="row">${b("wipe","Wipe everything")}</div></div>`}
async function dataOp(k){const m={},dl=l=>m[`lots_v5/${l.id}`]=null,dp=([i])=>m[`polls_v1/${i}`]=null,cm=f=>Object.entries(scan||{}).forEach(([r,a])=>a.filter(f).forEach(x=>m[`chats/${r}/${x.k}`]=null));
 if(k==="lots-undrawn")allLots().filter(l=>!l.result).forEach(dl);else if(k==="lots-drawn")allLots().filter(l=>l.result).forEach(dl);else if(k==="lots-30")allLots().filter(l=>(l.created||0)<ago(30)).forEach(dl);else if(k==="lots-all")allLots().forEach(dl);
 else if(k==="polls-closed")pollList().filter(p=>p[1].closed).forEach(dp);else if(k==="polls-30")pollList().filter(p=>(p[1].created||0)<ago(30)).forEach(dp);else if(k==="polls-all")pollList().forEach(dp);
 else if(k==="groups-all")Object.keys(groups).forEach(g=>{m[`groups_v1/${g}`]=null;m[`chats/g_${g}`]=null});
 else if(k==="presence")m.presence_v4=null;else if(k==="site")m.site_v1=null;
 else if(k.startsWith("room:"))m[`chats/${k.slice(5)}`]=null;else if(k==="chat-all")Object.keys(scan||{}).forEach(r=>m[`chats/${r}`]=null);
 else if(k==="chat-30")cm(x=>x.ts<ago(30));else if(k==="chat-media")cm(x=>x.t!=="text");
 else if(k==="wipe"){if(prompt("Type DELETE to erase all lots, polls, groups and chats (students are kept):")!=="DELETE")return;allLots().forEach(dl);pollList().forEach(dp);["groups_v1","chats","presence_v4","site_v1"].forEach(p=>m[p]=null)}
 if(!Object.keys(m).length)return toast("Nothing to delete.");
 if(k!=="wipe"&&!confirm(`Delete ${Object.keys(m).length} item(s)? This cannot be undone.`))return;
 try{await update(ref(db,ROOT),m);if(/^(chat|room|groups|wipe)/.test(k))scan=null;toast("Deleted.")}catch(e){toast("Delete failed. Publish the new database rules first.")}}
$("dlg").addEventListener("close",()=>{clearInterval(liveT);cancelAnimationFrame(liveR)});
document.addEventListener("click",async e=>{const t=e.target.closest("[data-room],[data-ng],[data-delm],[data-big],[data-clr],[data-mute],[data-live],[data-visit],[data-ss],[data-ed],[data-add],[data-dm],[data-nxt],[data-all],[data-dd],[data-scan],[data-vote],[data-nx],[data-ex],[data-fin],[data-pc],[data-pd],[data-rp]");if(!t)return;const d=t.dataset,A=sess?.role==="admin",H2=A?$("av"):$("v");
 if(d.room){room=d.room;vChat(H2)}if(d.ng)groupDlg();if(d.live)liveDlg(d.live);if(d.ss!==undefined)t.classList.toggle("on");if(d.visit)update(ref(db,`${SITE}/scene`),{visit:{k:d.visit,t:now()}}).then(()=>toast("A visitor is on the way.")).catch(()=>toast("Could not send."));if(d.ed)editDlg(d.ed);if(d.add)addDlg();if(d.dm){const[i,m]=d.dm.split("|");startDraw(i,m)}if(d.nxt)stepLive(d.nxt);if(d.all)stepLive(d.all,1);if(d.dd)dataOp(d.dd);if(d.scan)doScan();if(d.fin)commit(d.fin);if(d.nx!==undefined)t.classList.toggle("on");
 if(d.delm)remove(ref(db,`${CH}/${room}/${d.delm}`));
 if(d.big){$("dlg").innerHTML=`<img src="${esc(t.src)}" style="width:100%;border-radius:14px"><div class="row"><button class="btn ghost" data-x="1">Close</button></div>`;$("dlg").showModal()}
 if(d.clr&&confirm("Delete every message in this room?"))remove(ref(db,`${CH}/${room}`));if(d.mute)update(ref(db,SITE),{muted:!site.muted});
 if(d.vote){const[p,i]=d.vote.split("|");set(ref(db,`${POLLS}/${p}/votes/${sess.id}`),+i).catch(()=>toast("Vote failed."))}
 if(d.ex){const[l,s]=d.ex.split("|"),x=new Set(lots[l].excl||[]);x.has(s)?x.delete(s):x.add(s);update(ref(db,`${LOTS}/${l}`),{excl:[...x]}).catch(()=>toast("Could not update."))}
 if(d.pc)update(ref(db,`${POLLS}/${d.pc}`),{closed:!polls[d.pc].closed});if(d.pd&&confirm("Delete this poll?"))remove(ref(db,`${POLLS}/${d.pd}`));
 if(d.rp){const p=prompt(`New password for ${rec(d.rp).n} (6+ characters):`);if(p&&p.trim().length>=6){await update(ref(db,`${STU}/${d.rp}`),{pw:await H(d.rp,p)});toast("Password reset.")}else if(p)toast("Too short.")}});
function groupDlg(){const dl=$("dlg");dl.innerHTML=`<h3>New group</h3><form id="gf"><label>Name<input id="gn" maxlength="30"></label><p class="lab">Members</p><div class="chips" style="flex-wrap:wrap;margin-top:8px">${list().map(s=>`<button type="button" class="ch" data-gm="${s.id}">${esc(s.n)}</button>`).join("")}</div><div class="row"><button class="btn">Create group</button><button type="button" class="btn ghost" data-x="1">Cancel</button></div></form>`;dl.showModal();
 dl.querySelectorAll("[data-gm]").forEach(b=>b.onclick=()=>b.classList.toggle("on"));
 $("gf").onsubmit=async e=>{e.preventDefault();const n=$("gn").value.trim(),m=[...dl.querySelectorAll("[data-gm].on")].map(b=>b.dataset.gm);if(!n||!m.length)return toast("Add a name and members.");const r=await push(ref(db,GRP),{name:n,members:m,created:Date.now()});room="g_"+r.key;dl.close();vChat($("av"))}}
/* ---------- boot ---------- */
function sceneCfg(){const s=site.scene||{};return{time:s.time||"auto",weather:s.weather||"auto",people:s.people!==false,animals:s.animals!==false,rare:s.rare!==false,labels:!!s.labels,crowd:+s.crowd||0,principal:s.principal||"",teachers:(s.teachers||"").split("\n").map(x=>x.trim()).filter(Boolean),students:(Array.isArray(s.students)&&s.students.length?s.students.filter(i=>roster[i]):list().map(x=>x.id)).map(i=>rec(i).n),visit:s.visit?{k:s.visit.k,t:s.visit.t-clockOff}:undefined}}
function paint(){SC.set(sceneCfg());if(sess?.role==="admin")return renderAdmin();if(sess?.role==="student"&&["home","class","lots"].includes(tab)&&!$("dlg").open&&document.activeElement?.id!=="cs2")show(tab,1)}
renderPick();SC.fail=()=>{const g=$("stage");g.classList.add("nogl");if(!g.querySelector("img"))g.insertAdjacentHTML("afterbegin",`<img class="fbimg" src="${BN}" alt="The college building">`);$("mood").hidden=true;document.querySelector(".hint").hidden=true};if(SC.failed)SC.fail();SC.mount($("stage"),0);$("pol").onclick=()=>$("pol").classList.toggle("big");SC.onInfo=t=>{wxt=t;document.querySelectorAll(".wxb").forEach(e=>e.textContent=t)};SC.onPick=(n,r)=>toast(n+" · "+r);$("mood").onclick=()=>{if(site.scene?.time&&site.scene.time!=="auto")return toast("Time of day is set by the admin.");$("mood").textContent=SC.next()};SC.set(sceneCfg());const fbSet=(c,m)=>{const f=$("fb");f.className="fb "+c;f.textContent=m};
const fbErr=e=>{const c=String(e&&(e.code||e.message)||"");
 fbSet("bad",/configuration-not-found/.test(c)?"Firebase Authentication is not set up yet. Console > Authentication > Get started, then enable Anonymous.":/operation-not-allowed|admin-restricted/.test(c)?"Anonymous sign-in is off. Firebase Console > Authentication > Sign-in method > enable Anonymous.":/permission_denied|PERMISSION/i.test(c)?"Database rules block access. Publish database.rules.json in Realtime Database > Rules.":/network/.test(c)?"No internet connection.":"Firebase error: "+c)};
(async()=>{if(/PASTE/.test(FB.apiKey+FB.appId)){fbSet("bad","Paste your Firebase apiKey, messagingSenderId and appId at the top of app.js.");return}try{await signInAnonymously(getAuth(app))}catch(e){fbErr(e);return}
 onValue(ref(db,".info/connected"),s=>{if(!$("fb").classList.contains("bad"))fbSet(s.val()?"ok":"wait",s.val()?"Connected to Firebase":"Connecting to Firebase…")});
 onValue(ref(db,STU),s=>{roster=s.val()||{};
  if(!s.exists()&&!seeded){seeded=true;update(ref(db,STU),Object.fromEntries(SEED.map((x,i)=>[x[0],{n:x[1],c:x[0]==="ameen"?"BSc":"BCA",ord:i,pw:x[2]}]))).catch(()=>{})}
  if(roster.ameen&&roster.ameen.c==="BCE")update(ref(db,STU+"/ameen"),{c:"BSc"}).catch(()=>{});
  renderPick();
  if(!booted){booted=true;try{const x=JSON.parse(sessionStorage.getItem("cas_s")||"null");if(x&&(x.role==="admin"||roster[x.id]))start(x)}catch(e){}}else paint()},fbErr);
 onValue(ref(db,LOTS),s=>{lots=s.val()||{};paint();autoLive()});
 onValue(ref(db,PRES),s=>{online=s.val()||{};if(sess?.role==="student"){$("onl").textContent=`${Object.keys(online).length} online`;paint()}});
 onValue(ref(db,".info/serverTimeOffset"),s=>clockOff=s.val()||0);onValue(ref(db,POLLS),s=>{polls=s.val()||{};paint()});onValue(ref(db,SITE),s=>{site=s.val()||{};applySite();paint()});onValue(ref(db,GRP),s=>{groups=s.val()||{};if(sess?.role==="admin"&&at==="chat")renderAdmin(true)});
})();
