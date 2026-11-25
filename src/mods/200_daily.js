/* =====================================================================
   今日の演奏会：全員が同じお題に挑む、1日1問の布陣パズル（サーバーなし）
   ・日付（日本時間）から、曲・手札の音楽家9人・客席の好み・今日の決まりを決める。誰が開いても同じ
   ・3回まで挑戦。最高の布陣と比べて、席ごとに 🟩（その席で正解）🟨（別の席なら正解）⬜（外れ）
   ・結果は localStorage 'concertoStormDaily' に残す（連続日数つき）。文章で共有できる
   ・ゲーム本編（G）には触らない。タイトル画面から遊ぶ
   ===================================================================== */
const DY_KEY='concertoStormDaily',DY_TRY=3;
const dyToday=()=>new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
function dyRng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const dyHash=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const DY_ERA={s1723:1723,s1781:1781,s1832:1832,s1876:1876,s1905:1905};
let DY_ALL=null;
function dyAll(){if(DY_ALL)return DY_ALL;DY_ALL={};for(const k of Object.keys(DY_ERA)){const S=SCEN[k];if(!S)continue;for(const c of S.chars){if(DY_ALL[c.id]||['haru','aki'].includes(c.id)||/^grad/.test(c.id)||(c.lv||0)<4)continue;DY_ALL[c.id]=Object.assign({era:DY_ERA[k]},c);}}return DY_ALL;}
const dyTypes=c=>XTYPES[c.id]||[SEATTYPE[c.seat]];
const dyFits=(c,s)=>{const rs=[].concat(s.r);return dyTypes(c).some(t=>rs.includes(t));};
const DY_RULES=[
 {k:'tech',t:'技巧にうるさい客席',d:'技巧の効きが2倍'},
 {k:'expr',t:'涙もろい客席',d:'表現の効きが2倍'},
 {k:'young',t:'若手の日',d:'Lv6以下の出演者ひとりにつき +1.5'},
 {k:'eras',t:'時を超える夜',d:'出演者の時代がすべて違えば +4'},
 {k:'same',t:'同時代の夜',d:'同じ時代の出演者が3人以上いれば +3'},
 {k:'fem',t:'女性音楽家の夜',d:'女性の出演者ひとりにつき +1.5'}];
function dyMake(date){
  const R=dyRng(dyHash('concerto'+date)),pk=a=>a[Math.floor(R()*a.length)],A=dyAll(),ids=Object.keys(A);
  const pieces=[];for(const k of Object.keys(DY_ERA)){const S=SCEN[k];if(!S)continue;for(const p of S.rep){if(pieces.some(x=>x.p.id===p.id)||/^(new|my|saga|fate)/.test(p.id))continue;
    if(p.slots.length<3||p.slots.length>5||p.slots.some(s=>s.you||[].concat(s.r).includes('comp')))continue;
    if(p.slots.every(s=>ids.filter(id=>dyFits(A[id],s)).length>=3))pieces.push({p,era:DY_ERA[k]});}}
  const P0=pk(pieces),p=P0.p,hand=[];
  for(const s of p.slots){const el=ids.filter(id=>dyFits(A[id],s)&&!hand.includes(id));for(let i=0;i<2&&el.length;i++)hand.push(el.splice(Math.floor(R()*el.length),1)[0]);}
  if(p.by&&A[p.by]&&!hand.includes(p.by)&&R()<.5)hand.push(p.by);
  const any=ids.filter(id=>!hand.includes(id)&&p.slots.some(s=>dyFits(A[id],s)));
  while(hand.length<9&&any.length)hand.push(any.splice(Math.floor(R()*any.length),1)[0]);
  hand.sort((a,b)=>dyHash(a+date)-dyHash(b+date));
  const favs=[...new Set(hand.map(id=>A[id].faction))],fav=pk(favs),rule=pk(DY_RULES);
  const D={date,p,pera:P0.era,hand,fav,rule};D.best=dyBest(D);return D;
}
function dyScore(D,L){
  const A=dyAll(),p=D.p,w=p.w,cs=L.map(id=>id?A[id]:null);let sum=0;const notes=[];
  cs.forEach((c,i)=>{if(!c){sum-=6;return;}sum+=(c.tech*w[0]*(D.rule.k==='tech'?2:1)+c.expr*w[1]*(D.rule.k==='expr'?2:1)+c.impro*w[2])*1.6+c.lv;});
  let q=sum/p.slots.length;const on=cs.filter(Boolean),idl=on.map(c=>c.id);
  for(const [a,b,v,l] of SYN)if(idl.includes(a)&&idl.includes(b)){q+=v;notes.push(`相性《${l}》（${v>0?'+':''}${v}）`);}
  if(p.by&&idl.includes(p.by)){q+=6;notes.push('作曲者自身が出演（+6）');}
  const nf=on.filter(c=>c.faction===D.fav).length;if(nf){q+=nf*.8;notes.push(`客席の好み「${D.fav}」が${nf}人（+${(nf*.8).toFixed(1)}）`);}
  const k=D.rule.k;let rb=0;
  if(k==='young')rb=on.filter(c=>c.lv<=6).length*1.5;
  if(k==='fem')rb=on.filter(c=>(TR[c.id]||{}).fem).length*1.5;
  if(k==='eras'&&on.length===p.slots.length&&new Set(on.map(c=>c.era)).size===on.length)rb=4;
  if(k==='same'){const m={};on.forEach(c=>m[c.era]=(m[c.era]||0)+1);if(Object.values(m).some(n=>n>=3))rb=3;}
  if(rb){q+=rb;notes.push(`${D.rule.t}（+${rb.toFixed(1)}）`);}
  return{q:Math.round(q*10)/10,notes};
}
function dyBest(D){const A=dyAll(),n=D.p.slots.length;let best={q:-99,L:null};const L=Array(n).fill(null);
  const rec=i=>{if(i===n){const s=dyScore(D,L).q;if(s>best.q)best={q:s,L:L.slice()};return;}
    for(const id of D.hand){if(L.includes(id)||!dyFits(A[id],D.p.slots[i]))continue;L[i]=id;rec(i+1);L[i]=null;}};
  rec(0);return best;}
