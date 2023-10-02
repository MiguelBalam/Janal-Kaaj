function obtenerElIdDeLaEncuesta() {
    const urlParams = new URLSearchParams(window.location.search);
    const idEncuesta = urlParams.get('id_encuesta');
    return idEncuesta;
}
let idEncuesta = obtenerElIdDeLaEncuesta();

function obtenerDetallesEncuesta(idEncuesta) {
    // Agregar id_encuesta al campo oculto

    $.post("/CRUD/mostrarD.php", {id_encuesta: idEncuesta}, function (data, status) {
        // PARSE json data
        var encuesta = JSON.parse(data);
        console.log(encuesta)
        // Asignamos valores de la encuesta al modal
        $("#modificar_titulo").val(encuesta.titulo);
        $("#modificar_descripcion").val(encuesta.descripcion);
        $("#modificar_instruccion").val(encuesta.instrucciones);
    });
    // Abrir modal de modificar
}

// Funcion modificarDetallesEncuesta del modal modificar producto
function modificarDetallesEncuesta() {
    // Obtener valores
    var titulo      = $("#modificar_titulo").val();
    var id_encuesta = $("#hidden_id_encuesta").val();
    var descripcion = $("#modificar_descripcion").val();
    var instruccion = $("#modificar_instruccion").val();

    // Modificar detalles consultando al servidor usando ajax
    $.post("/CRUD/editarE.php",
        {
            id_encuesta : id_encuesta,
            titulo      : titulo,
            descripcion : descripcion,
            instruccion : instruccion
        },
        function (data, status) {
            // Ocultar el modal utilizando jQuery
            $("#modal_modificar").modal("hide");
            // Volver a cargar la tabla productos
            mostrarEncuestas();
        }
    ) ;
}