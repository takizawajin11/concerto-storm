/* =====================================================================
   ハマる仕掛け：①運命の書（史実を変えろ） ②今月のお題（連続達成） ③入団の儀式と音楽家図鑑
   ===================================================================== */
/* ---------- ① 運命の書 ---------- */
Object.assign(DEATH,{
 mozart:{y:1791,m:12,t:'モーツァルトがウィーンで世を去った。35歳。『レクイエム』は未完のまま残された。'},
 paganini:{y:1840,m:5,t:'パガニーニがニースで世を去った。57歳。悪魔の弓は、ついに静かになった。'}});
const FATE={
 ascarlatti:{w:'A.スカルラッティ 幻の最後のオペラ',f:'オペラ',sl:[['voice','ソプラノ'],['cond','指揮'],['vn','コンサートマスター']],mo:'belcanto',fact:'ナポリ楽派の父アレッサンドロ・スカルラッティは、生涯に100を超えるオペラを書き、1725年に世を去った。'},
 marais:{w:'マレ『ヴィオール曲集 第6巻』',f:'室内楽',sl:[['vc','ヴィオール'],['pf','通奏低音']],mo:'largo',fact:'マラン・マレはヴィオール曲集を全5巻出版した。第6巻は、この世に存在しない。'},
 gluck:{w:'グルック 幻のオペラ『ヘルマンの戦い』',f:'オペラ',sl:[['voice','テノール'],['cond','指揮'],['br','金管']],mo:'classic',fact:'グルックは晩年、クロプシュトックの詩による『ヘルマンの戦い』を長く構想したが、楽譜は残らなかった。'},
 mozart:{w:'モーツァルト『レクイエム』作曲者自身による完成版',f:'宗教曲',sl:[['voice','ソプラノ'],['cond','指揮'],['cl','バセットホルン'],['tim','ティンパニ']],mo:'mozart',fact:'モーツァルトは『レクイエム』を書きかけのまま35歳で世を去り、弟子ジュスマイヤーが補筆して完成させた。'},
 bellini:{w:'ベッリーニ 幻の次回作オペラ',f:'オペラ',sl:[['voice','ソプラノ'],['voice','テノール'],['cond','指揮']],mo:'belcanto',fact:'ベッリーニは『清教徒』初演から8か月後、33歳で世を去った。'},
 malibran:{w:'マリブランのための幻のアリア集',f:'オペラ',sl:[['voice','メゾソプラノ'],['vn','コンサートマスター'],['cond','指揮']],mo:'belcanto',fact:'歌姫マリア・マリブランは落馬の傷がもとで、28歳で亡くなった。'},
 field:{w:'フィールド 幻の夜想曲集（新作）',f:'室内楽',sl:[['pf','ピアノ']],mo:'nocturne',fact:'「夜想曲（ノクターン）」というジャンルを生んだのはアイルランド出身のフィールド。ショパンはその様式を受け継いだ。'},
 hummel:{w:'フンメル 幻のピアノ協奏曲',f:'協奏曲',sl:[['pf','独奏ピアノ'],['cond','指揮'],['vn','コンサートマスター']],mo:'classic',fact:'モーツァルトの弟子フンメルは、ベートーヴェンと並び称されたピアニストだった。'},
 paganini:{w:'パガニーニ 幻のヴァイオリン協奏曲第7番',f:'協奏曲',sl:[['vn','独奏ヴァイオリン'],['cond','指揮'],['br','金管']],mo:'caprice24',fact:'パガニーニのヴァイオリン協奏曲は第6番まで知られている。'},
 mussorgsky:{w:'ムソルグスキー『ホヴァンシチナ』作曲者自身による完成版',f:'オペラ',sl:[['voice','バス'],['cond','指揮'],['br','金管']],mo:'promenade',fact:'ムソルグスキーは『ホヴァンシチナ』を未完のまま42歳で世を去り、リムスキー=コルサコフが補筆して完成させた。'},
 nrubinstein:{w:'N.ルビンシテインの幻の告別演奏会',f:'協奏曲',sl:[['pf','独奏ピアノ'],['cond','指揮']],mo:'scale',fact:'モスクワ音楽院を創立したニコライ・ルビンシテインは、1881年に療養先のパリで客死した。'},
 wagner:{w:'ワーグナー 幻の交響曲',f:'交響曲',sl:[['cond','指揮'],['br','ワーグナー・テューバ'],['vn','コンサートマスター'],['hp','ハープ']],mo:'ride',fact:'晩年のワーグナーは「これからは交響曲を書きたい」と語っていたが、1883年ヴェネツィアで世を去った。'},
 smetana:{w:'スメタナ 幻の交響詩',f:'管弦楽',sl:[['cond','指揮'],['fl','フルート'],['vn','コンサートマスター']],mo:'moldau',fact:'スメタナは聴力を失ったあとも、連作交響詩『わが祖国』を書き上げた。'},
 rimsky05:{w:'リムスキー=コルサコフ『金鶏』作曲者自身による初演',f:'オペラ',sl:[['voice','ソプラノ'],['cond','指揮'],['tim','打楽器']],mo:'bumblebee',fact:'最後のオペラ『金鶏』は検閲で上演を止められ、初演は作曲者が亡くなった翌年だった。'},
 karlowicz:{w:'カルウォーヴィチ 幻のヴァイオリン協奏曲第2番',f:'協奏曲',sl:[['vn','独奏ヴァイオリン'],['cond','指揮']],mo:'scale',fact:'ポーランドの作曲家カルウォーヴィチは、タトラ山地で雪崩に遭い、32歳で亡くなった。'},
 mahler:{w:'マーラー 交響曲第10番（作曲者自身による完成版）',f:'交響曲',sl:[['cond','指揮'],['va','ヴィオラ（冒頭の独白）'],['br','金管'],['hp','ハープ']],mo:'adagietto',fact:'マーラーは交響曲第10番を未完のまま、50歳で世を去った。'}
};
const fateHere=()=>Object.keys(FATE).filter(id=>DEATH[id]&&(SC.chars.some(c=>c.id===id)||id===G.pid)&&!(G.dead||[]).includes(id));
const fateLeft=id=>mIdx(DEATH[id].y,DEATH[id].m)-G.month;
const fateMine=id=>id===G.pid||isMember(id);
const fateSt=id=>{G.fate=G.fate||{};return G.fate[id]=G.fate[id]||{care:0,doc:-1,rest:-1};};
const fateChance=id=>Math.min(92,15+Math.round(fateSt(id).care*.8));
const fateNm=id=>id===G.pid?P().name:(charById(id)||{}).name||id;
function fateDoc(id){const s=fateSt(id),cost=Math.round(400*(1+(U_YEAR[G.sc]-1723)/200)*(G.flags.chal?1.5:1));
  if(s.doc===G.month)return toast('今月はもう名医を呼びました');if(P().money<cost)return toast(`お金が足りません（${fmt(cost)}fr）`);
  P().money-=cost;s.doc=G.month;s.care=Math.min(100,s.care+(G.flags.chal?12:15));addLog(`${fateNm(id)}のために名医を呼んだ（${fmt(cost)}fr）。`);save();render();fateBook();}
