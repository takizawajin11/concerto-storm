/* =====================================================================
   パスキエ家：ハルの師匠が、時の扉を越えて迎えに来る
   ===================================================================== */
const PASQ=[
 ['regis','レジス・パスキエ','Régis Pasquier','コンサートマスター',7,[12,12,11,10],'violin','パガニーニ『24のカプリース』','ハル、ここにいたのか。さあ、レッスンの続きをしよう。','パリの弦の伝統を、あなたの楽団に。',
  'フランスのヴァイオリニスト（1945年生まれ）。音楽一家パスキエ家に生まれ、12歳でパリ音楽院のヴァイオリン科と室内楽科を一等賞で卒業、2年後にニューヨークでデビューした。フランス国立管弦楽団のコンサートマスター、パリ国立高等音楽院の教授を歴任。兄ブリュノ、チェロのピドゥーと「新パスキエ・トリオ」を組んだ。'],
 ['bruno','ブリュノ・パスキエ','Bruno Pasquier','ヴィオラ首席',6,[11,12,9,10],'cello','弦楽三重奏のヴィオラ','弟のヴァイオリンには、ぼくのヴィオラがいないとね。','パスキエ家のヴィオラを、あなたの楽団に。',
  'フランスのヴィオラ奏者（1943年生まれ）。父ピエールもヴィオラ奏者。パリ・オペラ座管弦楽団の首席を長く務め、弟レジスと「新パスキエ・トリオ」を組んだ。愛器は17世紀初めのマジーニのヴィオラ。'],
 ['pidoux','ロラン・ピドゥー','Roland Pidoux','チェロ首席',6,[11,12,9,10],'cello','弦楽三重奏のチェロ','三人そろえば、パスキエ・トリオだ。','フランスのチェロを、あなたの楽団に。',
  'フランスのチェロ奏者。フランス国立管弦楽団の首席チェロ、パリ国立高等音楽院の教授を務め、パスキエ兄弟と「新パスキエ・トリオ」を組んだ。'],
 ['pierrep','ピエール・パスキエ','Pierre Pasquier','ヴィオラ首席',6,[10,11,9,10],'cello','弦楽三重奏のヴィオラ','息子たちが立派になったと聞いて、つい扉をくぐってしまった。','1927年の響きを、あなたの楽団に。',
  'ヴィオラ奏者（1902〜1986）。兄弟のジャン、エティエンヌと1927年に「パスキエ・トリオ」を結成し、弦楽三重奏という編成を世界に広めた。レジスとブリュノの父。'],
 ['jeanp','ジャン・パスキエ','Jean Pasquier','コンサートマスター',6,[11,10,9,10],'violin','弦楽三重奏のヴァイオリン','兄弟三人、どこへでも旅したものだ。','パスキエ・トリオのヴァイオリンを、あなたの楽団に。',
  'ヴァイオリン奏者（1903年生まれ）。兄弟のピエール、エティエンヌとパスキエ・トリオを結成した。'],
 ['etiennep','エティエンヌ・パスキエ','Étienne Pasquier','チェロ首席',6,[10,11,10,10],'cello','メシアン『世の終わりのための四重奏曲』','あの冬の収容所で弾いた音を、わたしは一生忘れない。','パスキエ・トリオのチェロを、あなたの楽団に。',
  'チェロ奏者（1905〜1997）。パスキエ・トリオの一員。1941年、捕虜収容所で行われたメシアン『世の終わりのための四重奏曲』の初演に加わったことで知られる。']
];
const PQIDS=PASQ.map(x=>x[0]);
for(const sc in SCEN){const S=SCEN[sc];for(const [id,nm,en,seat,lv,st,tim,piece,line,join,tri] of PASQ){if(S.chars.some(c=>c.id===id))continue;
  S.chars.push(C(id,nm,en,'paris',seat,'名人芸',lv,st,false,'expr',[.9,.4,1.1,1.1,1.2],'scale',tim,piece,line,join,tri));}}
