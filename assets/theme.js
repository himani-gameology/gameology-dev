!(function (t) {
    "use strict";
    var e = productQuantityLimit;
    (window.theme = window.theme || {}),
        Shopify &&
            "object" == typeof Shopify &&
            ((Shopify.addItemObj = function (e, a, n, i) {
                var o = e["product-id"],
                    s = e.quantity;
              console.log(s + i[o]);
                if (o in i && s > i[o]) return theme.Popups.cartLimitPerCustomerIsExceeded(i[o]), !1;
                var r = {
                    type: "POST",
                    url: "/cart/add.js",
                    data: t.extend({ quantity: 1 }, e),
                    dataType: "json",
                    success: function (t) {
                        "function" == typeof a ? a(t) : Shopify.onItemAdded(t);
                    },
                    error: function (t, e) {
                        Shopify.onError(t, e), n && n();
                    },
                };
                return jQuery.ajax(r), !1;
            }),
            (Shopify.changeItemObj = function (e, a) {
                var n = {
                    type: "POST",
                    url: "/cart/change.js",
                    data: t.extend({ quantity: 1 }, e),
                    dataType: "json",
                    success: function (t) {
                        "function" == typeof a ? a(t) : Shopify.onCartUpdate(t);
                    },
                    error: function (t, e) {
                        Shopify.onError(t, e);
                    },
                };
                jQuery.ajax(n);
            }),
            (Shopify.onItemAdded = function (t) {
                theme.Popups.cartItemAdded(t.title);
            }),
            (Shopify.addValueToString = function (e, a) {
                return (
                    t.each(a, function (t) {
                        e = e.replace("{{ " + t + " }}", this);
                    }),
                    e
                );
            }),
            (Shopify.handleize = function (t) {
                return t
                    .replace(/[-+!"#$€₹%&'* ,./:;<=>?@[\\\]_`{|}~()°^]+/g, "")
                    .toLowerCase()
                    .replace(/ς/, "σ");
            }),
            (Shopify.handleizeArray = function (t) {
                for (var e = [], a = 0; a < t.length; a++) e[a] = Shopify.handleize(t[a]);
                return e;
            })),
        t(".js-product-button-soldout , .ais-hit--cart-button.js-product-button-add-to-cart").hover(
            function () {
                var e = t(this).attr("data-product-id"),
                    a = t(this).attr("data-product-variant-id"),
                    n = t(this).attr("data-product-url"),
                    i = t(this).attr("avail-in-store"),
                    o = t(this).attr("not-avail-all"),
                    s = "https://api.gameology.com.au/api/shopify-listing/product/inventory/get/" + e;
                "" == e && (s = "https://api.gameology.com.au/api/shopify-listing/product/variant-inventory/get/" + a),
                    "flase" == i && "flase" == o
                        ? jQuery.ajax({
                              dataType: "json",
                              type: "GET",
                              async: !1,
                              url: s,
                              success: function (i) {
                                  for (var o = i[0].inventory, s = 0; s < o.length; s++)
                                      if ("31213648" != o[s].location_id) {
                                          if (o[s].stock > 0) {
                                              "" == e
                                                  ? (t('[data-product-variant-id="' + a + '"]').addClass("js-product-button-soldout"),
                                                    t('[data-product-variant-id="' + a + '"]').removeClass("js-product-button-add-to-cart"),
                                                    t('[data-product-variant-id="' + a + '"]').addClass("soldout-hover"),
                                                    t('[data-product-variant-id="' + a + '"]').attr("href", n),
                                                    t('[data-product-variant-id="' + a + '"]').attr("avail-in-store", "true"),
                                                    t('[data-product-variant-id="' + a + '"] span')
                                                        .last()
                                                        .html("View Avail. in store"),
                                                    t('[data-product-variant-id="' + a + '"]').attr("not-avail-all", "flase"),
                                                    t('[data-product-variant-id="' + a + '"]').attr("avail-online", "flase"))
                                                  : (t('[data-product-id="' + e + '"]').addClass("soldout-hover"),
                                                    t('[data-product-id="' + e + '"]').attr("href", n),
                                                    t('[data-product-id="' + e + '"]').attr("avail-in-store", "true"),
                                                    t('[data-product-id="' + e + '"] span')
                                                        .last()
                                                        .html("View Avail. in store"),
                                                    t('[data-product-id="' + e + '"]').attr("not-avail-all", "flase"));
                                              break;
                                          }
                                          "" == e ? t('[data-product-variant-id="' + a + '"]').attr("not-avail-all", "true") : t('[data-product-id="' + e + '"]').attr("not-avail-all", "true");
                                      } else {
                                          if (o[s].stock > 0) {
                                              t('[data-product-variant-id="' + a + '"]').attr("avail-online", "true"),
                                                  "" == e ? t('[data-product-variant-id="' + a + '"]').attr("not-avail-all", "true") : t('[data-product-id="' + e + '"]').attr("not-avail-all", "true");
                                              break;
                                          }
                                          t('[data-product-variant-id="' + a + '"]').attr("avail-online", "flase");
                                      }
                              },
                              error: function () {},
                          })
                        : "true" == i &&
                          ("" == e
                              ? "flase" == t('[data-product-variant-id="' + a + '"]').attr("avail-online") &&
                                (t('[data-product-variant-id="' + a + '"]').addClass("soldout-hover"),
                                t('[data-product-variant-id="' + a + '"]').attr("href", n),
                                t('[data-product-variant-id="' + a + '"] span')
                                    .last()
                                    .html("View Avail. in store"))
                              : (t('[data-product-id="' + e + '"]').addClass("soldout-hover"),
                                t('[data-product-id="' + e + '"]').attr("href", n),
                                t('[data-product-id="' + e + '"] span')
                                    .last()
                                    .html("View Avail. in store")));
            },
            function () {
                var e = t(this).attr("data-product-id"),
                    a = t(this).attr("data-product-variant-id");
                "" == e
                    ? "flase" == t('[data-product-variant-id="' + a + '"]').attr("avail-online") &&
                      (t('[data-product-variant-id="' + a + '"]').removeClass("soldout-hover"),
                      t('[data-product-variant-id="' + a + '"]').attr("href", "javascript:void(0);"),
                      t('[data-product-variant-id="' + a + '"] span')
                          .last()
                          .html("Sold Out"))
                    : (t('[data-product-id="' + e + '"]').removeClass("soldout-hover"),
                      t('[data-product-id="' + e + '"]').attr("href", "javascript:void(0);"),
                      t('[data-product-id="' + e + '"] span')
                          .last()
                          .html("Sold Out"));
            }
        ),
        (theme.Position = function () {
            function e() {
                (this.settings = { name: "data-js-position-name", desktop: "data-js-position-desktop", mobile: "data-js-position-mobile", all: "data-js-position-all" }), (this.selectors = { elements: ".js-position" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e,
                        a = this;
                    function n() {
                        e !== theme.current.is_desktop && (a.update(), (e = theme.current.is_desktop));
                    }
                    $window.on("theme.resize.position", function () {
                        n();
                    }),
                        n();
                    var i = t(this.selectors.elements).filter("[data-js-position-onload]");
                    this.append(i, this.settings.all);
                },
                update: function (e) {
                    var a = e ? t("[" + this.settings.name + '="' + e + '"]') : t(this.selectors.elements).not("[data-js-position-onload]"),
                        n = theme.current.is_desktop ? this.settings.desktop : this.settings.mobile;
                    this.append(a, n);
                },
                append: function (e, a) {
                    var n = this;
                    e.each(function () {
                        var e = t(this),
                            i = e.attr(n.settings.name),
                            o = t("[" + a + '="' + i + '"]');
                        o.length && !t.contains(o[0], e[0]) && (o.find("[" + n.settings.name + '="' + i + '"]').length ? e.remove() : e.appendTo(o));
                    });
                },
            })),
                (theme.Position = new e());
        }),
        (theme.Dropdown = function () {
            var e = ".dropdown";
            function a() {
                (this.selectors = { element: ".js-dropdown", button: "[data-js-dropdown-button]", dropdown: "[data-js-dropdown]" }), this.load();
            }
            (a.prototype = t.extend({}, a.prototype, {
                duration: function () {
                    return 1e3 * theme.animations.dropdown.duration;
                },
                load: function () {
                    var a = this;
                    theme.Global.responsiveHandler({
                        namespace: e,
                        element: $body,
                        delegate: this.selectors.button + ", " + this.selectors.dropdown,
                        on_desktop: !0,
                        events: {
                            "show hide close": function (e) {
                                var n = t(this).parents(a.selectors.element),
                                    i = n.find(a.selectors.button),
                                    o = n.find(a.selectors.dropdown);
                                a["_" + e.type](n, o, i);
                            },
                        },
                    }),
                        theme.Global.responsiveHandler({
                            namespace: e,
                            element: $body,
                            delegate: this.selectors.button,
                            on_desktop: !0,
                            events: {
                                mouseenter: function () {
                                    var e = t(this),
                                        n = e.parents(a.selectors.element),
                                        i = n.find(a.selectors.dropdown);
                                    e.hasClass("active") || i.hasClass("show") || a._show(n, i, e);
                                },
                                mousedown: function (n) {
                                    var i = t(this),
                                        o = i.parents(a.selectors.element),
                                        s = o.find(a.selectors.dropdown);
                                    return (
                                        i.hasClass("active")
                                            ? a._hide(o, s, i)
                                            : (a._show(o, s, i, !0),
                                              $body.one("mousedown" + e, function (e) {
                                                  t(e.target).parents(a.selectors.dropdown + ", " + a.selectors.button).length || t(a.selectors.dropdown).trigger("hide");
                                              })),
                                        n.preventDefault(),
                                        !1
                                    );
                                },
                            },
                        }),
                        theme.Global.responsiveHandler({
                            namespace: e,
                            element: $body,
                            delegate: this.selectors.element,
                            on_desktop: !0,
                            events: {
                                mouseleave: function () {
                                    var e = t(this),
                                        n = e.find(a.selectors.button),
                                        i = e.find(a.selectors.dropdown);
                                    n.hasClass("active") || a._hide(e, i, n);
                                },
                            },
                        });
                },
                _show: function (e, a, n, i) {
                    t(this.selectors.dropdown).not(a).trigger("close"),
                        i && n.addClass("active"),
                        a.hasClass("show") ||
                            (t(this.selectors.element).removeClass("hovered"),
                            e.addClass("hovered"),
                            a.addClass("show animate"),
                            window.edge
                                ? a.addClass("visible")
                                : (a.velocity("stop", !0).removeAttr("style"),
                                  a.velocity("slideDown", {
                                      duration: this.duration(),
                                      begin: function () {
                                          setTimeout(function () {
                                              a.addClass("visible");
                                          }, 0);
                                      },
                                      complete: function () {
                                          a.removeAttr("style");
                                      },
                                  })));
                },
                _hide: function (t, a, n) {
                    window.edge
                        ? (a.removeClass("show animate visible"), t.removeClass("hovered"))
                        : (a.velocity("stop", !0),
                          a.velocity("slideUp", {
                              duration: this.duration(),
                              begin: function () {
                                  a.removeClass("visible");
                              },
                              complete: function () {
                                  a.removeClass("show animate").removeAttr("style"), t.removeClass("hovered");
                              },
                          })),
                        n.removeClass("active"),
                        $body.unbind("click" + e);
                },
                _close: function (t, a) {
                    t.velocity("stop"), t.removeClass("show animate visible").removeAttr("style"), a.removeClass("active"), $body.unbind("click" + e);
                },
            })),
                (theme.Dropdown = new a());
        }),
        (theme.Select = function () {
            var e = ".select";
            function a() {
                (this.selectors = { element: ".js-select", dropdown: "[data-js-select-dropdown]" }), this.load();
            }
            (a.prototype = t.extend({}, a.prototype, {
                load: function () {
                    var a = this;
                    $body.on("click", this.selectors.element + " " + this.selectors.dropdown + " span", function () {
                        var e = t(this);
                        if ((e.parents(a.selectors.dropdown)[0].hasAttribute("data-dropdown-unselected") || !e.hasClass("selected")) && !e[0].hasAttribute("disabled")) {
                            var n = e.attr("data-value"),
                                i = e.parents(a.selectors.dropdown),
                                o = e.parents(".js-select").find("select");
                            o.val(n), i.find("span").removeClass("selected"), e.addClass("selected"), i.trigger("hide"), o.change();
                        }
                    }),
                        $body.on("change update" + e, this.selectors.element + " select", function () {
                            var e = t(this),
                                n = e.parents(a.selectors.element).find(a.selectors.dropdown + " span"),
                                i = e.val();
                            n.each(function () {
                                var e = t(this);
                                e[e.attr("data-value") == i ? "addClass" : "removeClass"]("selected");
                            });
                        }),
                        t(this.selectors.element + "[data-onload-check] select").trigger("update" + e);
                },
            })),
                (theme.Select = new a());
        }),
        (theme.Loader = function () {
            function e() {
                (this.$loader = t("#theme-loader .js-loader")), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var t = $body.find(".js-loader[data-js-page-loader]");
                    t.hasClass("visible")
                        ? (t
                              .on("transitionend", function () {
                                  t.remove();
                              })
                              .addClass("animate")
                              .removeClass("visible"),
                          "0s" === t.css("transition-duration") && t.trigger("transitionend"))
                        : t.remove();
                },
                set: function (t, e) {
                    if (t.length && !t.find("> .js-loader").length) {
                        var a,
                            n = this.$loader.clone(),
                            i = n.find("[data-js-loader-spinner]");
                        e &&
                            (!1 === e.bg && n.find("[data-js-loader-bg]").remove(),
                            !1 === e.spinner && i.remove(),
                            !0 === e.fixed && (i.addClass("fixed"), (a = (100 * (t.innerWidth() / 2 + t[0].getBoundingClientRect().left)) / theme.current.width), i.css({ left: a + "%" })),
                            e.delay && n.addClass("delay")),
                            t.addClass("loading-element"),
                            t.append(n),
                            n.addClass("animate"),
                            setTimeout(function () {
                                i.addClass("animate"), n.addClass("visible");
                            }, 0);
                    }
                },
                unset: function (t) {
                    t.find("> .loader").remove(), t.removeClass("loading-element");
                },
            })),
                (theme.Loader = new e());
        }),
        (theme.ButtonsBlocksVisibility = function () {
            function e() {
                (this.selectors = { buttons: ".js-button-block-visibility" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    t("[data-block-visibility]").each(function () {
                        var e = t(this),
                            a = e.attr("data-block-visibility");
                        -1 != window.location.href.indexOf(a) && (e.removeClass("d-none-important"), e.find("[data-block-visibility-focus]").focus());
                    }),
                        $body.on("click", this.selectors.buttons, function (e) {
                            var a = t(this),
                                n = t('[data-block-visibility="' + a.attr("data-block-link") + '"]');
                            if (n.length) {
                                var i = a.attr("data-action-close-popup");
                                return (
                                    "true" === n.attr("data-block-animate")
                                        ? (n.velocity("stop", !0).removeAttr("style"),
                                          n.hasClass("d-none-important")
                                              ? (n.velocity("stop", !0).removeAttr("style"),
                                                n.velocity("slideDown", {
                                                    duration: 1e3 * theme.animations.dropdown.duration,
                                                    begin: function () {
                                                        n.removeClass("d-none-important"), a.addClass("open");
                                                    },
                                                    complete: function () {
                                                        n.removeAttr("style");
                                                    },
                                                }))
                                              : n.velocity("slideUp", {
                                                    duration: 1e3 * theme.animations.dropdown.duration,
                                                    begin: function () {},
                                                    complete: function () {
                                                        n.addClass("d-none-important").removeAttr("style"), a.removeClass("open");
                                                    },
                                                }))
                                        : n["close" === a.attr("data-action") ? "addClass" : "open" === a.attr("data-action") ? "removeClass" : "toggleClass"]("d-none-important"),
                                    i
                                        ? theme.Popups.closeByName(i, null, function () {
                                              o();
                                          })
                                        : o(),
                                    n.hasClass("d-none-important") || n.find("[data-block-visibility-focus]").focus(),
                                    e.preventDefault(),
                                    !1
                                );
                            }
                            function o() {
                                if ((!n.hasClass("d-none-important") || "open" === a.attr("data-action")) && n[0].hasAttribute("data-block-onscroll")) {
                                    var e = n.offset().top,
                                        i = theme.StickyHeader && theme.StickyHeader.$sticky ? theme.StickyHeader.$sticky.stickyHeader("getStickyHeight") : 0;
                                    t("html, body").velocity("scroll", { offset: e - i, duration: 300 });
                                }
                            }
                        });
                },
            })),
                (theme.ButtonsBlocksVisibility = new e());
        }),
        (theme.Trigger = function () {
            function e() {
                this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = this;
                    $body.on("click", "[data-js-trigger]", function () {
                        e.process(t(this).attr("data-js-trigger"));
                    });
                },
                process: function (e, a) {
                    (a = a || "click"), t('[data-js-trigger-id="' + e + '"]').trigger(a);
                },
            })),
                (theme.Trigger = new e());
        }),
        (theme.Popups = function () {
            function e() {
                (this.selectors = { popup: ".js-popup", button: ".js-popup-button", button_close: "[data-js-popup-close]", bg: "[data-js-popup-bg]" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = t(this.selectors.popup);
                    if (e.length) {
                        var a = this;
                        $body.on("click", this.selectors.button, function (e) {
                            var n = t(this),
                                i = n.attr("data-js-popup-button");
                            if (a.callByName(i, n)) return e.preventDefault(), !1;
                        }),
                            e.on("click", this.selectors.button_close, function (e) {
                                var n = t(this),
                                    i = n.parents("[data-js-popup-name]").attr("data-js-popup-name");
                                return a.closeByName(i, n), e.preventDefault(), !1;
                            }),
                            e.on("click", "[data-js-popup-name]:not([data-disable-bg-click])", function (e) {
                                var n = t(e.target);
                                if (n[0].hasAttribute("data-js-popup-name")) {
                                    var i = n.attr("data-js-popup-name");
                                    a.closeByName(i, n);
                                }
                            }),
                            setTimeout(function () {
                                e.find('[data-js-auto-call="true"]').each(function () {
                                    a.callByName(t(this).attr("data-js-popup-name"));
                                });
                            }, 0);
                    }
                },
                getByName: function (e) {
                    return t(this.selectors.popup).find('[data-js-popup-name="' + e + '"]');
                },
                callByName: function (e, a) {
                    var n = this,
                        i = t(this.selectors.popup),
                        o = t(this.selectors.bg),
                        s = i.find('[data-js-popup-name="' + e + '"]'),
                        r = void 0 !== s.attr("data-js-popup-ajax");
                    function d() {
                        i.scrollTop(0),
                            o.one("transitionend", function () {
                                s.add(o).removeClass("animate"), s.trigger(e + ".call.after", [s, a || null]);
                            }),
                            s.add(o).addClass("animate"),
                            setTimeout(function () {
                                s.add(o).addClass("visible"), "0s" === o.css("transition-duration") && o.trigger("transitionend");
                            }, 0),
                            s[0].hasAttribute("data-js-popup-mobile-only") &&
                                $window.on("theme.changed.breakpoint.popups", function () {
                                    theme.current.is_mobile || n.closeByName(e);
                                });
                    }
                    return (
                        !!s.length &&
                        (!theme.current.is_desktop || !s[0].hasAttribute("data-js-popup-mobile-only")) &&
                        (o.unbind("transitionend"),
                        s.trigger(e + ".call.before", [s, a || null]),
                        i.addClass("active"),
                        i.find("[data-js-popup-name]").removeClass("show visible"),
                        i.add(s).addClass("show"),
                        theme.Global.fixBody(),
                        r
                            ? (s.addClass("is-process-loading"),
                              theme.Loader.set(i, { fixed: !0, delay: !0 }),
                              s.on("contentloaded", function () {
                                  s.removeClass("is-process-loading"), d(), theme.Loader.unset(i);
                              }))
                            : d(),
                        $body.on("keyup.popups", function (t) {
                            27 !== t.keyCode || $body.hasClass("product-gallery-fullscreen") || n.closeAll();
                        }),
                        i.attr("tabindex", 10).focus(),
                        s.trigger(e + ".call.visible", [s, a || null]),
                        !0)
                    );
                },
                closeByName: function (e, a, n) {
                    var i = t(this.selectors.popup),
                        o = t(this.selectors.bg),
                        s = i.find('[data-js-popup-name="' + e + '"]');
                    return (
                        o.css("transition-duration"),
                        s.length
                            ? (s.unbind("contentloaded").removeClass("is-process-loading"),
                              o.unbind("transitionend"),
                              $body.unbind("keyup.popups"),
                              $window.unbind("theme.changed.breakpoint.popups"),
                              s.trigger(e + ".close.before", [s, a || null]),
                              theme.Loader.unset(i),
                              o.one("transitionend", function () {
                                  i.add(s).removeClass("show"), s.add(o).removeClass("animate"), theme.Global.unfixBody(), i.removeClass("active"), n && n(), i.attr("tabindex", 0), s.trigger(e + ".close.after", [s, a || null]);
                              }),
                              s.add(o).addClass("animate"),
                              (o.hasClass("visible") && "0s" !== o.css("transition-duration")) || o.trigger("transitionend"),
                              s.add(o).removeClass("visible"),
                              !0)
                            : (n && n(), !1)
                    );
                },
                closeAll: function () {
                    var e = this,
                        a = t(this.selectors.popup + ".active")
                            .find("[data-js-popup-name]")
                            .filter(".show, .is-process-loading");
                    return (
                        !!a.length &&
                        (a.each(function () {
                            e.closeByName(a.attr("data-js-popup-name"));
                        }),
                        !0)
                    );
                },
                cartItemAdded: function (t) {
                    alert(theme.strings.general.popups.cart.item_added.replace("{{ title }}", t));
                },
                cartLimitIsExceeded: function (t, e = null) {
                    "brack-validation" == e && t / 2 >= 1 && (t /= 2), alert(theme.strings.general.popups.cart.limit_is_exceeded.replace("{{ limit }}", t));
                },
                cartLimitPerCustomerIsExceeded: function (t, e = null) {
                    alert(theme.strings.general.popups.cart.limit_is_exceeded_per_customer.replace("{{ x_item_limit }}", t));
                },
                addHandler: function (t, e, a, n) {
                    (n = n || "on"),
                        $body[n](t + "." + e, '[data-js-popup-name="' + t + '"]', function (t, e, n) {
                            a(e, n);
                        });
                },
                removeHandler: function (t, e) {
                    $body.unbind(t + "." + e);
                },
            })),
                (theme.Popups = new e());
        }),
        (theme.PopupAccount = function () {
            function e() {
                (this.settings = { popup_name: "account" }), (this.selectors = { account: ".js-popup-account", show_sign_up: ".js-popup-account-show-sign-up" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = this;
                    $body.on("click", this.selectors.show_sign_up, function (a) {
                        var n = t(e.selectors.account);
                        return n.find(".popup-account__login").addClass("d-none-important"), n.find(".popup-account__sign-up").removeClass("d-none-important"), a.preventDefault(), !1;
                    }),
                        theme.Popups.addHandler(e.settings.popup_name, "close.after", function () {
                            var a = t(e.selectors.account);
                            a.find(".popup-account__login").removeClass("d-none-important"), a.find(".popup-account__sign-up").addClass("d-none-important");
                        });
                },
            })),
                (theme.PopupAccount = new e());
        }),
        (theme.PopupSearch = function () {
            function e() {
                (this.settings = {
                    popup_name: "navigation",
                    default_search_obj: { url: theme.routes.search_url, data: { view: "json" } },
                    suggest_search_obj: {
                        url: theme.routes.search_url + "/suggest.json",
                        data: { resources: { type: theme.search_show_only_products ? "product" : "product,page", unavailable_products: "last", fields: "title,vendor,product_type,variants.title", options: null } },
                    },
                }),
                    (this.selectors = { search: ".js-popup-search-ajax" }),
                    this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e,
                        a = this,
                        n = "";
                    function i(e, a, n, i) {
                        var o = e.find(".search__result"),
                            s = e.find(".search__view-all"),
                            r = s.find("a"),
                            d = e.find(".search__empty"),
                            c = d.find("a"),
                            l = t("[data-js-menu-mobile]"),
                            u = t("[data-js-popup-navigation-button]");
                        0 === i.count && c.html(Shopify.addValueToString(theme.strings.general.popups.search.empty_html, { result: n })),
                            r.add(c).attr("href", theme.routes.search_url + "?q=" + n + "&options[prefix]=last"),
                            s[i.count > 0 ? "removeClass" : "addClass"]("d-none-important"),
                            d["" === n || i.count > 0 ? "addClass" : "removeClass"]("d-none-important"),
                            l["" === n ? "removeClass" : "addClass"]("d-none-important"),
                            u.attr("data-js-popup-navigation-button", "" === n ? "close" : "search"),
                            theme.Menu && theme.Menu.closeMobileMenu(),
                            theme.VerticalMenu && theme.VerticalMenu.closeMobileMenu(),
                            o.addClass("invisible"),
                            (function (e, a, n) {
                                if (n.count > 0) {
                                    var i = t(t("#template-popup-search-ajax")[0].content),
                                        o = t(document.createDocumentFragment()),
                                        s = +e.attr("data-js-max-products") - 1;
                                    t.each(n.results, function (t) {
                                        var e = i.clone(),
                                            a = e.find(".product-search__image img"),
                                            n = e.find(".product-search__title a"),
                                            r = e.find(".product-search__price .price");
                                        return (
                                            e.find("a").attr("href", this.url),
                                            n.html(this.title),
                                            this.image ? a.attr("srcset", Shopify.resizeImage(this.image, "200x") + " 1x, " + Shopify.resizeImage(this.image, "200x@2x") + " 2x") : a.remove(),
                                            r.length && (this.price ? theme.ProductCurrency.setPrice(r, this.price, this.compare_at_price) : r.remove()),
                                            o.append(e),
                                            t < s
                                        );
                                    }),
                                        a.html(""),
                                        a.append(o),
                                        theme.ImagesLazyLoad.update(),
                                        theme.ProductCurrency.update();
                                } else a.html("");
                                a[n.count > 0 ? "removeClass" : "addClass"]("d-none-important");
                            })(e, o, i),
                            o.removeClass("invisible"),
                            theme.Loader.unset(e);
                    }
                    function o() {
                        var e = t(a.selectors.search);
                        e.find(".search__content"), (n = ""), e.find("input").val(""), i(e, 0, n, { count: 0 });
                    }
                    $body.on(
                        "keyup",
                        this.selectors.search + " input",
                        t.debounce(500, function (o) {
                            var s = t(this).parents(a.selectors.search);
                            if (27 !== o.keyCode) {
                                var r = t(this).val();
                                s.find(".search__content"),
                                    r !== n &&
                                        ("" === (n = r)
                                            ? i(s, 0, n, { count: 0 })
                                            : (e && e.abort(),
                                              theme.Loader.set(s),
                                              (e = t.getJSON(
                                                  t.extend(!0, {}, theme.search_predictive_enabled ? a.settings.suggest_search_obj : a.settings.default_search_obj, {
                                                      type: "GET",
                                                      data: { q: n },
                                                      success: function (e) {
                                                          var a,
                                                              o = { count: Math.min(e.resources.results.products.length + (e.resources.results.pages ? e.resources.results.pages.length : 0), 6), results: [] },
                                                              r = 0;
                                                          t.each(e.resources.results.products, function () {
                                                              if (r > 6) return !1;
                                                              o.results.push({
                                                                  price: parseInt(this.price_min.replace(".", "")),
                                                                  compare_at_price: parseInt(this.compare_at_price_min.replace(".", "")),
                                                                  image: this.image,
                                                                  title: this.title,
                                                                  url: this.url,
                                                              }),
                                                                  r++;
                                                          }),
                                                              t.each(e.resources.results.pages, function () {
                                                                  if (r > 6) return !1;
                                                                  o.results.push({ title: this.title, url: this.url, image: this.image || null }), r++;
                                                              }),
                                                              i(s, 0, n, o);
                                                      },
                                                  })
                                              ))));
                            }
                        })
                    ),
                        $body.on("keyup", this.selectors.search + " input", function (e) {
                            if (27 === e.keyCode) {
                                var o = t(this).parents(a.selectors.search);
                                o.find(".search__content"), (n = ""), theme.Popups.closeByName("navigation"), i(o, 0, n, { count: 0 });
                            }
                        }),
                        theme.Popups.addHandler(this.settings.popup_name, "close.before", function () {
                            o();
                        }),
                        theme.Popups.addHandler(this.settings.popup_name, "call.after", function (t) {
                            theme.current.is_desktop && t.find("input").focus();
                        }),
                        theme.Global.responsiveHandler({
                            namespace: ".searchMobileBack",
                            element: $body,
                            delegate: '[data-js-popup-navigation-button="search"]',
                            on_mobile: !0,
                            events: {
                                click: function () {
                                    o();
                                },
                            },
                        });
                },
            })),
                (theme.PopupSearch = new e());
        }),
        (theme.PopupCart = function () {
            function a() {
                (this.settings = { popup_name: "cart" }), (this.selectors = { cart: ".js-popup-cart-ajax" }), this.load();
            }
            (a.prototype = t.extend({}, a.prototype, {
                load: function () {
                    theme.Popups.addHandler(this.settings.popup_name, "call.visible", function (e, a) {
                        fetch("/cart?view=drawer&timestamp=" + Date.now(), { credentials: "same-origin", method: "GET" }).then(function (a) {
                            a.text().then(function (a) {
                                t("#cart-drawer-js").html(a);
                                let n = t("#cart-drawer-js .popup-cart-wrapper").attr("data-cart");
                                t("[data-js-cart-count-mobile]").attr("data-js-cart-count-mobile", n), t(".header__cart-total").html(t("[data-js-popup-cart-subtotal]").html()), e.trigger("contentloaded");
                            });
                        });
                    }),
                        this._ajaxCart();
                },
                _resultToHTML: function (e, a) {
                    var n = t(t("#template-cart-ajax")[0].content),
                        i = t(document.createDocumentFragment());
                    t.each(a.items, function (t) {
                        var e = n.clone(),
                            a = e.find(".product-cart"),
                            o = e.find(".product-cart__image img"),
                            s = e.find(".product-cart__title a"),
                            r = e.find(".product-cart__variant"),
                            d = e.find(".product-cart__price .price"),
                            c = e.find(".product-cart__quantity"),
                            l = e.find(".product-cart__remove"),
                            u = e.find("a").not(".product-cart__remove");
                        a.attr("data-product-variant-id", this.variant_id),
                            u.attr("href", this.url),
                            s.html(this.product_title),
                            o.attr("src", Shopify.resizeImage(this.image, "120x")).attr("srcset", Shopify.resizeImage(this.image, "120x") + " 1x, " + Shopify.resizeImage(this.image, "240x") + " 2x"),
                            c.html(this.quantity),
                            l.attr("href", "/cart/change?line=" + (t + 1) + "&amp;quantity=0"),
                            "Default variant" !== this.variant && r.html(this.variant_title).removeClass("d-none-important"),
                            theme.ProductCurrency.setPrice(d, this.price),
                            i.append(e);
                    }),
                        e.html(""),
                        e.append(i);
                },
                update: function (e) {
                    var a = this,
                        n = window.langify && "/" != window.langify.locale.root_url ? window.langify.locale.root_url + "/cart" : theme.routes.cart_url;
                    this.ajax && this.ajax.abort(),
                        (this.ajax = t.getJSON(n + ".js", function (n) {
                            var i,
                                o = t(a.selectors.cart),
                                s = o.find(".popup-cart__content"),
                                r = o.find(".popup-cart__empty"),
                                d = o.find(".popup-cart__items"),
                                c = o.find("[data-js-popup-cart-count]"),
                                l = o.find("[data-js-popup-cart-subtotal]"),
                                u = o.find("[data-js-popup-cart-discounts]");
                            c.html(theme.strings.general.popups.cart.count.replace("{{ count }}", n.item_count)),
                                s[n.item_count > 0 ? "removeClass" : "addClass"]("d-none-important"),
                                r[n.item_count > 0 ? "addClass" : "removeClass"]("d-none-important"),
                                u.html("").addClass("d-none"),
                                n.item_count > 0
                                    ? (theme.ProductCurrency.setPrice(l, n.total_price),
                                      n.cart_level_discount_applications.length &&
                                          ((i = t(t("#template-cart-discount")[0].content)),
                                          t.each(n.cart_level_discount_applications, function () {
                                              var t = i.clone();
                                              t.find("[data-js-popup-cart-discount-title]").text(this.title), theme.ProductCurrency.setPrice(t.find("[data-js-popup-cart-discount-price]"), this.total_allocated_amount), u.append(t);
                                          }),
                                          u.removeClass("d-none")),
                                      a._resultToHTML(d, n),
                                      theme.ProductCurrency.update())
                                    : d.add(l).html(""),
                                e && e();
                        }));
                },
                _ajaxCart: function () {
                    t("body").on("click", ".js-remove-product", function () {
                        let e = t(this).data("line");
                        t.ajax({
                            url: "/cart/change.js",
                            type: "POST",
                            data: { quantity: 0, line: e },
                            dataType: "json",
                            success: function (e) {
                                fetch("/cart?view=drawer&timestamp=" + Date.now(), { credentials: "same-origin", method: "GET" }).then(function (e) {
                                    e.text().then(function (e) {
                                        t("#cart-drawer-js").html(e);
                                        let a = t("#cart-drawer-js .popup-cart-wrapper").attr("data-cart");
                                        t("[data-js-cart-count-mobile]").attr("data-js-cart-count-mobile", a), t(".header__cart-total").html(t("[data-js-popup-cart-subtotal]").html());
                                    });
                                });
                            },
                        });
                    }),
                        t("body").on("click", ".js-cart-quantity", function () {
                            t(this).css("color", "#ff414d");
                            let a = t(this).data("line"),
                                n = t(this).data("qty"),
                                i = parseInt(t(this).data("product-id"));
                            var o = t(this).attr("data-product-quantity") / 2 >= 1 ? t(this).attr("data-product-quantity") / 2 : t(this).attr("data-product-quantity");
                            return n > o
                                ? (t(this).css("color", "#858585"), theme.Popups.cartLimitIsExceeded(2 * o, "brack-validation"), !1)
                                : i in e && n > e[i]
                                ? (theme.Popups.cartLimitIsExceeded(n - 1), !1)
                                : void t.ajax({
                                      url: "/cart/change.js",
                                      type: "POST",
                                      data: { quantity: n, line: a },
                                      dataType: "json",
                                      success: function (e) {
                                          t(this).css("color", "#858585"),
                                              fetch("/cart?view=drawer&timestamp=" + Date.now(), { credentials: "same-origin", method: "GET" }).then(function (e) {
                                                  e.text().then(function (e) {
                                                      t("#cart-drawer-js").html(e);
                                                      let a = t("#cart-drawer-js .popup-cart-wrapper").attr("data-cart");
                                                      t("[data-js-cart-count-mobile]").attr("data-js-cart-count-mobile", a), t(".header__cart-total").html(t("[data-js-popup-cart-subtotal]").html());
                                                  });
                                              });
                                      },
                                  });
                        }),
                        t("body").on("change", ".js-input-cart-quantity", function () {
                            let a = t(this).data("line"),
                                n = t(this).val(),
                                i = parseInt(t(this).data("product-id"));
                            if (i in e && n > e[i]) return theme.Popups.cartLimitIsExceeded(n - 1), !1;
                            t.ajax({
                                url: "/cart/change.js",
                                type: "POST",
                                data: { quantity: n, line: a },
                                dataType: "json",
                                success: function (e) {
                                    fetch("/cart?view=drawer&timestamp=" + Date.now(), { credentials: "same-origin", method: "GET" }).then(function (e) {
                                        e.text().then(function (e) {
                                            t("#cart-drawer-js").html(e);
                                            let a = t("#cart-drawer-js .popup-cart-wrapper").attr("data-cart");
                                            t("[data-js-cart-count-mobile]").attr("data-js-cart-count-mobile", a), t(".header__cart-total").html(t("[data-js-popup-cart-subtotal]").html());
                                        });
                                    });
                                },
                            });
                        });
                },
            })),
                (theme.PopupCart = new a());
        }),
        (theme.PopupQuickView = function () {
            function e() {
                (this.settings = { popup_name: "quick-view", popup_size_guide_name: "size-guide" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var t = this;
                    theme.Popups.addHandler(this.settings.popup_name, "call.visible", function (e, a) {
                        var n = e.find("[data-js-quick-view]"),
                            i = a.parents("[data-js-product]");
                        n.html(""),
                            (t.$gallery = null),
                            Loader.loadManually(
                                [
                                    { type: "styles", name: "plugin_slick" },
                                    { type: "scripts", name: "plugin_slick" },
                                    { type: "scripts", name: "product_gallery" },
                                ],
                                function () {
                                    t.getProduct(i, function (a) {
                                        t.insertContent(n, a), theme.StickySidebar && theme.StickySidebar.reload(), e.trigger("contentloaded");
                                    });
                                }
                            );
                    }),
                        theme.Popups.addHandler(this.settings.popup_name, "call.after", function (e) {
                            theme.ProductCurrency.update(),
                                theme.Tooltip && theme.Tooltip.init({ appendTo: e[0] }),
                                e.find('[data-js-popup-button="size-guide"]').one("click.product-size-guide", function () {
                                    var a,
                                        n,
                                        i = theme.Popups.getByName(t.settings.popup_size_guide_name);
                                    i.length &&
                                        ((a = e.find("[data-product-size-guide-content]")), (n = i.find("[data-popup-size-guide-content]")), a.length) &&
                                        (n.children().addClass("d-none"),
                                        n.append(a.removeClass("d-none")),
                                        theme.Popups.addHandler(
                                            t.settings.popup_size_guide_name,
                                            "close.after",
                                            function () {
                                                (n = i.find("[data-popup-size-guide-content]")).find("[data-product-size-guide-content]").remove(), n.children().removeClass("d-none");
                                            },
                                            "one"
                                        ));
                                });
                        }),
                        theme.Popups.addHandler(this.settings.popup_name, "close.after", function (e) {
                            var a = e.find("[data-js-quick-view]");
                            t.ajax && t.ajax.abort(),
                                t.$gallery && t.$gallery.length && (t.$gallery.productGallery("destroy"), (t.$gallery = null)),
                                a.html(""),
                                theme.StickySidebar && theme.StickySidebar.reload(),
                                e.find('[data-js-popup-button="size-guide"]').unbind("click.product-size-guide");
                        });
                },
                getProduct: function (e, a) {
                    this.ajax && this.ajax.abort();
                    var n = e.attr("data-product-handle"),
                        i = "";
                    (e.get(0).hasAttribute("data-qv-check-change") && e.find("[data-property][data-disable-auto-select]").length) || (i = "?variant=" + e.attr("data-product-variant-id")),
                        n &&
                            (this.ajax = t.ajax({
                                type: "GET",
                                url: "https://" + window.location.hostname + "/products/" + n + i,
                                data: { view: "quick-view" },
                                dataType: "html",
                                success: function (t) {
                                    a(t);
                                },
                            }));
                },
                insertContent: function (t, e) {
                    t.html(e);
                    var a = t.find("[data-js-product]"),
                        n = a.find("[data-js-product-gallery]"),
                        i = a.find("[data-js-product-countdown] .js-countdown"),
                        o = a.find(".js-text-countdown"),
                        s = a.find(".js-visitors");
                    n.length && ((this.$gallery = n), n.productGallery()),
                        theme.ImagesLazyLoad.update(),
                        theme.ProductReview.update(),
                        i.length && theme.ProductCountdown.init(i),
                        o.length && theme.ProductTextCountdown.init(o),
                        s.length && theme.ProductVisitors.init(s),
                        theme.StoreLists.checkProductStatus(a);
                },
            })),
                (theme.PopupQuickView = new e());
        }),
        (theme.ProductCurrency = function () {
            function e() {}
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    if (theme.multipleСurrencies) {
                        var e;
                        try {
                            e = Currency.cookie.read();
                        } catch (a) {}
                        t("span.money span.money").each(function () {
                            t(this).parents("span.money").removeClass("money");
                        }),
                            t("span.money").each(function () {
                                t(this).attr("data-currency-" + Currency.shopCurrency, t(this).html());
                            }),
                            null == e
                                ? Currency.shopCurrency !== Currency.defaultCurrency
                                    ? Currency.convertAll(Currency.shopCurrency, Currency.defaultCurrency)
                                    : (Currency.currentCurrency = Currency.defaultCurrency)
                                : e === Currency.shopCurrency
                                ? (Currency.currentCurrency = Currency.shopCurrency)
                                : Currency.convertAll(Currency.shopCurrency, e);
                    }
                },
                setCurrency: function (t) {
                    theme.multipleСurrencies && (t == Currency.currentCurrency ? Currency.convertAll(Currency.shopCurrency, t) : Currency.convertAll(Currency.currentCurrency, t));
                },
                setPrice: function (t, e, a) {
                    e = +e;
                    var n = "",
                        i = (a = +a) && a > e;
                    t[i ? "addClass" : "removeClass"]("price--sale"),
                        i
                            ? ((n += "<span>"),
                              (n += Shopify.formatMoney(e, theme.moneyFormat)),
                              (n += "</span>"),
                              t[0].hasAttribute("data-js-show-sale-separator") && (n += theme.strings.priceSaleSeparator),
                              (n += "<span class='price-compare_at_price'>"),
                              (n += "<p>"),
                              (n += Shopify.formatMoney(a, theme.moneyFormat)),
                              (n += "</p>"),
                              (n += "<span class='price-save_price'>You save "),
                              (n += "<p>"),
                              (n += Shopify.formatMoney(a - e, theme.moneyFormat)),
                              (n += "</p>"),
                              (n += "</span></span>"))
                            : ((n += "<span>"), (n += Shopify.formatMoney(e, theme.moneyFormat)), (n += "</span>")),
                        t.html(n);
                },
                update: function () {
                    theme.multipleСurrencies && Currency.convertAll(Currency.shopCurrency, Currency.currentCurrency);
                },
            })),
                (theme.ProductCurrency = new e());
        }),
        (theme.ProductQuantity = function () {
            function e() {
                (this.selectors = { quantity: ".js-product-quantity" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = this;
                    $body.on("click", this.selectors.quantity + " [data-control]", function (a) {
                        var n,
                            i = t(this),
                            o = i.parents(e.selectors.quantity),
                            s = o.find("input"),
                            r = i.attr("data-control"),
                            d = s.attr("min") || 1,
                            c = s.attr("max") || 1 / 0,
                            l = +s.val();
                        t.isNumeric(l) ? ("+" === r ? (n = ++l) : "-" === r && (n = --l), n < d ? (n = d) : n > c && (n = c), n < 0 && (n = 0), s.val(n), s.trigger("custom.change"), e.dublicate(o)) : s.val(d);
                    }),
                        t(document).on("keydown", this.selectors.quantity + " input", function (e) {
                            if (-1 === t.inArray(e.keyCode, [8, 9, 27, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105])) return e.preventDefault(), !1;
                        }),
                        t(document).on("focus", this.selectors.quantity + " input", function () {
                            t(this).select();
                        }),
                        t(document).on("blur", this.selectors.quantity + " input", function () {
                            var a = t(this),
                                n = a.parents(e.selectors.quantity),
                                i = +a.val(),
                                o = a.attr("min") || 1,
                                s = a.attr("max") || 1 / 0;
                            !t.isNumeric(i) || i < o ? a.val(o) : i > s && a.val(s), e.dublicate(n);
                        });
                },
                dublicate: function (e) {
                    var a = e.attr("data-js-quantity-connect");
                    if (e.length && void 0 !== a) {
                        var n = t(this.selectors.quantity + '[data-js-quantity-connect="' + a + '"]').find("input"),
                            i = e.find("input").val();
                        n.val(i), n.trigger("custom.change");
                    }
                },
            })),
                (theme.ProductQuantity = new e());
        }),
        (theme.ProductCountdown = function () {
            function e() {
                (this.selectors = {}), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    this.init(t(".js-countdown[data-date]").not(".countdown--init"));
                },
                init: function (e) {
                    var a = e.filter("[data-date]").not(".js-countdown--lazy").not(".countdown--init");
                    a.length &&
                        Loader.loadManually([{ type: "scripts", name: "plugin_countdown" }], function () {
                            a.each(function () {
                                var e = t(this),
                                    a = e.data("date");
                                if (a) {
                                    var n = e.data("hidezero") || !0,
                                        i = a.indexOf(" +");
                                    -1 !== i && (a = a.slice(0, i));
                                    var o = new Date(a.replace(/-/g, "/"));
                                    o.getTime() - new Date().getTime() <= 0 ||
                                        (e.countdown(o, function (a) {
                                            for (
                                                var i = "",
                                                    o = [
                                                        ["totalDays", theme.strings.countdown.days],
                                                        ["hours", theme.strings.countdown.hours],
                                                        ["minutes", theme.strings.countdown.minutes],
                                                        ["seconds", theme.strings.countdown.seconds],
                                                    ],
                                                    s = 0;
                                                s < o.length;
                                                s++
                                            ) {
                                                var r = o[s][0],
                                                    d = a.offset[r],
                                                    c = o[s][1];
                                                if (0 !== s || 0 !== d || !0 !== n) {
                                                    if (e.hasClass("countdown--type-01")) i += '<span class="countdown__section"><span class="countdown__time">' + d + '</span><span class="countdown__postfix">' + c + "</span></span>";
                                                    else if (e.hasClass("countdown--type-02")) {
                                                        d < 10 ? (d = "0" + d) : (d += ""), (i += '<span class="countdown__section"><span class="countdown__time">');
                                                        for (var l = 0; l < d.length; l++) i += "<span>" + d.charAt(l) + "</span>";
                                                        i += '</span><span class="countdown__postfix">' + c + "</span></span>";
                                                    }
                                                }
                                            }
                                            t(this).html(i);
                                        }),
                                        e.parents("[data-js-product-countdown]").removeClass("d-none-important"),
                                        e.addClass("countdown--init"));
                                }
                            });
                        });
                },
                destroy: function (t) {
                    t.hasClass("countdown--init") && t.countdown("remove").off().removeClass("countdown--init").html("");
                },
                reinit: function (t, e) {
                    this.destroy(t);
                    var a = t.clone();
                    t.replaceWith(a), t.remove(), e && a.attr("data-date", e), this.init(a);
                },
            })),
                (theme.ProductCountdown = new e());
        }),
        (theme.ProductTextCountdown = function () {
            function e() {
                (this.selectors = {}), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    this.init(t(".js-text-countdown").not(".text-countdown--init"));
                },
                init: function (e) {
                    var a = e.not(".text-countdown--init");
                    a.length &&
                        Loader.loadManually([{ type: "scripts", name: "plugin_countdown" }], function () {
                            a.each(function () {
                                var e,
                                    a,
                                    n,
                                    i,
                                    o,
                                    s,
                                    r,
                                    d,
                                    c,
                                    l = t(this),
                                    u = l.find("[data-js-text-countdown-counter]"),
                                    p = l.find("[data-js-text-countdown-delivery]"),
                                    h = +l.attr("data-reset-time"),
                                    m = +l.attr("data-delivery-time"),
                                    f = l.attr("data-delivery-format"),
                                    v = l.attr("data-delivery-excludes").replace(/ /gi, "").toLowerCase().split(","),
                                    g = l.attr("data-hidezero") || !0,
                                    y = new Date(),
                                    b = [
                                        ["hours", theme.strings.text_countdown.hours.toLowerCase()],
                                        ["minutes", theme.strings.text_countdown.minutes.toLowerCase()],
                                    ],
                                    C = [
                                        theme.strings.text_countdown.days_of_week.sunday,
                                        theme.strings.text_countdown.days_of_week.monday,
                                        theme.strings.text_countdown.days_of_week.tuesday,
                                        theme.strings.text_countdown.days_of_week.wednesday,
                                        theme.strings.text_countdown.days_of_week.thursday,
                                        theme.strings.text_countdown.days_of_week.friday,
                                        theme.strings.text_countdown.days_of_week.saturday,
                                    ];
                                y.setDate(y.getDate() + 1),
                                    y.setHours(h, 0, 0, 0),
                                    u.countdown(y, function (l) {
                                        for (n = f.toLowerCase(), i = "", d = 0; d < b.length; d++) (o = b[d][0]), (s = l.offset[o]), (r = b[d][1]), (0 === d && 0 === s && !0 === g) || (0 !== d && (i += " "), (i += s + " " + r));
                                        for (
                                            t(this).html(i),
                                                (a = new Date()).setDate(a.getDate() + m),
                                                (e = new Date()).getHours() >= y.getHours() && e.getMinutes() >= y.getMinutes() && e.getSeconds() >= y.getSeconds() && a.setDate(a.getDate() + 1),
                                                c = 0;
                                            c < v.length;

                                        )
                                            v[c] === C[a.getDay()].toLowerCase() ? (a.setDate(a.getDate() + 1), (c = 0)) : c++;
                                        (n = n
                                            .replace("day", C[a.getDay()])
                                            .replace("dd", ("0" + a.getDate()).slice(-2))
                                            .replace("mm", ("0" + (a.getMonth() + 1)).slice(-2))
                                            .replace("yyyy", a.getFullYear())
                                            .replace("yy", a.getFullYear().toString().slice(-2))),
                                            p.html(n);
                                    }),
                                    l.addClass("text-countdown--init");
                            });
                        });
                },
                destroy: function (t) {
                    t.hasClass("text-countdown--init") && t.countdown("remove").off().removeClass("text-countdown--init").html("");
                },
            })),
                (theme.ProductTextCountdown = new e());
        }),
        (theme.ProductVisitors = function () {
            function e() {
                (this.selectors = {}), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    this.init(t(".js-visitors").not(".visitors--init"));
                },
                init: function (e) {
                    function a(t, e) {
                        return Math.round(t - 0.5 + Math.random() * (e - t + 1));
                    }
                    e.not(".visitors--init").each(function () {
                        var e,
                            n,
                            i = t(this),
                            o = i.find("[data-js-counter]"),
                            s = i.attr("data-min"),
                            r = i.attr("data-max"),
                            d = i.attr("data-interval-min"),
                            c = i.attr("data-interval-max"),
                            l = +i.attr("data-stroke");
                        i.addClass("visitors--processing"),
                            (function t() {
                                setTimeout(function () {
                                    i.hasClass("visitors--processing") && (Math.abs((e = +o.text()) - (n = a(s, r))) > l && (n = a(e, (n = n > e ? e + l : e - l))), o.text(n), t());
                                }, 1e3 * a(d, c));
                            })(),
                            i.addClass("visitors--init");
                    });
                },
                destroy: function (t) {
                    t.hasClass("visitors--init") && t.off().removeClass("visitors--processing visitors--init").html("");
                },
            })),
                (theme.ProductVisitors = new e());
        }),
        (theme.ProductImagesNavigation = function () {
            function e() {
                (this.selectors = { images_nav: ".js-product-images-navigation" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = this;
                    $body.on("click", "[data-js-product-images-navigation]:not([data-disabled])", function () {
                        var a = t(this),
                            n = a.parents("[data-js-product]"),
                            i = a.attr("data-js-product-images-navigation");
                        theme.ProductImagesHover.disable(n.find("img")),
                            theme.ProductOptions.switchByImage(n, i, null, function (t) {
                                e._updateButtons(n, t.is_first, t.is_last);
                            });
                    });
                },
                switch: function (t, e) {
                    var a,
                        n,
                        i,
                        o,
                        s = t.find("[data-js-product-image]");
                    s.length &&
                        ((a = s.find("img")),
                        (n = e.update_variant.featured_image),
                        theme.ProductImagesHover.disable(a),
                        (n && n.src) || (e.json.images[0] && (n = e.json.images[0])),
                        n &&
                            n.src &&
                            +n.id != +a.attr("data-image-id") &&
                            ((i = Shopify.resizeImage(n.src, Math.ceil(s.width()) + "x") + " 1x, " + Shopify.resizeImage(n.src, 2 * Math.ceil(s.width()) + "x") + " 2x"),
                            (o = Shopify.resizeImage(n.src, "{width}x")),
                            this.changeSrc(a, i, n.id, o),
                            a.parents(this.selectors.images_nav).length && this._updateButtons(t, +e.json.images[0].id == +n.id, +e.json.images[e.json.images.length - 1].id == +n.id)));
                },
                changeSrc: function (t, e, a, n) {
                    var i = t.parent();
                    (a = a || "null"),
                        theme.Loader.set(i),
                        t.one("load", function () {
                            theme.Loader.unset(i);
                        }),
                        t.attr("srcset", e).attr("data-image-id", a),
                        n && t.attr("data-master", n);
                },
                _updateButtons: function (t, e, a) {
                    t.find('[data-js-product-images-navigation="prev"]')[e ? "attr" : "removeAttr"]("data-disabled", "disabled"), t.find('[data-js-product-images-navigation="next"]')[a ? "attr" : "removeAttr"]("data-disabled", "disabled");
                },
            })),
                (theme.ProductImagesNavigation = new e());
        }),
        (theme.ProductImagesHover = function () {
            function e() {
                (this.selectors = { images_hover: ".js-product-images-hover", images_hovered_end: ".js-product-images-hovered-end" }), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    function e(t, e, a, n) {
                        var i = theme.ImagesLazyLoad.buildSrcset(e, a);
                        t.attr("data-js-product-image-hover-id", e.attr("data-image-id")), theme.ProductImagesNavigation.changeSrc(e, i, n);
                    }
                    theme.Global.responsiveHandler({
                        namespace: ".product-collection.images.hover",
                        element: $body,
                        delegate: this.selectors.images_hover,
                        on_desktop: !0,
                        events: {
                            mouseenter: function () {
                                var a = t(this),
                                    n = a.find("img"),
                                    i = a.attr("data-js-product-image-hover"),
                                    o = a.attr("data-js-product-image-hover-id");
                                i &&
                                    (e(a, n, i, o),
                                    a.one("mouseleave", function () {
                                        var t = n.attr("data-master"),
                                            i = a.attr("data-js-product-image-hover-id");
                                        e(a, n, t, i);
                                    }));
                            },
                        },
                    }),
                        theme.Global.responsiveHandler({
                            namespace: ".product-collection.images.hoveredend",
                            element: $body,
                            delegate: this.selectors.images_hovered_end,
                            on_desktop: !0,
                            events: {
                                mouseenter: function () {
                                    var e,
                                        a = t(this);
                                    (e = setTimeout(function () {
                                        a.addClass("hovered-end");
                                    }, 1e3 * theme.animations.css.duration)),
                                        a.one("mouseleave", function () {
                                            clearTimeout(e);
                                        });
                                },
                                mouseleave: function () {
                                    t(this).removeClass("hovered-end");
                                },
                            },
                        });
                },
                disable: function (t) {
                    t.parents(this.selectors.images_hover).removeClass("js-product-images-hover").unbind("mouseleave");
                },
            })),
                (theme.ProductImagesHover = new e());
        }),
        (theme.ProductOptions = function () {
            function e() {
                (this.selectors = { options: ".js-product-options", options_attr: "[data-js-product-options]" }), (this.afterChange = []), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e,
                        a,
                        n = this;
                    function i(e) {
                        var a = t(this),
                            i = a.parents(n.selectors.options),
                            o = a.parents("[data-property]");
                        if (!(a.hasClass("disabled") || (a.hasClass("active") && !o[0].hasAttribute("data-disable-auto-select")))) {
                            var s = o.find("[data-js-option-value]"),
                                r = a.parents("[data-js-product]"),
                                d = r.attr("data-json-product"),
                                c = [],
                                l = null;
                            s.removeClass("active"),
                                a.filter("[data-js-option-value]").addClass("active"),
                                o.removeAttr("data-disable-auto-select"),
                                n._loadJSON(r, d, function (e) {
                                    var a = i.find("[data-js-option-value].active").add(i.find("option[data-value]:selected"));
                                    t.each(a, function () {
                                        var e = t(this);
                                        c.push(e.attr("data-value"));
                                    }),
                                        i.find("[data-js-option-value]").removeClass("active"),
                                        t.each(e.variants, function () {
                                            if (c.join(" / ") === Shopify.handleizeArray(this.options).join(" / ")) return !(!this.available && theme.product.hide_options_without_availability_variants) && ((l = this), !1);
                                        }),
                                        !l &&
                                            c.length > 1 &&
                                            t.each(e.variants, function () {
                                                if (
                                                    c[0] === Shopify.handleize(this.options[0]) &&
                                                    c[1] === Shopify.handleize(this.options[1]) &&
                                                    (this.available || (!l && !theme.product.hide_options_without_availability_variants)) &&
                                                    ((l = this), this.available)
                                                )
                                                    return !1;
                                            }),
                                        l ||
                                            t.each(e.variants, function () {
                                                if (c[0] === Shopify.handleize(this.options[0]) && (this.available || (!l && !theme.product.hide_options_without_availability_variants)) && ((l = this), this.available)) return !1;
                                            }),
                                        l || (l = n._getDefaultVariant(e)),
                                        n._updatePossibleVariants(r, { update_variant: l, json: e }),
                                        t.each(l.options, function (t, e) {
                                            var a = i.find("[data-property]").eq(t);
                                            a.find('[data-js-option-value][data-value="' + Shopify.handleize(e) + '"]').addClass("active"), a.filter("[data-js-option-select]").val(Shopify.handleize(e)).trigger("change", [!0]);
                                        }),
                                        n._switchVariant(r, { update_variant: l, json: e, has_unselected_options: !!r.find("[data-property][data-disable-auto-select]").length });
                                });
                        }
                    }
                    $body.on("click", this.selectors.options + " [data-js-option-value]", i),
                        $body.on("mouseenter", this.selectors.options + "[data-js-options-onhover] [data-js-option-value]", t.debounce(400, i)),
                        $body.on("change", "[data-js-product] [data-js-option-select]", function (e, a) {
                            if (!a) {
                                var n = t(this).find("option[data-value]:selected");
                                t(this).parents(".select").find("[data-js-select-dropdown]").removeAttr("data-dropdown-unselected"), i.call(n, e);
                            }
                        }),
                        $body.on("change", '[data-js-product-variants="control"]', function () {
                            var e = t(this),
                                a = e.parents("[data-js-product], [data-js-product-clone]"),
                                i = !0,
                                o = !1;
                            a[0].hasAttribute("data-js-product-clone") && ((a = t('[data-js-product-clone-id="' + a[0].getAttribute("data-js-product-clone") + '"]')), (i = !1), (o = !0));
                            var s = e.find("option:selected").attr("value"),
                                r = a.attr("data-json-product"),
                                d = null;
                            n._loadJSON(a, r, function (e) {
                                t.each(e.variants, function () {
                                    if (+this.id == +s) return (d = this), !1;
                                }),
                                    n._switchVariant(a, { update_variant: d, json: e, dontUpdateVariantsSelect: i, updateProductOptions: o });
                            });
                        }),
                        theme.Global.responsiveHandler({
                            namespace: ".product.load-json",
                            element: $body,
                            delegate: "[data-js-product][data-js-product-json-preload]",
                            on_desktop: !0,
                            events: {
                                mouseenter: function () {
                                    var i = t(this);
                                    clearTimeout(e),
                                        (e = setTimeout(function () {
                                            i.attr("data-json-product") ||
                                                (a = n._loadJSON(
                                                    i,
                                                    null,
                                                    function () {
                                                        a = null;
                                                    },
                                                    !1
                                                ));
                                        }, 300));
                                },
                                mouseleave: function () {
                                    clearTimeout(e), a && (a.abort(), (a = null));
                                },
                            },
                        });
                },
                _loadJSON: function (e, a, n, i) {
                    if (e[0].hasAttribute("data-js-process-ajax-loading-json"))
                        e.one("json-loaded", function () {
                            n && n(JSON.parse(e.attr("data-json-product")));
                        });
                    else {
                        if (((i = void 0 === i || i), !a)) {
                            e.attr("data-js-process-ajax-loading-json", !0);
                            var o = e.attr("data-product-handle");
                            return t.ajax({
                                type: "GET",
                                url: theme.routes.root_url + "products/" + o,
                                data: { view: "get_json" },
                                cache: !1,
                                dataType: "html",
                                success: function (t) {
                                    (a = JSON.parse(t)), e.attr("data-json-product", JSON.stringify(a)), n && n(a), e.trigger("json-loaded");
                                },
                                complete: function () {
                                    e.removeAttr("data-js-process-ajax-loading-json");
                                },
                            });
                        }
                        n && n("object" == typeof a ? a : JSON.parse(a));
                    }
                },
                switchByImage: function (e, a, n, i) {
                    var o = this,
                        s = e.find("[data-js-product-image] img"),
                        r = e.attr("data-json-product"),
                        d = !1;
                    this._loadJSON(e, r, function (r) {
                        var c,
                            l,
                            u = r.images,
                            p = "by_id" === a ? +n : +s.attr("data-image-id");
                        t.each(u, function (t) {
                            if (+this.id === p) return (c = t), !1;
                        }),
                            (c || 0 === c) &&
                                ("prev" === a && 0 !== c ? c-- : "next" === a && c !== u.length - 1 && c++,
                                t.each(r.variants, function () {
                                    if (this.featured_image && +this.featured_image.id == +u[c].id) return (l = this), !1;
                                }),
                                l || ((l = o._getDefaultVariant(r)).featured_image = u[c]),
                                o._updateOptions(e, { update_variant: l, json: r }),
                                o._switchVariant(e, { update_variant: l, json: r }),
                                (d = { index: c, image: u[c], is_first: 0 === c, is_last: c === u.length - 1 })),
                            i(d);
                    });
                },
                _updatePossibleVariants: function (e, a) {
                    var n,
                        i,
                        o = e.find(this.selectors.options_attr),
                        s = [];
                    a.update_variant.options.length > 1 &&
                        (t.each(a.json.variants, function () {
                            Shopify.handleize(this.options[0]) === Shopify.handleize(a.update_variant.options[0]) &&
                                ((!this.available && theme.product.hide_options_without_availability_variants && this.id !== a.update_variant.id) || s.push(this));
                        }),
                        (n = o.find("[data-property]").eq(1).find("[data-js-option-value]")),
                        (i = o.find("[data-property]").eq(1).filter("[data-js-option-select]").parents(".select").find("[data-value]")),
                        n.addClass("disabled"),
                        i.attr("disabled", "disabled"),
                        t.each(s, function () {
                            n.filter('[data-js-option-value][data-value="' + Shopify.handleize(this.options[1]) + '"]').removeClass("disabled"), i.filter('[data-value="' + Shopify.handleize(this.options[1]) + '"]').removeAttr("disabled");
                        }),
                        a.update_variant.options.length > 2 &&
                            ((s = []),
                            t.each(a.json.variants, function () {
                                Shopify.handleize(this.options[0]) === Shopify.handleize(a.update_variant.options[0]) &&
                                    Shopify.handleize(this.options[1]) === Shopify.handleize(a.update_variant.options[1]) &&
                                    ((!this.available && theme.product.hide_options_without_availability_variants && this.id !== a.update_variant.id) || s.push(this));
                            }),
                            (n = o.find("[data-property]").eq(2).find("[data-js-option-value]")),
                            (i = o.find("[data-property]").eq(2).filter("[data-js-option-select]").parents(".select").find("[data-value]")),
                            n.addClass("disabled"),
                            i.attr("disabled", "disabled"),
                            t.each(s, function () {
                                n.filter('[data-js-option-value][data-value="' + Shopify.handleize(this.options[2]) + '"]').removeClass("disabled"),
                                    i.filter('[data-value="' + Shopify.handleize(this.options[2]) + '"]').removeAttr("disabled");
                            })));
                },
                _switchVariant: function (e, a) {
                    (a.update_variant.metafields = t.extend({}, a.json.metafields)),
                        t.each(a.json.variants_metafields, function () {
                            +this.variant_id == +a.update_variant.id && (a.update_variant.metafields = t.extend(!0, a.update_variant.metafields, this.metafields));
                        }),
                        t.each(a.json.variants_quantity, function () {
                            if (+this.id == +a.update_variant.id) return 0 >= +this.quantity && "continue" == this.policy && (a.update_variant.variant_pre_order = !0), !1;
                        }),
                        this._updateContent(e, a);
                },
                _getDefaultVariant: function (e) {
                    var a = {};
                    return (
                        t.each(e.variants, function () {
                            if (+this.id == +e.default_variant_id) return Object.assign(a, this), !1;
                        }),
                        a
                    );
                },
                _updateContent: function (e, a) {
                    var n = t('[data-js-product-clone="' + e.attr("data-js-product-clone-id") + '"]');
                    e.attr("data-product-variant-id", a.update_variant.id),
                        e.add(n).find("[data-js-product-options]").attr("data-variant-was-chanched", !0),
                        theme.StickySidebar && theme.StickySidebar.update("listener-enable"),
                        this._updateFormVariantInput(e, a),
                        this._updatePrice(e, n, a),
                        this._updateTextLabelValue(e, n, a),
                        this._updateLabelSale(e, a),
                        this._updateLabelInStock(e, a),
                        this._updateLabelPreOrder(e, a),
                        this._updateLabelOutStock(e, a),
                        this._updateLabelHot(e, a),
                        this._updateLabelNew(e, a),
                        this._updateCountdown(e, a),
                        this._updateAddToCart(e, n, a),
                        this._updateDynamicCheckout(e, a),
                        this._updateSKU(e, a),
                        this._updateBarcode(e, a),
                        this._updateAvailability(e, a),
                        this._updateStockCountdown(e, a),
                        this._updateGallery(e, a),
                        this._updateLinks(e, a),
                        this._updateHistory(e, a),
                        theme.StoreLists.checkProductStatus(e),
                        theme.ProductImagesNavigation.switch(e, a),
                        a.dontUpdateVariantsSelect || this._updateVariantsSelect(e, a, !0),
                        a.updateProductOptions && this._updateOptions(e, a),
                        n.length && (this._updateVariantsSelect(n, a), this._updateOptions(n, a, e), theme.ProductImagesNavigation.switch(n, a)),
                        theme.StickySidebar && theme.StickySidebar.update("listener-process"),
                        theme.StickySidebar && theme.StickySidebar.update("listener-disable");
                },
                _updateOptions: function (e, a, n) {
                    var i = this;
                    e.each(function () {
                        var o,
                            s = t(this),
                            r = s.find(i.selectors.options_attr);
                        r.length &&
                            (r.find("[data-js-option-value]").removeClass("active"),
                            i._updatePossibleVariants(s, a),
                            t.each(a.update_variant.options, function (t, e) {
                                var a = r.find("[data-property]").eq(t);
                                a.find('[data-js-option-value][data-value="' + Shopify.handleize(e) + '"]').addClass("active"), a.filter("[data-js-option-select]").val(Shopify.handleize(e)).trigger("change", [!0]);
                            })),
                            n &&
                                "enable" !== theme.product.variant_auto_select &&
                                ((o = e.find("[data-property]")).attr("data-disable-auto-select"),
                                n.find("[data-property]").each(function (t, e) {
                                    this.hasAttribute("data-disable-auto-select") || o.eq(t).removeAttr("data-disable-auto-select");
                                }));
                    });
                },
                _updateFormVariantInput: function (t, e) {
                    t.find("[data-js-product-variant-input]").attr("value", e.update_variant.id);
                },
                _updateVariantsSelect: function (t, e, a) {
                    var n = t.find("[data-js-product-variants]");
                    n.length && (n.val(e.update_variant.id), a && n.change());
                },
                _updateAddToCart: function (t, e, a) {
                    var n = t.add(e).find("[data-js-product-button-add-to-cart]");
                    n.length &&
                        !a.has_unselected_options &&
                        (a.update_variant.variant_pre_order
                            ? n.removeAttr("disabled").attr("data-button-status", "pre-order")
                            : a.update_variant.available
                            ? n.removeAttr("disabled data-button-status")
                            : n.attr("disabled", "disabled").attr("data-button-status", "sold-out"));
                },
                _updateDynamicCheckout: function (t, e) {
                    var a = t.find("[data-js-product-button-dynamic-checkout]");
                    a.length && !e.has_unselected_options && (e.update_variant.available ? a.removeClass("d-none") : a.addClass("d-none"));
                },
                _updatePrice: function (e, a, n) {
                    var i,
                        o = e.add(a).find("[data-js-product-price]"),
                        s = e.find("[data-js-product-price-sale-details]");
                    o.length && theme.ProductCurrency.setPrice(o, n.update_variant.price, n.update_variant.compare_at_price),
                        s.length &&
                            (t.each(n.json.variants_price_sale_details, function () {
                                +this.id == +n.update_variant.id && (i = this.details);
                            }),
                            s.html(i || "")[i ? "removeClass" : "addClass"]("d-none-important")),
                        (o.length || s.length) && theme.ProductCurrency.update();
                },
                _updateTextLabelValue: function (t, e, a) {
                    var n = t.find("[data-section-container]"),
                        i = e.find("[data-section-container]");
                    a.update_variant.option1 && n.eq(0).add(i.eq(0)).find("[data-label-value]").text(a.update_variant.option1),
                        a.update_variant.option2 && n.eq(1).add(i.eq(1)).find("[data-label-value]").text(a.update_variant.option2),
                        a.update_variant.option3 && n.eq(2).add(i.eq(2)).find("[data-label-value]").text(a.update_variant.option3);
                },
                _updateLabelSale: function (t, e) {
                    var a = t.find("[data-js-product-label-sale]");
                    if (a.length) {
                        var n = "",
                            i = e.update_variant.compare_at_price && e.update_variant.compare_at_price > e.update_variant.price;
                        if ((a[i ? "removeClass" : "addClass"]("d-none-important"), i)) {
                            var o = Math.ceil(100 - (100 * e.update_variant.price) / e.update_variant.compare_at_price);
                            (n += theme.strings.label.sale), (n = Shopify.addValueToString(n, { percent: o }));
                        }
                        a.html(n);
                    }
                },
                _updateLabelInStock: function (t, e) {
                    var a = t.find("[data-js-product-label-in-stock]");
                    a.length && a[!e.update_variant.available || e.update_variant.variant_pre_order ? "addClass" : "removeClass"]("d-none-important");
                },
                _updateLabelPreOrder: function (t, e) {
                    var a = t.find("[data-js-product-label-pre-order]");
                    a.length && a[e.update_variant.variant_pre_order ? "removeClass" : "addClass"]("d-none-important");
                },
                _updateLabelOutStock: function (t, e) {
                    var a = t.find("[data-js-product-label-out-stock]");
                    a.length && a[e.update_variant.available ? "addClass" : "removeClass"]("d-none-important");
                },
                _updateLabelHot: function (t, e) {
                    var a = t.find("[data-js-product-label-hot]");
                    a.length && a[e.update_variant.metafields.labels && e.update_variant.metafields.labels.hot ? "removeClass" : "addClass"]("d-none-important");
                },
                _updateLabelNew: function (t, e) {
                    var a = t.find("[data-js-product-label-new]");
                    a.length && a[e.update_variant.metafields.labels && e.update_variant.metafields.labels.new ? "removeClass" : "addClass"]("d-none-important");
                },
                _updateCountdown: function (t, e) {
                    var a,
                        n,
                        i = t.find("[data-js-product-countdown]"),
                        o = !(!e.update_variant.metafields.countdown || !e.update_variant.metafields.countdown.date) && e.update_variant.metafields.countdown.date;
                    i.length &&
                        ((a = i.find(".js-countdown")),
                        (n = o && e.update_variant.compare_at_price && e.update_variant.compare_at_price > e.update_variant.price) && a.attr("data-date") !== o && theme.ProductCountdown.reinit(a, o),
                        n || i.addClass("d-none-important"));
                },
                _updateSKU: function (t, e) {
                    var a = t.find("[data-js-product-sku]");
                    a.length && (a[e.update_variant.sku ? "removeClass" : "addClass"]("d-none-important"), a.find("span").html(e.update_variant.sku));
                },
                _updateBarcode: function (t, e) {
                    var a = t.find("[data-js-product-barcode]");
                    a.length && (a[e.update_variant.barcode ? "removeClass" : "addClass"]("d-none-important"), a.find("span").html(e.update_variant.barcode));
                },
                _updateAvailability: function (e, a) {
                    var n = e.find("[data-js-product-availability]");
                    if (n.length) {
                        var i = "",
                            o = 0;
                        t.each(a.json.variants_quantity, function () {
                            if (+this.id == +a.update_variant.id) return (o = +this.quantity), !1;
                        }),
                            a.update_variant.available
                                ? ((i += theme.strings.availability_value_in_stock), (i = Shopify.addValueToString(i, { count: o, item: 1 === o ? theme.strings.layout.cart.items_count.one : theme.strings.layout.cart.items_count.other })))
                                : (i += theme.strings.availability_value_out_stock),
                            n.attr("data-availability", a.update_variant.available).find("span").html(i);
                    }
                },
                _updateStockCountdown: function (e, a) {
                    var n = e.find("[data-js-product-stock-countdown]"),
                        i = n.find("[data-js-product-stock-countdown-title]"),
                        o = n.find("[data-js-product-stock-countdown-progress]"),
                        s = +n.attr("data-min"),
                        r = 0;
                    t.each(a.json.variants_quantity, function () {
                        if (+this.id == +a.update_variant.id) return (r = +this.quantity), !1;
                    }),
                        i && i.html(Shopify.addValueToString(theme.strings.stock_countdown.title, { quantity: '<span class="stock-countdown__counter">' + r + "</span>" })),
                        o && o.width(r / (s / 100) + "%"),
                        n.length && n[r > 0 && r < s ? "removeClass" : "addClass"]("d-none-important");
                },
                _updateGallery: function (t, e) {
                    var a = t.find("[data-js-product-gallery].initialized");
                    if (a.length) {
                        var n = e.update_variant.featured_media || e.json.media[0],
                            i = !!e.update_variant.option1 && e.update_variant.option1.replace('"', "");
                        a.productGallery("goToSlideById", +n.id, i);
                    }
                },
                _updateLinks: function (t, e) {
                    var a = decodeURIComponent(window.location.origin) + "/products/" + e.json.handle + "?variant=" + e.update_variant.id;
                    t.find('a[href*="products/' + e.json.handle + '"]').attr("href", a);
                },
                _updateHistory: function (t, e) {
                    var a = t.find(this.selectors.options);
                    if (!e.has_unselected_options && a.length && a[0].hasAttribute("data-js-change-history")) {
                        var n = window.location.href.split("?")[0] + "?variant=" + e.update_variant.id;
                        history.replaceState({ foo: "product" }, n, n);
                    }
                },
            })),
                (theme.ProductOptions = new e());
        }),
        (theme.ProductReview = function () {
            function e() {}
            (e.prototype = t.extend({}, e.prototype, {
                update: function () {
                    if (window.SPR)
                        try {
                            SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadBadges();
                        } catch (t) {}
                },
            })),
                (theme.ProductReview = new e());
        }),
        (theme.ProductGallery = function () {
            function e() {
                this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    t.widget("ui.productGallery", {
                        options: {
                            bp: 1024,
                            bp_slick: 1024,
                            videoAutoplay: !1,
                            fotorama: { size: 3, nav: !1, arrows: !1, allowfullscreen: !0, auto: !1, shadows: !1, transition: "slide", clicktransition: "crossfade", click: !1, swipe: !1 },
                            slick: {
                                preview: {
                                    lazyLoad: !1,
                                    vertical: !0,
                                    verticalSwiping: !0,
                                    slidesToShow: 6,
                                    slidesToScroll: 6,
                                    dots: !1,
                                    arrows: !0,
                                    infinite: !1,
                                    touchMove: !1,
                                    responsive: [
                                        { breakpoint: 1259, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                        { breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 3, vertical: !1, verticalSwiping: !1, arrows: !1, dots: !0, infinite: !0 } },
                                    ],
                                },
                                panorama: {
                                    lazyLoad: !0,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    customPaging: "10px",
                                    dots: !1,
                                    arrows: !0,
                                    infinite: !1,
                                    touchMove: !1,
                                    responsive: [
                                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                                        { breakpoint: 779, settings: { slidesToShow: 2 } },
                                        { breakpoint: 542, settings: { slidesToShow: 1 } },
                                    ],
                                },
                            },
                            zoom: { zoomType: "inner", cursor: "crosshair", easing: !0, easingDuration: 200, zoomWindowFadeIn: 100, zoomWindowFadeOut: 0 },
                            zoomEnable: !0,
                            arrows: !0,
                            btnZoom: !1,
                            fullscreen: !0,
                        },
                        _create: function () {
                            (this.$gallery = this.element),
                                (this.$main = this.$gallery.find("[data-js-product-gallery-main]")),
                                (this.$preview = this.$gallery.find("[data-js-product-gallery-preview]")),
                                (this.$collage = this.$gallery.find("[data-js-product-gallery-collage]")),
                                (this.preview_type = this.$preview.attr("data-type")),
                                (this.$main_act_img = null),
                                (this.$zoomWrapper = this.$gallery.find("[data-js-product-gallery-zoom]")),
                                (this.slick_state = null),
                                (this.zoom_activate = !0),
                                (this.zoom_state = !1),
                                (this.id = "id" + Math.ceil(1e7 * Math.random())),
                                (this.index_id_obj = this.$main.data("index-id")),
                                (this.zoom_src = this.$main.data("zoom-images"));
                            var e = this,
                                a = this.$main.data("arrows"),
                                n = this.$main.data("fullscreen"),
                                i = this.$main.data("video-autoplay"),
                                o = this.$main.data("zoom"),
                                s = this.$gallery.data("active-image"),
                                r = this.$main.find("img"),
                                d = [];
                            function c(t) {
                                d[t.activeIndex] && e.$main.find(".fotorama__active img").attr("alt", d[t.activeIndex]);
                            }
                            null != a && (this.options.arrows = a),
                                null != n && (this.options.fullscreen = n),
                                null != i && (this.options.videoAutoplay = i),
                                null != o && (this.options.zoomEnable = o),
                                null != s && ((this.options.fotorama.startindex = s), (this.options.slick.initialSlide = s)),
                                (this.options.fotorama.allowfullscreen = this.options.fullscreen),
                                this.$main.length &&
                                    (1 === this.index_id_obj &&
                                        (this.$main.parents(".product-page-gallery__main").addClass("product-page-gallery__main--single"), this.$main.parents(".product-page-gallery").addClass("product-page-gallery--centered")),
                                    r.each(function () {
                                        d.push(t(this).attr("alt"));
                                    }),
                                    this.options.arrows &&
                                        ((this.$arrow_prev = this.$gallery.find("[data-js-product-gallery-main-btn-prev]")),
                                        (this.$arrow_next = this.$gallery.find("[data-js-product-gallery-main-btn-next]")),
                                        this.$arrow_prev.on("click", function () {
                                            e._setEffect("crossfade", function () {
                                                e.fotorama.show("<");
                                            });
                                        }),
                                        this.$arrow_next.on("click", function () {
                                            e._setEffect("crossfade", function () {
                                                e.fotorama.show(">");
                                            });
                                        })),
                                    this.$main.one("fotorama:load", function (a, n) {
                                        e._zoomInit(),
                                            e._checkBtns(n),
                                            e._checkSwipe(n),
                                            e.$main.on("fotorama:show.change", function (t, a) {
                                                e.$main.unbind("fotorama:showend.change fotorama:load.change"),
                                                    e._zoomDestroy(),
                                                    e._checkBtns(a),
                                                    e._checkSwipe(a),
                                                    e.$main.one("fotorama:load.change", function () {
                                                        e._zoomInit();
                                                    }),
                                                    e.$main.one("fotorama:showend.change", function (t, a) {
                                                        e.$main.find(".fotorama__active img").attr("src") && e.$main.trigger("fotorama:load.change"),
                                                            e._checkSlick(),
                                                            e._checkCollage(),
                                                            c(a),
                                                            e.options.videoAutoplay &&
                                                                a.activeFrame.video &&
                                                                setTimeout(function () {
                                                                    e.fotorama.playVideo();
                                                                }, 0);
                                                    });
                                            }),
                                            e.$main.parent().removeClass("invisible"),
                                            c(n),
                                            (e.fotorama_is_init = !0),
                                            t(window).on("theme.changed.breakpoint.productgallery" + this.id, function () {
                                                e._checkSwipe(n), e._slickInit(), e._checkSlick(), e._checkCollage(), e._zoomDestroy(), e._zoomInit();
                                            });
                                    }),
                                    (this.fotorama = this.$main.fotorama(this.options.fotorama).data("fotorama"))),
                                this.options.fullscreen &&
                                    ((this.$btn_full = this.$gallery.find("[data-js-product-gallery-btn-fullscreen]")),
                                    this.$main.on({
                                        "fotorama:fullscreenenter": function () {
                                            e._zoomDestroy();
                                        },
                                        "fotorama:fullscreenexit": function () {
                                            e._checkSlick(), e._checkCollage(), e._zoomInit();
                                        },
                                    }),
                                    this.$btn_full.on("click", function () {
                                        e.fotorama.requestFullScreen();
                                    })),
                                this.options.btnZoom &&
                                    ((this.$btn_zoom_toggle = t("<div>").addClass("fotorama__btn-zoom").append(t("<i>").addClass("icon-zoom-in"))),
                                    this.$main.append(this.$btn_zoom_toggle),
                                    this.$btn_zoom_toggle.on("click", function () {
                                        e.zoom_state ? e.zoomToggle("off") : e.zoomToggle("on");
                                    })),
                                (this.$prev_slides = this.$preview.find("[data-js-product-gallery-preview-image]")),
                                this.$preview.on("init", function () {
                                    e.$preview.removeClass("invisible");
                                }),
                                this.$preview.one("init", function () {
                                    e.slick_is_init = !0;
                                }),
                                this.$preview.on("mousedown", ".slick-slide", function () {
                                    t(this).one({
                                        mouseup: function (a) {
                                            var n = t(this);
                                            e.switchImage(n);
                                        },
                                    });
                                }),
                                (this.$collage_slides = this.$collage.find("[data-js-product-gallery-preview-image]")),
                                this._checkCollage(),
                                this.$collage.on("click", "[data-js-product-gallery-preview-image]", function () {
                                    var a = t(this);
                                    e.switchImage(a);
                                }),
                                this.$gallery.on("click", "[data-js-product-gallery-btn-video]", function () {
                                    e.switchImage(null, t(this).attr("data-media-id")), "open" === t(this).attr("data-js-product-gallery-btn-video") && e.fotorama.requestFullScreen();
                                }),
                                this._slickInit(),
                                this._checkSlick(),
                                this.$gallery.addClass("product-page-gallery--loaded");
                        },
                        _slickInit: function () {
                            var e,
                                a,
                                n = window.innerWidth > this.options.bp_slick;
                            n !== this.slick_state &&
                                (this.$preview.hasClass("slick-initialized")
                                    ? this.$preview.slick("setPosition")
                                    : ("panorama" === this.preview_type ? (e = this.options.slick.panorama) : ((e = this.options.slick.preview), void 0 !== (a = this.$preview.attr("data-slides-to-show")) && (e.slidesToShow = +a)),
                                      this.$preview.slick(t.extend(e, { prevArrow: this.$gallery.find("[data-js-product-gallery-preview-btn-prev]"), nextArrow: this.$gallery.find("[data-js-product-gallery-preview-btn-next]") }))),
                                (this.slick_state = n));
                        },
                        _checkSlick: function (t) {
                            if (!this.$main.hasClass("fotorama--fullscreen") && this.$preview.hasClass("slick-initialized")) {
                                if (!t) {
                                    if (!this.fotorama) return;
                                    t = this.index_id_obj[this.fotorama.activeIndex];
                                }
                                var e = this.$prev_slides.filter('[data-js-product-gallery-image-id="' + t + '"]'),
                                    a = this.$prev_slides.index(e);
                                this.$prev_slides.removeClass("current"), e.addClass("current"), this.$preview.slick("slickGoTo", a);
                            }
                        },
                        _checkCollage: function (t) {
                            if (!this.$main.hasClass("fotorama--fullscreen") && this.$collage.length) {
                                if (!t) {
                                    if (!this.fotorama) return;
                                    t = this.index_id_obj[this.fotorama.activeIndex];
                                }
                                var e = this.$collage_slides.filter('[data-js-product-gallery-image-id="' + t + '"]');
                                this.$collage_slides.removeClass("current"), e.addClass("current");
                            }
                        },
                        _checkBtns: function (t) {
                            this.options.arrows && (1 === t.activeFrame.i ? this.$arrow_prev.addClass("disabled") : this.$arrow_prev.removeClass("disabled"));
                        },
                        _checkSwipe: function (t) {
                            var e = !0;
                            (t.activeFrame.video || (this.options.zoomEnable && theme.current.is_desktop)) && (e = !1), e !== this.swipe && t.setOptions({ swipe: e }), (this.swipe = e);
                        },
                        _zoomInit: function () {
                            var e = this;
                            if (
                                ((this.$main_act_img = this.$main.find(".fotorama__active").not("fotorama__stage__frame--video").find(".fotorama__img").not(".fotorama__img--full")),
                                0 !== this.$main_act_img.length || this.$main.hasClass("fotorama__stage__frame--video"))
                            ) {
                                if (this.fotorama && this.options.zoomEnable && this.$main_act_img.length && window.innerWidth > this.options.bp && this.zoom_activate && !this.$main.hasClass("fotorama--fullscreen")) {
                                    var a = this.zoom_src[this.fotorama.activeIndex];
                                    if (!a) return;
                                    this.$main_act_img.attr("data-zoom-image", a),
                                        this.$main_act_img.elevateZoom(this.options.zoom),
                                        (function a() {
                                            setTimeout(function () {
                                                (e.$zoomContainer = t("body > .zoomContainer")), e.$zoomContainer.length ? e.$zoomContainer.appendTo(e.$zoomWrapper) : a();
                                            }, 20);
                                        })(),
                                        this.$zoomWrapper.addClass("d-lg-block"),
                                        this.$main.addClass("fotorama--zoom"),
                                        (this.zoom_state = !0);
                                }
                            } else
                                clearTimeout(this.zoom_timeout),
                                    (this.zoom_timeout = setTimeout(function () {
                                        e._zoomInit();
                                    }, 20));
                        },
                        _zoomDestroy: function () {
                            clearTimeout(this.zoom_timeout),
                                this.options.zoomEnable &&
                                    this.zoom_state &&
                                    this.$main_act_img.length &&
                                    this.$zoomContainer &&
                                    (t.removeData(this.$main_act_img, "elevateZoom"),
                                    this.$main_act_img.removeAttr("data-zoom-image"),
                                    this.$zoomContainer.remove(),
                                    (this.$zoomContainer = null),
                                    this.$zoomWrapper.removeClass("d-lg-block"),
                                    this.$main.removeClass("fotorama--zoom"),
                                    (this.zoom_state = !1));
                        },
                        zoomToggle: function (t) {
                            if (this.$btn_zoom_toggle) {
                                var e = this.$btn_zoom_toggle.find("i");
                                e.removeAttr("class"), "on" === t ? (e.addClass("icon-zoom-in"), (this.zoom_activate = !0), this._zoomInit()) : "off" === t && (e.addClass("icon-zoom-out"), (this.zoom_activate = !1), this._zoomDestroy());
                            }
                        },
                        _setEffect: function (t, e) {
                            var a = this;
                            this.fotorama.setOptions({ transition: t }),
                                e(),
                                this.$main.one("fotorama:showend", function () {
                                    a.fotorama.setOptions({ transition: "slide" });
                                });
                        },
                        switchImage: function (t, e) {
                            if (!(t = t || this.$preview.find('[data-js-product-gallery-image-id="' + e + '"]')) || !t.hasClass("current")) {
                                var a = this;
                                (e = e || t.data("js-product-gallery-image-id")),
                                    this.fotorama
                                        ? (function t() {
                                              if (a.fotorama_is_init) {
                                                  for (var n = 0, i = 0; i < a.index_id_obj.length; i++) a.index_id_obj[i] == e && (n = i);
                                                  a._setEffect("crossfade", function () {
                                                      a.fotorama.show(n);
                                                  });
                                              } else
                                                  a.$main.one("fotorama:load", function () {
                                                      t();
                                                  }),
                                                      a.$preview.on("init", function () {
                                                          t();
                                                      });
                                          })()
                                        : "panorama" === this.preview_type && this._checkSlick(e);
                            }
                        },
                        switchImageById: function (t) {
                            var e = this.$prev_slides.add(this.$collage_slides).filter('[data-js-product-gallery-image-id="' + t + '"]');
                            this.switchImage(e, t);
                        },
                        update: function () {
                            this.$preview.hasClass("slick-initialized") && this.$preview.slick("setPosition");
                        },
                        _init: function () {},
                        _setOption: function (e, a) {
                            t.Widget.prototype._setOption.apply(this, arguments);
                        },
                        destroy: function () {
                            this._zoomDestroy(),
                                this.$preview.unbind("mousedown"),
                                this.$preview.slick("destroy"),
                                t(this.$gallery, this.$btn_full, this.$arrow_prev, this.$arrow_next, this.$btn_zoom_toggle).off().remove(),
                                this.fotorama.destroy(),
                                t(window).unbind("theme.changed.breakpoint.productgallery" + this.id),
                                t.Widget.prototype.destroy.call(this);
                        },
                    });
                },
                init: function (t) {
                    t.hasClass("product-page-gallery--loaded") || t.productGallery();
                },
                destroy: function (t) {
                    t.hasClass("product-page-gallery--loaded") && t.productGallery("destroy");
                },
            })),
                (theme.ProductGallery = new e());
        }),
        (theme.ProductPriceMatch = function () {
            function e() {
                this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    jQuery(".price-match-btn").on("click", function () {
                        t("body").addClass("overflow-hidden"), t(".price-match-popup-bg, .price-match-popup").removeClass("hide"), t(".template-product #MainContent").css("z-index", 4);
                    }),
                        t(".js-close-price, .price-match-popup-bg").on("click", function () {
                            t("body").removeClass("overflow-hidden"), t(".price-match-popup-bg, .price-match-popup").addClass("hide"), t(".template-product #MainContent").css("z-index", 1);
                        }),
                        t(".price-match-popup-btn").on("click", function () {
                            t(".price-match-step-1").addClass("hide"), t(".price-match-step-2").removeClass("hide");
                        });
                },
            })),
                (theme.ProductPriceMatch = new e());
        }),
        (theme.ProductPreorder = function () {
            function e() {
                this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    t(".show-popup-preorder-js").on("click", function (e) {
                        e.preventDefault(), t("html, body").addClass("no-scroll"), t(".preorder-policy-bg, .preorder-policy-popup").show(), t("#MainContent").css("z-index", 4);
                    }),
                        t(".close-preorder-policy-popup").on("click", function () {
                            t("html, body").removeClass("no-scroll"), t(".preorder-policy-bg, .preorder-policy-popup").hide(), t("#MainContent").css("z-index", 1);
                        });
                },
            })),
                (theme.ProductPreorder = new e());
        }),
        (theme.Cart = function () {
            function a() {
                (this.selectors = { button_add: ".js-product-button-add-to-cart", button_remove: ".js-product-button-remove-from-cart" }), this.load();
            }
            (a.prototype = t.extend({}, a.prototype, {
                load: function () {
                    var a = this;
                    function n(e, n, i) {
                        var o,
                            s,
                            r = !1,
                            d = e.attr("data-js-button-add-to-cart-clone-id");
                        void 0 !== d && (e = e.add(t('[data-js-button-add-to-cart-clone="' + d + '"]'))),
                            e.each(function () {
                                var e = t(this);
                                e.css({ "min-width": e.outerWidth() + "px" });
                            }),
                            a.updateValues(null, function (a) {
                                t.each(a.items, function () {
                                    if (+this.variant_id == +n)
                                        return (o = this), i > this.quantity && (e.removeAttr("data-button-status disabled style").removeClass("active"), theme.Popups.cartLimitIsExceeded(this.quantity), (r = !0)), !1;
                                }),
                                    !r &&
                                        o &&
                                        (theme.Popups.callByName("cart"),
                                        (s = e.attr("data-button-status")),
                                        e.removeAttr("disabled").attr("data-button-status", "added"),
                                        setTimeout(function () {
                                            s ? e.attr("data-button-status", s) : e.removeAttr("data-button-status"), e.removeAttr("style").removeClass("active");
                                        }, 2e3));
                            });
                    }
                    $body.on("click", this.selectors.button_add, function (a) {
                        var i = t(this),
                            o = i.attr("data-button-status"),
                            s = i.attr("data-product-quantity") / 2 >= 1 ? i.attr("data-product-quantity") / 2 : i.attr("data-product-quantity");
                        if ("select" === o) location.href = "/products/" + i.parents("[data-js-product]").attr("data-product-handle");
                        else if (!i.hasClass("active") && "added" !== o) {
                            i.addClass("active").attr("disabled", "disabled");
                            var r = i.parents("form"),
                                d = t.extend({}, r.serializeArray()),
                                c = {};
                            t.each(d, function () {
                                c[this.name] = this.value;
                            }),
                                Shopify.getCart(function (a) {
                                    var o = !1,
                                        r = +c.quantity || 1;
                                    if (
                                        (t.each(a.items, function () {
                                            if (+this.variant_id == +c.id && (!c.properties || JSON.stringify(this.properties) === JSON.stringify(c.properties))) {
                                                if (this.quantity + r > s) return (s *= 2), theme.Popups.cartLimitIsExceeded(s, "brack-validation"), i.html("LIMIT REACHED"), (o = !0), !1;
                                                if (((c.quantity = this.quantity + r), this.product_id in e)) {
                                                    let t = e[this.product_id];
                                                    if (c.quantity > t) return theme.Popups.cartLimitIsExceeded(this.quantity), i.html("LIMIT REACHED"), (o = !0), !1;
                                                }
                                                return (
                                                    Shopify.changeItemObj(c, function () {
                                                        n(i, c.id, c.quantity);
                                                    }),
                                                    (o = !0),
                                                    !1
                                                );
                                            }
                                        }),
                                        !o)
                                    ) {
                                        if (r > s) return theme.Popups.cartLimitIsExceeded(s), i.html("LIMIT REACHED"), (o = !0), !1;
                                        Shopify.addItemObj(
                                            c,
                                            function () {
                                                n(i, c.id, r);
                                            },
                                            function () {
                                                i.removeAttr("data-button-status disabled style").removeClass("active");
                                            },
                                            e
                                        ),
                                            i.removeClass("active").removeAttr("disabled", "disabled");
                                        var d = dataCountdown + Date.now();
                                        "undefined" != typeof Storage && localStorage.setItem("CountdownCartTimer", d);
                                    }
                                });
                        }
                        return a.preventDefault(), !1;
                    }),
                        $body.on("click", this.selectors.button_remove, function (e) {
                            var n = +t(this).parents("[data-js-product]").attr("data-product-variant-id");
                            return (
                                Shopify.removeItem(n, function (t) {
                                    a.updateValues(t), theme.Popups.getByName("cart").hasClass("d-none-important") || theme.PopupCart.update();
                                }),
                                e.preventDefault(),
                                !1
                            );
                        });
                    let i = t(".js-button-add-to-cart-has-quantity");
                    i.on("click", function () {
                        let a = t(this),
                            o = t('.product-page-info [action="/cart/add"]'),
                            s = t.extend({}, o.serializeArray()),
                            r = {};
                        var d = t(this).attr("data-product-quantity") / 2 >= 1 ? t(this).attr("data-product-quantity") / 2 : t(this).attr("data-product-quantity");
                        t.each(s, function () {
                            r[this.name] = this.value;
                        });
                        let c = t('.js-product-quantity input[type="number"]').val(),
                            l = { items: [{ id: r.variant_id, quantity: c }] };
                        Shopify.getCart(function (o) {
                            var s = !1,
                                u = r["product-id"],
                                p = r.quantity;
                            return u in e && p > e[u]
                                ? (theme.Popups.cartLimitPerCustomerIsExceeded(e[u]), !1)
                                : parseInt(c) > d
                                ? theme.Popups.cartLimitIsExceeded(d)
                                : void (t.each(o.items, function () {
                                      if (this.product_id == u) {
                                          var t = d - this.quantity != 0 ? d - this.quantity : d;
                                          parseInt(this.quantity) + parseInt(c) > d && (theme.Popups.cartLimitIsExceeded(t), a.html("LIMIT REACHED"), a.attr("disabled", "disabled"), (s = !0));
                                      }
                                      if (+this.variant_id == +r.id && (!r.properties || JSON.stringify(this.properties) === JSON.stringify(r.properties)) && this.product_id in e) {
                                          let n = e[this.product_id];
                                          parseInt(this.quantity) + parseInt(c) > n && (theme.Popups.cartLimitIsExceeded(this.quantity), a.html("LIMIT REACHED"), a.attr("disabled", "disabled"), (s = !0));
                                      }
                                  }),
                                  s ||
                                      fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify(l) })
                                          .then((t) => {
                                              if (422 != t.status) return t.json();
                                              {
                                                  let e = document.querySelector(".stock-countdown__counter").textContent;
                                                  theme.Popups.cartLimitIsExceeded(parseInt(e));
                                              }
                                          })
                                          .then((t) => {
                                              n(i, t.items[0].id, t.items[0].quantity);
                                          }));
                        });
                    }),
                        this._countdown();
                },
                updateValues: function (t, e) {
                    var a = this;
                    function n(t) {
                        a.updateHeaderCount(t), a.updateFreeShipping(t);
                    }
                    t
                        ? n(t)
                        : Shopify.getCart(function (t) {
                              n(t), e && "function" == typeof e && e(t);
                          });
                },
                updateHeaderCount: function (e) {
                    t("[data-js-cart-count-mobile]").attr("data-js-cart-count-mobile", e.item_count), t(".header__cart-total").html(Shopify.formatMoney(e.total_price, theme.moneyFormat));
                },
                updateFreeShipping: function (e) {
                    var a = t(".js-free-shipping"),
                        n = a.find("[data-js-progress]"),
                        i = a.find("[data-js-text]"),
                        o = +a.attr("data-value"),
                        s = +e.total_price,
                        r = Math.max(o - s, 0),
                        d = r > 0 ? theme.strings.cart.general.free_shipping_html.replace("{{ value }}", Shopify.formatMoney(r, theme.moneyFormat)) : theme.strings.cart.general.free_shipping_complete;
                    n.css({ width: Math.min(s / (o / 100), 100) + "%" }), i.html(d);
                },
                _countdown: function () {
                    if (t("body").hasClass("template-cart") && "undefined" != typeof Storage) {
                        if (0 == parseInt(t(".header__btn-cart .header__counter").text(), 10)) localStorage.removeItem("ReservationTime");
                        else {
                            let e = parseInt(localStorage.getItem("CountdownCartTimer"), 10);
                            e > Date.now()
                                ? (intervalCart = setInterval(function () {
                                      var a = e - Date.now(),
                                          n = Math.floor(a / 864e5),
                                          i = Math.floor((a % 864e5) / 36e5),
                                          o = Math.floor((a % 36e5) / 6e4),
                                          s = ("0" + Math.floor((a % 6e4) / 1e3)).slice(-2);
                                      n > 0 ? t(".cart-countdown.js").text(n + ":" + i + ":" + o + ":" + s) : i > 0 ? t(".cart-countdown.js").text(i + ":" + o + ":" + s) : t(".cart-countdown.js").text(o + ":" + s),
                                          a < 0 && (t(".cart-countdown.js").text("0:00"), clearInterval(intervalCart));
                                  }, 1e3))
                                : t(".cart-countdown.js").text("0:00");
                        }
                    }
                },
            })),
                (theme.Cart = new a());
        }),
        (theme.StoreLists = function () {
            function e(t, e) {
                (this.namespace = t),
                    (this.selectors = {
                        button: ".js-store-lists-add-" + t,
                        button_remove: ".js-store-lists-remove-" + t,
                        button_clear: ".js-store-lists-clear-" + t,
                        has_items: "[data-js-store-lists-has-items-" + t + "]",
                        dhas_items: "[data-js-store-lists-dhas-items-" + t + "]",
                    }),
                    theme.customer
                        ? ((this.current_storage = t + "-customer-" + theme.customer_id), (this.app_obj = { namespace: t, customerid: theme.customer_id, shop: theme.permanent_domain, domain: theme.host, iid: theme.lists_app.iid }))
                        : (this.current_storage = t + "-guest"),
                    this.load(e);
            }
            function a(t) {
                (this.namespace = t), this.load();
            }
            function n() {
                (this.namespaces = ["wishlist", "compare"]), this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function (e) {
                    var a = this;
                    if (theme.customer) {
                        var n,
                            i,
                            o,
                            s = localStorage.getItem(this.current_storage),
                            r = s ? JSON.parse(s) : [],
                            d = localStorage.getItem(this.namespace + "-guest"),
                            c = d ? JSON.parse(d) : [],
                            l = [],
                            u = function (e) {
                                var a = {},
                                    n = [],
                                    i = 0;
                                for (i = 0; i < e.length; i++)
                                    t.each(e[i], function (t, e) {
                                        a[t + ""] = e;
                                    });
                                return (
                                    t.each(a, function (t, e) {
                                        var a = {};
                                        (a[t] = e), n.push(a);
                                    }),
                                    n
                                );
                            },
                            p = function () {
                                a.getCustomerList(function (t) {
                                    200 === t.status &&
                                        ((n = u(r)),
                                        t.items && t.items.length && (l = u(t.items)),
                                        ((o = JSON.stringify((i = u(n.concat(l))))) === JSON.stringify(n) && o === JSON.stringify(l)) || (localStorage.setItem(a.current_storage, o), a.setCustomerList(o)),
                                        a.updateHeaderCount(),
                                        a.checkProductStatus(),
                                        localStorage.removeItem(a.namespace + "-guest"));
                                });
                            };
                        c.length
                            ? e({
                                  trigger: function (t) {
                                      t && (r = r.concat(c)), p();
                                  },
                                  info: { namespace: a.namespace, count: c.length },
                              })
                            : p();
                    } else this.checkProductStatus();
                    function h(e, n) {
                        var i = "[data-js-store-lists-product-" + a.namespace + "]",
                            o = theme.Popups.getByName(a.namespace);
                        n && (i += '[data-product-handle="' + n + '"]'),
                            t(i).each(function () {
                                var e = t(this);
                                t(e.parent('[class*="col"]').length ? e.parent() : e).remove();
                            }),
                            e && e.length && e.remove(),
                            o.hasClass("d-none-important") || theme.StoreLists.popups[a.namespace].update(o);
                    }
                    $body.on("click", this.selectors.button, function (e) {
                        var n = t(this);
                        n.attr("disabled", "disabled");
                        var i = n.parents("[data-js-product]"),
                            o = i.attr("data-product-handle"),
                            s = +i.attr("data-product-variant-id");
                        return (
                            "added" === n.attr("data-button-status")
                                ? a.removeItem(s, o, function (t) {
                                      n.removeAttr("data-button-status"), n.removeAttr("disabled");
                                  })
                                : a.addItem(s, o, function (t) {
                                      n.attr("data-button-status", "added"), n.removeAttr("disabled");
                                  }),
                            e.preventDefault(),
                            !1
                        );
                    }),
                        $body.on("click", this.selectors.button_remove, function () {
                            var e = t(this).parents("[data-js-product]"),
                                n = e.attr("data-product-handle"),
                                i = +e.attr("data-product-variant-id");
                            a.removeItem(i, n, function () {
                                h(e, n);
                            });
                        }),
                        $body.on("click", this.selectors.button_clear, function () {
                            a.clear(function () {
                                h();
                            });
                        });
                },
                setCustomerList: function (e, a) {
                    theme.customer &&
                        t.ajax({
                            type: "POST",
                            url: "https://" + theme.lists_app.url + "/api/massadd",
                            data: t.extend({}, this.app_obj, { purge: "yes", items: e }),
                            cache: !1,
                            success: function (t) {
                                a && a(t);
                            },
                        });
                },
                getCustomerList: function (e) {
                    theme.customer &&
                        t.ajax({
                            type: "POST",
                            url: "https://" + theme.lists_app.url + "/api/getlist",
                            data: this.app_obj,
                            cache: !1,
                            success: function (t) {
                                e && e(t);
                            },
                        });
                },
                addCustomerItem: function (e, a, n) {
                    theme.customer &&
                        t.ajax({
                            type: "POST",
                            url: "https://" + theme.lists_app.url + "/api/add",
                            data: t.extend({}, this.app_obj, { key: e, value: a }),
                            cache: !1,
                            success: function (t) {
                                n && n(t);
                            },
                        });
                },
                removeCustomerItem: function (e, a) {
                    theme.customer &&
                        t.ajax({
                            type: "POST",
                            url: "https://" + theme.lists_app.url + "/api/delete",
                            data: t.extend({}, this.app_obj, { key: e, _method: "DELETE" }),
                            cache: !1,
                            success: function (t) {
                                a && a(t);
                            },
                        });
                },
                clearCustomerItem: function (e) {
                    theme.customer &&
                        t.ajax({
                            type: "POST",
                            url: "https://" + theme.lists_app.url + "/api/massdelete",
                            data: t.extend({}, this.app_obj, { _method: "DELETE" }),
                            cache: !1,
                            success: function (t) {
                                e && e(t);
                            },
                        });
                },
                addItem: function (t, e, a) {
                    var n = localStorage.getItem(this.current_storage),
                        i = n ? JSON.parse(n) : [],
                        o = {};
                    (o[t] = e), i.push(o), localStorage.setItem(this.current_storage, JSON.stringify(i)), this.checkProductStatus(), this.updateHeaderCount(), this.addCustomerItem(t, e), a && a();
                },
                removeItem: function (e, a, n) {
                    var i = localStorage.getItem(this.current_storage),
                        o = i ? JSON.parse(i) : [];
                    t.each(o, function (t) {
                        return e && this[e] && this[e] === a ? (o.splice(t, 1), !1) : e || this[Object.keys(this)[0]] !== a ? void 0 : (o.splice(t, 1), !1);
                    }),
                        localStorage.setItem(this.current_storage, JSON.stringify(o)),
                        this.checkProductStatus(),
                        t(this.selectors.has_items)[o.length > 0 ? "removeClass" : "addClass"]("d-none-important"),
                        t(this.selectors.dhas_items)[o.length > 0 ? "addClass" : "removeClass"]("d-none-important"),
                        this.updateHeaderCount(),
                        this.removeCustomerItem(e),
                        n && n();
                },
                clear: function (e) {
                    localStorage.removeItem(this.current_storage),
                        this.checkProductStatus(),
                        t(this.selectors.has_items).addClass("d-none-important"),
                        t(this.selectors.dhas_items).removeClass("d-none-important"),
                        this.updateHeaderCount(),
                        this.clearCustomerItem(),
                        e && e();
                },
                checkProductStatus: function (e) {
                    e = e || t("[data-js-product]");
                    var a = localStorage.getItem(this.current_storage),
                        n = a ? JSON.parse(a) : [],
                        i = t();
                    t.each(n, function () {
                        t.each(this, function (t, a) {
                            var n = e.filter('[data-product-handle="' + a + '"][data-product-variant-id="' + t + '"]');
                            n.length && (i = i.add(n));
                        });
                    }),
                        e.not(i).find(this.selectors.button).removeAttr("data-button-status"),
                        i.find(this.selectors.button).attr("data-button-status", "added");
                },
                updateHeaderCount: function (e) {
                    var a = localStorage.getItem(this.current_storage),
                        n = a ? JSON.parse(a).length : 0;
                    t("[data-js-" + this.namespace + "-count]")
                        .attr("data-js-" + this.namespace + "-count", n)
                        .html(n),
                        e && e();
                },
            })),
                (a.prototype = t.extend({}, a.prototype, {
                    load: function () {
                        var t = this;
                        theme.Popups.addHandler(this.namespace, "call.visible", function (e) {
                            t.update(e, function () {
                                e.trigger("contentloaded");
                            });
                        }),
                            theme.Popups.addHandler(this.namespace + "-full", "call.visible", function (e) {
                                t.updateFull(e, function () {
                                    e.trigger("contentloaded");
                                });
                            });
                    },
                    _resultToHTML: function (e, a, n) {
                        for (var i = t(t("#template-" + this.namespace + "-ajax")[0].content), o = t(document.createDocumentFragment()), s = 0; s < a.params.length; s++)
                            t.each(a.params[s], function (e, n) {
                                var s = null,
                                    r = null;
                                if (
                                    (t.each(a.products, function () {
                                        this.handle === n && (s = this);
                                    }),
                                    s)
                                ) {
                                    t.each(s.variants, function () {
                                        if (+this.id == +e) return (r = this), !1;
                                    }),
                                        r || (r = s.variants[0]);
                                    var d = r.featured_image ? r.featured_image.src : s.featured_image,
                                        c = i.clone(),
                                        l = c.find(".product-store-lists"),
                                        u = c.find(".product-store-lists__image img"),
                                        p = c.find(".product-store-lists__title a"),
                                        h = c.find(".product-store-lists__variant"),
                                        m = c.find(".product-store-lists__price .price"),
                                        f = c.find("a").not(".product-store-lists__remove");
                                    l.attr("data-product-variant-id", e),
                                        l.attr("data-product-handle", n),
                                        f.attr("href", "/products/" + n + "?variant=" + e),
                                        p.html(s.title),
                                        u.attr("srcset", Shopify.resizeImage(d, "120x") + " 1x, " + Shopify.resizeImage(d, "240x") + " 2x"),
                                        "Default Title" !== r.title && h.html(r.title).removeClass("d-none-important"),
                                        theme.ProductCurrency.setPrice(m, r.price, r.compare_at_price),
                                        c.find("input[type=hidden][name=id]").val(e),
                                        r.available ? c.find(".js-item-unavailable").remove() : c.find(".js-item-available").remove(),
                                        o.append(c);
                                }
                            });
                        e.html(""), e.append(o), n && n();
                    },
                    _getProducts: function (e, a) {
                        var n = this,
                            i = [],
                            o = 1,
                            s = [],
                            r = 0;
                        for (this.xhr && this.xhr.abort(); r < e.length; r++)
                            t.each(e[r], function () {
                                i.push(this);
                            });
                        (r = 0),
                            (o = Math.max(1, Math.ceil(i.length / 20))),
                            (function r(d) {
                                var c = i.slice(20 * d, 20 * (d + 1));
                                n.xhr = t.ajax({
                                    type: "GET",
                                    url: "/collections/all",
                                    cache: !1,
                                    data: { view: "products_by_handle", constraint: c.join("+") },
                                    dataType: "html",
                                    success: function (n) {
                                        t.each(JSON.parse(n), function () {
                                            s.push(this);
                                        }),
                                            ++d < o ? r(d) : a({ params: e, products: s });
                                    },
                                });
                            })(r);
                    },
                    update: function (t, e) {
                        var a = this,
                            n = localStorage.getItem(theme.StoreLists.lists[this.namespace].current_storage),
                            i = n ? JSON.parse(n) : [],
                            o = t.find(".popup-" + this.namespace + "__content"),
                            s = t.find(".popup-" + this.namespace + "__empty"),
                            r = t.find(".popup-" + this.namespace + "__items");
                        (t.find("[data-js-popup-" + this.namespace + "-count]").html(theme.strings.general.popups[this.namespace].count.replace("{{ count }}", i.length)),
                        o[i.length > 0 ? "removeClass" : "addClass"]("d-none-important"),
                        s[i.length > 0 ? "addClass" : "removeClass"]("d-none-important"),
                        i.length > 0)
                            ? this._getProducts(i, function (t) {
                                  a._resultToHTML(r, t, e), theme.ProductCurrency.update();
                              })
                            : (r.html(""), e && e());
                    },
                    updateFull: function (e, a) {
                        var n = e.find(".popup-" + this.namespace + "-full__content");
                        n.html("");
                        var i = {
                            type: "GET",
                            data: { view: this.namespace },
                            cache: !1,
                            success: function (t) {
                                n.html(t), theme.ImagesLazyLoad.update(), theme.ProductCurrency.update(), a && a();
                            },
                        };
                        if (theme.customer) t.extend(i, { url: "/cart" });
                        else {
                            for (var o = localStorage.getItem(theme.StoreLists.lists[this.namespace].current_storage), s = o ? JSON.parse(o) : [], r = [], d = 0; d < s.length; d++)
                                t.each(s[d], function (t, e) {
                                    r.push(e + "=" + t);
                                });
                            r.join("+"), t.extend(!0, i, { url: "/collections/all", data: { constraint: r } });
                        }
                        t.ajax(i);
                    },
                })),
                (n.prototype = t.extend({}, n.prototype, {
                    lists: {},
                    popups: {},
                    load: function () {
                        for (var t = [], n = 0; n < this.namespaces.length; n++)
                            (this.lists[this.namespaces[n]] = new e(this.namespaces[n], function (e) {
                                t.push(e);
                            })),
                                (this.popups[this.namespaces[n]] = new a(this.namespaces[n]));
                        if (t.length) for (n = 0; n < t.length; n++) t[n].trigger(!0);
                    },
                    checkProductStatus: function () {
                        t.each(this.lists, function () {
                            this.checkProductStatus();
                        });
                    },
                    updateHeaderCount: function () {
                        t.each(this.lists, function () {
                            this.updateHeaderCount();
                        });
                    },
                })),
                (theme.StoreLists = new n());
        }),
        (theme.MenuBuilder = function (e, a) {
            function n(t, e) {
                (this.settings = { popup_name: "navigation", button_navigation: "data-js-popup-navigation-button" }), (this.selectors = { popup_navigation: ".js-popup-navigation" }), (this.params = {}), this.init(t, e);
            }
            return (
                (n.prototype = t.extend({}, n.prototype, {
                    is_vertical: !1,
                    is_open_animate: !1,
                    mobile_level: 0,
                    duration: function () {
                        return window.theme.animations.menu.duration > 0.1 ? 1e3 * (window.theme.animations.menu.duration - 0.1) : 0;
                    },
                    init: function (e, a) {
                        var n = this,
                            i = e.find(".menu__panel"),
                            o = i.find(".menu__megamenu"),
                            s = i.find(".menu__dropdown"),
                            r = t(this.selectors.popup_navigation),
                            d = r.find("[" + this.settings.button_navigation + "]"),
                            c = e.find(".menu__curtain");
                        if (
                            ((this.$menu = e),
                            (this.$panel = i),
                            (this.$megamenus = o),
                            (this.$dropdowns = s),
                            (this.$curtain = c),
                            (this.is_vertical = e.hasClass("menu--vertical")),
                            (this.is_vertical_fixed = e[0].hasAttribute("data-js-menu-vertical-fixed")),
                            this.is_vertical)
                        ) {
                            var l = t(".js-menu-vertical-btn-toggle"),
                                u = t(".vertical-menu-spacer"),
                                p = i.find("> .menu__item"),
                                h = e.find("[data-js-menu-vertical-see-all]"),
                                m = parseInt(i.css("padding-top")) + parseInt(i.css("padding-bottom"));
                            (this.$menu_vertical_btn = l),
                                (this.$menu_vertical_spacer = u),
                                (this.$btn_see_all = h),
                                (this.$megamenus_width = t("[data-js-megamenu-width]")),
                                (this.handlerMenu = theme.Global.responsiveHandler({
                                    namespace: a.namespace,
                                    element: l,
                                    on_desktop: !0,
                                    events: {
                                        click: function (a) {
                                            var n = t(this);
                                            n.hasClass("menu-vertical-btn--fixed") || (n.toggleClass("menu-vertical-btn--open"), e[n.hasClass("menu-vertical-btn--open") ? "addClass" : "removeClass"]("menu--open"));
                                        },
                                    },
                                })),
                                (this.handlerMenu = theme.Global.responsiveHandler({
                                    namespace: a.namespace,
                                    element: $body,
                                    delegate: "[data-js-menu-vertical-see-all]",
                                    on_desktop: !0,
                                    events: {
                                        click: function (t) {
                                            e.toggleClass("menu--items-visible");
                                        },
                                    },
                                })),
                                (this.closeVerticalMenu = function () {
                                    l.removeClass("menu-vertical-btn--open"), e.removeClass("menu--open");
                                }),
                                this.is_vertical_fixed
                                    ? ((this.openVerticalMenu = function () {
                                          l.addClass("menu-vertical-btn--open"), e.addClass("menu--open");
                                      }),
                                      (this.fixVerticalMenu = function () {
                                          l.addClass("menu-vertical-btn--fixed"), e.addClass("menu--fixed");
                                      }),
                                      (this.unfixVerticalMenu = function () {
                                          l.removeClass("menu-vertical-btn--fixed"), e.removeClass("menu--fixed");
                                      }),
                                      u.length
                                          ? ((this.checkHeightVerticalMenu = function () {
                                                var a,
                                                    n = u[0].getBoundingClientRect().bottom - e[0].getBoundingClientRect().top,
                                                    o = h.innerHeight(),
                                                    s = 0,
                                                    r = 0,
                                                    d = !1;
                                                i.innerHeight(Math.max(n, o + m)),
                                                    (a = n - m),
                                                    p.each(function () {
                                                        s += t(this).innerHeight();
                                                    }),
                                                    p.each(function () {
                                                        var e = t(this);
                                                        (r += e.innerHeight()), s < a || r < a - o ? e.attr("data-js-menu-vertical-item", null) : (e.attr("data-js-menu-vertical-item", "hidden"), (d = !0));
                                                    }),
                                                    h[d ? "addClass" : "removeClass"]("menu__see-all--visible");
                                            }),
                                            (this.handlerMenu = theme.Global.responsiveHandler({
                                                namespace: a.namespace,
                                                element: $window,
                                                on_desktop: !0,
                                                onbindtrigger: "verticalmenu.checkheight",
                                                events: {
                                                    "load.verticalmenu scroll.verticalmenu theme.resize.verticalmenu verticalmenu.checkheight": function (t) {
                                                        e.removeClass("menu--items-visible"),
                                                            l[0].getBoundingClientRect().bottom + m + p.first().innerHeight() + h.innerHeight() > u[0].getBoundingClientRect().bottom
                                                                ? (i.css({ height: "" }), n.closeVerticalMenu(), n.unfixVerticalMenu())
                                                                : (n.openVerticalMenu(), n.fixVerticalMenu(), n.checkHeightVerticalMenu());
                                                    },
                                                },
                                            })))
                                          : (this.handlerMenu = theme.Global.responsiveHandler({
                                                namespace: a.namespace,
                                                element: $window,
                                                on_desktop: !0,
                                                events: {
                                                    "load.verticalmenu scroll.verticalmenu theme.resize.verticalmenu verticalmenu.checkheight": function (t) {
                                                        e.removeClass("menu--items-visible"), e.parents(".header__content--sticky").length ? (n.closeVerticalMenu(), n.unfixVerticalMenu()) : (n.openVerticalMenu(), n.fixVerticalMenu());
                                                    },
                                                },
                                            })))
                                    : (this.handlerMenu = theme.Global.responsiveHandler({
                                          namespace: a.namespace,
                                          element: $window,
                                          on_desktop: !0,
                                          events: {
                                              "load.verticalmenu scroll.verticalmenu theme.resize.verticalmenu verticalmenu.checkheight": function (t) {
                                                  e.removeClass("menu--items-visible"), n.closeVerticalMenu();
                                              },
                                          },
                                      }));
                        }
                        function f(t) {
                            e[t.height() > e.height() ? "addClass" : "removeClass"]("menu--scroll-visible"),
                                e.unbind("scroll"),
                                e.one("scroll", function () {
                                    e.removeClass("menu--scroll-visible");
                                });
                        }
                        function v(t) {
                            var e;
                            i.css({ "min-height": "" }), (e = t.innerHeight()), i.css({ "min-height": Math.ceil(e) });
                        }
                        return (
                            i.find("[data-js-menu-preview-image]").length &&
                                (this.handlerMenu = theme.Global.responsiveHandler({
                                    namespace: a.namespace,
                                    element: i,
                                    delegate: ".menu__item > a",
                                    on_desktop: !0,
                                    events: {
                                        mouseenter: function () {
                                            var e,
                                                a,
                                                n,
                                                i = t(this),
                                                o = i.find("[data-js-menu-preview-image]");
                                            o.length &&
                                                ((e = o.children().first()),
                                                (a = t(".header__content--sticky")).length || (a = t(".header")),
                                                (n = $window.innerHeight() - e[0].getBoundingClientRect().bottom) < 0 &&
                                                    ((n *= -1), a.length && (n = Math.min(n + 20, i[0].getBoundingClientRect().bottom - a[0].getBoundingClientRect().bottom - 20)), e.css({ "margin-top": -1 * n })));
                                        },
                                        mouseleave: function () {
                                            var e,
                                                a = t(this).find("[data-js-menu-preview-image]");
                                            a.length &&
                                                ((e = a.children().first()),
                                                a.one("transitionend", function () {
                                                    e.removeAttr("style");
                                                }),
                                                "0s" === a.css("transition-duration") && a.trigger("transitionend"));
                                        },
                                    },
                                })),
                            (this.handlerMenu = theme.Global.responsiveHandler({
                                namespace: a.namespace,
                                element: e,
                                delegate: "a",
                                on_mobile: !0,
                                events: {
                                    click: function (a) {
                                        var o,
                                            s = t(this).parent(),
                                            r = s.find(".menu__list").first();
                                        if ((i.unbind("transitionend"), r.length))
                                            return (
                                                (o = s.parents(".menu__level-03").length ? 4 : s.parents(".menu__level-02").length ? 3 : 2),
                                                e.scrollTop(0),
                                                s.addClass("open"),
                                                r.addClass("show"),
                                                i.attr("data-mobile-level", o),
                                                v(r),
                                                f(r),
                                                d.attr(n.settings.button_navigation, "back"),
                                                (n.mobile_level = o),
                                                a.preventDefault(),
                                                !1
                                            );
                                    },
                                },
                            })),
                            (this.handlerBack = theme.Global.responsiveHandler({
                                namespace: a.namespace,
                                element: r,
                                delegate: "[" + this.settings.button_navigation + '="back"]',
                                on_mobile: !0,
                                events: {
                                    click: function () {
                                        var t = i.attr("data-mobile-level") - 1,
                                            a = t > 1 ? "back" : "close",
                                            o = e.find(".menu__item.open").last(),
                                            s = o.find(".menu__list").first();
                                        e.scrollTop(0),
                                            (n.mobile_level = t),
                                            n.is_vertical && theme.Menu ? theme.Menu.mobile_level > 1 && (a = "back") : !n.is_vertical && theme.VerticalMenu && theme.VerticalMenu.mobile_level > 1 && (a = "back"),
                                            o.removeClass("open"),
                                            i.one("transitionend", function () {
                                                s.removeClass("show");
                                            }),
                                            i.attr("data-mobile-level", t),
                                            v(o.parents(".menu__list").first()),
                                            f(s.parents(".menu__list").first()),
                                            d.attr(n.settings.button_navigation, a),
                                            "0s" === i.css("transition-duration") && i.trigger("transitionend");
                                    },
                                },
                            })),
                            theme.Popups.addHandler(this.settings.popup_name, "close.before.closeMobileMenu", function () {
                                theme.current.is_mobile && (n.closeMobileMenu(), d.attr(n.settings.button_navigation, "close"));
                            }),
                            (this.handlerDropdown = theme.Global.responsiveHandler({
                                namespace: a.namespace,
                                element: i,
                                delegate: "> .menu__item",
                                on_desktop: !0,
                                events: {
                                    "mouseenter mouseleave": function (e) {
                                        theme.SearchAjax && theme.SearchAjax.closeAll(), n._toggleMegamenu(t(this), e);
                                    },
                                },
                            })),
                            $window.on("theme.changed.breakpoint" + a.namespace, function () {
                                theme.current.is_desktop && (n.closeMobileMenu(!0), d.attr(n.settings.button_navigation, "close"));
                            }),
                            e.addClass("menu--loaded"),
                            {
                                destroy: function () {
                                    theme.Popups.removeHandler(n.settings.popup_name, "close.before.closeMobileMenu"), n.handlerMenu.unbind(), n.handlerBack.unbind(), n.handlerDropdown.unbind();
                                },
                            }
                        );
                    },
                    _toggleMegamenu: function (a, n) {
                        var i,
                            o = this,
                            s = a.find(".menu__megamenu"),
                            r = a.find(".menu__dropdown"),
                            d = a.find(".menu__holder");
                        if ("mouseenter" === n.type) {
                            if (s.length) {
                                (this.is_open_animate = !0),
                                    d.removeClass("d-none").css({ height: this.$panel[0].getBoundingClientRect().bottom - a[0].getBoundingClientRect().bottom + "px" }),
                                    s.velocity("stop", !0),
                                    this.$dropdowns.velocity("finish"),
                                    this.is_vertical &&
                                        ((i = (i = s.attr("data-js-width-limit")) ? +i : 1 / 0),
                                        s.add(this.$curtain).css({ width: Math.ceil(Math.min(i, this.$megamenus_width.innerWidth())) + 1 }),
                                        this.$megamenus.filter(".show").length || this.$curtain.add(s).css({ height: Math.ceil(e.innerHeight()) })),
                                    this.$megamenus.not(s).removeClass("show animate visible").removeAttr("style"),
                                    this.$dropdowns.removeClass("show animate visible").removeAttr("style"),
                                    s.addClass("show overflow-hidden"),
                                    theme.current.height,
                                    s[0].getBoundingClientRect().top;
                                var c = s.children().innerHeight();
                                this.is_vertical && (c = Math.max(e.innerHeight(), c)),
                                    this.$curtain.velocity(
                                        { height: c, tween: [c, this.$curtain.height()] },
                                        {
                                            duration: this.duration(),
                                            begin: function () {
                                                o.$curtain.addClass("show"), s.addClass("animate visible");
                                            },
                                            progress: function (t, e, a, n, i) {
                                                i < 400 && i > 100 && (i = 485), s.height(i), o.$curtain.height(i);
                                            },
                                            complete: function () {
                                                s.removeClass("overflow-hidden").css({ "max-height": "" }), (o.is_open_animate = !1);
                                            },
                                        }
                                    );
                            } else if (r.length) {
                                if (t(n.target).parents(".menu__dropdown").length) return;
                                r.addClass("show"),
                                    r.velocity("stop", !0),
                                    this.$megamenus.velocity("finish"),
                                    this.$dropdowns.not(r).removeClass("show animate visible").removeAttr("style"),
                                    this.$megamenus.removeClass("show animate visible").removeAttr("style"),
                                    r.velocity("slideDown", {
                                        duration: this.duration(),
                                        begin: function () {
                                            setTimeout(function () {
                                                r.addClass("animate visible");
                                            }, 0);
                                        },
                                        complete: function () {
                                            r.removeAttr("style");
                                        },
                                    });
                            }
                        } else
                            "mouseleave" === n.type &&
                                (s.length && s.hasClass("show")
                                    ? (this.$curtain.velocity("stop"),
                                      d.addClass("d-none").removeAttr("style"),
                                      s.velocity(
                                          { height: 0, tween: [0, s.height()] },
                                          {
                                              duration: this.duration(),
                                              begin: function () {
                                                  s.addClass("overflow-hidden").removeClass("visible");
                                              },
                                              progress: function (t, e, a, n, i) {
                                                  o.$curtain.height(i);
                                              },
                                              complete: function () {
                                                  s.removeClass("show animate overflow-hidden").removeAttr("style"), o.is_open_animate || o.$curtain.removeClass("show").removeAttr("style");
                                              },
                                          }
                                      ))
                                    : r.length &&
                                      r.velocity("slideUp", {
                                          duration: this.duration(),
                                          begin: function () {
                                              r.removeClass("visible");
                                          },
                                          complete: function () {
                                              r.removeClass("show animate").removeAttr("style");
                                          },
                                      }));
                    },
                    closeMobileMenu: function (t) {
                        if (theme.current.is_mobile || t) {
                            var e = this.$menu.find(".menu__panel");
                            e.find(".menu__item").removeClass("open"),
                                e.one("transitionend", function () {
                                    e.find(".menu__list").removeClass("show");
                                }),
                                e.attr("data-mobile-level", "1"),
                                "0s" === e.css("transition-duration") && e.trigger("transitionend"),
                                this.$menu.scrollTop(0),
                                (this.mobile_level = 0);
                        }
                    },
                })),
                new n(e, a)
            );
        }),
        (theme.Accordion = function () {
            function e() {
                (this.settings = {
                    elements: "data-js-accordion",
                    button: "data-js-accordion-button",
                    duration: function () {
                        return 1e3 * theme.animations.accordion.duration;
                    },
                }),
                    (this.selectors = { elements: "[" + this.settings.elements + "]", button: "[" + this.settings.button + "]", content: "[data-js-accordion-content]", input: "[data-js-accordion-input]" }),
                    this.load();
            }
            (e.prototype = t.extend({}, e.prototype, {
                load: function () {
                    var e = this;
                    function a(a) {
                        var n = t(this),
                            i = n.find(e.selectors.input),
                            o = !1;
                        if (!(i.length && ("INPUT" === a.target.tagName || (t.contains(n.find("label")[0], a.target) && !i.prop("checked") && n.hasClass("open"))))) {
                            var s = n.parents(e.selectors.elements).first(),
                                r = s.find(e.selectors.content);
                            "all" !== n.attr("data-js-accordion-select") && (r = r.first()),
                                r.is(":animated") ||
                                    (n.toggleClass("open"),
                                    r.parents(".sticky-sidebar").length && (o = !0),
                                    n.hasClass("open")
                                        ? r
                                              .hide()
                                              .removeClass("d-none")
                                              .slideDown({
                                                  duration: e.settings.duration(),
                                                  start: function () {
                                                      o && theme.StickySidebar && theme.StickySidebar.update("listener-enable");
                                                  },
                                                  progress: function () {
                                                      o && theme.StickySidebar && theme.StickySidebar.update("listener-process");
                                                  },
                                                  complete: function () {
                                                      r.removeAttr("style"), o && theme.StickySidebar && theme.StickySidebar.update("listener-disable");
                                                  },
                                              })
                                        : r.slideUp({
                                              duration: e.settings.duration(),
                                              start: function () {
                                                  o && theme.StickySidebar && theme.StickySidebar.update("listener-enable");
                                              },
                                              progress: function () {
                                                  o && theme.StickySidebar && theme.StickySidebar.update("listener-process");
                                              },
                                              complete: function () {
                                                  r.addClass("d-none").removeAttr("style"), o && theme.StickySidebar && theme.StickySidebar.update("listener-disable");
                                              },
                                          }),
                                    s
                                        .find(e.selectors.button)
                                        .not(n)
                                        .not(s.find(e.selectors.content).find(e.selectors.button))
                                        .add(s.find("[" + e.settings.button + '="inner"]'))
                                        [n.hasClass("open") ? "addClass" : "removeClass"]("open"));
                        }
                    }
                    $body.on("click", "[" + this.settings.elements + '="all"] ' + this.selectors.button, a),
                        theme.Global.responsiveHandler({ namespace: ".accordion", element: $body, delegate: "[" + this.settings.elements + '="only-mobile"] ' + this.selectors.button, on_mobile: !0, events: { click: a } });
                },
            })),
                (theme.Accordion = new e());
        }),
        (window.Section = {}),
        (Section.prototype = t.extend({}, Section.prototype, {
            _registerHansler: function () {
                this.elemsHasHandler || (this.elemsHasHandler = []);
                for (var t = 0; t < arguments.length; t++) this.elemsHasHandler.push(arguments[t]);
            },
            _offHanslers: function () {
                if (this.elemsHasHandler && t.isArray(this.elemsHasHandler)) {
                    for (var e = 0; e < this.elemsHasHandler.length; e++) t(this.elemsHasHandler[e]).off();
                    delete this.elemsHasHandler;
                }
            },
        })),
        t(function () {
            theme.ProductCurrency(),
                theme.Position(),
                theme.Dropdown(),
                theme.Select(),
                theme.Loader(),
                theme.ButtonsBlocksVisibility(),
                theme.Trigger(),
                theme.Popups(),
                theme.PopupAccount(),
                theme.PopupSearch(),
                theme.PopupCart(),
                theme.PopupQuickView(),
                theme.ProductQuantity(),
                theme.ProductCountdown(),
                theme.ProductTextCountdown(),
                theme.ProductVisitors(),
                theme.ProductImagesNavigation(),
                theme.ProductImagesHover(),
                theme.ProductOptions(),
                theme.ProductReview(),
                theme.ProductPriceMatch(),
                theme.ProductPreorder(),
                theme.Cart(),
                theme.StoreLists(),
                theme.Accordion(),
                (theme.sections = new slate.Sections()),
                -1 === window.location.hash.indexOf(".") &&
                    (slate.a11y.pageLinkFocus(t(window.location.hash + "")),
                    t(".in-page-link").on("click", function (e) {
                        slate.a11y.pageLinkFocus(t(e.currentTarget.hash + ""));
                    })),
                slate.rte.wrapIframe({ $iframes: t('.rte iframe[src*="youtube.com/embed"]:not(.not-responsive),.rte iframe[src*="player.vimeo"]:not(.not-responsive)'), iframeWrapperClass: "rte__video-wrapper" }),
                slate.cart.cookiesEnabled() && (document.documentElement.className = document.documentElement.className.replace("supports-no-cookies", "supports-cookies"));
        });
})(jQueryTheme);
