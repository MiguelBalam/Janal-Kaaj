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

// $responses = $_POST['respuesta'];
// $codigo = $_POST['codigo'];
// $observacion = $_POST['observacion'];
$nombre = mysqli_real_escape_string($con, $_POST['nombre']);
$localidad = mysqli_real_escape_string($con, $_POST['localidad']);
$genero = mysqli_real_escape_string($con, $_POST['sexo']); // Puedes ajustar esto según cómo manejes los checkboxes de género
$edad = mysqli_real_escape_string($con, $_POST['edad']);
$codigo = $_POST['codigo'];
// Insertar datos del encuestado en la tabla 'datos_encuestado'
$insertDatosEncuestado = "INSERT INTO encuestado_respuesta(nombre, localidad, genero, edad, codigo)
                          VALUES ('$nombre', '$localidad', '$genero', '$edad', '$codigo')";

$resultadoInsertDatos = mysqli_query($con, $insertDatosEncuestado);


$responses = json_decode($_POST['responses'], true);

// $observacion = $_POST['observacion'];

foreach ($responses as $idPreg => $respArray) {
    foreach ($respArray as $respPreg) {
        $respuestaEscapada = mysqli_real_escape_string($con, $respPreg); // Escapar la respuesta
       
       
        
        // Crear y ejecutar la consulta SQL para insertar la respuesta
        $InsertEncuesta = "INSERT INTO respuesta_Encuesta_Variables (
            id_Variables,
            respuesta,
            codigo,
            creacion
        ) VALUES (
            '$idPreg',
            '$respuestaEscapada',
            '$codigo',
            NOW()
        )";
        $resultadoInsert = mysqli_query($con, $InsertEncuesta);
    }
}

$response = array("respuesta" => $resultadoInsert,"insertDatosEncuestado" => $resultadoInsertDatos);
echo json_encode($response);
?>