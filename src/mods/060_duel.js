/* =====================================================================
   一騎打ち：連打で押し切る演奏決闘（リアルタイム）
   相手の「自信」か「平常心」を0にすればKO。持ち時間が尽きたら審判の判定。
   ===================================================================== */
const RT_MOVES=[
 {k:'tech',n:'超絶技巧',ic:'⚡',d:'自信を削る',st:'tech',hp:1,mp:.3},
 {k:'expr',n:'歌いこむ',ic:'❦',d:'平常心を削る',st:'expr',hp:.3,mp:1},
 {k:'impro',n:'即興で切り返す',ic:'✦',d:'両方・反撃を返す',st:'impro',hp:.6,mp:.6},
 {k:'wit',n:'主題をもじる',ic:'✒',d:'平常心に大打撃・間をおく',st:'theory',hp:.1,mp:1.6,cd:1.1},
 {k:'crowd',n:'聴衆に微笑む',ic:'☺',d:'喝采がたまる',st:'expr',hp:.15,mp:.2,chaos:9},
 {k:'pose',n:'大見得を切る',ic:'♛',d:'カデンツァで効く',st:'expr',hp:.35,mp:.7}
];
const RT_PHASES=[
 {n:'序奏 Maestoso',m:{}},
 {n:'Adagio　歌の楽章',m:{expr:1.5,tech:.7,pose:1.2},h:'「歌いこむ」が冴える'},
 {n:'Scherzo　諧謔の楽章',m:{impro:1.5,wit:1.4,tech:.9},h:'「即興」と「もじる」が冴える'},
 {n:'Presto　疾走の楽章',m:{tech:1.5,expr:.7,crowd:1.2},h:'「超絶技巧」が冴える'},
 {n:'Cadenza　独奏',m:{pose:1.6,impro:1.2,tech:1.2,expr:1.2},h:'「大見得」が冴える'}
];
const RT_COUNTERS=[
 {k:'clash',w:3,tell:'弓（指）を構えた！ 超絶技巧で応酬してくる',run(R){const d=Math.round((R.t.tech*2.2+R.t.lv*3)*R.cm);R.foc-=d;rtPop('you',`-${d}`,'bad');return`${R.t.name}の応酬！ 集中 -${d}`;}},
 {k:'sneer',w:2,tell:'冷ややかに笑った…',run(R){const d=Math.round((R.t.expr*1.2+R.t.lv*2)*R.cm);R.foc-=d;R.combo=0;rtPop('you',`-${d}`,'bad');return`冷笑！ コンボが途切れた（集中 -${d}）`;}},
 {k:'steal',w:2,tell:'客席に向かって手を広げた！',run(R){const h=Math.round(R.mpMax*.06);R.mp=Math.min(R.mpMax,R.mp+h);R.chaos=Math.max(0,R.chaos-20);rtPop('opp',`+${h}`,'heal');return`聴衆を奪われた！ 相手の平常心 +${h}・喝采 -20`;}},
 {k:'lecture',w:2,tell:'眉をひそめて口を開いた…',run(R){R.debuff=6;const d=Math.round(R.t.theory*1.5*R.cm);R.foc-=d;return`「その解釈は違う」 しばらく効きが半分（集中 -${d}）`;}}
];
let RTS=null;
function rtStart(){
  const t=D.t,base=t.tech+t.expr+t.impro+(t.theory||6),df=(DF().n==='入門'?.75:DF().n==='難しい'?1.2:DF().n==='超難しい'?1.4:DF().n==='地獄'?1.6:1);
  const hpMax=Math.round((1400+t.tech*120+base*25+t.lv*110)*df*3.2),mpMax=Math.round((1400+(t.theory||6)*80+t.expr*60+base*25+t.lv*110)*df*3.2);
  const focMax=Math.round(90+P().stamina*.6+plv()*4);
  RTS={t,hp:hpMax,hpMax,mp:mpMax,mpMax,foc:focMax,focMax,time:45,combo:0,maxC:0,chaos:0,last:'',run:0,lastHit:0,ph:0,phT:9,cT:3.5,tell:null,tellT:0,angry:false,debuff:0,cd:{},
    cm:1*df,hits:{},dmg:0,parry:0,weak:0,miss:0,over:false,note:0,log:[],t0:performance.now()};
  rtRender();rtLoop();
}
function rtStat(mv){
  let v=mstat('you',mv.st);
  if(mv.k==='crowd')v=Math.max(v,4+plv()/2);
  if(['tech','expr','impro'].includes(mv.k)){v+=((PL().duelB||{})[mv.k]||0);if(D.piece&&D.piece.b===mv.k)v+=2;}
  if(D.second){const c=charById(D.second);if(c&&c.style===mv.st)v+=Math.ceil(mlv(D.second)/2);}
  return v;
}
function rtEff(mv){
  const R=RTS,t=R.t;let e=1,tags=[];
  if(['tech','expr','impro'].includes(mv.k)){if(BEATS[mv.k]===t.style){e*=1.4;tags.push('弱点');}else if(mv.k===t.style){e*=.8;tags.push('相手の土俵');}}
  const pm=RT_PHASES[R.ph].m[mv.k];if(pm){e*=pm;if(pm>1)tags.push('楽章');}
  if(R.run>3){e*=Math.max(.35,1-(R.run-3)*.08);if(R.run===6)rtSay('同じ芸ばかり…聴衆が飽きてきた','warn');}
  if(R.debuff>0){e*=.5;R.debuff--;}
  return{e,tags};
}
function rtTap(k){
  const R=RTS;if(!R||R.over)return;const mv=RT_MOVES.find(m=>m.k===k);const now=performance.now()/1000;
  if(mv.cd&&R.cd[k]&&now<R.cd[k])return;if(mv.cd)R.cd[k]=now+mv.cd;
  if(k==='impro'&&R.tell){R.tell=null;R.parry++;R.combo+=3;rtSay('切り返した！ 相手の攻勢を逆手にとる','good');rtHit(mv,3,['切り返し']);rtShake();return;}
  R.run=R.last===k?R.run+1:1;R.last=k;
  rtHit(mv,1,[]);
}
function rtHit(mv,mult,extra){
  const R=RTS;const now=performance.now()/1000;
  R.combo=now-R.lastHit<.85?R.combo+1:1;R.lastHit=now;R.maxC=Math.max(R.maxC,R.combo);
  const {e,tags}=rtEff(mv);const cm=1+Math.min(R.combo,40)*.025;const crit=Math.random()<.08;
  const base=(8+rtStat(mv)*2.4)*e*cm*mult*(crit?1.8:1)*(.88+Math.random()*.24);
  const dh=Math.round(base*mv.hp),dm=Math.round(base*mv.mp);
  R.hp=Math.max(0,R.hp-dh);R.mp=Math.max(0,R.mp-dm);R.dmg+=dh+dm;R.hits[mv.k]=(R.hits[mv.k]||0)+1;if(tags.includes('弱点'))R.weak++;
  R.chaos=Math.min(100,R.chaos+(mv.chaos||3)*(tags.includes('弱点')?1.5:1));
  const all=tags.concat(extra);rtPop('opp',`${crit?'会心！':''}${all.length?all.join('・')+' ':''}-${dh+dm}`,crit||all.includes('弱点')?'crit':'');
  if(crit||mult>1)rtShake();
  rtNote(mv.k==='tech'?2:0);rtUpd();rtCheck();
}
function rtFinisher(){
  const R=RTS;if(!R||R.over||R.chaos<100)return;R.chaos=0;R.combo+=5;
  const p=PL();cutin(G.pid,'必殺のカデンツァ！',(p.pieces&&D.piece)?D.piece.t:p.name);
  let i=0;const best=['tech','expr','impro'].sort((a,b)=>rtStat(RT_MOVES.find(m=>m.k===b))-rtStat(RT_MOVES.find(m=>m.k===a)))[0];
  const iv=setInterval(()=>{if(!RTS||RTS.over||i++>=14){clearInterval(iv);return;}const mv=RT_MOVES.find(m=>m.k===(i%3===0?'expr':best));R.run=0;rtHit(Object.assign({},mv,{hp:.8,mp:.8}),1.5,['カデンツァ']);},110);
}
function rtNote(up){
  try{const c=ac();if(!c)return;const mo=MOTIFS[(D.piece&&D.piece.m)||PL().motif]||MOTIFS.scale;const R=RTS;const n=mo[R.note%mo.length];R.note++;
    const tt=c.currentTime+.01;if(Array.isArray(n[0]))n[0].forEach(x=>tone(tt,x+up*12,.16,PL().tim));else if(n[0])tone(tt,n[0]+up*12,.16,PL().tim);}catch(e){}
}
function rtOppNote(){
  try{const c=ac();if(!c)return;const R=RTS;const mo=MOTIFS[R.t.motif]||MOTIFS.scale;const broken=1-(R.hp/R.hpMax+R.mp/R.mpMax)/2;let tt=c.currentTime+.02;
    for(const [n,d] of mo.slice(0,4)){const m=Array.isArray(n)?n[0]:n;if(m)tone(tt,m+(Math.random()<broken?pick([-1,1,-2,6]):0),Math.min(.3,d*.6),R.t.tim||'piano');tt+=Math.min(.3,d*.6);}}catch(e){}
}
function rtLoop(){
  let prev=performance.now();
  const f=now=>{const R=RTS;if(!R||R.over||!$('#rtWrap'))return;const dt=Math.min(.1,(now-prev)/1000);prev=now;
    R.time-=dt;R.phT-=dt;if(R.phT<=0){R.ph=(R.ph+1)%RT_PHASES.length;R.phT=9;const P_=RT_PHASES[R.ph];rtSay(`${P_.n}${P_.h?'――'+P_.h:''}`,'phase');}
    const ang=(R.hp/R.hpMax<.5||R.mp/R.mpMax<.5);if(ang&&!R.angry){R.angry=true;rtSay(`${R.t.name}が本気になった！ 攻勢が速くなる`,'warn');}
    const rg=(R.angry?.012:.008)*dt;R.hp=Math.min(R.hpMax,R.hp+R.hpMax*rg*.5);R.mp=Math.min(R.mpMax,R.mp+R.mpMax*rg*.5);
    if(R.tell){R.tellT-=dt;if(R.tellT<=0){const c=R.tell;R.tell=null;rtSay(c.run(R),'bad');rtOppNote();rtShake(true);}}
    else{R.cT-=dt;if(R.cT<=0){const pool=RT_COUNTERS;let x=Math.random()*pool.reduce((a,c)=>a+c.w,0),c=pool[0];for(const q of pool){x-=q.w;if(x<=0){c=q;break;}}
      R.tell=c;R.tellT=R.angry?.75:.95;R.cT=Math.max(1.5,(3.6-R.t.lv*.12)*(R.angry?.7:1))*(.8+Math.random()*.4);rtSay(`⚠ ${R.t.name}が${c.tell}`,'tell');}}
    rtUpd();rtCheck();if(!R.over)requestAnimationFrame(f);};
  requestAnimationFrame(f);
}
function rtCheck(){
  const R=RTS;if(!R||R.over)return;
  if(R.hp<=0||R.mp<=0)return rtEnd(true,R.mp<=0?'mp':'hp');
  if(R.foc<=0)return rtEnd(false,'foc');
  if(R.time<=0){const op=(R.hp/R.hpMax+R.mp/R.mpMax)/2,yp=R.foc/R.focMax;return rtEnd(1-op>(1-yp)*1.1,'judge',op,yp);}
}
function rtEnd(win,how,op,yp){
  const R=RTS;R.over=true;R.win=win;R.how=how;R.op=op;R.yp=yp;
  const box=$('#rtOpp');const tp=(PL().tim==='violin'||D.t.tim==='violin');
  const ko={mp:`${R.t.name}は泡を吹いて倒れた！`,hp:`${R.t.name}は${D.t.seat==='ピアノ独奏'?'鍵盤から手を下ろし':'弓を置き'}、降参した！`,foc:'集中が切れた……指が止まってしまった',judge:win?`判定勝ち！ ${ci(R.t.city).judge}はあなたに軍配を上げた`:`判定負け……${ci(R.t.city).judge}は相手に軍配を上げた`}[how];
  if(win&&how!=='judge'&&box){box.classList.add('rtko');}
  rtSay(ko,win?'good':'bad');
  D.you=win?2:0;D.them=win?0:2;D.rt={how,maxC:R.maxC,dmg:R.dmg,parry:R.parry,weak:R.weak,hits:R.hits,op:op,yp:yp,left:Math.max(0,Math.round(R.time)),hpP:R.hp/R.hpMax,mpP:R.mp/R.mpMax,foc:R.foc/R.focMax};
  D.log=[`<b>一騎打ち</b>　${ko}<br><span class="pmeta">最大コンボ ${R.maxC}・与えたダメージ ${R.dmg}・切り返し ${R.parry}回・弱点を突いた ${R.weak}回</span>`];
  setTimeout(()=>{duelEnd();},win&&how!=='judge'?1600:1100);
}
const _duelAnalysisRT=duelAnalysis;
duelAnalysis=function(won){
  if(!D.rt)return _duelAnalysisRT(won);
  const r=D.rt,t=D.t,top=Object.entries(r.hits).sort((a,b)=>b[1]-a[1])[0];const tips=[];
  if(!won){
    if(r.how==='foc')tips.push('相手の攻勢を受けすぎて集中が切れた。「⚠」が出たら「即興で切り返す」を押すと、攻勢を跳ね返せる。');
    if(r.weak<5)tips.push(`${t.name}の得意は「${CARD[t.style].t}」。「${CARD[beatBy(t.style)].t}」で突くと1.4倍効く。`);
    if(top&&top[1]>40)tips.push(`「${RT_MOVES.find(m=>m.k===top[0]).n}」に頼りすぎ。同じ芸を続けると聴衆が飽きて効きが落ちる。`);
    tips.push('楽章ごとに冴える芸が変わる。画面上の楽章名を見て芸を切り替えよう。喝采が満ちたら「必殺のカデンツァ」。');
    if(r.how==='judge')tips.push(`判定では、相手の残り（自信${Math.round(r.hpP*100)}%・平常心${Math.round(r.mpP*100)}%）とあなたの集中の残り（${Math.round(r.foc*100)}%）を比べる。`);
  }
  return`<div class="anl"><b>${won?'勝因':'敗因'}</b><br>最大コンボ ${r.maxC}／弱点を突いた回数 ${r.weak}／切り返し ${r.parry}回${top?`／いちばん使った芸「${RT_MOVES.find(m=>m.k===top[0]).n}」${top[1]}回`:''}${tips.length?'<br><b>次への助言</b><br>'+tips.map(x=>'・'+x).join('<br>'):''}</div>`;
};
/* ---- 画面 ---- */
function rtRender(){
  const R=RTS,t=R.t;
  $('#scene').innerHTML=`<div class="sc rt" id="rtWrap">
   <div class="rt-top"><span id="rtTime">45</span><span id="rtPh">${RT_PHASES[0].n}</span></div>
   <div class="rt-g"><label>自信</label><div class="rtbar"><i id="rtHp" class="hp"></i></div></div>
   <div class="rt-g"><label>平常心</label><div class="rtbar"><i id="rtMp" class="mp"></i></div></div>
   <div class="rt-stage"><div class="rt-you" id="rtYou">${portrait(G.pid,64,'var(--gold)')}</div><div class="rt-vs">VS</div>
    <div class="rt-opp" id="rtOpp">${portrait(t.id,118,FCSS[t.faction])}<div class="rt-face" id="rtFace"></div><div class="rt-name">${t.name}<br><span class="pmeta">得意：${CARD[t.style].t}／弱点：${CARD[beatBy(t.style)].t}</span></div></div></div>
   <div class="rt-say" id="rtSay">${ci(t.city).judge}が見守るなか、決闘が始まった！</div>
   <div class="rt-btns">${RT_MOVES.map(m=>`<button class="rtb rt-${m.k}" data-rt="${m.k}"><span class="ic">${m.ic}</span>${m.n}<small>${m.d}</small></button>`).join('')}</div>
   <button class="btn rt-fin" id="rtFin" disabled>必殺のカデンツァ<small id="rtCh">喝采 0%</small></button>
   <div class="rt-g"><label>集中</label><div class="rtbar"><i id="rtFoc" class="foc"></i></div></div>
   <div class="rt-c"><span>コンボ <b id="rtCombo">0</b></span><span class="pmeta">「⚠」の間に「即興で切り返す」で反撃を返せる</span></div></div>`;
  $('#scene').classList.remove('hidden');$('#scene').scrollTop=0;
  document.querySelectorAll('[data-rt]').forEach(b=>{const go=e=>{e.preventDefault();rtTap(b.dataset.rt);b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit');};b.addEventListener('pointerdown',go);});
  $('#rtFin').onclick=rtFinisher;
}
function rtUpd(){
  const R=RTS;if(!R||!$('#rtHp'))return;
  $('#rtHp').style.width=R.hp/R.hpMax*100+'%';$('#rtMp').style.width=R.mp/R.mpMax*100+'%';$('#rtFoc').style.width=Math.max(0,R.foc/R.focMax*100)+'%';
  $('#rtTime').textContent=Math.max(0,Math.ceil(R.time));$('#rtCombo').textContent=R.combo;
  const ph=$('#rtPh');if(ph.textContent!==RT_PHASES[R.ph].n)ph.textContent=RT_PHASES[R.ph].n;
  const fin=$('#rtFin');fin.disabled=R.chaos<100;fin.classList.toggle('ready',R.chaos>=100);$('#rtCh').textContent=R.chaos>=100?'喝采が満ちた！ 今だ！':`喝采 ${Math.round(R.chaos)}%`;
  const imp=document.querySelector('[data-rt="impro"]');if(imp)imp.classList.toggle('parry',!!R.tell);
  const m=Math.min(R.hp/R.hpMax,R.mp/R.mpMax),face=$('#rtFace');
  const f=R.over&&R.win?'🫧🫧🫧':m<.15?'🫧💦':m<.35?'💦💦':m<.6?'💦':'';if(face&&face.textContent!==f)face.textContent=f;
  const o=$('#rtOpp');if(o){o.classList.toggle('angry',R.angry);o.classList.toggle('wobble',m<.35);}
}
function rtSay(s,cls){const e=$('#rtSay');if(!e)return;e.textContent=s;e.className='rt-say '+(cls||'');}
function rtPop(who,s,cls){const el=who==='opp'?$('#rtOpp'):$('#rtYou');if(!el)return;const d=document.createElement('div');d.className='rtpop '+(cls||'');d.textContent=s;d.style.left=(20+Math.random()*50)+'%';el.appendChild(d);setTimeout(()=>d.remove(),900);}
function rtShake(big){const w=$('#rtWrap');if(!w)return;w.classList.remove('shake','shake2');void w.offsetWidth;w.classList.add(big?'shake2':'shake');}

/* ---- 対決の入り口に「一騎打ち」を加える ---- */
const _openDuelRT=openDuel;
openDuel=function(t,opts){
  _openDuelRT(t,opts);
  document.querySelectorAll('[data-pc]').forEach(b=>b.onclick=()=>{D.piece=PL().pieces[+b.dataset.pc];
    modal('対決の形式',`課題曲「${D.piece.t}」。どちらの形式で挑む？`,[
      {t:'一騎打ち<small>45秒の連打勝負。相手の自信か平常心を0にすればKO</small>',cls:'crim',f(){ac();rtStart();}},
      {t:'三楽章の勝負<small>技巧・表現・即興の読み合い（これまでの形式）</small>',f(){playMotif(D.piece.m,PL().tim);duelRound();}}]);});
  const n=$('#scene .sc > div[style*="font-size:12px"]');if(n)n.insertAdjacentHTML('afterend','<div class="pmeta" style="margin-top:4px">課題曲を選ぶと、<b>一騎打ち</b>（連打で押し切る）か<b>三楽章の勝負</b>（読み合い）かを選べます。</div>');
};
