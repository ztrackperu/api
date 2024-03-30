//const { default: axios } = require("axios");

const isNumber = n => $.isNumeric(n);
async function terrible(){
    //console.log("dentro pa");
    SP_Setpoint =  document.getElementById('reciverSP').value ;
    Acum =  document.getElementById('MaduradorTemp').value ;

    if(SP_Setpoint==""){
        console.log("no ha enviado datos a cambiar ");
        tip = "error";
        mens = "NO DATA TO CHANGE...";
        message(tip, mens);  
    }else if(!isNumber(SP_Setpoint)){
        console.log("Tiene que ingresar un numero valido ...");
        tip = "error";
        mens = "ENTER VALID NUMBERS...";
        message(tip, mens);  
    }else{
        //console.log(SP_Setpoint+","+Acum);
        totalData = SP_Setpoint+","+Acum;
        //axios.post('../../ztrack4/controllers/empresasController.php?option=GrabarComando', totalData)
        /*
        axios.post( '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData )
        .then(function (response) {
        console.log(response);
        const info = response.data;
        console.log(info);
        message(info.tipo, info.mensaje);       
        setTimeout(() => {
        window.location.reload();
        }, 100000);  
        if(info.tipo =="success"){
            IntegralComando.innerHTML = '';
         }
        })
        .catch(function (error) {
        console.log(error);
        });

        */
        Snackbar.show({
            text: 'Are you sure you want to change the temperature? : '+SP_Setpoint,
            width: '605px',
            actionText: '  YES  ',
            backgroundColor: '#198754',
            onActionClick: async function (element) {
                const config = {
                    method: 'get',
                    dataType: 'json',
                    url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
                }
                 const buena =  await axios(config);
                //console.log(buena);
                 const info = buena.data;
    
                 message(info.tipo, info.mensaje); 
/*
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
                   */
            }       
          });           
    }
   // console.log(SP_Setpoint+","+Acum);   
}

async function terribleEthy(){
    //console.log("dentro pa");
    SP_Setpoint =  document.getElementById('reciverEthy').value ;
    Acum =  document.getElementById('MaduradorEthy').value ;

    if(SP_Setpoint==""){
        console.log("no ha enviado datos a cambiar ");
        tip = "error";
        mens = "NO DATA TO CHANGE...";
        message(tip, mens);  
    }else if(!isNumber(SP_Setpoint)){
        console.log("Tiene que ingresar un numero valido ...");
        tip = "error";
        mens = "ENTER VALID NUMBERS...";
        message(tip, mens);  
    }else{
        
        totalData = SP_Setpoint+","+Acum;

        Snackbar.show({
            text: 'Are you sure you want to change the SP Ethylene? : '+SP_Setpoint,
            width: '605px',
            actionText: '  YES  ',
            backgroundColor: '#198754',
            onActionClick: async function (element) {
                const config = {
                    method: 'get',
                    dataType: 'json',
                    url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
                }
                 const buena =  await axios(config);
                //console.log(buena);
                 const info = buena.data;
    
                 message(info.tipo, info.mensaje); 

            }
         
          });
                   
    }
    
}

async function terribleCo2(){
    //console.log("dentro pa");
    SP_Setpoint =  document.getElementById('reciverCo2').value ;
    Acum =  document.getElementById('MaduradorCo2').value ;

    if(SP_Setpoint==""){
        console.log("no ha enviado datos a cambiar ");
        tip = "error";
        mens = "NO DATA TO CHANGE...";
        message(tip, mens);  
    }else if(!isNumber(SP_Setpoint)){
        console.log("Tiene que ingresar un numero valido ...");
        tip = "error";
        mens = "ENTER VALID NUMBERS...";
        message(tip, mens);  
    }else{
        
        totalData = SP_Setpoint+","+Acum;
        Snackbar.show({
            text: 'Are you sure you want to change the SP CO2? : '+SP_Setpoint,
            width: '605px',
            actionText: '  YES  ',
            backgroundColor: '#198754',
            onActionClick: async function (element) {
                const config = {
                    method: 'get',
                    dataType: 'json',
                    url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
                }
                 const buena =  await axios(config);
                //console.log(buena);
                 const info = buena.data;
                 message(info.tipo, info.mensaje); 
            }        
          });                
    }   
}

