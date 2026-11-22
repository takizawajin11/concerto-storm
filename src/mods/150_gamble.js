/* =====================================================================
   興行の大勝負と、ハルの弟アキ（スター性と博打好き）
   G.bet = {k:街, stake:賭け金, m:月}
   ===================================================================== */
function betOpen(){
  const k=P().city;if(G.bet)return toast(`${ci(G.bet.k).name}の大勝負がまだ決着していない`);
  const big=[1000,3000,8000];const aki=isMember('aki');
  modal('興行の大勝負',`${ci(k).name}いちばんの大劇場を、借金して一夜だけ押さえる。<br>次に<b>この街で開く演奏会</b>の出来しだいで、<br>・★4以上：賭け金の<b>2.5倍</b>が入り、名声も大きく上がる<br>・★3：とんとん<br>・★2以下：賭け金を<b>まるごと失う</b><br>${aki?'<br><b>アキ</b>「兄さんには内緒で、全部賭けちゃおうよ」<br><span class="pmeta">アキが出演すると、★3でも勝ちになる。</span>':''}<br><span class="pmeta">手持ちが足りなければ借金になる。</span>`,
    big.map(s=>({t:`${fmt(s)}fr 賭ける`,cls:s===8000?'crim':'',f(){G.bet={k,stake:s,m:G.month};P().money-=s;addLog(`${ci(k).name}で${fmt(s)}frを賭けた大勝負の興行を打つ。`);save();render();}})).concat([{t:'やめておく'}]),'paper');
}
const _concertResultGB=concertResult;
concertResult=function(p,L,ev,fi){const r=_concertResultGB(p,L,ev,fi);try{
  if(G.bet&&G.bet.k===P().city){const s=(ev&&ev.stars)||0,b=G.bet;G.bet=null;const aki=(L||[]).some(id=>realId(id)==='aki');const win=s>=4||(aki&&s>=3);
    if(win){const pay=Math.round(b.stake*2.5);P().money+=pay;addXP(Math.round(b.stake/100));hpush(`大勝負に勝った（+${fmt(pay)}fr）`);setTimeout(()=>{cutin(aki?'aki':G.pid,'大勝負に勝った！',`+${fmt(pay)}fr`);if(typeof sfx==='function')sfx('coin');},800);}
    else if(s===3){P().money+=b.stake;addLog('大勝負はとんとんに終わった。');}
    else{hpush(`大勝負に負けた（-${fmt(b.stake)}fr）`);setTimeout(()=>{modal('大勝負に負けた',`客席はまばら、批評は冷たい。${fmt(b.stake)}frが消えた。<br><span class="pmeta">次こそは……。</span>`,null,'paper');if(typeof sfx==='function')sfx('lose');},800);}}}catch(e){}return r;};
/* ---------- アキ ---------- */
for(const sc in SCEN){const S=SCEN[sc];if(S.chars.some(x=>x.id==='aki'))continue;
  S.chars.push(C('aki','アキ','Aki',S.cities[0],'コンサートマスター','名人芸',3,[9,9,13,5],true,'impro',[.6,1.2,.6,.7,1.5],'caprice24','violin','その場で決める即興演奏','一曲で、全部ひっくり返してみせるよ。','未来の大穴を、あなたの楽団に。','時の扉の向こうから来た、ハルの弟。スター性は抜群だが、博打好きで気分屋。調子のいい夜には誰にも止められない。'));}
Object.assign(XTYPES,{aki:['vn','pf']});Object.assign(TR,{aki:{h:'wild',hc:'#2a1a10',b:'none',coat:'#8a1a2a'}});Object.assign(GROW,{aki:'late'});
if(typeof UHIST!=='undefined')UHIST.aki=3;QUIRK.aki=['gamble'];QDEF.gamble='博打好き';
SIG.aki=['一発逆転','ここからが本番だよ！','gold'];SIGM.aki='caprice24';
const _poolCharsAK=poolChars;poolChars=function(){const a=_poolCharsAK();return G&&G.flags&&G.flags.aki?a:a.filter(c=>c.id!=='aki');};
const _guestSrcAK=guestSrc;guestSrc=function(era,id){if(id==='aki')return null;return _guestSrcAK(era,id);};
/* 演奏会：負けそうな夜ほど燃える */
const _evalLineupAK=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineupAK(p,L,opt);try{opt=opt||{};if(L.some((id,i)=>realId(id)==='aki'&&opt.standIn!==i)&&!opt.preview){
  const low=r.stars<=2;G.flags.akiRoll=G.flags.akiRoll||{};const key=p.id+'|'+G.month;if(G.flags.akiRoll[key]==null)G.flags.akiRoll[key]=Math.random();const roll=G.flags.akiRoll[key];
  if(low&&roll<.5){r.q+=4.5;r.notes.push('アキの一発逆転！ 崖っぷちの夜に、客席が総立ちになった（+4.5）');}
  else if(low){r.q-=.5;r.notes.push('アキが大技を狙って空回りした（-0.5）');}
  else if(roll<.3){r.q+=1.5;r.notes.push('アキのスター性で、客席の熱が一段上がった（+1.5）');}
  r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}}catch(e){}return r;};
