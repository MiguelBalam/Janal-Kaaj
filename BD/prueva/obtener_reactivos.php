<?php
// Realizar la conexión a la base de datos
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión
$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

// Verificamos la conexión
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Consulta SQL para obtener los reactivos
$query = "SELECT id_reactivoC, descripcion FROM reactivosCreados";
$result = mysqli_query($con, $query);

$reactivos = array();
while ($row = mysqli_fetch_assoc($result)) {
    $reactivos[] = $row;
}
header('Content-Type: application/json');
// Devolver los reactivos en formato JSON
echo json_encode($reactivos);
?>
