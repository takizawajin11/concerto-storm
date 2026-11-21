/* =====================================================================
   外れ奏者：リズムがずれる・音を外す・変顔をする・昔話が長い、困った（でも憎めない）面々
   ===================================================================== */
Object.assign(QDEF,{rhythm:'リズムがずれる',wrong:'音を外す',face:'変顔',roukai:'昔話が長い',cling:'辞めない'});
const DUDS=[
 {id:'barchy',city:'paris',q:['rhythm','face'],lbl:null,c:a=>C('barchy','バーチー','Barchy','paris','コンサートマスター','名人芸',2,[5,6,9,3],true,'impro',[.4,1.4,.3,.6,1.6],'scale','violin','ツィゴイネルワイゼン（独自解釈）','コンニチハ！ じゃなくて、ボンジュール！','ぼく、日本から音楽の修業に来ました！ 入れてください！','なぜかどの時代のヨーロッパにも現れる、日本からの留学生。拍は数えないが、変顔の破壊力は大陸随一。客席の空気を一瞬で変える。')},
 {id:'tsugio',city:'vienna',q:['wrong','roukai','cling'],lbl:null,c:a=>C('tsugio','ツギオ','Tsugio','vienna','コンサートマスター','古典',3,[4,6,3,9],false,'expr',[.5,.1,1.6,.6,.9],'scale','violin','「ワシの十八番」（題名は毎回違う）','ワシの若いころはなあ、コンマスといえばワシのことじゃった。','この楽団、ワシがおらんと締まらんじゃろう。','楽団に住みついた長老ヴァイオリン弾き。音程はおおらかだが、楽理と昔話だけは誰にも負けない。コンマスの席を譲る気はない。')},
 {id:'eto',city:'leipzig',q:['wrong','roukai'],lbl:'ホルン',c:a=>C('eto','エトウ','Eto','leipzig','金管首席','古典',3,[5,6,4,7],false,'expr',[.5,.2,1.3,.6,1.0],'fanfare','flute','ホルン独奏（ひっくり返り付き）','本番は一発勝負。外れたら、それも音楽じゃ。','ワシのホルンで、この楽団に貫禄をつけてやろう。','年季の入ったホルン吹き。最初の一音がひっくり返るのはもはや名物で、客席は息をのんで待っている。昔話もたっぷり。')},
 {id:'fritz',city:'leipzig',q:['rhythm'],lbl:null,c:a=>C('fritz','忘れ物のフリッツ','Fritz','leipzig','フルート首席','古典',2,[6,6,5,4],false,'tech',[.5,.6,.6,.5,1.0],'flute','flute','フルート協奏曲（楽譜は家に）','あっ、楽譜……持ってきたはずなんですが。','忘れ物はしますが、腕は確かです！ たぶん。','楽譜、譜面台、ときには楽器そのものまで忘れてくるフルート奏者。休符を数えるのも苦手。')},
 {id:'aigu',city:'paris',q:['wrong'],lbl:'オーボエ',c:a=>C('aigu','マダム・エギュ','Madame Aigu','paris','クラリネット首席','ロマン',2,[6,7,5,5],false,'expr',[.6,.5,.7,.6,1.1],'scale','flute','オーボエ協奏曲（いつも半音高め）','チューニングのA？ わたしが基準ですのよ。','わたくしの音色で、楽団を明るくしてさしあげますわ。','いつもほんの少しだけ高い音で吹くオーボエ奏者。本人はそれが「華やか」だと信じている。')}
];
for(const sc in SCEN){const S=SCEN[sc];for(const d of DUDS){if(S.chars.some(x=>x.id===d.id))continue;const c=d.c();if(!S.cities.includes(c.city))c.city=S.cities[0];S.chars.push(c);}}
for(const d of DUDS){QUIRK[d.id]=d.q;if(d.lbl&&typeof ILBL!=='undefined')ILBL[d.id]=d.lbl;}
Object.assign(XTYPES,{eto:['br'],aigu:['cl']});
Object.assign(TR,{barchy:{h:'short',hc:'#111',skin:'#e8c9a0',smile:1,coat:'#2a3a5a',b:'none'},tsugio:{h:'receding',hc:'#e0dcd4',b:'mus',bc:'#e0dcd4',age:2,brow:'up'},eto:{h:'bald',b:'none',age:2,round:1},fritz:{h:'wild',hc:'#8a6a4a'},aigu:{fem:1,h:'updo',hc:'#d8b060',coat:'#8a2a5a'}});
Object.assign(GROW,{barchy:'late',tsugio:'early',eto:'early'});
const isDud=id=>{const q=QUIRK[realId(id)]||[];return q.some(x=>['rhythm','wrong','face','roukai'].includes(x));};