const dyLoad=()=>{try{return JSON.parse(localStorage.getItem(DY_KEY)||'{}')||{};}catch(e){return{};}};
const dyPut=o=>{try{localStorage.setItem(DY_KEY,JSON.stringify(o));}catch(e){}};
function dyState(){const st=dyLoad(),d=dyToday();if(st.d!==d){const y=new Date(Date.now()+9*3600e3-86400e3).toISOString().slice(0,10);
  return{d,tries:[],done:false,solved:false,streak:(st.d===y&&st.done)?(st.streak||0):0,total:st.total||0,wins:st.wins||0};}return st;}
const dyMarks=(D,L)=>L.map((id,i)=>id===D.best.L[i]?'🟩':D.best.L.includes(id)?'🟨':'⬜');
let DY=null;
function dailyOpen(){const D=dyMake(dyToday());DY={D,st:dyState(),L:Array(D.p.slots.length).fill(null)};dyRender();}
function dyRender(){
  const {D,st,L}=DY,A=dyAll(),p=D.p,w=p.w,left=DY_TRY-st.tries.length;
  const card=(id,sz)=>{const c=A[id];return`${portrait(id,sz||40,'#cfa84f')}<div class="dyc"><b>${c.name}</b><span>${c.era}年・${c.faction}・Lv${c.lv}</span><span>技${c.tech} 表${c.expr} 即${c.impro}</span></div>`;};
  const hist=st.tries.map((t,i)=>`<div class="dyrow"><span class="dym">${dyMarks(D,t.L).join('')}</span><span>${i+1}回目　評判 <b>${t.q.toFixed(1)}</b>（最高の${Math.round(t.q/D.best.q*100)}%）</span></div>`).join('');
  const cur=dyScore(D,L);
  let main='';
  if(st.done){
    main=`<div class="dyres"><div class="headline">${st.solved?`${st.tries.length}回目で、最高の布陣！`:'今日はここまで'}</div>
      <div class="pmeta">${st.solved?'':`あなたの最高：評判 ${Math.max(...st.tries.map(t=>t.q)).toFixed(1)}／`}最高の布陣：評判 ${D.best.q.toFixed(1)}</div>
      <div class="sec-t">今日の最高の布陣</div>${D.best.L.map((id,i)=>`<div class="person"><div class="dys">${p.slots[i].l}</div>${card(id)}</div>`).join('')}
      <div class="pmeta">${dyScore(D,D.best.L).notes.map(n=>'・'+n).join('<br>')}</div>
      <div class="stx">🔥 連続 <b>${st.streak}</b>日　／　これまで ${st.total}日 遊んで ${st.wins}日 正解<br>明日の0時（日本時間）に、新しいお題に変わる。</div>
      <button class="btn gold" id="dyShare" style="width:100%;margin-top:8px">結果を共有する</button></div>`;
  }else{
    main=`<div class="sec-t">布陣（あと${left}回）</div>${p.slots.map((s,i)=>`<button class="btn person dyslot" data-ds="${i}"><div class="dys">${s.l}</div>${L[i]?card(L[i]):'<div class="empty-pt">?</div><div class="dyc"><span>タップして選ぶ</span></div>'}</button>`).join('')}
      <div class="dynow">いまの評判 <b>${L.every(Boolean)?cur.q.toFixed(1):'—'}</b>${cur.notes.length?`<br><span class="pmeta">${cur.notes.join('／')}</span>`:''}</div>
      <button class="btn gold" id="dyGo" style="width:100%" ${L.every(Boolean)?'':'disabled'}>この布陣で開演（${st.tries.length+1}/${DY_TRY}回目）</button>
      <div class="sec-t">今日の手札（9人）</div><div class="dyhand">${D.hand.map(id=>`<div class="person${L.includes(id)?' used':''}">${card(id,36)}<span class="dyt">${[...new Set(dyTypes(A[id]))].map(t=>({vn:'Vn',va:'Va',vc:'Vc',cb:'Cb',fl:'Fl',ob:'Ob',cl:'Cl',br:'金管',voice:'歌',pf:'鍵盤',hp:'Hp',tim:'打',cond:'指揮',comp:'作曲'})[t]||t).join('・')}</span></div>`).join('')}</div>`;
  }
  $('#scene').innerHTML=`<div class="sc daily"><h3>今日の演奏会</h3><div class="subt">${D.date.replace(/-/g,'/')}　全員が同じお題に挑む</div>
    <div class="card"><b style="font-size:16px">${p.t}</b><br><span class="pmeta">${D.pera}年〜の時代の演目・この曲は 技巧${Math.round(w[0]*100)}%・表現${Math.round(w[1]*100)}%・即興${Math.round(w[2]*100)}%</span>
      <div class="dyinfo">客席の好み：<b>${D.fav}</b>（ひとりにつき +0.8）<br>今日の決まり：<b>${D.rule.t}</b>──${D.rule.d}${p.by&&D.hand.includes(p.by)?'<br>作曲者が手札にいる（出演で +6）':''}</div></div>
    ${hist?`<div class="dyhist">${hist}<div class="pmeta">🟩 その席で正解　🟨 別の席なら正解　⬜ 最高の布陣にいない</div></div>`:''}
    ${main}
    <button class="btn" id="dyClose" style="width:100%;margin-top:8px">タイトルへ戻る</button></div>`;
  $('#scene').classList.remove('hidden');
  $('#dyClose').onclick=()=>{closeScene();try{title();}catch(e){}};
  document.querySelectorAll('[data-ds]').forEach(b=>b.onclick=()=>dyPick(+b.dataset.ds));
  const go=$('#dyGo');if(go)go.onclick=dyGo;const sh=$('#dyShare');if(sh)sh.onclick=dyShare;
}
function dyPick(i){const {D,L}=DY,A=dyAll(),s=D.p.slots[i];
  const el=D.hand.filter(id=>dyFits(A[id],s));
  modal(`${s.l}を選ぶ`,'',el.map(id=>{const c=A[id],at=L.indexOf(id);return{t:`${c.name}<small>${c.era}年・${c.faction}・Lv${c.lv}　技${c.tech} 表${c.expr} 即${c.impro}${at>=0&&at!==i?`　（いま${D.p.slots[at].l}）`:''}</small>`,cls:L[i]===id?'gold':'',f(){const j=L.indexOf(id);if(j>=0)L[j]=null;L[i]=id;setTimeout(dyRender,30);}};}).concat([{t:'空ける',f(){L[i]=null;setTimeout(dyRender,30);}}]),'paper');}
