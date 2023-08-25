<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $contraseniaL = $_POST["contraseniaL"];

    // Conexión a la base de datos
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
    $sql = "SELECT * FROM Autenticacion WHERE correo = '$correo'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $storedContrasenia = $row["contraseña"];

        // Verificar la contraseña usando password_verify()
        if (password_verify($contraseniaL, $storedContrasenia)) {
            $_SESSION['correo'] = $correo;
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
    }

    // Cerrar la conexión
    $conn->close();
}
?>



