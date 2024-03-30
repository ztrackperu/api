


function USDA(dato){
    dato1 =parseFloat(dato);
    if(dato1==-38.50){
      respuesta = "NA";
    }else{
      respuesta = dato1;
    }
    return respuesta;
}

function validar_1(dato){
    dato1 =parseFloat(dato);
    if(dato1==-1.00 || dato1>600){
      respuesta = "NA";
    }else{
      respuesta = dato1;
    }
    return respuesta;
}

function avl1(dato){
    dato1 =parseFloat(dato);
    if(dato1>400.00){
      respuesta = "NA";
    }else{
      respuesta = dato1;
    }
    return respuesta;
}

function ON_OFF(dato){
    dato1 =parseFloat(dato);
    if(dato1==1.00){
      respuesta = "ON";
    }else{
      respuesta = "OFF";
    }
    return respuesta;
  }

  function MODO_AFAN(dato){
    dato1 =parseFloat(dato);
    if(dato1==2.00){
      respuesta = "AFAM +";
    }else if(dato1==1.00){
      respuesta = "AFAM";
    }
    else{
      respuesta = "NONE";
    }
    return respuesta;
  }

function pasarCo2(dato){
  dato1 =parseFloat(dato);
  if(dato1==25.40){
    respuesta = "NA";
  }if(dato1>5){
    respuesta = "NA";
  }
  else{
    respuesta = dato1;
  }
  return respuesta;
}

function inyectar(dato){
    dato1 =parseFloat(dato);
    if(dato1==5.00){
      respuesta = "INJECTING";
    }else{
      respuesta = "NOT ACTIVE";
    }
    return respuesta;
  }


