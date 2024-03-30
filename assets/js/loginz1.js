const frm = document.querySelector('#frmLogin');
const email = document.querySelector('#usuario');
const password = document.querySelector('#password');

document.addEventListener('DOMContentLoaded', function(){
    frm.onsubmit = function(e){
        e.preventDefault();
        if (usuario.value == '' || password.value == '') {
            message('error', 'TODO LOS CAMPOS  SON REQUERIDOS');
        } else {
            axios.post('../../ztrack1/controllers/usuariosController.php?option=acceso', { 
                usuario: email.value,
                password: password.value 
            
              })
              .then(function (response) {
                const info = response.data;
                console.log(info);
                if (info.tipo == 'success') {
                    window.location = '../../ztrack1/test4/';
                }
                message('success', 'AUTORIZADO');
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