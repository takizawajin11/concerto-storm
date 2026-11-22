/* =====================================================================
   人間関係のドラマ：団員どうしの友情・恋・確執。相関図で見る
   G.bond = {"a|b": -100〜100}、G.bondT = {"a|b": "見出し"}
   ===================================================================== */
const BOND_H=[
 ['cuzzoni','faustina',-85,'宿敵の歌姫','1727年、ロンドンの舞台上で二人の歌姫が取っ組み合いの大喧嘩をした。'],
 ['handel','bononcini',-55,'宿敵','ロンドンの歌劇場は、ヘンデル派とボノンチーニ派に割れた。'],
 ['handel','senesino',-35,'衝突ばかり','名カストラートのセネジーノは、ヘンデルと何度も衝突した。'],
 ['handel','mattheson',-30,'決闘の過去','1704年、若きヘンデルとマッテゾンは口論から剣で決闘した。ボタンが剣を止め、命拾いした。'],
 ['haydn','mozart',75,'厚い友情','ハイドンはモーツァルトを「最も偉大な作曲家」と呼び、モーツァルトは6つの弦楽四重奏曲をハイドンに捧げた。'],
 ['haydn','beethoven',10,'ぎくしゃくした師弟','ベートーヴェンはハイドンに学んだが、「何も教わらなかった」とこぼしたという。'],
 ['schumann','clara',85,'夫婦','ロベルトとクララは、クララの父の猛反対を押し切って結婚した。'],
 ['chopin','liszt',45,'友情（やがて冷える）','若い二人はパリで親しくしたが、のちに距離ができた。'],
 ['liszt','thalberg',-50,'宿敵','1837年、パリでリストとタールベルクの「ピアノ決闘」が行われた。'],
 ['berlioz','liszt',60,'盟友','リストはベルリオーズの『幻想交響曲』をピアノ用に編曲して広めた。'],
 ['brahms','clara76',70,'敬愛','ブラームスは生涯、クララ・シューマンを敬い続けた。'],
 ['brahms','joachim',65,'親友','ブラームスとヨアヒムは若い頃からの親友。ヴァイオリン協奏曲はヨアヒムのために書かれた。'],
 ['brahms','bulow',55,'支持者','指揮者ビューローは「バッハ、ベートーヴェン、ブラームス」を「3つのB」と呼んで広めた。'],
 ['wagner','bulow',-40,'複雑な因縁','ビューローはワーグナーの楽劇を初演して支えたが、妻コジマはのちにワーグナーと結ばれた。'],
 ['wagner','brahms',-45,'楽派の冷戦','二人のまわりで、音楽界は「新ドイツ派」と「保守派」に割れた。'],
 ['tchaikovsky','nrubinstein',-20,'衝突と和解','ルビンシテインはチャイコフスキーのピアノ協奏曲第1番を「弾けない」と酷評した。のちに和解し、この曲を弾いた。'],
 ['mahler','walter',70,'師弟','ブルーノ・ワルターはマーラーの助手として学び、のちに『大地の歌』を初演した。'],
 ['mahler','rstrauss',20,'好敵手','二人は互いの作品を演奏し合ったが、性格は正反対だった。'],
 ['debussy','satie',65,'親友','ドビュッシーとサティは、パリのカフェで長年語り合う仲だった。'],
 ['stravinsky','rimsky05',70,'師弟','ストラヴィンスキーはリムスキー=コルサコフに作曲を学んだ。'],
 ['haru','aki',80,'兄弟','時の扉から来た兄弟。兄は堅実、弟は一か八か。'],
 ['regis','bruno',85,'兄弟','新パスキエ・トリオの兄弟。'],
 ['tsugio','eto',40,'腐れ縁','外れた音を出し合う古株どうし。']
];
const bkey=(a,b)=>[a,b].sort().join('|');
function bondOf(a,b){G.bond=G.bond||{};const k=bkey(realId(a),realId(b));if(G.bond[k]==null){const h=BOND_H.find(x=>bkey(x[0],x[1])===k);G.bond[k]=h?h[2]:0;if(h){G.bondT=G.bondT||{};G.bondT[k]=h[3];}}return G.bond[k];}
function bondAdd(a,b,n,label){const k=bkey(realId(a),realId(b));bondOf(a,b);G.bond[k]=Math.max(-100,Math.min(100,G.bond[k]+n));if(label){G.bondT=G.bondT||{};G.bondT[k]=label;}}
const bondLabel=(a,b)=>{const v=bondOf(a,b),t=(G.bondT||{})[bkey(realId(a),realId(b))];return t||(v>=70?'固い絆':v>=40?'友情':v>=15?'気が合う':v<=-60?'犬猿の仲':v<=-30?'不仲':v<=-10?'ぎくしゃく':'');};
const bondPairs=()=>{const m=['you'].concat(G.members),o=[];for(let i=0;i<m.length;i++)for(let j=i+1;j<m.length;j++){const a=m[i]==='you'?G.pid:m[i],b=m[j]==='you'?G.pid:m[j];o.push([m[i],m[j],bondOf(a,b)]);}return o;};
/* 演奏会：名コンビと不仲 */
const _evalLineupBD=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupBD(p,L,opt);try{opt=opt||{};const on=L.map((id,i)=>opt.standIn===i?null:id).filter(Boolean).map(id=>id==='you'?G.pid:id);let add=0;const nt=[];
  for(let i=0;i<on.length;i++)for(let j=i+1;j<on.length;j++){const v=bondOf(on[i],on[j]);if(v>=60){add+=.6;nt.push(`${nameOf(on[i]===G.pid?'you':on[i])}と${nameOf(on[j]===G.pid?'you':on[j])}の名コンビ（+0.6）`);}else if(v<=-50){add-=.8;nt.push(`${nameOf(on[i]===G.pid?'you':on[i])}と${nameOf(on[j]===G.pid?'you':on[j])}は犬猿の仲（-0.8）`);}}
  add=Math.max(-2,Math.min(2,add));if(add){r.q+=add;r.notes.push(...nt.slice(0,3));r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}}catch(e){}return r;};
