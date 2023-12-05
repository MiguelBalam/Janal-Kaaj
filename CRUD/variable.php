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

    // Consulta SQL para obtener las variables de la encuesta específica
    $query = "SELECT Variable.* FROM Variable
            INNER JOIN encuesta_FinalVariables ON Variable.id_variable = encuesta_FinalVariables.id_variable
            WHERE encuesta_FinalVariables.id_encuesta = ?";
    $stmt = $con->prepare($query);
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $con->error);
    }
    $stmt->bind_param("i", $idEncuesta);
    if ($stmt->execute()) {
        // Obtener el resultado
        $result = $stmt->get_result();
        
        if ($result) {
            $variables = array();

            while ($row = $result->fetch_assoc()) {
                $variables[] = $row;
            }
            echo json_encode($variables);
        } else {
            // Manejar el caso en el que no se encontraron variables
            echo json_encode(array());
        }
    } else {
        // Manejar el caso en el que hubo un error en la consulta
        echo json_encode(array());
    }

    // Cerrar la conexión
    $stmt->close();
    $con->close();

?>

