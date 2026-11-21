/* =====================================================================
   音楽院：支配下の街の音楽院に学長を置き、若手を養成する
   ===================================================================== */
const CONS={
 naples:{n:'ナポリの音楽院（コンセルヴァトーリオ）',y:1537,h:['porpora'],d:'もとは孤児院。少年たちに音楽を教え、カストラートや作曲家を数多く世に出した。「コンセルヴァトワール（音楽院）」という言葉はここから生まれた。'},
 venice:{n:'ピエタ慈善院',y:1700,h:['annamaria'],d:'捨て子の少女たちを育てる慈善院。格子の向こうで演奏する少女たちの合奏は、ヨーロッパ中の旅行者を驚かせた。ヴィヴァルディもここで教えた。'},
 paris:{n:'パリ音楽院',y:1795,h:['nboulanger','faure','widor','franck','hasselmans','gillet05','vogt'],d:'フランス革命のさなかに生まれた国立の音楽院。一等賞をめざす厳しい試験で知られる。'},
 milan:{n:'ミラノ音楽院',y:1808,h:[],d:'ナポレオン時代に創立。若きヴェルディは入学試験に落ちたことで知られる。'},
 prague:{n:'プラハ音楽院',y:1811,h:['dvorak'],d:'中欧でもっとも古い音楽院のひとつ。のちにドヴォルザークが院長を務めた。'},
 vienna:{n:'ウィーン楽友協会音楽院',y:1817,h:[],d:'楽友協会が開いた音楽院。のちのウィーン国立音楽大学。'},
 warsaw:{n:'ワルシャワ音楽院',y:1821,h:[],d:'若きショパンが学んだ音楽学校の流れをくむ。'},
 london:{n:'王立音楽院',y:1822,h:[],d:'イギリスで最初の本格的な音楽院。'},
 leipzig:{n:'ライプツィヒ音楽院',y:1843,h:['moscheles','david','schumann'],d:'メンデルスゾーンが創立。モシェレス、ダヴィッド、シューマンが教壇に立った。'},
 munich:{n:'ミュンヘン音楽院',y:1846,h:[],d:'のちにワーグナーの後押しで改組された。'},
 dresden:{n:'ドレスデン音楽院',y:1856,h:[],d:'宮廷楽団の楽員たちが教えた。'},
 peter:{n:'ペテルブルク音楽院',y:1862,h:['arubinstein','rimsky05','auer05','glazunov'],d:'アントン・ルビンシテインが創立したロシア初の音楽院。チャイコフスキーは第一期生。'},
 moscow:{n:'モスクワ音楽院',y:1866,h:['nrubinstein','tchaikovsky','taneyev'],d:'ニコライ・ルビンシテインが創立。チャイコフスキーが和声を教えた。'},
 berlin:{n:'ベルリン高等音楽学校',y:1869,h:['joachim'],d:'初代校長はヨアヒム。世界中からヴァイオリンの学生が集まった。'},
 weimar:{n:'ワイマール管弦楽学校',y:1872,h:['liszt76'],d:'晩年のリストが毎夏レッスンを開いた街の学校。'},
 pest:{n:'王立音楽アカデミー',y:1875,h:['liszt76','hubay'],d:'リストが初代院長。のちの「リスト音楽院」。'},
 newyork:{n:'ナショナル音楽院',y:1885,h:['dvorak'],d:'ドヴォルザークが院長として招かれ、『新世界より』を書いた。'}
};
const consOf=k=>{const c=CONS[k];return c&&c.y<=U_YEAR[G.sc]+Math.floor(G.month/12)?c:null;};
const GRADN={fr:[['ジャン','ピエール','マルセル','アンドレ','リュシアン','ジャック','マリー','ジャンヌ','セシル','ルイーズ'],['デュボワ','ルロワ','モロー','ルフェーヴル','ガルニエ','ブラン','メルシエ','ロラン']],
 de:[['ヨハン','フリードリヒ','カール','ヴィルヘルム','ハインリヒ','アンナ','クララ','ゾフィー','ルイーゼ','マリア'],['シュミット','ヴェーバー','ベッカー','ホフマン','クライン','ヴォルフ','ノイマン','ケラー']],
 it:[['ジョヴァンニ','ルイージ','アントニオ','ピエトロ','ジュゼッペ','マリア','テレーザ','ジュリア','アンナ','ルチア'],['ロッシ','ビアンキ','コロンボ','リッチ','マリーニ','ガッロ','コンティ','ロマーノ']],
 en:[['ジョン','ウィリアム','ジョージ','トマス','ヘンリー','メアリー','エリザベス','アン','ジェイン','エミリー'],['スミス','ブラウン','テイラー','ウィルソン','エヴァンズ','グリーン','ホール','ウッド']],
 ru:[['イワン','セルゲイ','ニコライ','アレクセイ','ミハイル','アンナ','ナターリヤ','オリガ','エレーナ','ソフィヤ'],['イワノフ','ペトロフ','ソコロフ','ポポフ','レベデフ','ヴォルコフ','モロゾフ','パヴロフ']],
 cz:[['ヤン','ヨゼフ','アントニーン','ヴァーツラフ','カレル','マリエ','アンナ','ルドミラ','ヤナ','ズデンカ'],['ノヴァーク','スヴォボダ','ドヴォルジャーク','チェルニー','プロハースカ','クチェラ']],
 hu:[['ラースロー','イシュトヴァーン','ヤーノシュ','ジュラ','エルジェーベト','マーリア','イロナ','カタリン'],['ナジ','コヴァーチ','トート','サボー','ホルヴァート','ヴァルガ']],
 pl:[['ヤン','ユゼフ','スタニスワフ','アンジェイ','マリア','アンナ','ゾフィア','ヤドヴィガ'],['コヴァルスキ','ノヴァク','ヴィシニェフスキ','カミンスキ','レヴァンドフスキ']]};
