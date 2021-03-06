(function($) {
    'use strict';
    $(function() {
        var $header = $('.site-header'),
            $header_sticky = $('.header-sticky');
        var headerHeight = $header.height();

        $(window).scroll(function(event) {
            if ($(window).scrollTop() <= headerHeight + 50) {
                $header_sticky.removeClass('active');
            }
        });

        window.addEventListener('wheel', function(event) {

            if (event.deltaY < 0) {
                if ($(window).scrollTop() > headerHeight) {
                    $header_sticky.addClass('active');
                } else {
                    $header_sticky.removeClass('active');
                }
            } else if (event.deltaY > 0) {
                if ($header_sticky.hasClass('hide-scroll-down')) {
                    $header_sticky.removeClass('active');
                } else {
                    if ($(window).scrollTop() > headerHeight) {
                        $header_sticky.addClass('active');
                    } else {
                        $header_sticky.removeClass('active');
                    }
                }
                if ($(window).scrollTop() + $(window).height() == $(document).height() && $(window).scrollTop() > headerHeight) {
                    $header_sticky.addClass('active');
                }
            }
        });
    });
})(jQuery);