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

// Función para eliminar la pregunta
function eliminarPregunta($variable_id, $con) {
    $con->begin_transaction();

    try {
        // Eliminar registros de encuesta_FinalReactivos
        $sql = "DELETE FROM encuesta_FinalVariables WHERE id_variable = $variable_id";
        $con->query($sql);

        // Eliminar registros de opciones_respuesta
        $sql = "DELETE FROM VariableEncabezado WHERE id_variableE = $variable_id";
        $con->query($sql);
        
        $sql = "DELETE FROM RegistroVariables WHERE id_variable = $variable_id";
        $con->query($sql);
        // Eliminar el reactivo de la tabla reactivosCreados
        $sql = "DELETE FROM Variable WHERE id_variable = $variable_id";
        $con->query($sql);

        // Confirmar la transacción
        $con->commit();
        echo "Pregunta eliminada con éxito.";
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $con->rollback();
        echo "Error al eliminar la pregunta: " . $e->getMessage();
    }
}

// Obtener el ID de la pregunta desde la solicitud POST
if (isset($_POST["variable_id"])) {
    $variable_id = $_POST["variable_id"];
    eliminarPregunta($variable_id, $con);
} else {
    echo "ID de pregunta no proporcionado en la solicitud.";
}

$con->close();
?>
