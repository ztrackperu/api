
/*



const frm = document.querySelector('#frmLogin');
const email = document.querySelector('#usuario');
const password = document.querySelector('#password');

document.addEventListener('DOMContentLoaded', function(){
    frm.onsubmit = function(e){
        e.preventDefault();
        if (usuario.value == '' || password.value == '') {
            message('error', 'TODO LOS CAMPOS  SON REQUERIDOS');
        } else {
            axios.post(ruta + 'controllers/usuariosController.php?option=acceso', {
                usuario: usuario.value,
                password: password.value
                
              
              })
              .then(function (response) {
                const info = response.data;
                if (info.tipo == 'success') {
                    console.log("estamos dentro");
                    window.location = ruta + 'views/principal.php';
                }
                message(info.tipo, info.mensaje);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
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

*/

const frm = document.querySelector('#frmLogin');
const email = document.querySelector('#usuario');
const password = document.querySelector('#password');

document.addEventListener('DOMContentLoaded', function(){
    frm.onsubmit = function(e){
        e.preventDefault();
        if (usuario.value == '' || password.value == '') {
            message('error', 'TODO LOS CAMPOS  SON REQUERIDOS');
        } else {
            axios.post('../controllers/usuariosController.php?option=acceso', { 
                usuario: email.value,
                password: password.value 
            
              })
              .then(function (response) {
                const info = response.data;
                console.log(info);
                if (info.tipo == 'success') {
                    window.location = '/test4/';
                }
                message(info.tipo, info.mensaje);
              })
              .catch(function (error) {
                console.log(error);
              });

        }

    }
});
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