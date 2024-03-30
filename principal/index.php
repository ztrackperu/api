<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Plataforma de monitoreo de disositivos con telemetria">
    <meta name="author" content="Luis Pablo Marcelo Perea, and Bootstrap contributors">
    <meta name="generator" content="lpmp 0.1">
    <title>ZTRACK | Monitoreo en vivo</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/navbars-offcanvas/">
    <link href="bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="leaflet.css" />
    <link rel="stylesheet" href="ac1.css" />
    <link rel="stylesheet" href="bc1.css" />
    <link rel="stylesheet" href="jquery.dataTables.min.css" />
    <link rel="stylesheet" href="leaflet.awesome-markers.css">
    <link rel="stylesheet" href="MarkerCluster.css">
    <link rel="stylesheet" href="MarkerCluster.Default.css">
    <link rel="stylesheet" href="total.css">
    <!-- Custom styles for this template -->
    <link href="navbars-offcanvas.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="../assets/js/hammer.min.js"></script>
    <script src="../assets/js/chartjs-plugin-zoom.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0 "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js"></script>
    <link href="select2.css" rel="stylesheet" />
    <link href="snackbar.min.css" rel="stylesheet">
    <link href="context-menu.min.css" rel="stylesheet" type="text/css">      
  </head>
  <body>
    <?php
      session_start();    
    ?>
<!-- Aca evaluamos si el usuario es tipo 1(administrador) o 2(cliente)  -->
<?php
require_once '../models/integral.php';
$api = new IntegralModel();
//$datosReefer = $api->listaReeferFecha1(1,'2023-06-01 00:00:00','2023-06-01 11:00:00');

//$tipo_usuario = 2 ;
$tipo_usuario =$_SESSION['permiso'] ;
$usuario = $_SESSION['id'] ;
if($tipo_usuario ==1){
  $empresa_general = 1;
}else {
  $datosUsuario = $api->UsuarioEmpresa($usuario);
  $empresa_general = $datosUsuario['empresa_id'] ;
}
function EstadoDispositivo($ultima_conexion){
  $captura30min = date('Y-m-d H:i:s',mktime(date('H'),date('i')-30,date('s'),date('n'),date('j'),date('Y')));
  $captura1dia= date('Y-m-d H:i:s',mktime(date('H'),date('i'),date('s'),date('n'),date('j')-1,date('Y')));
  if($captura30min>=$ultima_conexion){
    if($captura1dia>=$ultima_conexion){
      $estado =3;
    }else{
      $estado =2;
    }
  }else{
    $estado = 1;
  }
  return $estado;
}
  $R = $api->TablaReefer($tipo_usuario,$empresa_general);
  $M = $api->TablaMadurador($tipo_usuario,$empresa_general);
  $G = $api->TablaGenset($tipo_usuario,$empresa_general);
  //contador de elementos generales ADMIN/EMPRESAS
  $cR = $api->ContarReffer($tipo_usuario,$empresa_general);
  $cM = $api->ContarMadurador($tipo_usuario,$empresa_general);
  $cG = $api->ContarGenset($tipo_usuario,$empresa_general);
  //Contar dispositivos en ON
  $cRon = $api->ContarRefferON($tipo_usuario,$empresa_general);
  $cMon = $api->ContarMaduradorON($tipo_usuario,$empresa_general);
  $cGon = $api->ContarGensetON($tipo_usuario,$empresa_general);
  $totalON =$cRon['count(*)'] +$cMon['count(*)'] + $cGon['count(*)'];
  //Contar dispositivos en WAIT
  $cRwait = $api->ContarRefferWAIT($tipo_usuario,$empresa_general);
  $cMwait = $api->ContarMaduradorWAIT($tipo_usuario,$empresa_general);
  $cGwait = $api->ContarGensetWAIT($tipo_usuario,$empresa_general);
  $totalWAIT =$cRwait['count(*)'] +$cMwait['count(*)'] + $cGwait['count(*)'];
    //Contar dispositivos en OFF
    $cRoff = $api->ContarRefferOFF($tipo_usuario,$empresa_general);
    $cMoff = $api->ContarMaduradorOFF($tipo_usuario,$empresa_general);
    $cGoff = $api->ContarGensetOFF($tipo_usuario,$empresa_general);
    $totalOFF =$cRoff['count(*)'] +$cMoff['count(*)'] + $cGoff['count(*)'];
