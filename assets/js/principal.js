const listaReefer = document.querySelector('#frmListaReefer');

const reefer = document.querySelector('#frmDatosReefer');
const alias1 = document.querySelector('#frmAliasContenedor');
const aliasalias = document.querySelector('#aliasalias');

document.addEventListener('DOMContentLoaded', function () {
  alias1.onsubmit = function (e) {
    e.preventDefault();
    const frmData = new FormData(this);
      axios.post(ruta + 'controllers/principalController.php?option=saveAlias', frmData)
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

function verReefer() {
    axios.get(ruta + 'controllers/principalController.php?option=listarReefer')
      .then(function (response) {    
        const info = response.data;
        let html = '';
        //let html1 ='';
      

        info.listaReefer.forEach(permiso => {

          html += `
                <h6><a class="edit"  href="#" onclick="verEnTabla(${permiso.telemetria_id})">-> ${permiso.nombre_contenedor}</a> <a  class="edit"  href="#" onclick="aliasEmpresa(${permiso.telemetria_id})">( ${permiso.descripcion})</a></h6>
                          
                  `;
        });

       

        // aqui se agrega segun el nombre del frm
        listaReefer.innerHTML = html;
        //grafica.innerHTML = html1;
        //$('#modalUsuario-Empresa').modal('show');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function aliasEmpresa(id) {
    axios.get(ruta + 'controllers/principalController.php?option=verAlias&id=' + id)
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
        <h4>REEFER: </h4>
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
                <span class="input-group-text">   ALIAS  </span>
                </div>
            <input type="text" class="form-control" id="aliasalias" name="aliasalias" placeholder="${info.alias.descripcion}">
            </div>
           </div>
                 
                  
                  <div class="col-md-3">
                  </div>
                  </div>

                  <div class="row">
                  <div class="col-md-3">
                  </div> 
                  <div class="col-md-6">
                  
                  
                  <button align ="center" class="btn btn-outline-success btn-lg btn-block" type="submit">ASIGNAR ALIAS</button>
                  <P> </P>
                  </div>
            
                  </div>
                  <div class="col-md-3">
                  
                  </div>
                  </div>
  
                `;
             
        // aqui se agrega segun el nombre del frm
        alias1.innerHTML = html;
        $('#modalAlias-Contenedor').modal('show');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

function message(tipo, mensaje) {
    Snackbar.show({
        text: mensaje,
        pos: 'top-right',
        backgroundColor: tipo == 'success' ? '#079F00' : '#FF0303',
        actionText: 'Cerrar'
    });
}