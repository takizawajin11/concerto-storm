/* =====================================================================
   ヴィオラと金管の席
   ===================================================================== */
SEATS.splice(SEATS.indexOf('チェロ首席'),0,'ヴィオラ首席');SEATS.push('金管首席');
Object.assign(SEATTYPE,{'ヴィオラ首席':'va','金管首席':'br'});
Object.assign(T_LBL,{va:'ヴィオラ',br:'金管'});
TLBL.s1723=Object.assign(TLBL.s1723||{},{br:'トランペット',va:'ヴィオラ'});TLBL.s1781=Object.assign(TLBL.s1781||{},{br:'ホルン'});
SEATLBL.s1723=Object.assign(SEATLBL.s1723||{},{'金管首席':'トランペット首席'});SEATLBL.s1781=Object.assign(SEATLBL.s1781||{},{'金管首席':'ホルン首席'});
/* 主人公：バッハとモーツァルトは合奏でヴィオラを好んで弾いた */
PTYPE.mozart=(PTYPE.mozart||['pf']).concat(['va']);PTYPE.bach=(PTYPE.bach||['pf','comp']).concat(['va']);
/* 既存の人物を新しい席へ */
const SEATMOVE={cstamitz:'ヴィオラ首席',urhan:'ヴィオラ首席',tertis:'ヴィオラ首席',nedbal:'ヴィオラ首席',punto:'金管首席',leutgeb:'金管首席',fstrauss:'金管首席',reiche:'金管首席'};
for(const sc in SCEN)for(const c of SCEN[sc].chars)if(SEATMOVE[c.id])c.seat=SEATMOVE[c.id];
Object.assign(XTYPES,{cstamitz:['va','vn','comp'],urhan:['va','vn'],tertis:['va'],nedbal:['va','comp'],punto:['br'],leutgeb:['br'],fstrauss:['br'],reiche:['br']});
/* 席を埋める人を足す */
const SEATADD={
 s1781:[['weidinger','トランペット',C('weidinger','ヴァイディンガー','A. Weidinger','vienna','金管首席','古典',4,[9,8,7,6],false,'tech',[.9,.3,1.0,.9,1.1],'fanfare','flute','ハイドン トランペット協奏曲','キーのついたトランペットを、自分で考えました。','半音も吹けるトランペットを、あなたの楽団に。','ウィーン宮廷のトランペット奏者。キー付きトランペットを開発し、ハイドンはこの楽器のために協奏曲を書いた。')]],
 s1832:[['meifred','ホルン',C('meifred','メイフレ','J. Meifred','paris','金管首席','古典',3,[8,8,6,7],false,'expr',[.9,.2,1.1,.9,1.0],'fanfare','flute','バルブ・ホルンの教本','ピストンのついたホルンこそ、これからの楽器です。','新しいホルンを、あなたの楽団に。','バルブ（ピストン）付きホルンの先駆者。1833年からパリ音楽院でバルブ・ホルンを教えた。')],
   ['elewy','ホルン',C('elewy','E.C.レヴィ','E. C. Lewy','vienna','金管首席','古典',3,[8,8,6,6],false,'expr',[.9,.2,1.0,.9,1.1],'fanfare','flute','ベートーヴェン 第九のホルン独奏','ケルントナートーア劇場のホルンです。','ウィーンのホルンを、あなたの楽団に。','ウィーンの名ホルン奏者。ベートーヴェン『第九』の初演で、第3楽章の有名なホルン独奏を吹いたといわれる。')]],
 s1876:[['ritter','ヴィオラ',C('ritter','ヘルマン・リッター','H. Ritter','bayreuth','ヴィオラ首席','ロマン',3,[7,9,7,8],false,'expr',[.9,.3,1.0,.9,1.3],'tristan','violin','ヴィオラ・アルタのための小品','わたしの大きなヴィオラを、ワーグナー先生が気に入ってくださって。','ヴィオラ・アルタの響きを、あなたの楽団に。','大型のヴィオラ「ヴィオラ・アルタ」を考案した奏者。ワーグナーに招かれ、1876年の第1回バイロイト音楽祭で弾いた。')]],
 s1905:[['clarke','コルネット',C('clarke','ハーバート・L・クラーク','H. L. Clarke','newyork','金管首席','名人芸',5,[11,8,8,6],true,'tech',[1.2,.6,.7,1.1,1.2],'fanfare','flute','コルネット独奏曲『カーニバル・オブ・ヴェニス』','スーザ・バンドで吹いています。','コルネットの王様を、あなたの楽団に。','スーザ・バンドの花形コルネット奏者。超絶技巧の練習曲は、今も金管奏者のバイブル。')],
   ['gumpert','ホルン',C('gumpert','フリードリヒ・グンペルト','F. Gumpert','leipzig','金管首席','古典',3,[8,8,6,8],false,'expr',[.9,.2,1.1,.9,1.0],'fanfare','flute','ブラームス 交響曲のホルン','ゲヴァントハウスで、ホルンを30年。','ライプツィヒのホルンを、あなたの楽団に。','ゲヴァントハウス管弦楽団の首席ホルン奏者で名教師。オーケストラのホルン教本で知られる。')]]
};
for(const sc in SEATADD)for(const [id,lbl,c] of SEATADD[sc]){if(!SCEN[sc].chars.some(x=>x.id===id))SCEN[sc].chars.push(c);if(typeof ILBL!=='undefined')ILBL[id]=lbl;}
Object.assign(TR,{weidinger:{h:'wig'},meifred:{h:'short',hc:'#5a4a3a',b:'side'},elewy:{h:'short',hc:'#3a2a1a',b:'side'},ritter:{h:'short',hc:'#3a2a1a',b:'full'},clarke:{h:'short',hc:'#3a2a1a',b:'mus'},gumpert:{h:'bald',b:'full',bc:'#9a8a7a'}});
if(typeof UHIST!=='undefined')Object.assign(UHIST,{weidinger:3,meifred:3,elewy:3,ritter:3,clarke:4,gumpert:3});
/* 演目にヴィオラと金管の席を加える（オーケストラの曲） */
for(const sc in SCEN){const y=U_YEAR?U_YEAR[sc]:1800;for(const p of (SCEN[sc].rep||[])){
  if(['交響曲','楽劇','バレエ','管弦楽'].includes(p.form)||(p.form==='オペラ'&&p.slots.length>=4)){
    if(!p.slots.some(s=>[].concat(s.r).includes('va')))p.slots.push(Sl('va','ヴィオラ'));
    if(sc!=='s1723'&&['交響曲','楽劇','バレエ'].includes(p.form)&&!p.slots.some(s=>[].concat(s.r).includes('br')))p.slots.push(Sl('br',y<1820?'ホルン':'ホルン・金管'));}
  if(p.id==='k495')p.slots[0]=Sl(['br'],'独奏ホルン');
  if(p.id==='k364'||p.id==='harold')p.slots=p.slots.map(s=>/ヴィオラ/.test(s.l)?Sl(['va'],s.l):s);}}