async function terribleHum(){
    //console.log("dentro pa");
    SP_Setpoint =  document.getElementById('reciverHum').value ;
    Acum =  document.getElementById('MaduradorHum').value ;

    if(SP_Setpoint==""){
        console.log("no ha enviado datos a cambiar ");
        tip = "error";
        mens = "NO DATA TO CHANGE...";
        message(tip, mens);  
    }else if(!isNumber(SP_Setpoint)){
        console.log("Tiene que ingresar un numero valido ...");
        tip = "error";
        mens = "ENTER VALID NUMBERS...";
        message(tip, mens);  
    }else{      
        totalData = SP_Setpoint+","+Acum;
        Snackbar.show({
            text: 'Are you sure you want to change the SP Humidity ? : '+SP_Setpoint,
            width: '605px',
            actionText: '  YES  ',
            backgroundColor: '#198754',
            onActionClick: async function (element) {
                const config = {
                    method: 'get',
                    dataType: 'json',
                    url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
                }
                 const buena =  await axios(config);
                //console.log(buena);
                 const info = buena.data;
    
                 message(info.tipo, info.mensaje); 
            }       
          });                 
    }   
}

async function terribleDefrost() {
    //totalData = "DEFROST,"+Acum;
    Acum =  document.getElementById('MaduradorDefrost').value ;
    totalData = "DEFROST,"+Acum;
    Snackbar.show({
        text: 'Are you sure you want to ACTIVE DEFROST ? : ',
        width: '605px',
        actionText: '  YES  ',
        backgroundColor: '#198754',
        onActionClick: async function (element) {
            const config = {
                method: 'get',
                dataType: 'json',
                url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
            }
             const buena =  await axios(config);
            //console.log(buena);
             const info = buena.data;

             message(info.tipo, info.mensaje); 
        }       
      }); 

}

async function terribleOnOff() {
    //totalData = "DEFROST,"+Acum;
    Acum =  document.getElementById('OnOff').value ;
   
    claveVU =  document.getElementById('claveV').value ;
    totalData = "TERRIBLE,"+Acum;
    
    // validar clave de seguridad 
    if(claveVU == "saasaperu@!" || claveVU=="Proyectoztrack2023!"){

    Snackbar.show({
        text: 'Are you sure you want to ON/OFF ? : ',
        width: '605px',
        actionText: '  YES  ',
        backgroundColor: '#198754',
        onActionClick: async function (element) {
            const config = {
                method: 'get',
                dataType: 'json',
                url: '../../ztrack4/controllers/empresasController.php?option=GrabarComando_cliente&id='  + totalData
            }
             const buena =  await axios(config);
            //console.log(buena);
             const info = buena.data;

             message(info.tipo, info.mensaje); 
        }       
      }); 
    }else{
        Snackbar.show({
            text: 'NO ESTA AUTORIZADO! ',
            width: '605px',
            backgroundColor: 'red',
            actionText: ' OK ',
        });
    }

}

