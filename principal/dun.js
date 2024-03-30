//const grande1 = document.querySelector('#frmDatosReefer');
const tramareffer = document.querySelector('#frmTramaReefer2');
const grafica1 = document.getElementById("graficaFinal");
var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'ZGROUP &copy; lupamape contributors'
});

var map = L.map('map',{zoom:5, center: new L.latLng([-9.04,-70]),zoomControl:false,layers:[zgroup]});
//var sidebar = L.control.sidebar('sidebar').addTo(map);

var markers;

markers = new L.LayerGroup().addTo(map);

var marker ="";
function elcolor(d){
    return d==1 ?'green':
           d==2 ?'orange':
           d==3 ?'white':
           'black';
}

async function datosprueba(id){

    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;
     console.log(info);
     
     lat =parseFloat(info.punto.latitud);  
     log = parseFloat(info.punto.longitud);
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
     //console.log(popTableTemplate);
    return popTableTemplate;
      
  }
  //captura1 = datosprueba(1).value;

function nombre_contenedor(telemetria_id){
    axios.get('../../ztrack/controllers/principalController.php?option=circulos1&id=' + telemetria_id)
    .then(function (response) {    
        const info = response.data;     
        console.log(info);
        //console.log(info.nombre.nombre_contenedor);
    })
}
function cargar_circulos()
{
    axios.get('../../ztrack/controllers/principalController.php?option=circulos')
    .then(function (response) {    
        const info = response.data; 
        console.log(info);
        console.log(info.contenedores.length);
        for(var i = 0 ; i<info.contenedores.length ; i++){
            var circulo = L.circleMarker([info.contenedores[i].latitud,info.contenedores[i].longitud],{
                radius:8,
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


$(document).ready(function () {

    var table1 =  $('#table_reffer1').DataTable({
        scrollY: 300,
        scrollX: true,
        pageLength: 50,
        processing: true,
    });
    
    var table =  $('#example').DataTable({
        scrollY: 300,
        scrollX: true,
        pageLength: 50,
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
     $('#example tbody').on('mouseenter', 'td', function () {
       var colIdx = table.cell(this).index().column;
 
        $(table.cells().nodes()).removeClass('highlight');
        $(table.column(colIdx).nodes()).addClass('highlight');
    });
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
   
    
});

  function listaTramaR(id) {
    console.log(id);
    axios.get('../../ztrack/controllers/reeferController.php?option=reefer&id=' + id)
      .then(function (response) {    
        const info = response.data;
        let html = '';
        let html1 = '';
        console.log(info);
        html1 += `
        <div class="row">
        <div class="col-md-3">
        </div> 
        <div class="col-md-3">
        <h4>CONTENEDOR : </h4>
        <p></p>
        </div>
        <div class="col-md-3">
        <h4> ${info.contenedor.nombre_contenedor}</h4>
        <p></p>
        </div>
        <div class="col-md-3">
        
        </div>
        </div>
   
        
        `;
        //cabeza.innerHTML = html1;
        
  
  
  
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
  
        // aqui se agrega segun el nombre del frm
        tramareffer.innerHTML = html;
       // $('#modalTramaReffer').modal('show');

      })
      .catch(function (error) {
        console.log(error);
      });


      axios.get('../../ztrack/controllers/reeferController.php?option=reefer&id=' + id)
      .then(function (response) {    
        const info = response.data;
        setPoint =[];
        returnAir = [];
        tempSupply =[];
        ambienteAir =[];
        relativeHumidity =[];
        fecha =[];
        let html = '';
        console.log(info);
  
        info.tramaReefer.forEach(permiso => {
          setPoint.push(parseFloat(permiso.set_point));
          returnAir.push(parseFloat(permiso.return_air));
          tempSupply.push(parseFloat(permiso.temp_supply));
          ambienteAir.push(parseFloat(permiso.ambient_air));
          relativeHumidity.push(parseFloat(permiso.relative_humidity));
          fecha.push(permiso.created_at);
  
        });

             console.log(setPoint)
             console.log(returnAir)
             console.log(tempSupply)
             console.log(ambienteAir)
             console.log(relativeHumidity)

             //contR = setPoint.length();
             //console.log(contR);

  
             //etiqueta
             console.log(fecha)
          
          const datosSetPoint ={
              label : " Set Point",
              data : setPoint,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
              borderColor: '#FF0000', // Color del borde
              borderWidth: 3,
              yAxisID : 'y',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datosreturnAir ={
              label : " Aire",
              data : returnAir,
              backgroundColor: 'rgba(154, 12, 135, 0.2)', // Color de fondo
              borderColor: '#b7d21b', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datostempSupply ={
              label : " Supply",
              data : tempSupply,
              backgroundColor: 'rgba(4, 162, 25, 0.2)', // Color de fondo
              borderColor: '#1a2c4e', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datosambienteAir ={
              label : " Ambiente",
              data : ambienteAir,
              backgroundColor: 'rgba(54, 62, 35, 0.2)', // Color de fondo
              borderColor: '#000', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datorelativeHumidity ={
              label : "Humedad",
              data : relativeHumidity,
              backgroundColor: 'rgba(54, 12, 235, 0.2)', // Color de fondo
              borderColor: '#4476c6 ', // Color del borde4476c6
  
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y1',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
        
  
          new Chart(grafica1, {
              type: 'line',// Tipo de gráfica
              
              data: {
                  labels: fecha,
                  datasets: [
                      datosSetPoint,
                      datosreturnAir,
                      datorelativeHumidity,
                      datosambienteAir,
                      datostempSupply,
  
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
                  title: {
                      display: true,
                      text: 'Grafica para Reefer'
                    },
                  scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
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
                    }
              
              }
          });
  
  
  
  
        // aqui se agrega segun el nombre del frm   
        //$('#modalGrafica').modal('show');
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id)
      .then(function (response) {    
        const info = response.data;
  
        console.log(info);
        //var sMarker = L.AwesomeMarkers.icon({icon: 'info',prefix:'fa', markerColor: elcolor(info.punto.estado)});
        lat =parseFloat(info.punto.latitud);
        lat2 = lat-0.05; 
        lat1 =lat2.toFixed(4);
        //lat1=parseFloat(lat3);    
        log = parseFloat(info.punto.longitud);
        log1 =log+0.001;
        console.log(lat);
        console.log(lat1);
        console.log(log);

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
        var photoIcon = L.icon({
            iconUrl: 'p3.svg',
            //iconSize: [120, 220], // tamaño del icono
            iconSize:     [100, 169],
			iconAnchor:   [52, 115],
			popupAnchor:  [-3, -60]
            });
        //showLocation(); 
        var marker = L.marker([info.punto.latitud,info.punto.longitud], {icon: photoIcon}).addTo(markers).on('click', onClick);
        showLocation();
        //zoma = datosprueba(id);
        //console.log(zoma);
       
       //captura1 = datosprueba(1).then((somos) => console.log(somos));
        //console.log(captura1);
        marker.bindPopup().openPopup();
        showLocation();
        var latlng =  L.latLng(lat+0.01,log);
        map.setView(latlng,14);
   
       // marker.setIcon(L.AwesomeMarkers.icon({iconUrl:'bla.png',markerColor:elcolor(info.punto.estado) ,prefix:'fa'}));
       //var marker = L.marker([36.7204,-4.4150], {icon: photoIcon}).addTo(map);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    
        
  function onClick(e) {
    alert(this.getLatLng());
    //marker.bindPopup("hola a todos").openPopup();
    //showLocation();
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


async function listaTramaR1(id) {
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack/controllers/reeferController.php?option=reefer&id=' + id
    }
     const buena =  await axios(config);
     const info = buena.data;

    let html = '';
    let html1 = '';
    console.log(info);
    html1 += `
    <div class="row"><div class="col-md-3"></div> <div class="col-md-3">
    <h4>CONTENEDOR : </h4><p></p></div><div class="col-md-3">
    <h4> ${info.contenedor.nombre_contenedor}</h4> <p></p></div><div class="col-md-3"> </div></div>
        `;
    //cabeza.innerHTML = html1;
        
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
        // aqui se agrega segun el nombre del frm
        tramareffer.innerHTML = html;
       // $('#modalTramaReffer').modal('show');

   
        setPoint =[];
        returnAir = [];
        tempSupply =[];
        ambienteAir =[];
        relativeHumidity =[];
        fecha =[];
        //let html = '';
        console.log(info);
  
        info.tramaReefer.forEach(permiso => {
          setPoint.push(parseFloat(permiso.set_point));
          returnAir.push(parseFloat(permiso.return_air));
          tempSupply.push(parseFloat(permiso.temp_supply));
          ambienteAir.push(parseFloat(permiso.ambient_air));
          relativeHumidity.push(parseFloat(permiso.relative_humidity));
          fecha.push(permiso.created_at);
  
        });

             console.log(setPoint)
             console.log(returnAir)
             console.log(tempSupply)
             console.log(ambienteAir)
             console.log(relativeHumidity)

             //contR = setPoint.length();
             //console.log(contR);

  
             //etiqueta
             console.log(fecha)
          
          const datosSetPoint ={
              label : " Set Point",
              data : setPoint,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
              borderColor: '#FF0000', // Color del borde
              borderWidth: 3,
              yAxisID : 'y',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datosreturnAir ={
              label : " Aire",
              data : returnAir,
              backgroundColor: 'rgba(154, 12, 135, 0.2)', // Color de fondo
              borderColor: '#b7d21b', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datostempSupply ={
              label : " Supply",
              data : tempSupply,
              backgroundColor: 'rgba(4, 162, 25, 0.2)', // Color de fondo
              borderColor: '#1a2c4e', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datosambienteAir ={
              label : " Ambiente",
              data : ambienteAir,
              backgroundColor: 'rgba(54, 62, 35, 0.2)', // Color de fondo
              borderColor: '#000', // Color del borde
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
          const datorelativeHumidity ={
              label : "Humedad",
              data : relativeHumidity,
              backgroundColor: 'rgba(54, 12, 235, 0.2)', // Color de fondo
              borderColor: '#4476c6 ', // Color del borde4476c6
  
              borderWidth: 3,// Ancho del borde
              yAxisID : 'y1',
              pointRadius : 0,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
  
          }
        
  
          new Chart(grafica1, {
              type: 'line',// Tipo de gráfica
              
              data: {
                  labels: fecha,
                  datasets: [
                      datosSetPoint,
                      datosreturnAir,
                      datorelativeHumidity,
                      datosambienteAir,
                      datostempSupply,
  
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
                  title: {
                      display: true,
                      text: 'Grafica para Reefer'
                    },
                  scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
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
                    }
              
              }
          });

    const config1 = {
            method: 'get',
            dataType: 'json',
            url: '../../ztrack/controllers/principalController.php?option=puntoEnMapa&id=' + id
    }
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

        var marker = L.marker([info1.punto.latitud,info1.punto.longitud], {icon: photoIcon}).addTo(markers).on('click', onClick);
        showLocation();   
        let textoF = await datosprueba(id);
        //console.log(textoF);
        marker.bindPopup(textoF).openPopup();
        showLocation();
        var latlng =  L.latLng(lat+0.01,log);
        map.setView(latlng,14);
   
  }