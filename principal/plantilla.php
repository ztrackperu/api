<?php
require_once '../models/api.php';
$api = new ApiModel();

$R = $api->listaDeTablaComando();
foreach($R as $refer){

    ?>

    <p><strong><?= $refer['nombre_dispositivo'] ?></strong></p>
    <p><strong><?= $refer['fecha_creacion'] ?></strong></p>

 <?php
}



?>