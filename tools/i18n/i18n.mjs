// 翻訳の道具：プログラムを正しく読み解いて（acorn）、文字列・テンプレート・正規表現・日本語の名前を「訳す単位」にする。
//   node tools/i18n/i18n.mjs scan            … index.html（日本語版）から i18n/units.json を作る
//   node tools/i18n/i18n.mjs apply en        … i18n/en.tr.json の訳で en/index.html を作る
// テンプレート文字列は `${a}が${b}に…` をまるごと「⟦0⟧が⟦1⟧に…」という1単位にするので、訳で語順を入れ替えられる。
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import * as acorn from 'acorn';import * as walk from 'acorn-walk';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const JP=/[぀-ヿ㐀-鿿！-｠々〆〜「」『』（）・…―ー♪]/;
const JPS=/[぀-ヿ㐀-鿿]/;
const FW=/[（）、。「」『』〜：／！？《》【】　─]/;
// 日本語の文字を含まない、全角の記号だけの断片（区切りの「、」や括弧）を、各言語の記号に置き換える表
const PUN={en:{'、':', ','。':'. ','「':"'",'」':"'",'『':"'",'』':"'",'（':' (','）':')','《':'[','》':']','【':'[','】':'] ','／':' / ','：':': ','　':'  ','〜':'–','！':'!','？':'?','─':'—'},
 fr:{'、':', ','。':'. ','「':'« ','」':' »','『':'« ','』':' »','（':' (','）':')','《':'[','》':']','【':'[','】':'] ','／':' / ','：':' : ','　':'  ','〜':'–','！':' !','？':' ?','─':'—'}};
// 全角の括弧に頼っている正規表現の読み替え（訳では半角の括弧になるため）
const REPUN={'（.*）':' ?\\(.*\\)','^【.】':'^\\[[^\\]]*\\] ?','^【.*?】':'^\\[.*?\\] ?'};
const CMP=new Set(['includes','startsWith','endsWith','indexOf','replace','replaceAll','split','match','test','search','lastIndexOf']);
function load(){const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');const re=/<script>([\s\S]*?)<\/script>/g;let m,last=null;while((m=re.exec(html)))last=m;
  const js0=last.index+'<script>'.length;return{html,js:last[1],js0,js1:js0+last[1].length};}
