const frm = document.querySelector('#frmEmpresa');
const permiso = document.querySelector('#frmPermiso1');
const permisoDispositivo = document.querySelector('#frmAsignarDispositivo');
const permisoDispositivo1 = document.querySelector('#frmAsignarDispositivo1');
//Captura los datos del formulario
const nombre_empresa = document.querySelector('#nombre_empresa');
const descripcion = document.querySelector('#descripcion');
const temp_contratada = document.querySelector('#temp_contratada');
const id_empresa = document.querySelector('#id_empresa');
//captura los botones
const btn_nuevo = document.querySelector('#btn-nuevo');
const btn_save = document.querySelector('#btn-save');
//PARA CARGAR LOS DATOS EN LA TABLA COMO LISTA
document.addEventListener('DOMContentLoaded', function () {
  $('#table_empresas').DataTable({
    ajax: {
      url: ruta + 'controllers/empresasController.php?option=listar',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'nombre_empresa' },
      { data: 'descripcion' },
      { data: 'temp_contratada' },
      { data: 'accion' }
    ],
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
    },
    "order": [[0, 'desc']]
  });
  
  //al presionar boton de GUARDAR O ACTUALIZAR
  frm.onsubmit = function (e) {
    e.preventDefault();
    if (nombre_empresa.value == '' || descripcion.value == ''
      || temp_contratada.value == '') {
      message('error', 'TODO LOS CAMPOS CON * SON REQUERIDOS')
    } else {
      const frmData = new FormData(frm);
      axios.post(ruta + 'controllers/empresasController.php?option=save', frmData)
        .then(function (response) {
          const info = response.data;
          message(info.tipo, info.mensaje); 
          if (info.tipo == 'success') {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  // al presionar nuevo se resetea
  btn_nuevo.onclick = function () {
    frm.reset();
    id_empresa.value = '';
    btn_save.innerHTML = 'Guardar';
    //nombre.focus();
  }


  permisoDispositivo1.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post(ruta + 'controllers/empresasController.php?option=AsignarDispositivo', frmData)
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
// al hacer click en el boton D (delete ) para eliminar
function deleteEmpresa(id) {
  Snackbar.show({
    text: 'Esta seguro de eliminar la Asignacion',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get(ruta + 'controllers/empresasController.php?option=quitarAsignacion&id=' + id)
        .then(function (response) {
          const info = response.data;
          message(info.tipo, info.mensaje);
          if (info.tipo == 'success') {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

}
// al hacer click en el boton E (Edit ) para editar
function editEmpresa(id) {
  axios.get(ruta + 'controllers/empresasController.php?option=edit&id=' + id)
    .then(function (response) {
      const info = response.data;
      // se captura la informacion  NOMBRE VARIABLE = NOMBRE EN BASE DE DATOS
      nombre_empresa.value =info.nombre_empresa;
      descripcion.value = info.descripcion;
      temp_contratada.value = info.temp_contratada;
      id_empresa.value = info.id;
      //Cambio descripcion de boton GUARDAR a Actualizar
      btn_save.innerHTML = 'Actualizar';
    })
    .catch(function (error) {
      console.log(error);
    });
}


function EmpresaDispositivo(id) {
  axios.get(ruta + 'controllers/empresasController.php?option=EmpresaDispositivo&id=' + id)
    .then(function (response) {    
      const info = response.data;
      let html = '';
      console.log(info);
      html += `
      <div class="row">
      <div class="col-md-3"> 
      </div> 
      <div class="col-md-3">
      <h4>EMPRESA: </h4>
      <p></p>
      </div>
      <div class="col-md-3">
      <h4>${info.empresa.nombre_empresa} </h4>
      <p></p>
      </div>
      <div class="col-md-3">     
      </div>
      </div>
    
      `;
      idBueno =info.empresa.id;

      html += `
      <div class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Tipo Dispositivo</span>
          </div>
          <select id="tipoDispositivo" name="tipoDispositivo" class="form-control" onchange="seleccionar_tipo(this.value,idBueno)">
                <option value="0">Seleccione ...</option>  
                <option value="Generador">Generador</option>  
                <option value="Reefer">Reefer</option> 
                <option value="Madurador">Madurador</option>                
         </select>
         `;
         html += `        
                </div>
                </div>
                <div class="col-md-3">
                </div>
                </div>
       
              <div class="row">
              <div class="col-md-12">
              <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Empresa</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
          `;
        
          info.reeferAsignado.forEach(permiso1 => {
            html += `
            <tr>
              <th scope="row">#</th>
              <td>${permiso1.nombre_contenedor}</td>
              <td>${permiso1.tipo}</td>
              <td><a class="btn btn-danger btn-sm" onclick="deleteAsignacion(' ${permiso1.id},R')"><i class="fas fa-eraser"></i>D</a>
              </td>
            </tr>
            `;
          } );

          info.maduradorAsignado.forEach(permiso1 => {
            html += `
            <tr>
              <th scope="row">#</th>
              <td>${permiso1.nombre_contenedor}</td>
              <td>${permiso1.tipo}</td>
              <td><a class="btn btn-danger btn-sm" onclick="deleteAsignacion(' ${permiso1.id},M')"><i class="fas fa-eraser"></i>D</a>
              </td>
            </tr>
            `;
          } );

          info.generadorAsignado.forEach(permiso1 => {
            html += `
            <tr>
              <th scope="row">#</th>
              <td>${permiso1.nombre_generador}</td>
              <td>Generador</td>
              <td><a class="btn btn-danger btn-sm" onclick="deleteAsignacion(' ${permiso1.id},G')"><i class="fas fa-eraser"></i>D</a>
              </td>
            </tr>
            `;
          } );
              
 
      // aqui se agrega segun el nombre del frm
      permisoDispositivo.innerHTML = html;
      $('#modalEmpresa-Dispositivo').modal('show');
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteAsignacion(id)
{

  console.log(id);
  
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get(ruta + 'controllers/empresasController.php?option=deleteAsignacionDispositivo&id=' + id)
        .then(function (response) {
          const info = response.data;
          message(info.tipo, info.mensaje);
          if (info.tipo == 'success') {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
  
}

 
function seleccionar_tipo(value,id){
  empresaSeleccionada =id;
  if(value=="Generador"){
    axios.get(ruta + 'controllers/empresasController.php?option=ListaGeneradores&id=' + id)
    .then(function (response) {  
    const info = response.data;
    html ='';
    html += `
    <input name="id_empresa" type="hidden" value="${empresaSeleccionada}" />
    <input name="tipo_dispositivo" type="hidden" value="Generador" />
    <div class="row"> <div class="col-md-3"></div> <div class="col-md-6"><div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Generadores</span>
        </div>
        <select id="listaDispositivos" name="listaDispositivos" class="form-control" ">
              <option value="0">Seleccione ...</option>  
              `;   
      info.generadorDisponible.forEach(permiso => {
        html += `
                <option value="${permiso.id}">${permiso.nombre_generador}</option>             
                `;
      });
    html += `
    </select> </div></div><div class="col-md-3"></div> </div>
    <div class="row"><div class="col-md-3"> </div> <div class="col-md-6">
    <button class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR</button>
    </div> </div><div class="col-md-3"> </div></div> 
    `;
    html += `
   <p> FRAGMENTO DE TEXTO 1 </p>
    `;

    // aqui se agrega segun el nombre del frm
    permisoDispositivo1.innerHTML = html;
    })
  .catch(function (error) {
    console.log(error);
  });
  }
  else if(value=="Reefer"){
    axios.get(ruta + 'controllers/empresasController.php?option=ListaReefer&id=' + id)
    .then(function (response) {  
    const info = response.data;
    html ='';
    html += `
    <input name="id_empresa" type="hidden" value="${empresaSeleccionada}" />
    <input name="tipo_dispositivo" type="hidden" value="Reefer" />
    <div class="row"><div class="col-md-3"></div><div class="col-md-6">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Reffers</span>
        </div>
        <select id="listaDispositivos" name="listaDispositivos" class="form-control" >
              <option value="0">Seleccione ...</option>   
       `;
       info.reeferDisponible.forEach(permiso => {
        html += `
                <option value="${permiso.id}">${permiso.nombre_contenedor}</option>             
                `;
      });
    html += `
    </select></div></div><div class="col-md-3"></div></div>
    <div class="row"><div class="col-md-3"></div> <div class="col-md-6"> 
    <button class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR</button>
    </div></div><div class="col-md-3"> </div></div>  
    `;
    permisoDispositivo1.innerHTML = html;
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  else if(value=="Madurador"){
    axios.get(ruta + 'controllers/empresasController.php?option=ListaMaduradores&id=' + id)
    .then(function (response) {  
    const info = response.data;
    html ='';
    html += `
    <input name="id_empresa" type="hidden" value="${empresaSeleccionada}" />
    <input name="tipo_dispositivo" type="hidden" value="Madurador" />
    <div class="row"><div class="col-md-3"></div>
    <div class="col-md-6">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Maduradores</span>
        </div>
        <select id="listaDispositivos" name="listaDispositivos" class="form-control" onchange="seleccionar_tipo(this.value)">
              <option value="0">Seleccione ...</option>     
       `;
       info.maduradorDisponible.forEach(permiso => {
        html += `
                <option value="${permiso.id}">${permiso.nombre_contenedor}</option>             
                `;
      });
    html += `
    </select></div></div><div class="col-md-3"></div></div>
    <div class="row"><div class="col-md-3"> </div> <div class="col-md-6">
    <button class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR </button>
    </div></div><div class="col-md-3"> </div> </div>  
    `;
    permisoDispositivo1.innerHTML = html;
  })
  .catch(function (error) {
    console.log(error);
  });    
  }
}

