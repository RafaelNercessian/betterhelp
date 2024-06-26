$(document).ready(function () {
    //Remove localstorage items
    localStorage.removeItem('anonymized_code');
    localStorage.removeItem('institution_id');

    //Query url
    var queryString = window.location.search;
    queryString = queryString.substring(1);
    var params = queryString.split('&');
    var orgId = '';
    var userId = '';
    var anonymized_code = '';
    var institution_id = '';
    $.each(params, function (i, param) {
        var parts = param.split('=');
        var key = parts[0];
        var value = parts[1];
        if (key === 'orgId') {
            orgId = value;
        } else if (key === 'userId') {
            userId = value;
        } else if (key === 'anonymized_code') {
            anonymized_code = value;
        } else if (key === 'institution_id') {
            institution_id = value;
        }
    });

    if (!localStorage.getItem('anonymized_code') && !!anonymized_code && anonymized_code !== '') {
        localStorage.setItem('anonymized_code', anonymized_code);
    }
    if (!localStorage.getItem('institution_id') && !!institution_id && institution_id.trim() !== '') {
        localStorage.setItem('institution_id', institution_id);
    }

    var data = {
        "userId": userId,
        "orgId": orgId,
        "anonymized_code": anonymized_code,
        "institution_id": institution_id
    }

    var settings = {
        "url": `https://api2.mightier.com/partner/bh/eligible?userId=${data.anonymized_code}&orgId=${data.institution_id}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})