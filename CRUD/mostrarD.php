<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión
// $con = new mysqli($servername, $username, $password, $dbname);
// mysqli_set_charset($con, "utf8");

// // Verificamos la conexión
// if ($con->connect_error) {
//     die("Conexión fallida: " . $con->connect_error);
// }

// if (isset($_GET['id'])) {
//     // Obtener id_encuesta de la URL
//     $id_encuesta = $_GET['id'];

//     // Obtener detalles de la encuesta (solo título, objetivo e instrucciones)
//     $query = "SELECT titulo, objetivo, instrucciones FROM encuestas WHERE id_encuesta = '$id_encuesta'";
//     if (!$result = mysqli_query($con, $query)) {
//         exit(mysqli_error($con));
//     }
//     $response = array();
//     if (mysqli_num_rows($result) > 0) {
//         $row = mysqli_fetch_assoc($result);
//         $response = $row;
//     } else {
//         $response['status'] = 200;
//         $response['message'] = "Información no encontrada!";
//     }
//     // Mostrar los datos en formato JSON
//     header('Content-Type: application/json');
//     echo json_encode($response);
// } else {
//     $response['status'] = 200;
//     $response['message'] = "Consulta Invalida!";
//     // Mostrar los datos en formato JSON
//     header('Content-Type: application/json');
//     echo json_encode($response);
// }

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

// Verificamos la conexión
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

if (isset($_GET['id'])) {
    // Obtener id_encuesta de la URL
    $id_encuesta = $_GET['id'];

    // Obtener detalles de la encuesta desde la tabla encuestas
    $query = "SELECT titulo, objetivo, instrucciones FROM encuestas WHERE id_encuesta = '$id_encuesta'";
    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }

    $response = array();
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $response = $row;
    } else {
        // Si no se encuentra información en la tabla encuestas, realizar la consulta en la tabla encuestasVariables
        $queryEncuestasVariables = "SELECT titulo, objetivo, instrucciones FROM encuestasVariables WHERE id_encuesta = '$id_encuesta'";
        if (!$resultEncuestasVariables = mysqli_query($con, $queryEncuestasVariables)) {
            exit(mysqli_error($con));
        }
        
        if (mysqli_num_rows($resultEncuestasVariables) > 0) {
            $rowEncuestasVariables = mysqli_fetch_assoc($resultEncuestasVariables);
            $response = $rowEncuestasVariables;
        } else {
            $response['status'] = 200;
            $response['message'] = "Información no encontrada en ninguna tabla!";
        }
    }
    
    // Mostrar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    $response['status'] = 200;
    $response['message'] = "Consulta Invalida!";
    // Mostrar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}

// ?>