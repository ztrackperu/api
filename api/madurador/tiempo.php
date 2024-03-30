
<?php

$created_at= date("Y-m-d H:i:s");   
echo $created_at;
$pre = $created_at;

$puntoA = strtotime($pre);
$puntoA1 = strtotime("-5 hours",$puntoA)+41;
echo $puntoA1;
echo " otra cosa  : ";
echo date('Y-m-d H:i:s', $puntoA1);
?>