Object.assign(XTYPES,{regis:['vn'],bruno:['va','cond'],pidoux:['vc','cond'],pierrep:['va'],jeanp:['vn'],etiennep:['vc']});
Object.assign(TR,{regis:{h:'receding',hc:'#c8c8c8',b:'none',age:2},bruno:{h:'receding',hc:'#bbb',b:'none',age:2},pidoux:{h:'short',hc:'#ccc',b:'none',age:2},
  pierrep:{h:'short',hc:'#3a2a1a',b:'mus'},jeanp:{h:'short',hc:'#2a1a10',b:'none'},etiennep:{h:'short',hc:'#2a1a10',b:'mus'}});
if(typeof UHIST!=='undefined')Object.assign(UHIST,{regis:5,bruno:4,pidoux:4,pierrep:4,jeanp:4,etiennep:4});
Object.assign(SIG,{regis:['パリの弦','弓は歌うためにある。さあ、もう一度。','petals'],etiennep:['世の終わりのための四重奏','どんな冬にも、音楽は鳴る。','stars']});
Object.assign(SIGM,{regis:'caprice24',etiennep:'bach'});
DESHI_H.haru='regis';
const _poolChars_Qx=poolChars;
poolChars=function(){const a=_poolChars_Qx();return a.filter(c=>!PQIDS.includes(c.id)||(G&&G.flags&&G.flags['pq_'+c.id]));};
const _guestSrc_Qx=guestSrc;
guestSrc=function(era,id){if(PQIDS.includes(id))return null;return _guestSrc_Qx(era,id);};
/* 時の扉からやってくる順番 */
const PQSTEP=[
 {id:'regis',c:()=>isMember('haru'),t:'ハルの師匠',d:'稽古場の扉が、またひとりでに開いた。銀髪のヴァイオリニストが、ハルの名を呼んでいる。'},
 {id:'bruno',c:()=>isMember('regis'),t:'兄のヴィオラ',d:'「レジスがいるなら、ぼくも行かなくちゃね」――扉の向こうから、ヴィオラを抱えた兄が現れた。'},
 {id:'pidoux',c:()=>isMember('regis')&&isMember('bruno'),t:'三人目のチェロ',d:'「兄弟だけで弾くつもりかい？」――チェロのピドゥーが、笑いながら扉をくぐってきた。'},
 {id:'pierrep',c:()=>isMember('bruno'),t:'父、来たる',d:'扉の向こうから、若き日の父ピエールが現れた。1927年の背広を着ている。'},
 {id:'jeanp',c:()=>isMember('pierrep'),t:'伯父のヴァイオリン',d:'「ピエール、ひとりで行くなよ」――兄弟のジャンが追いかけてきた。'},
 {id:'etiennep',c:()=>isMember('jeanp'),t:'末の弟のチェロ',d:'最後に扉をくぐったのは、チェロを背負った末の弟エティエンヌだった。'}
];
function pqCheck(){
  if(!G||!G.flags)return;
  for(const s of PQSTEP){if(G.flags['pq_'+s.id]||isMember(s.id)||!s.c())continue;if(Math.random()>.35)return;
    G.flags['pq_'+s.id]=1;const c=charById(s.id);c.city=P().city;
    modal(`時の扉から：${s.t}`,`${portraitRow(s.id)}${s.d}<br><br><b>${c.name}</b>「${c.line}」<br><br><span class="pmeta">${c.trivia}</span>`,[
      {t:'楽団に迎える',cls:'gold',f(){ens5();G.members.push(s.id);G.sal[s.id]=60;setMood(s.id,90);addLog(`時の扉から${c.name}が加わった。`);hpush(`${c.name}、時の扉から入団`);cutin(s.id,c.name,'時の扉から');render();}},
      {t:'今はまだ',f(){G.flags['pq_'+s.id]=0;addLog(`${c.name}は「また来るよ」と扉の向こうへ帰っていった。`);}}]);return;}
}
const _memberMonthly_Qx=memberMonthly;
memberMonthly=function(){_memberMonthly_Qx();try{pqCheck();}catch(e){}};
/* パスキエ家の夢の顔合わせ */
DREAMS.push(
 {id:'harupasq',need:['haru','regis'],t:'師と弟子、時を越えて',h:'時の扉から来た若者には、扉の向こうに待つ先生がいる。',
  f:'時の扉は、師と弟子を引き離せなかった。',
  lines:[['regis','ハル、どの時代にいても、練習はさぼっていないね？'],['haru','はい。バッハにも、パガニーニにも会いました。'],['regis','それはいい。では今日は、その音を全部聴かせておくれ。']],
  r:{boost:{haru:2},xp:80}},
 {id:'nouvtrio',need:['regis','bruno','pidoux'],t:'新パスキエ・トリオ',h:'ヴァイオリンの弟、ヴィオラの兄、そしてチェロの盟友。三人そろえば……',
  f:'1970年代のはじめ、レジスとブリュノのパスキエ兄弟は、チェロのロラン・ピドゥーと「新パスキエ・トリオ」を結成し、父たちのトリオの名を受け継いだ。',
  lines:[['bruno','父さんたちのトリオの名前、ぼくらが継ごう。'],['pidoux','三人でなら、どこへでも行ける。'],['regis','では最初の曲は、ベートーヴェンの弦楽三重奏だ。']],
  r:{boost:{regis:1,bruno:1,pidoux:1},xp:120,piece:['dream_np','新パスキエ・トリオ ベートーヴェン 弦楽三重奏曲 op.9','室内楽',[['vn','ヴァイオリン'],['va','ヴィオラ'],['vc','チェロ']],'scale','violin'],conc:['regis','bruno','pidoux']}},
 {id:'trio27',need:['jeanp','pierrep','etiennep'],t:'パスキエ・トリオ、1927年',h:'三人の兄弟が、弦楽三重奏という編成を世界に広めた。',
  f:'1927年、ジャン、ピエール、エティエンヌのパスキエ兄弟が「パスキエ・トリオ」を結成。弦楽三重奏の専門団体として世界を旅した。',
  lines:[['jeanp','兄弟三人、ヴァイオリン、ヴィオラ、チェロ。'],['pierrep','四重奏より一人少ない。だから、ひとりひとりの音がよく聴こえる。'],['etiennep','さあ、モーツァルトのディヴェルティメントを。']],
  r:{boost:{jeanp:1,pierrep:1,etiennep:1},xp:120,piece:['dream_pt','パスキエ・トリオ モーツァルト ディヴェルティメント K.563','室内楽',[['vn','ヴァイオリン'],['va','ヴィオラ'],['vc','チェロ']],'mozart','violin'],conc:['jeanp','pierrep','etiennep']}},
 {id:'pqfather',need:['pierrep','regis','bruno'],t:'父と息子たち',h:'時の扉は、若き日の父と、年を重ねた息子たちを同じ稽古場に立たせた。',
  f:'ピエール・パスキエの息子たち――ヴィオラのブリュノとヴァイオリンのレジスは、父のトリオの名を受け継いだ。',
  lines:[['pierrep','おまえたちのほうが、わたしより年上に見えるな。'],['bruno','父さん、ヴィオラの持ち方、ずっと父さんの真似をしてきたんだ。'],['regis','父さん、今夜は二つのトリオで、六重奏をやろう。']],
  r:{boost:{pierrep:1},xp:100,lucky:'allMood'}},
 {id:'boulregis',need:['nboulanger','regis'],t:'マドモワゼルの教え',h:'20世紀最大の音楽教師と呼ばれた女性と、パリのヴァイオリニスト。',
  f:'ナディア・ブーランジェは「20世紀最大の音楽教師」と呼ばれ、作曲家から演奏家まで、数え切れない名手を育てた。弟子たちは彼女を敬意をこめて「マドモワゼル」と呼んだ。',
  lines:[['nboulanger','レジス、あなたの音には迷いがない。でも、和声をもう一度聴きなさい。'],['regis','はい、マドモワゼル。'],['nboulanger','音楽は、規律と自由のあいだにあるのですよ。']],
  r:{boost:{regis:1},xp:90}},
 {id:'pqpaganini',need:['regis','paganini'],t:'24のカプリース',h:'カプリースを書いた悪魔と、それを録音したフランスの名手。',
  f:'レジス・パスキエはパガニーニの『24のカプリース』全曲を録音している。',
  lines:[['paganini','わたしのカプリースを、全部弾いたそうだね。'],['regis','ええ。ただし悪魔に魂は売っていませんよ。'],['paganini','ははは！ それなら、なおさら見事だ。']],
  r:{boost:{regis:1},xp:90}}
);
