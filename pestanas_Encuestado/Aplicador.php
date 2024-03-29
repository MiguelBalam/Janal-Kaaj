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

$userId = $_GET['userId']; // Obtener el ID de usuario de la URL
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Resgistro encuestado</title>
    <link rel="stylesheet" href="../CSS/styleDashboard.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../CSS/style.css" />

    <link rel="stylesheet" href="../node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css" />
    <script src="../node_modules/sweetalert2/dist/sweetalert2.all.js"></script>

    <!-- Boxiocns CDN Link -->
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="/CSS/SweetAlert.js"></script>
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
                    <i class="bx bx-home-alt"></i>
                    <span class="link_name">Login</span>
                </a>

                <ul class="sub-menu blank">
                    <li><a class="link_name" href="/login.html">Login</a></li>
                </ul>
            </li>

            <li>
                <div class="iocn-link">
                    <a href="#" onclick="showAlert('variables')">
                        <!-- Llamamos a showAlert con el argumento 'variables' -->
                        <i class="bx bx-file-blank"></i>
                        <span class="link_name">Crear variables</span>
                    </a>
                    <ul class="sub-menu blank">
                        <a class="link_name" href="#" onclick="showAlert('variables')">Crear variables</a>
                    </ul>
                </div>
            </li>

            <li>
                <div class="iocn-link">
                    <a href="#" onclick="showAlert('reactivos')">
                        <!-- Llamamos a showAlert con el argumento 'reactivos' -->
                        <i class="bx bx-file-blank"></i>
                        <span class="link_name">Crear reactivos</span>
                    </a>
                </div>
                <ul class="sub-menu blank">
                    <a class="link_name" href="#" onclick="showAlert('reactivos')">Crear reactivos</a>
                </ul>
            </li>

            <li>
                <a onclick="redireccionarConUserId()">
                    <i class="bx bx-book-add"></i>
                    <span class="link_name">Alta Aplicadores</span>
                </a>

                <ul class="sub-menu blank">
                    <li>
                        <a class="link_name" onclick="redireccionarConUserId()">Alta Aplicadores</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="/pestanas_Encuestado/asignarE.php">
                    <i class="bx bxs-user-check"></i>
                    <span class="link_name">Asignar</span>
                </a>

                <ul class="sub-menu blank">
                    <li>
                        <a class="link_name" href="/pestanas_Encuestado/asignarE.php">Asignar</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="../BD/prueva/consultaDatos.php">
                    <i class="bx bx-clipboard bx-tada"></i>
                    <span class="link_name">Encuestas aplicadas</span>
                </a>
                <ul class="sub-menu blank">
                    <li>
                        <a class="link_name" href="../BD/prueva/consultaDatos.php">Encuestas aplicadas</a>
                    </li>
                </ul>
            </li>

            <li>
        <a onclick="redireccionarConUserId2()">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="link_name">Análisis</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserId2()">Análisis</a></li>
        </ul>
      </li>

      <li>
        <a href="../BD/prueva/graficasELCSAClasi.php" onclick="redireccionarConUserId3()">
          <i class="bx bx-line-chart"></i>
          <span class="link_name">Graficas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserId3()">Graficas</a></li>
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
                    <li>
                        <a class="link_name" href="#" onclick="confirmarCerrarSesion()">Cerrar Sesión</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

    <section class="home-section">
        <div class="home-content">
            <i class="bx bx-menu"></i>
            <span class="text">Aplicador</span>
        </div>
        <!-- Fin Dashboard -->

        <section class="d-flex justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 p-3 shadow-lg mb-5 bg-white rounded">
                <h1 class="color-titulo mb-4 h1TextoTitulo">Agregar Aplicador</h1>
                <form form id="formularioRC" name="formularioRC" action="/BD/guardarApli.php" method="post" class="needs-validation"
                    >
                    <div id="grupo__nombrecompletos" class="row mb-3">
                        <label for="nombrecompletos" class="col-sm-4 col-form-label px-4">Nombres:
                        </label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="nombrecompletos" id="nombrecompletos"
                                required />
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Llene el campo</div>
                        </div>
                    </div>

                    <div id="grupo__apellidopaterno" class="row mb-3">
                        <label for="apellidopaterno" class="col-sm-4 col-form-label px-4">Apellido paterno:
                        </label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="apellidopaterno" id="apellidopaterno"
                                required />
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Llene el campo</div>
                        </div>
                    </div>

                    <div id="grupo__apellidomaterno" class="row mb-3">
                        <label for="apellidomaterno" class="col-sm-4 col-form-label px-4">Apellido materno:
                        </label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="apellidomaterno" id="apellidomaterno"
                                required />
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Llene el campo</div>
                        </div>
                    </div>

                    <div id="grupo__Correo" class="row mb-3">
                        <label for="inputEmai1" class="col-sm-4 col-form-label px-4">Identificador:
                        </label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" name="Correo" id="Correo" placeholder="Correo"
                                required />
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Llene el campo</div>
                        </div>
                    </div>

                    <div id="grupo__Contarseña" class="row mb-3">
                        <label for="contra" class="col-sm-4 col-form-label px-4">Palabra Clave:
                        </label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" name="Contrasenia"
                                placeholder="No.Empleado/Palabra/Numero" id="Contrasenia" required />
                                <input type="hidden" name="userId" value="<?php echo $userId; ?>">
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Llene el campo</div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza" type="submit"
                              onclick="enviarYLimpiarFormulario()"  id="boton-enviaru">
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
                <div class="row mb-3">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza" type="submit"
                            id="boton-enviard" onclick="redireccionarConUserId4()">
                            Asignar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <script>
