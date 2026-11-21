/* =====================================================================
   ヴァイオリニストの追加と、協奏曲のソリスト
   ===================================================================== */
const VLN={
 s1723:[
  C('locatelli','ロカテッリ','P. A. Locatelli','rome','コンサートマスター','名人芸',5,[11,7,8,7],true,'tech',[1.2,.6,.8,1.1,1.2],'caprice24','violin','『ヴァイオリンの技法』24のカプリース','左手は、まだ誰も行ったことのない高さまで届きますよ。','あなたの楽団で、ローマ仕込みの技を。','ローマで修業した名手。協奏曲に付けた24のカプリースは、のちのパガニーニの先駆けとなった。'),
  C('veracini','ヴェラチーニ','F. M. Veracini','prague','コンサートマスター','名人芸',5,[10,8,9,7],true,'impro',[1.3,.9,.7,1.2,1.3],'caprice24','violin','ヴァイオリン・ソナタ集','窓から飛び降りたのは、ちょっとした行き違いでしてね。','わたしほどの名手は、ヨーロッパに二人といませんよ。','傲慢で知られた天才。1722年、ドレスデンで同僚と揉めたあと窓から飛び降り、足を痛めた。その後プラハに身を寄せた。'),
  C('annamaria','ピエタのアンナ・マリーア','Anna Maria della Pietà','venice','コンサートマスター','名人芸',4,[9,9,7,6],true,'expr',[.8,.2,1.0,1.1,1.2],'spring','violin','ヴィヴァルディ ヴァイオリン協奏曲','ピエタの格子の向こうで、ずっと弾いてきました。','一度でいいから、格子の外で弾いてみたい。','ヴェネツィアのピエタ慈善院で育った孤児の名手。ヴィヴァルディは彼女のために多くの協奏曲を書いた。'),
  C('jggraun','J.G.グラウン','J. G. Graun','dresden','コンサートマスター','古典',3,[8,7,6,7],false,'tech',[.9,.2,1.1,.8,1.0],'scale','violin','ヴァイオリン協奏曲','ピゼンデル先生に習っています。','いつか、あなたの楽団のコンマスに。','ドレスデンでピゼンデルに学んだ若者。のちにプロイセンのフリードリヒ皇太子の楽団でコンサートマスターとなる。')
 ],
 s1781:[
  C('gavinies','ガヴィニエ','P. Gaviniès','paris','コンサートマスター','名人芸',5,[10,8,7,8],true,'tech',[1.1,.4,1.0,1.1,1.1],'caprice24','violin','『24のマティネ』','コンセール・スピリチュエルは、わたしの庭のようなものです。','フランスのヴァイオリンを、あなたの楽団に。','ヴィオッティが「フランスのタルティーニ」と呼んだ名手。のちにパリ音楽院の最初のヴァイオリン教授となった。'),
  C('rkreutzer','R.クロイツェル','R. Kreutzer','paris','コンサートマスター','古典',4,[9,7,7,7],true,'tech',[1.0,.3,1.0,1.0,1.1],'scale','violin','42の練習曲','練習曲なら、いくらでも書けますよ。','パリの若手の弓を、あなたの楽団に。','パリの若きヴァイオリニスト。のちにベートーヴェンからソナタを献呈されたが、一度も弾かなかったと伝わる。'),
  C('lolli','ロッリ','A. Lolli','peter','コンサートマスター','名人芸',5,[11,6,8,4],true,'tech',[1.4,1.0,.4,1.1,1.0],'caprice24','violin','ヴァイオリン協奏曲','アダージョ？ わたしの国では、ゆっくり弾く者はいませんよ。','女帝陛下にも負けない給金を、お約束いただけるなら。','エカチェリーナ2世の宮廷に仕えた奇抜な名手。速いパッセージは無類だが、ゆっくりした曲は苦手だったという。'),
  C('strinasacchi','ストリナサッキ','R. Strinasacchi','vienna','コンサートマスター','古典',4,[8,10,7,7],false,'expr',[1.0,.3,1.0,1.0,1.3],'mozart','violin','モーツァルト ヴァイオリン・ソナタ K.454','モーツァルトさんの楽譜は、いつも直前に届くのです。','あなたの楽団で、歌うように弾きましょう。','女性の名ヴァイオリニスト。1784年、モーツァルトが彼女のためにソナタK.454を書き、自分のパートは白紙のまま本番を弾いた。'),
  C('wcramer','W.クラーマー','W. Cramer','london','コンサートマスター','古典',4,[8,7,6,8],false,'tech',[1.1,.2,1.1,1.0,1.0],'scale','violin','ヴァイオリン協奏曲','ロンドンの楽団は、わたしが率いております。','ロンドン仕込みのリーダーシップを、あなたの楽団に。','マンハイム出身でロンドンの楽団を率いた名リーダー。改良した「クラーマー型」の弓は時代を先取りした。'),
  C('franzl','フレンツル','I. Fränzl','munich','コンサートマスター','古典',3,[8,7,6,7],false,'tech',[.9,.2,1.1,.9,1.0],'mannheim','violin','ヴァイオリン協奏曲','マンハイムの弓さばきは、揃うことが命です。','あなたの楽団の弦を、揃えてみせましょう。','マンハイム楽派のヴァイオリニスト。宮廷とともにミュンヘンへ移った。')
 ],
 s1832:[
  C('spohr','シュポーア','L. Spohr','leipzig','コンサートマスター','古典',6,[10,9,7,10],true,'expr',[1.0,.1,1.4,1.1,1.0],'scale','violin','ヴァイオリン協奏曲 第8番「劇唱の形式で」','パガニーニの曲芸には、品がありません。','ドイツの正統なヴァイオリンを、あなたの楽団に。','カッセルの宮廷楽長で、ドイツ随一のヴァイオリニスト。顎当てを考案し、指揮棒を最初期に使った一人とされる。'),
  C('david','フェルディナント・ダーフィト','F. David','leipzig','コンサートマスター','古典',4,[9,8,7,9],false,'expr',[1.0,.2,1.2,1.0,1.1],'scale','violin','メンデルスゾーン ヴァイオリン協奏曲','メンデルスゾーン君とは、子どものころからの友人です。','あなたの楽団のコンマスとして。','のちにゲヴァントハウスのコンサートマスターとなり、メンデルスゾーンの協奏曲を助言して初演した。'),
  C('olebull','オーレ・ブル','Ole Bull','paris','コンサートマスター','名人芸',4,[10,9,9,5],true,'impro',[1.3,.8,.5,1.2,1.5],'caprice24','violin','『ノルウェーの山の思い出』','ノルウェーの滝の音を、そのままヴァイオリンに。','北の国の弓を、あなたの楽団に。','ノルウェーの独学の名手。1832年のパリでパガニーニを聴いて奮起し、のちに「北のパガニーニ」と呼ばれた。'),
  C('mayseder','マイゼーダー','J. Mayseder','vienna','コンサートマスター','古典',4,[9,8,6,7],false,'tech',[1.0,.2,1.0,1.0,1.0],'waltz','violin','ヴァイオリン協奏曲 第1番','ウィーンを出たことは、ほとんどありません。','ウィーンの甘い音色を、あなたの楽団に。','ウィーン宮廷の名ヴァイオリニスト。華麗な作風で、ウィーンでは絶大な人気があった。'),
  C('sivori','シヴォリ','C. Sivori','milan','コンサートマスター','名人芸',4,[10,8,8,5],true,'tech',[1.1,.5,.7,1.1,1.2],'caprice24','violin','パガニーニ ヴァイオリン協奏曲 第2番','パガニーニ先生の、ただ一人の弟子です。','先生ゆずりの技を、あなたの楽団に。','パガニーニが生涯でただ一人とった弟子。のちに師の愛器「イル・カノーネ」を弾くことを許された。'),
  C('vieuxtemps','若きヴュータン','H. Vieuxtemps','london','コンサートマスター','名人芸',2,[8,7,7,6],false,'tech',[.9,.3,.8,.9,1.2],'scale','violin','ド・ベリオ ヴァイオリン協奏曲','ド・ベリオ先生に、よくほめられます。','ぼく、もっと大きな舞台で弾きたいんです。','ベルギーの神童。ド・ベリオに学び、まだ十代で各地を巡演していた。のちにフランコ＝ベルギー派の巨匠となる。')
 ],
 s1876:[
  C('wieniawski','ヴィエニャフスキ','H. Wieniawski','london','コンサートマスター','名人芸',6,[12,10,8,6],true,'tech',[1.3,.7,.6,1.2,1.4],'polonaise','violin','ヴァイオリン協奏曲 第2番','ロンドンの次は、ブリュッセルの生徒たちが待っています。','ポーランドの弓を、あなたの楽団に。','ポーランドの大ヴァイオリニスト。ロシア宮廷のソリストを経てブリュッセル音楽院の教授となった。'),
  C('neruda','ヴィルマ・ネルーダ','W. Neruda','london','コンサートマスター','古典',5,[10,10,7,8],false,'expr',[1.0,.3,1.1,1.1,1.2],'scale','violin','ヴィエニャフスキ 協奏曲','女がヴァイオリンを弾くなんて、と言われたものです。','あなたの楽団の舞台に立ちましょう。','モラヴィア出身の女性ヴァイオリニスト。ロンドンで絶大な人気を誇り、のちにハレ夫人となった。'),
  C('wilhelmj','ヴィルヘルミ','A. Wilhelmj','bayreuth','コンサートマスター','名人芸',5,[11,9,7,8],true,'tech',[1.2,.4,1.0,1.1,1.1],'tristan','violin','バッハ『G線上のアリア』（編曲）','バイロイトの楽団は、わたしが率いています。','祝祭劇場のコンマスを、あなたの楽団に。','1876年の第1回バイロイト音楽祭でコンサートマスターを務めた。バッハのアリアを編曲し『G線上のアリア』として広めた。'),
  C('brodsky','ブロツキー','A. Brodsky','moscow','コンサートマスター','古典',4,[9,9,7,8],false,'expr',[.9,.3,1.1,.9,1.3],'scale','violin','チャイコフスキー ヴァイオリン協奏曲','チャイコフスキーさんの協奏曲、誰も弾かないならわたしが。','あなたの楽団で、新しい協奏曲を。','モスクワ音楽院の教授。のちに「演奏不可能」と言われたチャイコフスキーの協奏曲を初演した。'),
  C('hubay76','若きフバイ','J. Hubay','berlin','コンサートマスター','古典',2,[8,7,6,7],false,'tech',[.9,.2,1.1,.8,1.1],'scale','violin','ヨアヒムに学ぶ課題曲','ヨアヒム先生のもとで修業中です。','ハンガリーの若い弓を、あなたの楽団に。','ベルリンでヨアヒムに学ぶハンガリーの若者。のちにブダペストの名教授となる。')
 ],
 s1905:[
  C('elman','ミッシャ・エルマン','M. Elman','london','コンサートマスター','名人芸',4,[11,10,7,5],true,'expr',[1.2,.5,.6,1.1,1.4],'scale','violin','チャイコフスキー ヴァイオリン協奏曲','アウアー先生に、ずいぶん叱られました。','ぼくの音色を、あなたの楽団で。','アウアー門下の天才少年。1905年、14歳でロンドン・デビューを果たした。「エルマン・トーン」と呼ばれる甘い音色で知られる。'),
  C('zimbalist','ジンバリスト','E. Zimbalist','peter','コンサートマスター','古典',3,[10,8,7,7],false,'tech',[1.0,.2,1.0,1.0,1.1],'scale','violin','グラズノフ 協奏曲','アウアー先生の教室は、天才ばかりで大変です。','あなたの楽団で、腕を試させてください。','ペテルブルク音楽院でアウアーに学ぶ若者。のちにアメリカで名教師となった。'),
  C('huberman','フーベルマン','B. Huberman','warsaw','コンサートマスター','名人芸',6,[11,11,8,8],true,'expr',[1.1,.4,1.1,1.2,1.4],'scale','violin','ブラームス ヴァイオリン協奏曲','14歳のとき、ブラームスさんの前で協奏曲を弾きました。','ポーランドの魂の音を、あなたの楽団に。','ポーランド出身の天才。1896年、13歳でブラームスの前で協奏曲を弾き、作曲者を感涙させたと伝わる。'),
  C('vecsey','ヴェチェイ','F. von Vecsey','pest','コンサートマスター','名人芸',4,[11,8,7,6],true,'tech',[1.1,.5,.7,1.1,1.3],'scale','violin','シベリウス ヴァイオリン協奏曲','まだ12歳ですけど、子ども扱いしないでください。','ぼくの弓を、あなたの楽団に。','フバイ門下の神童。1905年、12歳でロンドンとベルリンに衝撃のデビューを果たした。シベリウスは協奏曲を彼に献呈した。'),
  C('powell','モード・パウエル','M. Powell','newyork','コンサートマスター','古典',4,[10,9,7,8],false,'expr',[1.0,.3,1.1,1.0,1.2],'scale','violin','チャイコフスキー ヴァイオリン協奏曲（米国初演）','アメリカにも、ヴァイオリニストはいるのです。','新大陸の弓を、あなたの楽団に。','アメリカの名ヴァイオリニスト。ヨアヒムに学び、チャイコフスキーやシベリウスの協奏曲を米国で初演した。'),
  C('halir','ハリール','K. Halíř','berlin','コンサートマスター','古典',4,[9,9,7,9],false,'expr',[.9,.2,1.2,.9,1.1],'scale','violin','シベリウス ヴァイオリン協奏曲（改訂版初演）','ヨアヒム四重奏団の第2ヴァイオリンです。','ベルリンの確かな弓を、あなたの楽団に。','ボヘミア出身でヨアヒムの右腕。1905年、R.シュトラウスの指揮でシベリウスの協奏曲改訂版を初演した。'),
  C('burmester','ブルメスター','W. Burmester','berlin','コンサートマスター','名人芸',4,[11,7,7,6],true,'tech',[1.2,.6,.7,1.1,1.1],'caprice24','violin','パガニーニ カプリース','パガニーニの全曲を、一晩で弾きましたよ。','超絶技巧なら、あなたの楽団に。','ドイツの技巧派。シベリウスの協奏曲を初演するはずだったが、日程の都合で機会を逃した。'),
  C('hall','マリー・ホール','M. Hall','london','コンサートマスター','古典',3,[9,9,7,7],false,'expr',[.9,.3,1.0,1.0,1.3],'scale','violin','ヴァイオリン協奏曲','街角で弾いていたこともあるんです。','あなたの楽団で、もう一度夢を。','イギリスの女性ヴァイオリニスト。貧しい家に生まれ路上でも弾いたが、才能を見出されて一流となった。'),
  C('rose','アルノルト・ロゼー','A. Rosé','vienna','コンサートマスター','古典',5,[10,9,7,10],false,'expr',[1.0,.2,1.3,1.0,1.1],'scale','violin','ベートーヴェン 弦楽四重奏曲','ウィーン・フィルのコンマスを、もう二十数年やっています。','ウィーンの音を、あなたの楽団に。','ウィーン・フィルの名コンサートマスターで、マーラーの妹の夫。ロゼー四重奏団を率いた。')
 ]
};
for(const sc in VLN){const S=SCEN[sc];for(const c of VLN[sc])if(!S.chars.some(x=>x.id===c.id))S.chars.push(c);}
Object.assign(TR,{locatelli:{h:'wig'},veracini:{h:'wig',brow:'up'},annamaria:{fem:1,h:'updo',hc:'#3a2a1a',coat:'#2a2a3a'},jggraun:{h:'wig'},gavinies:{h:'wig'},rkreutzer:{h:'wig'},lolli:{h:'wig',smile:1},strinasacchi:{fem:1,h:'ringlets',hc:'#5a3a22'},wcramer:{h:'wig'},franzl:{h:'wig'},
 spohr:{h:'wavy',hc:'#8a6a4a',b:'side'},david:{h:'short',hc:'#3a2a1a',b:'side'},olebull:{h:'long',hc:'#c8a870'},mayseder:{h:'short',hc:'#5a4a3a'},sivori:{h:'wavy',hc:'#1a1410'},vieuxtemps:{h:'curly',hc:'#5a3a22'},
 wieniawski:{h:'wavy',hc:'#1a1410',b:'mus'},neruda:{fem:1,h:'updo',hc:'#3a2a1a',coat:'#3a2a40'},wilhelmj:{h:'wavy',hc:'#8a6a4a',b:'full'},brodsky:{h:'short',hc:'#3a2a1a',b:'full'},hubay76:{h:'short',hc:'#3a2a1a',b:'mus'},
 elman:{h:'curly',hc:'#1a1410'},zimbalist:{h:'wavy',hc:'#1a1410'},huberman:{h:'wild',hc:'#2a2018'},vecsey:{h:'short',hc:'#3a2a1a'},powell:{fem:1,h:'updo',hc:'#5a3a22'},halir:{h:'short',hc:'#5a4a3a',b:'full'},burmester:{h:'wavy',hc:'#8a6a4a',b:'mus'},hall:{fem:1,h:'updo',hc:'#7a4a2a'},rose:{h:'receding',hc:'#3a2a1a',b:'full'}});
