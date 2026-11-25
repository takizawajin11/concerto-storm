/* =====================================================================
   最初の10分：はじめての人を迷わせない
   ・はじめての人のタイトル画面は「▶ はじめての方はここから」を一番上に。ほかの遊びは折りたたむ
   ・押すと 1781年・モーツァルト・入門 で始まり、案内のあとすぐ最初の演奏会（生演奏）へ
   ・序盤は地図をすっきり：街角・宮廷/民衆は2か月目から、お題・遊びの棚は3か月目から開く（UNL に追加）
   ・最初の3か月は、おまけの出来事の窓を出さない
   ===================================================================== */
UNL.unshift(
 {id:'street',c:()=>G.month>=1,t:'街角へ出る',d:'街の画面に<b>街角へ出る</b>が加わった。路上で弾いて民衆の心をつかむと、その街の演奏会に客が押し寄せる。地図の上の<b>宮廷／民衆</b>の帯は、あなたがどちらに支持されているかを示している。'},
 {id:'odai',c:()=>G.month>=2,t:'今月のお題と遊びの棚',d:'地図に<b>今月のお題</b>と<b>遊びの棚</b>が加わった。お題は毎月3つ。達成するとごほうびが出る。遊びの棚には、人間関係図・作曲・クイズといった寄り道が入っている。気が向いたときに開けばよい。'});
const _startFS=start;
start=function(){try{if(G&&G.flags&&G.flags.gate&&G.month>=3){G.unl=G.unl||{};G.unl.street=1;G.unl.odai=1;}}catch(e){}return _startFS();};
const _renderFS=render;
render=function(){_renderFS();try{const b=document.body.classList,on=!!(G&&G.flags);b.toggle('lk-street',on&&!unl('street'));b.toggle('lk-odai',on&&!unl('odai'));}catch(e){}};
const _odaiHitFS=odaiHit;
odaiHit=function(k){if(!unl('odai'))return;return _odaiHitFS(k);};
const _evBudgetFS=evBudget;
evBudget=function(){if(G&&G.flags&&G.flags.gate&&G.month<3)return false;return _evBudgetFS();};
/* ---------- タイトル画面 ---------- */
function firstTimer(){try{if(load())return false;if(hallLoad().length)return false;for(const k of ['concertoStormSaga','concertoStormDaily','concertoStormFirst'])if(localStorage.getItem(k))return false;
  for(let i=0;i<localStorage.length;i++)if(/^concertoStormChx_/.test(localStorage.key(i)))return false;return true;}catch(e){return false;}}
const _titleFS=title;
title=function(){_titleFS();try{if(!firstTimer()||!SCEN.s1781)return;const box=document.querySelector('#main .title');if(!box)return;
  const kids=[...box.children],staff=kids.find(e=>e.classList.contains('staff')),scT=kids.find(e=>e.classList.contains('sec-t')&&/シナリオを選ぶ/.test(e.textContent));if(!staff||!scT)return;
  const mv=kids.slice(kids.indexOf(staff)+1,kids.indexOf(scT));
  const det=document.createElement('details');det.className='card moreplay';det.innerHTML='<summary>ほかの遊び<small>今日の演奏会・挑戦シナリオ・あなたの音楽史・殿堂</small></summary>';mv.forEach(e=>det.appendChild(e));
  const hero=document.createElement('button');hero.className='btn firstbtn';hero.id='firstBtn';
  hero.innerHTML=`<span class="fb1">▶ はじめての方はここから</span><span class="fb2">1781年のウィーン。モーツァルトになって、最初の演奏会を開く</span><span class="fb3">約3分・音が出ます</span>`;
  staff.insertAdjacentElement('afterend',hero);scT.textContent='— 自分で時代を選ぶ —';
  const how=kids.find(e=>e.classList.contains('howto'));(how||box.lastElementChild).insertAdjacentElement('beforebegin',det);
  hero.onclick=firstStart;}catch(e){}};
function firstStart(){
  try{localStorage.setItem('concertoStormFirst','1');}catch(e){}
  try{ac();}catch(e){}
  newGame('s1781','mozart','easy');G.flags.quick=1;start();
  let n=0;const iv=setInterval(()=>{n++;if(n>200||!G||!G.flags.quick){clearInterval(iv);return;}
    const busy=!$('#modal').classList.contains('hidden')||!$('#scene').classList.contains('hidden')||document.querySelector('.cardov');
    if(busy||(typeof MQ!=='undefined'&&MQ.length))return;clearInterval(iv);firstConcert();},300);
}
function firstConcert(){try{
  if(!G||!G.flags.quick||G.flags.quickDone)return;G.flags.quickDone=1;
  const p=SC.rep.find(r=>r.id==='k331')||recitalPiece();
  PR={p,L:[],hall:hallsFor(P().city)[0],mode:'concert'};autoFill();
  if(!PR.L.some(Boolean)){PR.p=recitalPiece();autoFill();}
  lineup();$('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  const sc=document.querySelector('#scene .sc'),mid=TUT_MENTOR[G.sc]||'haydn',mc=charById(mid);
  if(sc)sc.insertAdjacentHTML('afterbegin',`<div class="firstguide">${portrait(mid,52,'#c9a24a')}<div><b>${mc?mc.name:'師匠'}</b><br>ウィーンへようこそ。まずは一曲、弾いてみなさい。席にはもう君が座っている。下の<b>開演</b>を押すだけだ。<br>演奏が始まったら、<b>テンポ</b>と<b>終わり方</b>を君が決める。</div></div>`);
  const go=$('#go');if(go){go.classList.add('tut-hl');setTimeout(()=>{try{go.scrollIntoView({block:'center',behavior:'smooth'});}catch(e){}},400);}
  save();}catch(e){console.warn(e);}}
