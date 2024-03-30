const tramareffer = document.querySelector('#frmTramaReefer2');
const grafica1 = document.getElementById("graficaFinal");

async function tablaDatosReefer(tipo,empresa){
    console.log(tipo);
    if(tipo ==1){

        const config = {
            method: 'get',
            dataType: 'json',
            url: '../../ztrack/controllers/reeferController.php?option=reeferAdmin'
        }
        const buena =  await axios(config);
        const info = buena.data; 

        let html = '';
        /*
        info.reeferTotal.forEach(permiso1 => {
          html += `



    <tr  onclick="listaTramaR1(${permiso1.telemetria_id})">
          <td></td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td><strong>${permiso1.tipo}</strong></td>        
          <td><strong>${permiso1.nombre_contenedor}</strong></td>
          <td>MP4000</td>
          <td><strong>${permiso1.descripcionC}</strong></td>
          <td>${permiso1.temp_contratada}</td>
          <td>${permiso1.nombre_empresa}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.ultima_fecha}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.latitud} , ${permiso1.longitud} </td>
          <td>0</td>
          <td>Distrito</td>
          <td>Provincia</td>
          <td>Departamento</td>
          <td>${permiso1.NA}</td>
          <td>${permiso1.NA}</td>
          <td>Frozen</td>

          <td>${permiso1.ultima_fecha}</td>
          <td>${permiso1.set_point}</td>
          <td>${permiso1.temp_supply_1}</td>
          <td>${permiso1.temp_supply_2}</td>          

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






          `;
        });
            tramareffer.innerHTML = html;

        */



        console.log(info);

    }else{

    }

}



