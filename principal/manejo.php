<?php 
	$ruta_archivo = 'prueba.txt';
	$archivo = fopen($ruta_archivo, 'r');


			$base64 =  fread($archivo, filesize($ruta_archivo));
            echo $base64;
            $nombreImagen ="ZGRU110.png";
            $data = base64_decode($base64);
            file_put_contents($nombreImagen, base64_decode($base64));
	
            echo '<img src="data:image/jpg;base64, '.$base64.'" >';
	fclose($archivo);




?>