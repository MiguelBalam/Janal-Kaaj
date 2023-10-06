<?php
// Conexión a la base de datos (ajusta la configuración según tu entorno)
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

// Función para eliminar la encuesta

// Conexión a la base de datos (ajusta la configuración según tu entorno)

// Función para eliminar la encuesta
function eliminarEncuesta($encuesta_id, $con) {
    // Iniciar una transacción
    $con->begin_transaction();

    try {
        // Eliminar registros de encuesta_FinalReactivos
        $sql = "DELETE FROM encuesta_FinalReactivos WHERE id_encuesta = $encuesta_id";
        $con->query($sql);

        // Eliminar la encuesta de la tabla encuestas
        $sql = "DELETE FROM encuestas WHERE id_encuesta = $encuesta_id";
        $con->query($sql);

        // Confirmar la transacción
        $con->commit();
        echo "Encuesta eliminada con éxito.";
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $con->rollback();
        echo "Error al eliminar la encuesta: " . $e->getMessage();
    }
}

// Obtener el ID de la encuesta desde la URL
if (isset($_GET["id"])) {
    $encuesta_id = $_GET["id"];
    eliminarEncuesta($encuesta_id, $con);
} else {
    echo "ID de encuesta no proporcionado en la URL.";
}

$con->close();
?>

