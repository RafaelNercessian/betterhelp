<?php
header("Access-Control-Allow-Origin: *");

$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!empty($data['first_name']) &&
    !empty($data['last_name']) &&
    !empty($data['email']) &&
    !empty($data['address']) &&
    !empty($data['city']) &&
    !empty($data['state']) &&
    !empty($data['zip']) &&
    !empty($data['phone'])) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api2.mightier.com/partner/bh/member',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode(
            array(
                'first_name' => $data['email'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'address' => $data['address'],
                'apartment' => $data['apartment'],
                'city' => $data['city'],
                'state' => $data['state'],
                'zip' => $data['zip'],
                'phone' => $data['phone'],
                'accept_mightier_terms' => $data['accept_mightier_terms'],
                'optin_marketin_email' => $data['optin_marketin_email'],
            )
        ),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
}