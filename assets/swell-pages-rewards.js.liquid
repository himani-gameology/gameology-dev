$(window).on('load',()=>{
	(()=>{
		$(document).ready(()=>{
			$(document).on("swell:initialized",()=>{
				new RedemptionOption(swellAPI.getActiveRedemptionOptions()).renderProductRedemptions();
			});
			$(document).on('swell:setup',()=>{
				console.log("swell:setup");
                if (swellAPI.getCustomerDetails().vipTier != null && swellAPI.getCustomerDetails().vipTier.name != null){
                  console.log(swellAPI.getCustomerDetails().vipTier.name);
                  $(`#${swellAPI.getCustomerDetails().vipTier.name}`).css("display","block");
                }
                else {
                  $(`#no-rank`).css("display","block");
                }

				new RedemptionOptionButton(swellAPI.getActiveRedemptionOptions(), swellAPI.getCustomerDetails().pointsBalance).renderProductRedemptionButtons();
				$('#refer-url').val(swellAPI.getCustomerDetails().referralLink);
                if (swellAPI.getCustomerDetails().referrals.length > 0){
                  swellAPI.getCustomerDetails().referrals.forEach(function(referal){
                    $('#referrals-table').append(`<tr><td>${referal.email}</td><td>` + (referal.completedAt == null ? 'Invited' : 'Successful') + `</td></tr>`);
                  })
                }
                else {
                  $('#referrals-table').append(`<tr><td colspan="2">Give your referal link to your friends to get $5!</td></tr>`);
                }
		})
	});
	}).call(this);
})
