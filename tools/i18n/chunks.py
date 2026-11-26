#!/usr/bin/env python3
"""訳す単位を小分けにして /tmp/tr/c_NN.txt に書き出す（名前は自動で埋める）。
  python3 tools/i18n/chunks.py          全部
  python3 tools/i18n/chunks.py en       en.tr.json にまだ訳のないものだけ（文言を足したあとはこちら）"""
import json,re,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
U=json.load(open(ROOT/'i18n/units.json'));N=json.load(open(ROOT/'i18n/names.json')) if (ROOT/'i18n/names.json').exists() else {}
SP={'シュトラウス1世':'Strauss I','シュトラウス2世':'Strauss II','サン＝ジョルジュ':'Saint-Georges','ファウスティーナ':'Faustina','アンナ・マクダレーナ':'Anna Magdalena','ビューロー':'Bülow','ド・ベリオ':'de Bériot','ベランジェ':'Béranger','ル・モール':'Le Maure','フランチェスキエッロ':'Francischello','パラディス':'Paradis','ヴェチェイ':'Vecsey','R.シュトラウス':'R. Strauss','ダンディ':"d'Indy",'サン＝テュベルティ夫人':'Mme Saint-Huberty','ピエタのアンナ・マリーア':'Anna Maria della Pietà',
 'リスト（神父）':('Abbé Liszt',"l'abbé Liszt"),'忘れ物のフリッツ':('Forgetful Fritz',"Fritz l'étourdi"),'ドンナー親方':('Meister Donner','Maître Donner'),'ジョルジュ・ジレ（教授）':('G. Gillet (professor)','G. Gillet (professeur)'),'マダム・エギュ':'Madame Aigu'}
def nm(jp,lat):
    if jp in SP:v=SP[jp];return v if isinstance(v,tuple) else (v,v)
    if jp.startswith('若き'):a,b=nm(jp[2:],lat.replace('young ',''));return('Young '+a,'le jeune '+b)
    if '・' in jp or re.search(r'[A-Z]\.',jp):return(lat,lat)
    t=re.sub(r'^((?:[A-Z][a-zé]?\.-?|Th\.)\s*)+','',lat).split()
    if len(t)>1:
        i=len(t)-1
        while i>0 and t[i-1] in('de','von','van','della','Le','La',"d'"):i-=1
        t=t[i:]
    s=' '.join(t);return(s,s)
names={jp:nm(jp,lat) for jp,lat in N.items() if lat}
if __name__=='__main__':
    out=pathlib.Path('/tmp/tr');[f.unlink() for f in out.glob('c_*.txt')]
    cur=[];size=0;ci=0;left=0
    def flush():
        global cur,size,ci
        if cur:(out/f'c_{ci:02d}.txt').write_text('\n'.join(cur));ci+=1;cur=[];size=0
    import sys
    have=json.load(open(ROOT/f'i18n/{sys.argv[1]}.tr.json')) if len(sys.argv)>1 else {}
    for u in U:
        if u['k'] in have:continue
        if u['k'] in names:continue
        left+=1;fl=('T' if u['kind']=='tpl' else 'R' if u['kind']=='re' else 'I' if u['kind']=='ident' else '')+(('C:'+','.join(u['cmp'])) if u['cmp'] and u['kind'] not in('re','ident') else '')
        cur.append(f"{u['id']}|{fl}|"+u['k'].replace('\\','\\\\').replace('\n','\\n'));size+=len(u['k'])+8
        if size>=6200:flush()
    flush();print('名前で埋めた',len([1 for u in U if u['k'] in names]),'残り',left,'小分け',ci)
