<?php

$dominioPermitido = "http://161.132.206.105/";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');

ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

// necesarios del modelo 
require_once '../../models/api.php';
require_once '../../models/api2.php';
$api = new ApiModel();
$api2 = new ApiModel2();
$datosRecibidos = file_get_contents("php://input");
require '../../vendor/autoload.php';
//use Exception;
use MongoDB\Client;
use MongoDB\Driver\ServerApi;
use MongoDB\BSON\UTCDateTime ;
//$datosRecibidos ='{"tipo": "Madurador", "nombre_contenedor": "COMANDO_MADURADOR", "set_point": 28.0, "temp_supply_1": 5.0, "temp_supply_2": 0.0, "return_air": 0.0, "evaporation_coil": 0.0, "condensation_coil": 0.0, "compress_coil_1": 0.0, "compress_coil_2": 0.0, "ambient_air": 0.0, "cargo_1_temp": 0.0, "cargo_2_temp": 0.0, "cargo_3_temp": 0.0, "cargo_4_temp": 0.0, "relative_humidity": 50.0, "avl": 0.0, "suction_pressure": 0.0,"discharge_pressure": 0.0, "line_voltage": 0.0, "line_frequency": 0.0, "consumption_ph_1": 0.0, "consumption_ph_2": 0.0, "consumption_ph_3": 0.0, "co2_reading": 0.0, "o2_reading": 20.7, "evaporator_speed": 0.0, "condenser_speed": 0.0, "battery_voltage": 0.0, "power_kwh": 0.0, "power_trip_reading": 0.0, "power_trip_duration": 0.0, "suction_temp": 0.0, "discharge_temp": 0.0, "supply_air_temp": 0.0, "return_air_temp": 0.0, "dl_battery_temp": 0.0, "dl_battery_charge": 0.0, "power_consumption": 0.0, "power_consumption_avg": 0.0, "alarm_present": 0.0, "capacity_load": 0.0, "power_state": 0.0, "controlling_mode": "NA", "humidity_control": 0.0, "humidity_set_point": 1011010.0, "fresh_air_ex_mode": 0.0, "fresh_air_ex_rate": 0.0, "fresh_air_ex_delay": 0.0, "set_point_o2": 20.7, "set_point_co2": 3.0, "defrost_term_temp": 0.0, "defrost_interval": 0.0, "water_cooled_conde": 0.0, "usda_trip": 0.0, "evaporator_exp_valve": 0.0, "suction_mod_valve": 0.0, "hot_gas_valve": 0.0, "economizer_valve": 0.0, "ethylene": 0.0, "stateProcess": "RESET", "stateInyection": "NO INJECTING", "timerOfProcess": 0, "modelo": "THERMOKING2", "latitud": 0.0, "longitud": 0.0,"defrost_prueba":3,"ripener_prueba":3}';
//$datosRecibidos ='{"1B": "1B02", "tipo": "Madurador", "nombre_contenedor": "ZGRU4701435", "set_point": 19.0, "temp_supply_1": 21.3, "temp_supply_2": -3277.0, "return_air": 20.3, "evaporation_coil": 20.2, "condensation_coil": 43.6, "compress_coil_1": 57.2, "compress_coil_2": -3276.9, "ambient_air": 26.2, "cargo_1_temp": 0.0, "cargo_2_temp": 0.0, "cargo_3_temp": 0.0, "cargo_4_temp": 0.0, "relative_humidity": 82.0, "avl": 0.0, "suction_pressure": 3276.6, "discharge_pressure": 3276.6, "line_voltage": 463.0, "line_frequency": 60.0, "consumption_ph_1": 6.2, "consumption_ph_2": 7.7, "consumption_ph_3": 7.6, "co2_reading": 25.3, "o2_reading": 3276.6, "evaporator_speed": 30.0, "condenser_speed": 28.0, "battery_voltage": 4563.3, "power_kwh": 160.6, "power_trip_reading": 3276.6, "power_trip_duration": 3276.6, "suction_temp": 21.3, "discharge_temp": 20.3, "supply_air_temp": 0.24, "return_air_temp": 0.0, "dl_battery_temp": 1.95, "dl_battery_charge": 5.3, "power_consumption": 5.28, "power_consumption_avg": 32.0, "alarm_present": 32.0, "capacity_load": 32.0, "power_state": 32.0, "controlling_mode": 32.0, "humidity_control": 32.0, "humidity_set_point": 32766.0, "fresh_air_ex_mode": 3276.6, "fresh_air_ex_rate": 3276.6, "fresh_air_ex_delay": 3276.6, "set_point_o2": 18.0, "set_point_co2": 6.0, "defrost_term_temp": 6.0, "defrost_interval": 6.0, "water_cooled_conde": 255.0, "usda_trip": 255.0, "evaporator_exp_valve": 255.0, "suction_mod_valve": 255.0, "hot_gas_valve": 7.3, "economizer_valve": 7.28, "ethylene": 7.28, "stateProcess": 7.28, "stateInyection": 0.0, "timerOfProcess": 0.0, "modelo": "THERMOKING", "latitud": 0.0, "longitud": 0.0, "defrost_prueba": 2, "ripener_prueba": 2}';
//$datosRecibidos ='{"1B": "1B02", "tipo": "Madurador", "nombre_contenedor": "COMANDO_MADURADOR", "set_point": 19, "temp_supply_1": 17.5, "temp_supply_2": -3277.0, "return_air": 17.9, "evaporation_coil": 18.2, "condensation_coil": 40.3, "compress_coil_1": 59.4, "compress_coil_2": -3276.9, "ambient_air": 25.3, "cargo_1_temp": 0.0, "cargo_2_temp": 0.0, "cargo_3_temp": 0.0, "cargo_4_temp": 0.0, "relative_humidity": 74.0, "avl": 0.0, "suction_pressure": 3264.06, "discharge_pressure": 0.0, "line_voltage": 459.0, "line_frequency": 60.0, "consumption_ph_1": 9.0, "consumption_ph_2": 15.3, "consumption_ph_3": 15.5, "co2_reading": 25.3, "o2_reading": 3276.6, "evaporator_speed": 60.0, "condenser_speed": 30.0, "battery_voltage": 4553.9, "power_kwh": 151.3, "power_trip_reading": 3264.06, "power_trip_duration": 0.0, "suction_temp": 0.0, "discharge_temp": 17.9, "supply_air_temp": 0.24, "return_air_temp": 0.0, "dl_battery_temp": 9.8, "dl_battery_charge": 5.2, "power_consumption": 5.19, "power_consumption_avg": 30.0, "alarm_present": 30.0, "capacity_load": 30.0, "power_state": 30.0, "controlling_mode": 30.0, "humidity_control": 30.0, "humidity_set_point": 32766.0, "fresh_air_ex_mode": 3276.6, "fresh_air_ex_rate": 3276.6, "fresh_air_ex_delay": 0.0, "set_point_o2": 18.0, "set_point_co2": 6.0, "defrost_term_temp": 6.0, "defrost_interval": 6.0, "water_cooled_conde": 255.0, "usda_trip": 255.0, "evaporator_exp_valve": 255.0, "suction_mod_valve": 255.0, "hot_gas_valve": 6.3, "economizer_valve": 6.28, "ethylene": 6.28, "stateProcess": 6.28, "stateInyection": 0.0, "timerOfProcess": 0.0, "modelo": "THERMOKING", "latitud": 0.0, "longitud": 0.0, "defrost_prueba": 2, "ripener_prueba": 2}';

