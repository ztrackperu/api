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
<link href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css">
<link rel="stylesheet" href="jquery.dataTables.min.css" />
<link rel="stylesheet" href="leaflet.awesome-markers.css">
<link rel="stylesheet" href="MarkerCluster.css">
<link rel="stylesheet" href="MarkerCluster.Default.css">
    <style>
      tr.highlight {
    background-color: #1a2 !important;
}
td.highlight {
    background-color: #1a2 !important;
}
  .themed-grid-col {
 padding-top: .75rem;
  padding-bottom: .75rem; 
  background-color: #192c4e;
  border: 1px solid #1a2c4e;
}

.themed-container {
  padding: .75rem;
  margin-bottom: 1.5rem;
  background-color: #192c4e ;
  border: 1px solid #dce5f4; 
}
        body {
            padding: 0;
            margin: 0;
        }
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
          font: 7pt "Helvetica Neue", Arial, Helvetica, sans-serif;
       
        }
      }
      @media (min-width: 100px) {
        html, body, #map {
            height: 78.8%;
            font: 7pt "Helvetica Neue", Arial, Helvetica, sans-serif;
           
        }
        html, body, #tablaprincipal {
          height :235x;
           
        }


      }

      @media (min-width: 1700px) {
        html, body, #map {
            height: 86.5%;
            font: 8pt "Helvetica Neue", Arial, Helvetica, sans-serif;
           
        }
        html, body, #tablaprincipal {
          height :320x;
           
        }



      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }
      .navbar {
        background-color : #1a2c4e;
        color: white;
        
        
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      .dropdown-menu li {
position: relative;
}
.dropdown-menu .dropdown-submenu {
display: none;
position: absolute;
left: 100%;
top: -7px;
}
.dropdown-menu .dropdown-submenu-left {
right: 100%;
left: auto;
}
.dropdown-menu > li:hover > .dropdown-submenu {
display: block;
}

.btnPopup{
    padding: px;
    background-color: white;
    border: 2px solid black;
    margin: 0px;
    font-size: 17px;
    
}
.btnActive{
    background-color: #1a2c4e;
    color : white;
}
.content-table > div > .row > .col-3 {
    box-sizing: 1px;
    font-size: 11px;
}
.content-table > div > .row > .col-2 {
  box-sizing: 1px;
    font-size: 10px;
    
}
.content-table > div > .row > .col-1 {
    box-sizing: unset !important;
    font-size: 2px;
}
.content-table > div > .row > .col-1 {
 padding: 0;
}


table { 
  width: 100%;
  text-align: left;
  background-color: #fff;
  border-collapse: collapse; 
}
table th { 
  background-color: #dce5f4;
  color: #000; 
}
table td{
  padding: 5px;
  border: 0px solid #dce5f4; 
}
table th{ 
  padding: 5px;
  border: 1px solid #dce5f4; 
 }

 .dataTables_wrapper .dataTables_length{
  color :#fff;
 }
 .dataTables_wrapper .dataTables_length select{
  background-color :#fff;
 }
 .dataTables_wrapper .dataTables_filter{
  color :#fff;
 }
 .dataTables_wrapper .dataTables_filter input{
  background-color :#fff;
 }
 a {
  color :#fff;
  text-decoration:none;
 }
 table.dataTable thead>tr>th.sorting_asc:before{
  opacity :.9;
 }
 .dataTables_wrapper .dataTables_info{
  color :#fff;
 }

 .loader {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('j.gif') 50% 50% no-repeat rgb(249,249,249);
    opacity: .8;
}
    </style>



    
    <!-- Custom styles for this template -->
    <link href="navbars-offcanvas.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../assets/js/hammer.min.js"></script>
    <script src="../assets/js/chartjs-plugin-zoom.min.js"></script>
    <link href="select2.css" rel="stylesheet" />
    
  </head>
  <body>
<!-- Aca evaluamos si el usuario es tipo 1(administrador) o 2(cliente)  -->
<?php
$tipo_usuario =1 ;
$empresa_general = 12;

?>

  <div class="loader"></div>
<main>
  <nav class="navbar navbar-expand-md fixed-top "  aria-label="Offcanvas navbar large">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: white"><strong>ZGROUP | LIVE MONITORING</strong> </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body " >
          <ul class="navbar-nav justify-content-md-center flex-grow-1 pe-3">
          <button type="button" class="btn btn-success" style="width:95px;"><img src="on.png" height ="22" width="22" /> <strong>ON  | 15 </strong></button>
          <li> a</li>
          <button type="button" class="btn btn-warning" style="width:95px;"><img src="on.png" height ="22" width="22" /> <strong>WAIT  | 1</strong></button>
          <li> a</li>
          <button type="button" class="btn btn-secondary" style="width:95px;"><img src="on.png" height ="22" width="22" /> <strong>OFF  | 2</strong></button>
          <li> aaaa</li>

          <h5><li class="nav-item">
           <a class="nav-link active" aria-current="page" href="#" style="color: white"><strong> <u>HOME</u></strong></a>
            </li> </h5>

            <h5><li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white" >
              <strong> <u>DEVICES</u></strong>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="">
                  <a class="dropdown-item" href="#" >REFFER</a>
                </li>
                <li class="">
                  <a class="dropdown-item" href="#">MADURADOR</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    GENSET
                  </a>
                </li>
              </ul>
            </li></h5>

            <h5 id="botonAdministracion" ><li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white">
              <strong> <u> Administración </u></strong> 
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="">
                  <a class="dropdown-item" href="#">TELEMETRIAS</a>
                </li>
                <li class="">
                  <a class="dropdown-item" href="#">EMPRESAS</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" >
                    USUARIOS &raquo;
                  </a>
                  <ul class="dropdown-menu dropdown-submenu">
                    <li>
                      <a class="dropdown-item" href="#">NUEVO</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">ASIGNAR</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">PERMISOS </a>
                    </li>

                  </ul>
                </li>
              </ul>
            </li></h5>

            <h5 id ="botonProgramacion"><li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white">
              <strong> <u>Programación</u></strong>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="">
                  <a class="dropdown-item" href="#">ESTADÍSTICA</a>
                </li>
                <li class="">
                  <a class="dropdown-item" href="#">GRÁFICAS</a>
                </li>

              </ul>
            </li></h5>

            <h5 id="botonSoporte"><li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white" >
              <strong> <u>Soporte</u></strong>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li class="">
                  <a class="dropdown-item" href="#">MANUALES</a>
                </li>
                <li class="">
                  <a class="dropdown-item" href="#">SUGERENCIAS</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    CONTACTO
                  </a>

                </li>
              </ul>
            </li></h5>
          </ul>
          <form class="d-flex mt-3 mt-lg-0" role="search">
            
            <select id ="buenab" class="form-control me-2" name="state" onchange="SeleccionarAlias(this.value)">
            <option value="0">Search devices ... </option>
            <?php
      require_once '../models/api.php';
      $api = new ApiModel();
      if($tipo_usuario==1){
        $R = $api->TablaReefer();
        $M = $api->TablaMadurador();
      }else{
        $R = $api->TablaReeferCliente($empresa_general);
        $M = $api->TablaMaduradorCliente($empresa_general);
      }
      
      foreach($R as $refer1){

     

      ?>
       <option value="<?= $refer1['telemetria_id'] ?>"><?= $refer1['nombre_contenedor'] ?> ( <?= $refer1['descripcionC'] ?> )</option>
      
       <?php
      }

       ?>
            
            </select>
            
           
            <ul> </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white">
                  Sr. ADMIN
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li class="">
                    <a class="dropdown-item" href="#">Mi Perfil</a>
                  </li>
                  <li class="">
                    <a class="dropdown-item" href="#">Cerrar Sesión</a>
                  </li>
   
                </ul>
              </li>
            </ul>
            <ul> </ul>
          </form>
        </div>
      </div>
    </div>
  </nav>
</main>
<div id="inicio" class="container-fluid themed-container text-center" style="height: 23px;">  
</div>
<div id="map"></div> 
<div   id ="tablaprincipal" class="container-fluid themed-container text-center compact" style="">
      <table  id="example" class="display nowrap" style="width:100% ; height :100%;">
      <thead>
        <tr> 
            <th rowspan="2">#</th>
            <th colspan="6">State Indicators <a class="toggle-vis" data-column="5" data-column1="6" >( + )</a> </th>
            <th colspan="3">Identification <a class="toggle-vis1" data-column="9"  >( + )</a> </th>
            <th colspan="3">Booking<a class="toggle-vis2" >( + )</a></th>
            <th colspan="12">Report Date/Time and Location <a class="toggle-vis3" >( + )</a></th>
            <th colspan="54">Container Status and Sensor Reporting<a class="toggle-vis4" >( + )</a></th>
            <th colspan="21">Device Satus <a class="toggle-vis5" >( + )</a></th>
            <th colspan="2">Misc.<a class="toggle-vis6" >( + )</a></th>   
        </tr>
        <tr> 
          <th>CC</th>
          <th>ALM</th>
          <th>RUN</th>
          <th>PWR</th>
          <th>VSL</th>
          <th>TRIP*</th>
          <th>Tipo</th>
          <th>Código ID</th>
          <th>Model*</th>
          <th>Booking #</th>
          <th>Booking temp (°C)</th>
          <th>Assigned to*</th>
          <th>Event</th>
          <th>Event time (BLQRB)</th>
          <th>Device fence</th>
          <th>Server fence</th>
          <th>Device fence ID</th>
          <th>Server fence ID</th>
          <th>GPS coords</th>
          <th>Last GPS (h:m:s)</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>Zip*</th>
          <th>Alarm</th>
          <th>Opr mode</th>
          <th>Device data (BLQRB)</th>
          <th>T set (°C)</th>
          <th>T sup 1 (°C)</th>
          <th>T sup 2 (°C)</th>
          <th>T rtn 1 (°C)</th>
          <th>T rtn 2 (°C)</th>
          <th>T amb (°C)</th>
          <th>RH set</th>
          <th>RH read</th>
          <th>CO2 set</th>
          <th>CO2 read</th>
          <th>O2 set</th>
          <th>O2 read</th>
          <th>T evap wall (°C)</th>
          <th>P suc</th>
          <th>T suc (°C)</th>
          <th>P dis</th>
          <th>T dis (°C)</th>
          <th>P cond</th>
          <th>T cond wall (°C)</th>
          <th>M cond</th>
          <th>LS evap</th>
          <th>HS evap</th>
          <th>Heat on</th>
          <th>Open exp</th>
          <th>Open suc</th>
          <th>Hot gas valve</th>
          <th>Open econ</th>
          <th>Comp freq</th>
          <th>USDA 1 (°C)</th>
          <th>USDA 2 (°C)</th>
          <th>USDA 3 (°C)</th>
          <th>USDA4 cargo (°C)</th>
          <th>Vent pos</th>
          <th>Atm mode</th>
          <th>3 ph curr</th>
          <th>Tot curr</th>
          <th>L1 (VAC)</th>
          <th>L2 (VAC)</th>
          <th>L3 (VAC)</th>
          <th>VFD</th>
          <th>TW state</th>
          <th>TW exp (d)</th>
          <th>PTI state</th>
          <th>PTI result</th>
          <th>PTI time (BLQRB)</th>
          <th>Freq</th>
          <th>Cont s/n</th>
          <th>Cont time (BLQRB)</th>
          <th>Cont SW version</th>
          <th>Fresh air type</th>
          <th>Cont set*</th>
          <th>Device ID</th>
          <th>Device supply (V)</th>
          <th>Device FW ver</th>
          <th>Device BL ver</th>
          <th>Device mesh FW ver</th>
          <th>Device temp (°C)</th>
          <th>Device bat (V)</th>
          <th>Reporting (min)</th>
          <th>Geofence revision</th>
          <th>MSISDN</th>
          <th>IMSI</th>
          <th>ICCID</th>
          <th>EUI</th>
          <th>MCC (country)</th>
          <th>MNC</th>
          <th>LAC</th>
          <th>Tower ID</th>
          <th>Cell gen</th>
          <th>Cell signal</th>
          <th>Device Config</th>
          <th>Device type</th>
          <th>Receipt time (BLQRB)</th>
          <th>Comments</th>       
        </tr>
      </thead>
      <tbody id="frmTramaReeferTotal">
      <?php

    
      foreach($R as $refer){
      ?>
      <tr  onclick="listaTramaR1(<?= $refer['telemetria_id']?>)">
          <td></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA']?></td>
          <td><strong><?= $refer['tipo'] ?></strong></td>
          
          <td><strong><?= $refer['nombre_contenedor'] ?></strong></td>
          <td>MP4000</td>
          <td><strong><?= $refer['descripcionC'] ?></strong></td>
          <td><?= $refer['temp_contratada'] ?></td>
          <td><?= $refer['nombre_empresa'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['ultima_fecha'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['latitud'] ?> , <?= $refer['longitud'] ?></td>
          <td>0</td>
          <td>Distrito</td>
          <td>Provincia</td>
          <td>Departamento</td>
          <td><?= $refer['NA'] ?></td>
          <td><?= $refer['NA'] ?></td>
          <td>Frozen</td>
          <td><?= $refer['ultima_fecha'] ?></td>
          <td><?= $refer['set_point'] ?></td>
          <td><?= $refer['temp_supply_1'] ?></td>
          <td><?= $refer['temp_supply_2'] ?></td>
          <td>-20.1</td>
          <td>-NA-</td>
          <td>24.7</td>
          <td>OOR</td>
          <td>52.0</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>-20.5</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>OOR</td>
          <td>-NA-</td>
          <td>38.3</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>100</td>
          <td>-NA-</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>OOR</td>
          <td>-NA-</td>
          <td>9.8, 9.8, 9.6</td>
          <td>-NA-</td>
          <td>465.00</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>60.0</td>
          <td>20451414</td>
          <td>-NA-</td>
          <td>3140000</td>
          <td>-NA-</td>
          <td>-NA-</td>
          <td>5149013381556902</td>
          <td>41.0</td>
          <td>AA4-e1</td>
          <td>-NA-</td>
          <td>2_4_0-128</td>
          <td>39</td>
          <td>4.1</td>
          <td>10</td>
          <td>-NA-</td>
          <td>882350816749243</td>
          <td>310170816749243</td>
          <td>89011703278167492431</td>
          <td>-NA-</td>
          <td>PERU</td>
          <td>6</td>
          <td>8459</td>
          <td>4279409</td>
          <td>-NA-</td>
          <td>-57</td>
          <td>Standard</td>
          <td>CT3000</td>
          <td>03/15/2023 15:26:53</td>
          <td>No</td>
      </tr>

      <?php
       }
      ?>

<?php


foreach($M as $refer){
?>
<tr  onclick="listaMadurador(<?= $refer['telemetria_id']?>)">
    <td></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA']?></td>
    <td><strong><?= $refer['tipo'] ?></strong></td>
    
    <td><strong><?= $refer['nombre_contenedor'] ?></strong></td>
    <td>MP4000</td>
    <td><strong><?= $refer['descripcionC'] ?></strong></td>
    <td><?= $refer['temp_contratada'] ?></td>
    <td><?= $refer['nombre_empresa'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['latitud'] ?> , <?= $refer['longitud'] ?></td>
    <td>0</td>
    <td>Distrito</td>
    <td>Provincia</td>
    <td>Departamento</td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td>Frozen</td>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['set_point'] ?></td>
    <td><?= $refer['temp_supply_1'] ?></td>
    <td><?= $refer['temp_supply_2'] ?></td>
    <td>-20.1</td>
    <td>-NA-</td>
    <td>24.7</td>
    <td>OOR</td>
    <td>52.0</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>-20.5</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>OOR</td>
    <td>-NA-</td>
    <td>38.3</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>100</td>
    <td>-NA-</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>-NA-</td>
    <td>9.8, 9.8, 9.6</td>
    <td>-NA-</td>
    <td>465.00</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>60.0</td>
    <td>20451414</td>
    <td>-NA-</td>
    <td>3140000</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>5149013381556902</td>
    <td>41.0</td>
    <td>AA4-e1</td>
    <td>-NA-</td>
    <td>2_4_0-128</td>
    <td>39</td>
    <td>4.1</td>
    <td>10</td>
    <td>-NA-</td>
    <td>882350816749243</td>
    <td>310170816749243</td>
    <td>89011703278167492431</td>
    <td>-NA-</td>
    <td>PERU</td>
    <td>6</td>
    <td>8459</td>
    <td>4279409</td>
    <td>-NA-</td>
    <td>-57</td>
    <td>Standard</td>
    <td>CT3000</td>
    <td>03/15/2023 15:26:53</td>
    <td>No</td>
</tr>

<?php
 }
?>
      
      </tbody>
      </table>
</div>



<div id="g1g1" class="container-fluid themed-container text-center" style="height: 20px;">  
</div>


<div id="ocultar2" class="row" ALIGN=CENTER style="width: 99%;height: 100%;">



    <div class="col-1">



    </div>
    <div class="col-10" style="">
    <input type="text" name="datetimes" />
    
    <canvas align ="center" id="graficaFinal" style="" ></canvas>
    </div>
    <div class="col-1">

    </div>
  </div>
</div>
<div id="tami" class="" style="height: 200px;">  
</div>    

    <div  id="ocultar1"  class="container-fluid themed-container text-center compact" style=" height :410px;">  
    <table id= "table_reffer1" class="display nowrap" style="width: 100%;" >
  <thead>
    <tr>
      <th scope="col">Fecha Recepción</th>
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script>
      $(window).load(function() {
    $(".loader").fadeOut("slow");
});

    </script>
 


    <script src="axios.min.js"></script>
    <script src="bootstrap.bundle.min.js"></script>
    <script src="leaflet.js"></script> 
    <script src="jquery-3.5.1.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script> 
    <script src="leaflet.awesome-markers.js"></script>
    <script src ="leaflet.markercluster-src.js" > </script>
    <script src="select2.min.js"></script>
    <script src="index.js"></script>
    <script>
      cargar_circulos();

       
    </script>
  </body>
</html>
