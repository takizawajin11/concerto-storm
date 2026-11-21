/* =====================================================================
   ライバルの見せ場：楽長たちの登場台詞・必殺の見せ場・負け台詞・勝ち台詞
   巡演の大御所の舞台と一騎打ちで、ライバルも見せ場を仕掛けてくる。
   ===================================================================== */
/* [登場, 見せ場の名, 見せ場の台詞, 演出, 負けたとき, 勝ったとき] */
const RSIG={
 salieri:['ウィーンの宮廷楽長は、このわたしだ。','宮廷楽長の威光','皇帝陛下のお気に入りは、どちらかな？','gold','……見事だ。弟子にしたいほどだよ。','宮廷の作法を、もう少し学んでから来たまえ。'],
 clementi:['鍵盤の上なら、誰にも負けん。','パルナッソス山への階梯','この練習曲を、弾き切れるかね？','sparkle','負けたついでだ、うちの工房のピアノを一台どうだね。','指の訓練が足りん。百回さらいなさい。'],
 mendelssohn:['ライプツィヒの音楽を、お聴かせしましょう。','真夏の夜の夢','妖精たちよ、舞いなさい。','sparkle','素晴らしい。ゲヴァントハウスに招かせてください。','バッハを、もう一度よく聴いてごらんなさい。'],
 thalberg:['三本の手の秘密、見破れますか。','三本の手','手が三本あるように、聴こえるでしょう。','sparkle','リスト君にも、同じように負けましたよ。','紳士は、鍵盤を叩いたりしないものです。'],
 paganini:['悪魔に魂を売った男と、弾き比べるかね。','悪魔の24の難題','弦は一本あれば、十分だ。','strings','……ふむ。悪魔も、たまには負ける。','今夜の入場料は、倍にさせてもらうよ。'],
 wagner:['未来の音楽を、聴かせてやろう。','無限旋律','この音楽に、終わりはない！','storm','バイロイトで、もう一度勝負だ。','過去の音楽に、用はない。'],
 brahms:['……わたしは、話すより書くほうが得意でね。','ゆるぎない和声','巨人の足音が聞こえる。それでも書く。','bells','いい音楽だった。ビールでもどうだ。','ここにまだ怒らせていない人がいたら、失礼。'],
 verdi:['イタリアの心を、歌で示そう。','行け、わが想いよ','黄金の翼に乗って、想いよ飛べ！','gold','わたしは農夫だ。畑から出直そう。','ブラーヴォは、イタリアの言葉だよ。'],
 vivaldi:['赤毛の司祭のヴァイオリン、とくとお聴きあれ。','四季の嵐','夏の嵐が、来るぞ！','storm','ミサを抜け出してきた甲斐が……なかった。','ピエタの娘たちのほうが、まだ上手ですな。'],
 handel:['ロンドンの劇場は、わたしの庭だ。','ハレルヤの総立ち','国王陛下も、思わずご起立なさいますぞ。','gold','ライプツィヒのカントルに、一度会ってみたいものだ。','オペラの客は、正直なのだよ。'],
 bononcini:['ロンドンは、わたしの旋律を待っている。','甘美なアリア','この旋律に、ロンドン中が酔いしれる。','hearts','ヘンデルと比べられるのには、もう慣れっこだ。','流行は、わたしの味方だよ。'],
 mahler:['交響曲とは、世界をまるごと作ることだ。','世界を抱く交響曲','鳴れ、全宇宙よ！','storm','わたしの時代は、まだ来ていないだけだ。','もう一度、最初の小節から。'],
 rstrauss:['英雄の生涯を、お見せしよう。','英雄の生涯','この英雄は、わたしのことです。','gold','次の作品で、取り返すとしよう。','さて、印税の計算をしてこよう。'],
 debussy:['規則？ それは、わたしの楽しみのためにある。','牧神の午後','光と影が、溶けてゆく……。','waves','……まあ、印象は悪くなかった。','ワーグナーの真似は、おやめなさい。'],
 devil:['夢の中へ、ようこそ。','悪魔のトリル','このトリル、弾けるものなら弾いてみよ。','fire','ちっ……夢から覚めたか。','魂の代金は、またいただきに来る。']
};
function rsigOf(id){const r=RSIG[id];if(r)return{e:r[0],n:r[1],l:r[2],fx:r[3],lose:r[4],win:r[5]};
  const s=SIG[id];if(s)return{e:s[1],n:s[0],l:s[1],fx:s[2],lose:'……見事だ。今日は、あなたの夜だ。',win:'まだまだ、修業が足りないね。'};return null;}
