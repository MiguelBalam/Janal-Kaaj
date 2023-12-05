<?php
// Configuración de la base de datos
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    // Si hay un error de conexión, detiene la ejecución del script.
    // Puedes optar por registrar el error en un archivo de logs en lugar de mostrarlo.
    // die("Conexión fallida: " . $con->connect_error);
    die("Conexión fallida.");
}

if (isset($_POST['userId']) && is_numeric($_POST['userId'])) {
    $userId = $_POST['userId'];

    // Si la clave 'action' está presente, decidimos qué actualización realizar
    if (isset($_POST['action'])) {
        if ($_POST['action'] == 'updateData') {
            // Actualización de datos básicos
            $stmt = $con->prepare("UPDATE UsuariosEncuestador SET nombre=?, apellidoPaterno=?, apellidoMaterno=?, genero=?, edad=?, Telefono=? WHERE id_Autenticacion=?");
            $stmt->bind_param("sssssii", $_POST['nombre'], $_POST['apellidoPaterno'], $_POST['apellidoMaterno'], $_POST['genero'], $_POST['edad'], $_POST['telefono'], $userId);
            $stmt->execute();
            $stmt->close();
        } elseif ($_POST['action'] == 'updateLogo' && isset($_FILES['imagen'])) {
            // Actualización de imagen y procedencia
            $imagen_tmp = $_FILES['imagen']['tmp_name'];
            $imagen_content = file_get_contents($imagen_tmp); // Leer el contenido del archivo

            $stmt = $con->prepare("UPDATE UsuariosEncuestador SET logo=?, Procedencia=? WHERE id_Autenticacion=?");
            $stmt->bind_param("bss", $imagen_content, $_POST['Procedencia'], $userId);
            $stmt->send_long_data(0, $imagen_content); // Envía el contenido BLOB a la base de datos
            $stmt->execute();
            $stmt->close();
        }

        // Ahora, selecciona todos los datos del usuario para mostrar
        $stmt = $con->prepare("SELECT nombre, apellidoPaterno, genero, apellidoMaterno, edad, Telefono, logo, Procedencia FROM UsuariosEncuestador WHERE id_Autenticacion = ?");
        $stmt->bind_param("i", $userId);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            // Comentamos el siguiente bloque para que no muestre los resultados.
            /*
            while ($row = $result->fetch_assoc()) {
                // Procesa cada fila de resultados
                echo $row['nombre'] . " " . $row['apellidoPaterno'] . "<br>";
                echo "Imagen: " . $row['logo'] . "<br>"; // Cambio 'imagen' por 'logo' para coincidir con tu esquema de DB
                echo "Procedencia: " . $row['Procedencia'] . "<br>";
            }
            */
            $stmt->close();
        } else {
            // En lugar de mostrar el error, podrías optar por registrar el error en un archivo de logs.
            // echo "Error al ejecutar la consulta: " . $con->error;
            echo "Error al ejecutar la consulta.";
        }
    } else {
        // En lugar de mostrar el mensaje, podrías optar por registrar el error en un archivo de logs.
        // echo "Error: userId no válido o no proporcionado.";
        echo "Error en la solicitud.";
    }
} else {
    echo "Error: userId no proporcionado.";
}

$con->close();
?>