/* =====================================================================
   統合版：旅・説得・対決・演奏会 ＋ 楽団の育成・巡演・派遣公演・愛用品
   ===================================================================== */
const U_LEG=['bach','mozart','beethoven','paganini','liszt','liszt76','chopin','wagner','brahms','handel','mahler','haydn','farinelli','vivaldi','verdi','debussy','rstrauss','tchaikovsky','caruso','stravinsky','rachmaninoff'];
const U_ERA={s1723:'バロック',s1781:'古典派',s1832:'ロマン派',s1876:'後期ロマン派',s1905:'新世紀'};
const U_YEAR={s1723:1723,s1781:1781,s1832:1832,s1876:1876,s1905:1905};
const U_RCOL=['#9a7b5a','#b8b8c8','#e6c56f','#9fd0c7','#e9a0f0'];
const U_TN={cond:'指揮',comp:'作曲',vn:'ヴァイオリン',pf:'鍵盤',voice:'歌',vc:'チェロ',cb:'コントラバス',fl:'フルート',cl:'クラリネット'};
const U_TI={cond:'🎼',comp:'✒',vn:'🎻',pf:'🎹',voice:'🎤',vc:'🎻',cb:'🎻',fl:'🎶',cl:'🎷'};

/* ---- 愛用品（年代つき：その時代に存在する楽器だけが作れる） ---- */
const UEQ={
 amati:{n:'アマティのヴァイオリン',t:['vn'],expr:2,r:3,y:1600},messiah:{n:'ストラディヴァリウス「メシア」',t:['vn'],tech:2,expr:3,r:5,y:1716},cannone:{n:'グァルネリ「イル・カノーネ」',t:['vn'],tech:4,r:5,y:1743},
 goffriller:{n:'ゴフリラーのチェロ',t:['vc'],expr:2,r:3,y:1700},davidov:{n:'ストラディヴァリウス「ダヴィドフ」',t:['vc'],expr:3,tech:1,r:5,y:1712},dragobass:{n:'ガスパロ・ダ・サロのコントラバス',t:['cb'],tech:3,r:4,y:1600},
 harpsi:{n:'リュッカースのチェンバロ',t:['pf'],expr:2,r:3,y:1600,yz:1800},silbermann:{n:'ジルバーマンのオルガン',t:['pf','comp'],impro:3,r:4,y:1710},
 stein:{n:'シュタインのフォルテピアノ',t:['pf'],expr:2,tech:1,r:4,y:1777},erard:{n:'エラール・ピアノ（ダブル・エスケープメント）',t:['pf'],tech:3,r:4,y:1821},pleyel:{n:'プレイエル・ピアノ',t:['pf'],expr:3,r:4,y:1830},steinway:{n:'スタインウェイ D-274',t:['pf'],tech:3,expr:2,r:5,y:1884},
 traverso:{n:'クヴァンツ型フラウト・トラヴェルソ',t:['fl'],expr:2,r:3,y:1700,yz:1840},boehm:{n:'ベーム式フルート',t:['fl'],tech:3,r:4,y:1847},
 chalumeau:{n:'デンナーのシャリュモー',t:['cl'],expr:1,r:2,y:1700,yz:1790},oehler:{n:'エーラー式クラリネット',t:['cl'],expr:3,r:4,y:1900},basset:{n:'バセット・クラリネット',t:['cl'],expr:2,tech:1,r:4,y:1788},
 baton:{n:'白い指揮棒（メンデルスゾーン型）',t:['cond'],tech:2,r:3,y:1820},ivory:{n:'象牙の指揮棒',t:['cond'],tech:1,expr:1,impro:1,r:4,y:1840},rollen:{n:'拍子取りの巻紙（ロール）',t:['cond'],tech:1,r:2,y:1600,yz:1830},
 quill:{n:'作曲用の羽ペン',t:['comp'],impro:2,r:2,y:1600},firsted:{n:'初版の楽譜',t:['*'],impro:1,r:2,y:1600},metronome:{n:'メルツェルのメトロノーム',t:['*'],tech:2,r:3,y:1815},
 rosin:{n:'上質の松脂',t:['vn','vc','cb'],tech:1,r:1,y:1600},honey:{n:'蜂蜜の喉飴',t:['voice'],expr:1,def:2,r:1,y:1600},costume:{n:'豪華な舞台衣装',t:['voice'],expr:3,r:3,y:1600},
 tails:{n:'仕立ての良い燕尾服',t:['*'],def:2,r:1,y:1780},wig:{n:'上等の鬘',t:['*'],def:2,r:1,y:1600,yz:1800},gramophone:{n:'グラモフォン（蓄音機）',t:['*'],expr:1,impro:1,r:3,y:1895}
};
const ueqPool=()=>Object.keys(UEQ).filter(k=>{const e=UEQ[k],y=U_YEAR[G.sc];return !e.fam&&e.y<=y&&(!e.yz||y<=e.yz);});

/* ---- 史実の縁（史実の仲間でそろえると発動） ---- */
const USETS=[
 {n:'ウィーン古典派',ids:['haydn','mozart','beethoven'],need:2,v:.12},
 {n:'パリのロマン派',ids:['chopin','liszt','berlioz','franchomme','baillot','habeneck'],need:3,v:.12},
 {n:'シューマン家の食卓',ids:['schumann','clara','clara76','brahms','joachim'],need:2,v:.12},
 {n:'ベルカントの夕べ',ids:['bellini','pasta','malibran','donizetti','rossini'],need:2,v:.1},
 {n:'バイロイトの騎士団',ids:['wagner','richter','lehmann','bulow'],need:2,v:.12},
 {n:'ヘンデル一座',ids:['handel','senesino','cuzzoni','faustina'],need:2,v:.12},
 {n:'ドレスデン宮廷楽団',ids:['pisendel','zelenka','quantz','buffardin','heinichen'],need:3,v:.12},
 {n:'マンハイムの将軍たち',ids:['cannabich','wendling','stadler'],need:2,v:.1},
 {n:'ロシアの魂',ids:['tchaikovsky','davydov','rachmaninoff','scriabin','koussevitzky','stravinsky','glinka'],need:2,v:.12},
 {n:'フランス近代の響き',ids:['debussy','ravel','faure','satie','dukas','nboulanger','long','cortot','thibaud','casals'],need:3,v:.12},
 {n:'マーラーの楽団',ids:['mahler','walter','schoenberg'],need:2,v:.12},
 {n:'ヴェルサイユの栄光',ids:['couperin','marais','lalande','campra','rameau','blavet','leclair'],need:3,v:.12},
 {n:'パリ音楽院の重鎮',ids:['franck','widor','dindy','saintsaens','faure76','massenet'],need:3,v:.1},
 {n:'力強い仲間（ロシア五人組）',ids:['mussorgsky','rimsky','borodin'],need:2,v:.12},
 {n:'モスクワ音楽院の師弟',ids:['nrubinstein','tchaikovsky','taneyev76','taneyev','rachmaninoff','scriabin','medtner'],need:2,v:.12},
 {n:'ペテルブルク音楽院',ids:['arubinstein','auer','auer05','essipova','rimsky05','glazunov','stravinsky'],need:2,v:.1},
 {n:'ボヘミアの響き',ids:['smetana','dvorak','suk','kubelik','janacek','cernohorsky','vanhal','kozeluch','fdusek','duschek','tomasek','zelenka'],need:2,v:.12},
 {n:'マジャールの魂',ids:['erkel','liszt76','hubay','dohnanyi','bartok','kodaly','joachim','auer'],need:2,v:.12},
 {n:'ワルシャワの青春',ids:['chopin','elsner','kurpinski','lipinski'],need:2,v:.12},
 {n:'時を越えた共演',ids:[],need:2,v:.1,guest:1}
];

/* ---- 派遣公演（月単位） ---- */
const UEXP=[
 {id:1,n:'貴族の夜会で演奏',m:1,req:{num:2},rew:{fr:300}},
 {id:2,n:'教会のミサ',m:1,req:{num:2,types:['cond','comp','pf']},rew:{fr:220,xp:15}},
 {id:3,n:'写譜と編曲の仕事',m:2,req:{num:2,types:['comp']},rew:{fr:650}},
 {id:4,n:'弦楽四重奏の地方巡業',m:2,req:{num:4,types:['vn','vc']},rew:{fr:1000,xp:20}},
 {id:5,n:'軍楽隊の指導',m:2,req:{num:3,types:['fl','cl']},rew:{fr:800,xp:25}},
 {id:6,n:'ロンドン出稼ぎ興行',m:3,req:{num:5,lvsum:40},rew:{fr:2200,xp:50}},
 {id:7,n:'ペテルブルク宮廷への長期招聘',m:4,req:{num:6,lvsum:100},rew:{fr:5200,xp:120,eq:1}}
];

/* ---- 戦闘の舞台と敵 ---- */
const UNT={サロン:{w:[.2,.6,.2],fit:{pf:1.2,voice:1.2,vn:1.1}},協奏:{w:[.5,.3,.2],fit:{pf:1.25,vn:1.25,vc:1.15}},オペラ:{w:[.2,.6,.2],fit:{voice:1.35,cond:1.2,comp:1.1}},
 交響:{w:[.35,.4,.25],fit:{cond:1.3,vn:1.1,vc:1.1,cb:1.15,fl:1.1,cl:1.1}},即興:{w:[.2,.2,.6],fit:{pf:1.25,comp:1.25}},対決:{w:[.4,.3,.3],fit:{}}};
const UENT={noble:{n:'退屈した貴族',hp:30,atk:7,def:1,line:'あくび'},heckler:{n:'野次馬',hp:26,atk:9,def:0,line:'野次'},critic:{n:'辛口の批評家',hp:44,atk:12,def:4,line:'辛辣な批評'}};
const USTY=[{n:'正統派',a:1,d:1,ev:0},{n:'名人芸',a:1.2,d:.8,ev:0},{n:'室内楽',a:.9,d:1.25,ev:.1}];
const UATK={vn:'超絶技巧の連打',pf:'怒涛のオクターヴ',voice:'天上のアリア',cond:'渾身のタクト',comp:'新作の主題',cb:'低音の轟き',fl:'鳥のさえずり',cl:'甘い音色',vc:'朗々たるカンティレーナ'};

