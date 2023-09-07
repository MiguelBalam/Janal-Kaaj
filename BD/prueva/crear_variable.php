<?php
// Conexión a la base de datos
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
// Obtener los datos enviados desde el cliente
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Nobre_Var = $_POST["Nobre_Var"];
    $Siglas = $_POST["Siglas"];
    $descripcion = $_POST["descripcion"];
  
            $sql = "INSERT INTO Variable (Nobre_Var, Siglas, descripcion) VALUES (?, ?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->bind_param("sss", $Nobre_Var, $Siglas, $descripcion);
            $stmt->execute();
            $stmt->close();

            echo "Reactivo guardado exitosamente.";
        } else {
            echo "Error al crear variable.";
        }

?>
