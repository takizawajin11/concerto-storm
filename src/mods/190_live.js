/* =====================================================================
   生演奏：演奏会を「聴ける・振れる」体験にする（試作）
   ・LIVE[曲id] に、名曲の一節を 旋律(mel)・内声(mid)・低音(bass) の3声で持つ
   ・編成がそのまま音になる：担当者の出来が悪いと音を外し、空席の声部は鳴らない。指揮者の腕でテンポが揺れる
   ・演奏中に2回、指揮の判断をする（テンポ／終わり方）。結果は評判（ev.q）に足される
   ・自動テスト（navigator.webdriver）では出さない。試すときは window.LIVE_FORCE=1
   ===================================================================== */
const LV_PC={c:0,d:2,e:4,f:5,g:7,a:9,b:11};
function lvNote(s){const m=s.match(/^([a-g])([#b]?)(\d)$/);if(!m)throw new Error('音名がおかしい: '+s);return(+m[3]+1)*12+LV_PC[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0);}
/* "g4:1 r:.5 a4+c5:2 =.5 d5 e5" → [[音|[和音]|0, 拍], …]　=x は以後の既定の長さ */
function lvParse(str){let def=1;const out=[];for(const tk of str.trim().split(/\s+/)){if(tk[0]==='='){def=+tk.slice(1);continue;}const [n,b]=tk.split(':');out.push([n==='r'?0:n.includes('+')?n.split('+').map(lvNote):lvNote(n),b==null?def:+b]);}return out;}
const lvOct=(str,o)=>str.replace(/([a-g][#b]?)(\d)/g,(m,n,d)=>n+(+d+o));
const LIVE={};
function lvDef(id,o){o.segs=o.segs.map(s=>{const r={vol:s.vol||1};for(const v of ['mel','mid','bass'])if(s[v])r[v]=lvParse(s[v]);return r;});LIVE[id]=o;}
const lvBeats=line=>line.reduce((a,n)=>a+n[1],0);

/* ---- 無伴奏チェロ組曲 第1番 プレリュード（1〜7小節＋終わりの和音） ---- */
const csB=(a,b,c,d)=>`${a} ${b} ${c} ${d} ${c} ${b} ${c} ${b} `;
lvDef('cellosuite',{t:'プレリュード',bpm:66,gate:1.5,ch:'sing',fin:'any',segs:[
 {mel:'=.25 '+csB('g2','d3','b3','a3').repeat(2)+csB('g2','e3','c4','b3').repeat(2)},
 {mel:'=.25 '+csB('g2','f#3','c4','b3').repeat(2)+csB('g2','g3','b3','a3')+'g2 g3 b3 a3 b3 g3 b3 f#3'},
 {mel:'=.25 g2 e3 b3 a3 b3 g3 f#3 g3 e3 g3 f#3 g3 b2 d3 c#3 b2 '+'c#3 g3 a3 g3 a3 g3 a3 g3 '.repeat(2)+'f#3 a3 d4 c#4 d4 a3 g3 a3 f#3 a3 g3 a3 d3 f#3 e3 d3 g2+d3+b3:3'}]});
/* ---- カンタータ147番「主よ、人の望みの喜びよ」（1拍＝8分音符） ---- */
lvDef('bwv147',{t:'主よ、人の望みの喜びよ',bpm:190,gate:1.15,ch:'sing',fin:'soft',segs:[
 {mel:'r g4 a4 b4 d5 c5 c5 e5 d5 d5 g5 f#5 g5 d5 b4 g4 a4 b4 c5 d5 e5 d5 c5 b4 a4 b4 g4',mid:'=3 d4 d4 e4 d4 b3 d4 e4 d4 c4',bass:'=3 g3 b3 c4 b3 e3 g3 c3 b2 a2'},
 {mel:'f#4 g4 a4 d4 f#4 a4 c5 b4 a4 b4 g4 a4 b4 d5 c5 c5 e5 d5 d5 g5 f#5 g5 d5 b4 g4 a4 b4',mid:'=3 a3 a3 c4 d4 d4 e4 d4 b3 d4',bass:'=3 d3 d3 f#3 g3 b3 c4 b3 e3 g3'},
 {mel:'e5 d5 c5 b4 a4 g4 d4 g4 f#4 g4 b4 d5 g5:6',mid:'=3 e4 d4 c4 b3:9',bass:'=3 c3 d3 d3 g2:9'}]});
/* ---- アイネ・クライネ・ナハトムジーク 第1楽章（1〜8小節＋終わりの和音） ---- */
const ekA='g5:1 r:.5 d5:.5 g5:1 r:.5 d5:.5 =.5 g5 d5 g5 b5 d6:1 r:1 c6:1 r:.5 a5:.5 c6:1 r:.5 a5:.5 c6 a5 f#5 a5 d5:1 r:1';
lvDef('k525',{t:'第1楽章 アレグロ',bpm:126,gate:.9,orn:1,key:7,ch:'drive',fin:'big',segs:[
 {mel:ekA,mid:lvOct(ekA,-1),bass:lvOct(ekA,-2)},
 {vol:.75,mel:'g5:2.5 =.5 b5 a5 g5 g5 f#5 f#5:1.5 a5 c6 f#5 a5 g5 g5:1.5 b5 a5 g5 g5 f#5 f#5:1.5 a5 c6 f#5',
  mid:'=.5 '+'b4+d5 '.repeat(8)+'a4+c5 '.repeat(8)+'b4+d5 '.repeat(8)+'a4+c5 '.repeat(8),bass:'=.5 '+'g3 '.repeat(32)},
 {mel:'g5 g5 g5:2',mid:'b4+d5 b4+d5 b4+d5:2',bass:'g3 g3 g2+g3:2'}]});
/* ---- ハイドン 交響曲第94番「驚愕」第2楽章 ---- */
const hsM='=.5 c5 c5 e5 e5 g5 g5 e5:1 f5 f5 d5 d5 b4 b4 g4:1 c5 c5 e5 e5 g5 g5 e5:1 c6 c6 f#5 f#5 g5:1',
 hsI='e4+g4 e4+g4 e4+g4 e4+g4 b3+f4 b3+f4 b3+d4 b3+d4 e4+g4 e4+g4 e4+g4 e4+g4 c4+e4 a3+c4 b3+d4',hsB='c3 c3 c3 c3 g2 g2 g2 g2 c3 c3 c3 c3 a2 d3 g2';
lvDef('surprise',{t:'第2楽章 アンダンテ',bpm:92,gate:.7,rit:false,bang:1,ch:'any',fin:'big',
 d2:{q:'いよいよ「びっくり」の和音。どう鳴らす？',big:'思い切り叩く',normal:'楽譜どおり',soft:'上品に抑える'},segs:[
 {vol:.8,mel:hsM+' r:1',mid:hsI+' r:1',bass:hsB+' r:1'},
 {vol:.4,mel:hsM,mid:hsI,bass:hsB},
 {vol:1.5,mel:'b4+d5+g5:2',mid:'b3+d4+g4:2',bass:'g2+g3:2'}]});
/* ---- ベートーヴェン 交響曲第9番「歓喜の歌」 ---- */
lvDef('b9',{t:'歓喜の歌',bpm:144,gate:1.05,ch:'any',fin:'big',segs:[
 {mel:'f#5 f#5 g5 a5 a5 g5 f#5 e5 d5 d5 e5 f#5 f#5:1.5 e5:.5 e5:2 f#5 f#5 g5 a5 a5 g5 f#5 e5 d5 d5 e5 f#5 e5:1.5 d5:.5 d5:2',
  mid:'a4 a4 b4 c#5 c#5 b4 a4 g4 f#4 f#4 g4 a4 a4:1.5 g4:.5 g4:2 a4 a4 b4 c#5 c#5 b4 a4 g4 f#4 f#4 g4 a4 g4:1.5 f#4:.5 f#4:2',
  bass:'=2 d3 d3 d3 a2 d3 d3 a2 a2 d3 d3 d3 a2 d3 d3 a2 d3'},
 {mel:'e5 e5 f#5 d5 e5 f#5:.5 g5:.5 f#5 d5 e5 f#5:.5 g5:.5 f#5 e5 d5 e5 a4',mid:'g4 g4 a4 f#4 g4 a4:.5 b4:.5 a4 f#4 g4 a4:.5 b4:.5 a4 g4 f#4 g#4 e4',bass:'=2 a2 d3 a2 d3 a2 =1 d3 a2 b2 e3 a2'},
 {mel:'f#5:2 f#5 g5 a5 a5 g5 f#5 e5 d5 d5 e5 f#5 e5:1.5 d5:.5 d5:2',mid:'a4:2 a4 b4 c#5 c#5 b4 a4 g4 f#4 f#4 g4 a4 g4:1.5 f#4:.5 f#4:2',bass:'a2:1 =2 d3 d3 d3 a2 d3 d3 a2 d3'}]});
/* ---- 美しく青きドナウ（第1ワルツ） ---- */
const bdD='f#3+a3+d4',bdA='e3+g3+c#4',bdm=x=>`r ${x} ${x} `;
lvDef('danube',{t:'第1ワルツ',bpm:174,gate:.95,tim:{mid:'violin'},ch:'any',fin:'big',segs:[
 {mel:'r:2 d4 d4 f#4 a4 a4 r a5+f#5 a5+f#5 r f#5+d5 f#5+d5 r d4 d4 f#4 a4 a4 r a5+f#5 a5+f#5 r g5+e5 g5+e5 r c#4',
  bass:'r:3 '+'d3 r:2 '.repeat(7)+'a2 r:2',mid:'r:3 '+bdm(bdD).repeat(6)+`r ${bdD} ${bdA} `+bdm(bdA)},
 {mel:'c#4 e4 b4 b4 r b5+g5 b5+g5 r g5+e5 g5+e5 r c#4 c#4 e4 b4 b4 r b5+g5 b5+g5 r f#5+d5 f#5+d5 r d4',
  bass:'a2 r:2 '.repeat(7)+'d3 r:2',mid:bdm(bdA).repeat(6)+`r ${bdA} ${bdD} `+bdm(bdD)},
 {mel:'d4 f#4 a4 d5 r d6+a5 d6+a5 r a5+f#5 a5+f#5 r r d5+f#5+a5:3',bass:'d3 r:2 '.repeat(4)+'d2+d3:3',mid:bdm(bdD).repeat(4)+'f#3+a3+d4:3'}]});
/* ---- サティ ジムノペディ第1番 ---- */
const gyB='g2:3 d2:3 ',gyM='r b3+d4+f#4:2 r a3+c#4+f#4:2 ';
lvDef('gymno',{t:'ゆっくりと、痛ましげに',bpm:84,ch:'sing',fin:'soft',segs:[
 {mel:'r:6 r f#5 a5 g5 f#5 c#5',bass:gyB.repeat(2),mid:gyM.repeat(2)},
 {mel:'b4 c#5 d5 a4:3 f#4:6',bass:gyB.repeat(2),mid:gyM.repeat(2)},
 {mel:'r f#5 a5 g5 f#5 c#5 b4 c#5 d5 a4:3 r:3',bass:gyB.repeat(2)+'g2:3',mid:gyM.repeat(2)+'r b3+d4+f#4:2'}]});
for(const id in LIVE)LIVE[id].segs.forEach((s,i)=>{const bs=['mel','mid','bass'].filter(v=>s[v]).map(v=>lvBeats(s[v]));if(bs.some(b=>Math.abs(b-bs[0])>1e-6))console.warn('生演奏の拍が合わない',id,i,bs);});

/* 生演奏のために足す演目 */
MOTIFS.jesu=[[67,.2],[69,.2],[71,.2],[74,.2],[72,.2],[72,.2],[76,.2],[74,.2],[74,.2],[79,.2],[78,.2],[79,.2],[74,.2],[71,.2],[67,.5]];
SCEN.s1723.rep.push(Pc('bwv147','バッハ カンタータ147番「主よ、人の望みの喜びよ」','宗教曲',[Sl('vn','オブリガート'),Sl('voice','コラール'),Sl('cb','通奏低音')],[.3,.6,.1],'古典',null,'jesu','violin'));
SCEN.s1781.rep.push(Pc('k525','モーツァルト『アイネ・クライネ・ナハトムジーク』','室内楽',[Sl('vn','第1ヴァイオリン'),Sl('vn','第2ヴァイオリン'),Sl('vc','チェロ')],[.4,.4,.2],'古典',null,'mozart','violin'));
SCEN.s1832.rep.push(Pc('b9','ベートーヴェン 交響曲第9番「歓喜の歌」','交響曲',[Sl('cond','指揮'),Sl('voice','独唱'),Sl('vn','コンサートマスター'),Sl('vc','チェロ')],[.3,.5,.2],'古典',null,'ninth','voice'));

/* ---------- 音 ---------- */
const LV_TIM={vn:'violin',va:'violin',vc:'cello',cb:'cello',fl:'flute',ob:'flute',cl:'flute',br:'flute',voice:'voice',pf:'piano',hp:'piano',tim:'piano',comp:'piano'};
const LV_VOL={mel:1,mid:.5,bass:.75},LV_NAME={mel:'旋律',mid:'内声',bass:'低音'};
function lvInst(tim,m){if(tim==='piano')return'piano';if(tim==='cello')return m>=72?'violin':'cello';if(tim==='violin')return m<52?'cello':'violin';return m<51?'cello':'flute';}
function lvTone(bus,t0,m,dur,tim,vol){try{
  const k=lvInst(tim,m),arr=BUF[k];let b=null;
  if(arr&&arr.length){b=arr[0];for(const s of arr)if(Math.abs(s.m-m)<Math.abs(b.m-m))b=s;if(Math.abs(b.m-m)>10)b=null;}
  const g=AC.createGain();g.connect(bus);
  if(b){const src=AC.createBufferSource();src.buffer=b.buf;src.playbackRate.value=Math.pow(2,(m-b.m)/12);
    const v=SMP[k].vol*vol,len=k==='piano'?Math.max(dur*2.2,.7):dur+.08;
    g.gain.setValueAtTime(v,t0);g.gain.setValueAtTime(v,t0+len*.8);g.gain.linearRampToValueAtTime(.0001,t0+len+.15);
    src.connect(g);src.start(t0);src.stop(t0+len+.2);}
  else{const o=AC.createOscillator(),f=AC.createBiquadFilter();o.frequency.value=mtof(m);f.type='lowpass';o.connect(f);f.connect(g);o.start(t0);
    if(tim!=='piano'){o.type=(tim==='violin'||tim==='cello')?'sawtooth':'triangle';f.frequency.value=2200;const v=.1*vol;
      g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.03);g.gain.setValueAtTime(v,t0+Math.max(.04,dur*.85));g.gain.linearRampToValueAtTime(0,t0+dur+.06);o.stop(t0+dur+.2);}
    else{o.type='triangle';f.frequency.value=3200;g.gain.setValueAtTime(.22*vol,t0);g.gain.exponentialRampToValueAtTime(.001,t0+Math.max(dur*2,.5));o.stop(t0+Math.max(dur*2,.5)+.05);}}
}catch(e){}}
const LV_MAJ=[0,2,4,5,7,9,11];
function lvUp(m,key){for(let d=1;d<=2;d++)if(LV_MAJ.includes(((m+d-key)%12+12)%12))return m+d;return m+2;}

/* ---------- 誰がどの声部を弾くか ---------- */
function lvCast(p,L,ev,sc){
  const pl=[];let cond=null,condSlot=false;
  p.slots.forEach((s,i)=>{const rs=[].concat(s.r),c=ev.contrib[i],x=c?Math.max(0,Math.min(1,(c.v-11)/12)):.6;
    if(rs.includes('cond')){condSlot=true;if(L[i])cond={id:L[i],x};return;}
    pl.push({i,id:L[i]||null,r:rs[0],x});});
  const voices=['mel','mid','bass'].filter(v=>sc.segs.some(s=>s[v])),cast={};
  if(pl.length===1){for(const v of voices)cast[v]=[pl[0]];}
  else if(pl.length){const rest=pl.slice();cast.mel=[rest.shift()];
    if(voices.includes('bass')&&rest.length){let bi=-1;for(const r of ['cb','vc','pf','tim']){bi=rest.findIndex(w=>w.r===r);if(bi>=0)break;}if(bi<0)bi=rest.length-1;cast.bass=[rest.splice(bi,1)[0]];}
    if(rest.length){if(voices.includes('mid'))cast.mid=rest;else cast.mel=cast.mel.concat(rest);}}
  return{cast,cond,condSlot,voices,solo:pl.length===1};
}
/* ---------- 一区切りぶんの音を並べる。戻り値は長さ（秒） ---------- */
function lvSeg(S,si){
  const sc=S.sc,seg=sc.segs[si],last=si===sc.segs.length-1,spb=60/sc.bpm/S.tempo;
  const B=Math.max(...S.cast.voices.map(v=>seg[v]?lvBeats(seg[v]):0));
  const R=last&&sc.rit!==false?Math.min(4,B/2):0,rk=last?({big:.3,normal:.22,soft:.45})[S.fin]:0;
  const T=b=>{let t=b*spb+S.wob*spb*1.6*(Math.sin(b*.55+S.ph)-Math.sin(S.ph));if(R&&b>B-R){const u=b-(B-R);t+=u*u/(2*R)*rk*spb*2;}return t;};
  const live=!!(S.bus&&AC),base=live?S.tNext:0,wall0=live?Math.max(0,S.tNext-AC.currentTime):0;
  if(live&&last){try{const g=S.bus.gain,tg=({big:1.45,normal:1.05,soft:.5})[S.fin];if(sc.rit===false)g.setValueAtTime(tg,base);else{g.setValueAtTime(1,base);g.linearRampToValueAtTime(tg,base+Math.max(.5,T(B)*.7));}}catch(e){}}
  for(const v of S.cast.voices){const line=seg[v];if(!line)continue;
    const who=S.cast.cast[v];let x,tim,pid=null,vol=LV_VOL[v]*seg.vol;
    if(!who){x=.72;tim=(sc.tim&&sc.tim[v])||'piano';vol*=.55;}
    else{const on=who.filter(w=>w.id);if(!on.length)continue;x=on.reduce((a,w)=>a+w.x,0)/on.length;tim=LV_TIM[on[0].r]||'piano';if(!S.cast.solo||v==='mel')pid=on[0].id;}
    const lag=S.lag[v]||0,pw=(1-x)*(1-x)*.2+(S.rush?.06:0);let b=0;
    for(const [n,d] of line){
      if(n){const t=T(b);let dur=(T(b+d)-t)*(sc.gate||1),off=Math.max(0,t+lag+(Math.random()*2-1)*(1-x)*.04),ns=Array.isArray(n)?n.slice():[n],flag='';
        if(Math.random()<pw){flag='✗';if(ns.length>1)ns.splice(Math.floor(Math.random()*ns.length),1);else ns[0]+=pick([-1,1,-2,2]);}
        else if(sc.orn&&v==='mel'&&x>=.75&&ns.length===1&&d*spb>=.45&&Math.random()<.6){flag='✨';
          if(live){lvTone(S.bus,base+off,ns[0],.07,tim,vol);lvTone(S.bus,base+off+.07,lvUp(ns[0],sc.key||0),.07,tim,vol);}off+=.14;dur=Math.max(.1,dur-.14);}
        if(live)for(const m of ns)lvTone(S.bus,base+off,m,dur,tim,vol);
        if(flag&&pid)lvFlash(S,pid,flag,(wall0+off)*1000);}
      b+=d;}
  }
  const D=T(B);if(live)S.tNext+=D;return D;
}
function lvFlash(S,pid,txt,ms){S.fl[pid]=(S.fl[pid]||0)+1;if(S.fl[pid]>6)return;S.at(ms,()=>{const el=document.querySelector(`.perf[data-pid="${pid}"]`);if(!el)return;const s=document.createElement('span');s.className='lvx'+(txt==='✗'?' bad':'');s.textContent=txt==='✗'?'♪✗':'✨';el.appendChild(s);setTimeout(()=>s.remove(),800);});}

/* ---------- 指揮の判断 ---------- */
const lvAvg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
function lvStats(S){const ids=S.L.filter(Boolean),oth=ids.filter(id=>id!=='you');
  return{t:lvAvg(ids.map(id=>mstat(id,'tech')||8)),e:lvAvg(ids.map(id=>mstat(id,'expr')||8)),mood:oth.length?lvAvg(oth.map(id=>moodOf(id))):70,cond:!!S.cast.cond,small:ids.length<=2};}
const LV_AUD={quiet:'静まり返って聴き入っている',restless:'ざわついて落ち着かない',warm:'あたたかく見守っている'};
const LV_FIN={big:'堂々と終わる曲',soft:'静かに消える曲',any:'どちらも似合う曲'};
function lvJudge1(S,c){const st=lvStats(S);if(c==='keep')return{b:.2,msg:'楽譜どおり、端正に進めた'};
  const fit=c==='slow'?st.e>=st.t:st.t>=st.e,af=S.aud==='warm'?.2:((c==='slow')===(S.aud==='quiet'))?.4:-.2;
  if(c==='fast'&&!fit)S.rush=true;
  return{b:(fit?.5:-.3)+af,msg:c==='slow'?(fit?'たっぷり歌い、旋律が客席に沁みた':'歌いきれず、間延びした'):(fit?'切れ味のある運びに、客席が身を乗り出した':'走って足並みが乱れた')};}
function lvJudge2(S,c){const st=lvStats(S),f=S.sc.fin;if(c==='normal')return{b:.2,msg:'楽譜どおりに締めた'};
  const ok=c==='big'?st.mood>=55:(st.cond||st.small),nat=f==='any'?.1:f===c?.4:-.2;
  return{b:(ok?.5:-.3)+nat,msg:c==='big'?(ok?(S.sc.bang?'一撃に、客席じゅうが飛び上がった':'全員の気持ちがひとつになり、大きく鳴り響いた'):(S.sc.bang?'一撃がそろわず、びっくりも半分だった':'気持ちがそろわず、音がばらけた')):(ok?'息をのむ静けさで消えていった':'消え際がそろわなかった')};}
function lvAsk(S,n,ms){
  const box=$('#lvD');if(!box)return;const st=lvStats(S),sc=S.sc;
  const d2=sc.d2||{q:'終わり方をどうする？',big:'大きく盛り上げる',normal:'楽譜どおり',soft:'静かに消える'};
  const q=n===1?'テンポをどうする？':d2.q;
  const hint=n===1?`顔ぶれ：技巧 <b>${st.t.toFixed(1)}</b>／表現 <b>${st.e.toFixed(1)}</b>　客席：<b>${LV_AUD[S.aud]}</b>`
    :`楽団の機嫌 <b>${Math.round(st.mood)}</b>／${st.cond?'指揮者あり':st.small?'少人数':'指揮者なし'}　<b>${LV_FIN[sc.fin]}</b>`;
  const opts=n===1?[['slow','たっぷり歌わせる'],['keep','楽譜どおり'],['fast','前へ進める']]:[['soft',d2.soft],['normal',d2.normal],['big',d2.big]];
  box.innerHTML=`<div class="lvq"><b>🪄 ${q}</b><div class="pmeta">${hint}</div><div class="lvo">${opts.map(o=>`<button class="btn" data-lv="${o[0]}">${o[1]}</button>`).join('')}</div><div class="lvt"><i style="animation-duration:${Math.max(.5,ms/1000)}s"></i></div></div>`;
  box.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{S['c'+n]=b.dataset.lv;box.querySelectorAll('[data-lv]').forEach(x=>x.classList.toggle('gold',x===b));if(typeof sfx==='function')sfx('tap');});
}
function lvLock(S,n){
  const c=S['c'+n]||(n===1?'keep':'normal'),r=n===1?lvJudge1(S,c):lvJudge2(S,c);r.b=Math.round(r.b*10)/10;S.bonus+=r.b;S.res.push(r);
  if(n===1)S.tempo=c==='slow'?.87:c==='fast'?1.13:1;else S.fin=c;
  const box=$('#lvD');if(box)box.innerHTML='';
  const lg=$('#lvLog');if(lg)lg.innerHTML+=`<div class="${r.b>=.5?'good':r.b<0?'bad':''}">${n===1?'テンポ':'終わり方'}：${r.msg}（${r.b>=0?'+':''}${r.b.toFixed(1)}）</div>`;
}
/* ---------- 進行 ---------- */
let LV=null;
const LV_LINES=['','「二度と聴きたくない」','「退屈であった」','「堅実な演奏だった」','「見事な一夜だ」','「音楽史に残る名演である」'];
const liveOn=()=>soundOn&&(window.LIVE_FORCE||!navigator.webdriver)&&!(G.flags&&G.flags.liveOff);
function lvRun(p,L,ev){
  const sc=LIVE[p.id],S=LV;Object.assign(S,{p,L,ev,sc,tempo:1,fin:'normal',bonus:0,res:[],fl:{},rush:false,aud:pick(['quiet','restless','warm']),ph:Math.random()*6,timers:[],
    at(ms,fn){this.timers.push(setTimeout(()=>{if(!this.done)fn();},ms));}});
  S.cast=lvCast(p,L,ev,sc);
  const xs=[].concat(...Object.values(S.cast.cast)).filter(w=>w.id).map(w=>w.x);
  S.wob=S.cast.cond?(1-S.cast.cond.x)*.05:S.cast.condSlot?.09:(1-lvAvg(xs))*.03;
  S.lag={};if(S.cast.condSlot&&!S.cast.cond)for(const v of S.cast.voices)S.lag[v]=(Math.random()*2-1)*.06;
  const c=ac();if(c){try{S.bus=c.createGain();S.bus.gain.value=1;S.bus.connect(MASTER);S.tNext=c.currentTime+.45;}catch(e){S.bus=null;}}
  /* 画面 */
  const stage=document.querySelector('#scene .stage');if(stage){
    const who=v=>{const w=S.cast.cast[v];if(!w)return'楽団';const on=w.filter(x=>x.id);return on.length?on.map(x=>nameOf(x.id)).join('・'):'<span style="color:#e77">空席（鳴らない）</span>';};
    const d=document.createElement('div');d.id='live';d.className='live';
    d.innerHTML=`<div class="lvh"><span>🎧 <b>${sc.t}</b><small>（抜粋）いまの編成の音で鳴っています</small></span><button class="btn" id="lvSkip">⏭ 飛ばす</button></div>
     <div class="lvbar"><i id="lvProg"></i></div>
     <div class="lvcast">${S.cast.solo?`独奏：${who('mel')}`:S.cast.voices.map(v=>`${LV_NAME[v]}：${who(v)}`).join('　')}${S.cast.condSlot?`　指揮：${S.cast.cond?nameOf(S.cast.cond.id):'<span style="color:#e77">空席（足並みが乱れる）</span>'}`:''}</div>
     <div id="lvD"></div><div id="lvLog" class="lvlog"></div>`;
    stage.insertAdjacentElement('afterend',d);$('#scene').classList.add('lvplay');
    $('#lvSkip').onclick=()=>lvFinish(true);}
  const tot=sc.segs.reduce((a,s)=>a+Math.max(...S.cast.voices.map(v=>s[v]?lvBeats(s[v]):0)),0);let doneB=0;
  const prog=(si,dur)=>{const s=sc.segs[si];doneB+=Math.max(...S.cast.voices.map(v=>s[v]?lvBeats(s[v]):0));const el=$('#lvProg');if(el){el.style.transitionDuration=dur+'s';requestAnimationFrame(()=>{el.style.width=(doneB/tot*100)+'%';});}};
  const d0=lvSeg(S,0);prog(0,d0);
  S.at(700,()=>lvAsk(S,1,d0*1000-1100));
  S.at(d0*1000-400,()=>{lvLock(S,1);const d1=lvSeg(S,1);
    S.at(400,()=>{prog(1,d1);lvAsk(S,2,d1*1000-500);});
    S.at(400+d1*1000-400,()=>{lvLock(S,2);const d2=lvSeg(S,2);
      S.at(400,()=>{prog(2,d2);if(sc.bang){const big=S.fin==='big';for(let i=0;i<(big?8:S.fin==='soft'?1:4);i++)setTimeout(()=>{try{audBubble(pick(big?['わっ！','ひゃっ！','！！']:['おや','…！']),8+Math.random()*84,15+Math.random()*60,big?'good':'');}catch(e){}},i*90);}});
      S.at(400+d2*1000+900,()=>lvFinish(false));});});
}
function lvFinish(skipped){
  const S=LV;if(!S||S.done)return;S.done=true;S.timers.forEach(clearTimeout);
  if(skipped&&S.bus&&AC){try{S.bus.gain.cancelScheduledValues(AC.currentTime);S.bus.gain.setTargetAtTime(0,AC.currentTime,.05);}catch(e){}}
  const ev=S.ev,b=skipped?0:Math.round(S.bonus*10)/10;
  if(b){ev.q+=b;ev.stars=ev.q<13?1:ev.q<17?2:ev.q<21?3:ev.q<25?4:5;}
  if(!skipped)ev.notes.push(`生演奏の指揮：${S.res.map(r=>r.msg).join('／')}（${b>=0?'+':''}${b.toFixed(1)}）`);
  if(S.cast.condSlot&&!S.cast.cond&&!skipped)ev.notes.push('指揮者が空席で、足並みがそろわなかった');
  if(!skipped)_lvNote=`<div class="stx">🎧 生演奏の指揮：${S.res.map(r=>r.msg).join('／')}（評判 ${b>=0?'+':''}${b.toFixed(1)}）</div>`;
  const sn=$('#scene');if(sn)sn.classList.remove('lvplay');
  const d=$('#lvD');if(d)d.innerHTML='';const lg=$('#lvLog');if(lg&&!skipped)lg.innerHTML+=`<div><b>指揮の判断：評判 ${b>=0?'+':''}${b.toFixed(1)}</b></div>`;
  const sk=$('#lvSkip');if(sk)sk.remove();
  const a=$('#apl');if(a)a.style.width=(ev.stars*20)+'%';const s=$('#stx');if(s&&s.textContent)s.textContent=STARS(ev.stars);
  const cb=document.querySelector('#critic b');if(cb)cb.textContent=LV_LINES[ev.stars];
  if(S.react!=null){try{_audienceReactLV(ev.stars);}catch(e){}}
  if(S.hold){const h=S.hold;S.hold=null;setTimeout(()=>{S.active=false;_concertResultLV(...h);},skipped?500:2300);}
}
let _lvNote=null;
const _modalLV=modal;
modal=function(title,body,btns,cls){try{if(_lvNote&&G&&title===paperOf(P().city)){body=body+_lvNote;_lvNote=null;}}catch(e){}return _modalLV(title,body,btns,cls);};
const _playMotifLV=playMotif;
playMotif=function(id,tim,delay){if(LV&&LV.active&&!LV.done)return 0;return _playMotifLV(id,tim===undefined?'piano':tim,delay||0);};
const _audienceReactLV=audienceReact;
audienceReact=function(stars){if(LV&&LV.active&&!LV.done){LV.react=stars;return;}return _audienceReactLV(stars);};
const _concertResultLV=concertResult;
concertResult=function(p,L,ev,fi){if(LV&&LV.active&&!LV.done){LV.hold=[p,L,ev,fi];return;}if(LV)LV.active=false;return _concertResultLV(p,L,ev,fi);};
const _performLV=perform;
perform=function(){
  let on=false;try{on=!!(PR&&PR.p&&LIVE[PR.p.id]&&PR.mode!=='boss'&&liveOn());}catch(e){}
  if(!on){LV=null;return _performLV();}
  const p=PR.p,L=PR.L.slice();LV={active:true,done:false,hold:null,react:null};
  const _ev=evalLineup;let ev=null;evalLineup=function(a,b,c){const r=_ev(a,b,c);if(!ev&&a===p)ev=r;return r;};
  try{_performLV();}finally{evalLineup=_ev;}
  if(!ev){LV=null;return;}
  try{lvRun(p,L,ev);}catch(e){console.warn(e);if(LV){LV.done=true;const sn=$('#scene');if(sn)sn.classList.remove('lvplay');if(LV.hold){const h=LV.hold;LV.active=false;_concertResultLV(...h);}}}
};
/* 演目の一覧に 🎧 の印 */
const _programListLV=programList;
programList=function(){_programListLV();try{const list=[recitalPiece()].concat(SC.rep||[]);let any=false;
  document.querySelectorAll('#scene [data-pi]').forEach(b=>{const p=list[+b.dataset.pi];
    if(p&&p.by&&b.innerHTML.includes('undefined')){let nm='作曲者';for(const k in SCEN){const c=SCEN[k].chars.find(c=>c.id===p.by),pl=SCEN[k].players&&SCEN[k].players[p.by];if(c||(pl&&pl.name)){nm=(c||pl).name;break;}}b.innerHTML=b.innerHTML.replace(/undefined/g,nm);}
    if(p&&LIVE[p.id]){any=true;const s=document.createElement('span');s.className='lvbadge';s.textContent='🎧 生演奏';b.querySelector('b').after(s);}});
  if(any&&PR.mode!=='boss'){const t=document.querySelector('#scene .tell');if(t)t.innerHTML+='<br><b>🎧 生演奏</b>の曲は、いまの編成の音で聴けて、演奏中に指揮の判断ができる。';}}catch(e){}};
