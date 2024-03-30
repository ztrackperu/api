<?php
header('Content-type: application/json; charset=utf-8');

//$datosRecibidos = file_get_contents("php://input");
$datosRecibidos ='{"tipo": "Reefer", "nombre_contenedor": "TTTT4020550", "set_point": -75.0, "temp_supply_1": -37.8, "return_air": -23.1, "evaporation_coil": -23.0, "ambient_air": 29.0, "cargo_1_temp": -3277.0, "cargo_2_temp": -3277.0, "cargo_3_temp": -3277.0, "cargo_4_temp": -3277.0, "relative_humidity": 81.0, "alarm_present": 0, "alarm_number": 0, "controlling_mode": "OPTIMIZED", "power_state": 1, "defrost_term_temp": 18.0,"defrost_interval": 6.0, "latitud": -12.6342, "longitud": -78.0567}';

$contenedor = json_decode($datosRecibidos);

require_once 'conf.php';
$api = new ReeferModel();
$nombre = $contenedor->nombre_contenedor;
$tipo = $contenedor->tipo;
$descripcion = "Sin Informacion";
$temp_supply = $contenedor->temp_supply_1;
$set_point =  $contenedor->set_point;
$return_air = $contenedor->return_air;
$evaporation_coil = $contenedor->evaporation_coil;
$ambient_air = $contenedor->ambient_air;
$cargo_1_temp =  $contenedor->cargo_1_temp;
$cargo_2_temp = $contenedor->cargo_2_temp;
$cargo_3_temp = $contenedor->cargo_3_temp;
$cargo_4_temp = $contenedor->cargo_4_temp;
$relative_humidity = $contenedor->relative_humidity;
$alarm_present = $contenedor->alarm_present;
$alarm_number = $contenedor->alarm_number;
$controlling_mode =  $contenedor->controlling_mode;
$power_state = $contenedor->power_state;
$defrost_term_temp = $contenedor->defrost_term_temp;
$defrost_interval = $contenedor->defrost_interval;
$latitud = $contenedor->latitud;
$longitud = $contenedor->longitud ;
$ultima_fecha =date("Y-m-d H:i:s");

$R = $api->tramaR($nombre , $tipo ,$descripcion ,$set_point, $temp_supply,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$ultima_fecha);
//22 datos +id 23
$respuesta = [
    "mensaje" => "Datos de Reefer por pablito",
    "nombre" => $contenedor->nombre_contenedor,
    "cadena" =>[
                'tipo' =>  $contenedor->tipo,
                'nombre_contenedor' => $contenedor->nombre_contenedor,
                'temp_supply' => $contenedor->temp_supply_1,
                'set_point' =>  $contenedor->set_point,
                'return_air' => $contenedor->return_air,
                'evaporation_coil' => $contenedor->evaporation_coil,
                'ambient_air' => $contenedor->ambient_air,
                'cargo_1_temp' =>  $contenedor->cargo_1_temp,
                'cargo_2_temp' => $contenedor->cargo_2_temp,
                'cargo_3_temp' => $contenedor->cargo_3_temp,
                'cargo_4_temp' => $contenedor->cargo_4_temp,
                'relative_humidity' => $contenedor->relative_humidity,
                'alarm_present' => $contenedor->alarm_present,
                'alarm_number' => $contenedor->alarm_number,
                'controlling_mode '=>  $contenedor->controlling_mode,
                'power_state' => $contenedor->power_state,
                'defrost_term_temp' => $contenedor->defrost_term_temp,
                'defrost_interval' => $contenedor->defrost_interval
        ],
        "fechaYHora" => date("Y-m-d H:i:s")
    ];
    
    $respuestaCodificada = json_encode($respuesta);
    echo $respuestaCodificada;

?>
