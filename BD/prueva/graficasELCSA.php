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

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/Chart.min.js"></script>

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
        <a href="../../pestañas_Encuestador/dashboard.html">
          <i class="bx bx-grid-alt"></i>
          <span class="link_name">Dashboard</span>
        </a>

        <ul class="sub-menu blank">
          <li><a href="../../pestañas_Encuestador/dashboard.html" id="mostrarSeccion1">Dashboard</a></li>
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
        <a href="../../pestanas_Encuestado/Aplicador.html">
          <i class='bx bx-book-add'></i>
          <span class="link_name">Alta Aplicadores</span>
        </a>

        <ul class="sub-menu blank">
          <li><a class="link_name" href="../../pestanas_Encuestado//Aplicador.html">Alta Aplicadores</a></li>
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
        <a href="/BD/prueva/consultaDatos.php">
          <i class='bx bx-clipboard bx-tada'></i>
          <span class="link_name">Encuestas aplicadas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="/BD/prueva/consultaDatos.php">Encuestas aplicadas</a></li>
        </ul>
      </li>

      <li>
        <a href="/BD/prueva/graficasELCSAClasi.php">
          <i class="bx bx-pie-chart-alt-2"></i>
          <span class="link_name">Análisis</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="/BD/prueva/graficasELCSAClasi.php">Análisis</a></li>
        </ul>
      </li>


      <li>
        <a href="/BD/prueva/graficasELCSA.php">
          <i class="bx bx-line-chart"></i>
          <span class="link_name">Graficas</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="/BD/prueva/graficasELCSA.php">Graficas</a></li>
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
    <div class="container">
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
        $sqlCodigos = "SELECT id_pregunta, descripcion, 
      SUM(CASE 
          WHEN respuesta = 'NO' THEN 0
          WHEN respuesta = 'SI' THEN 1
          ELSE NULL
      END) AS totalRespuestas 
      FROM nueva_vista
      WHERE id_pregunta >= 17 AND id_pregunta < 33 
      AND localidad = '$localidadSeleccionada' 
      AND clasi_respuesta = 'Adulto'
      -- AND id_autenticacion_encuestador = '$userId'
      GROUP BY id_pregunta, descripcion";
        echo '<h2 class="py-4">Hogares integrados solamente por personas adultas</h2>';
        echo '<table class="table table-bordered table-striped table-hover">';

        // Encabezado de la tabla con fondo oscuro
        echo '<thead class="thead-dark">';
        echo '<tr>';
        echo '<th>N.O. de pregunta</th>';
        echo '<th>Descripción</th>';
        echo '<th>Total</th>';
        echo '</tr>';
        echo '</thead>';

        // Comienza el cuerpo de la tabla
        echo '<tbody>';
        $queryCodigos = mysqli_query($con, $sqlCodigos);
        $contador = 1;
        while ($row = mysqli_fetch_assoc($queryCodigos)) {
          // Dentro del bucle while

          $idPregunta = $row['id_pregunta'];
          $descripcion = $row['descripcion'];
          $totalRespuestas = $row['totalRespuestas'];

          // Almacenar los datos en variables para las gráficas
          $etiquetas = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
          $datosGrafica[] = $totalRespuestas;


          echo '<tr>';
          echo '<td>' . $contador . '</td>';
          echo '<td>' . $descripcion . '</td>';

          echo '<td>' . $totalRespuestas . '</td>';
          echo '</tr>';

          $contador++;
        }
        echo '</tbody>'; // Finaliza el cuerpo de la tabla
        echo '</table>'; // Finaliza la tabla
      }
      ?>


</body>

</html>
<h4 class="py-4">Gráfico de área - Total de respuestas</h4>
<canvas id="graficaAdulto" width="100%" height="30%"></canvas>
<h4 class="py-4">Gráfico tipo dona - % respecto al total de respuestas</h4>
<canvas id="pastelAdulto" width="100%" height="30%"></canvas>

<?php


