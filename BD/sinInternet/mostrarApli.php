<?php
// Incluye el archivo de configuración de la base de datos y cualquier otro archivo necesario
 // Reemplaza con la ubicación de tu archivo de configuración
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

// Obtiene el correo electrónico del aplicador del POST
if (isset($_POST['correo'])) {
    $correoAplicador = $_POST['correo'];

    // Realiza una consulta SQL para obtener las encuestas asignadas al aplicador
    $sql = "SELECT e.id_encuesta, e.titulo, e.estado, e.fecha_inicio
            FROM encuestas e
            INNER JOIN asignaciones a ON e.id_encuesta = a.encuesta
            WHERE a.aplicador = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $correoAplicador);
    $stmt->execute();
    $result = $stmt->get_result();

    // Construye la tabla HTML para mostrar las encuestas asignadas
    $data = '
    <table class="table table-bordered table-hover table-condensed">
        <thead class="thead-light">
            <tr>
                <th>ID encuesta</th>
                <th>Título</th>
                <th>Estado</th>
                <th>Fecha Inicio</th>
            </tr>
        </thead>
        <tbody>';

    while ($row = $result->fetch_assoc()) {
        $data .= '
            <tr>
                <td>' . $row["id_encuesta"] . '</td>
                <td>' . htmlspecialchars($row["titulo"]) . '</td>
                <td>' . htmlspecialchars($row["estado"]) . '</td>
                <td>' . $row["fecha_inicio"] . '</td>
            </tr>';
    }

    $data .= '</tbody></table>';

    echo $data;
} else {
    // Si no se proporcionó el correo electrónico, devuelve un mensaje de error
    echo "Error: Correo electrónico del aplicador no proporcionado.";
}

// Cierra la conexión a la base de datos u realiza cualquier otra limpieza necesaria
$stmt->close();
$con->close();
?>