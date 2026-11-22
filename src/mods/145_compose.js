/* =====================================================================
   自分で作曲する：形式・調・主題・献呈先・題名を選んで新作を書く
   G.mywork = [{id,t,form,key,mo,ded,q,n,best}]
   ===================================================================== */
const CFORM=[
 {f:'協奏曲',l:'協奏曲',sl:[['vn','独奏'],['cond','指揮'],['vn','コンサートマスター']],need:'tech'},
 {f:'交響曲',l:'交響曲',sl:[['cond','指揮'],['vn','コンサートマスター'],['va','ヴィオラ'],['br','金管'],['fl','木管']],need:'theory'},
 {f:'室内楽',l:'弦楽四重奏曲',sl:[['vn','第1ヴァイオリン'],['vn','第2ヴァイオリン'],['va','ヴィオラ'],['vc','チェロ']],need:'theory'},
 {f:'オペラ',l:'オペラ',sl:[['voice','プリマ'],['cond','指揮'],['vn','コンサートマスター']],need:'expr'},
 {f:'宗教曲',l:'ミサ曲',sl:[['voice','独唱'],['cond','指揮'],['pf','オルガン']],need:'expr'},
 {f:'サロン',l:'ピアノ小品集',sl:[['pf','ピアノ']],need:'impro'}];
const CKEY=[['ハ長調','明るく堂々と',{交響曲:1,宗教曲:1}],['ニ長調','華やかに',{協奏曲:1,交響曲:1}],['ト短調','切なく',{室内楽:1,サロン:1}],['変ホ長調','英雄的に',{交響曲:1,協奏曲:1}],['ニ短調','劇的に',{オペラ:1,宗教曲:1}],['変ニ長調','夢見るように',{サロン:1,室内楽:1}]];
const CTHEME=[['scale','階段を駆け上がる主題'],['fanfare','ファンファーレの主題'],['nocturne','夜想曲風の歌'],['waltz','ワルツの主題'],['bach','フーガの主題'],['largo','祈りのラルゴ']];
function myWorkPiece(w){const F=CFORM.find(x=>x.f===w.form)||CFORM[0];
  return Pc(w.id,`【自作】${PL().name}「${w.t}」`,w.form,F.sl.map(([r,l])=>Sl([r],l)),[.4,.4,.2],PL().faction,G.pid,MOTIFS[w.mo]?w.mo:'scale',PL().tim||'piano');}
function myWorkAdd(w){if(!SC.rep.some(p=>p.id===w.id))SC.rep.push(myWorkPiece(w));}
function composeOpen(){
  G.mywork=G.mywork||[];
  if(G.compM!=null&&G.month-G.compM<3)return toast(`次の新作は${3-(G.month-G.compM)}か月後に書ける`);
  const st={};
  const step1=()=>modal('新作を書く（1/4）形式','どんな曲を書こう？<br><span class="pmeta">得意な能力に合う形式ほど、良い曲になりやすい。</span>',CFORM.map(F=>({t:`${F.l}<small>${{tech:'技巧',expr:'表現',impro:'即興',theory:'理論'}[F.need]}が生きる</small>`,f(){st.F=F;setTimeout(step2,50);}})).concat([{t:'やめる'}]),'paper');
  const step2=()=>modal('新作を書く（2/4）調性','どの調で書こう？',CKEY.map(([k,d,fit])=>({t:`${k}<small>${d}${fit[st.F.f]?'・この形式に合う':''}</small>`,cls:fit[st.F.f]?'gold':'',f(){st.K=[k,d,fit];setTimeout(step3,50);}})),'paper');
  const step3=()=>{modal('新作を書く（3/4）主題','曲の顔になる主題を選ぼう。押すと音が鳴る。',CTHEME.map(([m,l])=>({t:`${l}`,f(){st.M=m;try{playMotif(m,PL().tim||'piano',.05);}catch(e){}setTimeout(step4,350);}})),'paper');};
  const step4=()=>modal('新作を書く（4/4）献呈','誰に捧げよう？<br><span class="pmeta">捧げた相手は大喜びする。</span>',G.members.slice(0,6).map(id=>({t:`${nameOf(id)}に`,f(){st.D=id;setTimeout(finish,50);}})).concat([{t:`${ci(P().city).name}の聴衆に`,f(){st.D=null;setTimeout(finish,50);}}]),'paper');
  const finish=()=>{
    const def=`${st.K[0]}の${st.F.l}`;let t=null;try{t=prompt('題名をつけよう（そのままでも可）',`${def}「${pick(['春','暁','嵐','夢','旅','祈り','祝祭','郷愁','星','約束'])}」`);}catch(e){}
    t=(t||def).slice(0,30);
    const P0=P(),base=(P0[st.F.need]||8)*1.2+(P0.theory||8)*.6+rnd(0,6)+(st.K[2][st.F.f]?3:0);const q=Math.round(Math.min(30,base));
    const w={id:'my'+((G.myN=(G.myN||0)+1)),t,form:st.F.f,key:st.K[0],mo:st.M,ded:st.D,q,n:0,best:0};
    G.mywork.push(w);G.compM=G.month;myWorkAdd(w);if(st.D){setMood(st.D,moodOf(st.D)+15);bondAdd(G.pid,st.D,15);}
    addLog(`新作「${t}」（${st.F.l}・${st.K[0]}）を書き上げた${st.D?`。${nameOf(st.D)}に献呈`:''}。`);hpush(`新作「${t}」を書き上げた`);
    try{playMotif(st.M,PL().tim||'piano',.05);}catch(e){}
    modal('新作ができた',`<div class="headline">「${t}」</div>${st.F.l}・${st.K[0]}・${CTHEME.find(x=>x[0]===st.M)[1]}${st.D?`<br>献呈：${nameOf(st.D)}`:''}<br><br>出来ばえ：<b>${'★'.repeat(Math.max(1,Math.min(5,Math.round(q/6))))}</b><br><span class="pmeta">演奏会の演目に加わった。★4以上で3回演奏すると「代表作」になり、さらに評判が上がる。</span>`,null,'paper');save();render();};
  step1();
}
/* 演奏会：自作の評判 */
const _evalLineupCP=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupCP(p,L,opt);try{const w=(G.mywork||[]).find(x=>x.id===p.id);if(w){const b=Math.round((w.q/10+Math.min(2,w.n*.4)+(w.n>=3&&w.best>=4?1.5:0))*10)/10;r.q+=b;r.notes.push(`自作「${w.t}」${w.n>=3&&w.best>=4?'（代表作）':''}（+${b}）`);r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}}catch(e){}return r;};
const _concertResultCP=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultCP(p,L,ev,fi);try{const w=(G.mywork||[]).find(x=>x.id===p.id);if(w){w.n++;const s=ev&&ev.stars||0;w.best=Math.max(w.best,s);
  if(w.n===3&&w.best>=4){hpush(`自作「${w.t}」が代表作になった`);setTimeout(()=>cutin(G.pid,`「${w.t}」`,'代表作になった！'),900);}}}catch(e){}return r;};
const _startCP=start;
start=function(){try{for(const w of (G&&G.mywork)||[])myWorkAdd(w);}catch(e){}return _startCP();};