SCEN.s1781.rep.push(Pc('haydntp','ハイドン トランペット協奏曲（1796）','協奏曲',[Sl(['br'],'独奏トランペット'),Sl('cond','指揮'),Sl('vn','コンサートマスター')],[.5,.4,.1],'古典','haydn','fanfare','flute'));
SCEN.s1723.rep.push(Pc('brand2','ブランデンブルク協奏曲 第2番（高音トランペット）','協奏曲',[Sl(['br'],'独奏トランペット'),Sl('vn','ヴァイオリン'),Sl('fl','リコーダー'),Sl('cl','オーボエ')],[.5,.3,.2],'古典','bach','fanfare','flute'));
if(typeof CONC!=='undefined')Object.assign(CONC,{haydntp:{sol:['weidinger'],t:'ヴァイディンガーのキー付きトランペットのために書かれた'},brand2:{sol:['reiche'],t:'バッハの町のトランペット名手'}});
/* 巡演の戦いと遠征での扱い */
Object.assign(U_TN,{va:'ヴィオラ',br:'金管'});Object.assign(U_TI,{va:'🎻',br:'🎺'});
UNT.交響.fit.va=1.15;UNT.交響.fit.br=1.25;UNT.オペラ.fit.br=1.1;UNT.協奏.fit.va=1.05;
UATK.va='深い内声';UATK.br='高らかなファンファーレ';
const _ex4=UEXP.find(e=>e.id===4);if(_ex4)_ex4.req.types=['vn','va','vc'];
UEXP.push({id:8,n:'祝典のファンファーレ',m:1,req:{num:2,types:['br']},rew:{fr:380,xp:20}});
/* 実績「満席」は席の数に合わせる */
const _fullA=ACH.find(a=>a.id==='full');if(_fullA){_fullA.d=`${SEATS.length}席すべてを埋めた`;_fullA.c=()=>seatsFilled()>=SEATS.length;}
/* ヴィオラと金管の名器 */
Object.assign(UEQ,{
 gasparo_va:{n:'ガスパロ・ダ・サロのヴィオラ',t:['va'],cat:'inst',fam:1,tech:1,expr:3,r:4,y:1570,v:4,h:'ヴィオラの名器といえばブレシア派。深く大きな音が魅力。'},
 str_viola:{n:'ストラディヴァリウス 1719年製ヴィオラ',t:['va'],cat:'inst',fam:1,tech:2,expr:3,r:5,y:1719,v:5,h:'ストラディヴァリのヴィオラは十挺ほどしか残っていない。'},
 viola_plain:{n:'工房のヴィオラ',t:['va'],cat:'inst',tech:1,expr:1,r:2,y:1600,v:2,h:'ありふれたヴィオラ。'},
 raoux:{n:'ラウーの銀のホルン',t:['br'],cat:'inst',fam:1,tech:2,expr:2,r:4,y:1760,v:4,own:['punto'],h:'パリのラウー工房の名品。プントは銀製のラウーのホルンを吹いたと伝わる。'},
 natural_hn:{n:'ナチュラル・ホルン',t:['br'],cat:'inst',tech:1,r:2,y:1600,yz:1860,v:2,h:'手を朝顔に入れて音程を変える、昔ながらのホルン。'},
 valve_hn:{n:'バルブ・ホルン',t:['br'],cat:'inst',tech:2,r:3,y:1818,v:3,h:'1818年ごろに生まれたバルブ付きのホルン。半音が楽に出せる。'},
 keyed_tp:{n:'キー付きトランペット',t:['br'],cat:'inst',tech:2,r:3,y:1793,yz:1850,v:3,own:['weidinger'],h:'ヴァイディンガーが開発した、キーで半音を出すトランペット。'},
 cornet:{n:'コルネット・ア・ピストン',t:['br'],cat:'inst',tech:2,expr:1,r:3,y:1828,v:3,own:['clarke'],h:'1828年ごろパリで生まれたピストン付きの金管。19世紀のスター楽器。'},
 baroque_tp:{n:'バロック・トランペット',t:['br'],cat:'inst',tech:1,expr:1,r:2,y:1600,yz:1800,v:2,own:['reiche'],h:'バルブのない長いトランペット。高い音域で旋律を吹くには名人芸が要った。'}
});
for(const k of Object.keys(UEQ))if(UEQ[k].cat==='bow'&&UEQ[k].t.includes('vn')&&!UEQ[k].t.includes('va'))UEQ[k].t.push('va');
const _bowedS=bowed;bowed=function(id){return typesOf(id).some(t=>['vn','va','vc','cb'].includes(t));};
/* 開始時の目標文を席数に合わせる */
const _addLogS=addLog;addLog=function(s){if(typeof s==='string')s=s.replace(/9席中(\d+)席/,(m,a)=>`${SEATS.length}席中${a}席`).replace('全9席',`全${SEATS.length}席`);return _addLogS(s);};
