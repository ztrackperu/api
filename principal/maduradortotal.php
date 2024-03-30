
<?php
 if($cM['count(*)'] != 0){
?>
<div   id ="tablaprincipalM" class="container-fluid themed-container text-center compact" style="">
      <table  id="exampleM" class="display nowrap" style="width:100% ; height :100%;">
      <thead>
        <tr> 
            <th rowspan="2">#</th>
            <th colspan="7">State Indicators <a class="toggle-vis" data-column="5" data-column1="6" >( + )</a> </th>
            <th colspan="3">Identification <a class="toggle-vis1" data-column="9"  >( + )</a> </th>
            <th colspan="3">Booking<a class="toggle-vis2" >( + )</a></th>
            <th colspan="12">Report Date/Time and Location <a class="toggle-vis3" >( + )</a></th>
            <th colspan="54">Ripener Status and Sensor Reporting<a class="toggle-vis4" >( + )</a></th>
            <th colspan="21">Device Satus <a class="toggle-vis5" >( + )</a></th>
            <th colspan="2">Misc.<a class="toggle-vis6" >( + )</a></th>   
        </tr>
        <tr> 
          <th>ID</th>
          <th>CC</th>
          <th>STATUS</th>
          <th>RUN</th>
          <th>PWR</th>
          <th>VSL</th>
          <th>TRIP*</th>
          <th>Type</th>
          <th>ID Code</th>
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
          <th>T set (°C)</th>29 
          <th>T sup 1 (°C)</th>
          <th>T sup 2 (°C)</th>
          <th>T rtn 1 (°C)</th>
          <th>Ethylene Set</th>33
          <th>T amb (°C)</th>
          <th>Humidity set</th>35
          <th>RH read (%)</th>
          <th>CO2 set</th>37
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
          <th>vent to</th>
          <th>USDA 4 (°C)</th>
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
foreach($M as $refer){
    $estadoColor = EstadoDispositivo($refer['ultima_fecha']);
    $on_off = $refer['power_state'];
    $co2_rect =$refer['set_point_co2'];
    if($co2_rect >100){
      $co2_rect ="NA";
    }else{
      $co2_rect =$refer['set_point_co2'];
    }
?>
<tr  >
<td></td>
    <td><?= $refer['telemetria_id'] ?></td>
    <td><div align="center"><img src="cc.png" height ="25" width="25" ></div></td>
    <?php  if($estadoColor == 1){ ?>
    <td style="color:green"><strong>ONLINE</strong></td>
    <?php  if($on_off == 1){ ?>
    <td><img src="run.png" height ="25" width="25"></td>
    <?php  }else{ ?>
    <td><img src="run1.png" height ="25" width="25"></td>
    <?php  } ?>    
    <td><img src="pwr.png" height ="40" width="45"></td>
    <?php } if($estadoColor == 2){ ?>
    <td style="color:orange"><strong>WAIT</strong></td>
    <td><img src="run2.png" height ="20" width="20"></td>
    <td><img src="pwr1.png" height ="40" width="45"></td>
    <?php } if($estadoColor == 3){ ?>
    <td style="color:gray"><strong>NO SIGNAL</strong></td>
    <td><img src="run2.png" height ="20" width="20"></td>
    <td><img src="pwr2.png" height ="40" width="45"></td>
    <?php } ?>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA']?></td>
    <td><strong>Ripener</strong></td>
    <?php
    if($refer['nombre_contenedor']=="PRUEBA12345" ){
      $refer['nombre_contenedor']="ZGRU5114694";

    }
    if($refer['nombre_contenedor']=="LOSU1210800" ){
      $refer['nombre_contenedor']="ZGRU8728904";

    }
    ?>
    <td><strong><?= $refer['nombre_contenedor'] ?></strong></td>
    <td>MP4000</td>
    <td><strong><?= $refer['descripcionC'] ?></strong></td>
    <td><?= $refer['temp_contratada'] ?></td>
    <td><?= $refer['nombre_empresa'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['NA'] ?></td>

    <td>NA</td>
    <td>NA</td>
    <td>NA</td>

    <td><?= $refer['latitud'] ?> , <?= $refer['longitud'] ?></td>
    <td>0</td>

    <?php 
      if($refer['nombre_empresa'] =="WONDERFUL"){
     
    ?>
    <td>Delano</td>
    <td>California</td>
    <td>USA</td>
    <?php
          }else{
     ?>
    <td>NA</td>
    <td>NA</td>
    <td>NA</td>
    <?php
          }
     ?>

    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <?php 
      if($refer['temp_supply_1'] <9){
     
    ?>
    <td>Frozen</td>
    <?php
          }else{
    ?>
    <td>Chiller</td>
    <?php } ?>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['set_point'] ?></td>
    <td><?= $refer['temp_supply_1'] ?></td>
    <td><?= $refer['temp_supply_2'] ?></td>
    <td><?= $refer['return_air'] ?></td>
    <td><?= $refer['sp_ethyleno'] ?></td>
    <td><?= $refer['ambient_air'] ?></td>
    <td><?= $refer['humidity_set_point'] ?></td>
    <td><?= $refer['relative_humidity'] ?></td>
    <td><?= $co2_rect ?></td>
    <td>OOR</td>
    <td>OOR</td>
    <td>OOR</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>OOR</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td><?= $refer['cargo_1_temp'] ?></td>
    <td><?= $refer['cargo_2_temp'] ?></td>
    <td><?= $refer['cargo_3_temp'] ?></td>
    <td>OOR</td>
    <td><?php 
    //if ($refer['cargo_4_temp']<-30){echo "NA";}else{echo $refer['cargo_4_temp'];} 
    if($refer['cargo_4_temp']<-30){
      echo "NA";
    }else{
      echo $refer['cargo_4_temp'];
    }
    //$refer['cargo_4_temp'] ?></td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>-NA-</td>
    <td>No</td>
</tr>

<?php
 }
?>
      
      </tbody>
      </table>
</div>

<?php
 }
 if($cM['count(*)']== 0) {
 ?>
<div   id ="tablaprincipalM" class="container-fluid themed-container text-center compact" style="">
 </div>

<?php

}
?>