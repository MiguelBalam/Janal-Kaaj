document.addEventListener('DOMContentLoaded', function () {
  var adminForm = document.getElementById('AdminForm');

  adminForm.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var nombre = document.getElementById('nombrecompletos').value.trim();
    var apellidoPaterno = document.getElementById('apellidopaterno').value.trim();
    var apellidoMaterno = document.getElementById('apellidomaterno').value.trim();
    var generoSeleccionado = '';
    var genero1 = document.getElementById('inlineRadio1');
    var genero2 = document.getElementById('inlineRadio2');
    var edad = document.getElementById('edad').value.trim();
    var procedencia = document.getElementById('procedencia').value.trim();
    var correo = document.getElementById('Correo').value.trim();
    var telefono = document.getElementById('tel').value.trim();
    var contrasenia = document.getElementById('Contrasenia').value.trim();
    var contrasenia2 = document.getElementById('Contrasenia2').value.trim();

    if (genero1.checked) {
      generoSeleccionado = "Masculino";
    } else if (genero2.checked) {
      generoSeleccionado = "Femenino";
    }

    var formData = new FormData();
    formData.append('nombrecompletos', nombre);
    formData.append('apellidopaterno', apellidoPaterno);
    formData.append('apellidomaterno', apellidoMaterno);
    formData.append('genero', generoSeleccionado);
    formData.append('edad', edad);
    formData.append('procedencia', procedencia);
    formData.append('Correo', correo);
    formData.append('tel', telefono);
    formData.append('Contrasenia', contrasenia);
    formData.append('Contrasenia2', contrasenia2);

    // Envía los datos mediante AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'guardarAdmin.php', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        // Handle success, e.g., redirect to another page
      }
    };
    xhr.send(formData);
  });
});
