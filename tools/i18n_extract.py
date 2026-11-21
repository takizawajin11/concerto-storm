#!/usr/bin/env python3
"""翻訳の下ごしらえ：組み上がったゲームから日本語の文言を拾い出す。

  python3 tools/i18n_extract.py

・i18n/catalog.json … 拾った文言の一覧（出てくる回数、プログラムの名前として使われているか）
・i18n/en.json, i18n/fr.json … {日本語: 訳} の表。新しい文言は空欄で足し、入っている訳は消さない
build.py --lang en は、この表の訳で文言を置き換えて英語版を作る。

注意：「code」印の文言は、プログラムの中で名前（キー）として使われている。
訳すと動かなくなるので空欄のままにし、表示のところで訳す仕組みを別に作ること。
"""
import re, json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import build

ROOT = pathlib.Path(__file__).resolve().parent.parent
JP = re.compile(r'[぀-ヿ㐀-鿿！-｠々〆〜]')
SEG = re.compile(r'[^\'"`<>{}$\n\\]+')
JPW = r'[\u3040-\u30ff\u3400-\u9fff々ー]+'
IDENT = re.compile(r'(?<=[.])' + JPW + r'|(?<=[{,\s])' + JPW + r'(?=\s*:)')

html = build.build('ja')
cat = {}
idents = set(IDENT.findall(re.findall(r'<script>(.*?)</script>', html, re.S)[-1]))
for m in SEG.finditer(html):
    s = m.group(0).strip()
    if not JP.search(s):
        continue
    st, en = m.start() + m.group(0).find(s), m.start() + m.group(0).find(s) + len(s)
    code = s in idents
    e = cat.setdefault(s, {'n': 0, 'code': False})
    e['n'] += 1
    e['code'] = e['code'] or code

total = sum(len(k) for k in cat)
ROOT.joinpath('i18n').mkdir(exist_ok=True)
(ROOT / 'i18n/catalog.json').write_text(json.dumps(cat, ensure_ascii=False, indent=0), encoding='utf-8')
for lang in ('en', 'fr'):
    p = ROOT / f'i18n/{lang}.json'
    old = json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}
    new = {k: old.get(k, '') for k in sorted(cat, key=lambda k: -len(k)) if not cat[k]['code']}
    p.write_text(json.dumps(new, ensure_ascii=False, indent=0), encoding='utf-8')
    done = sum(1 for v in new.values() if v)
    print(f'{lang}: 訳あり {done}/{len(new)}')
code = sum(1 for v in cat.values() if v['code'])
print(f'文言 {len(cat):,}種類・合計 {total:,}文字（うちプログラムの名前として使われているもの {code}種類）')
