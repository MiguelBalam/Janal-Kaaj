// reactivo crear reactivo

function cancelar() {

  Swal.fire({
    title: '¿Estás seguro de cancelar?',
    text: "Se perderá los datos ingresados",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, seguro',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal(reenviar(), limpiar());
    }
  })

  function reenviar() {
    window.location.href = "../pestañas_Encuestador/crear.html";
  }

  function limpiar() {
    formularioRC.reset();
    return false;
  }


}

// editar variables
function cancelar2() {

  Swal.fire({
    title: '¿Estás seguro de cancelar?',
    text: "Se perderá los datos ingresados",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si, seguro',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal(reenviar2(), limpiar2());
    }
  })

  function reenviar2() {
    window.location.href = "../pestañas_Encuestador/variable_tipo_variable.html";
  }

  function limpiar2() {
    formulario.reset();
    return false;
  }

}

// editar variables
function cancelar3() {

  Swal.fire({
    title: '¿Estás seguro de cancelar?',
    text: "Se perderá los datos ingresados",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, seguro',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal(reenviar3(), limpiar3());

    }
  });

  function reenviar3() {
    window.location.href = "../pestañas_Encuestador/crear_Evariables.html";
  }

  function limpiar3() {
    formulario.reset();
    return false;
  }

}

function actuVariable() {
  Swal.fire({
    title: 'Se ha actualizado los datos',
    text: 'Datos actualizados correctamente.',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function crearReactivos() {
  Swal.fire({
    title: 'Se ha creado el reactivo',
    text: 'Datos agregados correctamente',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function notiCrearVariables() {
  Swal.fire({
    title: 'Se ha creado la variable',
    text: 'Datos agregados correctamente',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function notiEnviarForm() {
  Swal.fire({
    title: 'Se han enviado los datos',
    text: 'Datos enviados correctamente',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Confirmar',
  });
}
function notiEncuestador() {
  Swal.fire({
    title: 'Se han registrado los datos',
    text: 'Datos registrados correctamente',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Confirmar',
  });
  //limpiarFormularioEncuestador();
}


function editReactivos() {
  Swal.fire({
    title: 'Se ha editado el reactivo ',
    text: 'Datos actualizados correctamente.',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function borrarVariable() {
  Swal.fire({
    title: 'Se ha borrado la variable ',
    text: 'Eleminado correctamente.',
    icon:'error',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function borrarReactivo() {
  Swal.fire({
    title: 'Se ha borrado el reactivo ',
    text: 'Eleminado correctamente.',
    icon:'error',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

function notiEditarVariables(){
  Swal.fire({
    title: 'Se ha editado la variable',
    text: 'Datos actualizados correctamente.',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });
}

 function GuardarReactivos(){
  Swal.fire({
    title: 'Se ha gurdado los reactivos exitosamente',
    text: 'Datos guardados correctamente.',
    icon: 'success',
    timer: 4000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the desired location after the timer has finished
      window.location.href = '../pestañas_Encuestador/crear.html';
    }
  });

  setTimeout(function () {
    window.location.href = '../pestañas_Encuestador/crear.html';
  }, 4000); // 4000 milliseconds (4 seconds)
  
}

function cancelarReactivo() {

  Swal.fire({
    title: '¿Estás seguro de cancelar?',
    text: "Se regresara al menu principal",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, seguro',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../pestañas_Encuestador/crear.html";

    }
  });

}


function GuardarReactivosPre(){
  Swal.fire({
    title: 'Se ha gurdado los reactivos exitosamente',
    text: 'Datos guardados correctamente.',
    icon: 'success',
    timer: 4000,
    timerProgressBar: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the desired location after the timer has finished
      window.location.href='../pestañas_Encuestador/crear.html'
    }
  });

  setTimeout(function () {
    window.location.href='../pestañas_Encuestador/crear.html'
  }, 4000); // 4000 milliseconds (4 seconds)
  
}

//desabilitar boton
function habilitarbtnV() {
  var TituloVar = document.getElementById("TituloVar");
  var floatingTextarea22 = document.getElementById("floatingTextarea22");
  var floatingTextarea23 = document.getElementById("floatingTextarea23");

  if (TituloVar && floatingTextarea22 && floatingTextarea23) {
    var val = 0;

    if (TituloVar.value == "") {
      val++;
    }
    if (floatingTextarea22.value == "") {
      val++;
    }
    if (floatingTextarea23.value == "") {
      val++;
    }

    var botonCrearEncuestaVar = document.getElementById("boton-crear-encuestaVar");
    if (botonCrearEncuestaVar) {
      botonCrearEncuestaVar.disabled = val !== 0;
    }
  }
}

// Agregar event listeners en el primer HTML
var tituloVarElement = document.getElementById("TituloVar");
if (tituloVarElement) {
  tituloVarElement.addEventListener("keyup", habilitarbtnV);
}

var floatingTextarea22Element = document.getElementById("floatingTextarea22");
if (floatingTextarea22Element) {
  floatingTextarea22Element.addEventListener("keyup", habilitarbtnV);
}

var floatingTextarea23Element = document.getElementById("floatingTextarea23");
if (floatingTextarea23Element) {
  floatingTextarea23Element.addEventListener("keyup", habilitarbtnV);
}

// Función para habilitar botones en el segundo HTML
function habilitarbtn() {
  var tituloElement = document.getElementById("Titulo");
  var floatingTextarea2Element = document.getElementById("floatingTextarea2");
  var floatingTextarea21Element = document.getElementById("floatingTextarea21");

  if (tituloElement && floatingTextarea2Element && floatingTextarea21Element) {
    var val = 0;

    if (tituloElement.value == "") {
      val++;
    }
    if (floatingTextarea2Element.value == "") {
      val++;
    }
    if (floatingTextarea21Element.value == "") {
      val++;
    }

    var botonCrearEncuestaElement = document.getElementById("boton-crear-encuesta");
    if (botonCrearEncuestaElement) {
      botonCrearEncuestaElement.disabled = val !== 0;
    }
  }
}

// Agregar event listeners en el segundo HTML
var tituloElement = document.getElementById("Titulo");
if (tituloElement) {
  tituloElement.addEventListener("keyup", habilitarbtn);
}

var floatingTextarea2Element = document.getElementById("floatingTextarea2");
if (floatingTextarea2Element) {
  floatingTextarea2Element.addEventListener("keyup", habilitarbtn);
}

var floatingTextarea21Element = document.getElementById("floatingTextarea21");
if (floatingTextarea21Element) {
  floatingTextarea21Element.addEventListener("keyup", habilitarbtn);
}

function habilitarbtn2() {
  var nombre = document.getElementById("NomV");
  var sigla = document.getElementById("SiglaV");
  var descrip = document.getElementById("desV");

  if (nombre && sigla && descrip) {
    var val = 0;

    if (nombre.value == "") {
      val++;
    }
    if (sigla.value == "") {
      val++;
    }
    if (descrip.value == "") {
      val++;
    }

    var botonCrearVariable = document.getElementById("boton_crear_variable");
    if (botonCrearVariable) {
      botonCrearVariable.disabled = val !== 0;
    }
  }
}

// Agregar event listeners en el tercer HTML
var nombreElement = document.getElementById("NomV");
if (nombreElement) {
  nombreElement.addEventListener("keyup", habilitarbtn2);
}

var siglaElement = document.getElementById("SiglaV");
if (siglaElement) {
  siglaElement.addEventListener("keyup", habilitarbtn2);
}

var descripElement = document.getElementById("desV");
if (descripElement) {
  descripElement.addEventListener("keyup", habilitarbtn2);
}

// Función para habilitar botones en el cuarto HTML
function habilitarbtn3() {
  var nombre = document.getElementById("nombre");
  var apellido = document.getElementById("apellido");
  var email = document.getElementById("email");
  var tel = document.getElementById("tele");
  var mensaje = document.getElementById("mensaje");

  if (nombre && apellido && email && tel && mensaje) {
    var v = 0;

    if (nombre.value == "") {
      v++;
    }
    if (apellido.value == "") {
      v++;
    }
    if (email.value == "") {
      v++;
    }
    if (tel.value == "") {
      v++;
    }
    if (mensaje.value == "") {
      v++;
    }   
  }
  const boton = document.getElementById('enviarContacto');

  boton.addEventListener('click', function(event) {
    if (event.target === boton && v == 0) {
      notiEnviarForm();     
    }
  });}

  function habilitarbtn4() {
    var nombre = document.getElementById("titulo");
    var apellido = document.getElementById("noticia");
    var email = document.getElementById("image");
  
  
    if (nombre && apellido ) {
      var v = 0;
  
      if (nombre.value == "") {
        v++;
      }
      if (apellido.value == "") {
        v++;
      }
      
  
    }
    const boton = document.getElementById('enviarNoticia');
  
    boton.addEventListener('click', function(event) {
      if (event.target === boton && v == 0) {   
        limpiarFormularioNews();
      }
    });}

// Agregar event listeners en el cuarto HTML
var nombreElement2 = document.getElementById("nombre");
if (nombreElement2) {
  nombreElement2.addEventListener("keyup", habilitarbtn3);
}

var apellidoElement = document.getElementById("apellido");
if (apellidoElement) {
  apellidoElement.addEventListener("keyup", habilitarbtn3);
}

var emailElement = document.getElementById("email");
if (emailElement) {
  emailElement.addEventListener("keyup", habilitarbtn3);
}

var telElement = document.getElementById("tele");
if (telElement) {
  telElement.addEventListener("keyup", habilitarbtn3);
}

var mensajeElement = document.getElementById("mensaje");
if (mensajeElement) {
  mensajeElement.addEventListener("keyup", habilitarbtn3);
}

// Agregar event listener en el cuarto HTML
var botonCrearEncuesta = document.getElementById("boton-crear-encuesta");
if (botonCrearEncuesta) {
  botonCrearEncuesta.addEventListener("click", function() {
  });
}


//ENCUESTADO
function habilitarFormEncuestado() {
  var nombre = document.getElementById("nombrecompletos");
  var apellido = document.getElementById("apellidopaterno");
  var apellido2 = document.getElementById("apellidomaterno");
  var edad = document.getElementById("edad");
  var localidad = document.getElementById("localidad");
  var ciudad = document.getElementById("ciudad");
  var municipio = document.getElementById("municipio");
  var estado = document.getElementById("estado");
  var email = document.getElementById("Email-encuestado");
  var tele = document.getElementById("tel-encuestado");
  var contra = document.getElementById("contra-encuestado");
  var contra2 = document.getElementById("contra-encuestado2");

  if (nombre && apellido && apellido2 && edad && localidad && ciudad && municipio && estado && email && tele && contra && contra2) {
    var val = 0;

    if (nombre.value == "") {
      val++;
    }
    if (apellido.value == "") {
      val++;
    }
    if (apellido2.value == "") {
      val++;
    }
    if (edad.value == "") {
      val++;
    }
    if (localidad.value == "") {
      val++;
    }
    if (ciudad.value == "") {
      val++;
    }
    if (municipio.value == "") {
      val++;
    }
    if (estado.value == "") {
      val++;
    }
    if (email.value == "") {
      val++;
    }
    if (tele.value == "") {
      val++;
    }
    if (contra.value == "") {
      val++;
    }
    if (contra2.value == "") {
      val++;
    }

    if (val == 0) {
      notiEncuestado();
      console.log("Error: " + val);
    } else {
      console.log("Error: " + val);
    }
  }
}

// Agregar event listeners en el quinto HTML (Encuestado)
var nombreEncuestadoElement = document.getElementById("nombrecompletos");
if (nombreEncuestadoElement) {
  nombreEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var apellidoPaternoEncuestadoElement = document.getElementById("apellidopaterno");
if (apellidoPaternoEncuestadoElement) {
  apellidoPaternoEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var apellidoMaternoEncuestadoElement = document.getElementById("apellidomaterno");
if (apellidoMaternoEncuestadoElement) {
  apellidoMaternoEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var edadEncuestadoElement = document.getElementById("edad");
if (edadEncuestadoElement) {
  edadEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var localidadEncuestadoElement = document.getElementById("localidad");
if (localidadEncuestadoElement) {
  localidadEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var ciudadEncuestadoElement = document.getElementById("ciudad");
if (ciudadEncuestadoElement) {
  ciudadEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var municipioEncuestadoElement = document.getElementById("municipio");
if (municipioEncuestadoElement) {
  municipioEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var estadoEncuestadoElement = document.getElementById("estado");
if (estadoEncuestadoElement) {
  estadoEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var emailEncuestadoElement = document.getElementById("Email-encuestado");
if (emailEncuestadoElement) {
  emailEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var teleEncuestadoElement = document.getElementById("tel-encuestado");
if (teleEncuestadoElement) {
  teleEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var contraEncuestadoElement = document.getElementById("contra-encuestado");
if (contraEncuestadoElement) {
  contraEncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}

var contra2EncuestadoElement = document.getElementById("contra-encuestado2");
if (contra2EncuestadoElement) {
  contra2EncuestadoElement.addEventListener("keyup", habilitarFormEncuestado);
}


// Función para habilitar el formulario de encuestador
function habilitarFormEncuestador() {
  var nombre = document.getElementById("nombrecompletos").value;
  var apellido = document.getElementById("apellidopaterno").value;
  var apellido2 = document.getElementById("apellidomaterno").value;
  var edad = document.getElementById("edad").value;
  var localidad = document.getElementById("procedencia").value;
  var email = document.getElementById("Correo").value;
  var tel = document.getElementById("tel").value;
  var contra = document.getElementById("Contrasenia").value;
  var contra2 = document.getElementById("Contrasenia2").value;

  var val = 0;

  // Verificar cada campo y aumentar el contador si está vacío
  if (nombre === "") val++;
  if (apellido === "") val++;
  if (apellido2 === "") val++;
  if (edad === "") val++;
  if (localidad === "") val++;
  if (email === "") val++;
  if (tel === "") val++;
  if (contra === "") val++;
  if (contra2 === "") val++;

  // Habilitar o deshabilitar el botón según el contador
  var botonEnviar = document.getElementById("boton-enviaru");
  if (val === 0) {
    // Habilitar el botón de enviar
    botonEnviar.disabled = false;
  } else {
    // Deshabilitar el botón de enviar
    botonEnviar.disabled = true;
  }
}

// Agregar event listeners en el sexto HTML (Encuestador)
var nombreEncuestadorElement = document.getElementById("nombrecompletos");
if (nombreEncuestadorElement) {
  nombreEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var apellidoPaternoEncuestadorElement = document.getElementById("apellidopaterno");
if (apellidoPaternoEncuestadorElement) {
  apellidoPaternoEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var apellidoMaternoEncuestadorElement = document.getElementById("apellidomaterno");
if (apellidoMaternoEncuestadorElement) {
  apellidoMaternoEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var edadEncuestadorElement = document.getElementById("edad");
if (edadEncuestadorElement) {
  edadEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var localidadEncuestadorElement = document.getElementById("procedencia");
if (localidadEncuestadorElement) {
  localidadEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var emailEncuestadorElement = document.getElementById("Correo");
if (emailEncuestadorElement) {
  emailEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var telEncuestadorElement = document.getElementById("tel");
if (telEncuestadorElement) {
  telEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var contraEncuestadorElement = document.getElementById("Contrasenia");
if (contraEncuestadorElement) {
  contraEncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var contra2EncuestadorElement = document.getElementById("Contrasenia2");
if (contra2EncuestadorElement) {
  contra2EncuestadorElement.addEventListener("keyup", habilitarFormEncuestador);
}

var botonCrearEncuestaVar = document.getElementById("boton-enviar");
if (botonCrearEncuestaVar) {
  botonCrearEncuestaVar.disabled = true; // Inicialmente se deshabilita el botón
}
// -----------------------------------------------------------------

function limpiarFormulario() {
  document.getElementById("formulario").reset();
}

function limpiarFormularioNews() {
  document.getElementById("formularioNews").reset();
}

function limpiarFormulario2() {
  document.getElementById("formularioRC").reset();

}
function limpiarFormularioContact() {
  document.getElementById("formularioCT").reset();
}
/*function limpiarFormularioEncuestado() {
  document.getElementById("formEncuestado").reset();
}
function limpiarFormularioEncuestador() {
  document.getElementById("EncuestadoForm").reset();
}*/

function actuali(){
  window.location.reload();
}

function borraactu(){


function testAsync(){
  return new Promise((resolve,reject)=>{
      //here our function should be implemented 
      setTimeout(()=>{
        actuali();
          resolve();
      ;} , 2100
      );
  });
}

async function callerFun(){
  borrarVariable();
  await testAsync();
}

callerFun();

}

// -----------------------------------------------------------------
function actuali2(){
  window.location.reload();
}

function borraactu2(){


function testAsync(){
  return new Promise((resolve,reject)=>{
      //here our function should be implemented 
      setTimeout(()=>{
        actuali2();
          resolve();
      ;} , 2100
      );
  });
}

async function callerFun(){
  borrarReactivo();
  await testAsync();
}

callerFun();

}

// Perfil encuestador cancelar
function CanEncues() {

  Swal.fire({
    title: '¿Estás seguro de cancelar?',
    text: "Asegúrate de guardar los datos.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, seguro',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal(ree());

    }
  });

  function ree() {
    window.location.href = "../pestañas_Encuestador/dashboard.html";
  }

}

// editar Perfil encuestador cancelar
function editarEncues() {

  Swal.fire({
    title: 'Puede editar los datos',
    text: "Ingrese correctamente los datos",
    icon: 'info',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Enterado',
  })
}