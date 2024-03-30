<?php
$dominioPermitido = "*";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');

ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$fechaD = date('d-m-Y H:i:s');

echo $fechaD;


?>
