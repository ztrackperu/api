const tramareffer = document.querySelector('#frmTramaReefer2');
const tramarefferM = document.querySelector('#frmTramaReeferM');
const bajarExcelM = document.getElementById('bajarExcelM');
const bajarExcelR = document.getElementById('bajarExcelR');
const bajarExcelG = document.getElementById('bajarExcelG');
const tramagenset = document.querySelector('#frmTramaGenset');
const grafica1 = document.getElementById("graficaFinal");
const linklink = document.getElementById("linklink");
const DON = document.querySelector('#DON');
const DOFF = document.querySelector('#DOFF');
const DWAIT = document.querySelector('#DWAIT');
const comandoListaDispositivos = document.getElementById('frmComandoListaDispositivos');
const comanD = document.getElementById('frmComanD');
const listaComandoAsignados = document.getElementById('frmListaComandoAsignados');
const IntegralComando = document.getElementById('frmIntegralComando');
const alias1 = document.querySelector('#frmAliasContenedor');
var downloadBtn = document.getElementById('downloadBtn');

const bajarGrafica = document.getElementById('bajarGrafica');

// temas de modal
var modal = document.getElementById("ventanaModal");
//var boton = document.getElementById("abrirModal");

var span = document.getElementsByClassName("cerrar")[0];
if(comandoListaDispositivos){
 // console.log("elemento encontrado ");
}else{
  //console.log("no hay elemento ");
}
$(document).ready(function() {
    $('#buenab').select2();
});
//hacer blanco el fondo de garfica
const plugin = {
  id : 'customCanvasBackgroundColor',
  beforeDraw : (chart ,args ,options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#000000';
    ctx.fillRect(0,0,chart.width,chart.height);
    ctx.restore();
  }
}
function validarDatosR_M(datoAnalizar){
  if(datoAnalizar >100 || datoAnalizar<-60){cambio1  ="NA";} 
  else{cambio1 = parseFloat(datoAnalizar).toFixed(2);}
  return cambio1;
}
function elcolor(d){
  return d==1 ?'green':
         d==2 ?'orange':
         d==3 ?'gray':
         'black';
}

if(empresa_gener==22){
  var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom :3,
    attribution: 'ZGROUP &copy; lupamape contributors'
});
  var map = L.map('map',{zoom:4, center: new L.latLng([40,-100]),zoomControl:false,layers:[zgroup]});
  var markers;
markers = new L.LayerGroup().addTo(map);
var markers1 = L.markerClusterGroup({ singleMarkerMode: true});
}else{
  var zgroup = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom :3,
    attribution: 'ZGROUP &copy; lupamape contributors'
});
  var map = L.map('map',{zoom:3, center: new L.latLng([11.04,-70]),zoomControl:false,layers:[zgroup]});
  var markers;
markers = new L.LayerGroup().addTo(map);
var markers1 = L.markerClusterGroup({ singleMarkerMode: true});
}
//var map = L.map('map',{zoom:3, center: new L.latLng([11.04,-70]),zoomControl:false,layers:[zgroup]});

