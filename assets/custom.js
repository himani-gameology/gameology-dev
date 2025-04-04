function updateDifficultyLevel() {
    var e = jQuery('#productDetailTable .detail-content-title:contains("Difficulty level")');
    e.length && ((e = e.siblings(".detail-content-value").text()), jQuery(".product-detail-item.hidden .detail-content-value").text(e), jQuery(".product-detail-item.hidden").removeClass("hidden"));
}
function initSubCollections() {
    jQuery(".sub-collection-slider .sub-collection-slider__slide").length &&
        1024 <= window.innerWidth &&
        jQuery(".sub-collection-slider").slick({ slidesToShow: 6, arrows: !1, infinite: !0, autoplay: !0, autoplaySpeed: 4e3, responsive: [{ breakpoint: 1024, settings: { slidesToShow: 3 } }] });
}
function orderAisFilter() {
    const s = ["ais-facet-product_type", "ais-facet-named_tags.No.%20of%20Player", "ais-facet-named_tags.Age", "ais-facet-named_tags.BGG%20Mechanism", "ais-facet-vendor"];
    document.querySelectorAll(".ais-page .ais-facets .ais-facet-disjunctive,.ais-page .ais-facets .ais-facet-conjunctive").forEach((t) => {
        var e;
        s.some((e) => t.classList.contains(e)) && ((e = s.findIndex((e) => t.classList.contains(e))), (t.style.order = e));
    });
}
function waitForElm() {
    const t = ".algolia-autocomplete .aa-dataset-products .aa-suggestions";
    document.querySelector(t) &&
        !document.querySelector(t).classList.contains("slick-slider") &&
        jQuery(t).slick({
            slidesToShow: 1.05,
            arrows: !0,
            prevArrow: `<div class="arrow-left"><i><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-006" viewBox="0 0 24 24"><g>	<path d="M16.736,3.417c0,0.169-0.059,0.319-0.176,0.449l-8.32,8.301l8.32,8.301c0.117,0.13,0.176,0.28,0.176,0.449		s-0.059,0.319-0.176,0.449c-0.065,0.052-0.137,0.094-0.215,0.127c-0.078,0.032-0.156,0.049-0.234,0.049s-0.156-0.017-0.234-0.049		c-0.078-0.033-0.149-0.075-0.215-0.127l-8.75-8.75c-0.117-0.13-0.176-0.28-0.176-0.449c0-0.169,0.059-0.319,0.176-0.449l8.75-8.75		c0.13-0.117,0.28-0.176,0.449-0.176c0.169,0,0.319,0.059,0.449,0.176C16.677,3.098,16.736,3.248,16.736,3.417z"></path></g></svg></i></div>`,
            nextArrow: `<div class="arrow-right"><i><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-007" viewBox="0 0 24 24"><g>	<path d="M6.708,20.917c0-0.169,0.059-0.319,0.176-0.449l8.32-8.301l-8.32-8.301c-0.117-0.13-0.176-0.28-0.176-0.449		c0-0.169,0.059-0.319,0.176-0.449c0.13-0.117,0.279-0.176,0.449-0.176c0.169,0,0.318,0.059,0.449,0.176l8.75,8.75		c0.117,0.13,0.176,0.28,0.176,0.449c0,0.169-0.059,0.319-0.176,0.449l-8.75,8.75c-0.065,0.052-0.137,0.094-0.215,0.127		c-0.078,0.032-0.156,0.049-0.234,0.049s-0.156-0.017-0.234-0.049c-0.078-0.033-0.15-0.075-0.215-0.127		C6.767,21.236,6.708,21.086,6.708,20.917z"></path></g></svg></i></div>`,
        }),
        new MutationObserver((e) => {
            !document.querySelector(t) ||
                document.querySelector(t).classList.contains("slick-slider") ||
                document.body.classList.contains("test_240") ||
                jQuery(t).slick({
                    slidesToShow: 1.05,
                    arrows: !0,
                    prevArrow: `<div class="arrow-left"><i><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-006" viewBox="0 0 24 24"><g>	<path d="M16.736,3.417c0,0.169-0.059,0.319-0.176,0.449l-8.32,8.301l8.32,8.301c0.117,0.13,0.176,0.28,0.176,0.449		s-0.059,0.319-0.176,0.449c-0.065,0.052-0.137,0.094-0.215,0.127c-0.078,0.032-0.156,0.049-0.234,0.049s-0.156-0.017-0.234-0.049		c-0.078-0.033-0.149-0.075-0.215-0.127l-8.75-8.75c-0.117-0.13-0.176-0.28-0.176-0.449c0-0.169,0.059-0.319,0.176-0.449l8.75-8.75		c0.13-0.117,0.28-0.176,0.449-0.176c0.169,0,0.319,0.059,0.449,0.176C16.677,3.098,16.736,3.248,16.736,3.417z"></path></g></svg></i></div>`,
                    nextArrow: `<div class="arrow-right"><i><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-007" viewBox="0 0 24 24"><g>	<path d="M6.708,20.917c0-0.169,0.059-0.319,0.176-0.449l8.32-8.301l-8.32-8.301c-0.117-0.13-0.176-0.28-0.176-0.449		c0-0.169,0.059-0.319,0.176-0.449c0.13-0.117,0.279-0.176,0.449-0.176c0.169,0,0.318,0.059,0.449,0.176l8.75,8.75		c0.117,0.13,0.176,0.28,0.176,0.449c0,0.169-0.059,0.319-0.176,0.449l-8.75,8.75c-0.065,0.052-0.137,0.094-0.215,0.127		c-0.078,0.032-0.156,0.049-0.234,0.049s-0.156-0.017-0.234-0.049c-0.078-0.033-0.15-0.075-0.215-0.127		C6.767,21.236,6.708,21.086,6.708,20.917z"></path></g></svg></i></div>`,
                });
        }).observe(document.body, { childList: !0, subtree: !0 });
}
function subCollectionCarousel() {
    jQuery(".collection-navigation__carousel").length &&
        jQuery(".collection-navigation__carousel").slick({
            dots: !1,
            arrows: !0,
            infinite: !0,
            slidesToShow: window.innerWidth < 1024 ? 3 : 6,
            prevArrow: jQuery(".collection-navigation__prev"),
            nextArrow: jQuery(".collection-navigation__next"),
        });
}
function descriptionProduct() {
    jQuery(".readmore-description-js span").on("click", function () {
        jQuery(this).hasClass("show-less")
            ? (jQuery(this).removeClass("show-less"), jQuery(this).text("Show more"), jQuery(".description-part").show(), jQuery(".description-full").hide())
            : (jQuery(this).addClass("show-less"), jQuery(this).text("Show less"), jQuery(".description-part").hide(), jQuery(".description-full").show());
    });
}
function recommendProduct() {
    var e,
        t,
        s,
        a = jQuery(".product-recommendations");
    null !== a &&
        ((e = a.attr("data-product-id")),
        (t = a.attr("data-base-url")),
        (s = a.attr("data-limit")),
        jQuery
            .ajax({ url: t + "?section_id=product-recommendations&product_id=" + e + "&limit=" + s, type: "GET" })
            .done(function (e) {
                a.replaceWith(e);
            })
            .fail(function () {
                a.hide();
            }));
}
function tabUpsellProduct() {
    jQuery(".upsell-tab-header-js").on("click", function () {
        var e, t;
        jQuery(this).hasClass("active") ||
            ((e = jQuery(this).data("tab")),
            (t = jQuery('.upsell-tab-content-js[data-tab="' + e + '"] .product-tabs-wrap')),
            jQuery(this).siblings().removeClass("active"),
            jQuery(this).addClass("active"),
            jQuery(".upsell-tab-content-js").removeClass("active"),
            jQuery('.upsell-tab-content-js[data-tab="' + e + '"]').addClass("active"),
            t.hasClass("slick-slider")) ||
            t.slick({ dots: !1, infinite: !1, arrows: !0, slidesToShow: 3, slidesToScroll: 1, responsive: [{ breakpoint: 778, settings: { slidesToShow: 1 } }] });
    });
}
function tabHeaderSlide() {
    jQuery(window).width() < 778
        ? jQuery(".upsell-tab-header").hasClass("slick-slider") || jQuery(".upsell-tab-header").slick({ dots: !1, infinite: !1, slidesToShow: 1, variableWidth: !0 })
        : jQuery(".upsell-tab-header").hasClass("slick-slider") && jQuery(".upsell-tab-header").slick("unslick");
}
function productUpsell() {
    var e;
    0 < jQuery('.upsell-tab-content-js[data-tab="more_brand"]').length &&
        ((e = "/search?view=vendor&resources[type]=product&resources[options][fields]=vendor&q=" + jQuery('.upsell-tab-content-js[data-tab="more_brand"]').data("vendor") + "&timestamp=" + Date.now()),
        jQuery
            .ajax({ url: e, type: "GET" })
            .done(function (e) {
                jQuery('.upsell-tab-content-js[data-tab="more_brand"]').html(e);
            })
            .fail(function (e) {
                console.log(e);
            })),
        0 < jQuery('.upsell-tab-content-js[data-tab="also_like"]').length &&
            ((e = "/search?view=vendor&resources[type]=product&resources[options][fields]=product_type&q=" + jQuery('.upsell-tab-content-js[data-tab="also_like"]').data("type") + "&timestamp=" + Date.now()),
            jQuery
                .ajax({ url: e, type: "GET" })
                .done(function (e) {
                    jQuery('.upsell-tab-content-js[data-tab="also_like"]').html(e),
                        jQuery('.upsell-tab-content-js[data-tab="also_like"] .product-tabs-wrap').slick({
                            dots: !1,
                            infinite: !1,
                            arrows: !0,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            responsive: [{ breakpoint: 778, settings: { slidesToShow: 1 } }],
                        });
                })
                .fail(function (e) {
                    console.log(e);
                }));
}
function productAccount() {
    var e, t;
    0 < jQuery(".template-product").length &&
        ("undefined" != typeof Storage &&
            ((e = localStorage.getItem("ProductLogin")), (t = localStorage.getItem("ProductCreate")), null != e && localStorage.removeItem("ProductLogin"), null != t) &&
            (localStorage.removeItem("ProductCreate"),
            jQuery(".js-change-tab-account span").removeClass("active"),
            jQuery('.js-change-tab-account span[data-tab="create"]').addClass("active"),
            jQuery(".tab-form").removeClass("active"),
            jQuery('.tab-form[data-tab="create"]').addClass("active"),
            jQuery("body").addClass("overflow-hidden"),
            jQuery(".earn-point-login-popup, .earn-point-login-popup-bg").show()),
        jQuery(".js-login-account").on("click", function (e) {
            e.preventDefault(),
                "undefined" != typeof Storage && (jQuery(this).hasClass("create") ? localStorage.setItem("ProductCreate", window.location.href) : localStorage.setItem("ProductLogin", window.location.href)),
                jQuery(this).closest("form").submit();
        }),
        jQuery(".js-change-tab-account span").on("click", function () {
            var e;
            jQuery(this).hasClass("active") ||
                ((e = jQuery(this).data("tab")),
                jQuery(".js-change-tab-account span").removeClass("active"),
                jQuery(this).addClass("active"),
                jQuery(".tab-form").removeClass("active"),
                jQuery('.tab-form[data-tab="' + e + '"]').addClass("active"));
        }),
        jQuery(".js-open-login-popup").on("click", function () {
            var e = jQuery(this).data("tab");
            jQuery(".js-change-tab-account span").removeClass("active"),
                jQuery('.js-change-tab-account span[data-tab="' + e + '"]').addClass("active"),
                jQuery(".tab-form").removeClass("active"),
                jQuery('.tab-form[data-tab="' + e + '"]').addClass("active"),
                jQuery("body").addClass("overflow-hidden"),
                jQuery(".earn-point-login-popup, .earn-point-login-popup-bg").show();
        }),
        jQuery(".js-close-login-popup, .earn-point-login-popup-bg").on("click", function () {
            jQuery("body").removeClass("overflow-hidden"), jQuery(".earn-point-login-popup, .earn-point-login-popup-bg").hide();
        }));
}
function productZipPay() {
    jQuery(".zip-money-trigger").on("click", function () {
        jQuery("body").addClass("zip-money-popup-open");
    }),
        jQuery(".zip-close-button, .zip-widget__popup__bg").on("click", function () {
            jQuery("body").removeClass("zip-money-popup-open");
        });
}
function triggerSearchHeader() {
    jQuery(".js-trigger-search").on("click", function () {
        jQuery("body").hasClass("test_102") && jQuery(this).closest("form").find('button[type="submit"]').trigger("click");
    });
}
function test_101() {
  var limitList = productQuantityLimit;
    jQuery(".js-product-checkout__button").on("click", function () {
      var e = jQuery(this).closest("form");
      var DataArray = e.serialize().split('&');
      var PostArray = [];
      var ProductId = '';
      var quantity  = '';
      for (let x in DataArray) {
        var Data = DataArray[x].split('=');
        if(Data[0] == 'product-id'){
          ProductId = Data[1];
        }
        if(Data[0] == 'quantity'){
          quantity = Data[1];
        }
      }
      var ProductInCart = jQuery(this).attr('on-cart');
      var cartCheckQty =  parseInt(quantity) + parseInt(jQuery(this).attr('cart-qty'));
      if(ProductInCart == 'true' && cartCheckQty > limitList[ProductId]){
        alert(theme.strings.general.popups.cart.limit_is_exceeded_per_customer.replace("{{ x_item_limit }}", limitList[ProductId]));
        console.log('test1');
        return false;
      }
      
      if (ProductId in limitList && quantity > limitList[ProductId]) {
        alert(theme.strings.general.popups.cart.limit_is_exceeded_per_customer.replace("{{ x_item_limit }}", limitList[ProductId]));
        console.log('test1');
        return false;
      }
      
      jQuery(this).addClass("active").attr("disabled", "disabled"),
            jQuery.ajax({
                url: "/cart/add.js",
                type: "POST",
                data: e.serialize(),
                dataType: "json",
                success: function () {
                    window.location.href = "/checkout";
                },
                error: function () {
                    alert("Product is already in cart.");
                },
            });
    });
}
function test_106() {
    jQuery(".filter-type-trigger").on("click", function () {
        var e = jQuery(this).data("value");
        jQuery('[name="filter_by_type"][value="' + e + '"]').trigger("click"), jQuery(".js-clear-all-type").hasClass("active") && jQuery(".js-clear-all-type").removeClass("active");
    });
}
jQuery(document).ready(function () {
    var e;
    0 < jQuery(".dynamic-postcode").length &&
        ((e = jQuery("#address_country").data("default")),
        (e = jQuery('#address_country option[value="' + e + '"]').data("provinces")),
        jQuery.each(e, function (e, t) {
            jQuery("#address_province").append('<option value="' + t[0] + '">' + t[0] + "</option>");
        })),
        jQuery(".get-rates-js").on("click", function () {
            let e = jQuery("#address_country").val(),
                i = jQuery("#address_province").val(),
                t = jQuery("#address_zip").val(),
                s = parseInt(jQuery("span[data-js-cart-count-desktop]").attr("data-js-cart-count-desktop"), 10);
            jQuery(".get-rates-js").text("Calculating..."),
                0 == s
                    ? jQuery.ajax({
                          url: "/cart/add.js",
                          type: "POST",
                          data: { id: 32193368457331, quantity: 1 },
                          dataType: "json",
                          success: function () {
                              jQuery.ajax({
                                  type: "GET",
                                  url: "/cart/shipping_rates.json",
                                  dataType: "json",
                                  data: { "shipping_address[country]": e, "shipping_address[province]": i, "shipping_address[zip]": t },
                                  success: function (e) {
                                      if ((jQuery.ajax({ url: "/cart/change.js", type: "POST", data: { id: 32193368457331, quantity: 0 }, dataType: "json" }), e.shipping_rates && e.shipping_rates.length)) {
                                          jQuery("#postcode-response").empty();
                                          let a = e.shipping_rates.length - 1;
                                          jQuery.each(e.shipping_rates, function (e, t) {
                                              var s;
                                              t.name.includes("Pick up from") ||
                                                  ((s = jQuery('.shipping-postcode-metafields > div[data-shipping="' + t.name + '"][data-province="' + i + '"]').data("date")),
                                                  "Express shipping" == t.name
                                                      ? jQuery("#postcode-response").append(
                                                            '<div class="shipping-block"><div class="shipping-name"><p>' +
                                                                t.name +
                                                                '</p><p class="shipping-date">' +
                                                                s +
                                                                '</p></div><div class="shipping-price"><span class="from">from</span><span class="money">jQuery' +
                                                                t.price +
                                                                "</span></div></div>"
                                                        )
                                                      : jQuery("#postcode-response").append(
                                                            '<div class="shipping-block"><div class="shipping-name"><p>' +
                                                                t.name +
                                                                '</p><p class="shipping-date">' +
                                                                s +
                                                                '</p></div><div class="shipping-price"><span class="money">jQuery' +
                                                                t.price +
                                                                "</span></div></div>"
                                                        )),
                                                  e == a && (jQuery(".get-rates-js").text("Go"), jQuery(".product-page-info__button-add-to-cart").addClass("calculated"));
                                          });
                                      }
                                  },
                                  error: function (e) {
                                      422 == e.status &&
                                          (jQuery.ajax({ url: "/cart/change.js", type: "POST", data: { id: 32193368457331, quantity: 0 }, dataType: "json" }),
                                          jQuery(".get-rates-js").text("Go"),
                                          jQuery("#postcode-response").html('<div class="error">Zip ' + e.responseJSON.zip[0] + "</div>"));
                                  },
                              });
                          },
                          error: function () {
                              jQuery(".get-rates-js").text("Go"), jQuery("#postcode-response").html('<div class="error">An error occurred</div>');
                          },
                      })
                    : jQuery.ajax({
                          type: "GET",
                          url: "/cart/shipping_rates.json",
                          dataType: "json",
                          data: { "shipping_address[country]": e, "shipping_address[province]": i, "shipping_address[zip]": t },
                          success: function (e) {
                              if (e.shipping_rates && e.shipping_rates.length) {
                                  jQuery("#postcode-response").empty();
                                  let a = e.shipping_rates.length - 1;
                                  jQuery.each(e.shipping_rates, function (e, t) {
                                      var s;
                                      t.name.includes("Pick up from") ||
                                          ((s = jQuery('.shipping-postcode-metafields > div[data-shipping="' + t.name + '"][data-province="' + i + '"]').data("date")),
                                          "Express shipping" == t.name
                                              ? jQuery("#postcode-response").append(
                                                    '<div class="shipping-block"><div class="shipping-name"><p>' +
                                                        t.name +
                                                        '</p><p class="shipping-date">' +
                                                        s +
                                                        '</p></div><div class="shipping-price"><span class="from">from</span><span class="money">jQuery' +
                                                        t.price +
                                                        "</span></div></div>"
                                                )
                                              : jQuery("#postcode-response").append(
                                                    '<div class="shipping-block"><div class="shipping-name"><p>' +
                                                        t.name +
                                                        '</p><p class="shipping-date">' +
                                                        s +
                                                        '</p></div><div class="shipping-price"><span class="money">jQuery' +
                                                        t.price +
                                                        "</span></div></div>"
                                                )),
                                          e == a && (jQuery(".get-rates-js").text("Go"), jQuery(".product-page-info__button-add-to-cart").addClass("calculated"));
                                  });
                              }
                          },
                          error: function (e) {
                              422 == e.status && (jQuery(".get-rates-js").text("Go"), jQuery("#postcode-response").html('<div class="error">Zip ' + e.responseJSON.zip[0] + "</div>"));
                          },
                      });
        });
}),
    jQuery(document).ready(function () {
        jQuery(".iWishView").on("click", function () {
            jQuery('.popup-navigation__close').trigger('click');
        });
        test_106(),
            descriptionProduct(),
            recommendProduct(),
            productUpsell(),
            productAccount(),
            productZipPay(),
            tabUpsellProduct(),
            tabHeaderSlide(),
            triggerSearchHeader(),
            test_101(),
            jQuery(window).resize(function () {
                tabHeaderSlide();
            });
    }),
    jQuery(window).on("load", function () {
        var e, t;
        function s() {
            jQuery(".ais-floater").length &&
                (jQuery(".ais-floater-close").click(function () {
                    jQuery(".ais-floater").removeClass("show"), jQuery("iframe#launcher").show();
                }),
                jQuery(".ais-filter-button").click(function () {
                    jQuery(".ais-floater").addClass("show"), jQuery("iframe#launcher").hide();
                }),
                jQuery(window)
                    .on("resize", function () {
                        800 <= window.innerWidth ? (console.log("test"), jQuery(".ais-facets").insertBefore(".ais-block")) : (console.log("tes1"), jQuery(".ais-facets").insertAfter(".ais-search-header"));
                    })
                    .resize());
        }
        jQuery(".ais-heading").length && ((e = jQuery(".ais-stats--nb-results").text().match(/\d+/)[0]), (t = window.location.search.split("q=")[1]), (t = decodeURI(t)), jQuery(".ais-heading").text(e + ` results for "${t}"`)),
            window.innerWidth < 800 && (jQuery(".ais-facets").insertAfter(".ais-search-header"), jQuery(".ais-facets-button.show-test_201-flex").trigger("click")),
            jQuery(".ais-facets-button.show-test_201-flex").click(function () {
                (jQuery(".ais-facets").hasClass("ais-facets__shown") ? jQuery(".ais-facet--header.ais-header:not(.active)") : jQuery(".ais-facet--header.ais-header.active")).trigger("click");
            }),
            jQuery(".information-line .row").length && window.innerWidth < 1024 && jQuery(".information-line .row").slick({ slidesToShow: 1, arrows: !1, autoplay: !0, autoplaySpeed: 4e3, adaptiveHeight: !0 });
        const a = new MutationObserver(function (e) {
                e.forEach(function (e) {
                    "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_225") && (s(), a.disconnect());
                });
            }),
            i =
                (a.observe(document.body, { attributes: !0 }),
                document.body.classList.contains("test_225") && (s(), a.disconnect()),
                new MutationObserver(function (e) {
                    e.forEach(function (e) {
                        "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_218") && (initSubCollections(), i.disconnect());
                    });
                })),
            o =
                (i.observe(document.body, { attributes: !0 }),
                document.body.classList.contains("test_218") && (initSubCollections(), i.disconnect()),
                jQuery(".carousel-banner").length &&
                    (jQuery(".carousel-banner").on("init", function () {
                        jQuery(".carousel-banner").addClass("show");
                    }),
                    jQuery(".carousel-banner").slick({ slidesToShow: 1, arrows: !1, autoplay: !0, autoplaySpeed: 4e3, fade: !0, cssEase: "linear" })),
                new MutationObserver(function (e) {
                    e.forEach(function (e) {
                        "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_239") && o.disconnect();
                    });
                }));
        o.observe(document.body, { attributes: !0 }), document.body.classList.contains("test_239") && o.disconnect();
    }),
    jQuery(document).ready(function () {
        subCollectionCarousel();
        jQuery(".delivery-dispatch .show-pickup").length &&
            jQuery(".delivery-dispatch .show-pickup").click(function () {
                jQuery('button[data-id-btn="buys"]').trigger("click");
            }),
            jQuery(".delivery-dispatch .show-cc").length &&
                jQuery(".delivery-dispatch .show-cc").click(function () {
                    jQuery('button[data-id-btn="clcl"]').trigger("click");
                }),
            orderAisFilter(),
            jQuery("body .ais-facet--container").addClass("active"),
            jQuery("body .ais-facet--header").addClass("active"),
            jQuery(".ais-facet--header").click(function () {
                jQuery(this).toggleClass("active"), jQuery(this).next().toggleClass("active");
            }),
            window.innerWidth < 900 && waitForElm(),
            jQuery(".plus-quantity").click(function () {
                var e = jQuery(".product-page-info__button .input-quantity input , .product-button-preorder .input-quantity input"),
                    t = parseInt(e.val());
                e.val(t + 1);
            }),
            jQuery(".minus-quantity").click(function () {
                var e = jQuery(".product-page-info__button .input-quantity input , .product-button-preorder .input-quantity input"),
                    t = parseInt(e.val());
                1 !== t && e.val(t - 1);
            }),
            jQuery(".ais-facets-button.show-test_210-flex").click(function () {
                jQuery(".ais-facets-button.show-test_210-flex").hasClass("ais-facets__shown")
                    ? (jQuery(".layer-navigation__head:not(.index-1):not(.open)").trigger("click"), jQuery(".ais-facets-button.show-test_210-flex").removeClass("ais-facets__shown"))
                    : (jQuery(".layer-navigation__head:not(.index-1).open").trigger("click"), jQuery(".ais-facets-button.show-test_210-flex").addClass("ais-facets__shown"));
            });
        const t = new MutationObserver(function (e) {
            e.forEach(function (e) {
                "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_217") && (s(), t.disconnect());
            });
        });
        function s() {
            jQuery(".ais-facet-product_type .ais-RefinementList-item").length &&
                (jQuery(".ais-facet-product_type .ais-RefinementList-item").each(function (e) {
                    let t = jQuery(this).text();
                    t = (t = (t = t.trim()).replace(/\s+/g, " ")).replace(/ \d+$/, "");
                    e = jQuery("<div></div>").text(t).attr("data-index", e);
                    jQuery(".search-category-list").append(e);
                }),
                jQuery(".search-category-list div").on("click", function () {
                    const t = jQuery(this).text();
                    jQuery(".ais-facet-product_type .ais-RefinementList-item.ais-RefinementList-item--selected").each(function () {
                        jQuery(this).trigger("click");
                    }),
                        jQuery(".ais-facet-product_type .ais-RefinementList-item")
                            .filter(function () {
                                let e = jQuery(this).text();
                                return (e = (e = (e = e.trim()).replace(/\s+/g, " ")).replace(/ \d+$/, "")) === t;
                            })
                            .trigger("click");
                }));
        }
        function a() {
            jQuery(".test_224 .product-tabs .tabs__content").addClass("unactive"),
                jQuery(".test_224 .product-tabs .tabs__btn.active").removeClass("active"),
                jQuery(".test_224 .option-buy__title").addClass("active"),
                jQuery(".product-page-info__option-buy").addClass("active"),
                jQuery(".product-payment-option_btn").click(function () {
                    jQuery(".product-payment-option_list").toggleClass("active"), jQuery(this).toggleClass("active");
                }),
                jQuery(".product-detail-heading").click(function () {
                    jQuery(".product-detail-body").toggleClass("active"), jQuery(this).toggleClass("active");
                }),
                jQuery(".test_224 .option-buy__title").click(function () {
                    jQuery(".product-page-info__option-buy").toggleClass("active"), jQuery(this).toggleClass("active");
                }),
                jQuery(".test_224 .product-tabs .tabs__btn").click(function (e) {
                    jQuery(".test_224 .product-tabs .tabs__content").toggleClass("active"), jQuery(".test_224 .product-tabs .tabs__content").toggleClass("unactive");
                }),
                1024 <= window.innerWidth ? jQuery(".product-tabs").insertAfter(".product-page-info__option-buy") : jQuery(".cbb-frequently-bought-container").insertAfter(".tabs.product-tabs");
        }
        t.observe(document.body, { attributes: !0 }), document.body.classList.contains("test_217") && (s(), t.disconnect()), updateDifficultyLevel();
        const i = new MutationObserver(function (e) {
            e.forEach(function (e) {
                "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_224") && (a(), i.disconnect());
            });
        });
        i.observe(document.body, { attributes: !0 }), document.body.classList.contains("test_224") && (a(), i.disconnect());
    }),
    jQuery(document).ready(function (t) {
        t(".aa-view-all").length &&
            t(".aa-view-all").click(function (e) {
                e.preventDefault(), console.log(t('.header__search-form button[type="submit"]')), t('.header__search-form button[type="submit"]').trigger("click");
            });
    }),
    jQuery("#information-anchor").on("click", function () {
        jQuery(jQuery(jQuery(".footer__content .col-12")[2]).find(".footer__section-head")[0]).click(),
            jQuery(".popup-navigation__close")[0].click(),
            jQuery([document.documentElement, document.body]).animate({ scrollTop: jQuery(document).height() - 100 }, 1e3);
    }),
    jQuery(document).ready(function () {
        jQuery(document).on("click", "#notMelbourne", (e) => {
            jQuery("#cart-drawer-js").length && jQuery("#cart-drawer-js").attr("data-location", "other");
        }),
            fetch("https://get.geojs.io/v1/ip/geo.json")
                .then((e) => e.json())
                .then((e) => {
                    let t = e.city.replace("City", "").trim();
                    var s = ausPostcode.some((e) => e.includes(t)) ? "melbourne" : "other";
                    jQuery("#cart-drawer-js").length &&
                        (jQuery("#cart-drawer-js").attr("data-location", s),
                        fetch(`https://api.gameology.com.au/geo/record?ip=${e.ip}&postcode=${e.area_code}&city=${e.city}&country=${e.country_code}&latitude=${e.latitude}&longitude=` + e.longitude)),
                        jQuery("#estMelbourne").length && "melbourne" == s && jQuery("#estMelbourne").show();
                });
    });
