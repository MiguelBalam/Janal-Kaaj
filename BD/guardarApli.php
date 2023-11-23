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
    $userId = $_POST['userId'];;  
    

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
   
    // Cambia esto al valor real de $userId

  
    $consulta = "SELECT id FROM UsuariosEncuestador WHERE id_Autenticacion = $userId";
    

    // Ejecuta la consulta en la base de datos
    $resultado = $con->query($consulta);

    // Verifica si la consulta se ejecutó correctamente
    if ($resultado === false) {
        // Manejo de error, por ejemplo:
        echo "Error en la consulta: " . $con->error;
    } else {
        // Verifica si se encontró un registro en la tabla
        if ($resultado->num_rows > 0) {
            // Obtiene el ID correspondiente
            $fila = $resultado->fetch_assoc();
            $idCorrespondiente = $fila["id"];
            
            // Imprime el ID correspondiente en pantalla
            //echo "El ID correspondiente es: " . $idCorrespondiente;
        } else {
            // No se encontró ningún registro correspondiente en la tabla
           // echo "No se encontraron registros para el userId: " . $userId;
        }
    }

        // Insertar datos en la tabla UsuariosEncuestador
        $hashedContrasenia = password_hash($contraseña, PASSWORD_DEFAULT);

        $sql2 = "INSERT INTO AutenticacionApli (correo, contraseña) VALUES ('$correo', '$hashedContrasenia')";
        if ($con->query($sql2) === TRUE) {
            // Obtener el ID autogenerado de la inserción en Autenticacion
            $idAutenticacion = $con->insert_id;

            // Insertar datos en la tabla UsuariosEncuestador con la referencia al ID de autenticación
            $sql = "INSERT INTO AplicadoresDeEncuestas(id_Autenticacion, Nombre, ApellidoP, ApellidoM, id_Encuestador)
            VALUES ('$idAutenticacion', '$Nombre', '$ApellidoP', '$ApellidoM', '$idCorrespondiente')";

            if ($con->query($sql) === TRUE) {
               //echo "Datos registrados correctamente";
               $con->close();
           echo '<script type="text/javascript">
               setTimeout(function () {
                   window.location.href = "/pestanas_Encuestado/Aplicador.php?userId=' . $userId . '";
               }, 100); // 2000 milisegundos (2 segundos) antes de redireccionar
           </script>';
            } else {
                echo "Error en la inserción en la tabla AplicadoresDeEncuestas: " . $sql . "<br>" . $con->error;
            }
        } else {
            echo "Error en la inserción en la tabla AutenticacionApli: " . $sql2 . "<br>" . $con->error;
        }
        // // Cerrar la conexión
     
    }
   // ob_end_flush();
    ?>
