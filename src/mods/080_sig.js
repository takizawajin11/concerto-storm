/* =====================================================================
   見せ場：名手ごとの決め台詞と専用の演出
   巡演では一度だけ「見せ場」が来て、相手全員に響く。演奏会では舞台で決め台詞を言い、評判が少し上がる。
   ===================================================================== */
const SIG={
 /* バッハの時代 */
 bach:['フーガの大伽藍','声部は、いくつでも重ねてみせましょう。','bells'],
 handel:['ハレルヤの総立ち','国王陛下も、思わずご起立なさいますぞ。','gold'],
 telemann:['千曲の早書き','曲なら、いまここで書きましょう。','sparkle'],
 tartini:['悪魔のトリル','夢で悪魔が弾いた音を、いま再現しよう。','fire'],
 farinelli:['王を癒やす声','この一声で、王の憂いを晴らします。','stars'],
 dscarlatti:['交差する両手','右手と左手、どちらが上か当ててごらんなさい。','sparkle'],
 rameau:['和声の法則','和声こそ、音楽の根本原理です。','bells'],
 marais:['天使のヴィオール','天使のように、弾いてみせましょう。','petals'],
 forqueray:['悪魔のヴィオール','悪魔のように弾くのが、わたしの流儀。','fire'],
 locatelli:['迷宮のカプリス','この迷宮、抜けられますかな。','storm'],
 annamaria:['ピエタの奇跡','格子の向こうから、天上の音を。','stars'],
 quantz:['王のフルート','陛下のためだけに、三百曲書きました。','gold'],
 cuzzoni:['女王の高音','この高音、どなたにも真似できませんわ。','stars'],
 /* モーツァルトの時代 */
 mozart:['天上の旋律','頭の中では、もう全部できあがっています。','stars'],
 haydn:['びっくりの一撃','居眠りしている方、お目覚めの時間ですよ。','thunder'],
 beethoven:['運命の拳','心が鳴らす音を、聴いてくれ。','thunder'],
 stgeorges:['剣と弓','剣も弓も、わたしの手の中で舞う。','sparkle'],
 viotti:['歌うヴァイオリン','ヴァイオリンは、歌わねばなりません。','petals'],
 punto:['ホルンの奇跡','逃亡者のホルン、とくとお聴きあれ。','gold'],
 boccherini:['微笑みのメヌエット','静かな音ほど、遠くまで届くのです。','petals'],
 gluck:['オペラの改革','音楽は、詩に仕えるものです。','bells'],
 /* ショパンとリストの時代 */
 paganini:['悪魔の24の難題','弦は一本あれば、十分です。','strings'],
 liszt:['失神のリサイタル','さあ、ご婦人がた。お気を確かに。','hearts'],
 chopin:['夜想の雨だれ','ピアノに、歌わせてみせます。','raindrop'],
 berlioz:['幻想の大行進','オーケストラが、あと五百人ほど要るのです。','storm'],
 rossini:['ロッシーニ・クレッシェンド','だんだん大きく、だんだん楽しく！','storm'],
 malibran:['命を燃やす歌','歌うときは、いつも最後のつもりで。','fire'],
 clara:['クララの主題','この主題は、わたしだけのものです。','petals'],
 strauss:['ワルツの渦','さあ、踊らずにはいられないでしょう。','sparkle'],
 thalberg:['三本の手','手が三本あるように、聴こえるでしょう。','sparkle'],
 olebull:['北欧の幻想','フィヨルドの風を、弓に乗せて。','snow'],
 dragonetti:['巨人のコントラバス','低音が鳴れば、劇場が揺れます。','thunder'],
 ernst:['魔王の連打','パガニーニ先生の後ろで、盗み聴きしましたよ。','fire'],
 /* ワーグナーとブラームスの時代 */
 wagner:['無限旋律','この音楽に、終わりはない。','storm'],
 brahms:['ゆるぎない和声','巨人の足音が聞こえる。それでも書く。','bells'],
 joachim:['自由に、しかし孤独に','楽譜に書かれたことを、まっすぐに。','petals'],
 sarasate:['ツィゴイネルワイゼン','指が、勝手に踊り出すのです。','fire'],
 tchaikovsky:['白鳥の涙','この旋律で、泣かない人はいません。','snow'],
 liszt76:['神父の祈り','いまは、祈るように弾くのです。','stars'],
 verdi:['凱旋行進曲','トランペットを、もっと前へ！','gold'],
 patti:['黄金の歌姫','出演料は、金貨で前払いですのよ。','gold'],
 saintsaens:['動物たちの謝肉祭','これは、内緒の冗談ですよ。','laugh'],
 strauss2:['美しく青きドナウ','ウィーンの夜は、ワルツで更けるのです。','waves'],
 wieniawski:['ポロネーズの閃光','この弓は、稲妻よりも速い。','fire'],
 bulow:['指揮棒の鞭','聴衆が騒ぐなら、もう一度最初からだ。','thunder'],
 /* マーラーとシュトラウスの時代 */
 mahler:['世界を抱く交響曲','交響曲とは、世界をまるごと作ることだ。','storm'],
 rstrauss:['英雄の生涯','この英雄は、わたしのことです。','gold'],
 kreisler:['愛の喜び','古い名曲を見つけましてね（作ったのはわたしです）。','hearts'],
 caruso:['衣装をつけろ','笑え道化師。たとえ心が泣いていても。','fire'],
 casals:['チェロの祈り','毎朝、まずバッハを弾くのです。','stars'],
 ravel:['スイスの時計','わたしの音楽は、精密な時計仕掛けです。','sparkle'],
 stravinsky:['春の祭典の大騒ぎ','客席が騒ぐ？ それは成功の証です。','thunder'],
 rachmaninoff:['鐘の和音','この手なら、鍵盤の端から端まで届きます。','bells'],
 toscanini:['雷のタクト','テンポ！ テンポだ！','thunder'],
 ysaye:['無伴奏の王','一挺のヴァイオリンで、オーケストラを鳴らそう。','fire'],
 satie:['家具の音楽','どうぞ、聴かなくて結構です。','laugh'],
 nikisch:['魔法のまなざし','目で振れば、棒はいらない。','stars'],
 chaliapin:['ボリスの咆哮','この声で、皇帝の苦悩を。','thunder'],
 /* 新しい席の面々 */
 ramm:['オーボエの声','オーボエは、人の声にいちばん近い楽器です。','petals'],
 krumpholtz:['ハープの滝','弦の上を、水が流れるように。','waves'],
 renie:['ハープの伝説','ハープにも、独奏の大曲を。','waves'],
 pfundt:['ゲヴァントハウスの雷','音程の変わる雷を、お聴かせしよう。','thunder'],
 gillet05:['フランス式オーボエ','弟子たちが、世界中で同じ音を吹いています。','petals'],
 /* 困った面々にも、見せ場はある */
 barchy:['究極の変顔','見てください、この顔！','laugh'],
 tsugio:['ワシの十八番','ワシの若いころはなあ……今夜は本気じゃ。','laugh'],
 donner:['大雷鳴','ピアニッシモ？ 知らんな！','thunder']
};
const sigKey=id=>id==='you'?G.pid:realId(id);
const sigOf=id=>{const s=SIG[sigKey(id)];return s?{n:s[0],l:s[1],fx:s[2]}:null;};
const FXSET={thunder:['⚡','⚡','✦'],hearts:['💗','💖','❤'],strings:['〰','✂','♪'],stars:['✦','✧','⋆','★'],petals:['🌸','❀','✿'],fire:['🔥','✦'],gold:['✨','👑','✦'],
  bells:['🔔','♪'],storm:['♪','♫','♬','♩'],snow:['❄','❅','✧'],waves:['〜','🌊','♪'],laugh:['😂','🤣','😆'],sparkle:['✨','✧','✦'],raindrop:['💧','💧','♪']};