/* ---- 喝采の段階 ---- */
const URANK={S:'熱狂',A:'大喝采',B:'喝采',C:'まばらな拍手',D:'冷ややか'};
/* ---- 史実の縁のいわれ ---- */
const USET_T={
 'ウィーン古典派':'ハイドンはモーツァルトの父に「ご子息は最大の作曲家」と語り、若きベートーヴェンはハイドンに師事した。',
 'パリのロマン派':'ショパンとリストは1830年代のパリで互いの演奏会に立ち、フランコムはショパン最良の室内楽仲間だった。',
 'シューマン家の食卓':'1853年、20歳のブラームスがシューマン家の扉を叩いた。ローベルトは評論で彼を世に紹介した。',
 'ベルカントの夕べ':'ベッリーニの『夢遊病の女』はパスタのために、マリブランはその役で一世を風靡した。',
 'バイロイトの騎士団':'1876年、第1回バイロイト音楽祭。『指環』初演の指揮台にはハンス・リヒターが立った。',
 'ヘンデル一座':'セネジーノとクッツォーニ、そしてファウスティーナ。ロンドンのイタリア・オペラは歌手の火花で燃えた。',
 'ドレスデン宮廷楽団':'ピゼンデルが率いたドレスデン宮廷楽団は、当時ヨーロッパ随一とうたわれた。',
 'マンハイムの将軍たち':'マンハイムの楽団を、ある英国人は「将軍たちの軍隊」と評した。',
 'ロシアの魂':'チャイコフスキーからラフマニノフへ。ロシアの旋律が西欧の舞台を席巻した。',
 'フランス近代の響き':'国民音楽協会のもと、フランスの作曲家たちはドイツとは違う響きを求めた。',
 'マーラーの楽団':'ワルターはマーラーの弟子で右腕。シェーンベルクの才能を真っ先に認めたのもマーラーだった。',
 'ヴェルサイユの栄光':'ルイ14世以来の宮廷音楽。クープランとマレの響きは、王の権威そのものだった。',
 'パリ音楽院の重鎮':'フランクのオルガン教室からダンディやデュカスが巣立ち、フランス音楽の背骨をつくった。',
 '力強い仲間（ロシア五人組）':'独学の作曲家たちが集まり、西欧の作法にとらわれないロシアの音楽をつくろうとした。',
 'モスクワ音楽院の師弟':'ルビンシテインが創り、チャイコフスキーが教え、タネーエフからラフマニノフとスクリャービンへ。',
 'ペテルブルク音楽院':'A.ルビンシテインが1862年に創った、ロシア最初の音楽院。',
 'ボヘミアの響き':'「ヨーロッパの音楽学校」と呼ばれたボヘミアは、各地の宮廷に名手を送り出した。',
 'マジャールの魂':'リストからエルケル、フバイ、そしてバルトークとコダーイへ。ハンガリーの響きは受け継がれた。',
 'ワルシャワの青春':'エルスネルに学び、クルピンスキの棒で弾いた若きショパンは、20歳でワルシャワを去った。',
 '時を越えた共演':'本来なら出会うはずのない音楽家どうしが、同じ舞台で音を重ねる。'
};
USETS.forEach(x=>x.t=USET_T[x.n]);
/* ---- 愛用品の来歴 ---- */
const UEQ_H={
 amati:'クレモナのアマティ一族はヴァイオリン製作の祖。のちの名工たちもその流れをくむ。',
 messiah:'1716年製。ほとんど弾かれないまま保存され、今も新品同様の姿を伝える。',
 cannone:'パガニーニの愛器。轟く音から「大砲」と呼ばれ、遺言で故郷ジェノヴァに遺された。',
 goffriller:'ヴェネツィアの名工ゴフリラー。チェロの名器で知られる。',
 davidov:'1712年製。ロシアの名手ダヴィドフが弾き、のちにデュ・プレの愛器となった。',
 dragobass:'16世紀ブレシアの名工の作。コントラバスの名手ドラゴネッティが愛用した。',
 harpsi:'アントワープのリュッカース一族のチェンバロは、改造してでも使い続けられた名器。',
 silbermann:'ザクセンのジルバーマンはオルガンと鍵盤楽器の名工。バッハとも交流があった。',
 stein:'アウクスブルクのシュタイン。1777年、モーツァルトがその鍵盤を手紙で絶賛した。',
 erard:'エラール社のダブル・エスケープメントで、速い同音連打が可能になった。',
 pleyel:'ショパンは調子のよい日にはプレイエルを選んだと伝わる。',
 steinway:'1884年に登場したスタインウェイのフルコンサート・グランド。',
 traverso:'クヴァンツはフリードリヒ大王のフルートの師。自ら楽器も設計した。',
 boehm:'ベームが1847年に完成させた円筒管のフルート。今日のフルートの原型。',
 chalumeau:'クラリネットの前身。ニュルンベルクのデンナーが改良したとされる。',
 basset:'モーツァルトのクラリネット協奏曲は、シュタードラーのこの楽器のために書かれた。',
 oehler:'20世紀初めにエーラーが完成させたドイツ式クラリネット。',
 baton:'メンデルスゾーンはゲヴァントハウスで細い指揮棒を振ったとされる。',
 ivory:'19世紀、象牙の指揮棒は名指揮者への名誉の贈り物でもあった。',
 rollen:'昔は巻いた紙や杖で拍を取った。リュリは杖で足を突き、それがもとで亡くなった。',
 quill:'多くの名作は、この一本のペンから生まれた。',firsted:'初版の楽譜には、作曲者自身の意図がいちばん色濃く残る。',
 metronome:'1815年にメルツェルが特許を取った。ベートーヴェンは早くから速度表示に使った。',
 gramophone:'円盤式の蓄音機。カルーソーの録音で一気に広まった。',
 rosin:'弓の毛に塗る樹脂。良い松脂は音の立ち上がりを変える。',honey:'歌手の喉を守る昔ながらの知恵。',costume:'オペラの舞台は衣装でも競われた。',tails:'演奏会の正装。',wig:'18世紀の宮廷では、鬘なしで人前に出ることはなかった。'
};
for(const k in UEQ_H)if(UEQ[k])UEQ[k].h=UEQ_H[k];
/* ---- 実在の会場（年代つき） ---- */
const UVEN={
 paris:[['パリ・オペラ座','オペラ',1669,1999],['サル・プレイエル','サロン',1830,1999],['音楽院ホール','交響',1811,1999],['コンセール・スピリチュエル','協奏',1725,1790]],
 vienna:[['ケルントナートーア劇場','オペラ',1709,1870],['ブルク劇場','オペラ',1748,1999],['楽友協会大ホール','交響',1870,1999],['アン・デア・ウィーン劇場','協奏',1801,1999]],
 london:[['ヘイマーケット国王劇場','オペラ',1705,1999],['ハノーヴァー・スクエア・ルームズ','協奏',1775,1874],['セント・ジェームズ・ホール','交響',1858,1905],['クイーンズ・ホール','交響',1893,1999]],
 leipzig:[['ゲヴァントハウス','交響',1781,1999],['トーマス教会','即興',1600,1999],['ツィンマーマンのコーヒーハウス','サロン',1700,1750]],
 milan:[['スカラ座','オペラ',1778,1999]],venice:[['フェニーチェ劇場','オペラ',1792,1999],['ピエタ慈善院','協奏',1600,1800]],
 naples:[['サン・カルロ劇場','オペラ',1737,1999]],dresden:[['ゼンパー・オーパー','オペラ',1841,1999],['ドレスデン宮廷礼拝堂','交響',1700,1999]],
 bayreuth:[['祝祭劇場','オペラ',1876,1999]],newyork:[['カーネギー・ホール','交響',1891,1999],['メトロポリタン歌劇場','オペラ',1883,1999]],
 peter:[['マリインスキー劇場','オペラ',1860,1999],['貴族会館','交響',1840,1999],['ペテルブルク音楽院','協奏',1862,1999],['宮廷礼拝堂','オペラ',1700,1860]],berlin:[['ジングアカデミー','交響',1827,1999],['宮廷歌劇場','オペラ',1742,1999]],
 prague:[['エステート劇場','オペラ',1783,1999],['ルドルフィヌム','交響',1885,1999],['聖ヤコブ教会','即興',1600,1999]],
 warsaw:[['ワルシャワ国民劇場','オペラ',1779,1832],['ワルシャワ大劇場','オペラ',1833,1999],['ワルシャワ・フィルハーモニー','交響',1901,1999]],
 moscow:[['ボリショイ劇場','オペラ',1825,1999],['貴族会館の円柱の間','協奏',1784,1999],['モスクワ音楽院大ホール','交響',1901,1999]],hamburg:[['ゲンゼマルクト歌劇場','オペラ',1678,1738]],rome:[['アルジェンティーナ劇場','オペラ',1732,1999]],
 munich:[['宮廷歌劇場','オペラ',1818,1999]],weimar:[['ヴァイマル宮廷劇場','オペラ',1791,1999]],pest:[['ペスト・ヴィガドー','交響',1865,1999],['ハンガリー王立歌劇場','オペラ',1884,1999],['国民劇場','オペラ',1837,1999]],madrid:[['ブエン・レティーロ宮','オペラ',1640,1800]]
};
const UGEN={サロン:['夫人のサロン','銀行家の邸宅','公爵家の夜会'],協奏:['市民音楽ホール','音楽協会の大広間','舞踏会場'],オペラ:['市立劇場','宮廷劇場'],交響:['演奏協会の定期演奏会','大学の講堂'],即興:['芸術家カフェ','大聖堂のオルガン'],対決:['音楽家たちの酒場','広場の特設舞台']};
function venueOf(k,t,h){const y=U_YEAR[G.sc]+Math.floor(G.month/12);const real=(UVEN[k]||[]).filter(v=>v[1]===t&&v[2]<=y&&y<=v[3]);
  if(real.length&&h%3!==2)return real[h%real.length][0];const g=UGEN[t];return`${ci(k).name}の${g[h%g.length]}`;}
