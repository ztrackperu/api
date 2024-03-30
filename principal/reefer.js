async function tablaDatosReefer(info){  
     let html = '';
     let html1 = '';
     info.tramaReefer.forEach(permiso1 => {
        html += `
        <tr>
          <td><strong>${permiso1.created_at}</strong></td>
          <td>${validarDatosR_M(permiso1.set_point)}</td>
          <td>${validarDatosR_M(permiso1.temp_supply)}</td>
          <td>${validarDatosR_M(permiso1.return_air)}</td>
          <td>${validarDatosR_M(permiso1.evaporation_coil)} </td>
          <td>${validarDatosR_M(permiso1.ambient_air)}</td>
          <td>${validarDatosR_M(permiso1.cargo_1_temp)}</td>
          <td>${validarDatosR_M(permiso1.relative_humidity)}</td>
          <td>${permiso1.alarm_present}</td>
          <td>${permiso1.alarm_number}</td>
          <td>${permiso1.controlling_mode}</td>
          <td>${permiso1.power_state}</td>
          <td>${validarDatosR_M(permiso1.defrost_term_temp)}</td>
          <td>${validarDatosR_M(permiso1.defrost_interval)}</td>
          <td>${permiso1.latitud}</td>
          <td>${permiso1.longitud}</td>
          </td>
        </tr>
        `;
      });
          tramareffer.innerHTML = html;
      html1 += `
        <div class="row">     
        <input name="telemetria_id" type="hidden" value="${info.reefer.telemetria_id}" />
        <button class="btn btn-success btn-lg btn-block" type="submit">DOWNLOAD DATA IN EXCEL</button>
      `;
      bajarExcelR.innerHTML = html1;
}
const actions = [
  {
    name: 'LTTB decimation (500 samples)',
    handler(chart) {
      chart.options.plugins.decimation.algorithm = 'lttb';
      chart.options.plugins.decimation.enabled = true;
      chart.options.plugins.decimation.samples = 500;
      chart.update();
    }
  }
];
async function graficaReefer(info){    
    if (typeof w !== 'undefined') { w.destroy();}
    setPoint =[];
    returnAir = [];
    tempSupply =[];
    ambienteAir =[];
    relativeHumidity =[];
    evaporationCoil =[];   
    fecha =[]; 
    fecha1 =[];
    info.tramaReefer.forEach(permiso => {
       /*
        setPoint.push(parseFloat(permiso.set_point));
        returnAir.push(parseFloat(permiso.return_air));
        tempSupply.push(parseFloat(permiso.temp_supply));
        ambienteAir.push(parseFloat(permiso.ambient_air));
        relativeHumidity.push(parseFloat(permiso.relative_humidity));
        evaporationCoil.push(parseFloat(permiso.evaporation_coil));
        fecha1.push(permiso.created_at);
        preDate = Date.parse(permiso.created_at);
        //postDate = new Date(preDate);
        fecha.push(preDate);
        */
        setPoint.unshift(parseFloat(permiso.set_point));
        returnAir.unshift(parseFloat(permiso.return_air));
        tempSupply.unshift(parseFloat(permiso.temp_supply));
        ambienteAir.unshift(parseFloat(permiso.ambient_air));
        relativeHumidity.unshift(parseFloat(permiso.relative_humidity));
        evaporationCoil.unshift(parseFloat(permiso.evaporation_coil));
        fecha1.unshift(permiso.created_at);
        preDate = Date.parse(permiso.created_at);
        //postDate = new Date(preDate);
        fecha.push(preDate);
    });
  const pointData =[];
    //zona segura para filtrado de datos:
        /*
    for(let i=0 ;i<fecha.length ; i++ ){
       pointData.push({x: fecha[i], y:relativeHumidity[i]})
    }

console.log(pointData);  
const data = {
    datasets: [{
      borderColor: '#95a5a6',
      borderWidth: 1,
      data: pointData,
      label: 'Large Dataset',
      radius: 0,
    }]
  };
   w = new Chart(grafica1, {
    type: 'line',// Tipo de gráfico
    data: data,
    options: {
      // Turn off animations and data parsing for performance
      animation: false,
      parsing: false,
  
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },

      scales: {
        x: {
          type: 'time',
          ticks: {
            source: 'auto',
            // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
          }
        }
      }
    }
  

      });
   
*/
    const datosEvaporationCoil ={
        label : " Evap",
        data : evaporationCoil,
        backgroundColor: '#95a5a6', // Color de fondo
        borderColor: '#95a5a6', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        hidden :true ,
         
     }   
        
    const datosSetPoint ={
        label : " SetPoint",
        data : setPoint,
        backgroundColor: '#f1c40f', // Color de fondo
        borderColor: '#f1c40f', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
  
     }
    const datosreturnAir ={
        label : " Return ",
        data : returnAir,
        backgroundColor: '#ec7063', // Color de fondo
        borderColor: '#ec7063', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,

     }
    const datostempSupply ={
        label : " Supply",
        data : tempSupply,
        backgroundColor: '#27ae60', // Color de fondo
        borderColor: '#27ae60', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
    }
    const datosambienteAir ={
        label : " Ambient",
        data : ambienteAir,
        backgroundColor: '#9ccc65', // Color de fondo
        borderColor: '#9ccc65', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,

    }
    
    const datorelativeHumidity ={
        label : "Humidity",
        data : relativeHumidity, 
        backgroundColor: '#e4c1f4', // Color de fondo
        borderColor: '#e4c1f4', // Color del borde4476c6
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y1',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4  ,
        //fill: true,   
        }
        descargarImagen = 1;
        a = document.createElement('a');
        w = new Chart(grafica1, {
          type: 'line',// Tipo de gráfico
          data: {
            labels: fecha1,
            datasets: [
              datosambienteAir,  
              datostempSupply,
              datosreturnAir,
              datosSetPoint,
              datorelativeHumidity,
              datosEvaporationCoil,
              // Aquí más datos...
            ]
          },
          options: {
            backgroundColor : "#fff",
            animation: {
              onComplete: function () {
                      //console.log(w.toBase64Image());
                      //if(descargarImagen==1){
                      var today = moment().format("DD-MM-YYYY_HH-mm-ss");
                      var dispositivoGrafica = info.reefer.nombre_contenedor;        
                      bajarGrafica.href= w.toBase64Image();
                      bajarGrafica.download =''+dispositivoGrafica+'_'+today;
                        //bajarGrafica.click();
                      //}
              },
            },
            //animation: false,
      
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
                  ticks: {
                    beginAtZero: true
                  },
                  text: 'Temperature (C°)',
                  color: '#1a2c4e',
                  font: {
      
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                  },
                  padding: {top: 30, left: 0, right: 0, bottom: 0}
                },
                suggestedMin: -0,
                suggestedMax: 60
              },
              y1: {
                display: true,
                position: 'right',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage (%)',
                  color: '#1a2c4e',
                  font: {
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                  },
                  padding: {top: 30, left: 0, right: 0, bottom: 0}
                },
                suggestedMin: 0,
                suggestedMax: 100,                
                // grid line settings
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
              },
            },
            plugins: {
              datalabels: {
                color: function(context) {
                  return context.dataset.backgroundColor;
                },
                font: {
                  weight: 'bold'
                },          
                padding: 6,
                display: 'auto',
                clip :'true',
                clamp :'true',
                align: 'end',   
              },

      
              title: {
                display: true,                
                text: 'Reefer Monitoring Data : '+info.reefer.nombre_contenedor +'('+info.reefer.descripcionC+')',
                color: '#1a2c4e',
                font: {
                  size: 30,
                  style: 'normal',
                  lineHeight: 1.2
                },
                padding: {top: 20, bottom: 20}
              },
              zoom: {
                pan :{
                  enabled :true,
                  mode: 'x',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                    modifierKey : 'ctrl',
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'x',
                  drag :{
                    enabled: true,
                    backgroundColor : 'rgba(220,229,244,0.5)',
                  },
                  scaleMode :'x',
                }
              },
              customCanvasBackgroundColor : {
                color :'#fff',
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
                  }
                }
              },
          },
          spanGaps : true,
          showLine :true,           
        },
        plugins : [plugin,ChartDataLabels],
      });

