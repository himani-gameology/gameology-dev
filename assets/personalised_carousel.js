jQuery(window).on('load',function() {

  /* Chriate – Mas Item #200 - Homepage personalisation (03/04/23) - START */

 // function addToWishlist(key,handle) {
 //     const wishlistId = theme.lists_app.iid;
 //     const customerId = theme.customer_id;
 //     const shopPermDomain = theme.permanent_domain;
 //     const shopDomain = theme.domain;
 //     const namespace = 'wishlist';

 //     try {
 //         const response = jQuery.ajax({
 //           type: "POST",
 //           url: "https://" + theme.lists_app.url + "/api/add",
 //           data: {
 //             iid: wishlistId,
 //             customerid: customerId,
 //             shop: shopPermDomain,
 //             domain: shopDomain,
 //             namespace: namespace,
 //             key: key,
 //             value: handle,
 //           },
 //           success: async function(res) {
 //             // console.log(res);
 //             // const { items } = await getWishlist();
 //             // console.log(items);
 //           },
 //           error: function(err) {
 //             console.error(err);
 //           }
 //         });

 //     } catch (error) {
 //         console.error(error);
 //     }
 // }


 // function removeToWishlist(key) {
 //     const wishlistId = theme.lists_app.iid;
 //     const customerId = theme.customer_id;
 //     const shopPermDomain = theme.permanent_domain;
 //     const shopDomain = theme.domain;
 //     const namespace = 'wishlist';

 //     try {
 //         const response = jQuery.ajax({
 //           type: "POST",
 //           url: "https://" + theme.lists_app.url + "/api/delete",
 //           data: {
 //             _method: 'DELETE',
 //             iid: wishlistId,
 //             customerid: customerId,
 //             shop: shopPermDomain,
 //             domain: shopDomain,
 //             namespace: namespace,
 //             key: key,
 //           },
 //           success: async function(res) {
 //             // console.log(res);
 //             // const { items } = await getWishlist();
 //             // console.log(items);
 //           },
 //           error: function(err) {
 //             console.error(err);
 //           }
 //         });

 //     } catch (error) {
 //         console.error(error);
 //     }
 // }



   // async function getWishlist() {
   //   const wishlistId = theme.lists_app.iid;
   //   const customerId = theme.customer_id;
   //   const shopPermDomain = theme.permanent_domain;
   //   const shopDomain = theme.domain;
   //   const namespace = 'wishlist';

   //   try {
   //     const response = await jQuery.ajax({
   //       type: "POST",
   //       url: "https://" + theme.lists_app.url + "/api/getlist",
   //       data: {
   //         iid: wishlistId,
   //         customerid: customerId,
   //         shop: shopPermDomain,
   //         domain: shopDomain,
   //         namespace: namespace
   //       },
   //       cache: !1,
   //     });

   //     return response;

   //   } catch (error) {
   //     console.log(error);
   //   }
   // }


   async function personalisedCarousel() {
      return new Promise((resolve, reject) => {
      const visitedProducts = JSON.parse(localStorage.getItem('visited_products')) || [];
      // const { items } = await getWishlist();
      // console.log(items);

      if(visitedProducts.length) {

        visitedProducts.forEach(function(productArr, index) {
          const { url, featuredImage, title } = productArr;
          const path = url.replace('https://www.gameology.com.au/', '');

          jQuery.getJSON(window.Shopify.routes.root + path, function({ product }) {
            let isPreorder = product.tags.includes('preorder');
            let wishlisted = false;

            // Assuming ALL products have 1 variant...
            const variant = product.variants[0];
            const stock = parseInt(variant.inventory_quantity);
            const comparePrice = parseFloat(variant.compare_at_price);  // use to calculate the discountPercent and priceSaved
            const price = parseFloat(variant.price);  // use to calculate the discountPercent and priceSaved
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
              discountPercent = Math.round(((comparePrice - price) / comparePrice) * 100);
              priceSaved = comparePrice - price;
              priceSaved = parseFloat(priceSaved.toFixed(2));
            }

            const productHTML = `
            <div class="carousel__item col-auto" data-carousel-product-preload data-handle="${path}">
              <div class="product-collection d-flex flex-column mb-30 mb-lg-30">
                <div class="product-collection__image product-image product-image--hover-fade position-relative w-100 js-product-images-navigation js-product-images-hovered-end js-product-images-hover">
                  <a href="${url}" class="d-block cursor-default" data-js-product-image="" tabindex="0">
                    <img class="product-image__image" src="${featuredImage}" alt="${title}" data-js-product-image-image="">
                  </a>
                  <div class="product-image__overlay-top position-absolute d-flex flex-wrap top-0 left-0 w-100 px-10 pt-10">
                    <a href="${url}" class="absolute-stretch cursor-default" tabindex="0"></a>
                    <div class="product-image__overlay-top-left product-collection__labels position-relative d-flex flex-column align-items-start mb-10">
                      ${publishDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? `<div class="label label--new mb-3 mr-3 text-nowrap d-none-important" data-js-product-label-new="">New</div>` : ''}
                      ${discountPercent ? `<div class="label label--sale mb-3 mr-3 text-nowrap" data-js-product-label-sale="">SAVE ${discountPercent}%</div>` : ''}
                      ${stock === 0 ? `<div class="label label--out-stock mb-3 mr-3 text-nowrap" data-js-product-label-out-stock="">Out of Stock</div>` : ''}
                    </div>
                  </div>
                </div>
                <div class="product-collection__content d-flex flex-column align-items-start mt-15">
                        <div class="product-title-block">
                          <div class="product-collection__title">
                            <h4 class="m-0">
                                <a href="${url}" tabindex="0">${title}</a>
                            </h4>
                          </div>
                          <div class="product-collection__details d-none mb-8"><div class="product-collection__sku mb-5">
                            <p class="m-0" data-js-product-sku="">SKU: <span>${variant.sku}</span></p>
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
                        </div>
                        <div class="product-collection__description d-none mb-15">
                          <p class="m-0">The depraved Drukhari are masterful marauders, despatching raiding parties to hunt down prisoners for the fighting pits, slaves to serve in their Dark City, or simply victims whose pain will satisfy their terrible soul-hunger. The Wych Cults of Commorragh often...</p>
                        </div>
                        <div class="product-collection-bottom">
                          <div class="price-and-wishlist">
                            ${priceSaved === 0 ? `<span class="price single--price" data-js-product-price="" style="margin-top: 10px;"><span>$${price}</span></span>` :
                            `
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
                            `}

                            <div class="show-test_50">
                              <!-- test_188 -->
                              <div class="product-collection__button-add-to-wishlist hide-test_188">
                                <a href="/account" class="btn btn--text btn--status px-lg-6 js-store-lists-add-wishlist ${wishlisted ? ` added-to-wishlist` : ''}" data-key="${variant.id}" data-handle="${product.handle}" data-js-tooltip="" ${wishlisted ? `data-button-status="added"` : ''} data-tippy-content="Wishlist" data-tippy-placement="top" data-tippy-distance="-3" tabindex="0">
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

                        <form method="post" action="/cart/add" accept-charset="UTF-8" class="d-flex flex-column w-100 m-0" enctype="multipart/form-data" data-js-product-form=""><input type="hidden" name="form_type" value="product" tabindex="0"><input type="hidden" name="utf8" value="✓" tabindex="0">
                <div class="product-collection__variants mb-10 d-none">
                                    <select name="id" class="d-none m-0" data-js-product-variants="" tabindex="0"><option selected="selected" value="${variant.id}">Default variant</option></select>
                                </div><div class="row product-grid-reward-point">
                              <span>EARN ${points} REWARD POINTS</span>
                            </div>
                            
                            
                            
                                    <div class="col-sm-12 col-lg-12 p-0">

                                    <div class="product-collection__button-add-to-cart mb-10 w-100">
                                            <!-- Zeta Digital - Apply In Stock Label, Preorder Button Text and Style Start (+ Line 11,16) -->
                <!-- Zeta Digital - Apply In Stock Label, Preorder Button Text and Style End (+ Line 11,16) -->


                ${!isPreorder ? `<a href="${path}" class="btn btn--status btn--animated js-product-button-add-to-cart w-100 p-0${stock === 0 ? ` js-product-button-soldout` : ``}" name="add" data-js-product-button-add-to-cart="" ${stock === 0 ? `disabled="disabled" data-button-status="sold-out"` : ``} tabindex="0"><span class="d-flex flex-center"><i class="hide-test_188 btn__icon mr-5 mb-4"><!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

                <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-109" viewBox="0 0 24 24">
                <g>
                    <path d="M19.884,21.897c-0.124,0.124-0.271,0.186-0.439,0.186h-15c-0.169,0-0.315-0.062-0.439-0.186
                        c-0.124-0.124-0.186-0.271-0.186-0.439v-15c0-0.169,0.062-0.315,0.186-0.439c0.124-0.124,0.271-0.186,0.439-0.186h3.75
                        c0-1.028,0.368-1.911,1.104-2.646c0.735-0.735,1.618-1.104,2.646-1.104s1.911,0.368,2.646,1.104
                        c0.735,0.736,1.104,1.618,1.104,2.646h3.75c0.169,0,0.315,0.062,0.439,0.186c0.124,0.124,0.186,0.271,0.186,0.439v15
                        C20.069,21.627,20.008,21.773,19.884,21.897z M18.819,7.083h-3.125v2.5c0,0.169-0.062,0.316-0.186,0.439
                        c-0.124,0.124-0.271,0.186-0.439,0.186s-0.315-0.062-0.439-0.186c-0.124-0.124-0.186-0.27-0.186-0.439v-2.5h-5v2.5
                        c0,0.169-0.062,0.316-0.186,0.439c-0.124,0.124-0.271,0.186-0.439,0.186s-0.315-0.062-0.439-0.186
                        c-0.124-0.124-0.186-0.27-0.186-0.439v-2.5H5.069v13.75h13.75V7.083z M10.177,4.065C9.688,4.554,9.444,5.143,9.444,5.833h5
                        c0-0.69-0.244-1.279-0.732-1.768s-1.077-0.732-1.768-0.732S10.665,3.577,10.177,4.065z"></path>
                </g>
                </svg>
                </i><span class="btn__text">Add To Cart</span></span>
                        <span class="d-flex flex-center" data-button-content="added"><i class="mr-5 mb-4"><!--?xml version="1.0" encoding="utf-8"?-->
                <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

                <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-110" viewBox="0 0 24 24">
                <g>
                    <path d="M19.855,5.998c-0.124-0.124-0.271-0.186-0.439-0.186h-3.75c0-1.028-0.368-1.911-1.104-2.646
                        c-0.735-0.735-1.618-1.104-2.646-1.104S10.005,2.431,9.27,3.166C8.534,3.902,8.166,4.784,8.166,5.813h-3.75
                        c-0.169,0-0.315,0.062-0.439,0.186C3.853,6.122,3.791,6.269,3.791,6.438v15c0,0.169,0.062,0.315,0.186,0.439
                        C4.101,22,4.247,22.063,4.416,22.063h15c0.169,0,0.315-0.062,0.439-0.186c0.124-0.124,0.186-0.271,0.186-0.439v-15
                        C20.041,6.269,19.979,6.122,19.855,5.998z M10.148,4.045c0.488-0.488,1.077-0.732,1.768-0.732s1.279,0.244,1.768,0.732
                        s0.732,1.078,0.732,1.768h-5C9.416,5.123,9.66,4.533,10.148,4.045z M17.074,11.239l-6.25,6.25
                        c-0.065,0.052-0.137,0.095-0.215,0.127c-0.078,0.033-0.156,0.049-0.234,0.049s-0.156-0.016-0.234-0.049
                        c-0.078-0.032-0.149-0.075-0.215-0.127l-2.5-2.5c-0.117-0.13-0.176-0.28-0.176-0.449c0-0.169,0.059-0.319,0.176-0.449
                        c0.13-0.117,0.28-0.176,0.449-0.176s0.319,0.059,0.449,0.176l2.051,2.07l5.801-5.82c0.13-0.117,0.28-0.176,0.449-0.176
                        s0.319,0.059,0.449,0.176c0.117,0.13,0.176,0.28,0.176,0.449C17.25,10.959,17.191,11.109,17.074,11.239z"></path>
                </g>
                </svg>
                </i>Added</span><span class="d-flex flex-center" data-button-content="sold-out">Sold Out</span>
                </a>`: `<a href="${path}" class="btn btn--status btn--animated js-product-button-add-to-cart js-product-button-preorder w-100 p-0" name="add" data-js-product-button-add-to-cart="" tabindex="0"><span class="d-flex flex-center"><i class="hide-test_188 btn__icon mr-5 mb-4"><!--?xml version="1.0" encoding="utf-8"?-->
    <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-109" viewBox="0 0 24 24">
    <g>
      <path d="M19.884,21.897c-0.124,0.124-0.271,0.186-0.439,0.186h-15c-0.169,0-0.315-0.062-0.439-0.186
        c-0.124-0.124-0.186-0.271-0.186-0.439v-15c0-0.169,0.062-0.315,0.186-0.439c0.124-0.124,0.271-0.186,0.439-0.186h3.75
        c0-1.028,0.368-1.911,1.104-2.646c0.735-0.735,1.618-1.104,2.646-1.104s1.911,0.368,2.646,1.104
        c0.735,0.736,1.104,1.618,1.104,2.646h3.75c0.169,0,0.315,0.062,0.439,0.186c0.124,0.124,0.186,0.271,0.186,0.439v15
        C20.069,21.627,20.008,21.773,19.884,21.897z M18.819,7.083h-3.125v2.5c0,0.169-0.062,0.316-0.186,0.439
        c-0.124,0.124-0.271,0.186-0.439,0.186s-0.315-0.062-0.439-0.186c-0.124-0.124-0.186-0.27-0.186-0.439v-2.5h-5v2.5
        c0,0.169-0.062,0.316-0.186,0.439c-0.124,0.124-0.271,0.186-0.439,0.186s-0.315-0.062-0.439-0.186
        c-0.124-0.124-0.186-0.27-0.186-0.439v-2.5H5.069v13.75h13.75V7.083z M10.177,4.065C9.688,4.554,9.444,5.143,9.444,5.833h5
        c0-0.69-0.244-1.279-0.732-1.768s-1.077-0.732-1.768-0.732S10.665,3.577,10.177,4.065z"></path>
    </g>
    </svg>
    </i><span class="btn__text">PRE-ORDER</span></span>
            <span class="d-flex flex-center" data-button-content="added"><i class="mr-5 mb-4"><!--?xml version="1.0" encoding="utf-8"?-->
    <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-theme-110" viewBox="0 0 24 24">
    <g>
      <path d="M19.855,5.998c-0.124-0.124-0.271-0.186-0.439-0.186h-3.75c0-1.028-0.368-1.911-1.104-2.646
        c-0.735-0.735-1.618-1.104-2.646-1.104S10.005,2.431,9.27,3.166C8.534,3.902,8.166,4.784,8.166,5.813h-3.75
        c-0.169,0-0.315,0.062-0.439,0.186C3.853,6.122,3.791,6.269,3.791,6.438v15c0,0.169,0.062,0.315,0.186,0.439
        C4.101,22,4.247,22.063,4.416,22.063h15c0.169,0,0.315-0.062,0.439-0.186c0.124-0.124,0.186-0.271,0.186-0.439v-15
        C20.041,6.269,19.979,6.122,19.855,5.998z M10.148,4.045c0.488-0.488,1.077-0.732,1.768-0.732s1.279,0.244,1.768,0.732
        s0.732,1.078,0.732,1.768h-5C9.416,5.123,9.66,4.533,10.148,4.045z M17.074,11.239l-6.25,6.25
        c-0.065,0.052-0.137,0.095-0.215,0.127c-0.078,0.033-0.156,0.049-0.234,0.049s-0.156-0.016-0.234-0.049
        c-0.078-0.032-0.149-0.075-0.215-0.127l-2.5-2.5c-0.117-0.13-0.176-0.28-0.176-0.449c0-0.169,0.059-0.319,0.176-0.449
        c0.13-0.117,0.28-0.176,0.449-0.176s0.319,0.059,0.449,0.176l2.051,2.07l5.801-5.82c0.13-0.117,0.28-0.176,0.449-0.176
        s0.319,0.059,0.449,0.176c0.117,0.13,0.176,0.28,0.176,0.449C17.25,10.959,17.191,11.109,17.074,11.239z"></path>
    </g>
    </svg>
    </i>Added</span><span class="d-flex flex-center" data-button-content="sold-out">PRE ORDER LIMIT REACHED</span>
    </a>`}

                                        </div></div><!-- test_188 -->

<div class="product-collection__buttons d-flex flex-column flex-lg-row align-items-lg-center flex-wrap">

   <div class="col-sm-12 col-lg-2 p-0 hide-test_188">
                     <div class="product-collection__buttons-section d-flex"><div class="product-collection__button-add-to-wishlist mb-10">
                                                    <a href="/account" class="btn btn--text btn--status px-lg-6 js-store-lists-add-wishlist${wishlisted ? ` added-to-wishlist` : ''}"  data-key="${variant.id}" data-handle="${product.handle}" ${wishlisted ? `data-button-status="added"` : ''} data-js-tooltip="" data-tippy-content="Wishlist" data-tippy-placement="top" data-tippy-distance="-3" tabindex="0">
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
                <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

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
                    </div></div>
                    
                                    <!-- test_188 -->
                                    <div class="col-sm-12 col-lg-2 p-0 align-items-center show-test_188">
                                      <div class="product-collection__buttons-section d-flex">
                                        <div class="product-collection__button-add-to-wishlist mb-10" style="margin-left: -5px;">
                                          <a href="/account" class="btn btn--text btn--status px-lg-6 js-store-lists-add-wishlist${wishlisted ? ` added-to-wishlist` : ''}"  data-key="${variant.id}" data-handle="${product.handle}" ${wishlisted ? `data-button-status="added"` : ''} data-js-tooltip="" data-tippy-content="Wishlist" data-tippy-placement="top" data-tippy-distance="-3" tabindex="0">
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
                <!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

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
                                      </div>
                                    </div>
                                    <!-- test_188 -->


            
                    
                    <!-- test_188 --></div></form>
                </div>
              </div>
            </div>`;

            if(jQuery('.personalised-carousel .carousel__slick').length) {
              jQuery('.personalised-carousel .carousel__slick').append(productHTML);
            }
          } );

          if (index === visitedProducts.length - 1) {
            resolve(); // Resolve the promise when loop ends
          }
        })
      } else {
        jQuery('.personalised-carousel').addClass('chr-hidden');
        jQuery('.personalised-carousel').css('opacity', 0);
      }

    });
   }

   // const observer200 = new MutationObserver(function(mutations) {
   //   mutations.forEach(function(mutation) {
   //     if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
   //       if (mutation.target.classList.contains('test_200')) {
   //         personalisedCarousel();
   //         observer200.disconnect();
   //       }
   //     }
   //   });
   // })

   // observer200.observe(document.body, {
   //   attributes: true
   // });

   // if(jQuery('body').hasClass('test_200')) {
   //   // const visitedProducts = JSON.parse(localStorage.getItem('visited_products')) || [];
   //   // console.log(visitedProducts);
   //   personalisedCarousel();
   //   observer200.disconnect();
   // }

   personalisedCarousel().then(() => {
    carouselInit();
   });

   function carouselInit() {
    setTimeout(function() {
      jQuery('.personalised-carousel .carousel__slick').slick('unslick');
      jQuery('.personalised-carousel').removeClass('chr-hidden');
      jQuery('.personalised-carousel .carousel__slick').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,
        dots: false,
        prevArrow: jQuery('.personalised-carousel .carousel__prev'),
        nextArrow: jQuery('.personalised-carousel .carousel__next'),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 778,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });

      setTimeout(function() {
        jQuery('.personalised-carousel').css('opacity', 1);
        jQuery(window).resize();
        let internval;
        let limit = 10;
        let reinited = false;

        internval = setInterval(() => {
          jQuery('.personalised-carousel .carousel__slick').slick('setPosition');


          // For slow internet users.
          if(jQuery('.personalised-carousel .carousel__slick .slick-slide').length === 0 && !reinited) {
            reinited = true;
            jQuery('.personalised-carousel .carousel__slick').slick('unslick');

            jQuery('.personalised-carousel .carousel__slick').css('opacity', 0);
            
            setTimeout(function() {
              jQuery('.personalised-carousel .carousel__slick').slick({
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true,
                dots: false,
                prevArrow: jQuery('.personalised-carousel .carousel__prev'),
                nextArrow: jQuery('.personalised-carousel .carousel__next'),
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    }
                  },
                  {
                    breakpoint: 778,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  }
                ]
              });

              setTimeout(function() {
                jQuery('.personalised-carousel .carousel__slick').css('opacity', 1);
              },2000)
            },3000)
          }

          if(limit <= 0) {
            clearInterval(internval);
          } else {
            limit--;
          }
        },300)
      },3000)

      jQuery('.personalised-carousel .js-store-lists-add-wishlist').click(function() {
        const key = jQuery(this).data('key');
        const handle = jQuery(this).data('handle');

        if(!jQuery(this).hasClass('added-to-wishlist')) {
          addToWishlist(key, handle);
          jQuery(this).addClass('added-to-wishlist');
        } else {
          removeToWishlist(key);
          jQuery(this).removeClass('added-to-wishlist');
        }
      })
    },2500)
   }

   /* Chriate – Mas Item #200 - Homepage personalisation (03/04/23) - END */

 });