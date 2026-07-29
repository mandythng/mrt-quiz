// Singapore Official SVG MRT/LRT Dataset (230 Stations)
// 142 MRT Operational (1 PT) + 38 LRT Stations (2 PTS) + 50 Upcoming / Future (2 PTS) = 318 Max Points

const MAX_GAME_POINTS = 318;

const MRT_STATIONS = [
  {
    "id": "st-1",
    "name": "Jurong East",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "jurong east",
      "jurong easts"
    ],
    "x": 292.0,
    "y": 501.5,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "EWL",
      "JRL"
    ]
  },
  {
    "id": "st-2",
    "name": "Bukit Batok",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bukit batok",
      "bukit batoks"
    ],
    "x": 292.0,
    "y": 411.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-3",
    "name": "Bukit Gombak",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bukit gombak",
      "bukit gombaks"
    ],
    "x": 292.0,
    "y": 356.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-4",
    "name": "Choa Chu Kang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "choa chu kang",
      "choa chu kangs"
    ],
    "x": 234.0,
    "y": 219.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "JRL"
    ]
  },
  {
    "id": "st-5",
    "name": "Yew Tee",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "yew tees",
      "yew tee"
    ],
    "x": 292.0,
    "y": 175.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-6",
    "name": "Kranji",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kranji",
      "kranjis"
    ],
    "x": 335.5,
    "y": 80.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-7",
    "name": "Marsiling",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marsiling",
      "marsilings"
    ],
    "x": 410.0,
    "y": 80.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-8",
    "name": "Woodlands",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "woodlands",
      "woodland"
    ],
    "x": 480.0,
    "y": 100.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "NSL",
      "TEL"
    ]
  },
  {
    "id": "st-9",
    "name": "Admiralty",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "admiraltys",
      "admiralty"
    ],
    "x": 586.0,
    "y": 80.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-10",
    "name": "Sembawang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "sembawang",
      "sembawangs"
    ],
    "x": 650.0,
    "y": 80.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-11",
    "name": "Canberra",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "canberras",
      "canberra"
    ],
    "x": 742.0,
    "y": 108.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-12",
    "name": "Yishun",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "yishun",
      "yishuns"
    ],
    "x": 730.0,
    "y": 151.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-13",
    "name": "Khatib",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "khatibs",
      "khatib"
    ],
    "x": 746.0,
    "y": 205.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-14",
    "name": "Yio Chu Kang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "yio chu kangs",
      "yio chu kang"
    ],
    "x": 745.0,
    "y": 252.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-15",
    "name": "Ang Mo Kio",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "ang mo kios",
      "ang mo kio"
    ],
    "x": 750.0,
    "y": 323.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-16",
    "name": "Bishan",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bishan",
      "bishans"
    ],
    "x": 793.0,
    "y": 390.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "CCL"
    ]
  },
  {
    "id": "st-17",
    "name": "Braddell",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "braddells",
      "braddell"
    ],
    "x": 734.0,
    "y": 432.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-18",
    "name": "Toa Payoh",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "toa payoh",
      "toa payohs"
    ],
    "x": 779.0,
    "y": 479.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-19",
    "name": "Novena",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "novenas",
      "novena"
    ],
    "x": 748.0,
    "y": 504.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-20",
    "name": "Newton",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "newton",
      "newtons"
    ],
    "x": 714.0,
    "y": 536.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "NSL",
      "DTL"
    ]
  },
  {
    "id": "st-21",
    "name": "Orchard",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "orchards",
      "orchard"
    ],
    "x": 604.0,
    "y": 590.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "NSL",
      "TEL"
    ]
  },
  {
    "id": "st-22",
    "name": "Somerset",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "somerset",
      "somersets"
    ],
    "x": 709.0,
    "y": 634.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-23",
    "name": "Dhoby Ghaut",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "dhoby ghauts",
      "dhoby ghaut"
    ],
    "x": 700.6666666666666,
    "y": 697.3333333333334,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "NEL",
      "CCL"
    ]
  },
  {
    "id": "st-24",
    "name": "City Hall",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "city halls",
      "city hall"
    ],
    "x": 840.0,
    "y": 805.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "EWL"
    ]
  },
  {
    "id": "st-25",
    "name": "Raffles Place",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "raffles place",
      "raffles places"
    ],
    "x": 808.0,
    "y": 837.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL",
      "EWL"
    ]
  },
  {
    "id": "st-26",
    "name": "Marina Bay",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marina bays",
      "marina bay"
    ],
    "x": 789.0,
    "y": 895.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "NSL",
      "CCL",
      "TEL"
    ]
  },
  {
    "id": "st-27",
    "name": "Marina South Pier",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marina south piers",
      "marina south pier"
    ],
    "x": 743.0,
    "y": 980.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-28",
    "name": "Pasir Ris",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "pasir ri",
      "pasir ris"
    ],
    "x": 1289.0,
    "y": 522.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL",
      "CRL"
    ]
  },
  {
    "id": "st-29",
    "name": "Tampines",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tampines",
      "tampine"
    ],
    "x": 1250.0,
    "y": 574.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "EWL",
      "DTL"
    ]
  },
  {
    "id": "st-30",
    "name": "Simei",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "simeis",
      "simei"
    ],
    "x": 1209.0,
    "y": 617.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-31",
    "name": "Tanah Merah",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tanah merahs",
      "tanah merah"
    ],
    "x": 1235.0,
    "y": 656.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-32",
    "name": "Bedok",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bedok",
      "bedoks"
    ],
    "x": 1171.0,
    "y": 652.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-33",
    "name": "Kembangan",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kembangan",
      "kembangans"
    ],
    "x": 1092.0,
    "y": 633.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-34",
    "name": "Eunos",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "euno",
      "eunos"
    ],
    "x": 1030.0,
    "y": 642.5,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-35",
    "name": "Paya Lebar",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "paya lebar",
      "paya lebars"
    ],
    "x": 1010.0,
    "y": 627.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL",
      "CCL"
    ]
  },
  {
    "id": "st-36",
    "name": "Aljunied",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "aljunied",
      "aljunieds"
    ],
    "x": 945.0,
    "y": 638.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-37",
    "name": "Kallang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kallangs",
      "kallang"
    ],
    "x": 954.0,
    "y": 682.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-38",
    "name": "Lavender",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "lavenders",
      "lavender"
    ],
    "x": 875.0,
    "y": 693.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-39",
    "name": "Bugis",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bugi",
      "bugis"
    ],
    "x": 929.0,
    "y": 739.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "EWL",
      "DTL"
    ]
  },
  {
    "id": "st-40",
    "name": "Tanjong Pagar",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tanjong pagar",
      "tanjong pagars"
    ],
    "x": 655.0,
    "y": 863.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-41",
    "name": "Outram Park",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "outram park",
      "outram parks"
    ],
    "x": 613.0,
    "y": 788.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "EWL",
      "NEL",
      "TEL"
    ]
  },
  {
    "id": "st-42",
    "name": "Tiong Bahru",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tiong bahru",
      "tiong bahrus"
    ],
    "x": 623.488,
    "y": 753.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-43",
    "name": "Redhill",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "redhill",
      "redhills"
    ],
    "x": 554.0,
    "y": 721.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-44",
    "name": "Queenstown",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "queenstown",
      "queenstowns"
    ],
    "x": 561.0,
    "y": 672.5,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-45",
    "name": "Commonwealth",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "commonwealths",
      "commonwealth"
    ],
    "x": 525.0,
    "y": 636.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-46",
    "name": "Buona Vista",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "buona vistas",
      "buona vista"
    ],
    "x": 489.0,
    "y": 600.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL",
      "CCL"
    ]
  },
  {
    "id": "st-47",
    "name": "Dover",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "dover",
      "dovers"
    ],
    "x": 418.0,
    "y": 581.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-48",
    "name": "Clementi",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "clementis",
      "clementi"
    ],
    "x": 414.0,
    "y": 526.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-49",
    "name": "Chinese Garden",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "chinese gardens",
      "chinese garden"
    ],
    "x": 226.0,
    "y": 539.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-50",
    "name": "Lakeside",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "lakeside",
      "lakesides"
    ],
    "x": 201.0,
    "y": 517.5,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-51",
    "name": "Boon Lay",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "boon lays",
      "boon lay"
    ],
    "x": 135.0,
    "y": 500.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-52",
    "name": "Pioneer",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "pioneer",
      "pioneers"
    ],
    "x": 100.0,
    "y": 527.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-53",
    "name": "Joo Koon",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "joo koon",
      "joo koons"
    ],
    "x": 95.66666666666667,
    "y": 504.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-54",
    "name": "Gul Circle",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "gul circle",
      "gul circles"
    ],
    "x": 15.0,
    "y": 546.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-55",
    "name": "Tuas Crescent",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tuas crescent",
      "tuas crescents"
    ],
    "x": 30.0,
    "y": 572.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-56",
    "name": "Tuas West Road",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tuas west road",
      "tuas west roads"
    ],
    "x": 21.333333333333332,
    "y": 608.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-57",
    "name": "Tuas Link",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tuas link",
      "tuas links"
    ],
    "x": 21.333333333333332,
    "y": 608.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-58",
    "name": "Expo",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "expos",
      "expo"
    ],
    "x": 1281.0,
    "y": 687.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "EWL",
      "DTL"
    ]
  },
  {
    "id": "st-59",
    "name": "Changi Airport",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "changi airport",
      "changi airports"
    ],
    "x": 1292.0,
    "y": 711.0,
    "line_code": "EWL",
    "line_name": "East-West Line",
    "lines": [
      "EWL"
    ]
  },
  {
    "id": "st-60",
    "name": "HarbourFront",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "harbourfronts",
      "harbourfront"
    ],
    "x": 495.0,
    "y": 875.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL",
      "CCL"
    ]
  },
  {
    "id": "st-61",
    "name": "Chinatown",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "chinatowns",
      "chinatown"
    ],
    "x": 702.0,
    "y": 758.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "NEL",
      "DTL"
    ]
  },
  {
    "id": "st-62",
    "name": "Clarke Quay",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "clarke quays",
      "clarke quay"
    ],
    "x": 730.0,
    "y": 735.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-63",
    "name": "Little India",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "little india",
      "little indias"
    ],
    "x": 738.5,
    "y": 611.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-64",
    "name": "Farrer Park",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "farrer park",
      "farrer parks"
    ],
    "x": 810.0,
    "y": 591.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-65",
    "name": "Boon Keng",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "boon kengs",
      "boon keng"
    ],
    "x": 860.0,
    "y": 573.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-66",
    "name": "Potong Pasir",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "potong pasirs",
      "potong pasir"
    ],
    "x": 867.0,
    "y": 532.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-67",
    "name": "Woodleigh",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "woodleighs",
      "woodleigh"
    ],
    "x": 893.0,
    "y": 509.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-68",
    "name": "Serangoon",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "serangoon",
      "serangoons"
    ],
    "x": 933.0,
    "y": 468.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL",
      "CCL"
    ]
  },
  {
    "id": "st-69",
    "name": "Kovan",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kovans",
      "kovan"
    ],
    "x": 961.0,
    "y": 441.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-70",
    "name": "Hougang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "hougang",
      "hougangs"
    ],
    "x": 996.0,
    "y": 403.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-71",
    "name": "Buangkok",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "buangkok",
      "buangkoks"
    ],
    "x": 962.0,
    "y": 365.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-72",
    "name": "Sengkang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "sengkangs",
      "sengkang"
    ],
    "x": 1013.0,
    "y": 309.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-73",
    "name": "Punggol",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "punggols",
      "punggol"
    ],
    "x": 1117.0,
    "y": 215.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL",
      "CRL"
    ]
  },
  {
    "id": "st-74",
    "name": "Bras Basah",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bras basah",
      "bras basahs"
    ],
    "x": 830.0,
    "y": 733.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-75",
    "name": "Esplanade",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "esplanade",
      "esplanades"
    ],
    "x": 879.0,
    "y": 788.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-76",
    "name": "Promenade",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "promenades",
      "promenade"
    ],
    "x": 879.0,
    "y": 788.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "CCL",
      "DTL"
    ]
  },
  {
    "id": "st-77",
    "name": "Nicoll Highway",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "nicoll highway",
      "nicoll highways"
    ],
    "x": 934.0,
    "y": 760.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-78",
    "name": "Stadium",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "stadiums",
      "stadium"
    ],
    "x": 1004.0,
    "y": 726.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-79",
    "name": "Mountbatten",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "mountbatten",
      "mountbattens"
    ],
    "x": 991.0,
    "y": 685.3333333333334,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-80",
    "name": "Dakota",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "dakotas",
      "dakota"
    ],
    "x": 991.0,
    "y": 685.3333333333334,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-81",
    "name": "MacPherson",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "macphersons",
      "macpherson"
    ],
    "x": 1005.5,
    "y": 607.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "CCL",
      "DTL"
    ]
  },
  {
    "id": "st-82",
    "name": "Tai Seng",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tai sengs",
      "tai seng"
    ],
    "x": 1012.5,
    "y": 565.5,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-83",
    "name": "Bartley",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bartleys",
      "bartley"
    ],
    "x": 968.0,
    "y": 514.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-84",
    "name": "Lorong Chuan",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "lorong chuan",
      "lorong chuans"
    ],
    "x": 879.0,
    "y": 419.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-85",
    "name": "Marymount",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marymounts",
      "marymount"
    ],
    "x": 690.0,
    "y": 383.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-86",
    "name": "Caldecott",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "caldecott",
      "caldecotts"
    ],
    "x": 583.0,
    "y": 406.5,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "CCL",
      "TEL"
    ]
  },
  {
    "id": "st-87",
    "name": "Botanic Gardens",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "botanic garden",
      "botanic gardens"
    ],
    "x": 488.5,
    "y": 476.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "CCL",
      "DTL"
    ]
  },
  {
    "id": "st-88",
    "name": "Farrer Road",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "farrer road",
      "farrer roads"
    ],
    "x": 522.0,
    "y": 520.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-89",
    "name": "Holland Village",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "holland villages",
      "holland village"
    ],
    "x": 504.0,
    "y": 562.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-90",
    "name": "one-north",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "one north",
      "one-north",
      "onenorth"
    ],
    "x": 442.5,
    "y": 640.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-91",
    "name": "Kent Ridge",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kent ridge",
      "kent ridges"
    ],
    "x": 524.9493333333334,
    "y": 677.5,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-92",
    "name": "Haw Par Villa",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "haw par villa",
      "haw par villas"
    ],
    "x": 490.0,
    "y": 719.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-93",
    "name": "Pasir Panjang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "pasir panjangs",
      "pasir panjang"
    ],
    "x": 450.0,
    "y": 764.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-94",
    "name": "Labrador Park",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "labrador parks",
      "labrador park"
    ],
    "x": 470.5,
    "y": 804.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-95",
    "name": "Telok Blangah",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "telok blangahs",
      "telok blangah"
    ],
    "x": 496.0,
    "y": 840.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-96",
    "name": "Bayfront",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bayfront",
      "bayfronts"
    ],
    "x": 885.0,
    "y": 888.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "CCL",
      "DTL"
    ]
  },
  {
    "id": "st-97",
    "name": "Bukit Panjang",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bukit panjang",
      "bukit panjangs"
    ],
    "x": 429.0,
    "y": 252.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-98",
    "name": "Cashew",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "cashew",
      "cashews"
    ],
    "x": 429.75,
    "y": 260.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-99",
    "name": "Hillview",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "hillview",
      "hillviews"
    ],
    "x": 433.0,
    "y": 301.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-100",
    "name": "Beauty World",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "beauty world",
      "beauty worlds"
    ],
    "x": 439.0,
    "y": 345.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-101",
    "name": "King Albert Park",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "king albert parks",
      "king albert park"
    ],
    "x": 432.5,
    "y": 402.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-102",
    "name": "Sixth Avenue",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "sixth avenue",
      "sixth avenues"
    ],
    "x": 503.0,
    "y": 413.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-103",
    "name": "Tan Kah Kee",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tan kah kees",
      "tan kah kee"
    ],
    "x": 541.3333333333334,
    "y": 435.3333333333333,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-104",
    "name": "Stevens",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "stevens",
      "steven"
    ],
    "x": 664.0,
    "y": 484.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL",
      "TEL"
    ]
  },
  {
    "id": "st-105",
    "name": "Rochor",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "rochors",
      "rochor"
    ],
    "x": 775.0,
    "y": 655.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-106",
    "name": "Downtown",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "downtowns",
      "downtown"
    ],
    "x": 809.0,
    "y": 865.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-107",
    "name": "Telok Ayer",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "telok ayers",
      "telok ayer"
    ],
    "x": 747.0,
    "y": 795.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-108",
    "name": "Fort Canning",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "fort cannings",
      "fort canning"
    ],
    "x": 662.0,
    "y": 720.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-109",
    "name": "Bencoolen",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bencoolen",
      "bencoolens"
    ],
    "x": 780.0,
    "y": 686.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-110",
    "name": "Jalan Besar",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "jalan besar",
      "jalan besars"
    ],
    "x": 874.0,
    "y": 665.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-111",
    "name": "Bendemeer",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bendemeers",
      "bendemeer"
    ],
    "x": 825.0,
    "y": 632.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-112",
    "name": "Geylang Bahru",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "geylang bahrus",
      "geylang bahru"
    ],
    "x": 888.5,
    "y": 588.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-113",
    "name": "Mattar",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "mattars",
      "mattar"
    ],
    "x": 923.25,
    "y": 594.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-114",
    "name": "Ubi",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "ubis",
      "ubi"
    ],
    "x": 1012.5,
    "y": 565.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-115",
    "name": "Kaki Bukit",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "kaki bukit",
      "kaki bukits"
    ],
    "x": 1076.0,
    "y": 601.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-116",
    "name": "Bedok North",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bedok north",
      "bedok norths"
    ],
    "x": 1111.0,
    "y": 568.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-117",
    "name": "Bedok Reservoir",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bedok reservoir",
      "bedok reservoirs"
    ],
    "x": 1153.0,
    "y": 601.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-118",
    "name": "Tampines West",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tampines wests",
      "tampines west"
    ],
    "x": 1190.0,
    "y": 568.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-119",
    "name": "Tampines East",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tampines east",
      "tampines easts"
    ],
    "x": 1292.0,
    "y": 615.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-120",
    "name": "Upper Changi",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "upper changis",
      "upper changi"
    ],
    "x": 1292.0,
    "y": 649.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-121",
    "name": "Woodlands North",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "woodlands north",
      "woodlands norths"
    ],
    "x": 450.0,
    "y": 29.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-122",
    "name": "Woodlands South",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "woodlands souths",
      "woodlands south"
    ],
    "x": 596.0,
    "y": 125.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-123",
    "name": "Springleaf",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "springleafs",
      "springleaf"
    ],
    "x": 632.0,
    "y": 163.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-124",
    "name": "Lentor",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "lentor",
      "lentors"
    ],
    "x": 665.0,
    "y": 212.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-125",
    "name": "Mayflower",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "mayflowers",
      "mayflower"
    ],
    "x": 665.0,
    "y": 250.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-126",
    "name": "Bright Hill",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bright hill",
      "bright hills"
    ],
    "x": 629.5,
    "y": 298.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL",
      "CRL"
    ]
  },
  {
    "id": "st-127",
    "name": "Upper Thomson",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "upper thomson",
      "upper thomsons"
    ],
    "x": 612.0,
    "y": 360.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-128",
    "name": "Napier",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "napiers",
      "napier"
    ],
    "x": 613.5,
    "y": 533.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-129",
    "name": "Orchard Boulevard",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "orchard boulevards",
      "orchard boulevard"
    ],
    "x": 605.0,
    "y": 552.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-130",
    "name": "Great World",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "great worlds",
      "great world"
    ],
    "x": 621.5,
    "y": 653.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-131",
    "name": "Havelock",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "havelock",
      "havelocks"
    ],
    "x": 603.0,
    "y": 697.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-132",
    "name": "Maxwell",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "maxwells",
      "maxwell"
    ],
    "x": 694.0,
    "y": 827.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-133",
    "name": "Shenton Way",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "shenton ways",
      "shenton way"
    ],
    "x": 741.0,
    "y": 869.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-134",
    "name": "Gardens by the Bay",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "gbtb",
      "gardens by the bay",
      "garden by the bay"
    ],
    "x": 876.0,
    "y": 975.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-135",
    "name": "Tanjong Rhu",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tanjong rhus",
      "tanjong rhu"
    ],
    "x": 1000.0,
    "y": 885.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-136",
    "name": "Katong Park",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "katong parks",
      "katong park"
    ],
    "x": 1028.0,
    "y": 842.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-137",
    "name": "Tanjong Katong",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "tanjong katongs",
      "tanjong katong"
    ],
    "x": 997.5,
    "y": 794.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-138",
    "name": "Marine Parade",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marine parades",
      "marine parade"
    ],
    "x": 1066.0,
    "y": 754.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-139",
    "name": "Marine Terrace",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "marine terrace",
      "marine terraces"
    ],
    "x": 1105.0,
    "y": 788.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-140",
    "name": "Siglap",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "siglaps",
      "siglap"
    ],
    "x": 1147.0,
    "y": 758.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-141",
    "name": "Bayshore",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "bayshores",
      "bayshore"
    ],
    "x": 1178.0,
    "y": 782.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-142",
    "name": "Brickland",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "bricklands",
      "brickland"
    ],
    "x": 292.0,
    "y": 295.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-143",
    "name": "Sungei Kadut",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "sungei kaduts",
      "sungei kadut"
    ],
    "x": 204.0,
    "y": 125.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-144",
    "name": "Punggol Coast",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "punggol coasts",
      "punggol coast"
    ],
    "x": 1264.0,
    "y": 132.0,
    "line_code": "NEL",
    "line_name": "North-East Line",
    "lines": [
      "NEL"
    ]
  },
  {
    "id": "st-145",
    "name": "Keppel",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "keppel",
      "keppels"
    ],
    "x": 617.5,
    "y": 919.5,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-146",
    "name": "Cantonment",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "cantonment",
      "cantonments"
    ],
    "x": 617.5,
    "y": 919.5,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-147",
    "name": "Prince Edward Road",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "prince edward roads",
      "prince edward road"
    ],
    "x": 716.6666666666666,
    "y": 946.0,
    "line_code": "CCL",
    "line_name": "Circle Line",
    "lines": [
      "CCL"
    ]
  },
  {
    "id": "st-148",
    "name": "Hume",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "hume",
      "humes"
    ],
    "x": 439.0,
    "y": 345.5,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-149",
    "name": "Xilin",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "xilin",
      "xilins"
    ],
    "x": 1292.0,
    "y": 731.0,
    "line_code": "DTL",
    "line_name": "Downtown Line",
    "lines": [
      "DTL"
    ]
  },
  {
    "id": "st-150",
    "name": "Sungei Bedok",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "sungei bedok",
      "sungei bedoks"
    ],
    "x": 1270.0,
    "y": 788.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-151",
    "name": "Bedok South",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "bedok south",
      "bedok souths"
    ],
    "x": 1224.5,
    "y": 752.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-152",
    "name": "Founders' Memorial",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "founders' memorial",
      "founders memorial",
      "founder's memorial"
    ],
    "x": 956.0,
    "y": 929.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-153",
    "name": "Mount Pleasant",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "mount pleasants",
      "mount pleasant"
    ],
    "x": 665.0,
    "y": 448.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-154",
    "name": "Marina South",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "marina south",
      "marina souths"
    ],
    "x": 819.0,
    "y": 974.0,
    "line_code": "TEL",
    "line_name": "Thomson-East Coast Line",
    "lines": [
      "TEL"
    ]
  },
  {
    "id": "st-155",
    "name": "Bukit Brown",
    "is_upcoming": true,
    "points": 2,
    "aliases": [
      "bukit browns",
      "bukit brown"
    ],
    "x": 566.0,
    "y": 420.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-156",
    "name": "South View",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "south view",
      "south views"
    ],
    "x": 308.0,
    "y": 216.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-157",
    "name": "Keat Hong",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "keat hong",
      "keat hongs"
    ],
    "x": 355.6666666666667,
    "y": 245.66666666666666,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-158",
    "name": "Teck Whye",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "teck whye",
      "teck whyes"
    ],
    "x": 379.0,
    "y": 244.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-159",
    "name": "Phoenix",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "phoenix",
      "phoenixs"
    ],
    "x": 410.6666666666667,
    "y": 233.33333333333334,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-160",
    "name": "Petir",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "petirs",
      "petir"
    ],
    "x": 547.0,
    "y": 223.25,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-161",
    "name": "Pending",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "pendings",
      "pending"
    ],
    "x": 525.0,
    "y": 272.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-162",
    "name": "Bangkit",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "bangkits",
      "bangkit"
    ],
    "x": 569.0,
    "y": 251.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-163",
    "name": "Fajar",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "fajars",
      "fajar"
    ],
    "x": 547.0,
    "y": 223.25,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-164",
    "name": "Segar",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "segar",
      "segars"
    ],
    "x": 547.0,
    "y": 223.25,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-165",
    "name": "Jelapang",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "jelapang",
      "jelapangs"
    ],
    "x": 525.0,
    "y": 186.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-166",
    "name": "Senja",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "senja",
      "senjas"
    ],
    "x": 547.0,
    "y": 223.25,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-167",
    "name": "Compassvale",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "compassvales",
      "compassvale"
    ],
    "x": 1096.0,
    "y": 315.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-168",
    "name": "Rumbia",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "rumbias",
      "rumbia"
    ],
    "x": 1155.0,
    "y": 335.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-169",
    "name": "Bakau",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "bakau",
      "bakaus"
    ],
    "x": 1157.0,
    "y": 379.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-170",
    "name": "Kangkar",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "kangkars",
      "kangkar"
    ],
    "x": 1071.0,
    "y": 384.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-171",
    "name": "Ranggung",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "ranggungs",
      "ranggung"
    ],
    "x": 1045.0,
    "y": 354.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-172",
    "name": "Cheng Lim",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "cheng lims",
      "cheng lim"
    ],
    "x": 1071.0,
    "y": 278.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-173",
    "name": "Farmway",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "farmway",
      "farmways"
    ],
    "x": 1056.5,
    "y": 237.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-174",
    "name": "Kupang",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "kupangs",
      "kupang"
    ],
    "x": 1056.5,
    "y": 237.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-175",
    "name": "Thanggam",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "thanggams",
      "thanggam"
    ],
    "x": 965.5,
    "y": 236.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-176",
    "name": "Fernvale",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "fernvale",
      "fernvales"
    ],
    "x": 965.5,
    "y": 236.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-177",
    "name": "Layar",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "layar",
      "layars"
    ],
    "x": 990.6666666666666,
    "y": 285.3333333333333,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-178",
    "name": "Tongkang",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "tongkang",
      "tongkangs"
    ],
    "x": 990.6666666666666,
    "y": 285.3333333333333,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-179",
    "name": "Renjong",
    "is_upcoming": false,
    "points": 1,
    "aliases": [
      "renjong",
      "renjongs"
    ],
    "x": 990.6666666666666,
    "y": 285.3333333333333,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ],
    "is_lrt": false
  },
  {
    "id": "st-180",
    "name": "Cove",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "cove",
      "coves"
    ],
    "x": 1159.0,
    "y": 262.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-181",
    "name": "Meridian",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "meridians",
      "meridian"
    ],
    "x": 1159.0,
    "y": 262.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-182",
    "name": "Coral Edge",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "coral edge",
      "coral edges"
    ],
    "x": 1160.0,
    "y": 293.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-183",
    "name": "Riviera",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "riviera",
      "rivieras"
    ],
    "x": 1252.0,
    "y": 282.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-184",
    "name": "Kadaloor",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "kadaloor",
      "kadaloors"
    ],
    "x": 1259.0,
    "y": 245.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-185",
    "name": "Oasis",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "oasi",
      "oasis"
    ],
    "x": 1220.5,
    "y": 224.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-186",
    "name": "Damai",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "damai",
      "damais"
    ],
    "x": 1220.5,
    "y": 224.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-187",
    "name": "Sam Kee",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "sam kee",
      "sam kees"
    ],
    "x": 1142.3333333333333,
    "y": 183.33333333333334,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-188",
    "name": "Teck Lee",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "teck lees",
      "teck lee"
    ],
    "x": 1153.5,
    "y": 140.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-189",
    "name": "Nibong",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "nibongs",
      "nibong"
    ],
    "x": 1069.0,
    "y": 189.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-190",
    "name": "Sumang",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "sumang",
      "sumangs"
    ],
    "x": 1069.0,
    "y": 189.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-191",
    "name": "Soo Teck",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "soo tecks",
      "soo teck"
    ],
    "x": 1130.0,
    "y": 185.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-192",
    "name": "Punggol Point",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "punggol points",
      "punggol point"
    ],
    "x": 1153.5,
    "y": 140.5,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-193",
    "name": "Samudera",
    "is_upcoming": false,
    "points": 2,
    "aliases": [
      "samuderas",
      "samudera"
    ],
    "x": 1056.0,
    "y": 142.0,
    "is_lrt": true,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  },
  {
    "id": "st-194",
    "name": "Choa Chu Kang West",
    "aliases": [
      "cck west",
      "choa chu kang west"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 160.5,
    "y": 280.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-195",
    "name": "Tengah",
    "aliases": [
      "tengah stn"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 132.0,
    "y": 332.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-196",
    "name": "Hong Kah",
    "aliases": [
      "hong kah"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 94.0,
    "y": 384.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-197",
    "name": "Corporation",
    "aliases": [
      "corporation"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 84.0,
    "y": 418.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-198",
    "name": "Jurong West",
    "aliases": [
      "jurong west"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 116.5,
    "y": 454.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-199",
    "name": "Bahar Junction",
    "aliases": [
      "bahar junction",
      "bahar"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 160.0,
    "y": 478.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-200",
    "name": "Enterprise",
    "aliases": [
      "enterprise"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 163.0,
    "y": 540.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-201",
    "name": "Tukang",
    "aliases": [
      "tukang"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 186.0,
    "y": 566.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-202",
    "name": "Jurong Hill",
    "aliases": [
      "jurong hill"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 211.0,
    "y": 591.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-203",
    "name": "Jurong Pier",
    "aliases": [
      "jurong pier"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 156.0,
    "y": 613.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-204",
    "name": "Tengah Plantation",
    "aliases": [
      "tengah plantation"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 175.0,
    "y": 386.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-205",
    "name": "Tengah Park",
    "aliases": [
      "tengah park"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 205.0,
    "y": 418.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-206",
    "name": "Bukit Batok West",
    "aliases": [
      "bukit batok west"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 225.0,
    "y": 440.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-207",
    "name": "Toh Guan",
    "aliases": [
      "toh guan"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 245.0,
    "y": 464.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-208",
    "name": "Jurong Town Hall",
    "aliases": [
      "jurong town hall"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 321.0,
    "y": 538.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-209",
    "name": "Pandan Reservoir",
    "aliases": [
      "pandan reservoir"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 279.0,
    "y": 570.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-210",
    "name": "Gek Poh",
    "aliases": [
      "gek poh"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 22.0,
    "y": 469.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-211",
    "name": "Tawas",
    "aliases": [
      "tawas"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 33.0,
    "y": 434.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-212",
    "name": "Nanyang Gateway",
    "aliases": [
      "nanyang gateway"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 20.0,
    "y": 389.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-213",
    "name": "Nanyang Crescent",
    "aliases": [
      "nanyang crescent"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 20.0,
    "y": 365.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-214",
    "name": "Peng Kang Hill",
    "aliases": [
      "peng kang hill",
      "peng kang"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 8.0,
    "y": 323.0,
    "line_code": "JRL",
    "line_name": "Jurong Region Line",
    "lines": [
      "JRL"
    ]
  },
  {
    "id": "st-215",
    "name": "Aviation Park",
    "aliases": [
      "aviation park"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1352.0,
    "y": 655.5,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-216",
    "name": "Loyang",
    "aliases": [
      "loyang"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1361.0,
    "y": 594.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-217",
    "name": "Pasir Ris East",
    "aliases": [
      "pasir ris east"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1321.0,
    "y": 554.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-218",
    "name": "Defu",
    "aliases": [
      "defu"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1055.0,
    "y": 478.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-219",
    "name": "Tavistock",
    "aliases": [
      "tavistock"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 856.0,
    "y": 313.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-220",
    "name": "Teck Ghee",
    "aliases": [
      "teck ghee"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 696.0,
    "y": 293.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-221",
    "name": "Turf City",
    "aliases": [
      "turf city"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 544.0,
    "y": 373.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-222",
    "name": "Maju",
    "aliases": [
      "maju"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 406.0,
    "y": 463.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-223",
    "name": "Jurong Lake District",
    "aliases": [
      "jurong lake district",
      "jld"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 320.0,
    "y": 620.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-224",
    "name": "Elias",
    "aliases": [
      "elias"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1264.0,
    "y": 424.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-225",
    "name": "Bukit Chagar",
    "aliases": [
      "bukit chagar",
      "jb rts",
      "rts link"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 358.0,
    "y": 35.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-226",
    "name": "Changi Airport T5",
    "aliases": [
      "changi airport t5",
      "terminal 5",
      "changi t5"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1385.0,
    "y": 685.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-227",
    "name": "Tampines North",
    "aliases": [
      "tampines north"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 1210.0,
    "y": 485.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-228",
    "name": "Serangoon North",
    "aliases": [
      "serangoon north"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 930.0,
    "y": 360.0,
    "line_code": "CRL",
    "line_name": "Cross Island Line",
    "lines": [
      "CRL"
    ]
  },
  {
    "id": "st-229",
    "name": "West Coast",
    "aliases": [
      "west coast"
    ],
    "line": "UPCOMING",
    "is_upcoming": true,
    "points": 2,
    "x": 350.0,
    "y": 660.0,
    "line_code": "NSL",
    "line_name": "North-South Line",
    "lines": [
      "NSL"
    ]
  },
  {
    "id": "st-230",
    "name": "Ten Mile Junction",
    "aliases": [
      "ten mile junction"
    ],
    "line": "LRT",
    "is_lrt": true,
    "is_upcoming": false,
    "points": 2,
    "x": 380.0,
    "y": 210.0,
    "line_code": "LRT",
    "line_name": "LRT Network",
    "lines": [
      "LRT"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MRT_STATIONS, MAX_GAME_POINTS };
}
