const frm = document.querySelector('#frmTramaReffer');
const permiso = document.querySelector('#frmTramaReefer2');
const cabeza = document.querySelector('#frmTramaReefer3');

//PARA CARGAR LOS DATOS EN LA TABLA COMO LISTA
document.addEventListener('DOMContentLoaded', function () {
  $('#table_reffer').DataTable({

    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
    },
    "order": [[0, 'desc']]
  });
  $('#table_reffer1').DataTable({
    

    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
    },
    "order": [[0, 'desc']]
  });
 
})

document.addEventListener('DOMContentLoaded', function () {


  
})

function listaTramaR(id) {
  axios.get(ruta + 'controllers/reeferController.php?option=reefer&id=' + id)
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
      cabeza.innerHTML = html1;
      



  info.tramaReefer.forEach(permiso1 => {
    html += `
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
      </td>
    </tr>
    `;
  });

      // aqui se agrega segun el nombre del frm
      permiso.innerHTML = html;
      $('#modalTramaReffer').modal('show');
    })
    .catch(function (error) {
      console.log(error);
    });
}

