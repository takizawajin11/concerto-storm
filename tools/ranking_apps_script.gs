/**
 * 協奏の嵐 ― みんなの楽団（ランキング）受付係
 * Googleスプレッドシートの「拡張機能 → Apps Script」に貼り付けて、ウェブアプリとしてデプロイする。
 * 記録はこのスプレッドシートの「records」シートにたまる。不適切な記録は行ごと削除してよい。
 */
const SHEET = 'records';
const HEAD = ['日時','runId','devId','名乗り','楽団名','シナリオ','シナリオ名','主人公','難易度','総合点','称号','結末','クリア','名声Lv','支配都市数','完了','記録コード'];
const SCS = ['s1723','s1781','s1832','s1876','s1905'];
const NG = ['死ね','殺す','うんこ','ちんこ','まんこ','fuck','shit','sex','http','www.'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) { s = ss.insertSheet(SHEET); s.appendRow(HEAD); s.setFrozenRows(1); }
  return s;
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean_(v, n) { v = String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, n); const low = v.toLowerCase(); return NG.some(w => low.indexOf(w) >= 0) ? '' : v; }

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== 'list') return out_({ ok: true, app: 'concerto-storm' });
  const rows = sheet_().getDataRange().getValues().slice(1);
  let list = rows.map(r => ({ t: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), run: r[1], dev: r[2], n: r[3], o: r[4], sc: r[5], st: r[6], pn: r[7], df: r[8], total: Number(r[9]) || 0, ti: r[10], rs: r[11], w: r[12] ? 1 : 0, lv: r[13], ci: r[14], done: r[15] ? 1 : 0, code: r[16] }));
  if (p.sc && SCS.indexOf(p.sc) >= 0) list = list.filter(x => x.sc === p.sc);
  if (p.mode === 'mine') list = list.filter(x => x.dev === p.dev);
  if (p.mode === 'new' || p.mode === 'mine') list.sort((a, b) => a.t < b.t ? 1 : -1); else list.sort((a, b) => b.total - a.total);
  const lim = Math.min(100, Number(p.limit) || 50);
  const n = list.length;
  list = list.slice(0, lim).map(x => { x.mine = x.dev && x.dev === p.dev ? 1 : 0; delete x.dev; return x; });
  return out_({ ok: true, n: n, list: list });
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, err: 'bad json' }); }
  const dev = clean_(b.dev, 40), run = clean_(b.run, 40);
  if (!dev || !run) return out_({ ok: false, err: 'id' });
  if (SCS.indexOf(b.sc) < 0) return out_({ ok: false, err: 'sc' });
  const total = Math.round(Number(b.total));
  if (!(total >= 0 && total <= 60000)) return out_({ ok: false, err: 'score' });
  const code = String(b.code || '');
  if (!/^[zj][A-Za-z0-9_-]{10,8000}$/.test(code)) return out_({ ok: false, err: 'code' });
  const cache = CacheService.getScriptCache();
  if (cache.get('rl_' + dev)) return out_({ ok: false, err: 'wait' });
  cache.put('rl_' + dev, '1', 15);
  const row = [new Date(), run, dev, clean_(b.n, 16) || '名無しの楽団長', clean_(b.o, 40), b.sc, clean_(b.st, 40), clean_(b.pn, 20), clean_(b.df, 10), total, clean_(b.ti, 20), clean_(b.rs, 30), b.w ? 1 : 0, Number(b.lv) || 0, Number(b.ci) || 0, b.done ? 1 : 0, code];
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const s = sheet_(); const vals = s.getDataRange().getValues();
    let idx = -1;
    for (let i = 1; i < vals.length; i++) if (vals[i][1] === run && vals[i][2] === dev) { idx = i; break; }
    if (idx > 0) s.getRange(idx + 1, 1, 1, row.length).setValues([row]); else s.appendRow(row);
    const all = s.getDataRange().getValues().slice(1).map(r => Number(r[9]) || 0);
    const rank = all.filter(v => v > total).length + 1;
    return out_({ ok: true, rank: rank, n: all.length, updated: idx > 0 });
  } finally { lock.releaseLock(); }
}
