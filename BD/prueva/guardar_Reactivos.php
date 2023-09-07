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


// ...
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $descripcion = $_POST["descripcion"];
    $categoria = $_POST["categoria"];
    $tipoRespuesta = $_POST["tipoRespuesta"];
    $obligatorio = $_POST["obligatorio"];
   
    // Insertar la categoría si no existe
    $inserCategoria = "INSERT INTO categorias(nombre_categoria)
                      VALUES ('$categoria')";
    if (mysqli_query($con, $inserCategoria)) {
        // Obtener el ID de la categoría recién insertada
        $idCategoria = mysqli_insert_id($con);

        // Insertar el tipo de respuesta si no existe
        $inserRespuesta = "INSERT INTO tiposRespuesta(nombre_tipo_respuesta)
                           VALUES ('$tipoRespuesta')";
        if (mysqli_query($con, $inserRespuesta)) {
            // Obtener el ID del tipo de respuesta recién insertado
            $idTipoRespuesta = mysqli_insert_id($con);

            // Insertar el reactivo en la tabla reactivosCreados
            $sql = "INSERT INTO reactivosCreados (descripcion, id_categoria, id_tipoRespuesta, obligatorio) VALUES (?, ?, ?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->bind_param("siii", $descripcion, $idCategoria, $idTipoRespuesta, $obligatorio);
            $stmt->execute();
            $stmt->close();

            $idReactivo = mysqli_insert_id($con);   
            $numRespuestas = $_POST["numRespuestas"];
            for ($i = 1; $i <= $numRespuestas; $i++) {
                if (isset($_POST["respuesta$i"])) {
                    $respuesta = $_POST["respuesta$i"];
                    $insertRespuesta = "INSERT INTO opciones_respuesta (id_reactivoC, descripcion_opcion) VALUES ('$idReactivo', '$respuesta')";
                    mysqli_query($con, $insertRespuesta);
                }
            }
            

            // ... Más código para insertar en otras tablas si es necesario ...

            // Enviar una respuesta a JavaScript si es necesario
            echo "Reactivo guardado exitosamente.";
        } else {
            echo "Error en la inserción del tipo de respuesta.";
        }
    } else {
        echo "Error en la inserción de la categoría.";
    }
}

?>
