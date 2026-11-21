/* =====================================================================
   最初の10分：師匠の案内
   ===================================================================== */
const TUT_MENTOR={s1723:'telemann',s1781:'haydn',s1832:'czerny',s1876:'liszt76',s1905:'saintsaens'};
const TUT=[
 {tab:'map',sel:'#aConcert',t:p=>`よく来たな、${P().name}。まずはこの街で<b>演奏会</b>を開いてみなさい。演目を選び、誰をどの席に座らせるかで評判が決まる。<b>協奏曲ならソリスト選びが勝負</b>だ。`},
 {tab:'map',sel:'[data-p]',t:p=>`見事だった。次は<b>仲間集め</b>だ。この街にいる音楽家に「説得」で声をかけてみなさい。相手の好みに合う口説き方を探すのがこつだ。`},
 {tab:null,sel:'[data-t="fleet"]',t:p=>`楽団員が増えたら<b>稽古場</b>へ。巡演に連れていく顔ぶれを決め、<b>楽器と弓</b>を持たせられる。名器は楽器商で手に入るが……偽物には気をつけなさい。`},
 {tab:'fleet',sel:'[data-t="sortie"]',t:p=>`顔ぶれが決まったら<b>巡演</b>へ。会場を一夜ずつ回り、<b>大御所の舞台で喝采を得るたびに街の牙城が崩れる</b>。崩しきれば、その街はあなたのものだ。`},
 {tab:'sortie',sel:'#uGo',t:p=>`さあ、旅立ちなさい。毎晩、聴衆の顔ぶれを見て演奏スタイルを選ぶのだぞ。<b>限界の団員を無理に舞台に立たせると、楽団を去ってしまう</b>。`},
 {tab:null,sel:null,t:p=>`これで基本はおしまいだ。あとは自由にやりなさい。都市を手に入れ、席を埋め、伝説の大演奏会をめざすのだ。名声や体力の <b>ⓘ</b> を押せば説明が出る。……ああ、街で見かける<b>外れ奏者</b>には、くれぐれも気をつけるように。`,last:1}
];
function tutOn(){return G&&G.tut&&!G.tut.done;}
function tutAdv(from){if(!tutOn())return;if(G.tut.step===from){G.tut.step++;save();}}
function tutBar(){
  let bar=$('#tutbar');document.querySelectorAll('.tut-hl').forEach(e=>e.classList.remove('tut-hl'));
  const busy=!$('#scene').classList.contains('hidden')||!$('#modal').classList.contains('hidden');
  if(!tutOn()||busy){if(bar)bar.remove();return;}
  const st=TUT[G.tut.step];if(!st){G.tut.done=1;if(bar)bar.remove();return;}
  if(!bar){bar=document.createElement('div');bar.id='tutbar';document.body.appendChild(bar);}
  const mid=TUT_MENTOR[G.sc]||'critic';const mc=charById(mid);
  bar.innerHTML=`<div>${portrait(mid,46,'#c9a24a')}</div><div class="tb"><b>${mc?mc.name:'師匠'}</b>　<span style="font-size:11px;color:#8a6a3a">案内 ${G.tut.step+1}/${TUT.length}</span><br>${st.t()}
    <div class="tbn"><button id="tutX">案内を終える</button>${st.last?'<button class="go" id="tutOk">わかった</button>':st.tab&&TAB!==st.tab?`<button class="go" id="tutGo">そこへ行く</button>`:''}</div></div>`;
  $('#tutX').onclick=()=>{G.tut.done=1;save();tutBar();};
  const ok=$('#tutOk');if(ok)ok.onclick=()=>{G.tut.done=1;save();tutBar();};
  const go=$('#tutGo');if(go)go.onclick=()=>{TAB=st.tab;render();window.scrollTo(0,0);};
  if(st.sel&&(!st.tab||TAB===st.tab)){const el=document.querySelector(st.sel);if(el){el.classList.add('tut-hl');}}
}
const _renderT=render;
render=function(){_renderT();if(!G)return;
  if(tutOn()){const s=G.tut.step;if(s===2&&TAB==='fleet')tutAdv(2);if(s===3&&TAB==='sortie')tutAdv(3);}
  tutBar();};
const _startT=start;
start=function(){_startT();if(G&&G.month===0&&!G.flags.tutAsked){G.flags.tutAsked=1;G.tut={step:0};save();}setTimeout(tutBar,300);};
const _concertResultT=concertResult;concertResult=function(p,L,ev,fi){const r=_concertResultT(p,L,ev,fi);tutAdv(0);return r;};
const _openPersuadeT=openPersuade;openPersuade=function(t){tutAdv(1);return _openPersuadeT(t);};
const _sortieT=startSortie;startSortie=function(k){tutAdv(3);tutAdv(4);return _sortieT(k);};
const _nextModalT=nextModal;nextModal=function(){const r=_nextModalT.apply(this,arguments);setTimeout(()=>{if(G)tutBar();},50);return r;};
const _closeSceneT=closeScene;closeScene=function(){const r=_closeSceneT.apply(this,arguments);setTimeout(()=>{if(G)tutBar();},50);return r;};

/* 舞台や小窓が開いたら案内を隠す */
(function(){const ob=new MutationObserver(()=>{if(G)tutBar();});const sc=$('#scene'),md=$('#modal');if(sc)ob.observe(sc,{attributes:true,attributeFilter:['class']});if(md)ob.observe(md,{attributes:true,attributeFilter:['class']});})();
