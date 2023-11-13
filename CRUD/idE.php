<?php
// Obtener el valor del parámetro "id" de la URL


// Conectar a la base de datos
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
ini_set('display_errors', 1);
error_reporting(E_ALL);
$id = $_GET['id'];
$sql_encuestas = "SELECT * FROM encuestas WHERE id_encuesta = $id";
$result_encuestas = $con->query($sql_encuestas);

// Consultar la tabla "encuestasVariables"
$sql_variables = "SELECT * FROM encuestasVariables WHERE id_encuesta = $id";
$result_variables = $con->query($sql_variables);

// Inicializar un arreglo para almacenar la respuesta
$response = array();

// Verificar a qué tabla pertenece el ID y agregarlo a la respuesta
if ($result_encuestas->num_rows > 0) {
    $response["tabla"] = "encuestas";
} elseif ($result_variables->num_rows > 0) {
    $response["tabla"] = "encuestasVariables";
} else {
    $response["tabla"] = "desconocida";
}

// Cerrar la conexión a la base de datos
$con->close();

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
