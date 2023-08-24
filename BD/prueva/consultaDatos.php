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

// Consultar los resultados desde la vista
$sqlResultados = "SELECT * FROM vista_resultados";
$queryResultados = mysqli_query($con, $sqlResultados);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Encuesta</title>
    <link rel="stylesheet" href="../../BD/prueva/estilostabla.css">
</head>
<body>
    <h1>Resultados de Encuesta</h1>
    <table>
        <thead>
            <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
                <th>Tipo de Respuesta</th>
                <th>Código</th>
                <th>Observación</th>
                <th>Fecha de Creación</th>
            </tr>
        </thead>
        <tbody>
            <?php
            while ($row = mysqli_fetch_assoc($queryResultados)) {
                echo "<tr>";
                echo "<td>{$row['pregunta']}</td>";
                echo "<td>{$row['respuesta']}</td>";
                echo "<td>{$row['tipo_respuesta']}</td>";
                echo "<td>{$row['codigo']}</td>";
                echo "<td>{$row['observacion']}</td>";
                echo "<td>{$row['fecha_creacion']}</td>";
                echo "</tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
