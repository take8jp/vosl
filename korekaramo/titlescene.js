
/**
 * タイトル
 */
phina.define('TitleScene', {
  superClass: 'phina.display.DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = params.backgroundColor;
// 背景
    Sprite('bg2').addChildTo(this)
                .setPosition(this.gridX.center(), this.gridY.center());
		
		SoundManager.musicVolume = 0.2 ;
		SoundManager.playMusic('music');
		SoundManager.musicVolume = 0.8 ;
		//console.log(SoundManager.musicVolume);
		
		
    Label({
      text: '※マナーモードは解除してください',
			//fill: "#ef3e46",
			fill: "#333",
      stroke: "#fff",
      strokeWidth: 10,
      fontSize: 20,
			fontFamily: "ヒラギノ丸ゴ Pro",
    })
    .setPosition(this.gridX.center(), this.gridY.span(15))
    .addChildTo(this)
		
    // タイトルラベル
    Label({
      text: "これからもずっと",
      //fill: "#fac",
			fill: "#f88379",
      stroke: "#fff",
      strokeWidth: 15,
      fontSize: 50,
			fontFamily: "Futura",
    })
    .setPosition(this.gridX.center(), this.gridY.span(6))
    .addChildTo(this)
		
    // タイトルラベル
//    Label({
//      text: "ノーマルモード",
//      //fill: "#fac",
//			fill: "#f88379",
//      stroke: "#fff",
//      strokeWidth: 15,
//      fontSize: 40,
//			fontFamily: "Futura",
//    })
//    .setPosition(this.gridX.center(), this.gridY.span(7.5))
//    .addChildTo(this)

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
//		// 明滅させる
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
//		// 明滅させる
    touchLink2.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 700)
    .to({alpha: 1}, 700)
    ;
		
		
		//twitter
		var shareButton =　Button({
			text: "Xでポストする",
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
			//location.href = 'https://twitter.com/intent/tweet?text=LightFantasy(🎮)&url=http://take8.xxxxxxxx.jp/LightFantasy/&hashtags=TAKE8ゲーム';
			window.top.location.href = 'https://twitter.com/intent/tweet?text=これからもずっと&url=https://take8jp.github.io/vosl/korekaramo/index.html';
			//window.open('https://twitter.com/intent/tweet?text=LightFantasy(🎮)&url=http://take8.xxxxxxxx.jp/LightFantasy/&hashtags=TAKE8ゲーム', '_self')
			this.exit('TitleScene');
		});

		//fadeIn
		var seenchange = RectangleShape({
		width:1920,
		height:1920,
		fill:"#fff",
			stroke:false,
		})
		.addChildTo(this)
		.setPosition(this.gridX.center(),this.gridY.center());
		seenchange.tweener.clear()
    .to({alpha: 0}, 700)
    ;
		

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
				SoundManager.stopMusic();
				this.exit();
				
				
				
        
      });
    });

  },

});
