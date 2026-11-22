#!/usr/bin/env python3
"""Build the stylesheet bundles that index.html loads.

index.html keeps the real list of stylesheets, in order, inside comment blocks:

    <!-- atlas-css-bundle atlas-bundle-2.css
    <link rel="stylesheet" href="desk.css?v=20261015-no-ratings">
    ...
    -->
    <link rel="stylesheet" href="atlas-bundle-2.css?v=0123456789" data-atlas-css-bundle>

Edit the CSS files and bump their ?v= in the comment block exactly as before, then run:

    python3 scripts/build_css_bundles.py          # rewrite the bundles and their ?v= hashes
    python3 scripts/build_css_bundles.py --check  # exit 1 if anything is out of date (used by CI)

Each bundle is the listed files joined in order, which is exactly what the browser did with the separate <link>s:
inline <style> blocks are never moved, so the cascade is unchanged. Relative url()s in files outside the site root
are rewritten so they still point at the same place.
"""
import hashlib
import pathlib
import posixpath
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'
BLOCK = re.compile(
    r'<!-- atlas-css-bundle (?P<name>[\w.-]+\.css)\n(?P<links>.*?)\n-->\n'
    r'<link rel="stylesheet" href="(?P=name)\?v=(?P<version>[0-9a-f]*)" data-atlas-css-bundle>',
    re.S,
)
HREF = re.compile(r'<link rel="stylesheet" href="([^"]+)">')
URL = re.compile(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)')


def source_path(href):
    path = href.split('?', 1)[0].lstrip('/')
    if '://' in href or not path.endswith('.css'):
        raise SystemExit(f'Bundles may only list local stylesheets, got {href!r}')
    return path


def rebase_urls(css, rel_path):
    folder = posixpath.dirname(rel_path)
    if not folder:
        return css

    def fix(match):
        quote, target = match.group(1), match.group(2).strip()
        if target.startswith(('/', '#', 'data:', 'http:', 'https:')):
            return match.group(0)
        return f'url({quote}{posixpath.normpath(posixpath.join(folder, target))}{quote})'

    return URL.sub(fix, css)


def check_parses(css, rel_path):
    # A stray brace or unclosed comment in one file would swallow the next file's rules once they are joined.
    stripped = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    if '/*' in stripped:
        raise SystemExit(f'{rel_path}: unclosed comment')
    stripped = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '', stripped)
    if stripped.count('{') != stripped.count('}'):
        raise SystemExit(f'{rel_path}: unbalanced braces')
    if re.search(r'@(import|charset)\b', stripped):
        raise SystemExit(f'{rel_path}: @import/@charset cannot be bundled')


def build_bundle(links):
    parts = []
    for href in HREF.findall(links):
        rel_path = source_path(href)
        css = (ROOT / rel_path).read_text(encoding='utf-8')
        check_parses(css, rel_path)
        parts.append(f'/* ---- {href} ---- */\n{rebase_urls(css, rel_path).rstrip()}\n')
    if not parts:
        raise SystemExit('A bundle block lists no stylesheets')
    return ''.join(parts)


def main():
    check = '--check' in sys.argv[1:]
    html = INDEX.read_text(encoding='utf-8')
    stale = []

    def replace(match):
        name = match.group('name')
        content = build_bundle(match.group('links'))
        version = hashlib.sha256(content.encode('utf-8')).hexdigest()[:10]
        target = ROOT / name
        if not target.exists() or target.read_text(encoding='utf-8') != content:
            stale.append(name)
            if not check:
                target.write_text(content, encoding='utf-8')
        if match.group('version') != version:
            stale.append(f'{name} version in index.html')
        return match.group(0).replace(f'{name}?v={match.group("version")}', f'{name}?v={version}')

    new_html, count = BLOCK.subn(replace, html)
    if not count:
        raise SystemExit('No atlas-css-bundle blocks found in index.html')
    if check:
        if stale:
            print('Stylesheet bundles are out of date: ' + ', '.join(stale))
            print('Run: python3 scripts/build_css_bundles.py')
            sys.exit(1)
        print(f'{count} stylesheet bundles are up to date.')
        return
    if new_html != html:
        INDEX.write_text(new_html, encoding='utf-8')
    print(f'Built {count} stylesheet bundles' + (f' (updated: {", ".join(stale)})' if stale else ' (no changes)'))


if __name__ == '__main__':
    main()
