const frm = document.querySelector('#frmTelemetria');
const permiso = document.querySelector('#frmPermiso1');
//Captura los datos del formulario
const numero_telefono = document.querySelector('#numero_telefono');
const imei = document.querySelector('#imei');
const id_telemetria = document.querySelector('#id_telemetria');
//captura los botones
const btn_nuevo = document.querySelector('#btn-nuevo');
const btn_save = document.querySelector('#btn-save');
//PARA CARGAR LOS DATOS EN LA TABLA COMO LISTA
document.addEventListener('DOMContentLoaded', function () {
  $('#table_telemetrias').DataTable({
    ajax: {
      url: ruta + 'controllers/telemetriasController.php?option=listar', 
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'numero_telefono' },
      { data: 'imei' },
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
    if (numero_telefono.value == '' || imei.value == '') {
      message('error', 'TODO LOS CAMPOS CON * SON REQUERIDOS')
    } else {
      const frmData = new FormData(frm);
      axios.post(ruta + 'controllers/telemetriasController.php?option=save', frmData)
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
    id_telemetria.value = '';
    btn_save.innerHTML = 'Guardar';
    //nombre.focus();
  }
})
// al hacer click en el boton D (delete ) para eliminar
function deleteTelemetria(id) {
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get(ruta + 'controllers/telemetriasController.php?option=delete&id=' + id)
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
function editTelemetria(id) {
  axios.get(ruta + 'controllers/telemetriasController.php?option=edit&id=' + id)
    .then(function (response) {
      const info = response.data;
      // se captura la informacion  NOMBRE VARIABLE = NOMBRE EN BASE DE DATOS
      numero_telefono.value =info.numero_telefono;
      imei.value = info.imei;
      id_telemetria.value = info.id;
      //Cambio descripcion de boton GUARDAR a Actualizar
      btn_save.innerHTML = 'Actualizar';
    })
    .catch(function (error) {
      console.log(error);
    });
}
