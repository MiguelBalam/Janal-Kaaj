

  // Si no hay conexión a Internet, crea y envía un mensaje al worker

  var db;

function mostrarEncuestas() {
    const dbName = 'miBaseDeDatos';
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['encuestas'], 'readonly');
        const tableContainer = document.getElementById('resultado2');

        transaction.oncomplete = () => {
            console.log('Datos cargados desde IndexedDB correctamente');

            const btns = tableContainer.getElementsByClassName("btn-info");
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function (event) {
                    const IdEn = event.target.getAttribute("data-encuesta-id");
                    abrirPestanaConFormulario(IdEn);
                });
            }
        };

        transaction.onerror = (event) => {
            console.error('Error al cargar datos desde IndexedDB:', event.target.error);
        };

        const encuestasStore = transaction.objectStore('encuestas');
        const encuestasRequest = encuestasStore.openCursor();

        let cadena = "<table table-bordered table-hover table-condensed>";
        cadena+="<th>ID encuesta</th>";
        cadena+="<th>Título</th>";
        cadena+="<th>Estado</th>";
        cadena+="<th>Fecha Inicio</th>";
        cadena+="<th>Acciones</th>";
        encuestasRequest.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const encuestaId = cursor.value.id_encuesta;
                const descripcion = cursor.value.titulo;
                const estado = cursor.value.estado;
                const fecha = cursor.value.fecha_inicio;
                cadena += "<tr>";
                cadena += "<td>" + encuestaId + "</td>";
                cadena += "<td>" + descripcion + "</td>";
                cadena += "<td>" + estado + "</td>";
                cadena += "<td>" + fecha + "</td>";
                cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' class='btn btn-info'>Aplicar</button></a></td>";
                cadena += "</tr>";
                cursor.continue();
            } else {
                cadena += "</table>";
                tableContainer.innerHTML = cadena;
            }
        };
    };
}

  function abrirPestanaConFormulario(id_encuesta) {
    // Generar el contenido HTML dinámico aquí
    
 // Variable global para vigenciaValue
    var dynamicHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crear Encuesta Reactivo</title>
        <link rel="stylesheet" href="/CSS/bootstrap.min.css">
        <link rel="stylesheet" href="/CSS/style.css">
    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap" rel="stylesheet">
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
    <div id="mainForm" class="text-center">
    <table class="table table-bordered">
    <tbody class="color-fondo IBM">

        <tr>
            <td rowspan="4" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
            <td rowspan="3" class="col-sm-4 text-center">DATOS ENCUESTA</td>
            <td><small><strong>CÓDIGO:</strong> <span name="codigo" id="codigo" ></span></small></td>
        </tr>
        <tr>
            <td><small><strong>VERSIÓN:</strong> <span id="version"></span></small></td>
        </tr>
        <tr>
            <td><small><strong>VIGENCIA:</strong> <span id="vigencia"></span></small></td>
        </tr>
        <tr>
            <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
            <td><small><strong>TIPO:</strong> <span id="tipo"></span></small></td>
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
        
            <form id="formFormatoGS" class="needs-validation" data-encuesta-id="${id_encuesta}">
                <table  class="form-control text-center">
                    <tbody class="centered-inputs" id="preguntasContainer">
                        <!-- Preguntas se cargarán aquí desde IndexedDB -->
                    </tbody>
                </table>
                <div class="form-group">
                    <label for="observacion">Observaciones</label>
                    <textarea name="observacion" id="observacion" class="form-control" rows="3">No hay observación</textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="btnSend">DEBES RESPONDER TODAS LAS PREGUNTAS</button>
            </form>
            </div>
            <script>

            
            
            // Generar los valores dinámicamente
         var codigoValue = Math.floor(Math.random() * 10000); // Generar un número aleatorio como código
        var versionValue = '1'; // Definir la versión
        var vigenciaValue = new Date().toISOString().slice(0, 10); // Obtener la fecha actual en formato YYYY-MM-DD
        var tipoValue = 'Público'; // Definir el tipo de encuesta

            var codigoSpan = document.getElementById('codigo');
            var versionSpan = document.getElementById('version');
            var vigenciaSpan = document.getElementById('vigencia');
            var tipoSpan = document.getElementById('tipo');

         //Asignar los valores a los elementos <span>
            codigoSpan.textContent = codigoValue;
            versionSpan.textContent = versionValue;
            vigenciaSpan.textContent = vigenciaValue;
            tipoSpan.textContent = tipoValue;
            </script>
            
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>   
              <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>

            </body>
            </html>
    `;
 
    console.log('ID de Encuesta:', id_encuesta);
    const cacheName = 'formulario-cache';
    const cacheKey = `formulario-${id_encuesta}`;
    const htmlResponse = new Response(dynamicHtml, {
        headers: { 'Content-Type': 'text/html' }
      
    });

    caches.open(cacheName).then(cache => {
        cache.put(cacheKey, htmlResponse);
      
    
    });
   
    var nuevaPestana = window.open("", "_blank");

    nuevaPestana.document.write(dynamicHtml);
   
        // Obtener el formulario por su identificador único
    
   
        // Ahora puedes ejecutar el código de IndexedDB aquí
        var request = indexedDB.open("miBaseDeDatos");

        request.onerror = function (event) {
            console.error("Error al abrir la base de datos: " + event.target.errorCode);
        };

        request.onsuccess = function (event) {
            var db = event.target.result;
            var transaction = db.transaction("reactivos");
            var objectStore = transaction.objectStore("reactivos");
            var index = objectStore.index("id_encuesta");

            var preguntasContainer = nuevaPestana.document.getElementById("preguntasContainer");
          
          // ...

index.openCursor(IDBKeyRange.only(id_encuesta)).onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
        var pregunta = cursor.value.descripcion;
        var responseType = cursor.value.id_tipo_respuesta;
        var preguntaDiv = document.createElement("div");
        var preguntaLabel = document.createElement("label");
        preguntaLabel.textContent = pregunta + ": ";
        preguntaDiv.appendChild(preguntaLabel);

        // Agregar un atributo data-id con el ID de la pregunta
        preguntaDiv.setAttribute("data-id", cursor.value.id_pregunta);

        if (responseType == 1) {
            var arrayRespuestas = ["SI", "NO"];
            for (var i = 0; i < arrayRespuestas.length; i++) {
                var respuestaDiv = document.createElement("div");
                respuestaDiv.classList.add("form-check", "form-check-inline", "col-md-4");

                var respuestaLabel = document.createElement("label");
                var respuestaInput = document.createElement("input");
                respuestaInput.setAttribute("type", "checkbox");
                respuestaInput.setAttribute("name", "respuesta");
                respuestaInput.setAttribute("class", "centered-inputs");
                respuestaInput.setAttribute("value", arrayRespuestas[i]);
                respuestaInput.classList.add("form-check-input");

                respuestaLabel.textContent = arrayRespuestas[i];
                respuestaLabel.classList.add("form-check-label", "form-check-inline");

                respuestaDiv.appendChild(respuestaInput);
                respuestaDiv.appendChild(respuestaLabel);

                // Agregar un atributo data-id con el ID de la pregunta
                respuestaDiv.setAttribute("data-id", cursor.value.id_pregunta);

                preguntaDiv.appendChild(respuestaDiv);
            }
        } else if (responseType == 4) {
            var preguntaInput = document.createElement("input");
            preguntaInput.setAttribute("type", "text");
            preguntaInput.classList.add("form-control");
            preguntaInput.setAttribute("data-id", cursor.value.id_pregunta);
            preguntaDiv.appendChild(preguntaInput);

        }

        preguntasContainer.appendChild(preguntaDiv);

        cursor.continue();
    }
};
var preguntaID
var respuestaValue

var respuestas = [];

// Agregar un evento para capturar las respuestas
preguntasContainer.addEventListener("change", function (event) {
    var preguntaDiv = event.target.closest("div[data-id]"); // Obtener el div que contiene el atributo data-id
    if (preguntaDiv) {
        preguntaID = preguntaDiv.getAttribute("data-id");
        respuestaValue = event.target.value;
        
        var respuesta = {
            codigo: nuevaPestana.codigoValue,
            id_encuesta: id_encuesta,
            created: nuevaPestana.vigenciaValue,
            id_pregunta: preguntaID,
            respuesta: respuestaValue,
            observacion:nuevaPestana.document.getElementById('observacion').value
        };
        respuestas.push(respuesta);
        // Ahora puedes utilizar preguntaID y respuestaValue como desees
        console.log("Pregunta ID: " + preguntaID);
        console.log("Respuesta: " + respuestaValue);
    }
});
var encuestadoData;

nuevaPestana.document.getElementById('formFormatoGS').addEventListener('submit', function (event) {
    event.preventDefault();
var id_encuesta = nuevaPestana.document.getElementById('formFormatoGS').getAttribute('data-encuesta-id');
// Agregar un evento de escucha al botón dentro del formulario
console.log(nuevaPestana.codigoValue,nuevaPestana.vigenciaValue)
    // Evitar el envío del formulario por defecto

     encuestadoData = {
        nombre: nuevaPestana.document.getElementById('nombre').value,
        localidad: nuevaPestana.document.getElementById('localidad').value,
        genero: nuevaPestana.document.querySelector('input[name="sexo"]:checked').value,
        edad: nuevaPestana.document.getElementById('edad').value,
        codigo: nuevaPestana.codigoValue,
        id_encuesta: id_encuesta
    };
 
    for (var i = 0; i < respuestas.length; i++) {
        var espuestaData = respuestas[i];
    guardarEnIndexedDB(espuestaData,id_encuesta);
    }
    // Captura las respuestas de las preguntas desde el DOM y almacénalas en respuestasData
   guardarEnIndexedDBEncuestado(id_encuesta,encuestadoData)
    // Llama a la función para guardar en IndexedDB
    //guardarEnIndexedDB(id_encuesta,encuestadoData, respuestaData);

    // Después de guardar los datos en IndexedDB, puedes redirigir a la pestaña principal
    nuevaPestana.location.href = "/pestañas_Encuestador/dashboard.html"; // Cambia "index.html" por la URL que desees
});


        };
    };


    // Función para guardar los datos en IndexedDB
function guardarEnIndexedDB(espuestaData,id_encuesta) {
    // var request = indexedDB.open("miBaseDeDatos");
    const dataToUpdate = {
        id_encuesta:id_encuesta,
    espuestaData: espuestaData
  
      };
    // console.log('ID de Encuesta:', id_encuesta);
    // request.onerror = function (event) {
    //     console.error("Error al abrir la base de datos: " + event.target.errorCode);
    // };

    // request.onsuccess = function (event) {
    //     var db = event.target.result;
    //     var transaction = db.transaction("respuestas_encuesta", "readwrite");

    //     // Almacena los datos de la encuesta en la tabla "encuesta"
    //     var encuestaRespuestasStore = transaction.objectStore("respuestas_encuesta");
      
    //     var respuestaRequest = encuestaRespuestasStore.add(respuestaData);

    //     respuestaRequest.onsuccess = function (event) {
    //         console.log("Respuesta de encuesta guardada en IndexedDB");
    //         registrarActualizacionEnCola(id_encuesta, respuestaData);
    //     };
    // };
    registrarActualizacionEnColaRes(dataToUpdate)
}

function guardarEnIndexedDBEncuestado(id_encuesta, encuestadoData) {
    const dataToUpdate = {
      encuestadoData: encuestadoData,
      id_encuesta:id_encuesta
    };
  
    // Registra la actualización en la cola de actualizaciones pendientes en IndexedDB
    registrarActualizacionEnCola(dataToUpdate);
  
    console.log('ID de Encuesta:', id_encuesta);
  
    // No guardes los datos directamente aquí, en lugar de eso, usa la función registrarActualizacionEnCola().
  }
  function registrarActualizacionEnCola(data) {
    const dbName = 'miBaseDeDatos';
    const objectStoreName = 'cola';
  
    const request = indexedDB.open(dbName);
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(objectStoreName, 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
  
      // Agrega la actualización a la cola
      objectStore.add(data);
  
      transaction.oncomplete = () => {
        console.log('Actualización registrada en la cola de IndexedDB.');
        db.close();
      };
  
      transaction.onerror = (event) => {
        console.error('Error al registrar la actualización en la cola de IndexedDB:', event.target.error);
        db.close();
      };
    };
  
    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', event.target.error);
    };
  }

  function registrarActualizacionEnColaRes(dat) {
    const dbName = 'miBaseDeDatos';
    const objectStoreName = 'RespuestasCola';
  
    const request = indexedDB.open(dbName);
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(objectStoreName, 'readwrite');
      const objectStore = transaction.objectStore(objectStoreName);
  
      // Agrega la actualización a la cola
      objectStore.add(dat);
  
      transaction.oncomplete = () => {
        console.log('Actualización registrada en la cola de IndexedDB.');
        db.close();
      };
  
      transaction.onerror = (event) => {
        console.error('Error al registrar la actualización en la cola de IndexedDB:', event.target.error);
        db.close();
      };
    };
  
    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', event.target.error);
    };
  }
// function guardarEnIndexedDBEncuestado(id_encuesta,encuestadoData) {
//     var request = indexedDB.open("miBaseDeDatos");
//     console.log('ID de Encuesta:', id_encuesta);
//     request.onerror = function (event) {
//         console.error("Error al abrir la base de datos: " + event.target.errorCode);
//     };

//     request.onsuccess = function (event) {
//         var db = event.target.result;
//         var transaction = db.transaction("encuestado_respuesta", "readwrite");

//         // Almacena los datos de la encuesta en la tabla "encuesta"
//         var encuestaStore = transaction.objectStore("encuestado_respuesta");
//         var encuestaRequest = encuestaStore.add(encuestadoData);

//         encuestaRequest.onsuccess = function (event) {
//             console.log("Datos de encuesta guardados en IndexedDB");
//         };
//     };
// }

