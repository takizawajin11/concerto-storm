/* =====================================================================
   もしもの音楽史：5つの時代を一本につなぐ
   ・結末を迎えるたび、その時代の記録を localStorage 'concertoStormSaga' に残す（時代ごとに最高点の1件）
   ・あとの時代を始めると、前の時代の遺産が受け継がれる
       自作の曲 →【遺産】として演目に／運命を越えた人の幻の曲 →【もしもの古典】として演目に
       名門の看板（資金と名声）／流行り歌が民謡として残る（街の人気）
   ・タイトル画面の「あなたの音楽史」で、史実と並べた年表を見られる（文章で共有・画像で保存）
   G.flags.sagaIn = 遺産を受け取り済み　G.flags.sagaRec = 記録済みの報告書id
   ===================================================================== */
const SAGA_KEY='concertoStormSaga',SAGA_ERAS=['s1723','s1781','s1832','s1876','s1905'];
const sagaLoad=()=>{try{return JSON.parse(localStorage.getItem(SAGA_KEY)||'{}')||{};}catch(e){return{};}};
const sagaPut=o=>{try{localStorage.setItem(SAGA_KEY,JSON.stringify(o));}catch(e){}};
const sgQ=t=>String(t).includes('「')?`『${t}』`:`「${t}」`;
const sagaName=id=>{for(const k of SAGA_ERAS){const S=SCEN[k];if(!S)continue;const c=S.chars.find(c=>c.id===id),pl=S.players&&S.players[id];if(c||(pl&&pl.name))return(c||pl).name;}return id;};
/* 運命を越えた人が、あとの時代に残す「もしもの名曲」（FATEの幻の曲に加えて） */
const SAGA_IF={
 mozart:{t:'モーツァルト 交響曲第42番',f:'交響曲',sl:[['cond','指揮'],['vn','コンサートマスター'],['cl','クラリネット'],['vc','チェロ']],mo:'jupiter',d:'史実では第41番「ジュピター」が最後の交響曲。35歳で亡くならなければ、書かれていたかもしれない。'},
 bellini:{t:'ベッリーニ 円熟期のオペラ',f:'オペラ',sl:[['voice','ソプラノ'],['voice','テノール'],['cond','指揮']],mo:'belcanto',d:'史実では33歳で亡くなり、円熟期を迎えなかった。'},
 wagner:{t:'ワーグナー 交響曲第1番（晩年の作）',f:'交響曲',sl:[['cond','指揮'],['br','金管'],['vn','コンサートマスター']],mo:'ride',d:'史実では「これからは交響曲を書きたい」と語ったまま、1883年に亡くなった。'}};
/* ---------- 記録する ---------- */
function sagaRecord(R){
  if(!G||G.flags.chal||!SAGA_ERAS.includes(G.sc))return null;
  const d0=ymd(0),d1=ymd(G.month),E=(typeof LASTEND!=='undefined'&&LASTEND)||{};
  const works=(G.mywork||[]).slice().sort((a,b)=>(b.best-a.best)||(b.q-a.q)).slice(0,3).map(w=>({id:w.id,t:w.t,form:w.form,mo:w.mo,q:w.q,best:w.best,n:w.n}));
  const rec={sc:G.sc,y0:d0.y,y1:d1.y,orch:(R&&R.orch)||`${P().name}管弦楽団`,pname:P().name,pid:G.pid,win:!!E.win,result:(R&&R.result)||E.title||'',score:(R&&R.score)||0,
    works,saved:Object.keys(G.fate||{}).filter(k=>G.fate[k].saved),
    hits:(G.hits||[]).filter(h=>h.cs.length>=2).map(h=>({t:h.t,k:h.k,n:h.cs.length})).slice(0,3),
    prodigy:Object.keys(G.flags.prodigy||{}).map(sagaName),kapell:G.flags.kapell||null,folk:!!G.flags.folkHero,
    grads:(G.lineage||[]).length,star:R&&R.members&&R.members[0]?R.members[0].name:'',cities:(typeof myCities==='function'?myCities():[]).slice(0,6)};
  const all=sagaLoad();const old=all[G.sc];
  if(!old||rec.score>=(old.score||0)||rec.saved.length>(old.saved||[]).length)all[G.sc]=rec;sagaPut(all);return rec;
}
const _saveReportSG=saveReport;
saveReport=function(){const R=_saveReportSG();try{if(R&&G.flags.sagaRec!==R.id){G.flags.sagaRec=R.id;const rec=sagaRecord(R);save();
  if(rec){const nx=SAGA_ERAS[SAGA_ERAS.indexOf(G.sc)+1];const give=sagaGifts(rec);
    setTimeout(()=>modal('音楽史に刻まれた',`<b>${rec.orch}</b>の${rec.y0}〜${rec.y1}年が、あなたの音楽史に刻まれた。${give.length?`<div class="sec-t">次の時代へ受け継がれるもの</div>${give.map(g=>`<div class="pmeta">✦ ${g}</div>`).join('')}`:''}<br>${nx?`<span class="pmeta">次の時代「${SCEN[nx].title}」（${U_YEAR[nx]}年〜）を始めると、この遺産が生きた世界で遊べる。</span>`:'<span class="pmeta">タイトル画面の「あなたの音楽史」で、年表を見られる。</span>'}`,null,'paper'),1500);}}}catch(e){}return R;};
