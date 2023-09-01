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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Conexión a la base de datos
  

    // Obtener los datos de la solicitud POST
    $id_usuario = $_POST["id_usuario"];
    $titulo = $_POST["titulo"];
    $objetivo = $_POST["objetivo"];
    $instrucciones = $_POST["instrucciones"];

    // Insertar la encuesta en la tabla 'encuestas'
    $sql = "INSERT INTO encuestas (id_usuario, titulo, objetivo, instrucciones) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("isss", $id_usuario, $titulo, $objetivo, $instrucciones);

    if ($stmt->execute()) {
        $id_encuesta = $stmt->insert_id;
        echo $id_encuesta;
    } else {
        echo "Error al insertar la encuesta: " . $stmt->error;
    }

    $stmt->close();
    $con->close();
}
?>
