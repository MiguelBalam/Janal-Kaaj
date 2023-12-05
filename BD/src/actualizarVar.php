<?php
header('Content-Type: application/json');

// Conectar a la base de datos MySQL
$mysqli = new mysqli('162.241.60.169', 'janalkaa_admin', 'janalkaaj2023', 'janalkaa_kaaj');

if ($mysqli->connect_error) {
    die(json_encode(['Error de conexión a MySQL: ' . $mysqli->connect_error]));
}

// ...

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir las actualizaciones pendientes desde la aplicación web
    $combinedUpdates = json_decode(file_get_contents('php://input'), true);

    if (!$combinedUpdates || !isset($combinedUpdates['Respuestas']) || !isset($combinedUpdates['Encuestado'])) {
        die(json_encode(['error' => 'Error en los datos recibidos.']));
    }

    $updatesRespuestas = $combinedUpdates['Respuestas'];
$updatesEncuestado = $combinedUpdates['Encuestado'];
$id_encuestado = null;

// Iterar sobre las actualizaciones de Encuestado
foreach ($updatesEncuestado as $updateEncuestado) {
    $id_encuesta = $updateEncuestado['id_encuesta'];
    $encuestadoData = $updateEncuestado['encuestadoData'];

    // Insertar encuestado en la tabla encuestado_respuesta
    $insertQuery = 'INSERT INTO encuestado_respuesta (nombre, localidad, genero, edad, codigo, id_encuesta, longitud,latitud, Aplicador) VALUES (?, ?, ?, ?, ?, ?,?,?,?)';
    $stmt = $mysqli->prepare($insertQuery);
    $stmt->bind_param(
        'sssssssss',
        $encuestadoData['nombre'],
        $encuestadoData['localidad'],
        $encuestadoData['genero'],
        $encuestadoData['edad'],
        $encuestadoData['codigo'],
        $id_encuesta,
        $encuestadoData['longitud'],
        $encuestadoData['latitud'],
        $encuestadoData['Aplicador'],
    );

    if ($stmt->execute()) {
        $id_encuestado = mysqli_insert_id($mysqli);
    } else {
        die(json_encode(['error' => 'Error al aplicar la actualización de encuestado en encuestado_respuesta: ' . $stmt->error]));
    }
}

// Iterar sobre las actualizaciones de Respuestas
foreach ($updatesRespuestas as $updateRespuesta) {
    $id_encuesta = $updateRespuesta['id_encuesta'];
    $respuestaData = $updateRespuesta['espuestaData'];
    $respue = $updateRespuesta['rr'];


    // Insertar respuesta en la tabla respuestas_encuesta
    $insertRespuestaQuery = 'INSERT INTO respuesta_Encuesta_Variables (id_encuesta, id_encuestado, codigo, id_Variables, id_VariableE,respuesta,observacion, created, Aplicador) VALUES (?, ?, ?, ?, ?, ?,?,?,?)';
    $stmtRespuesta = $mysqli->prepare($insertRespuestaQuery);
    $stmtRespuesta->bind_param(
        'sssssssss',
        $id_encuesta,
        $id_encuestado, // Debes obtener $id_encuestado del bucle anterior
        $respuestaData['codigo'],
        $respuestaData['id_Variables'],
        $respuestaData['id_VariableE'],
        $respuestaData['respuesta'],
        $respue['observacion'],
        $respuestaData['created'],
        $respuestaData['Aplicador']
    );

    if ($stmtRespuesta->execute()) {
        // La actualización de respuesta se aplicó con éxito en respuestas_encuesta
    } else {
        die(json_encode(['error' => 'Error al aplicar la actualización de respuesta en respuestas_encuesta: ' . $stmtRespuesta->error]));
    }
}

    // Realizar la actualización en MySQL, por ejemplo, realizar una inserción

    echo json_encode(['message' => 'Actualizaciones aplicadas correctamente']);
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(['error' => 'Método no permitido']);
}

$mysqli->close();

?>
