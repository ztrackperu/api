const frm = document.querySelector('#frmLogin');
const email = document.querySelector('#usuario');
const password = document.querySelector('#password');

document.addEventListener('DOMContentLoaded', function(){
    frm.onsubmit = function(e){
        e.preventDefault();
        if (usuario.value == '' || password.value == '') {
            message('error', 'TODO LOS CAMPOS  SON REQUERIDOS');
        } else {
            if(usuario.value == 'BROKMAR' && password.value == '@brokmar'){
                console.log("estamos dentro");
                window.location = '../../ztrack/brokmar/brokmar.php';
                message('success', 'AUTORIZADO');

            }else{
                message('success1', ' INCORRECTO / VERIFICA LOS DATOS ');
            }

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