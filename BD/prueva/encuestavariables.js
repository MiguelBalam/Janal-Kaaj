window.addEventListener('load', (event) => {
    let miBody = document.body;
       miBody.classList.remove('loader');
       accionBtn(sustraerEntero=0);

});


function crearVariable2() {
    var Nobre_Var = document.getElementById("NomV").value;
    var Siglas = document.getElementById("SiglaV").value;
    var descripcion = document.getElementById("desV").value;
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/BD/prueva/crear_variable.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar respuesta si es necesario
        }
    };

    var data = "Nobre_Var=" + encodeURIComponent(Nobre_Var) +
               "&Siglas=" + encodeURIComponent(Siglas) +
               "&descripcion=" + encodeURIComponent(descripcion) 

    xhr.send(data);
}

function recuperarV() {
    const variablesTable = document.getElementById("variablesTable");

    // Realizar una solicitud AJAX para obtener los reactivos
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/BD/prueva/obtener_variables.php", true);
    console.log(variablesTable)
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState, xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar la respuesta y construir la tabla
            const variables = JSON.parse(xhr.responseText);
            const tableHTML = buildVariablesTable(variables);
            variablesTable.innerHTML = tableHTML;
        }
        console.log(xhr.responseText);
    };
    xhr.send();
};

// Función para construir la tabla de reactivos
function buildVariablesTable(variablesData) {
    let tableHTML = "<table class= 'table table-bordered'>";
    tableHTML += "<tr><th>Seleccionar</th><th>Descripción</th></tr>";

    variablesData.forEach((variable) => {
        tableHTML += `
            <tr>
                <td><input type="checkbox" name="variablesIds[]" value="${variable.id_variable}"></td>
                <td>${variable.Nobre_Var}</td>
            </tr>
        `;
    });

    tableHTML += "</table>";
    return tableHTML;
}

function crearFinalVariables() {
    const form = document.forms.form;
    const id_usuario = localStorage.getItem('user_id'); // Obtén el ID de usuario de alguna manera
    const titulo = form.TituloVar.value;
    const objetivo = form.objetivo.value;
    const instrucciones = form.Intruccion.value;
    const VariablesSeleccionados = form.querySelectorAll('input[name="variablesIds[]"]:checked');

    // Realizar una solicitud AJAX para insertar la encuesta en la tabla 'encuestas'
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/BD/prueva/guardar_encuestaVariable.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar la respuesta y obtener el ID de encuesta insertado
            const id_encuesta = parseInt(xhr.responseText);

            // Insertar los reactivos seleccionados en la tabla 'encuesta_FinalReactivos'
            VariablesSeleccionados.forEach((variables) => {
                const id_variable = parseInt(variables.value);

                // Realizar otra solicitud AJAX para insertar la asociación en 'encuesta_FinalReactivos'
                var xhr2 = new XMLHttpRequest();
                xhr2.open("POST", "/BD/prueva/EfinalV.php", true);
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr2.onreadystatechange = function() {
                    if (xhr2.readyState === 4 && xhr2.status === 200) {
                        console.log("Asociación guardada para variable " + id_variable);
                    }
                };

                xhr2.send(`id_encuesta=${id_encuesta}&id_variable=${id_variable}&id_usuario=${id_usuario}`);
            });

            console.log("Encuesta creada con ID: " + id_encuesta);
        }
    };

    xhr.send(`id_usuario=${id_usuario}&titulo=${titulo}&objetivo=${objetivo}&instrucciones=${instrucciones}`);
}
