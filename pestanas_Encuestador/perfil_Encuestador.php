

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

$query = "SELECT nombre, apellidoPaterno, apellidoMaterno, edad, genero, Procedencia, logo, Telefono FROM UsuariosEncuestador WHERE id_Autenticacion = $userId";

$queryA = "SELECT correo, contraseña FROM Autenticacion WHERE id = $userId";


$result = $con->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombreEncuestador = $row["nombre"];
    $apellidoPaterno = $row["apellidoPaterno"];
    $apellidoMaterno = $row["apellidoMaterno"];
    $edad = $row["edad"];
    $genero = $row["genero"];
    $logoData = $row["logo"];
    // Convierte los datos binarios a una cadena Base64
    $logoBase64 = base64_encode($logoData);
    $Procedencia =$row["Procedencia"];
    $Telefono = $row["Telefono"];
} else {
    $nombreEncuestador= "";
    $apellidoPaterno = "";
    $apellidoMaterno = "";
    $edad = "";
    $genero = "";
    $logo = "";
    $Procedencia ="";
    $telefono = "";
}

$result = $con->query($queryA);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $correo = $row["correo"];
  //$contraa = $row["contra"];
}else {
  $correo= "";
  $contraa= "";
}



?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Janal-Kaaj - Información Personal del Encuestador</title>
  <link rel="stylesheet" href="/CSS/styleDashboard.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../CSS/style.css">

  <link rel="stylesheet" href="../node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
  <script src="../node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> 

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

        <a onclick="redireccionarConUserId()">

        <a onclick="redireccionarConUserId()">

        <a id="pruebaApli" href="/pestanas_Encuestado/Aplicador.php" onclick="redireccionarConUserId()">

          <i class='bx bx-book-add'></i>
          <span class="link_name">Alta Aplicadores</span>
        </a>

        <ul class="sub-menu blank">

          <li><a class="link_name" onclick="redireccionarConUserId()">Alta Aplicadores</a></li>

          <li><a class="link_name" onclick="redireccionarConUserId()">Alta Aplicadores</a></li>

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
        <a href="/BD/prueva/consultaDatos.php">
          <i class='bx bx-clipboard bx-tada'></i>
          <span class="link_name">Encuestas aplicadas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="../BD/prueva/consultaDatos.php">Encuestas aplicadas</a></li>
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
        <a onclick="redireccionarConUserId3()">
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
        <a onclick="redireccionarConUserIdPEncuestador()">
          <i class='bx bx-user'></i>
          <span class="link_name">Perfil</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserIdPEncuestador()">Perfil</a></li>
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

      function redireccionarConUserIdPEncuestador() {
    var userId = localStorage.getItem('user_id');
    
    if (userId) {
        // Construir la URL con userId
        var urlConUserId = `/pestanas_Encuestador/perfil_Encuestador.php?userId=${userId}`;
        
        // Redirigir al usuario a la nueva URL
        window.location.href = urlConUserId;
    } else {
        // Si userId no está disponible, simplemente redirigir sin él
        window.location.href = '/pestanas_Encuestador/perfil_Encuestador.php';
    }
}
    </script>
    

    </script>


    <!--Perfil-->

    <section class="d-flex justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 col-xl-10 p-3 shadow-lg mb-5 bg-white rounded">
        <h2 class="main__title text-center text-dark py-3">Información Personal del Encuestador</h2>
        <div class="container py-4">
          <form >
          <div class="row align-items-start">
            <div class="col-sm-6">

              <div class="row text-sm-start align-items-center">

                <div class="col-sm-5 col-md-4 col- py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label text-dark px-4" >Nombre:  </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="text" placeholder="Nombre" name="nombre" class="form-control" id="nombre" disabled value="<?php echo $nombreEncuestador; ?>">
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Paterno: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="text" placeholder="Apellido Paterno" name="apellidoPaterno" class="form-control" id="apellidoPa" disabled value="<?php echo $apellidoPaterno; ?>">
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Materno: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="text" placeholder="Apellido Materno" class="form-control" name="apellidoMaterno" id="apellidoMa" disabled value="<?php echo $apellidoMaterno; ?>">
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Género: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <div class="col d-flex justify-content-between">
                    <label for="opcion1">Masculino</label>
                    <input type="radio" id="genMas" name="genero" value="Masculino" <?php echo ($genero === 'Masculino') ? 'checked' : ''; ?> disabled>
                    <label for="opcion2">Femenino</label>
                    <input type="radio" id="genfem" name="genero" value="Femenino" <?php echo ($genero === 'Femenino') ? 'checked' : ''; ?> disabled>
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Teléfono: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="tel" placeholder="Télefono" name="telefono" class="form-control" id="telefono" disabled  value="<?php echo $Telefono; ?>">
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Edad: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="number" placeholder="Años" class="form-control" name="edad" id="edad" disabled value="<?php echo $edad; ?>">
                </div>
                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Contraseña: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="password" placeholder="Contraseña" class="form-control" id="contra" disabled>
                </div>
              </div>
            </div>


            <div class="col-sm-6">
              <div class="row text-sm-start ">

                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Correo: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="email" placeholder="correo@gmail.com" class="form-control" id="aqui" disabled>
                  <small class="text-muted">Este campo no se puede editar</small>
                </div>

                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Institución: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <input type="text" placeholder="Institución o lugar de procedencia" class="form-control"
                    id="institucion" disabled value="<?php echo $Procedencia; ?>">
                </div>

                <div class="col-sm-5 col-md-4 py-2 py-sm-3">
                  <label for="nombrecompletos" class="col-form-label px-4 text-dark">Logo de la Institución: </label>
                </div>
                <div class="col-sm-7 col-md-8 py-2 py-sm-3">
                  <!-- <input type="text" placeholder="Logo de la institución" class="form-control" id="logoInstitucion"> -->
                  <img id="logoInstitucion" alt="Logo Institución" src="data:image/jpeg;base64,<?php echo $logoBase64; ?>">

                  <div class="modal" tabindex="-1" id="myModal">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content align-content-center">
                        <div class="modal-header">
                          <h5 class="modal-title">Editar Logotipo e Institución</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p>Recuerde.. Solo se aceptan imagenes en formato PNG y con dimensiones de 115 por 115 píxeles
                          </p>
                          <div id="grupo__logoEditar" class="row mb-3">
                            <label for="logo" class="col-sm-4 col-form-label px-4">Logotipo de la institución:</label>
                            <div class="col-sm-8 d-flex align-items-center">
                              <input type="file" class="form-control" id="imagenEditar" name="imagen" accept="image/png"
                                required onchange="validarImagenLogo2()">
                            </div>
                          </div>
                          <div id="grupo__procedenciaEditar" class="row mb-3">
                            <label for="procedencia" class="col-sm-4 col-form-label px-4 ">Institución o lugar de
                              procedencia:
                            </label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" name="procedencia" id="procedenciaEditar"
                                required>
                              <div class="valid-feedback">
                                Correcto
                              </div>
                              <div class="invalid-feedback">
                                Llene el campo
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza"
                            data-bs-dismiss="modal">Aceptar</button>
                          <button type="button" class="btn btn-outline-success bg-border-mostaza bg-text-mostaza"
                            onclick="guardarDatos()" id="guardar-logo" data-action="updateLogo">Guardar</button>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3 d-flex justify-content-center P-3"><button
                      class="btnn btn-outline-warning text-white" type="submit" id="boton-editar-logo"
                      data-bs-toggle="modal" data-bs-target="#myModal" onclick="">Editar</button></div>
                  <small class="text-muted">El boton edita logo y la institución</small>
                </div>
              </div>
            </div>

          </div>
          <div class="row py-5">
            <div class="col-sm-6">
              <div class="row d-flex justify-content-start">
                <div class="col-sm-3 d-flex justify-content-center ms-auto"><button
                    class="btnn btn-outline-warning text-white" type="submit" id="boton-cancelar"
                    onclick="CanEncues()">Cancelar</button></div>
                <div class="col-sm-3 d-flex justify-content-center"><button class="btnn btn-outline-warning text-white"
                    type="submit" id="boton-editar" onclick="editarEncues()">Editar</button></div>
                <div class="col-sm-3 d-flex justify-content-center"><button class="btnn btn-outline-warning text-white"
                    type="submit" id="boton-guardar" data-action="updateData" onclick="miFuncionEditar()">Guardar</button></div>
              </div>
            </div>
          </div>
    </form>
        </div>
      </div>
    </section>
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
      sidebar.classList.toggle('close', initialState === 'collapsed');
    });

    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('close');
      const newState = sidebar.classList.contains('close') ? 'collapsed' : 'expanded';
      saveSidebarState(newState);
    });
  </script>
  <script>
    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()
    //Prueba
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

    function confirmarCerrarSesion() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas cerrar la sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, eliminar los datos del usuario del almacenamiento local
            localStorage.removeItem('user_correo');
            localStorage.removeItem('user_id');
            localStorage.removeItem('tipoUsuario');
            console.log("Sesión cerrada correctamente.");
            
            // Mostrar una alerta con el mensaje de cierre en dos segundos
            Swal.fire({
                title: 'Cerrando sesión...',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });

            // Redireccionar a la página de inicio de sesión después de dos segundos
            setTimeout(function() {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            // Si el usuario cancela, no hacer nada
        }
    });
}

  </script>

  <script>
    window.onload = function () {

      miFuncion();

    };
  </script>
  <script>
    // Función para habilitar todos los campos de input deshabilitados excepto 'Institución' y el campo con ID 'aqui'
    function habilitarInputsExcepto(aqui) {
      var inputs = document.querySelectorAll('input[disabled]');
      inputs.forEach(function (input) {
        if (input.id !== 'institucion' && input.id !== aqui) {
          input.removeAttribute('disabled');
        }
      });
    }

    // Evento click para activar la función cuando el botón sea clicado
    var botonHabilitar = document.getElementById('boton-editar');
    botonHabilitar.addEventListener('click', function () {
      // Pasar el ID del input que no se debe habilitar (en este caso, 'aqui')
      habilitarInputsExcepto('aqui');
    });
  </script>