function fateRest(id){const s=fateSt(id);if(s.rest===G.month)return toast('今月はもう休ませています');
  s.rest=G.month;s.care=Math.min(100,s.care+10);if(id!=='you'&&id!==G.pid){setMood(id,moodOf(id)+6);G.fleet=G.fleet.map(f=>f.filter(x=>x!==id));}
  else P().stamina=Math.min(100,P().stamina+20);
  addLog(`${fateNm(id)}をこの月は休養させた。巡演には出られない。`);save();render();fateBook();}
function fateBook(){
  const ids=fateHere().sort((a,b)=>fateLeft(a)-fateLeft(b));
  const saved=Object.keys(G.fate||{}).filter(k=>G.fate[k].saved);
  modal('運命の書',`<div class="pmeta" style="margin-bottom:6px">史実では、この人たちは近いうちに世を去る。楽団に迎え、名医を呼び、休ませ、気分よく過ごさせれば、運命の夜を越えられるかもしれない。越えた者は、史実にない「幻の名曲」を残す。</div>`+
    (ids.length?ids.map(id=>{const L=fateLeft(id),s=fateSt(id),mine=fateMine(id);
      return`<div class="fbk${L<=12?' near':''}"><div>${portrait(id,40,'#8a2a3a')}</div><div style="flex:1"><b>${fateNm(id)}</b>　<span class="pmeta">史実の最期：${DEATH[id].y}年${DEATH[id].m}月（あと${L>=12?Math.floor(L/12)+'年':''}${L%12}か月）</span>
        <div class="fbar"><i style="width:${fateChance(id)}%"></i><span>運命を越える見込み ${mine?fateChance(id)+'%':'——（楽団にいないと救えない）'}</span></div>
        ${mine?`<div class="fbt"><button class="btn" data-fdoc="${id}">名医を呼ぶ</button><button class="btn" data-frest="${id}">今月は休ませる</button></div>`:''}
        <div class="pmeta">救えば：${FATE[id].w}</div></div></div>`;}).join(''):'<div class="pmeta">いま迫っている運命はない。</div>')+
    (saved.length?`<div class="sec-t">越えた運命</div>${saved.map(id=>`<div class="pmeta">✦ ${fateNm(id)}　→　${FATE[id].w}</div>`).join('')}`:''),null,'paper');
  setTimeout(()=>{document.querySelectorAll('[data-fdoc]').forEach(b=>b.onclick=()=>fateDoc(b.dataset.fdoc));document.querySelectorAll('[data-frest]').forEach(b=>b.onclick=()=>fateRest(b.dataset.frest));},50);
}
function fateMonthly(){
  for(const id of fateHere()){if(!fateMine(id))continue;const s=fateSt(id),L=fateLeft(id);
    if(id!==G.pid&&moodOf(id)>=80&&!G.flags.chal)s.care=Math.min(100,s.care+2);
    if(Object.keys(G.dream||{}).some(k=>{const d=DREAMS.find(x=>x.id===k);return d&&d.need.includes(id===G.pid?G.pid:realId(id));}))s.care=Math.min(100,s.care+1);
    if((L===24||L===12||L===3)&&s.warn!==L){s.warn=L;
      modal('運命の足音',`${portraitRow(id)}史実では、<b>${fateNm(id)}</b>は${DEATH[id].y}年${DEATH[id].m}月に世を去る。<b>あと${L}か月</b>。<br><br>いまの見込み：<b>${fateChance(id)}%</b><br><span class="pmeta">地図の「運命の書」から、名医を呼んだり休ませたりできる。</span>`,[{t:'運命の書を開く',cls:'gold',f(){setTimeout(fateBook,50);}},{t:'閉じる'}],'paper');}}
}
function fateNight(id,E){
  E=E||DEATH[id];const s=fateSt(id),ch=fateChance(id),ok=Math.random()*100<ch,F=FATE[id];
  return new Promise(res=>{
    modal('運命の夜',`${portraitRow(id)}${E.y}年${E.m}月。史実の、その夜が来た。<br>楽団の誰もが、${fateNm(id)}の枕元で息をのんでいる。<br><br><span class="pmeta">運命を越える見込み：${ch}%</span>`,[{t:'夜明けを待つ',cls:'gold',f(){
      if(typeof sfx==='function')sfx('gong');
      setTimeout(()=>{if(ok){s.saved=1;delete DEATH[id];G.fateSaved=(G.fateSaved||0)+1;
        if(id!==G.pid&&isMember(id))G.boost[id]=(G.boost[id]||0)+2;
        fateAddPiece(id);cutin(id===G.pid?G.pid:id,'史実を変えた！',`${fateNm(id)}、運命の夜を越える`);
        addLog(`史実を変えた：${fateNm(id)}は運命の夜を越えた。`);hpush(`史実を変えた：${fateNm(id)}、生きる`);
        modal('史実を変えた',`${portraitRow(id)}夜が明けた。<b>${fateNm(id)}</b>は目を開け、「書きかけの曲がある」とつぶやいた。<br><br><div class="dreamf">${F.fact}</div><div class="dreamr">・幻の名曲「${F.w}」が演奏会で選べるようになった${id!==G.pid?`<br>・${fateNm(id)}の全能力+2`:''}</div>`,null,'paper');res(true);}
      else{addLog(`${fateNm(id)}のために手を尽くしたが、運命は変わらなかった。`);res(false);}},1200);}}],'paper');
  });
}
function fateAddPiece(id){const F=FATE[id];const pid='fate_'+id;if(SC.rep.some(p=>p.id===pid))return;
  SC.rep.push(Pc(pid,`【幻】${F.w}`,F.f,F.sl.map(([r,l])=>Sl([r],l)),[.3,.6,.1],'ロマン',null,MOTIFS[F.mo]?F.mo:'scale','violin'));
  if(typeof CONC!=='undefined'&&id!==G.pid)CONC[pid]={sol:[id],t:'運命を越えた本人が弾く、幻の名曲'};}
