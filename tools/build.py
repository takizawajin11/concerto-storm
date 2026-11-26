#!/usr/bin/env python3
"""協奏の嵐 のビルド。

src/base/index.html（土台）に、src/css/*.css と src/mods/*.js を番号順に差し込み、
リポジトリ直下の index.html（公開版）を作る。

  python3 tools/build.py            日本語版を作る
  英語版・フランス語版は bash tools/i18n/all.sh（docs/I18N.md）
  python3 tools/build.py --check    作るだけで書き出さず、いまの index.html と同じか確かめる
"""
import re, sys, json, pathlib, subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'

# 土台に当てる小さな修正（文字列の置き換え）。順番に当てる。
BASE_PATCHES = [
    # 舞台を急いで閉じたときのエラーを防ぐ
    ("const r=w.getBoundingClientRect(),b=$('#audwrap').getBoundingClientRect();",
     "if(!$('#audwrap')||!w.isConnected)return;const r=w.getBoundingClientRect(),b=$('#audwrap').getBoundingClientRect();"),
    # 保存データの名前（統合版）
    ("'concertoStorm4'", "'concertoStorm5'"),
]
TITLE = '協奏の嵐 統合版'
LOGO = '<div class="en">Concerto Storm</div><h1 class="logo">協奏の嵐</h1>'
SUBTITLE = '<div style="color:var(--gold2);letter-spacing:.2em">統 合 版</div>'
INSERT_BEFORE = "document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;render();});"


def build(lang='ja'):
    src = (SRC / 'base' / 'index.html').read_text(encoding='utf-8')
    css = ''.join(p.read_text(encoding='utf-8') for p in sorted((SRC / 'css').glob('*.css')))
    js = ''.join(p.read_text(encoding='utf-8') + '\n' for p in sorted((SRC / 'mods').glob('*.js')))
    src = src.replace('</style>', css + '\n</style>', 1)
    for a, b in BASE_PATCHES:
        if a not in src:
            sys.exit(f'土台の修正が当たりません: {a[:60]}')
        src = src.replace(a, b)
    i = src.rfind(INSERT_BEFORE)
    if i < 0:
        sys.exit('差し込み位置が見つかりません')
    src = src[:i] + js + '\n' + src[i:]
    src = re.sub(r'<title>.*?</title>', f'<title>{TITLE}</title>', src, count=1)
    src = src.replace(LOGO, LOGO + SUBTITLE)
    k = src.rfind('title();\n</script>')
    src = src[:k] + 'title();shBoot();\n</script>' + src[k + len('title();\n</script>'):]
    if lang != 'ja':
        src = translate(src, lang)
    return src


def translate(src, lang):
    raise SystemExit('英語版・フランス語版は bash tools/i18n/all.sh で作ります（docs/I18N.md）')


def syntax_check(html):
    js = re.findall(r'<script>(.*?)</script>', html, re.S)[-1]
    tmp = pathlib.Path('/tmp/_cs_build_check.js')
    tmp.write_text(js, encoding='utf-8')
    r = subprocess.run(['node', '--check', str(tmp)], capture_output=True, text=True)
    if r.returncode:
        sys.exit('JavaScriptの文法エラー:\n' + r.stderr[:2000])


if __name__ == '__main__':
    lang = sys.argv[sys.argv.index('--lang') + 1] if '--lang' in sys.argv else 'ja'
    html = build(lang)
    syntax_check(html)
    out = ROOT / 'index.html' if lang == 'ja' else ROOT / lang / 'index.html'
    if '--check' in sys.argv:
        same = out.exists() and out.read_text(encoding='utf-8') == html
        print('同じ' if same else 'ちがう', out)
        sys.exit(0 if same else 1)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding='utf-8')
    print('書き出し:', out, f'{len(html):,}文字')
