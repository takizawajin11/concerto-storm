/* =====================================================================
   挑戦シナリオ（第2弾・第3弾）：ショパンを救え／マーラーに第10番を完成させろ
   ===================================================================== */
DEATH.chopin=DEATH.chopin||{y:1849,m:10,t:'ショパンがパリで世を去った。39歳。葬儀ではモーツァルトの『レクイエム』が歌われた。'};
FATE.chopin={w:'ショパン 幻のピアノ協奏曲第3番',f:'協奏曲',sl:[['pf','独奏ピアノ'],['cond','指揮'],['vc','チェロ']],mo:'nocturne',fact:'ショパンのピアノ協奏曲は、20歳前後に書いた2曲だけ。晩年は弟子のためのピアノ教本も書きかけていた。'};
const CHX={
 chopin49:{t:'ショパンを結核から救え',y0:1848,m0:1,sc:'s1832',pid:'liszt',target:'chopin',city:'paris',money:2500,care0:22,decay:11,endY:1849,endM:11,
  sub:'親友リストとして、最後の2年に寄り添え。',desc:'1848年1月、パリ。ショパンは37歳、結核に体をむしばまれている。史実では1849年10月17日に世を去る。友として、稼ぐ旅を止めるか、背中を押すか。',
  intro:'<b>1848年1月、パリ。</b><br>あなたはリスト。親友ショパンはジョルジュ・サンドと別れ、咳がやまない。<br>史実では、<b>1849年10月17日</b>に彼は世を去る。<br><br>演奏会や旅は彼の名声と財布を満たすが、体をむしばむ。名医を呼び、空気のよい家を探し、運命の夜を越えさせよう。',
  pool:['paris'],must:['chopin','franchomme'],
  ev:[
   {y:1848,m:2,id:'pleyel',t:'プレイエル・ホール最後のリサイタル',d:'6年ぶりの公開演奏会。切符は数日で売り切れた。だが、ショパンは階段を上るのもやっとだ。',
    opts:[{t:'舞台に立たせる<small>+800fr・名声+20・見込み↓</small>',f(){P().money+=800;addXP(20);chCare(-6);G.flags.cxPleyel=1;hpush('ショパン、パリ最後のリサイタル');}},{t:'見送らせる<small>見込み↑</small>',f(){chCare(4);}}]},
   {y:1848,m:4,id:'stirling',t:'スコットランドからの招待',d:'革命でパリは騒然。弟子のジェーン・スターリングが、イギリスとスコットランドでの演奏旅行を熱心にすすめている。湿った寒い土地だ。',
    opts:[{t:'旅に出させる<small>+1500fr・名声+25・見込み↓↓</small>',f(){P().money+=1500;addXP(25);chCare(-15);G.flags.cxBrit=1;addLog('ショパンは海を渡った。ロンドンでは女王の前でも弾いたが、スコットランドの冷たい霧が体にこたえた。');}},
          {t:'パリにとどめる<small>見込み↑</small>',f(){chCare(5);}}]},
   {y:1848,m:11,id:'guildhall',t:'ポーランド亡命者のための慈善演奏会',d:'ロンドンのギルドホール。祖国の亡命者のための舞台に、ショパンは立ちたいと言う。',need:'cxBrit',
    opts:[{t:'立たせる<small>名声+15・見込み↓</small>',f(){addXP(15);chCare(-8);G.flags.cxGuild=1;}},{t:'止める<small>見込み↑</small>',f(){chCare(3);}}]},
   {y:1849,m:5,id:'chaillot',t:'シャイヨーの家',d:'パリの郊外、セーヌを見下ろす高台に、空気のよい部屋が見つかった。家賃は高い。',
    opts:[{t:'借りてやる<small>-900fr・見込み↑↑</small>',cls:'gold',f(){if(P().money<900){toast('お金が足りない……');return;}P().money-=900;chCare(12);addLog('ショパンはシャイヨーの家に移った。');}},{t:'見送る',f(){}}]},
   {y:1849,m:8,id:'ludwika',t:'姉ルドヴィカ、来る',d:'ワルシャワから、姉ルドヴィカがはるばる駆けつけた。ショパンの顔に、久しぶりに笑みが浮かんだ。',
    opts:[{t:'姉弟の時間を',cls:'gold',f(){chCare(8);}}]},
   {y:1849,m:9,id:'last',t:'最後の作品',d:'病床のショパンが、書きかけのマズルカの楽譜を見つめている。「燃やしてくれ」とつぶやいた。',
    opts:[{t:'楽譜を守る<small>名声+10（運命を越えれば完成する）</small>',f(){G.flags.cxMaz=1;addXP(10);}},{t:'言われたとおりにする',f(){chCare(2);}}]}
  ],
  score:saved=>[['運命の夜を越えた',saved?500:0],['幻のピアノ協奏曲第3番',saved?150:0],['パリ最後のリサイタル',G.flags.cxPleyel?80:0],['イギリス演奏旅行',G.flags.cxBrit?120:0],
    ['ギルドホールの慈善演奏会',G.flags.cxGuild?60:0],['最後のマズルカを守った',G.flags.cxMaz?(saved?120:50):0],['財布の中身',Math.max(0,Math.min(250,Math.round(P().money/12)))],['名声',plv()*12]],
  endT:['ショパンは生きた','1849年10月17日'],
  endSaved:'夜が明けた。ショパンはピアノの前に座り、まだ誰も聴いたことのない協奏曲の主題を弾きはじめた。',
  endLost:'手を尽くしたが、史実は変わらなかった。葬儀ではモーツァルトの『レクイエム』が歌われた。'},
 mahler11:{t:'マーラーに第10番を完成させろ',y0:1910,m0:1,sc:'s1905',pid:'mahler',target:'mahler',city:'vienna',money:3000,care0:25,decay:11,endY:1911,endM:6,
  sub:'未完の交響曲を、本人の手で。',desc:'1910年1月。心臓に持病を抱えるマーラーは、ニューヨークとウィーンを行き来し、交響曲第10番を書き進めている。史実では1911年5月18日、未完のまま世を去る。',
  intro:'<b>1910年1月。</b><br>あなたはマーラー。3年前に心臓の持病を告げられた。<br>ニューヨーク・フィルの大きな契約、『千人の交響曲』の初演、そして書きかけの交響曲第10番。<br>史実では、<b>1911年5月18日</b>にあなたは世を去る。<br><br>仕事を減らし、名医にかかり、第10番を自分の手で完成させよう。',
  pool:['vienna','munich'],must:['walter'],
  ev:[
   {y:1910,m:2,id:'nyphil',t:'ニューヨーク・フィルの大シーズン',d:'来季は65回の演奏会。報酬は破格だが、楽団員や理事会との軋轢も目に見えている。',
    opts:[{t:'全部引き受ける<small>+2500fr・名声+20・見込み↓↓</small>',f(){P().money+=2500;addXP(20);chCare(-14);G.flags.mhNY=1;}},{t:'回数を減らしてもらう<small>+1000fr・見込み↓</small>',f(){P().money+=1000;chCare(-4);}}]},
   {y:1910,m:8,id:'freud',t:'ライデンの散歩',d:'夏、心の悩みを抱えたマーラーは、オランダのライデンでフロイトと会い、4時間あまり歩きながら語り合った。',
    opts:[{t:'会いに行く<small>見込み↑（心が軽くなる）</small>',cls:'gold',f(){chCare(8);addLog('マーラーはライデンでフロイトと語り合った。');}},{t:'作曲小屋にこもる<small>第10番が進む</small>',f(){G.flags.mhX=(G.flags.mhX||0)+1;}}]},
   {y:1910,m:9,id:'m8',t:'『千人の交響曲』初演の準備',d:'ミュンヘンの新しい博覧会場。千人を超える演奏者の稽古が待っている。',
    opts:[{t:'自分で全部仕切る<small>名声+35・見込み↓</small>',f(){addXP(35);chCare(-8);G.flags.mh8=1;hpush('『千人の交響曲』初演');cutin(G.pid,'千人の交響曲','ミュンヘン');}},{t:'ブルーノ・ワルターに任せる<small>名声+15・見込み↑</small>',f(){addXP(15);chCare(3);G.flags.mh8=1;}}]},
   {y:1910,m:10,id:'hut',t:'トーブラッハの作曲小屋',d:'森の中の小さな小屋。ここでだけ、交響曲第10番の続きが書ける。',
    opts:[{t:'一か月こもる<small>第10番が進む・見込み↑</small>',cls:'gold',f(){G.flags.mhX=(G.flags.mhX||0)+1;chCare(4);}},{t:'すぐに次の仕事へ<small>+600fr</small>',f(){P().money+=600;}}]},
   {y:1911,m:2,id:'fever',t:'熱のなかの演奏会',d:'ニューヨーク。高い熱があるのに、マーラーは指揮台に上がると言ってきかない。',need:'mhNY',
    opts:[{t:'振らせない<small>見込み↑↑（報酬は減る）</small>',cls:'gold',f(){chCare(10);P().money-=500;}},{t:'振らせる<small>+500fr・見込み↓↓</small>',f(){P().money+=500;chCare(-12);}}]},
   {y:1911,m:4,id:'paris',t:'パリの名医',d:'病は重い。パリにはパスツール研究所の専門医がいる。',
    opts:[{t:'パリで治療を受ける<small>-1200fr・見込み↑↑</small>',cls:'gold',f(){if(P().money<1200){toast('お金が足りない……');chCare(3);return;}P().money-=1200;chCare(16);}},{t:'ウィーンへ帰る<small>見込み↑</small>',f(){chCare(5);}}]}
  ],
  score:saved=>[['運命の夜を越えた',saved?500:0],['交響曲第10番を自分の手で完成',saved?250:0],['作曲小屋で書き進めた',Math.min(2,G.flags.mhX||0)*60],['『千人の交響曲』初演',G.flags.mh8?100:0],
    ['ニューヨーク・フィルの大シーズン',G.flags.mhNY?80:0],['財布の中身',Math.max(0,Math.min(250,Math.round(P().money/16)))],['名声',plv()*10]],
  endT:['マーラーは生きた','1911年5月18日'],
  endSaved:'夜が明けた。マーラーは窓を開け、「第10番の終楽章が聞こえる」と言った。',
  endLost:'手を尽くしたが、史実は変わらなかった。交響曲第10番は、アダージョ一つを残して未完に終わった。'}
};
const chCur=()=>G&&G.flags&&CHX[G.flags.chal];
function chCare(n){const c=chCur();if(!c)return;const s=fateSt(c.target===c.pid?G.pid:c.target);s.care=Math.max(0,Math.min(100,s.care+n));}
const chTid=c=>c.target===c.pid?G.pid:c.target;
function startChx(key){
  const c=CHX[key];try{ac();}catch(e){}
  newGame(c.sc,c.pid,'normal');
  G.flags.chal=key;G.flags.endless=1;G.flags.intro=1;G.tut=null;G.unl={dealer:1,exp:1,deshi:1,chal:1,cons:1};
  G.month=mIdx(c.y0,c.m0);P().city=c.city;G.owner[c.city]='player';P().money=c.money;G.sal=G.sal||{};
  const pool=SC.chars.filter(x=>c.pool.includes(x.city)&&!G.charOwner[x.id]&&!isDud(x.id)&&x.id!=='haru'&&!PQIDS.includes(x.id)&&!c.must.includes(x.id)&&(x.lv||0)<=6&&!(DEATH[x.id]&&mIdx(DEATH[x.id].y,DEATH[x.id].m)<G.month));
  const ids=c.must.filter(i=>SC.chars.some(x=>x.id===i)).concat(pool.map(x=>x.id).sort(()=>Math.random()-.5)).slice(0,5);
  for(const id of ids){G.members.push(id);G.sal[id]=Math.max(5,Math.round(demandOf(id)*.4));}
  G.flags.cardsInit=1;G.cards={};for(const id of G.members)G.cards[realId(id)]=1;
  G.fate={};fateSt(chTid(c)).care=c.care0;
  for(const e of (HEV[G.sc]||[]))if(mIdx(e.y,e.m)<G.month)(G.hev=G.hev||{})[e.id]='miss';
  odaiNew();start();
  setTimeout(()=>modal(`挑戦：${c.t}`,`${portraitRow(c.target)}${c.intro}<br><br><span class="pmeta">・体は月ごとに衰える。名医は月に一度（お金がかかる）<br>・依頼や旅を受けるほど稼げるが、見込みは下がる<br>・救えたうえで、何を成しとげたかで評価が決まる</span>`,[{t:'挑む',cls:'gold'}],'paper'),400);
}
const _memberMonthlyCX=memberMonthly;
memberMonthly=function(){_memberMonthlyCX();const c=chCur();if(!c)return;try{
  const tid=chTid(c);const E=DEATH[tid];
  if(tid!==G.pid&&!G.members.includes(tid)&&!(G.dead||[]).includes(tid)&&!G.flags.mzDone){G.members.push(tid);G.sal[tid]=G.sal[tid]||10;addLog(`${fateNm(tid)}は「友のそばにいたい」と楽団に戻ってきた。`);}
  if(!G.flags.mzDone&&E&&G.month<mIdx(E.y,E.m))chCare(-c.decay);
  if(P().money<0)chCare(-4);
  const d=ymd(G.month);G.flags.cxEv=G.flags.cxEv||{};
  for(const e of c.ev){if(G.flags.cxEv[e.id]||e.y!==d.y||e.m!==d.mo)continue;G.flags.cxEv[e.id]=1;if(e.need&&!G.flags[e.need])continue;
    modal(e.t,`${portraitRow(c.target)}${e.d}<br><br><span class="pmeta">運命を越える見込み：いま${fateChance(tid)}%</span>`,e.opts.map(o=>({t:o.t,cls:o.cls||'',f(){o.f();save();render();}})),'paper');}
  if(G.month>mIdx(c.endY,c.endM)&&!G.flags.mzDone)chxEnd(!(G.dead||[]).includes(tid)&&!G.flags.pdeath);
}catch(e){}};
const _fateNightCX=fateNight;
fateNight=function(id,E){return _fateNightCX(id,E).then(ok=>{const c=chCur();if(c&&id===chTid(c))setTimeout(()=>chxEnd(ok),2200);return ok;});};
/* 救えた人を休ませるのは控えめに（挑戦中） */
const _fateRestCX=fateRest;
fateRest=function(id){const c=chCur();if(c&&id===chTid(c)&&c.noRest)return toast(c.noRest);if(c&&id===chTid(c)){const s=fateSt(id);if(s.rest===G.month)return toast('今月はもう休ませています');s.rest=G.month;s.care=Math.min(100,s.care+4);G.fleet=G.fleet.map(f=>f.filter(x=>x!==id));addLog(`${fateNm(id)}をこの月は休ませた。`);save();render();fateBook();return;}return _fateRestCX(id);};
function chxEnd(saved){
  const c=chCur();if(!c||G.flags.mzDone)return;G.flags.mzDone=1;
  const parts=c.score(saved).filter(x=>x[1]);const s=parts.reduce((a,x)=>a+x[1],0);const rank=s>=950?'S':s>=720?'A':s>=480?'B':'C';
  const KEY='concertoStormChx_'+G.flags.chal;let best=null;try{best=JSON.parse(localStorage.getItem(KEY)||'null');if(!best||s>best.s)localStorage.setItem(KEY,JSON.stringify({s,rank,saved}));}catch(e){}
  hpush(`挑戦「${c.t}」：ランク${rank}（${s}点）`);save();
  const txt=`『協奏の嵐』挑戦「${c.t}」で${saved?'運命を越えた！':'救えなかった……'} ランク${rank}（${s}点）`;
  modal(saved?c.endT[0]:c.endT[1],`<div class="chrank r${rank}">${rank}</div><div style="text-align:center;font-size:20px;font-weight:bold">${s}点</div><p>${saved?c.endSaved:c.endLost}</p>
    <div class="chparts">${parts.map(([t,v])=>`<div><span>${t}</span><b>+${v}</b></div>`).join('')}</div>${best&&best.s>s?`<div class="pmeta">これまでの最高：ランク${best.rank}（${best.s}点）</div>`:'<div class="pmeta">自己ベスト更新！</div>'}`,
    [{t:'結果を送る',cls:'gold',f(){const full=`${txt} ${shBase()}`;if(navigator.share)navigator.share({text:full}).catch(()=>{});else navigator.clipboard.writeText(full).then(()=>toast('結果をコピーしました')).catch(()=>{});}},
     {t:'もう一度挑む',f(){startChx(G.flags.chal);}},{t:saved?'このまま続ける（やり込み）':'タイトルへ',f(){if(!saved){G.over=true;save();title();}}}],'paper');
}
/* 地図の上の残り時間 */
const _mapHTMLCX=mapHTML;
mapHTML=function(){let h=_mapHTMLCX();try{const c=chCur();if(c&&!G.flags.mzDone){const tid=chTid(c),E=DEATH[tid];if(E){const L=mIdx(E.y,E.m)-G.month;
  h=h.replace('<div class="odai">',`<div class="mzbar"><b>運命の夜まで あと${L}か月</b><div class="fbar"><i style="width:${fateChance(tid)}%"></i><span>${fateNm(tid)}が運命を越える見込み ${fateChance(tid)}%</span></div></div><div class="odai">`);}}}catch(e){}return h;};
/* タイトル画面：挑戦シナリオの欄 */
const _titleCX=title;
title=function(){_titleCX();try{const sec=document.querySelector('#main .title .sec-t');if(!sec)return;
  sec.insertAdjacentHTML('beforebegin',`<div class="sec-t" style="text-align:left">— 挑戦シナリオ（約20分） —</div>`+Object.entries(CHX).sort((a,b)=>a[1].y0-b[1].y0).map(([k,c])=>{let b=null;try{b=JSON.parse(localStorage.getItem('concertoStormChx_'+k)||'null');}catch(e){}
    return`<button class="btn scen chalbtn" data-chx="${k}"><span class="y">${c.y0}</span> <b>${c.t}</b><br><span style="font-size:13px;color:var(--gold2)">${c.sub}</span><p>${c.desc}</p><p>${b?`自己ベスト：ランク${b.rank}（${b.s}点）${b.saved?'・救出成功':''}`:'まだ挑んでいない'}</p></button>`;}).join(''));
  document.querySelectorAll('[data-chx]').forEach(b=>b.onclick=()=>startChx(b.dataset.chx));}catch(e){}};