//console.log(data_imagen);
 // var image = w.toBase64Image();
  //console.log(image);

}
async function ultimoPuntoReefer(info1,id) {
    markers.clearLayers();
    lat =parseFloat(info1.reefer.latitud);
    log = parseFloat(info1.reefer.longitud);
    var photoIcon = L.icon({ iconUrl: 'pp3.svg', iconSize:[80, 129],iconAnchor:[40, 93],popupAnchor: [0, -55]});
    var marker = L.marker([lat,log], {icon: photoIcon}).addTo(markers);
    let textoF = await datosprueba(id);
    marker.bindPopup(textoF);
    marker.on('click', markerOnClick)
    showLocation();
    var latlng =  L.latLng(lat,log);
    map.setView(latlng,14);
    saltarA('#g1g1');  
}
async function datosMapa(id){
  const config = {
    method: 'get',
    dataType: 'json',
    url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
}
 const buena =  await axios(config);
 const info = buena.data;   
 //console.log(info);
 tableStatus = '';
 popTableTemplate=''; 
  tableStatus += `
  <div class="row">
     <div class="col-3" style="color:#1a2c4e;"><b>Reefer ID: </b></div>
     <div class="col-3"><b>${info.punto.nombre_contenedor} </b></div>
     <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
     <div class="col-3"><b> </b></div>
  </div>
  <div class="row">
     <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
     <div class="col-5" style="color:blue;"><h5>${info.punto.ultima_fecha} </h5></div>
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
     <div class="col-3" style="color:#1a2c4e;"><b>Setpoint :</b></div>
     <div class="col-3"><b>${info.punto.set_point} C°</b></div>
     <div class="col-3" style="color:#1a2c4e;"> <b>Evaporation :  </b></div>
     <div class="col-3"><b> ${info.punto.evaporation_coil} C°</b></div>
  </div>
 <div class="row">
     <div class="col-3" style="color:#1a2c4e;"><b>Return Temp</b></div>
     <div class="col-3"><b>${info.punto.return_air} C° </b></div>
     <div class="col-3" style="color:#1a2c4e;"> <b>Ambient :  </b></div>
     <div class="col-3"><b>${info.punto.ambient_air} C° </b></div>
  </div>
 <div class="row">
     <div class="col-3" style="color:1a2c4e;"><b>Supply Temp</b></div>
     <div class="col-3"><b>${info.punto.temp_supply_1} C°</b></div>
     <div class="col-3" style="color:1a2c4e;"> <b>Humedite :  </b></div>
     <div class="col-3"><b> ${info.punto.relative_humidity} %</b></div>    
  </div>
  `; 
}
async function datosprueba(id){
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
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
        <div class="col-3">Reefer ID: </div>
        <div class="col-3">${info.punto.nombre_contenedor} </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
     </div>
     <div class="row">
     <div class="col-3">COMPANY : </div>
     <div class="col-5" style="color:blue;">${info.empresa.nombre_empresa} </div>
     <div class="col-1"></div>
     <div class="col-3"></div>
  </div>
  <div class="row">
  <div class="col-3">Temperature : </div>
  <div class="col-3">${info.empresa.temp_contratada} </div>
  <div class="col-3"></div>
  <div class="col-3"></div>
</div>
<div class="row">
<div class="col-3"> Alias : </div>
<div class="col-3" ><a class="dropdown-item" style ="color:orange;" onclick="aliasEmpresa(${info.punto.id} )">${info.punto.descripcionC} </a></div>
<div class="col-3"></div>
<div class="col-3"></div>
</div>
      `; 
      tableAlarms += `
      <div class="row">
         <div class="col-5">AQUI VA ALARMS</div>
         <div class="col-3">${info.punto.nombre_contenedor} </div>
         <div class="col-3"></div>
         <div class="col-1"></div>
      </div>
       `; 
     tableDetails += `
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Reefer ID: </b></div>
        <div class="col-3"><b>${info.punto.nombre_contenedor} </b></div>
        <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
        <div class="col-3"><b> </b></div>
     </div>
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>USDA 1 :</b></div>
        <div class="col-3"><b>-NA- </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>USDA 2 :  :  </b></div>
        <div class="col-3"><b> -NA- </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>USDA 3 :</b></div>
        <div class="col-3"><b>-NA-  </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>USDA 4 :  </b></div>
        <div class="col-3"><b>-NA- </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:1a2c4e;"><b>Alarm  : </b></div>
        <div class="col-3"><b>-NA-</b></div>
        <div class="col-3" style="color:1a2c4e;"> <b>Intervale : :  </b></div>
        <div class="col-3"><b> -NA-</b></div>    
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Setpoint :</b></div>
        <div class="col-3"><b>${info.punto.set_point} C°</b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Evaporation :  </b></div>
        <div class="col-3"><b> ${info.punto.evaporation_coil} C°</b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Return Temp</b></div>
        <div class="col-3"><b>${info.punto.return_air} C° </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Ambient :  </b></div>
        <div class="col-3"><b>${info.punto.ambient_air} C° </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:1a2c4e;"><b>Supply Temp</b></div>
        <div class="col-3"><b>${info.punto.temp_supply_1} C°</b></div>
        <div class="col-3" style="color:1a2c4e;"> <b>Humedite :  </b></div>
        <div class="col-3"><b> ${info.punto.relative_humidity} %</b></div>    
     </div>
     `; 
     tableStatus += `
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Reefer ID: </b></div>
        <div class="col-3"><b>${info.punto.nombre_contenedor} </b></div>
        <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
        <div class="col-3"><b> </b></div>
     </div>
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
        <div class="col-5" style="color:blue;"><h5>${info.punto.ultima_fecha} </h5></div>
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
        <div class="col-3" style="color:#1a2c4e;"><b>Setpoint :</b></div>
        <div class="col-3"><b>${info.punto.set_point} C°</b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Evaporation :  </b></div>
        <div class="col-3"><b> ${info.punto.evaporation_coil} C°</b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Return Temp</b></div>
        <div class="col-3"><b>${info.punto.return_air} C° </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Ambient :  </b></div>
        <div class="col-3"><b>${info.punto.ambient_air} C° </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:1a2c4e;"><b>Supply Temp</b></div>
        <div class="col-3"><b>${info.punto.temp_supply_1} C°</b></div>
        <div class="col-3" style="color:1a2c4e;"> <b>Humedite :  </b></div>
        <div class="col-3"><b> ${info.punto.relative_humidity} %</b></div>    
     </div>
     `; 
    tableLocation += `
     <div class="row">
       <div class="col-3">Reeferer ID:</div>
       <div class="col-3"  style="color:blue;">${info.punto.nombre_contenedor} </div>
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
        <div id="popLocation" class="col-lg-12 popLocation">
           ${tableLocation}
        </div>
        <div id="popStatus" class="col-lg-12 popStatus">
          ${tableStatus}
        </div>
        <div id="popDetails" class="col-lg-12 popDetails">
          ${tableDetails}
        </div>
        <div id="popBooking" class="col-lg-12 popBooking">
        ${tableBooking} 
        </div>
    </div>
   </div>
     `; 
     showLocation();
    return popTableTemplate;    
}
async function filtroFechaR(id){
  $(".loader").show();
  fecha_pasada = moment().add(-24,'hour').format('YYYY-MM-DD HH:mm'); 
  fecha_actual = moment().format('YYYY-MM-DD HH:mm');
  acumulado1 = fecha_pasada +','+fecha_actual+';'+id;
  const config = {method: 'get',dataType: 'json', url: '../../ztrack2/controllers/principalController.php?option=consultaFechaReefer&id=' + acumulado1 }
  const buena =  await axios(config);
  const info = buena.data;
  graficaReefer(info);
  ultimoPuntoReefer(info,id);
  $(".loader").fadeOut("fast");
  tablaDatosReefer(info);
  $(function() {
      $('input[name="datetimes"]').daterangepicker({ timePicker: true,startDate : moment().add(-24,'hour'),endDate: moment(),locale: { format: 'YYYY-MM-DD ' }, },
      async function(start,end,label){
          $(".loader").show();
          idf =start.format('YYYY-MM-DD HH:mm ');
          idf1 =end.format('YYYY-MM-DD HH:mm ');
          acumulado = idf +','+idf1+';'+id;
          const config = {method: 'get',dataType: 'json', url: '../../ztrack2/controllers/principalController.php?option=consultaFechaReefer&id='  + acumulado }
          const buena =  await axios(config);
          const info1 = buena.data;
          graficaReefer(info1);
          ultimoPuntoReefer(info1,id);
          $(".loader").fadeOut("fast");
          tablaDatosReefer(info1);
        });
    });
    mostarR();
}