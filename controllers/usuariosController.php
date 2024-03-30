<?php
require_once 'models/usuarios.php';
$option = (empty($_GET['option'])) ? '' : $_GET['option'];
$usuarios = new UsuariosModel();
switch ($option) {
    case 'acceso':
        $accion = file_get_contents('php://input');
        $array = json_decode($accion, true);
        $usuario = $array['usuario']; 
        $password = $array['password'];
        $result = $usuarios->getLogin($usuario);
        if (empty($result)) {
            $res = array('tipo' => 'error', 'mensaje' => 'Usuario NO EXISTE');
        } else {
            if (password_verify($password, $result['password'])) {
                $_SESSION['nombres'] = $result['nombres'];
                $_SESSION['apellidos'] = $result['apellidos'];
                $_SESSION['usuario'] = $result['usuario'];
                $_SESSION['correo'] = $result['correo'];
                $_SESSION['permiso'] = $result['permiso'];
                $_SESSION['id'] = $result['id'];
                $res = array('tipo' => 'success', 'mensaje' => 'ACCESO AUTORIZADO');
            } else {
                $res = array('tipo' => 'error', 'mensaje' => 'CONTRASEÑA INCORRECTA');
            }
        }
        echo json_encode($res);
        break;
    case 'logout':
        session_destroy();
        header('Location: ../');
        break;
    case 'listar':
        $data = $usuarios->getUsers();
        for ($i = 0; $i < count($data); $i++) {
            $data[$i]['accion'] = '<div class="d-flex">
                <a class="btn btn-danger btn-sm" onclick="deleteUser(' . $data[$i]['id'] . ')"><i class="fas fa-eraser"></i>D</a>
                <a class="btn btn-primary btn-sm" onclick="editUser(' . $data[$i]['id'] . ')"><i class="fas fa-edit"></i>E</a>
                <a class="btn btn-info btn-sm" onclick="usuarioEmpresa(' . $data[$i]['id'] . ')"><i class="fas fa-lock"></i>A</a>
                </div>';
        }
        echo json_encode($data);
        break;
        
    case 'save':
        //datos deben ser igual al formulario
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $usuario_registrado = $_POST['usuario'];
        $correo = $_POST['correo'];
        $clave = $_POST['password'];
        $id = $_POST['id_user'];
        $fecha_actualizado =date("Y-m-d H:i:s");
        if ($id == '') {
            //comprueba si correo ya existe
            $consult = $usuarios->comprobarCorreo($correo);
            if (empty($consult)) {
                $hash = password_hash($clave, PASSWORD_DEFAULT);
                $result = $usuarios->saveUser($usuario_registrado, $nombres, $apellidos,$correo,$hash);
                if ($result) {
                    //$res = array('tipo' => 'success', 'mensaje' => 'USUARIO REGISTRADO');
                    //aqui solicitamos los datos del usuario que acabamos de guardar
                    
                    $u_result = $usuarios->getUsuario($usuario_registrado);
                    
                    $id_r = $u_result['id'];
                    $usuario_r = $u_result['usuario'];
                    $apellidos_r = $u_result['apellidos'];
                    $nombres_r = $u_result['nombres'];
                    $estado_r = $u_result['estado'];
                    $permiso_r = $u_result['permiso'];
                    $correo_r = $u_result['correo'];
                    $clave_r = $u_result['password'];
                    $ultimo_acceso_r = $u_result['ultimo_acceso'];
                    $fecha_cambio = date("Y-m-d H:i:s");
                    $usuario_cambio_id =$_SESSION['id'];
                    $accion = "REGISTRADO";
                    

                    $historal_usuario_grabar = $usuarios->savehistorialUser($id_r ,$usuario_r , $apellidos_r ,$nombres_r ,$estado_r , $permiso_r ,$correo_r ,$clave_r ,$ultimo_acceso_r ,$usuario_cambio_id ,$accion);
                    $res = array('tipo' => 'success', 'mensaje' => 'USUARIO REGISTRADO');

                } else {
                    $res = array('tipo' => 'error', 'mensaje' => 'ERROR AL AGREGAR');
                }
            } else {
                $res = array('tipo' => 'error', 'mensaje' => 'EL CORREO YA EXISTE');
            }
        } else {
            $result = $usuarios->updateUser($usuario_registrado, $nombres, $apellidos,$correo,$fecha_actualizado,$id);
            if ($result) {


                $u_result = $usuarios->getUsuario($usuario_registrado);
                    
                $id_r = $u_result['id'];
                $usuario_r = $u_result['usuario'];
                $apellidos_r = $u_result['apellidos'];
                $nombres_r = $u_result['nombres'];
                $estado_r = $u_result['estado'];
                $permiso_r = $u_result['permiso'];
                $correo_r = $u_result['correo'];
                $clave_r = $u_result['password'];
                $ultimo_acceso_r = $u_result['ultimo_acceso'];
                $fecha_cambio = date("Y-m-d H:i:s");
                $usuario_cambio_id =$_SESSION['id'];
                $accion = "EDITADO";
                

                $historal_usuario_grabar = $usuarios->savehistorialUser($id_r ,$usuario_r , $apellidos_r ,$nombres_r ,$estado_r , $permiso_r ,$correo_r ,$clave_r ,$ultimo_acceso_r ,$usuario_cambio_id ,$accion);

                

                $res = array('tipo' => 'success', 'mensaje' => 'USUARIO MODIFICADO');
            } else {
                $res = array('tipo' => 'error', 'mensaje' => 'ERROR AL MODIFICAR');
            }
        }
        echo json_encode($res);
        break;
    case 'delete':
        $id = $_GET['id'];
        $data = $usuarios->deleteUser($id);
        if ($data) {

            $u_result = $usuarios->getUsuario_id($id);
                    
            $id_r = $u_result['id'];
            $usuario_r = $u_result['usuario'];
            $apellidos_r = $u_result['apellidos'];
            $nombres_r = $u_result['nombres'];
            $estado_r = $u_result['estado'];
            $permiso_r = $u_result['permiso'];
            $correo_r = $u_result['correo'];
            $clave_r = $u_result['password'];
            $ultimo_acceso_r = $u_result['ultimo_acceso'];
            $fecha_cambio = date("Y-m-d H:i:s");
            $usuario_cambio_id =$_SESSION['id'];

            $accion = "ELIMINADO";
            

            $historal_usuario_grabar = $usuarios->savehistorialUser($id_r ,$usuario_r , $apellidos_r ,$nombres_r ,$estado_r , $permiso_r ,$correo_r ,$clave_r ,$ultimo_acceso_r ,$usuario_cambio_id ,$accion);



            $res = array('tipo' => 'success', 'mensaje' => 'USUARIO ELIMINADO');
        } else {
            $res = array('tipo' => 'error', 'mensaje' => 'ERROR AL ELIMINAR');
        }
        echo json_encode($res);
        break;

    case 'deleteA':
            $id = $_GET['id'];
            $data = $usuarios->buscarAsignarId($id);
            $usuario_id = $data['usuario_id'];
            $empresa_id = $data['empresa_id'];
            $fecha_cambio = date("Y-m-d H:i:s");
            $usuario_cambio_id =$_SESSION['id'];
            $accion = "ELIMINADO";
            $usuarios->eliminarAsignacion($id);
            $res2 = $usuarios->saveHistorialAsignacion($id, $usuario_id, $empresa_id , $fecha_cambio, $usuario_cambio_id , $accion);
    
           
            if ($res2) {
                $usuarios->eliminarAsignacion($id);
                $res = array('tipo' => 'success', 'mensaje' => 'ASIGNACION ELIMINADA');
            } else {
                $res = array('tipo' => 'error', 'mensaje' => 'ERROR AL ELIMINAR');
            }
            echo json_encode($res);
        break;

    case 'edit':
        $id = $_GET['id'];
        $data = $usuarios->getUser($id);
        echo json_encode($data);
        break;
    case 'userEmpresa':
        $id = $_GET['id'];
        $data['empresasAsignadas'] = $usuarios->listaEmpresa($id);
        //$consulta = $usuarios->getDetalle($id);
        $data['empresasLista'] = $usuarios->selectEmpresa($id);
        $data['usuario'] = $usuarios->datosUsuario($id);
        echo json_encode($data);
        break;

    case 'savePermiso':
        $id_user = $_POST['id_usuario'];
        $id_empresa =$_POST['empresaAsignada'];
        $res = $usuarios->asignarEmpresa($id_empresa, $id_user);
        if ($res) {
            $fecha_cambio = date("Y-m-d H:i:s");
            $usuario_cambio_id =$_SESSION['id'];
            $accion = "ASIGNADO";
            $res1 = $usuarios->buscarAsignarEmpresa($id_empresa, $id_user);
            $id_asignacion =$res1['id'];
            $res2 = $usuarios->saveHistorialAsignacion($id_asignacion , $id_empresa, $id_user , $fecha_cambio, $usuario_cambio_id , $accion);

            $res = array('tipo' => 'success', 'mensaje' => 'EMPRESA ASIGNADA');
        } else {
            $res = array('tipo' => 'error', 'mensaje' => 'ERROR AL ASIGNAR EMPRESA');
        }                  
        echo json_encode($res);
        break;

    case 'logout':
        session_destroy();
        $res = array('tipo' => 'success', 'mensaje' => 'SESSION TERMINADA');
       
        echo json_encode($res);
        header('Location: ../');
        break;

    default:
        # code...
        break;
}
