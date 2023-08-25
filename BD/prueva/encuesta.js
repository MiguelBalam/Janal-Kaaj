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

function contadorChecken() {
    let valoresCheck = [];
    $("input[type=radio]:checked, input[type=text]").each(function () {
        valoresCheck.push(this.value);
    });

    let totalChecken = valoresCheck.length;
    let totalPBD = document.querySelector('#totalPreguntasBD');
    let totalPreguntas = Number(totalPBD.dataset.totalpreg);

    let porcentaje = (totalChecken * 100) / totalPreguntas;
    let porcentajeDecimale = Number(porcentaje.toFixed(3));

    let sustraerEntero = Number(porcentaje.toFixed(3).substring(0, 3));

    accionBtn(sustraerEntero);

    let barraPro = document.querySelector(".progress-bar");
    barraPro.style.width = `${porcentajeDecimale}%`;
    barraPro.textContent = `${sustraerEntero}%`;
}

function accionBtn(sustraerEntero = 0) {
    let btnEnviar = document.querySelector('#btnSend');
    btnEnviar.disabled = true;

    if (sustraerEntero == '100') {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Crear nuevo Registro';
    } else {
        btnEnviar.disabled = true;
    }
}

function GuardarRes() {
    let formFormatoGS = $('#formFormatoGS').serialize();
    let spanCodigo = document.querySelector('#codigo').textContent;
    let codigo = Number(spanCodigo);

    let inputValue = {}; // Crear un objeto para almacenar los valores
    $('[name^="respuesta["][name$="[input]"]').each(function() {
        let questionId = $(this).attr('name').match(/\[(\d+)\]\[input\]/)[1];
        let value = $(this).val();
        inputValue[questionId] = value;
    });

    $.ajax({
        url: 'GuardarRes.php',
        type: 'POST',
        data: formFormatoGS +'&codigo='+codigo + '&inputValue=' + JSON.stringify(inputValue),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.respuesta){
                alert('Felicitaciones, encuesta llenada correctamente.');
                location.href ="../prueva/index.php";
            }

        }
    }); 
}

function GuardarResVariable() {
    let formFormato = $('#formFormato').serialize();
    let spanCodigo = document.querySelector('#codigo2').textContent;
    let codigo = Number(spanCodigo);

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
        data: formFormato + '&codigo=' + codigo + '&responses=' + JSON.stringify(responses),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.respuesta) {
                alert('Felicitaciones, encuesta llenada correctamente.');
                location.href = "../prueva/index.php";
            }
        }
    });
}

