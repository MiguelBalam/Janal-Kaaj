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



// Obtener el ID de la encuesta de la solicitud AJAX
$idEncuesta = $_GET['id'];

// Consulta SQL para obtener los reactivos de la encuesta específica
$query = "SELECT id_reactivo FROM encuesta_FinalReactivos WHERE id_encuesta = ?";

// Preparar la consulta
$stmt = $con->prepare($query);
if ($stmt === false) {
    die("Error en la preparación de la consulta: " . $con->error);
}

// Vincular el parámetro ID
$stmt->bind_param("i", $idEncuesta);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Obtener el resultado
    $result = $stmt->get_result();
    
    if ($result) {
        // Crear un arreglo para almacenar los ID de reactivos
        $reactivosIds = array();

        while ($row = $result->fetch_assoc()) {
            // Agregar el ID del reactivo al arreglo
            $reactivosIds[] = $row['id_reactivo'];
        }

        // Consulta SQL para obtener los detalles de los reactivos desde la tabla reactivosCreados
        $sql = "SELECT reactivosCreados.*, categorias.nombre_categoria, tiposRespuesta.nombre_tipo_respuesta
        FROM reactivosCreados
        LEFT JOIN categorias ON reactivosCreados.id_categoria = categorias.id_categoria
        LEFT JOIN tiposRespuesta ON reactivosCreados.id_tipoRespuesta = tiposRespuesta.id_tipoRespuesta
        WHERE reactivosCreados.id_reactivoC IN (" . implode(',', $reactivosIds) . ")";


        $result = $con->query($sql);

        if ($result->num_rows > 0) {
            // Crear un arreglo para almacenar los datos
            $reactivos = array();
            while ($row = $result->fetch_assoc()) {
                $reactivo = array(
                    'id_reactivoC' => $row['id_reactivoC'],
                    'descripcion' => $row['descripcion'],
                    'id_categoria' => $row['id_categoria'],
                    'nombre_categoria' => $row['nombre_categoria'], // Agregar el nombre de la categoría
                    'id_tipoRespuesta' => $row['id_tipoRespuesta'],
                    'nombre_tipoRespuesta' => $row['nombre_tipo_respuesta'], // Agregar el nombre del tipo de respuesta
                    'obligatorio' => $row['obligatorio']
                );
                // Agregar el reactivo al arreglo
                array_push($reactivos, $reactivo);
            }
            
            // Devolver los datos en formato JSON
            echo json_encode($reactivos);
        } else {
            echo "No se encontraron reactivos para la encuesta con ID $idEncuesta.";
        }
    } else {
        echo "Error en la consulta: " . $con->error;
    }
} else {
    echo "Error al ejecutar la consulta: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$con->close();
?>


