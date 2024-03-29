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
$sql = "SELECT * FROM Administrador WHERE ID = $userId";
$result = $con->query($sql);

if ($result->num_rows > 0) {
  // Si encontramos el usuario con ID 1, almacenamos sus datos en un array
  $row = $result->fetch_assoc();
} else {
  die("No se encontró el usuario con ID 1");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Janal Kaaj - Dashboard</title>
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
          <a href="perfil_admin.html">
            <i class="bx bx-collection"></i>
            <span class="link_name">Perfil</span>
          </a>
        </div>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="perfil_admin.html">Perfil</a></li>
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
          <li><a class="link_name" href="../CRUDNoticias.html">Noticias</a></li>
          <li><a href="../noticias.html">Crear</a></li>
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
        <a href="../configuracion.html">
          <i class="bx bx-cog"></i>
          <span class="link_name">Ajustes</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Ajustes</a></li>
        </ul>
      </li>

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
      <span class="text">Administrador</span>
    </div>
    <!-- FIN Dashboard -->

    <!--Perfil-->
    <h2 class="main__title text-center text-dark py-3">Información Personal del Administrador</h2>
    <div class="container py-4">
    <form action="GuardarPerfil.php" method="POST">
        <div class="row align-items-start">
          <div class="col-sm-6">
            <div class="row text-sm-start">
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label text-dark px-4">Nombre: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="text" placeholder="Nombre" class="form-control" id="nombre" name="nombre" value="<?php echo $row['Nombre']; ?>" readonly>
              </div>
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Paterno: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="text" placeholder="Apellido Paterno" class="form-control" id="apellidoPa" name="apellidoPa" value="<?php echo $row['Apellido_Paterno']; ?>" readonly>
              </div>
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Apellido Materno: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="text" placeholder="Apellido Materno" class="form-control" id="apellidoMa" name="apellidoMa" value="<?php echo $row['Apellido_Materno']; ?>" readonly>
              </div>
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Género: </label>
              </div>
              <div class="col-sm-8 text-sm-center py-5 px-4">
                <div class="col d-flex justify-content-between">
                  <label for="opcion1">Masculino</label>
                  <!-- Si el género es masculino, marcar el radio button correspondiente -->
                  <input type="radio" id="genMas" name="opciones" value="Masculino" <?php if ($row['Genero'] == 'Masculino') echo 'checked'; ?> readonly>
                  <label for="opcion2">Femenino</label>
                  <!-- Si el género es femenino, marcar el radio button correspondiente -->
                  <input type="radio" id="genfem" name="opciones" value="Femenino" <?php if ($row['Genero'] == 'Femenino') echo 'checked'; ?> readonly>
                </div>
              </div>
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Edad: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="number" placeholder="Años" class="form-control" id="edad" name="edad" value="<?php echo $row['Edad']; ?>">
              </div>
              <input type="hidden" name="userId" value="<?php echo $userId; ?>">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row text-sm-start ">

              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Institución: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="text" placeholder="Institución o lugar de procedencia" class="form-control" id="instituto" name="instituto" value="<?php echo $row['Institucion']; ?>" readonly>
              </div>

              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Correo: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="email" placeholder="correo@gmail.com" class="form-control" id="correo" name="correo" value="<?php echo $row['correo']; ?>" readonly>
              </div>

              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Teléfono: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="tel" placeholder="Télefono" class="form-control" id="telefono" name="telefono" value="<?php echo $row['Telefono']; ?>" readonly>
              </div>
              <div class="col-sm-4 text-sm-start py-5">
                <label for="nombrecompletos" class="col-form-label px-4 text-dark">Contraseña: </label>
              </div>
              <div class="col-sm-8 text-sm-start py-5 px-4">
                <input type="password" placeholder="Contraseña" class="form-control" id="contra" name="contra" value="<?php echo $row['contraseña']; ?>" readonly>
              </div>
            </div>
          </div>

        </div>
        <div class="row py-5">
          <div class="col-sm-6 text-center"></div>
          <div class="col-sm-6">
            <div class="row d-flex justify-content-between">
              <div class="col-sm-3 d-flex justify-content-center ms-auto"><button class="btnn btn-outline-warning text-white"  onClick="" id="resmin">Restaurar</button></div>
              <!-- <div class="col-sm-3 d-flex justify-content-center"><button class="btnn btn-outline-warning text-white" type="submit" id="editarAdmin" onclick="obtenerUsuario(3);">Editar</button></div> -->
              <button class="btnn btn-outline-warning text-white" type="button" id="editarAdmin" onclick="habilitarEdicion();">Editar</button>
              <div class="col-sm-3 d-flex justify-content-center"><button class="btnn btn-outline-warning text-white" type="submit" id="guardarAdmin" onclick="">Guardar</button></div>
            </div>
          </div>
        </div>

      </form>



    </div>
  </section>
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
    //Dashboard
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement; // seleccionando el padre principal de la flecha
        arrowParent.classList.toggle("showMenu");
      });
    }

    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    function habilitarEdicion() {
    // Obtener todos los campos del formulario
    let campos = document.querySelectorAll('.form-control');
    
    // Hacer que cada campo sea editable
    campos.forEach(campo => {
        campo.removeAttribute('readonly');
    });

    document.getElementById('editarAdmin').innerText = 'Editando..';
}

  </script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="/node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
  <script src="/node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
  <script src="/CSS/SweetAlert.js"></script>
  <script src="CSS/prueba.js"></script>
  <script src="../BD/app.js"></script>
</body>

</html>