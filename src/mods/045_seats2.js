/* =====================================================================
   オーボエ・ハープ・ティンパニの席
   ===================================================================== */
SEATS.splice(SEATS.indexOf('クラリネット首席'),0,'オーボエ首席');SEATS.push('ティンパニ首席','ハープ首席');
Object.assign(SEATTYPE,{'オーボエ首席':'ob','ティンパニ首席':'tim','ハープ首席':'hp'});
Object.assign(T_LBL,{ob:'オーボエ',tim:'ティンパニ',hp:'ハープ'});
/* バッハの時代はオーボエの席が別にできたので、クラリネットの席は前身の「シャリュモー」に */
TLBL.s1723=Object.assign(TLBL.s1723||{},{cl:'シャリュモー',ob:'オーボエ'});
SEATLBL.s1723=Object.assign(SEATLBL.s1723||{},{'クラリネット首席':'シャリュモー首席'});
/* 既存の人物を新しい席へ */
const SEATMOVE2={sammartini:'オーボエ首席',ramm:'オーボエ首席',aigu:'オーボエ首席',krumpholtz:'ハープ首席',parishalvars:'ハープ首席',renie:'ハープ首席'};
for(const sc in SCEN)for(const c of SCEN[sc].chars)if(SEATMOVE2[c.id])c.seat=SEATMOVE2[c.id];
Object.assign(XTYPES,{sammartini:['ob','comp'],ramm:['ob'],aigu:['ob'],krumpholtz:['hp','comp'],parishalvars:['hp','comp'],renie:['hp']});
/* 新しい面々 */
const SEATADD2={
 s1723:[['wpowell','ハープ',C('wpowell','ウィリアム・パウエル','W. Powell','london','ハープ首席','古典',3,[8,8,6,6],false,'expr',[.9,.3,1.0,.9,1.1],'scale','piano','ヘンデル ハープ協奏曲','ヘンデル先生が、わたしのために協奏曲を書いてくださって。','ウェールズのハープを、あなたの楽団に。','ウェールズ出身のハープ奏者。ヘンデルは『アレクサンダーの饗宴』（1736）の中に、彼が弾くためのハープ協奏曲を入れた。')]],
 s1781:[['lebrun','オーボエ',C('lebrun','L.A.ルブラン','L. A. Lebrun','munich','オーボエ首席','名人芸',4,[10,9,7,6],true,'tech',[1.1,.5,.8,1.1,1.1],'mannheim','flute','自作のオーボエ協奏曲','妻の歌と、わたしのオーボエ。二人で一つの演奏会です。','オーボエの名人芸を、あなたの楽団に。','マンハイム（のちミュンヘン）宮廷の名オーボエ奏者。歌手の妻フランツィスカとヨーロッパ中を演奏旅行し、自作の協奏曲で喝采を浴びた。')],
   ['altenburg','ティンパニ',C('altenburg','J.E.アルテンブルク','J. E. Altenburg','leipzig','ティンパニ首席','古典',3,[8,6,6,9],false,'tech',[.8,.2,1.2,.9,1.0],'fanfare','cello','トランペットとティンパニの祝典曲','ティンパニは、王侯の行列の先頭に立つ楽器ですぞ。','祝典の太鼓を、あなたの楽団に。','トランペットとティンパニの名手。1795年に奏法の本を著し、宮廷楽師たちの技と誇りを書き残した。')]],
 s1832:[['brod','オーボエ',C('brod','アンリ・ブロ','H. Brod','paris','オーボエ首席','古典',4,[9,9,6,8],false,'expr',[.9,.3,1.1,.9,1.1],'scale','flute','オーボエのための幻想曲','オーボエは吹くのも作るのも、わたしの仕事です。','パリ・オペラ座のオーボエを、あなたの楽団に。','パリ・オペラ座の首席オーボエ奏者。自分でもオーボエを作り、楽器の改良と教本でフランスのオーボエを育てた。')],
   ['vogt','オーボエ',C('vogt','ギュスターヴ・ヴォークト','G. Vogt','paris','オーボエ首席','古典',4,[9,10,6,7],false,'expr',[.9,.2,1.1,1.0,1.2],'scale','flute','パリ音楽院演奏協会のオーボエ','オーボエの音は、人の嘆きにいちばん近いのです。','パリ音楽院の音色を、あなたの楽団に。','パリ音楽院のオーボエ教授で、フランス・オーボエ楽派の祖。ベルリオーズはその音色をたいへん高く買っていた。')],
   ['pfundt','ティンパニ',C('pfundt','エルンスト・プフント','E. Pfundt','leipzig','ティンパニ首席','古典',3,[9,7,6,8],false,'tech',[.8,.2,1.2,.9,1.0],'beethoven5','cello','ベートーヴェン 交響曲第5番のティンパニ','音程の変わるティンパニを、こしらえておりましてな。','ゲヴァントハウスの太鼓を、あなたの楽団に。','ライプツィヒ・ゲヴァントハウス管弦楽団のティンパニ奏者で、メンデルスゾーンの楽団で叩いた。音程を素早く変えられる機械式ティンパニを考案した。')]],
 s1876:[['gillet','オーボエ',C('gillet','ジョルジュ・ジレ','G. Gillet','paris','オーボエ首席','古典',3,[9,9,6,7],false,'expr',[.9,.3,1.1,.9,1.2],'scale','flute','オーボエのための練習曲','音楽院を15歳で一等賞でした。いまは楽団で修業中です。','若いオーボエを、あなたの楽団に。','パリ音楽院を15歳で一等賞で卒業したオーボエ奏者。のちに母校の教授となり、近代フランスのオーボエ奏法を確立した。')],
   ['hasselmans','ハープ',C('hasselmans','アルフォンス・アッセルマン','A. Hasselmans','paris','ハープ首席','古典',4,[9,9,7,8],false,'expr',[.9,.3,1.1,1.0,1.1],'scale','piano','ハープ曲『泉』','ハープは、水と光を描く楽器です。','パリのハープを、あなたの楽団に。','ベルギー生まれのハープ奏者。パリ音楽院の教授として多くの名手を育て、ルニエやトゥルニエも門下生だった。')]],
 s1905:[['gillet05','オーボエ',C('gillet05','ジョルジュ・ジレ（教授）','G. Gillet','paris','オーボエ首席','古典',5,[10,10,7,9],false,'expr',[.9,.3,1.2,1.1,1.1],'scale','flute','オーボエ練習曲集','弟子たちが、世界中のオーケストラで吹いています。','フランス式オーボエを、あなたの楽団に。','パリ音楽院オーボエ科の名教授。弟子たちが世界のオーケストラに散り、「フランス式オーボエ」を広めた。')]]
};
for(const sc in SEATADD2)for(const [id,lbl,c] of SEATADD2[sc]){if(!SCEN[sc].chars.some(x=>x.id===id))SCEN[sc].chars.push(c);if(typeof ILBL!=='undefined')ILBL[id]=lbl;}
/* 雷のドンナー親方：どの時代にも出てくる、加減を知らないティンパニ奏者 */
Object.assign(QDEF,{loud:'叩きすぎる'});
for(const sc in SCEN){const S=SCEN[sc];if(S.chars.some(x=>x.id==='donner'))continue;
  const c=C('donner','ドンナー親方','Meister Donner','leipzig','ティンパニ首席','名人芸',3,[6,5,5,5],true,'tech',[.6,1.0,.4,.6,1.4],'beethoven5','cello','ティンパニ独奏（全部フォルテ）','ティンパニは、大きいほど正義じゃ！','雷のような一撃を、あなたの楽団に。','どの時代にもなぜか現れる、雷鳴のようなティンパニ奏者。ピアニッシモという言葉を知らない。交響曲の山場では頼もしいが、静かな曲ではすべてをかき消す。');
  if(!S.cities.includes(c.city))c.city=S.cities[0];S.chars.push(c);}
