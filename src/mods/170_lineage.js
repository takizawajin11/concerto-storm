/* =====================================================================
   師弟の系譜図：史実の師弟と、楽団で育てた弟子・卒業生を一本の系図に
   G.lineage = [[師, 弟子], ...]（楽団で生まれた師弟）
   ===================================================================== */
const LIN_H=[['bach','jcbach'],['haydn','beethoven'],['beethoven','czerny'],['czerny','liszt'],['salieri','beethoven'],['salieri','liszt'],['mozart','hummel'],['leopold','mozart'],
 ['liszt76','sauer'],['liszt76','rosenthal'],['leschetizky','paderewski'],['auer05','elman'],['auer05','zimbalist'],['joachim','huberman'],['hubay','vecsey'],['rimsky05','stravinsky'],
 ['taneyev','rachmaninoff'],['taneyev','scriabin'],['faure','ravel'],['faure','nboulanger'],['faure','enescu'],['mahler','walter'],['hasselmans','renie'],['porpora','farinelli'],['viotti','rode'],['regis','haru']];
const linRec=(t,s)=>{G.lineage=G.lineage||[];if(!G.lineage.some(([a,b])=>a===t&&b===s))G.lineage.push([t,s]);};
const _deshiMonthlyLN=deshiMonthly;
deshiMonthly=function(){const snap=Object.entries(G.deshi||{}).map(([s,d])=>[s,d.t]);_deshiMonthlyLN();try{for(const [s,t] of snap)if(!(G.deshi||{})[s]&&(G.deshiDone||{})[realId(s)])linRec(t==='you'?G.pid:realId(t),realId(s));}catch(e){}};
const _consGradLN=consGrad;
consGrad=function(k){const n=(G.grads||[]).length;const r=_consGradLN(k);try{const g=(G.grads||[])[n];const d=(G.consv||{})[k]&&G.consv[k].dir;if(g&&d)linRec(realId(d),g.id);}catch(e){}return r;};
function linName(id){if(id===G.pid)return P().name;const c=charById(id);if(c)return c.name;for(const s of Object.values(SCEN)){const x=s.chars.find(c=>c.id===id)||(s.players||{})[id];if(x)return x.name;}return null;}
function lineageOpen(){
  const mine=G.lineage||[];const known=new Set(['you',...G.members].map(x=>x==='you'?G.pid:realId(x)));
  const hist=LIN_H.filter(([a,b])=>known.has(a)||known.has(b));const edges=[...hist.map(e=>[...e,0]),...mine.map(e=>[...e,1])].filter(([a,b])=>linName(a)&&linName(b));
  if(!edges.length)return modal('師弟の系譜図','<div class="pmeta">まだ系図がない。弟子入りで免許皆伝を受けたり、音楽院から卒業生が出たりすると、ここに枝が伸びる。楽団にいる人の、史実の師弟も載る。</div>',null,'paper');
  const kids={},par={};for(const [a,b] of edges){(kids[a]=kids[a]||[]).push(b);par[b]=1;}
  const roots=[...new Set(edges.map(e=>e[0]))].filter(a=>!par[a]);const mk=new Set(mine.map(e=>e[1]));const seen=new Set();
  const node=(id,d)=>{if(seen.has(id)||d>6)return '';seen.add(id);const cs=(kids[id]||[]);
    return`<li><span class="ln${mk.has(id)?' mine':''}${known.has(id)?' here':''}">${portrait(id,26,'#c9a24a')}${linName(id)}</span>${cs.length?`<ul>${cs.map(c=>node(c,d+1)).join('')}</ul>`:''}</li>`;};
  modal('師弟の系譜図',`<div class="pmeta">金の枠＝楽団にいる人　赤い印＝楽団で育った弟子</div><ul class="lintree">${roots.map(r=>node(r,0)).join('')}</ul><div class="pmeta">楽団で生まれた師弟：${mine.length}組</div>`,null,'paper');
}
