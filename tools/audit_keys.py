#!/usr/bin/env python3
"""保存データ（G.xxx）の名前の点検。

追加部品（src/mods）が使う G の名前を集め、
・土台（src/base）と同じ名前を、ちがう形（配列とオブジェクトなど）で使っていないか
・複数の部品が同じ名前を、ちがう形で使っていないか
を調べる。音楽院の G.cons が演奏会の記録とぶつかった不具合の再発防止。
結果は docs/SAVE_KEYS.md に書き出す。ぶつかりがあれば終了コード1。
"""
import re, pathlib, sys, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
files = {'土台': (ROOT / 'src/base/index.html').read_text(encoding='utf-8')}
for p in sorted((ROOT / 'src/mods').glob('*.js')):
    files[p.name] = p.read_text(encoding='utf-8')

# 形の手がかり
ARR = [r'G\.{k}\s*=\s*G\.{k}\s*\|\|\s*\[', r'G\.{k}\s*=\s*\[', r'\(G\.{k}\s*\|\|\s*\[\]\)', r'G\.{k}\.push\(', r'G\.{k}\.(filter|map|includes|some|every|slice|length)\b']
OBJ = [r'G\.{k}\s*=\s*G\.{k}\s*\|\|\s*\{{', r'G\.{k}\s*=\s*\{{', r'\(G\.{k}\s*\|\|\s*\{{\}}\)', r'G\.{k}\[[a-zA-Z_\'"]']
NUM = [r'G\.{k}\s*=\s*\(G\.{k}\s*\|\|\s*0\)', r'G\.{k}\+\+', r'G\.{k}\s*=\s*\d']

use = collections.defaultdict(lambda: collections.defaultdict(set))
for name, txt in files.items():
    for k in set(re.findall(r'\bG\.([A-Za-z_]\w*)', txt)):
        for kind, pats in (('配列', ARR), ('オブジェクト', OBJ), ('数', NUM)):
            if any(re.search(p.format(k=re.escape(k)), txt) for p in pats):
                use[k][name].add(kind)
        use[k][name]  # 形の手がかりがなくても使っていることは記録

# 配列もオブジェクトのように添字で読むので、「配列」と言える所があれば「オブジェクト」の手がかりは消す
for k in use:
    for n in use[k]:
        if '配列' in use[k][n]:
            use[k][n].discard('オブジェクト')

conflicts = []
for k, per in use.items():
    kinds = {kk for s in per.values() for kk in s}
    if len(kinds - {'数'}) > 1:
        conflicts.append(k)

lines = ['# 保存データ（G）の名前一覧', '', 'tools/audit_keys.py が自動で作る。新しい部品で G に名前を足すときは、ここにない名前を使うこと。', '',
         '| 名前 | 形 | 使っている所 |', '| --- | --- | --- |']
for k in sorted(use):
    per = use[k]
    kinds = sorted({kk for s in per.values() for kk in s}) or ['—']
    where = '、'.join(sorted(per))
    mark = ' ⚠' if k in conflicts else ''
    lines.append(f'| `{k}`{mark} | {"・".join(kinds)} | {where} |')
(ROOT / 'docs').mkdir(exist_ok=True)
(ROOT / 'docs/SAVE_KEYS.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
if conflicts:
    print('ぶつかりの疑い:', ', '.join(conflicts))
    for k in conflicts:
        for n, s in use[k].items():
            print(f'  {k}: {n} → {"・".join(sorted(s)) or "?"}')
    sys.exit(1)
print(f'G の名前 {len(use)}個、ぶつかりなし')