function fxPlay(host,kind){if(!host)return;rain(host,FXSET[kind]||FXSET.sparkle,kind==='storm'?24:16,'sig '+kind);
  if(kind==='thunder'){host.classList.add('fxthunder');setTimeout(()=>host.classList.remove('fxthunder'),700);}
  if(kind==='hearts'){const d=document.createElement('div');d.className='fxbanner';d.textContent='客席で失神者が続出！';host.appendChild(d);setTimeout(()=>d.remove(),2000);}
  if(kind==='strings'){const d=document.createElement('div');d.className='fxbanner';d.textContent='ブチッ！ 弦が切れた……それでも弾き続ける！';host.appendChild(d);setTimeout(()=>d.remove(),2200);}
  if(kind==='laugh'){host.classList.add('fxshake');setTimeout(()=>host.classList.remove('fxshake'),600);}
}

/* ---- 巡演：見せ場が来る ---- */
const _uSimS=uSim;
uSim=function(B,encore){
  try{B.sigUsed=B.sigUsed||[];
    if((!B.practice||B.challenge)&&Math.random()<(encore?.35:.45)){
      const cand=B.us.filter(u=>u.hp>0&&sigOf(u.id)&&!B.sigUsed.includes(u.i)&&uhs(u.id,u.hp,u.max)<3);
      if(cand.length){cand.sort((a,b)=>(UHIST[sigKey(b.id)]||urar(b.id))-(UHIST[sigKey(a.id)]||urar(a.id)));const u=Math.random()<.7?cand[0]:pick(cand);const s=sigOf(u.id);B.sigUsed.push(u.i);
        B.ev.push({k:'phase',txt:`見せ場《${s.n}》`,sig:u.i});B.ev.push({k:'skip',txt:`${nameOf(u.id)}「${s.l}」`});
        for(const e of B.en.filter(e=>e.hp>0)){const d=Math.max(2,Math.round(uAtk(B,u)*.42+rnd(0,4)-e.def));e.hp=Math.max(0,e.hp-d);u.dealt+=d;
          B.ev.push({k:'hit',u:u.i,e:B.en.indexOf(e),d,crit:true,txt:`見せ場《${s.n}》`,kill:e.hp<=0});}}}}catch(e){}
  return _uSimS(B,encore);
};
const _uRenderBS=uRenderB;
uRenderB=function(B,cont){
  _uRenderBS(B,cont);
  const ph=$('#bph'),box=document.querySelector('#scene .battle');if(!ph||!box)return;
  const queue=B.ev.slice(cont?B.encFrom:0).filter(v=>v.k==='phase'&&v.sig!=null);let shown=0;
  const mo=new MutationObserver(()=>{if(!/^見せ場/.test(ph.textContent)||shown>=queue.length)return;const v=queue[shown++];const u=B.us[v.sig];if(!u)return;const s=sigOf(u.id);
    cutin(sigKey(u.id),`「${s.l}」`,`見せ場《${s.n}》`);if(typeof sfx==='function')sfx('fanfare');fxPlay(box,s.fx);
    const el=$('#bu'+v.sig);if(el){el.classList.add('sigglow');setTimeout(()=>el.classList.remove('sigglow'),2400);}
});
  mo.observe(ph,{childList:true,characterData:true,subtree:true});setTimeout(()=>mo.disconnect(),90000);
};

