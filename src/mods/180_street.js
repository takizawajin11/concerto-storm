/* =====================================================================
   街角から始まる人気：路上演奏 → 民衆の人気 → 流行り歌が街から街へ → 宮廷か民衆か
   G.pop  = {街: 0〜100}  民衆の人気
   G.hits = [{t:題, k:生まれた街, cs:[広がった街], m:生まれた月}]
   G.side = {court:0〜100, folk:0〜100}  宮廷の支持と民衆の支持
   G.street = {m:月, n:今月の回数}
   ===================================================================== */
const SPOTS=[
 {id:'square',n:'広場',d:'人通りがいちばん多い。何でも受けるが、ざわついている。',stat:'expr',mul:1,risk:.15},
 {id:'market',n:'市場',d:'物売りの声に負けない派手さが要る。投げ銭は小銭が多い。',stat:'tech',mul:.8,risk:.1},
 {id:'bridge',n:'橋のたもと',d:'夕暮れどき、恋人たちや散歩の人が足を止める。',stat:'expr',mul:1.1,risk:.05},
 {id:'church',n:'教会の前',d:'ミサ帰りの信心深い人々。品のよい演奏が好まれる。',stat:'theory',mul:1.2,risk:.02},
 {id:'cafe',n:'カフェの前',d:'新聞を読む紳士と学生たち。耳が肥えていて、即興が受ける。',stat:'impro',mul:1.15,risk:.08}];
const popOf=k=>{G.pop=G.pop||{};return G.pop[k]||0;};
const popAdd=(k,n)=>{G.pop=G.pop||{};G.pop[k]=Math.max(0,Math.min(100,(G.pop[k]||0)+n));};
const sideSt=()=>{G.side=G.side||{court:30,folk:20};return G.side;};
const sideAdd=(c,f)=>{const s=sideSt();s.court=Math.max(0,Math.min(100,s.court+c));s.folk=Math.max(0,Math.min(100,s.folk+f));};
const YOUNG=id=>['haru','aki'].includes(realId(id))||/^grad/.test(id)||(id!=='you'&&GROW[realId(id)]==='late'&&ulv(id)<=4);
/* お知らせ窓の上限：おまけの出来事は月に2つまで */
function evBudget(){G.evb=G.evb||{m:-1,n:0};if(G.evb.m!==G.month){G.evb={m:G.month,n:0};}if(G.evb.n>=2)return false;G.evb.n++;return true;}

