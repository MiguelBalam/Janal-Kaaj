<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start(); // Archivo de configuración con datos de conexión a la base de datos

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["Usuario"];
    $contraseniaL = $_POST["contraseniaL"];

    $username  = "janalkaa_admin";
    $password = "janalkaaj2023";
    $servername= "162.241.60.169";
    $dbname = "janalkaa_kaaj";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    // Consulta para verificar el inicio de sesión
    $sql = "SELECT * FROM Autenticacion WHERE correo = '$correo' AND contraseña = '$contraseniaL'";
    $result = $conn->query($sql);
    if ($result->num_rows == 1) {
        // Iniciar sesión
        $_SESSION['correo'] = $correo;
        // Establecer la clave 'success' en true y enviar la respuesta JSON
        $response["success"]=true;
    } else {
        $response["success"] = false;
        $response["error"] = "Usuario o contraseña incorrectos";
    }

    // Cerrar la conexión
    $conn->close();

    // Enviar la respuesta en formato JSON
    echo json_encode($response);
}
?>

