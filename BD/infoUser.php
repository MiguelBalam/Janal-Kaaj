<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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

// $userId = $_GET['id'];

// // Consulta para obtener información del usuario
// $sql = "SELECT * FROM UsuariosEncuestador WHERE id_Autenticacion = '$userId'";
// $result = $con->query($sql);

// if ($result->num_rows == 1) {
//     $userInfo = $result->fetch_assoc();
//     echo json_encode($userInfo);
// } else {
//     echo json_encode(["error" => "Usuario no encontrado"]);
// }
// error_log(json_encode($userInfo));

$userId = $_GET['id'];

// Consulta para obtener información del usuario
$sql = "SELECT * FROM UsuariosEncuestador WHERE id_Autenticacion = '$userId'";
$result = $con->query($sql);

if ($result) { // Verifica si la consulta fue exitosa
    if ($result->num_rows == 1) {
        $userInfo = $result->fetch_assoc();
       
        echo json_encode($userInfo);
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }
} else {
    echo json_encode(["error" => "Error en la consulta: " . $con->error]);
}
header('Content-Type: application/json');

?>