async function filtroFecha(id){
    

    $(function() {
        $('input[name="datetimes"]').daterangepicker({
          timePicker: true,
          startDate: moment().startOf('hour'),
          endDate: moment().startOf('hour').add(32, 'hour'),
          locale: {
            format: 'YYYY-MM-DD hh:mm A'
          },
          
    
        },
        async function(start,end,label){
            console.log("La fecah seleccioanda empieza en : "+start.format('YYYY-MM-DD HH:MM ') + " y termina en : "+ end.format('YYYY-MM-DD HH:MM'))
            idf =start.format('YYYY-MM-DD HH:MM ');
            idf1 =end.format('YYYY-MM-DD HH:MM ');
            idf2 = id;
            acumulado = idf +','+idf1+';'+idf2;
            const config = {
                method: 'get',
                dataType: 'json',
                url: '../../ztrack/controllers/principalController.php?option=consultaFecha&id=' + acumulado
            }
             const buena =  await axios(config);
             const info = buena.data;   
             console.log(info);
             let html = '';
             info.tramaReefer.forEach(permiso1 => {
               html += `
               <tr>
                 <td>${permiso1.created_at}</td>
                 <td>${permiso1.set_point}</td>
                 <td>${permiso1.temp_supply}</td>
                 <td>${permiso1.return_air}</td>
                 <td>${permiso1.evaporation_coil}</td>
                 <td>${permiso1.ambient_air}</td>
                 <td>${permiso1.cargo_1_temp}</td>
                 <td>${permiso1.relative_humidity}</td>
                 <td>${permiso1.alarm_present}</td>
                 <td>${permiso1.alarm_number}</td>
                 <td>${permiso1.controlling_mode}</td>
                 <td>${permiso1.power_state}</td>
                 <td>${permiso1.defrost_term_temp}</td>
                 <td>${permiso1.defrost_interval}</td>
                 <td>${permiso1.latitud}</td>
                 <td>${permiso1.longitud}</td>
                 </td>
               </tr>
               `;
             });
                 tramareffer.innerHTML = html;
         
                
                 if (typeof w !== 'undefined') {
                     w.clear();
                     w.destroy();
                 }
                 setPoint =[];
                 returnAir = [];
                 tempSupply =[];
                 ambienteAir =[];
                 relativeHumidity =[];
                 evaporationCoil =[];
           
                 fecha =[];
               
                 
                 //let html = '';
           
                 console.log(info);
           
                 info.tramaReefer.forEach(permiso => {
                   setPoint.push(parseFloat(permiso.set_point));
                   returnAir.push(parseFloat(permiso.return_air));
                   tempSupply.push(parseFloat(permiso.temp_supply));
                   ambienteAir.push(parseFloat(permiso.ambient_air));
                   relativeHumidity.push(parseFloat(permiso.relative_humidity));
                   evaporationCoil.push(parseFloat(permiso.evaporation_coil));
                   fecha.push(permiso.created_at);
                 });
                      //console.log(setPoint)
                      //console.log(returnAir)
                      //console.log(tempSupply)
                      //console.log(ambienteAir)
                      //console.log(relativeHumidity)
           
                      //etiqueta
                      //console.log(fecha)
                      
           
                      // revertir orden de array
                      setPoint1 =setPoint;
                      returnAir1 = returnAir;
                      tempSupply1 =tempSupply;
                      ambienteAir1 =ambienteAir;
                      relativeHumidity1 =relativeHumidity;
                      evaporationCoil1 =evaporationCoil;
                      fecha1 =fecha;
           
                      const datosEvaporationCoil ={
                         label : " Evaporation Coil",
                         data : evaporationCoil1,
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
                         data : setPoint1,
                         backgroundColor: '#f1c40f', // Color de fondo
                         borderColor: '#f1c40f', // Color del borde
                         borderWidth: 3,
                         yAxisID : 'y',
                         pointRadius: 0,
                         cubicInterpolationMode: 'monotone',
                         tension: 0.4 
             
                     }
                     const datosreturnAir ={
                         label : " Return ",
                         data : returnAir1,
                         backgroundColor: '#ec7063', // Color de fondo
                         borderColor: '#ec7063', // Color del borde
                         borderWidth: 3,// Ancho del borde
                         yAxisID : 'y',
                         pointRadius: 0,
                         cubicInterpolationMode: 'monotone',
                         tension: 0.4
             
                     }
                     const datostempSupply ={
                         label : " Supply",
                         data : tempSupply1,
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
                         data : ambienteAir1,
                         backgroundColor: '#9ccc65', // Color de fondo
                         borderColor: '#9ccc65', // Color del borde
                         borderWidth: 3,// Ancho del borde
                         yAxisID : 'y',
                         pointRadius : 0,
                         cubicInterpolationMode: 'monotone',
                         tension: 0.4
             
                     }
                     const datorelativeHumidity ={
                         label : "Humidity",
                         data : relativeHumidity1,
                         backgroundColor: '#e4c1f4', // Color de fondo
                         borderColor: '#e4c1f4', // Color del borde4476c6
             
                         borderWidth: 3,// Ancho del borde
                         yAxisID : 'y1',
                         pointRadius : 0,
                         cubicInterpolationMode: 'monotone',
                         tension: 0.4
             
                     }
                   console.log(info.contenedor);
         
                    w = new Chart(grafica1, {
                         type: 'line',// Tipo de gráfica
                         
                         data: {
                             labels: fecha1,
                             datasets: [
                                 datosreturnAir,
                                 datorelativeHumidity,
                                 datosambienteAir,
                                 datostempSupply,
                                 datosEvaporationCoil,
                                 datosSetPoint,
             
                                 // Aquí más datos...
                             ]
                         },
                         options: {
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
                                       text: 'Temperature (C°)',
                                       color: '#1a2c4e',
                                       font: {
                                         family: 'Times',
                                         size: 20,
                                         style: 'normal',
                                         lineHeight: 1.2
                                       },
                                       padding: {top: 30, left: 0, right: 0, bottom: 0}
                                     },
                                     suggestedMin: -30,
                                     suggestedMax: 60
         
         
                                 },
                                 y1: {
                                   type: 'linear',
                                   display: true,
                                   position: 'right',
                                   beginAtZero: true,
                                   title: {
                                     display: true,
                                     text: 'Percentage (%)',
                                     color: '#1a2c4e',
                                     font: {
                                       family: 'Times',
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
                                     text: 'Reefer Monitoring Data : '+info.contenedor.nombre_contenedor +'('+info.contenedor.descripcionC+')',
                                     color: '#1a2c4e',
                                     font: {
                                       family: 'Times',
                                       size: 35,
                                       style: 'normal',
                                       lineHeight: 1.2
                                     },
                                     padding: {top: 30, left: 0, right: 0, bottom: 0}
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
                                 }
                             }
                         
                         }
                     });


          }
        );
      });
}




var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom :3,
    attribution: 'ZGROUP &copy; lupamape contributors'
});
$(document).ready(function() {
    $('#buenab').select2();
});
var map = L.map('map',{zoom:5, center: new L.latLng([-9.04,-70]),zoomControl:false,layers:[zgroup]});
var markers;
markers = new L.LayerGroup().addTo(map);
var markers1 = L.markerClusterGroup({ singleMarkerMode: true});
//var marker ="";
function elcolor(d){
    return d==1 ?'green':
           d==2 ?'orange':
           d==3 ?'gray':
           'black';
}