function collect(js){
  const ast=acorn.parse(js,{ecmaVersion:'latest',ranges:false,sourceType:'script'});const nodes=[];
  walk.fullAncestor(ast,(n,_s,anc)=>{const par=anc[anc.length-2];
    if(n.type==='Literal'&&typeof n.value==='string'&&JPS.test(n.value)){
      let cmp='';if(par){if(par.type==='CallExpression'&&par.callee.type==='MemberExpression'&&CMP.has(par.callee.property.name)&&par.arguments.includes(n))cmp=par.callee.property.name;
        else if(par.type==='BinaryExpression'&&['===','!==','==','!='].includes(par.operator))cmp=par.operator;else if(par.type==='SwitchCase')cmp='case';
        else if(par.type==='Property'&&par.key===n)cmp='key';else if(par.type==='MemberExpression'&&par.property===n)cmp='index';}
      nodes.push({kind:'str',start:n.start,end:n.end,key:n.value,q:js[n.start],cmp});}
    else if(n.type==='Literal'&&typeof n.value==='string'&&FW.test(n.value)&&!(par&&par.type==='Property'&&par.key===n))nodes.push({kind:'pun',start:n.start,end:n.end,key:n.value,q:js[n.start]});
    else if(n.type==='Literal'&&n.regex&&!JPS.test(n.regex.pattern)&&REPUN[n.regex.pattern])nodes.push({kind:'repun',start:n.start,end:n.end,key:n.regex.pattern,flags:n.regex.flags});
    else if(n.type==='TemplateLiteral'&&!n.quasis.some(q=>JPS.test(q.value.cooked||''))&&n.quasis.some(q=>FW.test(q.value.raw))){if(par&&par.type==='TaggedTemplateExpression')return;for(const q of n.quasis)if(FW.test(q.value.raw))nodes.push({kind:'punq',start:q.start,end:q.end,key:q.value.raw});}
    else if(n.type==='Literal'&&n.regex&&JPS.test(n.regex.pattern))nodes.push({kind:'re',start:n.start,end:n.end,key:'re:'+n.regex.pattern,flags:n.regex.flags,cmp:'regex'});
    else if(n.type==='TemplateLiteral'&&n.quasis.some(q=>JPS.test(q.value.cooked||''))){
      if(par&&par.type==='TaggedTemplateExpression')return;let key='';n.quasis.forEach((q,i)=>{key+=q.value.cooked;if(i<n.expressions.length)key+=`⟦${i}⟧`;});
      nodes.push({kind:'tpl',start:n.start,end:n.end,key,ex:n.expressions.map(e=>[e.start,e.end])});}
    else if(n.type==='Property'&&!n.computed&&!n.shorthand){const k=n.key;
      if(k.type==='Identifier'&&JPS.test(k.name))nodes.push({kind:'idkey',start:k.start,end:k.end,key:k.name,cmp:'ident'});
      else if(k.type==='Literal'&&typeof k.value==='string'&&JPS.test(k.value))nodes.push({kind:'str',start:k.start,end:k.end,key:k.value,q:js[k.start],cmp:'key'});}
    else if(n.type==='MemberExpression'&&!n.computed&&n.property.type==='Identifier'&&JPS.test(n.property.name)){const k=n.property;let s=k.start-1;while(/\s/.test(js[s]))s--;
      nodes.push({kind:'idmem',start:s,end:k.end,key:k.name,cmp:'ident',opt:js[s-1]==='?'});}
    else if(n.type==='Identifier'&&JPS.test(n.name)&&par&&!(par.type==='Property'&&par.key===n)&&!(par.type==='MemberExpression'&&par.property===n&&!par.computed))nodes.push({kind:'idvar',start:n.start,end:n.end,key:n.name,cmp:'VAR'});
  });
  nodes.sort((a,b)=>a.start-b.start||b.end-a.end);return nodes;}
