<?php

// Incluimos el archivo de conexión a base de datos
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

session_start();

// Verificar si el aplicador ha iniciado sesión
if (isset($_SESSION['id'])) {
    $aplicador_actual = $_SESSION['id'];
    // Ahora puedes usar $aplicador_actual en tu consulta SQL como se mostró en respuestas anteriores
} else {
    // Si el aplicador no ha iniciado sesión, redirigirlo al formulario de inicio de sesión
    header("Location: login.html");
    exit();
}
$aplicador_actual =  $_SESSION['id']; // Debes obtener el nombre del aplicador actual de alguna manera
$query = "SELECT DISTINCT e.* FROM encuesta_FinalReactivos ef
          RIGHT JOIN encuestas e ON ef.id_encuesta = e.id_encuesta
          WHERE ef.id_usuario = $aplicador_actual OR e.id_encuesta BETWEEN 1 AND 3";
//$query = "SELECT * FROM encuestas ORDER BY id_encuesta DESC";
$resultado = $con->query($query);

// Diseñamos el encabezado de la tabla
$data = '

    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card shadow-2-strong" style="background-color: #f5f7fa;">
              <div class="card-body">
                <div class="table-responsive">

                
    <table class="table table-bordered table-hover table-condensed">
        <thead class="thead-light">
            <tr>
                <th>ID encuesta</th>
                <th>Título</th>
                <th>Estado</th>
                <th>Fecha Inicio</th>
                <th>Accciones</th>
            </tr>
        </thead>';


        while ($row = $resultado->fetch_assoc()) {
          $data .= '
              <tr>
                  <td>' . $row["id_encuesta"] . '</td>
                  <td width="100">' . mb_strimwidth($row['titulo'], 0, 20, "...") . '</a></td>
                  <td>' . $row["estado"] . '</td>
                  <td>' . $row["fecha_inicio"] . '</td>
                  <td>
                      <a href="/BD/prueva/encuestaVista.php?id_encuesta=' . $row['id_encuesta'] . '"><button class="btn btn-info type="button">Detalles</button></a>  
                      <a href="#" onclick="aplicarEncuesta(' . $row['id_encuesta'] . ')"> 
                          <button class="btn btn-info" type="button">Aplicar</button>
                      </a>
                  </td>
              </tr>';
      }

<<<<<<< HEAD
while ($row = $resultado->fetch_assoc()) {
    $data .= '
        <tbody>
            <tr>
                <td>' . $row["id_encuesta"] . '</td>
                <td width="100" id="titulo">' . mb_strimwidth($row['titulo'], 0, 20, "...") . '</a></td>
                <td>' . $row["estado"] . '</td>
                <td>' . $row["fecha_inicio"] . '</td>
                <td>
                <a href="/BD/prueva/encuestaVista.php?id_encuesta=' . $row['id_encuesta'] . '"><button class="btn btn-info type="button">Detalles</button></a>  
                <a href="#" onclick="aplicarEncuesta(' . $row['id_encuesta'] . ')"> 
                <button class="btn btn-info" type="button">Aplicar</button>
            </a>
=======
// while ($row = $resultado->fetch_assoc()) {
//     $data .= '
//         <tbody>
//             <tr>
//                 <td>' . $row["id_encuesta"] . '</td>
//                 <td width="100">' . mb_strimwidth($row['titulo'], 0, 20, "...") . '</a></td>
//                 <td>' . $row["estado"] . '</td>
//                 <td>' . $row["fecha_inicio"] . '</td>
//                 <td>
//                 <a href="/BD/prueva/encuestaVista.php?id_encuesta=' . $row['id_encuesta'] . '"><button class="btn btn-info type="button">Detalles</button></a>  
//                 <a href="#" onclick="aplicarEncuesta(' . $row['id_encuesta'] . ')"> 
//                 <button class="btn btn-info" type="button">Aplicar</button>
//             </a>
>>>>>>> 4daf80261a08805ce86e37c2ef3125b02ce8ea2b
            

//                 </td>
//             </tr>
//         </tbody>
//         </div>
        
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
 
        
//         ';
// }

$query_otra_tabla = "SELECT DISTINCT e.* FROM encuesta_FinalVariables ef
RIGHT JOIN encuestasVariables e ON ef.id_encuesta = e.id_encuesta
WHERE ef.id_usuario = $aplicador_actual OR e.id_encuesta BETWEEN 1 AND 3";
$result_otra_tabla = $con->query($query_otra_tabla);
while ($row = $result_otra_tabla->fetch_assoc()): {
  $data .= '
  <tbody>
      <tr>
          <td>' . $row["id_encuesta"] . '</td>
          <td width="100">' . mb_strimwidth($row['titulo'], 0, 20, "...") . '</a></td>
          <td>' . $row["estado"] . '</td>
          <td>' . $row["fecha_inicio"] . '</td>
          <td>
          <a href="/BD/prueva/encuestaVista.php?id_encuesta=' . $row['id_encuesta'] . '"><button class="btn btn-info type="button">Detalles</button></a>  
          <a href="#" onclick="aplicarEncuesta(' . $row['id_encuesta'] . ')"> 
          <button class="btn btn-info" type="button">Aplicar</button>
      </a>
      

          </td>
      </tr>
  </tbody>
  </div>
  
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  
  ';
}


 
endwhile; 

$data .= '</table></div></div></div></div></div></div></div>';
//$data .= '</table>';

echo $data;

