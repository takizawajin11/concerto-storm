/* =====================================================================
   発展：①歴史の夜（史実イベント） ②弟子を育てる ③楽団どうしの対戦（挑戦状）
         ④時の扉から来た若いヴァイオリニスト ⑤見せ場で代表曲が鳴る
   ===================================================================== */

/* ---------- ⑤ 見せ場で代表曲が鳴る ---------- */
const SIGM={paganini:'caprice24',liszt:'campanella',liszt76:'campanella',chopin:'nocturne',haydn:'surprise',beethoven:'beethoven5',rossini:'tell',strauss:'waltz',strauss2:'danube',
  tchaikovsky:'swan',wagner:'ride',mahler:'adagietto',stravinsky:'rite',rachmaninoff:'rach2',saintsaens:'danse',satie:'gymno',bach:'bach',handel:'hallelujah',tartini:'devil',devil:'devil',
  vivaldi:'spring',brahms:'lullaby',verdi:'verdi',rstrauss:'zarathustra',debussy:'faune',mozart:'mozart',clementi:'clementi',berlioz:'diesirae',thalberg:'thalberg',schumann:'abegg',
  joachim:'fae',sarasate:'habanera',kreisler:'waltz',sibelius:'finlandia',smetana:'moldau',mussorgsky:'promenade',rimsky:'bumblebee',rimsky05:'bumblebee',offenbach:'cancan',bruckner:'bruckner',
  mendelssohn:'mendvc',casals:'bach',ysaye:'caprice24',toscanini:'verdi',caruso:'belcanto',malibran:'belcanto',farinelli:'belcanto',chaliapin:'volga',salieri:'classic',bononcini:'belcanto',haru:'bach'};
function sigMusic(id){try{
  let m=SIGM[id],tim=null;const c=(typeof charById==='function'&&SC.chars.find(x=>x.id===id))||(SC.rivals||[]).find(x=>x.id===id)||(SC.players||{})[id];
  if(!m&&c)m=c.motif;if(c)tim=c.tim;if(!m||!MOTIFS[m])m='scale';
  if(soundOn)playMotif(m,tim||'piano',.05);}catch(e){}}
const _cutinX=cutin;
cutin=function(id,text,sub){_cutinX(id,text,sub);if(/見せ場|歴史の証人|免許皆伝|次代の巨匠/.test(sub||'')||/見せ場/.test(text||''))sigMusic(id);};
const _cutinRX=cutinR;
cutinR=function(id,text,sub,era){_cutinRX(id,text,sub,era);if(/見せ場/.test(sub||''))sigMusic(id);};

