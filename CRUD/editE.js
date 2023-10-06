
function obtenerIdEncuestaDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const idEncuestas = urlParams.get('id');
    return idEncuestas;
}
var idEncuestas = obtenerIdEncuestaDesdeURL();
    if (idEncuestas) {
        $("#hidden_id_encuesta").val(idEncuestas); // Establecer el ID en un campo oculto
    // Llenar los campos del formulario
   // obtenerReactivosPorEncuesta(idEncuestas);
    }

function modificarDetallesEncuesta() {
    var id_encuesta = $("#hidden_id_encuesta").val();
    var titulo = $("#modificar_titulo").val();
    var descripcion = $("#modificar_descripcion").val();
    var instrucciones = $("#modificar_instruccion").val();

    // Realizar la solicitud AJAX para enviar los datos al servidor y realizar la modificación
    $.post("/CRUD/editarE.php", {
        id_encuesta: id_encuesta, // Aquí está correcto
        titulo: titulo,
        descripcion: descripcion,
        instrucciones: instrucciones
    }, function (response) {
        if (response === 'success') {
            alert("Encuesta modificada con éxito.");
            // Puedes redirigir a otra página o realizar otras acciones después de la modificación
        }
    });
}

// function obtenerReactivosPorEncuesta(idEncuesta) {
//     // Realiza una solicitud AJAX para obtener los reactivos
//     $.ajax({
//       url: '/CRUD/reactivos.php', // Reemplaza con la ruta correcta de tu backend
//       method: 'GET',
//       data: { id: idEncuesta },
//       success: function(data) {
//         // Manipula los datos recibidos, por ejemplo, agrega los reactivos a un contenedor en tu página.
//         $('#contenedor_reactivos').html(data);
//         console.log(data)
//       },
//       error: function() {
//         alert('Error al cargar los reactivos.');
//       }
//     });
//   }

