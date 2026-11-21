/* =====================================================================
   楽団史の共有：リンク・画像カード・データの書き出し／読み込み
   （サーバー不要。記録はURLの中に圧縮して入れる）
   ===================================================================== */
const SH_TITLES=[[0,'町の楽団'],[600,'宮廷に呼ばれる楽団'],[1200,'都の名門楽団'],[2000,'欧州に名だたる楽団'],[3000,'時代を代表する楽団'],[4500,'音楽史に刻まれる楽団'],[6500,'伝説の楽団']];
const shTitle=s=>SH_TITLES.filter(x=>s>=x[0]).pop()[1];
/* 総合点：都市・名声・楽団の育成・実績・難易度を合わせた点（将来のランキング用） */
function shScore(R){
  const dm={入門:.8,普通:1,難しい:1.3,超難しい:1.6,地獄:2}[R.diff]||1;
  const lvsum=(R.mem||[]).reduce((a,m)=>a+(m.lv||1),0);
  return Math.round(((R.score||0)+lvsum*4+(R.ach||[]).length*40+(R.caps||0)*60+(R.win?800:0))*dm);
}
/* 報告書に、楽団の育成の記録を足す */
const _buildReportS=buildReport;
buildReport=function(){
  const R=_buildReportS();ensU();
  R.mem=R.members.filter(m=>m.stay).map(m=>({id:m.id,name:m.name,seat:m.seat,lv:ux(m.id).lv,kai:ux(m.id).kai?1:0,ge:guestEra(m.id)||null,mvp:m.mvp})).sort((a,b)=>b.lv-a.lv);
  R.sets=uSets(G.fleet[0]).map(s=>s.n);R.caps=G.ust.caps||0;R.lost=G.ust.lost||0;
  try{const got=JSON.parse(localStorage.getItem('concertoStormAch')||'{}');R.ach=ACH.filter(a=>got[a.id]).map(a=>a.n);}catch(e){R.ach=[];}
  R.total=shScore(R);R.title=shTitle(R.total);return R;
};
/* ---- URLへの詰め込み ---- */
function shPack(R){
  return{v:1,o:R.orch,n:R.byName||'',sc:R.sc,st:R.scTitle,pe:R.period,p:R.pid,pn:R.pname,df:R.diff,rs:R.result,w:R.win?1:0,s:R.score,t:R.total,ti:R.title,lv:R.lv,
    ci:R.cities,co:R.concerts,rv:R.rev,ep:R.epi,
    m:(R.mem||R.members.filter(m=>m.stay)).slice(0,12).map(m=>[m.id,m.name,m.lv||1,m.kai||0,m.ge||'',m.mvp||0]),
    tp:(R.top||[]).slice(0,3).map(c=>[c.d,c.t,c.h,c.s,c.mvp||'']),
    h:(R.hist||[]).filter(x=>!/^🏅/.test(x.s)).slice(-24).map(x=>[x.d,x.s]),a:(R.ach||[]).slice(0,30),se:R.sets||[],cp:R.caps||0,pl:R.played};
}
const b64u=b=>{let s='';const a=new Uint8Array(b);for(let i=0;i<a.length;i++)s+=String.fromCharCode(a[i]);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');};
const ub64u=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const b=atob(s),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a;};
async function shEncode(obj){
  const raw=new TextEncoder().encode(JSON.stringify(obj));
  if(typeof CompressionStream!=='undefined'){try{const cs=new CompressionStream('deflate-raw');const out=await new Response(new Blob([raw]).stream().pipeThrough(cs)).arrayBuffer();return'z'+b64u(out);}catch(e){}}
  return'j'+b64u(raw);
}
async function shDecode(s){
  const k=s[0],a=ub64u(s.slice(1));
  if(k==='z'){const ds=new DecompressionStream('deflate-raw');const out=await new Response(new Blob([a]).stream().pipeThrough(ds)).arrayBuffer();return JSON.parse(new TextDecoder().decode(out));}
  return JSON.parse(new TextDecoder().decode(a));
}
const shBase=()=>location.origin+location.pathname;
async function shLink(R){return`${shBase()}#r=${await shEncode(shPack(R))}`;}

/* ---- 肖像を画像に ---- */
function ptEra(id,era,size,ring){const o=RSC;RSC=era||null;try{return portrait(id,size,ring);}finally{RSC=o;}}
function svgImg(svg){return new Promise(res=>{const s=svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace(/var\(--gold\)/g,'#c9a24a').replace(/var\(--[a-z0-9]+\)/g,'#c9a24a');
  const img=new Image();img.onload=()=>res(img);img.onerror=()=>res(null);img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);});}

