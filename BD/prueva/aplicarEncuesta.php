<?php
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

if (isset($_POST['id_encuesta']) && $_POST['id_encuesta'] != "") {

    $id_encuesta = $_POST['id_encuesta'];
    // Cambiar estado de la encuesta (en este caso, cambiar a '1' para publicada)
    $query = "UPDATE encuestas SET estado = '1' WHERE id_encuesta = '$id_encuesta'";
    $resultado = $con->query($query);
     function obtenerEncuesta($id_encuesta) {
        global $con;
    
        $query_encuesta = "SELECT * FROM encuestas WHERE id_encuesta = $id_encuesta";
        $result_encuesta = $con->query($query_encuesta);
        $encuesta = $result_encuesta->fetch_assoc();
    
        $query_reactivos = "SELECT * FROM reactivosCreados WHERE id_reactivoC IN (SELECT id_reactivo FROM encuesta_FinalReactivos WHERE id_encuesta = $id_encuesta)";
        $result_reactivos = $con->query($query_reactivos);
        $reactivos = [];
        while ($row = $result_reactivos->fetch_assoc()) {
            $reactivos[] = $row;
        }
        // Verificar si se obtuvieron resultados de la consulta
        
        return ['encuesta' => $encuesta, 'reactivos' => $reactivos];
    }
    $datos_encuesta = obtenerEncuesta($id_encuesta);
    echo $datos_encuesta;
    echo "Estado de la encuesta cambiado correctamente";
    }
  
?>
