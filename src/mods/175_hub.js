/* =====================================================================
   地図の「遊びの棚」：人間関係図・新作・大勝負・クイズ・系譜・年間まとめ・宿敵の批評家
   ===================================================================== */
const _mapHTMLHB=mapHTML;
mapHTML=function(){let h=_mapHTMLHB();try{
  const C0=typeof crit==='function'?crit():null,s=C0?critSt():null;const cm=G.compM!=null&&G.month-G.compM<3?`あと${3-(G.month-G.compM)}か月`:'書ける';
  const qn=G.quiz&&G.quiz.m===G.month?3-G.quiz.n:3;
  const hub=`<div class="hub">
    <button class="btn" data-hub="bond">👥 人間関係図</button>
    <button class="btn" data-hub="comp">✒️ 新作を書く<small>${cm}</small></button>
    <button class="btn" data-hub="bet">🎲 大勝負${G.bet?'<small>勝負中</small>':''}</button>
    <button class="btn" data-hub="quiz">🎵 聴き当て<small>残り${qn}問</small></button>
    <button class="btn" data-hub="lin">🌳 師弟の系譜</button>
    <button class="btn" data-hub="yr">📊 今年のまとめ</button>
  </div>${C0?`<button class="btn critbtn" data-hub="crit">${portrait(C0.id,24,'#8a2a3a')}宿敵の批評家 ${C0.n}<div class="cbar"><i style="width:${s.v}%"></i><span>評価 ${s.v}/100${s.won?'・唸らせた':''}</span></div></button>`:''}`;
  const m=h.match(/<button class="btn zkbtn"[\s\S]*?<\/button>/);h=m?h.replace(m[0],m[0]+hub):hub+h;}catch(e){}return h;};
const _renderHB=render;
render=function(){_renderHB();document.querySelectorAll('[data-hub]').forEach(b=>b.onclick=()=>({bond:bondMap,comp:composeOpen,bet:betOpen,quiz:quizOpen,lin:lineageOpen,yr:yrOpen,crit:criticInfo})[b.dataset.hub]());};