function enviarYLimpiarFormulario() {
    // Obtener el formulario por su ID
    var formulario = document.getElementById('formularioRC');

    // Aquí puedes agregar código para validar los datos antes del envío si es necesario

    // Enviar el formulario
    formulario.submit();
    //alert('Formulario enviado con éxito.');
 
    // Limpiar el formulario después del envío
    formulario.reset();
    cargarApli()
    
}
</script>
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');

        console.log(userId);
        // Guardar el estado de la barra lateral en el localStorage
        function saveSidebarState(state) {
            localStorage.setItem("sidebarState", state);
        }

        // Cargar el estado de la barra lateral del localStorage
        function loadSidebarState() {
            return localStorage.getItem("sidebarState") || "expanded"; // Valor predeterminado: expandido
        }

        let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement; // seleccionar el elemento principal padre de la flecha
                arrowParent.classList.toggle("showMenu");
            });
        }

        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".bx-menu");
        console.log(sidebarBtn);

        // Aplicar el estado almacenado al cargar la página
        window.addEventListener("DOMContentLoaded", () => {
            const initialState = loadSidebarState();
            if (window.innerWidth <= 400) {
                // Si el ancho de la ventana es menor o igual a 400px (dispositivo móvil),
                // siempre oculta la barra lateral en la carga inicial.
                sidebar.classList.add("close");
                saveSidebarState("collapsed"); // Guarda el estado colapsado en el almacenamiento local
            } else {
                sidebar.classList.toggle("close", initialState === "collapsed");
            }
        });

        sidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("close");
            const newState = sidebar.classList.contains("close")
                ? "collapsed"
                : "expanded";
            saveSidebarState(newState);
        });

        function redireccionarConUserId() {
        var userId = localStorage.getItem('user_id');
        if (userId) {
          var urlConUserId = `/pestanas_Encuestado/Aplicador.php?userId=${userId}`;
          window.location.href = urlConUserId;
        } else {
          window.location.href = '/pestanas_Encuestado/Aplicador.php';
        }
      }

      function redireccionarConUserId2() {
        var userId = localStorage.getItem('user_id');
        if (userId) {
          var urlConUserId = `../BD/prueva/graficasELCSA.php?userId=${userId}`;
          window.location.href = urlConUserId;
        } else {
          window.location.href = '../BD/prueva/graficasELCSA.php';
        }
      }

      function redireccionarConUserId3() {
        var userId = localStorage.getItem('user_id');
        if (userId) {
          var urlConUserId = `../BD/prueva/graficasELCSAClasi.php?userId=${userId}`;
          window.location.href = urlConUserId;
        } else {
          window.location.href = '../BD/prueva/graficasELCSAClasi.php';
        }
      }
    </script>
    <script>
        function redireccionarConUserId4() {
  var userID = localStorage.getItem('user_id'); // Obtener el ID almacenado
    var userCorreo = localStorage.getItem('user_correo');
if (userID) {
    // Enviar una solicitud AJAX para recuperar los datos del usuario por su ID
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/BD/infoUser.php?id=' + userID, true);

    xhr.onreadystatechange = function () {
      console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
                var userInfo = JSON.parse(xhr.responseText);
                console.log(userInfo)
                if (userInfo && userInfo.error) {
                    console.error('Error obteniendo información del usuario:', userInfo.error);
                } else {
                  
                  window.location.href = '/pestanas_Encuestado/asignarE.php?id=' + userInfo.id;

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
}
    </script>

    <!-- desactivar los botones si no hay conexion a internet  -->
    <script>
        var button1 = document.getElementById("tip_encuesta1");
        var button2 = document.getElementById("tip_encuesta2");

        function checkInternetConnection() {
            var online = navigator.onLine;

            // Habilitar o deshabilitar los botones en función de la conexión
            button1.disabled = !online;
            button2.disabled = !online;
        }

        // Verificar la conexión inicialmente
        checkInternetConnection();

        // Agregar un listener para verificar cambios en la conexión
        window.addEventListener("online", checkInternetConnection);
        window.addEventListener("offline", checkInternetConnection);
    </script>

    <script>
        function showAlert(type) {
            var online = navigator.onLine;
            if (!online) {
                Swal.fire({
                    icon: "error",
                    title: "¡Sin conexión a Internet!",
                    text: `Necesitas conexión a Internet para crear ${type}.`,
                });
            } else {
                // Redirigir a la página correspondiente
                if (type === "variables") {
                    window.location.href = "/pestanas_Encuestador/crear_Evariables.html";
                } else if (type === "reactivos") {
                    window.location.href = "/pestanas_Encuestador/crear.html";
                }
            }
        }
    </script>
      <script src="../CSS/SweetAlert.js"></script>
</body>

</html>