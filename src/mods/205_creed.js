/* =====================================================================
   音楽観の論争：説得の途中で、相手が音楽観を問いただしてくる
   ・5つの論点（何を語るか／名人芸／誰のために／伝統と革新／国の音楽）。時代ごとに出る論点が違う
   ・答えは「あなたの信条」として残る（G.creed[論点]={s:立場,n:回数}）
       同じ立場を貫く → 同志には強く効き、初対面でも共鳴度が上がる
       立場を変える   → 「風見鶏」と見られて効きが落ちる
       反対の立場でも、楽理が相手を上回れば「筋は通っている」と認めさせられる
   ・案内が終わるまで（最初の2か月）は出さない
   ===================================================================== */
const CREED={
 form:{n:'音楽は何を語るか',a:'abs',b:'prog',la:'絶対音楽',lb:'標題音楽',
  qa:'音楽は音だけで完結するものだ。物語や絵の説明に使うのは、音楽を貶めることだと思わないかね？',
  qb:'音楽は詩や物語と結ばれてこそ、新しい世界を開く。形式だけの音楽は、もう古いと思わないか？',
  A:'音楽の中身は、鳴り響きながら動く形そのものです',sA:{s1832:'古典派の形式を重んじる人々の考え（のちに批評家ハンスリックが理論にまとめた）',d:'批評家ハンスリックが『音楽美論』（1854年）で唱えた考え'},
  B:'音楽は詩と結ばれて、言葉の届かないものを描きます',sB:{s1832:'ベルリオーズが『幻想交響曲』（1830年）で示した考え',d:'リストが交響詩で、ワーグナーが楽劇で示した考え'},M:'形式も詩情も、どちらも音楽の翼です'},
 virt:{n:'名人芸をどう見るか',a:'serve',b:'show',la:'作品への奉仕',lb:'名人芸',
  qa:'演奏家は作曲家のしもべだ。技を見せびらかして喝采をさらうのは、芸術ではないと思うが？',
  qb:'客が息をのむ超絶技巧こそ、演奏家の命だ。楽譜どおりに弾くだけなら、誰でもできると思わないか？',
  A:'演奏家は、作品に仕える者です',sA:{s1723:'楽譜に書かれた音を尊ぶ作曲家たちの考え',s1781:'グルックがオペラ改革で求めた姿勢（歌手の技より、劇と音楽）',d:'クララ・シューマンやヨアヒムが貫いた姿勢'},
  B:'誰にも真似のできない技が、音楽を新しい場所へ連れていきます',sB:{s1723:'ファリネッリらカストラートの、華麗な装飾歌唱',s1781:'クレメンティら鍵盤の名手たちが競った道',d:'パガニーニとリストが切り開いた道'},M:'技は、作品を輝かせるためにあります'},
 aud:{n:'音楽は誰のためにあるか',a:'art',b:'people',la:'芸術のために',lb:'聴衆のために',
  qa:'分かる者だけに分かればよい。客の好みに合わせて書くなど、堕落だと思わないか？',
  qb:'客が喜ばなければ、音楽に何の意味がある？ 難しいだけの曲は、作る側の自己満足ではないかね？',
  A:'音楽は、聴き手に媚びず高みを目指すものです',sA:{s1723:'バッハは楽譜の終わりに「ただ神の栄光のために」と記した',s1781:'流行より技の高みを目指した、J.S.バッハのような先人の姿勢',d:'19世紀に広まった「芸術のための芸術」という考え'},
  B:'音楽は、聴いてくれる人のためにあります',sB:'テレマンやヘンデルが、公開演奏会と興行で示した姿勢',M:'通も素人も、どちらも満足させるのが本物です'},
 trad:{n:'伝統か、革新か',a:'old',b:'new',la:'伝統',lb:'革新',
  qa:'先人の規則には理由がある。対位法も形式も学ばずに「新しさ」を名乗るのは、ただの無知ではないか？',
  qb:'規則は破るためにある。昨日と同じ音楽を書いて、何が芸術家だ？',
  A:'規則を知りつくしてこそ、音楽は自由になります',sA:'フックスの対位法の教科書『パルナッソス山への階梯』（1725年）以来の教え',
  B:'耳が喜ぶなら、それが新しい規則です',sB:{s1723:'モンテヴェルディが「第二の作法」で示した考え',s1781:'C.P.E.バッハら「多感様式」の人々の考え',s1832:'ベルリオーズやリストの考え',s1876:'ワーグナーが唱えた「未来の音楽」',d:'ドビュッシーが語ったとされる考え（「楽しみこそが規則」）'},M:'伝統を土台に、新しい家を建てるのです'},
 nat:{n:'国の音楽か、普遍の言葉か',a:'world',b:'nation',la:'普遍の言葉',lb:'国の音楽',
  qa:'音楽は国境を越える言葉だ。民謡だの国民性だのにこだわるのは、視野が狭いと思わないか？',
  qb:'我々の民謡、我々の言葉から生まれた音楽こそ本物だ。よその国の真似をして、何になる？',
  A:'音楽は、どの国の人にも通じる言葉です',sA:'ウィーン古典派が目指した普遍性',
  B:'土地の歌から、その国だけの音楽が生まれます',sB:'スメタナ、ドヴォルザークら国民楽派の考え',M:'土地に根ざしてこそ、世界に届きます'}};
