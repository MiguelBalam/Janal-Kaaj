if (!navigator.onLine) {
    var tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario) {
      if (tipoUsuario === 'encuestador') {
        // Llama a la función mostrarEncuestas con el tipo de usuario "encuestador"
        mostrarEncuestas('encuestador');
        mostrarEncuestasVar('encuestador') 
      } else if (tipoUsuario === 'aplicador') {
        var aplicador = localStorage.getItem('user_correo');
        var aplicadorVar = localStorage.getItem('user_correo');
        // Llama a la función mostrarEncuestas con el tipo de usuario "aplicador"
       mostrarEncuestasApli(aplicador);
        mostrarEncuestasApliVar(aplicadorVar);
      } else {
        console.log('Tipo de usuario desconocido');
        // Puedes manejar el caso de tipo de usuario desconocido aquí
      }
    } else {
      console.error('No se pudo obtener el tipo de usuario desde IndexedDB');
    }
  } else {
    console.log('El dispositivo está en línea. La función no se ejecutará.');
  }
  

  var db;

//   function mostrarEncuestas() {
//     const dbName = 'miBaseDeDatos';
//     const request = indexedDB.open(dbName);
  
//     request.onerror = (event) => {
//       console.error('Error al abrir la base de datos:', event.target.error);
//     };
  
//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const tableContainer = document.getElementById('resultado2');
//       const userId = localStorage.getItem('user_id'); // Reemplaza 'userId' con la clave correcta en tu localStorage.
  
//       const transaction = db.transaction(['encuestas'], 'readonly');
//       const encuestasStore = transaction.objectStore('encuestas');
//       const index = encuestasStore.index('id_usuario'); // Suponiendo que tienes un índice llamado 'userId' en tu almacén de encuestas.
  
//       transaction.oncomplete = () => {
//         console.log('Datos cargados desde IndexedDB correctamente');
  
//         const btns = tableContainer.getElementsByClassName("btn-info");
//         for (let i = 0; i < btns.length; i++) {
//           btns[i].addEventListener("click", function (event) {
//             const IdEn = event.target.getAttribute("data-encuesta-id");
//             const Instrucciones = event.target.getAttribute("data-instrucciones");
//             if (IdEn <= 2) {
//               abrirPestanaConFormulario(IdEn,Instrucciones);
//             } else if (IdEn == 3) {
//               abrir(IdEn,Instrucciones);
//             } else {
//               mostrar(IdEn,Instrucciones);
//             }
//           });
//         }
//       };
  
//       transaction.onerror = (event) => {
//         console.error('Error al cargar datos desde IndexedDB:', event.target.error);
//       };


// const getrequest = encuestasStore.openCursor();

// getrequest.onsuccess = (event) => {
//   const cursor = event.target.result;

//   if (cursor ) {
//     const encuesta = cursor.value;
//     const encuestaId = encuesta.id_encuesta;
//     const descripcion = encuesta.titulo;
//     const Instrucciones = encuesta.instrucciones;
//     const estado = encuesta.estado;
//     const fecha = encuesta.fecha_inicio;

//     cadena += "<tr>";
//     cadena += "<td>" + encuestaId + "</td>";
//     cadena += "<td>" + descripcion + "</td>";
//     cadena += "<td>" + estado + "</td>";
//     cadena += "<td>" + fecha + "</td>";
//     cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='" + Instrucciones + "' class='btn btn-info'>Aplicar</button></a></td>";
//     cadena += "</tr>";

   
//     cursor.continue();
//   }else {
//     cadena += "</table>";
//     tableContainer.innerHTML = cadena;
//   }
// };

//       // Realiza una consulta para obtener las encuestas asociadas al ID del usuario.
//       const request = index.openCursor(IDBKeyRange.only(userId));
 
//       let cadena = "<table class='table table-bordered table-hover table-condensed' >";
//       cadena += "<th>ID encuesta</th>";
//       cadena += "<th>Título</th>";
//       cadena += "<th>Estado</th>";
//       cadena += "<th>Fecha Inicio</th>";
//       cadena += "<th>Acciones</th>";
     
      
//       request.onsuccess = (event) => {
//         const cursor = event.target.result;
//         if (cursor) {
//           const encuestaId = cursor.value.id_encuesta;
//           const descripcion = cursor.value.titulo;
//           const Instrucciones = cursor.value.instrucciones;
//           const estado = cursor.value.estado;
//           const fecha = cursor.value.fecha_inicio;

//             cadena += "<tr>";
//             cadena += "<td>" + encuestaId + "</td>";
//             cadena += "<td>" + descripcion + "</td>";
//             cadena += "<td>" + estado + "</td>";
//             cadena += "<td>" + fecha + "</td>";
//             cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='" + Instrucciones + "' class='btn btn-info'>Aplicar</button></a></td>";
//             cadena += "</tr>";
          

//           cursor.continue();
//         } else {
//           cadena += "</table>";
//           tableContainer.innerHTML = cadena;
//         }
//       };
//     };
//   }
  
function mostrarEncuestas() {
  const dbName = 'miBaseDeDatos';
  const request = indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const tableContainer = document.getElementById('resultado2');
    const transaction = db.transaction(['encuestas'], 'readonly');
    const encuestasStore = transaction.objectStore('encuestas');
   
  
    
    let cadena = "<table class='table table-bordered table-hover table-condensed' >";
    cadena += "<th>ID encuesta</th>";
    cadena += "<th>Título</th>";
    cadena += "<th>Estado</th>";
    cadena += "<th>Fecha Inicio</th>";
    cadena += "<th>Acciones</th>";

    const getrequest = encuestasStore.openCursor();
    let count = 0; // Variable para contar las encuestas mostradas

    getrequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor && count < 3) {
        const encuestaId = cursor.value.id_encuesta;
        const descripcion = cursor.value.titulo;
        const Instrucciones = cursor.value.instrucciones;
        const estado = cursor.value.estado;
        const fecha = cursor.value.fecha_inicio;

        cadena += "<tr>";
        cadena += "<td>" + encuestaId + "</td>";
        cadena += "<td>" + descripcion + "</td>";
        cadena += "<td>" + estado + "</td>";
        cadena += "<td>" + fecha + "</td>";
        cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='" + Instrucciones + "' class='btn btn-info'>Aplicar</button></a></td>";
        cadena += "</tr>";

        count++;
        cursor.continue();
      } else {
        // Si ya se mostraron las tres primeras encuestas, realizar la consulta para el usuario actual
        const userId = localStorage.getItem('user_id');
        const userIndex = encuestasStore.index('id_usuario');
        const userRequest = userIndex.openCursor(IDBKeyRange.only(userId));

        userRequest.onsuccess = (event) => {
          const userCursor = event.target.result;
          if (userCursor) {
            const encuestaId = userCursor.value.id_encuesta;
            const descripcion = userCursor.value.titulo;
            const Instrucciones = userCursor.value.instrucciones;
            const estado = userCursor.value.estado;
            const fecha = userCursor.value.fecha_inicio;

            cadena += "<tr>";
            cadena += "<td>" + encuestaId + "</td>";
            cadena += "<td>" + descripcion + "</td>";
            cadena += "<td>" + estado + "</td>";
            cadena += "<td>" + fecha + "</td>";
            cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='" + Instrucciones + "' class='btn btn-info'>Aplicar</button></a></td>";
            cadena += "</tr>";

            userCursor.continue();
          } else {
            cadena += "</table>";
            tableContainer.innerHTML = cadena;
          }
        };
      }
    };

    transaction.oncomplete = () => {
      console.log('Datos cargados desde IndexedDB correctamente');
      console.log('Datos cargados desde IndexedDB correctamente');
  
      const btns = tableContainer.getElementsByClassName("btn-info");
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (event) {
          const IdEn = event.target.getAttribute("data-encuesta-id");
          const Instrucciones = event.target.getAttribute("data-instrucciones");
          if (IdEn <= 2) {
            abrirPestanaConFormulario(IdEn,Instrucciones);
          } else if (IdEn == 3) {
            abrir(IdEn,Instrucciones);
          } else {
            mostrar(IdEn,Instrucciones);
          }
        });
      }
    };

    transaction.onerror = (event) => {
      console.error('Error al cargar datos desde IndexedDB:', event.target.error);
    };
  };
}