function ocultar(){
    tablaDatosReefer(1,14);
   document.getElementById('g1g1').style.display = 'none';
   document.getElementById('tami').style.display = 'none';
    document.getElementById('ocultar1').style.display = 'none';
    document.getElementById('ocultar2').style.display = 'none';
    document.getElementById('botonAdministracion').style.display = 'none';
    document.getElementById('botonProgramacion').style.display = 'none';
    document.getElementById('botonSoporte').style.display = 'none';
}
function mostar(){
    document.getElementById('g1g1').style.display = 'block';
    document.getElementById('tami').style.display = 'block';
     document.getElementById('ocultar1').style.display = 'block';
     document.getElementById('ocultar2').style.display = 'block';
 }

async function datosprueba(id){
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;   
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
       <div class="col-5">AQUI VA DETAILS</div>
       <div class="col-3">${info.punto.nombre_contenedor} </div>
       <div class="col-3"></div>
       <div class="col-1"></div>
    </div>
     `; 
     tableStatus += `
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Reefer 1ID: </b></div>
        <div class="col-3"><b>${info.punto.nombre_contenedor} </b></div>
        <div class="col-3" style="color:#1a2c4e;"><b>a </b> </div>
        <div class="col-3"><b> a</b></div>
     </div>
     <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
        <div class="col-3"><b>${info.ultimaTrama.created_at} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b> </b></div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Event : </b></div>
        <div class="col-3"><b>Scheduled update </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b> </b></div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Setpoint :</b></div>
        <div class="col-3"><b>${info.ultimaTrama.set_point} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>Alarm :  </b></div>
        <div class="col-3"><b> </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:#1a2c4e;"><b>Return Temp</b></div>
        <div class="col-3"><b>${info.ultimaTrama.set_point} </b></div>
        <div class="col-3" style="color:#1a2c4e;"> <b>PWR :  </b></div>
        <div class="col-3"><b>Powered </b></div>
     </div>
    <div class="row">
        <div class="col-3" style="color:blue;"><b>Supply Temp</b></div>
        <div class="col-3"><b>${info.ultimaTrama.set_point} </b></div>
        <div class="col-3" style="color:blue;"> <b>RUN :  </b></div>
        <div class="col-3"><b> Running</b></div>    
     </div>
     `; 
    tableLocation += `
     <div class="row">
       <div class="col-3">Reeferer ID:</div>
       <div class="col-3">${info.punto.nombre_contenedor} </div>
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
      <button id="popBtnAlarms" class="btnPopup popBtnAlarms" type="button" onclick="showAlarms()">Alarms</button>
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
        <div id="popAlarms" class="col-lg-12 popAlarms">
        ${tableAlarms} 
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

function nombre_contenedor(telemetria_id){
    axios.get('../../ztrack/controllers/principalController.php?option=circulos1&id=' + telemetria_id)
    .then(function (response) {    
        const info = response.data;     
        console.log(info);
        //console.log(info.nombre.nombre_contenedor);
    })
}
function cargar_circulos1()
{
   
    axios.get('../../ztrack/controllers/principalController.php?option=circulos')
    .then(function (response) {    
        const info = response.data; 
        //console.log(info);
        //console.log(info.contenedores.length);
        for(var i = 0 ; i<info.contenedores.length ; i++){
            
            var circulo = L.circleMarker([info.contenedores[i].latitud,info.contenedores[i].longitud],{
                radius:8,
                color :elcolor(info.contenedores[i].estado),
                fillColor : elcolor(info.contenedores[i].estado),
                fillOpacity :1
                
            }).bindPopup('Contenedor: '+info.contenedores[i].nombre_contenedor);
            
            //var m = L.marker([info.contenedores[i].latitud,info.contenedores[i].longitud]);
            markers1.addLayer(circulo);
            
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function cargar_circulos()
{
    saltarA('#inicio');
    //disableScroll();
    ocultar()
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/principalController.php?option=circulos'
    }
    const buena =  await axios(config);
    const info = buena.data;

    //info.contenedores.forEach(permiso1 => {
    //})
    for(var i = 0 ; i<info.contenedores.length ; i++){
            
        var circulo = L.circleMarker([info.contenedores[i].latitud,info.contenedores[i].longitud],{
            radius:8,
            color :elcolor(info.contenedores[i].estado),
            fillColor : elcolor(info.contenedores[i].estado),
            fillOpacity :1
            
        });
        let textoF = await datosprueba(info.contenedores[i].telemetria_id);

        //console.log(textoF);
        circulo.bindPopup(textoF);
        circulo.on('click', markerOnClick);
        markers1.addLayer(circulo);  
        
    }

}
markers.on('clusterclick', function (a) {
    a.layer.zoomToBounds();
});
map.addLayer(markers1);


$(document).ready(function () {


     // para resaltar filas y columnas




    var table2 =  $('#table_reffer1').DataTable({
        scrollY: 300,
        scrollX: true,
        pageLength: 100,
        processing: true,
    });  
    var table =  $('#example').DataTable({
        scrollY: 140,
        scrollX: true,
        pageLength: 100,
        processing: true,
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            //array utilizado para ocultar 
            //ocultar : [1,2,3],
            //  2 COLUMNAS OCULTAS EN :State Indicators
            {
                target: 5,
                visible: false,
               
           
            },
            {
                target: 6,
                visible: false,
            },
            //  1 COLUMNAS OCULTAS EN :Identification
            {
                target: 9,
                visible: false,
            },
            //  2 COLUMNAS OCULTAS EN :Booking
            {
                target: 11,
                visible: false,
            },
            {
                target: 12,
                visible: false,
            },
            //5 COLUMNAS OCULTAS EN :Report Date/Time and Location
            {
                target: 17,
                visible: false,
            },
            {
                target: 18,
                visible: false,
            },
            {
                target: 19,
                visible: false,
            },
            {
                target: 20,
                visible: false,
            },
            {
                target: 24,
                visible: false,
            },
            //32 COLUMNAS OCULTAS EN :Reefer Status and Sensor Reporting
            {
                target: 27,
                visible: false,
            },
            {
                target: 30,
                visible: false,
            },
            {
                target: 32,
                visible: false,
            },
            {
                target: 40,
                visible: false,
            },
            {
                target: 41,
                visible: false,
            },
            {
                target: 42,
                visible: false,
            },
            {
                target: 43,
                visible: false,
            },
            {
                target: 44,
                visible: false,
            },
            {
                target: 45,
                visible: false,
            },
            {
                target: 46,
                visible: false,
            },
            {
                target: 47,
                visible: false,
            },
            {
                target: 48,
                visible: false,
            },
            {
                target: 49,
                visible: false,
            },
            {
                target: 50,
                visible: false,
            },
            {
                target: 51,
                visible: false,
            },
            {
                target: 52,
                visible: false,
            },
            {
                target: 53,
                visible: false,
            },
            {
                target: 54,
                visible: false,
            },
            {
                target: 55,
                visible: false,
            },
            {
                target: 60,
                visible: false,
            },
            {
                target: 62,
                visible: false,
            },
            {
                target: 63,
                visible: false,
            },
            {
                target: 64,
                visible: false,
            },
            {
                target: 65,
                visible: false,
            },
            {
                target: 66,
                visible: false,
            },
            {
                target: 67,
                visible: false,
            },
            {
                target: 73,
                visible: false,
            },
            {
                target: 74,
                visible: false,
            },
            {
                target: 75,
                visible: false,
            },
            {
                target: 76,
                visible: false,
            },
            {
                target: 77,
                visible: false,
            },
            {
                target: 78,
                visible: false,
            },
            ////15 COLUMNAS OCULTAS EN :Device Satus 
            {
                target: 80,
                visible: false,
            },
            {
                target: 81,
                visible: false,
            },
            {
                target: 82,
                visible: false,
            },
            {
                target: 83,
                visible: false,
            },
            {
                target: 84,
                visible: false,
            },
            {
                target: 88,
                visible: false,
            },
            {
                target: 89,
                visible: false,
            },
            {
                target: 90,
                visible: false,
            },
            {
                target: 91,
                visible: false,
            },
            {
                target: 92,
                visible: false,
            },
            {
                target: 93,
                visible: false,
            },
            {
                target: 94,
                visible: false,
            },
            {
                target: 95,
                visible: false,
            },
            {
                target: 98,
                visible: false,
            },
            {
                target: 99,
                visible: false,
            },
            //1 OCULTO Misc.
            {
                target: 100,
                visible: false,
            },

        ],
        order: [[1, 'asc']],
     });
     
     // para resaltar filas y columnas

    // funcion que se invoca para ordenar 
    table.on('order.dt search.dt', function () {
        let i = 1;
 
        table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();
    // funcion click para ocultar columnas

    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
        // Get the column API object
        var col = table.column(5);
        var col1 = table.column(6);
        col.visible(!col.visible());
        col1.visible(!col1.visible());
    });
    $('a.toggle-vis1').on('click', function (e) {
        e.preventDefault();
 
        var col = table.column($(this).attr('data-column'));
        
        col.visible(!col.visible());
     
    });
    $('a.toggle-vis2').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [11,12];
        colOcultars.forEach(function(colOcultar, index) {
            //console.log(`${index} : ${colOcultar}`);
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis3').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [17,18,19,20,24];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis4').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [27,30,32,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,60,62,63,64,65,66,67,73,74,75,76,77,78];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis5').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [80,81,82,83,84,88,89,90,91,92,93,94,95,98,99];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis6').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [100];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table.column(colOcultar);
            col.visible(!col.visible());
        });
    });  
    
    // aqui va la tabla de Maduradores 

    // funcion click para ocultar columnas
     /*
    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
        // Get the column API object
        var col = table1.column(5);
        var col1 = table1.column(6);
        col.visible(!col.visible());
        col1.visible(!col1.visible());
    });
    $('a.toggle-vis1').on('click', function (e) {
        e.preventDefault();
 
        var col = table1.column($(this).attr('data-column'));
        
        col.visible(!col.visible());
     
    });
    $('a.toggle-vis2').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [11,12];
        colOcultars.forEach(function(colOcultar, index) {
            //console.log(`${index} : ${colOcultar}`);
            var col = table1.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis3').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [17,18,19,20,24];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table1.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis4').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [27,30,32,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,60,62,63,64,65,66,67,73,74,75,76,77,78];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table1.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis5').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [80,81,82,83,84,88,89,90,91,92,93,94,95,98,99];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table1.column(colOcultar);
            col.visible(!col.visible());
        });
    });
    $('a.toggle-vis6').on('click', function (e) {
        e.preventDefault();
        const colOcultars = [100];
        colOcultars.forEach(function(colOcultar, index) {
            var col = table1.column(colOcultar);
            col.visible(!col.visible());
        });
    }); 
    */ 
});
      
