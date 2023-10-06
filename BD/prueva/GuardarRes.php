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

// $nombre = $_POST['nombre'];
// $localidad = $_POST['localidad'];
// $genero = $_POST['sexo'];
// $edad = $_POST['edad'];


// $insertEncuestado = "INSERT INTO encuestado_respuesta (codigo, nombre, localidad, genero, edad) 
//                      VALUES ('$codigo', '$nombre', '$localidad', '$genero', '$edad')";
// $resultadoInsertEncuestado = mysqli_query($con, $insertEncuestado);

// Datos del encuestado
$latitud = mysqli_real_escape_string($con, $_POST['latitud']);
$longitud = mysqli_real_escape_string($con, $_POST['longitud']);
$nombre = mysqli_real_escape_string($con, $_POST['nombre']);
$localidad = mysqli_real_escape_string($con, $_POST['localidad']);
$genero = mysqli_real_escape_string($con, $_POST['sexo']); // Puedes ajustar esto según cómo manejes los checkboxes de género
$edad = mysqli_real_escape_string($con, $_POST['edad']);
$codigo = $_POST['codigo'];
$Aplicador=$_POST['userCorreo'];
$idEncuesta = mysqli_real_escape_string($con, $_POST['idEncuesta']);

// Insertar datos del encuestado en la tabla 'datos_encuestado'
$insertDatosEncuestado = "INSERT INTO encuestado_respuesta(nombre, localidad, genero, edad, codigo, id_encuesta, latitud, longitud, Aplicador)
                          VALUES ('$nombre', '$localidad', '$genero', '$edad', '$codigo',$idEncuesta,'$latitud', '$longitud','$Aplicador')";

$resultadoInsertDatos = mysqli_query($con, $insertDatosEncuestado);
$responses = $_POST['respuesta'];

$observacion = $_POST['observacion'];
if ($resultadoInsertDatos) {
    $idEncuestado = mysqli_insert_id($con);
foreach ($responses as $idPreg => $respPreg) {
    if (is_array($respPreg)) {
        // Si la respuesta es un array, se trata de un input de tipo texto
        $respuestaInput = mysqli_real_escape_string($con, $respPreg['input']);
        $respuestaAbierta = 1; // Respuesta abierta
        $InsertEncuesta = "INSERT INTO respuestas_encuesta (
            id_encuesta,
            id_encuestado,
            codigo,
            id_pregunta,
            respuesta,
            observacion,
            created,
            Aplicador
        ) VALUES (
            '$idEncuesta',
            '$idEncuestado',
            '$codigo',
            '$idPreg',
            '$respuestaInput',
            '$observacion',
            NOW(),
            '$Aplicador'
        )";
    } else {
        // Si la respuesta no es un array, se trata de una opción de respuesta
        $respuesta = mysqli_real_escape_string($con, $respPreg);
        $respuestaAbierta = 0; // No es respuesta abierta
        $InsertEncuesta = "INSERT INTO respuestas_encuesta (
             id_encuesta,
            id_encuestado,
            codigo,
            id_pregunta,
            respuesta,
            observacion,
            created,
            Aplicador
        ) VALUES (
            '$idEncuesta',
            '$idEncuestado',
            '$codigo',
            '$idPreg',
            '$respuesta',
            '$observacion',
            NOW(),
            '$Aplicador'
        )";
    }
    
    $resultadoInsert = mysqli_query($con, $InsertEncuesta);

}
}
$response = array("respuesta" => $resultadoInsert, "insertDatosEncuestado" => $resultadoInsertDatos);

echo json_encode($response);
?>

