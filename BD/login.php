<?php
session_start();


require '/xampp/htdocs/Janal-Kaaj/vendor/autoload.php'; // Asegúrate de que la ruta sea correcta según tu proyecto


use Firebase\JWT\JWT;

$username = "janalkaa_admin";
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $contraseniaL = $_POST["contraseniaL"];

    // Conexión a la base de datos

    // Consulta para verificar el inicio de sesión
    $sql = "SELECT * FROM Autenticacion WHERE correo = '$correo'";

    $result = $con->query($sql);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $storedContrasenia = $row["contraseña"];

        // Verificar la contraseña usando password_verify()
        if (password_verify($contraseniaL, $storedContrasenia)) {
            // Después de verificar la contraseña exitosamente
            $_SESSION['id'] = $row['id']; // Donde $row['id_Autenticacion'] es el ID de usuario
            $_SESSION['correo'] = $correo;
            // Crear un token JWT con los datos del usuario
            $payload = array(
                "id" => $row['id'], // Donde $row['id_Autenticacion'] es el ID de usuario
                
            );

            $clave_secreta = "jk"; // Debes tener una clave secreta segura

            // Generar el token JWT
            $token = JWT::encode($payload, $clave_secreta, 'HS256');

            // Devolver el token al cliente
            echo json_encode(["success" => true, "id" => $row['id'], "token" => $token]);
        } else {
            echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
    }
}
// Cerrar la conexión
$con->close();
?>




