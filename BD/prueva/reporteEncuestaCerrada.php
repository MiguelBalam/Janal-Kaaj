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
                <td>Código de la encuesta aplicada</td>
                <td>Código convertido</td>
                <td>Localidad</td>
                <td>Clasificación de seguridad</td>
            </tr>
        </thead>
        <tbody>
            <?php

            if (!empty($localidadSeleccionada)) {
                $sqlCodigos = "SELECT codigo, 
                SUM(CASE 
                    WHEN respuesta = 'NO' THEN 0
                    WHEN respuesta = 'SI' THEN 1
                    ELSE NULL
                END) AS totalRespuestas 
                FROM vista_inseAlimen
                WHERE localidad = '$localidadSeleccionada'
                GROUP BY codigo";

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
                }

                $total = $seguridadCount + $inseguridadLeveCount + $inseguridadModeradaCount + $inseguridadSeveraCount;

                if ($total == 0) {
                    echo "No hay datos disponibles.";
                } else {
                    $seguridadP = ($seguridadCount / $total) * 100;
                    $inseguridadLeveP = ($inseguridadLeveCount / $total) * 100;
                    $inseguridadModeradaP = ($inseguridadModeradaCount / $total) * 100;
                    $inseguridadSeveraP = ($inseguridadSeveraCount / $total) * 100;

                }
            }

            ?>
        </tbody>
    </table>

</body>

</html>

<canvas id="grafica" width="100%" height="30%"></canvas>
<canvas id="pastel" width="100%" height="30%"></canvas>



<script>
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
        type: 'line', // Tipo de gráfica
        data: {
            labels: etiquetas,
            datasets: [
                datosClasificacion,
                // Aquí más datos...
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
        }
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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                    },
                },
            },
        },

    });
</script>

</html>