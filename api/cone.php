<?php

class Conexion{
    public function conectar()
    {
       
        $servidor = "localhost:3306'";
        $password = "lpmp2018";
        $usuario ="ztrack2023";
       
        try {
               $pdo  = new PDO("mysql:host=$servidor;dbname=zgroupztrack", $usuario, $password);      
              
              //echo "Conexión realizada Satisfactoriamente";
              return $pdo;
            }
       
        catch(PDOException $e)
            {
            echo "La conexión ha fallado: " . $e->getMessage();
            }
       
        $conexion = null;
    }
}



?>
