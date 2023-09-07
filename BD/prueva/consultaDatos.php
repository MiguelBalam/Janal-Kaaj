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
if (isset($_GET['codigo_respuestas_encuesta'])) {
    $codigoBusqueda = $_GET['codigo_respuestas_encuesta'];

    // Consultar registros con el código proporcionado
    $sqlBusqueda = "SELECT * FROM vista_encuesta WHERE `codigo_respuestas_encuesta = '$codigoBusqueda'";
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
    <link rel="stylesheet" href="../../BD/prueva/estilostabla.css">
    <link rel="stylesheet" href="../../CSS/styleDashboard.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../CSS/style.css">

    <link rel="stylesheet" href="../node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
    <script src="../node_modules/sweetalert2/dist/sweetalert2.all.js"></script>

    <!-- Boxiocns CDN Link -->
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

</head>

<body>

    <!-- Dashboard -->
    <div class="sidebar close">
        <div class="logo-details">
            <i class="bx seleccionador"></i>
            <span class="logo_name">Janal Kaaj</span>
        </div>


        <ul class="nav-links">
            <li>
                <a href="/pestañas_Encuestador/dashboard.html">
                    <i class="bx bx-grid-alt"></i>
                    <span class="link_name">Dashboard</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a href="" id="mostrarSeccion1">Dashboard</a></li>
                </ul>
            </li>


            <li>
                <a href="/login.html">
                    <i class='bx bx-home-alt'></i>
                    <span class="link_name">Login</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/login.html">Login</a></li>
                </ul>
            </li>



            <li>
                <div class="iocn-link">
                    <a href="#" onclick="showAlert('variables')"> <!-- Llamamos a showAlert con el argumento 'variables' -->
                        <i class='bx bx-file-blank'></i>
                        <span class="link_name">Crear variables</span>
                    </a>
                    <ul class="sub-menu blank">
                        <a class="link_name" href="#" onclick="showAlert('variables')">Crear variables</a>
                    </ul>
                </div>
            </li>

            <li>
                <div class="iocn-link">
                    <a href="#" onclick="showAlert('reactivos')"> <!-- Llamamos a showAlert con el argumento 'reactivos' -->
                        <i class='bx bx-file-blank'></i>
                        <span class="link_name">Crear reactivos</span>
                    </a>
                </div>
                <ul class="sub-menu blank">
                    <a class="link_name" href="#" onclick="showAlert('reactivos')">Crear reactivos</a>
                </ul>
            </li>


            <li>
                <a href="../BD/prueva/encuAplica.php">
                    <i class='bx bx-clipboard bx-tada'></i>
                    <span class="link_name">Encuestas aplicadas</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="../BD/prueva/encuAplica.php">Encuestas aplicadas</a></li>
                </ul>
            </li>

            <li>
                <a href="#">
                    <i class="bx bx-pie-chart-alt-2"></i>
                    <span class="link_name">Análisis</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Análisis</a></li>
                </ul>
            </li>


            <li>
                <a href="#">
                    <i class="bx bx-line-chart"></i>
                    <span class="link_name">Graficas</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Graficas</a></li>
                </ul>
            </li>

            <!-- <li>
        <a href="#">
          <i class="bx bx-cog"></i>
          <span class="link_name">Configuración</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Configuración</a></li>
        </ul>
      </li> -->


            <li>
                <a href="perfil_Encuestador.html">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Perfil</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="perfil_Encuestador.html">Perfil</a></li>
                </ul>
            </li>

            <!-- Cerrar cesion -->
            <li id="cerrarSesionBtnContainer">
                <a href="#" id="cerrarSesionBtn" onclick="confirmarCerrarSesion()">
                    <i class="bx bx-log-out"></i>
                    <span class="link_name">Cerrar Sesión</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="#" onclick="confirmarCerrarSesion()">Cerrar Sesión</a></li>

                </ul>
            </li>
        </ul>
    </div>

    <section class="home-section">
        <div class="home-content">
            <i class="bx bx-menu"></i>
            <span class="text">Encuestas aplicadas</span>
        </div>
        <!-- Fin Dashboard -->
        <section class="d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-10 p-3 shadow-lg mb-5 bg-white rounded">
                <h1>Buscar Resultados de Encuesta por Código</h1>
                <form method="get" action="">
                    <label for="codigo_busqueda">Ingrese el Código: </label>
                    <input type="text" name="codigo_busqueda" required>
                    <button type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Buscar</button>
                </form>

                <!-- Mostrar códigos únicos -->
                
                <table>
                    <thead>
                        <tr>
                            <th>Código de la encuesta aplicada</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sqlCodigos = "SELECT DISTINCT codigo_respuestas_encuesta FROM vista_encuesta";
                        $queryCodigos = mysqli_query($con, $sqlCodigos);

                        while ($codigo = mysqli_fetch_assoc($queryCodigos)) {
                            echo '<tr><td>' . $codigo['codigo_respuestas_encuesta'] . '</td></tr>';
                        }
                        ?>
                    </tbody>
                </table>

                <?php if (!empty($resultados)) { ?>

                    <table>
                        <h2>Resultados de la Búsqueda:</h2>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['codigo_respuestas_encuesta']; ?></td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>Fecha de Creación</th>
                                <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['fecha_creacion_respuestas_encuesta']; ?></td>
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
                                    <td><?php echo $resultado['descripcion_reactivos']; ?></td>
                                    <td><?php echo $resultado['respuesta_respuestas_encuesta']; ?></td>
                                    <?php if ($index > 0) { ?>
                                    </tr>
                                <?php } ?>
                            <?php } ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Observación</th>
                                <td><?php echo $resultados[0]['observacion_respuestas_encuesta']; ?></td>
                            </tr>
                        </tfoot>
                    </table>



                <?php } elseif (isset($_GET['codigo_respuestas_encuesta'])) { ?>
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
                    <h2>Opciones de descarga:</h2>
                    <table>
                        <!-- ... Tu tabla de resultados existente ... -->
                    </table>

                    <!-- Agregar botón de descarga -->
                    <form method="post" action="descargar_excel.php">
                        <input type="hidden" name="codigo_respuestas_encuesta" value="<?php echo $codigoBusqueda; ?>">
                        <button type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar Resultados en Excel</button>
                    </form>
                <?php } elseif (isset($_GET['codigo_respuestas_encuesta'])) { ?>
                    <!-- ... Tu script de error existente ... -->
                <?php } ?>
        </section>
        </div>
    </section>
    <script>
        // Guardar el estado de la barra lateral en el localStorage
        function saveSidebarState(state) {
            localStorage.setItem('sidebarState', state);
        }

        // Cargar el estado de la barra lateral del localStorage
        function loadSidebarState() {
            return localStorage.getItem('sidebarState') || 'expanded'; // Valor predeterminado: expandido
        }

        let arrow = document.querySelectorAll('.arrow');
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener('click', (e) => {
                let arrowParent = e.target.parentElement.parentElement; // seleccionar el elemento principal padre de la flecha
                arrowParent.classList.toggle('showMenu');
            });
        }

        let sidebar = document.querySelector('.sidebar');
        let sidebarBtn = document.querySelector('.bx-menu');
        console.log(sidebarBtn);

        // Aplicar el estado almacenado al cargar la página
        window.addEventListener('DOMContentLoaded', () => {
            const initialState = loadSidebarState();
            if (window.innerWidth <= 400) {
                // Si el ancho de la ventana es menor o igual a 400px (dispositivo móvil),
                // siempre oculta la barra lateral en la carga inicial.
                sidebar.classList.add('close');
                saveSidebarState('collapsed'); // Guarda el estado colapsado en el almacenamiento local
            } else {
                sidebar.classList.toggle('close', initialState === 'collapsed');
            }
        });

        sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('close');
            const newState = sidebar.classList.contains('close') ? 'collapsed' : 'expanded';
            saveSidebarState(newState);
        });
    </script>



    <script src = "../../BD/prueva/encuesta.js"></script>
    <script src = "../../CSS/SweetAlert.js"></script>
</body>

</html>