?>
  <div class="loader"></div>
<main>
    <?php
    include 'navtotal.php';
    ?>
</main>
<div id="inicio" class="container-fluid themed-container text-center" style="height: 23px;">  
</div>
<div id="map"></div> 
<?php
    include 'reefertotal.php';
    include 'maduradortotal.php';
    include 'gensettotal1.php';
?>
<div id="g1g1" class="container-fluid themed-container text-center" style="height: 20px;">  
</div>
<div id="ocultar2" class="" ALIGN=CENTER style="">
    <div class="col-1"></div>
    <div class="col-11" style="">
    <h3><strong>Search by Date:  </strong><input style="border: 0; " type="text" name="datetimes" /></h3>
    <a id="bajarGrafica" class="btn btn-outline-success btn-lg btn-block">DOWNLOAD GRAPH</a>
   <canvas align ="center" id="graficaFinal" style="" width="500" height="250"></canvas><br />
 
    </div>
  </div>
</div>

<div id="tami" class="" style="height: 20px;">  
</div>    
    <div  id="ocultar1"  class="container-fluid themed-container text-center compact" style=" height :410px;">  
    <form id="bajarExcelR"></form>
    <p></p>
    <table id= "table_reffer1" class="display nowrap" style="width: 100%;" >
  <thead>
    <tr>
      <th scope="col">Reception Date</th>
      <th scope="col">set_point</th>
      <th scope="col">temp_supply </th>
      <th scope="col">return_air</th>
      <th scope="col">evaporation_coil </th>
      <th scope="col">ambient_air </th>
      <th scope="col">cargo_1_temp</th>
      <th scope="col">relative_humidity</th>
      <th scope="col">alarm_present</th>
      <th scope="col">alarm_number</th>
      <th scope="col">controlling_mode</th>
      <th scope="col">power_state</th>
      <th scope="col">defrost_term_temp</th>
      <th scope="col">defrost_interval</th>
      <th scope="col">latitud</th>
      <th scope="col">longitud</th>
    </tr>
  </thead>
  <tbody id="frmTramaReefer2">

  </tbody>
</table>
</div>

<div id="tami" class="" style="height: 20px;">  
</div>    

<div  id="ocultarM"  class="container-fluid themed-container text-center compact" style=" height :410px;">  
<form id="bajarExcelM"></form>
<p></p>
    <table id= "table_reffer2" class="display nowrap" style="width: 100%;" >
  <thead>
    <tr>
      <th scope="col">Reception Date</th>
      <th scope="col">kwh</th>
      <th scope="col">Set_point</th>
      <th scope="col">Temp_supply_1 </th>
      <th scope="col">Return_air</th>
      <th scope="col">Evaporation_coil </th>
      <th scope="col">Ambient_air </th>
      <th scope="col">Relative_humidity</th>
      
      <th scope="col">SP ethylene</th>
      <th scope="col">Ethylene</th>
      <th scope="col">Injected Hours</th>
      <th scope="col">Injected PWM</th>
     
      <th scope="col">State Process</th>
      <th scope="col">AVL</th>
      <th scope="col">Power_state</th>
      <th scope="col">Controlling_mode</th>
      <th scope="col">Compress</th>
      <th scope="col">Current ph1</th>
      <th scope="col">Current ph2</th>
      <th scope="col">Current ph3</th>
      <th scope="col">Mode</th>
      <th scope="col">Set_point_co2</th>
      <th scope="col">Co2_reading</th>
      <th scope="col">Set_point_o2</th>
      <th scope="col">O2_reading</th>
      
      <th scope="col">Voltage</th>
      <th scope="col">USDA 1</th>
      <th scope="col">USDA 2</th>
      <th scope="col">USDA 3</th>
      <th scope="col">USDA 4</th>
      <th scope="col">Defrost_term_temp</th>
      <th scope="col">Defrost_interval</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
    </tr>
  </thead>
  <tbody id="frmTramaReeferM">

  </tbody>
