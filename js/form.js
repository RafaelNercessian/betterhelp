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
            apartment: {
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

    $('.form_input--submit').on('submit', function (e) {
        e.preventDefault();
        if (!$('.form__details').valid()) {
            return false;
        }
    })
});