/* =====================================================================
   みんなの楽団：ほかのプレイヤーの楽団史を見る・自分の楽団史を載せる
   受付係はGoogleスプレッドシート＋Apps Script（RANK_URL）
   ===================================================================== */
const RANK_URL_DEFAULT='';
const RANK_URL=(()=>{try{return localStorage.getItem('concertoStormRankURL')||RANK_URL_DEFAULT;}catch(e){return RANK_URL_DEFAULT;}})();
const SCN={s1723:'1723 バロック',s1781:'1781 古典派',s1832:'1832 ロマン派',s1876:'1876 後期ロマン派',s1905:'1905 新世紀'};
function devId(){try{let d=localStorage.getItem('concertoStormDev');if(!d){d='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);localStorage.setItem('concertoStormDev',d);}return d;}catch(e){return'd0';}}
function runId(){if(!G)return'r'+Date.now();if(!G.runId){G.runId='r'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);save();}return G.runId;}
async function rkGet(params){const q=new URLSearchParams(Object.assign({action:'list',dev:devId()},params)).toString();const r=await fetch(`${RANK_URL}?${q}`);return r.json();}
async function rkPost(R,done){
  const D=shPack(R);const code=await shEncode(D);
  const body={dev:devId(),run:R.runId||runId(),n:D.n,o:D.o,sc:D.sc,st:D.st,pn:D.pn,df:D.df,total:D.t,ti:D.ti,rs:D.rs,w:D.w,lv:D.lv,ci:D.ci.length,done:done?1:0,code};
  const r=await fetch(RANK_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});return r.json();
}

/* ---- 共有画面に「みんなの楽団に載せる」 ---- */
const _shShareR=shShare;
shShare=async function(R){
  await _shShareR(R);
  if(!RANK_URL)return;
  const back=$('#shBack');if(!back)return;
  const done=!/現在$/.test(R.result||'');
  const b=document.createElement('button');b.className='btn gold';b.style.cssText='width:100%;margin-top:8px';
  b.innerHTML=`みんなの楽団に載せる<small>${done?'この楽団史をランキングに登録':'途中経過として登録（クリア後に上書きされます）'}</small>`;
  b.onclick=async()=>{
    R.byName=$('#shName').value.trim();if(!R.byName)return toast('名乗りを入れてください');
    if(!R.runId)R.runId=G?runId():'h'+R.id;
    b.disabled=true;b.innerHTML='送っています…';
    try{const r=await rkPost(R,done);
      if(r.ok){b.innerHTML=`登録しました！ 総合 ${r.rank}位 / ${r.n}楽団<small>${r.updated?'同じ楽団の記録を更新しました':'みんなの楽団に載りました'}</small>`;b.onclick=()=>rkBoard('top');b.disabled=false;}
      else{b.disabled=false;b.innerHTML=r.err==='wait'?'少し待ってからもう一度':'登録できませんでした（もう一度）';}}
    catch(e){b.disabled=false;b.innerHTML='通信できませんでした（もう一度）';}
  };
  back.before(b);
};
/* 殿堂入りの楽団史にも、プレイの識別子を持たせる */
const _buildReportR=buildReport;
buildReport=function(){const R=_buildReportR();R.runId=runId();return R;};
const _newGameR=newGame;
newGame=function(sc,pid,diff){_newGameR(sc,pid,diff);G.runId='r'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);};

