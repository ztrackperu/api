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
$api = new ApiModel();
$datosRecibidos = file_get_contents("php://input");
//$datosRecibidos ='{"nombre_contenedor": "ZGUU2240406", "tipo": "Generador", "battery_voltage": 35.0, "water_temp": 71.7, "running_frequency": 59.3, "fuel_level": 182.1, "voltage_measure": 464.0, "rotor_current": 0.0, "fiel_current": 0.0, "speed": 0, "eco_power": 0, "rpm": 1780.0, "unit_mode": "LOW", "horometro": 5, "alarma_id": 0.0, "evento_id": 0.0, "modelo": "SG+", "latitud": "W1193.5954000000002", "longitud": "S7713.257500000001", "engine_state": "LOW", "set_point": 0.0, "temp_supply_1": 0.0, "return_air": 0.0, "reefer_conected": "-"}';

//$datosRecibidos = '{"1B": "1B50","nombre_contenedor": "ZGUUBEG987","horometro": 0,"engine_state": "INIT","speed": 0,"eco_power": 0,"unit_mode": "NOT DEFINED","voltage_measure": 0.00,"battery_voltage": 0.00,"water_temp": 0.00,"running_frequency": 0.00,"fuel_level": 0.00,"latitud": -11.935907,"longitud": -77.132431,"fecha_genset": "16:6:10 23/12/10","tipo": "Generador","rotor_current": 0,"fiel_current": 0,"rpm": 0,"alarma_id": 0,"evento_id": 0,"modelo": "SG+","set_point": 0,"temp_supply_1": 0,"return_air": 0,"reefer_conected": "-"}';

