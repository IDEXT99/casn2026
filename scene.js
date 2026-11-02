(()=>{const W=window.CASScene={ok:false,pend:null,failed:0,cfg:{},mount(h,o){W.pend=[h,o]},pause(){},next(){return"Auto"},set(c){W.cfg=c||{}},fail:null,onInfo:null,onPick:null},fail=()=>{W.failed=1;W.fail&&W.fail()};
const boot=()=>{const T=window.THREE;if(!T)return fail();
let R;try{R=new T.WebGLRenderer({antialias:true})}catch(e){try{R=new T.WebGLRenderer}catch(e2){return fail()}}
const lite=/Android/i.test(navigator.userAgent)&&(navigator.hardwareConcurrency||8)<=4,LAT=11.657,LON=75.648,RAD=Math.PI/180;
R.setPixelRatio(Math.min(devicePixelRatio||1,lite?1.25:2));R.domElement.className="gl";
if(!lite){R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap}
const S=new T.Scene,C=new T.PerspectiveCamera(42,1,.1,300),G=new T.Group,WM=[],rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)],CL=h=>new T.Color(h);S.add(G);
const mat=(c,r=.9,e=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:0,emissive:e,side:2});
const win=c=>{const m=mat(c,.8,"#ff8a2a");WM.push(m);return m};
let P=G;const add=(g,m,x,y,z,p)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;(p||P).add(o);return o};
const B=(w,h,d,m,x,y,z)=>add(new T.BoxGeometry(w,h,d),m,x,y,z),cyl=(a,b,h,n)=>new T.CylinderGeometry(a,b,h,n||8);
const cv=(w,h,f,rx,ry)=>{const c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;if(rx)t.repeat.set(rx,ry);return t};
const speck=(x,w,h,n,cols,s)=>{for(let i=0;i<n;i++){x.fillStyle=cols[i%cols.length];x.globalAlpha=.06+rnd()*.14;x.fillRect(rnd()*w,rnd()*h,s*(.4+rnd()),s*(.4+rnd()))}x.globalAlpha=1};
const plaster=cv(128,128,(x,w,h)=>{x.fillStyle="#dcbf5c";x.fillRect(0,0,w,h);speck(x,w,h,1100,["#fff","#6f4f18","#a88a30","#3a2a10"],3);for(let i=0;i<16;i++){x.fillStyle="rgba(60,40,15,.11)";x.fillRect(rnd()*w,0,2+rnd()*5,h*(.3+rnd()*.7))}},3,1);
const tileT=cv(128,128,(x,w,h)=>{for(let r=0;r<8;r++)for(let c=0;c<8;c++){const k=rnd();x.fillStyle=`rgb(${150+k*40|0},${68+k*22|0},${40+k*14|0})`;x.fillRect(c*16,r*16,15,15);x.fillStyle="rgba(0,0,0,.35)";x.fillRect(c*16,r*16+13,15,2)}speck(x,w,h,500,["#2a3a1a","#000"],4)},9,3);
const woodT=cv(64,64,(x,w,h)=>{x.fillStyle="#5a3a22";x.fillRect(0,0,w,h);for(let i=0;i<30;i++){x.fillStyle="rgba(20,10,5,.25)";x.fillRect(rnd()*w,0,1,h)}});
const gndT=cv(128,128,(x,w,h)=>{x.fillStyle="#8a4b32";x.fillRect(0,0,w,h);speck(x,w,h,1500,["#c07a50","#4a2a1a","#a05a38"],3)},14,6),grsT=cv(128,128,(x,w,h)=>{x.fillStyle="#4d7a34";x.fillRect(0,0,w,h);speck(x,w,h,1500,["#8fb85a","#2a4a1a","#6a9a40"],3)},30,30);
const gm=new T.MeshStandardMaterial({map:gndT,roughness:1}),gBase=gm.color.clone();
add(new T.CircleGeometry(150,40),new T.MeshStandardMaterial({map:grsT,roughness:1}),0,-.02,0).rotation.x=-Math.PI/2;
add(new T.PlaneGeometry(60,26),gm,0,0,6).rotation.x=-Math.PI/2;
B(28,.04,1.4,mat("#9a948a",1),0,.02,5.1);
const signT=cv(256,96,(x,w,h)=>{x.fillStyle="#f1ecdc";x.fillRect(0,0,w,h);x.strokeStyle="#333";x.lineWidth=3;x.strokeRect(3,3,w-6,h-6);x.fillStyle="#1a1a1a";x.textAlign="center";x.font="bold 19px serif";x.fillText("COLLEGE OF APPLIED SCIENCE",128,42);x.font="bold 17px serif";x.fillText("NADAPURAM",128,70)});
const bld=()=>{const g=new T.Group;P=g;const pl=mat("#59687a",.95),wl=new T.MeshStandardMaterial({map:plaster,roughness:.95,side:2}),wd=new T.MeshStandardMaterial({map:woodT,roughness:.8,side:2}),rf=new T.MeshStandardMaterial({map:tileT,roughness:.75,side:2});
 B(12.4,.5,4.4,pl,0,.25,0);B(12,2.8,.3,wl,0,1.9,-1.8);B(3.2,2.8,3.4,wl,-4.4,1.9,-.2);B(1,1.8,.1,wd,-4.4,1.4,1.52);B(8.8,2.8,.2,wl,1.6,1.9,-.9);B(8.8,.08,2.6,mat("#8d877d",1),1.6,.54,.4);
 [-1,1.2,3.4,5.6].forEach(x=>B(1,1.8,.1,win("#2a1c12"),x,1.5,-.75));
 for(let i=0;i<5;i++)add(cyl(.12,.12,2.9,8),wd,-2.6+i*2.2,1.95,1.7);
 [1,-1].forEach(s=>{add(new T.BoxGeometry(13.2,.16,3.4),rf,0,3.58,s*1.49).rotation.x=s*.5;B(13.2,.1,.1,wd,0,2.75,s*2.98)});
 B(13.2,.14,.3,mat("#7d3820"),0,4.42,0);
 const sh=new T.Shape;sh.moveTo(-3,-.5);sh.lineTo(3,-.5);sh.lineTo(0,1.1);[-6.5,6.5].forEach(x=>add(new T.ShapeGeometry(sh),wl,x,3.3,0).rotation.y=Math.PI/2);
 add(new T.PlaneGeometry(2.4,.9),new T.MeshStandardMaterial({map:signT,roughness:.7}),-1.6,2.45,2.3);B(.05,.45,.05,wd,-2.7,2.85,2.3);B(.05,.45,.05,wd,-.5,2.85,2.3);
 for(let i=0;i<9;i++)add(new T.SphereGeometry(.55,12,9),mat(i%2?"#6f8f2a":"#587f27",1),-5.5+i*1.3,.8,3.6).scale.y=1.1;
 B(1.8,.2,.7,mat("#a89070"),5.2,.1,2.9);B(1.8,.2,.7,mat("#9a8264"),5.2,.3,2.4);P=G;return g};
