<?php 
if($cG['count(*)'] != 0){ 
  ?>
<div  id ="tablaprincipalG" class="container-fluid themed-container text-center compact" style="">
      <table  id="exampleG" class="display nowrap" style="width:100% ; height :100%;">
      <thead>
        <tr> 
            <th rowspan="2">#</th>
            <th colspan="3"> IDENTIFICATION <a class="toggle-vis1" data-column="9"  >( + )</a> </th>
            <th colspan="3"> BOOKING<a class="toggle-vis2" >( + )</a></th>
            <th colspan="17" >GENSET STATUS AND SENSOR REPORTING<a class="toggle-vis4" >( + )</a></th>
            <th colspan="4" >REEFER CONECTED<a class="toggle-vis4" >( + )</a></th>
        </tr>
        <tr> 
          <th>ID</th>
          <th>DEVICE</th>
          

          <th>REPORT</th>
          <th>STATE</th>
          <th>Booking</th>
          <th scope="col">Fecha Recepción</th>
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
      <tbody id="frmDatosReefer">
      <?php

foreach($G as $refer){
  $estadoColor = EstadoDispositivo($refer['ultima_fecha'])
?>
<tr >
    <td></td>
    <td><?= $refer['telemetria_id'] ?> </td>
    <td><strong><?= $refer['nombre_generador'] ?></strong></td>
    <td><a class="btn btn-secondary "  href="#" download="#">R</a></td>
<?php  if($estadoColor == 1){ ?>
<td style="color:green"><strong>ON</strong></td>
<?php } if($estadoColor == 2){ ?>
<td style="color:orange"><strong>WAIT</strong></td>
<?php } if($estadoColor == 3){ ?>
<td style="color:gray"><strong>OFF</strong></td>
<?php } ?>
    <td><?= $refer['nombre_empresa'] ?></td>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['battery_voltage'] ?></td>
    <td><?= $refer['water_temp'] ?></td>
    <td><?= $refer['running_frequency'] ?></td>
    <td><?= $refer['fuel_level'] ?></td>
    <td><?= $refer['voltage_measure'] ?></td>
    <td><?= $refer['rotor_current'] ?></td>
    <td><?= $refer['fiel_current'] ?></td>
    <td><?= $refer['speed'] ?></td>
    <td><?= $refer['eco_power'] ?></td>
    <td><?= $refer['rpm'] ?></td>
    <td><?= $refer['unit_mode'] ?></td>
    <td><?= $refer['horometro'] ?></td>
    <td><?= $refer['modelo'] ?></td>
    <td><?= $refer['latitud'] ?></td>
    <td><?= $refer['longitud'] ?></td> 
    <td><?= $refer['alarma_id'] ?></td>
    <td><?= $refer['evento_id'] ?></td>
    <td><?= $refer['reefer_conected'] ?></td>
    <td><?= $refer['set_point'] ?></td>
    <td><?= $refer['temp_supply'] ?></td>
    <td><?= $refer['return_air'] ?></td>
</tr>
<?php }
} ?>
      
      </tbody>
      </table>
</div>

<?php
 
 if($cG['count(*)']== 0) {
 ?>
<div  id ="tablaprincipalG" class="container-fluid themed-container text-center compact" style="">
 </div>

<?php

}
?>



