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

// Verifica si se ha proporcionado un ID de encuesta en la URL
if (isset($_GET['id_encuesta'])) {
    // Recupera el valor de id_encuesta de la URL
    $id_encuesta = $_GET['id_encuesta'];
    $id_encuestaVar = $_GET['id_encuesta'];

    // Aquí deberías incluir el código para obtener los datos de la encuesta y reactivos utilizando la función obtenerEncuesta($id_encuesta)
    function obtenerEncuesta($id_encuesta) {
        global $con;
        $query_encuestaVar = "SELECT * FROM encuestasVariables WHERE id_encuesta = $id_encuesta";
        $result_encuesta = $con->query($query_encuestaVar);
        $encuestaVar = $result_encuesta->fetch_assoc();
        
        $query_encuesta = "SELECT * FROM encuestas WHERE id_encuesta = $id_encuesta";
        $result_encuesta = $con->query($query_encuesta);
        $encuesta = $result_encuesta->fetch_assoc();
        
       
    
        $query_reactivos = "SELECT * FROM reactivosCreados WHERE id_reactivoC IN (SELECT id_reactivo FROM encuesta_FinalReactivos WHERE id_encuesta = $id_encuesta)";
        $result_reactivos = $con->query($query_reactivos);
        $reactivos = [];

        while ($row = $result_reactivos->fetch_assoc()) {
            $reactivos[] = $row;
        }
        if ($id_encuesta >= 1 && $id_encuesta <= 2) {
            $query_reactivos_predeterminados = "
                SELECT * FROM reactivos WHERE id_encuesta = $id_encuesta
            ";
            $result_reactivos_predeterminados = $con->query($query_reactivos_predeterminados);
            while ($row = $result_reactivos_predeterminados->fetch_assoc()) {
                $reactivos[] = $row;
            }
        }
        return ['encuesta' => $encuesta, 'encuestaVar' => $encuestaVar,'reactivos' => $reactivos];
    }
    
    // Obtener datos de la encuesta con ID específico
    $id_encuesta = $_GET['id_encuesta']; // Recupera el valor de id_encuesta de la URL
    $datos_encuesta = obtenerEncuesta($id_encuesta);
    // Ahora puedes comenzar a generar el contenido HTML del formulario
    ?>

<?php
$arrayRespuestas = array(
    "0" => "0",
    "1" => "1",
    "2" => "2",
    "3" => "3",
    "P" => "p",
);
function obtenerVariablesEncuesta($id_encuesta) {
    global $con;
    $variables = [];

    if ($id_encuesta == 3) {
        $query_varia = "SELECT ev.id_Variables, v.Nobre_Var
        FROM Encuesta_Variables ev
        JOIN Variable v ON ev.id_Variables = v.id_variable
        WHERE ev.id_encuesta = '$id_encuesta'";
        $result_varia = $con->query($query_varia);
        while ($row = $result_varia->fetch_assoc()) {
            $variables[] = $row;
        }
    }else{
        $query_variable = "SELECT * FROM Variable WHERE id_variable IN (SELECT id_variable FROM encuesta_FinalVariables WHERE id_encuesta = $id_encuesta)";
    $result_variables = $con->query($query_variable);
    while ($row = $result_variables->fetch_assoc()) {
        $variables[] = $row;
    }

    }
   
    
    return $variables;
}

$id_encuestaVar = $_GET['id_encuesta'];
$variables_encuesta = obtenerVariablesEncuesta($id_encuestaVar);
?>

    <!DOCTYPE html>
    <html>
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
                    <td rowspan="4" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
                    <td rowspan="3" class="col-sm-4 text-center">DATOS ENCUESTA</td>
                    <td><small><strong>TITULO:</strong> <span name="T" id="T"><?php echo isset($datos_encuesta['encuesta']['titulo']) ? $datos_encuesta['encuesta']['titulo'] : ''; ?>
                    <?php if (isset($datos_encuesta['encuestaVar'])){
                          echo '<span name="T" id="T">' . (isset($datos_encuesta['encuestaVar']['titulo']) ? $datos_encuesta['encuestaVar']['titulo'] : '') . '</span>';
                    } ?>
                </span></small></td>
                   
                </tr>
                <tr>
                    <td><small><strong>OBJETIVO:</strong><?php echo isset($datos_encuesta['encuesta']['objetivo']) ? $datos_encuesta['encuesta']['objetivo'] : ''; ?>
                    <?php if (isset($datos_encuesta['encuestaVar'])){
                          echo (isset($datos_encuesta['encuestaVar']['objetivo']) ? $datos_encuesta['encuestaVar']['objetivo'] : '') ;
                    } ?>
                </small></td>
                </tr>
              
            </tbody>
        </table>    
        <form id="encuestaForm" action="">
        <input type="hidden" name="id_encuesta" value="<?php echo $id_encuesta; ?>">
       
        <?php if (isset($datos_encuesta['reactivos'])) { ?>

        <?php foreach ($datos_encuesta['reactivos'] as $reactivo) { ?>
            <div>
            <?php
            if ($datos_encuesta['encuesta']['id_encuesta'] >= 1 && $datos_encuesta['encuesta']['id_encuesta'] <= 2) {
        // Si es así, mostrar solo los reactivos predefinidos correspondientes
       
    ?>
            <div>
                <label for="reactivo_<?php echo $reactivo['id_pregunta']; ?>">
                    <?php echo $reactivo['descripcion']; ?>
                </label>
                <!-- Resto del código para generar campos de respuesta según el tipo -->
                <?php
            // Obtener el nombre del tipo de respuesta a través de la clave foránea
            $id_tipoRespuesta = $reactivo['id_tipo_respuesta'];
            $query_tipoRespuesta = "SELECT id_tipo_respuesta FROM reactivos WHERE id_tipo_respuesta = $id_tipoRespuesta";
            $result_tipoRespuesta = $con->query($query_tipoRespuesta);
            $tipoRespuesta = $result_tipoRespuesta->fetch_assoc();
            
            // Generar campos de respuesta según el nombre del tipo de respuesta
            if ($tipoRespuesta['id_tipo_respuesta'] == 4) {
                echo '<input  class="form-control" type="text" name="reactivo_'.$reactivo['id_pregunta'].'" id="reactivo_'.$reactivo['id_pregunta'].'">';
            } elseif ($tipoRespuesta['id_tipo_respuesta'] == 1) {
                echo '<table>';
                echo '<thead>';
                echo '<tr id="cabecera">';
                echo '</tr>';
                echo '</thead>';
                echo '<tbody>';
                echo '<tr>';
                echo '<td>';
                echo '<label class="form-check-label" for="reactivo_'.$reactivo['id_pregunta'].'_si">Sí';
                echo '<input class="form-check-input" type="checkbox" name="respuesta_'.$reactivo['id_pregunta'].'" id="reactivo_'.$reactivo['id_pregunta'].'_si" value="Sí"></label>';
                echo '</label>';
                echo '<label class="form-check-label" for="reactivo_'.$reactivo['id_pregunta'].'_no">No</label>';
                echo '<input class="form-check-input" type="checkbox" name="reactivo_'.$reactivo['id_pregunta'].'" id="reactivo_'.$reactivo['id_pregunta'].'_no" value="No">';
                echo '</td>';
                echo '</tr>';
                echo '</tbody>';
                echo '</table>';
               
            }
        ?>
            </div>
    <?php
        
    } else {
        // Si no está en el rango 1 al 3, mostrar los reactivos creados
    ?>
            <div>
                <label for="reactivo_<?php echo $reactivo['id_reactivoC']; ?>">
                    <?php echo $reactivo['descripcion']; ?>
                    <?php if ($reactivo['obligatorio']) { ?>
                        <span>*</span>
                    <?php } ?>
                </label>
                <td class="centered-inputs"> 
                <?php
            // Obtener el nombre del tipo de respuesta a través de la clave foránea
            $id_tipoRespuesta = $reactivo['id_tipoRespuesta'];
            $query_tipoRespuesta = "SELECT nombre_tipo_respuesta FROM tiposRespuesta WHERE id_tipoRespuesta = $id_tipoRespuesta";
            $result_tipoRespuesta = $con->query($query_tipoRespuesta);
            $tipoRespuesta = $result_tipoRespuesta->fetch_assoc();
            
            // Generar campos de respuesta según el nombre del tipo de respuesta
            if ($tipoRespuesta['nombre_tipo_respuesta'] == 1) {
                echo '<input  class="form-control" type="text" name="reactivo_'.$reactivo['id_reactivoC'].'" id="reactivo_'.$reactivo['id_reactivoC'].'" '.($reactivo['obligatorio'] ? 'required' : '').'>';
            } elseif ($tipoRespuesta['nombre_tipo_respuesta'] == 2) {
                echo '<div class="col-4"';
                echo '<label class="form-check-label for="reactivo_'.$reactivo['id_reactivoC'].'_si">Sí</label>';
                echo '<input class="form-check-input" type="checkbox"name="reactivo_'.$reactivo['id_reactivoC'].'" id="reactivo_'.$reactivo['id_reactivoC'].'_si" value="Sí" '.($reactivo['obligatorio'] ? 'required' : '').'>';
                echo '</div>';
                echo '<div class="col-4"';
                echo '<label class="form-check-label  for="reactivo_'.$reactivo['id_reactivoC'].'_no">No</label>';
                echo '<input class="form-check-input" type="checkbox" name="reactivo_'.$reactivo['id_reactivoC'].'" id="reactivo_'.$reactivo['id_reactivoC'].'_no" value="No" '.($reactivo['obligatorio'] ? 'required' : '').'>';
                echo '</div>';
               
            }
            elseif ($tipoRespuesta['nombre_tipo_respuesta'] == 3) {
                $queryOpciones = "SELECT id_opcion, descripcion_opcion FROM opciones_respuesta WHERE id_reactivoC = " . $reactivo['id_reactivoC'];
               $resultOpciones = $con->query($queryOpciones);
    
               if ($resultOpciones->num_rows > 0) {
                while ($opcion = $resultOpciones->fetch_assoc()) {
                    echo '<div class="col-4">';
                    echo '<label class="form-check-label" for="reactivo_' . $reactivo['id_reactivoC'] . '_opcion_' . $opcion['id_opcion'] . '">' . $opcion['descripcion_opcion'] . '</label>';
                    echo '<input class="form-check-input" type="checkbox" name="reactivo_' . $reactivo['id_reactivoC'] . '_opcion_' . $opcion['id_opcion'] . '" id="reactivo_' . $reactivo['id_reactivoC'] . '_opcion_' . $opcion['id_opcion'] . '" value="' . $opcion['id_opcion'] . '" ' . ($reactivo['obligatorio'] ? 'required' : '') . '>';
                    echo '</div>';
                }
            }else {
                echo 'No se encontraron opciones de respuesta para este reactivo.';
            }
            }
        ?>
            </div>
            </td>
                
            </div>
    <?php
    }
    
    ?>    
       <?php } ?> 
       <?php if ($datos_encuesta=$variables_encuesta) { ?>
        <div class="table-responsive">
        <table class='table table-bordered'>
            <tr>
            <th>.INFLUENCIA.</th>
                <?php foreach ($variables_encuesta as $variable) : ?>
                    <th><?= strtoupper($variable['Nobre_Var']) ?></th>
                <?php endforeach; ?>
            </tr>
            <?php foreach ($variables_encuesta as $variable) : ?>
                <tr>
                    <td><?= strtoupper($variable['Nobre_Var']) ?></td>
                    <?php foreach ($variables_encuesta as $otherVariable) : ?>
                        <td>
                            <?php
                           // $questionId = $otherVariable['id_Variables'];
                          // $questionId = $otherVariable['id_Variables'];
                           $respuestaName = "respuesta[][" . $variable['Nobre_Var'] . "]";
                           $valorVariable = isset($arrayRespuestasVar[$variable['Nobre_Var']]) ? $arrayRespuestasVar[$variable['Nobre_Var']] : "0";
                            ?>
                          <select name="<?= $respuestaName ?>" data-id="" onchange="handleSelectChange(this)">
                                <option value="0" <?= ($valorVariable == "0" ? "selected" : "") ?>>0</option>
                                <option value="1" <?= ($valorVariable == "1" ? "selected" : "") ?>>1</option>
                                <option value="2" <?= ($valorVariable == "2" ? "selected" : "") ?>>2</option>
                                <option value="3" <?= ($valorVariable == "3" ? "selected" : "") ?>>3</option>
                                <option value="P" <?= ($valorVariable == "P" ? "selected" : "") ?>>P</option>
                            </select>
                        </td>
                    <?php endforeach; ?>
                </tr>
            <?php endforeach; ?>
        </table>
        </div>
        <?php } ?>  
        <?php } ?>
        
    </form>
    <div class="row mb-2">
        <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza " type="submit" onclick="editarEncuesta()">Editar</button>
        <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza " type="button"  onclick="window.location.href='/pestanas_Encuestador/dashboard.html'">Guardar</button>
         </div>
        </div>
      </div>
      <script>
    function editarEncuesta() {
        // Obtener el valor del parámetro "id" de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id_encuesta');
        
        // Verificar si se encontró un ID válido
        if (id) {
            // Redireccionar a la página de edición con el ID
            window.location.href = `/CRUD/encuestaEditar.html?id=${id}`;
        } else {
            // Manejar el caso en el que no se encontró un ID válido
            alert('No se encontró un ID de encuesta válido en la URL');
        }
    }
</script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
<script src="../prueva/encuesta.js"></script>
   
</body>
    </html>
    
    <?php
} else {
    // Manejo en caso de que no se proporcione el ID de encuesta
    echo "ID de encuesta no válido.";
}
?>
