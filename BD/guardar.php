<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

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
    $imagen = $_FILES["imagen"]["name"];
    

    // Conexión a la base de datos
    $username  = "janalkaa_admin";
    $password = "janalkaaj2023";
    $servername= "162.241.60.169";
    $dbname = "janalkaa_kaaj";


    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
        $hashedContrasenia = password_hash($Contrasenia, PASSWORD_DEFAULT);
        // Insertar datos en la tabla UsuariosEncuestador
        $sql2 = "INSERT INTO Autenticacion (correo, contraseña) VALUES ('$correo', '$hashedContrasenia')";
        if ($conn->query($sql2) === TRUE) {
            // Obtener el ID autogenerado de la inserción en Autenticacion
            $idAutenticacion = $conn->insert_id;

            // Insertar datos en la tabla UsuariosEncuestador con la referencia al ID de autenticación
            $sql = "INSERT INTO UsuariosEncuestador (id_Autenticacion, nombre, apellidoPaterno, apellidoMaterno, genero, edad, Telefono, Procedencia, logo)
                    VALUES ('$idAutenticacion', '$nombre', '$apellidoPaterno', '$apellidoMaterno', '$genero', '$edad', '$tel', '$procedencia', '$imagen')";

            if ($conn->query($sql) === TRUE) {
                echo "Datos registrados correctamente";
                header("Location: http://localhost:3000/login.html");
                exit;
            } else {
                echo "Error en la inserción en la tabla UsuariosEncuestador: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Error en la inserción en la tabla Autenticacion: " . $sql2 . "<br>" . $conn->error;
        }
        // Cerrar la conexión
        $conn->close();
    }
    ob_end_flush();
    ?>
