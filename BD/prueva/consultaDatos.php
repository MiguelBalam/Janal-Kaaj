<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

if (isset($_POST['codigo'])) {
    $codigo = $_POST['codigo'];

    $sqlEncuesta = "SELECT * FROM respuestas_encuesta WHERE codigo = '$codigo'";
    $queryEncuesta = mysqli_query($con, $sqlEncuesta);

    if ($queryEncuesta) {
        if (mysqli_num_rows($queryEncuesta) > 0) {
            // El código existe, mostrar mensaje de éxito
            echo "El código existe y tiene respuestas en la base de datos.";
        } else {
            // El código no existe, mostrar mensaje de error
            echo "El código no existe en la base de datos.";
        }
    } else {
        echo "Error al consultar la encuesta.";
    }
}
?>
