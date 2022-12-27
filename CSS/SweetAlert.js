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
  })

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
  })
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
  })
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
  })
}

//desabilitar boton
function habilitarbtn() {
  Titulo = document.getElementById("Titulo").value;
  floatingTextarea2 = document.getElementById("floatingTextarea2").value;
  floatingTextarea21 = document.getElementById("floatingTextarea21").value;
  // salida2 = document.getElementById("salida2").value;
  //  s =  document.getElementById("s").value;
  //  $btnVerEstado = document.getElementById("estado").value;
  val = 0;
  if (Titulo == "") {
    val++;

  }
  if (floatingTextarea2 == "") {
    val++;
  }
  if (floatingTextarea21 == "") {
    val++;
  }
  // if(salida2 == ""){
  //     val++;
  // }
  // if(s == ""){
  //     val++;
  // }
  if (val == 0) {
    document.getElementById("boton-crear-encuesta").disabled = false;
  } else {
    document.getElementById("boton-crear-encuesta").disabled = true;
  }
}

// document.getElementById("estado").addEventListener("click", () => {
// 	if (s.checked) {
// 		alert("Marcado");
// 	} else {
// 		alert("Desmarcado");
// 	}
// })

document.getElementById("Titulo").addEventListener("keyup", habilitarbtn);
document.getElementById("floatingTextarea2").addEventListener("keyup", habilitarbtn);
document.getElementById("floatingTextarea21").addEventListener("keyup", habilitarbtn);
// document.getElementById("s").addEventListener("keyup", habilitarbtn);

// document.getElementById("salida2").addEventListener("keyup", habilitarbtn);
document.getElementById("boton-crear-encuesta").addEventListener("click", () => {
  alert("Se ha llenado todo")
});