//$datosRecibidos ='{"B1": "1BA2", "tipo": "Madurador", "nombre_contenedor": "ZGRU9652669", "set_point": -25.0, "temp_supply_1": -28.1, "temp_supply_2": -3277.0, "return_air": -24.9, "evaporation_coil": -26.7, "condensation_coil": 25.1, "compress_coil_1": 78.0, "compress_coil_2": -3276.9, "ambient_air": 21.5, "cargo_1_temp": 0.0, "cargo_2_temp": -38.5, "cargo_3_temp": -38.5, "cargo_4_temp": -38.5, "relative_humidity": 65.0, "avl": 32766.0, "suction_pressure": 3276.6, "discharge_pressure": 3276.6, "line_voltage": 459.0, "line_frequency": 60.0, "consumption_ph_1": 0.0, "consumption_ph_2": 0.0, "consumption_ph_3": 0.0, "co2_reading": 25.4, "o2_reading": 3276.6, "evaporator_speed": 0.0, "condenser_speed": 0.0, "power_kwh": 10205.7, "power_trip_reading": 267.2, "suction_temp": 3276.6, "discharge_temp": 3276.6, "supply_air_temp": 6525.5, "return_air_temp": 6528.7, "dl_battery_temp": 28.45, "dl_battery_charge": 0.0, "power_consumption": 0.0, "power_consumption_avg": 1.23, "alarm_present": 0.0, "capacity_load": 48.0, "power_state": 1.0, "controlling_mode": 1.0, "humidity_control": 0.0, "humidity_set_point": 254.0, "fresh_air_ex_mode": 0.0, "fresh_air_ex_rate": 32766.0, "fresh_air_ex_delay": 3276.6, "set_point_o2": 3276.6, "set_point_co2": 3276.6, "defrost_term_temp": 18.0, "defrost_interval": 6.0, "water_cooled_conde": 0.0, "usda_trip": 0.0, "evaporator_exp_valve": 255.0, "suction_mod_valve": 255.0, "hot_gas_valve": 255.0, "economizer_valve": 255.0, "ethylene": 0.0, "stateProcess": 0.0, "stateInyection": 0.0, "timerOfProcess": 0.0, "battery_voltage": 0.0, "power_trip_duration": 0.0, "modelo": "THERMOKING", "latitud": 0.0, "longitud": 0.0, "sp_ethyleno": 0.0, "horas_inyeccion": 0.0, "pwm_inyeccion": 0.0, "defrost_prueba": 2.0, "ripener_prueba": 2.0}';

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
    $client->selectDatabase('ZTRACK_JA')->command(['ping' => 1]);
    //echo "Pinged your deployment. You successfully connected to MongoDB!\n";
} catch (Exception $e) {
    printf($e->getMessage());
}
//if($segundoFiltro=="PRUEBA12345"){
  //  $datosRecibidos10 = '{"B1": "1BA2", "tipo": "Madurador", "nombre_contenedor": "PRUEBA12345", "set_point": -25.0, "temp_supply_1": -13.6, "temp_supply_2": -3277.0, "return_air": -8.8, "evaporation_coil": -10.2, "condensation_coil": 32.9, "compress_coil_1": 49.7, "compress_coil_2": -3276.9, "ambient_air": 21.0, "cargo_1_temp": 0.0, "cargo_2_temp": -38.5, "cargo_3_temp": -38.5, "cargo_4_temp": -38.5, "relative_humidity": 94.0, "avl": 32766.0, "suction_pressure": 3276.6, "discharge_pressure": 3276.6, "line_voltage": 462.0, "line_frequency": 60.0, "consumption_ph_1": 9.8, "consumption_ph_2": 9.9, "consumption_ph_3": 9.9, "co2_reading": 25.4, "o2_reading": 3276.6, "evaporator_speed": 30.0, "condenser_speed": 100.0, "power_kwh": 212.2, "power_trip_reading": 208.4, "suction_temp": 3276.6, "discharge_temp": 3276.6, "supply_air_temp": 6540.0, "return_air_temp": 6544.8, "dl_battery_temp": 29.2, "dl_battery_charge": 0.0, "power_consumption": 6.32, "power_consumption_avg": 1.45, "alarm_present": 0.0, "capacity_load": 100.0, "power_state": 1.0, "controlling_mode": 1.0, "humidity_control": 0.0, "humidity_set_point": 254.0, "fresh_air_ex_mode": 0.0, "fresh_air_ex_rate": 32766.0, "fresh_air_ex_delay": 3276.6, "set_point_o2": 3276.6, "set_point_co2": 3276.6, "defrost_term_temp": 18.0, "defrost_interval": 6.0, "water_cooled_conde": 0.0, "usda_trip": 0.0, "evaporator_exp_valve": 255.0, "suction_mod_valve": 255.0, "hot_gas_valve": 255.0, "economizer_valve": 255.0, "ethylene": 0.0, "stateProcess": 0.0, "stateInyection": 0.0, "timerOfProcess": 0.0, "battery_voltage": 0.0, "power_trip_duration": 0.0, "modelo": "THERMOKING", "latitud": 0.0, "longitud": 0.0, "sp_ethyleno": 0.0, "horas_inyeccion": -1.0, "pwm_inyeccion": -1.0, "defrost_prueba": 2.0, "ripener_prueba": 2.0}';
   // $contenedor = json_decode($datosRecibidos10);
