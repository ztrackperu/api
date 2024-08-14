  <?php
// estamos en otra forma directa 
$dominioPermitido = "http://161.132.206.105/";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('America/Lima');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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
$contenedor = json_decode($datosRecibidos);
$primerFiltro = $contenedor->tipo ;
$segundoFiltro = $contenedor->nombre_contenedor;

$uri = 'mongodb://localhost:27017';
// Specify Stable API version 1
$apiVersion = new ServerApi(ServerApi::V1);
// Create a new client and connect to the server
$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);

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
    $defrost_prueba = $contenedor->defrost_prueba;
    $ripener_prueba = $contenedor->ripener_prueba;
    //contar si existe en el control el dispositivo
    $contarControl = $api->existeEnControl($segundoFiltro);
    $fechaZ =date("Y-m-d H:i:s");    
    if($contarControl['count(*)'] != 0){
        // consulta de esos datos 
        $datosControl = $api->DatoEnControl($segundoFiltro);
       $id_control =$datosControl['id'];
        if($power_state==1.00){
            if($datosControl['estado_on']==$datosControl['estado_off']){              
                // primero evaluamos que ambos ok y fail de temp esten iguales 
                if($datosControl['temp_ok']==$datosControl['temp_fail']){
                    if(($temp_supply_1-$set_point)>2){         
                        // se actualiza el tempo_ok//echo "se detecto inicio de tempertaura fuera de rango";
                        $t_ok = $api->actualizarTemp_ok($fechaZ,$id_control);
                    }else{
                        // actualizar hora de ultima conexion 
                        $t_conx = $api->ultima_conexion($fechaZ,$id_control);
                    }
                    // en caso estar en rango no actualizar //echo "todo normal";
                }else{
                    if(($temp_supply_1-$set_point)>2){
                        //echo " se continua recibinedo tempertaura fuera de rango"; // se actualiza temp_fail                
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
                        //echo " se detecto que temepratuar esta volvinedo al rango "; v
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
                // registrar  en estado_on el inico del apagado  // echo "se ha detectado que el equipo se ha apagado";
                $actu_on = $api->actualizar_on($fechaZ,$id_control);
            }else{
                // registrar  en estado_off la siguinete trama  de apagado ////echo " se detecta que el equipos sigue apagado";
                $actu_off = $api->actualizar_off($fechaZ,$id_control);        
            }
        }
    }
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
    if($nombrecontenedor=='ZGRU8747308' || $nombrecontenedor=='ZGRU8756260' ||$nombrecontenedor=='ZGRU3303096' || $nombrecontenedor=='ZGRU7551406' || $nombrecontenedor=='ZGRU1268663' ){
        $latitud = "-12.05479";
        $longitud = "-76.96781";
        
    }
	if($nombrecontenedor=='ZGRU5114694'){
	$latitud = "-9.472510";
	$longitud="-78.281826";
	}
    if($nombrecontenedor=='ZGRU1011436' || $nombrecontenedor=='ZGRU1011456'||$nombrecontenedor=='ZGRU1011452'||$nombrecontenedor=='ZGRU1011449'||$nombrecontenedor=='ZGRU1011451'||$nombrecontenedor=='ZGRU8708448'||$nombrecontenedor=='ZGRU8718826'){
        $latitud = "27.739717";
        $longitud="-80.658852";
    }
    if($nombrecontenedor=='ZGRU6357290' || $nombrecontenedor=='ZGRU5014794'){
        $latitud = "-12.210452";
        $longitud="-76.96628";
    }

    if($nombrecontenedor=='ZGRU8702406' || $nombrecontenedor=='ZGRU2011230'||$nombrecontenedor=='ZGRU9017551'){
        $latitud ="-12.196373";
        $longitud="-77.011536";
    }
    if($nombrecontenedor=='ZGRU0073765' || $nombrecontenedor=='ZGRU1139619' || $nombrecontenedor=='ZGRU9044691'){
        $latitud ="-5.18607";
        $longitud="-80.64331";
    } 
    if($nombrecontenedor=='ZGRU8708092' || $nombrecontenedor=='ZGRU6844452'||$nombrecontenedor=='ZGRU8735478'){
        $latitud ="-12.17264";
        $longitud="-76.99242";
    } 
    if($nombrecontenedor=='ZGRU4812899'){
	    $latitud = "-11.093684";
	    $longitud="-77.586722";
	}
    if($nombrecontenedor=='ZGRU6253228' || $nombrecontenedor=='ZGRU2014239' || $nombrecontenedor=='ZGRU1012750'){
	    $latitud = "-11.93982";
	    $longitud="-77.07029";
	}

    if($nombrecontenedor=='ZGRU9026566'){
	    $latitud = "39.90904";
	    $longitud="-75.22086";
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
            $er = $api->error_trama($datosRecibidos);
            $direct = $api->directos($segundoFiltro);
            $C = $api->crearContenedorM($nombrecontenedor, $tipo,$descripcion,$telemetria_id,$set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha,$empresaAsignada,$defrost_prueba,$ripener_prueba,$extra_1,$sp_ethyleno);
            $created_at= date("Y-m-d H:i:s");
            $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);
        }else{
            $telemetria_id =$existeContenedor['telemetria_id'];
            $ultima_fecha =date("Y-m-d H:i:s");
            $er = $api->error_trama($datosRecibidos);
            $contDirect = $api->verDirectos($segundoFiltro);   
            if($contDirect['count(*)'] == 0){
                $direct = $api->directos($segundoFiltro);
            }
            $C = $api->updateContenedorM($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha ,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$segundoFiltro);
            $created_at= date("Y-m-d H:i:s");   
            $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1); 
            $buscarUltimo = $api->buscarUltimo($telemetria_id);
            $pre = $buscarUltimo['created_at'] ;
            //problemas con fecha 5 horas menos debe ser UTC-5
            $puntoA = strtotime($pre);
            $puntoA1 = strtotime("-5 hours",$puntoA)*1000;
            // aqui lo convertimos en formato mongo
            $convertido = new MongoDB\BSON\UTCDateTime($puntoA1);
            $buscarUltimo['created_at'] = $convertido;
            $cursor  = $client->ztrack_ja->madurador->insertOne($buscarUltimo);
        }
        $mensaje =" No existen comandos pendientes";
        if($nombrecontenedor=="ZGRU9026566"){
            #SOLO UN DECIMAL y los numeros flotantes con , 
            //$mensaje ="SPTEMP(17.5)," ;//$mensaje = "SPETI(3),";//$mensaje ="POWERON," ;           
            //$mensaje ="No existen comandos pendientes";
            //$mensaje ="AFAMNORMAL ";
            //$mensaje ="OPEN150 ";

        }
        //pedir trama anterior del dispositivo para comparar      
        $telemetria_id2 =$existeContenedor['telemetria_id'];
        $tramaAnterior2 = $api->tramaAnteriorM($telemetria_id2);
        // tratamos los comandos pendientes
        $comandosPendientes2 = $api2->comandosPendientes($segundoFiltro);
        foreach($comandosPendientes2 as $data){
            $detalleComando = $api2->detalleComando($data['comando_id']);
            $campo_relacionado = $detalleComando['campo_relacionado'];
            $valor_buscado = $data['valor_modificado'] ;
            $valor_anterior = $tramaAnterior2[$campo_relacionado];
            $valor_trama = $contenedor->$campo_relacionado;
            $comando_I =$data['comando_id'];
            $valor_actual = $data['valor_actual'] ; 
            if ($valor_buscado == $valor_trama ){
                //despues actualizar estado_comando a 0
                $actualizarComando = $api2->actualizarComando($data['id']);
            } 
            if ($comando_I ==10){ // 10 es para defrost
                if($valor_actual==$valor_trama){
                    $actualizarComando = $api2->actualizarComando($data['id']);
                }else{
                    // bajamos un grado 
                    $nuevo_valor_actual = $valor_actual-1;
                    $actualizarValorActual = $api2->actualizarValorActual($nuevo_valor_actual,$data['id']);
                }
            }         
        }
        $trama_respuesta = "2B59";
        $trama_respuesta .=",".$segundoFiltro ;
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
            //$trama_respuesta = "estamos en api2 ";
            $mensaje =$trama_respuesta;
        }

    }else{
         //pedir trama anterior del dispositivo para comparar      
         $telemetria_id1 =$existeContenedor['telemetria_id'];
         $tramaAnterior = $api->tramaAnteriorM($telemetria_id1);
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
            } 
            if ($comando_I ==10){ // 10 es para defrost
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
        $er = $api->error_trama($datosRecibidos);
        $contDirect = $api->verDirectos($segundoFiltro);
        if($contDirect['count(*)'] == 0){
            $direct = $api->directos($segundoFiltro);
        }
        $C = $api->updateContenedorM($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$ultima_fecha ,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$segundoFiltro);
        $created_at= date("Y-m-d H:i:s");   
        $R = $api->crearTramaMadurador($set_point, $temp_supply_1,$temp_supply_2,$return_air,$evaporation_coil,$condensation_coil, $compress_coil_1,$compress_coil_2,$ambient_air , $cargo_1_temp ,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity,$avl , $suction_pressure ,$discharge_pressure,$line_voltage, $line_frequency,$consumption_ph_1,$consumption_ph_2 , $consumption_ph_3 ,$co2_reading,$o2_reading,$evaporator_speed,$condenser_speed,$battery_voltage , $power_kwh ,$power_trip_reading,$power_trip_duration, $suction_temp,$discharge_temp,$supply_air_temp , $return_air_temp ,$dl_battery_temp,$dl_battery_charge,$power_consumption,$power_consumption_avg,$alarm_present , $capacity_load ,$power_state,$controlling_mode,$humidity_control,$humidity_set_point,$fresh_air_ex_mode , $fresh_air_ex_rate ,$fresh_air_ex_delay,$set_point_o2, $set_point_co2,$defrost_term_temp,$defrost_interval , $water_cooled_conde ,$usda_trip,$evaporator_exp_valve,$suction_mod_valve,$hot_gas_valve,$economizer_valve,$ethylene , $stateProcess,$stateInyection, $timerOfProcess,$modelo,$latitud , $longitud ,$created_at,$telemetria_id,$defrost_prueba,$ripener_prueba,$sp_ethyleno,$inyeccion_hora,$inyeccion_pwm,$extra_1);     
        $buscarUltimo = $api->buscarUltimo($telemetria_id);
        $pre = $buscarUltimo['created_at'] ;
        //problemas con fecha 5 horas menos debe ser UTC-5
        $puntoA = strtotime($pre);
        $puntoA1 = strtotime("-5 hours",$puntoA)*1000;
        // aqui lo convertimos en formato mongo
        $convertido = new MongoDB\BSON\UTCDateTime($puntoA1);
        $buscarUltimo['created_at'] = $convertido; 
        $cursor  = $client->ztrack_ja->madurador->insertOne($buscarUltimo);
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
