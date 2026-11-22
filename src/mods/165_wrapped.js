/* =====================================================================
   楽団の年間まとめ（毎年1月に前年をふり返る1枚。送れる）
   G.yr = {y, conc, star5, best, pieces{}, play{}, earn, recruit, duel, bet, quiz}
   ===================================================================== */
const yrSt=()=>{const y=ymd(G.month).y;if(!G.yr||G.yr.y!==y)G.yr={y,conc:0,star5:0,best:0,pieces:{},play:{},earn:0,recruit:0,duel:0,bet:0,quiz:0,m0:P().money};return G.yr;};
const _concertResultYR=concertResult;
concertResult=function(p,L,ev,fi){const before=P().money;const r=_concertResultYR(p,L,ev,fi);try{const Y=yrSt(),s=(ev&&ev.stars)||0;Y.conc++;if(s>=5)Y.star5++;Y.best=Math.max(Y.best,s);
  Y.pieces[p.t]=(Y.pieces[p.t]||0)+1;for(const id of (L||[]).filter(Boolean))Y.play[id]=(Y.play[id]||0)+1;Y.earn+=Math.max(0,P().money-before);}catch(e){}return r;};
function yrCard(Y){
  const top=(o)=>Object.entries(o).sort((a,b)=>b[1]-a[1])[0];const tp=top(Y.pieces),tm=top(Y.play);
  const saved=Object.keys(G.fate||{}).filter(k=>G.fate[k].saved&&G.fate[k].sy===Y.y).length;
  const items=[['演奏会',`${Y.conc}回`],['★5の夜',`${Y.star5}回`],['いちばん弾いた曲',tp?`${tp[0].replace(/^【.】/,'')}（${tp[1]}回）`:'—'],['いちばん舞台に立った人',tm?`${nameOf(tm[0])}（${tm[1]}回）`:'—'],['演奏会の稼ぎ',`${fmt(Y.earn)}fr`],['新しく迎えた仲間',`${Y.recruit}人`]];
  if(Y.dreams)items.push(['夢の顔合わせ',`${Y.dreams}組`]);if(saved)items.push(['史実を変えた',`${saved}人`]);
  return{items,html:`<div class="wrapped"><div class="wy">${Y.y}</div><div class="wt">${P().name}管弦楽団の一年</div>${items.map(([a,b])=>`<div class="wi"><span>${a}</span><b>${b}</b></div>`).join('')}</div>`};
}
function yrShow(Y){const c=yrCard(Y);const txt=`『協奏の嵐』${P().name}管弦楽団の${Y.y}年：`+c.items.map(([a,b])=>`${a} ${b}`).join('／');
  modal(`${Y.y}年のまとめ`,c.html,[{t:'送る',cls:'gold',f(){const full=`${txt} ${shBase()}`;if(navigator.share)navigator.share({text:full}).catch(()=>{});else navigator.clipboard.writeText(full).then(()=>toast('コピーしました')).catch(()=>{});}},{t:'閉じる'}],'paper');}
const _memberMonthlyYR=memberMonthly;
memberMonthly=function(){const prev=G.yr&&{...G.yr};_memberMonthlyYR();try{const d=ymd(G.month);if(d.mo===1&&prev&&prev.y===d.y-1&&prev.conc>0&&G.flags.yrShown!==prev.y){G.flags.yrShown=prev.y;G.yrLast=prev;setTimeout(()=>yrShow(prev),1200);}yrSt();}catch(e){}};
/* 数える：入団、夢の顔合わせ、運命の夜を越えた年 */
const _odaiHitYR=odaiHit;
odaiHit=function(k){if(k==='recruit')try{yrSt().recruit++;}catch(e){}return _odaiHitYR(k);};
const _dreamCheckYR=dreamCheck;
dreamCheck=function(){const r=_dreamCheckYR();if(r)try{const Y=yrSt();Y.dreams=(Y.dreams||0)+1;}catch(e){}return r;};
const _fateNightYR=fateNight;
fateNight=function(id,E){return _fateNightYR(id,E).then(ok=>{if(ok)try{fateSt(id).sy=ymd(G.month).y;}catch(e){}return ok;});};
function yrOpen(){const Y=yrSt();if(Y.conc)return yrShow(Y);if(G.yrLast)return yrShow(G.yrLast);toast('まだまとめるほどの記録がない');}