/* ---- 今夜の聴衆 ---- */
const UAUD=[
 {n:'熱狂的な学生たち',d:'即興に沸く。名人芸のスタイルが受ける',w:[1,1,1.25],sty:1},
 {n:'保守的な宮廷人',d:'型破りを嫌う。正統派が受ける',w:[1.1,1,.85],sty:0},
 {n:'耳の肥えた愛好家',d:'表現の深さを聴き分ける。室内楽が受ける',w:[.95,1.25,1],sty:2},
 {n:'騒がしい群衆',d:'野次が飛ぶ（攻勢+15%）。名人芸で黙らせたい',w:[1.15,.95,1],sty:1,ea:1.15},
 {n:'批評家が客席に',d:'手ごわいが、喝采を得れば実入りが大きい（報酬+30%）',w:[1,1.1,1],sty:0,ea:1.1,rw:1.3},
 {n:'ご婦人がた',d:'歌と甘い旋律が好まれる',w:[.9,1.2,1],sty:2,fit:{voice:1.15,pf:1.1}}
];
/* ---- 旅のできごと ---- */
function fleetIds(){return G.fleet[0].slice();}
function hpAll(r){for(const id of fleetIds()){const u=ux(id);u.hp=clamp(Math.round(uhp(id)+umax(id)*r),1,umax(id));}}
const UTRIP=[
 {n:'馬車の車輪が外れた',d:'峠の手前で馬車が傾いた。御者は「半日あれば直せます」と言う。',c:[
   {t:'修理を待つ<small>全員の気力-10%</small>',f(){hpAll(-.1);return'待つあいだに夜露で体が冷えた。';}},
   {t:'楽器を担いで歩く<small>楽団員の満足-5</small>',f(){fleetIds().forEach(id=>id!=='you'&&setMood(id,moodOf(id)-5));return'ぶつぶつ言いながらも、皆で次の宿場まで歩いた。';}}]},
 {n:'宿場町の村祭り',d:'宿の前の広場で、村人たちが踊っている。',c:[
   {t:'飛び入りで弾く<small>経験+・名声+3・気力-5%</small>',f(){fleetIds().forEach(id=>id!=='you'&&gainExp(id,12));addXP(3);hpAll(-.05);return'村人たちは夜更けまで踊り、楽団の名は街道筋に広まった。';}},
   {t:'早めに休む<small>気力+15%</small>',f(){hpAll(.15);return'ぐっすり眠り、皆の顔色がよくなった。';}}]},
 {n:'伯爵夫人からの招待状',d:'近くの館の伯爵夫人が、ぜひ夜会で一曲と言ってきた。',c:[
   {t:'夜会に寄る<small>資金+・満足+5・気力-5%</small>',f(){const v=150+cityLv(UPB.k||P().city)*30;P().money+=v;fleetIds().forEach(id=>id!=='you'&&setMood(id,moodOf(id)+5));hpAll(-.05);return`夫人はたいそう喜び、${fmt(v)}frの謝礼を包んでくれた。`;}},
   {t:'丁重に断って先を急ぐ',f(){return'夫人は少し残念そうだった。';}}]},
 {n:'古書店の手稿譜',d:'街角の古書店で、埃をかぶった手稿譜の束を見つけた。店主は200frでいいと言う。',c:[
   {t:'買う<small>-200fr</small>',dis:()=>P().money<200,f(){P().money-=200;if(Math.random()<.5){newUEq('firsted');return'中に珍しい初版譜がまじっていた！「初版の楽譜」を手に入れた。';}fleetIds().forEach(id=>id!=='you'&&gainExp(id,18));return'見たこともない旋律がぎっしり。皆で夜通し弾いてみた（経験+）。';}},
   {t:'見送る',f(){return'店主は肩をすくめた。';}}]},
 {n:'雨の峠道',d:'土砂降りで峠道がぬかるんでいる。遠回りすれば安全だが、到着が遅れる。',c:[
   {t:'遠回りする<small>満足-3</small>',f(){fleetIds().forEach(id=>id!=='you'&&setMood(id,moodOf(id)-3));return'遅れて着いた。聴衆は少し待ちくたびれていた。';}},
   {t:'強行する<small>気力-15%・次の舞台で攻め+10%</small>',f(){hpAll(-.15);UPB.boost=(UPB.boost||0)+.1;return'ずぶ濡れで着いたが、待ちわびた聴衆の熱気がすごい。';}}]},
 {n:'街道の追いはぎ',d:'森の中で追いはぎに囲まれた！「楽器か金か、置いていけ」',c:[
   {t:'金を渡す<small>-資金</small>',f(){const v=Math.min(P().money,120+cityLv(UPB.k||P().city)*25);P().money-=v;return`${fmt(v)}frを渡して通してもらった。`;}},
   {t:'楽器を守って逃げる<small>だれかの気力-25%</small>',f(){const id=pick(fleetIds());const u=ux(id);u.hp=Math.max(1,Math.round(uhp(id)-umax(id)*.25));return`${nameOf(id)}が楽器を抱えて転び、ひどく消耗した。`;}}]},
 {n:'ライバル楽団と同じ宿',d:'宿の食堂に、ライバル楽団の連中がいる。こちらをちらちら見ている。',c:[
   {t:'酒場で即興合戦を挑む<small>勝てば名声+</small>',f(){const p=fleetIds().reduce((a,id)=>a+mstat(id,'impro'),0)/Math.max(1,fleetIds().length);if(Math.random()<p/14){addXP(8);fleetIds().forEach(id=>id!=='you'&&setMood(id,moodOf(id)+6));return'こちらの即興が客を総立ちにさせた！ 名声+8。';}fleetIds().forEach(id=>id!=='you'&&setMood(id,moodOf(id)-6));return'向こうが一枚上手だった。皆、悔しそうに部屋へ引き上げた。';}},
   {t:'相手にしない',f(){return'静かに夕食をすませた。';}}]},
 {n:'弟子入り志願の若者',d:'宿に、楽器を抱えた若者が訪ねてきた。「一度でいいから稽古をつけてください」',c:[
   {t:'コンマスに稽古をつけさせる<small>コンマスに経験+・気力-5%</small>',f(){const id=fleetIds().find(x=>x!=='you')||fleetIds()[0];if(id!=='you')gainExp(id,30);const u=ux(id);u.hp=Math.max(1,Math.round(uhp(id)-umax(id)*.05));return`${nameOf(id)}は教えながら、自分の弾き方を見つめ直した。`;}},
   {t:'丁寧に断る',f(){return'若者は「いつか必ず」と言って去った。';}}]}
];
function uTravel(){
  if(Math.random()<.45&&fleetIds().length){const e=pick(UTRIP);
    return modal(`旅の途中で：${e.n}`,e.d,e.c.map(c=>({t:c.t,dis:c.dis?c.dis():false,f(){const r=c.f();save();modal(e.n,r,[{t:'旅を続ける',cls:'gold',f(){uNode();}}]);}})));}
  uNode();
}
/* ---- 状態 ---- */
function ensU(){
  G.ux=G.ux||{};G.ueq=G.ueq||[];G.fleet=G.fleet||[[],[]];G.sg=G.sg||{};G.uexp=G.uexp||{};G.guests=G.guests||[];G.uinv=G.uinv||0;G.uidc=G.uidc||0;G.door=G.door||{};G.ust=G.ust||{sorties:0,caps:0,lost:0};
  G.fleet=G.fleet.map(f=>f.filter(id=>id==='you'||G.members.includes(id)));
  if(!G.fleet[0].length&&!G.flags.fleetInit){G.flags.fleetInit=1;G.fleet[0]=['you'].concat(G.members.slice(0,5));}
}
/* 別の時代の人物（主人公として遊べる人も含む）を、客演用の人物データにする */
function guestSrc(era,id){
  const S=SCEN[era];const c=S.chars.concat(S.rivals).find(x=>x.id===id);if(c)return c;
  const p=S.players[id];if(!p)return null;const ty=(PTYPE[id]||['pf'])[0];const seat=Object.keys(SEATTYPE).find(k=>SEATTYPE[k]===ty)||'作曲';
  const st=['tech','expr','impro'].sort((a,b)=>p[b]-p[a])[0];const pc=(p.pieces&&p.pieces[0])?p.pieces[0].t:'';
  return C(id,p.name,p.lat,S.cities[0],seat,p.faction,8,[p.tech,p.expr,p.impro,p.theory],true,st,[1.3,.5,1.0,1.4,1.3],p.motif,p.tim,pc,'時を越えて、やって来たよ。','あなたの楽団で、思いきり弾かせてもらおう。',p.desc||p.intro||'');
}
function syncGuests(){
  if(!SC)return;SC.chars=SC.chars.filter(c=>!c.guest||(G&&G.guests&&G.guests.some(g=>g.id===c.id)&&G.sc===c.gsc));
  if(!G||!G.guests)return;
  for(const g of G.guests){if(SC.chars.some(c=>c.id===g.id))continue;const src=guestSrc(g.era,g.id);if(!src)continue;
    const base=src.lv>=7?5:src.lv>=6?4:src.lv===5?3:src.lv===4?2:1;const gr=Math.max(base,UHIST[src.id]||base);const d=gr-base;
    const pk=k=>Math.min(14,(src[k]||5)+d);
    SC.chars.push(Object.assign({},src,{guest:1,gsc:G.sc,era:g.era,city:g.city||SC.cities[0],grar:gr,peak:d>0?1:0,tech:pk('tech'),expr:pk('expr'),impro:pk('impro'),theory:pk('theory'),lv:Math.max(src.lv,gr+2)}));}
}
const guestEra=id=>{if(!G||!G.guests)return null;const g=G.guests.find(x=>x.id===id);return g?g.era:null;};
const _portraitU=portrait;
portrait=function(id,size,ring){const e=guestEra(id);if(e){const o=RSC;RSC=e;try{return _portraitU(id,size,ring);}finally{RSC=o;}}return _portraitU(id,size,ring);};

function ux(id){ensU();if(!G.ux[id])G.ux[id]={lv:1,exp:0,hp:null,kai:0,eq:[null,null,null]};while(G.ux[id].eq.length<3)G.ux[id].eq.push(null);return G.ux[id];}
/* 史実の格：その人が全盛期に達した格（★）。客演では、この格と全盛期の力で現れる */
const UHIST={bach:5,handel:5,vivaldi:5,telemann:4,rameau:5,couperin:4,marais:4,dscarlatti:5,ascarlatti:4,farinelli:5,tartini:4,pisendel:3,zelenka:4,quantz:4,porpora:4,faustina:4,cuzzoni:4,senesino:4,leclair:4,
 haydn:5,mozart:5,beethoven:5,gluck:5,salieri:4,clementi:4,viotti:4,stgeorges:4,paisiello:4,cimarosa:4,boccherini:4,bortniansky:4,kozeluch:3,vanhal:3,
 chopin:5,liszt:5,paganini:5,berlioz:5,rossini:5,meyerbeer:4,bellini:5,donizetti:5,malibran:5,pasta:4,schumann:5,clara:5,mendelssohn:5,wagner:5,glinka:4,thalberg:4,alkan:4,field:4,lipinski:4,ernst:4,moscheles:4,habeneck:4,dragonetti:4,franchomme:3,hummel:4,czerny:4,strauss:4,
 brahms:5,verdi:5,tchaikovsky:5,liszt76:5,clara76:5,bruckner:5,dvorak:5,smetana:5,mussorgsky:5,rimsky:5,borodin:4,arubinstein:5,nrubinstein:4,saintsaens:5,franck:5,faure76:5,gounod:5,bizet:5,offenbach:4,strauss2:5,joachim:5,sarasate:5,patti:5,richter:4,bulow:4,auer:5,erkel:4,grieg:5,massenet:4,delibes:4,lalo:4,widor:4,
 mahler:5,rstrauss:5,debussy:5,ravel:5,faure:5,stravinsky:5,rachmaninoff:5,scriabin:5,sibelius:5,elgar:5,puccini:5,caruso:5,chaliapin:5,toscanini:5,nikisch:4,busoni:4,ysaye:5,kreisler:5,casals:5,cortot:4,thibaud:4,landowska:4,paderewski:5,bartok:5,kodaly:4,janacek:5,schoenberg:5,walter:4,satie:4,nboulanger:4,lboulanger:4,dukas:4,dindy:4,enescu:5,kubelik:4,hofmann:5,szymanowski:5,karlowicz:3,medtner:4,taneyev:4,glazunov:4,rimsky05:5,auer05:5,hubay:4,dohnanyi:4,suk:4,koussevitzky:4,monteux:4,backhaus:4,melba:4,garden:4,long:4,
 elsner:3,kurpinski:3,lvov:3,tomasek:3,verstovsky:3,khandoshkin:3,cernohorsky:3,fdusek:3,essipova:4,taneyev76:4};
function uhist(id){const c=charById(id);const rid=c?c.id:id;return Math.max(UHIST[rid]||0,c&&c.gsc?0:0);}
function urar(id){if(G&&G.guests){const c=charById(id);if(c&&c.guest&&c.grar)return c.grar;}if(id==='you')return 5;const c=charById(id);if(!c)return 1;const rid=c.id;return U_LEG.includes(rid)?5:c.lv>=7?5:c.lv>=6?4:c.lv===5?3:c.lv===4?2:1;}
function ulv(id){return id==='you'?Math.min(99,plv()*3):ux(id).lv;}
function umax(id){if(id==='you')return 46+plv()*2+(ux('you').kai?12:0);return 28+urar(id)*6+Math.floor(ux(id).lv/2)+(ux(id).kai?12:0);}
function uhp(id){const u=ux(id);if(u.hp==null||u.hp>umax(id))u.hp=umax(id);return u.hp;}
function ueqOf(id){return ux(id).eq.map(q=>q&&G.ueq.find(e=>e.uid===q)).filter(Boolean);}
function uhs(id,hp,max){const r=(hp==null?uhp(id):hp)/(max||umax(id));return r>.75?0:r>.5?1:r>.25?2:3;}
const UHS=['','疲れ','消耗','限界'];
function umood(id){return id==='you'?40+P().stamina*.5:moodOf(id);}
function umorS(id){const m=umood(id);return m>=85?'spark':m<35?'red':m<50?'orange':'';}
function uIn(id){ensU();return G.fleet.findIndex(f=>f.includes(id));}
function uOnExp(id){ensU();const fi=uIn(id);return fi>0&&G.uexp[fi]&&G.uexp[fi].until>G.month;}

/* 能力：素の値＋成長＋Lv＋愛用品＋改 */
const _mstatU=mstat;
mstat=function(id,k){let v=_mstatU(id,k);if(!G||!G.ux)return v;if(id!=='you')v+=Math.floor((ux(id).lv-1)/10);
  if(G.ux[id]){if(G.ux[id].kai)v+=2;for(const e of ueqOf(id))v+=eqStat(e,k,id);}return v;};
function eqStat(e,k,id){return UEQ[e.id][k]||0;}
function udef(id){let d=Math.round(mstat(id,'theory')/2);for(const e of ueqOf(id))d+=eqStat(e,'def',id);return d;}
/* 経験値はLv（1〜99）に。10Lvごとに全能力+1 */
gainExp=function(id,base){
  ensU();const c=charById(id);if(!c)return null;const u=ux(id);
  u.exp+=base*phaseMult(id)*2*(hasQ(id,'fast')?1.15:1);let up=0;
  while(u.lv<99&&u.exp>=u.lv*18){u.exp-=u.lv*18;u.lv++;up++;}
  if(up){u.hp=Math.min(umax(id),uhp(id)+up);return`${c.name} Lv${u.lv}`;}return null;
};
/* 演奏会：消耗以上の団員は本調子でない */
const _slotValU=slotVal;
slotVal=function(id,p,L,i){let v=_slotValU(id,p,L,i);if(G&&G.ux&&G.ux[id]){const h=uhs(id);if(h>=2)v*=h===3?.7:.85;}return v;};

