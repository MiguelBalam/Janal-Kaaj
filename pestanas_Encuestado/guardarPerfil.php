<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Conectar a la base de datos (similar al código que ya tienes)
$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Obtener los valores del formulario
$userId = $_POST['userId'];  // Asegúrate de que el formulario tenga un campo oculto para el userId

$nombreEncuestado = $_POST['nombre'];
$apellidoPaterno = $_POST['apellidoPa'];
$apellidoMaterno = $_POST['apellidoMa'];
$genero = ''; // Variable para almacenar el género seleccionado

if (isset($_POST['genero'])) {
    $genero = $_POST['genero']; // Obtener el valor del género seleccionado
}
$edad = $_POST['edad'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$localidad = $_POST['localidad'];
$municipio = $_POST['municipio'];
$estado = $_POST['estado'];
$pais = $_POST['pais'];
$contra = $_POST['contra'];  // Asegúrate de que el campo de contraseña esté presente en el formulario

// Actualizar los datos en la base de datos
$query = "UPDATE UsuarioEncuestado SET nombre='$nombreEncuestado', apellidoPaterno='$apellidoPaterno', genero='$genero', apellidoMaterno='$apellidoMaterno', edad=$edad, Telefono='$telefono', localidad='$localidad', municipio='$municipio', estado='$estado', 
 pais='$pais'WHERE id=$userId";

if ($con->query($query) === TRUE) {
    // Los datos se actualizaron con éxito
    echo "Los cambios se guardaron correctamente.";
   
} else {
    // Error al guardar los datos
    echo "Error al guardar los cambios: " . $con->error;
}

// Cerrar la conexión a la base de datos
$con->close();
?>