/* ---------- ① 歴史の夜 ---------- */
/* key：史実の当事者（大成功）、types：その場に合う楽器（成功） */
const HEV={
 s1723:[
  {id:'matthaus',y:1727,m:4,c:'leipzig',t:'『マタイ受難曲』初演',d:'聖金曜日のトーマス教会。二つの合唱と二つのオーケストラが向かい合う、前代未聞の受難曲。',key:['bach'],types:['voice','vn','fl','ob','vc'],mo:'bach',fr:300,xp:22},
  {id:'coron',y:1727,m:10,c:'london',t:'ジョージ2世の戴冠式',d:'ウェストミンスター寺院。ヘンデルの戴冠式アンセム『司祭ザドク』が鳴り響く。',key:['handel'],types:['voice','cond','br','tim'],mo:'hallelujah',fr:520,xp:26},
  {id:'beggar',y:1728,m:1,c:'london',t:'『乞食オペラ』旋風',d:'イタリア・オペラを茶化した英語の芝居が大当たり。ロンドンの歌劇場に冷たい風が吹く。',key:['bononcini'],types:['voice','vn'],mo:'scale',fr:220,xp:16},
  {id:'hippolyte',y:1733,m:10,c:'paris',t:'ラモー『イポリートとアリシー』初演',d:'50歳のラモーの、初めてのオペラ。リュリ派は眉をひそめ、若い聴衆は熱狂した。',key:['rameau'],types:['voice','fl','cond'],mo:'scale',fr:360,xp:22},
  {id:'farinelli',y:1737,m:8,c:'madrid',t:'ファリネッリ、スペイン王を歌で癒やす',d:'ふさぎ込むフェリペ5世のために、毎晩同じ歌を歌う役目。王妃からの、たっての願いだった。',key:['farinelli'],types:['voice','vn'],mo:'belcanto',fr:620,xp:26}],
 s1781:[
  {id:'figaro',y:1786,m:5,c:'vienna',t:'『フィガロの結婚』初演',d:'ブルク劇場。召使いが伯爵を出し抜く、危ういほど痛快なオペラ。アンコールが多すぎて、のちに皇帝が制限した。',key:['mozart'],types:['voice','cond','vn'],mo:'mozart',fr:420,xp:26},
  {id:'stgeorges',y:1787,m:4,c:'london',t:'カールトン・ハウスの剣術試合',d:'ヴァイオリンの名手サン＝ジョルジュが、皇太子の前で剣の腕を披露する。相手はあの騎士デオン。',key:['stgeorges'],types:['vn'],mo:'classic',fr:300,xp:20},
  {id:'giovanni',y:1787,m:10,c:'prague',t:'『ドン・ジョヴァンニ』初演',d:'プラハの劇場。序曲は前の晩に、ドゥシェク家の別荘で書き上げられたばかり。',key:['mozart','fdusek'],types:['voice','cond'],mo:'mozart',fr:450,xp:26},
  {id:'salomon',y:1791,m:3,c:'london',t:'ハイドン、ロンドンに立つ',d:'興行師ザロモンの演奏会。エステルハージ家の楽長が、はじめて海を渡った。',key:['haydn'],types:['cond','vn','vc','fl'],mo:'surprise',fr:520,xp:30},
  {id:'stadlerk',y:1791,m:10,c:'prague',t:'クラリネット協奏曲 初演',d:'モーツァルトが友人シュタードラーのために書いた、最後の協奏曲。',key:['stadler','mozart'],types:['cl'],mo:'mozart',fr:380,xp:24}],
 s1832:[
  {id:'chopinp',y:1832,m:2,c:'paris',t:'ショパン、パリ・デビュー',d:'プレイエルのサロン。客席にはリストとメンデルスゾーンの姿も。',key:['chopin','kalkbrenner','mpleyel'],types:['pf'],mo:'nocturne',fr:380,xp:26},
  {id:'lucia',y:1835,m:9,c:'naples',t:'『ランメルモールのルチア』初演',d:'サン・カルロ劇場。狂乱の場で、客席は息をのんだ。',key:['donizetti'],types:['voice','fl'],mo:'belcanto',fr:420,xp:26},
  {id:'flood',y:1838,m:4,c:'vienna',t:'ドナウ大洪水の慈善演奏会',d:'故郷ハンガリーの洪水を知ったリストが、ウィーンで慈善演奏会を開く。',key:['liszt'],types:['pf','vn'],mo:'campanella',fr:200,xp:38},
  {id:'great',y:1839,m:3,c:'leipzig',t:'シューベルト『ザ・グレート』初演',d:'シューマンがウィーンで見つけた楽譜を、メンデルスゾーンがゲヴァントハウスで初演する。',key:['schumann','david'],types:['cond','vn','br'],mo:'scale',fr:420,xp:26}],
 s1876:[
  {id:'ring',y:1876,m:8,c:'bayreuth',t:'バイロイト祝祭劇場の開幕',d:'『ニーベルングの指環』全曲初演。皇帝も王も、世界中の音楽家が小さな町に集まった。',key:['wagner','richter','wilhelmj','ritter'],types:['voice','cond','br','va'],mo:'ride',fr:620,xp:36},
  {id:'brahms1',y:1876,m:12,c:'vienna',t:'ブラームス 交響曲第1番 ウィーン初演',d:'構想から20年あまり。「ベートーヴェンの第10番」と呼ばれる交響曲が、ついにウィーンへ。',key:['brahms'],types:['cond','vn','tim','ob'],mo:'alphorn',fr:420,xp:28},
  {id:'swanl',y:1877,m:3,c:'moscow',t:'『白鳥の湖』初演',d:'ボリショイ劇場。のちに世界一有名になるバレエは、このときまだ評判が今ひとつだった。',key:['tchaikovsky'],types:['vn','ob','hp','cond'],mo:'swan',fr:380,xp:26},
  {id:'bvc',y:1879,m:1,c:'leipzig',t:'ブラームス ヴァイオリン協奏曲 初演',d:'元日のゲヴァントハウス。独奏は親友ヨアヒム、指揮はブラームス本人。',key:['joachim','brahms'],types:['vn'],mo:'bvc',fr:520,xp:30},
  {id:'tchvc',y:1881,m:12,c:'vienna',t:'チャイコフスキー ヴァイオリン協奏曲 初演',d:'独奏はブロツキー、指揮はリヒター。批評家ハンスリックは「悪臭を放つ音楽」と酷評した。',key:['brodsky','richter'],types:['vn','cond'],mo:'scale',fr:420,xp:30}],
 s1905:[
  {id:'sibvc',y:1905,m:10,c:'berlin',t:'シベリウス ヴァイオリン協奏曲（改訂版）初演',d:'ベルリンで、指揮はリヒャルト・シュトラウス。',key:['sibelius','rstrauss'],types:['vn'],mo:'finlandia',fr:380,xp:26},
  {id:'salomep',y:1905,m:12,c:'dresden',t:'『サロメ』初演',d:'ドレスデン宮廷歌劇場。カーテンコールは38回に及んだという。',key:['rstrauss'],types:['voice','cond','cl'],mo:'zarathustra',fr:480,xp:28},
  {id:'firebirdp',y:1910,m:6,c:'paris',t:'『火の鳥』初演',d:'パリ・オペラ座。ロシア・バレエ団が無名の若者ストラヴィンスキーを一夜で有名にした。',key:['stravinsky'],types:['cond','vn','hp'],mo:'rite',fr:420,xp:28},
  {id:'m8p',y:1910,m:9,c:'munich',t:'マーラー『千人の交響曲』初演',d:'ミュンヘンの新しい博覧会場。演奏者は千人を超え、トーマス・マンも客席にいた。',key:['mahler','walter'],types:['voice','cond','br'],mo:'adagietto',fr:720,xp:36},
  {id:'ritep',y:1913,m:5,c:'paris',t:'『春の祭典』初演',d:'シャンゼリゼ劇場。開演まもなく客席で口笛と怒号が飛び交い、警察まで呼ばれた。',key:['stravinsky','monteux'],types:['cond','cl','tim'],mo:'rite',fr:520,xp:36}]
};
const HEV_DUD={face:'{n}が初演の舞台で渾身の変顔をした。客席の批評家が手帳に「謎の東洋人」と書き残した。',wrong:'{n}が歴史的初演で一音外した。後世の研究者を二百年悩ませる「謎の異稿」の誕生である。',
  rhythm:'{n}が一拍早く飛び出した。作曲者は一瞬固まり、それから「それもいい」とつぶやいた。',roukai:'{n}が開演前の楽屋で「ワシの若いころは」と語り出し、作曲者まで聞き入ってしまった。',loud:'{n}の一撃で、初演の会場のシャンデリアが揺れた。新聞は「雷鳴のごとき迫力」と書いた。'};