/* ---- 毎月：回復・派遣公演の帰還 ---- */
const _memberMonthlyU=memberMonthly;
memberMonthly=function(){
  _memberMonthlyU();ensU();
  for(const id of ['you'].concat(G.members)){const u=ux(id);u.hp=Math.min(umax(id),uhp(id)+Math.ceil(umax(id)*.3));}
  for(const fi in G.uexp){const x=G.uexp[fi];if(x&&x.until<=G.month){const e=UEXP.find(y=>y.id===x.eid);const f=G.fleet[fi].filter(id=>G.members.includes(id));delete G.uexp[fi];
    for(const id of f){gainExp(id,8+e.m*6);setMood(id,moodOf(id)-4);}
    if(x.ok){const big=Math.random()<.15,mul=big?1.5:1;P().money+=Math.round(e.rew.fr*mul);if(e.rew.xp)addXP(Math.round(e.rew.xp*mul));let eqt='';if(e.rew.eq||big){const q=pick(ueqPool());newUEq(q);eqt=`<br>土産に<b>${UEQ[q].n}</b>を持ち帰った。`;}
      addLog(`派遣公演「${e.n}」${big?'大成功':'成功'}。${fmt(e.rew.fr*mul)}frの収入。`);modal(big?'派遣公演 大成功！':'派遣公演 成功',`派遣楽団が「${e.n}」から帰ってきた。<br>収入 <b>${fmt(e.rew.fr*mul)}fr</b>${e.rew.xp?`・名声+${Math.round(e.rew.xp*mul)}`:''}${eqt}`);}
    else{P().money+=50;addLog(`派遣公演「${e.n}」は失敗に終わった。`);modal('派遣公演 失敗',`条件を満たしていなかった：${x.why}<br>わずかな謝礼（50fr）だけを持ち帰った。`);}}}
};
function newUEq(id){ensU();G.uidc++;const e={uid:G.uidc,id};G.ueq.push(e);return e;}

/* ---- 都市ごとの演奏旅行ルート ---- */
function hashS(s){let h=17;for(const ch of s)h=(h*131+ch.charCodeAt(0))%100003;return h;}
function cityRoute(k){
  const c=ci(k),h=hashS(k+G.sc);const T=Object.keys(UNT);const big=c.size>=3;
  const route=big?[['A','B'],['C'],['D','E'],['Z']]:[['A'],['B','C'],['Z']];
  const fav={古典:['交響','オペラ','協奏'],ロマン:['サロン','協奏','オペラ'],名人芸:['対決','即興','協奏']}[G.cityF[k]]||T;
  const nodes={};let i=0;for(const st of route)for(const n of st){nodes[n]={t:n==='Z'?fav[h%fav.length]:(i%2?fav[(h+i)%fav.length]:T[(h+i*7)%T.length])};i++;}
  return{route,nodes};
}
function sgOf(k){ensU();const own=G.owner[k];const max=(ci(k).size>=3?3:2)+(own&&own!=='player'?1:0);if(!G.sg[k]||G.sg[k].who!==own)G.sg[k]={g:max,max,who:own};return G.sg[k];}
function cityMult(k){return .45+cityLv(k)*.1;}
function enemyFromChar(c,mult,boss){const base=(mstatC(c,'tech')+mstatC(c,'expr')+mstatC(c,'impro'))/3;
  return{n:c.name,pt:c.id,hp:Math.round((24+base*3.2)*mult*(boss?2.1:1)),atk:Math.round((base*1.15+3)*mult*(boss?1.15:1)),def:Math.round((c.theory||6)/2*mult),line:c.piece||'得意の一曲',boss:boss?1:0};}
function mstatC(c,k){return (c[k]||6)+(c.lvB||0);}
function enemyGen(key,mult){const e=UENT[key];return{n:e.n,pt:'critic',hp:Math.round(e.hp*mult),atk:Math.round(e.atk*mult),def:Math.round(e.def*mult),line:e.line};}
function nodeEnemies(k,nk,step){
  const own=G.owner[k],mult=cityMult(k)*(1+step*.12),isBoss=nk==='Z';
  const rivalPool=own&&own!=='player'?SC.chars.filter(c=>G.charOwner[c.id]===own):[];
  const locals=poolChars().filter(c=>c.city===k&&!G.charOwner[c.id]);
  const n=isBoss?Math.min(5,3+Math.floor(step/2)):Math.min(5,2+step);const out=[];
  if(isBoss){
    if(own&&own!=='player'){const L=rivalLeader(own);out.push(enemyFromChar(Object.assign({},L,{lvB:L.lv-(rivalById(own).lv||L.lv)}),mult,1));}
    else if(own==='player'){out.push(Object.assign(enemyGen('critic',mult*1.4),{n:'挑戦者の楽団の楽長',boss:1}));}
    else{const c=ci(k);out.push({n:`${c.inst}の${c.head||'楽長'}`,pt:'critic',hp:Math.round(110*mult),atk:Math.round(16*mult),def:Math.round(5*mult),line:'厳しい審査',boss:1});}
  }
  while(out.length<n){const r=Math.random();
    if(rivalPool.length&&r<.45)out.push(enemyFromChar(pick(rivalPool),mult*.85));
    else if(locals.length&&r<.65)out.push(enemyFromChar(pick(locals),mult*.75));
    else out.push(enemyGen(pick(['noble','heckler','critic','critic']),mult));}
  return out;
}

/* ---- 時の扉（時代を越える演奏旅行） ---- */
function doors(){
  const others=Object.keys(SCEN).filter(s=>s!==G.sc);const h=hashS(G.sc+G.pid);
  const pickBoss=(s,i)=>{const all=SCEN[s].chars.concat(SCEN[s].rivals).filter(c=>!SC.chars.some(x=>x.id===c.id&&!x.guest)&&c.id!==G.pid);let pool=all.filter(c=>c.lv>=7);if(pool.length<2)pool=all.filter(c=>c.lv>=6);if(!pool.length)pool=all;return pool[(h+i*13)%pool.length];};
  const d=[0,1,2].map(i=>{const s=others[(h+i)%others.length];const b=pickBoss(s,i);return{id:'d'+i,era:s,boss:b,mult:1.6+i*.55,n:`${U_ERA[s]}への扉`};});
  d.push({id:'d3',era:'s1723',boss:{id:'devil',name:'悪魔',tech:14,expr:13,impro:15,theory:12,piece:'悪魔のトリル'},mult:3.2,n:'【EX】タルティーニの夢'});
  return d;
}
const doorOpen=()=>myCities().length>=3||G.flags.endless;

