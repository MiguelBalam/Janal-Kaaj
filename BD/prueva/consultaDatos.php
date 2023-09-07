<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

$resultados = array();
$codigoBusqueda = '';

// Verificar si se proporcionó un código para la búsqueda
if (isset($_GET['codigo_busqueda'])) {
    $codigoBusqueda = $_GET['codigo_busqueda'];

    // Consultar registros con el código proporcionado
    $sqlBusqueda = "SELECT * FROM vista_encuesta WHERE codigo = '$codigoBusqueda'";
    $queryBusqueda = mysqli_query($con, $sqlBusqueda);

    // Verificar si se obtuvieron resultados de la consulta
    if (mysqli_num_rows($queryBusqueda) > 0) {
        $resultados = mysqli_fetch_all($queryBusqueda, MYSQLI_ASSOC);
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Resultados de Encuesta</title>
    <link rel="stylesheet" href="/BD/prueva/estilostabla.css">
    <link rel="stylesheet" href="/BD/node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
    <script src="/BD/node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
</head>

<body>
    <h1>Buscar Resultados de Encuesta por Código</h1>
    <form method="get" action="">
        <label for="codigo_busqueda">Ingrese el Código: </label>
        <input type="text" name="codigo_busqueda" required>
        <button type="submit">Buscar</button>
    </form>

    <!-- Mostrar códigos únicos -->
    <h2>Códigos de Encuestas Aplicadas:</h2>
    <table>
        <thead>
            <tr>
                <th>Código de la encuesta aplicada</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $sqlCodigos = "SELECT DISTINCT codigo FROM vista_encuesta";
            $queryCodigos = mysqli_query($con, $sqlCodigos);

            while ($codigo = mysqli_fetch_assoc($queryCodigos)) {
                echo '<tr><td>' . $codigo['codigo'] . '</td></tr>';
            }
            ?>
        </tbody>
    </table>

    <?php if (!empty($resultados)) { ?>
        <h2>Resultados de la Búsqueda:</h2>
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['codigo']; ?></td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>Fecha de Creación</th>
                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['created']; ?></td>
                </tr>
            </thead>
            <tbody>
                <thead>
                    <tr>
                        <th>Preguntas</th>
                        <th>Respuestas</th>
                    </tr>
                </thead>
                <?php foreach ($resultados as $index => $resultado) { ?>
                    <?php if ($index > 0) { ?>
                        <tr>
                        <?php } ?>
                        <td><?php echo $resultado['descripcion']; ?></td>
                        <td><?php echo $resultado['respuesta']; ?></td>
                        <?php if ($index > 0) { ?>
                        </tr>
                    <?php } ?>
                <?php } ?>
            </tbody>
            <tfoot>
                <tr>
                    <th>Observación</th>
                    <td><?php echo $resultados[0]['observacion']; ?></td>
                </tr>
            </tfoot>
        </table>



    <?php } elseif (isset($_GET['codigo_busqueda'])) { ?>
        <script>
            Swal.fire({
                icon: 'error',
                title: 'Código No Encontrado',
                text: 'El código ingresado no existe en la tabla de resultados.',
                confirmButtonColor: '#218838'
            });
        </script>
    <?php } ?>

    <?php if (!empty($resultados)) { ?>
        <h2>Resultados de la Búsqueda:</h2>
        <table>
            <!-- ... Tu tabla de resultados existente ... -->
        </table>

        <!-- Agregar botón de descarga -->
        <form method="post" action="descargar_excel.php">
            <input type="hidden" name="codigo_busqueda" value="<?php echo $codigoBusqueda; ?>">
            <button type="submit">Descargar Resultados en Excel</button>
        </form>
    <?php } elseif (isset($_GET['codigo_busqueda'])) { ?>
        <!-- ... Tu script de error existente ... -->
    <?php } ?>

</body>

</html>

<?php
 
?>