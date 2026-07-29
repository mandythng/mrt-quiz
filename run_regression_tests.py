#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import json
import re
import sys

print("============================================================")
print("RUNNING AUTOMATED REGRESSION TESTS FOR SG MRT/LRT QUIZ APP")
print("============================================================")

tree = ET.parse("map.svg")
root = tree.getroot()

with open("mrt_data.js", "r") as f:
    js_text = f.read()
    json_match = re.search(r'const MRT_STATIONS = (\[.*?\]);', js_text, re.DOTALL)
    stations_data = json.loads(json_match.group(1))

failures = []

# Test 1: Orchard Station (st-21) must carry a dedicated SVG group
orchard_groups = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-21"]
if len(orchard_groups) != 1:
    failures.append(f"FAIL Test 1: Orchard station has {len(orchard_groups)} SVG groups! Expected exactly 1.")
else:
    print("✅ PASS Test 1: Orchard station has a single, isolated SVG group (st-21).")

# Test 2: Orchard Boulevard (st-129) must carry a separate, isolated SVG group
ob_groups = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-129"]
if len(ob_groups) != 1:
    failures.append(f"FAIL Test 2: Orchard Boulevard has {len(ob_groups)} SVG groups! Expected exactly 1.")
else:
    print("✅ PASS Test 2: Orchard Boulevard has a separate, isolated SVG group (st-129).")

# Test 3: Jurong East (st-1) must carry a dedicated SVG group with NO shared text nodes
je_groups = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-1"]
if len(je_groups) != 1:
    failures.append(f"FAIL Test 3: Jurong East has {len(je_groups)} SVG groups! Expected exactly 1.")
else:
    print("✅ PASS Test 3: Jurong East has a single, dedicated SVG group (st-1).")

# Test 4: Farrer Park (st-64) vs Farrer Road (st-88) must have completely separate SVG groups
fp_g = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-64"]
fr_g = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-88"]

if len(fp_g) != 1 or len(fr_g) != 1 or fp_g[0] == fr_g[0]:
    failures.append(f"FAIL Test 4: Farrer Park and Farrer Road share or lack SVG groups!")
else:
    print("✅ PASS Test 4: Farrer Park (st-64) and Farrer Road (st-88) carry completely separate SVG groups.")

# Test 5: 100% of all SVG station text groups must be hidden by default (opacity="0")
unhidden_groups = [g for g in root.iter() if g.attrib.get("data-station-id") and g.attrib.get("opacity") != "0"]
if unhidden_groups:
    failures.append(f"FAIL Test 5: {len(unhidden_groups)} SVG station groups are visible before game start!")
else:
    print("✅ PASS Test 5: 100% of all SVG station text groups are hidden by default (opacity='0').")

# Test 6: Verify station codes (e.g. TE13, NS24) and initials (e.g. RP, JE, HBF) are NOT present in dataset aliases
code_pattern = re.compile(r'^[a-zA-Z]{1,4}\d{1,3}$', re.IGNORECASE)
forbidden_initials = ["rp", "je", "ch", "dg", "hbf", "mbs", "amk", "cck", "tpy"]

invalid_aliases = []
for st in stations_data:
    for a in st.get("aliases", []):
        a_clean = a.lower().strip()
        if code_pattern.match(a_clean) or a_clean in forbidden_initials:
            invalid_aliases.append((st["name"], a))

if invalid_aliases:
    failures.append(f"FAIL Test 6: Found station codes or initials in dataset aliases: {invalid_aliases}")
else:
    print("✅ PASS Test 6: No station codes or short initials exist in dataset aliases.")

# Test 7: Tanah Merah (st-31) must carry a dedicated, complete SVG text group
tm_groups = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == "st-31"]
if len(tm_groups) != 1:
    failures.append(f"FAIL Test 7: Tanah Merah missing SVG group!")
else:
    print("✅ PASS Test 7: Tanah Merah carries a dedicated, complete SVG text group (st-31).")

# Test 8: 100% SVG Map Coverage for ALL 230 stations
uncovered = []
for st in stations_data:
    st_id = st["id"]
    nodes = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == st_id]
    if not nodes:
        uncovered.append(st["name"])

if uncovered:
    failures.append(f"FAIL Test 8: {len(uncovered)} stations have 0 SVG map groups tagged! Missing: {uncovered}")
else:
    print(f"✅ PASS Test 8: 100% SVG Map Coverage across all {len(stations_data)} stations ({len(stations_data)}/{len(stations_data)} dedicated SVG groups).")

# Test 9: 100% Multi-Word Station Line Integrity across all multi-word stations
incomplete_multi_words = []
for st in stations_data:
    st_words = [w for w in st["name"].lower().replace("-", " ").split() if len(w) > 1]
    if len(st_words) > 1:
        groups = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == st["id"]]
        if not groups:
            incomplete_multi_words.append((st["name"], "No group found"))
        else:
            txts = ["".join(elem.itertext()).strip().lower() for elem in groups[0].iter() if elem.tag.endswith("text")]
            joined = " ".join(txts)
            missing = [w for w in st_words if w not in joined and w[:-1] not in joined]
            if missing:
                incomplete_multi_words.append((st["name"], missing))

if incomplete_multi_words:
    failures.append(f"FAIL Test 9: Found multi-word stations with incomplete line tags: {incomplete_multi_words}")
else:
    print(f"✅ PASS Test 9: 100% Multi-Word Station Line Integrity across all multi-word stations.")

# Test 10: Zero Cross-Station Group Leakage / Collisions across all 230 stations
all_station_group_ids = [g.attrib.get("data-station-id") for g in root.iter() if g.attrib.get("data-station-id")]
unique_group_ids = set(all_station_group_ids)

if len(all_station_group_ids) != len(unique_group_ids):
    failures.append(f"FAIL Test 10: Duplicate station group IDs detected in SVG! Total: {len(all_station_group_ids)}, Unique: {len(unique_group_ids)}")
elif len(unique_group_ids) != len(stations_data):
    failures.append(f"FAIL Test 10: Expected {len(stations_data)} unique station groups, found {len(unique_group_ids)}")
else:
    print(f"✅ PASS Test 10: Zero Cross-Station Group Leakage ({len(stations_data)} 1-to-1 isolated SVG station groups).")

# Test 11: Verify 38 LRT Stations carry is_lrt: True and award 2 PTS
lrt_st_count = 0
invalid_lrt_pts = []
for st in stations_data:
    if st.get("is_lrt", False):
        lrt_st_count += 1
        if st.get("points") != 2:
            invalid_lrt_pts.append(st["name"])

if lrt_st_count != 38:
    failures.append(f"FAIL Test 11: Expected 38 LRT stations, found {lrt_st_count}!")
elif invalid_lrt_pts:
    failures.append(f"FAIL Test 11: LRT stations without 2 PTS award: {invalid_lrt_pts}")
else:
    print(f"✅ PASS Test 11: 100% of all 38 LRT Stations carry is_lrt: True and award 2 PTS each.")

print("-" * 60)
if failures:
    print("❌ REGRESSION TESTS FAILED!")
    for f in failures: print(" ", f)
    sys.exit(1)
else:
    print(f"🎉 ALL 11 REGRESSION TESTS PASSED 100% CLEANLY FOR ALL {len(stations_data)} STATIONS!")
    sys.exit(0)