/* ---- 戦闘 ---- */
let UB=null,USP=600,UPB=null;
function uSets(ids){const real=ids.map(realId);const out=[];for(const s of USETS){if(s.guest){const n=ids.filter(id=>guestEra(id)).length;if(n>=s.need)out.push(s);continue;}if(s.ids.filter(x=>real.includes(x)).length>=s.need)out.push(s);}return out;}
function startUBattle(B){
  const f=G.fleet[0];B.us=f.map((id,i)=>({id,hp:B.practice?umax(id):uhp(id),max:umax(id),broken:uhs(id)>=3,dealt:0,i}));
  B.en=B.enemies.map(e=>Object.assign({},e,{max:e.hp}));B.ev=[];
  const ids=f.map(realId);B.syn=0;for(const [a,b,v] of SYN)if(ids.includes(a)&&ids.includes(b))B.syn+=v*.02;
  for(const id of f)for(const id2 of f)if(id<id2&&id!=='you'&&id2!=='you'){const lv=chemLv(id,id2);if(lv>=3)B.syn+=.01*lv;}
  B.sets=uSets(f);for(const s of B.sets)B.syn+=s.v;
  B.types=new Set(f.flatMap(id=>typesOf(id))).size;
  uSim(B,false);UB=B;uRenderB(B);
}
function uAtk(B,u){
  const id=u.id,nt=UNT[B.node.t],w=nt.w;
  const aw=B.aud?B.aud.w:[1,1,1];
  let a=(mstat(id,'tech')*w[0]*aw[0]+mstat(id,'expr')*w[1]*aw[1]+mstat(id,'impro')*w[2]*aw[2])*2.1;
  if(B.aud&&B.aud.sty===B.style)a*=1.1;if(B.aud&&B.aud.fit)a*=Math.max(1,...typesOf(id).map(t=>B.aud.fit[t]||1));if(B.boost)a*=1+B.boost;
  a*=Math.max(...typesOf(id).map(t=>nt.fit[t]||1));
  a*=[1,1,.8,.5][uhs(id,u.hp,u.max)];
  const ms=umorS(id);a*=ms==='spark'?1.12:ms==='red'?.75:ms==='orange'?.9:1;
  a*=USTY[B.style].a*(1+B.syn)*(1+Math.min(.12,(B.types-1)*.025));
  if(id!=='you'){const sk=skillOf(id),km=ux(id).kai?1.5:1;if(sk){if(sk.k==='self')a+=sk.v*1.5*km;if(sk.k==='q')a+=sk.v*2*km;}
    if(u.i===0&&hasQ(id,'diva'))a*=1.1;if(hasQ(id,'shy')&&B.node.t==='交響')a*=.85;}
  for(const o of B.us)if(o!==u&&o.hp>0&&o.id!=='you'){const s2=skillOf(o.id);if(s2&&s2.k==='section'&&s2.t.some(t=>typesOf(id).includes(t)))a+=s2.v;}
  return a;
}
function uSim(B,encore){
  const alive=a=>a.filter(x=>x.hp>0);
  const hitE=(u,mult,phase)=>{const tg=alive(B.en);if(!tg.length)return;if(uhs(u.id,u.hp,u.max)>=3&&!encore)return;
    if(typeof dudHit==='function'&&u.id!=='you'){const dh=dudHit(B,u);if(dh==='stop')return;}
    if(u.id!=='you'&&hasQ(u.id,'temper')&&umood(u.id)<40&&Math.random()<.15){B.ev.push({k:'skip',txt:`${nameOf(u.id)}は機嫌を損ねて弾かない！`});return;}
    const e=pick(tg);let d=uAtk(B,u)*mult+rnd(0,8)-e.def;const crit=Math.random()<.1+(umorS(u.id)==='spark'?.05:0);if(crit)d*=1.5;d=Math.max(1,Math.round(d));
    if(Math.random()<.06){B.ev.push({k:'miss',u:u.i,e:B.en.indexOf(e),txt:`${nameOf(u.id)}の音が外れた`});return;}
    e.hp=Math.max(0,e.hp-d);u.dealt+=d;B.ev.push({k:'hit',u:u.i,e:B.en.indexOf(e),d,crit,txt:crit?'会心の一音！':(phase||UATK[typesOf(u.id)[0]]||'演奏'),kill:e.hp<=0});};
  const hitU=e=>{const tg=alive(B.us);if(!tg.length)return;const u=pick(tg);const ev=.08+USTY[B.style].ev+(umorS(u.id)==='spark'?.1:0)-(umorS(u.id)==='red'?.05:0);
    if(Math.random()<ev){B.ev.push({k:'dodge',e:B.en.indexOf(e),u:u.i});return;}
    let d=Math.round(Math.max(1,(e.atk+rnd(0,6)-udef(u.id)*USTY[B.style].d)*(u.id!=='you'&&hasQ(u.id,'sickly')?1.2:1)*(encore?1.2:1)));
    let nh=u.hp-d,lost=false;
    if(B.practice)nh=Math.max(1,nh);else if(nh<=0){if(u.broken&&u.i!==0&&u.id!=='you'){lost=true;nh=0;}else nh=1;}
    u.hp=nh;B.ev.push({k:'hurt',e:B.en.indexOf(e),u:u.i,d,txt:e.line,lost});if(lost)B.lostU=(B.lostU||[]).concat([u.i]);};
  if(!encore){
    B.ev.push({k:'phase',txt:'序曲'});for(const u of B.us)if(typesOf(u.id).some(t=>t==='cond'||t==='comp')&&u.hp>0)hitE(u,.8,'序曲の先制');
    for(let r=0;r<2;r++){if(!alive(B.en).length)break;B.ev.push({k:'phase',txt:r===0?'第1楽章':'第2楽章'});
      const order=[],us=alive(B.us),en=alive(B.en),n=Math.max(us.length,en.length);for(let i=0;i<n;i++){if(us[i])order.push(['u',us[i]]);if(en[i])order.push(['e',en[i]]);}
      for(const [s,x] of order){if(!alive(B.en).length)break;if(x.hp<=0)continue;if(s==='u')hitE(x,1);else hitU(x);}}
  }else{B.ev.push({k:'phase',txt:'アンコール'});for(const u of alive(B.us)){if(uhs(u.id,u.hp,u.max)>=2)continue;hitE(u,1.5,'アンコールの熱演');const e=alive(B.en)[0];if(e)hitU(e);}}
}
function uRank(B){
  const ed=B.en.filter(e=>e.hp<=0).length,et=B.en.length,boss=B.en.find(e=>e.boss);
  const taken=B.us.reduce((a,u)=>a+(u.max-u.hp),0)/B.us.reduce((a,u)=>a+u.max,0);
  if(B.lostU&&B.lostU.length)return ed===et?'B':'D';
  if(ed===et)return taken<.3?'S':'A';
  if((boss&&boss.hp<=0)||ed/et>=.66)return'B';if(ed/et>=.33)return'C';return'D';
}
function uRenderB(B,cont){
  const bar=(h,m)=>`<div class="hpb"><i class="h${h/m>.75?0:h/m>.5?1:h/m>.25?2:3}" style="width:${Math.max(0,h/m*100)}%"></i></div>`;
  $('#scene').innerHTML=`<div class="sc battle"><h3>${B.title}</h3><div class="subt">${B.node.t}の舞台・${USTY[B.style].n}${B.aud?`・${B.aud.n}`:''}${B.syn?`・連携+${Math.round(B.syn*100)}%`:''}</div>
   ${B.sets.length?`<div class="tell" style="padding:4px">史実の縁：${B.sets.map(s=>`《${s.n}》`).join('')}</div>`:''}
   <div class="side-e">${B.en.map((e,i)=>`<div class="bu" id="be${i}">${ePt(e,e.boss?54:40,e.boss?'#c33':'#777')}<span>${e.n}</span>${bar(e.max,e.max)}</div>`).join('')}</div>
   <div class="bphase" id="bph">開演</div>
   <div class="side-u">${B.us.map((u,i)=>`<div class="bu" id="bu${i}">${portrait(realId(u.id),44,U_RCOL[urar(u.id)-1])}<span>${nameOf(u.id)}</span>${bar(u.max,u.max)}</div>`).join('')}</div>
   <div class="blog" id="blog"></div><button class="btn" id="bskip" style="width:100%;margin-top:6px">早送り</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  $('#bskip').onclick=()=>{USP=60;};USP=600;
  const eh=B.en.map(e=>e.max),uh=B.us.map(u=>B.practice?u.max:uhp(u.id));
  if(cont){B.en.forEach((e,i)=>eh[i]=B.encEh[i]);B.us.forEach((u,i)=>uh[i]=B.encUh[i]);}
  const setBar=(el,h,m)=>{const i=el.querySelector('.hpb i');i.style.width=Math.max(0,h/m*100)+'%';i.className='h'+(h/m>.75?0:h/m>.5?1:h/m>.25?2:3);};
  B.us.forEach((u,i)=>setBar($('#bu'+i),uh[i],u.max));B.en.forEach((e,i)=>{setBar($('#be'+i),eh[i],e.max);if(eh[i]<=0)$('#be'+i).classList.add('down');});
  if(!cont&&B.sets.length){const s=B.sets[0];const lead=B.us.find(u=>s.guest?guestEra(u.id):s.ids.includes(realId(u.id)));if(lead)setTimeout(()=>cutin(realId(lead.id),`史実の縁《${s.n}》`,s.t||`連携 +${Math.round(s.v*100)}%`),100);}
  let k=cont?B.encFrom:0;
  const step=()=>{
    if(!$('#blog'))return;
    if(k>=B.ev.length)return setTimeout(()=>uAfter(B),500);
    const v=B.ev[k++],log=$('#blog');
    document.querySelectorAll('.bu').forEach(e=>e.classList.remove('act'));
    if(v.k==='phase')$('#bph').textContent=v.txt;
    else if(v.k==='hit'||v.k==='miss'){const a=$('#bu'+v.u),t=$('#be'+v.e),u=B.us[v.u];a.classList.add('act');
      if(v.k==='hit'){eh[v.e]=Math.max(0,eh[v.e]-v.d);setBar(t,eh[v.e],B.en[v.e].max);uPop(t,`-${v.d}`,v.crit);if(eh[v.e]<=0)t.classList.add('down');
        if(USP>100){const c=realId(u.id)===G.pid?PL():charById(u.id);const mo=c&&MOTIFS[c.motif];if(mo){const cx=ac();if(cx){let tt=cx.currentTime+.03;for(const [n,dd] of mo.slice(0,3)){if(Array.isArray(n))n.forEach(x=>tone(tt,x,dd*.7,c.tim));else if(n)tone(tt,n,dd*.7,c.tim);tt+=dd*.7;}}}}}
      log.insertAdjacentHTML('afterbegin',`<div>${nameOf(u.id)}：${v.txt}${v.k==='hit'?` → ${B.en[v.e].n}に<b>${v.d}</b>${v.kill?'（陥落！）':''}`:''}</div>`);}
    else if(v.k==='hurt'){const a=$('#be'+v.e),t=$('#bu'+v.u);a.classList.add('act');uh[v.u]=Math.max(0,uh[v.u]-v.d);setBar(t,uh[v.u],B.us[v.u].max);uPop(t,`-${v.d}`,false,true);t.classList.add('shake');setTimeout(()=>t.classList.remove('shake'),300);
      log.insertAdjacentHTML('afterbegin',`<div class="eh">${B.en[v.e].n}の${v.txt} → ${nameOf(B.us[v.u].id)}に<b>${v.d}</b>${v.lost?'<b style="color:#f66">（倒れた……）</b>':''}</div>`);}
    else if(v.k==='dodge'){$('#be'+v.e).classList.add('act');log.insertAdjacentHTML('afterbegin',`<div class="eh">${B.en[v.e].n}の攻勢……${nameOf(B.us[v.u].id)}は動じない</div>`);}
    else if(v.k==='skip')log.insertAdjacentHTML('afterbegin',`<div class="eh">${v.txt}</div>`);
    setTimeout(step,v.k==='phase'?USP*1.2:USP);
  };
  setTimeout(step,cont?200:600);
}
function ePt(e,size,ring){if(e.era){const o=RSC;RSC=e.era;try{return portrait(e.pt,size,ring);}finally{RSC=o;}}return portrait(e.pt,size,ring);}
function uPop(el,t,crit,bad){const s=document.createElement('div');s.className='bpop'+(crit?' crit':'')+(bad?' bad':'');s.textContent=crit?t+'!':t;el.appendChild(s);setTimeout(()=>s.remove(),1000);}
function uAfter(B){
  const ed=B.en.filter(e=>e.hp<=0).length;
  if(!B.encored&&!B.practice&&ed<B.en.length&&B.us.some(u=>u.hp>0&&uhs(u.id,u.hp,u.max)<2))
    return modal('アンコールに応える？',`まだ聴衆の心をつかみきれていない（残り${B.en.length-ed}）。<br>アンコールに応えれば追撃できるが、受ける攻勢も激しくなる（消耗している団員は参加しない）。`,
      [{t:'アンコール！',cls:'crim',f(){B.encored=1;B.encFrom=B.ev.length;B.encEh=B.en.map(e=>e.hp);B.encUh=B.us.map(u=>u.hp);uSim(B,true);uRenderB(B,true);}},{t:'幕を下ろす',f(){uResult(B);}}]);
  uResult(B);
}
function uLose(id,why){
  G.members=G.members.filter(x=>x!==id);G.fleet=G.fleet.map(f=>f.filter(x=>x!==id));
  if(G.ux[id])G.ux[id].eq=[null,null,null];G.guests=G.guests.filter(g=>g.id!==id);
  (G.alumni=G.alumni||[]).push(id);G.ust.lost++;addLog(`${nameOf(id)}は${why}、楽団を去った。`);hpush(`${nameOf(id)}、過酷な演奏旅行の末に楽団を去る`);
}
function uResult(B){
  const rank=uRank(B),mvp=B.us.slice().sort((a,b)=>b.dealt-a.dealt)[0],mvpName=nameOf(mvp.id),mvpReal=realId(mvp.id);
  const lostN=[];
  if(!B.practice){for(const u of B.us)ux(u.id).hp=u.hp;
    for(const i of (B.lostU||[])){const id=B.us[i].id;lostN.push(nameOf(id));uLose(id,'限界のまま舞台に立たされ');}}
  const base=B.practice?20:(14+cityLv(B.k||P().city)*5+(B.boss?20:0))*(B.mult||1);
  const rm={S:1.2,A:1,B:.9,C:.7,D:.5}[rank];const ups=[];
  for(const u of B.us){if(u.id==='you')continue;if(!G.members.includes(u.id))continue;const up=gainExp(u.id,base*rm*(u.i===0?1.5:1)*(u===mvp?2:1)/2);if(up)ups.push(up);
    if(rank==='S'||rank==='A')setMood(u.id,moodOf(u.id)+(u===mvp?8:2));if(rank==='D')setMood(u.id,moodOf(u.id)-6);}
  const rwm=(B.aud&&B.aud.rw)||1;const fx=Math.round(base*rm*.3*rwm);addXP(fx);const fr=B.practice?0:Math.round(base*rm*5*rwm);P().money+=fr;
  let bossTxt='',drop=null,eqd=null;
  if(!B.practice){
    if(B.boss&&['S','A','B'].includes(rank)){
      if(B.door){G.door[B.door]=1;G.uinv++;bossTxt=`<b style="color:var(--gold2)">時の扉を踏破！</b><br>「時を越える招待状」を1通手に入れた（${G.uinv}通）。`;hpush(`時の扉「${B.title}」を踏破`);}
      else if(G.owner[B.k]!=='player'){const sg=sgOf(B.k);sg.g--;if(sg.g<=0){const prev=G.owner[B.k];G.owner[B.k]='player';G.cityF[B.k]=P().faction;delete G.sg[B.k];G.ust.caps++;addXP(40+cityLv(B.k)*5);
          bossTxt=`<b style="color:var(--gold2)">${ci(B.k).name}を攻略！</b><br>${ci(B.k).inst}があなたの支配下に入った。`;addLog(`演奏旅行で${ci(B.k).name}を攻略した${prev?`（${rivalById(prev)?rivalById(prev).name+'陣営から奪取':''}）`:''}。`);hpush(`演奏旅行で${ci(B.k).name}を攻略`);}
        else bossTxt=`${ci(B.k).name}の牙城が揺らいだ。残りゲージ ${sg.g}/${sg.max}`;}
    }
    const dch={S:.3,A:.2,B:.12,C:0,D:0}[rank];
    if(!B.door&&Math.random()<dch){const pool=poolChars().filter(c=>c.city===B.k&&!G.charOwner[c.id]&&!isMember(c.id)&&!(G.dead||[]).includes(c.id));if(pool.length)drop=pick(pool);}
    if(Math.random()<({S:.22,A:.14,B:.08}[rank]||0)+(B.door?.3:0)){eqd=pick(ueqPool());newUEq(eqd);}
  }
  save();
  if(rank==='S'&&mvp.id)cutin(mvpReal,'熱狂！',`今宵の主役：${mvpName}`);
  const last=B.practice||B.door||UPB.step>=UPB.route.length-1;
  const brk=B.practice?[]:G.fleet[0].filter(id=>uhs(id)>=3).map(nameOf);
  const btns=[];
  if(drop){const fee=Math.round(feeOf(drop.id)*.5);btns.push({t:`${drop.name}を迎え入れる<small>契約金 半額${fmt(fee)}fr・月給${fmt(demandOf(drop.id))}fr</small>`,cls:'gold',dis:P().money<fee,f(){P().money-=fee;ens5();G.members.push(drop.id);G.sal[drop.id]=demandOf(drop.id);setMood(drop.id,72);addLog(`演奏旅行の途中で${drop.name}が楽団に加わった。`);playMotif(drop.motif,drop.tim);cutin(drop.id,'旅先で加入！',drop.name);uContinue(last,brk);}});
    btns.push({t:'見送る',f(){uContinue(last,brk);}});}
  else uBtns(btns,last,brk);
  modal('今宵の評判',`<div class="rank r${rank}">${URANK[rank]}</div>
    <div style="display:flex;align-items:center;gap:8px;justify-content:center">${portrait(mvpReal,56)}<span>今宵の主役<br><b>${mvpName}</b><br><span style="font-size:12px">与えた感動 ${mvp.dealt}</span></span></div>
    ${bossTxt?`<p style="text-align:center">${bossTxt}</p>`:''}<p style="font-size:12.5px">${fr?`興行収入 +${fmt(fr)}fr・`:''}名声 +${fx}${ups.length?`<br>レベルアップ：${ups.join('、')}`:''}</p>
    ${lostN.length?`<p style="color:#a22"><b>${lostN.join('、')}</b>は限界のまま舞台に立たされ、楽団を去った……</p>`:''}
    ${eqd?`<p>旅先で<b>${UEQ[eqd].n}</b>を手に入れた！${UEQ[eqd].h?`<br><span style="font-size:12px">${UEQ[eqd].h}</span>`:''}</p>`:''}
    ${drop?`<p>${portraitRow(drop.id)}<b>${drop.name}</b>が「あなたの楽団で弾きたい」と申し出てきた。</p>`:''}
    ${brk.length&&!last?`<p style="color:#a22"><b>限界：${brk.join('、')}</b><br>このまま次の街へ進んで攻勢を受けると、楽団を去る（二度と戻らない）おそれがあります。</p>`:''}`,btns);
}
function uBtns(btns,last,brk){
  if(last)btns.push({t:'帰還する',cls:'gold',f(){uEnd();}});
  else{btns.push({t:'次の街へ',cls:brk.length?'crim':'gold',f(){UPB.step++;uTravel();}});btns.push({t:'切り上げて帰る',f(){uEnd();}});}
}
function uContinue(last,brk){const b=[];uBtns(b,last,brk);modal(last?'演奏旅行':'次の舞台へ',last?'旅を終えて帰還する。':`${brk.length?`<b style="color:#a22">限界：${brk.join('、')}</b><br>`:''}このまま進むか、引き返すか。`,b);}
function uEnd(){const pr=UPB&&UPB.practice;UPB=null;UB=null;closeScene();if(pr){save();render();return;}endAction();}

/* ---- 巡演の開始 ---- */
function sortieCost(){return G.fleet[0].reduce((a,id)=>a+(id==='you'?0:8+urar(id)*8),0);}
function startSortie(k){
  ensU();const f=G.fleet[0];if(!f.length)return toast('巡演楽団が空です');
  const cost=sortieCost();if(P().money<cost)return toast('旅費が足りません');
  P().money-=cost;G.ust.sorties++;
  const r=cityRoute(k);UPB={k,step:0,route:r.route,nodes:r.nodes};
  for(const id of f)if(id!=='you')setMood(id,moodOf(id)-3);if(f.includes('you'))P().stamina=clamp(P().stamina-15,0,100);
  uNode();
}
function uNode(){
  const k=UPB.k,opts=UPB.route[UPB.step],nk=opts.length>1?pick(opts):opts[0],nd=UPB.nodes[nk];
  const ens=nodeEnemies(k,nk,UPB.step);
  const h=hashS(k+nk+G.month),ven=venueOf(k,nd.t,h),aud=pick(UAUD);
  if(aud.ea)ens.forEach(e=>e.atk=Math.round(e.atk*aud.ea));
  uStylePick({title:`${nk==='Z'?'大御所の舞台：':`第${UPB.step+1}夜：`}${ven}`,sub:`${ci(k).name}・${nd.t}の舞台${opts.length>1?`（御者は${nk==='B'||nk==='D'?'右':'左'}の道を選んだ）`:''}`,node:nd,enemies:ens,k,boss:nk==='Z',aud,boost:UPB.boost||0});UPB.boost=0;
}
function uStylePick(B){
  const fitT=Object.keys(UNT[B.node.t].fit).map(t=>U_TN[t]).join('・')||'誰でも';
  $('#scene').innerHTML=`<div class="sc"><h3>${B.title}</h3><div class="subt">${B.sub||''}</div>
   <div class="card" style="text-align:center">${B.enemies.map(e=>`<span style="display:inline-block;margin:2px">${ePt(e,e.boss?64:42,e.boss?'#c33':'#777')}</span>`).join('')}<br><span class="pmeta">${B.enemies.map(e=>e.n).join('・')}</span></div>
   ${B.aud?`<div class="card" style="font-size:12.5px"><b>今夜の聴衆：${B.aud.n}</b><br><span class="pmeta">${B.aud.d}</span></div>`:''}
   <div class="tell">演奏スタイルを選ぶ<br><span class="pmeta">この舞台は${fitT}が活躍しやすい</span></div>
   <div class="cards3"><button class="pc" data-sty="0"><span class="ic">⚖</span>正統派<small>攻守の均衡</small></button><button class="pc" data-sty="1"><span class="ic">⚡</span>名人芸<small>攻め+20%<br>守り-20%</small></button><button class="pc" data-sty="2"><span class="ic">❦</span>室内楽<small>守り+25%<br>回避↑・攻め-10%</small></button></div></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  if(B.boss){const b=B.enemies[0];if(b&&b.pt&&b.pt!=='critic')setTimeout(()=>{const o=RSC;RSC=b.era||null;try{cutin(b.pt,'大御所、登場',b.n);}finally{RSC=o;}},150);}
  document.querySelectorAll('[data-sty]').forEach(b=>b.onclick=()=>startUBattle(Object.assign(B,{style:+b.dataset.sty})));
}
function startDoor(d){
  ensU();const cost=sortieCost()*2;if(P().money<cost)return toast('旅費が足りません');P().money-=cost;
  UPB={door:d.id,step:0,route:[['Z']],nodes:{}};
  const b=d.boss;const esc=(SCEN[d.era].chars).filter(c=>c.id!==b.id&&c.lv>=4);
  const ens=[enemyFromChar(b,d.mult,1)].concat([0,1,2,3].map(()=>enemyFromChar(pick(esc),d.mult*.8)));
  if(d.id==='d3'){ens[0].pt='devil';ens[0].n='悪魔';ens[0].hp=Math.round(ens[0].hp*1.5);}
  uStylePick({title:d.n,sub:`${U_ERA[d.era]}の音楽家たちが待ち受ける`,node:{t:pick(Object.keys(UNT))},enemies:ens.map(e=>Object.assign(e,{era:e.pt==='devil'?'s1723':d.era})),boss:true,door:d.id,mult:d.mult,k:P().city});
}

