<?php
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');
// necesarios del modelo 
require_once '../../models/api.php';
$api = new ApiModel();
$datosRecibidos = file_get_contents("php://input");

//$datosRecibidos = '{"B1": "1BA2","tipo": "Madurador","nombre_contenedor": "ZGRU2004185","set_point": -40.00,"temp_supply_1": -42.20,"temp_supply_2": -3277.00,"return_air": -40.10,"evaporation_coil": -44.30,"condensation_coil": 23.10,"compress_coil_1": 89.20,"compress_coil_2": -3276.90,"ambient_air": 19.70,"cargo_1_temp": 0.00,"cargo_2_temp": 0.00,"cargo_3_temp": 0.00,"cargo_4_temp": 0.00,"relative_humidity": 55.00,"avl": 32766.00,"suction_pressure": 3276.60,"discharge_pressure": 3276.60,"line_voltage": 455.00,"line_frequency": 60.00,"consumption_ph_1": 7.50,"consumption_ph_2": 7.20,"consumption_ph_3": 5.90,"co2_reading": 25.40,"o2_reading": 3276.60,"evaporator_speed": 0.00,"condenser_speed": 0.00,"power_kwh": 24.00,"power_trip_reading": 20.00,"suction_temp": 3276.60,"discharge_temp": 3276.60,"supply_air_temp": 6511.40,"return_air_temp": 6513.50,"dl_battery_temp": 27.59,"dl_battery_charge": 0.12,"power_consumption": 0.01,"power_consumption_avg": 0.87,"alarm_present": 0,"capacity_load": 48.00,"power_state": 0,"controlling_mode": 0,"humidity_control": 0,"humidity_set_point": 254,"fresh_air_ex_mode": 0,"fresh_air_ex_rate": 32766.00,"fresh_air_ex_delay": 3276.60,"set_point_o2": 3276.60,"set_point_co2": 3276.60,"defrost_term_temp": 18.00,"defrost_interval": 6.00,"water_cooled_conde": 0,"usda_trip": 0,"evaporator_exp_valve": 255.00,"suction_mod_valve": 255.00,"hot_gas_valve": 255.00,"economizer_valve": 255.00,"ethylene": 0.00,"stateProcess": 0,"stateInyection": 0,"timerOfProcess": 0,"battery_voltage": 0.00,"power_trip_duration": 0.00,"modelo": "THERMOKING","latitud": 0.00,"longitud": 0.00,"sp_ethyleno": 0,"horas_inyeccion":0,"pwm_inyeccion": 0,"fecha": 334,"defrost_prueba": 2,"ripener_prueba": 2}';

require '../../../ztrack3/vendor/autoload.php';
//use Exception;
use MongoDB\Client;
use MongoDB\Driver\ServerApi;
use MongoDB\BSON\UTCDateTime ;

$contenedor = json_decode($datosRecibidos);
$primerFiltro = $contenedor->tipo ;
$segundoFiltro = $contenedor->nombre_contenedor;

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