const CREED_ERA={s1723:['trad','aud','virt'],s1781:['trad','aud','virt'],s1832:['form','virt','trad','aud'],s1876:['form','trad','nat','virt','aud'],s1905:['trad','nat','aud','form']};
/* 史実がはっきりしている人の立場 */
const CREED_X={
 brahms:{form:'abs',trad:'old',virt:'serve'},wagner:{form:'prog',trad:'new',aud:'art'},liszt:{form:'prog',virt:'show',trad:'new'},liszt76:{form:'prog',trad:'new'},
 clara:{virt:'serve',form:'abs'},clara76:{virt:'serve',form:'abs',trad:'old'},joachim:{virt:'serve',form:'abs'},paganini:{virt:'show',aud:'people'},
 chopin:{aud:'art',form:'abs'},berlioz:{form:'prog',trad:'new'},schumann:{virt:'serve',trad:'new'},thalberg:{virt:'show'},czerny:{trad:'old'},cherubini:{trad:'old',aud:'art'},
 bach:{trad:'old',aud:'art'},handel:{aud:'people'},telemann:{aud:'people',trad:'new'},rameau:{trad:'old'},fux:{trad:'old'},couperin:{aud:'art'},farinelli:{virt:'show'},gay:{aud:'people',trad:'new'},pepusch:{trad:'old'},
 mozart:{aud:'people'},haydn:{trad:'old'},beethoven:{trad:'new',aud:'art'},gluck:{virt:'serve',trad:'new'},albrechtsberger:{trad:'old'},schikaneder:{aud:'people'},
 bruckner:{form:'abs',trad:'old'},verdi:{aud:'people',nat:'nation'},tchaikovsky:{form:'prog',nat:'world'},dvorak:{nat:'nation',form:'abs'},smetana:{nat:'nation',form:'prog'},sarasate:{virt:'show',nat:'nation'},
 saintsaens:{trad:'old',form:'abs'},franck:{form:'abs'},mussorgsky:{nat:'nation',trad:'new'},rimsky:{nat:'nation'},glinka:{nat:'nation'},strauss2:{aud:'people'},offenbach:{aud:'people'},sullivan:{aud:'people'},
 mahler:{form:'prog',trad:'new',aud:'art'},rstrauss:{form:'prog'},schoenberg:{trad:'new',aud:'art'},ravel:{trad:'new'},satie:{trad:'new',aud:'people'},stravinsky:{trad:'new',nat:'nation'},
 bartok:{nat:'nation',trad:'new'},sibelius:{nat:'nation'},elgar:{nat:'nation',trad:'old'},puccini:{aud:'people'},rachmaninoff:{trad:'old'},scriabin:{trad:'new',aud:'art'},kodaly:{nat:'nation'},janacek:{nat:'nation',trad:'new'},lehar:{aud:'people'}};
function creedOf(c,ax){
  const x=CREED_X[c.id];if(x&&x[ax])return x[ax];const lk=c.likes||{};
  if(ax==='trad')return c.theory>=c.impro+2?'old':c.impro>=c.theory+2?'new':null;
  if(ax==='virt')return c.tech>=c.expr+2?'show':c.expr>=c.tech+2?'serve':null;
  if(ax==='aud'){const s=typeof STAGE!=='undefined'&&STAGE[c.id];if(s)return s[0]==='street'?'people':'art';return(lk.fame||0)>=1.2?'people':(lk.theory||0)>=1.2?'art':null;}
  if(ax==='form')return(lk.theory||0)>=1.2?'abs':(lk.passion||0)>=1.2?'prog':null;
  return null;}
