<?php
// Incluye la biblioteca FPDF
require '../../Library/fpdf.php';

// Verifica si se proporcionó el código de búsqueda
if (isset($_GET['codigo_busqueda'])) {
    $codigoBusqueda = $_GET['codigo_busqueda'];

    // Realiza la consulta para obtener los resultados de la encuesta en las tres tablas
    $servername = "162.241.60.169";
    $username = "janalkaa_admin";
    $password = "janalkaaj2023";
    $dbname = "janalkaa_kaaj";

    $con = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($con, "utf8");

    if ($con->connect_error) {
        die("Conexión fallida: " . $con->connect_error);
    }

    $sql = "SELECT * FROM vista_inseAlimen WHERE codigo = '$codigoBusqueda'
            UNION ALL
            SELECT * FROM vista_enMiel WHERE codigo = '$codigoBusqueda'
            UNION ALL
            SELECT * FROM vista_enTextil WHERE codigo = '$codigoBusqueda'";

    $query = mysqli_query($con, $sql);
    $resultados = mysqli_fetch_all($query, MYSQLI_ASSOC);
    if (!empty($resultados)) {
        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 16);
    
        $pdf->Cell(40, 10, 'Nombre del encuestado: ' . $resultados[0]['nombre'], 0, 1);
        $pdf->Cell(40, 10, 'Localidad: ' . $resultados[0]['localidad'], 0, 1);
        $pdf->Cell(40, 10, 'Género: ' . $resultados[0]['genero'], 0, 1);
        $pdf->Cell(40, 10, 'Edad: ' . $resultados[0]['edad'], 0, 1);
        $pdf->Cell(40, 10, 'Código: ' . $resultados[0]['codigo'], 0, 1);
        $pdf->Cell(40, 10, 'Fecha de Creación: ' . $resultados[0]['created'], 0, 1);
    
        $pdf->Ln(10); // Salto de línea
    
        foreach ($resultados as $resultado) {
            $pdf->Cell(0, 10, 'Pregunta: ' . $resultado['descripcion'], 0, 1);
            $pdf->Cell(0, 10, 'Respuesta: ' . $resultado['respuesta'], 0, 1);
            $pdf->Ln(5); // Salto de línea
        }
    
        $pdf->Output(); // Salida del PDF
    } else {
        // Manejo de error si no hay resultados
        echo 'No hay resultados para generar un PDF.';
    }
}
