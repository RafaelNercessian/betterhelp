$(document).ready(function () {
    $('#state').select2();

    //Form validation
    $('.form__details').validate({
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
            }
        },
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
            "optin_marketin_email": $('#marketing').is(":checked"),
        }

        $.ajax({
            url: 'https://mightier.site/wp-content/themes/mightier/Multiform/form-submission-betterhelp.php',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: "application/json",
        });
    })
});