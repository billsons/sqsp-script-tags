
$(document).ready(function() {
    var mixedQty = parseInt( $(".ProductItem-details-title").text().replace(/[^0-9]/gi, '') );
    var qtyAllowed = mixedQty;

  // if qtyAllowed == 12 or 24 set qtyAllowed to 4
    if (mixedQty == 12 || mixedQty == 24) {
        qtyAllowed = 4;
    }
  
  $(".sqs-add-to-cart-button.use-form").click(function() {
    //wait for lightbox
    var existCondition = setInterval(function() {
        if ($('.lightbox-content .form-wrapper').length) {
            //alert("Exists!");
            clearInterval(existCondition);

			$('.lightbox-content .form-wrapper').addClass("custom-form");

			//add disclaimer about 
			$('<span> - Mixed ' + mixedQty +' pack</span>').appendTo(".form-title");
			$('.form-title').wrapAll('<div class="custom-form-heading-wrapper"></div>');
			$('<div class="custom-subtitle">If you are ordering multiple mixed packs and would like to have a different selection in each, please add these to your cart separately.</div>').appendTo(".lightbox-content .custom-form-heading-wrapper");
			$('<div class="custom-subtitle">Test!!!!</div>').appendTo(".lightbox-content .custom-form-heading-wrapper");
            
            //pretty print inputs    
            $(".lightbox-content form .form-item.number label").each(function(){
                var input = $(this).text().replace(/(\r\n|\n|\r)/gm, "");
                var sku = input.substring(input.indexOf("[") + 1, input.lastIndexOf("]"));
                $(this).text( input.replace('[' + sku + ']', '') );
            });

			//disable any with sold out
			$(".lightbox-content form .form-item.number").each(function() {
				if ( $(this).find('label').text().toLowerCase().includes('sold out') ) {
					$(this).find("input").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			$(".lightbox-content form .form-item.number input").attr("placeholder", "0"); //set default values


			//on input
			$(".lightbox-content form .form-item.number input").bind('keyup paste', function(){
				this.value = this.value.replace(/[^0-9]/g, '');

			    var sum = 0;
			    $(".lightbox-content form .form-item.number input").each(function(){
			        sum += +$(this).val();
			    });
			    if (sum > qtyAllowed) {
					$(".lightbox-content form .form-item.number input.focus-visible").val("0");
					alert("You cannot add more than " + qtyAllowed + " products to your order");
				}
				
		 	});
			//end on input

			//form submit
			$(".lightbox-content form input.button").on('click', function(ev){
			    var sum = 0;
			    $(".lightbox-content form .form-item.number input").each(function(){
			        sum += +$(this).val();
					if ($(this).val() === "") {
						$(this).val("0");
					}
			    });
			    if (sum !== qtyAllowed) {
					ev.preventDefault();
					ev.stopPropagation();
					alert("Please ensure you have selected the correct quantity of products for your mixed pack.")
				}
				
		 	});
			//end form submit
			
        }
    }, 100);
    //end wait for lightbox
  })
});