function malEhylene(dato){
    dato1 =parseFloat(dato);
    if(dato1>200.00){
      respuesta = "NA";
    }else{
      respuesta = dato1;
    }
    return respuesta;
}
async function tablaDatosMadurador(info){ 
    let html = '';
    let html1 = '';
    //console.log(info);
    i = 0
    if(i < 500){
    info.madurador.forEach(permiso1 => {
        enBruto = parseInt(permiso1.created_at.$date.$numberLong);
        mashoras = 5*60*60000 + 60000;
        alterado = enBruto + mashoras ;
        fechita = new Date(alterado);
     html += `
     <tr>
     <td><strong>${fechita.toLocaleString()}</strong></td>
     <td>${permiso1.power_kwh}</td>
     <td>${validarDatosR_M(permiso1.set_point)}</td>
     <td>${validarDatosR_M(permiso1.temp_supply_1)}</td>
     <td>${validarDatosR_M(permiso1.return_air)}</td>
     <td>${validarDatosR_M(permiso1.evaporation_coil)}</td>
     <td>${validarDatosR_M(permiso1.ambient_air)}</td>
     <td>${validarDatosR_M(permiso1.relative_humidity)}</td>
     <td>${validar_1(parseFloat(permiso1.sp_ethyleno).toFixed(2))}</td>
     <td>${malEhylene(permiso1.ethylene)}</td>
     <td>${validar_1(parseFloat(permiso1.inyeccion_hora).toFixed(2))}</td>
     <td>${validar_1(parseFloat(permiso1.inyeccion_pwm).toFixed(2))}</td>

     <td>${inyectar(permiso1.stateProcess)}</td>
     <td>${avl1(permiso1.avl)}</td>
     <td>${ON_OFF(permiso1.power_state)}</td>
     <td>${permiso1.controlling_mode}</td>
     <td>${permiso1.compress_coil_1}</td>
     <td>${validarDatosR_M(permiso1.consumption_ph_1)}</td>
     <td>${validarDatosR_M(permiso1.consumption_ph_2)}</td>
     <td>${validarDatosR_M(permiso1.consumption_ph_3)}</td>
     <td>${MODO_AFAN(validarDatosR_M(permiso1.fresh_air_ex_mode))}</td>
     <td>${validarDatosR_M(permiso1.set_point_co2)}</td>
     <td>${pasarCo2(validarDatosR_M(permiso1.co2_reading))}</td>
     <td>${validarDatosR_M(permiso1.set_point_o2)}</td>
     <td>${validarDatosR_M(permiso1.o2_reading)}</td>
    
    
     <td>${validar_1(permiso1.line_voltage)}</td>
     <td>${USDA(permiso1.cargo_1_temp)}</td>
     <td>${USDA(permiso1.cargo_2_temp)}</td>
     <td>${USDA(permiso1.cargo_3_temp)}</td>
     <td>${USDA(permiso1.cargo_4_temp)}</td>
     <td>${validarDatosR_M(permiso1.defrost_term_temp)}</td>
     <td>${validarDatosR_M(permiso1.defrost_interval)}</td>
     <td>${parseFloat(permiso1.latitud).toFixed(4)}</td>
     <td>${parseFloat(permiso1.longitud).toFixed(4)}</td>
     </tr>
     `;
    });
}
        tramarefferM.innerHTML = html;
    html1 += `
        <div class="row">     
        <input name="telemetria_id" type="hidden" value="${info.madurador.telemetria_id}" />
        <button class="btn btn-success btn-lg btn-block" type="submit">DOWNLOAD DATA IN EXCEL</button>
      `;
    bajarExcelM.innerHTML = html1;
}
async function graficaMadurador1(info){
    if (typeof w !== 'undefined') {w.destroy();}
    setPoint =[];
    returnAir = [];
    tempSupply =[];
    ambienteAir =[];
    relativeHumidity =[];
    evaporationCoil =[];
    D_ethylene = [];
    co2 = [];
    sp_ethylene =[];
    fecha =[];
    inyeccionEtileno = [];
    inyeccionPWM =[];
 
    contador =0;
    console.time('loop');
    
    info.tramaMadurador.forEach(permiso => {
       
      contador = contador +1 ;
      if(contador%1 ==0){
        setPoint.unshift(parseFloat(permiso.set_point));
        returnAir.unshift(parseFloat(permiso.return_air));
        tempSupply.unshift(parseFloat(permiso.temp_supply_1));
        ambienteAir.unshift(parseFloat(permiso.ambient_air));
        inyeccionPWM.unshift(parseFloat(permiso.inyeccion_pwm));
        relativeHumidity.unshift(parseFloat(permiso.relative_humidity));
        evaporationCoil.unshift(parseFloat(permiso.evaporation_coil));
        D_ethylene.unshift(parseFloat(permiso.ethylene));
        co2.unshift(parseFloat(permiso.co2_reading));
        sp_ethylene.unshift(parseFloat(permiso.sp_ethyleno))
        fecha.unshift(permiso.created_at);
        datoInyeccion = parseFloat(permiso.stateProcess) ;
        ;
        poner = 0 ;
        if(datoInyeccion==5.00){
          poner =100;    
        }
        inyeccionEtileno.unshift(poner);
      }
    
    });
    console.timeEnd('loop');
    const datosInyeccion ={
        label : " Inyected",
        data : inyeccionEtileno,
        backgroundColor: '#f7f2e2', // Color de fondo
        borderColor: '#f7f2e2', // Color del borde
        borderWidth: 1,
        yAxisID : 'y2',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        fill: true,  
        datalabels: {
            //display: 'false',  
            labels: {
                title: null
              } 
          },
    }
    const datosEthylene ={
        label : " Ethylene",
        data : D_ethylene,
        backgroundColor: '#973d37', // Color de fondo
        borderColor: '#973d37', // Color del borde
        borderWidth: 3,
        yAxisID : 'y1',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    const datosSpEthylene ={
         label : " sp_Ethy",
         data : sp_ethylene,
         backgroundColor: '#d80014', // Color de fondo 973d37
         borderColor: '#d80014', // Color del borde 95a5z6 d85494
         borderWidth: 3,
         yAxisID : 'y1',
         pointRadius: 0,
         cubicInterpolationMode: 'monotone',
         tension: 0.4 , 
         datalabels: {
            //display: 'false',
            labels: {
                title: null
              } 
          },    
     }
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
        hidden :true,
        datalabels: {
            //display: 'false', 
            labels: {
                title: null
              } 
          },
    }
    const datosCo2 ={
         label : " Co2",
         data : co2,
         backgroundColor: '#d85494', // Color de fondo 973d37
         borderColor: '#d85494', // Color del borde 95a5z6 d85494
         borderWidth: 3,
         yAxisID : 'y2',
         pointRadius: 0,
         cubicInterpolationMode: 'monotone',
         tension: 0.4 ,
         hidden :true,
         datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
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
        tension: 0.4 ,
        hidden :true,
        datalabels: {
            //display: 'false', 
            labels: {
                title: null
              }  
          },
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
        hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
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
        tension: 0.4,
        hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
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
        tension: 0.4,
        hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    const datorelativeHumidity ={
        label : "Humidity",
        data : relativeHumidity,
        backgroundColor: '#e4c1f4', // Color de fondo
        borderColor: '#e4c1f4', // Color del borde4476c6
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y2',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }

    const datosPWM ={
        label : "PWM",
        data : inyeccionPWM,
        backgroundColor: '#e4c1f5', // Color de fondo
        borderColor: '#e4c1f5', // Color del borde4476c6
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y2',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    console.time('loop');
    w = new Chart(grafica1, {
        type: 'line',// Tipo de gráfica
        data: {
            labels: fecha,
            datasets: [
                datosreturnAir,
                    datorelativeHumidity,
                    datosambienteAir,
                    datostempSupply,
                    datosEvaporationCoil,
                    datosEthylene,
                    datosSpEthylene,   
                    datosCo2,
                    datosSetPoint ,
                    datosPWM ,
                    datosInyeccion 
        
                    // Aquí más datos...
            ]
        },
        options: {
            animation: {
                onComplete: function () {
                        var today = moment().format("DD-MM-YYYY_HH-mm-ss");
                        //var dispositivoGrafica = info.madurador.nombre_contenedor;        
                        bajarGrafica.href= w.toBase64Image();
                        //bajarGrafica.download =''+dispositivoGrafica+'_'+today;
                        bajarGrafica.download ='datos'+today;
                        console.log(bajarGrafica);
                          bajarGrafica.click();               
                },
              },
            responsive : true,
            backgroundColor: '#fff',
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
                        text: 'Ethylene(ppm)',
                        color: '#1a2c4e',
                        font: { 
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                      },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                 },
                y2: {
                    type: 'linear',
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
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
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
    
                  },
                title: {
                    display: true,
                    text: 'Ripener Monitoring Data : '+info.madurador.nombre_contenedor +'('+info.madurador.descripcionC+')',
                    color: '#1a2c4e',
                    font: {                        
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
                        },
                    },
                },
            }           
        },
        plugins : [plugin,ChartDataLabels],
    });    
    console.timeEnd('loop');
}

