<link rel="stylesheet" href="../node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
<script src="../node_modules/sweetalert2/dist/sweetalert2.all.js"></script>


<?php
// Configuración de la base de datos (reemplaza con tus propios datos)
$servername = "162.241.60.169";
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

// Obtener los datos enviados desde el formulario (aplicador y encuesta)
$aplicadores = $_POST['aplicadores'];
$encuestas = $_POST['encuestas'];

// ...

// Iterar sobre las combinaciones de aplicador y encuesta seleccionadas
foreach ($aplicadores as $aplicador) {
    foreach ($encuestas as $encuesta) {
        // Consulta SQL para insertar la asignación en la base de datos
        $sql = "INSERT INTO asignaciones (aplicador, encuesta) VALUES ('$aplicador', '$encuesta')";

        if ($conn->query($sql) === TRUE) {
            echo "Asignación guardada con éxito para Aplicador: $aplicador, Encuesta: $encuesta<br>";

            // Después de procesar los datos y guardar en la base de datos, muestra el mensaje utilizando JavaScript.
            echo '<script>
            Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Asignación guardada con éxito.",
            }).then(function() {
              window.location.href = "/pestanas_Encuestado/asignarE.php"; // Redirige a la página deseada después de mostrar el mensaje.
            });
            </script>';
        } else {
            echo "Error al guardar la asignación: " . $conn->error;
        }
    }
}

// Procesamiento de datos y consultas SQL...



// Cerrar la conexión a la base de datos
$conn->close();