/* ---- 演奏会：外れ奏者がいると…… ---- */
const _evalLineupD=evalLineup;
evalLineup=function(p,L,opt){
  const r=_evalLineupD(p,L,opt);opt=opt||{};
  const on=L.map((id,i)=>opt.standIn===i?null:id).filter(Boolean);
  const hall=typeof PR!=='undefined'&&PR&&PR.hall;
  for(const id of on){if(id==='you')continue;const q=QUIRK[id]||[];const nm=nameOf(id);
    if(q.includes('rhythm')){r.q-=1.5;r.notes.push(`${nm}のリズムがずれて、合奏が引きずられる（-1.5）`);}
    if(q.includes('wrong')){r.q-=1.2;r.notes.push(`${nm}がところどころ音を外す（-1.2）`);}
    if(q.includes('face')){const pop=hall&&hall.aud==='市民';r.q+=pop?1.5:-.8;r.notes.push(pop?`${nm}の変顔が、市民の客にばか受け（+1.5）`:`${nm}の変顔に、上品な客が眉をひそめる（-0.8）`);}
    if(q.includes('roukai')&&on.length>=3){r.q-=.6;r.notes.push(`${nm}が本番直前まで昔話をして、皆の集中が切れる（-0.6）`);}}
  r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;return r;
};
const DUD_SCENES={
 rhythm:['{n}だけ、一拍早く第2楽章に入った。指揮者が二度見した。','{n}の拍子が、なぜか途中から三拍子になっていた。','休符を数え忘れた{n}が、ひとりだけ堂々と弾き続けた。'],
 wrong:['{n}の音が、半音どころではなく外れた。最前列の老紳士が補聴器を外した。','{n}の一音が、会場に謎の和音を響かせた。現代音楽と勘違いした批評家が絶賛した。','{n}がまた外した。本人はなぜか満足げにうなずいている。'],
 face:['{n}が渾身の変顔をした。ボックス席の公爵夫人が扇子で顔を隠して震えている。','{n}の変顔に、隣の奏者まで笑いをこらえきれなくなった。','演奏中、{n}が白目をむいた。客席の子どもたちは大喜びだった。'],
 roukai:['終演後、{n}が楽屋で「ワシの若いころは」と語り出し、気がつけば夜が明けていた。','{n}が若手に「その弓づかいは邪道じゃ」と三十分説教した。','{n}が指揮者に「テンポが速い」と本番中に口で言った。']
};
const _concertResultD=concertResult;
concertResult=function(p,L,ev,fi){
  const ret=_concertResultD(p,L,ev,fi);
  try{const duds=(L||[]).filter(id=>id&&id!=='you'&&isDud(id));
    if(duds.length&&Math.random()<.7){const id=pick(duds);const q=pick((QUIRK[id]||[]).filter(x=>DUD_SCENES[x]));if(q){const t=pick(DUD_SCENES[q]).replace('{n}',nameOf(id));addLog(`珍事：${t}`);
      modal('本番の珍事',`${portraitRow(id)}${t}`,null,'paper');}}}catch(e){}
  return ret;
};
/* ---- 巡演の舞台で ---- */
function dudHit(B,u){
  const q=QUIRK[realId(u.id)]||[];if(!q.length)return null;const nm=nameOf(u.id);const r=Math.random();
  if(q.includes('face')&&r<.2){const tg=B.en.filter(e=>e.hp>0);if(!tg.length)return null;const e=pick(tg);const d=Math.round(e.max*.12);e.hp=Math.max(0,e.hp-d);u.dealt+=d;
    B.ev.push({k:'hit',u:u.i,e:B.en.indexOf(e),d,crit:true,txt:'渾身の変顔！ 相手が笑い転げた',kill:e.hp<=0});return'stop';}
  if(q.includes('wrong')&&r<.25){B.ev.push({k:'miss',u:u.i,e:0,txt:`${nm}が盛大に音を外した`});return'stop';}
  if(q.includes('rhythm')&&r<.2){const al=B.us.filter(x=>x.hp>0&&x!==u);if(al.length){const v=pick(al);const d=Math.max(1,Math.round(v.max*.05));v.hp=Math.max(1,v.hp-d);
    B.ev.push({k:'skip',txt:`${nm}のリズムがずれ、${nameOf(v.id)}まで巻き込まれた（気力-${d}）`});return'stop';}}
  if(q.includes('roukai')&&r<.12){B.ev.push({k:'skip',txt:`${nm}「ワシの若いころはなあ……」舞台の上で昔話が始まった`});return'stop';}
  return null;
}
/* ---- 毎月の珍事と出会い ---- */
const _memberMonthlyD=memberMonthly;
memberMonthly=function(){
  _memberMonthlyD();
  const m=G.members;
  if(m.includes('tsugio')&&Math.random()<.18){const young=m.filter(x=>x!=='tsugio'&&x!=='eto');if(young.length){const v=pick(young);
    if(Math.random()<.35){gainExp(v,25);addLog(`ツギオの昔話に、${nameOf(v)}が思わぬヒントを得た。`);}else{setMood(v,moodOf(v)-4);addLog(`ツギオが${nameOf(v)}に二時間説教した。${nameOf(v)}はぐったりしている。`);}}}
  if(m.includes('eto')&&Math.random()<.12){addLog(pick(['エトウがマウスピースを宿に忘れ、仲間のホルンを借りて吹いた。音はいつも以上にひっくり返った。','エトウが「若いころはウィーンで名を馳せた」と語ったが、誰も確かめようがない。','エトウの昔話が、ついに三周目に入った。']));}
  if(m.includes('barchy')&&Math.random()<.15){const r=Math.random();if(r<.4){m.filter(x=>x!=='barchy').forEach(x=>setMood(x,moodOf(x)+2));addLog('バーチーが楽屋で変顔大会を始め、楽団の空気が和んだ（皆の満足+2）。');}
    else if(r<.7){addLog('バーチーが日本から届いた干物を楽屋で焼き、劇場の支配人に叱られた。');}else{P().money+=60;addLog('バーチーの変顔を見たさに、街の子どもたちが小銭を握って劇場に来た（+60fr）。');}}
  if(!G.flags.dudMeet&&G.month>=2&&Math.random()<.35){G.flags.dudMeet=1;const d=pick(['barchy','tsugio','eto']);const c=charById(d);if(c&&!m.includes(d)){
    modal('楽屋口の訪問者',`${portraitRow(d)}<b>${c.name}</b>「${c.join}」<br><br><span class="pmeta">${c.trivia}</span>`,[
      {t:`入団させる<small>月給${fmt(Math.max(20,Math.round(demandOf(d)*.5)))}fr・${(QUIRK[d]||[]).map(q=>QDEF[q]).join('・')}</small>`,cls:'gold',f(){ens5();m.push(d);G.sal[d]=Math.max(20,Math.round(demandOf(d)*.5));setMood(d,90);addLog(`${c.name}が楽団に加わった。にぎやかになりそうだ。`);hpush(`${c.name}、入団`);render();}},
      {t:'丁重にお断りする',f(){G.trust[d]=(G.trust[d]||0)+30;addLog(`${c.name}の入団を断った。また来そうな気がする。`);}}]);}}
};
/* ---- ツギオは辞めない ---- */
const _uLoseD=uLose;
uLose=function(id,why){if(id==='tsugio'&&Math.random()<.5){addLog('ツギオは倒れたが、翌朝なにごともなかったように楽屋にいた。');ux(id).hp=Math.round(umax(id)*.3);return;}_uLoseD(id,why);};
if(typeof UHIST!=='undefined')Object.assign(UHIST,{barchy:1,tsugio:1,eto:1,fritz:1,aigu:1});
