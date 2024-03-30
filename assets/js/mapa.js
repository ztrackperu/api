//var map = L.map('map');
//map.setView([-9.0431, -74.0282], 5);
//import Chart from 'chart.js';
const grafica1 = document.getElementById("graficaFinal");
const grafica = document.querySelector("#frmGrafica");
var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'ZGROUP &copy; lupamape contributors'
});

var map = L.map('map',{zoom:5, center: new L.latLng([-9.04,-74]),zoomControl:false,layers:[zgroup]});
var sidebar = L.control.sidebar('sidebar').addTo(map);

var markers;

markers = new L.LayerGroup().addTo(map);

function elcolor(d){
    return d==1 ?'green':
           d==2 ?'orange':
           d==3 ?'white':
           'black';
}
function nombre_contenedor(telemetria_id){
    axios.get(ruta + 'controllers/principalController.php?option=circulos1&id=' + telemetria_id)
    .then(function (response) {    
        const info = response.data;     
        console.log(info);
        //console.log(info.nombre.nombre_contenedor);
    })
}

function verGrafica(id)
{
    axios.get(ruta + 'controllers/principalController.php?option=verGrafica&id=' + id)
    .then(function (response) {    
      const info = response.data;
      setPoint =[];
      returnAir = [];
      tempSupply =[];
      ambienteAir =[];
      relativeHumidity =[];
      evaporationCoil =[];

      fecha =[];
    
      
      let html = '';

      console.log(info);

      info.datos.forEach(permiso => {
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
        

        
      

        new Chart(grafica1, {
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
                      type: 'linear',
                      display: true,
                      position: 'left',
                      text : 'centigrados;'
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
              
                      // grid line settings
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                    },
                  },
                  plugins: {
                    title: {
                        display: true,
                        text: 'Grafica para Reefer',
                        fontSize: 30,
                        fontFamily: "candara",
                        fontColor: '#fff',  
                        position: 'top',
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
        //buenazo.update();





      // aqui se agrega segun el nombre del frm   
      //$('#modalGrafica').modal('show');
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

function cargar_circulos()
{
    axios.get(ruta + 'controllers/principalController.php?option=circulos')
    .then(function (response) {    
        const info = response.data; 
        console.log(info);
        console.log(info.contenedores.length);
        for(var i = 0 ; i<info.contenedores.length ; i++){
            var circulo = L.circleMarker([info.contenedores[i].latitud,info.contenedores[i].longitud],{
                radius:10,
                color :elcolor(info.contenedores[i].estado),
                fillColor : elcolor(info.contenedores[i].estado),
                fillOpacity :1
                
            }).bindPopup('Contenedor: '+info.contenedores[i].nombre_contenedor).addTo(map);
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function verEnTabla(id){
    console.log(id);
    axios.get(ruta + 'controllers/principalController.php?option=listarTabla&id=' + id)
    .then(function (response) {    
      const info = response.data;
      let html1 = ' ';
      let html2 ='';
      console.log(info.tipoReefer);
      info.tipoReefer.forEach(permiso1 => {
        html1 += `
        <tr>
        <td>${permiso1.created_at}</td>
        <td>${permiso1.set_point}</td>
        <td>${permiso1.temp_supply}</td>
        <td>${permiso1.latitud}</td>
        <td>${permiso1.longitud}</td>
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
        </tr>
        `;    

      });
      html2 += `
      <div align="right"><a class="edit"  href="#"  onclick="verGrafica(${info.tipoReefer[0].telemetria_id})">GRÁFICA</a> </div>
      `;
      //console.log(html1);
      reefer.innerHTML = html1;
      grafica.innerHTML = html2;
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get(ruta + 'controllers/principalController.php?option=puntoEnMapa&id=' + id)
    .then(function (response) {    
      const info = response.data;

      console.log(info);
      //var sMarker = L.AwesomeMarkers.icon({icon: 'info',prefix:'fa', markerColor: elcolor(info.punto.estado)});
      lat =parseFloat(info.punto.latitud);
      lat1 = lat+0.005;     
      log = parseFloat(info.punto.longitud);
      log1 =log+0.025;
      console.log(lat);
      console.log(log);
      var latlng =  L.latLng(lat1,log1);
      map.setView(latlng,14);
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
         <div class="col-3" style="color:#1a2c4e;"><b>Reefer ID: </b></div>
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
      var marker = L.marker([info.punto.latitud,info.punto.longitud]).addTo(markers);
      marker.bindPopup(popTableTemplate).openPopup();
      showLocation(); 
 
      marker.setIcon(L.AwesomeMarkers.icon({icon:'info',markerColor:elcolor(info.punto.estado) ,prefix:'fa'}));

    })
    .catch(function (error) {
      console.log(error);
    });
}

function tableStatus(){
    return  '<div class="row">'+
                '<div class="col-3">'+
                    'Refeer ID:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Event Time:'+
                '</div>'+
                '<div class="col-3">'+
                    '02/22/2022 15:39:20'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Event:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Set Point Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'Alarm:'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Return Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'PWR:'+
                '</div>'+
                '<div class="col-3">'+
                    'Powered'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Supply Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'RUN:'+
                '</div>'+
                '<div class="col-3">'+
                    'Running'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Ambient Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'Device Bat:'+
                '</div>'+
                '<div class="col-3">'+
                    'Running'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Controller Mode:'+
                '</div>'+
                '<div class="col-3">'+
                    'N.A'+
                '</div>'+
                '<div class="col-3">'+
                
                '</div>'+
                '<div class="col-3">'+
                
                '</div>'+
            '</div>'
}
function tableDetails(){
    return  '<div class="row">'+
                '<div class="col-3">'+
                    'Refeer ID:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Event Time:'+
                '</div>'+
                '<div class="col-3">'+
                    '02/22/2022 15:39:20'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Event:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Set Point Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'Alarm:'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Return Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'PWR:'+
                '</div>'+
                '<div class="col-3">'+
                    'Powered'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Supply Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'RUN:'+
                '</div>'+
                '<div class="col-3">'+
                    'Running'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Ambient Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    'ZXXXXXX'+
                '</div>'+
                '<div class="col-3">'+
                    'Device Bat:'+
                '</div>'+
                '<div class="col-3">'+
                    'Running'+
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Controller Mode:'+
                '</div>'+
                '<div class="col-3">'+
                    'N.A'+
                '</div>'+
                '<div class="col-3">'+
                
                '</div>'+
                '<div class="col-3">'+
                
                '</div>'+
            '</div>'
}
function tableAlarms(){
    return  '<div class="row">'+
                'No data'+
            '</div>'
}
function tableBooking(){
    return  '<div class="row">'+
                '<div class="col-3">'+
                    'Booking*:'+
                '</div>'+
                '<div class="col-3">'+
                    'NT-TOTOTOTO'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'+
            '<div class="row">'+
                '<div class="col-3">'+
                    'Booking Temp:'+
                '</div>'+
                '<div class="col-3">'+
                    '-25'+
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
                '<div class="col-3">'+
                    
                '</div>'+
            '</div>'
}

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