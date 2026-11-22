# 協奏の嵐 開発の手引き

## しくみ

公開しているのはリポジトリ直下の `index.html` 1枚です。これは手で編集せず、`src/` から組み立てます。

| 場所 | 中身 |
| --- | --- |
| `src/base/index.html` | 土台（第4版までの本体）。地図、演奏会、勢力、保存などの基本の仕組み |
| `src/mods/NNN_名前.js` | 追加部品。番号の小さい順に土台へ差し込む。土台の関数を包んで機能を足す |
| `src/css/NNN_名前.css` | 追加部品の見た目。番号順に差し込む |
| `snd/` | 楽器の音源 |
| `tools/build.py` | 組み立て。`index.html` を書き出す |
| `tools/audit_keys.py` | 保存データ（G）の名前のぶつかりを点検。結果は `docs/SAVE_KEYS.md` |
| `tools/i18n_extract.py` | 翻訳の下ごしらえ。日本語の文言を `i18n/` に拾い出す |
| `tests/` | 自動の通し確認 |

## いつもの手順

```
python3 tools/build.py          # 組み立て
bash tests/run_all.sh           # 組み立て＋点検＋5時代と挑戦シナリオ3本の通し確認
git add -A && git commit && git push
```

`bash tests/run_all.sh` がすべて `OK` になってから公開します。

## 部品を足すときの約束

1. 新しいファイルを `src/mods/` に、入れたい位置の番号で置く（例：`140_新機能.js`）。
2. 土台や前の部品の関数は、置き換えずに包む。
   ```js
   const _render_新機能=render;
   render=function(){_render_新機能();/* 足す処理 */};
   ```
   包むための変数名は、ほかと重ならないよう末尾に部品名をつける。
3. 保存データ `G` に名前を足すときは、`docs/SAVE_KEYS.md` にない名前にする。足したら `python3 tools/audit_keys.py` で点検する。
   （以前、音楽院の `G.cons` が演奏会の記録の `G.cons` とぶつかり、演奏会が止まる不具合が出た。）
4. 既存の遊びかけのデータで困らないよう、新しい名前は `G.xxx=G.xxx||{}` のように、無ければ作る形で読む。
5. `const` で定義された関数（`isAway` `charById` `moodOf` など）は包めない。必要なら呼び出し側を包む。

## 挑戦シナリオを足すには

`src/mods/130_chal.js` の `CHX` に1件足すだけで、タイトル画面・地図の残り時間・結果画面・自己ベストが自動で付く。
例は `136_chal_mozart.js`（モーツァルト）や、`130_chal.js` の中のショパン・マーラー。

| 項目 | 意味 |
| --- | --- |
| `sc` `pid` | 使う時代と主人公 |
| `target` | 救う相手（主人公自身でもよい）。`DEATH` と `FATE`（幻の名曲）が必要 |
| `y0` `m0` `endY` `endM` | 始まりと終わりの年月 |
| `care0` `decay` | 運命を越える見込みの初めの値と、月ごとの衰え |
| `ev` | 年月ごとの出来事と選択肢。`chCare(n)` で見込みを上げ下げする |
| `score` | 結果の点数の内訳 |
| `noRest` | 書けば、救う相手を休ませられない（理由の文） |

難しさは `python3 tests/challenge.py <名前> safe` と `greedy` で確かめる（慎重な遊び方でおよそ60〜80%が目安）。

## 翻訳（英語版・フランス語版）

1. `python3 tools/i18n_extract.py` で `i18n/en.json` `i18n/fr.json` に未訳の文言が空欄で並ぶ（約6,000種類・約10万字）。
2. 空欄に訳を入れる。長い文言から順に置き換えるので、短い語だけを訳すと文の途中が混ざることがある。文単位で訳す。
3. `python3 tools/build.py --lang en` で `en/index.html` ができる。
4. `catalog.json` で `code: true` の15語（「古典」「交響」「オペラ」など）は、プログラムの中で名前として使っているので訳さない。表示で訳す仕組みは、翻訳に取りかかるときに作る。

## 180_street（街角・流行り歌・宮廷か民衆か）
- `G.pop[街]` 民衆の人気 0〜100（毎月-1）。演奏会で人気×規模×2.2fr の上乗せ
- `G.hits` 流行り歌。ROUTES づたいに毎月35%で隣の街へ。14か月まで楽譜収入
- `G.side={court,folk}` 宮廷と民衆の支持。宮廷70で宮廷楽長の打診、民衆70で「民衆の楽団」
- `G.street` 路上演奏の月回数（月2回まで）、`G.flags.prodigy` 神童デビュー済み
- `G.evb` お知らせ窓の予算：bondMonthly・akiMonthly・patronMonthly の窓は月2つまで。超えた分は通知と日誌だけ
- 地図の「遊びの棚」は `<details class="shelf">` にたたむ
- 関係の値は `G.rel` / `G.relT`（基本の `G.bond` は出演回数なので使わない）

## 185_stage（街角向き・舞台向き、音楽家17人追加）
- `STAGE[id]=['street'|'hall',理由]`。路上の人だかり倍率は stageMul、機嫌は stageMood、結果の一言は stageNote（180_street から呼ぶ）
- 演奏会：舞台向きは規模5以上の街で+0.3、街角向きは民衆の人気40以上の街で+0.3（合計0.9まで）
- 路上の場所に「酒場」を追加。新しい演目：beggar / zauber / lannerw / trialjury / widow
