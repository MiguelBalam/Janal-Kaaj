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

// if (isset($_POST)) {
//     // Obtener valores
//     $id_encuesta = $_POST['id_encuesta'];
//     $titulo = $_POST['titulo'];
//     $descripcion = $_POST['descripcion'];
//     $instrucciones = $_POST['instrucciones'];

//     // Modificar producto
//     $query = "
//         UPDATE encuestas SET
//         titulo      = '$titulo',
//         objetivo = '$descripcion',
//         instrucciones ='$instrucciones'
//         WHERE id_encuesta   = '$id_encuesta'
//     ";
//     if (!$result = mysqli_query($con, $query)) {
//         exit(mysqli_error($con));
//     }
// }
if (isset($_POST)) {
    // Obtener valores
    $id_encuesta = $_POST['id_encuesta'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $instrucciones = $_POST['instrucciones'];

    // Verificar si el ID de la encuesta pertenece a la tabla encuestasVariables
    $checkQuery = "SELECT id_encuesta FROM encuestasVariables WHERE id_encuesta = '$id_encuesta'";
    if (!$checkResult = mysqli_query($con, $checkQuery)) {
        exit(mysqli_error($con));
    }

    if (mysqli_num_rows($checkResult) > 0) {
        // Si el ID de la encuesta está en la tabla encuestasVariables, actualiza allí
        $updateQuery = "
            UPDATE encuestasVariables SET
            titulo = '$titulo',
            objetivo = '$descripcion',
            instrucciones = '$instrucciones'
            WHERE id_encuesta = '$id_encuesta'
        ";
        if (!$updateResult = mysqli_query($con, $updateQuery)) {
            exit(mysqli_error($con));
        }
    } else {
        // Si el ID de la encuesta no está en la tabla encuestasVariables, actualiza en la tabla encuestas
        $updateQuery = "
            UPDATE encuestas SET
            titulo = '$titulo',
            objetivo = '$descripcion',
            instrucciones = '$instrucciones'
            WHERE id_encuesta = '$id_encuesta'
        ";
        if (!$updateResult = mysqli_query($con, $updateQuery)) {
            exit(mysqli_error($con));
        }
    }
}