class cartCountDown extends HTMLElement {
    constructor() {
        super();
        var e = this.dataset.countdown || 10;
        this.timer = 60 * e * 1e3;
    }
    connectedCallback() {
        this.createObserver();
    }
    getDeadline() {
        let e = +localStorage.getItem("cartCountDown") || new Date().getTime() + this.timer;
        var t = e - new Date().getTime();
        return (e = t < 0 ? new Date().getTime() + this.timer : e);
    }
    createObserver() {
        new IntersectionObserver((e, t) => {
            0 < e[0].intersectionRect.x && ((this.deadline = this.getDeadline()), requestAnimationFrame(this.countDown.bind(this)), t.disconnect());
        }).observe(this);
    }
    pad(e) {
        return ("0" + Math.floor(e)).slice(-2);
    }
    countDown() {
        this.currentTime = new Date().getTime();
        var e = this.deadline - this.currentTime,
            t = this.pad((e / 1e3) % 60),
            s = this.pad((e / 6e4) % 60);
        (this.innerHTML = s + ":" + t), 1e3 <= e && (localStorage.setItem("cartCountDown", this.deadline), requestAnimationFrame(this.countDown.bind(this)));
    }
}
customElements.define("cart-countdown", cartCountDown),
    (function () {
        const t = document.querySelector(".subcollection");
        t &&
            window.addEventListener(
                "scroll",
                (e) => {
                    0 != t.getBoundingClientRect().x && (t.getBoundingClientRect().top < 0 ? t.classList.add("sticky") : t.classList.remove("sticky"));
                },
                { passive: !1 }
            );
    })(),
    document.querySelector(".template-cart a[href*=login]") &&
        document.querySelector(".template-cart a[href*=login]").addEventListener("click", (e) => {
            e.preventDefault(), document.body.classList.add("show-customer-popup");
        }),
    document.querySelectorAll("#customerPopup .js-popup-close") &&
        document.querySelectorAll("#customerPopup .js-popup-close").forEach((e) =>
            e.addEventListener("click", (e) => {
                e.preventDefault(), document.body.classList.remove("show-customer-popup");
            })
        ),
    jQuery(document).on("click", "#anchorDetailTable", (e) => {
        e.preventDefault();
        (e = document.getElementById("anchorDetailTable")), (e = jQuery(e.dataset.target));
        e.length && jQuery([document.documentElement, document.body]).animate({ scrollTop: e.offset().top - 150 }, 1e3);
    });
class filterTooltip extends HTMLElement {
    constructor() {
        super(),
            new MutationObserver((e, t) => {
                e.forEach((e) => {
                    "attributes" === e.type && "class" === e.attributeName && document.body.classList.contains("test_145") && (this.fire(), t.disconnect());
                });
            }).observe(document.body, { attributes: !0 });
    }
    fire() {
        document.body.classList.add("show-filter-tooltip"),
            document.body.addEventListener("click", (e) => {
                e.preventDefault(), document.body.classList.remove("show-filter-tooltip"), this.remove();
            }),
            this.querySelector(".filter-tooltip-close").addEventListener("click", (e) => {
                e.preventDefault(), document.body.classList.remove("show-filter-tooltip"), this.remove();
            });
    }
}
customElements.define("filter-tooltip", filterTooltip);





