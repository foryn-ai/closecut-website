#!/usr/bin/env python3

from __future__ import annotations

import argparse
import os
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

ROOT = Path(__file__).resolve().parents[2]
ICONS_DIR = ROOT / "public" / "icons"
XLSX_PATH = ICONS_DIR / "Icon_Metadata_Subset_Phosphor.xlsx"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Find worksheet icon suggestions from local metadata")
    parser.add_argument("--topic", default="", help="Match Therapy Topics column")
    parser.add_argument("--area", default="", help="Match Areas of Interest column")
    parser.add_argument("--keyword", action="append", default=[], help="Match keyword or description")
    parser.add_argument("--limit", type=int, default=12, help="Max results to print")
    return parser.parse_args()


def _shared_strings(zf: zipfile.ZipFile) -> list[str]:
    name = "xl/sharedStrings.xml"
    if name not in zf.namelist():
        return []
    root = ET.fromstring(zf.read(name))
    out: list[str] = []
    for si in root.findall("x:si", NS):
        pieces = [node.text or "" for node in si.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t")]
        out.append("".join(pieces))
    return out


def _worksheet_target(zf: zipfile.ZipFile) -> str:
    wb = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    rid = wb.find("x:sheets", NS)[0].attrib[f"{{{REL_NS}}}id"]
    rel_map = {node.attrib["Id"]: node.attrib["Target"] for node in rels}
    target = rel_map[rid]
    if target.startswith("/"):
        return target.lstrip("/")
    return os.path.normpath(f"xl/{target}")


def _cell_value(cell: ET.Element, sst: list[str]) -> str:
    ctype = cell.attrib.get("t", "")
    if ctype == "inlineStr":
        is_node = cell.find("x:is", NS)
        if is_node is None:
            return ""
        pieces = [node.text or "" for node in is_node.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t")]
        return "".join(pieces)

    value_node = cell.find("x:v", NS)
    if value_node is None or value_node.text is None:
        return ""
    value = value_node.text
    if ctype == "s" and value.isdigit() and int(value) < len(sst):
        return sst[int(value)]
    return value


def load_rows() -> list[dict[str, str]]:
    if not XLSX_PATH.exists():
        raise FileNotFoundError(f"Metadata file not found: {XLSX_PATH}")

    with zipfile.ZipFile(XLSX_PATH) as zf:
        sst = _shared_strings(zf)
        ws_xml = ET.fromstring(zf.read(_worksheet_target(zf)))

    rows = ws_xml.findall(".//x:sheetData/x:row", NS)
    if not rows:
        return []

    table: list[list[str]] = []
    for row in rows:
        values = [_cell_value(cell, sst).strip() for cell in row.findall("x:c", NS)]
        table.append(values)

    header = [h.strip() for h in table[0]]
    records: list[dict[str, str]] = []
    for values in table[1:]:
        if not any(values):
            continue
        padded = values + [""] * max(0, len(header) - len(values))
        records.append({header[i]: padded[i].strip() for i in range(len(header))})
    return records


def tokenize(value: str) -> list[str]:
    return [part for part in re.split(r"[^a-z0-9]+", value.lower()) if part]


def score_record(record: dict[str, str], topic: str, area: str, keywords: list[str]) -> int:
    corpus = " ".join(
        [
            record.get("Filename", ""),
            record.get("Base Icon", ""),
            record.get("Description", ""),
            record.get("Therapy Topics", ""),
            record.get("Areas of Interest", ""),
            record.get("Keywords", ""),
        ]
    ).lower()

    score = 0

    if topic:
        t = topic.lower()
        if t in record.get("Therapy Topics", "").lower():
            score += 6
        elif t in corpus:
            score += 3

    if area:
        a = area.lower()
        if a in record.get("Areas of Interest", "").lower():
            score += 6
        elif a in corpus:
            score += 3

    for keyword in keywords:
        kw = keyword.lower()
        if kw in corpus:
            score += 2

    return score


def print_results(records: list[dict[str, str]], limit: int) -> None:
    if not records:
        print("No matching icons found.")
        return

    print("Top icon matches:")
    for record in records[:limit]:
        filename = record.get("Filename", "")
        print(f"- {filename}")
        print(f"  description: {record.get('Description', '')}")
        print(f"  topics: {record.get('Therapy Topics', '')}")
        print(f"  area: {record.get('Areas of Interest', '')}")


def main() -> int:
    args = parse_args()
    try:
        rows = load_rows()
    except FileNotFoundError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    keywords = [k for k in args.keyword if k]
    if not args.topic and not args.area and not keywords:
        print("Provide at least one filter: --topic, --area, or --keyword", file=sys.stderr)
        return 1

    existing_icons = {path.name for path in ICONS_DIR.glob("*.svg")} | {
        path.name for path in ICONS_DIR.glob("*.png")
    }

    scored: list[tuple[int, dict[str, str]]] = []
    for row in rows:
        filename = row.get("Filename", "")
        if filename.endswith(".png"):
            svg_name = f"{filename[:-4]}.svg"
            if svg_name in existing_icons:
                filename = svg_name
        if not filename or filename not in existing_icons:
            continue
        row = dict(row)
        row["Filename"] = filename
        score = score_record(row, args.topic, args.area, keywords)
        if score > 0:
            scored.append((score, row))

    scored.sort(key=lambda item: (-item[0], item[1].get("Filename", "")))
    print_results([item[1] for item in scored], args.limit)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
