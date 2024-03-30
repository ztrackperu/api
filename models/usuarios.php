<?php
require_once '../config.php';
require_once 'conexion.php';
class UsuariosModel{
    private $pdo, $con;
    public function __construct() {
        $this->con = new Conexion();
        $this->pdo = $this->con->conectar();
    }

    public function getLogin($usuario)
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE usuario = ?");
        $consult->execute([$usuario]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }

    public function getUsuario($usuario)
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE usuario = ?");
        $consult->execute([$usuario]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }
    public function getUsuario_id($id)
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
        $consult->execute([$id]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }

    public function getUsers()
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE estado =1 ");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUser($id)
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
        $consult->execute([$id]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }

    public function comprobarCorreo($correo)
    {
        $consult = $this->pdo->prepare("SELECT * FROM usuarios WHERE correo = ?");
        $consult->execute([$correo]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }

    public function saveUser($usuario, $nombres, $apellidos,$correo,$clave)
    {
        $consult = $this->pdo->prepare("INSERT INTO usuarios (usuario, nombres, apellidos, correo,password) VALUES (?,?,?,?,?)");
        return $consult->execute([$usuario, $nombres, $apellidos,$correo,$clave]);
    }
    public function savehistorialUser($id_r ,$usuario_r , $apellidos_r ,$nombres_r ,$estado_r , $permiso_r ,$correo_r ,$clave_r ,$ultimo_acceso_r ,$usuario_cambio_id ,$accion)
    {
        $consult = $this->pdo->prepare("INSERT INTO historial_usuarios ( id_usuario ,usuario, apellidos, nombres,estado , permiso , correo,password , ultimo_acceso,usuario_modifico_id ,evento) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        return $consult->execute([$id_r ,$usuario_r , $apellidos_r ,$nombres_r ,$estado_r , $permiso_r ,$correo_r ,$clave_r ,$ultimo_acceso_r ,$usuario_cambio_id ,$accion]);
    }

    public function deleteUser($id)
    {
        $consult = $this->pdo->prepare("UPDATE usuarios SET estado = ? WHERE id = ?");
        return $consult->execute([0, $id]);
    }

    public function updateUser($usuario_registrado, $nombres, $apellidos,$correo,$fecha_cambio,$id)
    {
        
        $consult = $this->pdo->prepare("UPDATE usuarios SET usuario=? ,  nombres=? ,apellidos=? , correo=? ,updated_at=? WHERE id=?");
        return $consult->execute([$usuario_registrado, $nombres, $apellidos,$correo,$fecha_cambio,$id]);
    }
    public function listaEmpresa($id)
    {
        $consult = $this->pdo->prepare("SELECT A.nombre_empresa ,A.descripcion ,B.id FROM empresas AS A JOIN usuario_empresa AS B ON A.id = B.empresa_id WHERE B.usuario_id = ?");
        $consult->execute([$id]);
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function selectEmpresa($id)
    {
        $consult = $this->pdo->prepare("SELECT B.id , B.nombre_empresa FROM usuario_empresa AS A RIGHT JOIN empresas AS B ON( A.empresa_id =B.id  AND A.usuario_id= ? ) WHERE A.empresa_id is null and B.estado =1 ");
        $consult->execute([$id]);
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }

    public function datosUsuario($id)
    {
        $consult = $this->pdo->prepare("SELECT usuario,apellidos,nombres FROM usuarios WHERE id = ?");
        $consult->execute([$id]);
        return $consult->fetch(PDO::FETCH_ASSOC);

    }

    public function asignarEmpresa($id_empresa, $id_user)
    {
        $consult = $this->pdo->prepare("INSERT INTO usuario_empresa (empresa_id, usuario_id) VALUES (?,?)");
        return $consult->execute([$id_empresa, $id_user]);
    }
    public function buscarAsignarEmpresa($id_empresa, $id_user){
        $consult = $this->pdo->prepare("SELECT id FROM usuario_empresa WHERE empresa_id = ? and usuario_id = ? ");
        $consult->execute([$id_empresa, $id_user]);
        return $consult->fetch(PDO::FETCH_ASSOC);

    }
    public function buscarAsignarId($id){
        $consult = $this->pdo->prepare("SELECT * FROM usuario_empresa WHERE id = ?");
        $consult->execute([$id]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }
    public function saveHistorialAsignacion($id_asignacion , $id_empresa, $id_user , $fecha_cambio, $usuario_cambio_id , $accion)
    {
        $consult = $this->pdo->prepare("INSERT INTO historial_usuario_empresa ( id_usuario_empresa ,usuario_id, empresa_id, fecha_cambio,usuario_cambio_id ,evento) VALUES (?,?,?,?,?,?)");
        return $consult->execute([$id_asignacion , $id_empresa, $id_user , $fecha_cambio, $usuario_cambio_id , $accion]);

    }
    
    public function eliminarAsignacion($id)
    {
        $id_1 = intval($id);
        $consult =  $this->pdo->prepare("DELETE FROM usuario_empresa WHERE id = ?");
        //echo $consult; 
        return $consult->execute([$id_1]);
       

    }


}

?>