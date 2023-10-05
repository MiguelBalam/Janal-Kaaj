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

// Obtener la categoría seleccionada desde la solicitud GET
$categoriaSeleccionada = isset($_GET['categoria']) ? $_GET['categoria'] : '';

// Realizar una consulta SQL para obtener las preguntas por categoría
if ($categoriaSeleccionada === 'todo') {
    // Consulta para obtener todas las preguntas
    $query = "SELECT id_reactivoC, descripcion FROM reactivosCreados";
} else {
    // Consulta para obtener preguntas por la categoría seleccionada
    $query = "SELECT id_reactivoC, descripcion FROM reactivosCreados WHERE id_categoria IN ($categoriaSeleccionada)";
}

// Ejecutar la consulta y obtener los resultados
$result = mysqli_query($con, $query);

$preguntas = array();
while ($row = mysqli_fetch_assoc($result)) {
    $pregunta = array(
        'id_reactivoC' => $row['id_reactivoC'],
        'descripcion' => $row['descripcion']
    );
    $preguntas[] = $pregunta;
}
// Devolver las preguntas como JSON
echo json_encode($preguntas);



// $query = "SELECT id_reactivoC, descripcion FROM reactivosCreados";
// $result = mysqli_query($con, $query);

// $reactivos = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $reactivos[] = $row;
// }
// header('Content-Type: application/json');
// // Devolver los reactivos en formato JSON
// echo json_encode($reactivos);
?>