function showLocation(){
    removeActive()
    $(".popBtnLocation").addClass("btnActive");
    $(".popLocation").show()    
    $(".popStatus").hide()
    $(".popDetails").hide()
    $(".popAlarms").hide()
    $(".popBooking").hide()
}
function showStatus(){
    removeActive()
    $(".popBtnStatus").addClass("btnActive");
    $(".popLocation").hide()
    $(".popStatus").show()
    $(".popDetails").hide()
    $(".popAlarms").hide()
    $(".popBooking").hide()
}
function showDetails(){
    removeActive()
    $(".popBtnDetails").addClass("btnActive");
    $(".popLocation").hide()
    $(".popStatus").hide()
    $(".popDetails").show()
    $(".popAlarms").hide()
    $(".popBooking").hide()
}
function showAlarms(){
    removeActive()
    $(".popBtnAlarms").addClass("btnActive");
    $(".popLocation").hide()
    $(".popStatus").hide()
    $(".popDetails").hide()
    $(".popAlarms").show()
    $(".popBooking").hide()
}
function showBooking(){
    removeActive()
    $(".popBtnBooking").addClass("btnActive");
    $(".popLocation").hide()
    $(".popStatus").hide()
    $(".popDetails").hide()
    $(".popAlarms").hide()
    $(".popBooking").show()
}
function removeActive(){
    $(".popBtnLocation").removeClass("btnActive");
    $(".popBtnStatus").removeClass("btnActive");
    $(".popBtnDetails").removeClass("btnActive");
    $(".popBtnAlarms").removeClass("btnActive");
    $(".popBtnBooking").removeClass("btnActive");
}


