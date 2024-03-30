<?php
require_once 'cone.php';
class ReeferModel{
    private $pdo, $con;
    public function __construct() {
        $this->con = new Conexion();
        $this->pdo = $this->con->conectar();
    }
    public function tramaR($nombre , $tipo ,$descripcion ,$set_point, $temp_supply,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$ultima_fecha)
    {
        $consult = $this->pdo->prepare("INSERT INTO registro_reefers ( nombre , tipo ,descripcion , set_point, temp_supply,return_air,evaporation_coil,ambient_air,cargo_1_temp,cargo_2_temp,cargo_3_temp,cargo_4_temp,relative_humidity , alarm_present,alarm_number,controlling_mode,power_state,defrost_term_temp , defrost_interval ,latitud,longitud,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        return $consult->execute([$nombre , $tipo ,$descripcion ,$set_point, $temp_supply,$return_air,$evaporation_coil,$ambient_air,$cargo_1_temp,$cargo_2_temp,$cargo_3_temp,$cargo_4_temp,$relative_humidity , $alarm_present,$alarm_number,$controlling_mode,$power_state,$defrost_term_temp , $defrost_interval ,$latitud,$longitud,$ultima_fecha]);
    }
    public function listaReefers()
    {
        $consult = $this->pdo->prepare("SELECT * FROM contenedores");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function TablaReefer()
    {
        $consult = $this->pdo->prepare("SELECT * FROM contenedores AS c INNER JOIN empresas e ON c.empresa_id =e.id WHERE c.tipo ='Reefer'");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function TablaMadurador()
    {
        $consult = $this->pdo->prepare("SELECT * FROM contenedores AS c INNER JOIN empresas e ON c.empresa_id =e.id WHERE c.tipo ='Madurador'");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function TablaGenset()
    {
        $consult = $this->pdo->prepare("SELECT * from registro_generador as r inner join generadores g on g.telemetria_id=r.telemetria_id order by r.id DESC");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
    public function TablaComando()
    {
        $consult = $this->pdo->prepare("SELECT * from comando ");
        $consult->execute();
        return $consult->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
