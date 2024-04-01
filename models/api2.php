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

}