async function listaTramaR1(id) {
   
    mostar();
    filtroFecha(id);
    //tablaDatosReefer(1,14);
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/reeferController.php?option=reefer&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;
     let html = '';
    info.tramaReefer.forEach(permiso1 => {
      html += `
      <tr>
        <td>${permiso1.created_at}</td>
        <td>${permiso1.set_point}</td>
        <td>${permiso1.temp_supply}</td>
        <td>${permiso1.return_air}</td>
        <td>${permiso1.evaporation_coil}</td>
        <td>${permiso1.ambient_air}</td>
        <td>${permiso1.cargo_1_temp}</td>
        <td>${permiso1.relative_humidity}</td>
        <td>${permiso1.alarm_present}</td>
        <td>${permiso1.alarm_number}</td>
        <td>${permiso1.controlling_mode}</td>
        <td>${permiso1.power_state}</td>
        <td>${permiso1.defrost_term_temp}</td>
        <td>${permiso1.defrost_interval}</td>
        <td>${permiso1.latitud}</td>
        <td>${permiso1.longitud}</td>
        </td>
      </tr>
      `;
    });
        tramareffer.innerHTML = html;

       
        if (typeof w !== 'undefined') {
            w.clear();
            w.destroy();
        }
        setPoint =[];
        returnAir = [];
        tempSupply =[];
        ambienteAir =[];
        relativeHumidity =[];
        evaporationCoil =[];
  
        fecha =[];
      
        
        //let html = '';
  
        console.log(info);
  
        info.tramaReefer.forEach(permiso => {
          setPoint.push(parseFloat(permiso.set_point));
          returnAir.push(parseFloat(permiso.return_air));
          tempSupply.push(parseFloat(permiso.temp_supply));
          ambienteAir.push(parseFloat(permiso.ambient_air));
          relativeHumidity.push(parseFloat(permiso.relative_humidity));
          evaporationCoil.push(parseFloat(permiso.evaporation_coil));
          fecha.push(permiso.created_at);
        });
             //console.log(setPoint)
             //console.log(returnAir)
             //console.log(tempSupply)
             //console.log(ambienteAir)
             //console.log(relativeHumidity)
  
             //etiqueta
             //console.log(fecha)
             
  
             // revertir orden de array
             setPoint1 =setPoint.reverse();
             returnAir1 = returnAir.reverse();
             tempSupply1 =tempSupply.reverse();
             ambienteAir1 =ambienteAir.reverse();
             relativeHumidity1 =relativeHumidity.reverse();
             evaporationCoil1 =evaporationCoil.reverse();
             fecha1 =fecha.reverse();
  
             const datosEvaporationCoil ={
                label : " Evaporation Coil",
                data : evaporationCoil1,
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
                data : setPoint1,
                backgroundColor: '#f1c40f', // Color de fondo
                borderColor: '#f1c40f', // Color del borde
                borderWidth: 3,
                yAxisID : 'y',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4 
    
            }
            const datosreturnAir ={
                label : " Return ",
                data : returnAir1,
                backgroundColor: '#ec7063', // Color de fondo
                borderColor: '#ec7063', // Color del borde
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
            const datostempSupply ={
                label : " Supply",
                data : tempSupply1,
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
                data : ambienteAir1,
                backgroundColor: '#9ccc65', // Color de fondo
                borderColor: '#9ccc65', // Color del borde
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y',
                pointRadius : 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
            const datorelativeHumidity ={
                label : "Humidity",
                data : relativeHumidity1,
                backgroundColor: '#e4c1f4', // Color de fondo
                borderColor: '#e4c1f4', // Color del borde4476c6
    
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y1',
                pointRadius : 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
          console.log(info.contenedor);

           w = new Chart(grafica1, {
                type: 'line',// Tipo de gráfica
                
                data: {
                    labels: fecha1,
                    datasets: [
                        datosreturnAir,
                        datorelativeHumidity,
                        datosambienteAir,
                        datostempSupply,
                        datosEvaporationCoil,
                        datosSetPoint,
    
                        // Aquí más datos...
                    ]
                },
                options: {
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
                              text: 'Temperature (C°)',
                              color: '#1a2c4e',
                              font: {
                                family: 'Times',
                                size: 20,
                                style: 'normal',
                                lineHeight: 1.2
                              },
                              padding: {top: 30, left: 0, right: 0, bottom: 0}
                            },
                            suggestedMin: -30,
                            suggestedMax: 60


                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Percentage (%)',
                            color: '#1a2c4e',
                            font: {
                              family: 'Times',
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
                            text: 'Reefer Monitoring Data : '+info.contenedor.nombre_contenedor +'('+info.contenedor.descripcionC+')',
                            color: '#1a2c4e',
                            font: {
                              family: 'Times',
                              size: 35,
                              style: 'normal',
                              lineHeight: 1.2
                            },
                            padding: {top: 30, left: 0, right: 0, bottom: 0}
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
                        }
                    }
                
                }
            });
  
    const config1 = {
            method: 'get',
            dataType: 'json',
            url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
    }
    markers.clearLayers();

     const buena1 =  await axios(config1);
     const info1 = buena1.data;
      console.log(info1);
        lat =parseFloat(info1.punto.latitud);
        log = parseFloat(info1.punto.longitud);
        var photoIcon = L.icon({
            iconUrl: 'p3.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [100, 169],
			iconAnchor:   [52, 115],
			popupAnchor:  [-3, -60]
            });

        var marker = L.marker([info1.punto.latitud,info1.punto.longitud], {icon: photoIcon}).addTo(markers);
         
        let textoF = await datosprueba(id);
        //console.log(textoF);
        marker.bindPopup(textoF).openPopup();
        marker.on('click', markerOnClick)
        showLocation();
        var latlng =  L.latLng(lat+0.01,log);
        map.setView(latlng,14);
        //location.hash ="#barra_grafica";
        saltarA('#g1g1');
        recorridoMapa(id);
        
  }


  // listar Madurador 

async function listaMadurador(id) {
   
    mostar();
    //filtroFecha(id);
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/reeferController.php?option=madurador&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;
     let html = '';
    info.tramaReefer.forEach(permiso1 => {
      html += `
      <tr>
        <td>${permiso1.created_at}</td>
        <td>${permiso1.set_point}</td>
        <td>${permiso1.temp_supply_1}</td>
        <td>${permiso1.return_air}</td>
        <td>${permiso1.evaporation_coil}</td>
        <td>${permiso1.ambient_air}</td>
        <td>${permiso1.cargo_1_temp}</td>
        <td>${permiso1.relative_humidity}</td>
        <td>${permiso1.alarm_present}</td>
        <td>${permiso1.alarm_number}</td>
        <td>${permiso1.controlling_mode}</td>
        <td>${permiso1.power_state}</td>
        <td>${permiso1.defrost_term_temp}</td>
        <td>${permiso1.defrost_interval}</td>
        <td>${permiso1.latitud}</td>
        <td>${permiso1.longitud}</td>
        </td>
      </tr>
      `;
    });
        tramareffer.innerHTML = html;

       
        if (typeof w !== 'undefined') {
            w.clear();
            w.destroy();
        }
        setPoint =[];
        returnAir = [];
        tempSupply =[];
        ambienteAir =[];
        relativeHumidity =[];
        evaporationCoil =[];
  
        fecha =[];
      
        
        //let html = '';
  
        console.log(info);
  
        info.tramaReefer.forEach(permiso => {
          setPoint.push(parseFloat(permiso.set_point));
          returnAir.push(parseFloat(permiso.return_air));
          tempSupply.push(parseFloat(permiso.temp_supply_1));
          ambienteAir.push(parseFloat(permiso.ambient_air));
          relativeHumidity.push(parseFloat(permiso.relative_humidity));
          evaporationCoil.push(parseFloat(permiso.evaporation_coil));
          fecha.push(permiso.created_at);
        });
             //console.log(setPoint)
             //console.log(returnAir)
             //console.log(tempSupply)
             //console.log(ambienteAir)
             //console.log(relativeHumidity)
  
             //etiqueta
             //console.log(fecha)
             
  
             // revertir orden de array
             setPoint1 =setPoint.reverse();
             returnAir1 = returnAir.reverse();
             tempSupply1 =tempSupply.reverse();
             ambienteAir1 =ambienteAir.reverse();
             relativeHumidity1 =relativeHumidity.reverse();
             evaporationCoil1 =evaporationCoil.reverse();
             fecha1 =fecha.reverse();
  
             const datosEvaporationCoil ={
                label : " Evaporation Coil",
                data : evaporationCoil1,
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
                data : setPoint1,
                backgroundColor: '#f1c40f', // Color de fondo
                borderColor: '#f1c40f', // Color del borde
                borderWidth: 3,
                yAxisID : 'y',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4 
    
            }
            const datosreturnAir ={
                label : " Return ",
                data : returnAir1,
                backgroundColor: '#ec7063', // Color de fondo
                borderColor: '#ec7063', // Color del borde
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y',
                pointRadius: 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
            const datostempSupply ={
                label : " Supply",
                data : tempSupply1,
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
                data : ambienteAir1,
                backgroundColor: '#9ccc65', // Color de fondo
                borderColor: '#9ccc65', // Color del borde
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y',
                pointRadius : 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
            const datorelativeHumidity ={
                label : "Humidity",
                data : relativeHumidity1,
                backgroundColor: '#e4c1f4', // Color de fondo
                borderColor: '#e4c1f4', // Color del borde4476c6
    
                borderWidth: 3,// Ancho del borde
                yAxisID : 'y1',
                pointRadius : 0,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
    
            }
          console.log(info.contenedor);

           w = new Chart(grafica1, {
                type: 'line',// Tipo de gráfica
                
                data: {
                    labels: fecha1,
                    datasets: [
                        datosreturnAir,
                        datorelativeHumidity,
                        datosambienteAir,
                        datostempSupply,
                        datosEvaporationCoil,
                        datosSetPoint,
    
                        // Aquí más datos...
                    ]
                },
                options: {
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
                              text: 'Temperature (C°)',
                              color: '#1a2c4e',
                              font: {
                                family: 'Times',
                                size: 20,
                                style: 'normal',
                                lineHeight: 1.2
                              },
                              padding: {top: 30, left: 0, right: 0, bottom: 0}
                            },
                            suggestedMin: -30,
                            suggestedMax: 60


                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Percentage (%)',
                            color: '#1a2c4e',
                            font: {
                              family: 'Times',
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
                            text: 'Madurador Monitoring Data : '+info.contenedor.nombre_contenedor +'('+info.contenedor.descripcionC+')',
                            color: '#1a2c4e',
                            font: {
                              family: 'Times',
                              size: 35,
                              style: 'normal',
                              lineHeight: 1.2
                            },
                            padding: {top: 30, left: 0, right: 0, bottom: 0}
                          },
                        zoom: {
                          pan :{
                            enabled :true,
                            mode: 'xy',
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
                        }
                    }
                
                }
            });
  
    const config1 = {
            method: 'get',
            dataType: 'json',
            url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
    }
    markers.clearLayers();

     const buena1 =  await axios(config1);
     const info1 = buena1.data;
      console.log(info1);
        lat =parseFloat(info1.punto.latitud);
        log = parseFloat(info1.punto.longitud);
        var photoIcon = L.icon({
            iconUrl: 'fruta.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [100, 169],
			iconAnchor:   [52, 115],
			popupAnchor:  [-3, -60]
            });

        var marker = L.marker([info1.punto.latitud,info1.punto.longitud], {icon: photoIcon}).addTo(markers);
         
        let textoF = await datosprueba(id);
        //console.log(textoF);
        marker.bindPopup(textoF).openPopup();
        marker.on('click', markerOnClick)
        showLocation();
        var latlng =  L.latLng(lat+0.01,log);
        map.setView(latlng,14);
        //location.hash ="#barra_grafica";
        saltarA('#g1g1');
       // recorridoMapa(id);
        
  }


function saltarA(id, tiempo) {
    var tiempo = tiempo || 100;
    $("html, body").animate({ scrollTop: $(id).offset().top }, tiempo);
}



function markerOnClick(e)
{
    showLocation();
 // alert("hi. you clicked the marker at " + e.latlng);
}

setTimeout(() => {
    map.invalidateSize()
}, 100);

async function recorridoMapa(id){
    const config1 = {
            method: 'get',
            dataType: 'json',
            url: '../../ztrack/controllers/reeferController.php?option=reefer&id=' + id
        }
    
    
    //markers.clearLayers();
     const buena1 =  await axios(config1);
     const info1 = buena1.data;
      console.log(info1);
      primero = 0;
   
      html = '';
      //listaR = [];
    
      info1.tramaReefer.forEach(permiso1 => {
        lat1 =permiso1.latitud;
        log1 = permiso1.longitud;
        lat2=lat1.toFixed(3);
        log2=log1.toFixed(3);
        parametro = lat2 +" "+log2;
        listaR = [];
        contadorLista =listaR.length;
  
        if(contadorLista >0){
            for(let i = 0; i<=contadorLista; i++){
        
                if(listaR[i] == parametro){

                    

                

                }else{

                    html += `   
                    <tr>
                      <td>${permiso1.created_at}</td>
                      <td>${permiso1.set_point}</td>
                      <td>${permiso1.temp_supply}</td>
                      <td>${permiso1.latitud}</td>
                      <td>${permiso1.longitud}</td>
                      <td>${permiso1.id}</td>
                      </td>
                    </tr>
                    `;
                    listaR.push(parametro);
                   contadorLista = contadorLista +1;

                }

                
                // si lo que viene es distinto graficar y añadir a lista
          

    
            }
        
        }
        if(contadorLista ==0){
    
            listaR.push(parametro);
            contadorLista = contadorLista +1;
 

        }
        //contadorLista = contadorLista +1;
    
    
    
      });
      console.log(listaR);
       console.log(html);
       
    
    
    
   
        
    }

    function message(tipo, mensaje) {
        Snackbar.show({
            text: mensaje,
            pos: 'top-right',
            backgroundColor: tipo == 'success' ? '#079F00' : '#FF0303',
            actionText: 'Cerrar'
        });
    }
    
    function mensaje (tipo,mensaje){
        Snackbar.show({
            text : mensaje , 
            pos : 'top-left',
            backgroundColor :tipo=='success' ? '#079F00' : '#FF0303',
            actionText :'cerrar'
        })
    }







