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

require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if (isset($_POST['codigo_busqueda'])) {
    $codigoBusqueda = $_POST['codigo_busqueda'];

    // Consulta los resultados de la búsqueda
    $sqlBusqueda = "SELECT * FROM vista_encuesta WHERE codigo = '$codigoBusqueda'";
    $queryBusqueda = mysqli_query($con, $sqlBusqueda);
    $resultados = mysqli_fetch_all($queryBusqueda, MYSQLI_ASSOC);

    // Create an Excel file
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1', 'Código');
    $sheet->setCellValue('B1', 'Fecha de Creación');
    $sheet->setCellValue('C1', 'Preguntas');
    $sheet->setCellValue('D1', 'Respuestas');
    $sheet->setCellValue('E1', 'Observación');

    $row = 2;
    foreach ($resultados as $resultado) {
        $sheet->setCellValue('A' . $row, $resultado['codigo']);
        $sheet->setCellValue('B' . $row, $resultado['created']);
        $sheet->setCellValue('C' . $row, $resultado['descripcion']);
        $sheet->setCellValue('D' . $row, $resultado['respuesta']);
        $sheet->setCellValue('E' . $row, $resultado['observacion']);
        $row++;
    }

    // Save the Excel file
    $writer = new Xlsx($spreadsheet);
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="resultados_encuesta.xlsx"');
    header('Cache-Control: max-age=0');
    $writer->save('php://output');
} else {
    header('Location: index.php'); // Change this to the name of your main file
    exit();
}
?>
