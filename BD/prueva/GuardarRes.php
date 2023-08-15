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

$responses = $_POST['respuesta'];
$codigo = $_POST['codigo'];
$observacion = $_POST['observacion'];

foreach ($responses as $idPreg => $respPreg) {
    if (is_array($respPreg)) {
        // Si la respuesta es un array, se trata de un input de tipo texto
        $respuestaInput = mysqli_real_escape_string($con, $respPreg['input']);
        $respuestaAbierta = 1; // Respuesta abierta
        $InsertEncuesta = "INSERT INTO respuestas_encuesta (
            id_pregunta,
            respuesta,
            respuesta_abierta,
            codigo,
            observacion,
            created
        ) VALUES (
            '$idPreg',
            '$respuestaInput',
            '$respuestaAbierta',
            '$codigo',
            '$observacion',
            NOW()
        )";
    } else {
        // Si la respuesta no es un array, se trata de una opción de respuesta
        $respuesta = mysqli_real_escape_string($con, $respPreg);
        $respuestaAbierta = 0; // No es respuesta abierta
        $InsertEncuesta = "INSERT INTO respuestas_encuesta (
            id_pregunta,
            respuesta,
            respuesta_abierta,
            codigo,
            observacion,
            created
        ) VALUES (
            '$idPreg',
            '$respuesta',
            '$respuestaAbierta',
            '$codigo',
            '$observacion',
            NOW()
        )";
    }
    
    $resultadoInsert = mysqli_query($con, $InsertEncuesta);
}

$response = array("respuesta" => $resultadoInsert);
echo json_encode($response);
?>

