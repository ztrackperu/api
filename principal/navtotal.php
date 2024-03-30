<nav class="navbar navbar-expand-md fixed-top "  aria-label="Offcanvas navbar large">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: white"><strong>ZGROUP | TELEMETRY</strong> </a>
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
            <div class="btn-group">
  <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="on.png" height ="22" width="22" />
  <strong > <a>ON  |  <?= $totalON?> </a> </strong>
  </button>

  <ul class="dropdown-menu" >
                <?php
                      if($cRon['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" style ="color:green;" onclick="mostrarReferON()">REFFER | <?= $cRon['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cMon['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" style ="color:green;" onclick="mostrarMaduradorON()">RIPENER |<?= $cMon['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cGon['count(*)'] != 0){
                ?>
                <li>
                  <a class="dropdown-item" style ="color:green;" onclick="mostrarGensetON()">
                    GENSET | <?= $cGon['count(*)'] ?>
                  </a>
                </li>
                <?php
                      }
                ?>
              </ul>

</div>
<li style="color:#1a2c4e;"> a</li>
<div class="btn-group">
  <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="on.png" height ="22" width="22" />
  <strong > <a>WAIT |  <?= $totalWAIT?> </a> </strong>
  </button>
  <ul class="dropdown-menu" >
                <?php
                      if($cRwait['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" style ="color:orange;" onclick="mostrarReferWAIT()">REFFER | <?= $cRwait['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cMwait['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" style ="color:orange;" onclick="mostrarMaduradorWAIT()">RIPENER | <?= $cMwait['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cGwait['count(*)'] != 0){
                ?>
                <li>
                  <a class="dropdown-item" style ="color:orange;" onclick="mostrarGensetWAIT()">
                    GENSET | <?= $cGwait['count(*)'] ?>
                  </a>
                </li>
                <?php
                      }
                ?>
              </ul>



</div>
<li style="color:#1a2c4e;"> a</li>

<div class="btn-group">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="on.png" height ="22" width="22" />
  <strong > <a>OFF |  <?= $totalOFF?> </a> </strong>
  </button>

  <ul class="dropdown-menu" >
                <?php
                      if($cRoff['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" onclick="mostrarReferOFF()">REFFER | <?= $cRoff['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cMoff['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" onclick="mostrarMaduradorOFF()">RIPENER | <?= $cMoff['count(*)'] ?></a>
                </li>
                <?php
                      }
                      if($cGoff['count(*)'] != 0){
                ?>
                <li>
                  <a class="dropdown-item" onclick="mostrarGensetOFF()">
                    GENSET | <?= $cGoff['count(*)'] ?>
                  </a>
                </li>
                <?php
                      }
                ?>
              </ul>

</div>

          <li style="color:#1a2c4e;"> aaaa</li>

          <h5><li class="nav-item">
           <a class="nav-link active" aria-current="page" href="#" style="color: white"><strong> <u>HOME</u></strong></a>
            </li> </h5>

            <h5><li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white" >
              <strong> <u>DEVICES</u></strong>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <?php
                      if($cR['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" onclick="mostrarRefer()">REFFER</a>
                </li>
                <?php
                      }
                      if($cM['count(*)'] != 0){
                ?>
                <li class="">
                  <a class="dropdown-item" onclick="mostrarMadurador()">RIPENER</a>
                </li>
                <?php
                      }
                      if($cG['count(*)'] != 0){
                ?>
                <li>
                  <a class="dropdown-item" onclick="mostrarGenset()">
                    GENSET
                  </a>
                </li>
                <?php
                      }
                ?>
              </ul>
            </li></h5>
            <h5 id ="botonAdministracion"></h5>
            <?php
            if( $tipo_usuario == 1){
                ?>
            <h5  ><li class="nav-item dropdown">
              <a class="nav-link " href="../../ztrack1/plantilla.php"  style="color: white">
              <strong> <u> ADMINISTRATION </u></strong> 
              </a>
              <?php
            }
            if( $tipo_usuario == 1){
                ?>
            </li></h5>
            <h5  ><li class="nav-item dropdown">
              <a class="nav-link " href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="color: white">
              <strong> <u> CONTROLLER </u></strong> 
              </a>

            </li></h5>
            <?php
                      }

            ?>


            <h5 id ="botonProgramacion"></h5>

            <h5 id="botonSoporte"></h5>
          </ul>
          <form class="d-flex mt-3 mt-lg-0" role="search">
            
            <select id ="buenab" class="form-control me-2" name="state" onchange="recorridoMapa(this.value)">
            <option value="0">Search devices ... </option>
            <?php

      foreach($R as $refer1){

     $valorRefer ="R,".$refer1['telemetria_id'];

      ?>
       <option value="<?= $valorRefer?>"><?= $refer1['nombre_contenedor'] ?> ( <?= $refer1['descripcionC'] ?> )</option>
      
       <?php
      }

       ?>

<?php

foreach($M as $refer1){

$valorRefer1 ="M,".$refer1['telemetria_id'];

?>
 <option value="<?= $valorRefer1?>"><?= $refer1['nombre_contenedor'] ?> ( <?= $refer1['descripcionC'] ?> )</option>

 <?php
}

 ?>

<?php

foreach($G as $refer1){

$valorRefer2 ="G,".$refer1['telemetria_id'];

?>
 <option value="<?= $valorRefer2?>"><?= $refer1['nombre_generador'] ?> ( <?= $refer1['descripcion'] ?> )</option>

 <?php
}

 ?>
            
            </select>
            
           
            <ul> </ul>
            <ul class="navbar-nav">
              <h5><li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style="color: white">
                  <strong>Sr . <?php  echo $_SESSION['nombres']  ; ?> </strong>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li class="">
                  
                  </li>
                  <li class="">
                    <a class="dropdown-item" href="#" onclick="cerrarSesion()">Logout</a>
                  </li></h5>
   
                </ul>
              </li>
            </ul>
            <ul> </ul>
          </form>
        </div>
      </div>
    </div>
  </nav>