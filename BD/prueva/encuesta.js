window.addEventListener('load', (event) => {
    let miBody = document.body;
       miBody.classList.remove('loader');
       accionBtn(sustraerEntero=0);

});




function respuesta(idPregunta, idRespuesta) {
    let classIdPregunta = $(".class_" + idPregunta).removeClass('checkenRepuesta');
    let spanIdPregunta = $("#spanId_" + idPregunta + '_' + idRespuesta).addClass('checkenRepuesta');

    let inputRadio = document.querySelector('#idResp_' + idPregunta + idRespuesta);
    inputRadio.checked = true;

    // Modificar la función contadorChecken para incluir los inputs de texto
    contadorChecken();
}

// function contadorChecken() {
//     let valoresCheck = [];
//     $("input[type=radio]:checked, input[type=text]").each(function () {
//         valoresCheck.push(this.value);
//     });

//     let totalChecken = valoresCheck.length;
//     let totalPBD = document.querySelector('#totalPreguntasBD');
//     let totalPreguntas = Number(totalPBD.dataset.totalpreg);

//     let porcentaje = (totalChecken * 50) / totalPreguntas;
//     let porcentajeDecimale = Number(porcentaje.toFixed(3));

//     let sustraerEntero = Number(porcentaje.toFixed(3).substring(0, 3));

//     accionBtn(sustraerEntero);

//     let barraPro = document.querySelector(".progress-bar");
//     barraPro.style.width = `${porcentajeDecimale}%`;
//     barraPro.textContent = `${sustraerEntero}%`;
// }

// function accionBtn(sustraerEntero = 0) {
//     let btnEnviar = document.querySelector('#btnSend');
//     btnEnviar.disabled = true;

//     if (sustraerEntero == '100') {
//         btnEnviar.disabled = false;
//         btnEnviar.textContent = 'Guardar Respuestas';
//     } else {
//         btnEnviar.disabled = true;
//     }
// }

function contadorChecken() {
    let totalPreguntas = Number(document.querySelector('#totalPreguntasBD').dataset.totalpreg);
    let elementosCompletados = 0;

    // Recorre todos los elementos de entrada (ya sean casillas de verificación o campos de texto)
    $("input[type=radio], input[type=text]").each(function () {
        if ($(this).val() !== '') {
            elementosCompletados++;
        }
    });

    let porcentaje = (elementosCompletados / totalPreguntas) * 100;
    let porcentajeRedondeado = Math.round(porcentaje);

    accionBtn(porcentajeRedondeado);

    let barraPro = document.querySelector(".progress-bar");
    barraPro.style.width = `${porcentajeRedondeado}%`;
    barraPro.textContent = `${porcentajeRedondeado}%`;
}

function accionBtn(porcentajeRedondeado = '0') {
    let btnEnviar = document.querySelector('#btnSend');
    btnEnviar.disabled = true;

    if (porcentajeRedondeado >= 100) {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Guardar Respuestas';
    } else {
        btnEnviar.disabled = true;
    }
}


function GuardarRes() {
    let formFormatoGS = $('#formFormatoGS').serialize();
    let spanCodigo = document.querySelector('#codigo').textContent;
    let codigo = Number(spanCodigo);
    let nombre = $('#nombre').val();
    let localidad = $('#localidad').val();
    let sexo = $('#generoMasculino').is(':checked') ? 'Masculino' : 'Femenino';
    let edad = $('#edad').val();
    
    let inputValue = {};
    $('[name^="respuesta["][name$="[input]"]').each(function() {
        let questionId = $(this).attr('name').match(/\[(\d+)\]\[input\]/)[1];
        let value = $(this).val();
        inputValue[questionId] = value;
    });
   
    $.ajax({
        url: 'GuardarRes.php',
        type: 'POST',
        data: formFormatoGS + '&codigo=' + codigo + '&nombre=' + nombre +
            '&localidad=' + localidad + '&sexo=' + sexo + '&edad=' + edad +
            '&inputValue=' + JSON.stringify(inputValue) + '&idEncuesta=' + idEncuesta,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.respuesta) {
                alert('Felicitaciones, encuesta llenada correctamente.');
                location.href = "/pestañas_Encuestador/dashboard.html";
            }
        }
    }); 
}
// function obtenerElIdDeLaEncuesta() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idEncuesta = urlParams.get('id_encuesta');
//     return idEncuesta;
// }