function hevOpen(){
  G.hev=G.hev||{};const list=HEV[G.sc]||[];
  for(const e of list){if(G.hev[e.id])continue;const s=mIdx(e.y,e.m);if(G.month<s)continue;
    if(G.month>s+2){G.hev[e.id]='miss';continue;}
    G.hev[e.id]='open';hevModal(e);break;}
}
function hevModal(e){
  const avail=['you'].concat(G.members.filter(id=>!uOnExp(id)));
  const rk=id=>{const r=id==='you'?G.pid:realId(id);if(e.key.includes(r))return 0;if(typesOf(id).some(t=>e.types.includes(t)))return 1;return 2;};
  const ord=avail.slice().sort((a,b)=>rk(a)-rk(b)).slice(0,7);
  const btns=ord.map(id=>({t:`${nameOf(id)}を送る<small>${rk(id)===0?'史実の当事者':rk(id)===1?'この場にふさわしい':'客席から見届ける'}</small>`,cls:rk(id)===0?'gold':'',f(){hevGo(e,id,rk(id));}}));
  btns.push({t:'今回は見送る',f(){G.hev[e.id]='pass';addLog(`歴史の夜「${e.t}」を見送った。`);}});
  modal(`歴史の夜：${e.t}`,`<div class="hev"><div class="hevy">${e.y}年${e.m}月・${ci(e.c)?ci(e.c).name:''}</div>${e.d}<br><br>招待状が届いた。楽団から誰を送る？</div>`,btns,'paper');
  try{playMotif(e.mo,'piano',.1);}catch(x){}
}
function hevGo(e,id,rank){
  const r=id==='you'?G.pid:realId(id),nm=nameOf(id),q=id==='you'?[]:(QUIRK[r]||[]);
  const dq=q.find(x=>HEV_DUD[x]);let txt,fr,xp,ex,res;
  if(rank===0){res='great';fr=Math.round(e.fr*1.6);xp=Math.round(e.xp*1.5);ex=70;
    txt=`${nm}は史実のとおり、その夜の主役となった。客席の熱狂は、何十年も語り継がれることになる。`;cutin(r,'歴史の証人',`${e.t}`);}
  else if(dq){res='dud';fr=Math.round(e.fr*.5);xp=Math.round(e.xp*.8);ex=25;txt=HEV_DUD[dq].replace('{n}',nm);}
  else if(rank===1){res='good';fr=e.fr;xp=e.xp;ex=45;txt=`${nm}は舞台の一員として、歴史が動く瞬間を内側から支えた。`;}
  else{res='seen';fr=Math.round(e.fr*.4);xp=Math.round(e.xp*.6);ex=20;txt=`${nm}は客席の片隅から、歴史が動く瞬間を見届けた。その夜の音は、ずっと${nm}の耳に残った。`;}
  G.hev[e.id]=res;G.hevWho=G.hevWho||{};G.hevWho[e.id]=nm;P().money+=fr;addXP(xp);if(id!=='you'){gainExp(id,ex);setMood(id,moodOf(id)+(res==='seen'?4:10));}
  addLog(`歴史の夜「${e.t}」：${txt}`);if(res==='great')hpush(`歴史の夜「${e.t}」に${nm}が立った`);
  modal(res==='great'?'大成功：歴史の証人':res==='dud'?'珍事：歴史が少しだけ変わった':res==='good'?'成功':'見届けた',
    `${portraitRow(r)}${txt}<br><br><span class="pmeta">+${fmt(fr)}fr・名声+${xp}${id!=='you'?`・${nm}の経験+${ex}`:''}</span>`,null,'paper');
  save();
}

