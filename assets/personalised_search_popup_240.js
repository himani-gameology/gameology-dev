/* Chriate – Mas Item #240 - Search Popup (11/09/23) - START */
jQuery(document).ready(function () {
  const visitedProducts =
    JSON.parse(localStorage.getItem("visited_products")) || [];

  const observer240 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (document.body.classList.contains("test_240")) {
          test_240();
          personalisedCarousel().then(() => {
            jQuery(".search-popup__visited-products").css("opacity", 1);

            if (visitedProducts.length) {
              jQuery(".search-popup__logged-in").show();
            }
          });

          observer240.disconnect();
        }
      }
    });
  });

  observer240.observe(document.body, {
    attributes: true,
  });

  if (document.body.classList.contains("test_240")) {
    test_240();
    personalisedCarousel();
    observer240.disconnect();
  }

  if (visitedProducts.length) {
    jQuery(".search-popup__default").removeClass("active");
    jQuery(".search-popup__logged-in").addClass("active");
  }

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  if (params.has("q")) {
    const qValue = params.get("q");
    let recentQueries =
      JSON.parse(localStorage.getItem("recent_queries")) || [];
    const isDuplicate = recentQueries.some((query) => query.q === qValue);

    if (!isDuplicate) {
      recentQueries.push({ q: qValue });
      localStorage.setItem("recent_queries", JSON.stringify(recentQueries));
    }
  }
});

function test_240() {
  const recentQueries =
    JSON.parse(localStorage.getItem("recent_queries")) || [];
  const recentQueriesContainer = document.querySelector(
    ".search-popup-240 .search-popup__searched-terms",
  );

  if (recentQueriesContainer) {
    recentQueries.forEach((query) => {
      const termDiv = document.createElement("div");
      termDiv.classList.add("search-popup__searched-term");

      const link = document.createElement("a");
      link.href = `/search?q=${query.q}`;
      link.textContent = query.q;

      termDiv.appendChild(link);
      recentQueriesContainer.appendChild(termDiv);
    });

    if (recentQueries.length) {
      recentQueriesContainer.classList.add("show");
    }
  }

  jQuery(".search-popup__close").on("click", function () {
    jQuery(".search-popup").removeClass("show");

    jQuery(".search-form__form input").val("");
  });

  if (window.innerWidth >= 1025) {
    // jQuery("main").on("click", function (event) {
    //   jQuery(".search-popup").removeClass("show");
    // });

    jQuery('.header__search-form input[type="search"]').on(
      "focus",
      function () {
        jQuery(".search-popup-240").addClass("show");
      },
    );

    // jQuery('.header__search-form input[type="search"]').on('keyup', function() {
    //   if(jQuery(this).val().length) {
    //     jQuery('.search-popup').removeClass('show');
    //   }
    // })
  } else {
    const headerHeight = jQuery("#shopify-section-header").outerHeight() + 30;
    // jQuery("main").on("click", function (event) {
    //   jQuery(".search-popup").removeClass("show");
    // });
    //
    jQuery(
      'div[data-js-mobile-sticky] .search-form-header input[type="search"].pr-40',
    ).on("focus", function () {
      jQuery(".search-popup-240").addClass("show");

      //set focus on .search-popup-240 input
      jQuery(".search-popup-240 input[type=search]").focus();
    });

    // jQuery('div[data-js-mobile-sticky] .search-form-header input[type="search"].pr-40').on('blur', function() {
    //   jQuery('.search-popup').removeClass('show');
    // });

    // jQuery(
    //   'div[data-js-mobile-sticky] .search-form-header input[type="search"].pr-40',
    // ).on("keyup", function () {
    //   if (jQuery(this).val().length) {
    //     jQuery(".search-popup").removeClass("show");
    //   }
    // });

    // jQuery(window).scroll(function () {
    //   if (jQuery(window).scrollTop() > headerHeight) {
    //     jQuery(".search-popup").addClass("fixed");
    //   } else {
    //     jQuery(".search-popup").removeClass("fixed");
    //   }
    // });
  }
}

