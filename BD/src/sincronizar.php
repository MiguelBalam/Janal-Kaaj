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
}  

$mysqli->close();
?>
