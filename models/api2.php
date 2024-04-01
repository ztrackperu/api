<?php
require_once 'config2.php';
require_once 'conexion2.php';
class ApiModel2{
    private $pdo, $con;
    public function __construct() {
        $this->con = new Conexion2();
        $this->pdo = $this->con->conectar2();
    }
    public function comandosPendientes($nombre_dispositivo){
        $consult = $this->pdo->prepare("SELECT * from comandos where nombre_dispositivo = ? and estado_comando = 1 ");
        $consult->execute([$nombre_dispositivo]);
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function contarComandos($nombre_dispositivo){
        $consult = $this->pdo->prepare("SELECT count(*)  FROM comandos WHERE nombre_dispositivo = ? AND estado_comando = 1");
        // SELECT count(*)  FROM comandos WHERE nombre_dispositivo ="ZGRU1090804" AND estado_comando = 1
        $consult->execute([$nombre_dispositivo]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }
    public function detalleComando($comando_id){
        $consult = $this->pdo->prepare("SELECT * FROM lista_comandos WHERE id = ? ");
        $consult->execute([$comando_id]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }
    public function tramaAnteriorM($telemetria_id)
    { 
        $consult = $this->pdo->prepare("SELECT * from registro_madurador where telemetria_id =? order by id desc limit 1");
        $consult->execute([$telemetria_id]);
        return $consult->fetch(PDO::FETCH_ASSOC);
    }
    public function actualizarComando($nombre_dispositivo){
        $ultima_fecha =date("Y-m-d H:i:s");  
        $consult = $this->pdo->prepare("UPDATE comandos SET estado_comando=0 ,  fecha_ejecucion=?   WHERE id=?");
        return $consult->execute([ $ultima_fecha ,$nombre_dispositivo]);
    }
    public function actualizarValorActual($nuevo_valor_actual,$nombre_dispositivo){
        //$ultima_fecha =date("Y-m-d H:i:s");  
        $consult = $this->pdo->prepare("UPDATE comandos  SET valor_actual=?   WHERE id=?");
        return $consult->execute([ $nuevo_valor_actual ,$nombre_dispositivo]);
    }

}