const _historicalDeathsF=historicalDeaths;
historicalDeaths=function(){
  try{const d=ymd(G.month);for(const id of Object.keys(FATE)){const e=DEATH[id];if(!e||e.y!==d.y||e.m!==d.mo||(G.dead||[]).includes(id)||!fateMine(id))continue;
    const hold=DEATH[id];delete DEATH[id];G.flags.fatePending=G.flags.fatePending||[];G.flags.fatePending.push(id);
    fateNight(id,hold).then(ok=>{if(!ok){DEATH[id]=hold;if(id===G.pid){G.flags.pdeath=1;}else if(isMember(id))memberDies(id,hold.t);}G.flags.fatePending=(G.flags.fatePending||[]).filter(x=>x!==id);save();render();});}}catch(e){}
  return _historicalDeathsF();
};
const _startF=start;
start=function(){try{for(const id of Object.keys((G&&G.fate)||{}))if(G.fate[id].saved){delete DEATH[id];fateAddPiece(id);}}catch(e){}return _startF();};

/* ---------- ② 今月のお題 ---------- */
const ODAI=[
 {k:'star4',t:'演奏会で★4以上を取る'},{k:'star5',t:'演奏会で★5（歴史に残る一夜）を取る',hard:1},{k:'tour',t:'巡演で喝采以上を取る'},{k:'recruit',t:'新しい団員を1人迎える'},
 {k:'conc',t:'協奏曲を上演する'},{k:'sacred',t:'宗教曲かカンタータを上演する'},{k:'own',t:'支配下の街で演奏会を開く'},{k:'other',t:'まだ支配していない街で演奏会を開く'},
 {k:'big',t:'交響曲か楽劇を上演する'},{k:'duel',t:'一騎打ちに勝つ',hard:1}];
