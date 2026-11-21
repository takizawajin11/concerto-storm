/* =====================================================================
   名器・弓・楽器商（偽物あり）
   ===================================================================== */
const curY=()=>U_YEAR[G.sc]+Math.floor(G.month/12);
/* 既存の愛用品に区分（楽器・弓・小物）をつける */
const CAT={amati:'inst',messiah:'inst',cannone:'inst',goffriller:'inst',davidov:'inst',dragobass:'inst',harpsi:'inst',silbermann:'inst',stein:'inst',erard:'inst',pleyel:'inst',steinway:'inst',traverso:'inst',boehm:'inst',chalumeau:'inst',oehler:'inst',basset:'inst',
 baton:'inst',ivory:'inst',rollen:'inst',quill:'inst',costume:'inst'};
for(const k in UEQ)UEQ[k].cat=CAT[k]||'acc';
Object.assign(UEQ.amati,{n:'ニコロ・アマティ 1649年製',fam:1,v:3});
Object.assign(UEQ.messiah,{n:'ストラディヴァリウス 1716年製「メシア」',fam:1,v:5,tech:2,expr:4});
Object.assign(UEQ.cannone,{n:'グァルネリ・デル・ジェズ 1743年製「イル・カノーネ」',fam:1,v:5,tech:4,expr:2,own:['paganini','sivori']});
Object.assign(UEQ.davidov,{n:'ストラディヴァリウス 1712年製チェロ「ダヴィドフ」',fam:1,v:5,own:['davydov']});
Object.assign(UEQ.goffriller,{fam:1,v:3});Object.assign(UEQ.dragobass,{fam:1,v:4,own:['dragonetti']});
Object.assign(UEQ,{
 /* ヴァイオリン */
 stainer:{n:'ヤーコプ・シュタイナー 1668年製',t:['vn'],cat:'inst',fam:1,tech:1,expr:3,r:4,y:1668,v:4,stainer:1,h:'チロルの名工。18世紀にはストラディヴァリより高値で取引され、バッハもシュタイナーを持っていたと伝わる。'},
 str_new:{n:'ストラディヴァリの新作ヴァイオリン',t:['vn'],cat:'inst',tech:2,expr:2,r:4,y:1690,yz:1737,v:3,h:'クレモナの工房で、老ストラディヴァリがいまも新作を仕上げている。当時はまだ「現役の名工の楽器」だった。'},
 str_lipinski:{n:'ストラディヴァリウス 1715年製「リピンスキ」',t:['vn'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1715,v:5,own:['tartini','lipinski'],h:'タルティーニが弾き、その弟子筋を経てリピンスキの手に渡ったと伝わる名器。'},
 str_viotti:{n:'ストラディヴァリウス 1709年製「ヴィオッティ」',t:['vn'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1709,v:5,own:['viotti'],h:'近代ヴァイオリン奏法の父ヴィオッティが愛した一挺。'},
 str_dolphin:{n:'ストラディヴァリウス 1714年製「ドルフィン」',t:['vn'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1714,v:5,h:'イルカのように輝くニスから名づけられた。のちにハイフェッツが愛用した。'},
 str_joachim:{n:'ストラディヴァリウス 1714年製「ヨアヒム」',t:['vn'],cat:'inst',fam:1,tech:2,expr:4,r:5,y:1714,v:5,own:['joachim'],h:'ヨアヒムが弾いた一挺。'},
 str_sarasate:{n:'ストラディヴァリウス 1724年製「サラサーテ」',t:['vn'],cat:'inst',fam:1,tech:4,expr:2,r:5,y:1724,v:5,own:['sarasate'],h:'サラサーテが遺言でパリ音楽院に遺した。いまもパリの楽器博物館にある。'},
 str_gibson:{n:'ストラディヴァリウス 1713年製「ギブソン」',t:['vn'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1713,v:5,own:['huberman'],h:'フーベルマンの愛器。のちに二度盗まれ、半世紀ものあいだ行方不明になった。'},
 str_kreutzer:{n:'ストラディヴァリウス 1731年製「クロイツェル」',t:['vn'],cat:'inst',fam:1,tech:3,expr:2,r:5,y:1731,v:5,own:['rkreutzer'],h:'R.クロイツェルが弾いたと伝わる晩年のストラディヴァリ。'},
 str_lady:{n:'ストラディヴァリウス 1721年製「レディ・ブラント」',t:['vn'],cat:'inst',fam:1,tech:2,expr:4,r:5,y:1721,v:5,h:'ほとんど弾かれず、作られたときの姿をとどめる一挺。'},
 gdg_vieuxtemps:{n:'グァルネリ・デル・ジェズ 1741年製「ヴュータン」',t:['vn'],cat:'inst',fam:1,tech:3,expr:4,r:5,y:1741,v:5,own:['vieuxtemps'],h:'ヴュータンが愛した、デル・ジェズ最高傑作のひとつ。'},
 gdg_ysaye:{n:'グァルネリ・デル・ジェズ 1740年製「イザイ」',t:['vn'],cat:'inst',fam:1,tech:3,expr:4,r:5,y:1740,v:5,own:['ysaye'],h:'イザイの愛器。のちにアイザック・スターンが弾いた。'},
 gdg_beriot:{n:'グァルネリ・デル・ジェズ 1744年製「ド・ベリオ」',t:['vn'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1744,v:5,own:['beriot'],h:'デル・ジェズ最晩年の一挺。'},
 gdg_kreisler:{n:'グァルネリ・デル・ジェズ 1733年製「クライスラー」',t:['vn'],cat:'inst',fam:1,tech:2,expr:4,r:5,y:1733,v:5,own:['kreisler'],h:'クライスラーが弾き、のちにアメリカ議会図書館に寄贈した。'},
 bergonzi:{n:'カルロ・ベルゴンツィ 1730年代',t:['vn'],cat:'inst',fam:1,tech:2,expr:3,r:4,y:1730,v:4,h:'ストラディヴァリの工房に近いところで腕を磨いたクレモナの名工。'},
 guadagnini:{n:'G.B.グァダニーニ 1750年代',t:['vn'],cat:'inst',fam:1,tech:2,expr:2,r:4,y:1750,v:4,h:'各地を渡り歩いた名工。力強い音で人気が高い。'},
 gasparo:{n:'ガスパロ・ダ・サロのヴァイオリン 1570年代',t:['vn'],cat:'inst',fam:1,tech:1,expr:3,r:3,y:1570,v:3,own:['olebull'],h:'ブレシア派の祖の作。オーレ・ブルが彫刻入りの一挺を愛用した。'},
 vuillaume:{n:'J.B.ヴィヨーム（名器の写し）',t:['vn'],cat:'inst',tech:2,expr:2,r:3,y:1830,v:3,h:'パリの名工にして大楽器商。ストラディヴァリの見事な写しを作り、本物と見分けがつかないほどだった。'},
 /* チェロ */
 str_duport:{n:'ストラディヴァリウス 1711年製チェロ「デュポール」',t:['vc'],cat:'inst',fam:1,tech:3,expr:3,r:5,y:1711,v:5,own:['duport'],h:'ナポレオンが試しに弾こうとして、靴の拍車で傷をつけたと伝わる。'},
 montagnana:{n:'ドメニコ・モンタニャーナのチェロ',t:['vc'],cat:'inst',fam:1,tech:2,expr:3,r:4,y:1730,v:4,h:'「ヴェネツィアの獅子」と呼ばれた名工。太く豊かな音。'},
 /* 弓 */
 bow_baroque:{n:'バロック弓（コレッリ型）',t:['vn','vc','cb'],cat:'bow',tech:1,r:1,y:1600,yz:1800,v:1,h:'外に反った軽い弓。歌うような短い音に向く。'},
 bow_cramer:{n:'クラーマー型の弓',t:['vn','vc'],cat:'bow',tech:1,expr:1,r:2,y:1770,yz:1830,v:2,own:['wcramer'],h:'ロンドンのクラーマーが好んだ過渡期の弓。近代の弓への橋渡しとなった。'},
 bow_dodd:{n:'ジョン・ドッドの弓',t:['vn','vc'],cat:'bow',tech:1,expr:1,r:3,y:1780,v:3,h:'「イギリスのトゥルテ」と呼ばれた弓職人の作。'},
 bow_tourte:{n:'フランソワ・トゥルテの弓',t:['vn','vc'],cat:'bow',fam:1,tech:2,expr:3,r:5,y:1785,v:5,h:'近代の弓の形を完成させた「弓のストラディヴァリ」。フェルナンブーコ材と内側への反りが、長く力強い音を生んだ。'},
 bow_peccatte:{n:'ドミニク・ペカットの弓',t:['vn','vc'],cat:'bow',fam:1,tech:2,expr:2,r:4,y:1826,v:4,h:'ヴィヨームの工房で腕を磨いた名弓職人。'},
 bow_kittel:{n:'ニコラウス・キッテルの弓',t:['vn','vc'],cat:'bow',fam:1,tech:3,expr:1,r:4,y:1840,v:4,h:'ペテルブルクの名弓職人。「ロシアのトゥルテ」と呼ばれる。'},
 bow_voirin:{n:'フランソワ・ニコラ・ヴォワランの弓',t:['vn','vc'],cat:'bow',tech:1,expr:2,r:4,y:1870,v:4,h:'細身でしなやかな、新しい時代の弓。'},
 bow_sartory:{n:'ウジェーヌ・サルトリーの弓',t:['vn','vc'],cat:'bow',tech:2,expr:1,r:4,y:1890,v:4,h:'力強い弓で、20世紀の大ヴァイオリニストたちに愛された。'},
 bow_plain:{n:'ふつうの弓',t:['vn','vc','cb'],cat:'bow',tech:1,r:1,y:1600,v:1,h:'工房で買える、ありふれた弓。'},
 /* 鍵盤 */
 broadwood:{n:'ブロードウッドのピアノ',t:['pf'],cat:'inst',tech:1,expr:2,r:3,y:1790,v:3,h:'ロンドンの名門。1818年、ベートーヴェンに一台が贈られた。'},
 graf:{n:'コンラート・グラーフのピアノ',t:['pf'],cat:'inst',tech:1,expr:2,r:3,y:1804,v:3,h:'ウィーンの名工。ベートーヴェン晩年のピアノや、シューマンがクララに贈ったピアノで知られる。'},
 bosendorfer:{n:'ベーゼンドルファー',t:['pf'],cat:'inst',tech:1,expr:3,r:4,y:1828,v:4,h:'1828年創業のウィーンの名門。リストの猛烈な演奏にも壊れなかったことで名をあげた。'},
 bechstein:{n:'ベヒシュタイン',t:['pf'],cat:'inst',tech:3,expr:1,r:4,y:1853,v:4,h:'1853年創業のベルリンの名門。ビューローやリストが愛用した。'}
});
for(const k of ['stein','erard','pleyel','steinway'])UEQ[k].v=4;
for(const k in UEQ)if(UEQ_H&&UEQ_H[k]&&!UEQ[k].h)UEQ[k].h=UEQ_H[k];
Object.assign(UEQ.cannone,{h:UEQ_H.cannone});

/* ---- 能力：偽物は鳴らない／本来の持ち主は+2 ---- */
eqStat=function(e,k,id){const q=UEQ[e.id];if(e.fake)return k==='def'?0:(k==='tech'?1:0);let v=q[k]||0;
  if(q.own&&id&&k!=='def'&&q.own.includes(realId(id))&&(k==='tech'||k==='expr'))v+=1;return v;};
eqName=function(e){return(e.fake&&e.known?'（偽）':'')+UEQ[e.id].n;};

/* ---- 値段：古いイタリアの名器は時代とともに高騰する ---- */
function eqPrice(id){
  const q=UEQ[id],y=curY();const base={1:60,2:180,3:550,4:1400,5:3200}[q.r]||300;
  let f=1;const old=q.cat!=='acc'&&q.y<1760&&q.t.some(t=>['vn','vc','cb'].includes(t));
  if(q.stainer)f=y<1800?1.4:y<1850?.9:.7;else if(old)f=y<1760?.25:y<1800?.45:y<1850?1:y<1890?1.8:2.6;
  if(q.cat==='bow'&&q.fam)f*=y<1850?.7:y<1890?1.1:1.5;
  return Math.round(base*f/10)*10;
}
const ownedIds=()=>new Set(G.ueq.filter(e=>!e.fake).map(e=>e.id));

/* ---- 楽器商 ---- */
const DEALERS={
 vuillaume:{n:'J.B.ヴィヨーム（パリ）',fake:0,cert:1,mark:1,pitch:'クレモナの名器はすべて、わたしが鑑定書をつけてお渡しします。',ok:()=>P().city==='paris'&&curY()>=1828&&curY()<=1875},
 hill:{n:'W.E.ヒル＆サンズ（ロンドン）',fake:0,cert:1,mark:1.1,pitch:'ヒル商会の鑑定書があれば、どこへ行っても通用いたします。',ok:()=>P().city==='london'&&curY()>=1880},
 tarisio:{n:'行商人ルイジ・タリシオ',fake:.1,mark:.7,pitch:'イタリアの屋根裏で見つけてきた掘り出し物でさあ。',ok:()=>['milan','paris','venice','naples'].includes(P().city)&&curY()>=1820&&curY()<=1854},
 town:{n:'町の楽器商',fake:.2,mark:1,pitch:'うちは堅実な商売が売りです。',ok:()=>true},
 falsoni:{n:'怪しげな楽器商ファルソーニ',fake:.55,mark:.6,shady:1,pitch:'旦那、こいつは正真正銘のストラディヴァリですぜ。今日だけ、この値段で。',ok:()=>true}
};
function dealerOffers(){
  G.dealer=G.dealer||{};const key=`${G.month}|${P().city}`;if(G.dealer.key===key)return G.dealer;
  const h=hashS(key);const avail=Object.keys(DEALERS).filter(k=>DEALERS[k].ok());
  const named=avail.filter(k=>!['town','falsoni'].includes(k));
  const dk=named.length&&h%3!==0?named[h%named.length]:(h%5<2?'falsoni':'town');const D=DEALERS[dk];
  const y=curY(),own=ownedIds();
  const pool=Object.keys(UEQ).filter(k=>{const q=UEQ[k];return q.cat!=='acc'&&q.y<=y&&(!q.yz||y<=q.yz)&&!(q.fam&&own.has(k))&&(q.r>=3||dk==='town');});
  const items=[];const used=new Set();
  for(let i=0;i<5&&pool.length;i++){let k=pool[(h*(i+3)+i*17)%pool.length];let n=0;while(used.has(k)&&n++<20)k=pool[(h+i*31+n*7)%pool.length];if(used.has(k))continue;used.add(k);
    const q=UEQ[k];const fake=q.r>=4&&Math.random()<D.fake;const price=Math.round(eqPrice(k)*D.mark*(D.shady?(.5+Math.random()*.2):1)/10)*10;
    items.push({id:k,price,fake,sold:0});}
  G.dealer={key,dk,items};return G.dealer;
}
function dealerScreen(){
  const d=dealerOffers(),D=DEALERS[d.dk];
  $('#scene').innerHTML=`<div class="sc"><h3>${D.n}</h3><div class="subt">${ci(P().city).name}・${curY()}年ごろ</div>
   <div class="bubble" style="margin:8px 0">「${D.pitch}」</div>
   <div class="card pmeta">${D.cert?'この店の品には鑑定書がつく（本物が保証される）。':D.shady?'<b style="color:#e88">相場よりずいぶん安い。うまい話には裏があるかもしれない。</b>':'本物かどうかは、鑑定してみるまでわからない。'}　所持金 ${fmt(P().money)}fr</div>
   ${d.items.map((it,i)=>{const q=UEQ[it.id];return`<div class="card" style="font-size:12.5px"><b>${q.n}</b>　<span style="color:${U_RCOL[q.r-1]}">${'★'.repeat(q.r)}</span><br><span class="pmeta">${{inst:'楽器',bow:'弓'}[q.cat]||'小物'}・${ueqTxt(it.id)}</span>${q.h?`<br><span class="pmeta">${q.h}</span>`:''}
     <br><button class="btn ${it.sold?'':'gold'}" data-buy="${i}" style="width:100%;margin-top:4px" ${it.sold||P().money<it.price?'disabled':''}>${it.sold?'売約済み':`買う　${fmt(it.price)}fr`}</button></div>`;}).join('')}
   <button class="btn" id="dlBack" style="width:100%;margin-top:6px">店を出る</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const it=d.items[+b.dataset.buy];if(it.sold||P().money<it.price)return;
    P().money-=it.price;it.sold=1;const e=newUEq(it.id);e.fake=it.fake;e.known=!!D.cert;e.cert=!!D.cert;e.from=D.n;e.paid=it.price;
    addLog(`${D.n}から${UEQ[it.id].n}を${fmt(it.price)}frで買った。`);if(UEQ[it.id].r>=5&&!it.fake)hpush(`名器「${UEQ[it.id].n}」を手に入れた`);save();
    modal('お買い上げ',`<b>${UEQ[it.id].n}</b>を手に入れた。${D.cert?'<br>鑑定書つき。':'<br>本物かどうかは、まだわからない……。'}<br><span class="pmeta">稽古場の楽団員の詳細から、楽器や弓の枠に持たせられます。</span>`,[{t:'店に戻る',f(){dealerScreen();}}]);});
  $('#dlBack').onclick=()=>{closeScene();render();};
}
/* ---- 鑑定と売却（倉庫） ---- */
function appraiser(){const y=curY(),c=P().city;if(c==='paris'&&y>=1828&&y<=1875)return{n:'ヴィヨーム',fee:150};if(c==='london'&&y>=1880)return{n:'ヒル商会',fee:200};return{n:'老練な弦楽器職人',fee:120};}
function storeScreen(){
  const ap=appraiser();const who=e=>{const w=Object.keys(G.ux).find(id=>(id==='you'||G.members.includes(id))&&G.ux[id].eq.includes(e.uid));return w?nameOf(w):'';};
  $('#scene').innerHTML=`<div class="sc"><h3>楽器の倉庫</h3><div class="subt">${G.ueq.length}点</div>
   <div class="card pmeta">鑑定：${ap.n}（1点 ${ap.fee}fr）。鑑定書のない名器は、偽物かもしれない。</div>
   ${G.ueq.map((e,i)=>{const q=UEQ[e.id];const val=e.fake&&e.known?20:Math.round(eqPrice(e.id)*.6/10)*10;
     return`<div class="card" style="font-size:12.5px"><b>${eqName(e)}</b> <span style="color:${U_RCOL[(q.r||1)-1]}">${'★'.repeat(q.r||1)}</span>${e.cert?' <span class="kai" style="background:#3a6a3a">鑑定書</span>':''}${who(e)?` <span class="pmeta">・${who(e)}が使用中</span>`:''}
      <br><span class="pmeta">${ueqTxt(e.id)}${e.from?`・${e.from}から購入`:''}</span>
      <div class="sec2" style="margin-top:4px">${!e.cert&&!e.known&&q.r>=3?`<button class="btn" data-ap="${i}" ${P().money<ap.fee?'disabled':''}>鑑定する</button>`:''}<button class="btn" data-sell="${i}" ${who(e)?'disabled':''}>売る（${fmt(val)}fr）</button></div></div>`;}).join('')||'<div class="card pmeta">まだ何もない</div>'}
   <button class="btn" id="stBack" style="width:100%;margin-top:6px">戻る</button></div>`;
  $('#scene').classList.remove('hidden');
  document.querySelectorAll('[data-ap]').forEach(b=>b.onclick=()=>{const e=G.ueq[+b.dataset.ap];P().money-=ap.fee;
    if(e.fake){e.known=1;addLog(`${ap.n}の鑑定で、${UEQ[e.id].n}は偽物と判明した。`);hpush(`「${UEQ[e.id].n}」が偽物と判明`);
      modal('鑑定の結果',`${ap.n}は裏板の内側を覗きこみ、首を横に振った。<br><br>「ラベルだけは本物そっくりですな。ですが、これは${pick(['ミルクールの量産品','ザクセンの工房の安物','ラベルを貼り替えただけの無名の楽器'])}です」<br><br><b>偽物だった……</b>${e.from?`<br><span class="pmeta">${e.from}につかまされた。</span>`:''}`,[{t:'戻る',f(){storeScreen();}}]);}
    else{e.cert=1;e.known=1;addLog(`${UEQ[e.id].n}は本物と鑑定された。`);modal('鑑定の結果',`${ap.n}「間違いありません。<b>本物</b>です。鑑定書をお付けしましょう」`,[{t:'戻る',f(){storeScreen();}}]);}
    save();});
  document.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>{const e=G.ueq[+b.dataset.sell];const val=e.fake&&e.known?20:Math.round(eqPrice(e.id)*.6/10)*10;
    modal('売る',`${eqName(e)}を${fmt(val)}frで手放します。`,[{t:'売る',cls:'crim',f(){P().money+=val;G.ueq=G.ueq.filter(x=>x.uid!==e.uid);addLog(`${eqName(e)}を${fmt(val)}frで売った。`);save();storeScreen();}},{t:'やめる',f(){storeScreen();}}]);});
  $('#stBack').onclick=()=>{closeScene();render();};
}
/* ---- 偽物は、弾いているうちにばれる ---- */
const _memberMonthlyI=memberMonthly;
memberMonthly=function(){
  _memberMonthlyI();if(!G.ueq)return;
  for(const id of ['you'].concat(G.members)){const u=G.ux&&G.ux[id];if(!u)continue;for(const q of u.eq){const e=q&&G.ueq.find(x=>x.uid===q);if(e&&e.fake&&!e.known&&Math.random()<.25){e.known=1;
    addLog(`${nameOf(id)}が弾いていた${UEQ[e.id].n}は、偽物だった。`);hpush(`「${UEQ[e.id].n}」が偽物と判明`);
    modal('どうも鳴らない……',`${portraitRow(realId(id))}${nameOf(id)}が首をかしげている。<br>「この楽器、いくら弾いても音が伸びないんです」<br><br>f字孔から覗くと、ラベルの紙だけが新しい。<b>${UEQ[e.id].n}は偽物だった！</b>${e.from?`<br><span class="pmeta">${e.from}につかまされた。</span>`:''}`,null,'paper');return;}}}
};
/* ---- 主人公の愛器（史実） ---- */
const HERO_INST={paganini:'cannone',liszt:'erard',mozart:'stein',handel:'harpsi',bach:'harpsi'};
const _newGameI=newGame;
newGame=function(sc,pid,diff){_newGameI(sc,pid,diff);ensU();const k=HERO_INST[pid];if(k&&UEQ[k]&&UEQ[k].y<=U_YEAR[sc]){const e=newUEq(k);e.cert=1;e.known=1;ux('you').eq[0]=e.uid;}
  if(['paganini'].includes(pid)){const b=newUEq(U_YEAR[sc]>=1785?'bow_dodd':'bow_baroque');b.cert=1;ux('you').eq[1]=b.uid;}};
/* ---- 旅の途中の怪しい行商人 ---- */
UTRIP.push({n:'街道の行商人',d:'宿の前で、行商人が古いヴァイオリンケースを開いた。「ストラディヴァリですよ。この値段なら、今だけです」',c:[
 {t:'買う<small>相場の3分の1。本物なら大儲け</small>',dis:()=>P().money<400,f(){const pool=Object.keys(UEQ).filter(k=>UEQ[k].fam&&UEQ[k].r>=4&&UEQ[k].cat==='inst'&&UEQ[k].t.includes('vn')&&UEQ[k].y<=curY());const k=pick(pool);const pr=Math.max(400,Math.round(eqPrice(k)/3/10)*10);
   if(P().money<pr)return'手持ちが足りなかった。';P().money-=pr;const e=newUEq(k);e.fake=Math.random()<.8;e.from='街道の行商人';e.paid=pr;return`${fmt(pr)}frで「${UEQ[k].n}」を手に入れた。……本物だろうか？`;}},
 {t:'相手にしない',f(){return'行商人は舌打ちして、次の客を探しに行った。';}}]});
/* ---- 稽古場に「楽器商」 ---- */
const _fleetHTMLI=fleetHTML;
fleetHTML=function(){const d=dealerOffers();return _fleetHTMLI().replace('<button class="btn" id="uStore">',`<button class="btn gold" id="uDeal">楽器商を訪ねる<small>${DEALERS[d.dk].n}・名器と弓（毎月入れ替わり）</small></button><button class="btn" id="uStore">`);};
const _bindFleetI=bindFleet;
bindFleet=function(){_bindFleetI();const a=$('#uDeal');if(a)a.onclick=dealerScreen;const s=$('#uStore');if(s)s.onclick=storeScreen;};
