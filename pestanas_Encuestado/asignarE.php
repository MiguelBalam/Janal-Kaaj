<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Asignar Encuestas</title>
    <link rel="stylesheet" href="../CSS/styleDashboard.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../CSS/style.css">

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
                <a href="/pestanas_Encuestador/dashboard.html">
                    <i class="bx bx-grid-alt"></i>
                    <span class="link_name">Dashboard</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a href="/pestanas_Encuestador/dashboard.html" id="mostrarSeccion1">Dashboard</a></li>
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
                    <a href="/pestanas_Encuestador/crear_Evariables.html" > <!-- Llamamos a showAlert con el argumento 'variables' -->
                        <i class='bx bx-file-blank'></i>
                        <span class="link_name">Crear variables</span>
                    </a>
                    <ul class="sub-menu blank">
                        <a class="link_name" href="/pestanas_Encuestador/crear_Evariables.html" >Crear variables</a>
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
<<<<<<< HEAD
                <a onclick="redireccionarConUserId()">
=======
                <a href="/pestanas_Encuestado/Aplicador.php">
>>>>>>> 15ba326ff04ffd668fbb9a2ce55c1ca82a7800e0
                    <i class='bx bx-book-add'></i>
                    <span class="link_name">Alta Aplicadores</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/pestanas_Encuestado/Aplicador.php">Alta Aplicadores</a></li>
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
                <a href="../BD/prueva/consultaDatos.php">
                    <i class='bx bx-clipboard bx-tada'></i>
                    <span class="link_name">Encuestas aplicadas</span>
                </a>
                <ul class="sub-menu blank">
                    <li><a class="link_name" href="../BD/prueva/consultaDatos.php">Encuestas aplicadas</a></li>
                </ul>
            </li>

            <li>
<<<<<<< HEAD
                <a onclick="redireccionarConUserId2()">
=======
                <a href="../BD/prueva/graficasELCSA.php" onclick="redireccionarConUserId2()">
>>>>>>> 15ba326ff04ffd668fbb9a2ce55c1ca82a7800e0
                  <i class="bx bx-pie-chart-alt-2"></i>
                  <span class="link_name">Análisis</span>
                </a>
                <ul class="sub-menu blank">
                  <li><a class="link_name" href="../BD/prueva/graficasELCSA.php">Análisis</a></li>
                </ul>
              </li>
        
        
              <li>
                <a onclick="redireccionarConUserId3()">
                  <i class="bx bx-line-chart"></i>
                  <span class="link_name">Graficas</span>
                </a>
                <ul class="sub-menu blank">
                  <li><a class="link_name" href="../BD/prueva/graficasELCSAClasi.php">Graficas</a></li>
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
                    <i class="bx bx-user"></i>
                    <span class="link_name">Perfil</span>
                </a>
                <ul class="sub-menu blank">
                    <li>
                        <a class="link_name" href="/pestanas_Encuestador/perfil_Encuestador.html">Perfil</a>
                    </li>
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
            <span class="text">Asignar Encuestas</span>
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
          var urlConUserId = `../BD/prueva/graficasELCSA.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '../BD/prueva/graficasELCSA.php';
        }
      }

      function redireccionarConUserId3() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `../BD/prueva/graficasELCSAClasi.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '../BD/prueva/graficasELCSAClasi.php';
        }
      }
    </script>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 p-4 shadow-lg bg-light rounded ">
                    <form action="asignar_encuesta.php" method="post">
                    <div class="table-responsive">
                        <h2>Seleccionar Aplicador:</h2>
                        <table class="table table-striped table-bordered table-sm">
    <thead class="thead-dark">
        <tr>
            <th>Aplicador</th>
            <th>Seleccionar</th>
        </tr>
    </thead>
    <tbody>
        <?php
        // Conexión a la base de datos (reemplaza con tus propios datos)
        $servername = "162.241.60.169";
        $username  = "janalkaa_admin";
        $password = "janalkaaj2023";
        $dbname = "janalkaa_kaaj";
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

                                // Consulta SQL para obtener los nombres de los aplicadores desde la base de datos
                                $id_encuestador = $_GET['id']; // Obtén el ID del encuestador desde la URL
                               
                                  $sql = "SELECT AutenticacionApli.correo
                                   FROM AutenticacionApli
                                INNER JOIN AplicadoresDeEncuestas ON AutenticacionApli.id = AplicadoresDeEncuestas.id
                                    WHERE AplicadoresDeEncuestas.id_encuestador = $id_encuestador";

                                $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['correo'] . "</td>";
                echo "<td><input type='checkbox' name='aplicadores[]' value='" . $row['correo'] . "'></td>";
                echo "</tr>";
            }
        } else {
            echo "<tr>";
            echo "<td colspan='2'>No hay aplicadores disponibles</td>";
            echo "</tr>";
        }

        $conn->close();
        ?>
    </tbody>
</table>
                        </div>
                        <h2>Seleccionar Encuestas:</h2>
