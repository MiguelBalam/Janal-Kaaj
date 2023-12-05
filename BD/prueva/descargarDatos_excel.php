<?php
ob_start();

$username = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$sql = "SELECT * FROM vista_AlimeAndAplicadores";
$query = mysqli_query($con, $sql);
$resultados = mysqli_fetch_all($query, MYSQLI_ASSOC);

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// Dimensiones de las celdas
$sheet->getColumnDimension('A')->setWidth(12);
$sheet->getColumnDimension('B')->setWidth(12);
$sheet->getColumnDimension('C')->setWidth(12);
$sheet->getColumnDimension('D')->setWidth(12);
$sheet->getColumnDimension('E')->setWidth(12);

// Encabezados estáticos
$sheet->setCellValue('A1', 'Código');
$sheet->setCellValue('B1', 'Nombre');
$sheet->setCellValue('C1', 'Localidad');
$sheet->setCellValue('D1', 'Longitud');
$sheet->setCellValue('E1', 'Latitud');
$sheet->setCellValue('F1', 'Fecha de Creación');

$preguntasUnicas = array_unique(array_column($resultados, 'descripcion'));

// Añadir preguntas a las columnas siguientes y ajustar dimensiones
$columnaInicioPreguntas = 7;
foreach ($preguntasUnicas as $indice => $pregunta) {
    $columnaActual = $columnaInicioPreguntas + $indice;
    $sheet->setCellValueByColumnAndRow($columnaActual, 1, $pregunta);
    $sheet->getColumnDimensionByColumn($columnaActual)->setWidth(40); // Separación más grande para las preguntas
}

// Agregar columna de Observación después de las preguntas
$columnaObservacion = $columnaInicioPreguntas + count($preguntasUnicas);
$sheet->setCellValueByColumnAndRow($columnaObservacion, 1, 'Observación');
$sheet->getColumnDimensionByColumn($columnaObservacion)->setWidth(50);

$filaActual = 2;
$codigoAnterior = null;

foreach ($resultados as $resultado) {
    if ($codigoAnterior != $resultado['codigo']) {
        $codigoAnterior = $resultado['codigo'];

        $sheet->setCellValue('A' . $filaActual, $resultado['codigo']);
        $sheet->setCellValue('B' . $filaActual, $resultado['nombre']);
        $sheet->setCellValue('C' . $filaActual, $resultado['localidad']);
        $sheet->setCellValue('D' . $filaActual, $resultado['longitud']);
        $sheet->setCellValue('E' . $filaActual, $resultado['latitud']);
        $sheet->setCellValue('F' . $filaActual, $resultado['created']);
        $sheet->setCellValueByColumnAndRow($columnaObservacion, $filaActual, $resultado['observacion']); // Agregando datos de observación
    }

    // Colocar respuesta en la columna correspondiente
    $columnaRespuesta = array_search($resultado['descripcion'], $preguntasUnicas) + $columnaInicioPreguntas;
    $sheet->setCellValueByColumnAndRow($columnaRespuesta, $filaActual, $resultado['respuesta']);

    if (end($resultados) == $resultado || $resultados[array_search($resultado, $resultados) + 1]['codigo'] != $codigoAnterior) {
        $filaActual++;
    }
}

$writer = new Xlsx($spreadsheet);
ob_clean();
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="resultados_encuesta.xlsx"');
$writer->save('php://output');

ob_end_flush();
exit();
?>