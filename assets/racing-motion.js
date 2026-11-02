const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const controls=new Set();
const waypoints=[[-4,-1.2],[-3.5,-2.3],[-1.8,-2.5],[-.7,-1.5],[.5,-1.4],[1.2,-2.2],[3.4,-2.1],[4,-.6],[3.1,.6],[1.8,.6],[1,1.6],[-.2,2.3],[-2.4,2.1],[-3.8,.8]];
function point(t){t=((t%1)+1)%1;const n=waypoints.length,u=t*n,i=Math.floor(u),f=u-i;const a=waypoints[(i+n-1)%n],b=waypoints[i%n],c=waypoints[(i+1)%n],d=waypoints[(i+2)%n];return [0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*f+(2*a[k]-5*b[k]+4*c[k]-d[k])*f*f+(-a[k]+3*b[k]-3*c[k]+d[k])*f*f*f));}
for(const canvas of document.querySelectorAll('[data-racing-canvas]')){
 const ctx=canvas.getContext('2d');if(!ctx)continue;
 const stage=canvas.dataset.racingCanvas==='stage';const dark=stage||document.body.classList.contains('publications-page');let width=0,height=0,visible=true,paused=false,frame=0,elapsed=0,last=0;
 function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
 function draw(){
  if(!width||!height)return;ctx.clearRect(0,0,width,height);const angle=-.32+(stage?Math.sin(elapsed*.055)*.15:0),scale=Math.min(width/10.8,height/6.8),cx=width*.52,cy=height*.52;
  const project=(x,z,y=0)=>{const xx=x*Math.cos(angle)-z*Math.sin(angle),zz=x*Math.sin(angle)+z*Math.cos(angle);return [cx+xx*scale,cy+zz*scale*.64-y*scale];};
  const line=(points,color,lineWidth=1)=>{ctx.beginPath();points.forEach((p,i)=>{const xy=project(...p);i?ctx.lineTo(...xy):ctx.moveTo(...xy)});ctx.strokeStyle=color;ctx.lineWidth=lineWidth;ctx.stroke()};
  const gridColor=dark?'rgba(179,193,188,.13)':'rgba(40,51,43,.25)';for(let x=-5;x<=5;x+=.5)line([[x,-3.3],[x,3.3]],gridColor,.65);for(let z=-3;z<=3;z+=.5)line([[-5.2,z],[5.2,z]],gridColor,.65);
  const path=Array.from({length:361},(_,i)=>point(i/360));line(path,dark?'rgba(211,217,202,.09)':'rgba(57,69,59,.17)',stage?scale*.64:scale*.60);
  for(const side of [-1,1]){const edge=path.map((p,i)=>{const q=path[(i+1)%path.length],dx=q[0]-p[0],dz=q[1]-p[1],l=Math.hypot(dx,dz)||1;return [p[0]-dz/l*.25*side,p[1]+dx/l*.25*side]});line(edge,dark?'rgba(219,226,208,.48)':'rgba(43,57,47,.72)',1);}
  ctx.setLineDash([4,9]);line(path,dark?'rgba(211,218,205,.22)':'rgba(59,73,62,.45)',.8);ctx.setLineDash([]);
  for(let i=0;i<100;i++){const t=i/100,p=point(t),q=point(t+.001),dx=q[0]-p[0],dz=q[1]-p[1],l=Math.hypot(dx,dz)||1;for(const side of [-1,1]){const [x,y]=project(p[0]-dz/l*.34*side,p[1]+dx/l*.34*side);ctx.fillStyle=dark?'rgba(197,210,185,.55)':'rgba(101,113,91,.25)';ctx.fillRect(x,y,1.4,1.4)}}
  const cars=stage?3:1;
  for(let car=0;car<cars;car++){
   const t=elapsed*.025+car*.28;
   for(let j=45;j>0;j--){const a=point(t-j*.0015),b=point(t-(j-1)*.0015);line([a,b],car===0?`rgba(239,73,57,${(1-j/46)*.7})`:`rgba(206,220,197,${(1-j/46)*.35})`,car===0?2:1.4);}
   const c=point(t),next=point(t+.002),rot=Math.atan2(next[1]-c[1],next[0]-c[0]);
   // Open-chassis RoboRacer proportions, based on the team car and Arena figures.
   const world=(x,z,y=0)=>project(c[0]+x*Math.cos(rot)-z*Math.sin(rot),c[1]+x*Math.sin(rot)+z*Math.cos(rot),y);
   const face=(vertices,fill,stroke='#141a18')=>{ctx.beginPath();vertices.forEach((v,i)=>{const q=world(...v);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke();};
   const box=(x,z,y,l,w,h,top,side)=>{const x0=x-l/2,x1=x+l/2,z0=z-w/2,z1=z+w/2;face([[x0,z0,y],[x1,z0,y],[x1,z0,y+h],[x0,z0,y+h]],side);face([[x1,z0,y],[x1,z1,y],[x1,z1,y+h],[x1,z0,y+h]],side);face([[x0,z1,y],[x1,z1,y],[x1,z1,y+h],[x0,z1,y+h]],side);face([[x0,z0,y+h],[x1,z0,y+h],[x1,z1,y+h],[x0,z1,y+h]],top);};
   const wheel=(x,z)=>{box(x,z,.035,.19,.11,.17,'#242a28','#080d0b');const side=z<0?z-.058:z+.058;
    const circle=(r,color)=>{face(Array.from({length:18},(_,i)=>[x+Math.cos(i/18*Math.PI*2)*r,side,.12+Math.sin(i/18*Math.PI*2)*r]),color,'#151b18')};circle(.087,'#0d120f');circle(.043,'#c9d0c9');circle(.017,'#414d43');};
   wheel(-.23,-.235);wheel(.23,-.235);wheel(-.23,.235);wheel(.23,.235);
   box(0,0,.10,.68,.33,.055,'#323d36','#111813');
   box(-.13,0,.16,.25,.25,.09,'#171f1b','#080e0b');
   box(.09,0,.16,.19,.25,.055,'#4d5e50','#223328');
   // Front lidar, electronics and a green status light.
   box(.24,0,.16,.12,.14,.09,'#14252b','#071215');
   box(.24,0,.25,.10,.12,.035,'#58727a','#132c32');
   box(.03,0,.215,.10,.17,.025,'#c2cac1','#869180');
   const led=world(-.02,-.05,.25);ctx.fillStyle='#7cf38a';ctx.beginPath();ctx.arc(...led,1.7,0,Math.PI*2);ctx.fill();
   // The tall white Scuderia fin is a distinctive part of the physical team car.
   box(-.18,0,.24,.035,.23,.34,'#f0f2e9','#d4dbd1');
   box(-.18,0,.37,.042,.235,.035,car===0?'#e83e2f':'#6f8270',car===0?'#bb3026':'#566b58');
   box(-.18,0,.50,.042,.235,.028,'#e83e2f','#b82f27');
   const label=world(-.20,0,.47);ctx.save();ctx.translate(...label);ctx.fillStyle='#252d28';ctx.font=`700 ${Math.max(5,scale*.065)}px Arial`;ctx.textAlign='center';ctx.fillText('SS',0,0);ctx.restore();

  }
 }
 function tick(now){frame=0;if(!visible||paused||document.hidden||reduced.matches)return;if(last)elapsed+=Math.min((now-last)/1000,.05);last=now;draw();frame=requestAnimationFrame(tick)}
 function start(){last=0;if(!frame&&visible&&!paused&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(tick);else draw()}
 new ResizeObserver(resize).observe(canvas);new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;last=0}else start()}).observe(canvas);
 const control=canvas.parentElement.querySelector('.motion-toggle');
 const sync=()=>{if(control){control.disabled=reduced.matches;control.textContent=reduced.matches?'Reduced motion enabled':paused?'Play motion':'Pause motion';control.setAttribute('aria-pressed',String(paused||reduced.matches))}};
 control?.addEventListener('click',()=>{paused=!paused;if(paused){cancelAnimationFrame(frame);frame=0}else start();sync()});
 reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;sync();start()});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);frame=0;start()});sync();resize();start();
}
