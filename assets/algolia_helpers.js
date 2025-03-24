/* See https://www.algolia.com/doc/integration/shopify/advanced-customization/customizing-instant-search/#hogan */

(function(algolia) {
  'use strict';
  var Hogan = algolia.externals.Hogan;

  var formatPrice = function formatPrice(value) {
    return algolia.formatMoney(Number(value) * 100);
  };

  function formattedPriceWithComparison(price, compare_at_price, price_ratio) {
    var comparing =
      Number(compare_at_price) && Number(compare_at_price) > Number(price);
    var discount_ratio = 1.0 - price_ratio;
    var res = '<b>' + formatPrice(price) + '</b>';
    var savingsAmount = compare_at_price - price;
    var formattedSavingsAmount = formatPrice(savingsAmount);
    if (comparing) {
      res +=
        ' <span class="ais-hit--price-striked"><span class="ais-price-striked">' +
        formatPrice(compare_at_price) +
        '</span><span class="ais-hit--price-save_price">You save '+formattedSavingsAmount+'</span></span> ';
      res +=
        ' <span class="ais-hit--price-discount" style="font-weight: ' +
        Math.floor(discount_ratio * 10) * 100 +
        ';">-' +
        Math.floor(discount_ratio * 100) +
        '%</span>';
    }

    return res;
  }

  var escapeHtml = function escapeHtml(unsafe) {
    return (unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  algolia.helpers = {
    formatNumber: function formatNumber(text, render) {
      return Number(render(text)).toLocaleString();
    },
    formattedPrice: function formattedPrice(text, render) {
      return formatPrice(render(text));
    },
    formattedPriceWithoutDecimals: function formattedPriceWithoutDecimals(
      text,
      render
    ) {
      return formatPrice(render(text)).replace(/\.\d+$/, '');
    },
    autocompletePrice: function autocompletePrice() {
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        if (min !== max) {
          return '<b>' + formatPrice(min) + ' - ' + formatPrice(max) + '</b>';
        }
      }
      return formattedPriceWithComparison(this.price, null);
    },
    customPrice: function customPrice() {
      if (this.price_ratio === 0) {
        return '<b class="black">' + formatPrice(this.price) + '</b>';
      }
      return formattedPriceWithComparison(this.price, this.compare_at_price, this.price_ratio);
    },
    rewardPoint: function rewardPoint() {
        return parseInt(this.price);
    },
    discountLabel: function discountLabel() {
      let priceSaved = 0;
      let discountPercent = 0;
      if (this.compare_at_price > this.price) {
        discountPercent = Math.round(((this.compare_at_price - this.price) / this.compare_at_price) * 100);
      }

      if(discountPercent === 0 || discountPercent < 5) return '';

      return `<div class="label label--sale mb-3 mr-3 text-nowrap" data-js-product-label-sale="" style="display: flex;align-items: center;padding: 8px;">SAVE ${discountPercent}%</div>`;
    },
    productReview: function productReview() {
      const id = this.id;
      const handle = this.handle;
      let html = `<div id="id-${id}"><div class="jdgm-widget jdgm-preview-badge" data-id="${id}"></div></div>`;

      jQuery.getJSON(window.Shopify.routes.root + 'products/' + handle, function({ product }) {
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
              const elId = document.querySelector(`#id-${id}`);
              if (elId) {
                elId.innerHTML = `<div class="jdgm-widget jdgm-preview-badge" data-id="${product.id}"></div>`;
                observer.disconnect();
              }
            }
          });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        
      });

      return html;
    },
    instantsearchPriceWithSavings: function instantsearchPriceWithSavings() {
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        if (min !== max) {
          return '';
        }
      }

      var formattedPrice = formatPrice(this.price);
      var formattedCompareAtPrice = formatPrice(this.compare_at_price);

      if (this.compare_at_price && this.price < this.compare_at_price) {
        var savingsAmount = this.compare_at_price - this.price;
        var formattedSavingsAmount = formatPrice(savingsAmount);

        return `
          <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.147 8.41062C26.147 8.27754 26.0938 8.14446 25.9873 8.03798C25.8808 7.9315 25.7477 7.8783 25.6147 7.8783L23.0862 7.9049C22.5006 6.84026 21.6489 5.88211 20.5843 5.11023L21.4359 1.5437C21.5424 1.11787 21.356 0.692035 21.0101 0.45247C20.6374 0.212905 20.185 0.212905 19.839 0.479068L16.0595 3.27374C15.5538 3.19385 15.0215 3.14066 14.5157 3.11406C13.5044 1.22426 11.5081 0 9.35226 0C6.15836 0 3.52338 2.60836 3.52338 5.82888C3.52338 6.9467 3.84273 8.03804 4.45494 8.96956C4.29526 9.44869 4.16219 9.92771 4.10889 10.4068C3.68305 10.1673 3.25722 10.0342 2.88458 9.98101C2.11269 8.94296 1.26103 8.96956 0.808494 9.10264C0.755298 9.10264 0.728611 9.12923 0.675415 9.15583L0.276176 9.3688C0.0100171 9.50187 -0.0698749 9.82122 0.0632134 10.0874C0.196302 10.3535 0.515639 10.4334 0.781798 10.3003L1.10114 10.1141C1.23422 10.0875 1.3673 10.1141 1.52698 10.1673C1.3939 10.2205 1.28741 10.2737 1.18093 10.3535C0.488935 10.7528 0.249369 11.6044 0.622014 12.3231C0.888173 12.8023 1.3939 13.095 1.89962 13.095C2.13919 13.095 2.37875 13.0418 2.59161 12.9087C2.96426 12.7225 3.23042 12.3764 3.3369 11.9506C3.3901 11.711 3.41678 11.4715 3.3901 11.232C3.60306 11.3385 3.81593 11.4982 4.0289 11.6844C4.18858 13.9734 5.51937 15.9962 7.75513 17.3004V20.4677C7.75513 20.7604 7.99469 21 8.28744 21H12.4129C12.6791 21 12.9186 20.787 12.9452 20.4943L13.0783 18.8441C13.6372 18.8707 14.1695 18.8707 14.7552 18.8441V20.4677C14.7552 20.7604 14.9947 21 15.2875 21H19.4129C19.6791 21 19.9187 20.787 19.9452 20.4943L20.1848 17.3004C22.0479 16.2091 23.1658 14.7985 23.5917 12.9886L25.641 12.962C25.9338 12.962 26.1733 12.7224 26.1733 12.4297L26.147 8.41062ZM2.35238 11.6578C2.32578 11.7908 2.24589 11.9239 2.13941 11.9771C1.95314 12.0836 1.71358 12.0037 1.60709 11.8174C1.50061 11.6312 1.5805 11.3916 1.76677 11.2851C1.79337 11.2851 1.79337 11.2585 1.81997 11.2585C1.84657 11.2585 2.00624 11.1254 2.2991 11.0722C2.37898 11.2585 2.40567 11.4714 2.35238 11.6577L2.35238 11.6578ZM9.35236 1.06464C11.2155 1.06464 12.9189 2.15587 13.6907 3.8593C13.9835 4.49811 14.1166 5.13691 14.1166 5.8289C14.1166 8.46388 11.9873 10.5931 9.35233 10.5931C7.83527 10.5931 6.37135 9.84786 5.49303 8.59696C4.90752 7.77189 4.58807 6.81374 4.58807 5.8289C4.58807 3.19393 6.74393 1.06466 9.35231 1.06466L9.35236 1.06464ZM23.1394 11.9772C22.8732 11.9772 22.6603 12.1634 22.6337 12.4296C22.3409 14.2128 21.3029 15.5436 19.4131 16.5817C19.2535 16.6615 19.147 16.8212 19.147 17.0075L18.934 19.9885L15.8466 19.9886V18.3384C15.8466 18.1787 15.7934 18.0457 15.6603 17.9392C15.5538 17.8327 15.3941 17.7795 15.2611 17.8061C14.3827 17.886 13.531 17.886 12.6793 17.8061C12.5462 17.7795 12.3866 17.8327 12.2801 17.9392C12.1736 18.0191 12.0938 18.1521 12.0938 18.3118L11.9607 20.0153L8.87306 20.0152V17.0076C8.87306 16.8213 8.76658 16.6349 8.6069 16.5284C6.45104 15.3573 5.2533 13.5475 5.14684 11.4714V11.3915V11.2319C5.14684 10.806 5.20003 10.3802 5.30651 9.95426C6.39774 11.0189 7.86164 11.6311 9.37875 11.6311C12.5993 11.6311 15.2076 9.02275 15.2076 5.80223C15.2076 5.24331 15.1277 4.711 14.9681 4.17868C15.3673 4.20528 15.7399 4.25856 16.1126 4.33836C16.2723 4.36495 16.4319 4.31176 16.565 4.20528L20.3977 1.35738L19.4927 5.11022C19.3863 5.34978 19.4661 5.61594 19.679 5.74902C20.8501 6.5209 21.7551 7.53224 22.2874 8.62354C22.3673 8.80981 22.5535 8.91629 22.7665 8.91629L25.0821 8.88969L25.1087 11.8707L23.1394 11.9772Z" fill="#141414"/>
            <path d="M20.5843 7.37259C20.2916 7.29271 19.9988 7.45248 19.9189 7.71865C19.9189 7.71865 19.5996 8.70339 18.6413 8.99625C18.3485 9.07614 18.2155 9.3689 18.2953 9.66165C18.3751 9.90122 18.588 10.0343 18.801 10.0343C18.8542 10.0343 18.9075 10.0343 18.9607 10.0077C20.4511 9.55527 20.9303 8.0914 20.9568 8.0115C21.0101 7.77185 20.8505 7.4791 20.5843 7.37261L20.5843 7.37259Z" fill="#141414"/>
            <path d="M10.1509 7.63875H8.55394C8.42086 7.63875 8.28778 7.53227 8.28778 7.39919C8.28778 7.10644 8.04822 6.86687 7.75546 6.86687C7.46271 6.86687 7.22314 7.10644 7.22314 7.39919C7.22314 8.11777 7.80865 8.70339 8.55394 8.70339H8.8201V9.55506C8.8201 9.84781 9.05966 10.0874 9.35242 10.0874C9.64517 10.0874 9.88473 9.84781 9.88473 9.55506V8.70339H10.1509C10.8695 8.70339 11.4817 8.11789 11.4817 7.39919V6.62731C11.4817 5.90872 10.8962 5.32311 10.1509 5.32311H8.55394C8.42086 5.32311 8.28778 5.21662 8.28778 5.08354V4.31166C8.28778 4.17858 8.39426 4.07209 8.55394 4.07209H10.1509C10.284 4.07209 10.4171 4.17857 10.4171 4.31166C10.4171 4.60441 10.6566 4.84398 10.9494 4.84398C11.2421 4.84398 11.4817 4.60441 11.4817 4.31166C11.4817 3.59307 10.8962 3.00746 10.1509 3.00746H9.88473V2.15579C9.88473 1.86304 9.64517 1.62347 9.35242 1.62347C9.05966 1.62347 8.8201 1.86304 8.8201 2.15579V3.00746H8.55394C7.83535 3.00746 7.22314 3.59296 7.22314 4.31166V5.08354C7.22314 5.80213 7.80865 6.38774 8.55394 6.38774H10.1509C10.284 6.38774 10.4171 6.49422 10.4171 6.62731V7.39919C10.4171 7.53236 10.284 7.63875 10.1509 7.63875Z" fill="#141414"/>
          </svg>
  
          <p class="ais-hit--savings">You save <span style="color: #25A799;font-size: inherit; font-weight: inherit; line-height: inherit;">${formattedSavingsAmount}</span></p>
        `
      }

      return '';
    },
    instantsearchPrice: function instantsearchPrice() {
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        if (min !== max) {
          return '<b>' + formatPrice(min) + ' - ' + formatPrice(max) + '</b>';
        }
      }
      return formattedPriceWithComparison(
        this.price,
        this.compare_at_price,
        this.price_ratio
      );
    },
   
    instantsearchLink: function instantsearchLink() {
      var addVariantId = !this._distinct && this.objectID !== this.id;
      return (
        '/products/' +
        this.handle +
        (addVariantId ? '?variant=' + this.objectID : '')
      );
    },
    fullTitle: function fullTitle() {
      var res = this.title;
      if (
        !this._distinct &&
        this.variant_title &&
        this.variant_title !== 'Default Title' &&
        this.variant_title !== 'Default'
      ) {
        res += ' (' + this.variant_title + ')';
      }

      return escapeHtml(res);
    },
    fullHTMLTitle: function fullHTMLTitle() {
      var res = '';

      if (this._highlightResult.title && this._highlightResult.title.value) {
        res = algolia.helpers.fullEscapedAttribute(
          this._highlightResult.title.value
        );
      }

      if (
        !this._distinct &&
        this.variant_title &&
        this.variant_title !== 'Default Title' &&
        this.variant_title !== 'Default'
      ) {
        res += ' <span class="algolia-variant">(' + res + ')</span>';
      }
      return res;
    },
    fullEscapedAttribute(attribute) {
      return new DOMParser().parseFromString(attribute, 'text/html')
        .documentElement.textContent;
    },
    fullEscapedHTMLTitle: function fullEscapedHTMLTitle() {
      var res = '';

      if (this._highlightResult.title && this._highlightResult.title.value) {
        res = algolia.helpers.fullEscapedAttribute(
          this._highlightResult.title.value
        );
      }

      if (
        !this._distinct &&
        this.variant_title &&
        this.variant_title !== 'Default Title' &&
        this.variant_title !== 'Default'
      ) {
        res += ' <span class="algolia-variant">(' + res + ')</span>';
      }
      return res;
    },
    fullEscapedHTMLProductType: function fullEscapedHTMLProductType() {
      if (
        this._highlightResult.product_type &&
        this._highlightResult.product_type.value
      ) {
        return algolia.helpers.fullEscapedAttribute(
          this._highlightResult.product_type.value
        );
      } else {
        return '';
      }
    },
    fullEscapedHTMLVendor: function fullEscapedHTMLVendor() {
      if (this._highlightResult.vendor && this._highlightResult.vendor.value) {
        return algolia.helpers.fullEscapedAttribute(
          this._highlightResult.vendor.value
        );
      } else {
        return '';
      }
    },
    floor: function floor(text, render) {
      return '' + Math.floor(Number(render(text)));
    },
    ceil: function ceil(text, render) {
      return '' + Math.ceil(Number(render(text)));
    },
    sizedImage: function sizedImage(text, render) {
      var image = this._distinct ? this.product_image : this.image;
      if (!image) {
        return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
      }
      var size = render(text).replace(/^\s+|\s+$/g, ''); // Render and trim
      if (size === 'original') {
        return image;
      }
      return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + size + '.$2');
    },
  };

  [
    'pico',
    'icon',
    'thumb',
    'small',
    'compact',
    'medium',
    'large',
    'grande',
    'original',
  ].forEach(function(size) {
    algolia.helpers[size + 'Image'] = (function(_size) {
      return function() {
        var image = this._distinct ? this.product_image : this.image;

        if (!image) {
          return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
        }

        if (_size === 'original') {
          return image;
        }

        return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + _size + '.$2');
      };
    })(size); // We need to create a new scope so that the internal size has the good value.
  });

  /* Create an Hogan lambda, which doesn't respect the mustache doc */
  var helpers = algolia.assign(
    {},
    algolia.helpers,
    algolia.translation_helpers
  );
  var helpersNames = Object.keys(helpers);
  var i = helpersNames.length;
  var helpersArray = new Array(i);
  while (i--) helpersArray[i] = [helpersNames[i], helpers[helpersNames[i]]];

  algolia.hoganHelpers = helpersArray.reduce(function(res, options) {
    var name = options[0];
    var helper = options[1];

    var newRes = algolia.assign({}, res);

    newRes[name] = function() {
      return function(text) {
        var render = function(value) {
          return Hogan.compile(value, algolia.hoganOptions).render(this);
        }.bind(this);

        return helper.call(this, text, render);
      }.bind(this);
    };

    return newRes;
  }, {});
})(window.algoliaShopify);
