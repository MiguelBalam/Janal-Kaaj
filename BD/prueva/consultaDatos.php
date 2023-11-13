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

$codigoBusqueda = '';

// Verificar si se proporcionó un código para la búsqueda
if (isset($_GET['codigo_busqueda'])) {
    $codigoBusqueda = $_GET['codigo_busqueda'];

    // Consultar en vista_personalizada
    $sqlBusquedaInse = "SELECT * FROM vista_inseAlimentaria  WHERE codigo = '$codigoBusqueda'";
    $queryBusquedaInse = mysqli_query($con, $sqlBusquedaInse);

    // Consultar en vista_encuestaMiel
    $sqlBusquedaEncuestaMiel = "SELECT * FROM vista_enMieles WHERE codigo = '$codigoBusqueda'";
    $queryBusquedaEncuestaMiel = mysqli_query($con, $sqlBusquedaEncuestaMiel);

    // Consultar en vista_encuestaMiel
    $sqlBusquedaEncuestaTextil = "SELECT * FROM vista_enTextiles WHERE codigo = '$codigoBusqueda'";
    $queryBusquedaEncuestaTextil = mysqli_query($con, $sqlBusquedaEncuestaTextil);

        // Consultar en vista_encuestaMAiz
        $sqlBusquedaEncuestaMaiz = "SELECT * FROM vista_Maiz WHERE codigo = '$codigoBusqueda'";
        $queryBusquedaEncuestaMaiz = mysqli_query($con, $sqlBusquedaEncuestaMaiz);

    // Verificar en cuál de las vistas se encontró el código
    if (mysqli_num_rows($queryBusquedaInse) > 0) {
        $resultados = mysqli_fetch_all($queryBusquedaInse, MYSQLI_ASSOC);
        $vistaUtilizada = 'vista_inseAlimen';
    } elseif (mysqli_num_rows($queryBusquedaEncuestaMiel) > 0) {
        $resultados = mysqli_fetch_all($queryBusquedaEncuestaMiel, MYSQLI_ASSOC);
        $vistaUtilizada = 'vista_encuestaMiel';
    } elseif ($queryBusquedaEncuestaTextil && mysqli_num_rows($queryBusquedaEncuestaTextil) > 0) {
        $resultados = mysqli_fetch_all($queryBusquedaEncuestaTextil, MYSQLI_ASSOC);
        $vistaUtilizada = 'vista_enTextil';
    } elseif ($queryBusquedaEncuestaMaiz && mysqli_num_rows($queryBusquedaEncuestaMaiz) > 0) {
        $resultados = mysqli_fetch_all($queryBusquedaEncuestaMaiz, MYSQLI_ASSOC);
        $vistaUtilizada = 'vista_Maiz';
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

    <link rel="stylesheet" href="../../node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
    <script src="../../node_modules/sweetalert2/dist/sweetalert2.all.js"></script>

    <!-- Boxiocns CDN Link -->
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>


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
                <a href="/pestanas_Encuestador/dashboard.html">
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
                    <a href="../../pestanas_Encuestador/crear_Evariables.html" > <!-- Llamamos a showAlert con el argumento 'variables' -->
                        <i class='bx bx-file-blank'></i>
                        <span class="link_name">Crear variables</span>
                    </a>
                    <ul class="sub-menu blank">
                        <a class="link_name" href="../../pestanas_Encuestador/crear_Evariables.html">Crear variables</a>
                    </ul>
                </div>
            </li>

            <li>
                <div class="iocn-link">
                    <a href="../../pestanas_Encuestador/crear.html" > <!-- Llamamos a showAlert con el argumento 'reactivos' -->
                        <i class='bx bx-file-blank'></i>
                        <span class="link_name">Crear reactivos</span>
                    </a>
                </div>
                <ul class="sub-menu blank">
                    <a class="link_name" href="../../pestanas_Encuestador/crear.html" >Crear reactivos</a>
                </ul>
            </li>

            <li>
                <a id="pruebaApli" href="/pestanas_Encuestado/Aplicador.html" onclick="redireccionarConUserId()">
                    <i class='bx bx-book-add'></i>
                    <span class="link_name">Alta Aplicadores</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/pestanas_Encuestado/Aplicador.html">Alta Aplicadores</a></li>
                </ul>
            </li>

            <li>
                <a href="/pestanas_Encuestado/asignarE.php">
                    <i class='bx bxs-user-check'></i>
                    <span class="link_name">Asignar</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/pestanas_Encuestado/asignarE.php">Asignar</a></li>
                </ul>
            </li>

            <li>
                <a href="/BD/prueva/consultaDatos.php">
                    <i class='bx bx-clipboard bx-tada'></i>
                    <span class="link_name">Encuestas aplicadas</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="../BD/prueva/consultaDatos.php">Encuestas aplicadas</a></li>
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
                <a href="/pestanas_Encuestador/perfil_Encuestador.html">
                    <i class='bx bx-user'></i>
                    <span class="link_name">Perfil</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/pestanas_Encuestador/perfil_Encuestador.html">Perfil</a></li>
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
            <span class="text">Dashboard</span>
        </div>
        <!-- Fin Dashboard -->
        <script>
      document.addEventListener('DOMContentLoaded', function() {
        //var userId = localStorage.getItem('user_id');
        var userID = localStorage.getItem('user_id'); // Obtener el ID almacenado
        var userCorreo = localStorage.getItem('user_correo');
        if (userID) {
          // Enviar una solicitud AJAX para recuperar los datos del usuario por su ID
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/BD/infoUser.php?id=' + userID, true);

          xhr.onreadystatechange = function() {
            console.log(xhr.responseText);
            if (xhr.readyState === 4 && xhr.status === 200) {
              try {
                var userInfo = JSON.parse(xhr.responseText);
                console.log(userInfo)
                if (userInfo && userInfo.error) {
                  console.error('Error obteniendo información del usuario:', userInfo.error);
                } else {
                  document.getElementById('aqui').value = userCorreo;

                }
              } catch (error) {
                console.error('Error al analizar la respuesta JSON:', error);
              }
            } else {
              console.error('Error en la solicitud AJAX para obtener información del usuario.');
            }
          }
        };
        xhr.send();

        verificar()
      })
      //para enviar el id a agregar aplicador 
      function redireccionarConUserId() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `/pestanas_Encuestado/Aplicador.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '/pestanas_Encuestado/Aplicador.php';
        }
      }

      function redireccionarConUserId2() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `/BD/prueva/graficasELCSA.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '/BD/prueva/graficasELCSA.php';
        }
      }

      function redireccionarConUserId3() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `/BD/prueva/graficasELCSAClasi.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '/BD/prueva/graficasELCSAClasi.php';
        }
      }
    </script>
        <section class="container-fluid d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-10 p-3 shadow-lg mb-5 bg-white rounded">

                <div class="container">
                    <div class="row justify-content-center mb-3">
                        <div class="col-12">
                            <h3 class="text-center mb-4">Encuestas aplicadas</h3>
                        </div>
                        <div class="col-sm-6 col-md-4 text-center mb-2">
                            <form method="get" action="">
                                <label class="col-form-label px-4 text-center">Ingrese el Código:</label>
                        </div>
                        <div class="col-sm-6 col-md-4 mb-2">
                            <input type="text" name="codigo_busqueda" class="form-control" placeholder="Código" aria-label="Código" required>
                        </div>
                        <div class="col-12 col-sm-12 col-md-4 mb-2 text-center">
                            <button type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Buscar</button>
                        </div>
                        </form>
                    </div>
                </div>


                <!-- Mostrar códigos únicos -->

                <div class="table-responsive" class="table-responsive" id="tablaCodigos">
                    <h2>Encuestas Aplicadas</h2>
                    <table class="table table-striped table-bordered" id="encuestasTable" class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre del encuestado</th>
                                <th>Aplicador</th>
                                <th>Localidad</th>
                                <th>Tipo de Encuesta</th>
                                <th>Visualización</th>
                                <th>Descargas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $sqlCodigos = "SELECT codigo, nombre, localidad, aplicador FROM vista_inseAlimentaria  GROUP BY codigo HAVING COUNT(*) > 1";
                            $queryCodigos = mysqli_query($con, $sqlCodigos);

                            $sqlCodigoss = "SELECT codigo, nombre, localidad, aplicador FROM vista_enMieles GROUP BY codigo HAVING COUNT(*) > 1";
                            $queryCodigoss = mysqli_query($con, $sqlCodigoss);

                            $sqlCodigosss = "SELECT codigo, nombre, localidad, aplicador FROM vista_enTextiles GROUP BY codigo HAVING COUNT(*) > 1";
                            $queryCodigosss = mysqli_query($con, $sqlCodigosss);

                            $sqlCodigossss = "SELECT codigo, nombre, localidad, aplicador FROM vista_Maiz GROUP BY codigo HAVING COUNT(*) > 1";
                            $queryCodigossss = mysqli_query($con, $sqlCodigossss);

                            while ($row = mysqli_fetch_assoc($queryCodigos)) {
                                echo '<td>' . $row['codigo'] . '</td>
                                        <td>' . $row['nombre'] . '</td>
                                        <td>' . $row['aplicador'] . '</td>
                                        <td>' . $row['localidad'] . '</td>
                                        <td>Encuesta Pública de Inseguridad alimantaria</td>
                                        <td>
                                        <form method="get" action="">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="ver-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Ver Encuesta</button>
                                        </form>
                                        </td>
                            
                                        <td>
                                        <form method="post" action="descargar_excel.php">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="descargar-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar</button>
                                        </form>
                                        </td>
                                        </tr>';
                            }

                            while ($row = mysqli_fetch_assoc($queryCodigoss)) {
                                echo '<td>' . $row['codigo'] . '</td>
                                        <td>' . $row['nombre'] . '</td>
                                        <td>' . $row['aplicador'] . '</td>
                                        <td>' . $row['localidad'] . '</td>
                                        <td>Encuesta Pública de Miel</td>
                                        <td>
                                        <form method="get" action="">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="ver-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Ver Encuesta</button>
                                        </form>
                                        </td>
            
                                        <td>
                                        <form method="post" action="descargar_excel.php">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="descargar-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar</button>
                                        </form>
                                        </td>
                                        </tr>';
                            }

                            while ($row = mysqli_fetch_assoc($queryCodigosss)) {
                                echo '<td>' . $row['codigo'] . '</td>
                                        <td>' . $row['nombre'] . '</td>
                                        <td>' . $row['aplicador'] . '</td>
                                        <td>' . $row['localidad'] . '</td>
                                        <td>Encuesta Pública de Textil</td>
                                        <td>
                                        <form method="get" action="">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="ver-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Ver Encuesta</button>
                                        </form>
                                        </td>
                            
                                        <td>
                                        <form method="post" action="descargar_excel.php">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="descargar-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar</button>
                                        </form>
                                        </td>
                                        </tr>';
                            }

                            while ($row = mysqli_fetch_assoc($queryCodigossss)) {
                                echo '<td>' . $row['codigo'] . '</td>
                                        <td>' . $row['nombre'] . '</td>
                                        <td>' . $row['aplicador'] . '</td>
                                        <td>' . $row['localidad'] . '</td>
                                        <td>Encuesta Pública de Maiz</td>
                                        <td>
                                        <form method="get" action="">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="ver-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Ver Encuesta</button>
                                        </form>
                                        </td>
                            
                                        <td>
                                        <form method="post" action="descargar_excel.php">
                                        <input type="hidden" name="codigo_busqueda" value="' . $row['codigo'] . '">
                                        <button type="submit" class="descargar-encuesta-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar</button>
                                        </form>
                                        </td>
                                        </tr>';
                            }

                            ?>
                        </tbody>

                    </table>
                </div>


                <?php if (!empty($resultados)) { ?>
                    <div id="resultadosBusqueda" style="display: none;">
                        <h2>Visualizacíon de la encuesta</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre del encuestado</th>
                                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['nombre']; ?></td>
                                </tr>
                            </thead>

                            <thead>
                                <tr>
                                    <th>Nombre del Aplicador</th>
                                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['aplicador']; ?></td>
                                </tr>
                            </thead>

                            <thead>
                                <tr>
                                    <th>Localidad</th>
                                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['localidad']; ?></td>
                                </tr>
                            </thead>

                            <thead>
                                <tr>
                                    <th>Género</th>
                                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['genero']; ?></td>
                                </tr>
                            </thead>

                            <thead>
                                <tr>
                                    <th>Edad</th>
                                    <td rowspan="<?php echo count($resultados); ?>"><?php echo $resultados[0]['edad']; ?></td>
                                </tr>
                            </thead>
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

                        <div class="d-flex justify-content-center mt-3">
                            <button onclick="volverATablaCodigos()" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Volver la tabla de resultados</button>
                        </div>

                    </div>



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

<div id="opcionesDescarga" <?php if (!isset($resultados) || empty($resultados) && (!isset($_GET['codigo_busqueda']) || empty($_GET['codigo_busqueda']))) {
    echo 'style="display: none;"';
} ?>>
    <?php if (!empty($resultados)) { ?>
        <h2>Opciones: </h2>
        <!-- Botón para descargar en Excel -->
        <form method="post" action="descargar_excel.php">
            <input type="hidden" name="codigo_busqueda" value="<?php echo isset($_GET['codigo_busqueda']) ? $_GET['codigo_busqueda'] : ''; ?>">
            <button type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar Resultados en Excel</button>
        </form>

        <!-- Botón para descargar en PDF -->
        <form method="post" action="descarga_pdf.php">
            <input type="hidden" name="codigo_busqueda" value="<?php echo isset($_GET['codigo_busqueda']) ? $_GET['codigo_busqueda'] : ''; ?>">
            <button type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza">Descargar Resultados en PDF</button>
        </form>
    <?php } ?>
</div>

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
                <script>
                    function mostrarResultadosBusqueda() {
                        document.getElementById("tablaCodigos").style.display = "none";
                        document.getElementById("resultadosBusqueda").style.display = "block";
                        document.getElementById("opcionesDescarga").style.display = "block";
                    }

                    function volverATablaCodigos() {
                        document.getElementById("tablaCodigos").style.display = "block";
                        document.getElementById("resultadosBusqueda").style.display = "none";
                        document.getElementById("opcionesDescarga").style.display = "none";
                    }


                    // Lógica para mostrar los resultados de la búsqueda cuando se realiza una búsqueda exitosa
                    <?php if (!empty($resultados)) { ?>
                        mostrarResultadosBusqueda();
                    <?php } ?>
                </script>
                <script>
                    $(document).ready(function() {
                        $('#encuestasTable').DataTable({
                            paging: true, // Habilita la paginación
                            pageLength: 10, // Define el número de filas por página (ajusta según tus necesidades)
                            lengthChange: false, // Oculta la opción de cambiar el número de filas por página
                            searching: false, // Oculta la barra de búsqueda si no es necesaria
                            info: false, // Oculta la información de la página actual y total de páginas
                            dom: '<"row"<"col-md-6"l><"col-md-6"f>>tp',
                            language: {
                                paginate: {
                                    previous: 'Anterior', // Cambia el texto del botón "Anterior"
                                    next: 'Siguiente' // Cambia el texto del botón "Siguiente"
                                }
                            }
                        });
                    });
                </script>
            </div>
        </section>
    </section>
</body>

</html>