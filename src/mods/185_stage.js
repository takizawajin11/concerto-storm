/* =====================================================================
   街角向きと舞台向き：酒場や路上で受ける音楽家と、ホールでこそ輝く音楽家
   STAGE[id]=['street'|'hall', 理由]
   ・街角向き：路上・酒場で人だかり×1.4（酒場×1.7）、機嫌が上がる。民衆の人気40以上の街の演奏会で+0.3
   ・舞台向き：路上で人だかり×0.6（酒場×0.4）、機嫌が下がる。大きな街（規模5以上）の演奏会で+0.3
   ===================================================================== */
Object.assign(MOTIFS,{
 /* 『乞食オペラ』にも使われた古い俗謡「グリーンスリーヴス」 */
 ballad:[[57,.25],[60,.5],[62,.25],[64,.4],[65,.15],[64,.25],[62,.5],[59,.25],[55,.4],[57,.15],[59,.25],[60,.5],[57,.25],[57,.4],[56,.15],[57,.25],[59,.5],[56,.25],[52,.6]]
});
const FOLK={
 s1723:[
  C('gay','ジョン・ゲイ','John Gay','london','作曲','名人芸',3,[4,8,9,5],false,'impro',[1.0,1.2,.4,1.1,1.3],'ballad','voice','『乞食オペラ』','難しいイタリア語より、みんなが知ってる歌で笑わせたい。','酒場の歌でオペラ座に勝ってみせよう。','1728年、町で歌われていた流行り歌をつなぎ合わせた『乞食オペラ』で大当たり。イタリア・オペラの人気を一時食ってしまい、「ゲイを金持ち（リッチ）に、興行主リッチを陽気（ゲイ）にした」と言われた。'),
  C('carey','ケアリー','Henry Carey','london','作曲','名人芸',3,[5,8,8,6],false,'expr',[.9,1.1,.6,1.0,1.3],'ballad','voice','歌『路地のサリー』','路地の娘の歌が、いちばん売れるんですよ。','街の歌なら、いくらでも書きましょう。','歌『路地のサリー』で人気を得た歌の作者。息子は「イギリス国歌『ゴッド・セイヴ・ザ・キング』は父の作だ」と主張した（真偽は不明）。'),
  C('pepusch','ペープシュ','J. C. Pepusch','london','作曲','古典',4,[6,5,5,11],false,'tech',[1.0,.3,1.5,.9,.7],'bach','piano','『乞食オペラ』序曲','往来で弾く？ わたしは学者ですよ。','古い名曲を、正しく演奏しましょう。','ドイツ生まれ、ロンドンで活躍した学者肌の音楽家。古い名曲を演奏する「古楽アカデミー」の創設に関わった。『乞食オペラ』では序曲と伴奏を受け持った。')
 ],
 s1781:[
  C('schikaneder','シカネーダー','E. Schikaneder','vienna','プリマドンナ','名人芸',4,[5,9,10,6],false,'impro',[1.2,1.2,.5,1.2,1.2],'mozart','voice','『魔笛』よりパパゲーノの歌','客席が笑えば、それが芸術だ！','一座ごと面倒を見てくれるなら、乗った。','旅回りの一座の座長で、役者・歌手・台本作者。1789年からウィーンのヴィーデン劇場を率い、1791年に『魔笛』の台本を書いて、自らパパゲーノを演じた。'),
  C('dibdin','ディブディン','Charles Dibdin','london','作曲','名人芸',4,[5,9,9,5],false,'expr',[1.0,1.0,.5,1.1,1.3],'ballad','voice','海の歌『トム・ボウリング』','船乗りの歌なら、港の酒場で泣かせてみせる。','一人で歌って弾いて、客を呼んでみせますよ。','作曲家・歌手・役者。1789年から、ひとりで歌い弾き語る「テーブル・エンターテインメント」で人気を博した。水兵を歌った歌は海軍の兵隊集めにも役立ったという。'),
  C('albrechtsberger','アルブレヒツベルガー','J. G. Albrechtsberger','vienna','作曲','古典',5,[8,5,6,12],false,'tech',[1.0,.2,1.6,1.0,.6],'bach','piano','フーガ ハ長調','対位法の規則を守らぬ音楽は、音楽ではない。','楽団員に対位法を教えて差し上げよう。','ウィーン宮廷のオルガン奏者で、のちに聖シュテファン大聖堂の楽長。若きベートーヴェンに対位法を教えた。厳格な理論の教科書を書いた。')
 ],
 s1832:[
  C('lanner','ランナー','Joseph Lanner','vienna','コンサートマスター','名人芸',4,[7,9,8,5],false,'expr',[1.1,.8,.5,1.1,1.3],'waltz','violin','ワルツ『シェーンブルンの人々』','酒場の客が踊りだしたら、こっちのもんさ。','ワルツを弾かせてくれるなら、どこへでも。','ウィーンの酒場で弾く小さな楽団から出発したワルツの名手。若きヨハン・シュトラウス（父）は彼の楽団員だったが、1825年に独立して最大の好敵手になった。'),
  C('musard','ミュザール','Philippe Musard','paris','指揮','名人芸',4,[5,7,10,5],false,'impro',[1.2,1.4,.3,1.2,1.3],'cancan','violin','ギャロップ「地獄の舞踏会」','最後のギャロップで、ピストルを鳴らしましょう！','舞踏会を任せてくれれば、パリが沸く。','パリ・オペラ座の仮面舞踏会で人気を集めた舞曲の指揮者。曲の最後にピストルを撃たせたり椅子を叩き壊したりという派手な演出で「ナポレオン・ミュザール」と呼ばれた。1833年から入場料の安い遊歩音楽会も開いた。'),
  C('beranger','ベランジェ','P.-J. de Béranger','paris','プリマドンナ','ロマン',4,[3,10,9,4],false,'expr',[.8,1.5,.3,1.2,1.4],'ballad','voice','シャンソン『イヴトーの王様』','わたしの歌は、王さまより民衆が好きでね。','歌で世の中をからかうのは得意ですよ。','民衆に愛されたシャンソンの作者。歌で王政を風刺して二度投獄されたが、そのたびに人気が増した。'),
  C('cherubini','ケルビーニ','L. Cherubini','paris','作曲','古典',6,[8,7,5,12],true,'tech',[1.1,.2,1.6,1.1,.6],'classic','violin','レクイエム ハ短調','音楽院の院長が、往来で弾けと？','規律ある楽団なら、手を貸そう。','パリ音楽院の院長（1822〜42）。厳格で恐れられ、1823年には12歳のリストの入学を「外国人だから」と断った。ベートーヴェンは当代一の作曲家と尊敬した。')
 ],
 s1876:[
  C('ziehrer','ツィーラー','C. M. Ziehrer','vienna','指揮','名人芸',4,[6,8,8,6],false,'expr',[1.1,.8,.5,1.1,1.3],'danube','violin','ワルツ『ウィーン娘』','行進曲で通りを練り歩けば、みんなついてくる。','軍楽隊仕込みの音、聴かせましょう。','ウィーンの軍楽隊長で、ワルツと行進曲の作曲家。シュトラウス一家の好敵手で、のちに最後のウィーン宮廷舞踏会音楽監督となった。'),
  C('theresa','テレザ','Thérésa','paris','プリマドンナ','名人芸',5,[5,11,8,3],false,'expr',[1.3,1.4,.3,1.3,1.3],'cancan','voice','カフェ・コンセールの歌','オペラ座？ わたしの客は、カフェで待ってるの。','街の歌を、大きな舞台に連れていってあげる。','本名エマ・ヴァラドン。1860年代、パリのカフェ・コンセール「アルカザール」で一世を風靡した歌手。上流のサロンにも招かれ、「カフェ・コンセールの女王」と呼ばれた。'),
  C('sullivan','サリヴァン','Arthur Sullivan','london','作曲','ロマン',5,[7,9,8,8],false,'expr',[1.2,.8,.8,1.2,1.1],'classic','voice','『陪審裁判』','口笛で吹ける旋律こそ、最高の旋律です。','劇場でも教会でも、お役に立ちますよ。','1875年、台本作家ギルバートと組んだ喜歌劇『陪審裁判』が大当たり。二人の作品の歌は、ロンドンの街角で口笛で吹かれるほど流行った。歌曲『失われた和音』も大ヒットした。')
 ],
 s1905:[
  C('iberlin','アーヴィング・バーリン','Irving Berlin','newyork','プリマドンナ','名人芸',2,[2,8,10,3],false,'impro',[1.2,1.0,.2,1.3,1.4],'ballad','voice','ラグタイムの歌','楽譜は読めないけど、客が喜ぶ歌ならわかる。','酒場より大きい店で歌わせてくれるなら。','ロシア生まれの移民の少年。10代でニューヨーク・チャイナタウンの酒場で歌うウェイターをしていた。ピアノは黒鍵（嬰ヘ長調）でしか弾けず、のちに鍵盤をずらせる特製ピアノを使った。'),
  C('lauder','ハリー・ローダー','Harry Lauder','london','プリマドンナ','名人芸',4,[4,10,9,3],false,'expr',[1.2,1.0,.3,1.2,1.4],'ballad','voice','歌『アイ・ラヴ・ア・ラッシー』','炭鉱で歌ってた頃から、客の心はわかってる。','ミュージックホールの客を、まるごと連れてきますよ。','スコットランドの炭鉱夫から、ミュージックホールの大スターになった歌手。キルト姿で歌うスコットランドの歌が大人気だった。'),
  C('mistinguett','ミスタンゲット','Mistinguett','paris','プリマドンナ','名人芸',3,[5,9,8,2],false,'expr',[1.3,1.4,.2,1.3,1.3],'cancan','voice','レヴューの歌','歌劇場より、ミュージックホールのほうが熱いのよ。','わたしが出れば、満員にしてみせる。','パリのミュージックホールの女王。カジノ・ド・パリやムーラン・ルージュのレヴューで活躍した。自慢の脚に保険をかけたという伝説がある。'),
  C('lehar','レハール','Franz Lehár','vienna','指揮','ロマン',5,[7,10,8,8],false,'expr',[1.2,.8,.7,1.2,1.2],'waltz','violin','『メリー・ウィドウ』ワルツ','口ずさめる旋律で、世界を踊らせたい。','オペレッタの楽団なら、任せてください。','元は軍楽隊長。1905年12月、ウィーンのアン・デア・ウィーン劇場で初演した喜歌劇『メリー・ウィドウ』が世界的な大ヒットとなった。')
 ]
};
for(const sc in FOLK){const S=SCEN[sc];for(const c of FOLK[sc]){if(!S.chars.some(x=>x.id===c.id))S.chars.push(c);try{ROSTER_ALL.add(c.id);}catch(e){}}}
Object.assign(TR,{gay:{h:'wig',smile:1},carey:{h:'wig',smile:1},pepusch:{h:'allonge',age:2},schikaneder:{h:'wig',smile:1,round:1},dibdin:{h:'wig'},albrechtsberger:{h:'wig',age:2},
 lanner:{h:'curly',hc:'#5a3a22',b:'side'},musard:{h:'wild',hc:'#2a2018',b:'mus'},beranger:{h:'bald',age:2,round:1,smile:1},cherubini:{h:'receding',hc:'#cfc6b8',age:2,c:'cravat'},
 ziehrer:{h:'short',hc:'#3a2a1a',b:'mus'},theresa:{fem:1,h:'updo',hc:'#2a2018',smile:1,coat:'#8a1a3a'},sullivan:{h:'short',hc:'#2a2018',b:'side'},
 iberlin:{h:'short',hc:'#1a1410',b:'none'},lauder:{h:'short',hc:'#5a3a22',smile:1,round:1},mistinguett:{fem:1,h:'short',hc:'#c8a870',smile:1,coat:'#3a1a4a'},lehar:{h:'short',hc:'#5a3a22',b:'mus'}});