function streetOpen(){
  const k=P().city;G.street=G.street||{m:-1,n:0};if(G.street.m!==G.month)G.street={m:G.month,n:0};
  if(G.street.n>=2)return toast('今月はもう2回、街角で弾いた。来月また出よう');
  if(G.flags.kapell&&G.flags.kapell===k)return toast('宮廷楽長の身で、この街の路上には立てない');
  const who=['you'].concat(G.members.filter(id=>!uOnExp(id))).slice(0,8);
  modal(`街角へ出る（${ci(k).name}）`,`誰に弾かせよう？<br><span class="pmeta">民衆の人気：${popOf(k)}/100。人気が高い街ほど、演奏会に客が押し寄せる。若い団員なら「神童あらわる」の噂が立つことも。</span>`,
    who.map(id=>({t:`${id==='you'?P().name:nameOf(id)}${YOUNG(id)?'<small>若い才能</small>':''}`,f(){setTimeout(()=>streetSpot(id),50);}})).concat([{t:'やめる'}]),'paper');
}
function streetSpot(id){
  modal('どこで弾こう？','',SPOTS.map(s=>({t:`${s.n}<small>${s.d}</small>`,f(){setTimeout(()=>streetPlay(id,s),50);}})),'paper');
}
function stOf(id,k){return mstat(id,k)||8;}
function streetPlay(id,S){
  const k=P().city,c=ci(k);G.street.n++;
  const base=(stOf(id,S.stat)*1.3+stOf(id,'expr')*.7+(id==='you'?8:moodOf(id)/12))*S.mul*stageMul(id,S);const luck=rnd(.6,1.5);
  const score=base*luck+popOf(k)/10;const crowd=Math.max(3,Math.round(score*rnd(1.3,2.3)*(c.size/6+.3)));
  const era=1+(U_YEAR[G.sc]-1723)/250;const coins=Math.round(crowd*rnd(1.2,2.6)*era);
  const nm=id==='you'?P().name:nameOf(id),pid=id==='you'?G.pid:realId(id);
  /* 舞台：人だかりが増え、投げ銭が舞う */
  const d=document.createElement('div');d.className='streetov';
  d.innerHTML=`<div class="stbox"><div class="stbg s-${S.id}"></div><div class="stp">${portrait(pid,90,'#e6c56f')}</div><div class="stcrowd"></div><div class="stcount">0人</div><div class="stname">${nm}・${c.name}の${S.n}</div></div>`;
  document.body.appendChild(d);const cr=d.querySelector('.stcrowd'),ct=d.querySelector('.stcount');
  try{const c0=charById(pid)||PL();playMotif(c0.motif,c0.tim||'violin',.05);}catch(e){}
  let n=0;const tot=Math.min(crowd,60);const iv=setInterval(()=>{if(n>=tot){clearInterval(iv);return;}n++;const p=document.createElement('i');p.style.left=(5+Math.random()*90)+'%';p.style.animationDelay='0s';p.textContent=pick(['👤','🧑','👩','👨','🧒','👴','👵','🎩']);cr.appendChild(p);ct.textContent=Math.round(crowd*n/tot)+'人';
    if(Math.random()<.35){const m=document.createElement('b');m.className='coin';m.textContent=pick(['🪙','🪙','💰']);m.style.left=(20+Math.random()*60)+'%';d.querySelector('.stbox').appendChild(m);setTimeout(()=>m.remove(),1200);if(typeof sfx==='function'&&Math.random()<.3)sfx('coin');}},Math.max(40,2800/tot));
  setTimeout(()=>{d.remove();streetResult(id,S,crowd,coins,score);},3400);
}
function streetResult(id,S,crowd,coins,score){
  const k=P().city,nm=id==='you'?P().name:nameOf(id);const great=crowd>=60;
  P().money+=coins;popAdd(k,Math.min(18,Math.round(crowd/6)));sideAdd(-1,Math.min(6,Math.round(crowd/20)+1));
  if(id!=='you')setMood(id,moodOf(id)+stageMood(id,great));if(id!=='you'&&typeof gainExp==='function')gainExp(id,Math.round(crowd/4));
  let ex='',enc=null;
  /* 神童あらわる */
  G.flags.prodigy=G.flags.prodigy||{};
  if(id!=='you'&&YOUNG(id)&&great&&!G.flags.prodigy[realId(id)]){G.flags.prodigy[realId(id)]=1;G.boost[id]=(G.boost[id]||0)+1;popAdd(k,15);addXP(15);hpush(`神童あらわる：${nm}`);
    ex+=`<div class="stx">★ <b>神童あらわる！</b> 「あの若い${SL(charById(realId(id)).seat)}は何者だ」と街じゅうの噂に。${nm}の全能力+1・この街の人気+15</div>`;}
  /* 流行り歌 */
  if(great&&Math.random()<.45){const t=hitTitle(id);hitBorn(t,k);ex+=`<div class="stx">♪ 今日の旋律が「${t}」として、街の人々に口ずさまれはじめた。</div>`;}
  /* 通りがかりの出会い */
  if(Math.random()<.4)enc=pick(streetEncounters(id,S));
  const body=`<div class="headline">${crowd}人が足を止めた</div>投げ銭 <b>+${fmt(coins)}fr</b>・${ci(k).name}の民衆の人気 <b>${popOf(k)}</b>/100${ex}${stageNote(id,S)}${enc?`<div class="stenc">${enc.d}</div>`:''}`;
  addLog(`${nm}が${ci(k).name}の${S.n}で弾き、${crowd}人が足を止めた（投げ銭+${coins}fr）。`);
  modal(great?'街角の大喝采':crowd>=25?'街角の拍手':'街角の演奏',body,enc?enc.btns:null,'paper');save();render();
}
function streetEncounters(id,S){
  const k=P().city,nm=id==='you'?P().name:nameOf(id),out=[];
  const royal={s1723:'お忍びの選帝侯',s1781:'お忍びの皇帝ヨーゼフ2世',s1832:'お忍びの国王',s1876:'お忍びの皇太子',s1905:'お忍びの大公'}[G.sc];
  out.push({d:`人垣の後ろで、地味な外套の紳士が熱心に聴いていた。供の者がささやく。「……${royal}です」<br>${G.sc==='s1781'?'<span class="pmeta">ヨーゼフ2世は実際に、お忍びでウィーンの街を歩いたことで知られる。</span>':''}`,
    btns:[{t:'気づかぬふりで弾き続ける<small>宮廷の支持+12・名声+10</small>',cls:'gold',f(){sideAdd(12,0);addXP(10);addLog(`${royal}が${nm}の路上演奏を気に入ったらしい。`);}},{t:'演奏を止めてお辞儀する<small>宮廷の支持+6・民衆はしらける</small>',f(){sideAdd(6,-4);}}]});
  const young=poolChars().filter(c=>c.city===k&&!G.charOwner[c.id]&&(c.lv||0)<=4&&!isDud(c.id));
  if(young.length){const y=pick(young);out.push({d:`${portraitRow(y.id)}演奏が終わると、若者が駆け寄ってきた。<b>${y.name}</b>だ。「あなたの音を聴いて、決めました。楽団に入れてください！」`,
    btns:[{t:'迎え入れる<small>月給は安くてよいと言う</small>',cls:'gold',f(){ens5();G.members.push(y.id);G.sal[y.id]=Math.max(5,Math.round(demandOf(y.id)*.3));setMood(y.id,95);addLog(`${y.name}が、路上演奏に心を打たれて楽団に加わった。`);render();}},{t:'またの機会に'}]});}
  out.push({d:'警官が近づいてきた。「ここで演奏する許可証は？」',btns:[{t:'罰金を払う<small>-80fr</small>',f(){P().money-=80;}},{t:'楽器を抱えて逃げる<small>この街の人気-5・笑い話になって民衆の支持+3</small>',f(){popAdd(k,-5);sideAdd(0,3);}}]});
  out.push({d:'向かいの角で弾いていた辻音楽師が、「どっちが客を集めるか勝負だ」と挑んできた。',btns:[{t:'受けて立つ<small>腕しだいで投げ銭が倍か、半分か</small>',cls:'crim',f(){const w=Math.random()<.35+stOf(id,'impro')/40;const v=Math.round(80+rnd(0,200));if(w){P().money+=v;popAdd(k,5);toast(`勝った！ 客がこちらに流れた（+${v}fr）`);}else{P().money-=Math.round(v/2);toast('負けた……客をごっそり持っていかれた');}save();render();}},{t:'相手にしない'}]});
  out.push({d:'楽譜出版社の男が名刺を差し出した。「いまの旋律、楽譜にして売りませんか」',btns:[{t:'売る<small>+150fr・流行り歌になる</small>',cls:'gold',f(){P().money+=150;hitBorn(hitTitle(id),k);}},{t:'断る'}]});
  return out;
}
/* ---------- 流行り歌 ---------- */
function hitTitle(id){const w=(G.mywork||[]).slice(-1)[0];if(w&&Math.random()<.5)return w.t;const nm=id==='you'?P().name:nameOf(id);return `${nm}の${pick(['街角の歌','広場のワルツ','橋の上のセレナーデ','市場の行進曲','夕暮れのロマンス','気まぐれなカプリース'])}`;}
function hitBorn(t,k){G.hits=G.hits||[];if(G.hits.some(h=>h.t===t))return;G.hits.push({t,k,cs:[k],m:G.month});popAdd(k,6);sideAdd(0,4);hpush(`流行り歌「${t}」が${ci(k).name}で生まれた`);
  if(!G.flags.hitInfo){G.flags.hitInfo=1;setTimeout(()=>modal('流行り歌が生まれた',`「${t}」が街で口ずさまれはじめた。流行り歌は、街道づたいに隣の街へ広がっていく。広がった街では人気が上がり、楽譜が売れて毎月の収入になる。<br><br><span class="pmeta">ヴェルディは『リゴレット』の「女心の歌」を、初演の直前まで歌手以外に隠したという。先に漏れれば、ヴェネツィアのゴンドラ漕ぎたちが口笛で吹いて、初演の前に広まってしまうからだ。</span>`,null,'paper'),900);}}
