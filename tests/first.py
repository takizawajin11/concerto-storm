"""最初の10分と、音楽観の論争。 python3 tests/first.py"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SHOT=len(sys.argv)>1
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg=await b.new_page(viewport={'width':400,'height':860})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(os.environ.get('CS_URL','http://localhost:8766/index.html'));await pg.wait_for_timeout(600)
    print('first btn',await pg.evaluate("!!document.querySelector('#firstBtn')"),'folded',await pg.evaluate("document.querySelectorAll('details.moreplay .chalbtn').length"),'scen',await pg.evaluate("document.querySelectorAll('#main .title > [data-s]').length"))
    if SHOT:await pg.screenshot(path='/tmp/f_title.png')
    await pg.evaluate("window.LIVE_FORCE=1;document.querySelector('#firstBtn').click()")
    ok=False
    for i in range(30):
      await pg.wait_for_timeout(500)
      await pg.evaluate("document.querySelectorAll('.cardov').forEach(x=>x.click());if(!document.querySelector('#modal').classList.contains('hidden')){const bb=document.querySelectorAll('#mBtns button');bb[bb.length-1].click()}")
      if await pg.evaluate("!!document.querySelector('.firstguide')"):ok=True;break
    print('guided lineup',ok,await pg.evaluate("PR&&PR.p&&PR.p.id"),await pg.evaluate("JSON.stringify(PR.L)"),'sec',i*0.5)
    if not ok:errs.append('最初の演奏会に進まない')
    if SHOT:await pg.screenshot(path='/tmp/f_line.png')
    await pg.evaluate("document.querySelector('#go').click()");await pg.wait_for_timeout(1500)
    print('live',await pg.evaluate("!!document.querySelector('#live')"))
    if SHOT:await pg.screenshot(path='/tmp/f_live.png')
    await pg.evaluate("lvFinish(true)");await pg.wait_for_timeout(3000)
    for i in range(8):
      await pg.evaluate("document.querySelectorAll('.cardov').forEach(x=>x.click());if(!document.querySelector('#modal').classList.contains('hidden')){const bb=document.querySelectorAll('#mBtns button');bb[bb.length-1].click()};try{if(!document.querySelector('#scene').classList.contains('hidden')&&!document.querySelector('#live'))closeScene()}catch(e){}");await pg.wait_for_timeout(700)
    await pg.evaluate("try{closeScene()}catch(e){};TAB='map';render()");await pg.wait_for_timeout(300)
    print('month',await pg.evaluate("G.month"),'tut step',await pg.evaluate("G.tut&&G.tut.step"),'locks',await pg.evaluate("document.body.className"),'street visible',await pg.evaluate("!!document.querySelector('#aStreet')&&getComputedStyle(document.querySelector('#aStreet')).display"))
    if SHOT:await pg.screenshot(path='/tmp/f_map.png',full_page=True)
    print('map height',await pg.evaluate("document.documentElement.scrollHeight"))
    # 月を進めて開く
    for m in range(3):
      await pg.evaluate("while(MQ.length)MQ.shift();nextModal();G.month++;memberMonthly();render()");await pg.wait_for_timeout(200)
      print(' month',await pg.evaluate("G.month"),await pg.evaluate("document.querySelector('#modal').classList.contains('hidden')?'':document.querySelector('#mT').textContent"),await pg.evaluate("JSON.stringify(G.unl)"),await pg.evaluate("document.body.className"))
    if await pg.evaluate("document.body.classList.contains('lk-odai')"):errs.append('お題が開かない')
    # 論争
    await pg.evaluate("while(MQ.length)MQ.shift();nextModal();G.tut={done:1};P().stamina=100;P().money=5000;P().city='vienna';const t=SC.chars.find(c=>c.city==='vienna'&&!G.charOwner[c.id]&&c.lv<=plv()+1&&(CREED_ERA[G.sc]||[]).some(a=>creedOf(c,a)));window._t=t.id;openPersuade(t)");await pg.wait_for_timeout(400)
    await pg.evaluate("document.querySelector('#cmds [data-c=\"theory\"]').click()");await pg.wait_for_timeout(1000)
    await pg.evaluate("document.querySelector('#cmds [data-c=\"passion\"]').click()");await pg.wait_for_timeout(1100)
    q=await pg.evaluate("document.querySelector('#creedQ')?document.querySelector('#creedQ').innerText.replace(/\\n+/g,' / ').slice(0,300):''");print('creed Q',q)
    if not q:errs.append('論争が出ない')
    await pg.evaluate("while(MQ.length)MQ.shift();nextModal();")
    if SHOT:await pg.screenshot(path='/tmp/f_creed.png')
    m0=await pg.evaluate("S.meter");await pg.evaluate("document.querySelectorAll('#creedQ [data-cr]')[0].click()");await pg.wait_for_timeout(1000)
    print('meter',m0,'->',await pg.evaluate("S.meter"),'creed',await pg.evaluate("JSON.stringify(G.creed)"),'round',await pg.evaluate("S.round"),'cmds',await pg.evaluate("document.querySelector('#cmds').style.display"))
    print('line',await pg.evaluate("[...document.querySelectorAll('#bubs .bub')].slice(-2).map(b=>b.innerText.replace(/\\n/g,' ')).join(' || ')"))
    if not await pg.evaluate("Object.keys(G.creed||{}).length"):errs.append('信条が残らない')
    await pg.evaluate("finish('hold');while(MQ.length)MQ.shift();nextModal();closeScene();creedOpen()");await pg.wait_for_timeout(300)
    print('creed modal',await pg.evaluate("document.querySelector('#mB').innerText.replace(/\\n+/g,' / ').slice(0,200)"))
    print('ERR',errs);await b.close();sys.exit(1 if errs else 0)
asyncio.run(main())
