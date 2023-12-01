<?php
function conexion2(){ 
    
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername= "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión
$conexion = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conexion,"utf8");

// Verificamos la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_errno."_".$conexion->connect_error);
} return $conexion;
	// echo "Conexión exitosa";
}