function mostrarEncuestasApli(aplicador) {
    const dbName = 'miBaseDeDatos';
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['encuestas', 'asignaciones'], 'readonly');
        const tableContainer = document.getElementById('resultadoApli');
       
        transaction.oncomplete = () => {
            console.log('Datos cargados desde IndexedDB correctamente');

            const btns = tableContainer.getElementsByClassName("btn-info");
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function (event) {
                    const IdEn = event.target.getAttribute("data-encuesta-id");
                    const Instrucciones = event.target.getAttribute("data-instrucciones");
                   if(IdEn <= 3){
                        abrirPestanaConFormulario(IdEn,Instrucciones);
                    }else{
                        mostrar(IdEn,Instrucciones)
                    }

                });
            }
        };


        transaction.onerror = (event) => {
            console.error('Error al cargar datos desde IndexedDB:', event.target.error);
        };

        const asignacionesStore = transaction.objectStore('asignaciones');
        const encuestasStore = transaction.objectStore('encuestas');
        const index = asignacionesStore.index('aplicador'); // Suponiendo que el índice en 'asignaciones' se llama 'aplicador'
        const asignacionesRequest = index.getAll(IDBKeyRange.only(aplicador));

        asignacionesRequest.onsuccess = (event) => {
            const asignaciones = event.target.result;
            const encuestaIds = asignaciones.map((asignacion) => asignacion.encuesta);

            if (encuestaIds.length === 0) {
                // No hay encuestas asignadas al usuario, muestra un mensaje apropiado o toma una acción.
                tableContainer.innerHTML = 'no hay asignaciones'
              

            } else {
                // Ahora, tienes una lista de IDs de encuestas asignadas al usuario
                // Puedes utilizar esta lista para buscar las encuestas correspondientes
                const encuestasRequest = encuestasStore.openCursor();

                let cadena = "<table table-bordered table-hover table-condensed>";
                cadena += "<th>ID encuesta</th>";
                cadena += "<th>Título</th>";
                cadena += "<th>Estado</th>";
                cadena += "<th>Fecha Inicio</th>";
                cadena += "<th>Acciones</th>";

                encuestasRequest.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const encuestaId = cursor.value.id_encuesta;
                        if (encuestaIds.includes(encuestaId)) { // Comprueba si la encuesta está asignada al usuario
                            const descripcion = cursor.value.titulo;
                            const Instrucciones = cursor.value.instrucciones;
                            const estado = cursor.value.estado;
                            const fecha = cursor.value.fecha_inicio;
                            cadena += "<tr>";
                            cadena += "<td>" + encuestaId + "</td>";
                            cadena += "<td>" + descripcion + "</td>";
                            cadena += "<td>" + estado + "</td>";
                            cadena += "<td>" + fecha + "</td>";
                            cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='"+Instrucciones+"' class='btn btn-info'>Aplicar</button></a></td>";
                            cadena += "</tr>";
                        }
                        cursor.continue();
                    } else {
                        cadena += "</table>";
                        tableContainer.innerHTML = cadena;
                    }
                };
            }
        };
    };
}




  function abrirPestanaConFormulario(id_encuesta,Instrucciones) {
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
    <div id="mainForm">
    <table class="table table-bordered">
    <tbody class="color-fondo IBM">
        <tr>
            <td rowspan="5" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
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
                    <td class="col-sm-4 text-center">APLICADOR</td>
                    <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                </tr>
        <tr>
            <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
            <td><small><strong>TIPO:</strong> <span id="tipo"></span></small></td>
        </tr>
        <tr>
        <td class="col-sm-4 text-center">Instrucciones</td>
        <td>${Instrucciones}</td>
    </tr>
    </tbody>
</table>

</div>

<div class="col-sm-6 p-3">

<div class="row mb-3">
<label for="latitud">Latitud:</label>
<div class="col-sm-8">
<input type="number" class="form-control" name="latitud" id="latitud">
</div>
<div class="col-sm-8">
<label for="longitud">Longitud:</label>
<input type="number" class="form-control" name="longitud" id="longitud">
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
        <input class="form-check-input" type="radio" name="sexo" id="generoMasculino" value="Masculino" required>
        <label class="form-check-label" for="generoMasculino">Masculino</label>
    </div>
    <div class="form-check form-check-inline col-md-4">
        <input class="form-check-input" type="radio" name="sexo" id="generoFemenino" value="Femenino" required>
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
                <table>
                    <tbody class= "row justify-content-center" id="preguntasContainer">
                        <!-- Preguntas se cargarán aquí desde IndexedDB -->
                       
                    </tbody>
                </table>
                <div class="form-group">
                    <label for="observacion">Observaciones</label>
                    <textarea name="observacion" id="observacion" class="form-control" rows="3">No hay observación</textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="btnSend"> GUARDAR</button>
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
            <script>
var userCorreo = localStorage.getItem("user_correo");
if (userCorreo) {
  document.getElementById("userCorreo").textContent = userCorreo;
}
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
          
index.openCursor(IDBKeyRange.only(id_encuesta)).onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
        var pregunta = cursor.value.descripcion;
        var responseType = cursor.value.id_tipo_respuesta;
        var preguntaDiv = document.createElement("div");
        preguntaDiv.style.textAlign = "left";
        preguntaDiv.style.marginLeft = "60px"; // Agregar un margen izquierdo para separar de la izquierda
        var preguntaLabel = document.createElement("label");
        preguntaLabel.classList.add("col-form-label")
        preguntaLabel.textContent = pregunta + ": ";
        preguntaDiv.appendChild(preguntaLabel);
    
        // Agregar un atributo data-id con el ID de la pregunta
        preguntaDiv.setAttribute("data-id", cursor.value.id_pregunta);
    
        if (responseType == 1) {
            var respuestaDiv = document.createElement("div");
        
            var respuestaLabelSi = document.createElement("label");
            respuestaLabelSi.textContent = "Sí";
        
            var respuestaInputSi = document.createElement("input");
            respuestaInputSi.setAttribute("type", "radio");
            respuestaInputSi.setAttribute("name", "respuesta_" + cursor.value.id_pregunta);
            respuestaInputSi.setAttribute("value", "SI");
        
            var respuestaLabelNo = document.createElement("label");
            respuestaLabelNo.textContent = "No";
        
            var respuestaInputNo = document.createElement("input");
            respuestaInputNo.setAttribute("type", "radio");
            respuestaInputNo.setAttribute("name", "respuesta_" + cursor.value.id_pregunta);
            respuestaInputNo.setAttribute("value", "NO");
        
            // Agregar margen derecho a la etiqueta "Sí" para separar los elementos
            respuestaLabelSi.style.marginRight = "10px";
            respuestaLabelNo.style.marginRight = "10px";
            respuestaInputSi.style.marginRight = "20px";
        
            respuestaDiv.appendChild(respuestaLabelSi);
            respuestaDiv.appendChild(respuestaInputSi);
            respuestaDiv.appendChild(respuestaLabelNo);
            respuestaDiv.appendChild(respuestaInputNo);
        
            // Agregar un atributo data-id con el ID de la pregunta
            respuestaDiv.setAttribute("data-id", cursor.value.id_pregunta);
        
            preguntaDiv.appendChild(respuestaDiv);
        
        
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
var respuestas = [];

// Agregar un evento para capturar las respuestas
preguntasContainer.addEventListener("change", function (event) {
    var preguntaDiv = event.target.closest("div[data-id]"); // Obtener el div que contiene el atributo data-id
    if (preguntaDiv) {
        var preguntaID = preguntaDiv.getAttribute("data-id");
        var respuestaValue = event.target.value;

        // Elimina respuestas previas para la misma pregunta
        respuestas = respuestas.filter(function (respuesta) {
            return respuesta.id_pregunta !== preguntaID;
        });

        var respuesta = {
            codigo: nuevaPestana.codigoValue,
            Aplicador: nuevaPestana.userCorreo,
            id_encuesta: id_encuesta,
            created: nuevaPestana.vigenciaValue,
            id_pregunta: preguntaID,
            respuesta: respuestaValue,

        };
        respuestas.push(respuesta);

        // Ahora puedes utilizar respuestas como desees
        console.log("Respuestas:", respuestas);
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
        id_encuesta: id_encuesta,
        Aplicador: nuevaPestana.userCorreo,
        longitud: nuevaPestana.document.getElementById('longitud').value,
        latitud: nuevaPestana.document.getElementById('latitud').value
    };
    
    rr={
        observacion :nuevaPestana.document.getElementById('observacion').value
    }
      
    for (var i = 0; i < respuestas.length; i++) {
        var espuestaData = respuestas[i];
    guardarEnIndexedDB(espuestaData,id_encuesta,rr);
    }
    // Captura las respuestas de las preguntas desde el DOM y almacénalas en respuestasData
   guardarEnIndexedDBEncuestado(id_encuesta,encuestadoData)
    // Llama a la función para guardar en IndexedDB
    //guardarEnIndexedDB(id_encuesta,encuestadoData, respuestaData);

    // Después de guardar los datos en IndexedDB, puedes redirigir a la pestaña principal
    
    nuevaPestana.window.close("", "_blank")// Cambia "index.html" por la URL que desees
});


        };
    };
    function mostrar(id_encuesta,Instrucciones) {
        var dynamic = `
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
    <div id="mainForm">
    <table class="table table-bordered">
    <tbody class="color-fondo IBM">
        <tr>
            <td rowspan="5" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
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
                    <td class="col-sm-4 text-center">APLICADOR</td>
                    <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                </tr>
        <tr>
            <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
            <td><small><strong>TIPO:</strong> <span id="tipo"></span></small></td>
        </tr>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 29bdcc795c67de027761b25c0f3df7b911a44d82
        <tr>
        <td class="col-sm-4 text-center">Instrucciones</td>
        <td>${Instrucciones}</td>
    </tr>
<<<<<<< HEAD
=======
=======
>>>>>>> 4daf80261a08805ce86e37c2ef3125b02ce8ea2b
>>>>>>> 29bdcc795c67de027761b25c0f3df7b911a44d82
    </tbody>
</table>

</div>

<div class="col-sm-6 p-3">

<div class="row mb-3">
<label for="latitud">Latitud:</label>
<div class="col-sm-8">
<<<<<<< HEAD
<input type="number" class="form-control" name="latitud" id="latitud">
</div>
<div class="col-sm-8">
<label for="longitud">Longitud:</label>
<input type="number" class="form-control" name="longitud" id="longitud">
=======
<<<<<<< HEAD
<input type="number" class="form-control" name="latitud" id="latitud">
</div>
<div class="col-sm-8">
<label for="longitud">Longitud:</label>
<input type="number" class="form-control" name="longitud" id="longitud">
=======
<input type="text" class="form-control" name="latitud" id="latitud">
</div>
<div class="col-sm-8">
<label for="longitud">Longitud:</label>
<input type="text" class="form-control" name="longitud" id="longitud">
>>>>>>> 4daf80261a08805ce86e37c2ef3125b02ce8ea2b
>>>>>>> 29bdcc795c67de027761b25c0f3df7b911a44d82
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
        <input class="form-check-input" type="radio" name="sexo" id="generoMasculino" value="Masculino" required>
        <label class="form-check-label" for="generoMasculino">Masculino</label>
    </div>
    <div class="form-check form-check-inline col-md-4">
        <input class="form-check-input" type="radio" name="sexo" id="generoFemenino" value="Femenino" required>
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
                <table>
                    <tbody class= "row justify-content-center" id="preguntasContainer">
                        <!-- Preguntas se cargarán aquí desde IndexedDB -->
                    </tbody>
                </table>
<<<<<<< HEAD
               
=======
                <div class="form-group">
                    <label for="observacion">Observaciones</label>
                    <textarea name="observacion" id="observacion" class="form-control" rows="3">No hay observación</textarea>
                </div>
>>>>>>> 4daf80261a08805ce86e37c2ef3125b02ce8ea2b
                <button type="submit" class="btn btn-primary" id="btnSend"> GUARDAR</button>
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
            <script>
var userCorreo = localStorage.getItem("user_correo");
if (userCorreo) {
  document.getElementById("userCorreo").textContent = userCorreo;
}
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
        const htmlResponse = new Response(dynamic, {
            headers: { 'Content-Type': 'text/html' }
          
        });
    
        caches.open(cacheName).then(cache => {
            cache.put(cacheKey, htmlResponse);
          
        
        });
    
        
    
        var nuevaPestana = window.open("", "_blank");
      
        nuevaPestana.document.write(dynamic);
       
        const dbName = 'miBaseDeDatos';
        const request = indexedDB.open(dbName);
    
        request.onerror = (event) => {
            console.error('Error al abrir la base de datos:', event.target.error);
        };
    
        request.onsuccess = (event) => {
            const db = event.target.result;
            var transaction = db.transaction(['encuesta_FinalReactivos','reactivosCreados','tiposRespuesta']);
        
            transaction.oncomplete = () => {
                console.log('Datos cargados desde IndexedDB correctamente');
    
            };
    
    
            transaction.onerror = (event) => {
                console.error('Error al cargar datos desde IndexedDB:', event.target.error);
            };
    

            var encuestaObjectStore = transaction.objectStore('encuesta_FinalReactivos');
            var reactivosObjectStore = transaction.objectStore('reactivosCreados');
            var tipoRespuestaObjectStore = transaction.objectStore('tiposRespuesta');
            var index = encuestaObjectStore.index('id_encuesta'); // Suponiendo que el índice en 'asignaciones' se llama 'aplicador'
            //var index2 = reactivosObjectStore.index('id_tipoRespuesta');
            const asignacionesRequest = index.getAll(IDBKeyRange.only(id_encuesta));
            var preguntasContainer = nuevaPestana.document.getElementById("preguntasContainer");
            //const asignacionesRequest2 = index2.getAll(IDBKeyRange.only(id_encuesta));
    
            asignacionesRequest.onsuccess = (event) => {
                const asignaciones = event.target.result;
                const encuestaIds = asignaciones.map((id_encuesta) => id_encuesta.id_reactivo);
    
                if (encuestaIds.length === 0) {
                    // No hay encuestas asignadas al usuario, muestra un mensaje apropiado o toma una acción.
                  console.log('no hay asignaciones')
                  
    
                } else {
                        const encuestasRequest = reactivosObjectStore.openCursor();
                        encuestasRequest.onsuccess = (event) => {
                            const cursor = event.target.result;
                            if (cursor) {
                                const encuestaIdR = cursor.value.id_reactivoC;
                                if (encuestaIds.includes(encuestaIdR)) { // Comprueba si la encuesta está asignada al usuario
                                    const id_tipoRespuesta= cursor.value.id_tipoRespuesta;
                                    const descripcion = cursor.value.descripcion;
                                    var preguntaDiv = document.createElement("div");
                                    var preguntaLabel = document.createElement("label");
                                   preguntaLabel.classList.add("col-form-label")
                                    //preguntaDiv.classList.add("form-control");
                                    preguntaLabel.textContent = descripcion + ": ";
                                    preguntaDiv.appendChild(preguntaLabel);

                                    console.log(id_tipoRespuesta)
                                    console.log(descripcion )
                                    preguntaDiv.setAttribute("data-id", cursor.value.id_reactivoC);

                                    const tipoRespuestaRequest = tipoRespuestaObjectStore.get(id_tipoRespuesta);
                                    console.log(tipoRespuestaRequest);
                                    tipoRespuestaRequest.onsuccess = (event) => {
                                        const tipoRespuesta = event.target.result;
                                        if (tipoRespuesta) {
                                            const descripcionTipoRespuesta = tipoRespuesta.nombre_tipo_respuesta;
                                            
                                             if (descripcionTipoRespuesta == 2) {
                                                var arrayRespuestas = ["SI", "NO"];
                                                for (var i = 0; i < arrayRespuestas.length; i++) {
                                                    var respuestaDiv = document.createElement("div");
                                                   // respuestaDiv.classList.add("conteFlex", "class_", "col-md-4");
                                                   
                                                    var respuestaLabel = document.createElement("span");
                                                    respuestaLabel.classList.add("class_");
                                                    var respuestaInput = document.createElement("input");
                                                    //respuestaInput.classList.add("class_");
                                                    respuestaInput.setAttribute("type", "radio");
                                                    respuestaInput.setAttribute("name", "respuesta_");
                                                    respuestaInput.setAttribute("value", arrayRespuestas[i]);
                                                    
                                                    respuestaLabel.textContent = arrayRespuestas[i];
                                                   
                                                    respuestaLabel.appendChild(respuestaInput)
                                                   
                                
                                                   respuestaDiv.appendChild(respuestaLabel);
                                    
                                                    // Agregar un atributo data-id con el ID de la pregunta
                                                    respuestaDiv.setAttribute("data-id", cursor.value.id_reactivoC);
                                    
                                                    preguntaDiv.appendChild(respuestaDiv);
                                                }
                                            } else if (descripcionTipoRespuesta == 1) {
                                                var preguntaInput = document.createElement("input");
                                                preguntaInput.setAttribute("type", "text");
                                                preguntaInput.classList.add("form-control");
                                                preguntaInput.setAttribute("data-id", cursor.value.id_reactivoC);
                                                preguntaDiv.appendChild(preguntaInput);
                                    
                                            }else if (descripcionTipoRespuesta == 3) {
                                             
                                                var id_reactivoC = cursor.value.id_reactivoC;
                                                console.log(id_reactivoC)
                                                // Crear un div para las respuestas
                                                var respuestasDiv = document.createElement("div");
                                            
                                                
                                                var opcionesRespuestaTransaction = db.transaction("opciones_respuesta");
                                                var opcionesRespuestaObjectStore = opcionesRespuestaTransaction.objectStore("opciones_respuesta");
                                                var index =  opcionesRespuestaObjectStore.index('id_reactivoC')
                                                console.log(index)
                                                var opcionesRespuestaRequest = index.getAll(IDBKeyRange.only(id_reactivoC));
                                                console.log(opcionesRespuestaRequest)
                                                opcionesRespuestaRequest.onsuccess = (event) => {
                                                    const opcionesRespuesta = event.target.result;
                                            console.log(opcionesRespuesta)
                                                    // Recorrer las opciones de respuesta y crear checkboxes
                                                    opcionesRespuesta.forEach((opcion, index) => {
                                                        if (opcion.descripcion_opcion !== "") {
                                                            var respuestaLabel = document.createElement("label");
                                                            var respuestaInput = document.createElement("input");
                                            
                                                            respuestaInput.classList.add("form-check-input");
                                                            respuestaInput.setAttribute("type", "radio");
                                                            respuestaInput.setAttribute("name", "respuesta_" + id_reactivoC);
                                                            //respuestaInput.setAttribute("name", "respuesta_" + id_reactivoC + "_radio_" + index);
                                                            respuestaInput.setAttribute("value", opcion.descripcion_opcion);
                                            
                                                            respuestaLabel.textContent = opcion.descripcion_opcion;
                                                            respuestaLabel.classList.add("form-check-label", "form-check-inline");
                                            
                                                            respuestaLabel.appendChild(respuestaInput);
                                                            respuestasDiv.appendChild(respuestaLabel);
                                                        }
                                                    });
                                            
                                                    // Agregar el div de respuestas al contenedor de preguntas
                                                    preguntaDiv.appendChild(respuestasDiv);
                                                };
                                            }
                                           
                                            preguntasContainer.appendChild(preguntaDiv);
                                            console.log(descripcionTipoRespuesta);
                                            //console.log(`Descripción del reactivo: ${descripcion}`);
                                        }
                                       
                                }
                                
                              
                            } 
                            cursor.continue();
                        } else {
                            // Después de generar todas las preguntas, crea el elemento de observaciones
                            var observacionesDiv = document.createElement("div");
                            observacionesDiv.classList.add("form-group");
                            observacionesDiv.innerHTML = `
                                <label for="observacion">Observaciones</label>
                                <textarea name="observacion" id="observacion" class="form-control" rows="3">No hay observación</textarea>
                            `;
                    
                            // Agrega el elemento de observaciones al preguntasContainer
                            preguntasContainer.appendChild(observacionesDiv);
                        }
                       
                       
                           
                    }
var preguntaID
var respuestaValue

var respuestas = [];

// Agregar un evento para capturar las respuestas
preguntasContainer.addEventListener("change", function (event) {
    var preguntaDiv = event.target.closest("div[data-id]"); // Obtener el div que contiene el atributo data-id
    if (preguntaDiv) {
        preguntaID = preguntaDiv.getAttribute("data-id");
        respuestaValue = event.target.value;
          respuestas = respuestas.filter(function (respuesta) {
            return respuesta.id_pregunta !== preguntaID;
        });

        var respuesta = {
            codigo: nuevaPestana.codigoValue,
            Aplicador: nuevaPestana.userCorreo,
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
        id_encuesta: id_encuesta,
        Aplicador: nuevaPestana.userCorreo ,
        longitud: nuevaPestana.document.getElementById('longitud').value,
        latitud: nuevaPestana.document.getElementById('latitud').value
    };
    rr={
        observacion :nuevaPestana.document.getElementById('observacion').value
    }
    for (var i = 0; i < respuestas.length; i++) {
        var espuestaData = respuestas[i];
        guardarEnIndexedDB(espuestaData,id_encuesta,rr);
    }
    // Captura las respuestas de las preguntas desde el DOM y almacénalas en respuestasData
   guardarEnIndexedDBEncuestado(id_encuesta,encuestadoData)
    // Llama a la función para guardar en IndexedDB
    //guardarEnIndexedDB(id_encuesta,encuestadoData, respuestaData);

    // Después de guardar los datos en IndexedDB, puedes redirigir a la pestaña principal
    
    nuevaPestana.window.close("", "_blank")// Cambia "index.html" por la URL que desees
});


        };
                        

                }
              
            };
            

        };

    
    // Función para guardar los datos en IndexedDB
function guardarEnIndexedDB(espuestaData,id_encuesta,rr) {
    // var request = indexedDB.open("miBaseDeDatos");
    const dataToUpdate = {
        id_encuesta:id_encuesta,
    espuestaData: espuestaData,
    rr: rr,
      };
   
    registrarActualizacionEnColaRes(dataToUpdate)
}

function guardarVar(espuestaData,id_encuesta,rr) {
    // var request = indexedDB.open("miBaseDeDatos");
    const dataToUpdate = {
        id_encuesta:id_encuesta,
    espuestaData: espuestaData,
    rr: rr,
      };
   
    registrarActualizacionEnColaResVar(dataToUpdate)
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

  function guardarEnIndexedDBEncuestadoVar(id_encuesta, encuestadoData) {
    const dataToUpdate = {
      encuestadoData: encuestadoData,
      id_encuesta:id_encuesta
    };
    // Registra la actualización en la cola de actualizaciones pendientes en IndexedDB
    registrarActualizacionEnColaVar(dataToUpdate);
  
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

  function registrarActualizacionEnColaVar(data) {
    const dbName = 'miBaseDeDatos';
    const objectStoreName = 'cola-Encuestado-Var';
  
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
  
  
function confirmarCerrarSesion() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas cerrar la sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, eliminar el usuario activo del almacenamiento local
            localStorage.removeItem('user_correo');

            localStorage.removeItem('user_id');
            localStorage.removeItem('tipoUsuario');

            console.log("Sesión cerrada correctamente.");
            
            // Mostrar una alerta con el mensaje de cierre en dos segundos
            Swal.fire({
                title: 'Cerrando sesión...',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });

            // Redireccionar a la página de inicio de sesión después de dos segundos
            setTimeout(function() {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            // Si el usuario cancela, no hacer nada
        }
    });
}


function abrir(id_encuesta) {
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
        <div id="mainForm">
        <table class="table table-bordered">
        <tbody class="color-fondo IBM">
            <tr>
                <td rowspan="5" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
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
                        <td class="col-sm-4 text-center">APLICADOR</td>
                        <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                    </tr>
            <tr>
                <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
                <td><small><strong>TIPO:</strong> <span id="tipo"></span></small></td>
            </tr>
        </tbody>
    </table>
    
    </div>
    
    <div class="col-sm-6 p-3">
    
    <div class="row mb-3">
    <label for="latitud">Latitud:</label>
    <div class="col-sm-8">
    <input type="number" class="form-control" name="latitud" id="latitud">
    </div>
    <div class="col-sm-8">
    <label for="longitud">Longitud:</label>
    <input type="number" class="form-control" name="longitud" id="longitud">
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
            
                <form id="formFormatoGS" class="needs-validation" data-encuesta-id="${id_encuesta}">
                <div class="table-responsive">
                    <table class='table table-bordered'>
                        <tbody id="tabla-container">
                            <!-- Preguntas se cargarán aquí desde IndexedDB -->
                        </tbody>
                    </table>
                    </div>
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
                <script>
    var userCorreo = localStorage.getItem("user_correo");
    if (userCorreo) {
      document.getElementById("userCorreo").textContent = userCorreo;
    }
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
       console.log('ENCUESTA VARIABLES ID 3')
          
        var contenidoHTML = "<h2 class='bg-text-black text-center p-3 text-uppercase text-black'></h2>";
            // Ahora puedes ejecutar el código de IndexedDB aquí
            var request = indexedDB.open("miBaseDeDatos");
    
            request.onerror = function (event) {
                console.error("Error al abrir la base de datos: " + event.target.errorCode);
            };
    
            request.onsuccess = function (event) {
              var db = event.target.result;
              var transaction = db.transaction(['encuestas', 'Variable', 'Encuesta_Variables'], 'readonly');
              var encuestaStore = transaction.objectStore('encuestas');
              var variableStore = transaction.objectStore('Variable');
              var encuestaVariablesStore = transaction.objectStore('Encuesta_Variables');
            
              var cursorRequest = encuestaStore.openCursor();
              var count = 0;
            
              cursorRequest.onsuccess = function (cursorEvent) {
                var cursor = cursorEvent.target.result;
                if (cursor) {
                  count++;
                  if (count === 3) {
                    // La tercera encuesta se encuentra, puedes acceder a sus propiedades
                    var encuesta = cursor.value;
                    var encuestaId = encuesta.id_encuesta;
            
                    // Ahora puedes obtener las variables relacionadas con esta encuesta
                    var variablesRequest = encuestaVariablesStore.index('id_encuesta').getAll(encuestaId);
            
                    variablesRequest.onsuccess = function (event) {
                      var variables = event.target.result;
            
                      // Crear un array para almacenar los nombres de las variables
                      var variablesFiltrados = [];
            
                      for (var i = 0; i < variables.length; i++) {
                        var variableId = variables[i].id_Variables;
            
                        var variableRequest = variableStore.get(variableId);
            
                        variableRequest.onsuccess = function (event) {
                          var variable = event.target.result;
                          if (variable) {
                            // Agregar el nombre de la variable al array
                            variablesFiltrados.push(variable.Nobre_Var);
            
                            if (variablesFiltrados.length === variables.length) {
                              // A partir de aquí, puedes trabajar con las variables y generar tu tabla
                              console.log(variablesFiltrados);
                              contenidoHTML += "<thead><tr>"; // Abre una fila de encabezados
                                                contenidoHTML += "<th>INFLUENCIA</th>";
                                                
                                                // Encabezados de las columnas con el nombre de las variables
                                                variablesFiltrados.forEach(function (variableName) {
                                                  contenidoHTML += "<th>" + variableName + "</th>";
                                                });
                                                
                                                contenidoHTML += "</tr></thead>";
                                                contenidoHTML += "<tbody>";
                                                
                                        
                                                // Filas con selects
                                                for (var i = 0; i < 21; i++) {
                                                  contenidoHTML += "<tr>";
                                                 contenidoHTML += "<td>" + variablesFiltrados[i]+ "</td>";
                                                
                                                  // Celdas con selects para las variables
                                                  variablesFiltrados.forEach(function (variableName, index) {
                              
                                                    contenidoHTML += "<td>";
                                                    var variableIndex = (index) % variables.length;
                                                    var variableToUse = variables[variableIndex];
                                                
                                                    contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + variableToUse.id_Variables + "'>";
                                                    // Agregar el <select> con los atributos data-variable-id y data-column
                                                   // contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + variableToUse.id_Variables + "'>";
                                                    // Agregar el <select> con los atributos data-variable-id y data-column
                                                    //contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + (index+1) + "'>";
                                                    //contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + siguienteVariable.id_Variables + "'>";
                                                    contenidoHTML += "<option value='0'>0</option>";
                                                    contenidoHTML += "<option value='1'>1</option>";
                                                    contenidoHTML += "<option value='2'>2</option>";
                                                    contenidoHTML += "<option value='3'>3</option>";
                                                    contenidoHTML += "<option value='P'>P</option>";
                                                    contenidoHTML += "</select>";
                                                
                                                    contenidoHTML += "</td>";
                                                  });
                                                
                                                  contenidoHTML += "</tr>";
                                                }
                                                
                                                
                                        
                                                contenidoHTML += "</tbody></table>";
                                        
                                         
                                                nuevaPestana.document.getElementById("tabla-container").innerHTML = contenidoHTML;
                                                
                                              
                                              
                              // Generar tu tabla y contenido aquí
                            }
                          }
                        };
                      }
                    };
                  } else {
                    cursor.continue(); // Continúa buscando la tercera encuesta
                  }
                } else {
                  console.log("No se encontró la tercera encuesta.");
                }
              };
            
            
//             request.onsuccess = function (event) {
 
//                 var db = event.target.result;
//                 var transaction = db.transaction(['encuestas', 'Encuesta_Variables'], 'readonly');
//                 var encuestaStore = transaction.objectStore('encuestas');
//                 var variableStore = transaction.objectStore('Encuesta_Variables');
//                 var encuestaId = 3;

//                 var encuestaRequest = encuestaStore.get(encuestaId);
//                 console.log(encuestaRequest)
//     encuestaRequest.onsuccess = function(event) {
//         var encuesta = event.target.result;
//       if (encuesta) {

//       //  var variablesRequest = variableStore.getAll(encuesta.id_Variables);
//       var variablesRequest = variableStore.getAll(encuesta.id_Variables);
//         variablesRequest.onsuccess = function (event) {
//             var variables = event.target.result;
//             console.log(variables);
          
//             // Crear un array para almacenar los nombres de las variables
//             var variablesFiltrados = [];
          
//             var variablesTransaction = db.transaction(['Variable'], 'readonly');
//             var variablesStore = variablesTransaction.objectStore('Variable');
          
//             // Obtener el contenedor de la tabla en tu HTML
//             //var tableContainer = nuevaPestana.document.getElementById("tabla-container");
          
//             for (var i = 0; i < variables.length; i++) {
//               var variableId = variables[i].id_Variables;
//               console.log(variableId);
          
//               var variableRequest = variablesStore.get(variableId);
//               variableRequest.onsuccess = function(event) {
//                 var variable = event.target.result;
//                 console.log(variable);
          
//                 // Agregar el nombre de la variable al array
//                 variablesFiltrados.push(variable.Nobre_Var);
          
//                 if (variablesFiltrados.length === variables.length) {
//                  // contenidoHTML += "<table class='table table-bordered'>";
//                   contenidoHTML += "<thead><tr>"; // Abre una fila de encabezados
//                   contenidoHTML += "<th>INFLUENCIA</th>";
                  
//                   // Encabezados de las columnas con el nombre de las variables
//                   variablesFiltrados.forEach(function (variableName) {
//                     contenidoHTML += "<th>" + variableName + "</th>";
//                   });
                  
//                   contenidoHTML += "</tr></thead>";
//                   contenidoHTML += "<tbody>";
                  
          
//                   // Filas con selects
//                   for (var i = 0; i < 21; i++) {
//                     contenidoHTML += "<tr>";
//                    contenidoHTML += "<td>" + variablesFiltrados[i]+ "</td>";
                  
//                     // Celdas con selects para las variables
//                     variablesFiltrados.forEach(function (variableName, index) {

//                       contenidoHTML += "<td>";
//                       var variableIndex = (index) % variables.length;
//                       var variableToUse = variables[variableIndex];
                  
//                       contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + variableToUse.id_Variables + "'>";
//                       // Agregar el <select> con los atributos data-variable-id y data-column
//                      // contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + variableToUse.id_Variables + "'>";
//                       // Agregar el <select> con los atributos data-variable-id y data-column
//                       //contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + (index+1) + "'>";
//                       //contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variables[i].id_Variables + "' data-column='" + siguienteVariable.id_Variables + "'>";
//                       contenidoHTML += "<option value='0'>0</option>";
//                       contenidoHTML += "<option value='1'>1</option>";
//                       contenidoHTML += "<option value='2'>2</option>";
//                       contenidoHTML += "<option value='3'>3</option>";
//                       contenidoHTML += "<option value='P'>P</option>";
//                       contenidoHTML += "</select>";
                  
//                       contenidoHTML += "</td>";
//                     });
                  
//                     contenidoHTML += "</tr>";
//                   }
                  
                  
          
//                   contenidoHTML += "</tbody></table>";
          
           
//                   nuevaPestana.document.getElementById("tabla-container").innerHTML = contenidoHTML;
                  
//                 }
//               };
//             }
//           };
          
//     };
    
// }

var respuestas = []; // Array para almacenar las respuestas

nuevaPestana.document.getElementById("tabla-container").addEventListener("change", function (event) {
    var selectElement = event.target;
    if (selectElement.tagName === "SELECT") {
      var variableId = selectElement.getAttribute("data-variable-id");
      var column = selectElement.getAttribute("data-column");
      var selectedValue = selectElement.value;
      
      console.log("Variable ID: " + variableId);
      console.log("Columna: " + column);
      console.log("Valor seleccionado: " + selectedValue);
  
      var respuesta = {
        codigo: nuevaPestana.codigoValue,
        Aplicador: nuevaPestana.userCorreo,
        id_encuesta: id_encuesta,
        created: nuevaPestana.vigenciaValue,
        id_Variables: variableId,
        id_VariableE: column,
        respuesta: selectedValue,
      
    };
  
      // Agregar la respuesta al array
      respuestas.push(respuesta);
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
        id_encuesta: id_encuesta,
        Aplicador: nuevaPestana.userCorreo ,
        longitud: nuevaPestana.document.getElementById('longitud').value,
        latitud: nuevaPestana.document.getElementById('latitud').value
    };
    rr={
        observacion :nuevaPestana.document.getElementById('observacion').value
    }
    for (var i = 0; i < respuestas.length; i++) {
        var espuestaData = respuestas[i];
    guardarVar(espuestaData,id_encuesta,rr);
    }
    // Captura las respuestas de las preguntas desde el DOM y almacénalas en respuestasData
   guardarEnIndexedDBEncuestadoVar(id_encuesta,encuestadoData)
    // Llama a la función para guardar en IndexedDB
    //guardarEnIndexedDB(id_encuesta,encuestadoData, respuestaData);

    // Después de guardar los datos en IndexedDB, puedes redirigir a la pestaña principal
    
    nuevaPestana.window.close("", "_blank")// Cambia "index.html" por la URL que desees
});

}

  }
 
  function registrarActualizacionEnColaResVar(dat) {
    const dbName = 'miBaseDeDatos';
    const objectStoreName = 'VariablesCola';
  
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



  function mostrarEncuestasVar() {
    const dbName = 'miBaseDeDatos';
    const request = indexedDB.open(dbName);
  
    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', event.target.error);
    };
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const tableContainer = document.getElementById('resultado3');
      const userId = localStorage.getItem('user_id'); // Reemplaza 'userId' con la clave correcta en tu localStorage.
  
      const transaction = db.transaction(['encuestasVariables'], 'readonly');
      const encuestasStore = transaction.objectStore('encuestasVariables');
      const index = encuestasStore.index('id_usuario'); // Suponiendo que tienes un índice llamado 'userId' en tu almacén de encuestas.
  
      transaction.oncomplete = () => {
        console.log('Datos cargados desde IndexedDB correctamente');
  
        const btns = tableContainer.getElementsByClassName("btn-info");
        for (let i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function (event) {
            const IdEn = event.target.getAttribute("data-encuesta-id");
            const Instrucciones = event.target.getAttribute("data-instrucciones");
            abrirPestanaVariables(IdEn,Instrucciones);
          });
        }
      };
  
      transaction.onerror = (event) => {
        console.error('Error al cargar datos desde IndexedDB:', event.target.error);
      };

    
      // Realiza una consulta para obtener las encuestas asociadas al ID del usuario.
      const request = index.openCursor(IDBKeyRange.only(userId));
 
      let cadena = "<table class='table table-bordered table-hover table-condensed' >";
      cadena += "<th>ID encuesta</th>";
      cadena += "<th>Título</th>";
      cadena += "<th>Estado</th>";
      cadena += "<th>Fecha Inicio</th>";
      cadena += "<th>Acciones</th>";
     
      
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const encuestaId = cursor.value.id_encuesta;
          const descripcion = cursor.value.titulo;
          const Instrucciones = cursor.value.instrucciones;
          const estado = cursor.value.estado;
          const fecha = cursor.value.fecha_inicio;

            cadena += "<tr>";
            cadena += "<td>" + encuestaId + "</td>";
            cadena += "<td>" + descripcion + "</td>";
            cadena += "<td>" + estado + "</td>";
            cadena += "<td>" + fecha + "</td>";
            cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='" + Instrucciones + "' class='btn btn-info'>Aplicar</button></a></td>";
            cadena += "</tr>";
          

          cursor.continue();
        } else {
          cadena += "</table>";
          tableContainer.innerHTML = cadena;
        }
      };
    };
  }


  function abrirPestanaVariables(id_encuesta,Instrucciones) {
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
        <div id="mainForm">
        <table class="table table-bordered">
        <tbody class="color-fondo IBM">
            <tr>
                <td rowspan="5" style="text-align:center"><img src="/Img/lOGOCONACYT.png" class="col-sm-4 my-3 my-lg-0 text-center"></td>
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
                        <td class="col-sm-4 text-center">APLICADOR</td>
                        <td><small><strong>CORREO:</strong><span name="userCorreo" id="userCorreo"></span></small></td>
                    </tr>
            <tr>
                <td class="col-sm-4 text-center">TIPO DE ENCUESTA</td>
                <td><small><strong>TIPO:</strong> <span id="tipo"></span></small></td>
            </tr>
            <tr>
            <td class="col-sm-4 text-center">Instrucciones</td>
            <td>${Instrucciones}</td>
        </tr>
        </tbody>
    </table>
    
    </div>
    
    <div class="col-sm-6 p-3">
    
    <div class="row mb-3">
    <label for="latitud">Latitud:</label>
    <div class="col-sm-8">
    <input type="number" class="form-control" name="latitud" id="latitud">
    </div>
    <div class="col-sm-8">
    <label for="longitud">Longitud:</label>
    <input type="number" class="form-control" name="longitud" id="longitud">
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
                <form id="formFormatoGS" class="needs-validation" data-encuesta-id="${id_encuesta}">
                <div class="table-responsive">
                    <table class='table table-bordered'>
                        <tbody id="tabla-container">
                            <!-- Preguntas se cargarán aquí desde IndexedDB -->
                        </tbody>
                    </table>
                    </div>
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
                <script>
    var userCorreo = localStorage.getItem("user_correo");
    if (userCorreo) {
      document.getElementById("userCorreo").textContent = userCorreo;
    }
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
       
          
        var contenidoHTML = "<h2 class='bg-text-black text-center p-3 text-uppercase text-black'></h2>";
            // Ahora puedes ejecutar el código de IndexedDB aquí
            var request = indexedDB.open("miBaseDeDatos");
    
            request.onerror = function (event) {
                console.error("Error al abrir la base de datos: " + event.target.errorCode);
            };
    
            request.onsuccess = function (event) {
            
              var db = event.target.result;
var transaction = db.transaction(['encuestasVariables', 'encuesta_FinalVariables', 'Variable'], 'readonly');
var encuestasVariablesStore = transaction.objectStore('encuestasVariables');
var encuestaFinalVariablesStore = transaction.objectStore('encuesta_FinalVariables');
var variablesStore = transaction.objectStore('Variable');

 // Reemplaza esto con el ID de la encuesta que te interesa.

// Paso 3: Obtener la lista de IDs de variables relacionadas con la encuesta
var variablesIDList = [];
var encuestaFinalVariablesIndex = encuestaFinalVariablesStore.index('id_encuesta');
var encuestaFinalVariablesRequest = encuestaFinalVariablesIndex.openCursor(IDBKeyRange.only(id_encuesta));

encuestaFinalVariablesRequest.onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    variablesIDList.push(cursor.value.id_variable);
    cursor.continue();
  } else {
    var variablesData = [];
    var variablesFiltrados = [];

    variablesIDList.forEach(function (variableID) {
      var variableRequest = variablesStore.get(variableID);
      variableRequest.onsuccess = function (event) {
        var variableData = event.target.result;
        if (variableData) {
          variablesData.push(variableData);

          // Agregar el nombre de la variable al array
          variablesFiltrados.push(variableData.Nobre_Var);

          if (variablesFiltrados.length === variablesIDList.length) {
            // Crear la tabla HTML
            var contenidoHTML = "<table class='table table-bordered'>";
            contenidoHTML += "<thead><tr>"; // Abre una fila de encabezados
            contenidoHTML += "<th>INFLUENCIA</th>";

            // Encabezados de las columnas con el nombre de las variables
            variablesFiltrados.forEach(function (variableName) {
              contenidoHTML += "<th>" + variableName + "</th>";
            });

            contenidoHTML += "</tr></thead>";
            contenidoHTML += "<tbody>";

            // Filas con selects
            for (var i = 0; i < variablesFiltrados.length; i++) {
              contenidoHTML += "<tr>";
              contenidoHTML += "<td>" + variablesFiltrados[i] + "</td>";

              // Celdas con selects para las variables
              variablesData.forEach(function (variableData, index) {
                contenidoHTML += "<td>";
                contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variablesData[i].id_variable + "' data-column='" + variableData.id_variable + "'>";
                //contenidoHTML += "<select class='form-select form-select-sm' aria-label='.form-select-sm example' onchange='updateOtherSelects(this)' data-variable-id='" + variableData.id_variable + "' data-column='" + variableData.id_variable + "'>";
                contenidoHTML += "<option value='0'>0</option>";
                contenidoHTML += "<option value='1'>1</option>";
                contenidoHTML += "<option value='2'>2</option>";
                contenidoHTML += "<option value='3'>3</option>";
                contenidoHTML += "<option value='P'>P</option>";
                contenidoHTML += "</select>";
                contenidoHTML += "</td>";
              });

              contenidoHTML += "</tr>";
            }

            contenidoHTML += "</tbody></table>";

            // Agregar la tabla al contenedor en tu HTML
            nuevaPestana.document.getElementById("tabla-container").innerHTML = contenidoHTML;
          }
        }
      };
    });
  }
}
      
    

var respuestas = []; // Array para almacenar las respuestas

nuevaPestana.document.getElementById("tabla-container").addEventListener("change", function (event) {
    var selectElement = event.target;
    if (selectElement.tagName === "SELECT") {
      var variableId = selectElement.getAttribute("data-variable-id");
      var column = selectElement.getAttribute("data-column");
      var selectedValue = selectElement.value;
      
      console.log("Variable ID: " + variableId);
      console.log("Columna: " + column);
      console.log("Valor seleccionado: " + selectedValue);
  
      var respuesta = {
        codigo: nuevaPestana.codigoValue,
        Aplicador: nuevaPestana.userCorreo,
        id_encuesta: id_encuesta,
        created: nuevaPestana.vigenciaValue,
        id_Variables: variableId,
        id_VariableE: column,
        respuesta: selectedValue,
      
    };
  
      // Agregar la respuesta al array
      respuestas.push(respuesta);
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
        id_encuesta: id_encuesta,
        Aplicador: nuevaPestana.userCorreo ,
        longitud: nuevaPestana.document.getElementById('longitud').value,
        latitud: nuevaPestana.document.getElementById('latitud').value
    };
    rr={
        observacion :nuevaPestana.document.getElementById('observacion').value
    }
    for (var i = 0; i < respuestas.length; i++) {
        var espuestaData = respuestas[i];
    guardarVar(espuestaData,id_encuesta,rr);
    }
    // Captura las respuestas de las preguntas desde el DOM y almacénalas en respuestasData
   guardarEnIndexedDBEncuestadoVar(id_encuesta,encuestadoData)
    // Llama a la función para guardar en IndexedDB
    //guardarEnIndexedDB(id_encuesta,encuestadoData, respuestaData);

    // Después de guardar los datos en IndexedDB, puedes redirigir a la pestaña principal
    
    nuevaPestana.window.close("", "_blank")// Cambia "index.html" por la URL que desees
});

}

  }
  
  function mostrarEncuestasApliVar(aplicadorVar) {
    const dbName = 'miBaseDeDatos';
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['encuestasVariables', 'asignaciones'], 'readonly');
        const tableContainer = document.getElementById('resultadoApliVar');
       
        transaction.oncomplete = () => {
          console.log('Datos cargados desde IndexedDB correctamente');
    
          const btns = tableContainer.getElementsByClassName("btn-info");
          for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function (event) {
              const IdEn = event.target.getAttribute("data-encuesta-id");
              const Instrucciones = event.target.getAttribute("data-instrucciones");
              abrirPestanaVariables(IdEn,Instrucciones);
            });
          }
        };
        transaction.onerror = (event) => {
            console.error('Error al cargar datos desde IndexedDB:', event.target.error);
        };

        const asignacionesStore = transaction.objectStore('asignaciones');
        const encuestasStoreVar = transaction.objectStore('encuestasVariables');
        const index = asignacionesStore.index('aplicador'); // Suponiendo que el índice en 'asignaciones' se llama 'aplicador'
        const asignacionesRequest = index.getAll(IDBKeyRange.only(aplicadorVar));

        asignacionesRequest.onsuccess = (event) => {
            const asignaciones = event.target.result;
            const encuestaIds = asignaciones.map((asignacion) => asignacion.encuesta);
console.log(encuestaIds)
            if (encuestaIds.length === 0) {
                // No hay encuestas asignadas al usuario, muestra un mensaje apropiado o toma una acción.
                tableContainer.innerHTML = 'no hay asignaciones'
              

            } else {
                // Ahora, tienes una lista de IDs de encuestas asignadas al usuario
                // Puedes utilizar esta lista para buscar las encuestas correspondientes
                const encuestasRequest = encuestasStoreVar.openCursor();
              
                let cadena = "<table table-bordered table-hover table-condensed>";
                cadena += "<th>ID encuesta</th>";
                cadena += "<th>Título</th>";
                cadena += "<th>Estado</th>";
                cadena += "<th>Fecha Inicio</th>";
                cadena += "<th>Acciones</th>";

                encuestasRequest.onsuccess = (event) => {
                    const cursor = event.target.result;
                    console.log(cursor)
                    if (cursor) {
                        const encuestaId = cursor.value.id_encuesta;
                        console.log(encuestaId)
                        if (encuestaIds.includes(encuestaId)) { // Comprueba si la encuesta está asignada al usuario
                            const descripcion = cursor.value.titulo;
                            const Instrucciones = cursor.value.instrucciones;
                            console.log(Instrucciones)
                            const estado = cursor.value.estado;
                            const fecha = cursor.value.fecha_inicio;
                            cadena += "<tr>";
                            cadena += "<td>" + encuestaId + "</td>";
                            cadena += "<td>" + descripcion + "</td>";
                            cadena += "<td>" + estado + "</td>";
                            cadena += "<td>" + fecha + "</td>";
                            cadena += "<td align='center'><a><button data-encuesta-id='" + encuestaId + "' data-instrucciones='"+Instrucciones+"' class='btn btn-info'>Aplicar</button></a></td>";
                            cadena += "</tr>";
                        }
                        cursor.continue();
                    } else {
                        cadena += "</table>";
                        tableContainer.innerHTML = cadena;
                    }
                };
            }
        };
    };
}