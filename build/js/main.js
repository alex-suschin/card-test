$(function() {

    $(window).on('load', function() {
        let phones = [
            { 'mask': '+7 \\ \\ ###-###-##-##' }
        ];

        $('input[type=tel]').inputmask({
            mask: phones,
            greedy: false,
            definitions: {
                '#': {
                    validator: '[0-9]',
                    cardinality: 1
                }
            }
        });
    });

    $('select').niceSelect();

    $('.desc-product-btns a').click(function() {
        $('.desc-product-btns').find('.active').removeClass('active');
        $(this).addClass('active');
        $('.desc-product-elems').find('.desc-product-elem').hide();
        $('#' + $(this).data('switch')).show();
    });

    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    $('.card-img-small .card-img-small-item').click(function() {
        $(this).closest('.card-imgs').find('.card-img-big>.card-img-big-item>a>img').attr('src', $(this).find('img').attr('src'));
        $(this).closest('.card-imgs').find('.card-img-big>.card-img-big-item>a').attr('href', $(this).find('img').attr('src'));
        $(this).closest('.card-imgs').find('.card-img-small-item').removeClass('active');
        $(this).addClass('active');
    });

    function calcPercent() {
        var oldPrice = $('.old-price span').text();
        var oldPriceNum = oldPrice.replace(/\s+/g, '');

        var saleVal = $('.card-sale i').text();
        var saleValNum = saleVal.replace(/\s+/g, '');

        var pricePercent = oldPriceNum * (saleValNum / 100);

        var newPriceText = (oldPriceNum - pricePercent);
        var newPriceTextN = newPriceText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        var newPrice = $('.new-price span').text(newPriceTextN);

        var pricePercentN = pricePercent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $('.save-money b').text(pricePercentN);
    }

    calcPercent();

    $(document).on('change', '.size-radio-items .input-price', function() {
        var $target = $(event.target)
        $(".card-price").find(".old-price span").text($target.data("price"))
        calcPercent();
    });

    var oldPriceM = $('.old-price span').text();

    $('#col-product').on('change', function() {
        var consPrice = oldPriceM;
        var nowPriceNum = consPrice.replace(/\s+/g, '');
        var colTotal = nowPriceNum * $(this).val();
        var colTotalN = colTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $('.old-price span').text(colTotalN);
        calcPercent();
    });

    $('.test-popup-link').magnificPopup({
        type: 'image'
    });

    $('.switch-size').magnificPopup({
        type: 'inline'
    });

    $('.hide-input').val($('#idProduct').val());

    $('.btn-order').click(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "https://www.ru",
            dataType: "json",
            data: {
                "col": $('#col-product').val(),
                'id': $('.hide-input').val(),
                'size': $('input[name="size"]:checked').val(),
                'tel': $('.phone').val()
            },
            success: function(data) {
                console.log(data);
            },
            error: function(er) {
                console.log(er);
            }
        });
    })

});



function copyId() {
    var productId = document.getElementById('idProduct');
    productId.select();
    productId.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Вы скопировали тект: " + productId.value);
}

$(window).on('load resize', function() {

    var width = $(window).width();

    if (width > '700') {

    }

    if (width < '700') {

    }

});
//# sourceMappingURL=../sourcemaps/main.js.map