Object.assign(GROW,{vieuxtemps:'late',elman:'early',vecsey:'early',zimbalist:'late',hubay76:'late',jggraun:'late',olebull:'early',lolli:'early'});
Object.assign(QUIRK,{veracini:['temper','diva'],lolli:['greedy'],olebull:['star'],locatelli:['star']});
if(typeof UHIST!=='undefined')Object.assign(UHIST,{locatelli:5,veracini:4,annamaria:4,jggraun:3,gavinies:4,rkreutzer:4,lolli:4,strinasacchi:4,wcramer:3,franzl:3,spohr:5,david:4,olebull:4,mayseder:3,sivori:4,vieuxtemps:5,wieniawski:5,neruda:4,wilhelmj:4,brodsky:4,hubay76:4,elman:5,zimbalist:4,huberman:5,vecsey:4,powell:4,halir:3,burmester:3,hall:3,rose:4});

/* ---- 協奏曲の追加 ---- */
const VLS=[Sl(['vn'],'独奏ヴァイオリン'),Sl('cond','指揮'),Sl('vn','コンサートマスター'),Sl('vc','チェロ')];
const VLS3=[Sl(['vn'],'独奏ヴァイオリン'),Sl('cond','指揮'),Sl('vn','コンサートマスター')];
SCEN.s1723.rep.push(
 Pc('bach1041','バッハ ヴァイオリン協奏曲 イ短調 BWV1041','協奏曲',VLS3,[.5,.3,.2],'古典','bach','scale','violin'),
 Pc('bach1043','バッハ 2つのヴァイオリンのための協奏曲','協奏曲',[Sl(['vn'],'独奏ヴァイオリン1'),Sl(['vn'],'独奏ヴァイオリン2'),Sl('cond','通奏低音')],[.4,.4,.2],'古典','bach','scale','violin'),
 Pc('locatelli3','ロカテッリ『ヴァイオリンの技法』','協奏曲',VLS3,[.7,.1,.2],'名人芸','locatelli','caprice24','violin'));