function hitMonthly(){
  for(const h of (G.hits||[])){const age=G.month-h.m;if(age>14)continue;
    const nb=new Set();for(const [a,b] of ROUTES){if(h.cs.includes(a)&&SC.cities.includes(b))nb.add(b);if(h.cs.includes(b)&&SC.cities.includes(a))nb.add(a);}
    for(const x of nb)if(!h.cs.includes(x)&&Math.random()<.35){h.cs.push(x);popAdd(x,5);if(h.cs.length===4)addLog(`流行り歌「${h.t}」が4つの街で歌われるようになった。`);}
    const inc=Math.round(h.cs.length*25*(age<8?1:.5));P().money+=inc;}
}
/* ---------- 民衆の人気が演奏会の客足に ---------- */
let _popNote=null;
const _concertResultST=concertResult;
concertResult=function(p,L,ev,fi){const k=P().city,pp=popOf(k);const r=_concertResultST(p,L,ev,fi);try{
  if(pp>=10){const b=Math.round(pp*ci(k).size*2.2);P().money+=b;_popNote=`<div class="stx">👥 民衆の人気（${pp}）で、立ち見まで満員になった（+${fmt(b)}fr）</div>`;}
  const s=(ev&&ev.stars)||0;if(s>=5&&Math.random()<.3)hitBorn(`${p.t.replace(/^【.*?】/,'').slice(0,20)}の旋律`,k);
  popAdd(k,s>=4?3:0);}catch(e){}return r;};
