#!/bin/bash
# 日本語版を作り直し、英語版・フランス語版も作る。リポジトリ直下で：  bash tools/i18n/all.sh
cd "$(dirname "$0")/../.."
python3 tools/build.py || exit 1
[ -d tools/i18n/node_modules ] || (cd tools/i18n && npm i --silent) || exit 1
node tools/i18n/i18n.mjs scan || exit 1
for l in en fr; do node tools/i18n/i18n.mjs apply $l || exit 1; done
