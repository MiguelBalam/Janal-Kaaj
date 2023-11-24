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

$titulo = $_POST['titulo'];
$cuerpo = $_POST['noticia'];

if(isset($_FILES['imagen']) && $_FILES['imagen']['tmp_name'] != ''){
    // Leer el contenido del archivo temporal en formato binario
    $imagenBinaria = addslashes(file_get_contents($_FILES['imagen']['tmp_name']));

    // Preparar la consulta
    $stmt = $con->prepare("INSERT INTO `Noticias` (`cuerpo`, `titulo`, `imagen`) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $cuerpo, $titulo, $imagenBinaria);

    // Intentar ejecutar la consulta
    if($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
} else {
    echo "error: no se cargó ninguna imagen.";
}

$con->close();
?>