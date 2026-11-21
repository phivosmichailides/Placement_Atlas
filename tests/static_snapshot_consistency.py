#!/usr/bin/env python3
"""Check search-readable snapshot figures against the maintained Oriel CSV source.

Run from the repository root. Standard-library only, without network calls.
Changes to the source data should prompt an intentional snapshot refresh.
"""
from __future__ import annotations

import csv
import html
import io
import re
import statistics
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_PARTS = [ROOT / "data" / f"oriel-2026.part-{i:02d}.txt" for i in range(1, 6)]
SNAPSHOT = ROOT / "programme-snapshot.html"

def main() -> None:
    source = "".join(path.read_text(encoding="utf-8") for path in SOURCE_PARTS)
    rows = list(csv.DictReader(io.StringIO(source)))
    document = SNAPSHOT.read_text(encoding="utf-8")
    if len(rows) != 4064:
        raise AssertionError(f"Expected 4,064 snapshot rows; found {len(rows)}")
    region_rows = defaultdict(list)
    yes = no = 0
    for row in rows:
        region_rows[row["Region"]].append(row)
        flag = row["Skilled worker visa"].strip().lower()
        if flag == "yes":
            yes += 1
        elif flag == "no":
            no += 1
        else:
            raise AssertionError(f"Unexpected sponsorship value: {flag!r}")
    if (yes, no, len(region_rows)) != (877, 3187, 12):
        raise AssertionError(f"Data changed: visa Yes/No/regions = {yes}/{no}/{len(region_rows)}")

    pattern = (
        r'<tr><th scope="row">([^<]+)</th><td>([0-9,]+)</td>'
        r'<td><strong>([0-9,]+)</strong></td><td>([0-9]+)%</td>'
        r'<td>£([0-9,]+)</td></tr>'
    )
    table = {
        html.unescape(region): (int(n.replace(",", "")), int(y.replace(",", "")),
                                int(pct), int(median.replace(",", "")))
        for region, n, y, pct, median in re.findall(pattern, document)
    }
    if set(table) != set(region_rows):
        raise AssertionError("Snapshot region names differ from the source CSV")

    for region, records in region_rows.items():
        count = len(records)
        sponsored = sum(r["Skilled worker visa"].strip().lower() == "yes" for r in records)
        salaries = [float(r["Salary"]) for r in records if float(r["Salary"] or 0) > 0]
        med = int(statistics.median(salaries) + 0.5)
        proportion = int(100 * sponsored / count + 0.5)
        actual = table[region]
        expected = (count, sponsored, proportion, med)
        if actual != expected:
            raise AssertionError(f"{region}: HTML {actual}, CSV {expected}")
    if len(region_rows["London"]) != 786 or sum(
        r["Skilled worker visa"].strip().lower() == "yes" for r in region_rows["London"]
    ) != 55:
        raise AssertionError("London sponsorship counts differ from the page")
    if document.count('class="listing"') != 12:
        raise AssertionError("Expected twelve selected, clearly labelled programme examples")
    print("Static snapshot verified against all 4,064 original programme records.")

if __name__ == "__main__":
    main()
