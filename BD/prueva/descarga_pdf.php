<?php
ob_start();
// Incluye la biblioteca FPDF
require '../../Library/fpdf.php';

// Verifica si se proporcionó el código de búsqueda
if (isset($_POST['codigo_busqueda']) && !empty($_POST['codigo_busqueda'])) {
    $codigoBusqueda = $_POST['codigo_busqueda'];
    var_dump($codigoBusqueda); // Muestra el valor de codigo_busqueda para depuración
    $codigoBusqueda = preg_replace('/[^A-Za-z0-9\-]/', '', $codigoBusqueda);

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

    // Consulta SQL para obtener los resultados de la encuesta en la vista vista_inseAlimen
    $sql = "SELECT DISTINCT nombre, localidad, genero, edad, codigo, created FROM vista_inseAlimentaria WHERE codigo = '$codigoBusqueda'";
    var_dump($sql); // Muestra la consulta SQL para depuración

    $query = mysqli_query($con, $sql);
    $encabezado = mysqli_fetch_assoc($query);

    // Consulta SQL para obtener las preguntas y respuestas
    $sqlPreguntas = "SELECT descripcion, respuesta FROM vista_inseAlimentaria WHERE codigo = '$codigoBusqueda'";
    var_dump($sqlPreguntas); // Muestra la consulta SQL para depuración

    $queryPreguntas = mysqli_query($con, $sqlPreguntas);
    $preguntasRespuestas = mysqli_fetch_all($queryPreguntas, MYSQLI_ASSOC);

    // Verifica si hay resultados para generar el PDF
    if (!empty($encabezado) && !empty($preguntasRespuestas)) {
        // Crea una instancia de FPDF
        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->SetAutoPageBreak(true, 10); // Habilita el salto automático de página y define el margen

        // Agrega información al PDF (Encabezado)
        $pdf->Cell(0, 10, utf8_decode('Nombre del encuestado: ' . $encabezado['nombre']), 0, 1);
        $pdf->Cell(0, 10, utf8_decode('Localidad: ' . $encabezado['localidad']), 0, 1);
        $pdf->Cell(0, 10, utf8_decode('Género: ' . $encabezado['genero']), 0, 1);
        $pdf->Cell(0, 10, utf8_decode('Edad: ' . $encabezado['edad']), 0, 1);
        $pdf->Cell(0, 10, utf8_decode('Código: ' . $encabezado['codigo']), 0, 1);
        $pdf->Cell(0, 10, utf8_decode('Fecha de Creación: ' . $encabezado['created']), 0, 1);

        $pdf->Ln(10); // Salto de línea

        // Agrega las preguntas y respuestas usando MultiCell para manejar texto largo
        foreach ($preguntasRespuestas as $preguntaRespuesta) {
            $pregunta = utf8_decode('Pregunta: ' . $preguntaRespuesta['descripcion']);
            $respuesta = utf8_decode('Respuesta: ' . $preguntaRespuesta['respuesta']);
            $pdf->MultiCell(0, 10, $pregunta, 0, 1);
            $pdf->MultiCell(0, 10, $respuesta, 0, 1);
            $pdf->Ln(5); // Salto de línea
        }

        // Genera el PDF
        ob_clean(); // Limpia el búfer de salida sin enviar el contenido al navegador
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="resultados_encuesta.pdf"');
        $pdf->Output();
        ob_end_flush(); // Finaliza el búfer de salida
        exit();
        
        $con->close(); // Cierra la conexión a la base de datos
    } else {
        // Manejo de error si no hay resultados
        echo 'No hay resultados para generar un PDF.';
    }
} else {
    // Manejo de error si no se proporciona el código de búsqueda
    echo 'Código de búsqueda no proporcionado o inválido.';
}
?>