/* ---------- ② 弟子を育てる ---------- */
/* 史実の師弟：弟子 → 師匠 */
const DESHI_H={beethoven:'haydn',liszt:'czerny',paderewski:'leschetizky',essipova:'leschetizky',elman:'auer05',zimbalist:'auer05',vecsey:'hubay',renie:'hasselmans',huberman:'joachim',
  sauer:'liszt76',rosenthal:'liszt76',kreisler:'delibes',enescu:'faure',ravel:'faure',nboulanger:'faure',rachmaninoff:'taneyev',scriabin:'taneyev',medtner:'taneyev',stravinsky:'rimsky05',
  glazunov:'rimsky05',dohnanyi:'?',gillet05:'?',wieniawski:'?',sarasate:'?',cortot:'?',long:'?',haru:'?'};
const deshiHist=(s,t)=>{const a=DESHI_H[s===G.pid?s:realId(s)];return a&&a!=='?'&&a===(t==='you'?G.pid:realId(t));};
function deshiOf(id){G.deshi=G.deshi||{};return G.deshi[id];}
function deshiPick(id){
  const my=typesOf(id);const cand=['you'].concat(G.members).filter(t=>t!==id&&!deshiOf(t)&&(typesOf(t).some(x=>my.includes(x))||typesOf(t).includes('comp')||deshiHist(id,t))&&(ulv(t)>ulv(id)||deshiHist(id,t)));
  if(!cand.length)return modal('師匠が見つからない',`${nameOf(id)}より格上で、同じ楽器（または作曲家）の団員がいません。`,null);
  cand.sort((a,b)=>(deshiHist(id,b)?1:0)-(deshiHist(id,a)?1:0)||ulv(b)-ulv(a));
  modal(`${nameOf(id)}の師匠を選ぶ`,`弟子は毎月、師匠のLvに応じて経験を積みます。${'<br>'}<b>半年</b>（史実の師弟なら<b>4か月</b>）で「免許皆伝」となり、全能力が永久に上がります。<br><span class="pmeta">師匠と弟子がそろって楽団にいることが条件。</span>`,
    cand.slice(0,7).map(t=>({t:`${nameOf(t)}<small>Lv${ulv(t)}${deshiHist(id,t)?'・<b>史実の師弟</b>':''}</small>`,cls:deshiHist(id,t)?'gold':'',f(){G.deshi=G.deshi||{};G.deshi[id]={t,m:0};
      addLog(`${nameOf(id)}が${nameOf(t)}に弟子入りした。${deshiHist(id,t)?'史実でも、この二人は師弟だった。':''}`);hpush(`${nameOf(id)}、${nameOf(t)}に弟子入り`);save();render();}})).concat([{t:'やめる'}]));
}
function deshiMonthly(){
  G.deshi=G.deshi||{};
  for(const s of Object.keys(G.deshi)){const d=G.deshi[s];
    if(!G.members.includes(s)||(d.t!=='you'&&!G.members.includes(d.t))){delete G.deshi[s];continue;}
    if(uOnExp(s)||(d.t!=='you'&&uOnExp(d.t)))continue;
    const h=deshiHist(s,d.t);d.m++;gainExp(s,Math.round((8+ulv(d.t)*1.2)*(h?1.6:1)));
    if(d.t!=='you'&&Math.random()<.15){const good=Math.random()<.6;setMood(d.t,moodOf(d.t)+(good?3:-3));addLog(good?`${nameOf(d.t)}は、弟子${nameOf(s)}の成長に目を細めた。`:`${nameOf(d.t)}が${nameOf(s)}の練習不足を叱った。稽古場に緊張が走る。`);}
    if(d.m>=(h?4:6)){delete G.deshi[s];const up=h?2:1;G.boost[s]=(G.boost[s]||0)+up;setMood(s,moodOf(s)+12);
      const ttl=h?'次代の巨匠':'免許皆伝';addLog(`${nameOf(s)}が師匠${nameOf(d.t)}から${ttl==='次代の巨匠'?'すべてを受け継ぎ、次代の巨匠となった':'免許皆伝を受けた'}（全能力+${up}）。`);hpush(`${nameOf(s)}、${ttl}`);
      cutin(realId(s),ttl+'！',`師匠：${nameOf(d.t)}（全能力+${up}）`);}
  }
}
const _uDetailX=uDetail;
uDetail=function(id){
  if(id==='you'||!G.members.includes(id))return _uDetailX(id);
  const _m=modal;
  modal=function(t,b,btns,cls){modal=_m;btns=btns||[];
    const d=deshiOf(id),mine=Object.keys(G.deshi||{}).filter(s=>G.deshi[s].t===id);
    let info='';if(d)info+=`<div class="deshi">師匠：<b>${nameOf(d.t)}</b>（修業 ${d.m}/${deshiHist(id,d.t)?4:6}か月）${deshiHist(id,d.t)?'・史実の師弟':''}</div>`;
    if(mine.length)info+=`<div class="deshi">弟子：${mine.map(s=>`<b>${nameOf(s)}</b>（${G.deshi[s].m}か月）`).join('、')}</div>`;
    b=info+b;const ix=btns.findIndex(x=>x.t==='閉じる');const add=d?{t:'修業をやめさせる<small>師弟関係を解く</small>',f(){delete G.deshi[id];addLog(`${nameOf(id)}は${nameOf(d.t)}のもとでの修業をやめた。`);save();render();}}
      :{t:'弟子入りさせる<small>格上の団員に師事し、半年で全能力+1</small>',f(){deshiPick(id);}};
    if(typeof unl!=='function'||unl('deshi'))btns.splice(ix<0?btns.length:ix,0,add);return _m(t,b,btns,cls);};
  try{return _uDetailX(id);}finally{if(modal!==_m)modal=_m;}
};

