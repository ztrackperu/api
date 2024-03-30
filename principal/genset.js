async function tablaDatosGenset(info){
    let html = '';
    let html1 = '';
    info.tramaGenset.forEach(permiso1 => {
      html += `
      <tr>
        <td><strong>${permiso1.created_at}</strong></td>
        <td>${permiso1.battery_voltage}</td>
        <td>${permiso1.water_temp}</td>
        <td>${permiso1.running_frequency}</td>
        <td>${permiso1.fuel_level}</td>
        <td>${permiso1.voltage_measure}</td>
        <td>${permiso1.rotor_current}</td>
        <td>${permiso1.fiel_current}</td>
        <td>${permiso1.speed}</td>
        <td>${permiso1.eco_power}</td>
        <td>${permiso1.rpm}</td>    
        <td>${permiso1.unit_mode}</td>
        <td>${permiso1.horometro}</td>
        <td>${permiso1.modelo}</td>
        <td>${permiso1.latitud}</td>
        <td>${permiso1.longitud}</td>
        <td>${permiso1.alarma_id}</td>
        <td>${permiso1.evento_id}</td>     
        <td>${permiso1.reefer_conected}</td>
        <td>${permiso1.set_point}</td>
        <td>${permiso1.temp_supply}</td>
        <td>${permiso1.return_air}</td>
        </td>
      </tr>
      `;
    });
       tramagenset.innerHTML = html;
    html1 += `
       <div class="row">     
       <input name="telemetria_id" type="hidden" value="${info.genset.telemetria_id}" />
       <button class="btn btn-success btn-lg btn-block" type="submit">DOWNLOAD DATA IN EXCEL</button>
     `;
   bajarExcelG.innerHTML = html1;
}
async function graficaGenset(info){
     let html = '';
    if (typeof w !== 'undefined') { w.destroy();}
     setPoint =[];
     batteryVoltage = [];
     runningFrequency =[];
     fuelLevel =[];
     voltageMeasure =[];
     Rpm =[];
     createdAt =[]; 
     info.tramaGenset.forEach(permiso => {
       setPoint.push(parseFloat(permiso.set_point));
       batteryVoltage.push(parseFloat(permiso.battery_voltage));
       runningFrequency.push(parseFloat(permiso.running_frequency));
       fuelLevel.push(parseFloat(permiso.fuel_level));
       voltageMeasure.push(parseFloat(permiso.voltage_measure));
       Rpm.push(parseFloat(permiso.rpm));
       createdAt.push(permiso.created_at);
     });
          const datosRpm ={
             label : " RPM ",
             data : Rpm.reverse(),
             backgroundColor: '#95a5a6', // Color de fondo
             borderColor: '#95a5a6', // Color del borde
             borderWidth: 3,
             yAxisID : 'y',
             pointRadius: 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4 
         }
         const datosSetPoint ={
             label : " SetPoint",
             data : setPoint.reverse(),
             backgroundColor: '#f1c40f', // Color de fondo
             borderColor: '#f1c40f', // Color del borde
             borderWidth: 3,
             yAxisID : 'y',
             pointRadius: 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4 
         }
         const datosBatteryVoltage ={
             label : " Battery Voltage ",
             data : batteryVoltage.reverse(),
             backgroundColor: '#ec7063', // Color de fondo
             borderColor: '#ec7063', // Color del borde
             borderWidth: 3,// Ancho del borde
             yAxisID : 'y',
             pointRadius: 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4
         }
         const datosRunningFrequency ={
             label : " Running Frequency",
             data : runningFrequency.reverse(),
             backgroundColor: '#27ae60', // Color de fondo
             borderColor: '#27ae60', // Color del borde
             borderWidth: 3,// Ancho del borde
             yAxisID : 'y',
             pointRadius : 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4
         }
         const datosFuelLevel ={
             label : " Fuel Level",
             data : fuelLevel.reverse(),
             backgroundColor: '#9ccc65', // Color de fondo
             borderColor: '#9ccc65', // Color del borde
             borderWidth: 3,// Ancho del borde
             yAxisID : 'y',
             pointRadius : 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4
         }
         const datosVoltageMeasure ={ 
             label : "Voltage Measure",
             data : voltageMeasure.reverse(),
             backgroundColor: '#e4c1f4', // Color de fondo
             borderColor: '#e4c1f4', // Color del borde4476c6
             borderWidth: 3,// Ancho del borde
             yAxisID : 'y1',
             pointRadius : 0,
             cubicInterpolationMode: 'monotone',
             tension: 0.4
         }
        w = new Chart(grafica1, {
             type: 'line',// Tipo de gráfica            
             data: {
                 labels: createdAt.reverse(),
                 datasets: [
                    datosBatteryVoltage,
                     datosVoltageMeasure,
                     datosFuelLevel,
                     datosRunningFrequency,
                     datosRpm,
                     datosSetPoint
                 ]
             },
             options: {
                animation: {
                  onComplete: function () {
                        //console.log(w.toBase64Image());
                        //if(descargarImagen==1){
                        var today = moment().format("DD-MM-YYYY_HH-mm-ss");
                        var dispositivoGrafica = info.genset.nombre_generador;        
                        bajarGrafica.href= w.toBase64Image();
                        bajarGrafica.download =''+dispositivoGrafica+'_'+today;
                          //bajarGrafica.click();
                        //}
                  },
                },
                 responsive : true,
                 interaction :{
                     mode : 'index',
                     intersect :false,
                 },
                 stacked :false,
                 scales: {
                     y: {
                         position: 'left',
                         display: true,
                         title: {
                           display: true,
                           text: '',
                           color: '#1a2c4e',
                           font: {
                             //family: 'Times',
                             size: 20,
                             style: 'normal',
                             lineHeight: 1.2
                           },
                           padding: {top: 30, left: 0, right: 0, bottom: 0}
                         },
                         suggestedMin: 0,
                         suggestedMax: 60
                     },
                     y1: {
                       type: 'linear',
                       display: true,
                       position: 'right',
                       beginAtZero: true,
                       title: {
                         display: true,
                         text: '',
                         color: '#1a2c4e',
                         font: {
                           //family: 'Times',
                           size: 20,
                           style: 'normal',
                           lineHeight: 1.2
                         },
                         padding: {top: 30, left: 0, right: 0, bottom: 0}
                       },          
                       // grid line settings
                       grid: {
                         drawOnChartArea: false, // only want the grid lines for one axis to show up
                       },
                     },
                   },
                   plugins: {
                     title: {
                         display: true,
                         text: 'Genset Monitoring Data : '+info.genset.nombre_generador ,
                         color: '#1a2c4e',
                         font: {
                           //family: 'Times',
                           size: 35,
                           style: 'normal',
                           lineHeight: 1.2
                         },
                         padding: {top: 30, left: 0, right: 0, bottom: 0}
                       },
                    customCanvasBackgroundColor : {
                        color :'#fff',
                    },
                     zoom: {
                       pan :{
                         enabled :true,
                         mode: 'x',
                       },
                       zoom: {
                         wheel: {
                           enabled: true,
                         },
                         pinch: {
                           enabled: true
                         },
                         mode: 'x',
                         drag :{
                             enabled: false,
                           },
                         scaleMode :'x',
                       }
                     },
                     legend : {
                      position :'right',
                      align : 'center',
                      labels : {
                          boxWidth :20 ,
                          boxHeight : 20,
                          color :'#1a2c4e',
                          padding :15 ,
                          textAlign : 'left',
                          font: {
                              size: 12,
                              style: 'normal',
                              lineHeight: 1.2
                            },
                          title : {
                              text :'Datos Graficados:',
                          },
                      },
                  },
                 }
             },
             plugins : [plugin],
         });
}
async function ultimoPuntoGenset(info1,id) {
    markers.clearLayers();
    lat =parseFloat(info1.genset.latitud);
    log = parseFloat(info1.genset.longitud);
    var photoIcon = L.icon({ iconUrl: 'g.svg', iconSize:[100, 169],iconAnchor:[52, 115],popupAnchor: [-3, -60]});
    var marker = L.marker([lat,log], {icon: photoIcon}).addTo(markers);
    let textoF = await datospruebaG(id);
    marker.bindPopup(textoF);
    marker.on('click', markerOnClick)
    showLocation();
    var latlng =  L.latLng(lat,log);
    map.setView(latlng,14);
    saltarA('#g1g1');      
}
async function datospruebaG(id){
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack2/controllers/principalController.php?option=puntoEnMapaM&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;   
     //console.log(info);
     tableBooking ='';
     tableAlarms ='';
     tableLocation ='';
     tableDetails = '';
     tableStatus = '';
     popTableTemplate=''; 
     tableBooking += `
     <div class="row">
        <div class="col-3">Genset ID: </div>
        <div class="col-3">${info.punto.nombre_generador} </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
     </div>
     <div class="row">
     <div class="col-3">Empresa : </div>
     <div class="col-5" style="color:blue;">${info.empresa.nombre_empresa} </div>
     <div class="col-1"></div>
     <div class="col-3"></div>
  </div>
  <div class="row">
  <div class="col-3">Temperatura : </div>
  <div class="col-3">${info.empresa.temp_contratada} </div>
  <div class="col-3"></div>
  <div class="col-3"></div>
</div>
      `; 
      tableAlarms += `
      <div class="row">
         <div class="col-5">AQUI VA ALARMS</div>
         <div class="col-3">${info.punto.nombre_generador} </div>
         <div class="col-3"></div>
         <div class="col-1"></div>
      </div>
       `; 
     tableDetails += `
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Genset ID: </b></div>
        <div class="col-3"><b>${info.punto.nombre_generador} </b></div>
        <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Water Temp :</b></div>
        <div class="col-3"><b>${info.punto.water_temp} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Seep :  </b></div>
        <div class="col-3"><b> ${info.punto.speed}</b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Rotor</b></div>
        <div class="col-3"><b>${info.punto.rotor_current} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Horometro :  </b></div>
        <div class="col-3"><b>${info.punto.horometro} </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Battery :</b></div>
        <div class="col-3"><b>${info.punto.battery_voltage} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Frequency :  </b></div>
        <div class="col-3"><b> ${info.punto.running_frequency}</b></div>
     </div> 
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Voltage</b></div>
        <div class="col-3"><b>${info.punto.voltage_measure} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>RPM :  </b></div>
        <div class="col-3"><b>${info.punto.rpm} </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:1a2c4e;"><b> Fuel</b></div>
        <div class="col-3"><b>${info.punto.fuel_level} </b></div>
        <div class="col-3" style="color:1a2c4e;"> <b>Set POint :  </b></div>
        <div class="col-3"><b> ${info.punto.set_point} </b></div>    
     </div>
     `; 
     tableStatus += `
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Genset ID: </b></div>
        <div class="col-3"><b>${info.punto.nombre_generador} </b></div>
        <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
        <div class="col-3"><b> </b></div>
     </div>
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
        <div class="col-5" style="color:blue;"><b>${info.punto.ultima_fecha}  </b></div>
        <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Event : </b></div>
        <div class="col-5"><b>Scheduled update </b></div>
        <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Battery :</b></div>
        <div class="col-3"><b>${info.punto.battery_voltage} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Frequency :  </b></div>
        <div class="col-3"><b> ${info.punto.running_frequency}</b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Voltage</b></div>
        <div class="col-3"><b>${info.punto.voltage_measure} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>RPM :  </b></div>
        <div class="col-3"><b>${info.punto.rpm} </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:1a2c4e;"><b> Fuel</b></div>
        <div class="col-3"><b>${info.punto.fuel_level} </b></div>
        <div class="col-3" style="color:1a2c4e;"> <b>Set POint :  </b></div>
        <div class="col-3"><b> ${info.punto.set_point} </b></div>    
     </div>
     `; 
    tableLocation += `
     <div class="row">
       <div class="col-3">Genset ID:</div>
       <div class="col-3"  style="color:blue;">${info.punto.nombre_generador} </div>
       <div class="col-3"></div>
       <div class="col-3"></div>
     </div>
    <div class="row">
       <div class="col-3">Device Fence:</div>
       <div class="col-3">-NA- </div>
       <div class="col-3"></div>
       <div class="col-3"></div>
     </div>
   <div class="row">
     <div class="col-3">Server Fence:</div>
     <div class="col-3">-NA- </div>
     <div class="col-3"></div>
     <div class="col-3"></div>
   </div>
   <div class="row">
     <div class="col-3">Latitud:</div>
     <div class="col-3">${info.punto.latitud}  </div>
     <div class="col-3"></div>
     <div class="col-3"></div>
   </div>
   <div class="row">
     <div class="col-3">Longitud:</div>
     <div class="col-3">${info.punto.longitud} </div>
     <div class="col-3"></div>
     <div class="col-3"></div>
   </div>
     `; 
     popTableTemplate += `
   <div class="row justify-content-center " style="width:400px;">
      <div  class="col-12">
      <button id="popBtnLocation" class="btnPopup popBtnLocation" type="button" onclick="showLocation()">Location</button>
      <button id="popBtnStatus" class="btnPopup popBtnStatus" type="button" onclick="showStatus()">Status</button>
      <button id="popBtnDetails" class="btnPopup popBtnDetails" type="button" onclick="showDetails()">Details</button>
      <button id="popBtnBooking" class="btnPopup popBtnBooking" type="button" onclick="showBooking()">Booking</button>
     </div>
    <div class="row mt-2 content-table">
        <div id="popLocation" class="col-lg-12 popLocation">${tableLocation} </div>
        <div id="popStatus" class="col-lg-12 popStatus"> ${tableStatus}</div>
        <div id="popDetails" class="col-lg-12 popDetails"> ${tableDetails} </div>
        <div id="popBooking" class="col-lg-12 popBooking">${tableBooking} </div>
    </div>
   </div>
     `; 
     showLocation();
    return popTableTemplate;    
}
async function filtroFechaG(id){
    fecha_pasada = moment().add(-24,'hour').format('YYYY-MM-DD HH:mm'); 
    fecha_actual = moment().format('YYYY-MM-DD HH:mm');
    acumulado1 = fecha_pasada +','+fecha_actual+';'+id;
    const config = {method: 'get',dataType: 'json', url: '../../ztrack2/controllers/principalController.php?option=consultaFechaGenset&id=' + acumulado1 }
    const buena =  await axios(config);
    const info = buena.data;
    $(".loader").show(); 
    tablaDatosGenset(info);
    graficaGenset(info);
    ultimoPuntoGenset(info,id);
    $(".loader").fadeOut("fast"); 
    $(function() {
        $('input[name="datetimes"]').daterangepicker({ timePicker: true,startDate : moment().add(-24,'hour'),endDate: moment(),locale: { format: 'YYYY-MM-DD ' }, },
        async function(start,end,label){
            idf =start.format('YYYY-MM-DD HH:mm');
            idf1 =end.format('YYYY-MM-DD HH:mm');
            acumulado = idf +','+idf1+';'+id;
            const config = {method: 'get',dataType: 'json', url: '../../ztrack2/controllers/principalController.php?option=consultaFechaGenset&id=' + acumulado }
            const buena =  await axios(config);
            const info1 = buena.data;
            $(".loader").show(); 
            tablaDatosGenset(info1);
            graficaGenset(info1);
            ultimoPuntoGenset(info1,id);
            $(".loader").fadeOut("fast"); 
          });
      });
      mostarG();
}
//Estipulamos la funcion recorrido
async function recorridoMapa(id){
    letraTipo = id.slice(0,1);
    telemetriaTotal = id.slice(2);
    saltarA('#inicio');
if(letraTipo=="G"){

  const config1 = {
          method: 'get',
          dataType: 'json',
          url: '../../ztrack2/controllers/reeferController.php?option=genset&id=' + telemetriaTotal
      }
  markers.clearLayers();
   const buena1 =  await axios(config1);
   const info1 = buena1.data;
    console.log(info1);
    primero = 0;
    html = '';
    listaR = [];   
    latlngs =[];
    info1.tramaGenset.forEach(permiso1 => {
      lat1 =permiso1.latitud;
      log1 = permiso1.longitud;
      if(lat1 !=0){
        latlngs.push(new L.latLng(lat1,log1));
      }
      //latlngs.push(new L.latLng(lat1,log1));
      var path = L.polyline(latlngs, {
        dashArray: "15,15",
        dashSpeed: -30
      }).addTo(markers);
      //console.log(latlngs);
      /*
      lat2=lat1.toFixed(3);
      log2=log1.toFixed(3);
      parametro = lat2 +" "+log2;
      if(primero<31){
        if(!listaR.includes(parametro)){
          primero =  primero +1;
          listaR.push(parametro);
          var photoIcon = L.icon({
            iconUrl: 'gdeg2.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [15, 15],
            iconAnchor:   [0,0],
            popupAnchor:  [0, 0],
           // iconUrl: 'gensetgris.svg',
            });
            var marker = L.marker([permiso1.latitud,permiso1.longitud], {icon: photoIcon}).addTo(markers);
            textoF = '';
            textoF += `
            <div class="row"  
               <div class="col-12"> <h3 align="center"><strong>Datos emitidos en el punto : </strong><h3></div>
            </div>
            <div class="row">
               <div class="col-3"></div>
               <div class="col-3"><strong>Hora : </strong></div>
               <div class="col-6"><strong>${permiso1.created_at} </strong></div>
               
               <div class="col-2"></div>
            </div>
          <div class="row">
               <div class="col-3">Latitud :</div>
               <div class="col-3"> ${permiso1.latitud} </div>
               <div class="col-3">Battery :</div>
               
               <div class="col-3">${permiso1.battery_voltage}</div>
            </div>
          <div class="row">
               <div class="col-3">Longitud :</div>
               <div class="col-3">${permiso1.longitud} </div>
               <div class="col-3"> Run : </div>
               
               <div class="col-3">${permiso1.running_frequency}</div>
            </div>
          <div class="row">
               <div class="col-3">Fuel : </div>
               <div class="col-3">${permiso1.fuel_level} </div>
               <div class="col-3">RPM :  </div>
               
               <div class="col-3">${permiso1.rpm} </div>
            </div>
             `; 
            //console.log(textoF);
            marker.bindPopup(textoF);
        }
      }
      */
    });
    map.removeLayer(markers1);
    //markers1
    //markers1.clear();
    var photoIcon1 = L.icon({
      iconSize:     [80, 129],
      iconAnchor:   [40, 93],
      popupAnchor:  [0, -55],
     iconUrl: 'g2.svg',
      });
      var marker1 = L.marker([info1.upunto.latitud,info1.upunto.longitud], {icon: photoIcon1}).addTo(markers);
      let textoF1 = await datospruebaG(info1.upunto.telemetria_id);
      //console.log(textoF);
      marker1.bindPopup(textoF1);
      marker1.on('click', markerOnClick)
      showLocation();
      var latlng1 =  L.latLng(info1.upunto.latitud+0.28,info1.upunto.longitud);
      map.setView(latlng1,9);
    //console.log(listaR);
   //  console.log(html);                
}
if(letraTipo=="R"){
  const config1 = {
          method: 'get',
          dataType: 'json',
          url: '../../ztrack/controllers/reeferController.php?option=reefer&id=' + telemetriaTotal
      }
  markers.clearLayers();
   const buena1 =  await axios(config1);
   const info1 = buena1.data;
   // console.log(info1);
    primero = 0;
    html = '';
    listaR = [];   
    info1.tramaReefer.forEach(permiso1 => {
      lat1 =permiso1.latitud;
      log1 = permiso1.longitud;
      lat2=lat1.toFixed(3);
      log2=log1.toFixed(3);
      parametro = lat2 +" "+log2;
      if(primero<21){
        if(!listaR.includes(parametro)){
          primero =  primero +1;
          listaR.push(parametro);
          var photoIcon = L.icon({
            iconUrl: 'refergris.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [100, 169],
            iconAnchor:   [52, 115],
            popupAnchor:  [-3, -60]
            });
            var marker = L.marker([permiso1.latitud,permiso1.longitud], {icon: photoIcon}).addTo(markers);
            let textoF = " Hora en el punto : " +permiso1.created_at;

            //console.log(textoF);
            marker.bindPopup(textoF).openPopup();
        }
      }
    });
    var photoIcon1 = L.icon({
      iconUrl: 'r.svg',
      //iconSize: [120, 220], // tamaño del icono
      iconSize:     [100, 169],
      iconAnchor:   [52, 115],
      popupAnchor:  [-3, -60]
      });
      var marker1 = L.marker([info1.upunto.latitud,info1.upunto.longitud], {icon: photoIcon1}).addTo(markers);
      let textoF1 =await datosprueba(info1.upunto.telemetria_id);
      //console.log(textoF);
      marker1.bindPopup(textoF1).openPopup();
      marker1.on('click', markerOnClick)
      showLocation();
      var latlng1 =  L.latLng(info1.upunto.latitud+0.28,info1.upunto.longitud);
      map.setView(latlng1,9);
    //console.log(listaR);
   //  console.log(html);                
}
if(letraTipo=="M"){
  /*

  const config1 = {
          method: 'get',
          dataType: 'json',
          url: '../../ztrack/controllers/reeferController.php?option=madurador&id=' + telemetriaTotal
      }
  markers.clearLayers();
   const buena1 =  await axios(config1);
   const info1 = buena1.data;
    console.log(info1);
    primero = 0;
    html = '';
    listaR = [];   
    info1.tramaReefer.forEach(permiso1 => {
      lat1 =permiso1.latitud;
      log1 = permiso1.longitud;
      lat2=lat1.toFixed(3);
      log2=log1.toFixed(3);
      parametro = lat2 +" "+log2;
      if(primero<21){
        if(!listaR.includes(parametro)){
          primero =  primero +1;
          listaR.push(parametro);
          var photoIcon = L.icon({
            iconUrl: 'maduradorgris.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [100, 169],
            iconAnchor:   [52, 115],
            popupAnchor:  [-3, -60]
            });
            var marker = L.marker([permiso1.latitud,permiso1.longitud], {icon: photoIcon}).addTo(markers); 
           // let textoF = " Hora en el punto : " +permiso1.created_at;
            textoF = '';
            textoF += `
            <div class="row">
               <div class="col-2">Genset ID: </div>
               <div class="col-8"> Datos emetidos en el punto :</div>
               <div class="col-2"></div>
            </div>
            <div class="row">
               <div class="col-3">Hora : </div>
               <div class="col-3">${permiso1.created_at} </div>
               <div class="col-3"></div>
               <div class="col-3"></div>
            </div>
             `; 
            //console.log(textoF);
            marker.bindPopup(textoF).openPopup();
        }
      }
    });
    var photoIcon1 = L.icon({
      iconUrl: 'm.svg',
      //iconSize: [120, 220], // tamaño del icono
      iconSize:     [100, 169],
      iconAnchor:   [52, 115],
      popupAnchor:  [-3, -60]
      });
      var marker1 = L.marker([info1.upunto.latitud,info1.upunto.longitud], {icon: photoIcon1}).addTo(markers);
      let textoF1 = await datosprueba(info1.upunto.telemetria_id);
      //let textoF1 = " Hora en el punto : " +info1.upunto.telemetria_id;
      //console.log(textoF);
      marker1.bindPopup(textoF1).openPopup();
      marker1.on('click', markerOnClick)
      showLocation();
      var latlng1 =  L.latLng(info1.upunto.latitud+0.28,info1.upunto.longitud);
      map.setView(latlng1,9);
    console.log(listaR);
   //  console.log(html); 
   
   */
   const config1 = {
    method: 'get',
    dataType: 'json',
    url: '../../ztrack2/controllers/reeferController.php?option=madurador&id=' + telemetriaTotal
}
markers.clearLayers();
const buena1 =  await axios(config1);
const info1 = buena1.data;
//console.log(info1);
primero = 0;
html = '';
listaR = [];   
latlngs =[];
info1.tramaReefer.forEach(permiso1 => {
lat1 =permiso1.latitud;
log1 = permiso1.longitud;
if(lat1 !=0){
  latlngs.push(new L.latLng(lat1,log1));
}
//latlngs.push(new L.latLng(lat1,log1));
var path = L.polyline(latlngs, {
  dashArray: "15,15",
  dashSpeed: -30
}).addTo(markers);


});
map.removeLayer(markers1);
//markers1
//markers1.clear();
var photoIcon1 = L.icon({
  iconSize:     [80, 129],
  iconAnchor:   [40, 93],
  popupAnchor:  [0, -55],
 iconUrl: 'fruta2.svg',
  });
  var marker1 = L.marker([info1.upunto.latitud,info1.upunto.longitud], {icon: photoIcon1}).addTo(markers);
  let textoF1 = await datosprueba(info1.upunto.telemetria_id);
  //console.log(textoF);
  marker1.bindPopup(textoF1);
  marker1.on('click', markerOnClick)
  showLocation();
  var latlng1 =  L.latLng(info1.upunto.latitud+0.28,info1.upunto.longitud);
  map.setView(latlng1,9);



}
}