QUIRK.donner=['loud'];if(typeof ILBL!=='undefined'){ILBL.donner='ティンパニ';}
Object.assign(XTYPES,{wpowell:['hp'],lebrun:['ob','comp'],altenburg:['tim','br'],brod:['ob'],vogt:['ob'],pfundt:['tim'],gillet:['ob'],hasselmans:['hp'],gillet05:['ob'],donner:['tim']});
Object.assign(TR,{wpowell:{h:'wig'},lebrun:{h:'wig'},altenburg:{h:'wig',age:2},brod:{h:'short',hc:'#3a2a1a',b:'side'},vogt:{h:'short',hc:'#6a6a6a',b:'side',age:2},pfundt:{h:'short',hc:'#4a3a2a',b:'side'},
  gillet:{h:'short',hc:'#2a1a10',b:'mus'},hasselmans:{h:'short',hc:'#3a2a1a',b:'full'},gillet05:{h:'receding',hc:'#9a9a9a',b:'mus',age:2},donner:{h:'wild',hc:'#c33',b:'full',bc:'#c33',round:1}});
Object.assign(GROW,{gillet:'late'});
if(typeof UHIST!=='undefined')Object.assign(UHIST,{wpowell:3,lebrun:3,altenburg:3,brod:3,vogt:4,pfundt:3,gillet:4,hasselmans:4,gillet05:4,donner:1});
/* 演目：オーボエと書かれた席はオーボエ奏者のものに。名場面にハープとティンパニを */
const ADDSLOT={surprise:[['tim','ティンパニ（びっくりの一撃）']],fantastique:[['hp','ハープ（舞踏会）'],['tim','ティンパニ（遠雷と断頭台）']],
  b5:[['ob','オーボエ（第1楽章のカデンツァ）'],['tim','ティンパニ（第3楽章から終楽章へ）']],br1:[['tim','ティンパニ（冒頭の連打）'],['ob','オーボエ（第2楽章の歌）']],
  m5:[['hp','ハープ（アダージェット）']],firebird:[['hp','ハープ']],rite:[['tim','ティンパニ（生贄の踊り）']],faune:[['hp','ハープ']],daphnis:[['hp','ハープ']],sylvia:[['hp','ハープ']],walk:[['tim','ティンパニ（嵐の前奏曲）']]};
