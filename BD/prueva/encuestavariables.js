// window.addEventListener('load', (event) => {
//     let miBody = document.body;
//        miBody.classList.remove('loader');
//        accionBtn(sustraerEntero=0);

// });


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
const variablesSeleccionadas = [];
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
            const variableR = JSON.parse(xhr.responseText);
            const tableHTML = buildVariablesTable(variableR);
            variablesTable.innerHTML = tableHTML;
        }
        console.log(xhr.responseText);
    };
    xhr.send();
};

// Función para construir la tabla de reactivos
function buildVariablesTable(variablesDataR) {
    let tableHTML = "<table class= 'table table-bordered'>";
    tableHTML += "<tr><th>Seleccionar</th><th>Descripción</th></tr>";

    variablesDataR.forEach((variableR) => {
        tableHTML += `
            <tr>
            <td><input type="checkbox" name="variablesIds[]" value="${variableR.id_variable}" onchange="moverVariable(this, ${variableR.id_variable}, '${variableR.Nobre_Var}')"></td>
                <td>${variableR.Nobre_Var}</td>
            </tr>
        `;
    });

    tableHTML += "</table>";
    return tableHTML;
}
function moverVariable(checkbox, id_variable, nombre) {
    if (checkbox.checked) {
        variablesSeleccionadas.push({ id_variable, nombre });
    } else {
        const index = variablesSeleccionadas.findIndex((item) => item.id_variable === id_variable);
        if (index !== -1) {
            variablesSeleccionadas.splice(index, 1);
        }
    }
}

document.getElementById("guardarV").addEventListener("click", function() {
    // Al hacer clic en el botón de guardar, redirige a otra página con los elementos seleccionados
    const queryParams = encodeURIComponent(JSON.stringify(variablesSeleccionadas));
    window.location.href = "/pestanas_Encuestador/crear_Evariables.html?data=" + queryParams;
});


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

function recuperarV2() {
    const variablesTable2 = document.getElementById("variablesTable2");

    // Obtener la fecha actual en formato ISO 8601
    const currentDate = new Date();
   // const lastUpdateDate = currentDate.toISOString().split('T')[0]; // Obtener solo la parte de la fecha
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
   const lastUpdateDate = hoy.toLocaleDateString()
   // console.log("lastUpdateDate:", lastUpdateDate );

    var fechaOriginal = lastUpdateDate;

// Divide la fecha en día, mes y año
var partesFecha = fechaOriginal.split("/");
var dia = partesFecha[0];
var mes = partesFecha[1];
var año = partesFecha[2];

// Formatea la fecha en el nuevo formato "2023-09-21"
var fechaFormateada = año + '-' + (mes.length === 1 ? '0' + mes : mes) + '-' + (dia.length === 1 ? '0' + dia : dia);

console.log(fechaFormateada);

    // Realizar una solicitud AJAX con el parámetro de fecha
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/BD/prueva/obtener_Variables2.php?hoy=${fechaFormateada}`, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Procesar la respuesta y construir la tabla
            const variables = JSON.parse(xhr.responseText);
            const tableHTML = buildVariablesTable2(variables);
            variablesTable2.innerHTML = tableHTML;

            
        }
    };

    xhr.send();
}

function buildVariablesTable2(variablesData) {
    let tableHTML = "<table class= 'table table-bordered'>";
    tableHTML += "<tr><th>Seleccionar</th><th>Descripción</th></tr>";

    variablesData.forEach((variable) => {
       // const isChecked = selectedVariables.includes(variable.id_variable);
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