function sagaGifts(rec){const g=[];
  for(const w of rec.works)g.push(`自作${sgQ(w.t)}が【遺産】の演目に`);
  for(const id of rec.saved){if(FATE[id])g.push(`${sagaName(id)}の「${FATE[id].w}」が【もしもの古典】に`);if(SAGA_IF[id])g.push(`「${SAGA_IF[id].t}」が生まれる`);}
  for(const h of rec.hits)g.push(`流行り歌「${h.t}」が民謡として残る`);
  g.push(`名門 ${rec.orch} の看板（資金と名声）`);return g;}
/* ---------- 受け継ぐ ---------- */
const sagaBefore=()=>{const all=sagaLoad(),i=SAGA_ERAS.indexOf(G.sc);return SAGA_ERAS.slice(0,Math.max(0,i)).map(k=>all[k]).filter(Boolean);};
function sagaPieces(){
  for(const rec of sagaBefore()){
    for(const w of rec.works){const id=`saga_${rec.sc}_${w.id}`;if(SC.rep.some(p=>p.id===id))continue;const F=CFORM.find(x=>x.f===w.form)||CFORM[0];
      SC.rep.push(Pc(id,`【遺産】${rec.pname}${sgQ(w.t)}（${rec.y1}年）`,w.form,F.sl.map(([r,l])=>Sl([r],l)),[.4,.4,.2],'古典',null,MOTIFS[w.mo]?w.mo:'scale','violin'));}
    for(const sid of rec.saved){
      const F=FATE[sid];if(F){const id=`sagaf_${sid}`;if(!SC.rep.some(p=>p.id===id))SC.rep.push(Pc(id,`【もしもの古典】${F.w}`,F.f,F.sl.map(([r,l])=>Sl([r],l)),[.3,.6,.1],'古典',null,MOTIFS[F.mo]?F.mo:'scale','violin'));}
      const X=SAGA_IF[sid];if(X){const id=`sagax_${sid}`;if(!SC.rep.some(p=>p.id===id))SC.rep.push(Pc(id,`【もしもの古典】${X.t}`,X.f,X.sl.map(([r,l])=>Sl([r],l)),[.3,.5,.2],'古典',null,MOTIFS[X.mo]?X.mo:'scale','violin'));}}
  }
}
function sagaInherit(){
  if(G.flags.sagaIn||G.flags.chal||G.month>0)return;const recs=sagaBefore();G.flags.sagaIn=1;if(!recs.length)return;
  const n=recs.length,money=400*n+recs.filter(r=>r.win).length*300,xp=15*n;P().money+=money;try{addXP(xp);}catch(e){}
  const L=[];
  for(const r of recs){const y=`<b>${r.y0}〜${r.y1}年</b>　${r.orch}`;const bits=[];
    if(r.works.length)bits.push(`名作${r.works.map(w=>sgQ(w.t)).join('')}`);
    for(const id of r.saved){bits.push(`運命を越えた${sagaName(id)}`);}
    for(const h of r.hits){if(SC.cities.includes(h.k)){try{popAdd(h.k,8);}catch(e){}bits.push(`民謡になった「${h.t}」（${ci(h.k).name}の人気+8）`);}else bits.push(`民謡になった「${h.t}」`);}
    if(r.folk)bits.push('「民衆の楽団」の名声');if(r.kapell)bits.push('宮廷楽長の家柄');
    L.push(`<div class="pmeta" style="margin:4px 0">${y}${bits.length?'<br>　'+bits.join('／'):''}</div>`);}
  const ifs=[].concat(...recs.map(r=>r.saved.filter(id=>SAGA_IF[id]).map(id=>`<div class="trivia">【もしもの世界】${SAGA_IF[id].t}：${SAGA_IF[id].d}</div>`)));
  hpush('先人の遺産を受け継いだ');
  setTimeout(()=>modal('受け継がれた音楽史',`この世界は、あなたが変えてきた音楽史の続きにある。${L.join('')}${ifs.join('')}
    <div class="stx">名門の看板：資金 +${fmt(money)}fr・名声 +${xp}<br>【遺産】【もしもの古典】の曲が演目に加わった（演奏すると評判が上がる）</div>`,null,'paper'),1800);
}
const _startSG=start;
start=function(){const r=_startSG();try{if(G&&SC&&SAGA_ERAS.includes(G.sc)&&!G.flags.chal){sagaPieces();sagaInherit();}}catch(e){}return r;};
/* 演奏会：遺産の曲は評判が上がる */
const _evalLineupSGA=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupSGA(p,L,opt);try{if(p&&typeof p.id==='string'&&/^saga/.test(p.id)){let b=1.5,why='受け継がれた名作';
  if(/^saga_/.test(p.id)){const m=p.id.match(/^saga_(s\d+)_(.+)$/),rec=m&&sagaLoad()[m[1]],w=rec&&rec.works.find(x=>x.id===m[2]);if(w){b=Math.round((1+w.q/15+(w.best>=4&&w.n>=3?1:0))*10)/10;if(w.best>=4&&w.n>=3)why='先人の代表作';}}
  else why='歴史が変わって生まれた名曲';
  r.q+=b;r.notes.push(`${why}（+${b.toFixed(1)}）`);r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}}catch(e){}return r;};