/* ---- みんなの楽団（一覧） ---- */
let RK={mode:'top',sc:''};
async function rkBoard(mode){
  if(mode)RK.mode=mode;
  const tab=(k,n)=>`<button data-rk="${k}" class="${RK.mode===k?'on':''}">${n}</button>`;
  $('#scene').innerHTML=`<div class="sc"><h3>みんなの楽団</h3><div class="subt">ほかの楽団長たちの楽団史</div>
   <div class="ftabs">${tab('top','総合ランキング')}${tab('new','新着')}${tab('mine','自分の記録')}</div>
   <div class="ftabs"><button data-rs="" class="${!RK.sc?'on':''}">全時代</button>${Object.keys(SCN).map(k=>`<button data-rs="${k}" class="${RK.sc===k?'on':''}">${SCN[k].slice(0,4)}</button>`).join('')}</div>
   <div id="rkList"><div class="card pmeta" style="text-align:center">読み込んでいます…</div></div>
   <div class="card pmeta">楽団史の画面や年代記タブの「見せる」から、自分の楽団を載せられます。名乗りに不適切な言葉は使えません。</div>
   <button class="btn" id="rkBack" style="width:100%;margin-top:6px">戻る</button></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  document.querySelectorAll('[data-rk]').forEach(b=>b.onclick=()=>rkBoard(b.dataset.rk));
  document.querySelectorAll('[data-rs]').forEach(b=>b.onclick=()=>{RK.sc=b.dataset.rs;rkBoard();});
  $('#rkBack').onclick=()=>{closeScene();if(G)render();else title();};
  let r;try{r=await rkGet({mode:RK.mode,sc:RK.sc,limit:50});}catch(e){r=null;}
  const box=$('#rkList');if(!box)return;
  if(!r||!r.ok){box.innerHTML='<div class="card pmeta">いまは読み込めませんでした。時間をおいてもう一度開いてください。</div>';return;}
  if(!r.list.length){box.innerHTML=`<div class="card pmeta">${RK.mode==='mine'?'まだ自分の記録はありません。':'まだ記録がありません。最初の楽団になりましょう。'}</div>`;return;}
  const medal=i=>RK.mode!=='top'?'':i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}位`;
  box.innerHTML=`<div class="pmeta" style="margin:4px 0">${r.n}楽団${RK.mode==='top'?'（総合点の高い順）':'（新しい順）'}</div>`+r.list.map((x,i)=>{const RS=RSC;RSC=x.sc;const p=portrait(PIDOF(x),44);RSC=RS;
    return`<button class="btn rkrow ${x.mine?'mine':''}" data-ri="${i}"><span class="rkno">${medal(i)}</span>${p}<div style="flex:1;text-align:left"><b>${x.o}</b>${x.done?'':'<span class="kai" style="background:#557">途中</span>'}<br><span class="pmeta">${x.n}・${SCN[x.sc]||x.st}・${x.df}</span><br><span class="pmeta">${x.rs}・「${x.ti}」</span></div><div style="text-align:right"><b style="font-size:17px">${x.total}</b><br><span class="pmeta">${String(x.t).slice(5,10).replace('-','/')}</span></div></button>`;}).join('');
  document.querySelectorAll('[data-ri]').forEach(b=>b.onclick=async()=>{const x=r.list[+b.dataset.ri];try{const D=await shDecode(x.code);shView(D);const pb=$('#shPlay');if(pb){pb.textContent='みんなの楽団に戻る';pb.onclick=()=>rkBoard();}}catch(e){toast('この記録は読み込めませんでした');}});
}
const PIDOF=x=>{for(const s in SCEN){if(s!==x.sc)continue;const p=Object.values(SCEN[s].players).find(p=>p.name===x.pn);if(p)return p.id;}return'critic';};

/* ---- 入口：タイトル画面と年代記タブ ---- */
const _titleR=title;
title=function(){
  _titleR();if(!RANK_URL)return;
  const t=$('#main .title');if(!t)return;
  const b=document.createElement('button');b.className='btn gold';b.style.cssText='width:100%;margin:10px 0';b.innerHTML='みんなの楽団<small>ほかの楽団長の楽団史とランキング</small>';b.onclick=()=>rkBoard('top');
  const first=t.querySelector('.btn');if(first)first.before(b);else t.appendChild(b);
};
const _renderR=render;
render=function(){
  _renderR();
  if(RANK_URL&&G&&TAB==='log'){const b=document.createElement('button');b.className='btn';b.style.cssText='width:100%;margin:0 0 8px';b.innerHTML='みんなの楽団を見る<small>ランキングと、ほかの楽団長の楽団史</small>';b.onclick=()=>rkBoard('top');
    const m=$('#main');const g=m.querySelector('button.btn.gold');if(g)g.after(b);else m.insertBefore(b,m.firstChild);}
};
