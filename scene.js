(()=>{const W=window.CASScene={ok:false,pend:null,failed:0,mount(h,o){W.pend=[h,o]},pause(){},next(){return"Dusk"}},fail=()=>{W.failed=1;W.fail&&W.fail()};
const boot=()=>{const T=window.THREE;if(!T)return fail();
let R;try{R=new T.WebGLRenderer({antialias:true})}catch(e){try{R=new T.WebGLRenderer}catch(e2){return fail()}}
R.setPixelRatio(Math.min(devicePixelRatio,2));R.domElement.className="gl";
const S=new T.Scene,C=new T.PerspectiveCamera(42,1,.1,120),G=new T.Group,WM=[];S.add(G);
let P=G;const mat=(c,e)=>new T.MeshLambertMaterial({color:c,emissive:e||0,side:2});
const add=(g,m,x,y,z,p)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);(p||P).add(o);return o};
const B=(w,h,d,c,x,y,z,e)=>{const m=mat(c,e);if(e)WM.push(m);return add(new T.BoxGeometry(w,h,d),m,x,y,z)};
const cv=(w,h,f)=>{const c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);return new T.CanvasTexture(c)};
add(new T.CircleGeometry(40,48),mat(0x7a4430),0,0,0).rotation.x=-Math.PI/2;
/* building */
const BG=new T.Group;P=BG;G.add(BG);
const Y=0xe6c65a;
B(12.4,.5,4.4,0x59687a,0,.25,0);B(12,2.8,.3,Y,0,1.9,-1.8);B(3.2,2.8,3.4,Y,-4.4,1.9,-.2);B(1,1.8,.1,0x7a2f2f,-4.4,1.4,1.52);B(8.8,2.8,.2,0xc9a24a,1.6,1.9,-.9);
[-1,1.2,3.4,5.6].forEach(x=>B(1,1.8,.1,0x2a1c12,x,1.5,-.75,0xff8a2a));
for(let i=0;i<5;i++)add(new T.CylinderGeometry(.12,.12,2.9,8),mat(0x5a3a22),-2.6+i*2.2,1.95,1.7);
const tile=cv(64,64,(x,w,h)=>{x.fillStyle="#a8502f";x.fillRect(0,0,w,h);x.fillStyle="#7d3820";for(let i=0;i<8;i++)x.fillRect(0,i*8+6,w,2)});tile.wrapS=tile.wrapT=1000;tile.repeat.set(6,2);
const rm=new T.MeshLambertMaterial({map:tile});
[1,-1].forEach(s=>{add(new T.BoxGeometry(13.2,.16,3.4),rm,0,3.58,s*1.49).rotation.x=s*.5});
B(13.2,.14,.3,0x7d3820,0,4.42,0);
const sh=new T.Shape;sh.moveTo(-3,-.5);sh.lineTo(3,-.5);sh.lineTo(0,1.1);
[-6.5,6.5].forEach(x=>add(new T.ShapeGeometry(sh),mat(Y),x,3.3,0).rotation.y=Math.PI/2);
add(new T.PlaneGeometry(2.4,.9),new T.MeshLambertMaterial({map:cv(256,96,(x,w,h)=>{x.fillStyle="#f4efe0";x.fillRect(0,0,w,h);x.fillStyle="#222";x.textAlign="center";x.font="bold 20px serif";x.fillText("COLLEGE OF APPLIED SCIENCE",128,40);x.font="bold 17px serif";x.fillText("NADAPURAM",128,68)})}),-1.6,2.5,2.3);
B(.06,.5,.06,0x5a3a22,-2.5,2.9,2.3);B(.06,.5,.06,0x5a3a22,-.7,2.9,2.3);
for(let i=0;i<9;i++)add(new T.SphereGeometry(.55,10,8),mat(i%2?0x7a9a2f:0x628a2a),-5.5+i*1.3,.8,3.6).scale.y=1.1;
B(1.8,.2,.7,0xb88a5a,5.2,.1,2.9);B(1.8,.2,.7,0xa87a4a,5.2,.3,2.4);
P=G;const b2=BG.clone();b2.position.set(15,0,-3);b2.rotation.y=-Math.PI/2;G.add(b2);
const palm=(x,z,h)=>{add(new T.CylinderGeometry(.12,.2,h,6),mat(0x6b4a2a),x,h/2,z).rotation.z=.12;const g=new T.Group;g.position.set(x-h*.06,h,z);G.add(g);
 for(let k=0;k<7;k++){const a=new T.Group;a.rotation.y=k*.9;g.add(a);const l=add(new T.BoxGeometry(2.2,.05,.3),mat(0x2f7a3a),1.1,0,0,a);l.rotation.z=-.4}};
