/* =====================================================================
   磨き：案内の折りたたみ、巡演の舞台と客席、勝敗の効果音、牙城の一覧
   ===================================================================== */
/* ---- 効果音 ---- */
function sfx(kind){try{const c=ac();if(!c||!soundOn)return;let t=c.currentTime+.02;const seq={
  fanfare:[[67,.12],[72,.12],[76,.12],[79,.38],[[72,76,79],.6]],win:[[72,.1],[76,.1],[79,.3]],lose:[[64,.25],[63,.25],[62,.25],[61,.6]],
  coin:[[84,.06],[88,.12]],fake:[[60,.18],[54,.4]],gong:[[[48,55,60],.8]]}[kind]||[];
  for(const [n,d] of seq){(Array.isArray(n)?n:[n]).forEach(m=>tone(t,m,d*1.1,'piano'));t+=d;}}catch(e){}}
/* ---- 案内：折りたためるように・開始時の長い説明は案内があるときは省く ---- */
const _tutBarP=tutBar;
tutBar=function(){
  _tutBarP();const bar=$('#tutbar');document.body.style.paddingBottom=bar?(G&&G.tut&&G.tut.min?'70px':'190px'):'';if(!bar||!G||!G.tut)return;
  if(G.tut.min){document.body.style.paddingBottom='70px';bar.classList.add('mini');bar.innerHTML=`<button id="tutOpen" title="案内を開く">${portrait(TUT_MENTOR[G.sc]||'critic',40,'#c9a24a')}<span>案内</span></button>`;$('#tutOpen').onclick=()=>{G.tut.min=0;tutBar();};return;}
  bar.classList.remove('mini');const n=bar.querySelector('.tbn');if(n&&!$('#tutMin')){const b=document.createElement('button');b.id='tutMin';b.textContent='たたむ';b.onclick=()=>{G.tut.min=1;tutBar();};n.insertBefore(b,n.firstChild);}
  if(G.tut.step===4&&G.fleet&&G.fleet[0]&&G.fleet[0].length<3){const tb=bar.querySelector('.tb');if(tb&&!tb.querySelector('.warn'))tb.insertAdjacentHTML('beforeend','<div class="warn" style="color:#a22;font-size:12px;margin-top:2px">※ 楽団が小さいうちは危ない。仲間を2人以上そろえてから旅立つのがよい。</div>');}
};
const _startP=start;
start=function(){
  const wasNew=G&&!G.flags.uIntro;if(wasNew)G.flags.uIntro=1;
  _startP();
  if(wasNew&&!(G.tut&&!G.tut.done)){G.flags.uIntro=0;}
};
/* ---- 巡演の舞台：ホールの背景と、反応する客席 ---- */
const _uRenderBP=uRenderB;
uRenderB=function(B,cont){
  _uRenderBP(B,cont);
  const box=document.querySelector('#scene .battle');if(!box)return;box.classList.add('bstage');
  const ph=$('#bph');if(ph)ph.insertAdjacentHTML('beforebegin',`<div class="bvenue">${B.title}</div>`);
  const aud=document.createElement('div');aud.className='baud';aud.innerHTML=Array.from({length:22},(_,i)=>`<i style="left:${2+i*4.5}%;animation-delay:${(Math.random()).toFixed(2)}s"></i>`).join('');
  const log=$('#blog');if(log)log.before(aud);
  const react=(good)=>{aud.classList.remove('clap','boo');void aud.offsetWidth;aud.classList.add(good?'clap':'boo');};
  const mo=new MutationObserver(ms=>{for(const m of ms){const el=m.target;if(!el.classList||!el.classList.contains('act'))continue;react(el.id&&el.id.startsWith('bu'));}});
  box.querySelectorAll('.bu').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));
  const pm=new MutationObserver(()=>{const t=ph&&ph.textContent;if(!t)return;ph.classList.remove('flash');void ph.offsetWidth;ph.classList.add('flash');if(t==='アンコール')sfx('gong');});
  if(ph)pm.observe(ph,{childList:true,characterData:true,subtree:true});
  setTimeout(()=>{mo.disconnect();pm.disconnect();},60000);
};
const _uResultP=uResult;
uResult=function(B){_uResultP(B);const r=uRank(B);setTimeout(()=>sfx(r==='S'?'fanfare':['A','B'].includes(r)?'win':'lose'),150);};
/* ---- 演奏会のあと ---- */
const _concertResultP=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultP(p,L,ev,fi);setTimeout(()=>sfx(ev.stars>=4?'fanfare':ev.stars>=3?'win':ev.stars<=1?'lose':'coin'),200);return r;};
/* ---- 偽物発覚と買い物の音 ---- */
const _storeP=storeScreen;storeScreen=function(){_storeP();document.querySelectorAll('[data-ap]').forEach(b=>{const f=b.onclick;b.onclick=()=>{f();setTimeout(()=>{const t=$('#mT');if(t&&/鑑定/.test(t.textContent))sfx($('#mB')&&/偽物/.test($('#mB').textContent)?'fake':'win');},50);};});};
/* ---- 牙城の一覧を、ひと目でわかる形に ---- */
const _sortieHTMLP=sortieHTML;
sortieHTML=function(){
  let h=_sortieHTMLP();if(UST!=='city')return h;
  const i=h.indexOf('<div class="sec-t">各都市の牙城</div>');if(i<0)return h;
  const chips=SC.cities.map(x=>{const o=G.owner[x];const here=x===P().city;if(o==='player')return`<div class="sgc mine ${here?'here':''}"><b>${ci(x).name}</b><span>支配下</span></div>`;
    const s=sgOf(x),rv=o?rivalById(o):null;return`<div class="sgc ${here?'here':''}" ${rv?`style="border-color:${RCOL_?RCOL_(o):'#a55'}"`:''}><b>${ci(x).name}</b><div class="gauge"><i style="width:${s.g/s.max*100}%"></i></div><span>${s.g}/${s.max}${rv?`・${rv.name.replace(/陣営$/,'')}`:''}</span></div>`;}).join('');
  return h.slice(0,i)+`<div class="sec-t">各都市の牙城</div><div class="sggrid">${chips}</div><div class="pmeta" style="margin-top:4px">巡演は今いる都市（枠が光っている都市）が対象。地図で都市を移ってから旅立つ。</div>`;
};
const RCOL_=o=>{try{return rivalById(o).color||'#a55';}catch(e){return'#a55';}};