Object.assign(GROW,{iberlin:'late',mistinguett:'late'});
Object.assign(QUIRK,{musard:['star'],schikaneder:['star'],theresa:['diva'],cherubini:['temper']});
if(typeof UHIST!=='undefined')Object.assign(UHIST,{gay:3,carey:2,pepusch:3,schikaneder:4,dibdin:3,albrechtsberger:3,lanner:4,musard:3,beranger:3,cherubini:5,ziehrer:3,theresa:3,sullivan:4,iberlin:4,lauder:3,mistinguett:3,lehar:4});
/* 新しい演目 */
SCEN.s1723.rep.push(Pc('beggar','ゲイ『乞食オペラ』','オペラ',[Sl('voice','ポリー'),Sl('voice','マクヒース'),Sl('vn','ヴァイオリン')],[.1,.4,.5],'名人芸','gay','ballad','voice'));
SCEN.s1781.rep.push(Pc('zauber','『魔笛』より「おいらは鳥刺し」','オペラ',[Sl('voice','パパゲーノ'),Sl('cond','指揮'),Sl('fl','フルート')],[.2,.4,.4],'名人芸','schikaneder','mozart','voice'));
SCEN.s1832.rep.push(Pc('lannerw','ランナー『シェーンブルンの人々』','舞踏会',[Sl('cond','指揮（弾き振り）'),Sl('vn','ヴァイオリン'),Sl('cb','コントラバス')],[.3,.4,.3],'名人芸','lanner','waltz','violin'));
SCEN.s1876.rep.push(Pc('trialjury','サリヴァン『陪審裁判』','オペラ',[Sl('voice','原告の娘'),Sl('cond','指揮'),Sl('vn','コンサートマスター')],[.2,.5,.3],'ロマン','sullivan','classic','voice'));
SCEN.s1905.rep.push(Pc('widow','レハール『メリー・ウィドウ』','オペラ',[Sl('voice','ハンナ'),Sl('cond','指揮'),Sl('vn','コンサートマスター')],[.2,.6,.2],'ロマン','lehar','waltz','voice'));

