/* =====================================================================
   遊びの流れ：新しい遊び方を少しずつ開く／目標を常に見せる／結末を豊かに
   ===================================================================== */
/* ---------- 少しずつ開く ---------- */
const UNL=[
 {id:'dealer',c:()=>G.month>=2,t:'楽器商',d:'稽古場に<b>楽器商</b>が来るようになった。名器や名弓を持たせると、団員の腕が一段上がる。ただし怪しげな商人の「ストラディヴァリ」には、くれぐれも気をつけなさい。'},
 {id:'exp',c:()=>(G.ust&&G.ust.sorties>=2)||G.month>=6,t:'派遣公演',d:'巡演に連れていかない団員を<b>派遣公演</b>に出せるようになった。月日が進むと稼いで帰ってくる。楽団の財布を支える大事な仕事だ。'},
 {id:'deshi',c:()=>G.month>=4&&G.members.length>=3,t:'弟子入り',d:'団員の詳しい画面から<b>弟子入り</b>をさせられるようになった。格上の団員に半年師事すると、免許皆伝で全能力が上がる。史実の師弟なら、もっと早く「次代の巨匠」になる。'},
 {id:'chal',c:()=>(G.ust&&G.ust.sorties>=4)||G.month>=10,t:'挑戦状',d:'巡演に<b>挑戦状</b>の欄が開いた。自分の楽団をリンクにして友だちに送れば、相手の楽団と腕比べができる。'}
];
function unl(id){if(!G||!G.flags||!G.flags.gate)return true;G.unl=G.unl||{};return !!G.unl[id];}
function unlCheck(){
  if(!G||!G.flags||!G.flags.gate)return;G.unl=G.unl||{};
  for(const u of UNL){if(G.unl[u.id]||!u.c())continue;G.unl[u.id]=1;const mid=TUT_MENTOR[G.sc]||'critic';const mc=charById(mid);
    modal(`新しい遊び方：${u.t}`,`<div style="display:flex;gap:10px;align-items:flex-start">${portrait(mid,56,'#c9a24a')}<div><b>${mc?mc.name:'師匠'}</b><br>${u.d}</div></div>`,null,'paper');save();break;}
}
const _newGameF=newGame;
newGame=function(sc,pid,diff){_newGameF(sc,pid,diff);G.flags.gate=1;G.unl={};};
const _memberMonthlyF=memberMonthly;
memberMonthly=function(){_memberMonthlyF();try{unlCheck();}catch(e){}};
const _uResultF=uResult;
uResult=function(B){const r=_uResultF(B);
  try{if(G.flags.gate&&!G.flags.sigInfo&&B.ev.some(v=>v.k==='phase'&&/見せ場《/.test(v.txt))){G.flags.sigInfo=1;const mid=TUT_MENTOR[G.sc]||'critic';
    modal('見せ場とは',`<div style="display:flex;gap:10px;align-items:flex-start">${portrait(mid,56,'#c9a24a')}<div>いまのが<b>見せ場</b>だ。名のある音楽家は、舞台で一度だけ決め台詞とともに大技を出すことがある。<br>ライバルの楽長も見せ場を仕掛けてくる。一騎打ちで相手の見せ場が来たら、すかさず<b>「即興で切り返す」</b>。うまく返せば大逆転だ。</div></div>`,null,'paper');}
    unlCheck();}catch(e){}
  return r;};
/* 閉じている機能は鍵つきで見せる */
const _sortieHTMLF=sortieHTML;
sortieHTML=function(){let h=_sortieHTMLF();
  if(!unl('exp'))h=h.replace(/<button data-ust="exp"[^>]*>派遣公演<\/button>/,'<button data-ust="exp" disabled title="巡演を2回すると開く">派遣公演🔒</button>');
  if(!unl('chal'))h=h.replace(/<button data-ust="chal"[^>]*>挑戦状<\/button>/,'<button data-ust="chal" disabled title="巡演を4回すると開く">挑戦状🔒</button>');
  return h;};
const _fleetHTMLF=fleetHTML;
fleetHTML=function(){let h=_fleetHTMLF();if(!unl('dealer'))h=h.replace(/<button class="btn gold" id="uDeal">[\s\S]*?<\/button>/,'<button class="btn" disabled>楽器商🔒<small>2か月目から訪ねてくる</small></button>');return h;};
/* 案内の最後のひとこと */
if(typeof TUT!=='undefined'&&TUT.length){TUT[TUT.length-1].t=p=>`これで基本はおしまいだ。<b>楽器商・派遣公演・弟子入り・挑戦状</b>は、楽団が育つにつれて少しずつ開いていく。そのたびに知らせよう。<br>ときおり<b>歴史の夜</b>の招待状も届く。史実の当事者を送れば、大成功まちがいなしだ。……ああ、街の<b>外れ奏者</b>には、くれぐれも気をつけるように。`;}

/* ---------- 目標を常に見せる ---------- */
const _mapHTMLF=mapHTML;
mapHTML=function(){
  let g='';try{if(!G.flags.endless){const df=DF(),c=myCities().length,s=seatsFilled(),left=Math.max(0,df.lim-G.month),ok=c>=df.wc&&s>=df.ws;
    g=`<div class="goalbar${ok?' ok':''}"><b>目標</b> 支配都市 <span class="${c>=df.wc?'done':''}">${c}/${df.wc}</span>・埋まった席 <span class="${s>=df.ws?'done':''}">${s}/${df.ws}</span>${ok?'　<b>達成！ 最終決戦へ</b>':`　→ 達成で最終決戦<span class="pmeta">（期限まで${Math.floor(left/12)}年${left%12}か月）</span>`}</div>`;}
    else g=`<div class="goalbar"><b>やり込みモード</b> 支配都市 ${myCities().length}/${SC.cities.length}・名声Lv${plv()}/30</div>`;}catch(e){}
  return g+_mapHTMLF();};

