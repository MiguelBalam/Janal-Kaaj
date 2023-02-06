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
document.getElementById("Titulo").addEventListener("keyup", function () { habilitarbtn() } );
document.getElementById("floatingTextarea2").addEventListener("keyup", function () { habilitarbtn() } );
document.getElementById("floatingTextarea21").addEventListener("keyup", function () { habilitarbtn() } );

function habilitarbtn2() {
  nombre = document.getElementById("NomV").value;
  sigla = document.getElementById("SiglaV").value;
  descrip = document.getElementById("desV").value;
  // salida2 = document.getElementById("salida2").value;
  //  s =  document.getElementById("s").value;
  //  $btnVerEstado = document.getElementById("estado").value;
  val = 0;
  if (nombre == "") {
    val++;

  }
  if (sigla == "") {
    val++;
  }
  if (descrip == "") {
    val++;
  }
  if (val == 0) {
    document.getElementById("boton_crear_variable").disabled = false;
  } else {
    document.getElementById("boton_crear_variable").disabled = true;
  }
  
}
document.getElementById("NomV").addEventListener("keyup", function () { habilitarbtn2() } );
  document.getElementById("SiglaV").addEventListener("keyup", function () { habilitarbtn2() } );
  document.getElementById("desV").addEventListener("keyup", function () { habilitarbtn2() } );
  




// document.getElementById("s").addEventListener("keyup", habilitarbtn);

// document.getElementById("salida2").addEventListener("keyup", habilitarbtn);
// document.getElementById("boton-crear-encuesta").addEventListener("click", () => {
//   alert("Se ha llenado todo");
// });


// document.getElementById("estado").addEventListener("click", () => {
// 	if (s.checked) {
// 		alert("Marcado");
// 	} else {
// 		alert("Desmarcado");
// 	}
// })




function activarGuardar(){
 if( document.getElementById("boton_guardar_variable").disabled = false){
 }else{
  document.getElementById("boton-crear-encuesta").disabled = true;
 }

}
// -----------------------------------------------------------------

function limpiarFormulario() {
  document.getElementById("formulario").reset();

}

function limpiarFormulario2() {
  document.getElementById("formularioRC").reset();

}

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
//---------------------------------------------------------------------
