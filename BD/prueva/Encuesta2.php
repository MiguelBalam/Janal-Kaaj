
<?php
$codeLength = 10; // Longitud deseada del código
$code = '';

// Generar el código aleatorio
for ($i = 0; $i < $codeLength; $i++) {
    $code .= rand(0, 9); // Generar un número aleatorio entre 0 y 9 y agregarlo al código
}

// Imprimir el código generado en tu página
echo $code;
?>

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
                    <td><small><strong>CÓDIGO:</strong> <span name="codigo" id="codigo"><?php echo $code; ?></span></small></td>
                </tr>
                <tr>
                    <td><small><strong>VERSIÓN:</strong> <?php echo '1'; ?></small></td>
                </tr>
                <tr>
                    <td class="col-sm-4 text-center">APLICADOR</td>
                    <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                </tr>
                <tr>
                    <td><small><strong>VIGENCIA:</strong> <?php echo date('Y-m-d'); ?></small></td>
                </tr>
                <tr>
                    <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
                    <td><small><strong>TIPO:</strong> <?php echo 'Publico'; ?></small></td>
                </tr>
                <?php
$idEncuesta = '1';
      if ($idEncuesta === '1') {
        echo '<tr>';
        echo '<td class="col-sm-4 text-center">INSTRUCCIONES</td>';
        echo '<td><small>Contestar toda las preguntas.
       </small></td>';
        echo '</tr>';
    }
?>
            </tbody>
        </table>
        <script>
            if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var ubicacion = lat + ',' + lon;
    // Poner los valores en los inputs
    document.getElementById('latitud').value = lat;
   document.getElementById('longitud').value = lon;

    // Haz algo con las coordenadas (lat y lon) aquí
  });
} else {
  console.log("Geolocalización no es compatible en este dispositivo.");
}

        </script>
        <div class="col-sm-6 p-3">
        <div class="row mb-3">
 <label for="latitud">Latitud:</label>
<div class="col-sm-8">
<input type="text" class="form-control" name="latitud" id="latitud">
</div>

<label for="longitud">Longitud:</label>
<div class="col-sm-8">
<input type="text" class="form-control" name="longitud" id="longitud">
</div>
 </div>

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
$username  = "janalkaa_admin";
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

$idEncuesta = '1';
// Obtener datos de la encuesta con ID específico
// Consulta para seleccionar las preguntas que coinciden con el ID de la encuesta y tienen estatus '1'
$sqlPreguntas = "SELECT * FROM reactivos WHERE id_encuesta = '$idEncuesta'";
$query = mysqli_query($con, $sqlPreguntas);

// Verificar si se obtuvieron resultados de la consulta
if ($query) {
    $arrayRespuestas = array(
        "SI" => "SI",
        "NO" => "NO",
    );
}
    ?>

<p id="totalPreguntasBD" data-totalPreg="<?php echo mysqli_num_rows($query); ?>"></p>
<br><br>
       
        <form id="formFormatoGS" onsubmit="GuardarRes(); return false;">
       
<h4 class="text-center">Encuesta Miel:</h4>

        <?php 
while ($dataRow = mysqli_fetch_array($query)) { 
    $questionId = $dataRow['id_pregunta'];
    $responseType = $dataRow['id_tipo_respuesta'];
?>

<tr id="reactivos_<?php echo $questionId; ?>">
    <td><?php echo $questionId; ?></td>
    <td><?php echo strtoupper($dataRow['descripcion']); ?></td>
    <td class="centered-inputs"> <!-- Apply a class for centering -->
        <div class="conteFlex">
            <?php if ($responseType == 1) { ?>
                <!-- Create radio buttons -->
                <?php foreach ($arrayRespuestas as $clave => $valor) { ?>
                    <label class="class_<?php echo $questionId; ?>" id="spanId_<?php echo $questionId . '_' . $clave; ?>" onclick="respuesta('<?php echo $questionId; ?>','<?php echo $clave; ?>')">
                        <input type="radio" name="respuesta[<?php echo $questionId; ?>]" id="idResp_<?php echo $questionId . $clave; ?>" value="<?php echo $clave; ?>">
                        <?php echo ($valor); ?>
                    </label>
                <?php } ?>
            <?php } elseif ($responseType == 4) { ?>
                <!-- Create text input or text area -->
                <?php if ($dataRow['respuesta_abierta'] == 0) { ?>
                    <textarea class="form-control" name="respuesta[<?php echo $questionId; ?>]" id="idResp_<?php echo $questionId; ?>"></textarea>
                <?php } else { ?>
                    <input class="form-control" type="text" name="respuesta[<?php echo $questionId; ?>]" id="idResp_<?php echo $questionId; ?>">
                <?php } ?>
            <?php } ?>
        </div>
    </td>
</tr>

<?php } ?>

            <div class="form-group">
                <label for="observacion">Observaciones</label>
                <textarea name="observacion" class="form-control" rows="3">No hay observación</textarea>
            </div>
            <button type="submit" class="btn btn-primary" name="btnSend" id="btnSend">DEBES RESPONDER TODAS LAS PREGUNTAS</button>
        </form>
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                0%
            </div>
        </div>
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
  <link rel="stylesheet" href="node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css">
  <script src="node_modules/sweetalert2/dist/sweetalert2.all.js"></script>    
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="../prueva/encuesta.js"></script>
</body>
</html>
