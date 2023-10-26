<?php

// Datos de conexión
$username = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

class Administrador {

    private $con;

    public function __construct($servername, $username, $password, $dbname) {
        $this->con = new mysqli($servername, $username, $password, $dbname);
        mysqli_set_charset($this->con, "utf8");
        
        if ($this->con->connect_error) {
            die("Conexión fallida: " . $this->con->connect_error);
        }
    }

    public function insertar($nombre, $apellido_paterno, $apellido_materno, $genero, $edad, $institucion, $correo, $telefono, $contrasena) {
        $hashedContrasenia = password_hash($contrasena, PASSWORD_DEFAULT);
        $stmt = $this->con->prepare("INSERT INTO Administrador (Nombre, Apellido_Paterno, Apellido_Materno, Genero, Edad, Institucion, correo, Telefono, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->bind_param("ssssissss", $nombre, $apellido_paterno, $apellido_materno, $genero, $edad, $institucion, $correo, $telefono, $hashedContrasenia);

        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

}

// Usando la clase
$admin = new Administrador($servername, $username, $password, $dbname);

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido_paterno = $_POST['apellido_paterno'];
    $apellido_materno = $_POST['apellido_materno'];
    $genero = $_POST['genero'];
    $edad = $_POST['edad'];
    $institucion = $_POST['institucion'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $contrasena = $_POST['contrasenia'];

    if($admin->insertar($nombre, $apellido_paterno, $apellido_materno, $genero, $edad, $institucion, $correo, $telefono, $contrasena)) {
        echo "Datos insertados con éxito";
    } else {
        echo "Error al insertar datos";
    }
}

?>
