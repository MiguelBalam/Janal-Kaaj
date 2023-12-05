<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// ob_start();

$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Crear la conexión
$con = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Verificar si se está haciendo una petición POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST['titulo'];
    $cuerpo = $_POST['noticia'];
    $imagen = $_FILES['imagen'];

    // Verificar si la imagen se cargó correctamente
    if ($imagen['error'] !== UPLOAD_ERR_OK) {
        echo "Error al cargar la imagen: " . $imagen['error'];
        exit;
    }

    // Obtener el contenido binario de la imagen
    $imagenBinaria = file_get_contents($imagen["tmp_name"]);

    // Preparar la consulta para insertar en la tabla Noticias
    $stmt = $con->prepare("INSERT INTO `Noticias` (`cuerpo`, `titulo`, `imagen`) VALUES (?, ?, ?)");

    // Vincular los parámetros
    $stmt->bind_param('sss', $cuerpo, $titulo, $imagenBinaria);

    // Ejecutar la consulta
    if($stmt->execute()) {
        echo "Noticia subida correctamente";
    } else {
        echo "Error al subir la noticia: " . $stmt->error;
    }

    // Cerrar la sentencia y la conexión
    $stmt->close();
} else {
    echo "No se recibió una petición POST.";
}

$con->close();
// ob_end_flush();
?>
