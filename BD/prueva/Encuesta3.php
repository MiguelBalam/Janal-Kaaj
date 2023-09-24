<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Encuesta Reactivo</title>
    <link rel="stylesheet" href="/CSS/bootstrap.min.css">
    <link rel="stylesheet" href="/CSS/style.css">
    <link rel="stylesheet" href="../prueva/encuesta.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body class="color-fondo IBM">
<nav class="navbar navbar-expand-lg fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img src="/Img/Oficial_JanalKaaj.png" width="130px" height="65px">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars ms-1"></i>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarResponsive">
            <ul class="navbar-nav ms-auto py-4 py-lg-0">
                <li class="nav-item"><a class="nav-link" href="planes_servicios.html">Planes y servicios</a></li>
              <li class="nav-item"><a class="nav-link" target="_blank" href="https://www.acnur.org/nutricion-y-seguridad-alimentaria.html">Seguridad-Alimentaria</a></li>
              <li class="nav-item"><a class="nav-link" href="Estadistica/index.html">Estadísticas</a></li>
              <li class="nav-item"><a class="nav-link" href="contactanos.html">Contáctanos</a></li>
              <li class="nav-item"><a class="nav-link" href="login.html">Iniciar Sesión</a></li>
              <li class="nav-item"><button type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="nav-link btnn btn-outline-warning text-white" data-bs-target="#myModal">Registrarse</button></li>
            </ul>      
      </div>
    </nav>
    <div class="modal" tabindex="-1" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content align-content-center">
            <div class="modal-header">
              <h5 class="modal-title">Registro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Usteded quiere registrarse, ¿Cómo encuestado o encuestador?</p>
            </div>
            <div class="modal-footer">
              <a type="button" class="nav-link btnn btn-outline-warning text-white" href="/form_encuestados.html">Encuestado</a>
              <a type="button" class="nav-link btnn btn-outline-warning text-white" href="/form_encuestador.html">Encuestador</a>
            </div>
          </div>
        </div>
      </div>

    <div id="mainForm" class="text-center">
    <table class= 'table table-bordered' id="header">
            <tbody class="color-fondo IBM">
                <tr>
                    <td rowspan="5" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
                    <td rowspan="3" class="col-sm-4 text-center">DATOS ENCUESTA</td>
                    <td><small><strong>CÓDIGO:</strong> <span name="codigo2" id="codigo2"><?php echo rand(); ?></span></small></td>
                </tr>
                <tr>
                    <td><small><strong>VERSIÓN:</strong> <?php echo '1'; ?></small></td>
                </tr>
                <tr>
                    <td><small><strong>VIGENCIA:</strong> <?php echo date('Y-m-d'); ?></small></td>
                </tr>
                <tr>
                    <td class="col-sm-4 text-center">APLICADOR</td>
                    <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                </tr>
                <tr>
                    <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
                    <td><small><strong>TIPO:</strong> <?php echo 'Publico'; ?></small></td>
                </tr>
            </tbody>
        </table>


        <div class="col-sm-6 p-3">

<div class="row mb-3">
<label for="nombrecompletos" class="col-sm-4 col-form-label px-4">Nombre:</label>
<div class="col-sm-8">
<input type="text" class="form-control" name="nombre" id="nombre">
</div>

<label for="nombrecompletos" class="col-sm-4 col-form-label px-4">Localidad:</label>
<div class="col-sm-8">
<input type="text" class="form-control" name="localidad" id="localidad">
</div>
</div>

<div class="row mb-3">
<label for="genero" class="col-sm-4 col-form-label px-4">Género:</label>
<div class="col-sm-8">
<div class="form-check form-check-inline col-md-4">
    <input class="form-check-input" type="checkbox" name="sexo" id="generoMasculino" value="Masculino" required>
    <label class="form-check-label" for="generoMasculino">Masculino</label>
</div>
<div class="form-check form-check-inline col-md-4">
    <input class="form-check-input" type="checkbox" name="sexo" id="generoFemenino" value="Femenino" required>
    <label class="form-check-label" for="generoFemenino">Femenino</label>
</div>
</div>
</div>

<div class="row mb-3">
<label for="edad" class="col-sm-4 col-form-label px-4">Edad:</label>
<div class="col-sm-8">
<input type="number" class="form-control" name="edad" id="edad">
</div>
</div>

</div>

        <?php
$username = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

// Creamos la conexión
$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

// Verificamos la conexión
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

$idEncuesta = '3';

$sqlEncabezado = "SELECT ve.id_variableE, ve.nombre_Var
                 FROM VariableEncabezado ve
                 INNER JOIN Encuesta_Variables ev ON ve.id_variableE = ev.id_VariableE
                 WHERE ev.id_encuesta = '$idEncuesta'";

