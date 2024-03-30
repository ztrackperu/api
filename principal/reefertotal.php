
<?php
 if($cR['count(*)'] != 0){
?>
<div   id ="tablaprincipalR" class="container-fluid themed-container text-center compact" style="">
      <table  id="example" class="display nowrap" style="width:100% ; height :100%;">
      <thead>
        <tr> 
            <th rowspan="2">#</th>
            <th colspan="6">State Indicators <a class="toggle-vis" data-column="5" data-column1="6" >( + )</a> </th>
            <th colspan="3">Identification <a class="toggle-vis1" data-column="9"  >( + )</a> </th>
            <th colspan="3">Booking<a class="toggle-vis2" >( + )</a></th>
            <th colspan="12">Report Date/Time and Location <a class="toggle-vis3" >( + )</a></th>
            <th colspan="54">Reefer Status and Sensor Reporting<a class="toggle-vis4" >( + )</a></th>
            <th colspan="21">Device Satus <a class="toggle-vis5" >( + )</a></th>
            <th colspan="2">Misc.<a class="toggle-vis6" >( + )</a></th>   
        </tr>
        <tr> 
          <th>CC</th>
          <th>STATUS</th>
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
    $estadoColor = EstadoDispositivo($refer['ultima_fecha'])
?>
<tr  onclick="filtroFechaR(<?= $refer['telemetria_id']?>)">
    <td></td>
    <td><img src="cc.png" height ="16" width="16"></td>
    <?php  if($estadoColor == 1){ ?>
    <td style="color:green"><strong>ON</strong></td>
    <td><img src="run.png" height ="16" width="16"></td>
    <td><img src="pwr.png" height ="20" width="26"></td>
    <?php } if($estadoColor == 2){ ?>
    <td style="color:orange"><strong>WAIT</strong></td>
    <td><img src="run1.png" height ="16" width="16"></td>
    <td><img src="pwr1.png" height ="20" width="26"></td>
    <?php } if($estadoColor == 3){ ?>
    <td style="color:gray"><strong>OFF</strong></td>
    <td><img src="run2.png" height ="16" width="16"></td>
    <td><img src="pwr2.png" height ="20" width="26"></td>
    <?php } ?>
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
    <td>-NA-</td>
    <td>-NA-</td>
    <td>Departamento</td>
    <td><?= $refer['NA'] ?></td>
    <td><?= $refer['NA'] ?></td>
    <td>Frozen</td>
    <td><?= $refer['ultima_fecha'] ?></td>
    <td><?= $refer['set_point'] ?></td>
    <td><?= $refer['temp_supply_1'] ?></td>
    <td><?= $refer['temp_supply_2'] ?></td>
    <td><?= $refer['return_air'] ?></td>
    <td>-NA-</td>
    <td><?= $refer['ambient_air'] ?></td>
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
    <td>-NA-</td>
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

<?php
 }
 if($cR['count(*)']== 0) {
 ?>
<div   id ="tablaprincipalR" class="container-fluid themed-container text-center compact" style="">
 </div>

<?php

}
?>