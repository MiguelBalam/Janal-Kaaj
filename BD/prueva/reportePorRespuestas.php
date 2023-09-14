<?php
$username = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

$localidadSeleccionada = isset($_POST['localidad']) ? $_POST['localidad'] : '';

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Resultados de Encuesta</title>
    <link rel="stylesheet" href="/BD/prueva/estilostabla.css">
    <link rel="stylesheet" href="/BD/node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
    <script src="/BD/node_modules/sweetalert2/dist/sweetalert2.all.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/Chart.min.js"></script>
</head>

<body>
<!-- Mostrar códigos únicos -->
<h2>Códigos de Encuestas Aplicadas:</h2>

<form method="post">
    <select id="lugaresPrueba" name="localidad">
        <option value="Felipe Carrillo Puerto">Felipe Carrillo Puerto</option>
        <option value="San Jose Segundo">San Jose Segundo</option>
        <option value="Dzula">Dzula</option>
    </select>
    <button type="submit">Seleccionar Localidad</button>
</form>
    <table>
        <thead>
            <tr>
                <td>N.O. de pregunta</td>
                <td>Descripción</td>
                <td>Localidad</td>

            </tr>
        </thead>
        <tbody>

        <?php


if (!empty($localidadSeleccionada)) {
    $sqlCodigos = "SELECT id_pregunta, descripcion, 
        SUM(CASE 
            WHEN respuesta = 'NO' THEN 0
            WHEN respuesta = 'SI' THEN 1
            ELSE NULL
        END) AS totalRespuestas 
        FROM vista_inseAlimen
        WHERE id_pregunta >= 17 AND id_pregunta < 33 AND localidad = '$localidadSeleccionada'
        GROUP BY id_pregunta, descripcion";

    $queryCodigos = mysqli_query($con, $sqlCodigos);
    $contador = 1;
    while ($row = mysqli_fetch_assoc($queryCodigos)) {
        // Dentro del bucle while
        
        $idPregunta = $row['id_pregunta'];
        $descripcion = $row['descripcion'];
        $totalRespuestas = $row['totalRespuestas'];

        // Almacenar los datos en variables para las gráficas
        $etiquetas = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
        $datosGrafica[] = $totalRespuestas;


        echo '<tr>';
        echo '<td>' . $contador . '</td>';
        echo '<td>' . $descripcion . '</td>';
        
        echo '<td>' . $totalRespuestas . '</td>';
        echo '</tr>';

        $contador++;
    }}
            ?>
        </tbody>
    </table>
    
</body>
</html>

<canvas id="grafica" width="100%" height="30%"></canvas>
<!-- ... (código HTML anterior) ... -->

<canvas id="pastel" width="100%" height="30%"></canvas>

<script>


var Select = document.getElementById('lugaresPrueba');
var valorSeleccionado;
Select.addEventListener('change', function() {
    valorSeleccionado = Select.value;
});

// Gráfica de barras (line)
const $grafica = document.querySelector("#grafica");

const datosClasificacion = {
    label: "Número de respuestas",
    data: <?php echo json_encode($datosGrafica); ?>,
    //backgroundColor: 'rgba(24, 255, 190, 0.23)',
    //borderColor: 'rgba(58, 222, 176, 0.76)',
    tension: 0.5,
            fill : true,
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
        animation: {
            duration: 1000, // Duración de la animación en milisegundos
            easing: 'easeInOutQuad', // Tipo de interpolación (puedes cambiarlo según tu preferencia)
        },
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }
    }
});




// Gráfica de pastel (doughnut)
const $grafica2 = document.querySelector("#pastel");

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

// new Chart($grafica2, {
//     type: 'doughnut',
//     data: datosPastel,
//     options: {
//         tooltips: {
//             callbacks: {
//                 label: function (tooltipItem, data) {
//                     const label = data.labels[tooltipItem.index];
//                     const valor = data.datasets[0].data[tooltipItem.index];
//                     return `${label}: ${valor.toFixed(2)}%`;
//                 },
//             },
//         },
//     },
// });
new Chart($grafica2, {
    type: 'doughnut',
    data: datosPastel,
    options: {
        animation: {
            animateRotate: true, // Habilitar animación de rotación
            animateScale: true,  // Habilitar animación de escala
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const label = data.labels[tooltipItem.index];
                    const valor = data.datasets[0].data[tooltipItem.index];
                    return `${label}: ${valor.toFixed(2)}%`;
                },
            },
        },
    },
});

</script>