if (!empty($localidadSeleccionada)) {
  $sqlCodigos2 = "SELECT id_pregunta, descripcion, 
SUM(CASE 
    WHEN respuesta = 'NO' THEN 0
    WHEN respuesta = 'SI' THEN 1
    ELSE NULL
END) AS totalRespuestas 
FROM nueva_vista
WHERE id_pregunta >= 17 AND id_pregunta < 33 
AND localidad = '$localidadSeleccionada' 
-- AND id_autenticacion_encuestador = '$userId'
GROUP BY id_pregunta, descripcion";
  echo '<h2 class="py-4">Hogares integrados por personas adultas y menores de 18 años</h2>';
  echo '<table class="table table-bordered table-striped table-hover">';

  // Encabezado de la tabla con fondo oscuro
  echo '<thead class="thead-dark">';
  echo '<tr>';
  echo '<th>N.O. de pregunta</th>';
  echo '<th>Descripción</th>';
  echo '<th>Total</th>';
  echo '</tr>';
  echo '</thead>';

  // Comienza el cuerpo de la tabla
  echo '<tbody>';
  $queryCodigos2 = mysqli_query($con, $sqlCodigos2);
  $contador2 = 1;
  while ($row = mysqli_fetch_assoc($queryCodigos2)) {
    // Dentro del bucle while

    $idPregunta2 = $row['id_pregunta'];
    $descripcion2 = $row['descripcion'];
    $totalRespuestas2 = $row['totalRespuestas'];

    // Almacenar los datos en variables para las gráficas
    $etiquetas2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    $datosGrafica2[] = $totalRespuestas2;


    echo '<tr>';
    echo '<td>' . $contador2 . '</td>';
    echo '<td>' . $descripcion2 . '</td>';

    echo '<td>' . $totalRespuestas2 . '</td>';
    echo '</tr>';

    $contador2++;
  }
  echo '</tbody>'; // Finaliza el cuerpo de la tabla
  echo '</table>'; // Finaliza la tabla
}
?>

<h4 class="py-4">Gráfico de área - Total de respuestas</h4>
<canvas id="grafica" width="100%" height="30%"></canvas>
<h4 class="py-4">Gráfico tipo dona - % respecto al total de respuestas</h4>
<canvas id="pastel" width="100%" height="30%"></canvas>
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

  // Gráfica de barras (line)
  const $grafica = document.querySelector("#graficaAdulto");

  const datosClasificacion = {
    label: "Número de respuestas",
    data: <?php echo json_encode($datosGrafica); ?>,
    //backgroundColor: 'rgba(24, 255, 190, 0.23)',
    //borderColor: 'rgba(58, 222, 176, 0.76)',
    tension: 0.5,
    fill: true,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    pointRadius: 5,
    pointBorderColor: 'rgba(255, 99, 132)',
    pointBackgroundColor: 'rgba(255, 99, 132)',
  };

  new Chart($grafica, {
    type: 'line',
    data: {
      labels: <?php echo json_encode($etiquetas); ?>,
      datasets: [datosClasificacion]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1, // esto hace que el paso entre ticks sea de 1
            min: 0, // valor mínimo del eje y
            max: 2 // valor máximo del eje y
          }
        }
      }
    }
  });




  // Gráfica de pastel (doughnut)
  const $grafica2 = document.querySelector("#pastelAdulto");

  // Generar colores aleatorios
  // function generarColoresAleatorios(n) {
  //     const colores = [];
  //     for (let i = 0; i < n; i++) {
  //         const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
  //         colores.push(color);
  //     }
  //     return colores;

  // }

  function generarColores() {
    const colores = [
      //Morado
      'rgba(128, 0, 128, 0.8)',
      'rgba(160, 32, 240, 0.8)',
      'rgba(192, 64, 255, 0.8)',

      // Azul
      'rgba(0, 0, 255, 0.8)',
      'rgba(30, 144, 255, 0.8)',
      'rgba(70, 130, 180, 0.8)',

      // Verde
      'rgba(0, 128, 0, 0.8)',
      'rgba(50, 205, 50, 0.8)',
      'rgba(173, 255, 47, 0.8)',

      // Amarillo
      'rgba(255, 247, 0, 1)',
      'rgba(255, 215, 0, 0.8)',
      'rgba(255, 235, 59, 0.8)',

      // Naranja
      'rgba(255, 165, 0, 0.8)',
      'rgba(255, 135, 0, 1)',
      'rgba(255, 99, 78, 1)',
      'rgba(255, 59, 34, 1)',
    ];
    return colores;
  }



  const coloresAleatorios = generarColores(<?php echo count($etiquetas); ?>);

  // Calcular el porcentaje en función de las 16 preguntas
  const porcentajes = <?php echo json_encode($datosGrafica); ?>.map(valor => (valor / 16) * 100);

  const datosPastel = {
    labels: <?php echo json_encode($etiquetas); ?>,
    datasets: [{
      data: porcentajes,
      backgroundColor: coloresAleatorios,
    }],
  };

  new Chart($grafica2, {
    type: 'doughnut',
    data: datosPastel,
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
        position: 'right', // Coloca la leyenda en la parte derecha
        labels: {
          boxWidth: 20, // Ancho de la caja de color
          padding: 10, // Espacio entre las cajas de color y el texto
          fontStyle: 'bold', // Estilo de fuente
        },
      },
    },
  });

  // ------------------------------------------------------------------------
    // Gráfica de barras (line)
    const $graficaA = document.querySelector("#grafica");