/* 巡演：味方が押されているほど、アキの見せ場が強い */
const _uSimAK=uSim;
uSim=function(B,encore){const ret=_uSimAK(B,encore);try{const u=B.us.find(x=>realId(x.id)==='aki'&&x.hp>0);if(u&&!B.akiDone){const down=B.us.filter(x=>x.hp<=x.max*.35).length;if(down>=Math.max(1,Math.floor(B.us.length/2))||Math.random()<.15){B.akiDone=1;
  B.ev.push({k:'phase',txt:'アキの一発逆転'});B.ev.push({k:'skip',txt:'<b>アキ</b>「ここからが本番だよ！」'});
  for(const e of B.en.filter(e=>e.hp>0)){const d=Math.round(e.max*.35);e.hp=Math.max(0,e.hp-d);u.dealt+=d;B.ev.push({k:'hit',u:u.i,e:B.en.indexOf(e),d,crit:true,txt:'一発逆転',kill:e.hp<=0});}}}}catch(e){}return ret;};
/* 月ごとの博打 */
function akiMonthly(){
  G.flags.akiRoll={};
  if(!isMember('aki')){
    if(G.flags.aki||!isMember('haru')||Math.random()>.25)return;
    G.flags.aki=1;const c=charById('aki');c.city=P().city;
    modal('時の扉から：ハルの弟',`${portraitRow('aki')}扉がまた開いた。ヴァイオリンケースを振り回しながら、若者が飛び込んでくる。<br><br><b>アキ</b>「兄さん、やっぱりここにいた！ ぼくも入れてよ。損はさせないって」<br><br><span class="pmeta">${c.trivia}</span>`,[
      {t:'楽団に迎える',cls:'gold',f(){ens5();G.members.push('aki');G.sal.aki=35;setMood('aki',95);bondOf('haru','aki');addLog('ハルの弟、アキが楽団に加わった。');hpush('アキ、時の扉から入団');render();}},
      {t:'今はまだ',f(){G.flags.aki=0;addLog('アキは「ちぇっ」と言って、扉の向こうへ戻っていった。');}}]);return;}
  if(Math.random()>.3)return;const s=Math.max(200,Math.round(Math.abs(P().money)*.2/100)*100);
  modal('アキの賭け',`${portraitRow('aki')}<b>アキ</b>「街のカード賭博で、いい勝負があるんだ。${fmt(s)}fr貸してよ。倍にして返すから！」`,[
    {t:'乗ってやる<small>勝てば2倍、負ければ失う</small>',cls:'crim',f(){const w=Math.random()<.5;if(w){P().money+=s;setMood('aki',moodOf('aki')+10);if(typeof patronLuck==='function')patronLuck(5);addLog(`アキが賭けに勝った（+${fmt(s)}fr）。「ほらね！」`);toast(`アキが勝った！ +${fmt(s)}fr`);}
      else{P().money-=s;setMood('aki',moodOf('aki')-5);if(typeof patronSour==='function')patronSour('賭けに負けた');addLog(`アキが賭けに負けた（-${fmt(s)}fr）。「……次は勝つから」`);toast(`アキが負けた…… -${fmt(s)}fr`);}save();render();}},
    {t:'やめさせる<small>アキは少しすねる</small>',f(){setMood('aki',moodOf('aki')-6);if(isMember('haru'))addLog('ハルが「やめておけ」とアキの肩を叩いた。');}}],'paper');
}
const _memberMonthlyAK=memberMonthly;
memberMonthly=function(){_memberMonthlyAK();try{akiMonthly();}catch(e){}};
DREAMS.push({id:'harualki',need:['haru','aki'],t:'兄弟、時を越えて',h:'時の扉から来た兄弟が、そろって舞台に立ったら……',f:'堅実な兄と、一か八かの弟。二人そろうと、どの時代の客席も笑顔になる。',
  lines:[['aki','兄さん、今夜は全部ぼくのアドリブでいこうよ。'],['haru','譜面どおりに弾け。……でも、最後のカデンツァだけはおまえにやる。'],['aki','やった！']],r:{boost:{aki:1,haru:1},xp:60}});