/* ---------- ④ 時の扉から来た若いヴァイオリニスト ---------- */
for(const sc in SCEN){const S=SCEN[sc];if(S.chars.some(x=>x.id==='haru'))continue;
  S.chars.push(C('haru','ハル','Haru',S.cities[0],'コンサートマスター','名人芸',3,[9,10,9,7],true,'expr',[.8,.4,1.1,1.0,1.4],'bach','violin','バッハ 無伴奏パルティータ','この時代の音、ぜんぶ覚えて帰ります。','未来のヴァイオリンを、あなたの楽団に。','時の扉の向こう、ずっと先の時代から来た若いヴァイオリニスト。どの時代の巨匠にも物おじせず、聴いたものをすぐ自分の音にしてしまう。',{hidden:1}));}
Object.assign(XTYPES,{haru:['vn']});Object.assign(TR,{haru:{h:'short',hc:'#1a1410',b:'none',coat:'#2a3a6a'}});Object.assign(GROW,{haru:'late'});
if(typeof UHIST!=='undefined')UHIST.haru=3;SIG.haru=['未来からの音','百年先の弾き方、聴いてみて。','stars'];
const _poolCharsX=poolChars;
poolChars=function(){const a=_poolCharsX();return G&&G.flags&&G.flags.haru?a:a.filter(c=>c.id!=='haru');};
const _guestSrcX=guestSrc;
guestSrc=function(era,id){if(id==='haru'&&!(G&&G.flags&&G.flags.haru))return null;return _guestSrcX(era,id);};
function haruCheck(){
  if(!G||G.flags.haru||isMember('haru'))return;
  const ok=Object.keys(G.door||{}).length>=1||G.month>=36;if(!ok||Math.random()>.15)return;
  G.flags.haru=1;const c=charById('haru');if(c)c.city=P().city;
  modal('時の扉から来た人',`${portraitRow('haru')}稽古場の奥の扉が、ひとりでに開いた。ヴァイオリンケースを抱えた若者が立っている。<br><br><b>ハル</b>「${c.join}」<br><br><span class="pmeta">${c.trivia}</span>`,[
    {t:'楽団に迎える<small>月給は控えめ。伸びしろは大きい</small>',cls:'gold',f(){ens5();G.members.push('haru');G.sal.haru=40;setMood('haru',95);addLog('時の扉から来た若いヴァイオリニスト、ハルが楽団に加わった。');hpush('ハル、時の扉から入団');cutin('haru','未来から来た弦',`ハル、入団`);render();}},
    {t:'今はまだ',f(){addLog('ハルは「またいつか」と笑い、街のどこかへ消えた。');}}]);
}