/* ---- 稽古場タブ ---- */
let UFS=0;
function uCard(id,opt){opt=opt||{};const r=urar(id),h=uhs(id),ms=umorS(id),u=ux(id),hp=uhp(id),mx=umax(id);
  const types=typesOf(id);const ex=uOnExp(id),aw=!ex&&isAway(id);
  return`<div class="mc r${r} ${opt.cls||''}" ${opt.attr||''}><div class="mcp">${portrait(realId(id),46,U_RCOL[r-1])}${ms==='spark'?'<span class="spark">✨</span>':''}</div>
   <div class="mci"><div class="mcn">${nameOf(id)}${u.kai?'<span class="kai">開眼</span>':''}${guestEra(id)?'<span class="kai" style="background:#6a4bd0">客演</span>':''} <span class="pmeta">Lv${ulv(id)}</span></div>
   <div class="pmeta">${(typeof ILBL!=='undefined'&&ILBL[realId(id)])?'🎵'+ILBL[realId(id)]:types.map(t=>U_TI[t]+U_TN[t]).join('／')}・<span style="color:${U_RCOL[r-1]}">${'★'.repeat(r)}</span>${ueqOf(id).length?`・${ueqOf(id).map(e=>UEQ[e.id].n.replace(/（.*）/,'')).join('、')}`:''}</div>
   <div class="hpb"><i class="h${h}" style="width:${hp/mx*100}%"></i></div>
   <div class="pmeta">気力${Math.round(hp)}/${mx} ${h?`<b class="hs${h}">${UHS[h]}</b>`:''} ${id==='you'?`体力${Math.round(P().stamina)}`:`満足${Math.round(moodOf(id))}`}${ms==='red'?' <b class="hs3">疲労</b>':''}${ex?' <b class="busy">派遣公演中</b>':aw?' <b class="busy">不在</b>':''}</div></div>${opt.tail||''}</div>`;}
