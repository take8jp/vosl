 $(function () {
        //�X���C�h�C��
		    window.sr = ScrollReveal({ reset: true ,mobile: true});
         sr.reveal( '.fadebottom1', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :0 ,opacity: 0,});
         sr.reveal( '.fadebottom2', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :1000 ,opacity: 0,});
         sr.reveal( '.fadebottom3', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :1500 ,opacity: 0,});
         sr.reveal( '.fadebottom4', { origin: 'bottom' , distance: '10%', duration: 1500 , scale: 1.5, delay :2000 ,opacity: 0,});
         sr.reveal( '.fadeleft', { origin: 'left' , distance: '10%', duration: 1000 , scale: 1.0, delay :0 ,opacity: 0,});
         sr.reveal( '.faderight', { origin: 'right' , distance: '10%', duration: 1000 , scale: 1.0, delay :0 ,opacity: 0,});

          var topBtn = $('#pageTop');
          topBtn.hide();

          //���{�^���̕\���ݒ�
          $(window).scroll(function () {
            if ($(this).scrollTop() > 80) {
              //---- ��ʂ�80px�X�N���[��������A�{�^����\������
              topBtn.fadeIn();
            } else {
              //---- ��ʂ�80px����Ȃ�A�{�^����\�����Ȃ�
              topBtn.fadeOut();
            }
          });

          // ���{�^�����N���b�N������A�X�N���[�����ď�ɖ߂�
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

    // #�Ŏn�܂�A���J�[���N���b�N�����ꍇ�ɏ���
    $('a[href^=#]').click(function () {
        // �X�N���[���̑��x
        var speed = 400; // �~���b
        // �A���J�[�̒l�擾
        var href = $(this).attr("href");
        // �ړ�����擾
        var target = $(href == "#" || href == "" ? 'html' : href);
        // �ړ���𐔒l�Ŏ擾
        var position = target.offset().top;
        // �X���[�X�X�N���[��
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