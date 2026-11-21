/* =====================================================================
   演出：幕が開く・ソリストにスポットライト・音符が飛ぶ・外れ奏者の珍事が舞台で起きる・カーテンコール
   ===================================================================== */
function animNote(host,x,y,opt){opt=opt||{};const s=document.createElement('span');s.className='fxnote'+(opt.bad?' bad':'')+(opt.big?' big':'');
  s.textContent=opt.t||pick(['♪','♫','♬','♩']);s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',((opt.dx!=null?opt.dx:(Math.random()*60-30)))+'px');s.style.setProperty('--dy',((opt.dy!=null?opt.dy:-(50+Math.random()*50)))+'px');
  host.appendChild(s);setTimeout(()=>s.remove(),1300);}
function animBurst(el,n,opt){const host=el.closest('.stage,.battle,.rt')||el.parentElement;if(!host)return;const hb=host.getBoundingClientRect(),r=el.getBoundingClientRect();
  const x=r.left-hb.left+r.width/2,y=r.top-hb.top+r.height*.35;for(let i=0;i<n;i++)setTimeout(()=>animNote(host,x,y,opt),i*70);}
function animSay(el,t,cls){const d=document.createElement('div');d.className='fxsay '+(cls||'');d.textContent=t;el.appendChild(d);setTimeout(()=>d.remove(),1800);}
function rain(host,chars,n,cls){for(let i=0;i<n;i++)setTimeout(()=>{const s=document.createElement('span');s.className='fxrain '+(cls||'');s.textContent=pick(chars);s.style.left=(4+Math.random()*92)+'%';s.style.animationDuration=(1.2+Math.random()*1.2)+'s';host.appendChild(s);setTimeout(()=>s.remove(),2600);},i*90);}

/* ---- 演奏会の舞台 ---- */
const _performA=perform;
perform=function(){
  _performA();
  const stage=document.querySelector('#scene .stage');if(!stage||!PR)return;
  const p=PR.p,L=PR.L;
  /* 幕が開く */
  stage.insertAdjacentHTML('beforeend','<div class="curtain l"></div><div class="curtain r"></div>');
  setTimeout(()=>stage.classList.add('open'),60);
  /* 協奏曲：ソリストを前へ、スポットライトを当てる */
  if(p.form==='協奏曲'&&p.slots[0]&&/独奏/.test(p.slots[0].l)&&L[0]){const el=stage.querySelector(`.perf[data-pid="${L[0]}"]`);
    if(el){el.style.left='34%';el.style.top='50%';el.classList.add('soloist');stage.insertAdjacentHTML('beforeend','<div class="solospot" style="left:34%"></div>');
      const rest=[...stage.querySelectorAll('.perf')].filter(x=>x!==el);const cd=rest.find(x=>{const i=L.indexOf(x.dataset.pid);return i>=0&&[].concat(p.slots[i].r).includes('cond');});
      if(cd){cd.style.left='66%';cd.style.top='50%';}
      rest.filter(x=>x!==cd).forEach((x,j,arr)=>{x.style.top='20%';x.style.left=(18+64*(arr.length===1?.5:j/(arr.length-1)))+'%';x.classList.add('back');});
      const tag=document.createElement('div');tag.className='solotag';tag.textContent='ソリスト';el.appendChild(tag);}}
  /* 指揮者は棒を振る */
  stage.querySelectorAll('.perf').forEach(el=>{const id=el.dataset.pid;const i=L.indexOf(id);if(i>=0&&p.slots[i]&&[].concat(p.slots[i].r).includes('cond')){el.classList.add('conductor');el.insertAdjacentHTML('beforeend','<i class="baton"></i>');}});
  /* 出番が来たら音符を飛ばし、外れ奏者はやらかす */
  const seen=new Set();
  const mo=new MutationObserver(ms=>{for(const m of ms){const el=m.target;if(!el.classList||!el.classList.contains('hl')||seen.has(el))continue;seen.add(el);
    const id=el.dataset.pid;const q=QUIRK[realId(id)]||[];
    if(q.includes('face')){el.classList.add('henkao');animSay(el,pick(['ぶはっ！','顔！','なんだその顔は']),'laugh');setTimeout(()=>el.classList.remove('henkao'),1400);if(typeof audBubble==='function')audBubble(pick(['ぶっ！','あはははは','ひーっ']),10+Math.random()*80,30+Math.random()*40,'good');}
    else if(q.includes('wrong')){el.classList.add('wrongnote');animBurst(el,4,{bad:true,t:pick(['♭?','♯!?','ブフォ','✕'])});setTimeout(()=>el.classList.remove('wrongnote'),900);}
    else if(q.includes('rhythm')){el.classList.add('offbeat');animBurst(el,3,{t:'♩?'});setTimeout(()=>el.classList.remove('offbeat'),1200);}
    else animBurst(el,el.classList.contains('soloist')?9:5,{big:el.classList.contains('soloist')});
    if(q.includes('roukai'))animSay(el,pick(['ワシの若いころは…','テンポが速い！','昔はなあ…']),'old');}});
  stage.querySelectorAll('.perf').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));
  setTimeout(()=>mo.disconnect(),20000);
};
/* ---- カーテンコール：花、トマト、総立ち ---- */
const _audienceReactA=audienceReact;
audienceReact=function(stars){
  _audienceReactA(stars);
  const stage=document.querySelector('#scene .stage');if(!stage)return;
  stage.querySelectorAll('.perf').forEach((el,i)=>setTimeout(()=>el.classList.add(stars>=3?'bow':'slump'),i*120));
  if(stars>=4){rain(stage,['🌹','💐','✿','❀'],stars===5?22:10,'petal');stage.classList.add('glow');}
  if(stars===5){rain(stage,['✦','✧','★'],14,'spark');}
  if(stars===1){rain(stage,['🍅','🥚'],8,'tomato');}
};

/* ---- 巡演の舞台：攻めると音符が飛ぶ ---- */
const _uRenderBA=uRenderB;
uRenderB=function(B,cont){
  _uRenderBA(B,cont);
  const box=document.querySelector('#scene .battle');if(!box)return;
  const mo=new MutationObserver(ms=>{for(const m of ms){const el=m.target;if(!el.classList||!el.classList.contains('act'))continue;
    const ally=el.id&&el.id.startsWith('bu');
    if(ally){const u=B.us[+el.id.slice(2)];const q=u?QUIRK[realId(u.id)]||[]:[];if(q.includes('face')&&Math.random()<.5){el.classList.add('henkao');setTimeout(()=>el.classList.remove('henkao'),900);}
      animBurst(el,3,{dy:-90});}
    else animBurst(el,2,{bad:true,t:pick(['♯','✕','!']),dy:70});}});
  box.querySelectorAll('.bu').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));
  setTimeout(()=>mo.disconnect(),60000);
};