function cerrarSesion(){
  Snackbar.show({
    text: 'Esta seguro de Cerrar Sesion',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get('../../ztrack1/controllers/usuariosController.php?option=logout')
        .then(function (response) {
            setTimeout(() => {
             location.href = "../";
            }, 1500);
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
function actualizarAlias(){
  console.log("entre a alias");
}
async function analizarTabla(tipo,empresa){
  textazo = tipo +" , "+empresa;
      const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack1/controllers/integralController.php?option=analizarTablas&id=' + textazo
    }
     const buena =  await axios(config);
     const info = buena.data;  
     opciontabla = 0 ;
     //console.log(info) ;
     if(info.contarReefer['count(*)']!=0){
      //console.log("Hay reffer");
      return 1 ;
     }else{
      if(info.contarMadurador['count(*)']!=0){
        //console.log("Hay Madurador");
        return 2 ;
       }else{
        if(info.contarGenset['count(*)']!=0){
          //console.log("Hay Genset");
          return 3 ;
         }else{
          //console.log("No hay dispositivos ");
          return 4 ;      
         }  
       }
     }
}

async function cargar_circulos(tipo_usuario1,empresa_general1)
{
  tableStatus ='';
  genialtotal = await analizarTabla(tipo_usuario1,empresa_general1);
  //console.log(genialtotal);
  if(genialtotal==1){
    ocultarR();
  }else{
    if(genialtotal==2){
      ocultarM();
    }else{
      if(genialtotal==3){
        ocultarG1();
      }else{
        console.log("No hay dispositivos");
        ocultar();
      } 
    }
  }
    saltarA('#inicio');
    textazo = tipo_usuario1 +" , "+empresa_general1;
    //console.log(textazo);
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack1/controllers/principalController.php?option=circulos&id='+textazo
    }
    const buena =  await axios(config);
    const info = buena.data;
    //console.log(info); 
    for(var i = 0 ; i<info.contenedores.length ; i++){
        var undia = moment().add(-24,'hours').format("YYYY-MM-DD HH:mm:ss");
        var mediahora = moment().add(-30,'minutes').format("YYYY-MM-DD HH:mm:ss");
         var valorFecha = info.contenedores[i].ultima_fecha;
         if(undia > valorFecha){
            estadoColor = 3;
         }else{
            if(mediahora > valorFecha){
                estadoColor = 2;        
            }else{
                estadoColor = 1;            
            }
         }
        var circulo = L.circleMarker([info.contenedores[i].latitud,info.contenedores[i].longitud],{
            radius:8,
            color :elcolor(estadoColor),
            fillColor : elcolor(estadoColor),
            fillOpacity :1 
        });
        tableStatus = `
        <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Reefer ID: </b></div>
           <div class="col-3"><h4><strong>${info.contenedores[i].nombre_contenedor} </strong></h4></div>
           <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
           <div class="col-3"><b> </b></div>
        </div>
        <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
           <div class="col-5" style="color:blue;"><h5>${info.contenedores[i].ultima_fecha} </h5></div>
           <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
           <div class="col-3"><b> </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Locate : </b></div>
           <div class="col-5"><b>${info.contenedores[i].latitud},${info.contenedores[i].longitud} </b></div>
           <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
           <div class="col-3"><b> </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Setpoint :</b></div>
           <div class="col-3"><b>${info.contenedores[i].set_point} C°</b></div>
           <div class="col-3" style="color:#1a2c4e;"> <b>Evaporation :  </b></div>
           <div class="col-3"><b> ${info.contenedores[i].evaporation_coil} C°</b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Return Temp</b></div>
           <div class="col-3"><b>${info.contenedores[i].return_air} C° </b></div>
           <div class="col-3" style="color:#1a2c4e;"> <b>Ambient :  </b></div>
           <div class="col-3"><b>${info.contenedores[i].ambient_air} C° </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:1a2c4e;"><b>Supply Temp</b></div>
           <div class="col-3"><b>${info.contenedores[i].temp_supply_1} C°</b></div>
           <div class="col-3" style="color:1a2c4e;"> <b>Humedite :  </b></div>
           <div class="col-3"><b> ${info.contenedores[i].relative_humidity} %</b></div>    
        </div>
        `; 
        circulo.bindPopup(tableStatus);
        circulo.on('click', markerOnClick);
        markers1.addLayer(circulo);    
    }
    for(var i = 0 ; i<info.generadores.length ; i++){
        var undia = moment().add(-24,'hours').format("YYYY-MM-DD HH:mm:ss");
        var mediahora = moment().add(-30,'minutes').format("YYYY-MM-DD HH:mm:ss");
         var valorFecha = info.generadores[i].ultima_fecha;
         if(undia > valorFecha){
            estadoColor = 3;
         }else{
            if(mediahora > valorFecha){
                estadoColor = 2;

            }else{
                estadoColor = 1;
            }
         }     
        var circulo = L.circleMarker([info.generadores[i].latitud,info.generadores[i].longitud],{
            radius:8,
            color :elcolor(estadoColor),
            fillColor : elcolor(estadoColor),
            fillOpacity :1  
        });
        tableStatus = `
        <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Genset ID: </b></div>
           <div class="col-3"><b>${info.generadores[i].nombre_generador} </b></div>
           <div class="col-3" style="color:#1a2c4e;"><b> </b> </div>
           <div class="col-3"><b> </b></div>
        </div>
        <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Event Time :  </b></div>
           <div class="col-5" style="color:blue;"><b>${info.generadores[i].ultima_fecha}  </b></div>
           <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
           <div class="col-3"><b> </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Event : </b></div>
           <div class="col-5"><b>${info.generadores[i].latitud},${info.generadores[i].longitud}</b></div>
           <div class="col-1" style="color:#1a2c4e;"> <b> </b></div>
           <div class="col-3"><b> </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Battery :</b></div>
           <div class="col-3"><b>${info.generadores[i].battery_voltage} </b></div>
           <div class="col-3" style="color:#1a2c4e;"> <b>Frequency :  </b></div>
           <div class="col-3"><b> ${info.generadores[i].running_frequency}</b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:#1a2c4e;"><b>Voltage</b></div>
           <div class="col-3"><b>${info.generadores[i].voltage_measure} </b></div>
           <div class="col-3" style="color:#1a2c4e;"> <b>RPM :  </b></div>
           <div class="col-3"><b>${info.generadores[i].rpm} </b></div>
        </div>
       <div class="row">
           <div class="col-3" style="color:1a2c4e;"><b> Fuel</b></div>
           <div class="col-3"><b>${info.generadores[i].fuel_level} </b></div>
           <div class="col-3" style="color:1a2c4e;"> <b>Set POint :  </b></div>
           <div class="col-3"><b> ${info.generadores[i].set_point} </b></div>    
        </div>
        `;
        circulo.bindPopup(tableStatus);
        circulo.on('click', markerOnClick);
        markers1.addLayer(circulo);       
    }   
}
markers.on('clusterclick', function (a) {
    a.layer.zoomToBounds();
});
map.addLayer(markers1);
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
function saltarA(id, tiempo) {
    var tiempo = tiempo || 100;
    $("html, body").animate({ scrollTop: $(id).offset().top }, tiempo);
}
function markerOnClick(e)
{
    showLocation();
}
setTimeout(() => {
    map.invalidateSize()
}, 100);
async function seleccionar_tipoD(value){
  
  html ='';
  console.log(value);
  if(value !=0){
  const config = {
      method: 'get',
      dataType: 'json',
      url: '../../ztrack1/controllers/empresasController.php?option=ListaDispositivosComando&id=' + value
  }
   const buena =  await axios(config);
   const info = buena.data;
   //console.log(info);
   html2 = " Establecimiento de parametros de dispositivos RIPENNER ";
   html2 += "<div class='row'><div class='col-md-3'></div><div class='col-md-3'></div><div class='col-mod-3'></div </div>"
   html += `

   <div class="row"><div class="col-md-3"></div><div class="col-md-6">
   <div class="input-group mb-3">
       <div class="input-group-prepend">
           <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> ${value}</span>
       </div>
       <select id="listaDivece" name="listaDivece" class="form-control" onchange="seleccionar_dispositivo(this.value)" >
             <option value="0">Seleccione ...</option>   
      `;
  
   if(value=="Generador"){
    info.dispositivos.forEach(permiso => {
      html += `
              <option value="${permiso.id}.${value}">${permiso.nombre_generador}</option>             
              `;
    });

   }else {
    info.dispositivos.forEach(permiso => {
      html += `
              <option value="${permiso.id}.${value}">${permiso.nombre_contenedor}</option>             
              `;
    });
   }

  //console.log(html);

   comandoListaDispositivos.innerHTML = html;
   comanD.innerHTML = '';
   IntegralComando.innerHTML = '';
   listaComandoAsignados.innerHTML = '';

}else {
  //console.log("se fregoo");
  comandoListaDispositivos.innerHTML = '';
  comanD.innerHTML = '';
  IntegralComando.innerHTML = '';
  listaComandoAsignados.innerHTML = '';
}

}
function deleteComandoA(id){
  console.log(id);
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get('../../ztrack1/controllers/empresasController.php?option=deteleComandoA&id=' + id)
        .then(function (response) {
          const info = response.data;
          message(info.tipo, info.mensaje);
          if (info.tipo == 'success') {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
async function seleccionar_dispositivo(value){
  html ='';
  htmlComando ='';
  listaComandoAsignados.innerHTML = '';
  if (value != 0){
  const config = {
      method: 'get',
      dataType: 'json',
      url: '../../ztrack1/controllers/empresasController.php?option=ListaComando&id=' + value
  }
   const buena =  await axios(config);
   const info = buena.data;
   //console.log(info);
   let arrgeloComandos = [];
   
   html += `

   <div class="row"><div class="col-md-3"></div><div class="col-md-6">
   <div class="input-group mb-3">
       <div class="input-group-prepend">
           <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Comandos : </span>
       </div>
       <select id="listaComanD" name="listaComanD" class="form-control" onchange="seleccionar_Comando(this.value)" >
             <option value="0">Seleccione ...</option>   
      `;

     console.log(info.contarAsig);
    if (info.contarAsig==0){
      console.log("entro sin razon");
      info.comandos.forEach(permiso => {
        html += `
        <option value="${permiso.id}.${value}">${permiso.comando}</option>             
        `;

      });
      htmlComando += `
      <div>No existen Comandos Pendientes</div>
      `;

      listaComandoAsignados.innerHTML = htmlComando;
      

    }
    else { 
      htmlComando += `
      <table class="table table-striped table-hover" style="width: 100%;" id="table_empresas">
      <thead>
          <tr>
              <th scope="col">Comando</th>
              <th scope="col">Valor Actual</th>
              <th scope="col">Valor Modificado</th>
              <th scope="col">Fecha</th>
              <th scope="col"> Action</th>
          </tr>
      </thead>
      <tbody>

      `;

      info.comandosAsignados.forEach(permiso2 =>{
        info.comandos.forEach(permiso => {
          if(permiso2.comando_id==permiso.id){
            htmlComando += `
            <tr>
            <th scope="col">${permiso.comando}</th>
            `;
            

          }
        });

          htmlComando += `
          <th scope="col">${permiso2.valor_actual}</th>
          <th scope="col">${permiso2.valor_modificado}</th>
          <th scope="col">${permiso2.fecha_creacion}</th>
          <th scope="col"> <a class="btn btn-danger btn-sm" onclick="deleteComandoA(${permiso2.id})"><i class="fas fa-eraser">D</i></th>
         </tr>
                
          `;
        
      });
      htmlComando += `
      </tbody>
  </table>
      `;



      listaComandoAsignados.innerHTML = htmlComando;
     //guarda todos los id de los comando en un array
    info.comandos.forEach(permiso => {
       variableC =permiso.id;
       arrgeloComandos.push(variableC);
    });
    //console.log(arrgeloComandos);
    //compara el array y elimina los que ya tienen comandos asignados
    info.comandosAsignados.forEach(permiso2 =>{
      //console.log(permiso2.comando_id);
      posicionComando = arrgeloComandos.indexOf(permiso2.comando_id);
      //console.log(posicionComando);
      if(posicionComando != -1 ){
        arrgeloComandos.splice(posicionComando,1);
      }
    });
    //prepara el html con los comandos que aun no se asignan
    info.comandos.forEach(permiso => {
      comparadorHtml = arrgeloComandos.indexOf(permiso.id);
      if(comparadorHtml != -1){
        html += `
        <option value="${permiso.id}.${value}">${permiso.comando}</option>             
        `;

      }


    });
    //console.log(arrgeloComandos);
  }
/*
  info.comandosAsignados.forEach(permiso2 =>{
    if(permiso2.comando_id == permiso.id) {

    }else{
      html += `
      <option value="${permiso.id}.${value}">${permiso.comando}</option>             
      `;
    }
  })

  */
   

   //console.log(html);
   comanD.innerHTML = html;

  
  //console.log(value);
  //$('#listaComanD').select2();
  IntegralComando.innerHTML = '';
  //aqui se carga los comandos que existen
  
}else {
  comanD.innerHTML = '';
  IntegralComando.innerHTML = '';
}

 



}
async function seleccionar_Comando(value){
html ='';

    console.log(value);
    const config = {
        method: 'get',
        dataType: 'json',
        url: '../../ztrack1/controllers/empresasController.php?option=ComandoIntegrado&id=' + value
    }
     const buena =  await axios(config);
     const info = buena.data;
     console.log(info);
     if(info.datosComando.campo_relacionado == "set_point"){
      html += `
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>SET POINT ACTUAL : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      
      <h4>${info.datosDispositivo.set_point} C° </h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>VALOR INGRESADO  : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      <input name="valor_modificado" />
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <input name="valor_actual" type="hidden" value="${info.datosDispositivo.set_point}" />
      `;
     }

     if(info.datosComando.campo_relacionado == "set_point_co2"){
      html += `
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>SET POINT CO2 ACTUAL : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      
      <h4>${info.datosDispositivo.set_point_co2} % </h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>VALOR INGRESADO  : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      <input name="valor_modificado" />
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <input name="valor_actual" type="hidden" value="${info.datosDispositivo.set_point_co2}" />
      `;
     }

     if(info.datosComando.campo_relacionado == "humidity_set_point"){
      html += `
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>SET POINT HUMIDITY ACTUAL : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      
      <h4>${info.datosDispositivo.humidity_set_point} % </h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>VALOR INGRESADO  : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      <input name="valor_modificado" />
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <input name="valor_actual" type="hidden" value="${info.datosDispositivo.humidity_set_point}" />
      `;
     }
     if(info.datosComando.campo_relacionado == "sp_ethyleno"){
      html += `
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>SET POINT ETHYLENE ACTUAL : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      
      <h4>${info.datosDispositivo.sp_ethyleno} PPM </h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-4">
      <h4>VALOR INGRESADO  : </h4>
      <p></p>
      </div>
      <div class="col-md-2">
      <input name="valor_modificado" />
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
      <input name="valor_actual" type="hidden" value="${info.datosDispositivo.sp_ethyleno}" />
      `;
     }

      html += `
      <input name="tipo_dispositivo" type="hidden" value="${value}" />
      <input name="comando_id" type="hidden" value="${info.datosComando.id}" />
      <input name="telemetria_id" type="hidden" value="${info.datosDispositivo.telemetria_id}" />
      <input name="nombre_dispositivo" type="hidden" value="${info.datosDispositivo.nombre_contenedor}" />
     
      <div class="row">
      <div class="col-md-3"> </div>
       <div class="col-md-6">
      <button class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR</button>
      </div> 
      <div class="col-md-3"> </div></div> 
      `;
     

     IntegralComando.innerHTML = html;
     
  
}
document.addEventListener('DOMContentLoaded', function () {
  IntegralComando.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post('../../ztrack2/controllers/empresasController.php?option=GrabarComando', frmData)
        .then(function (response) {
          const info = response.data;
          console.log(info);
          message(info.tipo, info.mensaje);       
          setTimeout(() => {
            window.location.reload();
          }, 1000);  
          if(info.tipo =="success"){
            IntegralComando.innerHTML = '';
           }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
})
document.addEventListener('DOMContentLoaded', function () {
  bajarExcelM.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post('../../ztrack2/controllers/empresasController.php?option=bajarExcelM', frmData)
        .then(function (response) {
          const info = response.data;
          var divece = info.data.nombre_contenedor;
          var today = moment().format("DD-MM-YYYY_HH-mm-ss");
          TableToExcel.convert(document.getElementById("table_reffer2"), {
            name: divece+'_'+today+`.xlsx`,
            sheet: {
              name: 'Sheet 1'
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  bajarExcelR.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post('../../ztrack2/controllers/empresasController.php?option=bajarExcelR', frmData)
        .then(function (response) {
          const info = response.data;
          var divece = info.data.nombre_contenedor;
          var today = moment().format("DD-MM-YYYY_HH-mm-ss");
          TableToExcel.convert(document.getElementById("table_reffer1"), {
            name: divece+'_'+today+`.xlsx`,
            sheet: {
              name: 'Sheet 1'
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  bajarExcelG.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post('../../ztrack2/controllers/empresasController.php?option=bajarExcelG', frmData)
        .then(function (response) {
          const info = response.data;
          console.log(info);
          var divece = info.data.nombre_generador;
          var today = moment().format("DD-MM-YYYY_HH-mm-ss");
          //let table = document.getElementById("table_reffer2");
          TableToExcel.convert(document.getElementById("table_genset"), {
            name: divece+'_'+today+`.xlsx`,
            sheet: {
              name: 'Sheet 1'
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
})
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
// aqui actualiza la info de forma dinamica VISTA DE COMANDO AUTOMATICO
/*
$(document).ready(function() {
  var refreshId =  setInterval( function(){
$('#ComandoAutomatico').load('cosas.php');//actualizas el div
}, 1000 );
});

*/
function aliasEmpresa(id) {
  axios.get('../../ztrack1/controllers/principalController.php?option=verAlias&id=' + id)
    .then(function (response) {    
      const info = response.data;
      let html = '';
      console.log(info);
      html += `
      <p></p>
      <div class="row">
      <div class="col-md-3">
      </div> 
      <div class="col-md-3">
      <h4>RIPENER CODE : </h4>
      <p></p>
      </div>
      <div class="col-md-3">
      <h4>${info.alias.nombre_contenedor}</h4>
      <p></p>
      </div>
      <div class="col-md-3">
      
      </div>
      </div>

      
      `;

      html += `
      <input name="id_contenedor" type="hidden" value="${info.alias.id}" />
      <div class="row">
      <div class="col-md-3">
      </div>
       <div class="col-md-6">
         <div class="input-group mb-4">
             <div class="input-group-prepend">
              <span class="input-group-text">  Description  : </span>
              </div>
          <input type="text" class="form-control" id="aliasalias" name="aliasalias" placeholder="${info.alias.descripcionC}">
          </div>
         </div>
                <div class="col-md-3">
                </div>
                </div>

                <div class="row">
                <div class="col-md-3">
                </div> 
                <div class="col-md-6">
                
                
                <button align ="center" class="btn btn-outline-success btn-lg btn-block" type="submit">REGISTER</button>
                <P> </P>
                </div>
          
                </div>
                <div class="col-md-3">
                
                </div>
                </div>

              `;
           
      // aqui se agrega segun el nombre del frm
      alias1.innerHTML = html;
      $('#modalAlias').modal('show');
    })
    .catch(function (error) {
      console.log(error);
    });
}
document.addEventListener('DOMContentLoaded', function () {
  alias1.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post('../../ztrack1/controllers/principalController.php?option=saveAlias', frmData)
        .then(function (response) {
          const info = response.data;
          console.log(info);
          message(info.tipo, info.mensaje);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

})