if($primerFiltro =="Madurador"){

    $B1 =  $contenedor->B1;
    if($B1 =="1BC2"){
       $cadena_madurador['extra_1'] = 1;
    }else{
       $cadena_madurador['extra_1']= 0;
    }
    //$cadena_madurador['
    $cadena_madurador['set_point'] =  $contenedor->set_point;
    $cadena_madurador['temp_supply_1'] = $contenedor->temp_supply_1;
    $cadena_madurador['temp_supply_2'] = $contenedor->temp_supply_2;
    $cadena_madurador['return_air'] = $contenedor->return_air;
    $cadena_madurador['evaporation_coil'] = $contenedor->evaporation_coil;
    $cadena_madurador['condensation_coil'] = $contenedor->condensation_coil;
    $cadena_madurador['compress_coil_1'] = $contenedor->compress_coil_1;
    $cadena_madurador['compress_coil_2']= $contenedor->compress_coil_2;
    $cadena_madurador['ambient_air'] = $contenedor->ambient_air;
    $cadena_madurador['cargo_1_temp'] =  $contenedor->cargo_1_temp;
    $cadena_madurador['cargo_2_temp'] = $contenedor->cargo_2_temp;
    $cadena_madurador['cargo_3_temp'] = $contenedor->cargo_3_temp;
    $cadena_madurador['cargo_4_temp']= $contenedor->cargo_4_temp;
    $cadena_madurador['relative_humidity'] = $contenedor->relative_humidity;
    $cadena_madurador['avl'] = $contenedor->avl;
    $cadena_madurador['suction_pressure'] = $contenedor->suction_pressure;
    $cadena_madurador['discharge_pressure'] = $contenedor->discharge_pressure;
    $cadena_madurador['line_voltage'] = $contenedor->line_voltage;
    $cadena_madurador['line_frequency'] = $contenedor->line_frequency;
    $cadena_madurador['consumption_ph_1'] = $contenedor->consumption_ph_1;
   
    $cadena_madurador['consumption_ph_2'] = $contenedor->consumption_ph_2;
    $cadena_madurador['consumption_ph_3'] = $contenedor->consumption_ph_3;
    $cadena_madurador['co2_reading'] = $contenedor->co2_reading;
    $cadena_madurador['o2_reading'] = $contenedor->o2_reading;
    $cadena_madurador['evaporator_speed'] = $contenedor->evaporator_speed;
    $cadena_madurador['condenser_speed'] = $contenedor->condenser_speed;
    $cadena_madurador['battery_voltage'] = $contenedor->battery_voltage;
    $cadena_madurador['power_kwh'] = $contenedor->power_kwh;
    $cadena_madurador['power_trip_reading'] = $contenedor->power_trip_reading;
    $cadena_madurador['power_trip_duration'] = $contenedor->power_trip_duration;

    $cadena_madurador['suction_temp'] = $contenedor->suction_temp;
    $cadena_madurador['discharge_temp'] = $contenedor->discharge_temp;
    $cadena_madurador['supply_air_temp'] = $contenedor->supply_air_temp;
    $cadena_madurador['return_air_temp'] = $contenedor->return_air_temp;
    $cadena_madurador['dl_battery_temp'] = $contenedor->dl_battery_temp;
    $cadena_madurador['dl_battery_charge'] = $contenedor->dl_battery_charge;
    $cadena_madurador['power_consumption'] = $contenedor->power_consumption;
    $cadena_madurador['power_consumption_avg'] = $contenedor->power_consumption_avg;
    $cadena_madurador['alarm_present'] = $contenedor->alarm_present;
    $cadena_madurador['capacity_load'] = $contenedor->capacity_load;

    $cadena_madurador['power_state'] = $contenedor->power_state;
    $cadena_madurador['controlling_mode'] = $contenedor->controlling_mode;
    $cadena_madurador['humidity_control'] = $contenedor->humidity_control;
    $cadena_madurador['humidity_set_point'] = $contenedor->humidity_set_point;
    $cadena_madurador['fresh_air_ex_mode'] = $contenedor->fresh_air_ex_mode;
    $cadena_madurador['fresh_air_ex_rate'] = $contenedor->fresh_air_ex_rate;
    $cadena_madurador['fresh_air_ex_delay'] = $contenedor->fresh_air_ex_delay;
    $cadena_madurador['set_point_o2'] = $contenedor->set_point_o2;
    $cadena_madurador['set_point_co2'] = $contenedor->set_point_co2;
    $cadena_madurador['defrost_term_temp'] = $contenedor->defrost_term_temp;

    $cadena_madurador['defrost_interval'] = $contenedor->defrost_interval;
    $cadena_madurador['water_cooled_conde'] = $contenedor->water_cooled_conde;
    $cadena_madurador['usda_trip'] = $contenedor->usda_trip;
    $cadena_madurador['evaporator_exp_valve'] = $contenedor->evaporator_exp_valve;
    $cadena_madurador['suction_mod_valve'] = $contenedor->suction_mod_valve;
    $cadena_madurador['hot_gas_valve'] = $contenedor->hot_gas_valve;
    $cadena_madurador['economizer_valve'] = $contenedor->economizer_valve;
    $cadena_madurador['ethylene'] = $contenedor->ethylene;
    $cadena_madurador['stateProcess'] = $contenedor->stateProcess;
    $cadena_madurador['stateInyection'] = $contenedor->stateInyection;
    $cadena_madurador['timerOfProcess'] = $contenedor->timerOfProcess;
    $cadena_madurador['modelo'] = $contenedor->modelo; 

    //$cadena_madurador['latitud'] = $contenedor->latitud;
    //$cadena_madurador['longitud'] = $contenedor->longitud ;
    //$cadena_madurador['nombrecontenedor'] = $contenedor->nombre_contenedor;

    $cadena_madurador['defrost_prueba'] = $contenedor->defrost_prueba;
    $cadena_madurador['ripener_prueba'] = $contenedor->ripener_prueba;

    $cadena_madurador['inyeccion_etileno'] = 1;

    $cadena_madurador['extra_2'] = 0;
    $cadena_madurador['extra_3'] = 0;
    $cadena_madurador['extra_4'] = 0;
    $cadena_madurador['extra_5'] = 0;

    $cadena_madurador['sp_ethyleno'] =$contenedor->sp_ethyleno;
    $cadena_madurador['inyeccion_hora'] = $contenedor->horas_inyeccion;
    $cadena_madurador['inyeccion_pwm'] = $contenedor->pwm_inyeccion;

    //$cadena_madurador['empresaAsignada'] = 1;
    //$cadena_madurador['tipo'] = "Madurador";
    //$cadena_madurador['descripcion'] = "Sin Informacion";
    $latitud = $contenedor->latitud;
    $longitud = $contenedor->longitud ;
    if($latitud==0 &&$longitud==0){   
        $cadena_madurador['latitud'] = "-11.98025";
        $cadena_madurador['longitud'] = "-77.12261";
    }else{
        $cadena_madurador['latitud'] = $contenedor->latitud;
        $cadena_madurador['longitud'] = $contenedor->longitud ;
    }

    $existeContenedor = $api->comprobarContenedor($segundoFiltro);
    $cadena_madurador['telemetria_id'] =$existeContenedor['telemetria_id'];

    // vamos a recibir un variador en el json 

    $created_at= '2023-09-19 18:28';   
    //$R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);

      
 //$buscarUltimo = $api->buscarUltimo($telemetria_id);
 //$pre = $buscarUltimo['created_at'] ;
 $pre = $created_at;
 //$fechaaInicio1 =$pre.":00";
 //problemas con fecha 5 horas menos debe ser UTC-5
$fecha = $contenedor->fecha;

 $puntoA = strtotime($pre);
 $puntoA1 = strtotime("-5 hours",$puntoA)+($fecha*43);
 $puntoA2 = $puntoA1*1000;
 // aqui lo convertimos en formato mongo
 $convertido = new MongoDB\BSON\UTCDateTime($puntoA2);
 $cadena_madurador['created_at'] = $convertido;
 // para los id modificados 
 $cadena_madurador['id'] = 1+$fecha;
 $cursor  = $client->ztrack_ja->madurador->insertOne($cadena_madurador);
 $alerta  = " GUARDADO CORRECTAMENTE";

 echo $alerta;
        

}
?>
