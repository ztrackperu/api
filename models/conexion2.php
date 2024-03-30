<?php
class Conexion{
    public function conectar()
    {
        $pdo = null;
        try {
            $pdo = new PDO('mysql:host='.DB_HOST2.';dbname='.DB_NAME2.'', DB_USER2, DB_PASS2);
            return $pdo;
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}