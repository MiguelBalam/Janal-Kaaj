<?php
function conexion(){
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername= "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión
$conexion = new mysqli($servername, $username, $password, $dbname);
$acentos = $conexion->query("SET NAMES 'utf8'");
if($conexion->connect_error){
    die("Error en la conexión : ". $conexion->connect_errno.
                                    "-".$conexion->connect_error);
}
return $conexion;
}

?>