$queryEncabezado = mysqli_query($con, $sqlEncabezado);

// Verificar si se obtuvieron resultados de la consulta de encabezados
if ($queryEncabezado) {
    // Inicializa un arreglo asociativo para almacenar los valores de encabezado
    $encabezados = array();
    
    // Recorre los resultados y almacena los valores en el arreglo
    while ($encabezadoRow = mysqli_fetch_assoc($queryEncabezado)) {
        $encabezados[$encabezadoRow['id_variableE']] = strtoupper($encabezadoRow['nombre_Var']);
    }
}

// Consulta para seleccionar las preguntas que coinciden con el ID de la encuesta y tienen estatus '1'
// $sqlPreguntas = "SELECT ev.id_Variables, ev.id_VariableE, v.Nobre_Var
//                  FROM Encuesta_Variables ev
//                  JOIN Variable v ON ev.id_Variables = v.id_variable
//                  WHERE ev.id_encuesta = '$idEncuesta'";
$sqlPreguntas = "SELECT ev.id_Variables, ev.id_VariableE, v.Nobre_Var
                 FROM Encuesta_Variables ev
                 JOIN Variable v ON ev.id_Variables = v.id_variable
                 WHERE ev.id_encuesta = '$idEncuesta'";


$queryPreguntas = mysqli_query($con, $sqlPreguntas);

// Verificar si se obtuvieron resultados de la consulta de preguntas
if ($queryPreguntas) {
    $arrayRespuestas = array(
        "0" => "0",
        "1" => "1",
        "2" => "2",
        "3" => "3",
        "P" => "p",
    );
}
?>

<p id="total" data-totalPreg="<?php echo mysqli_num_rows($queryEncabezado); ?>"></p>
<br><br>
<div class="table-responsive">
<h4 class="text-center">Encuesta:</h4>
<form id="formFormato" return false;>
<table class='table table-bordered'>
    
        <th>Influencia</th>
        <?php
        while ($dataRow = mysqli_fetch_array($queryPreguntas)) {
            $variableName = strtoupper($dataRow['Nobre_Var']);
           // $encabezadoId = $dataRow['id_VariableE'];
            echo "<th> $variableName</th>";
        }
        ?>
    
    <?php
    mysqli_data_seek($queryPreguntas, 0); 
    while ($dataRow = mysqli_fetch_array($queryPreguntas)) {
        $questionId = $dataRow['id_Variables'];
       // $encabezadoId = $dataRow['id_VariableE'];
        ?>
       <tr>
    
            <td><?php echo strtoupper($dataRow['Nobre_Var']); ?></td>

            <?php
                for ($col=1;$col<22;$col++) { // Cambia 2 al número de columnas que necesites
                   $respuestaName = "respuesta[$questionId][$col]";
                  // $valorVariable = ($col < 21) ? array_search($col,$arrayRespuestas) : $arrayRespuestas[$col];
                    $valorVariable = "0";
                    echo "<td>
                        <select name='$respuestaName' data-questionid='$questionId'  data-encabezados='$col' data-id-tr='$questionId' onchange='handleSelectChange(this)' >
                            <option value='0' " . ($valorVariable == "0" ? "selected" : "") . ">0</option>
                            <option value='1' " . ($valorVariable == "1" ? "selected" : "") . ">1</option>
                            <option value='2' " . ($valorVariable == "2" ? "selected" : "") . ">2</option>
                            <option value='3' " . ($valorVariable == "3" ? "selected" : "") . ">3</option>
                            <option value='P' " . ($valorVariable == "P" ? "selected" : "") . ">P</option>
                        </select>
                    </td>";
                }
             ?>
         </tr>
        <?php
    }
    ?>

</table>
</div>
</form>



            <div class="form-group">
                <label for="observacion">Observaciones</label>
                <textarea name="observacion" class="form-control" rows="3">No hay observación</textarea>
            </div>
           
        
        <button type="button" class="btn btn-primary" id="btn" onclick=" GuardarResVariable() ">GUARDAR RESPUESTA</button>
        <!-- <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                0%
            </div>
        </div> -->
    </div>
    <script>
document.addEventListener('DOMContentLoaded', function () {
   // var userId = localStorage.getItem('user_id');
    var userCorreo = localStorage.getItem('user_correo');
   // document.getElementById('aqui').value = userCorreo;
 document.getElementById('userCorreo').textContent = userCorreo;
                 // document.getElementById('Institucion').value = userCorreo;
});
         </script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="/BD/prueva/encuesta.js"></script>
</body>
</html>
