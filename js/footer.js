function isValidParam(param) {
    return param && param.trim() !== '';
}

function redirectToErrorPage() {
    window.location.href = 'error.html';
}

function mockApiCall() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({isEligible: false});
        }, 500);
    });
}

function proceedToFormPage(anonymized_code, institution_id) {
    //If form.html, we don't redirect
    if (window.location.href.includes("form.html")) {
        $('.bodyform').show();
        return;
    }

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

function checkEligibilityAndProceed(anonymized_code, institution_id) {
    var settings = {
        "url": `https://api2.mightier.com/partner/bh/eligible?userId=${encodeURIComponent(anonymized_code)}&orgId=${encodeURIComponent(institution_id)}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings)
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
        });


    //Used for testing
    /*mockApiCall()
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
        });*/
}

$(document).ready(function () {
    // Parse and validate URL parameters
    sessionStorage.removeItem('eligibilityChecked');
    var queryParams = new URLSearchParams(window.location.search),
        anonymized_code = queryParams.get('anonymized_code'),
        institution_id = queryParams.get('institution_id');

    if (window.location.href.includes("form.html")) {
        // Check if this is the first visit
        if (!sessionStorage.getItem('eligibilityChecked')) {
            // Validate parameters
            if (!isValidParam(anonymized_code) || !isValidParam(institution_id)) {
                console.error("Missing or invalid parameters");
                redirectToErrorPage();
                return;
            }
            checkEligibilityAndProceed(anonymized_code, institution_id);

            // Set a flag in sessionStorage to indicate eligibility has been checked
            sessionStorage.setItem('eligibilityChecked', 'true');
        } else {
            // If not the first visit, just show the form
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