function cutinR(id,text,sub,era){
  const o=typeof RSC!=='undefined'?RSC:null;if(era)RSC=era;let pt='';try{pt=portrait(id,96,'#d8d0ff');}finally{if(era)RSC=o;}
  const d=document.createElement('div');d.className='cutin rival';
  d.innerHTML=`<div class="band"><div class="cp">${pt}</div><div class="ct"><b>${text}</b><span>${sub||''}</span></div></div>`;
  document.body.appendChild(d);setTimeout(()=>d.remove(),1900);
}

/* ---- 巡演：大御所（ライバルの楽長）の見せ場 ---- */
const _uSimR=uSim;
uSim=function(B,encore){
  const ret=_uSimR(B,encore);
  try{if(!encore&&(!B.practice||B.challenge)&&!B.rsigDone){
    const bi=B.en.findIndex(e=>e.boss&&e.pt&&rsigOf(e.pt));
    if(bi>=0){const e=B.en[bi],s=rsigOf(e.pt);
      for(let j=0;j<(B.sets&&B.sets.length?4:2);j++)B.ev.unshift({k:'phase',txt:'開演'});
      const pos=B.ev.findIndex(v=>v.k==='phase'&&v.txt==='第1楽章');
      const deadBefore=pos<0||B.ev.slice(0,pos).some(v=>v.k==='hit'&&v.e===bi&&v.kill);
      if(!deadBefore&&Math.random()<.75){B.rsigDone=1;
        const ins=[{k:'phase',txt:`${e.n}の見せ場《${s.n}》`,rsig:bi},{k:'skip',txt:`<b>${e.n}</b>「${s.l}」`}];
        for(const u of B.us){if(u.hp<=0)continue;const d=Math.max(1,Math.round(e.atk*.55+rnd(0,4)-udef(u.id)*.5));u.hp=Math.max(1,u.hp-d);ins.push({k:'hurt',e:bi,u:u.i,d,txt:`見せ場《${s.n}》`});}
        ins.push({k:'phase',txt:'第1楽章'});
        B.ev.splice(pos+1,0,...ins);}}}}catch(err){}
  return ret;
};
const _uRenderBR=uRenderB;
uRenderB=function(B,cont){
  _uRenderBR(B,cont);
  const ph=$('#bph'),box=document.querySelector('#scene .battle');if(!ph||!box)return;
  const bi=B.en.findIndex(e=>e.boss&&e.pt&&rsigOf(e.pt));if(bi<0)return;const e=B.en[bi],s=rsigOf(e.pt);
  const bel=$('#be'+bi);if(bel)bel.classList.add('rboss');
  /* 登場 */
  if(!cont){setTimeout(()=>{if(!$('#bph'))return;cutinR(e.pt,`「${s.e}」`,`${e.n}、登場`,e.era);if(bel){const t=document.createElement('div');t.className='rquote';t.textContent=`「${s.e}」`;bel.appendChild(t);setTimeout(()=>t.remove(),3200);}},B.sets&&B.sets.length?1900:120);}
  /* 見せ場 */
  let fired=false;
  const mo=new MutationObserver(()=>{if(fired||ph.textContent.indexOf(`の見せ場《${s.n}》`)<0)return;fired=true;
    cutinR(e.pt,`「${s.l}」`,`${e.n}の見せ場《${s.n}》`,e.era);if(typeof sfx==='function')sfx('gong');fxPlay(box,s.fx);
    if(bel){bel.classList.add('sigglow','rsig');setTimeout(()=>bel.classList.remove('sigglow','rsig'),2400);}
    box.classList.add('fxdark');setTimeout(()=>box.classList.remove('fxdark'),1600);});
  mo.observe(ph,{childList:true,characterData:true,subtree:true});
  /* 倒れたら負け台詞 */
  let lost=false;
  const mo2=bel&&new MutationObserver(()=>{if(lost||!bel.classList.contains('down'))return;lost=true;
    setTimeout(()=>{cutinR(e.pt,`「${s.lose}」`,`${e.n}、陥落`,e.era);},250);});
  if(mo2)mo2.observe(bel,{attributes:true,attributeFilter:['class']});
  setTimeout(()=>{mo.disconnect();if(mo2)mo2.disconnect();},90000);
};
/* 楽長が倒れずに残ったら勝ち台詞 */
const _uResultR=uResult;
uResult=function(B){
  try{const bi=B.en.findIndex(e=>e.boss&&e.pt&&rsigOf(e.pt));if(bi>=0&&B.en[bi].hp>0&&(!B.practice||B.challenge)){const e=B.en[bi],s=rsigOf(e.pt);cutinR(e.pt,`「${s.win}」`,`${e.n}は余裕の表情だ`,e.era);addLog(`${e.n}「${s.win}」`);}}catch(err){}
  return _uResultR(B);
};

