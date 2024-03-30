<?php

$dominioPermitido = "http://161.132.206.105/";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");



header('Content-type: application/json; charset=utf-8');


//header('Content-type: application/json; charset=utf-8');
// necesarios del modelo


ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


 
require_once '../../models/api.php';
$api = new ApiModel();
$datosRecibidos = file_get_contents("php://input");
//$datosRecibidos ='{"tipo": "Reefer", "nombre_contenedor": "PRUEBA_COMANDO", "set_point": -11, "temp_supply_1": -197.8, "return_air": -123.1, "evaporation_coil": -223.0, "ambient_air": 129.0, "cargo_1_temp": -3277.0, "cargo_2_temp": -3277.0, "cargo_3_temp": -3277.0, "cargo_4_temp": -3277.0, "relative_humidity": 181.0, "alarm_present": 0, "alarm_number": 0, "controlling_mode": "OPTIMIZED", "power_state": 1, "defrost_term_temp": 18.0,"defrost_interval": 6.0, "latitud": -12.6342, "longitud": -78.0567}';

//$datosRecibidos ='{"1B": "1B02", "tipo": "Madurador", "nombre_contenedor": "ZGRU4701435", "set_point": 19.0, "temp_supply_1": 21.3, "temp_supply_2": -3277.0, "return_air": 20.3, "evaporation_coil": 20.2, "condensation_coil": 43.6, "compress_coil_1": 57.2, "compress_coil_2": -3276.9, "ambient_air": 26.2, "cargo_1_temp": 0.0, "cargo_2_temp": 0.0, "cargo_3_temp": 0.0, "cargo_4_temp": 0.0, "relative_humidity": 82.0, "avl": 0.0, "suction_pressure": 3276.6, "discharge_pressure": 3276.6, "line_voltage": 463.0, "line_frequency": 60.0, "consumption_ph_1": 6.2, "consumption_ph_2": 7.7, "consumption_ph_3": 7.6, "co2_reading": 25.3, "o2_reading": 3276.6, "evaporator_speed": 30.0, "condenser_speed": 28.0, "battery_voltage": 4563.3, "power_kwh": 160.6, "power_trip_reading": 3276.6, "power_trip_duration": 3276.6, "suction_temp": 21.3, "discharge_temp": 20.3, "supply_air_temp": 0.24, "return_air_temp": 0.0, "dl_battery_temp": 1.95, "dl_battery_charge": 5.3, "power_consumption": 5.28, "power_consumption_avg": 32.0, "alarm_present": 32.0, "capacity_load": 32.0, "power_state": 32.0, "controlling_mode": 32.0, "humidity_control": 32.0, "humidity_set_point": 32766.0, "fresh_air_ex_mode": 3276.6, "fresh_air_ex_rate": 3276.6, "fresh_air_ex_delay": 3276.6, "set_point_o2": 18.0, "set_point_co2": 6.0, "defrost_term_temp": 6.0, "defrost_interval": 6.0, "water_cooled_conde": 255.0, "usda_trip": 255.0, "evaporator_exp_valve": 255.0, "suction_mod_valve": 255.0, "hot_gas_valve": 7.3, "economizer_valve": 7.28, "ethylene": 7.28, "stateProcess": 7.28, "stateInyection": 0.0, "timerOfProcess": 0.0, "modelo": "THERMOKING", "latitud": 0.0, "longitud": 0.0, "defrost_prueba": 2, "ripener_prueba": 2}';
$contenedor = json_decode($datosRecibidos);
$primerFiltro = $contenedor->tipo ;
$segundoFiltro = $contenedor->nombre_contenedor;