/* ---------- 年表 ---------- */
const SAGA_REAL={
 s1723:'バッハはライプツィヒのトーマス教会で働き、ヘンデルはロンドンでオペラを興行した。2人は生涯、一度も会わなかった。',
 s1781:'モーツァルトはウィーンで独立し、1791年に35歳で世を去った。『レクイエム』は未完のまま残った。',
 s1832:'パガニーニとリストがヨーロッパを熱狂させ、ショパンはパリのサロンで弾いた。パガニーニは1840年に没した。',
 s1876:'ワーグナーがバイロイトに自分の劇場を開き、ブラームスが交響曲第1番を発表した。ワーグナーは1883年に没した。',
 s1905:'マーラーがウィーン宮廷歌劇場を率い、1911年に交響曲第10番を未完のまま世を去った。'};
function sagaLines(k,rec){const L=[];if(!rec)return L;
  L.push(`${rec.orch}（${rec.pname}）──${rec.result||'物語の幕'}`);
  for(const id of rec.saved)L.push(`✦ ${sagaName(id)}が運命を越えた${FATE[id]?`→「${FATE[id].w}」`:''}`);
  if(rec.works.length)L.push(`♪ 新しい名作：${rec.works.map(w=>sgQ(w.t)).join('')}`);
  for(const h of rec.hits)L.push(`♪ 流行り歌「${h.t}」が${h.n}つの街で歌われた`);
  if(rec.prodigy.length)L.push(`★ 街角から神童：${rec.prodigy.join('、')}`);
  if(rec.folk)L.push('★ 「民衆の楽団」と呼ばれた');if(rec.kapell)L.push('★ 宮廷楽長に就任');
  if(rec.grads)L.push(`🎓 師弟の系譜を${rec.grads}組残した`);
  return L;}
function sagaText(){const all=sagaLoad(),out=['【協奏の嵐】わたしの「もしもの音楽史」'];
  for(const k of SAGA_ERAS){if(!SCEN[k])continue;const rec=all[k];out.push('',`■ ${U_YEAR[k]}年〜　${SCEN[k].title}`);if(rec)sagaLines(k,rec).forEach(l=>out.push(l));else out.push('（史実のまま）');}
  out.push('',(typeof shBase==='function'?shBase():location.href.split('?')[0]));return out.join('\n');}