$generador = json_decode($datosRecibidos);
$primerFiltro = $generador->tipo ;
$segundoFiltro = $generador->nombre_contenedor;
$battery_voltage =  $generador->battery_voltage;
$water_temp = $generador->water_temp;
$running_frequency = $generador->running_frequency;
$fuel_level = $generador->fuel_level;
$voltage_measure =  $generador->voltage_measure;
$rotor_current = $generador->rotor_current;
$fiel_current = $generador->fiel_current;
$speed = $generador->speed;
$eco_power = $generador->eco_power;
$rpm = $generador->rpm;
$unit_mode = $generador->unit_mode;
$horometro =  $generador->horometro;
$alarma_id = $generador->alarma_id;
$evento_id = $generador->evento_id;
$modelo = $generador->modelo;
$latitud = $generador->latitud;
$longitud = $generador->longitud;
$engine_state = $generador->engine_state;
$set_point = $generador->set_point;
$temp_supply_1 = $generador->temp_supply_1;
$return_air = $generador->return_air;
$reefer_conected = $generador->reefer_conected;
$tipo = $primerFiltro;
$descripcion = "Sin Informacion";
/*
if($segundoFiltro="ZGRU0BTK718"){
    $latitud = "-12.1867";
    $longitud = "-76.9741";
}
*/
/*
if($latitud==0 &&$longitud==0){
    $latitud = "-11.98025";
    $longitud = "-77.12261";
}
*/
if($primerFiltro =="Generador"){
    $existeGenerador = $api->comprobarGenerador($segundoFiltro);
    $contarResultado = $api->contarGenerador($segundoFiltro);
    if($contarResultado['count(*)'] == 0){
        // al no haber contenedor registrado
        //se crea una telemetria por defecto con el nombre del contenedor
        $bat1 =  $generador->battery_voltage;
        $wat1 = $generador->water_temp;
        $run1 = $generador->running_frequency;
        $fuel1 = $generador->fuel_level;
        $vol1 = $generador->voltage_measure;
        $rot1= $generador->rotor_current;
        $rpm1 = $generador->$rpm;
        if($bat1 <-0.1 or $bat1>15){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
           $battery_voltage =0;
        }
        if($wat1 <-0.1 or $wat1>150){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $water_temp =0;
        }
        if($run1 <-0.1 or $run1>70){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
           $running_frequency =0;
        }
        if($fuel1 <-0.1 or $fuel1>200){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $fuel_level =0;
        }
        if($vol1 <-0.1 or $vol1>500){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $voltage_measure =0;
        }
        if($rot1 <-0.1 or $rot1>50){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
           $rotor_current =0;
        }
        if($rpm1 <-0.1 or $rpm1>2000){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $rpm =0;
        } 
        $numero_telefono =  $generador->nombre_contenedor;
        $imei =  $generador->nombre_contenedor;  
        $T = $api->saveTelemetria($numero_telefono, $imei);
        $existeTelemetria =$api->existeTelemetria($imei);
        //aqui se capturaq el id de la telemetria que se acaba de guardar
        $telemetria_id =$existeTelemetria['id'];
        //datos a guardar en tabla generadores  
        $fecha_ultima =date("Y-m-d H:i:s");        
        $C = $api->crearGeneradorM($segundoFiltro,$tipo , $descripcion,$telemetria_id,$battery_voltage,$water_temp,$running_frequency,$fuel_level,$voltage_measure,$rotor_current,$fiel_current ,$speed, $eco_power,$rpm,$unit_mode,$horometro,$alarma_id,$evento_id,$modelo,$latitud,$longitud,$engine_state,$set_point,$temp_supply_1,$return_air,$reefer_conected,$fecha_ultima);
        $R = $api->crearTramaGenerador($battery_voltage, $water_temp,$running_frequency,$fuel_level,$voltage_measure,$rotor_current,$fiel_current,$speed,$eco_power,$rpm , $unit_mode,$horometro,$alarma_id,$evento_id,$modelo , $latitud ,$longitud,$engine_state,$set_point,$temp_supply_1 ,$return_air,$reefer_conected, $fecha_ultima ,$telemetria_id);        
    }else{
        $telemetria_id =$existeGenerador['telemetria_id'];
        $bat1 =  $generador->battery_voltage;
        $wat1 = $generador->water_temp;
        $run1 = $generador->running_frequency;
        $fuel1 = $generador->fuel_level;
        $vol1 = $generador->voltage_measure;
        $rot1= $generador->rotor_current;
        $rpm1 = $generador->rpm;
 
        if($bat1 <-0.1 or $bat1>15){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
            $respuesta = $api->verBattery_VoltageM($telemetria_id);
            $battery_voltage =$respuesta['battery_voltage'];
        }
        if($wat1 <-0 or $wat1>150){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $respuesta = $api->verWater_TempM($telemetria_id);
           $water_temp =$respuesta['water_temp'];
        }
        if($run1 <-0.1 or $run1>70){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
           $respuesta = $api->verRunning_FrequencyM($telemetria_id);
           $running_frequency =$respuesta['running_frequency'];
           
        }
        if($fuel1 <-0 or $fuel1>200){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $respuesta = $api->verFuel_LevelM($telemetria_id);
           $fuel_level =$respuesta['fuel_level'];
        }
        if($vol1 <-0 or $vol1>500){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $respuesta = $api->verVoltage_MeasureM($telemetria_id);
           $voltage_measure =$respuesta['voltage_measure'];
        }
        if($rot1 <-0.1 or $rot1>50){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de set_point envia el 
           $respuesta = $api->verRotor_CurrentM($telemetria_id);
           $rotor_current =$respuesta['rotor_current'];
        }
        if($rpm1 <-0 or $rpm1>2000){
            $contError =$contError +1;
            // consulta al ultimo dato que este bien de return_air envia el 
           $respuesta = $api->verRpmM($telemetria_id);
           $rpm =$respuesta['rpm'];
        }      
        $fecha_ultima =date("Y-m-d H:i:s");
        $C = $api->updateGeneradorM($battery_voltage, $water_temp,$running_frequency,$fuel_level,$voltage_measure,$rotor_current,$fiel_current,$speed,$eco_power,$rpm , $unit_mode,$horometro,$alarma_id,$evento_id,$modelo , $latitud ,$longitud,$engine_state,$set_point,$temp_supply_1 ,$return_air,$reefer_conected ,$fecha_ultima ,$segundoFiltro);
        $R = $api->crearTramaGenerador($battery_voltage, $water_temp,$running_frequency,$fuel_level,$voltage_measure,$rotor_current,$fiel_current,$speed,$eco_power,$rpm , $unit_mode,$horometro,$alarma_id,$evento_id,$modelo ,$latitud ,$longitud,$engine_state,$set_point,$temp_supply_1 ,$return_air,$reefer_conected, $fecha_ultima ,$telemetria_id);
    }
}
      $respuesta = [
          "mensaje" => "DESDE SERVIDOR DE ZGROUP",
          "nombre" => $generador->nombre_contenedor,
              "cadena" =>[
                      'tipo' =>  $generador->tipo,
                      'nombre_contenedor' => $generador->nombre_contenedor
              ],
              "fechaYHora" => date("Y-m-d H:i:s")
          ];      
          $respuestaCodificada = json_encode($respuesta);
          echo $respuestaCodificada; 
?>
