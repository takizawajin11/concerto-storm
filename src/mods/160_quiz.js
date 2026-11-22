/* =====================================================================
   聴き当てクイズ：代表曲の一節を聴いて、作曲者・演奏者を当てる（月に3問まで）
   ===================================================================== */
function quizPool(){const ids=Object.keys(SIGM).filter(id=>MOTIFS[SIGM[id]]&&(SCEN[G.sc].chars.some(c=>c.id===id)||Object.values(SCEN).some(s=>s.chars.some(c=>c.id===id))));
  const seen=new Set(),out=[];for(const id of ids){const m=SIGM[id];if(seen.has(m))continue;seen.add(m);out.push(id);}return out;}
const QZ_PIECE={caprice24:'『24のカプリース』第24番',campanella:'『ラ・カンパネッラ』',nocturne:'夜想曲',surprise:'交響曲第94番「驚愕」',beethoven5:'交響曲第5番「運命」',tell:'『ウィリアム・テル』序曲',
  danube:'『美しく青きドナウ』',swan:'『白鳥の湖』',ride:'『ワルキューレの騎行』',adagietto:'交響曲第5番のアダージェット',rite:'『春の祭典』',rach2:'ピアノ協奏曲第2番',danse:'『死の舞踏』',
  gymno:'『ジムノペディ』',bach:'フーガ',hallelujah:'「ハレルヤ」',devil:'『悪魔のトリル』',spring:'『四季』の「春」',lullaby:'『子守歌』',verdi:'オペラの名旋律',zarathustra:'『ツァラトゥストラはかく語りき』',
  faune:'『牧神の午後への前奏曲』',mozart:'アイネ・クライネ・ナハトムジーク',finlandia:'『フィンランディア』',moldau:'『モルダウ』',promenade:'『展覧会の絵』のプロムナード',bumblebee:'『熊蜂の飛行』',
  cancan:'『天国と地獄』のカンカン',habanera:'ハバネラ',mendvc:'ヴァイオリン協奏曲 ホ短調',diesirae:'「怒りの日」',belcanto:'ベルカントのアリア',alphorn:'交響曲第1番のアルペンホルン',bvc:'ヴァイオリン協奏曲'};
function quizOpen(){
  G.quiz=G.quiz||{m:-1,n:0,ok:0,streak:0};if(G.quiz.m!==G.month){G.quiz.m=G.month;G.quiz.n=0;}
  if(G.quiz.n>=3)return toast('今月のクイズはおしまい。来月また挑もう');
  const pool=quizPool();if(pool.length<4)return toast('問題が足りない');
  const ans=pick(pool);const opts=[ans];while(opts.length<4){const x=pick(pool);if(!opts.includes(x))opts.push(x);}opts.sort(()=>Math.random()-.5);
  const nm=id=>{for(const s of Object.values(SCEN)){const c=s.chars.find(c=>c.id===id)||(s.players||{})[id];if(c)return c.name;}return id;};
  const play=()=>{try{playMotif(SIGM[ans],'piano',.05);}catch(e){}};window._qzPlay=play;
  G.quiz.n++;play();
  modal(`聴き当てクイズ（今月${G.quiz.n}/3問目）`,`🎵 この一節は、誰の音楽？<br><br><button class="btn" style="width:100%;margin:6px 0" onclick="window._qzPlay&&window._qzPlay()">▶ もう一度聴く</button><span class="pmeta">連続正解で報酬が増える（いま${G.quiz.streak}連続）。</span>`,
    opts.map(id=>({t:nm(id),f(){
      const ok=id===ans;if(ok){G.quiz.ok++;G.quiz.streak++;const fr=60*Math.min(5,G.quiz.streak);P().money+=fr;addXP(2);if(typeof sfx==='function')sfx('coin');}else{G.quiz.streak=0;if(typeof sfx==='function')sfx('lose');}
      setTimeout(()=>modal(ok?'正解！':'残念……',`${portraitRow(ans)}正解は<b>${nm(ans)}</b>。${QZ_PIECE[SIGM[ans]]?`<br>曲は${QZ_PIECE[SIGM[ans]]}。`:''}${ok?`<br><br>+${60*Math.min(5,G.quiz.streak)}fr（${G.quiz.streak}連続正解）`:''}`,G.quiz.n<3?[{t:'次の問題',cls:'gold',f(){setTimeout(quizOpen,50);}},{t:'閉じる'}]:null,'paper'),80);save();}})),'paper');
}