const CNAT={paris:'fr',vienna:'de',leipzig:'de',berlin:'de',munich:'de',dresden:'de',weimar:'de',milan:'it',naples:'it',venice:'it',london:'en',newyork:'en',peter:'ru',moscow:'ru',prague:'cz',pest:'hu',warsaw:'pl'};
function gradMake(g){
  if(SC.chars.some(c=>c.id===g.id))return;
  const c=C(g.id,g.name,g.en||'',g.city,g.seat,'名人芸',g.lv,g.st,false,'expr',[.9,.4,1.0,1.0,1.2],'scale',g.tim||'violin',g.piece||'卒業演奏会の協奏曲',g.line||'先生に教わったことを、舞台で全部出します。','音楽院の誇りを、あなたの楽団に。',`${g.cons}を卒業した若手。学長${g.teacher}の門下生。`);
  SC.chars.push(c);TR[g.id]=g.tr;GROW[g.id]='late';XTYPES[g.id]=[SEATTYPE[g.seat]];if(typeof UHIST!=='undefined')UHIST[g.id]=2;
}
function consGrad(k){
  const C0=consOf(k),st=G.consv[k],dir=st.dir;const nat=GRADN[CNAT[k]||'de'];const fem=Math.random()<.5;
  const first=pick(fem?nat[0].slice(Math.ceil(nat[0].length/2)):nat[0].slice(0,Math.ceil(nat[0].length/2))),last=pick(nat[1]);
  const typ=pick(typesOf(dir).filter(t=>Object.values(SEATTYPE).includes(t))||['vn'])||'vn';const seat=Object.keys(SEATTYPE).find(s=>SEATTYPE[s]===typ)||'コンサートマスター';
  const hist=C0.h.includes(realId(dir)),b=(hist?1:0);const ms=k2=>Math.max(4,Math.min(12,Math.round(mstat(dir,k2)*.55+rnd(1,3)+b)));
  const g={id:'grad'+(G.gradN=(G.gradN||0)+1),name:`${first}・${last}`,city:k,seat,lv:2+b,st:[ms('tech'),ms('expr'),ms('impro'),ms('theory')],cons:C0.n,teacher:nameOf(dir),
    tr:{h:pick(['short','wavy','long','curly']),hc:pick(['#2a1a10','#5a3a1a','#8a6a3a','#1a1a1a','#b08850']),b:fem?'none':pick(['none','none','mus']),fem:fem?1:0},tim:typ==='pf'?'piano':typ==='vc'?'cello':typ==='fl'||typ==='ob'?'flute':'violin'};
  G.grads=G.grads||[];G.grads.push(g);gradMake(g);
  modal(`${C0.n}の卒業生`,`${portraitRow(g.id)}学長<b>${nameOf(dir)}</b>の門下から、<b>${g.name}</b>（${SL(seat)}）が卒業した。${hist?'<br><span class="pmeta">史実の名教師の教えを受けた、期待の若手だ。</span>':''}`,[
    {t:'楽団に迎える<small>月給は安く、伸びしろは大きい</small>',cls:'gold',f(){ens5();G.members.push(g.id);G.sal[g.id]=20+g.lv*5;setMood(g.id,90);addLog(`${C0.n}の卒業生${g.name}が楽団に加わった。`);hpush(`${C0.n}の卒業生${g.name}、入団`);render();}},
    {t:'よその楽団へ送り出す<small>名声+12</small>',f(){addXP(12);addLog(`${C0.n}の卒業生${g.name}は、よその楽団で活躍している。`);}}]);
}
function consMonthly(){
  G.consv=G.consv||{};
  for(const k of Object.keys(CONS)){const C0=consOf(k);if(!C0)continue;const st=G.consv[k]=G.consv[k]||{dir:null,m:0,n:0};
    if(G.owner[k]!=='player'){st.dir=null;continue;}
    P().money+=30+cityLv(k)*10;
    if(!st.dir||!G.members.includes(st.dir)||uOnExp(st.dir)){st.dir=st.dir&&G.members.includes(st.dir)?st.dir:null;continue;}
    st.m++;gainExp(st.dir,6);const per=C0.h.includes(realId(st.dir))?4:6;
    if(st.m>=per){st.m=0;st.n++;try{consGrad(k);}catch(e){}}}
}
function consScreen(k){
  const C0=consOf(k);if(!C0)return;G.consv=G.consv||{};const st=G.consv[k]=G.consv[k]||{dir:null,m:0,n:0};const mine=G.owner[k]==='player';
  const per=st.dir&&C0.h.includes(realId(st.dir))?4:6;
  const hs=C0.h.filter(id=>SC.chars.some(c=>c.id===id)).map(id=>charById(id).name);
  const btns=mine?G.members.filter(id=>id!==st.dir&&(ulv(id)>=3||C0.h.includes(realId(id)))&&!isDud(id)).sort((a,b)=>(C0.h.includes(realId(b))?1:0)-(C0.h.includes(realId(a))?1:0)||ulv(b)-ulv(a)).slice(0,6)
    .map(id=>({t:`${nameOf(id)}を学長に<small>Lv${ulv(id)}${C0.h.includes(realId(id))?'・<b>史実の名教師</b>（4か月ごとに卒業生）':''}</small>`,cls:C0.h.includes(realId(id))?'gold':'',f(){st.dir=id;st.m=0;addLog(`${nameOf(id)}が${C0.n}の学長に就いた。`);save();render();}})):[];
  if(mine&&st.dir)btns.push({t:'学長を解任する',f(){st.dir=null;save();render();}});
  btns.push({t:'閉じる'});
  modal(C0.n,`<div class="pmeta">${C0.y<1700?'古くから':C0.y+'年創立'}・${ci(k).name}</div>${C0.d}<br><br>`+
    (mine?`学長：<b>${st.dir?nameOf(st.dir):'未任命'}</b>${st.dir?`（次の卒業生まで ${per-st.m}か月）`:''}<br>これまでの卒業生：${st.n}人<br><span class="pmeta">支配下の音楽院からは、毎月授業料が入る（${30+cityLv(k)*10}fr）。学長は団員の中から選ぶ。学長に選んだ団員は巡演にも出られるが、派遣公演中は教えられない。</span>${hs.length?`<br><span class="pmeta">この時代の史実の名教師：${hs.join('、')}</span>`:''}`
    :`<span class="pmeta">いまは${G.owner[k]&&G.owner[k]!=='player'?'ほかの勢力':'どの勢力も持っていない'}の街の音楽院。この街を支配すれば、学長を置いて若手を育てられる。</span>`),btns,'paper');
}
const _cityHTML_Cx=cityHTML;
cityHTML=function(){let h=_cityHTML_Cx();try{const k=P().city,C0=consOf(k);if(C0&&unl('cons'))h+=`<div class="card consc"><b>🎓 ${C0.n}</b>　<span class="pmeta">${G.owner[k]==='player'?(G.consv&&G.consv[k]&&G.consv[k].dir?`学長：${nameOf(G.consv[k].dir)}`:'学長は未任命'):'他勢力の街'}</span><button class="btn" id="consBtn" style="width:100%;margin-top:6px">音楽院を訪ねる</button></div>`;}catch(e){}return h;};
const _render_Cx=render;
render=function(){_render_Cx();const b=$('#consBtn');if(b)b.onclick=()=>consScreen(P().city);};
const _memberMonthly_Cx=memberMonthly;
memberMonthly=function(){_memberMonthly_Cx();try{consMonthly();}catch(e){}};
const _start_Cx=start;
start=function(){try{for(const g of (G&&G.grads)||[])gradMake(g);}catch(e){}return _start_Cx();};
UNL.push({id:'cons',c:()=>myCities().some(k=>consOf(k)),t:'音楽院',d:'支配下の街にある<b>音楽院</b>に、団員を学長として送りこめるようになった。数か月ごとに卒業生が出て、楽団に迎えられる。史実の名教師を学長にすれば、もっと早く、もっと良い若手が育つ。'});
/* 以前の版で演奏会の記録（G.cons）と音楽院の状態が混ざっていたのを直す */
const _startCV=start;
start=function(){try{if(G&&G.cons&&!Array.isArray(G.cons)){const o=G.cons;G.consv=Object.assign({},o,G.consv||{});G.cons=[];}
  else if(G&&Array.isArray(G.cons)){for(const k of Object.keys(G.cons))if(isNaN(+k)){G.consv=G.consv||{};G.consv[k]=G.cons[k];delete G.cons[k];}}}catch(e){}return _startCV();};