/* 共演すると縁が深まる */
const _concertResultBD=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultBD(p,L,ev,fi);try{const on=(L||[]).filter(Boolean).map(id=>id==='you'?G.pid:id);const good=(ev&&ev.stars||3)>=4;
  for(let i=0;i<on.length;i++)for(let j=i+1;j<on.length;j++)bondAdd(on[i],on[j],good?3:1);}catch(e){}return r;};
/* 月ごとの人間ドラマ */
function bondMonthly(){
  if(G.members.length<2)return;const prs=bondPairs().filter(([a,b])=>a!=='you'&&b!=='you');if(!prs.length)return;
  const cf=prs.find(([a,b])=>['cuzzoni','faustina'].includes(realId(a))&&['cuzzoni','faustina'].includes(realId(b)));
  if(cf&&!G.flags.rivalQueens&&Math.random()<.5){G.flags.rivalQueens=1;const[a,b]=cf;
    modal('舞台の上の大喧嘩',`${portraitRow(a)}${portraitRow(b)}本番の最中、${nameOf(a)}と${nameOf(b)}が舞台の上でつかみ合いの喧嘩を始めた！ 客席は大喜びで、口笛と野次が飛ぶ。<br><span class="pmeta">史実でも1727年、ロンドンでこの二人の歌姫は舞台上で取っ組み合った。</span>`,
      [{t:'幕を下ろして仲裁する<small>-300fr・二人の仲が少し戻る</small>',f(){P().money-=300;bondAdd(a,b,25);}},{t:'そのまま続けさせる<small>話題になって名声+15、二人の仲は最悪に</small>',f(){addXP(15);bondAdd(a,b,-15);}}],'paper');return;}
  if(Math.random()>.35)return;
  const bad=prs.filter(x=>x[2]<=-30),good=prs.filter(x=>x[2]>=50),zero=prs.filter(x=>Math.abs(x[2])<15);
  const r=Math.random();
  if(bad.length&&r<.45){const[a,b]=pick(bad);
    modal('楽屋の口論',`${portraitRow(a)}${portraitRow(b)}${nameOf(a)}と${nameOf(b)}が、楽屋で激しく言い争っている。テンポのこと、出番の順番のこと、昔の恨み……。<br><span class="pmeta">いまの仲：${bondLabel(a,b)||'不仲'}</span>`,
      [{t:'食事に連れ出して仲裁する<small>-200fr・仲+20</small>',cls:'gold',f(){if(P().money<200)return toast('お金が足りない');P().money-=200;bondAdd(a,b,20);addLog(`${nameOf(a)}と${nameOf(b)}は、ワインを酌み交わして少し打ち解けた。`);}},
       {t:'放っておく<small>二人の気分が下がる</small>',f(){setMood(a,moodOf(a)-8);setMood(b,moodOf(b)-8);bondAdd(a,b,-5);}}],'paper');}
  else if(good.length&&r<.75){const[a,b]=pick(good);setMood(a,moodOf(a)+5);setMood(b,moodOf(b)+5);bondAdd(a,b,3);
    addLog(pick([`${nameOf(a)}と${nameOf(b)}が、夜更けまで連弾して笑い合っていた。`,`${nameOf(a)}が${nameOf(b)}の誕生日に、小さな曲を書いて贈った。`,`${nameOf(a)}と${nameOf(b)}が、馬車の中で次の演奏会の構想を語り合った。`]));}
  else if(zero.length){const[a,b]=pick(zero);if(Math.random()<.65){bondAdd(a,b,18,'意気投合');addLog(`${nameOf(a)}と${nameOf(b)}が意気投合した。新しい名コンビになるかもしれない。`);}
    else{bondAdd(a,b,-18,'ちょっとした行き違い');addLog(`${nameOf(a)}の何気ない一言に、${nameOf(b)}がむっとした。`);}}
}
const _memberMonthlyBD=memberMonthly;
memberMonthly=function(){_memberMonthlyBD();try{bondMonthly();}catch(e){}};
/* 相関図 */
function bondMap(){
  const ms=['you'].concat(G.members).slice(0,14),n=ms.length,W=360,H=360,cx=180,cy=180,R=n<=6?110:135;
  const pos=ms.map((id,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[cx+R*Math.cos(a),cy+R*Math.sin(a)];});
  const rid=id=>id==='you'?G.pid:id;let lines='',tags=[];
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const v=bondOf(rid(ms[i]),rid(ms[j]));if(Math.abs(v)<15)continue;const lb=bondLabel(rid(ms[i]),rid(ms[j]));
    const col=/夫婦|恋/.test(lb)?'#e05a8a':v>0?(v>=60?'#d4a020':'#4aa070'):'#c03030';const w=Math.min(6,1+Math.abs(v)/20);
    lines+=`<line x1="${pos[i][0]}" y1="${pos[i][1]}" x2="${pos[j][0]}" y2="${pos[j][1]}" stroke="${col}" stroke-width="${w}" ${v<0?'stroke-dasharray="6 4"':''} opacity=".85"/>`;
    tags.push([Math.abs(v),`<div class="btag"><i style="background:${col}"></i><b>${nameOf(ms[i])}</b>と<b>${nameOf(ms[j])}</b>：${lb}${(BOND_H.find(x=>bkey(x[0],x[1])===bkey(rid(ms[i]),rid(ms[j])))||[])[4]?`<br><span class="pmeta">${BOND_H.find(x=>bkey(x[0],x[1])===bkey(rid(ms[i]),rid(ms[j])))[4]}</span>`:''}</div>`]);}
  const pts=ms.map((id,i)=>`<div class="bnode" style="left:${pos[i][0]/W*100}%;top:${pos[i][1]/H*100}%">${portrait(rid(id),40,'#c9a24a')}<span>${nameOf(id)}</span></div>`).join('');
  tags.sort((a,b)=>b[0]-a[0]);
  modal('人間関係図',`<div class="bmap"><svg viewBox="0 0 ${W} ${H}">${lines}</svg>${pts}</div><div class="pmeta" style="margin:4px 0">金＝固い絆　緑＝友情　桃＝恋・夫婦　赤の点線＝不仲</div>${tags.slice(0,10).map(x=>x[1]).join('')||'<div class="pmeta">まだ目立った関係はない。共演を重ねると縁が生まれる。</div>'}`,null,'paper');
}