<div class="table-responsive">
    <table class="table table-striped table-bordered table-sm">
        <thead class="thead-dark">
            <tr>
                <th>Encuesta</th>
                <th>Seleccionar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Conexión a la base de datos (reemplaza con tus propios datos)
            $servername = "162.241.60.169";
            $username  = "janalkaa_admin";
            $password = "janalkaaj2023";
            $dbname = "janalkaa_kaaj";
            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Conexión fallida: " . $conn->connect_error);
            }

                                // Consulta SQL para obtener los nombres de las encuestas desde la base de datos
                                $id_encuestador = $_GET['id']; // Obtén el ID del encuestador desde la URL
                               
                                $sql = "SELECT encuestas.id_encuesta, encuestas.titulo
                                 FROM encuestas
                              INNER JOIN UsuariosEncuestador ON encuestas.id_usuario = UsuariosEncuestador.id_Autenticacion OR encuestas.id_encuesta BETWEEN 1 AND 3
                                  WHERE UsuariosEncuestador.id = $id_encuestador";

                                // $sql = "SELECT id_encuesta, titulo FROM encuestas";
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
                                $sql2 = "SELECT encuestasVariables.id_encuesta, encuestasVariables.titulo
                                FROM encuestasVariables
                             INNER JOIN UsuariosEncuestador ON encuestasVariables.id_usuario = UsuariosEncuestador.id_Autenticacion 
                                 WHERE UsuariosEncuestador.id = $id_encuestador";

                                $result2 = $conn->query($sql2);
                                
                                if ($result2->num_rows > 0) {
                                    while ($row2 = $result2->fetch_assoc()) {
                                        echo "<tr>";
                                        echo "<td>" . $row2['titulo'] . "</td>";
                                        echo "<td><input type='checkbox' name='encuestas[]' value='" . $row2['id_encuesta'] . "'></td>";
                                        echo "</tr>";
                                    }
                                }
                                $conn->close();
                                ?>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-center mt-3">
                            <input type="submit" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza" value="Asignar">
                        </div>
                    </form>
                    <div class="row mb-3">
                        <div class="d-grid gap-2 col-6 mx-auto mt-3">
                            <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza" type="submit" id="boton-enviard" onclick="window.location.href='/pestanas_Encuestador/dashboard.html'">Volver al Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Agrega este bloque de script JavaScript después del código PHP -->
    <script>
        // Función para mostrar mensajes de SweetAlert
        function showSweetAlert(icon, title, messages) {
            Swal.fire({
                icon: icon,
                title: title,
                html: messages.join("<br>"), // Unir los mensajes con saltos de línea
            });
        }

        // Mostrar mensajes de SweetAlert si los arrays no están vacíos
        <?php
        if (!empty($successMessages)) {
            echo "showSweetAlert('success', 'Éxito', " . json_encode($successMessages) . ");";
        }
        if (!empty($errorMessages)) {
            echo "showSweetAlert('error', 'Error', " . json_encode($errorMessages) . ");";
        }
        ?>
    </script>


    <script>
        function showAlert(type) {
            var online = navigator.onLine;
            if (!online) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Sin conexión a Internet!',
                    text: `Necesitas conexión a Internet para crear ${type}.`,
                });
            } else {
                // Redirigir a la página correspondiente
                if (type === 'variables') {
                    window.location.href = 'crear_Evariables.html';
                } else if (type === 'reactivos') {
                    window.location.href = 'crear.html';
                }
            }
        }
    </script>

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

    <!-- desactivar los botones si no hay conexion a internet  -->
    <script>
        var button1 = document.getElementById('tip_encuesta1');
        var button2 = document.getElementById('tip_encuesta2');

        function checkInternetConnection() {
            var online = navigator.onLine;

            // Habilitar o deshabilitar los botones en función de la conexión
            button1.disabled = !online;
            button2.disabled = !online;
        }

        // Verificar la conexión inicialmente
        checkInternetConnection();

        // Agregar un listener para verificar cambios en la conexión
        window.addEventListener('online', checkInternetConnection);
        window.addEventListener('offline', checkInternetConnection);

        function showAlert(type) {
            var online = navigator.onLine;
            if (!online) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Sin conexión a Internet!',
                    text: `Necesitas conexión a Internet para crear ${type}.`,
                });
            } else {
                // Redirigir a la página correspondiente
                if (type === 'variables') {
                    window.location.href = '/pestanas_Encuestador/crear_Evariables.html';
                } else if (type === 'reactivos') {
                    window.location.href = '/pestanas_Encuestador/crear.html';
                }
            }
        }
    </script>


    <script src="/BD/prueva/encuesta.js"></script>
    <script>
        src = "/BD/infoUser.php"
    </script>
    <script src="../CSS/SweetAlert.js"></script>
    <script src="/BD/src/sincronizar.php"></script>
    <script src="/pestanas_Encuestado/asignar_encuesta.php"></script>

</body>

</html>