/* ---- 画像カード（1080×1350） ---- */
async function shCard(D){
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a1d12');g.addColorStop(1,'#120c08');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle='#c9a24a';x.lineWidth=6;x.strokeRect(30,30,W-60,H-60);x.lineWidth=2;x.strokeRect(46,46,W-92,H-92);
  const F='"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",serif';
  const txt=(s,X,Y,sz,col,al,wt)=>{x.font=`${wt||''} ${sz}px ${F}`;x.fillStyle=col;x.textAlign=al||'center';x.fillText(s,X,Y);};
  const wrap=(s,X,Y,maxW,sz,col,lh,maxL)=>{x.font=`${sz}px ${F}`;x.fillStyle=col;x.textAlign='left';let line='',n=0;for(const ch of s){if(x.measureText(line+ch).width>maxW){x.fillText(line,X,Y);Y+=lh;line=ch;if(++n>=maxL-1){line=line;}if(n>=maxL)return Y;}else line+=ch;}if(line)x.fillText(line,X,Y);return Y+lh;};
  txt('Historia Orchestrae',W/2,120,30,'#a08a5c');
  txt(`${D.o}史`,W/2,200,64,'#f0d58a','center','bold');
  txt(`${D.st}　${D.pe}`,W/2,252,28,'#d8c9a8');
  const hp=await svgImg(ptEra(D.p,D.sc,220,'#c9a24a'));if(hp)x.drawImage(hp,W/2-110,280,220,264);
  txt(D.rs,W/2,600,44,D.w?'#f0d58a':'#e6d6b4','center','bold');
  txt(`「${D.ti}」`,W/2,660,40,'#f7e3a6');
  txt(`総合点 ${D.t}　名声Lv${D.lv}　難易度 ${D.df}`,W/2,712,30,'#d8c9a8');
  txt(`支配都市 ${D.ci.length}　演奏会 ${D.co}回　実績 ${D.a.length}`,W/2,756,28,'#bba985');
  const ms=D.m.slice(0,6);const sz=130,gap=24,x0=(W-(ms.length*sz+(ms.length-1)*gap))/2;
  for(let i=0;i<ms.length;i++){const [id,nm,lv,kai,ge]=ms[i];const im=await svgImg(ptEra(id,ge||D.sc,sz,kai?'#e9a0f0':'#c9a24a'));const X=x0+i*(sz+gap);if(im)x.drawImage(im,X,790,sz,sz*1.2);
    txt(nm.length>7?nm.slice(0,7):nm,X+sz/2,790+sz*1.2+34,24,'#f0e2c0');txt(`Lv${lv}${kai?' 開眼':''}${ge?' 客演':''}`,X+sz/2,790+sz*1.2+64,20,'#c9b48a');}
  let Y=1080;if(D.se.length){txt(`史実の縁：${D.se.map(s=>`《${s}》`).join('')}`,W/2,Y,26,'#f0d58a');Y+=44;}
  Y=wrap(D.ep,90,Y,W-180,24,'#d8c9a8',36,3);
  const hs=D.h.slice(-Math.max(0,Math.floor((H-130-Y)/34))).slice(-6);
  if(hs.length){Y+=6;x.strokeStyle='#6b5530';x.beginPath();x.moveTo(90,Y-24);x.lineTo(W-90,Y-24);x.stroke();
    for(const [d,t] of hs){x.font=`20px ${F}`;x.fillStyle='#c9a24a';x.textAlign='left';x.fillText(d,90,Y);x.fillStyle='#d8c9a8';let s=t;while(x.measureText(s).width>W-300&&s.length>4)s=s.slice(0,-2);if(s!==t)s+='…';x.fillText(s,200,Y);Y+=34;}}
  txt('協奏の嵐 ― Concerto Storm',W/2,H-70,26,'#a08a5c');
  return new Promise(res=>c.toBlob(b=>res(b),'image/png'));
}