function dyGo(){const {D,st,L}=DY;if(st.done||!L.every(Boolean))return;const r=dyScore(D,L);
  st.tries.push({L:L.slice(),q:r.q});const solved=r.q>=D.best.q-1e-6;
  if(solved||st.tries.length>=DY_TRY){st.done=true;st.solved=solved;st.total=(st.total||0)+1;if(solved)st.wins=(st.wins||0)+1;st.streak=(st.streak||0)+1;}
  dyPut(st);try{playMotif(D.p.motif,D.p.tim||'piano',.05);}catch(e){}
  if(solved){try{sfx('fanfare');}catch(e){}}
  dyRender();$('#scene').scrollTop=0;
  if(!st.done)toast(`評判 ${r.q.toFixed(1)}（最高の${Math.round(r.q/D.best.q*100)}%）。印を手がかりに、あと${DY_TRY-st.tries.length}回`);}
function dyShareText(){const {D,st}=DY;const md=D.date.slice(5).replace('-','/');
  return[`協奏の嵐 今日の演奏会 ${md}`,D.p.t,...st.tries.map(t=>dyMarks(D,t.L).join('')),st.solved?`${st.tries.length}/${DY_TRY}回で最高の布陣！`:`最高の${Math.round(Math.max(...st.tries.map(t=>t.q))/D.best.q*100)}%まで`,`🔥${st.streak}日連続`,(typeof shBase==='function'?shBase():location.href.split('?')[0])].join('\n');}
function dyShare(){const t=dyShareText();if(navigator.share)navigator.share({text:t}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('結果をコピーしました')).catch(()=>{});}
const _titleDY=title;
title=function(){_titleDY();try{const sec=document.querySelector('#main .title .sec-t');if(!sec)return;const st=dyState();
  sec.insertAdjacentHTML('beforebegin',`<button class="btn dailybtn" id="dailyBtn">📅 今日の演奏会<small>${st.done?(st.solved?`今日は${st.tries.length}回で正解！`:'今日は挑戦済み')+`　🔥${st.streak}日連続`:st.tries.length?`挑戦中（あと${DY_TRY-st.tries.length}回）`:'1日1問・3分。全員が同じ手札で、最高の布陣を探す'}</small></button>`);
  $('#dailyBtn').onclick=dailyOpen;}catch(e){}};
