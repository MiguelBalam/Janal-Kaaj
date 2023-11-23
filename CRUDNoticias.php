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

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Janal-Kaaj</title>
  <!-- Bootstrap -->
  <link rel="stylesheet" href="CSS/styleDashboard.css" />
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
  <link rel="stylesheet" href="CSS/bootstrap.min.css">
  <link rel="stylesheet" href="CSS/style.css">
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> -->
  <!-- <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap" rel="stylesheet"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
    crossorigin="anonymous"></script>
  <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
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
              <a href="pestanas_SuperUsuario/perfil_admin.html">
                <i class="bx bx-collection"></i>
                <span class="link_name">Perfil</span>
              </a>
            </div>
            <ul class="sub-menu blank">
              <li><a class="link_name" href="pestanas_SuperUsuario/perfil_admin.html">Perfil</a></li>
            </ul>
          </li>
          <li>
            <div class="iocn-link">
              <a href="CRUDNoticias.html">
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
            <a href="configuracion.html">
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
      
      <section class="text-center sectionDash">
  <div class="container p-5">
    <h1 class="text-center text-black">Noticias General</h1>
    
    <div class="row " id="editarNoticiass">
      <div class="row align-items-center mb-3">
        
        <div class="col-lg-11">
          <input type="text" name="search" placeholder="Buscar" class="form-control" id="buscar-titulo" required>
        </div>
        
        <div class="col-lg-1">
          <a onClick="" href="noticias.html" class="btn" type="submit" id="prueba4"><i class="fa-solid fa-file-circle-plus"></i></a>
        </div>
      </div>
             
      <div class="row crud" id="editarNoticias">
      <?php
$id = 25;
$stmt = $con->prepare("SELECT imagen, titulo, cuerpo, id FROM Noticias WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<div class="col-lg-3">';
        echo '    <div class="card">';
        echo '        <div class="card-body">';
        echo '            <img width="100" src="data:image/jpeg;base64,' . base64_encode($row['imagen']) . '">';
        echo '            <div class="card-titulo">';
        echo '                <p class="fs-6 fw-bold p_top">' . $row["titulo"] . '</p>';
        echo '            </div>';
        echo '            <div class="card-texto2"><p>' . $row["cuerpo"] . '</p></div>';
        echo '            <div>';
        echo '                <button id="btnup'.$row["id"].'" class="btn" value="Q" onclick="publicarNoticia(this.id);"><i class="fa-solid fa-file-arrow-up"></i></button>';
        echo '                <a type="button" class="btn" onclick="boton();"><i class="fa-solid fa-file-pen"></i></a>';
        echo '                <button class="btn" id="btn'.$row["id"].'" onclick="obtenerIdBoton(this.id);"><i class="fa-solid fa-trash"></i></button>';
        echo '            </div>';
        echo '        </div>';
        echo '    </div>';
        echo '</div>';
    }
} else {
    echo "0 noticias disponibles";
}

$stmt->close();
$con->close();
?>
      </div>
    </div>
  </div>
</section>


          <!-- <div class="col-lg-3">
            <div class="card">
              <div class="card-body">
                <img src="./pestanas_Encuestado/Img/2.jpg" class="img-fluid rounded">
                <div class="card-titulo">
                  <p class="fs-6 fw-bold p_top">La importancia de la seguridad alimentaria: ¿qué factores la ponen en peligro?</p>
                </div>
                <div class="card-texto2"><p>Dolor modi repudiandae quia beatae consectetur? ullafugit ullam, accusamus! Totam mollitia eveniet!</p></div>
              <div>
                <button id="btnup1" class="btn" value="Q" onclick="publicarNoticia(this.id);"><i class="fa-solid fa-file-arrow-up"></i></button>
                <a type="button" class="btn" onclick="boton();"><i class="fa-solid fa-file-pen"></i></a>
                <button class="btn" id="btn1" onclick="obtenerIdBoton(this.id);"><i class="fa-solid fa-trash"></i></button>
              </div>
              </div>
            </div>
          </div> -->
 
  <script>
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
  

</script>
  <!-- BOOTSTRAP SCRIPTS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
    integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="./node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
  <script src="./node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
  <script src="../CSS/SweetAlert.js"></script>
  <script src="./CSS/prueba.js"></script>
  <!-- <script src="BD/app.js"></script> -->
</body>

</html>