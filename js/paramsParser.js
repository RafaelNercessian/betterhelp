export default function parseParams(queryString) {
    const params = queryString.split('&');
    const orgId = '';
    const userId = '';
    const anonymized_code = '';
    const institution_id = '';

    $.each(params, function (i, param) {
        const parts = param.split('=');
        const key = parts[0];
        const value = parts[1];
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

    return { orgId, userId, anonymized_code, institution_id };
}