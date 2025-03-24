class RedemptionOption{
	constructor(redemptionOptions){
		this.redemptionOptions = redemptionOptions;
	}
	renderProductRedemptions(){
		this.redemptionOptions.forEach(redemption => {
          var optionHtml = `<div class="row"><div class="col-6 col-lg-8"><h5 class="mt-5 mb-15">${redemption.name} - ${redemption.costText}</div><div class="col-6 col-lg-4"><button id="swell-redemption-link-${redemption.costInPoints}" class="swell-redemption-link btn" data-redemption-option-id="${redemption.id}">LOCKED</button></div></div>`;
          $(".all-redemption-options").append(optionHtml);
		})
	}
}
		
class RedemptionOptionButton{
	constructor(redemptionOptions, pointBalance){
		this.redemptionOptions = redemptionOptions;
      	this.pointBalance = pointBalance;
	}
	renderProductRedemptionButtons(){
		this.redemptionOptions.forEach(redemption => {
          if (this.pointBalance >= redemption.costInPoints){
          	$(`#swell-redemption-link-${redemption.costInPoints}`).html('CLAIM');
          }
          else {
            $(`#swell-redemption-link-${redemption.costInPoints}`).attr('disabled', 'disabled');
          }
		})

	}
}