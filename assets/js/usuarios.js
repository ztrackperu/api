const frm = document.querySelector('#frmUser');
const permiso = document.querySelector('#frmAsignarEmpresa');

const usuario = document.querySelector('#usuario');
const nombres = document.querySelector('#nombres');
const apellidos = document.querySelector('#apellidos');
const correo = document.querySelector('#correo');
const clave = document.querySelector('#password');

const id_user = document.querySelector('#id_user');
const btn_nuevo = document.querySelector('#btn-nuevo');
const btn_save = document.querySelector('#btn-save');
document.addEventListener('DOMContentLoaded', function () {
  $('#table_users').DataTable({
    ajax: {
      url: ruta + 'controllers/usuariosController.php?option=listar',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'usuario' },
      { data: 'apellidos' },
      { data: 'nombres' },
      { data: 'correo' },
      { data: 'ultimo_acceso' },
      { data: 'accion' }
    ],
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
    },
    "order": [[0, 'desc']]



  });
  frm.onsubmit = function (e) {
    e.preventDefault();
    if (usuario.value == '' || nombres.value == ''
      || clave.value == ''|| apellidos.value == '') {
      message('error', 'TODO LOS CAMPOS CON * SON REQUERIDOS')
    } else {
      const frmData = new FormData(frm);
      axios.post(ruta + 'controllers/usuariosController.php?option=save', frmData)
        .then(function (response) {
          const info = response.data;
          message(info.tipo, info.mensaje);
          if (info.tipo == 'success') {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  btn_nuevo.onclick = function () {
    frm.reset();
    id_user.value = '';
    btn_save.innerHTML = 'Guardar';
    clave.removeAttribute('readonly');
    //nombre.focus();
  }

  permiso.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post(ruta + 'controllers/usuariosController.php?option=savePermiso', frmData)
        .then(function (response) {
          const info = response.data;
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

function deleteUser(id) {
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      axios.get(ruta + 'controllers/usuariosController.php?option=delete&id=' + id)
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


function deleteAsignacion(id) {
  Snackbar.show({
    text: 'Esta seguro de eliminar',
    width: '475px',
    actionText: 'Si eliminar',
    backgroundColor: '#FF0303',
    onActionClick: function (element) {
      console.log(id);
      axios.get(ruta + 'controllers/usuariosController.php?option=deleteA&id=' + id)
        .then(function (response) {
          const info = response.data;
          console.log(info);
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

function editUser(id) {
  axios.get(ruta + 'controllers/usuariosController.php?option=edit&id=' + id)
    .then(function (response) {
      const info = response.data;
      
      usuario.value =info.usuario;
      nombres.value = info.nombres;
      apellidos.value = info.apellidos;
      correo.value = info.correo;
      clave.value = '*********************';

      clave.setAttribute('readonly', 'readonly');
      id_user.value = info.id;
      btn_save.innerHTML = 'Actualizar';
    })
    .catch(function (error) {
      console.log(error);
    });
}

function usuarioEmpresa(id) {
  axios.get(ruta + 'controllers/usuariosController.php?option=userEmpresa&id=' + id)
    .then(function (response) {    
      const info = response.data;
      let html = '';
      console.log(info);
      html += `
      <div class="row">
      <div class="col-md-3">
      </div> 
      <div class="col-md-3">
      <h4>USUARIO: </h4>
      <p></p>
      </div>
      <div class="col-md-3">
      <h4>${info.usuario.nombres} ${info.usuario.apellidos}</h4>
      <p></p>
      </div>
      <div class="col-md-3">
      
      </div>
      </div>

      
      `;


      html += `
      <div class="row">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
      <div class="input-group mb-3">
          <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-credit-card mr-1"></i> Empresas</span>
          </div>
          <select id="empresaAsignada" name="empresaAsignada" class="form-control" ">
               `;
      info.empresasLista.forEach(permiso => {
        html += `
                <option value="${permiso.id}">${permiso.nombre_empresa}</option>             
                `;
      });
      html += `          </select>
                </div>
                </div>
                <div class="col-md-3">
                </div>
                </div>

              `;

      html += `<input name="id_usuario" type="hidden" value="${id}" />
      <div class="row">
      <div class="col-md-3">
      </div> 
      <div class="col-md-6">
      
      
      <button class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR</button>
      </div>

      </div>
      <div class="col-md-3">
      
      </div>
      </div>
      

      <div class="row">
      <div class="col-md-6">
      <p></p>
      <h4>Empresas asignadas a  ${info.usuario.usuario} : </h4>
      </div> 
      <div class="col-md-6">      
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

  info.empresasAsignadas.forEach(permiso1 => {
    html += `
    <tr>
      <th scope="row">1</th>
      <td>${permiso1.nombre_empresa}</td>
      <td>${permiso1.descripcion}</td>
      <td><a class="btn btn-danger btn-sm" onclick="deleteAsignacion(' ${permiso1.id} ')"><i class="fas fa-eraser"></i>D</a>
      </td>
    </tr>
    `;
  }
  );

  html += `

  </tbody>
</table>

      </div>
      </div>

      `;
      // aqui se agrega segun el nombre del frm
      permiso.innerHTML = html;
      $('#modalUsuario-Empresa').modal('show');
    })
    .catch(function (error) {
      console.log(error);
    });
}