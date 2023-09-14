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

    // Define an empty array to store the results
    $resultados = [];

    // Check if the code exists in each table and fetch results
    $tables = ['vista_inseAlimen', 'vista_enMiel', 'vista_enTextil'];
    foreach ($tables as $table) {
        $sqlBusqueda = "SELECT * FROM $table WHERE codigo = '$codigoBusqueda'";
        $queryBusqueda = mysqli_query($con, $sqlBusqueda);
        $tableResults = mysqli_fetch_all($queryBusqueda, MYSQLI_ASSOC);

        if (!empty($tableResults)) {
            $resultados = array_merge($resultados, $tableResults);
        }
    }

    // Create an Excel file
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1', 'Código');
    $sheet->setCellValue('B1', 'Fecha de Creación');
    $sheet->setCellValue('C1', 'Preguntas');
    $sheet->setCellValue('D1', 'Respuestas');
    $sheet->setCellValue('E1', 'Observación');

    // Set the width of the "Preguntas" and "Respuestas" columns
    $sheet->getColumnDimension('A')->setWidth(10); // Adjust the width as needed
    $sheet->getColumnDimension('B')->setWidth(18); // Adjust the width as needed
    $sheet->getColumnDimension('C')->setWidth(115); // Adjust the width as needed
    $sheet->getColumnDimension('D')->setWidth(40); // Adjust the width as needed
    $sheet->getColumnDimension('E')->setWidth(20); // Adjust the width as needed

    // Change the font color of columns 'A' HASTA 'E' to black
    $sheet->getStyle('A')->getFont()->getColor()->setRGB('000000');
    $sheet->getStyle('B')->getFont()->getColor()->setRGB('000000');
    $sheet->getStyle('C')->getFont()->getColor()->setRGB('000000');
    $sheet->getStyle('D')->getFont()->getColor()->setRGB('000000');
    $sheet->getStyle('E')->getFont()->getColor()->setRGB('000000');


    // Initialize variables to store code, date, and observation
    $codigo = '';
    $fechaCreacion = '';
    $observacion = '';

    $row = 2;
    foreach ($resultados as $resultado) {
        // Set code, date, and observation only once
        if (empty($codigo)) {
            $codigo = $resultado['codigo'];
            $sheet->setCellValue('A2', $codigo);
        }
        if (empty($fechaCreacion)) {
            $fechaCreacion = $resultado['created'];
            $sheet->setCellValue('B2', $fechaCreacion);
        }
        if (empty($observacion)) {
            $observacion = $resultado['observacion'];
            $sheet->setCellValue('E2', $observacion);
        }

        // List questions and answers
        $sheet->setCellValue('C' . $row, $resultado['descripcion']);
        $sheet->setCellValue('D' . $row, $resultado['respuesta']);
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
