/* ======================= 言語の切り替え（タイトルの下に、日本語・English・Français のリンク） ======================= */
const _titleLG=title;title=function(){_titleLG();try{const t=document.querySelector('.title');if(!t||t.querySelector('.langs'))return;
  const cur=document.documentElement.lang||'ja',base=cur==='ja'?'':'../';const L=[['ja','\u65e5\u672c\u8a9e',base||'./'],['en','English',base+'en/'],['fr','Fran\u00e7ais',base+'fr/']];
  const d=document.createElement('div');d.className='credit langs';d.innerHTML=L.map(([k,n,h])=>k===cur?`<b>${n}</b>`:`<a href="${h}">${n}</a>`).join(' \u00b7 ');t.appendChild(d);}catch(e){}};