const STAGE={
 /* 街角向き */
 gay:['street','酒場の歌でオペラを作った'],carey:['street','路地の歌の名人'],schikaneder:['street','旅回り一座の座長'],dibdin:['street','港の酒場で泣かせる'],
 lanner:['street','酒場の楽団から出発'],musard:['street','舞踏会の大将'],beranger:['street','民衆のシャンソン'],ziehrer:['street','通りを練り歩く軍楽隊長'],theresa:['street','カフェ・コンセールの女王'],sullivan:['street','口笛で吹ける旋律'],
 iberlin:['street','酒場で歌うウェイター'],lauder:['street','ミュージックホールの星'],mistinguett:['street','ミュージックホールの女王'],lehar:['street','口ずさめるワルツ'],
 telemann:['street','若い頃、ポーランドの酒場の音楽に夢中になった'],handel:['street','リハーサルに1万2千人が詰めかけた（『王宮の花火の音楽』）'],boccherini:['street','『マドリードの通りの夜の音楽』を書いた'],
 khandoshkin:['street','民謡を弾かせたら一番'],strauss:['street','酒場と舞踏場のワルツ王'],strauss2:['street','ワルツ王'],olebull:['street','ノルウェーの民謡弾き'],offenbach:['street','パリの喜歌劇の王様'],
 brahms:['street','少年時代、家計を助けて酒場や食堂でピアノを弾いたと伝わる'],chaliapin:['street','ヴォルガの荷揚げ人夫から歌手に'],caruso:['street','少年時代、ナポリの通りで歌った'],satie:['street','モンマルトルのキャバレーのピアノ弾き'],casals:['street','10代でバルセロナのカフェで弾いた'],aki:['street','人前に出ると燃えるタイプ'],
 /* 舞台向き */
 pepusch:['hall','学者肌'],albrechtsberger:['hall','厳格な対位法の先生'],cherubini:['hall','音楽院の院長'],
 rameau:['hall','理論書を書く学者肌'],couperin:['hall','宮廷のクラヴサン奏者'],fux:['hall','厳格な対位法の先生'],farinelli:['hall','王のためだけに歌った'],haydn:['hall','エステルハージ家の宮廷楽長'],
 chopin:['hall','大勢の前で弾くのが苦手'],liszt:['hall','ひとりで弾く「リサイタル」を始めた'],clara:['hall','演奏会の舞台の人'],clara76:['hall','演奏会の舞台の人'],joachim:['hall','まじめな室内楽の人'],bruckner:['hall','大聖堂のオルガン弾き'],
 wagner:['hall','自分の劇場を建てた'],franck:['hall','教会のオルガン弾き'],mahler:['hall','歌劇場の総監督'],schoenberg:['hall','難しい音楽の人'],busoni:['hall','思索するピアニスト'],schnabel:['hall','まじめなベートーヴェン弾き'],landowska:['hall','古楽の学者'],cortot:['hall','音楽院の教授']
};
const stageOf=id=>{const r=id==='you'?G.pid:realId(id);return STAGE[r]||null;};
function stageMul(id,S){const s=stageOf(id);if(!s)return 1;const tv=S.id==='tavern';return s[0]==='street'?(tv?1.7:1.4):(tv?.4:.6);}
function stageMood(id,great){const s=stageOf(id);if(!s)return great?8:3;return s[0]==='street'?(great?14:8):-8;}
function stageTag(id){const s=stageOf(id);if(!s)return '';return s[0]==='street'?`<span class="tag stg st">🍺 街角向き</span>`:`<span class="tag stg hl">🎭 舞台向き</span>`;}
SPOTS.push({id:'tavern',n:'酒場',d:'夜の酒場。陽気な客が一緒に歌いだす。街角向きの音楽家は大受け、舞台向きの人は嫌がる。',stat:'impro',mul:1.1,risk:.2});
/* 楽団員の札に印を出す */
const _quirkTagsSG=quirkTags;
quirkTags=function(id){let h=_quirkTagsSG(id)||'';try{h+=stageTag(id);}catch(e){}return h;};
/* 街角に出る人を選ぶ画面：向き不向きを添える */
const _modalSG=modal;
modal=function(title,body,btns,cls){try{if(typeof title==='string'&&title.startsWith('街角へ出る')&&btns){btns=btns.map(b=>{const m=G.members.concat(['you']).find(id=>b.t&&b.t.startsWith(id==='you'?P().name:nameOf(id)));if(!m)return b;const s=stageOf(m);if(!s)return b;return Object.assign({},b,{t:b.t.replace(/<small>.*<\/small>/,'')+`<small>${s[0]==='street'?'🍺 街角向き：':'🎭 舞台向き（街角は苦手）：'}${s[1]}</small>`});});}}catch(e){}return _modalSG(title,body,btns,cls);};
/* 結果に一言 */
function stageNote(id,S){const s=stageOf(id);if(!s)return '';const nm=id==='you'?P().name:nameOf(id);
  return `<div class="stx">${s[0]==='street'?`🍺 ${nm}は水を得た魚のよう。客と冗談を言い合い、${S.id==='tavern'?'酒場じゅうが一緒に歌いだした':'手拍子が止まらなかった'}。`:`🎭 ${nm}は終始うつむき気味で、「やはり、こういう場所は……」とこぼした。`}</div>`;}
