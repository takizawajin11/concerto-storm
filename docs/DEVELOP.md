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
| `tools/i18n/` | 翻訳の道具（`all.sh` で英語版・フランス語版を作る。詳しくは `docs/I18N.md`） |
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

`bash tools/i18n/all.sh` で日本語版・英語版（en/）・フランス語版（fr/）をまとめて作る。訳は `i18n/en.tr.json` `i18n/fr.tr.json`（日本語がキー）。文言を足したときの訳し方は `docs/I18N.md`。

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

## 190_live（生演奏：聴ける・振れる演奏会）
- `LIVE[曲id]` に名曲の一節を mel / mid / bass の3声で持つ。書き方は `lvParse`（例 `g4:1 r:.5 a4+c5:2 =.5 d5`）。3区切り（segs）で、区切りごとに各声部の拍の合計をそろえる（合わないと起動時に console.warn）
- 担当：指揮以外の最初の席が旋律、cb→vc→pf→tim の順で低音、残りが内声。担当のいない声部は「楽団」が小さく鳴らし、空席の声部は鳴らない
- 出来（ev.contrib の v）が低いほど音を外し、指揮者の出来でテンポが揺れる。指揮の席が空だと声部がずれる
- 判断は2回（テンポ／終わり方）。lvJudge1・lvJudge2 が評判（ev.q）に −1.0〜+1.8 を足す
- 自動テストでは出ない（navigator.webdriver）。`window.LIVE_FORCE=1` で出す。確認は `python3 tests/live.py s1781 k525`
- 注意：base の舞台は `.stage .stbg`。同じクラス名を別の用途に使わない（街角の背景は `.stbk`）

## 195_saga（もしもの音楽史：時代をつなぐ）
- 結末（saveReport）のたびに localStorage `concertoStormSaga` へ時代ごとの記録を残す（最高点の1件。挑戦シナリオは対象外）
- あとの時代の start() で sagaPieces（【遺産】【もしもの古典】を演目に追加）と sagaInherit（最初の月だけ：資金・名声・民謡の人気、案内の窓）
- 運命を越えた人があとの時代に残す曲は FATE の幻の曲＋ `SAGA_IF`（モーツァルト交響曲第42番など）
- 年表は sagaOpen（タイトル画面の「あなたの音楽史」）。sagaText で文章共有、sagaImage で画像保存。確認は `python3 tests/saga.py`

## 200_daily（今日の演奏会：1日1問の布陣パズル）
- 日本時間の日付から dyMake が曲・手札9人・客席の好み・今日の決まり（DY_RULES）を決める。乱数は dyRng（日付の種）だけを使い、Math.random は使わない（人によって変わってしまうため）
- 点数は dyScore（本編の evalLineup とは別。G を使わない）。最高の布陣は dyBest の総当たり
- 記録は localStorage `concertoStormDaily`。確認は `python3 tests/daily.py`
- 生演奏の曲は14曲（190_live.js の lvDef）。照合の記録は docs/FACTCHECK.md

## 205_creed（音楽観の論争）
- 説得の2小節目の返事（counter）の代わりに、相手が論点を問う。論点は `CREED`、時代ごとの出し分けは `CREED_ERA`、相手の立場は `creedOf`（史実の人は `CREED_X`、ほかは能力値と好みから）
- 答えは `G.creed[論点]={s,n}`。立場を変えた回数は `G.flags.creedFlip`。出典の文は時代ごとに変える（その時代にまだいない人を出典にしない）
- 案内中の最初の2か月と、挑戦シナリオでは出さない

## 210_first（最初の10分）
- はじめての人（セーブ・殿堂・各種記録がない）のタイトルは「はじめての方はここから」を先頭にし、ほかは `details.moreplay` に折りたたむ。テストで挑戦シナリオなどを押すときは evaluate の click を使う（見えていない要素は pg.click できない）
- firstStart → 1781年・モーツァルト・入門で開始 → firstConcert がトルコ行進曲の布陣画面を開く
- UNL に street（2か月目）と odai（3か月目）を追加。閉じている間は body に `lk-street` / `lk-odai` が付き、CSSで隠す
