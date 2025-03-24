var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

(function($){
  $(document).ready(function() {
    if($('body').hasClass('test_108')) {
      if(Shopify.Checkout.step == 'contact_information') {
        var phoneField = $('.address-fields .field[data-address-field="phone"]');
        phoneField.append('<p class="show-test_108">We’ll update you on the status of your order via SMS</p>');
        phoneField.find('input').attr('placeholder', 'Phone');
        phoneField.find('label').text('Phone');
      }

      /* $('#continue_button').on('click', function (e) {
          e.preventDefault();
          if($('.address-fields .field[data-address-field="phone"] input').val() != '') {
            $(this).closest('form').submit();
          } else {
            $('.address-fields .field[data-address-field="phone"]').addClass('field--error');
          }
        
      }) */
    }
  });
})(Checkout.$);

<!-- Test 187 -->
function tooltipClose() {
  $("#tooltip:hover #tooltip-text").css("opacity","0");
  $("#tooltip-background").css("display","none");
  $("#tooltip-icon").on("click",function(){
    $("#tooltip:hover #tooltip-text").css("opacity","1");
    $("#tooltip-background").css("display","block");
  });
}
<!-- Test 187 -->