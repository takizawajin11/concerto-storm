/* =====================================================================
   調整：Lvが戦いにきちんと効くように／見せ場は控えめに／抜け道をふさぐ
   ===================================================================== */
/* Lv1上がるごとに攻め+2%、気力+1、8Lvごとに守り+1（従来の「10Lvごとに全能力+1」はそのまま） */
const _uAtkB=uAtk;uAtk=function(B,u){return _uAtkB(B,u)*(1+(Math.min(99,ulv(u.id))-1)*.02);};
const _umaxB=umax;umax=function(id){return _umaxB(id)+(id==='you'?0:Math.floor(ux(id).lv/2));};
const _udefB=udef;udef=function(id){return _udefB(id)+(id==='you'?Math.floor(plv()/3):Math.floor(ux(id).lv/8));};
/* 免許皆伝は一人一度まで */
const _deshiPickB=deshiPick;
deshiPick=function(id){G.deshiDone=G.deshiDone||{};if(G.deshiDone[realId(id)])return modal('修業ずみ',`${nameOf(id)}はすでに免許皆伝を受けています。これ以上の弟子入りはできません。`,null);return _deshiPickB(id);};
const _deshiMonthlyB=deshiMonthly;
deshiMonthly=function(){const before=Object.keys(G.deshi||{});_deshiMonthlyB();G.deshiDone=G.deshiDone||{};for(const s of before)if(!(G.deshi||{})[s]&&(G.boost[s]||0)>0&&G.members.includes(s))G.deshiDone[realId(s)]=1;};
/* 挑戦状の対戦で経験がもらえるのは月に一度まで */
const _uResultB=uResult;
uResult=function(B){
  if(B.challenge&&G.chMon===G.month){const g=gainExp,a=addXP;gainExp=()=>null;addXP=()=>{};try{const r=_uResultB(B);return r;}finally{gainExp=g;addXP=a;}}
  if(B.challenge)G.chMon=G.month;return _uResultB(B);
};
/* 大編成で押し切りすぎないよう、楽団が5人以上なら大御所の舞台に聴衆（批評家）が増える */
const _nodeEnemiesB=nodeEnemies;
nodeEnemies=function(k,nk,step){const out=_nodeEnemiesB(k,nk,step);const n=Math.ceil(((G.fleet&&G.fleet[0]?G.fleet[0].length:0)-4)/2);
  if(n>0){const mult=cityMult(k)*(1+step*.12)*(nk==='Z'?1.1:.9);for(let i=0;i<n;i++)out.push(enemyGen(pick(['critic','critic','heckler']),mult));}
  return out;};
/* 一騎打ち：連打だけで勝てないよう、相手の自信と平常心を2倍に（持ち時間はそのまま） */
const _rtStartB=rtStart;
rtStart=function(){_rtStartB();const R=RTS;if(!R)return;R.hpMax*=2;R.hp=R.hpMax;R.mpMax*=2;R.mp=R.mpMax;rtUpd();};
