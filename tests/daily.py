"""今日の演奏会。 python3 tests/daily.py"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SHOT=len(sys.argv)>1
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();errs=[]
    url=os.environ.get('CS_URL','http://localhost:8766/index.html')
    sig=[]
    for i in range(2):
      pg=await b.new_page(viewport={'width':400,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)))
      await pg.goto(url);await pg.wait_for_timeout(600)
      sig.append(await pg.evaluate("(()=>{const D=dyMake(dyToday());return JSON.stringify([D.p.id,D.hand,D.fav,D.rule.k,D.best])})()"))
      if i==0:await pg.close()
    print('same for everyone',sig[0]==sig[1],sig[0][:200])
    if sig[0]!=sig[1]:errs.append('日替わりが人によって違う')
    r=await pg.evaluate("""(()=>{const t0=performance.now();let bad=[],ps={},mx=0;for(let i=0;i<60;i++){const d='2027-'+String(1+i%12).padStart(2,'0')+'-'+String(1+(i*7)%28).padStart(2,'0');const t=performance.now();const D=dyMake(d);mx=Math.max(mx,performance.now()-t);ps[D.p.id]=1;if(!D.best.L||D.best.L.some(x=>!x)||D.hand.length<D.p.slots.length)bad.push(d);}return{bad,kinds:Object.keys(ps).length,ms:Math.round(mx)}})()""")
    print('60 days',r)
    if r['bad']:errs.append('組めない日がある')
    await pg.evaluate("document.querySelector('#dailyBtn').click()");await pg.wait_for_timeout(400)
    if SHOT:await pg.screenshot(path='/tmp/dy_open.png',full_page=False)
    # 1回目：わざと外す（最高の布陣の逆順で埋められる席だけ）、2回目：正解
    await pg.evaluate("(()=>{const A=dyAll(),D=DY.D;const L=DY.L;const used=[];D.p.slots.forEach((s,i)=>{const id=D.hand.find(h=>!used.includes(h)&&dyFits(A[h],s)&&h!==D.best.L[i])||D.best.L[i];used.push(id);L[i]=id;});dyRender();})()")
    await pg.evaluate("document.querySelector('#dyGo').click()");await pg.wait_for_timeout(400)
    print('after 1',await pg.evaluate("JSON.stringify({tries:DY.st.tries.length,done:DY.st.done,marks:dyMarks(DY.D,DY.st.tries[0].L).join('')})"))
    await pg.evaluate("document.querySelector('[data-ds=\"0\"]').click()");await pg.wait_for_timeout(300)
    print('picker',await pg.evaluate("document.querySelector('#mT').textContent"),await pg.evaluate("document.querySelectorAll('#mBtns button').length"))
    await pg.evaluate("document.querySelector('#mBtns button').click()");await pg.wait_for_timeout(200)
    if SHOT:await pg.screenshot(path='/tmp/dy_mid.png')
    await pg.evaluate("DY.L=DY.D.best.L.slice();dyRender();document.querySelector('#dyGo').click()");await pg.wait_for_timeout(400)
    st=await pg.evaluate("JSON.stringify(DY.st)");print('after 2',st[:200])
    if '"solved":true' not in st:errs.append('正解にならない')
    print(await pg.evaluate("dyShareText()"))
    if SHOT:await pg.screenshot(path='/tmp/dy_end.png')
    await pg.evaluate("document.querySelector('#dyClose').click()");await pg.wait_for_timeout(400)
    print('title',await pg.evaluate("document.querySelector('#dailyBtn small').textContent"))
    print('ERR',errs);await b.close();sys.exit(1 if errs else 0)
asyncio.run(main())
