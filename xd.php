<?php
/*
 * Mostrar una imagen desde blob mysql usando PHP
 * Autor: Braulio Andrés Soncco Pimentel <braulio@buayacorp.com>
 * http://www.buayacorp.com/
 * 
 * Este script está bajo licencia de Creative Commons 
 * http://creativecommons.org/licenses/by/2.0/
 */

	// Nivel de errores
	error_reporting(E_ALL);

	// Constantes
	# Servidor de base de datos
	define("DBHOST", "localhost");
	# nombre de la base de datos
	define("DBNAME", "test");
	# Usuario de base de datos
	define("DBUSER", "root");
	# Password de base de datos
	define("DBPASSWORD", "");
	
	// Parámetros para recuperar la imagen
	# Recuperamos el parámetro GET con el id único de la foto que queremos mostrar
	$idfoto = (isset($_GET["idfoto"])) ? $_GET["idfoto"] : exit();
	# Recuperamos el parámetro GET para elegir entre la miniatura o la foto real
	$tam = (isset($_GET["tam"])) ? $_GET["tam"] : 1;
	
	// Escojemos la foto real o la miniatura según la variable $tam
	switch($tam) {
		case "1":
			$campo = "foto";break;;
		case "2":
			$campo = "thumb";break;;
		default:
			$campo = "foto";break;;
	}
	
	// Recuperamos la foto de la tabla
	$sql = "SELECT $campo, mime
			FROM tabla 
			WHERE idfoto = $idfoto";
			
	# Conexión a la base de datos
	$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
  die("Conexión fallida: " . $con->connect_error);
}
	
	// La imagen
	$imagen = $datos[0];
	// El mime type de la imagen
	$mime = $datos[1];
	
	// Gracias a esta cabecera, podemos ver la imagen 
	// que acabamos de recuperar del campo blob
	header("Content-Type: $mime");
	// Muestra la imagen
	echo $imagen;	
?>