<?php
$dominioPermitido = "*";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
header('Content-type: application/json; charset=utf-8');


require_once '../../conf.php';
$api = new ReeferModel();

$data = $api->TablaReefer();
$j = json_encode($data);
//return $j;

echo $j;