$(document).ready(function() {
    console.log("Documento listo");

    const idEncuesta =obtenerIdEncuestaDesdeURL();; // Asegúrate de obtener el ID de encuesta de alguna manera
    console.log(idEncuesta)
    $.ajax({
        url: '/CRUD/reactivos.php',
        method: 'GET',
        data: {id: idEncuesta},     
        success: function(data) {
            console.log("Tipo de dato de data:", typeof data);
            console.log(data);

            const jsonData = JSON.parse(data);
            const tablaReactivos = $('#tabla_reactivos');
            console.log(tablaReactivos);
            if (Array.isArray(jsonData)) {
                console.log(jsonData);
                jsonData.forEach(function(reactivo) {
                    const fila = `<tr>
                        <td>${reactivo.id_reactivoC}</td>
                        <td>${reactivo.descripcion}</td>
                        <td>${reactivo.nombre_categoria}</td>
                        <td>${reactivo.nombre_tipoRespuesta}</td>
                        <td>${reactivo.obligatorio}</td>
                        <td><button class="btn btn-primary editar-reactivo" data-id="${reactivo.id_reactivoC}">Editar</button></td>
                        <td><button class="btn btn-danger eliminar-reactivo" data-borrar="${reactivo.id_reactivoC}">Borrar</button></td>
                    </tr>`;
                    console.log('Datos del reactivo:');
                    tablaReactivos.append(fila);
                 
                });

                tablaReactivos.on('click', '.editar-reactivo', function() {
                    const idReactivo = $(this).data('id');
                    const maxRespuestas = 5; // Cambia 5 al valor adecuado

                            // Buscar el reactivo correspondiente en el arreglo jsonData
                    const reactivoSeleccionado = jsonData.find(reactivo => reactivo.id_reactivoC == idReactivo);
                    
                    if (reactivoSeleccionado) {
                        // Llenar los campos del formulario con los valores del reactivo seleccionado
                       // $('#aqui').val(reactivoSeleccionado.descripcion);
                        $('#ReactivoCre').val(reactivoSeleccionado.descripcion);
                        $('#CategoriaReactivos').val(reactivoSeleccionado.nombre_categoria);
                        $('#TipoRes').val(reactivoSeleccionado.nombre_tipoRespuesta);
                        
                        // Verificar y marcar el checkbox de "Obligatorio" si es necesario
                        if (reactivoSeleccionado.obligatorio == "1") {
                            $('#inlineCheckbox1').prop('checked', true);
                        } else {
                            $('#inlineCheckbox1').prop('checked', false);
                        }
                    } if (reactivoSeleccionado.nombre_tipoRespuesta === '3') {
                        $('#Respuestas').show();
                       
                        // Realizar una solicitud AJAX para obtener las respuestas de la tabla opciones_respuesta
                        $.ajax({
                            url: '/CRUD/posRes.php', // Reemplaza con la URL de tu script PHP para obtener respuestas
                            method: 'POST',
                            data: {
                                id_reactivoC: idReactivo 
                            },
                            success: function(response) {
                                console.log(response);

                                // Parsear la respuesta JSON (suponiendo que la respuesta sea JSON)
                                const respuestas = JSON.parse(response);
                                console.log(respuestas);

                                // Llenar los campos de respuesta con las posibles respuestas
                                for (let i = 0; i < respuestas.length; i++) {
                                    const campoRespuesta = $('#Respuesta' + (i + 1));
                                    if (campoRespuesta.length) {
                                        campoRespuesta.val(respuestas[i]);
                                    }
                                }
                            },
                            error: function(xhr, status, error) {
                                console.error(error);
                            }
                        });
                    } else {
                        // Si el tipo de respuesta no es igual a 3, ocultar los campos de respuesta
                        $('#Respuestas').hide();
                    }
                
                    $('#formularioRC').submit(function(e) {
                        e.preventDefault(); // Evitar que se envíe el formulario de forma predeterminada
                    
                        // Obtener los valores de los campos del formulario
                        
                        const nuevoValorReactivoCre = $('#ReactivoCre').val();
                        const nuevoValorCategoriaReactivos = $('#CategoriaReactivos').val();
                        const nuevoValorTipoRes = $('#TipoRes').val();
                        const nuevoValorObligatorio = $('#inlineCheckbox1').is(':checked') ? "1" : "0";
                    
                        const respuestasActualizadas = [];
                        for (let i = 1; i <= maxRespuestas; i++) {
                            const campoRespuesta = $('#Respuesta' + i);
                            if (campoRespuesta.length) {
                                respuestasActualizadas.push(campoRespuesta.val());
                            }
                        }
                        // Realizar una solicitud AJAX para actualizar los datos en el servidor
                        $.ajax({
                            url: '/CRUD/actualizarR.php', // Nombre del archivo PHP para la actualización
                            method: 'POST',
                            data: {
                                id_reactivoC: reactivoSeleccionado.id_reactivoC, // Debes enviar el ID del reactivo que se está editando
                                nuevoValorReactivoCre: nuevoValorReactivoCre,
                                nuevoValorCategoriaReactivos: nuevoValorCategoriaReactivos,
                                nuevoValorTipoRes: nuevoValorTipoRes,
                                nuevoValorObligatorio: nuevoValorObligatorio,
                                respuestas: JSON.stringify(respuestasActualizadas)
                                },
                            success: function(response) {
                                // Manejar la respuesta del servidor aquí (puede ser un mensaje de éxito o error)
                                console.log(response);
                            },
                            error: function(xhr, status, error) {
                                console.error(error);
                            }
                        });
                    });



                });

tablaReactivos.on('click', '.eliminar-reactivo', function() {
    const idReactivo = $(this).data('borrar');
    
    // Confirmar si el usuario realmente desea eliminar la pregunta
    const confirmarEliminar = confirm("¿Estás seguro de que deseas eliminar esta pregunta?");
    
    if (confirmarEliminar) {
        // Realizar una solicitud AJAX para eliminar la pregunta
        $.ajax({
            url: '/CRUD/eliminarP.php', // Nombre del archivo PHP para la eliminación
            method: 'POST',
            data: {
                id_reactivoC: idReactivo
            },
            success: function(response) {
                // Manejar la respuesta del servidor aquí (puede ser un mensaje de éxito o error)
                console.log(response);
                // Actualizar la tabla de reactivos o realizar cualquier otra acción necesaria
                // ...
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }
});

            
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
       
    });
 
});


// Evitar que se envíe el formulario de forma predeterminada

    // Obtener los valores de los campos del formulario
    function actualizarR(){
    const nuevoValorReactivoCre = $('#ReactivoCre').val();
    const nuevoValorCategoriaReactivos = $('#CategoriaReactivos').val();
    const nuevoValorTipoRes = $('#TipoRes').val();
    const nuevoValorObligatorio = $('#inlineCheckbox1').is(':checked') ? "1" : "0";

    // Realizar una solicitud AJAX para actualizar los datos en el servidor
    $.ajax({
        url: '/CRUD/actualizarR.php', // Nombre del archivo PHP para la actualización
        method: 'POST',
        data: {
            id_reactivoC: reactivoSeleccionado.id_reactivoC, // Debes enviar el ID del reactivo que se está editando
            nuevoValorReactivoCre: nuevoValorReactivoCre,
            nuevoValorCategoriaReactivos: nuevoValorCategoriaReactivos,
            nuevoValorTipoRes: nuevoValorTipoRes,
            nuevoValorObligatorio: nuevoValorObligatorio
        },
        success: function(response) {
            // Manejar la respuesta del servidor aquí (puede ser un mensaje de éxito o error)
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
    }
// Agregar un evento de envío al formulario



// $(document).ready(function() {
//     const idEncuesta = obtenerIdEncuestaDesdeURL();
//     console.log(idEncuesta);
    
//     // Simula datos como un arreglo JSON para fines de prueba
//     const data = [{"id_reactivoC":"25","descripcion":"\u00bfQu\u00e9 producto comercializa o qu\u00e9 actividad productiva desempe\u00f1a?","id_categoria":"25","id_tipoRespuesta":"25","obligatorio":"1"},{"id_reactivoC":"85","descripcion":"d","id_categoria":"85","id_tipoRespuesta":"85","obligatorio":"0"}];

//     const tablaReactivos = $('#tabla_reactivos');
//     tablaReactivos.empty();

//     if (Array.isArray(data)) {
//         data.forEach(function(reactivo) {
//             const fila = `<tr>
//                 <td>${reactivo.id_reactivoC}</td>
//                 <td>${reactivo.descripcion}</td>
//                 <td>${reactivo.id_categoria}</td>
//                 <td>${reactivo.id_tipoRespuesta}</td>
//                 <td>${reactivo.obligatorio}</td>
//                 <td><button class="btn btn-primary editar-reactivo" data-id="${reactivo.id_reactivoC}">Editar</button></td>
//             </tr>`;
//             tablaReactivos.append(fila);
//             console.log('Datos del reactivo:', reactivo);
//         });
//     }
// });


// function obtenerReactivosPorEncuesta(idEncuesta) {
//     // Realiza una solicitud AJAX para obtener los reactivos
//     $.ajax({
//       url: '/CRUD/reactivos.php', // Reemplaza con la ruta correcta de tu backend
//       method: 'GET',
//       data: { id: idEncuesta },
//       success:function(data) {
//         console.log(data)
//         // Manipula los datos recibidos y agrega las filas a la tabla de reactivos
//         const tablaReactivos = $('#tabla_reactivos');
//         tablaReactivos.empty(); // Limpia cualquier contenido anterior en la tabla
    
//         if (Array.isArray(data)) {
//             data.forEach(function(reactivo) {
//                 const fila = `<tr>
//                     <td>${reactivo.id_reactivoC}</td>
//                     <td>${reactivo.descripcion}</td>
//                     <td>${reactivo.id_categoria}</td>
//                     <td>${reactivo.id_tipoRespuesta}</td>
//                     <td>${reactivo.obligatorio}</td>
//                     <td><button class="btn btn-primary editar-reactivo" data-id="${reactivo.id_reactivoC}">Editar</button></td>
//                 </tr>`;
//                 tablaReactivos.append(fila);
//             });
//         } 
//     }
//         // Agrega un controlador de eventos para el botón de editar
// }
// )}
  

document.getElementById("btnEliminar").addEventListener("click", function () {
    // Obtener el ID de la encuesta desde la URL
    var urlParams = new URLSearchParams(window.location.search);
    var encuesta_id = urlParams.get("id");

    if (encuesta_id) {
        // Realizar una solicitud AJAX para eliminar la encuesta
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/CRUD/eliminarE.php?id=" + encuesta_id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            if (xhr.status == 200) {
                alert(xhr.responseText); // Muestra un mensaje de éxito
                window.location.href = "/pestanas_Encuestador/dashboard.html"; // Redirige a otra página después de eliminar
            } else {
                alert("Error al eliminar la encuesta.");
            }
        };

        xhr.send();
    } else {
        alert("ID de encuesta no encontrado en la URL.");
    }
});