const HTXT=/>([^<>]*[぀-ヿ㐀-鿿][^<>]*)</g;
function scan(){
  const {html,js,js0,js1}=load();const nodes=collect(js);const units=new Map();
  const add=(key,kind,cmp,ctx)=>{let u=units.get(key);if(!u){u={k:key,kind,n:0,cmp:[],ctx};units.set(key,u);}u.n++;if(cmp&&!u.cmp.includes(cmp))u.cmp.push(cmp);if(kind!=='tpl'&&u.kind==='tpl')u.kind=kind;};
  for(const part of [html.slice(0,js0),html.slice(js1)]){let m;HTXT.lastIndex=0;while((m=HTXT.exec(part))){const t=m[1].trim();if(t&&!/^[\s\S]*\{[\s\S]*\}[\s\S]*$/.test(t))add(t,'html','','');}}
  for(const n of nodes)if(!/^(pun|punq|repun)$/.test(n.kind))add(n.key,n.kind.startsWith('id')?'ident':n.kind,n.cmp,js.slice(Math.max(0,n.start-50),Math.min(js.length,n.end+30)).replace(/\s+/g,' '));
  const list=[...units.values()].map((u,i)=>({id:i,...u}));
  fs.mkdirSync(path.join(ROOT,'i18n'),{recursive:true});fs.writeFileSync(path.join(ROOT,'i18n/units.json'),'[\n'+list.map(u=>JSON.stringify(u)).join(',\n')+'\n]');
  const chars=list.reduce((a,u)=>a+u.k.length,0);console.log(`単位 ${list.length}・合計 ${chars}文字`,'種類:',Object.entries(list.reduce((a,u)=>(a[u.kind]=(a[u.kind]||0)+1,a),{})).map(e=>e.join('=')).join(' '),'照合に使われるもの:',list.filter(u=>u.cmp.length).length);
}
const escS=(t,q)=>q+t.replace(/\\/g,'\\\\').split(q).join('\\'+q).replace(/\n/g,'\\n').replace(/\r/g,'')+q;
const escT=t=>t.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
function apply(lang){
  const {html,js,js0,js1}=load();const tr=JSON.parse(fs.readFileSync(path.join(ROOT,`i18n/${lang}.tr.json`),'utf8'));const nodes=collect(js);
  const has=k=>typeof tr[k]==='string'&&tr[k]!=='';let miss=0,done=0;const warn=[];
  const PM=PUN[lang]||PUN.en;const punc=t=>t.replace(/[（）、。「」『』〜：／！？《》【】　─]/g,c=>PM[c]??c);
  const act=nodes.filter(n=>{if(/^(pun|punq|repun)$/.test(n.kind))return true;const ok=has(n.key);if(n.kind!=='idvar'){ok?done++:miss++;}return ok&&n.kind!=='idvar';});
  function render(s,e){let out='',pos=s;for(const n of act){if(n.start<pos||n.end>e||n.start<s)continue;if(n.start>=e)break;out+=js.slice(pos,n.start)+one(n);pos=n.end;}return out+js.slice(pos,e);}
  function one(n){if(n.kind==='pun')return escS(punc(n.key),n.q==='"'?'"':"'");if(n.kind==='punq')return punc(n.key);if(n.kind==='repun')return '/'+REPUN[n.key]+'/'+n.flags;const t=tr[n.key];
    if(n.kind==='str')return escS(t,n.q==='"'?'"':"'");
    if(n.kind==='re'){try{new RegExp(t,n.flags);}catch(x){warn.push('正規表現が不正: '+t);return js.slice(n.start,n.end);}return '/'+t+'/'+n.flags;}
    if(n.kind==='idkey')return escS(t,"'");
    if(n.kind==='idmem')return(n.opt?'.':'')+'['+escS(t,"'")+']';
    let out='`',last=0;const re=/⟦(\d+)(?:\|(\w+))?⟧/g;let m;const used=new Set();
    while((m=re.exec(t))){out+=escT(t.slice(last,m.index));const ex=n.ex[+m[1]];if(!ex){warn.push('番号が多い: '+n.key.slice(0,40));}else{used.add(+m[1]);const src=render(ex[0],ex[1]);out+='${'+(m[2]?`__i18n.${m[2]}(${src})`:src)+'}';}last=re.lastIndex;}
    out+=escT(t.slice(last))+'`';if(used.size<n.ex.length)warn.push('使っていない差し込みがある: '+n.key.slice(0,50)+' → '+t.slice(0,50));return out;}
  let out=render(0,js.length);
  const H=fs.existsSync(path.join(ROOT,`i18n/${lang}.helpers.js`))?fs.readFileSync(path.join(ROOT,`i18n/${lang}.helpers.js`),'utf8'):'const __i18n={};';
  out=out.split('`snd/${').join('`../snd/${');
  out=H+'\n'+out.replace(/concertoStorm(?=[A-Z0-9_'"`])/g,'concertoStorm'+lang.toUpperCase()+'_');
  const hrep=part=>part.replace(HTXT,(m0,t)=>{const k=t.trim();return has(k)?'>'+t.replace(k,tr[k])+'<':m0;});
  let page=hrep(html.slice(0,js0))+out+hrep(html.slice(js1));page=page.replace('<html lang="ja">',`<html lang="${lang}">`);
  const cssf=path.join(ROOT,`i18n/${lang}.css`);if(fs.existsSync(cssf))page=page.replace('</head>',`<style>${fs.readFileSync(cssf,'utf8')}</style></head>`);
  try{acorn.parse(out,{ecmaVersion:'latest'});}catch(x){console.error('できあがったプログラムが読めません:',x.message);process.exit(1);}
  fs.mkdirSync(path.join(ROOT,lang),{recursive:true});fs.writeFileSync(path.join(ROOT,lang,'index.html'),page);
  console.log(`${lang}: 訳した箇所 ${done}・未訳の箇所 ${miss}・警告 ${warn.length}`);[...new Set(warn)].slice(0,30).forEach(w=>console.log('  ! '+w));
}
const [cmd,arg]=process.argv.slice(2);if(cmd==='scan')scan();else if(cmd==='apply')apply(arg);else console.log('scan | apply <lang>');
