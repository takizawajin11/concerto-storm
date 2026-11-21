"""自動の通し確認：新しく始め、巡演・派遣・時の扉・客演・演奏会まで進めて、エラーが出ないか見る。
  python3 tests/smoke.py s1781   （時代を指定。tests/run_all.sh が5時代ぶん回す）
"""
import asyncio,sys,os
from playwright.async_api import async_playwright
SC=sys.argv[1] if len(sys.argv)>1 else 's1832'
CLRM="(()=>{for(let j=0;j<5;j++)document.querySelectorAll('.cardov').forEach(x=>x.click());for(let i=0;i<5;i++){const m=document.querySelector('#modal');if(m.classList.contains('hidden'))break;while(MQ.length)MQ.shift();nextModal();}})()"
async def ck(pg,sel):
  for j in range(4):
    await pg.evaluate("document.querySelectorAll('.cardov').forEach(x=>x.click())");await pg.wait_for_timeout(150)
  if not sel.startswith('#mBtns'):
    await pg.wait_for_timeout(250);await pg.evaluate(CLRM)
  await pg.click(sel)
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':400,'height':820})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto(os.environ.get('CS_URL','http://localhost:8766/index.html'));await pg.wait_for_timeout(600)
    await pg.screenshot(path='/tmp/cs_u0.png')
    await pg.click(f'[data-s="{SC}"]');await pg.wait_for_timeout(300)
    await ck(pg,'[data-h]');await pg.wait_for_timeout(300)
    await ck(pg,'#mBtns button.gold');await pg.wait_for_timeout(1200)
    clr="while(MQ.length)MQ.shift();nextModal();closeScene();"
    await pg.evaluate(clr)
    # give members
    await pg.evaluate("""P().money=20000;const ids=SC.chars.filter(c=>!G.charOwner[c.id]&&c.city).slice(0,7).map(c=>c.id);ids.forEach(id=>{if(!G.members.includes(id))G.members.push(id)});G.fleet=[[],[]];G.flags.fleetInit=0;render();""")
    await pg.screenshot(path='/tmp/cs_u1.png')
    await pg.evaluate("TAB='fleet';render()");await pg.screenshot(path='/tmp/cs_u2.png')
    await ck(pg,'#uDev');await pg.wait_for_timeout(200);await pg.evaluate(clr)
    await pg.evaluate("TAB='sortie';render()");await pg.screenshot(path='/tmp/cs_u3.png')
    for k in range(70):
      st=await pg.evaluate("""(()=>{const m=document.querySelector('#modal');if(m&&!m.classList.contains('hidden')){const bs=[...document.querySelectorAll('#mBtns button')].filter(b=>!b.disabled);const brk=document.querySelector('#mB').textContent.includes('限界：');const pk=(brk&&bs.find(b=>/切り上げて帰る/.test(b.textContent)))||bs.find(b=>/旅立つ|次の街へ|旅を続ける|アンコール|帰還|迎え入れる|次の月|閉じる/.test(b.textContent))||bs[0];pk.click();return 'm:'+pk.textContent.slice(0,12);}
        const s=document.querySelector('[data-sty]');if(s){s.click();return 'sty';}
        if(!UPB&&document.querySelector('#scene').classList.contains('hidden')){['you'].concat(G.members).forEach(id=>ux(id).hp=umax(id));TAB='sortie';UST='city';render();const g=document.querySelector('#uGo');if(g&&!g.disabled){g.click();return 'go';}return 'nogo';}
        USP=5;return 'wait';})()""")
      await pg.wait_for_timeout(500)
    print(await pg.evaluate("JSON.stringify({city:P().city,owner:G.owner[P().city],sg:G.sg,mem:G.members.length,lv:G.members.map(id=>id+ux(id).lv),ust:G.ust,month:G.month,eq:G.ueq.length})"))
    await pg.evaluate(clr+"TAB='fleet';render()");await pg.screenshot(path='/tmp/cs_u4.png')
    # expedition
    await pg.evaluate("G.fleet[1]=G.members.filter(id=>uIn(id)<0).slice(0,3);if(G.fleet[1].length<2)G.fleet[1]=G.members.slice(-2);G.fleet[0]=G.fleet[0].filter(id=>!G.fleet[1].includes(id));TAB='sortie';UST='exp';render()")
    print('mt-before-exp',await pg.evaluate("document.querySelector('#modal').classList.contains('hidden')+' '+document.querySelector('#mT').textContent"));await ck(pg,'[data-uex="1"]');await pg.wait_for_timeout(200);await ck(pg,'#mBtns button.gold');await pg.evaluate("advance(2);render()");await pg.wait_for_timeout(300)
    print('exp', await pg.evaluate("JSON.stringify({m:G.month,u:G.uexp,mt:document.querySelector('#mT').textContent})"))
    await pg.evaluate(clr)
    # door + invite
    await pg.evaluate("G.flags.endless=1;TAB='sortie';UST='door';render()");await pg.screenshot(path='/tmp/cs_u5.png')
    await pg.evaluate("G.uinv=1;TAB='fleet';render()");await ck(pg,'#uInv');await pg.wait_for_timeout(200)
    await ck(pg,'#mBtns button');await pg.wait_for_timeout(800);await pg.evaluate(clr)
    print('guests',await pg.evaluate("JSON.stringify(G.guests)"))
    await pg.evaluate("TAB='fleet';render()");await pg.screenshot(path='/tmp/cs_u6.png')
    await pg.evaluate("const d=doors()[0];startDoor(d)");await pg.wait_for_timeout(300);await ck(pg,'[data-sty="0"]');await pg.evaluate("USP=5");await pg.wait_for_timeout(3000)
    await pg.screenshot(path='/tmp/cs_u7.png')
    # concert still works
    await pg.evaluate(clr+"UPB=null;TAB='map';render()");await pg.wait_for_timeout(1300);await pg.evaluate(clr);await ck(pg,'#aConcert');await pg.wait_for_timeout(300);await ck(pg,'[data-h]');await pg.wait_for_timeout(300);await ck(pg,'[data-pi]');await pg.wait_for_timeout(300)
    await pg.screenshot(path='/tmp/cs_u8.png')
    print('ERR',errs[:10])
    await b.close()
asyncio.run(main())
