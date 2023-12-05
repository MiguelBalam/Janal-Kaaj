<?php
// Realizar la conexión a la base de datos
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

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['hoy'])) {
    $lastUpdate = $_GET['hoy'];
    
    // Convertir la fecha y hora en formato ISO 8601 a formato MySQL
    $formattedLastUpdate = date('Y-m-d', strtotime($lastUpdate));

    $query = $query = "SELECT FechaCreacion, id_reactivoC, descripcion FROM RegistroReactivos WHERE DATE(FechaCreacion) = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $formattedLastUpdate);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $variables = array();
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $variables[] = $row;
        }
        // Enviar las variables como respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode($variables);
 
    } else {
        // Imprimir error en caso de falla en la consulta
        echo "Error en la consulta: " . mysqli_error($con);
    }

    $stmt->close();
} else {
    echo "Error en la solicitud.";
}

?>