const bA=bld(),bB=bld();bA.position.x=-7.2;bB.position.x=7.2;G.add(bA,bB);
const trees=[],tg=new T.IcosahedronGeometry(1,1),tk=cyl(.2,.3,3,6),tm=["#1f5a34","#2a6e3a","#2f7a3a","#1a4a2c","#3a7a2e"].map(c=>mat(c,1)),bm=mat("#4a3220");
const tree=(x,z)=>{const q=2+rnd()*1.6;add(tk,bm,x,1.5,z);const m=add(tg,pick(tm),x,3+q*.5,z);m.scale.set(q,q*1.2,q);trees.push({m,ph:rnd()*6,bx:x})};
for(let r=0;r<4;r++)for(let x=-44;x<=44;x+=3)tree(x+rnd()*2,-9-r*4+rnd()*2);
[-1,1].forEach(g=>{for(let z=7;z>-9;z-=3)for(let k=0;k<3;k++)tree(g*(24+k*5+rnd()*3),z+rnd()*2)});
const palm=(x,z,h)=>{add(cyl(.12,.2,h,6),bm,x,h/2,z).rotation.z=.12;const g=new T.Group;g.position.set(x-h*.06,h,z);G.add(g);const fm=mat("#2f7a3a",.9);for(let k=0;k<8;k++){const a=new T.Group;a.rotation.y=k*.8;g.add(a);add(new T.BoxGeometry(2.4,.05,.32),fm,1.2,0,0,a).rotation.z=-.4}trees.push({m:g,ph:rnd()*6,bx:x})};
palm(-17,5,7);palm(17,6,8);palm(-3,-12,10);palm(10,-13,9);palm(24,2,7);palm(-24,3,8);
add(cyl(.06,.06,8,6),mat("#ccc"),-1.3,4,5.6);const flag=new T.Group;flag.position.set(-1.3,7.4,5.6);G.add(flag);[["#ff9933",.3],["#fff",0],["#138808",-.3]].forEach(c=>add(new T.PlaneGeometry(1.2,.3),mat(c[0]),.6,c[1],0,flag));
/* sky */
const SU={top:{value:CL("#2b78e0")},bot:{value:CL("#a8d4ff")},sc:{value:CL("#fff")},sd:{value:new T.Vector3(0,1,0)},k:{value:0}};
const sky=new T.Mesh(new T.SphereGeometry(150,24,16),new T.ShaderMaterial({uniforms:SU,side:T.BackSide,depthWrite:false,fog:false,vertexShader:"varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 top,bot,sc,sd;uniform float k;varying vec3 vP;void main(){float h=clamp(vP.y*1.6+.12,0.,1.);vec3 c=mix(bot,top,pow(h,.7));float s=max(dot(vP,sd),0.);c+=sc*(pow(s,10.)*.3*k+pow(s,300.)*.9*k);gl_FragColor=vec4(c,1.);}"}));sky.renderOrder=-2;S.add(sky);
const sp=new Float32Array(1200);for(let i=0;i<1200;i+=3){const a=rnd()*6.28,e=rnd()*1.3+.1;sp[i]=Math.cos(a)*Math.cos(e)*140;sp[i+1]=Math.sin(e)*140;sp[i+2]=Math.sin(a)*Math.cos(e)*140}
const sgeo=new T.BufferGeometry;sgeo.setAttribute("position",new T.BufferAttribute(sp,3));const smat=new T.PointsMaterial({color:0xffffff,size:1.6,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false});S.add(new T.Points(sgeo,smat));
const disc=(f)=>cv(128,128,(x)=>{const g=x.createRadialGradient(64,64,0,64,64,64);f(g);x.fillStyle=g;x.fillRect(0,0,128,128)});
const moon=new T.Sprite(new T.SpriteMaterial({map:disc(g=>{g.addColorStop(0,"#fff");g.addColorStop(.5,"#eef");g.addColorStop(.55,"rgba(220,230,255,.25)");g.addColorStop(1,"rgba(220,230,255,0)")}),fog:false,transparent:true,depthWrite:false}));moon.scale.set(16,16,1);S.add(moon);
const cT=disc(g=>{g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.6,"rgba(255,255,255,.5)");g.addColorStop(1,"rgba(255,255,255,0)")}),clouds=[];
for(let i=0;i<18;i++){const s=new T.Sprite(new T.SpriteMaterial({map:cT,fog:false,transparent:true,depthWrite:false}));s.scale.set(50+rnd()*40,16+rnd()*10,1);s.position.set(rnd()*260-130,28+rnd()*28,-30-rnd()*90);S.add(s);clouds.push(s)}
/* lights */
const hemi=new T.HemisphereLight,sun=new T.DirectionalLight;sun.castShadow=!lite;sun.shadow.mapSize.set(1536,1536);{const c=sun.shadow.camera;c.left=-34;c.right=34;c.top=20;c.bottom=-14;c.near=1;c.far=160}sun.shadow.bias=-.0006;sun.target.position.set(0,0,3);S.add(hemi,sun,sun.target);
/* rain */
const RN=lite?700:1500,rA=new Float32Array(RN*6);for(let i=0;i<RN*6;i+=6){const x=rnd()*60-30,y=rnd()*16,z=rnd()*30-10;rA.set([x,y,z,x,y+.7,z],i)}
const rg=new T.BufferGeometry,rp=new T.BufferAttribute(rA,3);rg.setAttribute("position",rp);const rain=new T.LineSegments(rg,new T.LineBasicMaterial({color:0xcfe0ff,transparent:true,opacity:.35,fog:false}));rain.frustumCulled=false;S.add(rain);
/* fireflies */
const fp=new Float32Array(150);for(let i=0;i<150;i+=3){fp[i]=rnd()*40-20;fp[i+1]=.5+rnd()*3;fp[i+2]=rnd()*14-4}const fg=new T.BufferGeometry;fg.setAttribute("position",new T.BufferAttribute(fp,3));const fm=new T.PointsMaterial({color:0xffe08a,size:.16,transparent:true,blending:2,depthWrite:false}),ff=new T.Points(fg,fm);G.add(ff);
/* sun, time, weather */
const KF=[[-20,"#02030a","#0a1030","#6a7fcc",.28,"#223366","#0a0a14",.38,0],[-6,"#0d1230","#33335e","#7788cc",.22,"#33406e","#161018",.4,0],[0,"#26346e","#ff9a5c","#ffa860",.6,"#7e92d8","#3d2a22",.55,1],[8,"#4678c8","#ffd9a0","#ffd9a8",1.1,"#aac4ff","#5e5040",.7,.8],[30,"#3d86e0","#bfe0ff","#fff2dc",1.5,"#cfe0ff","#6f7f55",.85,.4],[70,"#2b78e0","#a8d4ff","#ffffff",1.7,"#d8e8ff","#7a8a5e",.95,.3]].map(k=>[k[0],CL(k[1]),CL(k[2]),CL(k[3]),k[4],CL(k[5]),CL(k[6]),k[7],k[8]]);
const kf=el=>{const e=Math.max(-20,Math.min(70,el));let i=0;while(i<KF.length-2&&e>=KF[i+1][0])i++;const a=KF[i],b=KF[i+1],t=(e-a[0])/(b[0]-a[0]),n=(x,y)=>x+(y-x)*t,c=(x,y)=>x.clone().lerp(y,t);return{top:c(a[1],b[1]),bot:c(a[2],b[2]),lc:c(a[3],b[3]),li:n(a[4],b[4]),hs:c(a[5],b[5]),hg:c(a[6],b[6]),hi:n(a[7],b[7]),gl:n(a[8],b[8])}};
const sunPos=(d,la,lo)=>{const n=(d-new Date(Date.UTC(d.getUTCFullYear(),0,0)))/864e5,g=2*Math.PI/365*(n-1+(d.getUTCHours()-12)/24),dec=.006918-.399912*Math.cos(g)+.070257*Math.sin(g),eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)),tst=d.getUTCHours()*60+d.getUTCMinutes()+eq+4*lo,ha=(tst/4-180)*RAD,L=la*RAD;return{el:Math.asin(Math.sin(L)*Math.sin(dec)+Math.cos(L)*Math.cos(dec)*Math.cos(ha))/RAD,az:Math.atan2(Math.sin(ha),Math.cos(ha)*Math.sin(L)-Math.tan(dec)*Math.cos(L))/RAD}};
const PRE={morning:{el:24,az:-75},noon:{el:78,az:0},evening:{el:6,az:78},night:{el:-40,az:0}},LT=["auto","morning","noon","evening","night"],LN=["Auto","Morning","Noon","Evening","Night"];let lt=0;
const tmode=()=>W.cfg.time&&W.cfg.time!=="auto"?W.cfg.time:LT[lt],sunNow=()=>{const m=tmode();return m==="auto"?sunPos(new Date(),LAT,LON):PRE[m]||PRE.noon};
let wx={cloud:.2,rain:0,fog:0,storm:0,wind:.3,temp:null,label:"Clear"};
const FO={clear:{cloud:.08,rain:0,fog:0,storm:0,label:"Sunny"},cloudy:{cloud:.85,rain:0,fog:0,storm:0,label:"Cloudy"},rain:{cloud:.9,rain:.75,fog:0,storm:0,label:"Rain"},storm:{cloud:1,rain:1,fog:0,storm:1,wind:.9,label:"Thunderstorm"},fog:{cloud:.6,rain:0,fog:1,storm:0,label:"Fog"}};
const curW=()=>FO[W.cfg.weather]?Object.assign({},wx,FO[W.cfg.weather]):wx;
const WL=c=>c===0?"Clear":c<=2?"Partly cloudy":c===3?"Overcast":c<50?"Fog":c<60?"Drizzle":c<70?"Rain":c<80?"Snow":c<85?"Showers":"Thunderstorm";
const info=()=>{const w=curW();W.onInfo&&W.onInfo((FO[W.cfg.weather]?"":(wx.temp!=null?wx.temp+"°C · ":""))+w.label+(FO[W.cfg.weather]?" · set by admin":" · Nadapuram"))};
const load=async()=>{try{const j=(await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,cloud_cover,precipitation,wind_speed_10m&timezone=auto`)).json()).current,c=j.weather_code,wet=[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(c);wx={cloud:Math.min(1,(j.cloud_cover||0)/100),rain:wet?Math.min(1,.3+(j.precipitation||0)/4+(c>=63?.25:0)):0,storm:c>=95?1:0,fog:c===45||c===48?1:0,wind:Math.min(1,(j.wind_speed_10m||0)/40),temp:Math.round(j.temperature_2m),label:WL(c)};info()}catch(e){}};
load();setInterval(load,6e5);
const tgt=()=>{const s=sunNow(),k=kf(s.el),w=curW(),cl=w.cloud,df=Math.min(1,Math.max(0,(s.el+6)/26)),g=CL("#8a94a2").multiplyScalar(.15+.85*df),g2=CL("#6b7480").multiplyScalar(.12+.88*df);
 k.top.lerp(g,cl*.75);k.bot.lerp(g2,cl*.7);k.li*=1-.7*cl;k.gl*=1-cl;k.hi*=1+.25*cl;k.hs.lerp(g,cl*.4);if(w.fog){k.bot.lerp(CL("#b8c0c8").multiplyScalar(.2+.8*df),w.fog*.8);k.top.lerp(k.bot,w.fog*.6)}
 return Object.assign(k,{cloud:cl,rain:w.rain,fog:.011+w.fog*.05+w.rain*.01,star:s.el<-4?Math.max(0,1-cl*1.3):0,win:Math.min(1.5,(1-df)*1.5+cl*.45+w.rain*.2),wind:w.wind,storm:w.storm,el:s.el,az:s.az,df})};
const NUM=["li","hi","gl","cloud","rain","fog","star","win","wind","storm","el","az","df"],COL=["top","bot","lc","hs","hg"];let E=null,fl=0;
S.fog=new T.FogExp2(0x8899aa,.02);
/* people */
const SKIN=["#f1c9a5","#d9a679","#b8825a","#8d5a3b","#6b4129"],walkers=[],wmat={};const mm=(c,r)=>wmat[c+r]||(wmat[c+r]=mat(c,r));
const human=kind=>{const g=new T.Group,sk=mm(pick(SKIN),.7),hr=mm(pick(["#15100c","#241810","#0e0e12"]),.9),F=kind==="tf"||(kind==="s"&&rnd()<.4),top=mm(pick(kind==="p"?["#f2f2f0"]:kind==="tm"||kind==="tf"?["#e9eef5","#cbd8e8","#f3e7d3"]:["#2d5d8a","#a33b2e","#3b7a4a","#d2a62c","#6b4a8a","#dfe5ea","#1f2a44"]),.85),bot=mm(pick(kind==="p"||kind==="tm"?["#16161a","#2a2a30"]:["#1b2540","#3a3a3a","#4a5a78","#222"]),.9),L=[],A=[];
 add(cyl(.2,.17,.6,10),top,0,1.12,0,g);add(cyl(.05,.05,.1,8),sk,0,1.46,0,g);add(new T.SphereGeometry(.115,14,12),sk,0,1.6,0,g).scale.set(.95,1.1,.95);add(new T.SphereGeometry(.12,12,10,0,6.3,0,1.7),hr,-.012,1.62,0,g);if(F)add(new T.BoxGeometry(.08,.38,.2),hr,-.1,1.42,0,g);
 for(const s of[-1,1]){const lp=new T.Group;lp.position.set(0,.8,s*.09);g.add(lp);if(!(F&&kind==="tf"))add(cyl(.075,.06,.78,8),bot,0,-.4,0,lp);add(new T.BoxGeometry(.2,.07,.1),mm("#111",.6),.04,-.8,0,lp);L.push(lp);const ap=new T.Group;ap.position.set(0,1.38,s*.255);g.add(ap);add(cyl(.052,.042,.58,8),top,0,-.29,0,ap);add(new T.SphereGeometry(.05,8,6),sk,0,-.6,0,ap);A.push(ap)}
 if(F&&kind==="tf")add(cyl(.19,.3,.82,12),mm(pick(["#b5304a","#2a6f6a","#c9962b","#5a3a8a"]),.8),0,.6,0,g);else if(F)add(cyl(.2,.27,.5,12),top,0,.8,0,g);
 if(wxNow().rain>.3){const u=new T.Group;u.position.set(0,1.95,0);g.add(u);add(new T.ConeGeometry(.6,.25,14),mm(pick(["#222","#6b1f2a","#1f3a6b"]),.6),0,.1,0,u);add(cyl(.015,.015,.5,4),mm("#111",.5),0,-.15,0,u)}
 return{g,L,A}};
const wxNow=()=>E||{rain:0},NAMES={s:"Student",tm:"Teacher",tf:"Teacher",p:"Principal"};
/* animals */
const TX={tiger:cv(128,64,(x,w,h)=>{x.fillStyle="#d77a1e";x.fillRect(0,0,w,h);x.fillStyle="#141010";for(let i=0;i<22;i++){x.beginPath();x.moveTo(i*6,0);x.lineTo(i*6+2+rnd()*4,h*.5);x.lineTo(i*6-1,h);x.lineTo(i*6+4,h);x.lineTo(i*6+5+rnd()*3,h*.5);x.lineTo(i*6+3,0);x.fill()}}),gir:cv(128,128,(x,w,h)=>{x.fillStyle="#e0b25a";x.fillRect(0,0,w,h);x.fillStyle="#8a5a22";for(let i=0;i<26;i++){x.beginPath();x.ellipse(rnd()*w,rnd()*h,6+rnd()*7,5+rnd()*6,rnd()*3,0,6.3);x.fill()}}),cow:cv(128,64,(x,w,h)=>{x.fillStyle="#ece8df";x.fillRect(0,0,w,h);x.fillStyle="#1a1614";for(let i=0;i<7;i++){x.beginPath();x.ellipse(rnd()*w,rnd()*h,8+rnd()*14,6+rnd()*9,rnd()*3,0,6.3);x.fill()}})};
const ANI={dog:{n:"Dog",L:.75,BH:.3,LH:.32,LT:.05,NL:.14,NA:40,HS:.12,c:"#8a6a45",tail:.3,sp:2},cat:{n:"Cat",L:.42,BH:.17,LH:.17,LT:.03,NL:.08,NA:45,HS:.08,c:"#a8794a",tail:.4,sp:1.2},cow:{n:"Cow",L:1.5,BH:.7,LH:.65,LT:.09,NL:.3,NA:25,HS:.22,c:"#ece8df",tex:"cow",tail:.7,sp:.9},tiger:{n:"Tiger",L:1.7,BH:.65,LH:.6,LT:.11,NL:.25,NA:30,HS:.26,c:"#d77a1e",tex:"tiger",tail:.9,sp:2},giraffe:{n:"Giraffe",L:1.5,BH:.75,LH:1.5,LT:.08,NL:1.7,NA:68,HS:.17,c:"#e0b25a",tex:"gir",tail:.6,sp:1.4},elephant:{n:"Elephant",L:2.4,BH:1.4,LH:1,LT:.26,NL:.3,NA:25,HS:.45,c:"#7d7b78",tail:.8,sp:.8,ear:1}};
const quad=k=>{const a=ANI[k],g=new T.Group,m=mat(a.c,.85);if(a.tex)m.map=TX[a.tex];const dk=mat("#1a1410",.8),yb=a.LH+a.BH/2,body=add(new T.SphereGeometry(1,18,12),m,0,yb,0,g);body.scale.set(a.L/2,a.BH/2,a.BH/2*.9);const legs=[],lh=a.LH+a.BH*.15;
 [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([fx,s])=>{const p=new T.Group;p.position.set(fx*a.L*.32,lh,s*a.BH*.3);g.add(p);add(cyl(a.LT,a.LT*.8,lh,8),m,0,-lh/2,0,p);add(cyl(a.LT*1.05,a.LT*1.05,a.LT*.7,8),dk,0,-lh+a.LT*.35,0,p);legs.push(p)});
 const nk=new T.Group;nk.position.set(a.L*.4,yb+a.BH*.15,0);nk.rotation.z=-(Math.PI/2-a.NA*RAD);g.add(nk);add(cyl(a.HS*.8*(a.NL>1?.6:1),a.HS*1.1*(a.NL>1?.9:1),a.NL,10),m,0,a.NL/2,0,nk);
 const hd=new T.Group;hd.position.set(0,a.NL,0);hd.rotation.z=Math.PI/2-a.NA*RAD-.25;nk.add(hd);add(new T.SphereGeometry(a.HS,14,10),m,a.HS*.6,0,0,hd).scale.set(1.4,.95,.85);add(new T.BoxGeometry(a.HS*.9,a.HS*.55,a.HS*.6),m,a.HS*1.5,-a.HS*.15,0,hd);
 [-1,1].forEach(s=>{add(new T.SphereGeometry(a.HS*.09,6,6),dk,a.HS*1.05,a.HS*.25,s*a.HS*.4,hd);if(a.ear)add(new T.CylinderGeometry(a.HS*1.2,a.HS*1.2,.04,14),m,a.HS*.3,-a.HS*.1,s*a.HS*1.15,hd).rotation.x=Math.PI/2;else add(new T.ConeGeometry(a.HS*.22,a.HS*.4,6),m,a.HS*.3,a.HS*.95,s*a.HS*.45,hd)});
 if(a.ear){for(let i=0;i<4;i++)add(cyl(.17-i*.02,.15-i*.02,.4,8),m,a.HS*2.1,-.2-i*.34,0,hd).rotation.z=.1+i*.08;[-1,1].forEach(s=>add(new T.ConeGeometry(.05,.4,6),mat("#eee8d8"),a.HS*2,-.55,s*.25,hd).rotation.z=2.2)}
 const tl=new T.Group;tl.position.set(-a.L*.48,yb+a.BH*.15,0);tl.rotation.z=1.1;g.add(tl);add(cyl(a.LT*.4,a.LT*.25,a.tail,6),m,0,a.tail/2,0,tl);return{g,legs,a}};
const lanes=[2.6,6,7.4,8.8],labelCache=[];
const mkLabel=(t,sub,h)=>{const s=new T.Sprite(new T.SpriteMaterial({map:cv(256,72,(x,w,hh)=>{x.fillStyle="rgba(20,15,43,.82)";x.fillRect(0,0,w,hh);x.fillStyle="#ffd166";x.font="bold 26px sans-serif";x.textAlign="center";x.fillText(t.slice(0,16),128,32);x.fillStyle="#fff";x.font="16px sans-serif";x.fillText(sub,128,56)}),transparent:true,depthTest:false}));s.scale.set(2.2,.62,1);s.position.set(0,h,0);s.renderOrder=9;return s};
const cfgN=(k,d)=>{const a=W.cfg[k];return Array.isArray(a)&&a.length?a:d};
const spawnP=(n)=>{const dir=rnd()<.5?1:-1,z=pick(lanes),x0=dir>0?-27:27;for(let i=0;i<n;i++){let kind=i===0&&rnd()<.14&&!walkers.some(w=>w.kind==="p")?"p":rnd()<.2?pick(["tm","tf"]):"s";const h=human(kind),nm=kind==="s"?pick(cfgN("students",["Student"])):kind==="p"?(W.cfg.principal||"Principal"):pick(cfgN("teachers",["Teacher"]));
  h.g.position.set(x0-dir*i*.9,0,z+(rnd()-.5)*.4);h.g.rotation.y=dir>0?0:Math.PI;G.add(h.g);const w={g:h.g,L:h.L,A:h.A,dir,sp:1.1+rnd()*.5,ph:rnd()*6,p:1,kind,name:nm,role:NAMES[kind],h:1.9,z};h.g.userData.w=w;walkers.push(w);if(W.cfg.labels)h.g.add(mkLabel(nm,w.role,2.25))}};
const spawnA=k=>{const q=quad(k),dir=rnd()<.5?1:-1,z=pick(lanes);q.g.position.set(dir>0?-27:27,0,z);q.g.rotation.y=dir>0?0:Math.PI;G.add(q.g);const w={g:q.g,L:q.legs,dir,sp:q.a.sp*(.8+rnd()*.4),ph:rnd()*6,p:0,kind:k,name:q.a.n,role:"Animal",h:q.a.LH+q.a.NL*.9+.4,big:q.a.LH>.9,z};q.g.userData.w=w;walkers.push(w);if(W.cfg.labels)q.g.add(mkLabel(q.a.n,"Animal",w.h+.3))};
let spt=1,lastV=0;
/* scene API */
let el,off=0,ro,run=0,yaw=0,t=0,last=0,dx=null,down=null;
W.set=c=>{W.cfg=c||{};const v=W.cfg.visit;if(v&&v.t>lastV){lastV=v.t;if(Date.now()-v.t<6e4&&ANI[v.k])spawnA(v.k)}info()};
W.next=()=>{lt=(lt+1)%LT.length;return LN[lt]};
const ray=new T.Raycaster,mv=new T.Vector2;let lab=null;
R.domElement.addEventListener("pointerdown",e=>{dx=e.clientX;down=[e.clientX,e.clientY]});
addEventListener("pointermove",e=>{if(dx!=null){yaw=Math.max(-1.1,Math.min(1.1,yaw-(e.clientX-dx)*.006));dx=e.clientX}});
addEventListener("pointerup",e=>{const was=dx!=null;dx=null;if(!was||!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const r=R.domElement.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mv,C);const hit=ray.intersectObjects(walkers.map(w=>w.g),true)[0];if(!hit)return;let o=hit.object;while(o&&!o.userData.w)o=o.parent;if(!o)return;const w=o.userData.w;if(lab){lab.parent&&lab.parent.remove(lab)}lab=mkLabel(w.name,w.role,w.h+.35);o.add(lab);setTimeout(()=>{if(lab&&!W.cfg.labels)lab.parent&&lab.parent.remove(lab)},3500);W.onPick&&W.onPick(w.name,w.role)});
const fit=()=>{if(!el)return;const w=el.clientWidth||300,h=el.clientHeight||300;R.setSize(w,h,false);C.aspect=w/h;off?C.setViewOffset(w,h,0,h*off,w,h):C.clearViewOffset();C.updateProjectionMatrix()};
const loop=()=>{if(!run)return;requestAnimationFrame(loop);const n=performance.now(),dt=Math.min(.05,(n-(last||n))/1e3);last=n;t+=dt;
 const tg=tgt();if(!E)E=tg;else{const k=Math.min(1,dt*1.5);NUM.forEach(q=>E[q]+=(tg[q]-E[q])*k);COL.forEach(q=>E[q].lerp(tg[q],k))}
 if((E.storm||E.rain>.8)&&rnd()<dt*.25)fl=1;fl*=Math.pow(.02,dt);
 const d=new T.Vector3(Math.sin(E.az*RAD)*Math.cos(E.el*RAD),Math.sin(E.el*RAD),Math.cos(E.az*RAD)*Math.cos(E.el*RAD)),up=E.el>-2;
 sun.position.copy(up?d:d.clone().negate()).multiplyScalar(60);sun.color.copy(E.lc);sun.intensity=E.li;hemi.color.copy(E.hs);hemi.groundColor.copy(E.hg);hemi.intensity=E.hi+fl*2.2;
 SU.top.value.copy(E.top).lerp(CL("#cfe0ff"),fl*.5);SU.bot.value.copy(E.bot);SU.sc.value.copy(E.lc);SU.sd.value.copy(d);SU.k.value=E.gl;S.fog.color.copy(E.bot);S.fog.density=E.fog;
 smat.opacity=E.star;moon.position.copy(d).negate().multiplyScalar(130);moon.material.opacity=Math.max(0,Math.min(1,(2-E.el)/8))*(1-E.cloud*.8);
 WM.forEach(m=>m.emissiveIntensity=E.win);fm.opacity=Math.max(0,1-E.df*1.5)*(.6+Math.sin(t*3)*.4);ff.visible=E.df<.5;
 const cs=.25+.75*E.df;clouds.forEach(c=>{c.material.opacity=Math.min(1,E.cloud*1.1);c.material.color.setScalar(cs*(1-.4*E.rain));c.position.x+=(.4+E.wind*3)*dt;if(c.position.x>140)c.position.x=-140});
 gm.color.copy(gBase).multiplyScalar(1-.4*E.rain);gm.roughness=1-.4*E.rain;
 rain.visible=E.rain>.02;if(rain.visible){const p=rA,wd=E.wind*9*dt;for(let i=0;i<RN*6;i+=6){p[i+1]-=24*dt;p[i+4]-=24*dt;p[i]+=wd;p[i+3]+=wd;if(p[i+1]<0){p[i+1]+=16;p[i+4]+=16;p[i]-=wd*2*(1+rnd())}}rp.needsUpdate=true;rg.setDrawRange(0,Math.floor(E.rain*RN)*2)}
 trees.forEach(o=>o.m.rotation.z=Math.sin(t*(.7+E.wind)+o.ph)*(.015+E.wind*.05));flag.rotation.y=Math.sin(t*3)*.25*(.5+E.wind);
 spt-=dt;if(spt<=0){spt=5+rnd()*8;const c=W.cfg,night=E.el<-6,wet=E.rain>.6,nP=walkers.filter(w=>w.p).length,nA=walkers.length-nP;
  if(c.people!==false&&nP<(c.crowd||(lite?2:4))&&rnd()<(night?.12:wet?.5:.85))spawnP(1+Math.floor(rnd()*3));
  if(c.animals!==false&&nA<2&&rnd()<(night?.5:.35))spawnA(rnd()<.05&&c.rare!==false?pick(["tiger","giraffe","elephant"]):pick(["dog","cat","dog","cow"]))}
 for(let i=walkers.length-1;i>=0;i--){const w=walkers[i];w.g.position.x+=w.dir*w.sp*dt;w.ph+=dt*w.sp*(w.p?5:w.big?2.2:7);const s=Math.sin(w.ph);if(w.p){w.L[0].rotation.z=s*.5;w.L[1].rotation.z=-s*.5;w.A[0].rotation.z=-s*.4;w.A[1].rotation.z=s*.4;w.g.position.y=Math.abs(s)*.025}else{w.L[0].rotation.z=w.L[3].rotation.z=s*.55;w.L[1].rotation.z=w.L[2].rotation.z=-s*.55}
  if(Math.abs(w.g.position.x)>30){G.remove(w.g);walkers.splice(i,1)}}
 const a=C.aspect,dist=19+9*Math.max(0,1-a),cx=a<1.3?Math.sin(t*.12)*(1.3-a)*10:0;C.position.set(cx+Math.sin(yaw)*dist,4.6,Math.cos(yaw)*dist);C.lookAt(cx,2,0);sky.position.copy(C.position);R.render(S,C)};
W.mount=(host,o)=>{off=o||0;if(el!==host||!host.contains(R.domElement)){el=host;host.prepend(R.domElement);ro&&ro.disconnect();ro=new ResizeObserver(fit);ro.observe(host)}fit();if(!run){run=1;last=0;loop()}};
R.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();run=0});R.domElement.addEventListener("webglcontextrestored",()=>{if(el&&!run){run=1;last=0;loop()}});
W.pause=()=>{run=0};W.ok=true;info();if(W.pend)W.mount(W.pend[0],W.pend[1])};
const safe=()=>{try{boot()}catch(e){console.error("3D scene failed",e);fail()}};
if(window.THREE)safe();else{const t=document.createElement("script");t.src="three.min.js";t.onload=safe;t.onerror=()=>{const u=document.createElement("script");u.src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";u.onload=safe;u.onerror=fail;document.head.appendChild(u)};document.head.appendChild(t)}
})();