/* ---------- 結末：楽団が残したもの ---------- */
const ERA_EPI={
 s1723:'このあと音楽の主役は、バロックの緻密な対位法から、明るく歌う新しい様式へと移っていく。あなたの楽団の音は、その橋渡しとして語り継がれた。',
 s1781:'1789年、フランス革命が起こる。宮廷の楽団は次々に姿を消し、音楽は市民の集う演奏会場へと移っていった。',
 s1832:'やがて鉄道が街と街を結び、名手たちはさらに遠くまで旅をするようになる。ヴィルトゥオーゾの時代は、ここから最盛期を迎えた。',
 s1876:'ワーグナー派とブラームス派の論争は、次の世代――マーラーやリヒャルト・シュトラウスへと受け継がれていく。',
 s1905:'1914年、第一次世界大戦が始まる。多くの音楽家が国境に引き裂かれ、ひとつの時代が終わった。'
};
function legacy(){
  const L=[],T=[];
  const hv=Object.entries(G.hev||{}).filter(([k,v])=>v==='great'||v==='good'||v==='dud');
  const ev=k=>(HEV[G.sc]||[]).find(e=>e.id===k);
  for(const [k,v] of hv){const e=ev(k);if(!e)continue;const w=(G.hevWho||{})[k]||'楽団員';L.push(v==='great'?`${e.y}年、${e.t}に<b>${w}</b>が立ち、歴史の証人となった。`:v==='dud'?`${e.y}年、${e.t}で<b>${w}</b>がちょっとした珍事を起こした（今も研究者を悩ませている）。`:`${e.y}年、${e.t}を<b>${w}</b>が舞台の内側から支えた。`);}
  const grad=Object.keys(G.deshiDone||{});if(grad.length)L.push(`弟子として育った<b>${grad.map(nameAny).join('、')}</b>は、のちに一人前の名手となった。`);
  const gs=(G.guests||[]).map(g=>nameOf(g.id)).filter(Boolean);if(gs.length)L.push(`時の扉を越えて<b>${gs.join('、')}</b>が客演した。`);
  if(isMember('haru'))L.push('未来から来たヴァイオリニスト<b>ハル</b>は、この時代の音をすべて覚えて、扉の向こうへ帰っていった。');
  const mc=myCities();if(mc.length)L.push(`<b>${mc.map(k=>ci(k).name).join('、')}</b>の楽壇が、あなたの楽団の名を覚えている。`);
  const rec=G.chRec||{w:0,l:0};if(rec.w+rec.l)L.push(`ほかの楽団との腕比べは${rec.w}勝${rec.l}敗。`);
  const duds=[...new Set(G.members.filter(id=>isDud(id)||id==='donner'))];if(duds.length)L.push(`<b>${duds.map(nameOf).join('、')}</b>のおかげで、楽屋に笑い声が絶えなかった。`);
  if(hv.filter(([k,v])=>v==='great').length>=2)T.push('歴史の証人');
  if(grad.length>=2)T.push('名伯楽');
  if(gs.length>=3)T.push('時を越えた楽団');
  if(duds.length>=2)T.push('笑いの絶えない楽団');
  if(isMember('haru'))T.push('未来と出会った楽団');
  if(rec.w>=3)T.push('腕比べの覇者');
  if(mc.length>=Math.ceil(SC.cities.length*.7))T.push('大陸の覇者');
  if((G.ueq||[]).filter(e=>UEQ[e.id]&&UEQ[e.id].fam&&!e.fake).length>=3)T.push('名器の楽団');
  if(G.members.filter(id=>sigOf(id)).length>=4)T.push('見せ場の殿堂');
  return{L,T};
}
function legacyHTML(win){
  const {L,T}=legacy();
  return`<div class="card legacy" style="text-align:left">${T.length?`<div class="ttls">${T.map(t=>`<span>🏅${t}</span>`).join('')}</div>`:''}
    <div class="sec-t">楽団が残したもの</div>${L.length?L.map(x=>`<p>${x}</p>`).join(''):'<p>小さな楽団の、ささやかな物語だった。それでも、その夜の客席には確かに音楽があった。</p>'}
    <div class="sec-t">その後の音楽史</div><p>${ERA_EPI[G.sc]||''}</p></div>`;
}
const _finaleF=finale;
function legacyLog(){try{if(!G.flags.titlesLogged){G.flags.titlesLogged=1;for(const t of legacy().T)hpush(`称号「${t}」を得た`);}}catch(e){}}
finale=function(){legacyLog();_finaleF();try{const r=$('#rep');if(r)r.insertAdjacentHTML('beforebegin',legacyHTML(true));save();}catch(e){}};
const _endingF=ending;
ending=function(h,txt){legacyLog();_endingF(h,txt);try{const r=$('#rep');if(r)r.insertAdjacentHTML('beforebegin',legacyHTML(false));save();}catch(e){}};
/* 難易度の説明を席数に合わせる */
try{DIFF.hell.d=DIFF.hell.d.replace('全9席','9席');}catch(e){}
