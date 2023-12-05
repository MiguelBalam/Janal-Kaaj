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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $userId = $_POST['userId'];
    $nombre = $_POST['nombre'];
    $apellidoPa = $_POST['apellidoPa'];
    $apellidoMa = $_POST['apellidoMa'];
    $genero = $_POST['opciones'];
    $edad = $_POST['edad'];
    $instituto = $_POST['instituto'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $contra = $_POST['contra'];

    // Validar y sanear los datos
    $nombre = mysqli_real_escape_string($con, $nombre);
    $apellidoPa = mysqli_real_escape_string($con, $apellidoPa);
    $apellidoMa = mysqli_real_escape_string($con, $apellidoMa);
    $genero = mysqli_real_escape_string($con, $genero);
    $edad = mysqli_real_escape_string($con, $edad);
    $instituto = mysqli_real_escape_string($con, $instituto);
    $correo = mysqli_real_escape_string($con, $correo);
    $telefono = mysqli_real_escape_string($con, $telefono);
    $contra = mysqli_real_escape_string($con, $contra);

    // Actualizar en la base de datos
    $sql = "UPDATE Administrador 
            SET Nombre='$nombre', Apellido_Paterno='$apellidoPa', Apellido_Materno='$apellidoMa', 
                Genero='$genero', Edad='$edad', Institucion='$instituto', correo='$correo', 
                Telefono='$telefono', contraseña='$contra'
                WHERE id=$userId";
    
    if ($con->query($sql) === TRUE) {
        echo "Registro actualizado con éxito";
    } else {
        echo "Error al actualizar el registro: " . $con->error;
    }
}

$con->close();
?>