/* ---- 共有画面 ---- */
async function shShare(R){
  const name0=(()=>{try{return localStorage.getItem('concertoStormName')||'';}catch(e){return'';}})();
  $('#scene').innerHTML=`<div class="sc"><h3>楽団史を見せる</h3><div class="subt">${R.orch}史・総合点 ${R.total}「${R.title}」</div>
   <div class="card pmeta">あなたの楽団の記録を、リンクと画像にします。リンクを開いた人は、あなたの楽団史をそのまま読めます（相手の端末にゲームのデータは要りません）。</div>
   <div class="card"><label class="pmeta">名乗り（任意・ニックネーム）</label><input id="shName" maxlength="16" value="${name0.replace(/"/g,'')}" style="width:100%;padding:8px;margin-top:4px;border-radius:6px;border:1px solid #6b5530;background:#1a140e;color:#f0e2c0;font-size:15px"></div>
   <div id="shPrev" class="card" style="text-align:center"><span class="pmeta">画像を作っています…</span></div>
   <div class="actions" style="grid-template-columns:1fr 1fr">
    <button class="btn gold" id="shNative">共有する<small>LINE・メールなど</small></button>
    <button class="btn" id="shX">Xに投稿</button>
    <button class="btn" id="shCopy">リンクをコピー</button>
    <button class="btn" id="shDl">画像を保存</button></div>
   <textarea id="shTxt" class="hidden" readonly style="width:100%;height:80px;margin-top:6px"></textarea>
   <button class="btn" id="shBack" style="width:100%;margin-top:8px">戻る</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  let blob=null,url='',D=null;
  const build=async()=>{const nm=$('#shName').value.trim();try{localStorage.setItem('concertoStormName',nm);}catch(e){}R.byName=nm;D=shPack(R);url=await shLink(R);
    blob=await shCard(D);if(blob){const u=URL.createObjectURL(blob);$('#shPrev').innerHTML=`<img src="${u}" style="width:100%;border-radius:6px">`;}else $('#shPrev').innerHTML='<span class="pmeta">画像を作れませんでした</span>';};
  await build();
  $('#shName').onchange=build;
  const text=()=>`${R.byName?R.byName+'の':''}『${R.orch}史』――${R.result}。総合点${R.total}「${R.title}」 #協奏の嵐`;
  const copy=t=>{try{navigator.clipboard.writeText(t).then(()=>toast('コピーしました'),()=>{shFallback(t);});}catch(e){shFallback(t);}};
  $('#shCopy').onclick=()=>copy(url);
  $('#shX').onclick=()=>{const u=`https://twitter.com/intent/tweet?text=${encodeURIComponent(text())}&url=${encodeURIComponent(url)}`;const w=window.open(u,'_blank');if(!w)copy(text()+'\n'+url);};
  $('#shDl').onclick=()=>{if(!blob)return;const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${R.orch}史.png`;document.body.appendChild(a);a.click();a.remove();};
  $('#shNative').onclick=async()=>{const f=blob?new File([blob],`${R.orch}史.png`,{type:'image/png'}):null;
    try{if(f&&navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:`${R.orch}史`,text:text()+'\n'+url});else if(navigator.share)await navigator.share({title:`${R.orch}史`,text:text(),url});else copy(text()+'\n'+url);}catch(e){}};
  $('#shBack').onclick=()=>{closeScene();if(G)render();};
}
function shFallback(t){const ta=$('#shTxt');ta.value=t;ta.classList.remove('hidden');ta.select();try{document.execCommand('copy');toast('コピーしました');}catch(e){toast('下の枠から長押しでコピーしてください');}}

/* ---- 共有された楽団史を読む ---- */
function shView(D){
  const mem=D.m.map(([id,nm,lv,kai,ge,mvp])=>`<div class="rp-m">${ptEra(id,ge||D.sc,40,kai?'#e9a0f0':undefined)}<div><b>${nm}</b> <span class="pmeta">Lv${lv}${kai?'・開眼':''}${ge?`・${U_ERA[ge]}からの客演`:''}${mvp?`・主役${mvp}回`:''}</span></div></div>`).join('');
  $('#scene').innerHTML=`<div class="sc report">
   <div class="rp-cover"><div class="en">Historia Orchestrae</div><h1>${D.o}史</h1><div class="rp-sub">${D.n?`${D.n} の楽団<br>`:''}${D.st}<br>${D.pe}</div>
    <div style="margin:10px auto;width:fit-content">${ptEra(D.p,D.sc,90)}</div>
    <div class="rp-res ${D.w?'win':''}">${D.rs}</div><div class="rp-sub">総合点 ${D.t}「${D.ti}」<br>難易度 ${D.df}　最終名声Lv${D.lv}</div></div>
   <div class="rp-sec">その後</div><p class="rp-p">${D.ep}</p>
   ${D.se.length?`<div class="rp-sec">史実の縁</div><p class="rp-p">${D.se.map(s=>`《${s}》`).join(' ')}</p>`:''}
   <div class="rp-sec">楽団の顔ぶれ</div>${mem||'<p class="rp-p">―</p>'}
   ${D.tp.length?`<div class="rp-sec">名演の記録</div>${D.tp.map(([d,t,h,s,mv])=>`<div class="tl"><b>${d}</b><span>${t}（${h}）<br><span style="color:#8a6420">${'★'.repeat(s)}${'☆'.repeat(5-s)}</span>　主役：${mv||'-'}</span></div>`).join('')}`:''}
   <div class="rp-p">演奏会 ${D.co}回／入場料の総額 ${fmt(D.rv)}fr${D.ci.length?`<br>支配した都市：${D.ci.join('、')}`:''}</div>
   ${D.a.length?`<div class="rp-sec">実績（${D.a.length}）</div><p class="rp-p">${D.a.map(a=>`🏅${a}`).join('　')}</p>`:''}
   <div class="rp-sec">年表（抜粋）</div>${D.h.map(([d,s])=>`<div class="tl"><b>${d}</b><span>${s}</span></div>`).join('')}
   <button class="btn gold" id="shPlay" style="width:100%;margin:10px 0 6px">自分も楽団を率いてみる</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  $('#shPlay').onclick=()=>{history.replaceState(null,'',shBase());closeScene();title();};
}
async function shBoot(){
  const m=location.hash.match(/^#r=(.+)$/);if(!m)return false;
  try{const D=await shDecode(m[1]);shView(D);return true;}catch(e){toast('楽団史のリンクが壊れているようです');return false;}
}

/* ---- データの書き出し／読み込み（端末の引っ越し・控え） ---- */
const SH_KEYS=['concertoStorm5','concertoStormHall','concertoStormAch','concertoStormName'];
function shExport(){
  const o={app:'concerto-storm',v:5,at:new Date().toISOString()};for(const k of SH_KEYS){try{o[k]=localStorage.getItem(k);}catch(e){}}
  const b=new Blob([JSON.stringify(o)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`協奏の嵐_セーブ_${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();
}
function shImport(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=()=>{const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(o.app!=='concerto-storm')throw 0;
    modal('読み込みの確認','この端末のセーブ・殿堂・実績が、ファイルの内容に置き換わります。',[{t:'読み込む',cls:'crim',f(){for(const k of SH_KEYS){if(o[k]!=null)localStorage.setItem(k,o[k]);else localStorage.removeItem(k);}toast('読み込みました');title();}},{t:'やめる'}]);}
    catch(e){modal('読み込めません','協奏の嵐のセーブファイルではないようです。');}};r.readAsText(f);};
  inp.click();
}

/* ---- 画面への組み込み ---- */
const _showReportS=showReport;
showReport=function(R,fromHall){
  if(R.total==null){R.total=shScore(R);R.title=shTitle(R.total);}
  _showReportS(R,fromHall);
  const b=$('#rpCopy');if(b){const s=document.createElement('button');s.className='btn gold';s.style.cssText='width:100%;margin:6px 0';s.innerHTML=`この楽団史を見せる<small>リンクと画像で共有・総合点 ${R.total}「${R.title}」</small>`;s.onclick=()=>shShare(R);b.before(s);b.classList.remove('gold');}
};
const _titleS=title;
title=function(){
  _titleS();
  const box=document.createElement('div');box.className='card';box.style.cssText='font-size:12.5px;text-align:left;margin-top:10px';
  box.innerHTML=`<b>データの控え</b><br><span class="pmeta">セーブ・殿堂・実績をファイルに書き出して、別の端末に移せます。</span><div class="actions" style="grid-template-columns:1fr 1fr;margin-top:6px"><button class="btn" id="shEx">書き出す</button><button class="btn" id="shIm">読み込む</button></div>`;
  const t=$('#main .title');if(t)t.appendChild(box);
  $('#shEx').onclick=shExport;$('#shIm').onclick=shImport;
};
/* 年代記タブに「いまの楽団を見せる」 */
const _renderS=render;
render=function(){
  _renderS();
  if(G&&TAB==='log'){const b=document.createElement('button');b.className='btn gold';b.style.cssText='width:100%;margin:8px 0';b.innerHTML='いまの楽団を見せる<small>途中経過を、リンクと画像で共有</small>';
    b.onclick=()=>{const R=buildReport();const d=ymd(G.month);R.result=`${d.y}年${d.mo}月 現在`;const st=R.mem&&R.mem[0];R.epi=`${d.y}年${d.mo}月現在、${R.orch}は旅の途中にある。団員${G.members.length}人${R.cities.length?`、${R.cities.join('・')}を拠点に`:''}${st?`、看板は${st.name}（Lv${st.lv}）`:''}。${R.sets&&R.sets.length?`《${R.sets[0]}》の縁が楽団を支えている。`:''}`;R.played=new Date().toISOString().slice(0,10);shShare(R);};
    const m=$('#main');m.insertBefore(b,m.firstChild);}
};
