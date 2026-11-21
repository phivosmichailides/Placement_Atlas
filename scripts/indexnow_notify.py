#!/usr/bin/env python3
"""Notify IndexNow engines about changed public Placement Atlas pages.

Only canonical URLs are sent. The site ownership key is public by protocol.
This does not submit to Google or guarantee crawling/indexing.
"""
import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

HOST = "placementatlas.co.uk"
BASE = "https://" + HOST
KEY = "7e2c5b8a1d409f63a4b0c92e6d8f1753"
KEY_LOCATION = BASE + "/" + KEY + ".txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
PAGES = {
    "index.html": "/",
    "about.html": "/about.html",
    "guide.html": "/guide.html",
    "programme-snapshot.html": "/programme-snapshot.html",
    "privacy.html": "/privacy.html",
    "terms.html": "/terms.html",
}
FULL_REFRESH = {
    "sitemap.xml",
    "robots.txt",
    KEY + ".txt",
    "scripts/indexnow_notify.py",
    ".github/workflows/indexnow-notify.yml",
}

def changed_paths(commit):
    result = subprocess.run(
        ["git", "diff-tree", "--no-commit-id", "--name-only", "-r", commit],
        check=True, capture_output=True, text=True,
    )
    return {line.strip() for line in result.stdout.splitlines() if line.strip()}

def selected_urls(paths, all_pages=False):
    if all_pages or bool(paths & FULL_REFRESH):
        return [BASE + suffix for suffix in PAGES.values()]
    return [BASE + PAGES[p] for p in PAGES if p in paths]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", default=os.environ.get("DEPLOY_SHA"))
    parser.add_argument("--all", action="store_true", dest="all_pages")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not args.commit and not args.all_pages:
        parser.error("Supply --commit or --all")
    paths = set() if args.all_pages else changed_paths(args.commit)
    urls = selected_urls(paths, args.all_pages)

    if not urls:
        print("IndexNow: no public HTML or discovery files changed; skipping.")
        return 0

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    print("IndexNow: notifying about these canonical URLs:", ", ".join(urls))
    if args.dry_run:
        print(json.dumps(payload, indent=2))
        return 0

    request = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "PlacementAtlas-IndexNow/1.0 (+https://placementatlas.co.uk/)",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            status = response.status
            print("IndexNow HTTP status:", status)
            if status not in (200, 202):
                raise RuntimeError(f"IndexNow unexpected HTTP status: {status}")
    except urllib.error.HTTPError as exc:
        details = exc.read(512).decode("utf-8", errors="replace")
        print(f"IndexNow rejected notification: HTTP {exc.code} {details}", file=sys.stderr)
        return 1
    except Exception as exc:
        print(f"IndexNow notification could not be confirmed: {exc}", file=sys.stderr)
        return 1

    print("IndexNow notification accepted, not an indexing guarantee.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
