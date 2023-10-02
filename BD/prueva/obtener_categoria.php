<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión


$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Consulta SQL para obtener categorías únicas
$query = "SELECT id_categoria, GROUP_CONCAT(id_categoria) AS id_categorias, nombre_categoria FROM categorias GROUP BY nombre_categoria";
$result = mysqli_query($con, $query);

$categorias = array();
while ($row = mysqli_fetch_assoc($result)) {
    $categoria = array(
        'id_categorias' => explode(',', $row['id_categorias']),
        'nombre_categoria' => $row['nombre_categoria']
    );
    $categorias[] = $categoria;
}

// Agrega una opción para mostrar todas las preguntas
$defaultCategory = array('id_categorias' => array(0), 'nombre_categoria' => 'Mostrar todas las preguntas');
array_unshift($categorias, $defaultCategory);

echo json_encode($categorias);



// $query = "SELECT id_categoria, nombre_categoria FROM categorias";
// $result = mysqli_query($con, $query);

// $categorias = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $categorias[] = $row;
// }


// echo json_encode($categorias);
?>
