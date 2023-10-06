<?php
// Establece la conexión a la base de datos (asegúrate de configurar correctamente los valores de conexión)
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
// Obtén el ID del reactivo para el que deseas obtener las respuestas (puedes pasarlo como parámetro en la solicitud AJAX)
$idReactivo = $_POST['id_reactivoC'];

// Realiza la consulta en la tabla opciones_respuesta
$sql = "SELECT descripcion_opcion FROM opciones_respuesta WHERE id_reactivoC = $idReactivo";

$result = $con->query($sql);

if ($result->num_rows > 0) {
    $respuestas = array();

    // Recorre los resultados y agrega las respuestas al array
    while ($row = $result->fetch_assoc()) {
        $respuestas[] = $row['descripcion_opcion'];
    }

    // Devuelve las respuestas en formato JSON
    echo json_encode($respuestas);
} else {
    // No se encontraron respuestas para el reactivo
    echo json_encode(array());
}

// Cierra la conexión a la base de datos
$con->close();
?>