const creedLabel=(ax,s)=>{const C=CREED[ax];return s===C.a?C.la:C.lb;};
const creedSrc=(v)=>typeof v==='string'?v:(v[G.sc]||v.d);
const creedMine=()=>{G.creed=G.creed||{};return G.creed;};
const creedReady=()=>G&&G.flags&&!G.flags.chal&&!(typeof tutOn==='function'&&tutOn()&&G.month<2);
/* 初対面でも、信条が知られていれば共鳴度が動く */
const _openPersuadeCR=openPersuade;
openPersuade=function(t){_openPersuadeCR(t);try{if(!S||S.t!==t||t.isCity||!creedReady())return;const my=creedMine();let v=0;const same=[],diff=[];
  for(const ax of(CREED_ERA[G.sc]||[])){const m=my[ax];if(!m||m.n<2)continue;const ts=creedOf(t,ax);if(!ts)continue;if(ts===m.s){v+=6;same.push(creedLabel(ax,m.s));}else{v-=5;diff.push(creedLabel(ax,ts));}}
  if(v){S.meter=clamp(S.meter+v,-60,90);setTimeout(()=>{try{bub('them',same.length?`「あなたは${same.join('・')}の人だと聞いている。${diff.length?'……気に入らない点もあるがね。':'話が合いそうだ。'}」`:`「あなたの評判は聞いている。わたしは${diff.join('・')}の側でね。」`,Math.abs(v),v>0?'weak':'resist',`あなたの信条 ${v>0?'+':''}${v}`);upd();}catch(e){}},500);}
  const row=document.querySelector('#scene .rinfo');const txt=creedLine();if(row&&txt)row.insertAdjacentHTML('beforebegin',`<div class="pmeta crline">あなたの信条：${txt}</div>`);}catch(e){}};
function creedLine(){const my=creedMine();return Object.keys(my).filter(ax=>CREED[ax]&&my[ax].n>=1).map(ax=>`${creedLabel(ax,my[ax].s)}${my[ax].n>=2?`（${my[ax].n}）`:''}`).join('・');}
/* 2小節目の返事の代わりに、相手が問いただす */
const _counterCR=counter;
counter=function(){try{if(S&&!S.done&&!S.t.isCity&&!S.creed&&S.round===1&&S.meter>-90&&creedReady()){
    const t=S.t,axs=(CREED_ERA[G.sc]||[]).filter(ax=>creedOf(t,ax));if(axs.length){S.creed=1;return creedAsk(pick(axs));}}}catch(e){}
  return _counterCR();};
