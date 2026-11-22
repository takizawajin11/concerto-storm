"""路上演奏・流行り歌・宮廷/民衆・遊びの棚の確認。 python3 tests/street.py s1781"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SC=sys.argv[1] if len(sys.argv)>1 else 's1781'
CLR="for(let j=0;j<5;j++)document.querySelectorAll('.cardov').forEach(x=>x.click());while(MQ.length)MQ.shift();nextModal();try{closeScene()}catch(e){}"
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':400,'height':820})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(os.environ.get('CS_URL','http://localhost:8766/index.html'));await pg.wait_for_timeout(600)
    await pg.click(f'[data-s="{SC}"]');await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('[data-h]').click()");await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('#mBtns button.gold').click()");await pg.wait_for_timeout(1200)
    await pg.evaluate(CLR)
    await pg.evaluate("P().money=5000;const ids=SC.chars.filter(c=>!G.charOwner[c.id]&&c.city).slice(0,5).map(c=>c.id);ids.forEach(id=>{if(!G.members.includes(id))G.members.push(id)});TAB='map';render();")
    await pg.wait_for_timeout(300)
    has=await pg.evaluate("!!document.querySelector('#aStreet')")
    print('street button',has)
    await pg.screenshot(path='/tmp/st_city.png')
    for i in range(3):
      await pg.evaluate(CLR+"document.querySelector('#aStreet')?document.querySelector('#aStreet').click():streetOpen()");await pg.wait_for_timeout(300)
      if i==2:
        print('3rd blocked',await pg.evaluate("document.querySelector('#modal').classList.contains('hidden')"));break
      await pg.evaluate("document.querySelectorAll('#mBtns button')[1].click()");await pg.wait_for_timeout(300)
      await pg.evaluate("document.querySelectorAll('#mBtns button')[4].click()");await pg.wait_for_timeout(1500)
      if i==0:await pg.screenshot(path='/tmp/st_play.png')
      await pg.wait_for_timeout(2500)
      if i==0:await pg.screenshot(path='/tmp/st_res.png')
      print(await pg.evaluate("JSON.stringify({pop:G.pop,side:G.side,st:G.street,t:document.querySelector('#mT')&&document.querySelector('#mT').textContent})"))
      await pg.evaluate("[...document.querySelectorAll('#mBtns button')].slice(-1)[0]?.click()")
    # 流行り歌・月送り
    await pg.evaluate(CLR+"hitBorn('テストの歌',P().city);"+CLR)
    for m in range(4):
      await pg.evaluate(CLR+"memberMonthly();G.month++;"+CLR)
    print(await pg.evaluate("JSON.stringify({hits:G.hits,evb:G.evb})"))
    await pg.evaluate(CLR+"G.side.court=75;sideMonthly();");await pg.wait_for_timeout(300)
    print('kapell modal',await pg.evaluate("document.querySelector('#mT').textContent"))
    await pg.evaluate(CLR+"TAB='map';render()");await pg.wait_for_timeout(300)
    print('shelf',await pg.evaluate("!!document.querySelector('details.shelf')"),'sidebar',await pg.evaluate("!!document.querySelector('.sidebar')"))
    await pg.screenshot(path='/tmp/st_map.png',full_page=True)
    print(await pg.evaluate("JSON.stringify(legacy().T)"))
    print('ERR',errs);await b.close()
    sys.exit(1 if errs else 0)
asyncio.run(main())