/* ---- 対決の入口：相手のひとこと ---- */
const _openDuelR=openDuel;
openDuel=function(t,opts){
  _openDuelR(t,opts);
  const s=rsigOf(t.id);if(!s)return;
  const vs=$('#scene .vs');if(vs)vs.insertAdjacentHTML('afterend',`<div class="rbubble">${portrait(t.id,30,FCSS[t.faction])}<span><b>${t.name}</b>「${s.e}」</span></div>`);
  if(D)D.rs=s;
};
/* ---- 一騎打ち：本気になると見せ場を仕掛けてくる。切り返せば大逆転 ---- */
const _rtStartR=rtStart;
rtStart=function(){
  _rtStartR();
  const R=RTS;if(!R)return;const s=rsigOf(R.t.id);if(!s)return;R.rs=s;
  setTimeout(()=>{if(RTS===R&&!R.over)rtSay(`${R.t.name}「${s.e}」`,'tell');},400);
  const iv=setInterval(()=>{if(RTS!==R||R.over){clearInterval(iv);return;}
    const m=Math.min(R.hp/R.hpMax,R.mp/R.mpMax);
    if(!R.sigDone&&(m<.55||R.time<22)&&!R.tell){R.sigDone=1;clearInterval(iv);
      cutinR(R.t.id,`「${s.l}」`,`${R.t.name}の見せ場《${s.n}》`);if(typeof sfx==='function')sfx('gong');
      const w=$('#rtWrap');if(w){fxPlay(w,s.fx);w.classList.add('fxdark');setTimeout(()=>w.classList.remove('fxdark'),1600);}
      R.tell={k:'sig',tell:`見せ場《${s.n}》を仕掛けてきた！`,run(R){const d=Math.round(R.focMax*.3);R.foc-=d;rtPop('you',`-${d}`,'bad');return`見せ場《${s.n}》が直撃！ 集中 -${d}`;}};
      R.tellT=2.6;R.cT=Math.max(R.cT,2);rtSay(`⚠ 見せ場《${s.n}》が来る！ 今こそ「即興で切り返す」！`,'tell');}},150);
};
const _rtTapR=rtTap;
rtTap=function(k){
  const R=RTS;
  if(R&&!R.over&&k==='impro'&&R.tell&&R.tell.k==='sig'){R.tell=null;R.parry++;R.combo+=5;R.chaos=Math.min(100,R.chaos+45);
    const mv=RT_MOVES.find(m=>m.k==='impro');cutin(G.pid,'見せ場返し！',`${R.t.name}の《${R.rs.n}》を逆手にとった`);
    rtSay(`見せ場を切り返した！ ${R.t.name}が動揺している`,'good');rtHit(mv,6,['見せ場返し']);rtShake(true);return;}
  return _rtTapR(k);
};
const _rtEndR=rtEnd;
rtEnd=function(win,how,op,yp){
  _rtEndR(win,how,op,yp);
  const R=RTS;const s=R&&(R.rs||rsigOf(R.t.id));if(!s)return;
  setTimeout(()=>rtSay(`${R.t.name}「${win?s.lose:s.win}」`,win?'good':'bad'),650);
};
/* ---- 三楽章の勝負：決着のひとこと ---- */
const _duelEndR=duelEnd;
duelEnd=function(){
  const s=D&&(D.rs||rsigOf(D.t.id));
  const r=_duelEndR.apply(this,arguments);
  try{if(s&&!D.rt){const won=D.you>D.them;cutinR(D.t.id,`「${won?s.lose:s.win}」`,D.t.name);}}catch(e){}
  return r;
};