for(const sc in SCEN)for(const p of (SCEN[sc].rep||[])){
  p.slots=p.slots.map(s=>/オーボエ/.test(s.l)&&[].concat(s.r).includes('cl')?Sl(['ob'],s.l):s);
  for(const [r,l] of (ADDSLOT[p.id]||[]))if(!p.slots.some(s=>[].concat(s.r).includes(r)))p.slots.push(Sl(r,l));}
SCEN.s1723.rep.push(
  Pc('handelhp','ヘンデル ハープ協奏曲 変ロ長調（1736）','協奏曲',[Sl(['hp'],'独奏ハープ'),Sl('vn','コンサートマスター'),Sl('cond','指揮')],[.5,.4,.1],'古典','handel','scale','piano'),
  Pc('marcello','A.マルチェッロ オーボエ協奏曲 ニ短調','協奏曲',[Sl(['ob'],'独奏オーボエ'),Sl('vn','ヴァイオリン'),Sl('cb','通奏低音')],[.4,.5,.1],'ロマン',null,'largo','flute'));
SCEN.s1781.rep.push(
  Pc('k314','モーツァルト オーボエ協奏曲 ハ長調 K.314','協奏曲',[Sl(['ob'],'独奏オーボエ'),Sl('cond','指揮'),Sl('vn','コンサートマスター')],[.5,.4,.1],'古典','mozart','mozart','flute'),
  Pc('k299','モーツァルト フルートとハープのための協奏曲 K.299','協奏曲',[Sl(['fl'],'独奏フルート'),Sl(['hp'],'独奏ハープ'),Sl('cond','指揮')],[.4,.5,.1],'古典','mozart','mozart','flute'),
  Pc('h103','ハイドン 交響曲第103番「太鼓連打」（1795）','交響曲',[Sl('cond','指揮'),Sl(['tim'],'ティンパニ（冒頭の連打）'),Sl('vn','コンサートマスター'),Sl(['ob'],'オーボエ'),Sl('va','ヴィオラ'),Sl('br','ホルン')],[.3,.4,.3],'古典','haydn','surprise','violin'));
SCEN.s1876.rep.push(
  Pc('swan','チャイコフスキー『白鳥の湖』（1877）','バレエ',[Sl('cond','指揮'),Sl(['ob'],'オーボエ（白鳥の主題）'),Sl(['hp'],'ハープ（情景）'),Sl('vn','コンサートマスター（独奏）'),Sl('br','ホルン・金管')],[.3,.5,.2],'ロマン','tchaikovsky','swan','violin'));
SCEN.s1905.rep.push(
  Pc('danses','ドビュッシー『神聖な舞曲と世俗的な舞曲』（1904）','協奏曲',[Sl(['hp'],'独奏ハープ'),Sl('vn','弦楽合奏'),Sl('va','ヴィオラ'),Sl('cond','指揮')],[.4,.5,.1],'ロマン',null,'faune','piano'));
if(typeof CONC!=='undefined')Object.assign(CONC,{handelhp:{sol:['wpowell'],t:'ハープ奏者パウエルが弾くために書かれた'},k314:{sol:['ramm'],t:'マンハイムのラムが何度も吹いて評判をとった'},marcello:{sol:['sammartini'],t:'ヴェネツィアのオーボエ協奏曲。のちにバッハが鍵盤用に編曲した'}});
/* 巡演の戦いと遠征 */
Object.assign(U_TN,{ob:'オーボエ',tim:'ティンパニ',hp:'ハープ'});Object.assign(U_TI,{ob:'🎶',tim:'🥁',hp:'✨'});
Object.assign(UNT.交響.fit,{ob:1.15,tim:1.25,hp:1.05});Object.assign(UNT.オペラ.fit,{ob:1.05,hp:1.1});Object.assign(UNT.サロン.fit,{hp:1.2});Object.assign(UNT.協奏.fit,{ob:1.1,hp:1.1});
Object.assign(UATK,{ob:'哀愁のカンタービレ',tim:'雷鳴の一撃',hp:'きらめくアルペッジョ'});
UEXP.push({id:9,n:'庭園のセレナード',m:1,req:{num:2,types:['ob','hp','fl']},rew:{fr:340,xp:18}},{id:10,n:'凱旋式の太鼓',m:1,req:{num:2,types:['tim','br']},rew:{fr:420,xp:22}});
/* ドンナー親方：静かな曲ではうるさすぎる、山場のある曲では頼もしい */
const _evalLineupX2=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupX2(p,L,opt);opt=opt||{};
  if(L.some((id,i)=>id==='donner'&&opt.standIn!==i)){const big=p.slots.some(s=>[].concat(s.r).includes('tim'))||['交響曲','楽劇'].includes(p.form);
    if(big){r.q+=1.2;r.notes.push('ドンナー親方の一撃で、山場が雷のように決まる（+1.2）');}else{r.q-=1.3;r.notes.push('ドンナー親方の太鼓が、ほかの音をすべてかき消した（-1.3）');}
    r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}
  return r;};
