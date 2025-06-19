
/**
 * メイン
 */
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(options) {
    this.superInit(options);
    //this.backgroundColor = "#555555";
		// 背景
    Sprite('bg').addChildTo(this)
                .setPosition(this.gridX.center(), this.gridY.center());

    var self = this;
    var gx = this.gridX;
    var gy = this.gridY;
    var AM = phina.asset.AssetManager;
    // var beatmap = DEBUG_BEATMAP;
    var beatmap = AM.get('json', 'beatmap').data;
    // タイマーのセット
    this.elapsedTime = 0; // 経過時間
    this.gameTime = 0 - MUSIC_START_DELAY + beatmap.offset; // 判定用時間
    this.totalScore = 0;
		this.totalCombo = 0;
		this.totalmisscount = 0;
    // 時間が来たら音楽流す
    this.one('musicstart', function() {
      SoundManager.playMusic('music', null, false);
    });
    // ユニットアイコンの配置
    var iconGroup = DisplayElement()
    .setPosition(gx.center(), gy.span(5))
    .addChildTo(this);
    for (var i = 0; i < TRACK_targetTime; i++) {
      var label = INDEX_TO_KEY_MAP[i].toUpperCase();
      var rad = (i * ICON_INTERVAL_DEGREE).toRadian();
      var icon = UnitIcon(i, label)
      .setPosition(
        Math.cos(rad) * UNIT_ARRANGE_RADIUS,
        Math.sin(rad) * UNIT_ARRANGE_RADIUS
      )
      .addChildTo(iconGroup);
      // タップ・クリック判定
      icon.onpointstart = function() {
        self.judge(this); // 自分を渡す
      };
    }
    // キーボード判定
    this.on('keydown', function(e) {
      var keyData = KEYCODE_TO_KEYDATA_MAP[e.keyCode];
      if (keyData !== undefined) {
        var icon = iconGroup.getChildAt(keyData.id);
        this.judge(icon);
      }
    });
    // 譜面の展開
    this.markerGroup = DisplayElement()
    .setPosition(iconGroup.x, iconGroup.y)
    .addChildTo(this);
    beatmap.notes.forEach(function(note) {
      TargetMarker(note.targetTime, note.track)
      .addChildTo(self.markerGroup)
    })
    // score表示
    this.scoreLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "white",
      //fill: "#fac",
			fill: "#f88379",
      strokeWidth: 10,
      fontSize: 50,
			fontFamily: "Futura",
    })
    .setPosition(gx.center(), gy.span(3))
    .addChildTo(this)
    .on('enterframe', function() {
      this.text = self.totalScore;
    });
    this.scoreLabel2 = Label({
      text: "Point",
      textAlign: "center",
      stroke: "white",
      //fill: "#fac",
			fill: "#f88379",
      strokeWidth: 10,
      fontSize: 20,
			fontFamily: "Futura",
    })
    .setPosition(gx.center(), gy.span(3.6))
    .addChildTo(this)

    // combo表示
    this.comboLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "white",
      //fill: "#fac",
			fill: "#f88379",
      strokeWidth: 10,
      fontSize: 50,
			fontFamily: "Futura",
    })
    .setPosition(gx.center(), gy.span(4.5))
    .addChildTo(this)
    .on('enterframe', function() {
      this.text = self.totalCombo;
    });
    this.comboLabel2 = Label({
      text: "Combo",
      textAlign: "center",
      stroke: "white",
      //fill: "#fac",
			fill: "#f88379",
      strokeWidth: 10,
      fontSize: 20,
			fontFamily: "Futura",
    })
    .setPosition(gx.center(), gy.span(5.1))
    .addChildTo(this)
		
		
		
    // リセットボタン
    Button({
      text: 'RESET',
      //fill: "#fac",
			fill: "#f88379",
			fontFamily: "Futura",
    })
    .setOrigin(1, 0)
    .setPosition(this.width, 0)
    .addChildTo(this)
    .on('push', function() {
      SoundManager.stopMusic();
      self.exit('MainScene')
    });

    // 音楽を聴くボタン
//    var touchLink =　Button({
//      text: '音楽を聴く',
//      textAlign: "center",
//      fill: "#f55",
//      fontSize: 20,
//			fontFamily: "sans-serif",
//    })
//    .setOrigin(1, 0)
//    .setPosition(gx.center(), gy.span(0))
//    .addChildTo(this)
//    .on('push', function() {
//      SoundManager.stopMusic();
//			window.top.location.href = 'https://linkco.re/yQuRmT30';
//      self.exit('TitleScene');
//    });
		// 明滅させる
//    touchLink.tweener.clear()
//    .setLoop(true)
//    .to({alpha: 0}, 700)
//    .to({alpha: 1}, 700)
//    ;
		
		// 音楽を聴くボタン
//    var touchLink2 =　Button({
//      text: 'MVを見る',
//      textAlign: "center",
//      fill: "#f55",
//      fontSize: 20,
//			fontFamily: "sans-serif",
//    })
//    .setOrigin(0, 0)
//    .setPosition(gx.center(), gy.span(0))
//    .addChildTo(this)
//    .on('push', function() {
//      SoundManager.stopMusic();
//			window.top.location.href = 'https://www.youtube.com/watch?v=_TthCkml1x0';
//      this.exit('TitleScene');
//    });
		// 明滅させる
//    touchLink2.tweener.clear()
//    .setLoop(true)
//    .to({alpha: 0}, 700)
//    .to({alpha: 1}, 700)
//    ;
		
    // Debug用タイマー表示
