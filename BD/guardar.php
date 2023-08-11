<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombre = $_POST["nombrecompletos"];
    $apellidoPaterno = $_POST["apellidopaterno"];
    $apellidoMaterno = $_POST["apellidomaterno"];
    $genero = $_POST["inlineRadioOptions"];
    $edad = $_POST["edad"];
    $imagen = $_POST["imagen"];
    $procedencia = $_POST["procedencia"];
    $Correo = $_POST["Correo"];
    $tel = $_POST["tel"];
    $Contrasenia = $_POST["Contrasenia"];
    $Contrasenia2 = $_POST["Contrasenia2"];
    // Obtener más datos aquí

    // Conexión a la base de datos (cambia los valores según tu configuración)
    $usuario  = "janalkaa_admin";
    $password = "janalkaaj2023";
    $servidor = "162.241.60.169";
    $basededatos = "janalkaa_kaaj";

    // Crear la conexión
    $conn = new mysqli($servidor, $usuario, $password, $basededatos);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO UsuariosEncuestador (nombre, apellidoPaterno, apellidoMaterno, genero, edad, Procedencia,logo,Telefono)
            VALUES ('$nombre', '$apellidoPaterno', '$apellidoMaterno', '$genero', '$edad', '$procedencia','$tel','$imagen')";
            if ($Contrasenia == $Contrasenia2) {
                // La contraseña coincide, procede a insertar en la base de datos
                $sql2 = "INSERT INTO Autenticasion (Correo, Contrasenia) VALUES ('$Correo', '$Contrasenia')";
            } else {
                // Las contraseñas no coinciden, mostrar un mensaje de error
                echo "Las contraseñas no coinciden";
            }
            

    if ($conn->query($sql) === TRUE) {
        echo "Datos registrados correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>