$(document).ready(function () {
    var table2 =  $('#table_reffer1').DataTable({
        scrollY: 300,
        scrollX: true,
        pageLength: 100,
        processing: true,
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
        ],
        order: [[1, 'asc']],
    });  
    var tableM =  $('#table_reffer2').DataTable({
      scrollY: 300,
      scrollX: true,
      pageLength: 100,
      processing: true,

      

  }); 

    var table21 =  $('#table_genset').DataTable({     
        scrollY: 300,
        scrollX: true,
        pageLength: 100,
        processing: true,
       

    }); 
    //referencia genset 
    var tableG =  $('#exampleG').DataTable({
        scrollY: 160,
        scrollX: true,
        pageLength: 100,
        processing: true,
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            {
             
               target:1,
               visible:false,

            },
        ],
        order: [[1, 'asc']],
     });

    // funcion que se invoca para ordenar 
    var myMenu = [{
        // This example uses Font Awesome Iconic Font.
        icon: 'fa fa-home',
        // Menu Label
        label: '<a href="#" style="color:#192c4e";>Email</a>',
        // Callback
        action: function(option, contextMenuIndex, optionIndex) {},
        // An array of submenu objects
        submenu: null,
        // is disabled?
        disabled: false   //Disabled status of the option
      },
      {
        icon: 'fa fa-user',
        label: '<a href="#" style="color:#192c4e";>Report</a>',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: null,
        disabled: false
      },
      {
        icon: 'fa fa-envelope',
        label: '<a href="#" style="color:#192c4e";>Graph</a>',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: null,
        disabled: false
      },
      {
        //Menu separator
        separator: true
      },
      {
        icon: 'fa fa-share',
        label: 'CONTROLLER',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: [{ // sub menus
          icon: 'fa fa-facebook',
          label: '<a href="#" style="color:#192c4e"; >SP Temperature</a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu: null,
          disabled: false
        },
        {
            icon: 'fa fa-twitter',
            label: '<a href="#" style="color:#192c4e"; >SP Ethylene</a>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: null,
            disabled: false
          },
        {
          icon: 'fa fa-twitter',
          label: '<a href="#" style="color:#192c4e"; >SP Co2</a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu: null,
          disabled: false
        },
        {
          icon: 'fa fa-google-plus',
          label: '<a href="#" style="color:#192c4e"; > SP Humedity</a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu: null,
          disabled: false
        }],
        disabled: false
      },
    ];
    /*
    tableG.on('contextmenu', 'tr',function(e) {
      e.preventDefault();
      superCm.createMenu(myMenu, e);
    });
    */
    tableG.on('dblclick', 'tr', function () {
        var data = tableG.row( this ).data();
        //alert( "Hiciste clic en "+data[0]+ "fila de \");
        //alert("hiciste doble clik"+data[1]);
        filtroFechaG(data[1]);
        });
    tableG.on('order.dt search.dt', function () {
        let i = 1;

        tableG.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();


    var tableM1=  $('#exampleM').DataTable({
        scrollY: 160,
        scrollX: true,
        pageLength: 100,
        processing: true,
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            {
             
                target:1,
                visible:false,
 
             },
            //array utilizado para ocultar 
            //ocultar : [1,2,3],
            //  2 COLUMNAS OCULTAS EN :State Indicators
            {
                target: 6,
                visible: false,
               
           
            },
            {
                target: 7,
                visible: false,
            },
            //  1 COLUMNAS OCULTAS EN :Identification
            {
                target: 10,
                visible: false,
            },
            //  2 COLUMNAS OCULTAS EN :Booking
            {
                target: 12,
                visible: false,
            },
            {
                target: 13,
                visible: false,
            },
            //5 COLUMNAS OCULTAS EN :Report Date/Time and Location
            {
                target: 21,
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
                target: 28,
                visible: false,
            },
            {
                target: 31,
                visible: false,
            },
            {
                target: 33,
                visible: false,
            },
            {
                target: 56,
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
    tableM1.on('order.dt search.dt', function () {
        let i = 1;
        tableM1.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();

    tableM1.on('dblclick', 'tr', function () {
        var data = tableM1.row( this ).data();
        //alert( "Hiciste clic en "+data[0]+ "fila de \");
        //alert("hiciste doble clik"+data[1]);
        filtroFechaM(data[1]);
        });

    tableM1.on('contextmenu', 'tr',function(e) {
      var data = tableM1.row( this ).data();
      e.preventDefault();
      // nombre_dispositivo
      nombreT = data[9];
      // verificamos que el dispositivo est en linea 
      v_online =data[3];
      //console.log(v_online);
      if( v_online =="<strong>ONLINE</strong>"){
      nombreT1 = nombreT.replace("<strong>","");
      nombreT2 = nombreT1.replace("</strong>","");

      // valor actual de set point 
      SPTemp = data[29];
      // valor actual de Ethyleno 
      SPEthy = data[33];
      // valor actual de co2 
      SPCo2= data[37];
      // valor actual de Humedad
      SPHum = data[35];
      // dato de imagen prendida 
      Icono =data[4];
      //console.log(Icono);
      
      //comandos-id para las tramas 
      comandoT = 4;
      comandoE = 6;
      comandoC = 7;
      comandoH = 8;
      comandoDefrost =10;
      
      comandoON =9;
      
      comandoOFF = 3;
      
      telemetria = data[1];
      if(Icono=='<img src="run.png" height="25" width="25">'){
        cadenaSWITH = nombreT2+","+comandoON+","+telemetria+",1";
        textoA = "APAGAR";
        boton ="btn btn-danger";
      }else{
        cadenaSWITH = nombreT2+","+comandoOFF+","+telemetria+",0";
        textoA = "ENCENDER";
        boton ="btn btn-success";
      }
      console.log(cadenaSWITH)
      //telemetria_id
      
      // cadena 
      cadenaM = nombreT2+","+comandoT+","+telemetria+","+SPTemp;
      //cadena para Ethyleno
      cadenaE = nombreT2+","+comandoE+","+telemetria+","+SPEthy;
      //CADENA PARA CO2
      cadenaC = nombreT2+","+comandoC+","+telemetria+","+SPCo2;
      //cadena para HUMEDAD
      cadenaH = nombreT2+","+comandoH+","+telemetria+","+SPHum;
      // cadena Defrost
      CadenaDefrost = nombreT2+","+comandoDefrost+","+telemetria+",DEFROST";
     
      if(SPCo2>100 || SPCo2<0){
        SPCo2 ="NA";
      }
    // console.log()
      var myMenu1 = [
    {
            label: '<a href="#" style="color:#000";>COD : '+ nombreT+'</a>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: null,
            disabled: false
    }, 
    {
        // This example uses Font Awesome Iconic Font.       
        // Menu Label
        label: '<a href="#" style="color:#192c4e";>Email</a>',
        // Callback
        action: function(option, contextMenuIndex, optionIndex) {},
        // An array of submenu objects
        submenu: [{ // sub menus

            label: 'Today',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: [{ // sub menus
                label: '&nbsp<input style="width:200px" id="reciverSP"> &nbsp<button onclick="#" type="button" class="btn btn-success">SEND</button>',
                action: function(option, contextMenuIndex, optionIndex) {},
                submenu: null,
                disabled: false
              },],
            disabled: false
          },
          { // sub menus

            label: 'Search by date',
            action: function(option, contextMenuIndex, optionIndex) {
            },
            submenu: [{ // sub menus
                label: '<input style="border: 0; " type="text" name="datetimesEmail" />',
                action: function(option, contextMenuIndex, optionIndex) {
                    $(function() {
                        $('input[name="datetimesEmail"]').daterangepicker({ timePicker: true,startDate : moment().add(-24,'hour'),endDate: moment(),locale: { format: 'YYYY-MM-DD ' }, },
                        async function(start,end,label){
                    
                          });
                      });
                },
                submenu: null,
                disabled: false
              },],
            disabled: false
          }
        ],
        // is disabled?
        disabled: false   //Disabled status of the option
      },
      {
      
        label: '<a href="#" style="color:#192c4e";>Report</a>',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: null,
        disabled: false
      },
      { 
        label: '<a href="#" style="color:#192c4e";>Graph</a>',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: null,
        disabled: false
      },

      {      
        label: 'Controller',
        action: function(option, contextMenuIndex, optionIndex) {},
        submenu: [{ // sub menus
          icon: 'fa fa-facebook',
          label: '<a href="#" style="color:#192c4e"; >SP Temperature : </a><a style="color:blue">'+SPTemp+' C°</a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu: [{ // sub menus
            label: '<input style="width:50px" id="reciverSP">  <input id="MaduradorTemp" type="hidden" value="'+cadenaM+'" /><p style="color:#fff">ss </p> <button onclick="terrible()" type="button" class="btn btn-success">CHANGE TEMPERATURE</button>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: null,
            disabled: false
          },],
          disabled: false
        },
        {
            icon: 'fa fa-twitter',
            label: '<a onclick="#" style="color:#192c4e"; >SP Ethylene : &nbsp&nbsp&nbsp&nbsp&nbsp</a><a style="color:blue">'+ SPEthy+'  PPM</a>',
            action: function(option, contextMenuIndex, optionIndex) {
               
                   //$('#myModalComando').modal({show:true});
                   modal.style.display = "block";
                   console.log("app");   
            },
            submenu: [{ // sub menus

                label: '<input style="width:50px" id="reciverEthy">  <input id="MaduradorEthy" type="hidden" value="'+cadenaE+'" /><p style="color:#fff">ss </p> <button onclick="terribleEthy()" type="button" class="btn btn-success">CHANGE ETHYLENE</button>',
                action: function(option, contextMenuIndex, optionIndex) {},
                submenu: null,
                disabled: false
              },],
            disabled: false
          },
        {
          icon: 'fa fa-twitter',
          label: '<a href="#" style="color:#192c4e"; >SP Co2 :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </a><a style="color:blue">' +SPCo2+' % </a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu:[{ // sub menus}
            label: '<input style="width:50px" id="reciverCo2">  <input id="MaduradorCo2" type="hidden" value="'+cadenaC+'" /><p style="color:#fff">ss </p> <button onclick="terribleCo2()" type="button" class="btn btn-success">CHANGE CO2</button>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: null,
            disabled: false
          },],
          disabled: false
        },
        {
            icon: 'fa fa-google-plus',
            label: '<a href="#" style="color:#192c4e"; >SP Humidity :&nbsp&nbsp&nbsp&nbsp&nbsp </a><a style="color:blue">' +SPHum+' % </a>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: [{ // sub menus
                label: '<input style="width:50px" id="reciverHum">  <input id="MaduradorHum" type="hidden" value="'+cadenaH+'" /><p style="color:#fff">ss </p> <button onclick="terribleHum()" type="button" class="btn btn-success">CHANGE HUMIDITY</button>',
                action: function(option, contextMenuIndex, optionIndex) {},
                submenu: null,
                disabled: false
              },],
            disabled: false
        },
        {
          icon: 'fa fa-google-plus',
          label: '<a href="#" style="color:#192c4e"; > Defrost</a>',
          action: function(option, contextMenuIndex, optionIndex) {},
          submenu:  [{ // sub menus
            label: '&nbsp<input id="MaduradorDefrost" type="hidden" value="'+CadenaDefrost+'" /><button onclick="terribleDefrost()" type="button" class="btn btn-success">ACTIVATE DEFROST</button>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu: null,
            disabled: false
          },],

          disabled: false
        },
        {
            icon: 'fa fa-google-plus',
            label: '<a href="#" style="color:#192c4e"; > ON/OFF</a>',
            action: function(option, contextMenuIndex, optionIndex) {},
            submenu:  [{ // sub menus
              label: '<input style="width:50px" id="claveV">&nbsp<input id="OnOff" type="hidden" value="'+cadenaSWITH+'" /><button onclick="terribleOnOff()" type="button" class="'+boton+'">'+textoA+'</button>',
              action: function(option, contextMenuIndex, optionIndex) {},
              submenu: null,
              disabled: false
            },],
  
            disabled: false
          }
    
    
    ],
        disabled: false
      },
    ];
      superCm.createMenu(myMenu1, e);
    }
}
    );
    // funcion click para ocultar columnas
    /*
    importante aaqui añadir los estilos que haran posible :
    OCULTAR /MOSTRAR COLUMNA 
    */
    var table =  $('#example').DataTable({
        scrollY: 160,
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
});
    