/* 通りがかりの出会い：街角向きの音楽家が飛び入り */
const _streetEncSG=streetEncounters;
streetEncounters=function(id,S){const o=_streetEncSG(id,S);try{const k=P().city;
  const fs=poolChars().filter(c=>c.city===k&&!G.charOwner[c.id]&&!G.members.includes(c.id)&&STAGE[c.id]&&STAGE[c.id][0]==='street');
  if(fs.length){const f=pick(fs);o.push({d:`${portraitRow(f.id)}人垣をかき分けて<b>${f.name}</b>が現れ、「混ぜてくれ！」と飛び入りで加わった。人だかりがさらに膨らむ。`,
    btns:[{t:'一緒に弾く<small>投げ銭+150・この人の信頼+30</small>',cls:'gold',f(){P().money+=150;G.trust[f.id]=(G.trust[f.id]||0)+30;popAdd(k,4);addLog(`${f.name}が街角で飛び入りし、すっかり意気投合した。`);save();render();}},{t:'場所を譲る'}]});
    o.push(o[o.length-1]);}}catch(e){}return o;};
/* 演奏会：舞台向きは大きな街で、街角向きは民衆の人気が高い街で映える */
const _evalLineupSG=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupSG(p,L,opt);try{opt=opt||{};const k=P().city,big=ci(k).size>=5,pp=popOf(k)>=40;
  const on=L.map((id,i)=>opt.standIn===i?null:id).filter(Boolean);let add=0;const nt=[];
  for(const id of on){const s=stageOf(id);if(!s)continue;const nm=id==='you'?P().name:nameOf(id);
    if(s[0]==='hall'&&big){add+=.3;nt.push(`舞台向きの${nm}が大ホールで映えた（+0.3）`);}
    if(s[0]==='street'&&pp){add+=.3;nt.push(`街角で人気の${nm}目当てに客が来た（+0.3）`);}}
  add=Math.min(.9,add);if(add){r.q+=add;r.notes.push(...nt.slice(0,2));r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}}catch(e){}return r;};
/* 史実の縁 */
BOND_H.push(['lanner','strauss',-30,'元相棒の好敵手','シュトラウス（父）はランナーの楽団の団員だったが、1825年に独立。ウィーンの人気を二分した。'],
 ['gay','pepusch',50,'『乞食オペラ』の相棒','ゲイが歌を選び、ペープシュが伴奏と序曲をつけた。'],
 ['schikaneder','mozart',60,'『魔笛』の相棒','シカネーダーの台本と劇場で、モーツァルトの『魔笛』が生まれた。'],
 ['cherubini','liszt',-40,'入学を断った院長','1823年、ケルビーニは12歳のリストのパリ音楽院入学を断った。'],
 ['ziehrer','strauss2',-30,'ワルツの好敵手','ツィーラーはシュトラウス一家と人気を競った。']);
