<?php
header('Content-Type: application/json');

// Conectar a la base de datos MySQL
$mysqli = new mysqli('162.241.60.169', 'janalkaa_admin', 'janalkaaj2023', 'janalkaa_kaaj');

if ($mysqli->connect_error) {
    die('Error de conexión a MySQL: ' . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Endpoint para obtener datos desde MySQL
    $tables = ['reactivos', 'encuestas', 'respuestas_encuesta', 'encuestado_respuesta'];

    $data = [];

    foreach ($tables as $table) {
        $query = "SELECT * FROM $table"; // Consulta específica para cada tabla
        $result = $mysqli->query($query);

        if (!$result) {
            die('Error al obtener datos desde MySQL: ' . $mysqli->error);
        }

        while ($row = $result->fetch_assoc()) {
            $row['table'] = $table; // Agregar la propiedad 'table' con el nombre de la tabla
            $data[] = $row;
        }
    }

    echo json_encode($data);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Endpoint para enviar datos a MySQL
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (!$requestData) {
        die('Error al decodificar los datos JSON.');
    }

    // Insertar los datos en MySQL
    $insertQuery = 'INSERT INTO tu_tabla (campo1, campo2, campo3) VALUES (?, ?, ?)';
    $stmt = $mysqli->prepare($insertQuery);
    $stmt->bind_param('sss', $requestData['campo1'], $requestData['campo2'], $requestData['campo3']);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Datos insertados correctamente']);
    } else {
        die('Error al insertar datos en MySQL: ' . $stmt->error);
    }
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(['error' => 'Método no permitido']);
}

$mysqli->close();
?>
