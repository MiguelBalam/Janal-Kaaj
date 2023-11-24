<?php
// Conexión a la base de datos (debes configurarla según tus credenciales)
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
$id_variable = $_POST['id_variable'];
$nuevoValorReactivoCre = $_POST['nuevoValorReactivoCre'];
$nuevoValorCategoriaReactivos = $_POST['nuevoValorCategoriaReactivos'];
$nuevoValorTipoRes = $_POST['nuevoValorTipoRes'];

// Actualizar la tabla 'variable'
$queryVariable = "UPDATE Variable
                 SET Nobre_Var = ?, Siglas = ?, descripcion = ?
                 WHERE id_variable = ?";
$stmtVariable = $con->prepare($queryVariable);
$stmtVariable->bind_param("sssi", $nuevoValorReactivoCre, $nuevoValorCategoriaReactivos, $nuevoValorTipoRes, $id_variable);

// Actualizar la tabla 'variablesencabezaso' (si es necesario)
$queryVariablesEncabezaso = "UPDATE VariableEncabezado
                             SET nombre_Var = ?, sigla = ?, descripcion = ?
                             WHERE id_variableE = ?";
$stmtVariablesEncabezaso = $con->prepare($queryVariablesEncabezaso);
$stmtVariablesEncabezaso->bind_param("sssi",$nuevoValorReactivoCre, $nuevoValorCategoriaReactivos, $nuevoValorTipoRes, $id_variable);

// Actualizar la tabla 'registrovariables' (si es necesario)
$queryRegistroVariables = "UPDATE RegistroVariables
                          SET Nobre_Var = ?
                          WHERE id_variable = ?";
$stmtRegistroVariables = $con->prepare($queryRegistroVariables);
$stmtRegistroVariables->bind_param("ss", $nuevoValorReactivoCre, $id_variable);

// Ejecutar las actualizaciones
$actualizacionVariable = $stmtVariable->execute();
$actualizacionVariablesEncabezaso = $stmtVariablesEncabezaso->execute();
$actualizacionRegistroVariables = $stmtRegistroVariables->execute();

if ($actualizacionVariable && $actualizacionVariablesEncabezaso && $actualizacionRegistroVariables) {
    echo "Actualización exitosa";
} else {
    echo "Error en la actualización";
}

// Cerrar las conexiones y liberar los recursos
$stmtVariable->close();
$stmtVariablesEncabezaso->close();
$stmtRegistroVariables->close();
$con->close();
?>