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
  
    $sql = "INSERT INTO VariableEncabezado (nombre_Var, sigla, descripcion) VALUES (?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sss", $Nobre_Var, $Siglas, $descripcion);
    
    $sql2 = "INSERT INTO Variable (Nobre_Var, Siglas, descripcion) VALUES (?, ?, ?)";
    $stmt2 = $con->prepare($sql2);
    $stmt2->bind_param("sss", $Nobre_Var, $Siglas, $descripcion);
    
    // Iniciar una transacción
    $con->begin_transaction();

    if ($stmt->execute() && $stmt2->execute()) {
        // Si las inserciones en ambas tablas tienen éxito, registrar la acción en RegistroVariables
        $id_variable = $stmt2->insert_id; // Obtener el ID de la variable insertada en Variable

        $sql3 = "INSERT INTO RegistroVariables (id_variable, Nobre_Var, FechaCreacion, FechaActualizacion) VALUES (?, ?, NOW(), NOW())";
        $stmt3 = $con->prepare($sql3);
        $stmt3->bind_param("is", $id_variable, $Nobre_Var);

        if ($stmt3->execute()) {
            // Confirmar la transacción si todo ha salido bien
            $con->commit();
            echo "Variable creada y registrada exitosamente.";
        } else {
            // Revertir la transacción si ocurre algún error
            $con->rollback();
            echo "Error al registrar la variable en RegistroVariables.";
        }
        
        $stmt3->close();
    } else {
        // Si alguna de las inserciones falla, revertir la transacción y mostrar un mensaje de error
        $con->rollback();
        echo "Error al crear variable.";
    }

    $stmt->close();
    $stmt2->close();
} else {
    echo "Error al crear variable.";
}

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $Nobre_Var = $_POST["Nobre_Var"];
//     $Siglas = $_POST["Siglas"];
//     $descripcion = $_POST["descripcion"];
  
//             $sql = "INSERT INTO VariableEncabezado (nombre_Var, sigla, descripcion) VALUES (?, ?, ?)";
//             $stmt = $con->prepare($sql);
//             $stmt->bind_param("sss", $Nobre_Var, $Siglas, $descripcion);
//             $stmt->execute();
//             $stmt->close();
//             $sql2 = "INSERT INTO Variable (Nobre_Var, Siglas, descripcion) VALUES (?, ?, ?)";
//             $stmt2 = $con->prepare($sql2);
//             $stmt2->bind_param("sss", $Nobre_Var, $Siglas, $descripcion);
//             $stmt2->execute();
//             $stmt2->close();
//             echo "Reactivo guardado exitosamente.";
//         } else {
//             echo "Error al crear variable.";
//         }

?>
