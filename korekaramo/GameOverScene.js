//phina.define("GameOverScene", {
//  // phina.display.CanvasSceneを継承します
//  superClass: "phina.display.CanvasScene",
//  // 初期化
//  init: function(param) { // 引数を受け取ります
//    this.superInit();
//    // 引数内のmessageプロパティを表示します
//    console.log(param.message);
//  },
//});




/**
 * タイトル
 */
phina.define('GameOverScene', {
  superClass: 'phina.display.DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = params.backgroundColor;
// 背景
    Sprite('bg2').addChildTo(this)
                .setPosition(this.gridX.center(), this.gridY.center());
    // タイトルラベル
    Label({
      text: "GameOver",
      //fill: "#fac",
			fill: "#f88379",
      stroke: "#fff",
      strokeWidth: 15,
      fontSize: 50,
			fontFamily: "Futura",
    })
    .setPosition(this.gridX.center(), this.gridY.span(6))
    .addChildTo(this)
		
		// アラートラベル
    Label({
      text: "20回MISSしました。",
      //fill: "#fac",
			fill: "#f88379",
      stroke: "#fff",
      strokeWidth: 15,
      fontSize: 30,
			fontFamily: "sans-serif",
    })
    .setPosition(this.gridX.center(), this.gridY.span(8))
    .addChildTo(this)

    var touchLabel = Label({
      text: "Tap it to start",
      //fill: "#fac",
			fill: "#f88379",
      stroke: "#fff",
      strokeWidth: 15,
      fontSize: 40,
			fontFamily: "Futura",
    })
    .setPosition(this.gridX.center(), this.gridY.span(12))
    .addChildTo(this);

    // 明滅させる
    touchLabel.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 700)
    .to({alpha: 1}, 700)
    ;

		
    var gx = this.gridX;
    var gy = this.gridY;
    // 音楽を聴くボタン
    var touchLink =　Button({
      text: '特設サイト',
      textAlign: "center",
      fill: "#f55",
      fontSize: 20,
			fontFamily: "sans-serif",
    })
    .setOrigin(1, 0)
    .setPosition(gx.center(), gy.span(0))
    .addChildTo(this)
    .on('push', function() {
      SoundManager.stopMusic();
			window.top.location.href = 'https://take8jp.github.io/vosl/chirashizushi/index.html';
      this.exit('TitleScene');
    });
		// 明滅させる
    touchLink.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 700)
    .to({alpha: 1}, 700)
    ;
		
		// 音楽を聴くボタン
    var touchLink2 =　Button({
      text: 'MVを見る',
      textAlign: "center",
      fill: "#f55",
      fontSize: 20,
			fontFamily: "sans-serif",
    })
    .setOrigin(0, 0)
    .setPosition(gx.center(), gy.span(0))
    .addChildTo(this)
    .on('push', function() {
      SoundManager.stopMusic();
			window.top.location.href = 'https://twitter.com/intent/tweet?text=これからもずっと&url=https://take8jp.github.io/vosl/korekaramo/index.html';
      this.exit('TitleScene');
    });
		// 明滅させる
    touchLink2.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 700)
    .to({alpha: 1}, 700)
    ;
		
		
var shareButton =　Button({
  text: "Xでポスト",
  fill: "#000",
  fontSize: 30,
	width:250,
  height: 54,
	fontFamily: "sans-serif",
})
.setOrigin(1, 1)
.setPosition(this.width, this.height)
.addChildTo(this)
.on('push', function() {
	SoundManager.stopMusic();
	window.top.location.href = 'https://twitter.com/intent/tweet?text=これからもずっと&url=https://take8jp.github.io/vosl/korekaramo/index.html';
	//window.open('https://twitter.com/intent/tweet?text=LightFantasy(🎮)&url=http://take8.xxxxxxxx.jp/LightFantasy/&hashtags=TAKE8ゲーム', '_blank')
	this.exit('TitleScene');
});
		
    // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
    this.on('enter', function() {
      var event = "touchstart";
      var dom = this.app.domElement;
      dom.addEventListener(event, (function() {
        return function f() {
          var context = phina.asset.Sound.getAudioContext();
          var buf = context.createBuffer(1, 1, 22050);
          var src = context.createBufferSource();
          src.buffer = buf;
          src.connect(context.destination);
          src.start(0);

          dom.removeEventListener(event, f, false);
        }
      }()), false);

      // シーン遷移
      this.on('pointend', function() {
        SoundManager.play('start');
        this.exit("MainScene");
      });
    });

  },

});
