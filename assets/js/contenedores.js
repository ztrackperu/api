const frm = document.querySelector('#frmContenedor');
const permiso = document.querySelector('#frmPermiso1');
//Captura los datos del formulario
const nombre_contenedor = document.querySelector('#nombre_contenedor');
const descripcion = document.querySelector('#descripcion');
const tipo = document.querySelector('#tipo');
const id_contenedor = document.querySelector('#id_contenedor');
//captura los botones
const btn_nuevo = document.querySelector('#btn-nuevo');
const btn_save = document.querySelector('#btn-save');
//PARA CARGAR LOS DATOS EN LA TABLA COMO LISTA
document.addEventListener('DOMContentLoaded', function () {
  $('#table_contenedores').DataTable({
    ajax: {
      url: ruta + 'controllers/contenedoresController.php?option=listar',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'nombre_contenedor' },
      { data: 'descripcionC' },
      { data: 'tipo' },
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
    if (nombre_contenedor.value == '' || descripcion.value == '' || tipo.value == '') {
      message('error', 'TODO LOS CAMPOS CON * SON REQUERIDOS')
    } else {
      const frmData = new FormData(frm);
      axios.post(ruta + 'controllers/contenedoresController.php?option=save', frmData)
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
    id_contenedor.value = '';
    btn_save1.innerHTML = 'Guardar';
    //nombre.focus();
  }
})
// al hacer click en el boton D (delete ) para eliminar
function deleteContenedor(id) {
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get(ruta + 'controllers/contenedoresController.php?option=delete&id=' + id) 
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
function editContenedor(id) {
  axios.get(ruta + 'controllers/contenedoresController.php?option=edit&id=' + id)
    .then(function (response) {
      const info = response.data;
      // se captura la informacion  NOMBRE VARIABLE = NOMBRE EN BASE DE DATOS
      nombre_contenedor.value =info.nombre_contenedor;
      descripcion.value = info.descripcionC;
      tipo.value = info.tipo;
      id_contenedor.value = info.id;
      //Cambio descripcion de boton GUARDAR a Actualizar
      btn_save.innerHTML = 'Actualizar';
    })
    .catch(function (error) {
      console.log(error);
    });
}
