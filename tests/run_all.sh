#!/bin/bash
# 全部の確認をまとめて回す。リポジトリ直下で：  bash tests/run_all.sh
cd "$(dirname "$0")/.."
bash tools/i18n/all.sh || exit 1
python3 tools/audit_keys.py || exit 1
(python3 -m http.server 8766 >/dev/null 2>&1 &) ; sleep 1
fail=0
for s in s1723 s1781 s1832 s1876 s1905; do
  out=$(timeout 280 python3 tests/smoke.py $s 2>&1)
  if echo "$out" | grep -q "^ERR \[\]" && ! echo "$out" | grep -q Traceback; then echo "OK  $s"; else echo "NG  $s"; echo "$out" | tail -5; fail=1; fi
done
for c in mozart91 chopin49 mahler11; do
  out=$(timeout 200 python3 tests/challenge.py $c safe 2>&1)
  if echo "$out" | tail -1 | grep -q "^\[\]"; then echo "OK  挑戦 $c"; else echo "NG  挑戦 $c"; echo "$out" | tail -3; fail=1; fi
done
for c in s1781 s1876; do if python3 tests/street.py $c >/tmp/st_$c.log 2>&1; then echo "OK  街角 $c"; else echo "NG  街角 $c"; tail -3 /tmp/st_$c.log; fail=1; fi; done
if python3 tests/live.py s1781 k525 >/tmp/lv.log 2>&1; then echo "OK  生演奏 k525"; else echo "NG  生演奏 k525"; tail -3 /tmp/lv.log; fail=1; fi
if python3 tests/saga.py >/tmp/sg.log 2>&1; then echo "OK  音楽史"; else echo "NG  音楽史"; tail -3 /tmp/sg.log; fail=1; fi
if python3 tests/daily.py >/tmp/dy.log 2>&1; then echo "OK  今日の演奏会"; else echo "NG  今日の演奏会"; tail -3 /tmp/dy.log; fail=1; fi
if python3 tests/first.py >/tmp/fs.log 2>&1; then echo "OK  最初の10分・論争"; else echo "NG  最初の10分・論争"; tail -3 /tmp/fs.log; fail=1; fi
for l in en fr; do out=$(CS_URL=http://localhost:8766/$l/index.html timeout 280 python3 tests/smoke.py s1832 2>&1); if echo "$out" | grep -q "^ERR \[\]" && ! echo "$out" | grep -q Traceback; then echo "OK  $l 版"; else echo "NG  $l 版"; echo "$out" | tail -5; fail=1; fi; done
pkill -f "http.server 8766"
exit $fail
