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

$query = "SELECT id, cuerpo, titulo, imagen FROM Noticias"; // Selecciona todas las noticias

$result = $con->query($query);
$noticias = []; // Array para almacenar las noticias

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $noticia = [
            "id" => $row["id"],
            "cuerpo" => $row["cuerpo"],
            "titulo" => $row["titulo"],
            // Convierte los datos binarios a una cadena Base64 si es necesario
            "imagenBase64" => base64_encode($row["imagen"])
        ];
        array_push($noticias, $noticia);
    }
} else {
    echo "No se encontraron noticias.";
}

$con->close();
?>

<div>
    <?php foreach ($noticias as $noticia): ?>
        <div class="noticia">
            <h2><?php echo $noticia["titulo"]; ?></h2>
            <p><?php echo $noticia["cuerpo"]; ?></p>
            <?php if (!empty($noticia["imagenBase64"])): ?>
                <img src="data:image/jpeg;base64,<?php echo $noticia["imagenBase64"]; ?>" alt="Imagen Noticia">
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>
