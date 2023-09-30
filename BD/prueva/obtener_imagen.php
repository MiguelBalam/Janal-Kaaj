<?php


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

// Verificar si el ID de autenticación está presente en la URL




$idAutenticacion = $_GET['id_usuario'];

// Realizar una consulta para obtener los datos del usuario
$query = "SELECT logo FROM UsuariosEncuestador WHERE id_Autenticacion = $idAutenticacion";
$stmt = $con->prepare($query);
$stmt->execute();
$stmt->bind_result($imagen);

if ($stmt->fetch()) {
    // Obtener el tipo MIME de la imagen (suponiendo que esté en formato PNG)
    $imageType = 'image/png';
    
    // Establecer el tipo de contenido
    header("Content-Type: $imageType");
    
    // Mostrar la imagen
    echo($imagen);
    exit;
} else {
    echo "La imagen no se encontró.";
}

$stmt->close();
?>




