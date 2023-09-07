<?php
header('Content-Type: application/json');

// Obtener datos del usuario (correo y contraseña) desde la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);
$correo = $data['correo'];
$contrasenia = $data['contrasenia'];

// Consultar la contraseña hash almacenada en la base de datos MySQL
$query = 'SELECT contraseña FROM Autenticacion WHERE correo = ?';
$stmt = $mysqli->prepare($query);
$stmt->bind_param('s', $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashAlmacenado = $row['contraseña'];

    // Verificar la contraseña proporcionada por el usuario
    $isValidPassword = password_verify($contrasenia, $hashAlmacenado);

    echo json_encode(['valid' => $isValidPassword]);
} else {
    echo json_encode(['valid' => false]);
}

$stmt->close();
?>
