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

$localidadSeleccionada = isset($_POST['localidad']) ? $_POST['localidad'] : '';
$query = "SELECT nombre, localidad, longitud, latitud FROM encuestado_respuesta WHERE localidad = ? ORDER BY id ASC";
$stmt = $con->prepare($query);
$stmt->bind_param('s', $localidadSeleccionada);
$stmt->execute();
$result = $stmt->get_result();

$datos = [];
while($row = $result->fetch_assoc()) {
    $datos[] = $row;
}
$datos_json = json_encode($datos);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Google Maps con Datos de PHP</title>
    <style>
        #map {
            height: 400px;
            width: 100%;
        }
    </style>
</head>
<body>
<form method="post">
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-2 py-2">
              <label for="lugaresPrueba" class="form-label">Elige una localidad:</label>
            </div>
            <div class="col-md-6">
            <select id="lugaresPrueba" name="localidad" class="form-select">
                <option value="Felipe Carrillo Puerto">Felipe Carrillo Puerto</option>
                <option value="San Jose Segundo">San Jose Segundo</option>
                <option value="Dzula">Dzula</option>
                <option value="Pino Suarez">Pino Suarez</option>
                <option value="Mixtequilla">Mixtequilla</option>
                <option value="Chun On">Chun On</option>
              </select>
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn">Seleccionar Localidad</button>
            </div>
          </div>
        </div>
      </form>
<div id="map"></div>

<script>
function initMap() {
    var data = <?php echo $datos_json; ?>;
    
    // Se definen las coordenadas del primer usuario para centrar el mapa
    var center = {lat: parseFloat(data[0].latitud), lng: parseFloat(data[0].longitud)};
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: center
    });

    // Bucle para agregar todos los marcadores al mapa
    for (let item of data) {
        new google.maps.Marker({
            position: {lat: parseFloat(item.latitud), lng: parseFloat(item.longitud)},
            map: map,
            title: item.nombre
        });
    }
}


</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBY0fnUqDbcZ1dTOYqLHFxXBnTjyNKJquM&callback=initMap" async defer></script>
</body>
</html>
