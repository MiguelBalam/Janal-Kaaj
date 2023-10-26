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

$localidadSeleccionada = isset($_POST['localidad']) ? $_POST['localidad'] : '';
$query = "SELECT codigo, totalRespuestas, clasificacion, nombre, localidad, longitud, latitud FROM vista_combinada WHERE localidad = ? "; //ORDER BY id ASC
$stmt = $con->prepare($query);
$stmt->bind_param('s', $localidadSeleccionada);
$stmt->execute();
$result = $stmt->get_result();

$datos = [];
while ($row = $result->fetch_assoc()) {
  $datos[] = $row;
}
$datos_json = json_encode($datos);



$userId = $_GET['userId']; // Obtener el ID de usuario de la URL
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

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
  <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/Chart.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>


  <style>
    #map {
      width: 100%;
      height: 50vh;
      /* esto utiliza el 30% de la altura de la ventana del navegador */
      margin-bottom: 50px;
    }
  </style>
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
        <a href="../../pestanas_Encuestador/dashboard.html">
          <i class="bx bx-grid-alt"></i>
          <span class="link_name">Dashboard</span>
        </a>

        <ul class="sub-menu blank">
          <li><a href="../../pestanas_Encuestador/dashboard.html" id="mostrarSeccion1">Dashboard</a></li>
        </ul>
      </li>


      <li>
        <a href="../../login.html">
          <i class='bx bx-home-alt'></i>
          <span class="link_name">Login</span>
        </a>

        <ul class="sub-menu blank">
          <li><a class="link_name" href="../../login.html">Login</a></li>
        </ul>
      </li>



      <li>
        <div class="iocn-link">
          <a href="/pestanas_Encuestador/crear_Evariables.html" onclick="showAlert('variables')"> <!-- Llamamos a showAlert con el argumento 'variables' -->
            <i class='bx bx-file-blank'></i>
            <span class="link_name">Crear variables</span>
          </a>
          <ul class="sub-menu blank">
            <a class="link_name" href="/pestanas_Encuestador/crear_Evariables.html" onclick="showAlert('variables')">Crear variables</a>
          </ul>
        </div>
      </li>

      <li>
        <div class="iocn-link">
          <a href="/pestanas_Encuestador/crear.html" onclick="showAlert('reactivos')"> <!-- Llamamos a showAlert con el argumento 'reactivos' -->
            <i class='bx bx-file-blank'></i>
            <span class="link_name">Crear reactivos</span>
          </a>
        </div>
        <ul class="sub-menu blank">
          <a class="link_name" href="/pestanas_Encuestador/crear.html" onclick="showAlert('reactivos')">Crear reactivos</a>
        </ul>
      </li>

      <li>
        <a onclick="redireccionarConUserId()">
          <i class='bx bx-book-add'></i>
          <span class="link_name">Alta Aplicadores</span>
        </a>

        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserId()">Alta Aplicadores</a></li>
        </ul>
      </li>

      <li>
        <a href="../../pestanas_Encuestado/asignarE.php">
          <i class='bx bxs-user-check'></i>
          <span class="link_name">Asiganar</span>
        </a>

        <ul class="sub-menu blank">
          <li><a class="link_name" href="../../pestanas_Encuestado/asignarE.php">Asiganar</a></li>
        </ul>
      </li>

      <li>
        <a href="../../BD/prueva/consultaDatos.php">
          <i class='bx bx-clipboard bx-tada'></i>
          <span class="link_name">Encuestas aplicadas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="../../BD/prueva/consultaDatos.php">Encuestas aplicadas</a></li>
        </ul>
      </li>

      <li>
        <a href="#" onclick="redireccionarConUserId3()">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="link_name">Análisis</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserId3()">Análisis</a></li>
        </ul>
      </li>


      <li>
        <a href="#" onclick="redireccionarConUserId2()">
          <i class="bx bx-line-chart"></i>
          <span class="link_name">Graficas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" onclick="redireccionarConUserId2()">Graficas</a></li>
        </ul>
      </li>

      <li>
        <a href="../../pestanas_Encuestador/perfil_Encuestador.html">
          <i class='bx bx-user'></i>
          <span class="link_name">Perfil</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="../../pestanas_Encuestador/perfil_Encuestador.html">Perfil</a></li>
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
      <span class="text">Gráficas</span>
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
          var urlConUserId = `../../pestanas_Encuestado/Aplicador.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '../../pestanas_Encuestado/Aplicador.php';
        }
      }

      function redireccionarConUserId2() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `../../BD/prueva/graficasELCSA.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '../../BD/prueva/graficasELCSA.php';
        }
      }

      function redireccionarConUserId3() {
        var userId = localStorage.getItem('user_id');

        if (userId) {
          // Construir la URL con userId
          var urlConUserId = `../../BD/prueva/graficasELCSAClasi.php?userId=${userId}`;

          // Redirigir al usuario a la nueva URL
          window.location.href = urlConUserId;
        } else {
          // Si userId no está disponible, simplemente redirigir sin él
          window.location.href = '../../BD/prueva/graficasELCSAClasi.php';
        }
      }
    </script>

    <div class="container" id="pruebaxd">
      <form method="post">
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-2 py-2">
              <label for="lugaresPrueba" class="form-label">Elige una localidad:</label>
            </div>
            <div class="col-md-6">
              <select id="lugaresPrueba" name="localidad" class="form-select">
                <option value="Felipe Carrillo Puerto">Felipe Carrillo Puerto</option>
                <option value="San Jose Segundo">San Jose Segundo</option>
                <option value="Dzula">Dzula</option>
                <option value="Pino Suarez">José María Pino Suárez</option>
                <option value="Mixtequilla">Mixtequilla</option>
                <option value="Chun On">Chun On</option>
              </select>
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn">Seleccionar Localidad</button>
            </div>
          </div>
        </div>
      </form>

      <?php

      if (!empty($localidadSeleccionada)) {
        $sqlCodigos2 = "SELECT codigo, 
                SUM(CASE 
                    WHEN respuesta = 'NO' THEN 0
                    WHEN respuesta = 'SI' THEN 1
                    ELSE NULL
                END) AS totalRespuestas 
                FROM vista_ELCSA
                WHERE localidad = '$localidadSeleccionada'
                AND clasi_respuesta = 'Adulto'
                AND id_autenticacion_encuestador = '$userId'
                GROUP BY codigo";
        echo '<h2 class="py-4">Hogares integrados solamente por personas adultas</h2>';
        echo '<table class="table table-bordered table-striped table-hover">';

        // Encabezado de la tabla con fondo oscuro
        echo '<thead class="thead-dark">';
        echo '<tr>';
        echo '<th>Código</th>';
        echo '<th>Total Respuestas</th>';
        echo '<th>Localidad</th>';
        echo '<th>Clasificación</th>';
        echo '</tr>';
        echo '</thead>';

        // Comienza el cuerpo de la tabla
        echo '<tbody>';
        $queryCodigos2 = mysqli_query($con, $sqlCodigos2);


        $seguridadCount2 = 0;
        $inseguridadLeveCount2 = 0;
        $inseguridadModeradaCount2 = 0;
        $inseguridadSeveraCount2 = 0;

        while ($codigo2 = mysqli_fetch_assoc($queryCodigos2)) {
          $totalRespuestas2 = $codigo2['totalRespuestas'];
          $clasificacion2 = '';

          if ($totalRespuestas2 == 0) {
            $clasificacion2 = 'Seguridad';
            $seguridadCount2++;
          } elseif ($totalRespuestas2 >= 1 && $totalRespuestas2 <= 3) {
            $clasificacion2 = 'Inseguridad Leve';
            $inseguridadLeveCount2++;
          } elseif ($totalRespuestas2 >= 4 && $totalRespuestas2 <= 6) {
            $clasificacion2 = 'Inseguridad Moderada';
            $inseguridadModeradaCount2++;
          } elseif ($totalRespuestas2 >= 7 && $totalRespuestas2 <= 9) {
            $clasificacion2 = 'Inseguridad Severa';
            $inseguridadSeveraCount2++;
          }

          echo '<tr>';
          echo '<td>' . $codigo2['codigo'] . '</td>';
          echo '<td>' . $totalRespuestas2 . '</td>';
          echo '<td>' . $localidadSeleccionada . '</td>';
          echo '<td>' . $clasificacion2 . '</td>';
          echo '</tr>';
        }
        echo '</tbody>'; // Finaliza el cuerpo de la tabla
        echo '</table>'; // Finaliza la tabla

        $total2 = $seguridadCount2 + $inseguridadLeveCount2 + $inseguridadModeradaCount2 + $inseguridadSeveraCount2;

        if ($total2 == 0) {
          echo "No hay datos disponibles.";
        } else {
          $seguridadP2 = ($seguridadCount2 / $total2) * 100;
          $inseguridadLeveP2 = ($inseguridadLeveCount2 / $total2) * 100;
          $inseguridadModeradaP2 = ($inseguridadModeradaCount2 / $total2) * 100;
          $inseguridadSeveraP2 = ($inseguridadSeveraCount2 / $total2) * 100;

          // Aquí puedes continuar con el código para usar las variables $seguridadP, $inseguridadLeveP, etc.
        }
      }

      ?>

      <h4 class="py-4">Gráfico de área - Total de respuestas</h4>
      <canvas id="graficaAdulto" width="100%" height="30%"></canvas>
      <h4 class="py-4">Gráfico tipo dona - % respecto al total de respuestas</h4>
      <canvas id="pastelAdulto" width="100%" height="30%"></canvas>

      <?php

      if (!empty($localidadSeleccionada)) {
        $sqlCodigos = "SELECT codigo, 
              SUM(CASE 
                  WHEN respuesta = 'NO' THEN 0
                  WHEN respuesta = 'SI' THEN 1
                  ELSE NULL
              END) AS totalRespuestas 
              FROM vista_ELCSA
              WHERE localidad = '$localidadSeleccionada'
              AND id_autenticacion_encuestador = '$userId'
              AND codigo IN (
                  SELECT DISTINCT codigo 
                  FROM vista_ELCSA 
                  WHERE id_pregunta > 25 AND id_pregunta < 33
              )
              GROUP BY codigo";


        echo '<h2 class="py-4">Hogares integrados por personas adultas y menores de 18 años</h2>';
        echo '<table class="table table-bordered table-striped table-hover">';

        // Encabezado de la tabla con fondo oscuro
        echo '<thead class="thead-dark">';
        echo '<tr>';
        echo '<th>Código</th>';
        echo '<th>Total Respuestas</th>';
        echo '<th>Localidad</th>';
        echo '<th>Clasificación</th>';
        echo '</tr>';
        echo '</thead>';

        // Comienza el cuerpo de la tabla
        echo '<tbody>';
        $queryCodigos = mysqli_query($con, $sqlCodigos);


        $seguridadCount = 0;
        $inseguridadLeveCount = 0;
        $inseguridadModeradaCount = 0;
        $inseguridadSeveraCount = 0;

        while ($codigo = mysqli_fetch_assoc($queryCodigos)) {
          $totalRespuestas = $codigo['totalRespuestas'];
          $clasificacion = '';

          if ($totalRespuestas == 0) {
            $clasificacion = 'Seguridad';
            $seguridadCount++;
          } elseif ($totalRespuestas >= 1 && $totalRespuestas <= 5) {
            $clasificacion = 'Inseguridad Leve';
            $inseguridadLeveCount++;
          } elseif ($totalRespuestas >= 6 && $totalRespuestas <= 10) {
            $clasificacion = 'Inseguridad Moderada';
            $inseguridadModeradaCount++;
          } elseif ($totalRespuestas >= 11 && $totalRespuestas <= 16) {
            $clasificacion = 'Inseguridad Severa';
            $inseguridadSeveraCount++;
          }

          echo '<tr>';
          echo '<td>' . $codigo['codigo'] . '</td>';
          echo '<td>' . $totalRespuestas . '</td>';
          echo '<td>' . $localidadSeleccionada . '</td>';
          echo '<td>' . $clasificacion . '</td>';
          echo '</tr>';
          //Subir a la BD
          $insertQuery = "INSERT INTO ELCSA_Completo (codigo, totalRespuestas, localidad, clasificacion) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                totalRespuestas = VALUES(totalRespuestas), 
                localidad = VALUES(localidad), 
                clasificacion = VALUES(clasificacion)";

$stmt = mysqli_prepare($con, $insertQuery);
mysqli_stmt_bind_param($stmt, 'iiss', $codigo['codigo'], $totalRespuestas, $localidadSeleccionada, $clasificacion);
mysqli_stmt_execute($stmt);
        }
        echo '</tbody>'; // Finaliza el cuerpo de la tabla
        echo '</table>'; // Finaliza la tabla

        $total = $seguridadCount + $inseguridadLeveCount + $inseguridadModeradaCount + $inseguridadSeveraCount;

        if ($total == 0) {
          echo "No hay datos disponibles.";
        } else {
          $seguridadP = ($seguridadCount / $total) * 100;
          $inseguridadLeveP = ($inseguridadLeveCount / $total) * 100;
          $inseguridadModeradaP = ($inseguridadModeradaCount / $total) * 100;
          $inseguridadSeveraP = ($inseguridadSeveraCount / $total) * 100;

          // Aquí puedes continuar con el código para usar las variables $seguridadP, $inseguridadLeveP, etc.
        }
      }

      ?>
      <h4 class="py-4">Gráfico de área - Total de respuestas</h4>
      <canvas id="grafica" width="100%" height="30%"></canvas>
      <h4 class="py-4">Gráfico tipo dona - % respecto al total de respuestas</h4>
      <canvas id="pastel" width="100%" height="30%"></canvas>
      <h4 class="py-4">Mapa de la Zona Encuestada</h4>
      <div id="map"></div>
      <h4 class="py-4"></h4>

    </div>

    <div class="text-center">
      <h5 class="py-4">Descargar Reporte Estadístico en PDF</h5><button id="download" class="btn btn-outline-warning py-3">Descargar PDF <i class="fa-solid fa-file-arrow-down"></i></button>
    </div>
    <h4 class="py-4"></h4>

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

    var Select = document.getElementById('lugaresPrueba');
    var valorSeleccionado;
    Select.addEventListener('change', function() {
      valorSeleccionado = Select.value;
    });

    const $grafica = document.querySelector("#grafica");
    const etiquetas = ["Seguridad", "Inseguridad Leve", "Inseguridad Moderada", "Inseguridad Severa"];

    // Utiliza la variable totalRespuestas en tus datos
    const datosClasificacion = {
      label: "Clasificación de inseguridad alimentaria",
      data: [<?php echo $seguridadCount; ?>, <?php echo $inseguridadLeveCount; ?>, <?php echo  $inseguridadModeradaCount; ?>, <?php echo $inseguridadSeveraCount; ?>],
      backgroundColor: 'rgba(24, 255, 190, 0.23)', // Color de fondo
      borderColor: 'rgba(58, 222, 176, 0.76)', // Color del borde

    };


    new Chart($grafica, {
      type: 'line',
      data: {
        labels: etiquetas,
        datasets: [
          datosClasificacion,
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            beginAtZero: true,
            ticks: {
              color: 'rgb(255, 99, 132)',
            },
          },
          x: {
            ticks: {
              color: 'rgb(255, 99, 132)',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              color: 'rgb(255, 99, 132)',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });

    const $grafica2 = document.querySelector("#pastel");
    const etiquetas2 = ["Seguridad", "Inseguridad Leve", "Inseguridad Moderada", "Inseguridad Severa"];

    const coloresPersonalizados = [
      'rgba(59, 228, 159, 0.8)',
      'rgba(255, 212, 76, 0.8)',
      'rgba(255, 159, 49, 0.8)',
      'rgba(215, 63, 9, 0.8)'
    ];

    new Chart($grafica2, {
      type: 'doughnut',
      data: {
        labels: etiquetas2,
        datasets: [{
          data: [
            <?php echo $seguridadP; ?>,
            <?php echo $inseguridadLeveP; ?>,
            <?php echo $inseguridadModeradaP; ?>,
            <?php echo $inseguridadSeveraP; ?>
          ],
          backgroundColor: coloresPersonalizados,
        }],
      },
      options: {
        animation: {
          animateRotate: true, // Habilitar animación de rotación
          animateScale: true, // Habilitar animación de escala
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              const valor = data.datasets[0].data[tooltipItem.index];
              return `${label}: ${valor.toFixed(2)}%`;
            },
          },
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
            padding: 10,
            fontStyle: 'bold',
            generateLabels: function(chart) {
              return legendLabels(chart);
            }
          },
        },
      },

    });

    //_____________________________________________________________________________

    const $graficaA = document.querySelector("#graficaAdulto");
    const etiquetasA = ["Seguridad", "Inseguridad Leve", "Inseguridad Moderada", "Inseguridad Severa"];
    // Utiliza la variable totalRespuestas en tus datos
    const datosClasificacionA = {
      label: "Clasificación de inseguridad alimentaria",
      data: [<?php echo $seguridadCount2; ?>, <?php echo $inseguridadLeveCount2; ?>, <?php echo  $inseguridadModeradaCount2; ?>, <?php echo $inseguridadSeveraCount2; ?>],
      backgroundColor: 'rgba(24, 255, 190, 0.23)', // Color de fondo
      borderColor: 'rgba(58, 222, 176, 0.76)', // Color del borde

    };


    new Chart($graficaA, {
      type: 'line',
      data: {
        labels: etiquetasA,
        datasets: [
          datosClasificacionA,
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            beginAtZero: true,
            ticks: {
              color: 'rgb(255, 99, 132)',
            },
          },
          x: {
            ticks: {
              color: 'rgb(255, 99, 132)',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              color: 'rgb(255, 99, 132)',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });

    function legendLabels(chart) {
      const datasets = chart.data.datasets[0];
      const labels = chart.data.labels;

      if (!datasets.data || !labels) {
        return [];
      }

      return labels.map((label, index) => {
        const percentage = datasets.data[index];
        return {
          text: `${label}: ${percentage.toFixed(2)}%`,
          fillStyle: datasets.backgroundColor[index],
          strokeStyle: datasets.borderColor ? datasets.borderColor[index] : '#fff',
          lineWidth: 1,
          hidden: isNaN(percentage),
          index: index
        };
      });
    }

    const $graficaA2 = document.querySelector("#pastelAdulto");
    const etiquetasA2 = ["Seguridad", "Inseguridad Leve", "Inseguridad Moderada", "Inseguridad Severa"];
    const coloresPersonalizadosA = [
      'rgba(59, 228, 159, 0.8)',
      'rgba(255, 212, 76, 0.8)',
      'rgba(255, 159, 49, 0.8)',
      'rgba(215, 63, 9, 0.8)'
    ];

    new Chart($graficaA2, {
      type: 'doughnut',
      data: {
        labels: etiquetasA2,
        datasets: [{
          data: [
            <?php echo $seguridadP2; ?>,
            <?php echo $inseguridadLeveP2; ?>,
            <?php echo $inseguridadModeradaP2; ?>,
            <?php echo $inseguridadSeveraP2; ?>
          ],
          backgroundColor: coloresPersonalizadosA,
        }],
      },
      options: {
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              const valor = data.datasets[0].data[tooltipItem.index];
              return `${label}: ${valor.toFixed(2)}%`;
            },
          },
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
            padding: 10,
            fontStyle: 'bold',
            generateLabels: function(chart) {
              return legendLabels(chart);
            }
          },
        },

      },
    });

    function initMap() {
      var data = <?php echo $datos_json; ?>;

      var openInfoWindows = [];

      function getIconBasedOnClassification(classification) {
        switch (classification) {
          case 'Seguridad':
            return '../../Img/menu.png';
          case 'Inseguridad Leve':
            return '../../Img/acceso.png';
          case 'Inseguridad Moderada':
            return '../../Img/gmail.png';
          case 'Inseguridad Severa':
            return '../../Img/Negro.png';
          default:
            return '../../Img/Oficial_JanalKaaj_simple.png'; // Ícono por defecto si no coincide ninguna clasificación
        }
      }
      var center = {
        lat: parseFloat(data[0].latitud),
        lng: parseFloat(data[0].longitud)
      };

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: center
      });

      for (let item of data) {
        var markerIcon = getIconBasedOnClassification(item.clasificacion);

        var marker = new google.maps.Marker({
          position: {
            lat: parseFloat(item.latitud),
            lng: parseFloat(item.longitud)
          },
          map: map,
          title: item.nombre,
          icon: {
            url: markerIcon,
            scaledSize: new google.maps.Size(26, 30) // Define el tamaño del ícono aquí
          }
        });

        (function(marker, item) {
          var infoWindow = new google.maps.InfoWindow({
            content: `
            <strong>Nombre:</strong> ${item.nombre} <br>
            <strong>Localidad:</strong> ${item.localidad} <br>
            <strong>Latitud:</strong> ${item.latitud} <br>
            <strong>Longitud:</strong> ${item.longitud}
          `
          });

          marker.addListener('click', function() {
            // Si ya hay 2 InfoWindows abiertos, cierra el más antiguo
            if (openInfoWindows.length == 2) {
              openInfoWindows[0].close();
              openInfoWindows.shift(); // Elimina el primer elemento del array
            }

            infoWindow.open(map, marker);
            openInfoWindows.push(infoWindow);

            // Listener para remover el InfoWindow del array cuando se cierre
            google.maps.event.addListener(infoWindow, 'closeclick', function() {
              var index = openInfoWindows.indexOf(infoWindow);
              if (index > -1) {
                openInfoWindows.splice(index, 1);
              }
            });
          });
        })(marker, item);
      }

    }




    document.getElementById('download').addEventListener('click', function() {
      var element = document.getElementById('pruebaxd');

      html2canvas(element).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');

        // Establecer el PDF en formato horizontal
        var pdf = new window.jspdf.jsPDF('p', 'mm', [canvas.width, canvas.height]);

        // Ajustar el tamaño y posición de la imagen en el PDF
        var imgProps = pdf.getImageProperties(imgData);
        var pdfWidth = pdf.internal.pageSize.getWidth();
        var pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);



        pdf.save("Análisis ELCSA.pdf");
      });
    });
  </script>
  <!-- <div id="map"></div> -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBY0fnUqDbcZ1dTOYqLHFxXBnTjyNKJquM&callback=initMap" async defer></script>


</body>

</html>