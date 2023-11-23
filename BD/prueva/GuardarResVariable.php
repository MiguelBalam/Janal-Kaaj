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
$insertDatosEncuestado = "INSERT INTO encuestado_respuesta(nombre, localidad, genero, edad, codigo, latitud,longitud,Aplicador)
                          VALUES ('$nombre', '$localidad', '$genero', '$edad', '$codigo','$latitud', '$longitud','$Aplicador')";

$resultadoInsertDatos = mysqli_query($con, $insertDatosEncuestado);


$responses = json_decode($_POST['responses'], true);

if ($resultadoInsertDatos) {
    $idEncuestado = mysqli_insert_id($con);

foreach ($responses as $idPreg => $respArray) {

    foreach ($respArray as $respPreg) {
        $idVariableE = $respPreg['encabezados'];
        //$respuestaEscapada = mysqli_real_escape_string($con, $respPreg['respuesta']); // Escapar la respuesta
        if (is_array($respPreg['respuesta'])) {
            // Si es un arreglo, conviértelo en una cadena
            $respuestaEscapada = mysqli_real_escape_string($con, implode(', ', $respPreg['respuesta']));
        } else {
            // Si es una cadena, simplemente escápala
            $respuestaEscapada = mysqli_real_escape_string($con, $respPreg['respuesta']);
        }
       
        
        // Crear y ejecutar la consulta SQL para insertar la respuesta
        $InsertEncuesta = "INSERT INTO respuesta_Encuesta_Variables (
            id_encuesta,
            id_encuestado,
            id_Variables,
            id_VariableE,
            respuesta,
            codigo,
            Aplicador,
            created
        ) VALUES (
            '$idEncuesta',
            '$idEncuestado',
            '$idPreg',
            '$idVariableE',
            '$respuestaEscapada',
            '$codigo',
           '$Aplicador',
            NOW()
        )";
        $resultadoInsert = mysqli_query($con, $InsertEncuesta);
    }
}
}
$response = array("respuesta" => $resultadoInsert,"insertDatosEncuestado" => $resultadoInsertDatos);
echo json_encode($response);
?>