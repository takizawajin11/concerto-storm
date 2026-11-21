/* =====================================================================
   夢の顔合わせ：史実では出会えなかった（あるいは共演しなかった）二人が、あなたの楽団でそろったら
   ===================================================================== */
/* need：そろう必要がある人（主人公・客演も含む）。h：見つける前に見えるヒント。
   lines：[話し手, せりふ]。r：ごほうび（boost＝全能力の永久上昇、piece＝夢の演目、lucky＝特別な効果） */
const DREAMS=[
 {id:'bachhandel',need:['bach','handel'],t:'ハレの邂逅',h:'ライプツィヒのカントルと、ロンドンの大作曲家。二人は同じ年に、同じ地方で生まれた……',
  f:'史実：1719年と1729年、バッハはヘンデルに会おうと訪ねたが、二度ともすれ違った。音楽史に残る「七不思議」のひとつ。',
  lines:[['handel','ライプツィヒのカントル殿か。ついに会えたな。'],['bach','二度、あなたを訪ねて、二度ともすれ違いました。三度目の正直です。'],['handel','では今宵は、二台のチェンバロで語り合おうではないか。']],
  r:{boost:{bach:1,handel:1},xp:80,piece:['dream_bh','バッハとヘンデル 幻の二台チェンバロ協奏曲','協奏曲',[['pf','独奏チェンバロI'],['pf','独奏チェンバロII'],['vn','コンサートマスター'],['cond','指揮']],'bach','piano']}},
 {id:'handelfari',need:['handel','farinelli'],t:'敵方の歌姫ならぬ歌王',h:'ロンドンに同じ時期にいたのに、一度も同じ舞台に立たなかった作曲家と歌手がいる。',
  f:'史実：ファリネッリはロンドンでヘンデルの敵方の歌劇場に出演し、ヘンデルのオペラは一度も歌わなかった。',
  lines:[['farinelli','あなたの敵方の劇場で歌っておりました。お恨みでしょうね。'],['handel','恨むものか。きみのために、いちばん難しいアリアを書いてやろう。'],['farinelli','……望むところです。']],
  r:{boost:{farinelli:1},xp:60,piece:['dream_hf','ヘンデル 幻のオペラ・アリア（ファリネッリのために）','オペラ',[['voice','カストラート'],['vn','コンサートマスター'],['cond','指揮']],'hallelujah','violin']}},
 {id:'mozbeet',need:['mozart','beethoven'],t:'1787年、幻の授業',h:'ボンから来た17歳の若者が、ウィーンでいちばん会いたかった人は……',
  f:'史実：17歳のベートーヴェンはモーツァルトに学ぼうとウィーンを訪れたが、母の危篤で2週間ほどで帰郷した。二人が会えたかどうかは謎のまま。',
  lines:[['mozart','その若いの、主題をひとつ出すから即興してごらん。'],['beethoven','（激しく弾き始める）'],['mozart','みんな、この子に注目しておきなさい。いつか世界を騒がせるよ。']],
  r:{boost:{beethoven:2},xp:80}},
 {id:'bachmozart',need:['bach','mozart'],t:'トーマス教会のモテット',h:'晩年のモーツァルトがライプツィヒで聴いて、夢中になった音楽の作者は……',
  f:'史実：1789年、モーツァルトはライプツィヒでバッハのモテットを聴き、パート譜を周りに広げて読みふけったと伝わる。',
  lines:[['mozart','ここには、まだ学ぶべきものがある！'],['bach','若いの、いい耳をしている。フーガを一つ、いっしょに書こうか。'],['mozart','喜んで！ でも、ぼくのほうが速く書きますよ。']],
  r:{boost:{bach:1,mozart:1},xp:80,piece:['dream_bm','バッハとモーツァルト 幻のフーガ','管弦楽',[['cond','指揮'],['vn','コンサートマスター'],['va','ヴィオラ'],['vc','チェロ']],'bach','violin']}},
 {id:'beetpag',need:['beethoven','paganini'],t:'聞こえぬ耳と悪魔の弓',h:'交響曲の巨人が亡くなった翌年、ひとりのヴァイオリニストがはじめてイタリアの外へ出た。',
  f:'史実：パガニーニがイタリアの外で演奏しはじめたのは1828年。ベートーヴェンが亡くなった翌年だった。',
  lines:[['paganini','先生、わたしの音は聞こえますか。'],['beethoven','耳では聞こえん。だが、床から伝わってくる。……悪魔のような音だ。'],['beethoven','ヴァイオリン協奏曲を、もう一曲書こう。きみが弾け。']],
  r:{boost:{paganini:1},xp:90,piece:['dream_bp','ベートーヴェン 幻のヴァイオリン協奏曲第2番','協奏曲',[['vn','独奏ヴァイオリン'],['cond','指揮'],['br','ホルン']],'beethoven5','violin'],conc:['paganini']}},
 {id:'pagliszt',need:['paganini','liszt'],t:'悪魔と魔王の二重奏',h:'若きピアニストは、ある夜の演奏会で「ピアノで同じことをしてみせる」と誓った。',
  f:'史実：1832年、パガニーニを聴いた20歳のリストは、ピアノの超絶技巧を極めると決意した。二人の共演の記録はない。',
  lines:[['liszt','あなたの『ラ・カンパネッラ』、ピアノで弾いてみせました。'],['paganini','ほう……では、二人で鳴らしてみようか。'],['liszt','客席の皆さん、どうかお気を確かに。']],
  r:{boost:{liszt:1,paganini:1},xp:90,piece:['dream_pl','パガニーニとリスト 幻の『ラ・カンパネッラ』二重奏','室内楽',[['vn','ヴァイオリン'],['pf','ピアノ']],'campanella','violin'],conc:['paganini','liszt']}},
 {id:'pagrach',need:['paganini','rachmaninoff'],t:'自分の主題による狂詩曲',h:'百年後、ある作曲家がカプリース第24番の主題で24の変奏曲を書いた。',
  f:'史実：ラフマニノフは1934年に『パガニーニの主題による狂詩曲』を書いた。有名な第18変奏は、主題を上下さかさまにした旋律。',
  lines:[['paganini','わたしの24番を、さかさまにするとは！'],['rachmaninoff','第18変奏は、あなたへの贈り物です。'],['paganini','……悪魔も泣く旋律だ。']],
  r:{boost:{rachmaninoff:1},xp:90,piece:['dream_pr','ラフマニノフ『パガニーニの主題による狂詩曲』（作曲者と主題の主の共演）','協奏曲',[['pf','独奏ピアノ'],['vn','主題を弾くヴァイオリン'],['cond','指揮']],'caprice24','piano'],conc:['rachmaninoff','paganini']}},
 {id:'tartpag',need:['tartini','paganini'],t:'悪魔のトリル、二代目',h:'夢で悪魔に会った男と、悪魔に魂を売ったと噂された男。',
  f:'史実：タルティーニは夢で悪魔が弾いた曲を『悪魔のトリル』として書き、パガニーニは「悪魔に魂を売った」と噂された。',
  lines:[['tartini','夢に出てきた悪魔は、ちょうどあなたのような顔だった。'],['paganini','光栄ですな。では、本物の悪魔のトリルをお聴かせしよう。']],
  r:{boost:{tartini:1},xp:70,piece:['dream_tp','タルティーニ『悪魔のトリル』（パガニーニ独奏、作曲者の伴奏）','室内楽',[['vn','独奏ヴァイオリン'],['vn','第2ヴァイオリン'],['vc','通奏低音']],'devil','violin'],conc:['paganini']}},
 {id:'chopmoz',need:['chopin','mozart'],t:'生涯の憧れ',h:'ワルシャワ生まれのピアニストは、生涯ひとりの作曲家を神のように敬った。',
  f:'史実：ショパンはモーツァルトを生涯敬愛し、自身の葬儀ではモーツァルトの『レクイエム』が歌われた。',
  lines:[['chopin','あなたの音楽で、わたしは送られたいのです。'],['mozart','縁起でもない！ それより、いっしょに連弾しよう。きみの夜想曲、いいね。']],
  r:{boost:{chopin:1},xp:70}},
 {id:'brahmsbeet',need:['brahms','beethoven'],t:'巨人の足音',h:'交響曲第1番を書くのに20年以上かかった作曲家は、ずっと誰かの足音を背中に聞いていた。',
  f:'史実：ブラームスは「巨人（ベートーヴェン）の足音」を気にして、交響曲第1番の完成まで20年以上かけた。',
  lines:[['beethoven','（譜面を見て）……これは、わたしの第10番か？'],['brahms','光栄です。でも、わたしの第1番です。'],['beethoven','それでいい。わたしの足音など、気にするな。']],
  r:{boost:{brahms:2},xp:90}},
 {id:'wagbrahms',need:['wagner','brahms'],t:'楽派を越えた握手',h:'音楽界を二つに割った二人は、たった一度だけ顔を合わせている。',
  f:'史実：1864年に一度だけ会い、ワーグナーはブラームスの変奏曲をほめた。だがその後、両派の論争は何十年も続いた。',
  lines:[['wagner','きみの変奏曲は、古い形式でもまだこれだけのことができると教えてくれた。'],['brahms','あなたの楽劇は……正直に言えば、長い。でも、好きです。'],['wagner','ははは！ 今夜は休戦だ。']],
  r:{boost:{wagner:1,brahms:1},xp:100,lucky:'allMood'}},
 {id:'wagmah',need:['wagner','mahler'],t:'バイロイトの師と弟子',h:'その指揮者は崇拝する作曲家の劇場を訪れたが、作曲家はその年に世を去っていた。',
  f:'史実：マーラーはワーグナーを崇拝していたが、初めてバイロイトを訪れた1883年は、ワーグナーが亡くなった年だった。',
  lines:[['mahler','先生の『トリスタン』を振らせてください。'],['wagner','振ってみろ。……ほう、なかなかの棒だ。ウィーンを任せてもいい。']],
  r:{boost:{mahler:1},xp:80}},
 {id:'berlbeet',need:['berlioz','beethoven'],t:'幻想の手紙',h:'交響曲を聴いて雷に打たれたフランスの若者は、その作曲家に会うことはなかった。',
  f:'史実：ベルリオーズは1828年にパリでベートーヴェンの交響曲を聴いて衝撃を受けた。ベートーヴェンはその前年に亡くなっていた。',
  lines:[['berlioz','あなたの交響曲を聴いて、わたしは雷に打たれました！'],['beethoven','大声で頼む。……楽器を千人に？ 若いの、気に入った。']],
  r:{boost:{berlioz:1},xp:70}},
 {id:'stravbach',need:['stravinsky','bach'],t:'バッハに帰れ',h:'客席を大騒ぎさせた作曲家は、その後ずっと昔の端正な音楽へ向かった。',
  f:'史実：1920年代、ストラヴィンスキーは『春の祭典』の喧騒から一転し、バッハを思わせる端正な「新古典主義」の作品を書いた。',
  lines:[['stravinsky','わたしの祭典は、客席を怒らせてしまいました。'],['bach','怒らせたなら、次は祈らせればよい。対位法を教えよう。']],
  r:{boost:{stravinsky:1},xp:80}},
 {id:'haruPag',need:['haru','paganini'],t:'弟子を取らない悪魔',h:'時の扉から来た若者が、伝説の悪魔に弟子入りを願ったら……',
  f:'史実：パガニーニは弟子をほとんど取らず、正式な弟子はシヴォリただ一人だったといわれる。',
  lines:[['haru','弟子にしてください。'],['paganini','わたしは弟子を取らない主義だ。……だが、未来の弓づかいには興味がある。']],
  r:{boost:{haru:1},xp:60}},
 {id:'haruBach',need:['haru','bach'],t:'無伴奏の約束',h:'時の扉から来た若者が、いちばん弾きたかった曲の作者に会えたら……',
  f:'バッハの『無伴奏ヴァイオリンのためのソナタとパルティータ』は、いまもヴァイオリン弾きにとっての聖典である。',
  lines:[['haru','あなたのシャコンヌ、未来でもみんな弾いています。'],['bach','三百年後も？ ……それは、書いた甲斐があった。']],
  r:{boost:{haru:1},xp:60}},
 {id:'bachbarchy',need:['bach','barchy'],t:'カントル、笑う',h:'いつも厳しい顔のカントルを、笑わせることができる者がいるとしたら……',
  f:'バッハには二十人の子どもがいた。肖像画の顔はいつも厳しいが、家ではよく笑ったのかもしれない。',
  lines:[['barchy','（渾身の変顔）'],['bach','……ぷっ。'],['bach','二十人の子どもたちにも見せてやりたい。きみ、ライプツィヒに残りなさい。']],
  r:{xp:50,lucky:'barchyBach'}},
 {id:'satiebarchy',need:['satie','barchy'],t:'家具の音楽と変顔',h:'「聴かなくてよい音楽」を作った奇人は、ある留学生の顔に新しい芸術を見た。',
  f:'サティは「家具の音楽」という、聴き流すための音楽を考案した。奇人として知られ、同じ灰色のスーツを何着も持っていた。',
  lines:[['satie','その顔……すばらしい。まるで家具のようだ。'],['barchy','ほめられてます？'],['satie','最大限に。わたしの新しい曲の題は『変顔のための三つのジムノペディ』にしよう。']],
  r:{xp:50,lucky:'barchySatie'}},
 {id:'tsueto',need:['tsugio','eto'],t:'老兵ふたり',h:'外れた音を出す古株が、ふたりそろったら……',
  f:'不思議なことに、外れた音も二つ重なると和音になることがある。',
  lines:[['tsugio','エトウ、おまえの音はまた外れとったぞ。'],['eto','ツギオさんこそ。……でも、二人で外すと、なんだか合いますね。'],['tsugio','ワシらの若いころは、みんなこうじゃった。']],
  r:{xp:40,lucky:'tsueto'}}
];
const dreamHave=()=>{const s=new Set([G.pid]);for(const id of G.members)s.add(realId(id));return s;};
const dreamWho=rid=>rid===G.pid?'you':G.members.find(m=>realId(m)===rid)||rid;
function dreamAddPiece(d){const p=d.r&&d.r.piece;if(!p)return;if(SC.rep.some(x=>x.id===p[0]))return;
  SC.rep.push(Pc(p[0],p[1],p[2],p[3].map(([r,l])=>Sl([r],l)),[.4,.5,.1],'名人芸',null,p[4],p[5]));
  if(typeof CONC!=='undefined'&&d.r.conc)CONC[p[0]]={sol:d.r.conc,t:'夢の顔合わせでだけ実現した共演'};}
