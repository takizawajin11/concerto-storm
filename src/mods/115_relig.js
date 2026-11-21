/* =====================================================================
   宗教と音楽：街ごとの宗派、四旬節、教会との縁と委嘱
   ===================================================================== */
const CONF={london:'英国国教会',paris:'カトリック',venice:'カトリック',naples:'カトリック',rome:'カトリック（教皇領）',madrid:'カトリック',vienna:'カトリック',prague:'カトリック',milan:'カトリック',
  munich:'カトリック',pest:'カトリック',warsaw:'カトリック',dresden:'ルター派（宮廷はカトリック）',leipzig:'ルター派',hamburg:'ルター派',berlin:'ルター派',weimar:'ルター派',bayreuth:'ルター派',
  peter:'正教会',moscow:'正教会',newyork:'多くの宗派'};
const confKey=k=>{const c=CONF[k]||'';return /カトリック/.test(c)&&!/ルター/.test(c)?'cat':/ルター/.test(c)?'lut':/国教会/.test(c)?'ang':/正教/.test(c)?'orth':'other';};
const CONFN={cat:'カトリック教会',lut:'ルター派教会',ang:'英国国教会',orth:'正教会',other:'街の教会'};
const isLent=()=>{const mo=ymd(G.month).mo;return mo===2||mo===3;};
const lentHere=k=>isLent()&&['cat','orth'].includes(confKey(k));
const SACRED=['宗教曲','カンタータ'],THEATER=['オペラ','楽劇','バレエ','舞踏会'];
/* 時代ごとの宗教曲 */
const SACADD={
 s1723:[['gloria','ヴィヴァルディ『グローリア』','宗教曲',[['voice','ソプラノ'],['vn','コンサートマスター'],['cond','指揮']],'spring','violin'],
        ['stabat','ペルゴレージ『スターバト・マーテル』（1736）','宗教曲',[['voice','ソプラノ'],['voice','アルト'],['vn','弦楽']],'largo','violin'],
        ['messiah','ヘンデル『メサイア』（1742）','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['br','トランペット'],['tim','ティンパニ']],'hallelujah','violin'],
        ['hmass','バッハ『ロ短調ミサ』','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['fl','フルート'],['br','トランペット']],'bach','violin']],
 s1781:[['krmass','モーツァルト『戴冠ミサ』（1779）','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['ob','オーボエ']],'mozart','violin'],
        ['mzreq','モーツァルト『レクイエム』（1791）','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['cl','バセットホルン'],['tim','ティンパニ']],'mozart','violin'],
        ['creation','ハイドン『天地創造』（1798）','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['fl','フルート'],['br','金管']],'surprise','violin']],
 s1832:[['bzreq','ベルリオーズ『レクイエム』（1837）','宗教曲',[['voice','テノール'],['cond','指揮'],['br','四群の金管'],['tim','ティンパニ（16台）']],'diesirae','violin'],
        ['rstabat','ロッシーニ『スターバト・マーテル』（1842）','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['vc','チェロ']],'belcanto','violin'],
        ['elijah','メンデルスゾーン『エリヤ』（1846）','宗教曲',[['voice','バリトン'],['cond','指揮'],['vn','コンサートマスター']],'mendvc','violin']],
 s1876:[['dreq','ブラームス『ドイツ・レクイエム』','宗教曲',[['voice','ソプラノ'],['cond','指揮'],['hp','ハープ'],['tim','ティンパニ']],'lullaby','violin'],
        ['frreq','フォーレ『レクイエム』（1888）','宗教曲',[['voice','ソプラノ'],['hp','ハープ'],['va','ヴィオラ'],['cond','指揮']],'faune','violin'],
        ['tedeum','ブルックナー『テ・デウム』（1884）','宗教曲',[['voice','テノール'],['cond','指揮'],['br','金管']],'bruckner','violin']],
 s1905:[['gerontius','エルガー『ゲロンティアスの夢』（1900）','宗教曲',[['voice','テノール'],['cond','指揮'],['hp','ハープ']],'scale','violin'],
        ['vespers','ラフマニノフ『晩祷』（1915）','宗教曲',[['voice','合唱'],['cond','指揮']],'volga','violin']]
};
for(const sc in SACADD)for(const [id,t,f,sl,mo,tim] of SACADD[sc])if(!SCEN[sc].rep.some(p=>p.id===id))SCEN[sc].rep.push(Pc(id,t,f,sl.map(([r,l])=>Sl([r],l)),[.3,.6,.1],'ロマン',null,MOTIFS[mo]?mo:'scale',tim));
/* 宗教にまつわる歴史の夜 */
Object.entries({
 s1723:[{id:'kantor',y:1723,m:6,c:'leipzig',t:'バッハ、トーマス教会のカントルに就任',d:'市参事会は「最良の人を得られないので、中くらいの人で我慢する」と言ったとか。毎週日曜のカンタータが始まる。',key:['bach'],types:['voice','vn','ob'],mo:'bach',fr:300,xp:20}],
 s1781:[{id:'creationp',y:1798,m:4,c:'vienna',t:'ハイドン『天地創造』初演',d:'「光あれ」の一瞬、ハ長調の大和音が鳴り響き、客席は総立ちになった。',key:['haydn'],types:['voice','cond','fl'],mo:'surprise',fr:520,xp:30}],
 s1832:[{id:'bzreqp',y:1837,m:12,c:'paris',t:'ベルリオーズ『レクイエム』初演',d:'アンヴァリッド（廃兵院）の礼拝堂。四方に置いた金管と16台のティンパニが「怒りの日」を告げる。',key:['berlioz'],types:['voice','br','tim','cond'],mo:'diesirae',fr:480,xp:30}],
 s1876:[{id:'frreqp',y:1888,m:1,c:'paris',t:'フォーレ『レクイエム』初演',d:'マドレーヌ寺院。「怒りの日」をほとんど省いた、やすらかなレクイエム。',key:['faure'],types:['voice','hp','va'],mo:'faune',fr:380,xp:26}],
 s1905:[{id:'vespersp',y:1915,m:3,c:'moscow',t:'ラフマニノフ『晩祷』初演',d:'戦時下のモスクワ。無伴奏の合唱だけで歌う、正教会の徹夜祷。',key:['rachmaninoff'],types:['voice','cond'],mo:'volga',fr:420,xp:28}]
}).forEach(([sc,a])=>{HEV[sc]=(HEV[sc]||[]).concat(a).sort((x,y)=>x.y*12+x.m-(y.y*12+y.m));});
/* 演奏会：四旬節と宗派 */
const _evalLineup_Rx=evalLineup;
evalLineup=function(p,L,opt){const r=_evalLineup_Rx(p,L,opt);try{const k=P().city,ck=confKey(k);
  if(lentHere(k)&&THEATER.includes(p.form)){r.q-=3;r.notes.push('四旬節：劇場は自粛の季節。歌劇やバレエは客足が鈍い（-3）');}
  if(lentHere(k)&&SACRED.includes(p.form)){r.q+=2;r.notes.push('四旬節：宗教曲やオラトリオが求められる季節（+2）');}
  if(SACRED.includes(p.form)){const f=(G.church||{})[ck]||0;if(f>=3){const b=Math.min(2,f/5);r.q+=b;r.notes.push(`${CONFN[ck]}との縁（+${b.toFixed(1)}）`);}}
  if(p.form==='カンタータ'&&ck==='lut'){r.q+=1;r.notes.push('ルター派の街では、日曜のカンタータが暮らしの一部（+1）');}
  r.stars=r.q<13?1:r.q<17?2:r.q<21?3:r.q<25?4:5;}catch(e){}return r;};
const _concertResult_Rx=concertResult;
concertResult=function(p,L,ev,fi){const ret=_concertResult_Rx(p,L,ev,fi);
  try{if(SACRED.includes(p.form)){const ck=confKey(P().city);G.church=G.church||{};G.church[ck]=(G.church[ck]||0)+1;const f=G.church[ck];
    if(f===3||f===8||f===15){const fr=200+f*40;P().money+=fr;addXP(10+f*2);addLog(`${CONFN[ck]}から、新しい宗教曲の委嘱が届いた（+${fr}fr）。`);
      modal('教会からの委嘱',`${CONFN[ck]}の信頼が厚くなった。<br>礼拝のための新しい曲を書いてほしい、と正式な依頼が届いた。<br><br><span class="pmeta">+${fmt(fr)}fr・名声+${10+f*2}。この宗派の街で宗教曲を演奏すると、評判に上乗せがつく。</span>`,null,'paper');}}}catch(e){}
  return ret;};
/* 街の画面に宗派と季節を表示 */
const _cityHTML_Rx=cityHTML;
cityHTML=function(){let h=_cityHTML_Rx();try{const k=P().city,ck=confKey(k),f=(G.church||{})[ck]||0;
  h+=`<div class="card relc">⛪ <b>${CONF[k]||'—'}</b>　<span class="pmeta">${CONFN[ck]}との縁 ${'★'.repeat(Math.min(5,Math.floor(f/3)))||'まだなし'}</span>${lentHere(k)?'<br><span class="lent">いまは四旬節。劇場は自粛し、宗教曲やオラトリオの季節。</span>':''}</div>`;}catch(e){}return h;};
/* 月の便り：四旬節の始まり */
const _memberMonthly_Rx=memberMonthly;
memberMonthly=function(){_memberMonthly_Rx();try{if(ymd(G.month).mo===2&&!(G.flags.lentY===ymd(G.month).y)){G.flags.lentY=ymd(G.month).y;addLog('四旬節が始まった。カトリックと正教会の街では劇場が自粛し、宗教曲の季節となる。');}}catch(e){}};