if($primerFiltro =="Reefer"){
    $temp_supply_1 = $contenedor->temp_supply_1;
    $latitud = $contenedor->latitud;
    $longitud = $contenedor->longitud ;
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
    $nombrecontenedor = $contenedor->nombre_contenedor;
    $tipo = "Reefer";
    $descripcion = "Sin Informacion";
    $empresaAsignada =  1;
    if($nombrecontenedor=='ZGRU2212229'){
        $latitud = "-12.0060";
        $longitud = "-77.0603";
    }
    if($nombrecontenedor=='ZGRU5346143'){
        $nombrecontenedor='LOSU5346143';
    }
    if($nombrecontenedor=='LOSU4764023'){
        $latitud = "-11.98025";
        $longitud = "-77.12261";
    }
    if($nombrecontenedor=='LOSU6844452'){
        $latitud = "-11.98025";
        $longitud = "-77.12261";
    }
    if($nombrecontenedor=='ZGRU5181549'){
        $latitud = "-8.560359";
        $longitud = "-78.665961";
    }
    if($latitud==0 &&$longitud==0){
        $latitud = "-11.98025";
        $longitud = "-77.12261";
    }
    $numero_telefono =  $contenedor->nombre_contenedor;
    $imei =  $contenedor->nombre_contenedor;
    if( $nombrecontenedor=='LOSU5346143'){
        $existeTelemetria =$api->existeTelemetria($nombrecontenedor);      
        $existeContenedor = $api->comprobarContenedor($nombrecontenedor);
        $contarResultado = $api->contarContenedor($nombrecontenedor);
        $segundoFiltro = $nombrecontenedor;

    }else{
        $existeTelemetria =$api->existeTelemetria($imei);   
        $existeContenedor = $api->comprobarContenedor($segundoFiltro);
        $contarResultado = $api->contarContenedor($segundoFiltro);
    }
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
        
            if($set1 <-99 or $set1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
               $set_point =0;
            }
            if($ret1 <-99 or $ret1>99){
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
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $direct = $api->directos($segundoFiltro);
    
            $C = $api->crearContenedorR($nombrecontenedor, $tipo,$descripcion,$telemetria_id,$set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$ultima_fecha,$empresaAsignada);
         
            $created_at= date("Y-m-d H:i:s");   
            $R = $api->crearTramaReffer($set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$created_at,$telemetria_id);
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
            if($set1 <-99 or $set1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_point($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            if($ret1 <-99 or $ret1>99){
                $contError =$contError +1;
                $respuesta = $api->verReturn_air($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1 <-99 or $eva1>99){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coil($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1 <-5 or $amb1>40){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_air($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1 <-99 or $temp1>99){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supply($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply'];
            }
            if($rel1 <-99 or $rel1>99){
               $contError =$contError +1;
               $respuesta = $api->verRelative_humidity($telemetria_id);
               $relative_humidity =$respuesta['relative_humidity'];
            }
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $contDirect = $api->verDirectos($segundoFiltro);
    
            if($contDirect['count(*)'] == 0){
                $direct = $api->directos($segundoFiltro);
            }
    
            $C = $api->updateContenedorR( $set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud, $ultima_fecha ,$segundoFiltro);
            
            $created_at= date("Y-m-d H:i:s");
            $R = $api->crearTramaReffer($set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$created_at,$telemetria_id);
    
        }
        $alerta  = " GUARDADO CORRECTAMENTE";
        $mensaje ="No existen comandos pendientes";
    }else{
         //pedir trama anterior del dispositivo para comparar
         $telemetria_id1 =$existeContenedor['telemetria_id'];
         $tramaAnterior = $api->tramaAnterior($telemetria_id1);
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
           // echo " este es el valor buscado : ".$valor_buscado." y est es el valor anterior : ".$valor_anterior. " mas el valor en trama es : ".$valor_trama;
            if ($valor_buscado == $valor_trama ){
                
                //despues actualizar estado_comando a 0
                $actualizarComando = $api->actualizarComando($data['id']);
                $mensaje = "la modificacion ha sido detectada";
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
            if($set1 <-99 or $set1>99){
                $contError =$contError +1;
                // consulta al ultimo dato que este bien de set_point envia el 
                $respuesta = $api->verSet_point($telemetria_id);
               $set_point =$respuesta['set_point'];
            }
            if($ret1 <-99 or $ret1>99){
                $contError =$contError +1;
                $respuesta = $api->verReturn_air($telemetria_id);
               $return_air =$respuesta['return_air'];
            }
            if($eva1 <-99 or $eva1>99){
                $contError =$contError +1;
                $respuesta = $api->verEvaporation_coil($telemetria_id);
               $evaporation_coil =$respuesta['evaporation_coil'];
            }
            if($amb1 <-5 or $amb1>40){
                $contError =$contError +1;
                $respuesta = $api->verAmbient_air($telemetria_id);
                $ambient_air =$respuesta['ambient_air'];
            }
            if($temp1 <-99 or $temp1>99){
                $contError =$contError +1;
                $respuesta = $api->verTemp_supply($telemetria_id);
               $temp_supply_1 =$respuesta['temp_supply'];
            }
            if($rel1 <-99 or $rel1>99){
               $contError =$contError +1;
               $respuesta = $api->verRelative_humidity($telemetria_id);
               $relative_humidity =$respuesta['relative_humidity'];
            }
            if ($contError>0){
                $er = $api->error_trama($datosRecibidos);
            }
            $contDirect = $api->verDirectos($segundoFiltro);
    
            if($contDirect['count(*)'] == 0){
                $direct = $api->directos($segundoFiltro);
            }
            $C = $api->updateContenedorR( $set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud, $ultima_fecha ,$segundoFiltro);       
            $created_at= date("Y-m-d H:i:s");
            $R = $api->crearTramaReffer($set_point, $temp_supply_1,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$created_at,$telemetria_id);
            $comandosPendientesPost = $api->comandosPendientes($segundoFiltro);
            $contarComandosPendientesPost = $api->contarComandos($segundoFiltro);
            if($contarComandosPendientesPost['count(*)'] == 0){
                $trama_respuesta ="los cambios fueron detectados" ;
            }else{
                $trama_respuesta = "2B59";
                $trama_respuesta .=",".$segundoFiltro ;
                foreach($comandosPendientesPost as $data1){
                    $detalleComandopost = $api->detalleComando($data1['comando_id']);
                    $trama_respuesta .=",#".$detalleComandopost['lista'].",".$data1['valor_modificado'];
    
                }
                $trama_respuesta .="&";
            }


           $mensaje = $trama_respuesta;
    }
    echo $mensaje;  
 
}

?>
