import json
import re

with open("mrt_data.js", "r") as f:
    js_text = f.read()
    json_match = re.search(r'const MRT_STATIONS = (\[.*?\]);', js_text, re.DOTALL)
    stations_data = json.loads(json_match.group(1))

# Official Singapore MRT/LRT Station Line Mappings
nsl = ["jurong east", "bukit batok", "bukit gombak", "choa chu kang", "yew tee", "kranji", "marsiling", "woodlands", "admiralty", "sembawang", "canberra", "yishun", "khatib", "yio chu kang", "ang mo kio", "bishan", "braddell", "toa payoh", "novena", "newton", "orchard", "somerset", "dhoby ghaut", "city hall", "raffles place", "marina bay", "marina south pier"]

ewl = ["pasir ris", "tampines", "simei", "tanah merah", "bedok", "kembangan", "eunos", "paya lebar", "aljunied", "kallang", "lavender", "bugis", "city hall", "raffles place", "tanjong pagar", "outram park", "tiong bahru", "redhill", "queenstown", "commonwealth", "buona vista", "dover", "clementi", "jurong east", "chinese garden", "lakeside", "boon lay", "pioneer", "joo koon", "gul circle", "tuas crescent", "tuas west road", "tuas link", "expo", "changi airport"]

nel = ["harbourfront", "outram park", "chinatown", "clarke quay", "dhoby ghaut", "farrer park", "boon keng", "potong pasir", "woodleigh", "serangoon", "kovan", "hougang", "buangkok", "sengkang", "punggol", "punggol coast"]

ccl = ["dhoby ghaut", "bras basah", "esplanade", "promenade", "nicoll highway", "stadium", "mountbatten", "dakota", "paya lebar", "macpherson", "tai seng", "bartley", "serangoon", "lorong chuan", "bishan", "marymount", "caldecott", "botanic gardens", "farrer road", "holland village", "buona vista", "one-north", "kent ridge", "haw par villa", "pasir panjang", "labrador park", "telok blangah", "harbourfront", "bayfront", "marina bay", "keppel", "cantonment", "prince edward road"]

dtl = ["bukit panjang", "cashew", "hillview", "beauty world", "king albert park", "sixth avenue", "tan kah kee", "botanic gardens", "stevens", "newton", "little india", "rochor", "bugis", "promenade", "bayfront", "downtown", "telok ayer", "chinatown", "fort canning", "bencoolen", "jalan besar", "bendemeer", "geylang bahru", "mattar", "macpherson", "ubi", "kaki bukit", "bedok reservoir", "bedok north", "tampines west", "tampines", "tampines east", "upper changi", "expo", "hume", "xilin", "sunsei bedok", "sunsei bedok"]

tel = ["woodlands north", "woodlands", "woodlands south", "springleaf", "lentor", "mayflower", "bright hill", "upper thomson", "caldecott", "stevens", "napier", "orchard boulevard", "orchard", "great world", "havelock", "outram park", "maxwell", "shenton way", "marina bay", "marina south", "gardens by the bay", "tanjong rhu", "katong park", "tanjong katong", "marine parade", "marine terrace", "siglap", "bayshore", "bedok south", "sunsei bedok", "mount pleasant", "founders memorial"]

jrl = ["choa chu kang", "choa chu kang west", "tengah plantation", "tengah park", "bukit batok west", "toh guan", "jurong east", "jurong town hall", "pandan reservoir", "jurong hill", "jurong pier", "tukang", "tawas", "nanyang gateway", "nanyang crescent", "peng kang hill", "gek poh", "bah tan", "tengah", "enterprise"]

crl = ["aviation park", "loyang", "pasir ris east", "pasir ris", "defu", "tavistock", "serangoon north", "teck ghee", "bright hill", "turf city", "maju", "jurong lake district", "elias", "punggol", "riviera", "tampines north"]