function dreamCut(a,b,t){
  const d=document.createElement('div');d.className='cutin dream';
  d.innerHTML=`<div class="band"><div class="cp">${portrait(a,84,'#ffe9a0')}</div><div class="ct"><b>夢の顔合わせ</b><span>${t}</span></div><div class="cp">${portrait(b,84,'#ffe9a0')}</div></div>`;
  document.body.appendChild(d);setTimeout(()=>d.remove(),2400);if(typeof sfx==='function')sfx('fanfare');
}
function dreamCheck(){
  if(!G||G.over)return;G.dream=G.dream||{};const have=dreamHave();
  for(const d of DREAMS){if(G.dream[d.id]||!d.need.every(x=>have.has(x)))continue;
    G.dream[d.id]=G.month+1;const [a,b]=d.need;dreamCut(a,b,d.t);
    try{sigMusic(a);}catch(e){}
    const r=d.r||{};const got=[];
    for(const [rid,n] of Object.entries(r.boost||{})){const id=dreamWho(rid);if(id==='you')continue;G.boost[id]=(G.boost[id]||0)+n;got.push(`${nameOf(id)}の全能力+${n}`);}
    if(r.xp){addXP(r.xp);got.push(`名声+${r.xp}`);}
    if(r.piece){dreamAddPiece(d);got.push(`夢の演目「${r.piece[1]}」が演奏会で選べるようになった`);}
    if(r.lucky==='allMood'){for(const id of G.members)setMood(id,moodOf(id)+8);got.push('楽団全員の気分が上がった');}
    if(r.lucky==='tsueto')got.push('ツギオとエトウを同じ演目に出すと、外れた音どうしが和音になる');
    if(r.lucky==='barchyBach'||r.lucky==='barchySatie'){const id=dreamWho('barchy');setMood(id,99);got.push('バーチーの変顔が「芸術」として認められた（演奏会での変顔がプラスに）');}
    const sp=nm=>{const id=dreamWho(nm);return id==='you'?P().name:nameOf(id);};
    const body=`<div class="dreamdlg">${d.lines.map(([w,s])=>`<div class="dl">${portrait(w,34,'#c9a24a')}<div><b>${sp(w)}</b>「${s}」</div></div>`).join('')}</div>
      <div class="dreamf">${d.f}</div><div class="dreamr">${got.map(x=>`・${x}`).join('<br>')}</div>`;
    setTimeout(()=>modal(`夢の顔合わせ：${d.t}`,body,null,'paper'),900);
    addLog(`夢の顔合わせ「${d.t}」が実現した。`);hpush(`夢の顔合わせ「${d.t}」`);save();return true;}
  return false;
}
/* 珍コンビの特典 */
const _evalLineup_Dx=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineup_Dx(p,L,opt);const D=G&&G.dream||{};const ids=L.filter(Boolean).map(realId);
  if(D.tsueto&&ids.includes('tsugio')&&ids.includes('eto')){r.q+=2;r.notes.push('ツギオとエトウ、外れた音どうしがなぜか和音になった（+2）');}
  if((D.barchyBach||D.satiebarchy)&&ids.includes('barchy')){r.q+=1;r.notes.push('バーチーの変顔は、いまや「芸術」と呼ばれている（+1）');}
  r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;return r;};