function fleetHTML(){
  ensU();const f=G.fleet[UFS],sets=uSets(G.fleet[0]);
  const hurt=['you'].concat(G.members).filter(id=>uhp(id)<umax(id)&&!uOnExp(id));const spa=hurt.reduce((a,id)=>a+(umax(id)-uhp(id))*3,0);
  const syn=[];const ids=f.map(realId);for(const [a,b,v,l] of SYN)if(ids.includes(a)&&ids.includes(b))syn.push(`《${l}》`);
  return`<div class="ftabs"><button data-ufs="0" class="${UFS===0?'on':''}">巡演楽団</button><button data-ufs="1" class="${UFS===1?'on':''}">派遣楽団</button></div>
   <div class="card" style="font-size:12.5px">${UFS===0?`巡演に連れていく楽団。1番目がコンサートマスター（倒れても楽団を去らない）。あなた自身も加われます。${sets.length?`<br><b style="color:var(--gold2)">史実の縁：${sets.map(s=>`《${s.n}》+${Math.round(s.v*100)}%`).join(' ')}</b>${sets.map(s=>s.t?`<br><span class="pmeta">${s.t}</span>`:'').join('')}`:''}${syn.length&&UFS===0?`<br>相性：${syn.join('')}`:''}`:`派遣公演に出す楽団。派遣公演中の団員は演奏会にも出られません。${G.uexp[1]?`<br><b class="busy">派遣公演中：${UEXP.find(e=>e.id===G.uexp[1].eid).n}（${G.uexp[1].until-G.month}か月後に帰還）</b>`:''}`}</div>
   ${[0,1,2,3,4,5].map(i=>{const id=f[i];return id?uCard(id,{attr:`data-uslot="${i}"`,tail:`<div class="mcx">${i===0?'<span class="flag">コンマス</span>':''}<button class="mini" data-urm="${id}">外す</button></div>`}):`<div class="mc empty" data-uslot="${i}">＋ 配置する</div>`;}).join('')}
   <div class="sec-t">療養と工房</div>
   <div class="actions"><button class="btn" id="uSpa" ${spa&&P().money>=spa?'':'disabled'}>バーデン＝バーデンで湯治<small>${spa?`全員の気力を全快（${fmt(spa)}fr）`:'全員元気'}</small></button>
    <button class="btn" id="uDev" ${P().money>=300?'':'disabled'}>楽器工房に注文<small>300fr・この時代の楽器が手に入る</small></button>
    <button class="btn ${G.uinv?'gold':''}" id="uInv" ${G.uinv?'':'disabled'}>時を越える招待状<small>${G.uinv?`${G.uinv}通。別の時代の音楽家を招く`:'「時の扉」を踏破すると手に入る'}</small></button>
    <button class="btn" id="uStore">楽器の倉庫<small>${G.ueq.length}点</small></button></div>
   <div class="sec-t">楽団員の一覧（タップで詳細・愛用品・開眼・語らい）</div>${['you'].concat(G.members).map(id=>uCard(id,{attr:`data-udet="${id}"`})).join('')}`;
}
function bindFleet(){
  document.querySelectorAll('[data-ufs]').forEach(b=>b.onclick=()=>{UFS=+b.dataset.ufs;render();});
  document.querySelectorAll('[data-urm]').forEach(b=>b.onclick=e=>{e.stopPropagation();if(UFS===1&&G.uexp[1])return toast('派遣公演中は変更できません');G.fleet[UFS]=G.fleet[UFS].filter(x=>x!==b.dataset.urm);save();render();});
  document.querySelectorAll('[data-uslot]').forEach(b=>b.onclick=()=>{if(UFS===1&&G.uexp[1])return toast('派遣公演中は変更できません');uPick(UFS,+b.dataset.uslot);});
  document.querySelectorAll('[data-udet]').forEach(b=>b.onclick=()=>uDetail(b.dataset.udet));
  const on=(s,f)=>{const e=$(s);if(e)e.onclick=f;};
  on('#uSpa',()=>{const hurt=['you'].concat(G.members).filter(id=>uhp(id)<umax(id)&&!uOnExp(id));const c=hurt.reduce((a,id)=>a+(umax(id)-uhp(id))*3,0);P().money-=c;hurt.forEach(id=>ux(id).hp=umax(id));addLog(`バーデン＝バーデンで湯治（${fmt(c)}fr）。`);save();render();toast('全員の気力が回復した');});
  on('#uDev',()=>{P().money-=300;if(Math.random()<.3){save();render();return modal('工房から','届いたのは……ただの譜面台だった。');}
    const pool=ueqPool();const w=pool.map(k=>1/(UEQ[k].r>=5?4:UEQ[k].r>=4?2:1));let y=Math.random()*w.reduce((a,b)=>a+b,0),q=pool[0];for(let i=0;i<pool.length;i++){y-=w[i];if(y<=0){q=pool[i];break;}}
    newUEq(q);addLog(`楽器工房から${UEQ[q].n}が届いた。`);save();render();modal('工房から届いた！',`<b>${UEQ[q].n}</b>　${'★'.repeat(UEQ[q].r)}<br>${ueqTxt(q)}${UEQ[q].h?`<div class="trivia">${UEQ[q].h}</div>`:''}`);});
  on('#uInv',uInvite);
  on('#uStore',()=>modal('楽器の倉庫',G.ueq.map(e=>{const w=Object.keys(G.ux).find(id=>G.ux[id].eq.includes(e.uid));return`${UEQ[e.id].n}<span class="pmeta">（${ueqTxt(e.id)}）${w&&(w==='you'||G.members.includes(w))?`・${nameOf(w)}が使用中`:''}</span>`;}).join('<br>')||'なし'));
}
function ueqTxt(id){const e=UEQ[id];return['tech','expr','impro','def'].filter(k=>e[k]).map(k=>`${{tech:'技巧',expr:'表現',impro:'即興',def:'守り'}[k]}+${e[k]}`).join(' ')+`・${e.t.includes('*')?'全員':e.t.map(t=>U_TN[t]).join('／')}`;}
function uPick(fi,slot){
  const cur=G.fleet[fi][slot];const list=(fi===0?['you']:[]).concat(G.members).sort((a,b)=>ulv(b)-ulv(a));
  $('#scene').innerHTML=`<div class="sc"><h3>第${fi?'二':'一'}楽団 ${slot+1}番目</h3><div class="subt">楽団員を選ぶ</div>
   ${list.map(id=>{const w=uIn(id);return uCard(id,{attr:`data-upk="${id}"`,cls:id===cur?'sel':'',tail:w>=0?`<div class="mcx"><span class="pmeta">第${w?'二':'一'}</span></div>`:''});}).join('')}
   <button class="btn" id="upx" style="width:100%;margin-top:8px">戻る</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  document.querySelectorAll('[data-upk]').forEach(b=>b.onclick=()=>{const id=b.dataset.upk,w=uIn(id);
    if(w===1&&G.uexp[1])return toast('派遣公演中の団員は動かせません');if(isAway(id)&&!uOnExp(id))return toast('いまは不在です');
    if(w>=0)G.fleet[w]=G.fleet[w].filter(x=>x!==id);const fl=G.fleet[fi];if(slot<fl.length)fl[slot]=id;else fl.push(id);G.fleet[fi]=fl.filter(Boolean).slice(0,6);
    save();closeScene();render();});
  $('#upx').onclick=closeScene;
}
function uDetail(id){
  const u=ux(id),c=id==='you'?null:charById(id),r=urar(id);
  const st=k=>`<b>${mstat(id,k)}</b>`;const sk=id==='you'?null:skillOf(id);
  const body=`<div style="display:flex;gap:10px;align-items:center">${portrait(realId(id),80,U_RCOL[r-1])}<div><b>${nameOf(id)}${u.kai?'（開眼）':''}</b><br><span class="pmeta">${'★'.repeat(r)}・Lv${ulv(id)}${id==='you'?'（名声Lv×3）':`（次まで${Math.ceil(u.lv*18-u.exp)}）`}${guestEra(id)?`・${U_ERA[guestEra(id)]}からの客演${(charById(id)||{}).peak?'（全盛期の姿）':''}`:''}${id!=='you'&&!guestEra(id)&&(UHIST[(charById(id)||{}).id]||0)>r?`<br>史実の格 <span style="color:${U_RCOL[UHIST[charById(id).id]-1]}">${'★'.repeat(UHIST[charById(id).id])}</span>（この時代はまだ若手）`:''}</span><br>
   <span class="pmeta">技巧${st('tech')} 表現${st('expr')} 即興${st('impro')} 楽理${st('theory')}・守り${udef(id)}</span><br><span class="pmeta">気力 ${Math.round(uhp(id))}/${umax(id)}</span></div></div>
   ${sk?`<div class="pmeta" style="margin-top:4px"><span class="sk">★${sk.n}</span>${sk.d}</div>`:''}
   ${id!=='you'&&(QUIRK[realId(id)]||[]).length?`<div class="qrow">${QUIRK[realId(id)].map(q=>`<span class="qk q-${q}">${QDEF[q]||q}</span>`).join('')}</div>`:''}${id!=='you'&&charById(id)&&charById(id).trivia?`<div class="pmeta" style="margin-top:4px">${charById(id).trivia}</div>`:''}
   <div class="pmeta" style="margin-top:6px">Lvは演奏会と演奏旅行で上がり、10Lvごとに全能力+1。Lv20で「開眼」できる（全能力+2・気力+12・特技の効果1.5倍）。</div>`;
  const btns=[0,1,2].map(i=>{const e=u.eq[i]&&G.ueq.find(x=>x.uid===u.eq[i]);return{t:`${slotLabel(id,i)}：${e?eqName(e):'なし'}${e?`<small>${ueqTxt(e.id)}${e.fake&&e.known?'（偽物）':''}</small>`:''}`,f(){uEquip(id,i);}};});
  if(!u.kai)btns.push({t:`開眼させる<small>${ulv(id)>=20?'1,500fr':'Lv20で解放'}</small>`,cls:ulv(id)>=20?'gold':'',dis:ulv(id)<20||P().money<1500,f(){P().money-=1500;u.kai=1;u.hp=umax(id);addLog(`${nameOf(id)}が芸の境地に開眼した。`);hpush(`${nameOf(id)}、開眼`);cutin(realId(id),'開眼！',`${nameOf(id)}、新たな境地へ`);save();render();}});
  if(id!=='you')btns.push({t:'語らう<small>話を聞く・満足+2（月1回）</small>',f(){uTalk(id);}});
  btns.push({t:'閉じる'});modal(nameOf(id),body,btns);
}
function uTalk(id){
  const c=charById(id),u=ux(id),m=moodOf(id);G.talk=G.talk||{};const first=G.talk[id]!==G.month;
  const lines=[c.quip,c.trivia,`得意なのは${c.piece}。いつかあなたの楽団で、最高の形で弾きたい。`];
  if(u.lv>=20)lines.push('このごろ、音が自分の手を離れて鳴るような気がするんだ。');
  if(u.kai)lines.push('開眼してから、聴衆の呼吸までわかるようになった。');
  if(guestEra(id))lines.push(`${U_ERA[guestEra(id)]}の仲間たちが、この時代の音楽を聴いたらどう言うだろう。`);
  if(m<45)lines.push('……少し疲れている。給金のことも、考えてもらえないだろうか。');else if(m>=85)lines.push('いまの楽団は最高だ。どこへでもついていくよ。');
  if(first){G.talk[id]=G.month;setMood(id,m+2);}
  const real=realId(id);modal(`${c.name}との語らい`,`${portraitRow(real)}「${pick(lines)}」`,[{t:'♪ 一節を聴く',f(){playMotif(c.motif,c.tim);uTalk(id);}},{t:'戻る',f(){uDetail(id);}}]);
}
function bowed(id){return typesOf(id).some(t=>['vn','vc','cb'].includes(t));}
function slotLabel(id,i){const t=typesOf(id)[0];if(i===0)return t==='cond'?'指揮棒':t==='comp'?'筆と譜面':t==='voice'?'舞台衣装':'楽器';if(i===1)return bowed(id)?'弓':'小物';return'小物';}
function slotOK(id,i,e){const c=UEQ[e.id].cat||'acc';if(i===0)return c==='inst';if(i===1)return bowed(id)?c==='bow':c==='acc';return c==='acc';}
function uEquip(id,i){
  const types=typesOf(id);const used=new Set(Object.keys(G.ux).filter(x=>x!==id&&(x==='you'||G.members.includes(x))).flatMap(x=>G.ux[x].eq).filter(Boolean));
  const u=ux(id);const ok=G.ueq.filter(e=>(!used.has(e.uid)&&!u.eq.some((q,j)=>j!==i&&q===e.uid))&&slotOK(id,i,e)&&(UEQ[e.id].t.includes('*')||UEQ[e.id].t.some(t=>types.includes(t))));
  modal(`${slotLabel(id,i)}を選ぶ`,ok.length?'この枠に合うものだけ表示しています。':'合うものがありません。楽器商や楽器工房で手に入れましょう。',
    ok.map(e=>({t:`${eqName(e)}<small>${ueqTxt(e.id)}${UEQ[e.id].h?`<br>${UEQ[e.id].h}`:''}</small>`,f(){u.eq[i]=e.uid;save();render();uDetail(id);}})).concat([{t:'外す',f(){u.eq[i]=null;save();render();uDetail(id);}},{t:'戻る',f(){uDetail(id);}}]));
}
function uInvite(){
  const cand=[];for(const s of Object.keys(SCEN)){if(s===G.sc)continue;for(const c of SCEN[s].chars.concat(SCEN[s].rivals).concat(Object.keys(SCEN[s].players).map(id=>guestSrc(s,id)))){if(Math.max(UHIST[c.id]||0,c.lv>=7?5:c.lv>=6?4:c.lv===5?3:c.lv===4?2:1)<3||cand.some(x=>x.c.id===c.id)||SC.chars.some(x=>x.id===c.id)||c.id===G.pid)continue;if(Object.values(SCEN).some(S=>Object.keys(S.players||{}).includes(c.id))&&false)continue;cand.push({c,s});}}
  const h=hashS(String(G.month)+G.pid);const hr=c=>Math.max(UHIST[c.id]||0,c.lv>=7?5:c.lv>=6?4:c.lv===5?3:c.lv===4?2:1);const list=cand.sort((a,b)=>((hashS(a.c.id)+h)%97)-((hashS(b.c.id)+h)%97)).slice(0,8).sort((a,b)=>hr(b.c)-hr(a.c));
  modal('時を越える招待状',`招待状を送る相手を選ぶ（今月の候補8人）。<br>客演の音楽家は<b>史実の格（全盛期の★と力）</b>で現れる。契約金なしで加わるが、月給はかかる。`,list.map(({c,s})=>{const RS=RSC;RSC=s;const p=portrait(c.id,30);RSC=RS;return{t:`<span style="display:inline-block;vertical-align:middle">${p}</span> ${c.name}<small><span style="color:${U_RCOL[hr(c)-1]}">${'★'.repeat(hr(c))}</span> ${U_ERA[s]}・${SEATTYPE[c.seat]?U_TN[SEATTYPE[c.seat]]:c.seat}${hr(c)>(c.lv>=7?5:c.lv>=6?4:c.lv===5?3:c.lv===4?2:1)?'・全盛期の姿で現れる':''}</small>`,f(){
    G.uinv--;G.guests.push({id:c.id,era:s,city:P().city});syncGuests();ens5();G.members.push(c.id);G.sal[c.id]=demandOf(c.id);setMood(c.id,80);
    addLog(`時を越える招待状に応え、${U_ERA[s]}から${c.name}が客演に現れた！`);hpush(`${U_ERA[s]}から${c.name}が時を越えて客演`);playMotif(c.motif,c.tim);cutin(c.id,'時を越えて参上！',c.name);save();render();}};}).concat([{t:'やめる'}]));
}

/* ---- 巡演タブ ---- */
let UST='city';
function sortieHTML(){
  ensU();const k=P().city,c=ci(k),own=G.owner[k],sg=own==='player'?null:sgOf(k),r=cityRoute(k);
  const bossN=own==='player'?'挑戦者の楽団':own?`${rivalLeader(own).name}（${rivalById(own).name}陣営の頭目）`:`${c.inst}の${c.head||'楽長'}`;
  const bossP=own&&own!=='player'?own:'critic';
  const head=`<div class="ftabs"><button data-ust="city" class="${UST==='city'?'on':''}">演奏旅行</button><button data-ust="exp" class="${UST==='exp'?'on':''}">派遣公演</button><button data-ust="door" class="${UST==='door'?'on':''}" ${doorOpen()?'':'disabled'}>時の扉</button></div>`;
  if(UST==='exp')return head+`<div class="card pmeta">派遣楽団を派遣公演に出して資金を稼ぎます（月日が進むと帰ってくる）。条件を満たさないと失敗します。</div>
    ${G.uexp[1]?`<div class="card"><b class="busy">派遣公演中：${UEXP.find(e=>e.id===G.uexp[1].eid).n}</b>　あと${G.uexp[1].until-G.month}か月</div>`:''}
    ${UEXP.map(e=>`<div class="card"><b>${e.n}</b>　<span class="pmeta">${e.m}か月</span><br><span class="pmeta">条件：${e.req.num}人以上${e.req.types?`・${e.req.types.map(t=>U_TN[t]).join('か')}を含む`:''}${e.req.lvsum?`・Lv合計${e.req.lvsum}以上`:''}</span><br><span class="pmeta">報酬：${fmt(e.rew.fr)}fr${e.rew.xp?`・名声+${e.rew.xp}`:''}${e.rew.eq?'・楽器':''}</span>
      <button class="btn" data-uex="${e.id}" style="width:100%;margin-top:4px" ${G.uexp[1]?'disabled':''}>派遣楽団を送る${G.fleet[1].length&&!uExpCheck(e)?'（条件OK）':''}</button></div>`).join('')}`;
  if(UST==='door')return head+`<div class="card pmeta">時代を越えた音楽家たちとの一戦。勝てば「時を越える招待状」が手に入り、別の時代の音楽家を楽団に招けます（旅費は2倍・1か月）。</div>`+
    doors().map((d,i)=>{const RS=RSC;RSC=d.era;const p=portrait(d.boss.id,50,'#6a4bd0');RSC=RS;const done=G.door[d.id];const lock=i===3&&Object.keys(G.door).length<3;
      return`<button class="btn mapc" data-udoor="${i}" ${lock?'disabled':''}>${lock?'<div class="empty-pt">?</div>':p}<div style="flex:1"><b>${d.n}</b><br><span class="pmeta">${lock?'ほかの3つの扉を踏破すると開く':`待ち受ける：${d.boss.name}`}${done?'・踏破済み（再挑戦可）':''}</span></div></button>`;}).join('');
  const f=G.fleet[0];const brk=f.filter(id=>uhs(id)>=3).map(nameOf);
  return head+`<div class="card"><div style="display:flex;gap:10px;align-items:center">${portrait(bossP,56,'#c33')}<div style="flex:1"><b>${c.name}への演奏旅行</b><br><span class="pmeta">大御所：${bossN}</span>
    ${sg?`<div class="gauge"><i style="width:${sg.g/sg.max*100}%"></i></div><span class="pmeta">牙城 ${sg.g}/${sg.max}（大御所の舞台で喝采を得るたびに崩れ、0でこの都市を支配）</span>`:'<br><span class="pmeta">支配下の都市。巡業で経験と収入を得られる。</span>'}</div></div>
    <div class="pmeta" style="margin-top:6px">道のり：${r.route.map(s=>s.map(n=>`${n}${'（'+r.nodes[n].t+'）'}`).join('／')).join(' → ')}</div>
    <div class="pmeta">都市の格 Lv${cityLv(k)}・巡演楽団の力 ${uFleetPow()}</div>
    ${brk.length?`<div class="pmeta" style="color:#f88">限界の団員がいます：${brk.join('、')}</div>`:''}
    <button class="btn gold" id="uGo" style="width:100%;margin-top:6px" ${f.length&&P().money>=sortieCost()?'':'disabled'}>巡演に旅立つ<small>旅費${fmt(sortieCost())}fr・1か月</small></button></div>
   <div class="sec-t">各都市の牙城</div><div class="card" style="font-size:12.5px">${SC.cities.map(x=>{const o=G.owner[x];if(o==='player')return`<div>${ci(x).name}：<b style="color:var(--gold2)">支配下</b></div>`;const s=sgOf(x);return`<div>${ci(x).name}：牙城 ${s.g}/${s.max}${o?`（${rivalById(o).name}陣営）`:''}</div>`;}).join('')}<span class="pmeta">巡演は今いる都市が対象。地図で都市を移ってから旅立つ。</span></div>`;
}
function uFleetPow(){return Math.round(G.fleet[0].reduce((a,id)=>a+(mstat(id,'tech')+mstat(id,'expr')+mstat(id,'impro'))/3*2+ulv(id)/3,0));}
function uExpCheck(e){const f=G.fleet[1].filter(id=>G.members.includes(id));if(f.length<e.req.num)return`${e.req.num}人以上が必要`;if(e.req.types&&!f.some(id=>typesOf(id).some(t=>e.req.types.includes(t))))return`${e.req.types.map(t=>U_TN[t]).join('か')}が必要`;if(e.req.lvsum&&f.reduce((a,id)=>a+ulv(id),0)<e.req.lvsum)return`Lv合計${e.req.lvsum}以上が必要`;return'';}
function bindSortie(){
  document.querySelectorAll('[data-ust]').forEach(b=>b.onclick=()=>{UST=b.dataset.ust;render();});
  const g=$('#uGo');if(g)g.onclick=()=>{const f=G.fleet[0];const brk=f.filter(id=>uhs(id)>=3);const k=P().city;
    modal(`${ci(k).name}を巡演`,`巡演楽団（${f.length}人）で旅立ちます。費用${fmt(sortieCost())}fr。帰還すると1か月が過ぎます。${brk.length?`<br><b style="color:#c22">限界：${brk.map(nameOf).join('、')}。旅の途中で攻勢を受けると楽団を去ることがあります。</b>`:''}`,[{t:'旅立つ',cls:'gold',f(){startSortie(k);}},{t:'やめる'}]);};
  document.querySelectorAll('[data-uex]').forEach(b=>b.onclick=()=>{const e=UEXP.find(x=>x.id==b.dataset.uex);const f=G.fleet[1].filter(id=>G.members.includes(id));if(!f.length){UFS=1;TAB='fleet';render();return toast('まず派遣楽団の顔ぶれを決めてください');}
    const why=uExpCheck(e);modal('派遣公演に出す',`派遣楽団（${f.map(nameOf).join('、')}）を「${e.n}」へ。${e.m}か月後に帰還。${why?`<br><b style="color:#c22">条件不足：${why}（このままだと失敗）</b>`:''}`,[{t:'送り出す',cls:'gold',f(){G.uexp[1]={eid:e.id,until:G.month+e.m,ok:!why,why};ens();for(const id of f)G.away[id]={until:G.month+e.m,why:'派遣公演中'};addLog(`派遣楽団が派遣公演「${e.n}」に出発した。`);save();render();}},{t:'やめる'}]);});
  document.querySelectorAll('[data-udoor]').forEach(b=>b.onclick=()=>{const d=doors()[+b.dataset.udoor];modal(d.n,`${U_ERA[d.era]}の音楽家たちと一戦交える。費用${fmt(sortieCost()*2)}fr・1か月。`,[{t:'扉を開く',cls:'crim',f(){startDoor(d);}},{t:'やめる'}]);});
}

/* ---- 画面への組み込み ---- */
(function(){
  const tabs=$('#tabs');const ob=tabs.querySelector('[data-t="orch"]');
  const b1=document.createElement('button');b1.dataset.t='fleet';b1.textContent='稽古場';
  const b2=document.createElement('button');b2.dataset.t='sortie';b2.textContent='巡演';
  ob.after(b1);b1.after(b2);
})();
const _renderU=render;
render=function(){
  if(!G)return;ensU();syncGuests();
  if(TAB==='fleet'||TAB==='sortie'){renderHUD();document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===TAB));
    $('#main').innerHTML=TAB==='fleet'?fleetHTML():sortieHTML();if(TAB==='fleet')bindFleet();else bindSortie();return;}
  _renderU();
  if(TAB==='map'){const k=P().city;const own=G.owner[k];const box=document.createElement('div');box.className='card';box.style.fontSize='12.5px';
    box.innerHTML=own==='player'?`巡演：${ci(k).name}は支配下。<button class="mini" id="uGoTab">巡業に出る</button>`:`この街の牙城 ${sgOf(k).g}/${sgOf(k).max}　<button class="mini" id="uGoTab">巡演の準備へ</button><br><span class="pmeta">説得・興行戦争に加え、楽団を率いた巡演でも都市を手に入れられる。</span>`;
    const acts=$('#main .actions');if(acts&&acts.parentElement)acts.parentElement.after(box);const g=$('#uGoTab');if(g)g.onclick=()=>{TAB='sortie';UST='city';render();window.scrollTo(0,0);};}
};
const _newGameU=newGame;
newGame=function(sc,pid,diff){_newGameU(sc,pid,diff);ensU();syncGuests();};
const _restU=rest;
rest=function(){for(const id of ['you'].concat(G.members)){const u=ux(id);u.hp=Math.min(umax(id),uhp(id)+Math.ceil(umax(id)*.4));}_restU();};
ACH.push(
 {id:'u_sortie',n:'旅立ち',d:'初めて巡演に出た',c:()=>G.ust&&G.ust.sorties>=1},
 {id:'u_cap',n:'旅する楽団',d:'演奏旅行で都市を攻略',c:()=>G.ust&&G.ust.caps>=1},
 {id:'u_cap3',n:'征旅の楽団',d:'演奏旅行で3都市を攻略',c:()=>G.ust&&G.ust.caps>=3},
 {id:'u_kai',n:'開眼',d:'楽団員が開眼した',c:()=>G.ux&&Object.values(G.ux).some(u=>u.kai)},
 {id:'u_lv50',n:'円熟',d:'楽団員がLv50に到達',c:()=>G.ux&&Object.values(G.ux).some(u=>u.lv>=50)},
 {id:'u_guest',n:'時を越えた共演',d:'別の時代の音楽家を招いた',c:()=>G.guests&&G.guests.length>=1},
 {id:'u_devil',n:'悪魔との契約',d:'【EX】タルティーニの夢を踏破',c:()=>G.door&&G.door.d3},
 {id:'u_set',n:'史実の再現',d:'史実の縁を結んだ',c:()=>G.fleet&&uSets(G.fleet[0]).length>=1}
);

const _startU=start;
start=function(){_startU();ensU();if(!G.flags.uIntro){G.flags.uIntro=1;save();modal('統合版の遊び方',`旅・説得・演奏対決・演奏会はこれまでどおり。そこに<b>楽団を育てて率いる巡演</b>が加わった。
 <div class="sec-p">稽古場</div>巡演楽団（あなた自身も入れる）を6人まで選ぶ。先頭はコンサートマスター。楽団員はLv1〜99に育ち、Lv20で<b>開眼</b>（能力と特技が伸びる）。楽器や道具を2つまで<b>愛用品</b>として持たせる（その時代に存在するものだけ）。史実の仲間をそろえると<b>史実の縁</b>が結ばれる。
 <div class="sec-p">巡演</div>いま居る都市の会場を一夜ずつ回る。毎晩、聴衆の顔ぶれを見て演奏スタイルを選び、序曲→第1楽章→第2楽章→アンコールと演奏が進む。街から街への道中では、旅のできごとが起こる。大御所の舞台で喝采を得るたびに<b>牙城</b>が崩れ、0になると<b>その都市を手に入れる</b>。旅先で音楽家が仲間入りを申し出ることも。<b>限界の団員を無理に舞台に立たせると、楽団を去ってしまう。</b>
 <div class="sec-p">派遣公演</div>派遣楽団を数か月の仕事に出して資金を稼ぐ。
 <div class="sec-p">時の扉</div>3都市を手に入れると開く。踏破すると「時を越える招待状」が手に入り、別の時代の音楽家（バッハやマーラーなど）を客演に招ける。`);}};
