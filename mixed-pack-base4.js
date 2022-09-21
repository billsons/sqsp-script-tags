
$(".sqs-add-to-cart-button.use-form").click(function() {
    var existCondition = setInterval(function() {
        if ($(".lightbox-content .form-wrapper").length) {
            //alert("Exists!");
            clearInterval(existCondition);
            console.log("log from gh")
        }
    }, 100);
});