/* ---- 演奏会：見せ場で評判が少し上がる ---- */
const _evalLineupS=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupS(p,L,opt);opt=opt||{};
  const on=L.map((id,i)=>opt.standIn===i?null:id).filter(Boolean);let n=0;
  for(const id of on){const s=sigOf(id);if(!s||n>=2)continue;if(isDud(sigKey(id))||sigKey(id)==='donner')continue;n++;r.q+=.8;r.notes.push(`${nameOf(id)}の見せ場《${s.n}》（+0.8）`);}
  if(n)r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;return r;};
const _performS=perform;
perform=function(){
  _performS();
  const stage=document.querySelector('#scene .stage');if(!stage||!PR)return;
  const seen=new Set();let cut=false;
  const mo=new MutationObserver(ms=>{for(const m of ms){const el=m.target;if(!el.classList||!el.classList.contains('hl'))continue;const id=el.dataset.pid;if(!id||seen.has(id))continue;
    const s=sigOf(id);if(!s)continue;seen.add(id);
    setTimeout(()=>{animSay(el,`「${s.l}」`,'sig');fxPlay(stage,s.fx);el.classList.add('sigglow');setTimeout(()=>el.classList.remove('sigglow'),2000);
      if(!cut&&el.classList.contains('soloist')){cut=true;cutin(sigKey(id),`「${s.l}」`,`見せ場《${s.n}》`);}},350);}});
  stage.querySelectorAll('.perf').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));
  setTimeout(()=>mo.disconnect(),20000);
};

/* ---- 人物の詳しい画面に見せ場を書く ---- */
const _uDetailS=uDetail;
uDetail=function(id){
  const s=sigOf(id),c=id==='you'?null:charById(id);
  if(!s||!c)return _uDetailS(id);
  const o=c.trivia;c.trivia=`<span class="sigline">見せ場《${s.n}》「${s.l}」</span><br>${o||''}`;
  try{return _uDetailS(id);}finally{c.trivia=o;}
};