const datosClasificacionA = {
  label: "Número de respuestas",
  data: <?php echo json_encode($datosGrafica2); ?>,
  //backgroundColor: 'rgba(24, 255, 190, 0.23)',
  //borderColor: 'rgba(58, 222, 176, 0.76)',
  tension: 0.5,
  fill: true,
  borderColor: 'rgb(255, 99, 132)',
  backgroundColor: 'rgba(255, 99, 132, 0.5)',
  pointRadius: 5,
  pointBorderColor: 'rgba(255, 99, 132)',
  pointBackgroundColor: 'rgba(255, 99, 132)',
};

new Chart($graficaA, {
  type: 'line',
  data: {
    labels: <?php echo json_encode($etiquetas2); ?>,
    datasets: [datosClasificacionA]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // esto hace que el paso entre ticks sea de 1
          min: 0, // valor mínimo del eje y
          max: 2 // valor máximo del eje y
        }
      }
    }
  }
});




// Gráfica de pastel (doughnut)
const $graficaA2 = document.querySelector("#pastel");

// Generar colores aleatorios
// function generarColoresAleatorios(n) {
//     const colores = [];
//     for (let i = 0; i < n; i++) {
//         const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
//         colores.push(color);
//     }
//     return colores;

// }

function generarColoresA() {
  const coloresA = [
    //Morado
    'rgba(128, 0, 128, 0.8)',
    'rgba(160, 32, 240, 0.8)',
    'rgba(192, 64, 255, 0.8)',

    // Azul
    'rgba(0, 0, 255, 0.8)',
    'rgba(30, 144, 255, 0.8)',
    'rgba(70, 130, 180, 0.8)',

    // Verde
    'rgba(0, 128, 0, 0.8)',
    'rgba(50, 205, 50, 0.8)',
    'rgba(173, 255, 47, 0.8)',

    // Amarillo
    'rgba(255, 247, 0, 1)',
    'rgba(255, 215, 0, 0.8)',
    'rgba(255, 235, 59, 0.8)',

    // Naranja
    'rgba(255, 165, 0, 0.8)',
    'rgba(255, 135, 0, 1)',
    'rgba(255, 99, 78, 1)',
    'rgba(255, 59, 34, 1)',
  ];
  return coloresA;
}



const coloresAleatoriosA = generarColoresA(<?php echo count($etiquetas2); ?>);

// Calcular el porcentaje en función de las 16 preguntas
const porcentajesA = <?php echo json_encode($datosGrafica2); ?>.map(valor => (valor / 16) * 100);

const datosPastelA = {
  labels: <?php echo json_encode($etiquetas2); ?>,
  datasets: [{
    data: porcentajesA,
    backgroundColor: coloresAleatoriosA,
  }],
};

new Chart($graficaA2, {
  type: 'doughnut',
  data: datosPastelA,
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
      position: 'right', // Coloca la leyenda en la parte derecha
      labels: {
        boxWidth: 20, // Ancho de la caja de color
        padding: 10, // Espacio entre las cajas de color y el texto
        fontStyle: 'bold', // Estilo de fuente
      },
    },
  },
});
</script>

</body>

</html>