async function graficaMadurador(info){
    console.log(info);
    CondicionanteZ = info.telemetria_id[0];

    const config1 = {method: 'get',dataType: 'json', url: '../../ztrack4/controllers/principalController.php?option=consultaTelemetriaMadurador&id='  + CondicionanteZ }

    const dataTelemetria =  await axios(config1);
    console.log(dataTelemetria.data.nombre_contenedor);

    ///if (typeof X1 !== 'undefined' && typeof X2 !== 'undefined') {X1.destroy();X2.destroy();}
    if (typeof X1 !== 'undefined') {X1.destroy();}
    /*
    setPoint =[];
    returnAir = [];
    tempSupply =[];
    ambienteAir =[];
    relativeHumidity =[];
    evaporationCoil =[];
    D_ethylene = [];
    co2 = [];
    sp_ethylene =[];
    fecha =[];
    inyeccionEtileno = [];
    contador =1;
    console.time('loop');
    


    info.tramaMadurador.forEach(permiso => {
       
      contador = contador +1 ;
      if(contador%1 ==0){
        setPoint.push(parseFloat(permiso.set_point));
        returnAir.push(parseFloat(permiso.return_air));
        tempSupply.push(parseFloat(permiso.temp_supply_1));
        ambienteAir.push(parseFloat(permiso.ambient_air));
        relativeHumidity.push(parseFloat(permiso.relative_humidity));
        evaporationCoil.push(parseFloat(permiso.evaporation_coil));
        D_ethylene.push(parseFloat(permiso.ethylene));
        co2.push(parseFloat(permiso.co2_reading));
        sp_ethylene.push(parseFloat(permiso.sp_ethyleno))
       // created_at1 = JSON.parse()
        //console.log(parseInt(permiso.created_at.$date.$numberLong)/1000);
        fecha.push(parseInt(permiso.created_at.$date.$numberLong)/1000);
        datoInyeccion = parseFloat(permiso.stateProcess) ;
        poner = 0 ;
        if(datoInyeccion==5.00){
          poner =100;    
        }
        inyeccionEtileno.push(poner);
      }
    });

    */
    console.timeEnd('loop');
    let datosInyeccion ={
        label : " Inyected",
        data : info.inyeccionEtileno,
        backgroundColor: '#f7f2e2', // Color de fondo
        borderColor: '#f7f2e2', // Color del borde
        borderWidth: 1,
        yAxisID : 'y2',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        fill: true,  
        datalabels: {
            //display: 'false',  
            labels: {
                title: null
              } 
          },
    }
    let datosEthylene ={
        label : " Ethylene",
        data : info.D_ethylene,
        backgroundColor: '#973d37', // Color de fondo
        borderColor: '#973d37', // Color del borde
        borderWidth: 3,
        yAxisID : 'y1',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    let datosSpEthylene ={
         label : " sp_Ethy",
         data : info.sp_ethylene,
         backgroundColor: '#d80014', // Color de fondo 973d37
         borderColor: '#d80014', // Color del borde 95a5z6 d85494
         borderWidth: 3,
         yAxisID : 'y1',
         pointRadius: 0,
         cubicInterpolationMode: 'monotone',
         tension: 0.4 , 
         datalabels: {
            //display: 'false',
            labels: {
                title: null
              } 
          },    
     }
    let datosEvaporationCoil ={
        label : " Evap",
        data : info.evaporationCoil,
        backgroundColor: '#95a5a6', // Color de fondo
        borderColor: '#95a5a6', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        //hidden :true,
        datalabels: {
            //display: 'false', 
            labels: {
                title: null
              } 
          },
    }
    let datosCo2 ={
         label : " Co2",
         data : info.co2,
         backgroundColor: '#d85494', // Color de fondo 973d37
         borderColor: '#d85494', // Color del borde 95a5z6 d85494
         borderWidth: 3,
         yAxisID : 'y2',
         pointRadius: 0,
         cubicInterpolationMode: 'monotone',
         tension: 0.4 ,
         //hidden :true,
         datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
     } 
    let datosSetPoint ={
        label : " SetPoint",
        data : info.setPoint,
        backgroundColor: '#f1c40f', // Color de fondo
        borderColor: '#f1c40f', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4 ,
        //hidden :true,
        datalabels: {
            //display: 'false', 
            labels: {
                title: null
              }  
          },
    }
    let datosreturnAir ={
        label : " Return ",
        data : info.returnAir,
        backgroundColor: '#ec7063', // Color de fondo
        borderColor: '#ec7063', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        //hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    let datostempSupply ={
        label : " Supply",
        data : info.tempSupply,
        backgroundColor: '#27ae60', // Color de fondo
        borderColor: '#27ae60', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        //hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    let datosambienteAir ={
        label : " Ambient",
        data : info.ambienteAir,
        backgroundColor: '#9ccc65', // Color de fondo
        borderColor: '#9ccc65', // Color del borde
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        //hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    let datorelativeHumidity ={
        label : "Humidity",
        data : info.relativeHumidity,
        backgroundColor: '#e4c1f4', // Color de fondo
        borderColor: '#e4c1f4', // Color del borde4476c6
        borderWidth: 3,// Ancho del borde
        yAxisID : 'y2',
        pointRadius : 0,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        //hidden :true,
        datalabels: {
            display: 'auto',
            clip :'true',
            clamp :'true',
            align: 'end',   
          },
    }
    console.time('loop');

  /*  
     w = new Chart(grafica1, {
        type: 'line',// Tipo de gráfica
        data: {
            labels: info.fecha,
            datasets: [
                    datosreturnAir,
                    datorelativeHumidity,
                    datosambienteAir,
                    datostempSupply,
                    datosEvaporationCoil,
                    datosEthylene,
                    datosSpEthylene,   
                    datosCo2,
                    datosSetPoint ,
                    datosInyeccion          
                    // Aquí más datos...
            ]
        },
        options: {

            responsive : true,
            backgroundColor: '#fff',
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
                        text: 'Ethylene(ppm)',
                        color: '#1a2c4e',
                        font: { 
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                      },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                 },
                y2: {
                    type: 'linear',
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
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
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
    
                  },
                title: {
                    display: true,
                    text: 'Ripener Monitoring Data : '+4 +'('+4+')',
                    color: '#1a2c4e',
                    font: {                        
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
                        },
                    },
                },

            }           
        },
        plugins : [plugin,ChartDataLabels],
    });    

*/

    /*
    const totalDuration = 10000;
    data =  info.returnAir;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      }
    };

    */
    
   longitudA = info.fecha.length ;
   bloques =6;
   general =[];
   generalF =[];
   generalH =[];

   generalA =[];
   generalT =[];
   generalE =[];
   generalET =[];
   generalSE =[];
   generalC =[];
   generalSP =[];
   generalI =[];
   generalUSDA =[];
   generalUSDA2 =[];
   generalUSDA3 =[];
   generalUSDA4 =[];
   generalO =[];

   generalPWD =[];

   longitudB = Math.trunc(longitudA/bloques);
   plano1 = info.returnAir;
   plano2 = info.relativeHumidity;
   
   plano3 = info.ambienteAir;
   plano4 = info.tempSupply;
   plano5 = info.evaporationCoil;
   plano6 = info.D_ethylene;
   plano7 = info.sp_ethylene;
   plano8 = info.co2;
   plano9 = info.setPoint;
   plano10 = info.inyeccionEtileno;
   plano11 = info.inyeccion_pwm;
   plano12 = info.cargo_1_temp
   plano13 = info.objetivo
   plano14 = info.cargo_2_temp
   plano15 = info.cargo_3_temp
   plano16 = info.cargo_4_temp
   
   planoTelemetria = info.telemetria_id;


   // CONFIGURACION NORMAL
   g1 = true;
   g2 = true;
   g3 = true;
   g4 = true;
   g5 = true;
   g6 = false;
   g7 = false;
   g8 = true;
   g9 = true;
   g10 = true;
   g11 =false;
   g12 = true;
   g13 = true;
   g14 =true;
   g15 = true;
   g16 = true;

extra1 =dataTelemetria.data.extra_1;
divece =dataTelemetria.data.nombre_contenedor;
descrip = dataTelemetria.data.descripcionC;
 
if(extra1==1){
    nombreMadurador="Ripener Monitoring Data"+divece+"("+descrip+")";
}else if (extra1==2){
    nombreMadurador="Tunel Monitoring Data"+divece+"("+descrip+")";
    g1 = false;
    g2 = true;
    g3 = true;
    g4 = true;
    g5 = true;
    g6 = true;
    g7 = true;
    g8 = true;
    g9 = true;
    g10 = true;
    g11 =true;
    g12 =false;
    g13 = false;
    g14 =false;
    g15 = false;
    g16 = false;

}else{
    nombreMadurador="Reefer Monitoring Data "+divece+"("+descrip+")";
    g1 = false;
    g2 = false;
    g3 = true;
    g4 = false;
    g5 = false;
    g6 = true;
    g7 = true;
    g8 = true;
    g9 = false;
    g10 = true;
    g11 =true;
    g12 = true;
    g13 = true;
    g14 =true;
    g15 = true;
    g16 = true;
}


/*
if(planoTelemetria[0]==33){
    nombreMadurador = "Ripener Monitoring Data ZGRU1090804(USA)";
}else if(planoTelemetria[0]==258){
    nombreMadurador = "Ripener Monitoring Data ZGRU2232647(USA)";
}
else if(planoTelemetria[0]==395){
    nombreMadurador = "Ripener  Monitoring Data ZGRU8707687";
}
else if(planoTelemetria[0]==259){
    nombreMadurador = "Ripener Monitoring Data  ZGRU2009227(USA)";

}else if(planoTelemetria[0]==260){
    nombreMadurador = "Ripener Monitoring Data  ZGRU2008220(USA)";
}
else if(planoTelemetria[0]==333){
    nombreMadurador = "Ripener Monitoring Data  ZGRU1263532(Perú)";
}
else if(planoTelemetria[0]==4376){
    nombreMadurador = "Reefer Monitoring Data  ZGRU9802859(SAASA)";
    g1 = false;
    g2 = false;
    g3 = true;
    g4 = false;
    g5 = false;
    g6 = true;
    g7 = true;
    g8 = true;
    g9 = false;
    g10 = true;
    g11 =true;
    g12 = true;
    g13 = true;
    g14 =true;
    g15 = true;
    g16 = true;
}
else if(planoTelemetria[0]==4377){
    nombreMadurador = "Reefer Monitoring Data  ZGRU5011183(SAASA)";
    g1 = false;
    g2 = false;
    g3 = true;
    g4 = false;
    g5 = false;
    g6 = true;
    g7 = true;
    g8 = true;
    g9 = false;
    g10 = true;
    g11 =true;
    g12 = true;
    g13 = true;
    g14 =true;
    g15 = true;
    g16 = true;
}
else if(planoTelemetria[0]==334){
    nombreMadurador = "TÚNEL DE FRIO  ZGRU2004185(Perú)";
    g1 = false;
    g2 = true;
    g3 = true;
    g4 = true;
    g5 = true;
    g6 = true;
    g7 = true;
    g8 = true;
    g9 = true;
    g10 = true;
    g11 =true;
    g12 =false;
    g13 = false;
    g14 =false;
    g15 = false;
    g16 = false;
}else{
    nombreMadurador = "RIPENNER PERÚ";
}
*/

   planoF = info.fecha;

   for(let i=1 ;i<=bloques ;i++){
     if(i==bloques){
        general[i]=plano1.slice((longitudB*(i-1)),(longitudA+1));
        generalH[i]=plano2.slice((longitudB*(i-1)),(longitudA+1));

        generalA[i]=plano3.slice((longitudB*(i-1)),(longitudA+1));
        generalT[i]=plano4.slice((longitudB*(i-1)),(longitudA+1));
        generalE[i]=plano5.slice((longitudB*(i-1)),(longitudA+1));
        generalET[i]=plano6.slice((longitudB*(i-1)),(longitudA+1));
        generalSE[i]=plano7.slice((longitudB*(i-1)),(longitudA+1));
        generalC[i]=plano8.slice((longitudB*(i-1)),(longitudA+1));
        generalSP[i]=plano9.slice((longitudB*(i-1)),(longitudA+1));
        generalI[i]=plano10.slice((longitudB*(i-1)),(longitudA+1));

        generalUSDA[i]=plano12.slice((longitudB*(i-1)),(longitudA+1));
        generalO[i]=plano13.slice((longitudB*(i-1)),(longitudA+1));

        generalUSDA2[i]=plano14.slice((longitudB*(i-1)),(longitudA+1));
        generalUSDA3[i]=plano15.slice((longitudB*(i-1)),(longitudA+1));
        generalUSDA4[i]=plano16.slice((longitudB*(i-1)),(longitudA+1));

        //PWD
        generalPWD[i]=plano11.slice((longitudB*(i-1)),(longitudA+1));
        //general.push([plano1.slice((longitudB*(i-1)),(longitudA+1))]);
        generalF[i]=planoF.slice((longitudB*(i-1)),(longitudA+1));
        //generalF.push([planoF.slice((longitudB*(i-1)),(longitudA+1))]);
       // general.j = plano1.slice((longitudB*(i-1)),(longitudA+1));

     }else{
        general[i] = plano1.slice((longitudB*(i-1)),(longitudB*(i)));
        generalH[i] = plano2.slice((longitudB*(i-1)),(longitudB*(i)));

        generalA[i] = plano3.slice((longitudB*(i-1)),(longitudB*(i)));
        generalT[i] = plano4.slice((longitudB*(i-1)),(longitudB*(i)));
        generalE[i] = plano5.slice((longitudB*(i-1)),(longitudB*(i)));
        generalET[i] = plano6.slice((longitudB*(i-1)),(longitudB*(i)));
        generalSE[i] = plano7.slice((longitudB*(i-1)),(longitudB*(i)));
        generalC[i] = plano8.slice((longitudB*(i-1)),(longitudB*(i)));
        generalSP[i] = plano9.slice((longitudB*(i-1)),(longitudB*(i)));
        generalI[i] = plano10.slice((longitudB*(i-1)),(longitudB*(i)));

        generalUSDA[i] = plano12.slice((longitudB*(i-1)),(longitudB*(i)));
        generalO[i] = plano13.slice((longitudB*(i-1)),(longitudB*(i)));

        generalUSDA2[i] = plano14.slice((longitudB*(i-1)),(longitudB*(i)));
        generalUSDA3[i] = plano15.slice((longitudB*(i-1)),(longitudB*(i)));
        generalUSDA4[i] = plano16.slice((longitudB*(i-1)),(longitudB*(i)));
        
        //general.push([plano1.slice((longitudB*(i-1)),(longitudB*(i)))]);
        //PWD
        generalPWD[i]=plano11.slice((longitudB*(i-1)),(longitudB*(i)));

        generalF[i]=planoF.slice((longitudB*(i-1)),(longitudB*(i)));
        //generalF.push([planoF.slice((longitudB*(i-1)),(longitudB*(i)))]);
        //general.push({id:i , data:plano1.slice((longitudB*(i-1)),(longitudB*(i)))});
        //general.i = plano1.slice((longitudB*(i-1)),(longitudB*(i)));
     }
   }
   /*
   console.log(general);
   console.log(generalF);
   console.log(general[1]);
   console.log(generalF[1]);
   */

   function saveImage (base64,dispositivo,semana) {
    //console.log(base64);
    var data = base64.replace(/^data:image\/png;base64,(.+)$/, '$1');
    //console.log(data);
    //var data =base64;
    var request = new XMLHttpRequest();
    var dispositivo1 = dispositivo;
    var semana1 = semana;
    request.open('POST', 'saveImageOnServer.php', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send('imageData=' + base64);
    //request.send('nombre_dispositivo=' + dispositivo1);
    //request.send('semana=' + semana);
}
   
    X1 =new Chart(grafica1, {
        type: 'line',// Tipo de gráfica
        data: {
            labels: info.fecha,
            datasets: [
                {
                    label : " Return ",
                    data : general[1],
                    backgroundColor: '#ec7063', // Color de fondo
                    borderColor: '#ec7063', // Color del borde
                    borderWidth: 3,// Ancho del borde
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    hidden :g1,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : "Humidity",
                    data : generalH[1],
                    backgroundColor: '#e4c1f4', // Color de fondo
                    borderColor: '#e4c1f4', // Color del borde4476c6
                    borderWidth: 3,// Ancho del borde
                    yAxisID : 'y2',
                    pointRadius : 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    hidden :g2,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " Ambient",
                    data : generalA[1],
                    backgroundColor: '#9ccc65', // Color de fondo
                    borderColor: '#9ccc65', // Color del borde
                    borderWidth: 3,// Ancho del borde
                    yAxisID : 'y',
                    pointRadius : 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    hidden :g3,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " Supply",
                    data : generalT[1],
                    backgroundColor: '#27ae60', // Color de fondo
                    borderColor: '#27ae60', // Color del borde
                    borderWidth: 3,// Ancho del borde
                    yAxisID : 'y',
                    pointRadius : 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    hidden :g4,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " Evap",
                    data :generalE[1] ,
                    backgroundColor: '#95a5a6', // Color de fondo
                    borderColor: '#95a5a6', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g5,
                    datalabels: {
                        //display: 'false', 
                        labels: {
                            title: null
                          } 
                      },
                },
                {
                    label : " Ethylene",
                    data :generalET[1] ,
                    backgroundColor: '#973d37', // Color de fondo
                    borderColor: '#973d37', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y1',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g6,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " SP Ethy",
                    data : generalSE[1] ,
                    backgroundColor: '#d80014', // Color de fondo 973d37
                    borderColor: '#d80014', // Color del borde 95a5z6 d85494
                    borderWidth: 3,
                    yAxisID : 'y1',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 , 
                    hidden :g7,
                    datalabels: {
                       //display: 'false',
                       labels: {
                           title: null
                         } 
                     },    
                },
                {
                    label : " Co2",
                    data : generalC[1],
                    backgroundColor: '#d85494', // Color de fondo 973d37
                    borderColor: '#d85494', // Color del borde 95a5z6 d85494
                    borderWidth: 3,
                    yAxisID : 'y2',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g8,
                    datalabels: {
                       display: 'auto',
                       clip :'true',
                       clamp :'true',
                       align: 'end',   
                     },
                },
                {
                    label : " SetPoint",
                    data : generalSP[1] ,
                    backgroundColor: '#f1c40f', // Color de fondo
                    borderColor: '#f1c40f', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g9,
                    datalabels: {
                        //display: 'false', 
                        labels: {
                            title: null
                          }  
                      },
                },
                {
                    label : " PWD",
                    data :  generalPWD[1] ,
                    backgroundColor: '#270e60', // Color de fondo
                    borderColor: '#270e60', // Color del borde
                    borderWidth: 1,
                    yAxisID : 'y2',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    //fill: true, 
                    hidden :g10, 
                    datalabels: {
                        //display: 'false',  
                        labels: {
                            title: null
                          } 
                      },
                },
                {
                    label : " Inyected",
                    data :  generalI[1] ,
                    backgroundColor: '#f7f2e2', // Color de fondo
                    borderColor: '#f7f2e2', // Color del borde
                    borderWidth: 1,
                    yAxisID : 'y2',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g11,
                    fill: true,  
                    datalabels: {
                        //display: 'false',  
                        labels: {
                            title: null
                          } 
                      },
                },
                {
                    label : " USDA",
                    data :generalUSDA[1] ,
                    backgroundColor: '#973d37', // Color de fondo
                    borderColor: '#973d37', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g12,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " OBJETIVO CARGA ",
                    data :generalO[1] ,
                    backgroundColor: '#d80014', // Color de fondo
                    borderColor: '#d80014', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g13,
                    datalabels: {
                        //display: 'false',  
                        labels: {
                            title: null
                          } 
                      }, 
                },
                {
                    label : " USDA 2",
                    data :generalUSDA2[1] ,
                    backgroundColor: '#973d37', // Color de fondo
                    borderColor: '#973d37', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g14,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " USDA 3",
                    data :generalUSDA3[1] ,
                    backgroundColor: '#973d37', // Color de fondo
                    borderColor: '#973d37', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g15,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                {
                    label : " USDA 4",
                    data :generalUSDA4[1] ,
                    backgroundColor: '#973d37', // Color de fondo
                    borderColor: '#973d37', // Color del borde
                    borderWidth: 3,
                    yAxisID : 'y',
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4 ,
                    hidden :g16,
                    datalabels: {
                        display: 'auto',
                        clip :'true',
                        clamp :'true',
                        align: 'end',   
                      },
                },
                           
            ]
        },

        options: {
            animation: {
                onComplete: function () {
                        var today = moment().format("DD-MM-YYYY_HH-mm-ss");
                        //var dispositivoGrafica = info.madurador.nombre_contenedor;  
                        console.log(X1.toBase64Image()) ;     
                        bajarGrafica.href= X1.toBase64Image();
                        //bajarGrafica.download =''+dispositivoGrafica+'_'+today;
                        bajarGrafica.download ='datos'+today;
                        //var imagen = X1.toBase64Image();
                        //var imagen = grafica1.toDataURL("image/png");
                        //console.log(imagen);
                        saveImage(X1.toBase64Image(),'ZGRU1200200',47);
                        //console.log(bajarGrafica);
                          //bajarGrafica.click(); 

                          //var data = imagen.replace(/^data:image\/png;base64,(.+)$/, '$1');
                          //console.log(data);
                          //var data =base64;
                          //var request = new XMLHttpRequest();
                         // var dispositivo1 = dispositivo;
                          //var semana1 = semana;
                          //request.open('POST', 'saveImageOnServer.php', true);
                          //request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                          //request.send('imageData=' + data);
             
                },
              },

            responsive : true,
            backgroundColor: '#fff',
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
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                    },
                    suggestedMin: 0,
                    suggestedMax: 20
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ethylene(ppm)',
                        color: '#1a2c4e',
                        font: { 
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                      },
                      suggestedMin: 0,
                      suggestedMax: 10,
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                 },
                y2: {
                    type: 'linear',
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
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
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
    
                  },
                title: {
                    display: true,
                    text: nombreMadurador,
                    color: '#1a2c4e',
                    font: {                        
                        size: 30,
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
                        },
                    },
                },

            }           
        },
        plugins : [plugin,ChartDataLabels],

            
    })
    for(let j=2;j<=bloques;j++){
    setTimeout(function(){
    const data =X1.data;
    //X1.data.labels = generalF[1].concat(generalF[2]);
    data.datasets[0].data =  data.datasets[0].data.concat(general[j]);
    data.datasets[1].data =  data.datasets[1].data.concat(generalH[j]);

    data.datasets[2].data =  data.datasets[2].data.concat(generalA[j]);
    data.datasets[3].data =  data.datasets[3].data.concat(generalT[j]);
    data.datasets[4].data =  data.datasets[4].data.concat(generalE[j]);
    data.datasets[5].data =  data.datasets[5].data.concat(generalET[j]);
    data.datasets[6].data =  data.datasets[6].data.concat(generalSE[j]);
    data.datasets[7].data =  data.datasets[7].data.concat(generalC[j]);
    data.datasets[8].data =  data.datasets[8].data.concat(generalSP[j]);
    data.datasets[9].data =  data.datasets[9].data.concat(generalPWD[j]);
    data.datasets[10].data =  data.datasets[10].data.concat(generalI[j]);
    data.datasets[11].data =  data.datasets[11].data.concat(generalUSDA[j]);
    data.datasets[12].data =  data.datasets[12].data.concat(generalO[j]);
    //data.datasets[10].data =  data.datasets[10].data.concat(generalI[j]);
    data.datasets[13].data =  data.datasets[13].data.concat(generalUSDA2[j]);
    data.datasets[14].data =  data.datasets[14].data.concat(generalUSDA3[j]);
    data.datasets[15].data =  data.datasets[15].data.concat(generalUSDA4[j]);
    X1.update();
    }, 100);
    }

    console.timeEnd('loop');
}
async function ultimoPuntoMadurador(info1,id) {
    markers.clearLayers();
    lat =parseFloat(info1.madurador.latitud);
    log = parseFloat(info1.madurador.longitud);
    var photoIcon = L.icon({ iconUrl: 'fruta2.svg', iconSize:[80, 129],iconAnchor:[40, 93],popupAnchor: [0, -55]});
    var marker = L.marker([lat,log], {icon: photoIcon}).addTo(markers);
    let textoF = await datosprueba(id);
    marker.bindPopup(textoF);
    marker.on('click', markerOnClick)
    showLocation();
    var latlng =  L.latLng(lat,log);
    map.setView(latlng,14);
    saltarA('#g1g1');  
}
async function filtroFechaM(id){
    $(".loader").show();
    fecha_pasada = moment().add(-12,'hour').format('YYYY-MM-DD HH:mm'); 
    fecha_actual = moment().format('YYYY-MM-DD HH:mm');
    acumulado1 = fecha_pasada +','+fecha_actual+';'+id;
    console.log(acumulado1);
    console.time('loop');
    //const config = {method: 'get',dataType: 'json', url: '../../ztrack2/controllers/principalController.php?option=consultaFechaMadurador&id=' + acumulado1 }
    const info = await fetch('../../ztrack4/controllers/principalController.php?option=consultaFechaMadurador1&id=' + acumulado1).then(res =>res.json())
    $(".loader").fadeOut("fast");
    //const buena =  await axios(config);
    //console.log(buena);
    //const info = buena.data;
    console.timeEnd('loop');
    // info de los datos 
    console.time('loop');
    //ultimoPuntoMadurador(info,id);
    console.timeEnd('loop');
    console.time('loop');
    graficaMadurador(info);
    console.timeEnd('loop');

    console.time('loop');    
    tablaDatosMadurador(info);
    console.timeEnd('loop');
    $(function() {
        $('input[name="datetimes"]').daterangepicker({ timePicker: true,startDate : moment().add(-24,'hour'),endDate: moment(),locale: { format: 'YYYY-MM-DD ' }, },
        async function(start,end,label){
            $(".loader").show();
            idf =start.format('YYYY-MM-DD HH:mm ');
            idf1 =end.format('YYYY-MM-DD HH:mm ');
            acumulado = idf +','+idf1+';'+id;
            console.time('loop');
            console.log(acumulado);
            const config = {method: 'get',dataType: 'json', url: '../../ztrack4/controllers/principalController.php?option=consultaFechaMadurador1&id='  + acumulado }
           //const config = {method: 'get',dataType: 'json', url: '../../mensaje.py'}
            const buena =  await axios(config);
            console.log(buena)
            const info1 = buena.data;
            console.timeEnd('loop');
            $(".loader").fadeOut("fast");
            
            console.time('loop');

            //ultimoPuntoMadurador(info1,id);
            console.timeEnd('loop');
            console.time('loop');

            graficaMadurador(info1);  
            console.timeEnd('loop');
            
            console.time('loop');
            tablaDatosMadurador(info1);
            console.timeEnd('loop');
          });
      });
      mostarM();
  }