function handleSelectChange(selectElement) {
    // Aquí puedes agregar código para manejar los cambios en los valores seleccionados.
    // Por ejemplo, puedes acceder al valor seleccionado y realizar acciones en función de eso.
    var selectedValue = selectElement.value;
    var questionId = $(selectElement).data('id');
    
    console.log("Selected value: " + selectedValue + " for question ID: " + questionId);
}

function GuardarResVariable() {
    let formFormato = $('#formFormato').serialize();
    let spanCodigo = document.querySelector('#codigo2').textContent;
    let codigo = Number(spanCodigo);
    let nombre = $('#nombre').val();
    let localidad = $('#localidad').val();
    let sexo = $('#generoMasculino').is(':checked') ? 'Masculino' : 'Femenino';
    let edad = $('#edad').val();
    let responses = {}; // Crear un objeto para almacenar las respuestas
    $('[name^="respuesta["]').each(function() {
        var questionId = $(this).data('id');
        var value = $(this).val();

        // Si el valor no es cero, almacenarlo
        if (value !== "0") {
            if (!responses[questionId]) {
                responses[questionId] = [];
            }
            responses[questionId].push(value);
        }

        console.log("Question ID: " + questionId + ", Value: " + value);
    });
    
    console.log("JSON.stringify(responses): " + JSON.stringify(responses));

    $.ajax({
        url: 'GuardarResVariable.php',
        type: 'POST',
        data: formFormato + '&codigo=' + codigo + '&nombre=' + nombre +
        '&localidad=' + localidad + '&sexo=' + sexo + '&edad=' + edad +'&responses=' + JSON.stringify(responses),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.respuesta) {
                alert('Felicitaciones, encuesta llenada correctamente.');
                location.href = "/pestañas_Encuestador/dashboard.html";
            }
        }
    });
}


// function TiposOpciones(selectElement) {
//     console.log("TiposOpciones function called");
//     const numRespuestas = parseInt(selectElement.value, 10);
//     const respuestasContainer = document.getElementById("RespuestasInputsR");
    
//     respuestasContainer.innerHTML = ""; // Limpiar los campos existentes
    
//     for (let i = 1; i <= numRespuestas; i++) {
//       const inputGroup = document.createElement("div");
//       inputGroup.classList.add("input-group", "flex-nowrap", "row", "mb-4");
//       inputGroup.innerHTML = `
//         <label class="col-6 col-form-label px-5">Escriba la respuesta ${i}: </label>
//         <div class="col-6">
//           <input type="text" class="form-control" name="respuesta${i}" placeholder="Escriba su respuesta"
//             aria-label="Escriba su respuesta" aria-describedby="addon-wrapping">
//         </div>`;
      
//       respuestasContainer.appendChild(inputGroup);
//     }
  
//     document.getElementById("RespuestasR").style.display = "block";
//   }
function TiposOnChange(sel) {
          
    if (sel.value=="3"){ 
      var   divC = document.getElementById("Opcion");
         divC.style.display = "";
  
         divT = document.getElementById("Respuestas");
         divT.style.display = "none";
  
    }else if (sel.value=="4"){
  
      var   divC = document.getElementById("Respuestas");
         divC.style.display="none";
  
         divT = document.getElementById("Opcion");
         divT.style.display = "";
           
    }else {
     var divC = document.getElementById("Respuestas");
         divC.style.display="none";
  
         divT = document.getElementById("Opcion");
         divT.style.display = "none";
    }
  
  }
  var respuestasArray = [];

  function TiposOpciones(sel) {
      // Restablece el array cada vez que cambie la selección
      respuestasArray = [];
  
      if (sel.value == "11") {
          // Mostrar el primer campo de entrada
          document.getElementById("Opcion1").style.display = "";
  
          // Ocultar los demás campos de entrada
          document.getElementById("Opcion2").style.display = "none";
          document.getElementById("Opcion3").style.display = "none";
          document.getElementById("Opcion4").style.display = "none";
          document.getElementById("Opcion5").style.display = "none";
      } else if (sel.value == "12") {
          // Mostrar los dos primeros campos de entrada
          document.getElementById("Opcion1").style.display = "";
          document.getElementById("Opcion2").style.display = "";
  
          // Ocultar los demás campos de entrada
          document.getElementById("Opcion3").style.display = "none";
          document.getElementById("Opcion4").style.display = "none";
          document.getElementById("Opcion5").style.display = "none";
      }
      // Repite para las otras opciones...
  }

// function guardarReactivos(){
    
    
//         var descripcion = document.getElementById("ReactivoCre").value;
//         var categoria = document.getElementById("CategoriaReactivos").value;
//         var tipoRespuesta = document.getElementById("TipoRes").value;
//         var obligatorio = document.getElementById("inlineCheckbox1").checked;
    
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", "/BD/prueva/guardar_Reactivos.php", true);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 // Procesar respuesta si es necesario
//             }
//         };
        