SCEN.s1781.rep.push(
 Pc('k219','モーツァルト ヴァイオリン協奏曲 第5番 K.219','協奏曲',VLS,[.4,.4,.2],'古典','mozart','scale','violin'),
 Pc('viotti22','ヴィオッティ ヴァイオリン協奏曲','協奏曲',VLS,[.5,.4,.1],'古典','viotti','scale','violin'));
SCEN.s1832.rep.push(
 Pc('bvc','ベートーヴェン ヴァイオリン協奏曲','協奏曲',VLS,[.3,.6,.1],'古典','','bvc','violin'),
 Pc('beriot1','ド・ベリオ ヴァイオリン協奏曲 第1番','協奏曲',VLS3,[.5,.4,.1],'ロマン','beriot','scale','violin'),
 Pc('spohr8','シュポーア ヴァイオリン協奏曲 第8番「劇唱の形式で」','協奏曲',VLS,[.3,.5,.2],'古典','spohr','scale','violin'));
SCEN.s1876.rep.push(
 Pc('mendvc','メンデルスゾーン ヴァイオリン協奏曲','協奏曲',VLS,[.4,.5,.1],'古典','','mendvc','violin'),
 Pc('bruch1','ブルッフ ヴァイオリン協奏曲 第1番','協奏曲',VLS,[.3,.6,.1],'ロマン','','scale','violin'),
 Pc('bvc','ベートーヴェン ヴァイオリン協奏曲','協奏曲',VLS,[.3,.6,.1],'古典','','bvc','violin'),
 Pc('tchvc','チャイコフスキー ヴァイオリン協奏曲','協奏曲',VLS,[.5,.4,.1],'名人芸','tchaikovsky','scale','violin'),
 Pc('wien2','ヴィエニャフスキ ヴァイオリン協奏曲 第2番','協奏曲',VLS3,[.5,.4,.1],'名人芸','wieniawski','polonaise','violin'));