palm(9,-5,8);palm(-9,-6,7);palm(9,5,6);palm(-12,-11,9);palm(4,-13,10);palm(14,-12,9);
const tg=new T.IcosahedronGeometry(1,1),tk=new T.CylinderGeometry(.2,.3,3,6),tm=[0x1f5a34,0x2a6e3a,0x2f7a3a,0x1a4a2c].map(c=>mat(c)),bm=mat(0x4a3220);
const tree=(x,z)=>{const q=2+Math.random()*1.6;add(tk,bm,x,1.5,z);add(tg,tm[Math.floor(Math.random()*4)],x,3+q*.5,z).scale.set(q,q*1.2,q)};
for(let r=0;r<4;r++)for(let x=-38;x<=38;x+=3)tree(x+Math.random()*2,-9-r*4+Math.random()*2);
[-1,1].forEach(g=>{for(let z=7;z>-9;z-=3)for(let k=0;k<2;k++)tree(g*(20+k*5+Math.random()*3),z+Math.random()*2)});
add(new T.CylinderGeometry(.06,.06,8,6),mat(0xcccccc),-8,4,2);
const flag=new T.Group;flag.position.set(-8,7.4,2);G.add(flag);
[[0xff9933,.5],[0xffffff,.25],[0x138808,0]].forEach((c,i)=>add(new T.PlaneGeometry(1.2,.3),mat(c[0]),.6,.3-i*.3,0,flag));
/* fireflies + rain */
const fp=new Float32Array(180);for(let i=0;i<180;i+=3){fp[i]=Math.random()*20-10;fp[i+1]=.5+Math.random()*3;fp[i+2]=Math.random()*10-2}
const fg=new T.BufferGeometry;fg.setAttribute("position",new T.BufferAttribute(fp,3));
const fm=new T.PointsMaterial({color:0xffe08a,size:.16,transparent:true,blending:2,depthWrite:false}),ff=new T.Points(fg,fm);G.add(ff);
const rpA=new Float32Array(2400);for(let i=0;i<2400;i+=6){const x=Math.random()*30-15,y=Math.random()*14,z=Math.random()*24-8;rpA.set([x,y,z,x,y+.6,z],i)}
const rg=new T.BufferGeometry,rp=new T.BufferAttribute(rpA,3);rg.setAttribute("position",rp);
const rain=new T.LineSegments(rg,new T.LineBasicMaterial({color:0xcfe0ff,transparent:true,opacity:.35}));S.add(rain);
/* light + moods */
const hemi=new T.HemisphereLight,sun=new T.DirectionalLight;sun.position.set(-6,10,8);S.add(hemi,sun);
const M=[{n:"Dusk",s:["#2b1b52","#ff9a5c"],f:0x7a476e,h:[0xb9a8ff,0x3a1f2a,.85],d:[0xffa860,.9],w:.9,r:1},
{n:"Night",s:["#080a1f","#2a2f66"],f:0x14183a,h:[0x6677cc,0x120d1a,.5],d:[0x7f9bff,.35],w:1.4,r:1},
{n:"Morning",s:["#7fc4ff","#fff0c9"],f:0xe9efe0,h:[0xffffff,0x6b8a52,1],d:[0xfff1c0,1.3],w:0,r:0}];
let mi=0,run=0,yaw=0,t=0,fl=0,el,off=0,ro;
const apply=()=>{const m=M[mi];S.background=cv(2,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,m.s[0]);g.addColorStop(.75,m.s[1]);x.fillStyle=g;x.fillRect(0,0,w,h)});
 S.fog=new T.FogExp2(m.f,.02);hemi.color.set(m.h[0]);hemi.groundColor.set(m.h[1]);sun.color.set(m.d[0]);sun.intensity=m.d[1];WM.forEach(x=>x.emissiveIntensity=m.w);rain.visible=!!m.r};
const fit=()=>{if(!el)return;const w=el.clientWidth||300,h=el.clientHeight||300,a=w/h;R.setSize(w,h,false);C.aspect=a;C.position.set(4,4.4,16+10*Math.max(0,1-a));C.lookAt(4,1.8,0);off?C.setViewOffset(w,h,0,h*off,w,h):C.clearViewOffset();C.updateProjectionMatrix()};
const loop=()=>{if(!run)return;requestAnimationFrame(loop);t+=.016;
 G.rotation.y+=((yaw+Math.sin(t*.25)*.35)-G.rotation.y)*.05;ff.position.y=Math.sin(t)*.3;fm.opacity=.6+Math.sin(t*3)*.4;flag.rotation.y=Math.sin(t*3)*.25;
 if(rain.visible){const p=rpA;for(let i=1;i<2400;i+=6){p[i]-=.45;p[i+3]-=.45;if(p[i]<0){p[i]+=14;p[i+3]+=14}}rp.needsUpdate=true;if(Math.random()<.004)fl=1}
 fl*=.9;hemi.intensity=M[mi].h[2]+fl*1.6;R.render(S,C)};
let dx=null;R.domElement.addEventListener("pointerdown",e=>dx=e.clientX);
addEventListener("pointermove",e=>{if(dx!=null){yaw=Math.max(-1.1,Math.min(1.1,yaw+(e.clientX-dx)*.008));dx=e.clientX}});addEventListener("pointerup",()=>dx=null);
W.mount=(host,o)=>{off=o||0;if(el!==host||!host.contains(R.domElement)){el=host;host.prepend(R.domElement);ro&&ro.disconnect();ro=new ResizeObserver(fit);ro.observe(host)}fit();if(!run){run=1;loop()}};
R.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();run=0});R.domElement.addEventListener("webglcontextrestored",()=>{if(el&&!run){run=1;loop()}});
W.pause=()=>{run=0};
W.next=()=>{mi=(mi+1)%3;apply();return M[mi].n};
apply();W.ok=true;if(W.pend)W.mount(W.pend[0],W.pend[1])};
const safe=()=>{try{boot()}catch(e){console.error("3D scene failed",e);fail()}};if(window.THREE)safe();else{const t=document.createElement("script");t.src="three.min.js";t.onload=safe;t.onerror=()=>{const u=document.createElement("script");u.src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";u.onload=safe;u.onerror=fail;document.head.appendChild(u)};document.head.appendChild(t)}
})();
