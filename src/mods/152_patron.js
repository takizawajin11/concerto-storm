/* =====================================================================
   アキのパトロン運：舞台で客席を沸かせるほど運がたまり、ある日突然、大金持ちの後援者が現れる。
   ただし気まぐれで、アキが博打で負けたり空回りしたりすると、援助を打ち切ることもある。
   G.akiLuck 0〜100、G.patron = {n:名, amt:月々の額, left:残り月数}
   ===================================================================== */
const PATRONS={
 s1723:['ある公爵夫人','ヴェネツィアの豪商','ロンドンの大貴族'],
 s1781:['ウィーンの伯爵夫人','ボヘミアの大地主','銀行家の未亡人'],
 s1832:['パリの銀行家','ロスチャイルド家ゆかりの夫人','ロシアの公爵'],
 s1876:['モスクワの富豪の未亡人','鉄道で財をなした男爵','ブダペストの伯爵夫人'],
 s1905:['アメリカの鉄道王','ニューヨークの大富豪の夫人','パリの香水王']};
function patronLuck(n){if(!isMember('aki'))return;G.akiLuck=Math.max(0,Math.min(100,(G.akiLuck||0)+n));}
function patronSour(why){const P0=G.patron;if(!P0||Math.random()>.35)return;G.patron=null;
  addLog(`${P0.n}が「${why}と聞いて、がっかりしました」と援助を打ち切った。`);
  setTimeout(()=>modal('後援者が去った',`${portraitRow('aki')}<b>${P0.n}</b>から短い手紙が届いた。<br>「アキさんが${why}と聞きました。わたくしの援助は、今月かぎりといたします」<br><br><b>アキ</b>「……まあ、また次が見つかるって」`,null,'paper'),600);}
const _concertResultPT=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultPT(p,L,ev,fi);try{if((L||[]).some(id=>realId(id)==='aki')){const s=(ev&&ev.stars)||0;const nt=((ev&&ev.notes)||[]).join('');
  if(/アキの一発逆転/.test(nt))patronLuck(25);else if(s>=5)patronLuck(22);else if(s>=4)patronLuck(14);else if(/空回り/.test(nt)){patronLuck(-5);patronSour('大事な舞台で空回りした');}}}catch(e){}return r;};
const _uSimPT=uSim;
uSim=function(B,encore){const r=_uSimPT(B,encore);try{if(B.akiDone&&!B.akiLuckDone){B.akiLuckDone=1;patronLuck(10);}}catch(e){}return r;};
function patronMonthly(){
  if(!isMember('aki'))return;
  if(G.patron){const P0=G.patron;P().money+=P0.amt;P0.left--;if(P0.left<=0){G.patron=null;addLog(`${P0.n}の援助は、約束の期間を終えた。「またいつか、あの子の音を聴かせてくださいな」`);}return;}
  const L=G.akiLuck||0;if(L<60||Math.random()*100>L-40)return;
  const n=pick(PATRONS[G.sc]||PATRONS.s1876);const lump=Math.round((2500+L*50+rnd(0,2000))/100)*100;const amt=Math.round((200+L*4)/50)*50;
  if(typeof sfx==='function')sfx('fanfare');
  modal('突然の後援者',`${portraitRow('aki')}ある朝、立派な紋章入りの封筒が届いた。差出人は<b>${n}</b>。<br>「先日の演奏会で、あの若いヴァイオリン弾きの舞台を拝見しました。あれほど客席を熱くする才能は、めったにございません。ぜひ援助させてくださいませ」<br><br>一時金 <b>${fmt(lump)}fr</b>、さらに半年のあいだ毎月 <b>${fmt(amt)}fr</b>。<br><span class="pmeta">才能に惚れこんだ後援者は、音楽史によく登場する。チャイコフスキーはフォン・メック夫人から、一度も会わないまま13年間援助を受けた。ただし後援者は気まぐれ。アキが博打で負けたり舞台で空回りしたりすると、打ち切られることもある。</span>`,[
    {t:'ありがたく受ける',cls:'gold',f(){P().money+=lump;G.patron={n,amt,left:6};G.akiLuck=20;hpush(`${n}がアキの後援者になった（+${fmt(lump)}fr）`);cutin('aki','パトロン現る！',`${n}から ${fmt(lump)}fr`);save();render();}},
    {t:'丁重にお断りする<small>アキはふてくされる</small>',f(){G.akiLuck=40;setMood('aki',moodOf('aki')-10);addLog(`アキ「えーっ、もったいない！」`);}}],'paper');
}
const _memberMonthlyPT=memberMonthly;
memberMonthly=function(){_memberMonthlyPT();try{patronMonthly();}catch(e){}};
function patronInfo(){const L=G.akiLuck||0,P0=G.patron;
  modal('アキのパトロン運',`${portraitRow('aki')}<div class="cbar"><i style="width:${L}%"></i><span>パトロン運 ${L}/100</span></div>${P0?`いまの後援者：<b>${P0.n}</b>（毎月${fmt(P0.amt)}fr・あと${P0.left}か月）`:'いまは後援者がいない。'}<br><span class="pmeta">アキが演奏会で★4以上を取ったり、一発逆転を決めたりすると運がたまる。60を超えると、ある日突然、大金持ちの後援者から申し出が届くことがある。</span>`,null,'paper');}
const _mapHTMLPT=mapHTML;
mapHTML=function(){let h=_mapHTMLPT();try{if(isMember('aki')){const L=G.akiLuck||0,P0=G.patron;
  const b=`<button class="btn patbtn" data-pat="1">⭐ アキのパトロン運${P0?`<small>後援者：${P0.n}（あと${P0.left}か月）</small>`:''}<div class="cbar"><i style="width:${L}%"></i><span>${L}/100</span></div></button>`;
  const m=h.match(/<button class="btn zkbtn"[\s\S]*?<\/button>/);if(m)h=h.replace(m[0],m[0]+b);}}catch(e){}return h;};
const _renderPT=render;
render=function(){_renderPT();const b=document.querySelector('[data-pat="1"]');if(b)b.onclick=patronInfo;};