const _modalST=modal;
modal=function(title,body,btns,cls){try{if(_popNote&&G&&title===paperOf(P().city)){body=body+_popNote;_popNote=null;}}catch(e){}return _modalST(title,body,btns,cls);};
/* ---------- 宮廷か民衆か ---------- */
const _salonST=salon;
salon=function(){_salonST();try{sideAdd(4,-1);}catch(e){}};
function sideMonthly(){
  const s=sideSt();for(const k of Object.keys(G.pop||{}))G.pop[k]=Math.max(0,G.pop[k]-1);
  if(G.flags.kapell)P().money+=G.flags.kapellPay||0;
  if(s.court>=70&&!G.flags.kapellAsked){G.flags.kapellAsked=1;const k=P().city;const pay=Math.round(300*(1+(U_YEAR[G.sc]-1723)/200));
    modal('宮廷楽長の打診',`宮廷から使者が来た。「${ci(k).name}の宮廷楽長にお迎えしたい」<br>毎月 <b>${fmt(pay)}fr</b> の俸給が出る。ただし宮廷楽長が、この街の路上で弾くわけにはいかない。<br><span class="pmeta">いまの支持：宮廷${s.court}・民衆${s.folk}</span>`,[
      {t:'引き受ける<small>毎月の俸給・この街の路上演奏はできなくなる</small>',cls:'gold',f(){G.flags.kapell=k;G.flags.kapellPay=pay;sideAdd(10,-10);hpush(`${ci(k).name}の宮廷楽長に就任`);}},{t:'自由の身でいる<small>民衆の支持+8</small>',f(){sideAdd(-5,8);}}],'paper');return;}
  if(s.folk>=70&&!G.flags.folkHero){G.flags.folkHero=1;addXP(30);hpush('民衆の英雄と呼ばれる');
    modal('民衆の楽団',`どの街でも、あなたの楽団の旋律を口ずさむ声が聞こえる。新聞は「民衆の楽団」と呼びはじめた。<br>名声+30・すべての街の人気+5<br><span class="pmeta">1848年の革命の年には、音楽家たちも街頭に出た。ワーグナーは翌年のドレスデン蜂起に加わり、亡命している。</span>`,null,'paper');for(const k of SC.cities)popAdd(k,5);return;}
  if(evBudget()&&Math.random()<.12&&s.court>20&&s.folk>20){
    modal('宮廷か、民衆か',`ある貴族から手紙が届いた。「宮廷にも出入りなさる楽団が、往来で投げ銭をもらうなど品がない。おやめになってはいかが」`,[
      {t:'貴族に従う<small>宮廷+10・民衆-8</small>',f(){sideAdd(10,-8);}},{t:'音楽は誰のものでもない<small>民衆+10・宮廷-8</small>',cls:'gold',f(){sideAdd(-8,10);}}],'paper');}
}
const _memberMonthlyST=memberMonthly;
memberMonthly=function(){_memberMonthlyST();try{hitMonthly();sideMonthly();}catch(e){}};
/* ---------- 街の画面 ---------- */
const _cityHTMLST=cityHTML;
cityHTML=function(){let h=_cityHTMLST();try{const k=P().city,pp=popOf(k);const hs=(G.hits||[]).filter(x=>x.cs.includes(k)&&G.month-x.m<=14);
  const cnt=G.street&&G.street.m===G.month?G.street.n:0;
  const st=`<button class="btn streetbtn" id="aStreet" ${cnt>=2?'disabled':''}>🎻 街角へ出る<small>路上演奏で民衆の心をつかむ（今月あと${2-cnt}回）</small></button>
    <div class="popbar"><span>民衆の人気</span><div class="cbar"><i style="width:${pp}%"></i><span>${pp}/100</span></div></div>${hs.length?`<div class="trivia">♪ この街では「${hs.map(x=>x.t).join('」「')}」が口ずさまれている</div>`:''}`;
  h=h.replace('<div class="actions">',st+'<div class="actions">');}catch(e){}return h;};
