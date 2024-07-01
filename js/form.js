$(document).ready(function () {
    var anonymized_code = '';
    var institution_id = '';
    //Check if anonymized_code and institution_id came from home
    if (localStorage.getItem('anonymized_code')) {
        anonymized_code = localStorage.getItem('anonymized_code');
    }
    if (localStorage.getItem('institution_id')) {
        institution_id = localStorage.getItem('institution_id');
    }

    //If nothing found try to check if the paramters are in this url instead
    if (anonymized_code == '' && institution_id == '') {
        var queryString = window.location.search;
        queryString = queryString.substring(1);
        var params = queryString.split('&');
        var anonymized_code = '';
        var institution_id = '';
        $.each(params, function (i, param) {
            var parts = param.split('=');
            var key = parts[0];
            var value = parts[1];
            if (key === 'anonymized_code') {
                anonymized_code = value;
            } else if (key === 'institution_id') {
                institution_id = value;
            }
        });
    }

    $('#state').select2();

    $('#state').on('select2:select', function (e) {
        $(this).valid();
    });

    $("#phone").mask("(999) 999-9999");


    //Form validation
    $('.form__details').validate({
        onkeyup: false,
        onfocusout: false,
        onclick: false,
        rules: {
            first_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            last_name: {
                required: true
            },
            address: {
                required: true
            },
            city: {
                required: true
            },
            zip: {
                required: true
            },
            phone: {
                required: true
            },
            accept: {
                required: true
            },
            state: {
                required: true
            }
        },
        messages: {
            first_name: "Required",
            last_name: "Required",
            email: {
                required: "Required",
                email: "Please enter a valid email address"
            },
            address: "Required",
            city: "Required",
            zip: "Required",
            phone: "Required",
            accept: "Required",
            state: "Required",
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            if (element.attr('name') === 'accept') {
                error.insertAfter($('#label__accept'));
            } else {
                error.insertAfter(element.siblings('label'));
            }
        }
    });


    $('.form_input--submit').on('click', function (e) {
        e.preventDefault();
        if (!$('.form__details').valid()) {
            return false;
        }
        $('.form').hide();
        $('.submission').show();

        var data = {
            "first_name": $('#first_name').val(),
            "last_name": $('#last_name').val(),
            "email": $('#email').val(),
            "address": $('#address').val(),
            "apartment": $('#apartment').val(),
            "city": $('#city').val(),
            "state": $('#select2-state-container').attr('title'),
            "zip": $('#zip').val(),
            "phone": $('#phone').val(),
            "accept_mightier_terms": $('#accept').is(":checked"),
            "optin_marketing_email": $('#marketing').is(":checked"),
            "anonymized_code": anonymized_code,
            "institution_id": institution_id
        }

        var settings = {
            "url": "https://api2.mightier.com/partner/bh/member",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(data),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    })
});