/* ---------- 月ごとの処理をまとめて ---------- */
const _memberMonthlyX=memberMonthly;
memberMonthly=function(){_memberMonthlyX();try{deshiMonthly();}catch(e){}try{haruCheck();}catch(e){}try{hevOpen();}catch(e){}};

/* ---------- ③ 楽団どうしの対戦（挑戦状） ---------- */
const CH_KEY='concertoStormChal';
function chList(){try{return JSON.parse(localStorage.getItem(CH_KEY)||'[]');}catch(e){return[];}}
function chSave(a){try{localStorage.setItem(CH_KEY,JSON.stringify(a.slice(0,12)));}catch(e){}}
function chPack(){
  const nm=(()=>{try{return localStorage.getItem('concertoStormName')||'';}catch(e){return'';}})();
  const m=G.fleet[0].slice(0,6).map(id=>id==='you'?[G.pid,P().name,G.sc,plv(),P().tech,P().expr,P().impro,P().theory,0]
    :[realId(id),nameOf(id),guestEra(id)||G.sc,ulv(id),mstat(id,'tech'),mstat(id,'expr'),mstat(id,'impro'),mstat(id,'theory'),ux(id).kai?1:0]);
  return{v:1,k:'chal',o:`${P().name}管弦楽団`,n:nm,p:G.pid,sc:G.sc,pw:uFleetPow(),at:Date.now(),m};
}
async function chMake(){
  if(!G.fleet[0].length)return toast('巡演楽団に団員を配置してください');
  const url=`${shBase()}#c=${await shEncode(chPack())}`;
  const txt=`『協奏の嵐』${P().name}管弦楽団からの挑戦状。受けて立つ？ ${url}`;
  if(navigator.share){try{await navigator.share({title:'協奏の嵐 挑戦状',text:txt});return;}catch(e){}}
  try{await navigator.clipboard.writeText(txt);toast('挑戦状をコピーしました。LINEなどに貼って送れます');}
  catch(e){modal('挑戦状',`下の文を長押しでコピーして送ってください。<textarea style="width:100%;height:120px;margin-top:6px">${txt}</textarea>`,null);}
}
async function chRead(str){
  const m=String(str).match(/#c=([A-Za-z0-9_\-]+)/)||String(str).trim().match(/^([zj][A-Za-z0-9_\-]{10,})$/);if(!m)return toast('挑戦状が読み取れませんでした');
  try{const D=await shDecode(m[1]);if(D.k!=='chal')throw 0;const a=chList().filter(x=>x.at!==D.at||x.o!==D.o);a.unshift(D);chSave(a);toast(`${D.o}からの挑戦状を受け取りました`);if(G)render();return D;}
  catch(e){toast('挑戦状が壊れているようです');}
}
const _shBootX=shBoot;
shBoot=async function(){
  const m=location.hash.match(/^#c=(.+)$/);
  if(m){await chRead(location.hash);history.replaceState(null,'',shBase());setTimeout(()=>modal('挑戦状が届きました','楽団を率いて（または続きから再開して）、<b>巡演 → 挑戦状</b> から受けて立てます。',null,'paper'),400);return false;}
  return _shBootX();
};
function chEnemies(D){
  return D.m.map((x,i)=>{const [id,name,era,lv,t,e,im,th,kai]=x;const base=(t+e+im)/3;const mult=(.5+lv*.045)*(kai?1.15:1);
    return{n:name,pt:id,era,hp:Math.round((26+base*3.4)*mult*(i===0?1.7:1)),atk:Math.round((base*1.15+3)*mult*(i===0?1.1:1)),def:Math.round((th||6)/2*mult),line:i===0?'楽団の総力':'渾身の一曲',boss:i===0?1:0};});
}
function chFight(i){
  const D=chList()[i];if(!D)return;if(!G.fleet[0].length)return toast('巡演楽団に団員を配置してください');
  uStylePick({title:`挑戦状：${D.o}`,sub:`${D.n?D.n+'さんの楽団・':''}${U_ERA[D.sc]||''}・楽団の力 ${D.pw}`,node:{t:'対決'},enemies:chEnemies(D),boss:true,practice:true,challenge:D,k:P().city});
}
const _uResultX=uResult;
uResult=function(B){
  const r=_uResultX(B);
  try{if(B.challenge){const rank=uRank(B),win=['S','A','B'].includes(rank),D=B.challenge;G.chRec=G.chRec||{w:0,l:0};win?G.chRec.w++:G.chRec.l++;
    const a=chList();const x=a.find(y=>y.at===D.at&&y.o===D.o);if(x){x.res=(x.res||'')+(win?'○':'●');chSave(a);}
    addLog(`${D.o}の挑戦を${win?'退けた':'受けて敗れた'}（評価${rank}）。`);if(win)hpush(`${D.o}との楽団対戦に勝利`);save();}}catch(e){}
  return r;
};
const _sortieHTMLX=sortieHTML;
sortieHTML=function(){
  let h;
  if(UST==='chal'){UST='exp';const raw=_sortieHTMLX();UST='chal';const head=raw.slice(0,raw.indexOf('</div>')+6);h=head+chHTML();}
  else h=_sortieHTMLX();
  if(UST==='chal')h=h.replace('data-ust="exp" class="on"','data-ust="exp" class=""');
  return h.replace(/(時の扉<\/button>)(<\/div>)/,`$1<button data-ust="chal" class="${UST==='chal'?'on':''}">挑戦状</button>$2`);
};
function chHTML(){
  const a=chList(),rec=G.chRec||{w:0,l:0};
  return`<div class="card" style="font-size:12.5px">ほかのプレイヤーの楽団と、巡演の形式で戦います（気力は減らず、街の支配にも影響しません）。<br>自分の<b>巡演楽団</b>を「挑戦状」にして送れば、友だちが受けて立てます。<br><span class="pmeta">これまでの戦績：${rec.w}勝${rec.l}敗</span></div>
   <button class="btn gold" id="chMake" style="width:100%">自分の楽団の挑戦状を送る<small>巡演楽団 ${G.fleet[0].length}人・楽団の力 ${uFleetPow()}</small></button>
   <div class="sec-t">受け取った挑戦状</div>
   ${a.length?a.map((D,i)=>`<div class="card chc"><div style="display:flex;gap:8px;align-items:center">${ptEra(D.p,D.sc,44)}<div style="flex:1"><b>${D.o}</b>${D.n?`<span class="pmeta">（${D.n}）</span>`:''}<br><span class="pmeta">${U_ERA[D.sc]||''}・${D.m.length}人・楽団の力 ${D.pw}${D.res?`・戦績 ${D.res}`:''}</span></div></div>
     <div class="chm">${D.m.map(x=>`<span>${ptEra(x[0],x[2],26)}<small>${x[1]} Lv${x[3]}</small></span>`).join('')}</div>
     <div style="display:flex;gap:6px;margin-top:4px"><button class="btn crim" data-chf="${i}" style="flex:2">受けて立つ</button><button class="btn" data-chd="${i}" style="flex:1">消す</button></div></div>`).join(''):'<div class="card pmeta">まだありません。友だちから届いた挑戦状のリンクを開くか、下の欄に貼りつけてください。</div>'}
   <div class="card"><textarea id="chIn" placeholder="挑戦状のリンクや文をここに貼りつけ" style="width:100%;height:56px"></textarea><button class="btn" id="chRd" style="width:100%;margin-top:4px">読み込む</button></div>`;
}
const _bindSortieX=bindSortie;
bindSortie=function(){_bindSortieX();
  const mk=$('#chMake');if(mk)mk.onclick=chMake;
  const rd=$('#chRd');if(rd)rd.onclick=async()=>{const v=$('#chIn').value;if(v)await chRead(v);};
  document.querySelectorAll('[data-chf]').forEach(b=>b.onclick=()=>chFight(+b.dataset.chf));
  document.querySelectorAll('[data-chd]').forEach(b=>b.onclick=()=>{const a=chList();a.splice(+b.dataset.chd,1);chSave(a);render();});
};