//         var data = "descripcion=" + encodeURIComponent(descripcion) +
//                    "&categoria=" + encodeURIComponent(categoria) +
//                    "&tipoRespuesta=" + encodeURIComponent(tipoRespuesta) +
//                    "&obligatorio=" + (obligatorio ? 1 : 0);
        
//                    const respuestasInputs = document.querySelectorAll('[id^="Respuesta"]');
//                    respuestasInputs.forEach((input, index) => {
//                        data += `&respuesta${index + 1}=${encodeURIComponent(input.value)}`;
//                    });
                   
//                    const numRespuestas = document.getElementById("respuestasSelec").value;
//                    data += `&numRespuestas=${numRespuestas}`;
        
//         xhr.send(data);
    
// }

function guardarReactivos() {
    var descripcion = document.getElementById("ReactivoCre").value;
    var categoria = document.getElementById("CategoriaReactivos").value;
    var tipoRespuesta = document.getElementById("TipoRes").value;
    var obligatorio = document.getElementById("inlineCheckbox1").checked;
    const numRespuestas = document.getElementById("respuestasSelec").value;

    const respuestasInputs = document.querySelectorAll('[id^="Respuesta"]');
    var respuestasArray = [];
    respuestasInputs.forEach((input) => {
        const valor = input.value; // Elimina espacios en blanco al inicio y al final
        if (valor !== "") {
            respuestasArray.push(valor);
        }
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/BD/prueva/guardar_Reactivos.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar respuesta si es necesario
        }
    };

    var data = "descripcion=" + encodeURIComponent(descripcion) +
               "&categoria=" + encodeURIComponent(categoria) +
               "&tipoRespuesta=" + encodeURIComponent(tipoRespuesta) +
               "&obligatorio=" + (obligatorio ? 1 : 0) +
               "&numRespuestas=" + encodeURIComponent(numRespuestas);

    // Agregar respuestas capturadas al data
    respuestasArray.forEach((respuesta, index) => {
        data += `&respuesta${index}=${encodeURIComponent(respuesta)}`;
    });

    xhr.send(data);
}

// JavaScript para obtener y mostrar los reactivos en la tabla
function recuperarR() {
    const reactivosTable = document.getElementById("reactivosTable");

    // Realizar una solicitud AJAX para obtener los reactivos
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/BD/prueva/obtener_reactivos.php", true);
    console.log(reactivosTable)
    xhr.onreadystatechange = function() {
       
        console.log(xhr.readyState, xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar la respuesta y construir la tabla
            const reactivos = JSON.parse(xhr.responseText);
            const tableHTML = buildReactivosTable(reactivos);
            reactivosTable.innerHTML = tableHTML;
        }
    };
    xhr.send();
};

// Función para construir la tabla de reactivos
function buildReactivosTable(reactivos) {
    let tableHTML = "<table class= 'table table-bordered'>";
    tableHTML += "<tr><th>Seleccionar</th><th>Descripción</th></tr>";

    reactivos.forEach((reactivo) => {
        tableHTML += `
            <tr>
                <td><input type="checkbox" name="reactivoIds[]" value="${reactivo.id_reactivoC}"></td>
                <td>${reactivo.descripcion}</td>
            </tr>
        `;
    });

    tableHTML += "</table>";
    return tableHTML;
}


function crearEncuestaFinal2() {
    const form = document.forms.form;
    const id_usuario = localStorage.getItem('user_id'); // Obtén el ID de usuario de alguna manera
    const titulo = form.Titulo.value;
    const objetivo = form.objetivo.value;
    const instrucciones = form.Intruccion.value;
    const reactivosSeleccionados = form.querySelectorAll('input[name="reactivoIds[]"]:checked');

    // Realizar una solicitud AJAX para insertar la encuesta en la tabla 'encuestas'
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/BD/prueva/guardar_encuesta.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar la respuesta y obtener el ID de encuesta insertado
            const id_encuesta = parseInt(xhr.responseText);

            // Insertar los reactivos seleccionados en la tabla 'encuesta_FinalReactivos'
            reactivosSeleccionados.forEach((reactivo) => {
                const id_reactivo = parseInt(reactivo.value);

                // Realizar otra solicitud AJAX para insertar la asociación en 'encuesta_FinalReactivos'
                var xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "/BD/prueva/EfinalR.php", true);
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr2.onreadystatechange = function() {
                    if (xhr2.readyState === 4 && xhr2.status === 200) {
                        console.log("Asociación guardada para reactivo " + id_reactivo);
                    }
                };

                xhr2.send(`id_encuesta=${id_encuesta}&id_reactivo=${id_reactivo}&id_usuario=${id_usuario}`);
            });

            console.log("Encuesta creada con ID: " + id_encuesta);
        }
    };

    xhr.send(`id_usuario=${id_usuario}&titulo=${titulo}&objetivo=${objetivo}&instrucciones=${instrucciones}`);
}