SCEN.s1905.rep.push(
 Pc('glazvc','グラズノフ ヴァイオリン協奏曲（1905）','協奏曲',VLS,[.4,.5,.1],'ロマン','glazunov','scale','violin'),
 Pc('tchvc','チャイコフスキー ヴァイオリン協奏曲','協奏曲',VLS,[.5,.4,.1],'名人芸','','scale','violin'),
 Pc('brvc','ブラームス ヴァイオリン協奏曲','協奏曲',VLS,[.5,.4,.1],'古典','','fae','violin'),
 Pc('mendvc','メンデルスゾーン ヴァイオリン協奏曲','協奏曲',VLS,[.4,.5,.1],'古典','','mendvc','violin'));
Object.assign(MOTIFS,{
 bvc:[[50,.3],[50,.3],[50,.3],[50,.3],[[62,66,69],.9]],
 mendvc:[[83,.51],[83,.17],[83,.68],[79,.34],[88,.34],[88,.68],[83,.34],[91,.34],[90,.34],[88,.34],[84,.34],[88,.34],[83,1]]
});

/* ---- ソリストと「当たり役」 ---- */
const CONC={
 seasons:{sol:['vivaldi','annamaria'],t:'作曲者自身か、ピエタの名手アンナ・マリーアが弾いた'},
 bach1041:{sol:['pisendel','bach'],t:'バッハと親しかったドレスデンの名手ピゼンデル'},
 bach1043:{sol:['pisendel','jggraun'],t:'ドレスデンの師弟が並ぶ'},
 locatelli3:{sol:['locatelli'],t:'作曲者自身の超絶技巧'},
 k219:{sol:['mozart'],t:'モーツァルト自身がヴァイオリンも弾いた'},
 viotti22:{sol:['viotti'],t:'作曲者自身の当たり役'},
 symconc:{sol:['stgeorges'],t:'作曲者自身の当たり役'},
 pag1:{sol:['paganini','sivori','ernst'],t:'作曲者か、その唯一の弟子シヴォリ'},
 bvc:{sol:['joachim','baillot','david'],t:'忘れられていたこの曲を、12歳のヨアヒムが蘇らせた'},
 beriot1:{sol:['beriot','vieuxtemps'],t:'作曲者か、その愛弟子ヴュータン'},
 spohr8:{sol:['spohr'],t:'作曲者自身の当たり役'},
 mendvc:{sol:['david','joachim'],t:'初演はダーフィト。作曲者と相談しながら仕上げた'},
 bruch1:{sol:['joachim'],t:'ヨアヒムの助言で改訂され、ヨアヒムが弾いた'},
 brvc:{sol:['joachim','huberman'],t:'ヨアヒムのために書かれ、ヨアヒムが初演した'},
 tchvc:{sol:['brodsky','auer','auer05','elman','powell'],t:'献呈されたアウアーは弾かず、ブロツキーが初演した'},
 espagnole:{sol:['sarasate'],t:'サラサーテのために書かれ、サラサーテが初演した'},
 rondo:{sol:['sarasate'],t:'サラサーテのために書かれた'},
 wien2:{sol:['wieniawski'],t:'作曲者自身の当たり役'},
 sibvc:{sol:['halir','vecsey','burmester'],t:'改訂版はハリールが初演し、ヴェチェイに献呈された'},
 glazvc:{sol:['auer05','zimbalist'],t:'アウアーに献呈され、アウアーが初演した'},
 k466:{sol:['mozart'],t:'モーツァルト自身が初演した'},chopin2:{sol:['chopin'],t:'作曲者自身の当たり役'},
 tch1:{sol:['bulow','nrubinstein','taneyev76'],t:'初演はビューロー。モスクワではタネーエフが弾いた'},
 schpc:{sol:['clara','clara76'],t:'クララが初演し、生涯弾き続けた'},rach2:{sol:['rachmaninoff'],t:'作曲者自身の当たり役'},
 brand5:{sol:['bach'],t:'チェンバロの長大な独奏は、バッハ自身が弾いたとされる'},hcello:{sol:[],t:''}
};
const _evalLineupV=evalLineup;
evalLineup=function(p,L,opt){
  const r=_evalLineupV(p,L,opt);opt=opt||{};
  if(p.form!=='協奏曲'||!p.slots[0]||!/独奏/.test(p.slots[0].l))return r;
  const sid=opt.standIn===0?null:L[0];
  if(!sid){r.q-=8;r.notes.unshift('協奏曲なのにソリストがいない（-8）');}
  else{
    const c=r.contrib.find(x=>x&&x.i===0);const others=r.contrib.filter(x=>x&&x.i!==0);const avg=others.length?others.reduce((a,x)=>a+x.v,0)/others.length:c.v;
    const add=(c.v-avg)*.8;r.q+=add/Math.max(1,p.slots.length/2);r.notes.unshift(`協奏曲の主役はソリスト：${nameOf(sid)}（${add>=0?'+':''}${(add/Math.max(1,p.slots.length/2)).toFixed(1)}）`);
    const real=realId(sid),cf=CONC[p.id];
    if(cf&&cf.sol.includes(real)){r.q+=4;r.notes.unshift(`★当たり役！ ${nameOf(sid)}の${p.t.replace(/（.*）/,'')}——${cf.t}（+4）`);c.v+=4;c.sk.push('当たり役');}
    const best=['tech','expr','impro'].sort((a,b)=>mstat(sid,b)-mstat(sid,a))[0];const need=['tech','expr','impro'][p.w.indexOf(Math.max(...p.w))];
    if(best===need){r.q+=1.5;r.notes.push(`ソリストの芸風が曲に合う（+1.5）`);}
    const inst=(typeof ueqOf==='function'&&G.ux&&G.ux[sid])?ueqOf(sid).filter(e=>UEQ[e.id].cat==='inst'||UEQ[e.id].cat==='bow'):[];
    const iv=inst.reduce((a,e)=>a+(eqStat(e,'tech',sid)+eqStat(e,'expr',sid)),0);
    if(iv){r.q+=iv*.5;r.notes.push(`ソリストの楽器が鳴る：${inst.map(e=>eqName(e)).join('＋')}（+${(iv*.5).toFixed(1)}）`);}
  }
  r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;
  let mvp=-1,bv=-99;r.contrib.forEach(c=>{if(c&&c.v>bv){bv=c.v;mvp=c.i;}});r.mvp=mvp;
  return r;
};
function eqName(e){return UEQ[e.id].n;}