function creedAsk(ax){
  const t=S.t,C=CREED[ax],ts=creedOf(t,ax),my=creedMine()[ax];
  bub('them',`「ひとつ聞かせてほしい。${ts===C.a?C.qa:C.qb}」`,0,'',`${t.name}が問う：${C.n}`);
  const cm=$('#cmds');cm.style.display='none';
  const box=document.createElement('div');box.id='creedQ';box.className='creedq';
  box.innerHTML=`<div class="crh">🗣 論争：<b>${C.n}</b>${my?`<span>これまでのあなた：${creedLabel(ax,my.s)}（${my.n}回）</span>`:''}</div>
    <button class="btn" data-cr="${C.a}"><b>${C.la}</b>　${C.A}<small>${creedSrc(C.sA)}</small></button>
    <button class="btn" data-cr="${C.b}"><b>${C.lb}</b>　${C.B}<small>${creedSrc(C.sB)}</small></button>
    <button class="btn" data-cr="mid"><b>どちらも</b>　${C.M}<small>立場は決めない。楽理か表現が高ければ、うまくかわせる</small></button>
    <div class="pmeta">相手と同じ立場なら大きく共鳴する。違う立場でも、楽理（あなた ${P().theory}／相手 ${t.theory}）で上回れば認めさせられる。立場を変えると信用を落とす。</div>`;
  cm.insertAdjacentElement('beforebegin',box);
  box.querySelectorAll('[data-cr]').forEach(b=>b.onclick=()=>creedAnswer(ax,b.dataset.cr));
  if(!G.flags.creedInfo){G.flags.creedInfo=1;setTimeout(()=>modal('音楽観の論争',`名のある音楽家は、説得の途中で<b>あなたの音楽観</b>を問いただしてくる。<br><br>・答えは<b>あなたの信条</b>として世間に知られる。<br>・同じ立場を貫けば、同志には初対面から話が通じやすくなる。<br>・相手によって言うことを変えると、<b>風見鶏</b>と見られる。<br><br><span class="pmeta">19世紀後半のドイツでは、ブラームス派とワーグナー派が「音楽は何を語るか」をめぐって激しく争った。</span>`,null,'paper'),400);}
}
function creedAnswer(ax,side){
  const t=S.t,C=CREED[ax],ts=creedOf(t,ax),all=creedMine(),my=all[ax];let val,line,cls,lab;
  if(side==='mid'){const ok=P().theory>=11||P().expr>=13;val=ok?10:-5;cls=ok?'':'resist';lab='どちらも';
    bub('you',`「${C.M}」`,6,'','論争');line=ok?'うまいことを言う。……まあ、よかろう。':'どっちつかずだな。自分の考えはないのかね。';}
  else{const flip=!!(my&&my.s!==side),keep=my&&my.s===side?my.n:0,agree=side===ts;lab=creedLabel(ax,side);
    bub('you',`「${side===C.a?C.A:C.B}」`,10,'','論争：'+lab);
    if(agree){val=22+Math.min(10,keep*3);line=keep>=2?'あなたは前からそう言っていると聞く。信念の人だ。':'同じ考えの人に会えるとは。話が早い。';cls='weak';
      if(flip){val=5;line='……先日は逆のことを言っていたと聞いたが。相手に合わせているだけではないかね。';cls='resist';}}
    else{const win=P().theory+Math.min(3,keep)>=t.theory+1;val=win?12:-14;cls=win?'':'back';
      line=win?'……ふむ。考えは違うが、筋は通っている。':'話にならんな。もう少し勉強してから来たまえ。';
      if(flip){val-=8;line='先日は逆のことを言っていたそうだな。風見鶏の言うことは信用できん。';cls='back';}}
    if(flip){all[ax]={s:side,n:1};G.flags.creedFlip=(G.flags.creedFlip||0)+1;}else if(my)my.n++;else all[ax]={s:side,n:1};
    /* 団員も聞いている */
    try{let up=0,dn=0;for(const id of G.members){const c=charById(id);if(!c)continue;const s=creedOf(c,ax);if(!s)continue;if(s===side){setMood(id,moodOf(id)+2);up++;}else{setMood(id,moodOf(id)-2);dn++;}}
      if(up||dn)toast(`団員の反応：うなずいた${up}人・顔をしかめた${dn}人`);}catch(e){}
    try{if(all[ax].n===4){addXP(15);hpush(`「${lab}」の旗手と呼ばれる`);toast(`あなたは「${lab}」の旗手と呼ばれるようになった（名声+15）`);}}catch(e){}}
  const q=$('#creedQ');if(q)q.remove();$('#cmds').style.display='';
  setTimeout(()=>{try{bub('them',`「${line}」`,Math.abs(val),cls,`${t.name}　共鳴度 ${val>=0?'+':''}${val}`);
    if(val>=0){S.sy=(S.sy||0)+val;S.ny=(S.ny||0)+1;}else{S.st=(S.st||0)-val;S.nt=(S.nt||0)+1;}
    S.meter=clamp(S.meter+val,-100,100);S.round++;S.busy=false;upd();save();
    if(S.meter>=100)return setTimeout(()=>finish('win'),500);if(S.meter<=-100)return setTimeout(()=>finish('break'),500);}catch(e){}},600);
}
/* 結末の称号 */
const _legacyCR=legacy;
legacy=function(){const o=_legacyCR();try{const my=creedMine();for(const ax of Object.keys(my))if(CREED[ax]&&my[ax].n>=4)o.T.push(`${creedLabel(ax,my[ax].s)}の旗手`);
  if((G.flags.creedFlip||0)>=4)o.L.push('相手によって言うことを変える「風見鶏」とも噂された。');}catch(e){}return o;};
/* 遊びの棚に「信条」 */
function creedOpen(){const my=creedMine(),axs=CREED_ERA[G.sc]||[];
  modal('あなたの信条',`説得の途中の論争で答えた立場が、あなたの信条として世間に知られている。<div class="saga">${axs.map(ax=>{const C=CREED[ax],m=my[ax];
    return`<div class="sgera on"><div class="sgb"><b>${C.n}</b><div class="crbar"><span class="${m&&m.s===C.a?'on':''}">${C.la}</span><i>${m?`${m.n}回`:'未表明'}</i><span class="${m&&m.s===C.b?'on':''}">${C.lb}</span></div></div></div>`;}).join('')}</div>
    <div class="pmeta">2回以上つらぬいた立場は、初対面の相手にも伝わる（同志 +6／反対の立場 −5）。4回で「旗手」と呼ばれる。</div>`,null,'paper');}
const _mapHTMLCR=mapHTML;
mapHTML=function(){let h=_mapHTMLCR();try{if(creedReady()&&Object.keys(creedMine()).length)h=h.replace(/(<details class="shelf"[^>]*>[\s\S]*?<div class="hub">)/,'$1<button class="btn" id="creedBtn">🗣 信条</button>');}catch(e){}return h;};
const _renderCR=render;
render=function(){_renderCR();const b=$('#creedBtn');if(b)b.onclick=creedOpen;};