//}


if($primerFiltro =="Madurador"){

    $B1 =  $contenedor->B1;
    if($B1 =="1BC2"){
       $extra_1 = 1;
    }else{
       $extra_1 = 0;
    }

    $set_point =  $contenedor->set_point;
    $temp_supply_2 = $contenedor->temp_supply_2;
    $return_air = $contenedor->return_air;
    $evaporation_coil = $contenedor->evaporation_coil;
    $condensation_coil = $contenedor->condensation_coil;
    $compress_coil_1 = $contenedor->compress_coil_1;
    $compress_coil_2 = $contenedor->compress_coil_2;
    $ambient_air = $contenedor->ambient_air;
    $cargo_1_temp =  $contenedor->cargo_1_temp;
    $cargo_2_temp = $contenedor->cargo_2_temp;
    $cargo_3_temp = $contenedor->cargo_3_temp;
    $cargo_4_temp = $contenedor->cargo_4_temp;
    $relative_humidity = $contenedor->relative_humidity;
    $avl = $contenedor->avl;
    $suction_pressure = $contenedor->suction_pressure;
    $discharge_pressure = $contenedor->discharge_pressure;
    $line_voltage = $contenedor->line_voltage;
    $line_frequency = $contenedor->line_frequency;
    $consumption_ph_1 = $contenedor->consumption_ph_1;
   
    $consumption_ph_2 = $contenedor->consumption_ph_2;
    $consumption_ph_3 = $contenedor->consumption_ph_3;
    $co2_reading = $contenedor->co2_reading;
    $o2_reading = $contenedor->o2_reading;
    $evaporator_speed = $contenedor->evaporator_speed;
    $condenser_speed = $contenedor->condenser_speed;
    $battery_voltage = $contenedor->battery_voltage;
    $power_kwh = $contenedor->power_kwh;
    $power_trip_reading = $contenedor->power_trip_reading;
    $power_trip_duration = $contenedor->power_trip_duration;

    $suction_temp = $contenedor->suction_temp;
    $discharge_temp = $contenedor->discharge_temp;
    $supply_air_temp = $contenedor->supply_air_temp;
    $return_air_temp = $contenedor->return_air_temp;
    $dl_battery_temp = $contenedor->dl_battery_temp;
    $dl_battery_charge = $contenedor->dl_battery_charge;
    $power_consumption = $contenedor->power_consumption;
    $power_consumption_avg = $contenedor->power_consumption_avg;
    $alarm_present = $contenedor->alarm_present;
    $capacity_load = $contenedor->capacity_load;

    $power_state = $contenedor->power_state;
    $controlling_mode = $contenedor->controlling_mode;
    $humidity_control = $contenedor->humidity_control;
    $humidity_set_point = $contenedor->humidity_set_point;
    $fresh_air_ex_mode = $contenedor->fresh_air_ex_mode;
    $fresh_air_ex_rate = $contenedor->fresh_air_ex_rate;
    $fresh_air_ex_delay = $contenedor->fresh_air_ex_delay;
    $set_point_o2 = $contenedor->set_point_o2;
    $set_point_co2 = $contenedor->set_point_co2;
    $defrost_term_temp = $contenedor->defrost_term_temp;

    $defrost_interval = $contenedor->defrost_interval;
    $water_cooled_conde = $contenedor->water_cooled_conde;
    $usda_trip = $contenedor->usda_trip;
    $evaporator_exp_valve = $contenedor->evaporator_exp_valve;
    $suction_mod_valve = $contenedor->suction_mod_valve;
    $hot_gas_valve = $contenedor->hot_gas_valve;
    $economizer_valve = $contenedor->economizer_valve;
    $ethylene = $contenedor->ethylene;
    $stateProcess = $contenedor->stateProcess;
    $stateInyection = $contenedor->stateInyection;

    $timerOfProcess = $contenedor->timerOfProcess;
    $modelo = $contenedor->modelo; 

    $temp_supply_1 = $contenedor->temp_supply_1;
    $latitud = $contenedor->latitud;
    $longitud = $contenedor->longitud ;
    $nombrecontenedor = $contenedor->nombre_contenedor;


   // $latitud = 0;
   // $longitud = 0;


    $defrost_prueba = $contenedor->defrost_prueba;
    $ripener_prueba = $contenedor->ripener_prueba;
    //$inyeccion_hora = $contenedor->horas_inyeccion;
    //$inyeccion_pwm = $contenedor->pwn_inyeccion;
    //$sp_ethyleno =$contenedor->sp_ethyleno;


    //contar si existe en el control el dispositivo
    $contarControl = $api->existeEnControl($segundoFiltro);
    $fechaZ =date("Y-m-d H:i:s");    

    if($contarControl['count(*)'] != 0){
        // consulta de esos datos 
        $datosControl = $api->DatoEnControl($segundoFiltro);
        //identificamos el on/off
        //echo "sale : ".$power_state. " jaja";
        //echo print_r($datosControl);
       // echo "jajaja";
       $id_control =$datosControl['id'];
        if($power_state==1.00){
              //echo " dentro de power state";
              
            if($datosControl['estado_on']==$datosControl['estado_off']){
                
                // primero evaluamos que ambos ok y fail de temp esten iguales 
                if($datosControl['temp_ok']==$datosControl['temp_fail']){
                    if(($temp_supply_1-$set_point)>2){
                        // se actualiza el tempo_ok
                        //echo "se detecto inicio de tempertaura fuera de rango";
                        $t_ok = $api->actualizarTemp_ok($fechaZ,$id_control);

                    }else{
                        // actualizar hora de ultima conexion 
                        $t_conx = $api->ultima_conexion($fechaZ,$id_control);
                    }
                    // en caso estar en rango no actualizar
                    //echo "todo normal";

                }else{
                    if(($temp_supply_1-$set_point)>2){
                        // se actualiza temp_fail
                        //echo " se continua recibinedo tempertaura fuera de rango";                     
                        $t_fail = $api->actualizarTemp_fail($fechaZ,$id_control);

                    }else{
                        
                        // guardar evento en tabal de incidencias 
                        // en caso sea menor( volvio a rango) se actualiza los datos temp_ok =temp_fail
                        //insertar_evento($nombre_contenedor,$telemetria_id,$inicio,$fin ,$set_point_c,$control_id,$tipo_evento)
                        $tipo_evento = 2;
                        $nombre_contenedor = $datosControl['nombre_contenedor'];
                        $telemetria_id = $datosControl['telemetria_id'];
                        $inicio = $datosControl['temp_ok'];
                        $fin = $datosControl['temp_fail'];
                        $set_point_c = $datosControl['set_point_c'];
                        $control_id = $datosControl['id'];
                        $t_fail = $api->insertar_evento($nombre_contenedor,$telemetria_id,$inicio,$fin ,$set_point_c,$control_id,$tipo_evento);
                        // actualizo 

                        //echo " se detecto que temepratuar esta volvinedo al rango ";
                        $i_temp = $api->igual_temperatura($fechaZ,$id_control);
                        
                    }
                }
            }else{
              // registar evento de termino de apagdo 
              //actualizar e igualar estado_on = estado_off
              //echo " el estuvo apagado y se volvio a prender ";
              $tipo_evento = 3;
              $nombre_contenedor = $datosControl['nombre_contenedor'];
              $telemetria_id = $datosControl['telemetria_id'];
              $inicio = $datosControl['estado_on'];
              $fin = $datosControl['estado_off'];
              $set_point_c = $datosControl['set_point_c'];
              $control_id = $datosControl['id'];
              $t_fail = $api->insertar_evento($nombre_contenedor,$telemetria_id,$inicio,$fin ,$set_point_c,$control_id,$tipo_evento);

              $i_temp = $api->igual_encendido($fechaZ,$id_control);
            }
        }else{
            if($datosControl['estado_on']==$datosControl['estado_off']){
                // registrar  en estado_on el inico del apagado
               // echo "se ha detectado que el equipo se ha apagado";
                $actu_on = $api->actualizar_on($fechaZ,$id_control);

            }else{

                // registrar  en estado_off la siguinete trama  de apagado
                //echo " se detecta que el equipos sigue apagado";
                $actu_off = $api->actualizar_off($fechaZ,$id_control);

                //aqui podemos nalaizar y registrar que el equipo esta apagado or 2 , 3 , 4 , 5 ,6,7,8,9,10,11,12 horas
                /*
                $fechaOnInicio =$datosControl['estado_on'];
                $fechaOnFinal =$datosControl['estado_off'];

                $dt2 = strotime($fechaOnFinal);
                $dt1 = strotime($fechaOnInicio);
                $Alar1 = strotime("+2 hours",$dt1);
                $Alar1 = strotime("+3 hours",$dt1);
                $Alar1 = strotime("+4 hours",$dt1);
                $Alar1 = strotime("+6 hours",$dt1);
                $Alar1 = strotime("+8 hours",$dt1);
                */
                
                
                


            }

        }




    }
    //si existe evaluar on 



    if($B1 =="1B02" ){
        $sp_ethyleno =0;
        $inyeccion_hora = 0;
       $inyeccion_pwm = 0;
    }elseif($B1 =="1B92" ){
        $sp_ethyleno =$contenedor->sp_ethyleno;
        $inyeccion_hora = 0;
        $inyeccion_pwm = 0;
    }
    else{
        $sp_ethyleno =$contenedor->sp_ethyleno;
        $inyeccion_hora = $contenedor->horas_inyeccion;
        $inyeccion_pwm = $contenedor->pwm_inyeccion;
    }
    $empresaAsignada = 1;
    $tipo = "Madurador";
    $descripcion = "Sin Informacion";
    if($nombrecontenedor=="ZGRU9079131"|| $nombrecontenedor=="ZGRU3303096"){
        $latitud = "-11.98025";
        $longitud = "-77.12261";
    }    
    if($latitud==0 &&$longitud==0){
        $latitud = "-11.98025";
        $longitud = "-77.12261";
    }
    if($nombrecontenedor=='ZGRU7567785' ){
        $latitud = "-11.98016";
        $longitud = "-77.12271";
        $relative_humidity = 0;
    }
    if($nombrecontenedor=='ZGRU4701435'){
        $latitud = "-11.98016";
        $longitud = "-77.12271";
        //$relative_humidity = 0;
    }
    //Dispositivo de APEEL en Chiclayo
    if($nombrecontenedor=='ZGRU5100830'){
        $latitud = "-7.0684";
        $longitud = "-79.5591";
        //$relative_humidity = 0;
    }
    //Dispositvos en ESTADOS UNIDOS
    if($nombrecontenedor=='ZGRU2232647'){
        $latitud = "35.739611";
        $longitud = "-119.238378";
        //$relative_humidity = 0;
    }
    if($nombrecontenedor=='ZGRU1090804'){
        $latitud = "35.739611";
        $longitud = "-119.238378";
        //$relative_humidity = 0;
    }
    if($nombrecontenedor=='ZGRU2008220'){
        $latitud = "35.739411";
        $longitud = "-119.238278";
        //$relative_humidity = 0;
    }
    if($nombrecontenedor=='ZGRU2009227'){
        $latitud = "35.739511";
        $longitud = "-119.238278";
        //$relative_humidity = 0;
    }
    //BE FROST en Mexico
    if($nombrecontenedor=='ZGRU9802890'){
        $latitud = "21.85343";
        $longitud = "-100.89133";
    }
    if($nombrecontenedor=='ZGRU9803243'){
        $latitud = "21.85333";
        $longitud = "-100.89133";
    }
    if($nombrecontenedor=='ZGRU8707687'){
        $latitud = "-4.8972";
        $longitud = "-80.35127";
    }
    if($nombrecontenedor=='ZGRU2008200'){
        $latitud = "-12.1729";
        $longitud = "-77.012";
    }
    if($nombrecontenedor=='ZGRU5346143'){
        $latitud = "-4.9556";
        $longitud = "-80.6232";
    }

    if($nombrecontenedor=='ZGRU8750854' || $nombrecontenedor=='ZGRU5172768' || $nombrecontenedor=='ZGRU6853621' ){
        $latitud = "33.99877";
        $longitud = "-118.15819";
    }


    if($nombrecontenedor=='ZGRU8737338' || $nombrecontenedor=='ZGRU8731880'  ){
        $latitud = "33.14802";
        $longitud = "-117.23563";
    }
	if($nombrecontenedor=='ZGRU5114694'){
	$latitud = "-9.472510";
	$longitud="-78.281826";
	}

    //$alarm_number = $contenedor->alarm_number;
    $numero_telefono =  $contenedor->nombre_contenedor;
    $imei =  $contenedor->nombre_contenedor;
    $existeTelemetria =$api->existeTelemetria($imei);   
    $existeContenedor = $api->comprobarContenedor($segundoFiltro);
    $contarResultado = $api->contarContenedor($segundoFiltro);   
    //evaluamos la existencia de comandos  
    $contarComandosPendientes = $api->contarComandos($segundoFiltro);
    if($contarComandosPendientes['count(*)'] == 0){
        if($contarResultado['count(*)'] == 0){     
            $T = $api->saveTelemetria($numero_telefono, $imei);
            $existeTelemetria1 =$api->existeTelemetria($imei);
            $telemetria_id =$existeTelemetria1['id'];    
            $ultima_fecha =date("Y-m-d H:i:s");    
            $contError =0;   
            $set1 =  $contenedor->set_point;
            $ret1 = $contenedor->return_air;
            $eva1 = $contenedor->evaporation_coil;
            $amb1 = $contenedor->ambient_air;
            $rel1 = $contenedor->relative_humidity;
            $temp1= $contenedor->temp_supply_1;
            $ethy1 = $contenedor->ethylene;
            $co21 = $contenedor->co2_reading;
        
            if($set1 <-99 or $set1>99){

                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $set_point =0;
            }
            if($ret1 <-0 or $ret1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de return_air envia el 
               $return_air =0;
            }
            if($eva1 <-99 or $eva1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $evaporation_coil =0;
            }
            if($amb1 <-5 or $amb1>40){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $ambient_air =0;
            }
            if($rel1 <-99 or $rel1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $relative_humidity =0;
            }
            if($temp1 <-99 or $temp1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $temp_supply_1 =0;
            }
            if($ethy1 <-2 or $ethy1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $ethylene =0;
            }
            if($co21 <0 or $co21>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $co2_reading =0;
            }
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $direct = $api->directos($segundoFiltro);

            $C = $api->crearContenedorM($nombrecontenedor, $tipo,$descripcion,$telemetria_id,$set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha,$empresaAsignada,$defrost_prueba,$ripener_prueba,$extra_1,$sp_ethyleno);
            $created_at= date("Y-m-d H:i:s");
            //$R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$extra_1);
            $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);

        }else{
            $telemetria_id =$existeContenedor['telemetria_id'];
            $ultima_fecha =date("Y-m-d H:i:s");
            $contError =0;
            $set1 =  $contenedor->set_point;
            $ret1 = $contenedor->return_air;
            $eva1 = $contenedor->evaporation_coil;
            $amb1 = $contenedor->ambient_air;
            $rel1 = $contenedor->relative_humidity;
            $temp1= $contenedor->temp_supply_1;
            $co21 = $contenedor->co2_reading;
            $ethy1 = $contenedor->ethylene;
            $sp_ethyleno1 =$sp_ethyleno;
            if($ethy1 ==60){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verEthyleneM($telemetria_id);
               $ethylene =$respuesta['ethylene'];
            }else{
                if($ethy1 < 0 or $ethy1>300){
                    $contError =$contError +1;
                    // consulta al ultimo dato que este bien de set_point envia el 
                    $respuesta = $api->verEthyleneM($telemetria_id);
                    if(!$respuesta){
                        $ethylene =0;
                    }else{
                        $ethylene =$respuesta['ethylene'];
                    }
                   
                }
            }
            if($sp_ethyleno1 ==60){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSp_ethyleno($telemetria_id);
               $sp_ethyleno =$respuesta['sp_ethyleno'];
            }else{
                if($sp_ethyleno1 < -2 or $sp_ethyleno1>300){
                    $contError =$contError +1;
                    // consulta al ultimo dato que este bien de set_point envia el 
                    $respuesta = $api->verSp_ethyleno($telemetria_id);
                   $sp_ethyleno =$respuesta['sp_ethyleno'];
                }
            }
            if($set1 <-99 or $set1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_pointM($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            if($ret1 <-99 or $ret1>99){
                $contError =$contError +1;
                $respuesta = $api->verReturn_airM($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1 <-99 or $eva1>99){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coilM($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1 <-5 or $amb1>40){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_airM($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1 <-99 or $temp1>99){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supplyM($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply_1'];
            }
            if($rel1 <-99 or $rel1>99){
               $contError =$contError +1;
              // $respuesta = $api->verRelative_humidityM($telemetria_id);
               //$relative_humidity =$respuesta['relative_humidity'];
            }
            if($co21 <0 or $co21>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verCo2M($telemetria_id);
                $co2_reading =$respuesta['co2_reading'];
            }
            // filtramos valores que salgan 0 y dañenm la grafica 
            /*
            if($set1==0){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_pointM($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            */
            if($ret1==0){
                $contError =$contError +1;
                $respuesta = $api->verReturn_airM($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1==0){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coilM($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1==0){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_airM($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1==0){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supplyM($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply_1'];
            }
            if($rel1==0){
               $contError =$contError +1;
               $respuesta = $api->verRelative_humidityM($telemetria_id);
               $relative_humidity =$respuesta['relative_humidity'];
            }
            if($ethy1==0){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verEthyleneM($telemetria_id);
               $ethylene =0;
            }
            /*
            if($co21==0){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verCo2M($telemetria_id);
                $co2_reading =$respuesta['co2_reading'];
            }
            */
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $contDirect = $api->verDirectos($segundoFiltro);
    
            if($contDirect['count(*)'] == 0){
                $direct = $api->directos($segundoFiltro);
            }
            $C = $api->updateContenedorM($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha ,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$segundoFiltro);
            $created_at= date("Y-m-d H:i:s");   
            $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);
            // consultar ultimo dato agregado , buscar 
            // $buscarUltimo = $api->buscarUltimo($telemetria_id);
      
 $buscarUltimo = $api->buscarUltimo($telemetria_id);
 $pre = $buscarUltimo['created_at'] ;
 //$fechaaInicio1 =$pre.":00";
 //problemas con fecha 5 horas menos debe ser UTC-5
 $puntoA = strtotime($pre);
 $puntoA1 = strtotime("-5 hours",$puntoA)*1000;
 // aqui lo convertimos en formato mongo
 $convertido = new MongoDB\BSON\UTCDateTime($puntoA1);
 $buscarUltimo['created_at'] = $convertido;
 $cursor  = $client->ztrack_ja->madurador->insertOne($buscarUltimo);
        }
        $alerta  = " GUARDADO CORRECTAMENTE";
        
    $mensaje =" No existen comandos pendientes";
       //$mensaje = "SPETI(10),";
        //$mensaje = "POWERON,";
        //$mensaje ="SPTEMP(18,5)," ;
        if($nombrecontenedor=="ZGRU2012000"){
            #SOLO UN DECIMAL y los numeros flotantes con , 
            //$mensaje ="SPTEMP(17.5)," ;
            //$mensaje = "SPETI(3),";

        //$mensaje ="POWERON," ;
            
            //$mensaje ="No existen comandos pendientes";
        }
       // $mensaje = "SPETI(4),";
    }else{
         //pedir trama anterior del dispositivo para comparar
       
         $telemetria_id1 =$existeContenedor['telemetria_id'];
         //echo $telemetria_id1;
         $tramaAnterior = $api->tramaAnteriorM($telemetria_id1);
        // print_r($tramaAnterior);
        // tratamos los comandos pendientes
        $comandosPendientes = $api->comandosPendientes($segundoFiltro);
        foreach($comandosPendientes as $data){
            $detalleComando = $api->detalleComando($data['comando_id']);
            //print_r($detalleComando) ;
            $campo_relacionado = $detalleComando['campo_relacionado'];
            //echo $campo_relacionado;
            $valor_buscado = $data['valor_modificado'] ;
            $valor_anterior = $tramaAnterior[$campo_relacionado];
            $valor_trama = $contenedor->$campo_relacionado;
            $comando_I =$data['comando_id'];
            $valor_actual = $data['valor_actual'] ; 
            // echo " este es el valor buscado : ".$valor_buscado." y est es el valor anterior : ".$valor_anterior. " mas el valor en trama es : ".$valor_trama;
           //echo $valor_buscado.$valor_trama;
            if ($valor_buscado == $valor_trama ){
                //despues actualizar estado_comando a 0
                $actualizarComando = $api->actualizarComando($data['id']);
                /*
                if($actualizarComando==true){
                  echo "se actualizo el comando";
                  echo $segundoFiltro;
                }else{
                   echo "error en funcion";
                }
                */
            } 
            if ($comando_I ==10){
                if($valor_actual==$valor_trama){
                    $actualizarComando = $api->actualizarComando($data['id']);

                }else{
                    // bajamos un grado 
                    $nuevo_valor_actual = $valor_actual-1;
                    $actualizarValorActual = $api->actualizarValorActual($nuevo_valor_actual,$data['id']);
                }
            }         
        }
            $telemetria_id =$existeContenedor['telemetria_id'];
            $ultima_fecha =date("Y-m-d H:i:s");
            $contError =0;
            $set1 =  $contenedor->set_point;
            $ret1 = $contenedor->return_air;
            $eva1 = $contenedor->evaporation_coil;
            $amb1 = $contenedor->ambient_air;
            $rel1 = $contenedor->relative_humidity;
            $temp1= $contenedor->temp_supply_1;
            $ethy1 = $contenedor->ethylene;
            $co21 = $contenedor->co2_reading;
            $sp_ethyleno1 =$sp_ethyleno;
            if($ethy1 ==60){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verEthyleneM($telemetria_id);
               $ethylene =$respuesta['ethylene'];
            }else{
                if($ethy1 < 0 or $ethy1>300){
                    $contError =$contError +1;
                    // consulta al ultimo dato que este bien de set_point envia el 
                    $respuesta = $api->verEthyleneM($telemetria_id);
                   $ethylene =$respuesta['ethylene'];
                }
            }
            if($sp_ethyleno1 ==60){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSp_ethyleno($telemetria_id);
               $sp_ethyleno =$respuesta['sp_ethyleno'];
            }else{
                if($sp_ethyleno1 < 0 or $sp_ethyleno1>300){
                    $contError =$contError +1;
                    // consulta al ultimo dato que este bien de set_point envia el 
                    $respuesta = $api->verSp_ethyleno($telemetria_id);
                   $sp_ethyleno =$respuesta['sp_ethyleno'];
                }
            }
            if($co21 < 0 or $co21>100){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verCo2M($telemetria_id);
               $co2_reading =$respuesta['co2_reading'];
            }
            if($set1 <-99 or $set1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_pointM($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            if($ret1 <-99 or $ret1>99){
                $contError =$contError +1;
                $respuesta = $api->verReturn_airM($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1 <-99 or $eva1>99){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coilM($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1 <-5 or $amb1>40){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_airM($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1 <-99 or $temp1>99){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supplyM($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply'];
            }
            if($rel1 <-0 or $rel1>99){
               $contError =$contError +1;
               $respuesta = $api->verRelative_humidityM($telemetria_id);
               $relative_humidity =$respuesta['relative_humidity'];
            }
            // filtramos valores que salgan 0 y dañenm la grafica 
            if($set1==0){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_pointM($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            if($ret1==0){
                $contError =$contError +1;
                $respuesta = $api->verReturn_airM($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1==0){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coilM($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1==0){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_airM($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1==0){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supplyM($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply_1'];
            }
            if($rel1==0){
               $contError =$contError +1;
               $respuesta = $api->verRelative_humidityM($telemetria_id);
               $relative_humidity =$respuesta['relative_humidity'];
            }
            /*
            if($co21==0){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verCo2M($telemetria_id);
               $co2_reading =$respuesta['co2_reading'];
            }
            */
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $contDirect = $api->verDirectos($segundoFiltro);
            if($contDirect['count(*)'] == 0){
                $direct = $api->directos($segundoFiltro);
            }
            $C = $api->updateContenedorM($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha ,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$segundoFiltro);
            $created_at= date("Y-m-d H:i:s");   
            $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);
            
            $buscarUltimo = $api->buscarUltimo($telemetria_id);
            $pre = $buscarUltimo['created_at'] ;
            //$fechaaInicio1 =$pre.":00";
            //problemas con fecha 5 horas menos debe ser UTC-5
            $puntoA = strtotime($pre);
            $puntoA1 = strtotime("-5 hours",$puntoA)*1000;
            // aqui lo convertimos en formato mongo
            $convertido = new MongoDB\BSON\UTCDateTime($puntoA1);
            $buscarUltimo['created_at'] = $convertido; 
            $cursor  = $client->ztrack_ja->madurador->insertOne($buscarUltimo);
	  
//if($nombrecontenedor=="ZGRU1090804" || $nombrecontenedor=="ZGRU2232647" ||$nombrecontenedor=="ZGRU2009227"|| $nombrecontenedor=="ZGRU2008220"){
//crear base de datos de wonderfull por mes y codigo y año 
//$mes_fecha = date("n_Y");
//$base_de_mongo =$segundoFiltro."_".$mes_fecha;
//            $cursorW  = $client->$base_de_mongo->madurador->insertOne($buscarUltimo);
//$mensaje ="ENTRO EN WODERFUL";

//}   
            $comandosPendientesPost = $api->comandosPendientes($segundoFiltro);
            $contarComandosPendientesPost = $api->contarComandos($segundoFiltro);
            if($contarComandosPendientesPost['count(*)'] == 0){
                $trama_respuesta ="los cambios fueron detectados" ;

            }else{
                $trama_respuesta = "2B59";
                $trama_respuesta .=",".$segundoFiltro ;
                foreach($comandosPendientesPost as $data1){
                    $detalleComandopost = $api->detalleComando($data1['comando_id']);
                    if($detalleComandopost['lista']==1){
                        $trama_respuesta .=",SPTEMP(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost['lista']==2){
                        $trama_respuesta .=",SPCO2(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost['lista']==3){
                        $trama_respuesta .=",SPHUM(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost['lista']==6){
                        $trama_respuesta .=",SPETI(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost['lista']==5){
                        //$trama_respuesta .="POWER".$data1['valor_modificado'];
                        $trama_respuesta .=",POWEROFF";
                    }elseif($detalleComandopost['lista']==7){
                        $trama_respuesta .=",POWERON";
                    }elseif($detalleComandopost['lista']==8){
                        $trama_respuesta .=",DEFROST";
                    }else{
                        $trama_respuesta .=",#".$detalleComandopost['lista'].",".$data1['valor_modificado'];
                    }
                    
                }        

            }    


            //$trama_respuesta .=",";
            $comandosPendientesPost2 = $api2->comandosPendientes($segundoFiltro);
            $contarComandosPendientesPost2 = $api2->contarComandos($segundoFiltro);
            if($contarComandosPendientesPost2['count(*)'] != 0){
                foreach($comandosPendientesPost2 as $data1){
                    $detalleComandopost2 = $api2->detalleComando($data1['comando_id']);
                    if($detalleComandopost2['lista']==1){
                        $trama_respuesta .=",SPTEMP(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost2['lista']==2){
                        $trama_respuesta .=",SPCO2(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost2['lista']==3){
                        $trama_respuesta .=",SPHUM(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost2['lista']==6){
                        $trama_respuesta .=",SPETI(".$data1['valor_modificado'].")";
                    }elseif($detalleComandopost2['lista']==5){
                        //$trama_respuesta .="POWER".$data1['valor_modificado'];
                        $trama_respuesta .=",POWEROFF";
                    }elseif($detalleComandopost2['lista']==7){
                        $trama_respuesta .=",POWERON";
                    }elseif($detalleComandopost2['lista']==8){
                        $trama_respuesta .=",DEFROST";
                    }else{
                        $trama_respuesta .=",#".$detalleComandopost2['lista'].",".$data1['valor_modificado'];
                    }
                    
                } 

            }

           $mensaje = $trama_respuesta;
    }

if($nombrecontenedor=="ZGRU1090804" || $nombrecontenedor=="ZGRU2232647" ||$nombrecontenedor=="ZGRU2009227"|| $nombrecontenedor=="ZGRU2008220"){
//crear base de datos de wonderfull por mes y codigo y año
$mes_fecha = date("n_Y");
$base_de_mongo =$segundoFiltro."_".$mes_fecha;
  $cursorW  = $client->$base_de_mongo->madurador->insertOne($buscarUltimo);
//$mensaje ="ENTRO EN WODERFUL";

}else{

$mes_fecha = date("n_Y");
$base_de_mongo =$segundoFiltro."_".$mes_fecha;
  $cursorW  = $client->$base_de_mongo->madurador->insertOne($buscarUltimo);

}
    echo $mensaje;  
    //echo "RESET ";
}
?>
