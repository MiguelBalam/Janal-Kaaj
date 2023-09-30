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

if (isset($_POST['id_encuesta']) && isset($_POST['id_encuesta']) != "") {
    // Obtener id_encuesta
    $id_encuesta = $_POST['id_encuesta'];

    // Obtener detalles de la encuesta
    $query = "SELECT * FROM encuestas WHERE id_encuesta = '$id_encuesta'" ;
    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
    $response = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $response = $row;
        }
    }
    else {
        $response['status'] = 200;
        $response['message'] = "Información no encontrada!";
    }
    // display JSON data
    echo json_encode($response) ;
}
else {
    $response['status'] = 200;
    $response['message'] = "Consulta Invalida!";
}