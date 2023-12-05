<?php
// Conexión a la base de datos (debes configurarla según tus credenciales)
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
// Obtener los datos enviados desde el formulario
$id_reactivoC = $_POST['id_reactivoC'];
$nuevoValorReactivoCre = $_POST['nuevoValorReactivoCre'];
$nuevoValorCategoriaReactivos = $_POST['nuevoValorCategoriaReactivos'];
$nuevoValorTipoRes = $_POST['nuevoValorTipoRes'];
$nuevoValorObligatorio = $_POST['nuevoValorObligatorio'];
$respuestas = json_decode($_POST['respuestas']);
var_dump($_POST['respuestas']);

$sqlGetIds = "SELECT id_categoria, id_tipoRespuesta FROM reactivosCreados WHERE id_reactivoC = ?";
$stmtGetIds = $con->prepare($sqlGetIds);
if ($stmtGetIds === false) {
    die("Error en la preparación de la consulta para obtener ids: " . $con->error);
}

$stmtGetIds->bind_param("i", $id_reactivoC);

if ($stmtGetIds->execute() === false) {
    die("Error al ejecutar la consulta para obtener ids: " . $stmtGetIds->error);
}

$stmtGetIds->bind_result($id_categoria, $id_tipoRespuesta);

if ($stmtGetIds->fetch()) {
    $stmtGetIds->close();

    // Actualizar los valores en la tabla reactivosCreados
    $sqlUpdateReactivos = "UPDATE reactivosCreados
                           SET descripcion = ?, 
                               obligatorio = ?
                           WHERE id_reactivoC = ?";

    $stmtUpdateReactivos = $con->prepare($sqlUpdateReactivos);
    if ($stmtUpdateReactivos === false) {
        die("Error en la preparación de la consulta para actualizar reactivos: " . $con->error);
    }

    $stmtUpdateReactivos->bind_param("ssi", $nuevoValorReactivoCre, $nuevoValorObligatorio, $id_reactivoC);

    if ($stmtUpdateReactivos->execute() === false) {
        die("Error al ejecutar la consulta para actualizar reactivos: " . $stmtUpdateReactivos->error);
    }

    $stmtUpdateReactivos->close();

    // Actualizar la categoría y el tipo de respuesta en sus respectivas tablas
    $sqlUpdateCategorias = "UPDATE categorias
                           SET nombre_categoria = ?
                           WHERE id_categoria = ?";

    $stmtUpdateCategorias = $con->prepare($sqlUpdateCategorias);
    if ($stmtUpdateCategorias === false) {
        die("Error en la preparación de la consulta para actualizar categorias: " . $con->error);
    }

    $stmtUpdateCategorias->bind_param("si", $nuevoValorCategoriaReactivos, $id_categoria);

    if ($stmtUpdateCategorias->execute() === false) {
        die("Error al ejecutar la consulta para actualizar categorias: " . $stmtUpdateCategorias->error);
    }

    $stmtUpdateCategorias->close();

    $sqlUpdateTipoRespuesta = "UPDATE tiposRespuesta
                           SET nombre_tipo_respuesta = ?
                           WHERE id_tipoRespuesta = ?";

    $stmtUpdateTipo = $con->prepare($sqlUpdateTipoRespuesta);
    if ($stmtUpdateTipo === false) {
        die("Error en la preparación de la consulta para actualizar categorias: " . $con->error);
    }

    $stmtUpdateTipo->bind_param("si", $nuevoValorTipoRes, $id_tipoRespuesta);

    if ($stmtUpdateTipo->execute() === false) {
        die("Error al ejecutar la consulta para actualizar categorias: " . $stmtUpdateTipo->error);
    }

    $stmtUpdateTipo->close();
} else {
    // Manejar el caso en el que no se encontraron datos para la ID proporcionada
    die("No se encontraron datos para la ID de reactivo proporcionada.");
}
$sqlUpdateRegistroReactivos = "UPDATE RegistroReactivos
                               SET descripcion = ?
                               WHERE id_reactivoC = ?";

$stmtUpdateRegistroReactivos = $con->prepare($sqlUpdateRegistroReactivos);
if ($stmtUpdateRegistroReactivos === false) {
    die("Error en la preparación de la consulta para actualizar RegistroReactivos: " . $con->error);
}

$stmtUpdateRegistroReactivos->bind_param("si", $nuevoValorReactivoCre, $id_reactivoC);

if ($stmtUpdateRegistroReactivos->execute() === false) {
    die("Error al ejecutar la consulta para actualizar RegistroReactivos: " . $stmtUpdateRegistroReactivos->error);
}

$stmtUpdateRegistroReactivos->close();

$respuestas = array_filter($respuestas, function($respuesta) {
    return !empty($respuesta);
});

// Consulta SQL para eliminar las respuestas existentes
$sqlEliminarRespuestas = "DELETE FROM opciones_respuesta WHERE id_reactivoC = ?";
$stmtEliminarRespuestas = $con->prepare($sqlEliminarRespuestas);
$stmtEliminarRespuestas->bind_param("i", $id_reactivoC);
$stmtEliminarRespuestas->execute();
$stmtEliminarRespuestas->close();

// Consulta SQL para insertar las nuevas respuestas
$sqlInsertarRespuesta = "INSERT INTO opciones_respuesta (id_reactivoC, descripcion_opcion) VALUES (?, ?)";
$stmtInsertarRespuesta = $con->prepare($sqlInsertarRespuesta);
$stmtInsertarRespuesta->bind_param("is", $id_reactivoC, $respuesta);

foreach ($respuestas as $respuesta) {
    $stmtInsertarRespuesta->execute();
}

$stmtInsertarRespuesta->close();


echo "Actualización exitosa";
?>
