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

if (isset($_POST)) {
    // Obtener valores
    $id_encuesta = $_POST['id_encuesta'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $instrucciones = $_POST['instrucciones'];

    // Modificar producto
    $query = "
        UPDATE encuestas SET
        titulo      = '$titulo',
        objetivo = '$descripcion',
        instrucciones ='$instrucciones'
        WHERE id_encuesta   = '$id_encuesta'
    ";
    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
}