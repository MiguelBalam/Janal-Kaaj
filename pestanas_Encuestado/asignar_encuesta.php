<?php
// Configuración de la base de datos (reemplaza con tus propios datos)
$servername= "162.241.60.169";
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$dbname = "janalkaa_kaaj";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados desde el formulario (aplicador y encuesta)
$aplicadores = $_POST['aplicadores'];
$encuestas = $_POST['encuestas'];

// Conexión a la base de datos (reemplaza con tus propios datos)
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Iterar sobre las combinaciones de aplicador y encuesta seleccionadas
foreach ($aplicadores as $aplicador) {
    foreach ($encuestas as $encuesta) {
        // Consulta SQL para insertar la asignación en la base de datos
        $sql = "INSERT INTO asignaciones (aplicador, encuesta) VALUES ('$aplicador', '$encuesta')";

        if ($conn->query($sql) === TRUE) {
            echo "Asignación guardada con éxito para Aplicador: $aplicador, Encuesta: $encuesta<br>";
        } else {
            echo "Error al guardar la asignación: " . $conn->error;
        }
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