</table>
</div>


  <div  id="ocultarG"  class="container-fluid themed-container text-center compact" style=" height :410px;">  
  <form id="bajarExcelG"></form>
  <p></p>
  <table id= "table_genset" class="display nowrap" style="width: 100%;" >
  <thead>
    <tr>
      <th scope="col">Reception Date</th>
      <th scope="col">Battery Voltage</th>
      <th scope="col">Water Temp </th>
      <th scope="col">Running Frequency</th>
      <th scope="col">Fuel Level </th>
      <th scope="col">Voltage Measure</th>
      <th scope="col">Rotor Current</th>
      <th scope="col">fiel Current</th>
      <th scope="col">Speed</th>
      <th scope="col">Eco Power</th>
      <th scope="col">RPM</th>
      <th scope="col">Unit Mode</th>
      <th scope="col">Horometro</th>
      <th scope="col">Modelo</th>
      <th scope="col">latitud</th>
      <th scope="col">longitud</th>
      <th scope="col">Alarma</th>
      <th scope="col">Evento</th>
      <th scope="col">REEFER CONECTED</th>
      <th scope="col">SET POINT</th>
      <th scope="col">TEMP SUPPLY</th>
      <th scope="col">RETURNAIR</th>
    </tr>
  </thead>
  <tbody id="frmTramaGenset">

  </tbody>
</table>
  </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script>
     $(window).load(function() {
    $(".loader").fadeOut("fast");
});
    </script>
<!-- Small modal -->
<div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      ...
    </div>
  </div>
</div>
<div class="modal fade" id="modalAlias" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register Description</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form id="frmAliasContenedor">               
        </form>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">CANCEL</button>
                <a class="btn btn-primary" href="#">REGISTER</a>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel" >Interfaz de Comandos </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="row">
      <div class="col-md-3">
      </div> 
      <div class="col-md-6">
      <h4><strong> DIVECE CONTROL</strong></h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
    <div class="row">
      <div class="col-md-3"> </div>
      <div class="col-md-6">
      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Tipo Dispositivo</span>
          </div>
          <select id="tipoDispositivo" name="tipoDispositivo" class="form-control" onchange="seleccionar_tipoD(this.value)">
                <option value="0">Seleccione ...</option>  
                <option value="Generador">Generador</option>  
                <option value="Reefer">Reefer</option> 
                <option value="Madurador">Madurador</option>                
          </select>
         </div>
      </div>
      <div class="col-md-3"></div>
    </div>
                <form id="frmComandoListaDispositivos"></form>
                <form id="frmComanD"></form>
                <form id="frmIntegralComando"></form>
                <form id="frmListaComandoAsignados"></form>
                <div id="ComandoAutomatico"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Comprendido</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Esta seguro de salir?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-primary" href="../../ztrack1/controllers/usuariosController.php?option=logout">Logout</a>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModalComando" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Comando Dinamico</h4>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- pruebas de Modal con css -->
<div id="ventanaModal" class="modal">
    <div class="modal-content">
        <span class="cerrar">&times;</span>
        <h2>Ventana Comando</h2>
        <p>Espacio de opciones</p>
    </div>
  </div>


<!-- Dependencias del proyecto en JAVASCRIT -->
<script src="axios.min.js"></script>
    <script src="bootstrap.bundle.min.js"></script>
    <script src="leaflet.js"></script> 
    <script src="a.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="b.js"></script>
    <script src="context-menu.min.js"></script>
    <script src="leaflet.awesome-markers.js"></script>
    <script src ="leaflet.markercluster-src.js" > </script>
    <script src="L.Path.DashFlow.js"></script>
    <script src="select2.min.js"></script>
    <script src="snackbar.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="tabla_to_excel.js"></script>
    <script src="c.js"></script>
    <script src="d.js"></script>
    <script src="g.js"></script>


    <script>
      var empresa_gener = <?= $empresa_general ?>;
    </script>
    <script src="total.js"></script>
    <script src="tablasDinamicas.js"></script>
    <script src="mostrar.js"></script>
    <script src="genset.js"></script>
    <script src="reefer.js"></script>
    <script src="madurador.js"></script>
    <script>
      //genialtotal = await analizarTabla(<?= $tipo_usuario ?>,<?= $empresa_general ?>);
     // var empresa_gener = <?= $empresa_general ?>;
      cargar_circulos(<?= $tipo_usuario ?>,<?= $empresa_general ?>);
      //console.log(genialtotal);    
    </script>
    <?php

    ?>
  </body>
</html>