//     Label({
//       fill: "white",
//       fontSize: 50,
//     })
//     .setOrigin(0, 1)
//     .setPosition(gx.span(1), gy.span(15))
//     .addChildTo(this)
//     .on('enterframe', function() {
//       this.text = self.elapsedTime+" ms";
//     });

		
		this.on('enterframe', function() {
			
			if(self.elapsedTime > 108000){
				
var shareButton =　Button({
  text: "結果をポストする",
  fontSize: 26,
  fill: "#000",
	width:300,
  height: 54,
	fontFamily: "sans-serif",
})
.setOrigin(1, 1)
.setPosition(this.width, this.height)
.addChildTo(this)
.on('push', function() {
	SoundManager.stopMusic();
	window.top.location.href = 'https://twitter.com/intent/tweet?text=これからもずっとで ' + self.totalScore + 'pt 獲得しました&url=https://take8jp.github.io/vosl/korekaramo/index.html';
	//window.open('https://twitter.com/intent/tweet?text=LightFantasyで ' + self.totalScore + 'pt 獲得しました&url=http://take8.xxxxxxxx.jp/LightFantasy/&hashtags=TAKE8ゲーム', '_blank')
	this.exit('TitleScene');
});
				
				
				if(self.totalCombo > 392){
				// combo表示
				this.comboLabel3 = Label({
					text: "FULL COMBO!",
					textAlign: "center",
					stroke: "white",
					//fill: "#fac",
			fill: "#f88379",
					strokeWidth: 10,
					fontSize: 100,
					fontFamily: "Futura",
				})
				.setPosition(gx.center(), gy.span(10))
				.addChildTo(this)
			 	}
				
				
//				var touchLabel = Label({
//					text: "Tap it to start",
//					fill: "#fac",
//					stroke: "#fff",
//					strokeWidth: 15,
//					fontSize: 40,
//					fontFamily: "Futura",
//				})
//				.setPosition(this.gridX.center(), this.gridY.span(12))
//				.addChildTo(this);
//
//				// 明滅させる
//				touchLabel.tweener.clear()
//				.setLoop(true)
//				.to({alpha: 0}, 700)
//				.to({alpha: 1}, 700)
//				;
//				// シーン遷移
//				this.on('pointend', function() {
//					SoundManager.stopMusic();
//					//SoundManager.play('start');
//					this.exit("MainScene");
//				});
			}
			
			//console.log(self.totalmisscount);
			
			if(self.totalmisscount > 20){
				SoundManager.stopMusic();
        SoundManager.play('start');
				this.exit("GameOverScene");
			}
     })
		
		
			
			
			
  },

  update: function(app) {

    var self = this;
    var ps = app.pointers;
    var kb = app.keyboard;

    // タイマー加算
    this.elapsedTime += app.deltaTime;
    this.gameTime += app.deltaTime;

    // ゲームスタートまでの猶予
    if (this.has('musicstart') && this.elapsedTime > MUSIC_START_DELAY) {
      this.flare('musicstart');
    }

    // マーカー描画
    var markers = this.markerGroup.children;
    markers.forEach(function(m) {
      if (!m.isAwake) return;

      var time = this.gameTime
      var rTime = m.targetTime - time; // 相対時間

      if (rTime < MARKER_APPEARANCE_DELTA) {
        // マーカーの位置比率や縮小率（倍率）を計算する
        // ratioはアイコンに近いほど1.0に近づく
        var ratio = (time - (m.targetTime - MARKER_APPEARANCE_DELTA)) / MARKER_APPEARANCE_DELTA;
        var distance = UNIT_ARRANGE_RADIUS * ratio;

        m.setVisible(true)
        .setPosition(
          m.vector.x * distance,
          m.vector.y * distance
        )
        .setScale(ratio, ratio);
      }

      // miss判定
      if (RATING_TABLE["miss"].range < -rTime) {
        this.reaction(m, "miss");
				this.totalCombo *= 0;
      }
    }.bind(this));

  },

  // 判定処理
  judge: function(unitIcon) {
    var time = this.gameTime;

    // 判定可能マーカーを探索
    var markers = this.markerGroup.children;
    markers.some(function(m) {
      if (!m.isAwake || m.trackId !== unitIcon.id) return;

      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      var delta = Math.abs(m.targetTime - time);
      if (delta <= RATING_TABLE["perfect"].range) {
        unitIcon.fireEffect();
        SoundManager.play('ring');
        this.reaction(m, "perfect");
        return true;
      }
      if (delta <= RATING_TABLE["great"].range) {
        unitIcon.fireEffect();
        SoundManager.play('ring');
        this.reaction(m, "great");
        return true;
      }
      if (delta <= RATING_TABLE["good"].range) {
        unitIcon.fireEffect();
        SoundManager.play('ring');
        this.reaction(m, "good");
        return true;
      }
      if (delta <= RATING_TABLE["miss"].range) {
        this.reaction(m, "miss");
        return true;
      }
      
    }.bind(this));

  },

  reaction: function(marker, rating) {
    // マーカー不可視化
    marker.isAwake = false;
    marker.visible = false;

    RateLabel({text: rating.toUpperCase()})
    .setPosition(this.gridX.center(), this.gridY.center())
    .addChildTo(this);

    this.totalScore += RATING_TABLE[rating].score;
    this.totalCombo += RATING_TABLE[rating].combo;
    this.totalmisscount += RATING_TABLE[rating].misscount;
		
		
  },
 
});