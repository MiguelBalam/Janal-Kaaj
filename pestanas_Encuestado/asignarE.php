
<!DOCTYPE html>
<html>
<head>
    <title>Asignar Encuestas</title>
</head>
<body>
    <h1>Asignar Encuestas</h1>

    <form action="asignar_encuesta.php" method="post">
    <h2>Seleccionar Aplicador:</h2>
    <table>
        <thead>
            <tr>
                <th>Aplicador</th>
                <th>Seleccionar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Conexión a la base de datos (reemplaza con tus propios datos)
            $servername= "162.241.60.169";
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$dbname = "janalkaa_kaaj";
            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Conexión fallida: " . $conn->connect_error);
            }

            // Consulta SQL para obtener los nombres de los aplicadores desde la base de datos
            $sql = "SELECT correo FROM AutenticacionApli";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['correo'] . "</td>";
                    echo "<td><input type='checkbox' name='aplicadores[]' value='" . $row['correo'] . "'></td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='2'>No hay aplicadores disponibles</td></tr>";
            }

            $conn->close();
            ?>
        </tbody>
    </table>

    <h2>Seleccionar Encuestas:</h2>
    <table>
        <thead>
            <tr>
                <th>Encuesta</th>
                <th>Seleccionar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Conexión a la base de datos (reemplaza con tus propios datos)
            $servername= "162.241.60.169";
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$dbname = "janalkaa_kaaj";
            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Conexión fallida: " . $conn->connect_error);
            }

            // Consulta SQL para obtener los nombres de las encuestas desde la base de datos
            $sql = "SELECT id_encuesta, titulo FROM encuestas";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['titulo'] . "</td>";
                    echo "<td><input type='checkbox' name='encuestas[]' value='" . $row['id_encuesta'] . "'></td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='2'>No hay encuestas disponibles</td></tr>";
            }

            $conn->close();
            ?>
        </tbody>
    </table>

        <input type="submit" value="Asignar">
    </form>
    <div class="row mb-3">
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza" type="submit" id="boton-enviard" onclick="window.location.href='/pestanas_Encuestador/dashboard.html'">Guardar</button>
                    
                </div>
            </div>
</body>
</html>
