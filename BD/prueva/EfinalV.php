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
    $id_encuesta = $_POST["id_encuesta"];
    $id_variable = $_POST["id_variable"];
    $id_usuario = $_POST["id_usuario"];

    // Insertar la asociación en la tabla 'encuesta_FinalReactivos'
    $sql = "INSERT INTO encuesta_FinalVariables (id_encuesta, id_variable, id_usuario) VALUES (?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("iii", $id_encuesta, $id_variable, $id_usuario);

    if ($stmt->execute()) {
        echo "Asociación guardada con éxito.";
    } else {
        echo "Error al guardar la asociación: " . $stmt->error;
    }

    $stmt->close();
    $con->close();
}
?>