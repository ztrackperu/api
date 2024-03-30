<?php
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');

// necesarios del modelo 
require_once '../../models/api.php';
$api = new ApiModel();
$datosRecibidos = file_get_contents("php://input");
//$datosRecibidos ='{"tipo": "Madurador", "nombre_contenedor": "AGRUM2245761", "set_point": 28.0, "temp_supply_1": 5.0, "temp_supply_2": 0.0, "return_air": 0.0, "evaporation_coil": 0.0, "condensation_coil": 0.0, "compress_coil_1": 0.0, "compress_coil_2": 0.0, "ambient_air": 0.0, "cargo_1_temp": 0.0, "cargo_2_temp": 0.0, "cargo_3_temp": 0.0, "cargo_4_temp": 0.0, "relative_humidity": 50.0, "avl": 0.0, "suction_pressure": 0.0,"discharge_pressure": 0.0, "line_voltage": 0.0, "line_frequency": 0.0, "consumption_ph_1": 0.0, "consumption_ph_2": 0.0, "consumption_ph_3": 0.0, "co2_reading": 0.0, "o2_reading": 20.7, "evaporator_speed": 0.0, "condenser_speed": 0.0, "battery_voltage": 0.0, "power_kwh": 0.0, "power_trip_reading": 0.0, "power_trip_duration": 0.0, "suction_temp": 0.0, "discharge_temp": 0.0, "supply_air_temp": 0.0, "return_air_temp": 0.0, "dl_battery_temp": 0.0, "dl_battery_charge": 0.0, "power_consumption": 0.0, "power_consumption_avg": 0.0, "alarm_present": 0.0, "capacity_load": 0.0, "power_state": 0.0, "controlling_mode": "NA", "humidity_control": 0.0, "humidity_set_point": 1011010.0, "fresh_air_ex_mode": 0.0, "fresh_air_ex_rate": 0.0, "fresh_air_ex_delay": 0.0, "set_point_o2": 20.7, "set_point_co2": 3.0, "defrost_term_temp": 0.0, "defrost_interval": 0.0, "water_cooled_conde": 0.0, "usda_trip": 0.0, "evaporator_exp_valve": 0.0, "suction_mod_valve": 0.0, "hot_gas_valve": 0.0, "economizer_valve": 0.0, "ethylene": 0.0, "stateProcess": "RESET", "stateInyection": "NO INJECTING", "timerOfProcess": 0, "modelo": "THERMOKING2", "latitud": 0.0, "longitud": 0.0}';
    
$contenedor = json_decode($datosRecibidos);
$primerFiltro = $contenedor->tipo ;
$segundoFiltro = $contenedor->nombre_contenedor;

if($primerFiltro =="Madurador"){
    
    $existeContenedor = $api->comprobarContenedor($segundoFiltro);
    $contarResultado = $api->contarContenedor($segundoFiltro);
    echo $contarResultado['count(*)'];
    //echo print_r($contarResultado);
    //$contador_fila =$existeContenedor->num_rows;
   
    // LISTA DE DATOS A INCORPORAR
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

    $defrost_prueba = $contenedor->defrost_prueba;
    $ripener_prueba = $contenedor->ripener_prueba;

    $empresaAsignada = 1;
    $tipo = "Madurador";
    $descripcion = "Sin Informacion";
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

    if($contarResultado['count(*)'] == 0){
        // al no haber contenedor registrado
        //se crea una telemetria por defecto con el nombre del contenedor       
        $numero_telefono =  $contenedor->nombre_contenedor;
        $imei =  $contenedor->nombre_contenedor;   
        $T = $api->saveTelemetria($numero_telefono, $imei);

        $existeTelemetria =$api->existeTelemetria($imei);
        $telemetria_id =$existeTelemetria['id'];
        //datos a guardar en tabla contenedores 

        $telemetria_id = $telemetria_id;
        $direct = $api->directos($segundoFiltro);

        $ultima_fecha =date("Y-m-d H:i:s");  
        $C = $api->crearContenedorM($nombrecontenedor, $tipo,$descripcion,$telemetria_id,$set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha,$empresaAsignada,$defrost_prueba,$ripener_prueba);
        $created_at= date("Y-m-d H:i:s");
        $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba);

        //$set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id);
    }else{
        $telemetria_id =$existeContenedor['telemetria_id'];

        $contDirect = $api->verDirectos($segundoFiltro);

        if($contDirect['count(*)'] == 0){
            $direct = $api->directos($segundoFiltro);
        }
        

        $ultima_fecha =date("Y-m-d H:i:s");
        $C = $api->updateContenedorM($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha ,$defrost_prueba,$ripener_prueba,$segundoFiltro);
        $created_at= date("Y-m-d H:i:s");   
        $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba);


    }
   $alerta  = " GUARDADO CORRECTAMENTE";
}
else{
   $alerta = "UN ERROR DE TIPO  ";
}
       
      $respuesta = [
          "mensaje" => "DESDE SERVIDOR DE ZGROUP",
          "Alerta" => $alerta,
          "nombre" => $segundoFiltro,
              "cadena" =>[
                      'tipo' =>  $primerFiltro
           
              ],
              "fechaYHora" => date("Y-m-d H:i:s")
          ];
          
          $respuestaCodificada = json_encode($respuesta);
          echo $respuestaCodificada;
          

?>



