"""Build versioned public archives from repository-owned source; Python standard library only."""
from pathlib import Path
import hashlib, json, re, zipfile

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'downloads'
VERSION='1.0.0'
OUT.mkdir(exist_ok=True)
docs=['LICENSE','NOTICE','README.md','RELEASE-STATUS.md','VALIDATION.md','CONTRIBUTING.md']
tools=['episode-06-control-review','episode-07-placement-test','episode-08-delivery-gates']
skills=['ai-control-review','ai-workload-placement','ai-delivery-gate-review']
catalog=json.loads((ROOT/'series/ai-has-a-supply-chain/asset-catalog.json').read_text())

def files(base):
    return sorted(p for p in base.rglob('*') if p.is_file() and p.name not in {'.DS_Store'} and '__pycache__' not in p.parts)

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()

def make(name,entries):
    """Entries map zip member name to repository file or generated text bytes."""
    output=OUT/(name+'-v'+VERSION+'.zip')
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for member,source in sorted(entries.items()):
            assert not member.startswith('/') and '..' not in Path(member).parts
            blob=source.read_bytes() if isinstance(source,Path) else source
            info=zipfile.ZipInfo(member,(2026,9,24,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
            z.writestr(info,blob)
    with zipfile.ZipFile(output) as z:
        assert z.testzip() is None
        assert len(z.namelist())==len(set(z.namelist()))
    return output

archives=[]
for tool,skill in zip(tools,skills):
    base=ROOT/'tools'/tool
    entries={tool+'/'+p.relative_to(base).as_posix():p for p in files(base)}
    archives.append(make(tool,entries))
    sb=base/skill
    entries={skill+'/'+p.relative_to(sb).as_posix():p for p in files(sb)}
    archives.append(make(skill,entries))

for ep in range(1,7):
    folder=f'episode-{ep:02d}';base=ROOT/'series/ai-has-a-supply-chain'/folder
    entries={folder+'/'+p.relative_to(base).as_posix():p for p in files(base)}
    entries.update({folder+'/'+n:ROOT/n for n in ['LICENSE','NOTICE']})
    entries[folder+'/EXERCISES.md']=ROOT/'series/ai-has-a-supply-chain/EXERCISES.md'
    archives.append(make(folder+'-assets',entries))

entries={n:ROOT/n for n in docs}
for folder in ['tools','series','tests','scripts']:
    for p in files(ROOT/folder):entries[p.relative_to(ROOT).as_posix()]=p
entries['START-HERE.md']=b'''# Start here\n\nOpen tools/episode-06-control-review/index.html for control ownership, tools/episode-07-placement-test/index.html for workload placement, or tools/episode-08-delivery-gates/index.html for a delivery-gate review. Keep each tool folder intact. Try the fictional example first. Nothing is saved automatically.\n\nVisuals and image descriptions are under series/ai-has-a-supply-chain/episode-01 through episode-06. EXERCISES.md contains text-only reviews. Read RELEASE-STATUS.md for exclusions and LICENSE/NOTICE for reuse. No spreadsheet, account, API key or network connection is required.\n'''
archives.append(make('ai-has-a-supply-chain',entries))

manifest=[]
for p in archives:
    with zipfile.ZipFile(p) as z:members=z.namelist()
    manifest.append(dict(file=p.name,bytes=p.stat().st_size,sha256=sha(p),files=len(members),version=VERSION))
(OUT/'manifest.json').write_text(json.dumps({'version':VERSION,'date':'2026-09-24','archives':manifest},indent=2)+'\n')
(OUT/'SHA256SUMS.txt').write_text(''.join(x['sha256']+'  '+x['file']+'\n' for x in manifest))

# Fail on accidental internal material before staging the release.
source_files=[ROOT/n for n in docs]
for folder in ['tools','series','tests','scripts']:source_files+=files(ROOT/folder)
for p in source_files:
    assert p.suffix not in {'.xlsx','.xls','.env'}, p
    assert not p.is_symlink(),p
    if p.suffix in {'.md','.html','.js','.cjs','.json','.svg','.css','.py'}:
        t=p.read_text()
        forbidden=['/Users/'+'arianadigital','/mnt/'+'data','-----BEGIN '+'PRIVATE KEY-----']
        assert not any(x in t for x in forbidden),f'Private path/key marker: {p}'
        if p.suffix=='.md':
            for target in re.findall(r'\]\(([^)]+)\)',t):
                if target.startswith(('https://','http://','#','mailto:')):continue
                assert (p.parent/target.split('#')[0]).exists(),f'Broken relative link: {p}: {target}'
for a in catalog:assert (ROOT/a['path']).exists(),a
print(json.dumps({'archives':len(archives),'catalog_entries':len(catalog),'source_files':len(source_files),'total_archive_bytes':sum(x['bytes'] for x in manifest),'checks':'archive integrity, checksums, allowlist paths and relative Markdown links passed'},indent=2))