function odaiNew(){const pool=ODAI.slice().sort(()=>Math.random()-.5);const pk=[];for(const o of pool){if(pk.length>=3)break;if(o.hard&&pk.some(x=>x.hard))continue;pk.push(o);}
  G.odai={m:G.month,list:pk.map(o=>({k:o.k,t:o.t,hard:!!o.hard,done:false})),paid:false};}
function odaiHit(k){if(!G||!G.odai||G.odai.m!==G.month)return;const o=G.odai.list.find(x=>x.k===k&&!x.done);if(!o)return;o.done=true;
  const fr=o.hard?260:120;P().money+=fr;addXP(o.hard?14:6);toast(`お題達成：${o.t}（+${fr}fr）`);if(typeof sfx==='function')sfx('coin');
  if(G.odai.list.every(x=>x.done)&&!G.odai.paid){G.odai.paid=true;G.odaiStreak=(G.odaiStreak||0)+1;const s=G.odaiStreak,bonus=300*Math.min(5,s);P().money+=bonus;addXP(10*Math.min(5,s));
    hpush(`今月のお題を3つとも達成（${s}か月連続）`);setTimeout(()=>modal('今月のお題、すべて達成！',`<div class="headline">${s}か月連続達成</div>ボーナス +${fmt(bonus)}fr・名声+${10*Math.min(5,s)}<br><span class="pmeta">連続達成が続くほど、ボーナスは大きくなる（5か月連続で最大）。</span>`,null,'paper'),600);}
  save();}
