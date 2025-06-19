
var SCREEN_WIDTH = 1024;
var SCREEN_HEIGHT = 768;
var MARKER_RADIUS = 70;
var MARKER_STROKE_WIDTH = 8;

var TRACK_targetTime = 9;
var ICON_INTERVAL_DEGREE = 180 / (TRACK_targetTime - 1); // 22.5

var MARKER_APPEARANCE_DELTA = 1000; // ノーツ出現時間(ms): 大きくするほど低速
var UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.41 | 0;
var MUSIC_START_DELAY = 1500;

var RATING_TABLE = {
  perfect: {
    score: 1000,
		combo: 1,
		misscount:0,
    range: 34, //ms
  },
  great: {
    score: 500,
		combo: 1,
		misscount:0,
    range: 64, //ms
  },
  good: {
    score: 100,
		combo: 1,
		misscount:0,
    range: 90, //ms
  },
  miss: {
    score: 0,
		combo: 0,
		misscount:1,
    range: 134, //ms
  },
};

// キーボード操作用
var KEYCODE_TO_KEYDATA_MAP = {
  80: {key:"　", id:0},//p
  // 187: {key:";", id:0},
  76: {key:"　", id:1},//l
  75: {key:"　", id:2},//k
  78: {key:"　", id:3},//n
  66: {key:"　", id:4},//b
  // 32: {key:"sp", id:4},
  86: {key:"　", id:5},//v
  68: {key:"　", id:6},//d
  83: {key:"　", id:7},//s
  81: {key:"　", id:8},//q
   //65: {key:"a", id:8},
};
var INDEX_TO_KEY_MAP = {};
KEYCODE_TO_KEYDATA_MAP.forIn(function(key, val) {
  INDEX_TO_KEY_MAP[val.id] = val.key;
});

var ASSETS = {
  image: {
    'bg': "./Images/1500x500.jpg",
		'bg2': "./Images/top.jpg",
  },
  sound: {
    music: "./assets/original01.mp3",
    ring: "./assets/tamborine.mp3",
    start: "./assets/start.mp3",
  },
  json: {
    beatmap: "./assets/original01.json?2023"
  }
	
};

// テスト用譜面
// var DEBUG_BEATMAP = {
//   offset: 0,
//   notes: [],
// };
// (100).times(function(i) {
//   DEBUG_BEATMAP.notes.push({
//     track: i%9,
//     targetTime: 500*i
//   });
// });
