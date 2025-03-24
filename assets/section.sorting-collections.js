(function($){

    'use strict';

    theme.SortingCollections = (function() {

        function SortingCollections(container) {
            this.$container = $(container);
    
            //var sectionId = this.$container.attr('data-section-id');
    
            //this.settings = {};
    
            this.namespace = '.sorting-collections';
    
            this.onLoad();
        };
    
        SortingCollections.prototype = $.extend({}, Section.prototype, SortingCollections.prototype, {
            onLoad: function() {
                var $control = this.$container.find('[data-sorting-collections-control]'),
                    $collections = this.$container.find('[data-sorting-collections-ajax] [data-collection]'),
                    $products = this.$container.find('[data-sorting-collections-items]'),
                    $button_more = this.$container.find('[data-sorting-collections-more]'),
                    xhr = null;
    
                this.$control = $control;
    
                function loadProducts($button, loader) {
                    if(xhr) {
                        xhr.abort();
                    }
    
                    if(loader) {
                        theme.Loader.set($products);
                    }
    
                    var collection = $button.attr('data-collection'),
                        count_limit = $products.attr('data-limit'),
                        grid_classes = $products.attr('data-grid');
    
                    xhr = $.ajax({
                        type: 'GET',
                        url: theme.routes.root_url + 'collections/' + collection,
                        cache: false,
                        data: {
                            view: 'sorting',
                            count_limit: count_limit,
                            grid_classes: encodeURIComponent(grid_classes)
                        },
                        dataType: 'html',
                        success: function (data) {
                            var $children;
    
                            $products.html(data);
    						$products.append(`<div class='col-6 col-sm-6 col-md-4 col-lg-3'><a href='/collections/${collection}' class='btn btn--secondary btn--animated w-100 p-0' style='top: 40%;position: absolute;height: 15%;'><span class='d-flex flex-center'>VIEW MORE</span></a></div>`);
                            if($products[0].hasAttribute('data-is-design-mode')) {
                                $children = $products.children();
    
                                $children.addClass(grid_classes);
    
                                if($children.length > count_limit) {
                                    for(var i = count_limit; i < $children.length; i++) {
                                        $children.eq(i).remove();
                                    }
                                }
                            }
    
                            theme.ImagesLazyLoad.update();
                            theme.ProductCurrency.update();
                            theme.ProductCountdown.init($products.find('.js-countdown').removeClass('js-countdown--lazy'));
                            theme.ProductReview.update();
    
                            $control.find('a').removeClass('active');
                            $button.addClass('active');

                            if($button_more) {
                                $button_more.text(theme.strings.homepage.sorting_collections.button_more_products.replace('{{ collection }}', $button.text())).attr('href', $button.attr('href'));
                            }
    
                            if(loader) {
                                theme.Loader.unset($products);
                            }
    
                            xhr = null;
                        }
                    });
                };
    
                if($collections.length) {
                    loadProducts($collections.first());
                }
    
                $control.on('click', 'a', function (e) {
                    var $this = $(this);
    
                    if(!$this.hasClass('active')) {
                        loadProducts($this, true);
                    }
    
                    e.preventDefault();
                    return false;
                });
            },
            onUnload: function() {
                this.$container.off(this.namespace);
    
                this.$control.off();
            }
        });
    
        return SortingCollections;
    })();
    
    $(function() {
        theme.sections.register('sorting-collections', theme.SortingCollections);
    });
})(jQueryTheme);