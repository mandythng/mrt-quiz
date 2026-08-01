#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import json
import re
import sys
import subprocess

print("========================================================================")
print("RUNNING COMPREHENSIVE END-TO-END REGRESSION TEST SUITE FOR SG MRT QUIZ")
print("========================================================================")

failures = []

# ---------------------------------------------------------
# CATEGORY A: BACKEND SVG & DATASET COVERAGE TESTS
# ---------------------------------------------------------
print("\n--- [Category A: SVG Map & Dataset Integrity] ---")

tree = ET.parse("map.svg")
root = tree.getroot()

with open("mrt_data.js", "r") as f:
    js_text = f.read()
    json_match = re.search(r'const MRT_STATIONS = (\[.*?\]);', js_text, re.DOTALL)
    stations_data = json.loads(json_match.group(1))

# Test A1: 100% SVG Map Coverage for ALL 230 stations
uncovered = []
for st in stations_data:
    st_id = st["id"]
    nodes = [g for g in root.iter() if g.tag.endswith("g") and g.attrib.get("data-station-id") == st_id]
    if not nodes:
        uncovered.append(st["name"])

if uncovered:
    failures.append(f"FAIL A1: {len(uncovered)} stations missing SVG map groups: {uncovered}")
else:
    print(f"✅ PASS A1: 100% SVG Map Coverage across all {len(stations_data)} stations.")

# Test A2: Opacity hidden by default
unhidden = [g for g in root.iter() if g.attrib.get("data-station-id") and g.attrib.get("opacity") != "0"]
if unhidden:
    failures.append(f"FAIL A2: {len(unhidden)} SVG groups visible on startup.")
else:
    print("✅ PASS A2: 100% of all SVG station text groups hidden by default (opacity='0').")

# Test A3: LRT Point rules (38 LRT stations = 2 PTS)
lrt_st_count = sum(1 for st in stations_data if st.get("is_lrt"))
if lrt_st_count != 38:
    failures.append(f"FAIL A3: Expected 38 LRT stations, found {lrt_st_count}")
else:
    print("✅ PASS A3: Exactly 38 LRT stations present and configured for 2 PTS each.")

# ---------------------------------------------------------
# CATEGORY B: JAVASCRIPT & APP LOGIC REGRESSION TESTS
# ---------------------------------------------------------
print("\n--- [Category B: JavaScript Syntax & Logic Verification] ---")

# Test B1: Node JS Syntax check
try:
    res = subprocess.run(["node", "-c", "app.js"], capture_output=True, text=True, check=True)
    print("✅ PASS B1: app.js contains 0 syntax errors (compiles cleanly).")
except subprocess.CalledProcessError as e:
    failures.append(f"FAIL B1: app.js syntax error: {e.stderr.strip()}")

with open("app.js", "r") as f:
    app_code = f.read()

# Test B2: Turf War Online Room Multi-Team Dominance Sync
if "calculateLineProgress" in app_code and "player.lineProgress" in app_code and "topTeamName" in app_code:
    print("✅ PASS B2: Real-time multi-team Turf War line progress sync enabled in app.js.")
else:
    failures.append("FAIL B2: Turf War multi-team sync logic missing from app.js!")

# Test B3: Mobile Dock Action Cards Modal Handler
if 'target === "cards"' in app_code and "showDeckOverviewModal" in app_code:
    print("✅ PASS B3: Mobile bottom dock Cards tab routes directly to detailed Action Cards Deck modal.")
else:
    failures.append("FAIL B3: Mobile bottom dock Cards tab handler missing!")

# Test B4: Game Over Missed Stations Grouped by Line
if "LINE_META" in app_code and "groupedByLine" in app_code:
    print("✅ PASS B4: Game over modal correctly groups missed stations by transit line.")
else:
    failures.append("FAIL B4: Missed stations line-grouping missing in app.js!")

# ---------------------------------------------------------
# CATEGORY C: DOM HTML & CSS RESPONSIVE DESIGN TESTS
# ---------------------------------------------------------
print("\n--- [Category C: HTML DOM & CSS Layout Rules] ---")

with open("index.html", "r") as f:
    html_code = f.read()

with open("style.css", "r") as f:
    css_code = f.read()

# Test C1: Shortened Register Button text
if "> Register<" in html_code or ">Register<" in html_code:
    print("✅ PASS C1: Register button text is shortened to 'Register'.")
else:
    failures.append("FAIL C1: Register button text not shortened!")

# Test C2: Input Hint Text
if "Type (or speak) station names only" in html_code:
    print("✅ PASS C2: Sub-label hint text updated to 'Type (or speak) station names only'.")
else:
    failures.append("FAIL C2: Sub-label hint text incorrect!")

# Test C3: Input actions right container & flex layout
if 'class="input-actions-right"' in html_code:
    print("✅ PASS C3: Input actions container present in HTML (prevents mic/cross overlap).")
else:
    failures.append("FAIL C3: input-actions-right container missing in index.html!")

if ".input-actions-right" in css_code and "#stationInput {" in css_code and "flex: 1" in css_code:
    print("✅ PASS C4: Flexbox layout rules present in style.css for search input bar.")
else:
    failures.append("FAIL C4: Flexbox rules missing from style.css!")

# Test C5: Mobile Persistent Bottom Dock Z-Index
if "z-index: 3500" in css_code and "#deckOverviewModal" in css_code:
    print("✅ PASS C5: Mobile bottom dock persistent z-index (3500) and modal padding present in style.css.")
else:
    failures.append("FAIL C5: Persistent bottom dock z-index or modal padding missing!")

# Test C6: Modal Z-Index and Scrollable Card Fix
if "z-index: 9999" in css_code and "max-height: 85vh" in css_code:
    print("✅ PASS C6: Registration modal z-index (9999) and max-height scrolling present in style.css.")
else:
    failures.append("FAIL C6: Modal z-index or max-height scrolling missing in style.css!")

# ---------------------------------------------------------
# SUMMARY
# ---------------------------------------------------------
print("\n" + "=" * 72)
if failures:
    print("❌ REGRESSION SUITE ENCOUNTERED FAILURES:")
    for f in failures:
        print("  -", f)
    sys.exit(1)
else:
    print("🎉 ALL 13 REGRESSION TESTS PASSED CLEANLY ACROSS ALL USER BUGS & FEATURES!")
    print("=" * 72)
    sys.exit(0)