const _renderST=render;
render=function(){_renderST();const b=$('#aStreet');if(b)b.onclick=streetOpen;};
/* 地図の上：宮廷と民衆 */
const _mapHTMLST=mapHTML;
mapHTML=function(){let h=_mapHTMLST();try{const s=sideSt();const bar=`<div class="sidebar"><span>👑 宮廷 <b>${s.court}</b></span><div class="sbar"><i class="c" style="width:${s.court/2}%"></i><i class="f" style="width:${s.folk/2}%"></i></div><span><b>${s.folk}</b> 民衆 🧑‍🤝‍🧑</span></div>`;
  h=h.replace('<div class="odai">',bar+'<div class="odai">');}catch(e){}return h;};
/* 結末の称号 */
const _legacyST=legacy;
legacy=function(){const o=_legacyST();try{const s=sideSt();if(s.folk>=70)o.T.push('民衆の楽団');if(G.flags.kapell)o.T.push('宮廷楽長');const hs=(G.hits||[]).filter(x=>x.cs.length>=4);if(hs.length)o.L.push(`流行り歌「${hs.map(x=>x.t).join('」「')}」が、街から街へ歌い継がれた。`);
  const pr=Object.keys(G.flags.prodigy||{});if(pr.length)o.L.push(`街角から、神童${pr.map(nameAny).join('、')}が生まれた。`);}catch(e){}return o;};
/* ---------- お知らせ窓をしぼる：おまけの出来事は月2つまで。超えた分は小さな通知だけ ---------- */
let _evQuiet=false;
const _modalQT=modal;
modal=function(title,body,btns,cls){if(_evQuiet&&!evBudget()){try{toast(`📜 ${String(title).replace(/<[^>]+>/g,'')}（日誌に記録）`);addLog(`${String(title).replace(/<[^>]+>/g,'')}：${String(body).replace(/<[^>]+>/g,'').slice(0,60)}…`);}catch(e){}return;}return _modalQT(title,body,btns,cls);};
for(const fn of ['bondMonthly','akiMonthly','patronMonthly']){try{const o=window[fn]||eval(fn);if(typeof o!=='function')continue;const w=function(){_evQuiet=true;try{return o.apply(this,arguments);}finally{_evQuiet=false;}};eval(`${fn}=w`);}catch(e){}}
/* ---------- 地図の「遊びの棚」をたたむ ---------- */
let _shelfOpen=false;
const _mapHTMLSH=mapHTML;
mapHTML=function(){let h=_mapHTMLSH();try{
  const re=/<div class="hub">[\s\S]*?<\/div>(\s*<button class="btn critbtn"[\s\S]*?<\/span><\/div><\/button>)?(\s*<button class="btn patbtn"[\s\S]*?<\/span><\/div><\/button>)?/;
  const m=h.match(re);if(m){const n=(m[0].match(/<button/g)||[]).length;h=h.replace(m[0],`<details class="shelf"${_shelfOpen?' open':''}><summary>🎪 遊びの棚（${n}）<small>人間関係図・新作・大勝負・クイズ ほか</small></summary>${m[0]}</details>`);}}catch(e){}return h;};
const _renderSH=render;
render=function(){_renderSH();const d=document.querySelector('details.shelf');if(d)d.ontoggle=()=>{_shelfOpen=d.open;};};
