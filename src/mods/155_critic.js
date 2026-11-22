/* =====================================================================
   宿敵の批評家：時代ごとに一人。演奏会のたびに批評を書き、ついに唸らせれば大きな名声
   G.critic = {v:0〜100, won:bool, n:回数}
   ===================================================================== */
const CRITIC={
 s1723:{id:'mattheson',n:'マッテゾン',paper:'ハンブルクの批評誌',like:['オペラ'],hate:[],likeBy:[],hateBy:['handel'],
   bio:'ハンブルクの作曲家で、ドイツ最初期の音楽批評家。若い頃、ヘンデルと剣で決闘したことがある。',
   hl:'ヘンデルの曲には、どうしても点が辛くなる。'},
 s1781:{id:'reichardt',n:'ライヒャルト',paper:'ベルリンの音楽新聞',like:['オペラ','宗教曲'],hate:[],likeBy:['gluck'],hateBy:[],
   bio:'ベルリンの作曲家で、辛口の音楽評論でも知られた。'},
 s1832:{id:'fetis',n:'フェティス',paper:'ルヴュ・ミュジカル',like:['宗教曲','室内楽'],hate:['オペラ'],likeBy:[],hateBy:['berlioz'],
   bio:'パリの音楽学者で批評家。ベルリオーズの音楽を手厳しく批判し続けた。'},
 s1876:{id:'hanslick',n:'ハンスリック',paper:'新自由新聞',like:['交響曲','室内楽','協奏曲'],hate:['楽劇'],likeBy:['brahms'],hateBy:['wagner'],
   bio:'ウィーンの大批評家。ブラームスを擁護し、ワーグナーを攻撃した。ワーグナーは『マイスタージンガー』の嫌みな書記ベックメッサーを彼になぞらえたといわれる。'},
 s1905:{id:'plalo',n:'ピエール・ラロ',paper:'ル・タン',like:['交響曲'],hate:['バレエ'],likeBy:[],hateBy:['ravel'],
   bio:'パリの新聞『ル・タン』の批評家。作曲家エドゥアール・ラロの息子で、ラヴェルの音楽を辛辣に批判した。'}
};
Object.assign(TR,{reichardt:{h:'wig',age:1},fetis:{h:'short',hc:'#888',b:'side',age:2},hanslick:{h:'receding',hc:'#555',b:'side',age:1},plalo:{h:'short',hc:'#444',b:'mus'}});
const crit=()=>CRITIC[G.sc];
const critSt=()=>{G.critic=G.critic||{v:20,won:false,n:0};return G.critic;};
let _critRev=null;
const REV={5:['認めざるをえない。今夜の演奏は、歴史に残るだろう。','……私の負けだ。今夜ばかりは、ペンが震える。'],4:['悪くない。だが、私はまだ満足していない。','光るところはあった。次に期待しよう。'],
  3:['凡庸。眠気をこらえるのに苦労した。','可もなく不可もなく。つまり、退屈だ。'],2:['退屈きわまりない。客席の半分は時計を見ていた。','楽団は、まず楽譜を読むところから始めるべきだ。'],1:['入場料を返してもらいたい。','これは音楽ではない。騒音である。']};
const _concertResultCR=concertResult;
concertResult=function(p,L,ev,fi){
  try{const C0=crit();if(C0){const s=critSt(),st=(ev&&ev.stars)||3;let d=(st-3)*7+rnd(-3,3),why='';
    if(C0.like.includes(p.form)){d+=5;why='せめて、形式をわきまえた選曲は評価しよう。';}
    if(C0.hate.includes(p.form)){d-=8;why=`そもそも${p.form}などという代物は、音楽の名に値しない。`;}
    if(p.by&&C0.likeBy.includes(p.by)){d+=6;why='作曲者の筆は、さすがに確かだ。';}
    if(p.by&&C0.hateBy.includes(p.by)){d-=8;why=C0.hl||'この作曲者の曲には、どうしても点が辛くなる。';}
    d=Math.round(d);s.v=Math.max(0,Math.min(100,s.v+d));s.n++;
    _critRev={st,txt:pick(REV[Math.max(1,Math.min(5,st))]),why,d,v:s.v};
    if(s.v>=100&&!s.won){s.won=true;setTimeout(()=>{addXP(40);hpush(`宿敵の批評家${C0.n}を唸らせた`);cutin(C0.id,'見事だ……','宿敵の批評家、ついに絶賛');
      modal(`${C0.n}、ついに絶賛`,`${portraitRow(C0.id)}あの${C0.n}が、${C0.paper}の一面であなたの楽団を絶賛した。街じゅうがこの記事の話でもちきりだ。<br><br>名声+40`,null,'paper');},2600);}
    else if(s.v<=0){s.v=15;setTimeout(()=>{addXP(-10);modal('酷評の嵐',`${portraitRow(C0.id)}${C0.n}が三号続けてあなたの楽団をこき下ろした。客足に響きそうだ。<br><span class="pmeta">名声-10</span>`,null,'paper');},2600);}}}catch(e){}
  return _concertResultCR(p,L,ev,fi);};
const _modalCR=modal;
modal=function(title,body,btns,cls){
  try{if(_critRev&&G&&title===paperOf(P().city)){const C0=crit(),r=_critRev;_critRev=null;
    body+=`<div class="critic">${portrait(C0.id,38,'#8a2a3a')}<div><b>宿敵 ${C0.n}の批評</b>（${C0.paper}）<br>「${r.txt}${r.why?' '+r.why:''}」<div class="cbar"><i style="width:${r.v}%"></i><span>${C0.n}の評価 ${r.v}/100（${r.d>=0?'+':''}${r.d}）</span></div></div></div>`;}}catch(e){}
  return _modalCR(title,body,btns,cls);};
function criticInfo(){const C0=crit();if(!C0)return;const s=critSt();
  modal(`宿敵の批評家：${C0.n}`,`${portraitRow(C0.id)}${C0.bio}<br><br>好み：${C0.like.join('・')||'—'}${C0.hate.length?`／嫌い：${C0.hate.join('・')}`:''}<div class="cbar"><i style="width:${s.v}%"></i><span>いまの評価 ${s.v}/100</span></div><span class="pmeta">演奏会の出来と選曲で評価が上下する。100にすれば、ついに絶賛の記事が出る。0になると酷評の嵐。${s.won?'<br><b>すでに一度、唸らせた。</b>':''}</span>`,null,'paper');}
