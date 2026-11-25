"""生演奏の確認。 python3 tests/live.py s1781 k525"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SC=sys.argv[1] if len(sys.argv)>1 else 's1781'
PID=sys.argv[2] if len(sys.argv)>2 else 'k525'
SHOT=len(sys.argv)>3
CLR="for(let j=0;j<5;j++)document.querySelectorAll('.cardov').forEach(x=>x.click());while(MQ.length)MQ.shift();nextModal();"
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg=await b.new_page(viewport={'width':400,'height':860})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='warning' and '生演奏' in m.text else None)
    await pg.goto(os.environ.get('CS_URL','http://localhost:8766/index.html'));await pg.wait_for_timeout(600)
    bad=await pg.evaluate("Object.keys(LIVE).filter(id=>!Object.values(SCEN).some(s=>s.rep.some(r=>r.id===id)))")
    print('scores',await pg.evaluate("Object.keys(LIVE).join(',')"),'orphans',bad)
    await pg.click(f'[data-s="{SC}"]');await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('[data-h]').click()");await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('#mBtns button.gold').click()");await pg.wait_for_timeout(1200)
    await pg.evaluate(CLR+"try{closeScene()}catch(e){};window.LIVE_FORCE=1;P().money=9000;P().stamina=100;SC.chars.filter(c=>!G.charOwner[c.id]).slice(0,8).forEach(c=>{if(!G.members.includes(c.id))G.members.push(c.id)});const _pc=SC.rep.find(r=>r.id==='"+PID+"');if(_pc&&_pc.by&&charById(_pc.by)&&!G.members.includes(_pc.by)&&_pc.by!==G.pid)G.members.push(_pc.by);TAB='map';render();")
    await pg.wait_for_timeout(1300);await pg.evaluate(CLR)
    await pg.evaluate("document.querySelector('#aConcert').click()");await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('#scene [data-h]').click()");await pg.wait_for_timeout(300)
    print('badge',await pg.evaluate("document.querySelectorAll('.lvbadge').length"))
    if SHOT:await pg.screenshot(path='/tmp/lv_list.png')
    idx=await pg.evaluate(f"[recitalPiece()].concat(SC.rep).findIndex(r=>r.id==='{PID}')")
    await pg.evaluate(f"document.querySelector('#scene [data-pi=\"{idx}\"]').click()");await pg.wait_for_timeout(300)
    await pg.evaluate("window._nt=0;ac();const _cg=AC.createGain.bind(AC);AC.createGain=function(){window._nt++;return _cg();};const _lt=lvTone;");
    await pg.evaluate("document.querySelector('#go').click()");await pg.wait_for_timeout(1500)
    sh=await pg.evaluate("document.querySelector('#scene .stage').getBoundingClientRect().height");print('stage height',sh)
    if sh<80:errs.append('舞台がつぶれている')
    print('panel',await pg.evaluate("!!document.querySelector('#live')"),await pg.evaluate("document.querySelector('.lvcast')&&document.querySelector('.lvcast').innerText"))
    print('ask1',await pg.evaluate("document.querySelector('.lvq')&&document.querySelector('.lvq').innerText.replace(/\\n/g,' / ')"))
    if SHOT:await pg.screenshot(path='/tmp/lv_ask.png')
    await pg.evaluate("document.querySelectorAll('[data-lv]')[0]&&document.querySelectorAll('[data-lv]')[0].click()")
    t=0;asked2=False
    while t<45000:
      await pg.wait_for_timeout(500);t+=500
      st=await pg.evaluate("({done:!LV||LV.done,q2:!!document.querySelector('.lvq')&&LV.res.length===1,modal:!document.querySelector('#modal').classList.contains('hidden')})")
      if st['q2'] and not asked2:
        asked2=True;print('ask2',await pg.evaluate("document.querySelector('.lvq').innerText.replace(/\\n/g,' / ')"))
        await pg.evaluate("document.querySelectorAll('[data-lv]')[2].click()")
      if st['done']:break
    print('live sec',t/1000,await pg.evaluate("JSON.stringify({bonus:LV.bonus,res:LV.res,stars:LV.ev.stars,q:LV.ev.q})"))
    print('tones',await pg.evaluate("window._nt"),'samples',await pg.evaluate("sampState"),'acstate',await pg.evaluate("AC.state"))
    print('log',await pg.evaluate("document.querySelector('#lvLog').innerText.replace(/\\n/g,' / ')"))
    if SHOT:await pg.screenshot(path='/tmp/lv_end.png')
    await pg.wait_for_timeout(5000)
    for i in range(8):
      if await pg.evaluate('document.body.innerText.includes("生演奏の指揮：")&&!document.querySelector("#modal").classList.contains("hidden")'):break
      await pg.evaluate("document.querySelectorAll('.cardov').forEach(x=>x.click())");await pg.wait_for_timeout(1000)
    print("result shown",await pg.evaluate("document.querySelector('#modal').innerText.includes('生演奏の指揮')"),'active',await pg.evaluate("LV.active"))
    print('END',await pg.evaluate("(document.querySelector('#scene').innerText+' || '+document.querySelector('#modal').innerText).replace(/\\n+/g,' / ').slice(0,700)"))
    print('ERR',errs);await b.close();sys.exit(1 if errs else 0)
asyncio.run(main())
