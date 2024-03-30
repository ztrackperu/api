<?php
/*
    Programado por Luis Pablo Marcelo Perea
*/
//$dominioPermitido = "http://100.26.213.13/";
//header("Access-Control-Allow-Origin: $dominioPermitido");
//header("Access-Control-Allow-Headers: content-type");
//header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");



header('Content-type: application/json; charset=utf-8');
require_once 'conf.php';
$api = new ReeferModel();

$data = $api->listaReefers();
echo json_encode($data);
echo "ola";