/* 確認のタイミング：月替わり、団員が増えたとき */
const _memberMonthly_Dx=memberMonthly;
memberMonthly=function(){_memberMonthly_Dx();try{dreamCheck();}catch(e){}};
let _dreamN=-1;
const _render_Dx=render;
render=function(){_render_Dx();try{if(G&&G.members.length!==_dreamN){_dreamN=G.members.length;if($('#modal').classList.contains('hidden')&&$('#scene').classList.contains('hidden'))dreamCheck();}}catch(e){}};
/* 続きから遊ぶときに夢の演目を戻す */
const _start_Dx=start;
start=function(){try{for(const d of DREAMS)if(G&&G.dream&&G.dream[d.id])dreamAddPiece(d);}catch(e){}return _start_Dx();};
/* 夢の顔合わせ帳（年代記の画面から） */
function dreamBook(){
  G.dream=G.dream||{};const n=DREAMS.filter(d=>G.dream[d.id]).length;
  modal(`夢の顔合わせ帳（${n}/${DREAMS.length}）`,`<div class="pmeta" style="margin-bottom:6px">史実では出会えなかった二人を、時代を越えて楽団にそろえると起きる。時の扉の「客演」も使おう。</div>`+
    DREAMS.map(d=>G.dream[d.id]?`<div class="dbk on"><div class="dbp">${d.need.map(x=>portrait(x,30,'#c9a24a')).join('')}</div><div><b>${d.t}</b><br><span>${d.f}</span></div></div>`
      :`<div class="dbk"><div class="dbp">？</div><div><b>？？？</b><br><span>${d.h}</span></div></div>`).join(''),null,'paper');
}
const _render_D2x=render;
render=function(){_render_D2x();try{if(G&&TAB==='log'&&!$('#dreamBk')){const b=document.createElement('button');b.id='dreamBk';b.className='btn';b.style.cssText='width:100%;margin:0 0 8px';
  b.innerHTML=`夢の顔合わせ帳<small>${DREAMS.filter(d=>(G.dream||{})[d.id]).length}/${DREAMS.length}　史実では出会えなかった二人</small>`;b.onclick=dreamBook;$('#main').prepend(b);}}catch(e){}};
/* 結末の称号 */
const _legacy_Dx=legacy;
legacy=function(){const o=_legacy_Dx();try{const ds=DREAMS.filter(d=>(G.dream||{})[d.id]);for(const d of ds)o.L.push(`夢の顔合わせ「${d.t}」が実現した。`);if(ds.length>=3)o.T.push('夢の共演者');}catch(e){}return o;};