async function personalisedCarousel() {
  return new Promise((resolve, reject) => {
    const visitedProducts =
      JSON.parse(localStorage.getItem("visited_products")) || [];

    if (visitedProducts.length > 6) {
      visitedProducts.splice(0, visitedProducts.length - 6);
    }

    if (visitedProducts.length) {
      visitedProducts.forEach(function (productArr, index) {
        const { url, featuredImage, title } = productArr;
        const path = url.replace("https://www.gameology.com.au/", "");

        jQuery.getJSON(
          window.Shopify.routes.root + path,
          function ({ product }) {
            console.log(product);
            let isPreorder = product.tags.includes("preorder");
            let wishlisted = false;

            // Assuming ALL products have 1 variant...
            const variant = product.variants[0];
            const stock = parseInt(variant.inventory_quantity);
            const comparePrice = parseFloat(variant.compare_at_price); // use to calculate the discountPercent and priceSaved
            const price = parseFloat(variant.price); // use to calculate the discountPercent and priceSaved
            const publishDate = product.published_at; // use to determine if it should show the "New" label
            const points = parseInt(price);
            let discountPercent = 0;
            let priceSaved = 0;

            // items.forEach(function(item) {
            //     // console.log(Object.keys(item));
            //     if (Object.keys(item).includes(variant.id.toString())) {
            //         wishlisted = true;
            //         return;
            //     }
            // });

            // console.log(wishlisted);
            // console.log(product)

            if (comparePrice > price) {
              discountPercent = Math.round(
                ((comparePrice - price) / comparePrice) * 100,
              );
              priceSaved = comparePrice - price;
              priceSaved = parseFloat(priceSaved.toFixed(2));
            }

            const productHTML = `
          <div class="search-popup__visited-product col-auto" data-carousel-product-preload data-handle="${path}">
            <div class="product-collection d-flex">
              <div class="product-collection__image product-image product-image--hover-fade position-relative js-product-images-navigation js-product-images-hovered-end js-product-images-hover">
                <a href="${url}" class="d-block cursor-default" data-js-product-image="" tabindex="0">
                  <img class="product-image__image" src="${featuredImage}" alt="${title}" data-js-product-image-image="">
                </a>
                <div class="product-image__overlay-top position-absolute d-flex flex-wrap top-0 left-0 w-100 px-10 pt-10">
                  <a href="${url}" class="absolute-stretch cursor-default" tabindex="0"></a>
                  <div class="product-image__overlay-top-left product-collection__labels position-relative d-flex flex-column align-items-start mb-10">
                    ${
                      publishDate >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        ? `<div class="label label--new mb-3 mr-3 text-nowrap d-none-important" data-js-product-label-new="">New</div>`
                        : ""
                    }
                    ${
                      discountPercent
                        ? `<div class="label label--sale mb-3 mr-3 text-nowrap" data-js-product-label-sale="">SAVE ${discountPercent}%</div>`
                        : ""
                    }
                    ${
                      stock === 0
                        ? `<div class="label label--out-stock mb-3 mr-3 text-nowrap" data-js-product-label-out-stock="">Out of Stock</div>`
                        : ""
                    }
                  </div>
                </div>
              </div>
              <div class="product-collection__content d-flex flex-column align-items-start mt-15">
                      <a href="${url}" class="product-title-block">
                        <div class="product-collection__title">
                          <h4 class="m-0">
                              ${title}
                          </h4>
                          ${
                            product.product_type && product.vendor
                              ? `<p>${product.product_type} by ${product.vendor}</p>`
                              : ""
                          }
                        </div>
                        <div class="product-collection__details d-none mb-8"><div class="product-collection__sku mb-5">
                          <p class="m-0" data-js-product-sku="">SKU: <span>${
                            variant.sku
                          }</span></p>
                        </div>
                        <div class="product-collection__availability mb-5">
                          <p class="m-0" data-js-product-availability="" data-availability="false">AVAILABILITY: <span>In stock (3 items)</span></p>
                        </div>
                        <div class="product-collection__type mb-5">
                          <p class="m-0" data-js-product-type="">PRODUCT TYPE: <span>Wargames</span></p>
                        </div>
                        <div class="product-collection__vendor mb-5">
                          <p class="m-0" data-js-product-vendor="">VENDOR: <span>Games Workshop</span></p>
                        </div>
                      </a>
                      <div class="product-collection__description d-none mb-15">
                        <p class="m-0">The depraved Drukhari are masterful marauders, despatching raiding parties to hunt down prisoners for the fighting pits, slaves to serve in their Dark City, or simply victims whose pain will satisfy their terrible soul-hunger. The Wych Cults of Commorragh often...</p>
                      </div>
                      <div class="product-collection-bottom">
                        <div class="price-and-wishlist">
                          ${
                            priceSaved === 0
                              ? `<span class="price single--price" data-js-product-price="" style="margin-top: 10px;"><span>$${price}</span></span>`
                              : `
                          <div class="product-collection__price">
                            <span class="price price--sale" data-js-product-price="">
                              <span>$${price}</span>
                              <span class="ml-10 price-compare_at_price hide-test_188">
                                <p>$${comparePrice}</p>
                                <span class="price-save_price">
                                  <p>You save </p>
                                  <p>$${priceSaved}</p>
                                </span>
                              </span>

                              <span class="ml-10 price-compare_at_price show-test_188">
                                <p style="margin-left: 5px !important; font-size: 14px !important;">$${comparePrice}</p>
                              </span>
                            </span>
                            <span class="show-test_188" style="align-items: center;">
                              <img class="mr-5" src="https://cdn.shopify.com/s/files/1/0921/7330/files/noun-savings-1033169.svg?v=1669263711" style="width:20px;">
                              <span class="mr-5" style="color: #141414;font-size:12px;">You save</span>
                              <span style="color:green;font-size:12px;">$${priceSaved}</span>
                            </span>
                          </div>
                          `
                          }

                          <div class="show-test_50">
                            <!-- test_188 -->
                            <div class="product-collection__button-add-to-wishlist hide-test_188">
                              <a href="/account" class="btn btn--text btn--status px-lg-6 js-store-lists-add-wishlist ${
                                wishlisted ? ` added-to-wishlist` : ""
                              }" data-key="${variant.id}" data-handle="${
                                product.handle
                              }" data-js-tooltip="" ${
                                wishlisted ? `data-button-status="added"` : ""
                              } data-tippy-content="Wishlist" data-tippy-placement="top" data-tippy-distance="-3" tabindex="0">
                                <i class="mb-1 ml-1"><!--?xml version="1.0" encoding="utf-8"?-->
                                  <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                                  <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-180" viewBox="0 0 24 24">
                                  <path d="M21.486,6.599c-0.286-0.696-0.703-1.318-1.25-1.865c-0.56-0.56-1.191-0.979-1.895-1.26s-1.423-0.42-2.158-0.42
                                      s-1.458,0.14-2.168,0.42s-1.345,0.7-1.904,1.26c-0.026,0.039-0.056,0.075-0.088,0.107s-0.068,0.068-0.107,0.107
                                      c-0.039-0.039-0.075-0.075-0.107-0.107s-0.062-0.068-0.088-0.107c-0.56-0.56-1.194-0.979-1.904-1.26s-1.433-0.42-2.168-0.42
                                      s-1.455,0.14-2.158,0.42s-1.335,0.7-1.895,1.26C3.049,5.28,2.632,5.902,2.346,6.599s-0.43,1.429-0.43,2.197s0.144,1.501,0.43,2.197
                                      s0.703,1.318,1.25,1.865l7.871,7.871c0.003,0.003,0.007,0.004,0.011,0.006l0.439,0.436l0.439-0.437
                                      c0.003-0.002,0.007-0.003,0.01-0.006l7.871-7.871c0.547-0.547,0.964-1.169,1.25-1.865s0.43-1.429,0.43-2.197
                                      S21.772,7.295,21.486,6.599z M20.324,10.515c-0.228,0.547-0.55,1.028-0.967,1.445l-7.441,7.441L4.475,11.96
                                      c-0.417-0.417-0.739-0.898-0.967-1.445s-0.342-1.12-0.342-1.719S3.28,7.624,3.508,7.077s0.55-1.035,0.967-1.465
                                      c0.442-0.43,0.94-0.755,1.494-0.977s1.116-0.332,1.689-0.332s1.136,0.11,1.689,0.332s1.045,0.547,1.475,0.977
                                      c0.104,0.104,0.205,0.215,0.303,0.332s0.186,0.241,0.264,0.371c0.117,0.169,0.293,0.254,0.527,0.254s0.41-0.085,0.527-0.254
                                      c0.078-0.13,0.166-0.254,0.264-0.371s0.198-0.228,0.303-0.332c0.43-0.43,0.921-0.755,1.475-0.977s1.116-0.332,1.689-0.332
                                      s1.136,0.11,1.689,0.332s1.052,0.547,1.494,0.977c0.417,0.43,0.739,0.918,0.967,1.465s0.342,1.12,0.342,1.719
                                      S20.552,9.968,20.324,10.515z"></path>
                                  </svg>
                                  </i>
                                      <i class="mb-1 ml-1" data-button-content="added"><!--?xml version="1.0" encoding="utf-8"?-->
                                  <!-- Generator: Apersonalised-carouseldobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

                                  <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-181" viewBox="0 0 24 24">
                                  <path d="M21.861,6.568c-0.286-0.696-0.703-1.318-1.25-1.865c-0.56-0.56-1.191-0.979-1.895-1.26s-1.423-0.42-2.158-0.42
                                      s-1.458,0.14-2.168,0.42s-1.345,0.7-1.904,1.26c-0.026,0.039-0.056,0.075-0.088,0.107s-0.068,0.068-0.107,0.107
                                      c-0.039-0.039-0.075-0.075-0.107-0.107s-0.062-0.068-0.088-0.107c-0.56-0.56-1.194-0.979-1.904-1.26s-1.433-0.42-2.168-0.42
                                      s-1.455,0.14-2.158,0.42s-1.335,0.7-1.895,1.26C3.424,5.25,3.007,5.872,2.721,6.568s-0.43,1.429-0.43,2.197s0.144,1.501,0.43,2.197
                                      s0.703,1.318,1.25,1.865l7.871,7.871c0.003,0.003,0.007,0.004,0.011,0.006l0.439,0.436l0.439-0.437
                                      c0.003-0.002,0.007-0.003,0.01-0.006l7.871-7.871c0.547-0.547,0.964-1.169,1.25-1.865s0.43-1.429,0.43-2.197
                                      S22.147,7.265,21.861,6.568z"></path>
                                  </svg>
                                </i>
                              </a>
                            </div>
                            <!-- test_188 -->
                          </div>
                        </div>
                        <!-- test_188 -->
                        <div class="product-collection-review show-test_188">

              <div style="" class="jdgm-widget jdgm-preview-badge" data-id="7120966287475" data-template="manual-installation" data-auto-install="false">
                <div style="display:none" class="jdgm-prev-badge" data-average-rating="0.00" data-number-of-reviews="0" data-number-of-questions="0"> <span class="jdgm-prev-badge__stars" data-score="0.00" tabindex="0" aria-label="0.00 stars" role="button"> <span class="jdgm-star jdgm--off"></span><span class="jdgm-star jdgm--off"></span><span class="jdgm-star jdgm--off"></span><span class="jdgm-star jdgm--off"></span><span class="jdgm-star jdgm--off"></span> </span> <span class="jdgm-prev-badge__text"> No reviews </span> </div>
              </div>





                          </div>
                          <!-- test_188 -->
                        </div>
                      <!-- Zeta Digital - Product Grid Aligment (04/11/2020) -->
                      </div>
              </div>
            </div>
          </div>`;

            if (jQuery(".search-popup__visited-products .wrap").length) {
              jQuery(".search-popup__visited-products .wrap").append(
                productHTML,
              );
            }
          },
        );

        if (index === visitedProducts.length - 1) {
          resolve(); // Resolve the promise when loop ends
        }
      });
    } else {
      jQuery(".search-popup__logged-in").hide();
      jQuery(".search-popup__visited-products").css("opacity", 0);
    }
  });
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
/* Chriate – Mas Item #240 - Search Popup (11/09/23) - END */
