<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombre = $_POST["nombrecompletos"];
    $apellidoPaterno = $_POST["apellidopaterno"];
    $apellidoMaterno = $_POST["apellidomaterno"];
    $genero = $_POST["genero"];
    $edad = $_POST["edad"];
    $localidad = $_POST["localidad"];
    $municipio = $_POST["municipio"];
    $estado = $_POST["estado"];
    $ciudad = $_POST["ciudad"];
    $correo = $_POST["Email-encuestado"];
    $tel = $_POST["tel-encuestado"];
    $Contrasenia = $_POST["contra-encuestado"];
    $confirmarContrasenia = $_POST["contra-encuestado2"];

    // Check if passwords match
    if ($Contrasenia !== $confirmarContrasenia) {
        echo "Las contraseñas no coinciden.";
        exit;
    }

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

    $sql2 = "INSERT INTO Encuestado_A (correo, contraseña) VALUES ('$correo', '$hashedContrasenia')";
    if ($conn->query($sql2) === TRUE) {
        $idAutenticacion = $conn->insert_id;

        // Insertar datos en la tabla UsuariosEncuestador con la referencia al ID de autenticación
        $sql = "INSERT INTO UsuarioEncuestado (id_Encuestado, nombre, apellidoPaterno, apellidoMaterno, edad, genero, localidad, municipio, estado, pais, Telefono)
        VALUES ('$idAutenticacion', '$nombre', '$apellidoPaterno', '$apellidoMaterno', '$edad', '$genero', '$localidad', '$municipio', '$estado', '$ciudad', '$tel')";


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