const _memberMonthlyF2=memberMonthly;
memberMonthly=function(){
  try{if(G.odai&&G.odai.m<G.month&&!G.odai.paid&&G.odaiStreak){addLog(`今月のお題を逃し、${G.odaiStreak}か月の連続達成が途切れた。`);G.odaiStreak=0;}}catch(e){}
  _memberMonthlyF2();try{fateMonthly();}catch(e){}try{odaiNew();}catch(e){}};
const _concertResultF=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultF(p,L,ev,fi);try{const st=(ev&&ev.stars)||0;const k=P().city;
  if(st>=4)odaiHit('star4');if(st>=5)odaiHit('star5');if(p.form==='協奏曲')odaiHit('conc');if(['宗教曲','カンタータ'].includes(p.form))odaiHit('sacred');
  if(['交響曲','楽劇'].includes(p.form))odaiHit('big');if(G.owner[k]==='player')odaiHit('own');else odaiHit('other');}catch(e){}return r;};
const _uResultF2=uResult;
uResult=function(B){const r=_uResultF2(B);try{if(!B.practice&&['S','A','B'].includes(uRank(B)))odaiHit('tour');}catch(e){}return r;};
const _duelEndF=duelEnd;
duelEnd=function(){const won=D&&(D.rt?(RTS&&RTS.win):D.you>D.them);const r=_duelEndF.apply(this,arguments);try{if(won)odaiHit('duel');}catch(e){}return r;};

/* ---------- ③ 入団の儀式と音楽家図鑑 ---------- */
const ROSTER_ALL=(()=>{const s=new Set();for(const sc in SCEN){for(const c of SCEN[sc].chars)if(!/^grad/.test(c.id))s.add(c.id);for(const p in (SCEN[sc].players||{}))s.add(p);}return s;})();
let _cardQ=[],_cardOn=false;
function cardShow(){if(_cardOn||!_cardQ.length)return;if(!$('#modal').classList.contains('hidden')||!$('#scene').classList.contains('hidden')){setTimeout(cardShow,900);return;}_cardOn=true;const id=_cardQ.shift();const c=charById(id);if(!c){_cardOn=false;return cardShow();}
  const hs=typeof UHIST!=='undefined'?UHIST[realId(id)]:0;const st=Math.max(1,Math.min(5,hs||(c.lv>=8?5:c.lv>=6?4:c.lv>=4?3:2)));
  const sg=typeof sigOf==='function'?sigOf(id):null;const n=Object.keys(G.cards||{}).length;
  const d=document.createElement('div');d.className='cardov';
  d.innerHTML=`<div class="card3"><div class="cfront r${st}"><div class="cst">${'<i>★</i>'.repeat(st)}</div><div class="cpt">${portrait(realId(id),110,'#e6c56f')}</div><div class="cnm">${c.name}</div><div class="cin">${(typeof ILBL!=='undefined'&&ILBL[realId(id)])||SL(c.seat)}・${ci(c.city)?ci(c.city).name:''}</div>${sg?`<div class="csg">見せ場《${sg.n}》</div>`:''}<div class="cqt">「${c.join||c.line||''}」</div><div class="cno">音楽家図鑑 ${n}/${ROSTER_ALL.size}</div></div></div><div class="ctap">タップで閉じる</div>`;
  document.body.appendChild(d);if(typeof sfx==='function')sfx(st>=5?'fanfare':'coin');
  d.querySelectorAll('.cst i').forEach((s,i)=>setTimeout(()=>{s.classList.add('on');if(st>=4&&i===st-1&&typeof sigMusic==='function')sigMusic(realId(id));},500+i*260));
  d.onclick=()=>{d.remove();_cardOn=false;setTimeout(cardShow,120);};}
