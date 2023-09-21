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

$query = "SELECT nombre, apellidoPaterno, apellidoMaterno, edad, genero, localidad, municipio, estado, pais, telefono FROM UsuarioEncuestado WHERE id = $userId";

$queryA = "SELECT correo, contraseña FROM Encuestado_A WHERE id = $userId";



$result = $con->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombreEncuestado = $row["nombre"];
    $apellidoPaterno = $row["apellidoPaterno"];
    $apellidoMaterno = $row["apellidoMaterno"];
    $edad = $row["edad"];
    $genero = $row["genero"];
    $localidad = $row["localidad"];
    $municipio = $row["municipio"];
    $estado = $row["estado"];
    $pais = $row["pais"];
    $telefono = $row["telefono"];
} else {
    $nombreEncuestado= "";
    $apellidoPaterno = "";
    $apellidoMaterno = "";
    $edad = "";
    $genero = "";
    $localidad = "";
    $municipio = "";
    $estado = "";
    $pais = "";
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
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Janal-Kaaj - Información Personal del Encuestado</title>
  <!-- Bootstrap -->
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
  <link rel="stylesheet" href="../CSS/bootstrap.min.css">
  <link rel="stylesheet" href="../CSS/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>Janal Kaaj - Dashboard</title>
    <link rel="stylesheet" href="../CSS/styleDashboard.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
      crossorigin="anonymous"></script>
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
          <a href="#">
            <i class="bx bx-grid-alt"></i>
            <span class="link_name">Dashboard</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Category</a></li>
          </ul>
        </li>
        <li>
          <div class="iocn-link">
            <a href="perfil.php">
              <i class="bx bx-collection"></i>
              <span class="link_name">Perfil</span>
            </a>
          </div>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="perfil.php">Perfil</a></li>
          </ul>
        </li>
        <li>
          <div class="iocn-link">
            <a href="../CRUDNoticias.html">
              <i class="bx bx-book-alt"></i>
              <span class="link_name">Noticias</span>
            </a>
            <i class="bx bxs-chevron-down arrow"></i>
          </div>
          <ul class="sub-menu">
            <li><a class="link_name" href="#">Noticias</a></li>
            <li><a href="noticias.html">Crear</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-pie-chart-alt-2"></i>
            <span class="link_name">Reportes</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Reportes</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-compass"></i>
            <span class="link_name">Encuestadores</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Encuestadores</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-history"></i>
            <span class="link_name">History</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">History</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-cog"></i>
            <span class="link_name">Ajustes</span>
          </a>
          <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Ajustes</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <section class="home-section">
    <div class="home-content">
    <i class="bx bx-menu"></i>
    <span class="text">Encuestado</span>
  </div>

    <h2 class="main__title text-center text-dark py-3">Información Personal del Encuestado</h2>
  <div class="container py-4">
  <form id="formulario" method="post" action="guardarPerfil.php">
    <div class="row align-items-center">
      <div class="col-sm-6">
      
        <div class="row text-sm-start">
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label text-dark px-4">Nombre: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="nombre" type="text" placeholder="Nombre" class="form-control" id="nombre" value="<?php echo $nombreEncuestado; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Paterno: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="apellidoPa" type="text" placeholder="Apellido Paterno" class="form-control" id="apellidoPa" value="<?php echo $apellidoPaterno; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Materno: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="apellidoMa" type="text" placeholder="Apellido Materno" class="form-control" id="apellidoMa" value="<?php echo $apellidoMaterno; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Género: </label>
          </div>
          <!-- <div class="col-sm-8 text-sm-center py-4 px-4">
          <div class="col d-flex justify-content-between">
                <label for="opcion1">Masculino</label>
                <input type="radio" id="genMas" name="opciones" value="Masculino" <?php echo ($genero === 'option1') ? 'checked' : ''; ?>>
                <label for="opcion2">Femenino</label>
                <input type="radio" id="genFem" name="opciones" value="Femenino" <?php echo ($genero === 'option2') ? 'checked' : ''; ?>>
            </div>
          </div> -->
          <div class="col-sm-8 text-sm-center py-4 px-4">
            <div class="col d-flex justify-content-between">
              <label for="opcion1">Masculino</label>
              <input type="radio" id="genMas" name="genero" value="Masculino" <?php echo ($genero === 'Masculino') ? 'checked' : ''; ?>>
              <label for="opcion2">Femenino</label>
              <input type="radio" id="genFem" name="genero" value="Femenino" <?php echo ($genero === 'Femenino') ? 'checked' : ''; ?>>
            </div>
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Edad: </label>
           
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="edad" type="number" placeholder="Edad" class="form-control" id="edad" value="<?php echo $edad; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Contraseña: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
            <input name="contra" type="password" placeholder="Contraseña" class="form-control" id="contra" >
            <!-- value="<?php echo $contraa; ?>">  -->
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="row text-sm-start">
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Correo: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
            <input name="correo" type="email" placeholder="correo@gmail.com" class="form-control" id="correo" value="<?php echo $correo; ?>"> 
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Teléfono: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="telefono" type="tel" placeholder="Teléfono" class="form-control" id="telefono" value="<?php echo $telefono; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Localidad: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="localidad" type="text" placeholder="Localidad" class="form-control" id="localidad" value="<?php echo $localidad; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Municipio: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="municipio" type="text" placeholder="Municipio" class="form-control" id="municipio" value="<?php echo $municipio; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">Estado: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="estado" type="text" placeholder="Estado" class="form-control" id="estado" value="<?php echo $estado; ?>">
          </div>
          <div class="col-sm-4 text-sm-start py-4">
            <label for="nombrecompletos" class="col-form-label px-4 text-dark">País: </label>
          </div>
          <div class="col-sm-8 text-sm-start py-4 px-4">
          <input name="pais" type="text" placeholder="País" class="form-control" id="pais" value="<?php echo $pais; ?>">
          </div>             
        </div>
        <input type="hidden" name="userId" value="<?php echo $userId; ?>">

      </div>
      
    </div>
    
    <div class="row py-5">
      <div class="col-sm-6 text-center"></div>
      <div class="col-sm-6">
        <div class="row d-flex justify-content-between">
          <!-- <div class="col-sm-3 d-flex justify-content-center ms-auto"><button class="btn btn-outline-warning" type="submit" 
          id="boton-restaurar" onclick="mostrarEncuestados(id)">Restaurar</button></div> -->

          <div class="col-sm-3 d-flex justify-content-center ms-auto">
            <button class="btn btn-outline-warning" type="button" id="boton-restaurar">Restaurar</button>
          </div>

          <div class="col-sm-3 d-flex justify-content-center"><a class="btn btn-outline-warning " type="button" id="boton-editar" 
          onclick="desbloquearElementos()">Editar</a></div>
          
          <!-- <div class="col-sm-3 d-flex justify-content-center"><button class="btn btn-outline-warning" type="submit" id="boton-guardar" 
          onclick="editarDatosEncuestado()">Guardar</button></div> -->
          <div class="col-sm-3 d-flex justify-content-center">
      <button type="submit" class="btn btn-outline-warning" id="boton-guardar">Guardar</button>
   </div>
        </div>
      </div>
    </div>
    </form>
  </div>


<script>

var userId = localStorage.getItem('user_id');

// Verifica si userId es válido antes de realizar la solicitud AJAX
if (userId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/pestanas_Encuestado/perfil.php?userId=' + userId, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Aquí puedes manejar la respuesta del servidor, si es necesario
        console.log('Respuesta del servidor:', xhr.responseText);
      } else {
        console.error('Error en la solicitud AJAX:', xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send();
} else {
  console.error('userId no está disponible en el localStorage.');
}

console.log('ID de usuario:', userId);
//PONLO PRIMERO
// document.addEventListener('DOMContentLoaded', function() {
//   // Guarda los valores originales en el atributo "data-original-value"
//   var fields = document.querySelectorAll('[data-original-value]');
//   fields.forEach(function(field) {
//     field.dataset.originalValue = field.value;
//   });

//   // Agrega un evento click al botón "Restaurar"
//   var botonRestaurar = document.getElementById('boton-restaurar');
//   botonRestaurar.addEventListener('click', function() {
//     // Restaura el contenido del formulario al valor original
//     fields.forEach(function(field) {
//       field.value = field.dataset.originalValue;
//     });
//   });
// });

                    window.addEventListener('load', function() {
                    // Aquí colocas el código de la función que deseas ejecutar al abrir la pestaña
                    bloquearElementos();
                    });

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

            </div>
        </section>

    </section>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
crossorigin="anonymous"></script>
<link rel="stylesheet" href="/node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
<script src="/node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
<script src="/CSS/SweetAlert.js"></script>
<script src="CSS/prueba.js"></script>
  <script src="../BD/app.js"></script>
  <script src="../BD/registroUsuarios/registro.js"></script>
</body>

</html>