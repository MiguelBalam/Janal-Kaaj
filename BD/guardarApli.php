<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $correo = $_POST["Correo"];
    $contraseña = $_POST["Contrasenia"];
    $Nombre = $_POST["nombrecompletos"];
    $ApellidoP = $_POST["apellidopaterno"];
    $ApellidoM = $_POST["apellidomaterno"];

    

    // Conexión a la base de datos
    $username  = "janalkaa_admin";
    $password = "janalkaaj2023";
    $servername= "162.241.60.169";
    $dbname = "janalkaa_kaaj";


    $con = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($con->connect_error) {
        die("Conexión fallida: " . $con->connect_error);
    }
        // Insertar datos en la tabla UsuariosEncuestador
        $hashedContrasenia = password_hash($contraseña, PASSWORD_DEFAULT);

        $sql2 = "INSERT INTO AutenticacionApli (correo, contraseña) VALUES ('$correo', '$hashedContrasenia')";
        if ($con->query($sql2) === TRUE) {
            // Obtener el ID autogenerado de la inserción en Autenticacion
            $idAutenticacion = $con->insert_id;

            // Insertar datos en la tabla UsuariosEncuestador con la referencia al ID de autenticación
            $sql = "INSERT INTO AplicadoresDeEncuestas(id_Autenticacion, Nombre, ApellidoP, ApellidoM)
                    VALUES ('$idAutenticacion', '$Nombre', '$ApellidoP', '$ApellidoM')";

            if ($con->query($sql) === TRUE) {
                echo "Datos registrados correctamente";
            } else {
                echo "Error en la inserción en la tabla AplicadoresDeEncuestas: " . $sql . "<br>" . $con->error;
            }
        } else {
            echo "Error en la inserción en la tabla AutenticacionApli: " . $sql2 . "<br>" . $con->error;
        }
        // Cerrar la conexión
        $con->close();
    }
    ob_end_flush();
    ?>
