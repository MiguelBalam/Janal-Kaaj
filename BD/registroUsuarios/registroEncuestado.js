document.addEventListener('DOMContentLoaded', function () {
  var formEncuestado = document.getElementById('Encuestado');

  formEncuestado.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var correo = document.getElementById('Email-encuestado').value.trim();
    var contrasenia = document.getElementById('contra-encuestado').value.trim();
    var contrasenia2 = document.getElementById('contra-encuestado2').value.trim();
    var nombre = document.getElementById('nombrecompletos').value.trim();
    var apellidoPaterno = document.getElementById('apellidopaterno').value.trim();
    var apellidoMaterno = document.getElementById('apellidomaterno').value.trim();
    var generoSeleccionado = '';
    var genero1 = document.getElementById('inlineRadio1');
    var genero2 = document.getElementById('inlineRadio2');
    var edad = document.getElementById('edad').value.trim();
    var telefono = document.getElementById('tel-encuestado').value.trim();
    var procedencia = document.getElementById('ciudad').value.trim();
    var localidad = document.getElementById('localidad').value.trim(); // Agregado
    var estado = document.getElementById('estado').value.trim(); // Agregado
    var municipio = document.getElementById('municipio').value.trim(); // Agregado

    
    if (genero1.checked) {
      generoSeleccionado = "Masculino";
    } else if (genero2.checked) {
      generoSeleccionado = "Femenino";
    }
    

    var formData = new FormData();
    formData.append('Email-encuestado', correo);
    formData.append('contra-encuestado', contrasenia);
    formData.append('contra-encuestado2', contrasenia2);
    formData.append('nombrecompletos', nombre);
    formData.append('apellidopaterno', apellidoPaterno);
    formData.append('apellidomaterno', apellidoMaterno);
    formData.append('genero', generoSeleccionado);
    formData.append('edad', edad);
    formData.append('tel-encuestado', telefono);
    formData.append('ciudad', procedencia);
    formData.append('localidad', localidad); // Agregado
    formData.append('estado', estado); // Agregado
    formData.append('municipio', municipio); // Agregado

    // Envía los datos mediante AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/BD/guardarEncuestado.php', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        // Handle success, e.g., redirect to another page
      }
    };
    xhr.send(formData);
  });
});