// Mostrar encuestas
function mostrarEncuestas() {
    // Mostrar encuestas con el método ajax POST
    $.post("/BD/prueva/mostrarEncuesta.php", {}, function(data, status) {
        $("#tabla_encuestas").html(data);
    });
}

// Mostrar encuestas al cargar la página
$(function() {
    mostrarEncuestas(); // Llamando a la función
});

// function aplicarEncuesta(id_encuesta) {
//     var conf = confirm("¿Estás seguro de aplicar la Encuesta?");
//     if (conf == true) {
//         $.post("/BD/prueva/aplicarEncuesta.php", {id_encuesta: id_encuesta}, function (data, status) {
           
//         });
//     }
// }

// function aplicarEncuesta(id_encuesta) {
//     var conf = confirm("¿Estás seguro de aplicar la Encuesta?");
//     if (conf == true) {
       
//     if (id_encuesta == 1) {
//                 window.location.href = '/BD/prueva/Encuesta2.php';
//             } else  if (id_encuesta == 2) {
//             window.location.href = '/BD/prueva/index.php';
//         }else  if (id_encuesta == 3) {
//             window.location.href = '/BD/prueva/Encuesta3.php';
//         } else {
//             $.post("/BD/prueva/aplicarEncuesta.php", {id_encuesta: id_encuesta}, function (data, status) {
//                 window.location.href = '/BD/prueva/EncuestasAplicar.php?id_encuesta=' + id_encuesta;
//             });
//         }
       
//     }
    
// }

function aplicarEncuesta(id_encuesta) {
    var conf = confirm("¿Estás seguro de aplicar la Encuesta?");
    if (conf == true) {
        // Construye la URL base de acuerdo al ID de la encuesta
        var baseUrl = '/BD/prueva/';
        if (id_encuesta == 1) {
            baseUrl += 'Encuesta2.php';
        } else if (id_encuesta == 2) {
            baseUrl += 'index.php';
        } else if (id_encuesta == 3) {
            baseUrl += 'Encuesta3.php';
        } else {
            // Si no es un ID específico, envía una solicitud POST y redirige
            $.post("/BD/prueva/aplicarEncuesta.php", {id_encuesta: id_encuesta}, function (data, status) {
                window.location.href = '/BD/prueva/EncuestasAplicar.php?id_encuesta=' + id_encuesta;
            });
            return; // Evita que se ejecute el código de redirección general
        }

        // Agrega el ID de la encuesta a la URL y redirige
        window.location.href = baseUrl + '?id_encuesta=' + id_encuesta;
    }
}


// function aplicarEncuesta(id_encuesta) {
//     var conf = confirm("¿Estás seguro de aplicar la Encuesta?");
//     if (conf == true) {
//         // Verifica si el usuario tiene una conexión activa a Internet
//         if (window.navigator.onLine) {
//             // Construye la URL base de acuerdo al ID de la encuesta
//             var baseUrl = '';
//             if (id_encuesta == 1) {
//                 baseUrl += 'Encuesta2.php';
//             } else if (id_encuesta == 2) {
//                 baseUrl += 'index.php';
//             } else if (id_encuesta == 3) {
//                 baseUrl += 'Encuesta3.php';
//             } else {
//                 // Si no es un ID específico, envía una solicitud POST y redirige
//                 $.post("/BD/prueva/aplicarEncuesta.php", {id_encuesta: id_encuesta}, function (data, status) {
//                     window.location.href = '/BD/prueva/EncuestasAplicar.php?id_encuesta=' + id_encuesta;
//                 });
//                 return; // Evita que se ejecute el código de redirección general
//             }

//             // Agrega el ID de la encuesta a la URL y redirige
//             window.location.href = baseUrl + '?id_encuesta=' + id_encuesta;
//         } else {
//             // Si no hay conexión a Internet, redirige a encuesta.html (ruta relativa)
//             window.location.href = '/pestañas_Encuestador/';
//         }
//     }
// }