const _renderF=render;
render=function(){_renderF();try{if(!G)return;G.cards=G.cards||{};
  if(!G.flags.cardsInit){G.flags.cardsInit=1;if(G.month>0){for(const id of G.members)G.cards[realId(id)]=1;return;}}
  for(const id of G.members){const r=realId(id);if(G.cards[r])continue;G.cards[r]=1;odaiHit('recruit');if(!/^grad/.test(r))_cardQ.push(id);}
  if(_cardQ.length&&$('#scene').classList.contains('hidden'))setTimeout(cardShow,300);}catch(e){}};
function zukan(){const have=G.cards||{};const all=[...ROSTER_ALL];const n=all.filter(i=>have[i]).length;
  const byEra={};for(const sc in SCEN)byEra[sc]=SCEN[sc].chars.filter(c=>ROSTER_ALL.has(c.id));
  modal(`音楽家図鑑（${n}/${all.length}）`,`<div class="pmeta">楽団に迎えた音楽家が載る。時代をまたいで、すべての時代の遊びで集めた分が合わさる。</div>`+
    `<div class="zk">${all.filter(i=>have[i]).map(i=>`<span title="${(charById(i)||{}).name||''}">${portrait(i,34,'#c9a24a')}</span>`).join('')}</div>`+
    `<div class="pmeta">まだ会っていない音楽家：${all.length-n}人</div>`,null,'paper');}
/* 図鑑は時代をまたいで残す */
const ZK_KEY='concertoStormZukan';
const _saveF=save;
save=function(){const r=_saveF.apply(this,arguments);try{if(G&&G.cards){const z=JSON.parse(localStorage.getItem(ZK_KEY)||'{}');Object.assign(z,G.cards);localStorage.setItem(ZK_KEY,JSON.stringify(z));}}catch(e){}return r;};
const _zukanG=zukan;
zukan=function(){try{const z=JSON.parse(localStorage.getItem(ZK_KEY)||'{}');G.cards=Object.assign({},z,G.cards||{});}catch(e){}_zukanG();};

/* ---------- 地図の上：運命の書と今月のお題 ---------- */
const _mapHTMLF2=mapHTML;
mapHTML=function(){let h=_mapHTMLF2();try{
  if(!G.odai||G.odai.m!==G.month)odaiNew();
  const near=fateHere().filter(id=>fateLeft(id)<=36);const mineNear=near.filter(fateMine);
  const od=`<div class="odai"><b>今月のお題</b>${G.odaiStreak?`<span class="streak">🔥${G.odaiStreak}か月連続</span>`:''}${G.odai.list.map(o=>`<div class="${o.done?'ok':''}">${o.done?'✔':'□'} ${o.t}${o.hard?' <small>（難）</small>':''}</div>`).join('')}</div>`;
  const fb=near.length?`<button class="btn fatebtn" id="fateBtn">⏳ 運命の書<small>${mineNear.length?`楽団の${mineNear.map(fateNm).join('・')}に史実の最期が迫る`:`${near.map(fateNm).slice(0,3).join('・')}の運命が迫る`}</small></button>`:'';
  const zb=`<button class="btn zkbtn" id="zkBtn">音楽家図鑑<small>${Object.keys(G.cards||{}).length}/${ROSTER_ALL.size}</small></button>`;
  const i=h.indexOf('</div>')+6;h=h.slice(0,i)+od+fb+zb+h.slice(i);}catch(e){}return h;};
const _renderF2=render;
render=function(){_renderF2();const f=$('#fateBtn');if(f)f.onclick=fateBook;const z=$('#zkBtn');if(z)z.onclick=zukan;};
/* 結末にも */
const _legacyF=legacy;
legacy=function(){const o=_legacyF();try{const sv=Object.keys(G.fate||{}).filter(k=>G.fate[k].saved);for(const id of sv)o.L.unshift(`<b>史実を変えた</b>：${fateNm(id)}は運命の夜を越え、「${FATE[id].w}」を残した。`);if(sv.length)o.T.unshift('運命に抗う者');if((G.odaiStreak||0)>=6)o.T.push('お題の鬼');}catch(e){}return o;};
