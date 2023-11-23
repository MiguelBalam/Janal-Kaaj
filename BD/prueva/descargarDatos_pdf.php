<?php
ob_start();
require '../../Library/fpdf.php';

// Datos de conexión a la base de datos
$servername = "162.241.60.169";
$username = "janalkaa_admin";
$password = "janalkaaj2023";
$dbname = "janalkaa_kaaj"; 

// Crea la conexión a la base de datos
$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

// Verifica si la conexión fue exitosa
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Consulta SQL para obtener todos los resultados de las encuestas
$sqlEncuestas = "SELECT DISTINCT nombre, localidad, genero, edad, codigo, created FROM vista_inseAlimentaria";
$sqlPreguntas = "SELECT descripcion, respuesta FROM vista_inseAlimentaria WHERE codigo = ?";

$queryEncuestas = mysqli_query($con, $sqlEncuestas);

// Crea una instancia de FPDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->SetAutoPageBreak(true, 5);

// Prepara la consulta de preguntas y respuestas como una sentencia preparada
$stmtPreguntas = $con->prepare($sqlPreguntas);
$stmtPreguntas->bind_param("s", $codigoEncuesta);

// Itera sobre todas las encuestas y agrega los datos al PDF
while ($encabezado = mysqli_fetch_assoc($queryEncuestas)) {
    // Mostrar encabezado
    $pdf->Cell(0, 10, utf8_decode('Nombre del encuestado: ' . $encabezado['nombre']), 0, 1);
    $pdf->Cell(0, 10, utf8_decode('Localidad: ' . $encabezado['localidad']), 0, 1);
    $pdf->Cell(0, 10, utf8_decode('Género: ' . $encabezado['genero']), 0, 1);
    $pdf->Cell(0, 10, utf8_decode('Edad: ' . $encabezado['edad']), 0, 1);
    $pdf->Cell(0, 10, utf8_decode('Código: ' . $encabezado['codigo']), 0, 1);
    $pdf->Cell(0, 10, utf8_decode('Fecha de Creación: ' . $encabezado['created']), 0, 1);
    
    $pdf->Ln(); // Agregar un salto de línea (separación vertical) después del encabezado

    // Obtener preguntas y respuestas para este encabezado
    $codigoEncuesta = $encabezado['codigo'];
    $stmtPreguntas->execute();
    $queryPreguntas = $stmtPreguntas->get_result();
    
    // Mostrar preguntas y respuestas
    while ($preguntaRespuesta = mysqli_fetch_assoc($queryPreguntas)) {
        $pregunta = utf8_decode('Pregunta: ' . $preguntaRespuesta['descripcion']);
        $respuesta = utf8_decode('Respuesta: ' . $preguntaRespuesta['respuesta']);
        $pdf->MultiCell(0, 10, $pregunta, 0, 1);
        $pdf->MultiCell(0, 10, $respuesta, 0, 1);
        $pdf->Ln(); // Agregar un salto de línea (separación vertical) después de cada conjunto de preguntas y respuestas
    }

    // Agregar un salto de página después de cada encabezado
    $pdf->AddPage();
}

// Genera el PDF y envíalo al navegador
ob_clean();
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="resultados_encuestas.pdf"');
$pdf->Output();
ob_end_flush();

// Cierra la conexión a la base de datos y la declaración preparada
$stmtPreguntas->close();
$con->close();
?>