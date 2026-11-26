#!/usr/bin/env python3
"""いまの i18n/<lang>.tr.json（日本語がキー）に、名前の表と、i18n/src/<lang>_*.tsv（「番号<TAB>訳」。番号はいまの units.json のもの）を重ねて書き直す。
取り込んだ tsv は i18n/done/ へ移す（番号は文言を足すと変わるので、古い tsv を二度読まないため）。 python3 tools/i18n/merge.py en"""
import json,sys,pathlib,re,collections
sys.path.insert(0,str(pathlib.Path(__file__).parent));import chunks
ROOT=pathlib.Path(__file__).resolve().parents[2];lang=sys.argv[1];U=json.load(open(ROOT/'i18n/units.json'));by={u['id']:u for u in U}
trp=ROOT/f'i18n/{lang}.tr.json';tr=json.load(open(trp)) if trp.exists() else {};bad=[];used=[]
for jp,(en,fr) in chunks.names.items():tr[jp]=en if lang=='en' else fr
for f in sorted((ROOT/'i18n/src').glob(f'{lang}_*.tsv')):
    used.append(f)
    for ln in f.read_text().split('\n'):
        if not ln.strip():continue
        m=re.match(r'(\d+)\t(.*)$',ln)
        if not m:bad.append(f'{f.name}: {ln[:50]}');continue
        u=by.get(int(m.group(1)))
        if not u:bad.append(f'{f.name}: 番号がない {m.group(1)}');continue
        t=m.group(2).replace('\\n','\n').replace('\\\\','\\')
        if u['kind']=='tpl':
            a=sorted(set(re.findall(r'⟦(\d+)',u['k'])));b=sorted(set(re.findall(r'⟦(\d+)',t)))
            if a!=b:bad.append(f"差し込みが合わない {u['id']}: {u['k'][:40]} → {t[:40]}")
        tr[u['k']]=t
keyed=collections.defaultdict(list)
for u in U:
    if u['k'] in tr and any(c in('key','ident','===','!==','case','index') for c in u['cmp']):keyed[tr[u['k']]].append(u['k'])
for t,ks in keyed.items():
    if len(set(ks))>1:bad.append(f'名前として使う訳がかぶっている: {t} ← {sorted(set(ks))}')
json.dump(tr,open(ROOT/f'i18n/{lang}.tr.json','w'),ensure_ascii=False,indent=0)
(ROOT/'i18n/done').mkdir(exist_ok=True)
if not bad:[f.rename(ROOT/'i18n/done'/f.name) for f in used]
todo=[u for u in U if u['k'] not in tr]
print(f'{lang}: 訳あり {len(U)-len(todo)}/{len(U)}・残り {sum(len(u["k"]) for u in todo)}文字');[print('  ! '+b) for b in bad[:40]]
