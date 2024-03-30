<?php
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');
// necesarios del modelo 
require_once '../../models/api.php';

//require_once '../models/principal.php';
require '../../../ztrack3/vendor/autoload.php';
//use Exception;
use MongoDB\Client;
use MongoDB\Driver\ServerApi;
use MongoDB\BSON\UTCDateTime ;
$api = new ApiModel();
//$datosRecibidos = file_get_contents("php://input");

$uri = 'mongodb://localhost:27017';
// Specify Stable API version 1
$apiVersion = new ServerApi(ServerApi::V1);
// Create a new client and connect to the server
$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);
try {
    // Send a ping to confirm a successful connection
    $client->selectDatabase('ZTRACK_P')->command(['ping' => 1]);
    //echo "Pinged your deployment. You successfully connected to MongoDB!\n";
} catch (Exception $e) {
    printf($e->getMessage());
}

$telemetria_id = 259;
 $buscarUltimo = $api->buscarUltimo($telemetria_id);
 $pre = $buscarUltimo['created_at'] ;
 //$fechaaInicio1 =$pre.":00";
 //problemas con fecha 5 horas menos debe ser UTC-5
 $puntoA = strtotime($pre);
 $puntoA1 = strtotime("-5 hours",$puntoA)*1000;
 // aqui lo convertimos en formato mongo
 $convertido = new MongoDB\BSON\UTCDateTime($puntoA1);
 $buscarUltimo['created_at'] = $convertido;
 $cursor  = $client->ztrack_ja22->madurador->insertOne($buscarUltimo);
 print($pre);
 print($puntoA1);
 print_r($buscarUltimo);