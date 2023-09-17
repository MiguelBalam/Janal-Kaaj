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
    $tipoUsuario = $_POST["tipo_usuario"];
    
    $sql = "SELECT * FROM ";
    
    if ($tipoUsuario === "aplicador") {
        $sql .= "AutenticacionApli";
    } elseif ($tipoUsuario === "encuestador") {
        $sql .= "Autenticacion";
    } else {
        echo json_encode(["success" => false, "error" => "Tipo de usuario no válido"]);
        exit;
    }

    $sql .= " WHERE correo = '$correo'";

    $result = $con->query($sql);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $storedContrasenia = $row["contraseña"];
      
        // Verificar la contraseña usando password_verify()
        if (password_verify($contraseniaL, $storedContrasenia)) {
            $_SESSION['id'] = $row['id']; 
            $_SESSION['correo'] = $correo;
      
            $payload = array(
                "id" => $row['id'],   
            );

            $clave_secreta = "jk"; 

            // Generar el token JWT
            $token = JWT::encode($payload, $clave_secreta, 'HS256');

            // Devolver el token al cliente
            echo json_encode(["success" => true, "id" => $row['id'], "token" => $token, "tipoUsuario" => $tipoUsuario]);
           // echo json_encode(["success" => true, "id" => $row['id'], "token" => $token]);
        } else {
            echo json_encode(["success" => false, "error" => "Contraseña incorrecta" . $storedContrasenia]);
        }
       
    } else {
        echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
    } 
}
// Cerrar la conexión
$con->close();

?>




