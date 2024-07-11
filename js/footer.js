// Global variables to store the parameters
var anonymized_code;
var institution_id;

function isValidParam(param) {
    return param && param.trim() !== '';
}

function redirectToErrorPage() {
    window.location.href = 'error.html';
}

function mockApiCall() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({isEligible: true});
        }, 500);
    });
}

function proceedToFormPage(anonymized_code, institution_id) {
    var formUrl = 'form.html';
    var newQueryParams = new URLSearchParams();

    if (isValidParam(anonymized_code)) {
        newQueryParams.append('anonymized_code', anonymized_code);
    }
    if (isValidParam(institution_id)) {
        newQueryParams.append('institution_id', institution_id);
    }

    // Construct the new URL with the relevant query parameters
    window.location.href = formUrl + (newQueryParams.toString() ? '?' + newQueryParams.toString() : '');
}

function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkEligibilityAndProceed(anonymized_code, institution_id) {
    var settings = {
        "url": `https://api2.mightier.com/partner/bh/eligible?userId=${encodeURIComponent(anonymized_code)}&orgId=${encodeURIComponent(institution_id)}`,
        "method": "GET",
        "timeout": 0,
    };

    /*$.ajax(settings)
        .done(function (response) {
            console.log(response);
            if (response.isEligible == false) {
                redirectToErrorPage();
            } else {
                $('body').show();
                proceedToFormPage();
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error checking eligibility:", textStatus, errorThrown);
            redirectToErrorPage();
        });*/

    console.log('Aqui');

    //Used for testing
    mockApiCall()
        .then(function (response) {
            console.log("API response:", response);
            if (response.isEligible === false) {
                redirectToErrorPage();
            } else {
                $('.bodyform').show();
                proceedToFormPage(anonymized_code, institution_id);
            }
        })
        .catch(function (error) {
            console.error("Error checking eligibility:", error);
            redirectToErrorPage();
        });
}

$(document).ready(function () {
    // Parse and validate URL parameters
    var queryParams = new URLSearchParams(window.location.search),
        anonymized_code = queryParams.get('anonymized_code'),
        institution_id = queryParams.get('institution_id');

    if (window.location.href.includes("form.html")) {
        // Check if eligibility was checked in the last 5 minutes
        var eligibilityChecked = getCookie('eligibilityChecked');

        if (!eligibilityChecked) {
            // Validate parameters
            if (!isValidParam(anonymized_code) || !isValidParam(institution_id)) {
                console.error("Missing or invalid parameters");
                redirectToErrorPage();
                return;
            }
            checkEligibilityAndProceed(anonymized_code, institution_id);

            // Set a cookie that expires in 5 minutes
            setCookie('eligibilityChecked', 'true', 5);
        } else {
            // If checked within the last 5 minutes, just show the form
            $('.bodyform').show();
        }
    }

    // Modify the "Get Started" button click event
    $('.form').on('click', function (e) {
        e.preventDefault();

        // Validate parameters
        if (!isValidParam(anonymized_code) || !isValidParam(institution_id)) {
            console.error("Missing or invalid parameters");
            redirectToErrorPage();
            return;
        }

        checkEligibilityAndProceed(anonymized_code, institution_id);
    });
});