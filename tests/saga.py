"""もしもの音楽史：記録→次の時代で受け継ぐ→年表。 python3 tests/saga.py"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SHOT=len(sys.argv)>1
CLR="for(let j=0;j<5;j++)document.querySelectorAll('.cardov').forEach(x=>x.click());while(MQ.length)MQ.shift();nextModal();try{closeScene()}catch(e){};"
async def begin(pg,sc):
    await pg.click(f'[data-s="{sc}"]');await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('[data-h]').click()");await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('#mBtns button.gold').click()");await pg.wait_for_timeout(1000)
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':400,'height':860})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    url=os.environ.get('CS_URL','http://localhost:8766/index.html')
    await pg.goto(url);await pg.wait_for_timeout(600)
    print('title btn',await pg.evaluate("!!document.querySelector('#sagaBtn')"))
    await begin(pg,'s1781')
    await pg.evaluate(CLR+"G.mywork=[{id:'my1',t:'交響曲ニ長調「暁」',form:'交響曲',key:'ニ長調',mo:'fanfare',ded:null,q:24,n:3,best:5}];G.fate={mozart:{care:90,saved:1}};G.hits=[{t:'街角のセレナーデ',k:'vienna',cs:['vienna','prague','paris'],m:0}];G.flags.folkHero=1;LASTEND={title:'伝説の大演奏会',txt:'',win:true};G.month=40;window._R=saveReport();")
    await pg.wait_for_timeout(1900)
    rec=await pg.evaluate("JSON.stringify(sagaLoad().s1781)");print('rec',rec[:330])
    print('modal',await pg.evaluate("document.querySelector('#mT').textContent"),'|',await pg.evaluate("document.querySelector('#mB').innerText.replace(/\\n+/g,' / ').slice(0,260)"))
    if '交響曲ニ長調' not in rec or 'mozart' not in rec:errs.append('記録されていない')
    await pg.goto(url);await pg.wait_for_timeout(600)
    print('tags',await pg.evaluate("[...document.querySelectorAll('.sgtag')].map(x=>x.textContent).join(' | ')"))
    if SHOT:
      await pg.evaluate("sagaOpen()");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/sg_time.png');await pg.evaluate("while(MQ.length)MQ.shift();nextModal();")
    await begin(pg,'s1832');m0=await pg.evaluate("P().money")
    await pg.wait_for_timeout(1500)
    for i in range(12):
      t=await pg.evaluate("document.querySelector('#modal').classList.contains('hidden')?'':document.querySelector('#mT').textContent")
      if t=='受け継がれた音楽史':break
      await pg.evaluate("document.querySelectorAll('.cardov').forEach(x=>x.click());try{closeScene()}catch(e){};const bb=document.querySelectorAll('#mBtns button');if(bb.length&&!document.querySelector('#modal').classList.contains('hidden'))bb[bb.length-1].click();");await pg.wait_for_timeout(700)
    print('inherit modal',t,'|',await pg.evaluate("document.querySelector('#mB').innerText.replace(/\\n+/g,' / ').slice(0,420)"))
    if t!='受け継がれた音楽史':errs.append('受け継ぎの窓が出ない')
    if SHOT:await pg.screenshot(path='/tmp/sg_in.png')
    ids=await pg.evaluate("SC.rep.filter(r=>/^saga/.test(r.id)).map(r=>r.id+':'+r.t).join(' ; ')");print('pieces',ids)
    if 'saga_s1781_my1' not in ids or 'sagaf_mozart' not in ids or 'sagax_mozart' not in ids:errs.append('遺産の曲がない')
    print('eval',await pg.evaluate("(()=>{const p=SC.rep.find(r=>r.id==='sagax_mozart');const r=evalLineup(p,p.slots.map((s,i)=>i===0?'you':null));return r.notes.filter(n=>n.includes('名曲')||n.includes('名作')).join()})()"))
    print('flags',await pg.evaluate("JSON.stringify({in:G.flags.sagaIn,pop:G.pop})"))
    print('share',(await pg.evaluate("sagaText()"))[:200].replace('\n',' / '))
    await pg.evaluate("window._dl=0;HTMLAnchorElement.prototype.click=function(){if(this.download&&this.href.startsWith('data:image/png'))window._dl=this.href.length;};sagaImage()")
    dl=await pg.evaluate('window._dl');print('image bytes',dl)
    if dl<20000:errs.append('画像が作れない')
    print('ERR',errs);await b.close();sys.exit(1 if errs else 0)
asyncio.run(main())