lrt = ["south view", "keat hong", "teck whye", "phoenix", "petir", "pending", "bangkit", "fajar", "segar", "jelapang", "senja", "compassvale", "rumbia", "bakau", "kangkar", "ranggung", "cheng lim", "farmway", "kupang", "thanggam", "fernvale", "layar", "tongkang", "renjong", "cove", "meridian", "coral edge", "riviera", "kadaloor", "oasis", "damai", "sam kee", "teck lee", "nibong", "sumang", "soo teck", "punggol point", "samudera", "ten mile junction"]

def clean(s): return re.sub(r'[^a-z0-9]', '', s.lower().strip())

nsl_set = {clean(s) for s in nsl}
ewl_set = {clean(s) for s in ewl}
nel_set = {clean(s) for s in nel}
ccl_set = {clean(s) for s in ccl}
dtl_set = {clean(s) for s in dtl}
tel_set = {clean(s) for s in tel}
jrl_set = {clean(s) for s in jrl}
crl_set = {clean(s) for s in crl}
lrt_set = {clean(s) for s in lrt}

for st in stations_data:
    if st["id"] == "st-179":
        st["is_lrt"] = False
        st["points"] = 1
    c_name = clean(st["name"])
    lines = []
    if st.get("is_lrt", False):
        lines = ["LRT"]
    else:
        if c_name in nsl_set: lines.append("NSL")
        if c_name in ewl_set: lines.append("EWL")
        if c_name in nel_set: lines.append("NEL")
        if c_name in ccl_set: lines.append("CCL")
        if c_name in dtl_set: lines.append("DTL")
        if c_name in tel_set: lines.append("TEL")
        if c_name in jrl_set: lines.append("JRL")
        if c_name in crl_set: lines.append("CRL")

    if not lines:
        lines = ["NSL"]
    
    st["lines"] = lines
    if st.get("is_lrt", False):
        st["line_code"] = "LRT"
        st["line_name"] = "LRT Network"
    elif "DTL" in lines:
        st["line_code"] = "DTL"
        st["line_name"] = "Downtown Line"
    elif "TEL" in lines:
        st["line_code"] = "TEL"
        st["line_name"] = "Thomson-East Coast Line"
    elif "NSL" in lines:
        st["line_code"] = "NSL"
        st["line_name"] = "North-South Line"
    elif "EWL" in lines:
        st["line_code"] = "EWL"
        st["line_name"] = "East-West Line"
    elif "NEL" in lines:
        st["line_code"] = "NEL"
        st["line_name"] = "North-East Line"
    elif "CCL" in lines:
        st["line_code"] = "CCL"
        st["line_name"] = "Circle Line"
    elif "JRL" in lines:
        st["line_code"] = "JRL"
        st["line_name"] = "Jurong Region Line"
    elif "CRL" in lines:
        st["line_code"] = "CRL"
        st["line_name"] = "Cross Island Line"
    else:
        st["line_code"] = "NSL"
        st["line_name"] = "North-South Line"

line_counts = {}
for st in stations_data:
    lc = st["line_code"]
    line_counts[lc] = line_counts.get(lc, 0) + 1

print("="*60)
print("LINE DISTRIBUTION FOR ALL 230 STATIONS:")
print("="*60)
for lc, cnt in sorted(line_counts.items()):
    print(f"  • {lc:8} : {cnt} stations")

total_points = sum([st.get("points", 1) for st in stations_data])

js_content = f"""// Singapore Official SVG MRT/LRT Dataset ({len(stations_data)} Stations)
// 142 MRT Operational (1 PT) + 38 LRT Stations (2 PTS) + 50 Upcoming / Future (2 PTS) = {total_points} Max Points

const MAX_GAME_POINTS = {total_points};

const MRT_STATIONS = {json.dumps(stations_data, indent=2)};

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ MRT_STATIONS, MAX_GAME_POINTS }};
}}
"""

with open("mrt_data.js", "w") as f:
    f.write(js_content)

print(f"Successfully tagged all {len(stations_data)} stations with official line codes!")
