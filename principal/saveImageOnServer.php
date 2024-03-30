
<?php
$data = $_POST['imageData'];
//$nombre_dispositivo =$_POST['nombre_dispositivo'];
//$semana =$_POST['semana'];
//$nombreImagen = '/misgraficas/'.$nombre_dispositivo.$semana.'png';
$nombreImagen ="ok.txt";
file_put_contents($nombreImagen, base64_decode($data));

?>