function sagaOpen(){
  const all=sagaLoad(),n=SAGA_ERAS.filter(k=>all[k]).length;
  const body=SAGA_ERAS.filter(k=>SCEN[k]).map(k=>{const rec=all[k];
    return`<div class="sgera${rec?' on':''}"><div class="sgy">${U_YEAR[k]}</div><div class="sgb"><b>${SCEN[k].title}</b>
      <div class="sgr"><span>史実</span>${SAGA_REAL[k]||''}</div>
      ${rec?`<div class="sgm"><span>あなたの歴史</span>${sagaLines(k,rec).join('<br>')}</div>`:'<div class="sgn">まだ遊んでいない（史実のまま）</div>'}</div></div>`;}).join('');
  modal('あなたの音楽史',`<div class="pmeta">古い時代から順に遊ぶと、前の時代の遺産が次の時代に受け継がれる。（${n}/${SAGA_ERAS.length}時代）</div><div class="saga">${body}</div>
    ${n?`<div class="sgact"><button class="btn" id="sgShare">文章で共有</button><button class="btn" id="sgImg">画像で保存</button></div>`:''}`,[{t:'閉じる'}],'paper');
  setTimeout(()=>{const s=$('#sgShare');if(s)s.onclick=()=>{const t=sagaText();if(navigator.share)navigator.share({text:t}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('年表をコピーしました')).catch(()=>{});};
    const i=$('#sgImg');if(i)i.onclick=sagaImage;},60);
}
function sagaImage(){try{
  const all=sagaLoad(),W=1080,pad=64,cv=document.createElement('canvas'),x=cv.getContext('2d');
  const F=(s,b)=>`${b?'bold ':''}${s}px "Hiragino Mincho ProN","Yu Mincho",serif`;
  const wrap=(t,w)=>{const o=[];let l='';for(const ch of t){if(x.measureText(l+ch).width>w){o.push(l);l=ch;}else l+=ch;}if(l)o.push(l);return o;};
  const rows=[];
  for(const k of SAGA_ERAS){if(!SCEN[k])continue;const rec=all[k];rows.push({f:F(40,1),c:'#f0d58a',t:`${U_YEAR[k]}　${SCEN[k].title}`,gap:26});
    rows.push({f:F(24),c:'#9a8c70',t:`史実：${SAGA_REAL[k]||''}`,gap:8});
    if(rec)for(const l of sagaLines(k,rec))rows.push({f:F(28),c:'#fbf3df',t:l,gap:6});else rows.push({f:F(26),c:'#6a6050',t:'（史実のまま）',gap:6});}
  let h=pad+150;const lay=[];for(const r of rows){x.font=r.f;const ls=wrap(r.t,W-pad*2);h+=r.gap;for(const l of ls){const s=parseInt(r.f.match(/(\d+)px/)[1]);lay.push({l,y:h+s,f:r.f,c:r.c});h+=s*1.45;}}
  h+=pad+50;cv.width=W;cv.height=Math.max(1080,Math.round(h));
  const g=x.createLinearGradient(0,0,0,cv.height);g.addColorStop(0,'#2a1810');g.addColorStop(1,'#120a06');x.fillStyle=g;x.fillRect(0,0,W,cv.height);
  x.strokeStyle='#cfa84f';x.lineWidth=4;x.strokeRect(24,24,W-48,cv.height-48);
  x.fillStyle='#f0d58a';x.font=F(60,1);x.fillText('わたしの「もしもの音楽史」',pad,pad+70);x.fillStyle='#cfa84f';x.font=F(26);x.fillText('協奏の嵐 Concerto Storm',pad,pad+115);
  for(const r of lay){x.font=r.f;x.fillStyle=r.c;x.fillText(r.l,pad,r.y);}
  x.fillStyle='#9a8c70';x.font=F(22);x.fillText('takizawajin11.github.io/concerto-storm',pad,cv.height-pad+14);
  const a=document.createElement('a');a.download='協奏の嵐_わたしの音楽史.png';a.href=cv.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();toast('年表の画像を保存しました');
}catch(e){toast('画像を作れませんでした');}}
/* タイトル画面 */
const _titleSG=title;
title=function(){_titleSG();try{const sec=document.querySelector('#main .title .sec-t');if(!sec)return;const all=sagaLoad(),n=SAGA_ERAS.filter(k=>all[k]).length;
  sec.insertAdjacentHTML('beforebegin',`<button class="btn sagabtn" id="sagaBtn">📜 あなたの音楽史<small>${n?`${n}/${SAGA_ERAS.length}時代を刻んだ。古い時代の遺産が、次の時代に受け継がれる`:'結末を迎えると、その時代があなたの音楽史に刻まれ、次の時代に受け継がれる'}</small></button>`);
  $('#sagaBtn').onclick=sagaOpen;
  if(n)document.querySelectorAll('#main .title [data-s]').forEach(b=>{const k=b.dataset.s,i=SAGA_ERAS.indexOf(k);if(i<0)return;const got=SAGA_ERAS.slice(0,i).filter(e=>all[e]).length;
    if(all[k])b.insertAdjacentHTML('beforeend','<p class="sgtag">📜 音楽史に刻んだ</p>');else if(got)b.insertAdjacentHTML('beforeend',`<p class="sgtag new">✦ ${got}つの時代の遺産を受け継いで始まる</p>`);});
}catch(e){}};