if(typeof DUD_SCENES!=='undefined')DUD_SCENES.loud=['{n}の一撃で、シャンデリアが揺れた。','ピアニッシモの箇所で{n}が全力で叩いた。客席の紳士が椅子から落ちた。','{n}がバチを一本、客席に飛ばした。拾った子どもが記念に持ち帰った。'];
const _concertResultX2=concertResult;
concertResult=function(p,L,ev,fi){const ret=_concertResultX2(p,L,ev,fi);
  try{if((L||[]).includes('donner')&&Math.random()<.5){const t=pick(DUD_SCENES.loud).replace('{n}','ドンナー親方');addLog(`珍事：${t}`);modal('本番の珍事',`${portraitRow('donner')}${t}`,null,'paper');}}catch(e){}
  return ret;};
const _dudHitX2=dudHit;
dudHit=function(B,u){if(realId(u.id)==='donner'&&Math.random()<.3){const tg=B.en.filter(e=>e.hp>0);if(!tg.length)return null;
    for(const e of tg){const d=Math.max(1,Math.round(e.max*.1));e.hp=Math.max(0,e.hp-d);u.dealt+=d;B.ev.push({k:'hit',u:u.i,e:B.en.indexOf(e),d,crit:true,txt:'雷鳴の一撃！ 聴衆が飛び上がった',kill:e.hp<=0});}
    if(Math.random()<.5){const al=B.us.filter(x=>x.hp>1&&x!==u);if(al.length){const v=pick(al);v.hp=Math.max(1,v.hp-2);B.ev.push({k:'skip',txt:`隣の${nameOf(v.id)}が耳をふさいだ（気力-2）`});}}
    return'stop';}
  return _dudHitX2(B,u);};
/* 名器：オーボエ・ハープ・ティンパニ */
Object.assign(UEQ,{
 baroque_ob:{n:'バロック・オーボエ',t:['ob'],cat:'inst',tech:1,expr:1,r:2,y:1660,yz:1800,v:2,h:'キーが2つか3つしかない、初期のオーボエ。'},
 triebert:{n:'トリエベールのオーボエ',t:['ob'],cat:'inst',fam:1,tech:2,expr:2,r:4,y:1830,v:4,h:'パリのトリエベール工房のオーボエ。キーの仕組みを次々に改良した名工房。'},
 loree:{n:'ロレーのオーボエ（音楽院式）',t:['ob'],cat:'inst',fam:1,tech:2,expr:3,r:5,y:1882,v:5,own:['gillet05'],h:'ジレとロレーが仕上げた「音楽院式」オーボエ。今のオーボエの原型。'},
 single_hp:{n:'シングル・アクション・ハープ',t:['hp'],cat:'inst',tech:1,expr:1,r:2,y:1720,yz:1840,v:2,h:'ペダルを一段だけ踏み込める、昔のハープ。'},
 erard_hp:{n:'エラールのダブル・アクション・ハープ',t:['hp'],cat:'inst',fam:1,tech:2,expr:2,r:4,y:1811,v:4,h:'1810年ごろセバスチャン・エラールが特許をとったハープ。どの調でも弾ける。'},
 cav_tim:{n:'騎兵のティンパニ',t:['tim'],cat:'inst',tech:1,expr:1,r:2,y:1600,yz:1850,v:2,h:'馬の背に乗せて運んだ、銅の太鼓。'},
 mach_tim:{n:'機械式ティンパニ',t:['tim'],cat:'inst',fam:1,tech:3,expr:1,r:4,y:1840,v:4,own:['pfundt'],h:'ハンドル一つで音程を変えられるティンパニ。ライプツィヒで改良が進んだ。'}
});
/* 実績「満席」と開始時の文を席数に合わせる */
const _fullB=ACH.find(a=>a.id==='full');if(_fullB){_fullB.d=`${SEATS.length}席すべてを埋めた`;_fullB.c=()=>seatsFilled()>=SEATS.length;}
