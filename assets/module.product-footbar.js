(function($){

    'use strict';

    theme.ProductFootbar = function() {
        console.log('object');
        function ProductFootbar() {
            this.settings = {
                height: 0
            };
            this.load();
        };
    
        ProductFootbar.prototype = $.extend({}, ProductFootbar.prototype, {
            duration: function () {
                return theme.animations.footbar_product.duration * 1000;
            },
            load: function() {
                var _ = this,
                    $footbar = $('.js-footbar-product'),
                    $spacer = $('.js-footer'),
                    $limit = $('[data-js-footbar-product-limit]'),
                	$google_review = $('#___ratingbadge_0');
    
                if($footbar.length && $limit.length) {
                    this.$footbar = $footbar;

                    $window.on('load theme.resize.productFootbar scroll.productFootbar', function () {
                        _._checkVisible($footbar, $limit, $spacer, $google_review);
                    });
                }
            },
            _checkVisible: function ($footbar, $limit, $spacer, $google_review) {
                var limit = $limit[0].getBoundingClientRect(),
                    topSpacing = theme.StickyHeader && theme.StickyHeader.$sticky ? theme.StickyHeader.$sticky.stickyHeader('getStickyHeight') : 0,
                    height = $footbar.innerHeight();
    
                if(limit.top < topSpacing && !$footbar.hasClass('show')) {
                   var responsive = window.matchMedia( "(max-width: 1500px)" );
                  
                    if (responsive.matches) {
                     $google_review.css("bottom","90px");
                       $google_review.css("z-index","2");
                    }
                 
                    $footbar.addClass('show animate');
    
                    $footbar.velocity('stop', true);
    
                    $footbar.velocity('slideDown', {
                        duration: this.duration(),
                        begin: function () {
                            setTimeout(function () {
                                $footbar.addClass('visible');

                            }, 0);
                        },
                        complete: function () {
                            $footbar.removeAttr('style');
                        }
                    });

                    this.settings.height = $footbar.children().first().innerHeight();
                } else if(limit.top >= topSpacing && $footbar.hasClass('visible')) {
                    $footbar.velocity('stop', true);
    
                    $footbar.velocity('slideUp', {
                        duration: this.duration(),
                        begin: function () {
                            $footbar.removeClass('visible');
                        },
                        complete: function () {
                            $footbar.removeClass('show animate').removeAttr('style');
                            $google_review.css("bottom","0px");
                        }
                    });

                    this.settings.height = 0;
                }
    
                if(height > 0) {
                    if(theme.current.is_mobile) {
                        $spacer.css({
                            paddingBottom: ''
                        });
    
                        $spacer.parent().css({
                            paddingBottom: height
                        });
                    } else {
                        $spacer.css({
                            paddingBottom: height
                        });
    
                        $spacer.parent().css({
                            paddingBottom: ''
                        });
                    }
                }


            },
            getFootbarHeight: function () {
                return this.settings.height;
            },
            destroy: function () {
                $window.unbind('theme.resize.productFootbar scroll.productFootbar');
            }
        });
    
        theme.ProductFootbar = new ProductFootbar;
    };
    
    $(function() {
        theme.ProductFootbar();
    });
})(jQueryTheme);