<script>
$(document).ready(function () {
    $("#boton-guardar").click(function () {
        var userId = <?php echo $userId; ?>;
        var nombre = $("#nombre").val();
        var apellidoPaterno = $("#apellidoPa").val();
        var apellidoMaterno = $("#apellidoMa").val();
        var genero = $("input[name='genero']:checked").val();
        var edad = $("#edad").val();
        var telefono = $("#telefono").val();
        var contra = $("#contra").val();

        $.ajax({
            type: "POST",
            url: "Editar_Perfil.php",
            data: {
                userId: userId,
                action: 'updateData',
                nombre: nombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                genero: genero,
                edad: edad,
                telefono: telefono,
                contra: contra
            },
            success: function (response) {
                alert(response);
                location.reload(); // Recarga la página
            },
            error: function (xhr, status, error) {
                console.error("Error al actualizar los datos: " + error);
            }
        });
    });
});
</script>
<script>
$(document).ready(function () {
    $("#guardar-logo").click(function () {
        var userId = <?php echo $userId; ?>;
        var formData = new FormData();
        var imagenInput = $('input[name="imagen"]')[0];

        if (imagenInput && imagenInput.files && imagenInput.files[0]) {
            formData.append('imagen', imagenInput.files[0]);
            formData.append('userId', userId);
            formData.append('Procedencia', $("#procedenciaEditar").val());
            formData.append('action', 'updateLogo');

            $.ajax({
                type: "POST",
                url: "Editar_Perfil.php",
                data: formData,
                contentType: false,  // Obligatorio para FormData
                processData: false,  // Obligatorio para FormData
                success: function (response) {
                    alert(response);
                    location.reload(); // Recarga la página
                },
                error: function (xhr, status, error) {
                    console.error("Error al actualizar los datos: " + error);
                }
            });
        } else {
            alert("No se ha seleccionado una imagen.");
        }
    });
});
</script>
<script>
function validarImagenLogo2() {
  const input = document.getElementById('imagenEditar');
  const archivo = input.files[0];

  if (archivo) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = new Image();

      img.onload = function() {
        const ancho = img.width;
        const alto = img.height;

        if (ancho > 115 || alto > 115) {
          alert('La imagen debe tener un tamaño máximo de 115x115 píxeles');
          input.value = ''; // Limpia el campo de entrada
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(archivo);
  }
}
</script>
  <script src="../BD/app.js"></script>
  <script src="../CSS/SweetAlert.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</body>

</html>