<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();
$username  = "janalkaa_admin";
    $password = "janalkaaj2023";
    $servername= "162.241.60.169";
    $dbname = "janalkaa_kaaj";


    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Conexión a la base de datos
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Recibir los datos del formulario
        $correo = $_POST["correo"];
        $Contrasenia = $_POST["Contrasenia"];
        $nombre = $_POST["nombrecompletos"];
        $apellidoPaterno = $_POST["apellidopaterno"];
        $apellidoMaterno = $_POST["apellidomaterno"];
        $genero = $_POST["genero"];
        $edad = $_POST["edad"];
        $tel = $_POST["tel"];
        $procedencia = $_POST["procedencia"];
        $imagen = $_FILES["imagen"];
    
        // Verificar si la imagen se cargó correctamente
        if ($imagen["error"] !== UPLOAD_ERR_OK) {
            echo "Error al cargar la imagen: " . $imagen["error"];
            exit;
        }
    
        // Conexión a la base de datos
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        // Verificar la conexión
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }
    
        $hashedContrasenia = password_hash($Contrasenia, PASSWORD_DEFAULT);
    
        $sql2 = "INSERT INTO Autenticacion (correo, contraseña) VALUES (?, ?)";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("ss", $correo, $hashedContrasenia);
    
        if ($stmt2->execute()) {
            $idAutenticacion = $conn->insert_id;
    
            // Insertar datos en la tabla UsuariosEncuestador con la referencia al ID de autenticación
            $sql = "INSERT INTO UsuariosEncuestador (id_Autenticacion, nombre, apellidoPaterno, apellidoMaterno, genero, edad, Telefono, Procedencia, logo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
    
            // Obtener el contenido binario de la imagen
            $imagenBinaria = file_get_contents($imagen["tmp_name"]);
    
            // Vincular los parámetros
            $stmt->bind_param("issssiiss", $idAutenticacion, $nombre, $apellidoPaterno, $apellidoMaterno, $genero, $edad, $tel, $procedencia, $imagenBinaria);
    
            if ($stmt->execute()) {
                echo "Datos registrados correctamente";
            } else {
                echo "Error en la inserción en la tabla UsuariosEncuestador: " . $stmt->error;
            }
    
            // Cerrar la conexión
            $stmt->close();
        } else {
            echo "Error en la inserción en la tabla Autenticacion: " . $stmt2->error;
        }
    
        // Cerrar la conexión
        $stmt2->close();
        $conn->close();
    }
    ob_end_flush();
    ?>
