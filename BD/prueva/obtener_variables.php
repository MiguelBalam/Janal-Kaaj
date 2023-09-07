<?php
// Realizar la conexión a la base de datos
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

// Consulta SQL para obtener los reactivos
$query = "SELECT id_variable, Nobre_Var FROM Variable";
$result = mysqli_query($con, $query);

$variables = array();
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $variables[] = $row;
    }
    // Imprimir información para verificar
   // echo "Consulta exitosa. Número de filas recuperadas: " . count($variables);
} else {
    // Imprimir error en caso de falla en la consulta
    echo "Error en la consulta: " . mysqli_error($con);
}
header('Content-Type: application/json');
echo json_encode($variables);

?>

