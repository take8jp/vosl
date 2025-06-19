 $(function () {
        //スライドイン
		    window.sr = ScrollReveal({ reset: true ,mobile: true});
         sr.reveal( '.fadebottom1', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :0 ,opacity: 0,});
         sr.reveal( '.fadebottom2', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :1000 ,opacity: 0,});
         sr.reveal( '.fadebottom3', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :1500 ,opacity: 0,});
         sr.reveal( '.fadebottom4', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :2000 ,opacity: 0,});
         sr.reveal( '.fadeleft', { origin: 'left' , distance: '10%', duration: 1000 , scale: 1.0, delay :0 ,opacity: 0,});
         sr.reveal( '.faderight', { origin: 'right' , distance: '10%', duration: 1000 , scale: 1.0, delay :0 ,opacity: 0,});

          var topBtn = $('#pageTop');
          topBtn.hide();

          //◇ボタンの表示設定
          $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
              //---- 画面を80pxスクロールしたら、ボタンを表示する
              topBtn.fadeIn();
            } else {
              //---- 画面が80pxより上なら、ボタンを表示しない
              topBtn.fadeOut();
            }
          });

          // ◇ボタンをクリックしたら、スクロールして上に戻る
          topBtn.click(function () {
            $('body,html').animate({
              scrollTop: 0
            }, 500);
            return false;
          });

        });

$(function () {
//    $('.menu-trigger').on('click', function () {
//        $(this).toggleClass('active');
//        $(".navi").fadeToggle();
//        return false;
//    });

    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href = $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });
});

//if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
//    $(function () {
//        $('.tel').each(function () {
//            var str = $(this).html();
//            if ($(this).children().is('img')) {
//                $(this).html($('<a>').attr('href', 'tel:' + $(this).children().attr('alt').replace(/-/g, '')).append(str + '</a>'));
//            } else {
//                $(this).html($('<a class="anton main_color02">').attr('href', 'tel:' + $(this).text().replace(/-/g, '')).append(str + '</a>'));
//            }
//        });
//    });
//}