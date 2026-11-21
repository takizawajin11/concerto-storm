"""挑戦シナリオの通し確認：毎月名医を呼び、出来事では safe（最後の選択肢）か greedy（最初の選択肢）を選び続ける。
  python3 tests/challenge.py chopin49 safe
"""
import sys,os
from playwright.sync_api import sync_playwright
KEY=sys.argv[1];PICK=sys.argv[2]
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':400,'height':820});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto(os.environ.get('CS_URL','http://localhost:8766/index.html'));pg.wait_for_timeout(400)
  if KEY=='title': pg.screenshot(path='/tmp/cx_title.png',full_page=True);print(errs);b.close();sys.exit()
  pg.evaluate(f"startChx('{KEY}')");pg.wait_for_timeout(700);pg.screenshot(path=f'/tmp/cx_{KEY}_0.png')
  out=[]
  for i in range(26):
    r=pg.evaluate("""(PICK)=>{while(MQ.length)MQ.shift();nextModal();document.querySelectorAll('.cardov').forEach(x=>x.remove());P().money+=1200;const c=chCur();const tid=chTid(c);fateDoc(tid);while(MQ.length)MQ.shift();nextModal();advance(1);
      let n=0,ts=[];while(!document.querySelector('#modal').classList.contains('hidden')&&n<8){const t=document.querySelector('#mT').textContent;ts.push(t);const bs=[...document.querySelectorAll('#mBtns button')];(bs.find(b=>/夜明け/.test(b.textContent))||(PICK==='safe'?bs[bs.length-1]:bs[0])).click();n++;}
      const d=ymd(G.month);return d.y+'/'+d.mo+' care'+fateSt(tid).care+' ch'+fateChance(tid)+' '+ts.join('|')+(G.flags.mzDone?' DONE':'')}""",PICK)
    out.append(r)
    if 'DONE' in r: break
  pg.wait_for_timeout(3600);pg.evaluate("document.querySelectorAll('#mBtns button').length&&0")
  pg.screenshot(path=f'/tmp/cx_{KEY}_end.png')
  print('members',pg.evaluate('JSON.stringify(G.members)'));print('log',pg.evaluate("G.log.filter(l=>/ショパン/.test(l.s)).slice(0,6).map(l=>l.d+l.s).join(' / ')"));print('\n'.join(out));print(pg.evaluate("document.querySelector('#mT').textContent+' | '+document.querySelector('#mB').innerText.slice(0,120)"));print(errs[:4]);b.close()
