<?php
$username = "janalkaa_admin";
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

// Retrieve the form data
$nombre = $_POST["nombrecompletos"];
$apellidoPaterno = $_POST["apellidopaterno"];
$apellidoMaterno = $_POST["apellidomaterno"];
$genero = $_POST["inlineRadioOptions"];
$edad = $_POST["edad"];
$institucion = $_POST["procedencia"];
$correo = $_POST["Correo"];
$telefono = $_POST["tel"];
$contrasenia = $_POST["Contrasenia"];
$contrasenia2 = $_POST["Contrasenia2"];

// Ensure both password fields match
if ($contrasenia !== $contrasenia2) {
    echo "The passwords do not match.";
    exit;
}

// Hash the password before storing it for security purposes
$hashedPassword = password_hash($contrasenia, PASSWORD_DEFAULT);

// Insert the data into the Administrador table
$sql = "INSERT INTO Administrador (Nombre, Apellido_Paterno, Apellido_Materno, Genero, Edad, Institucion, correo, Telefono, contraseña)
        VALUES ('$nombre', '$apellidoPaterno', '$apellidoMaterno', '$genero', '$edad', '$institucion', '$correo', '$telefono', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
