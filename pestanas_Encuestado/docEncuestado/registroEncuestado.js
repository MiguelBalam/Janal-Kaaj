document.Encuestado.addEventListener('submit', (ev) => {
    ev.preventDefault();
  
    // Obtener los valores del formulario

    var Nombre = document.getElementById('nombrecompletos').value.trim();
    var ApellidoP = document.getElementById('apellidopaterno').value.trim();
    var ApellidoM = document.getElementById('apellidomaterno').value.trim();
    var generoSeleccionado = '';
    var genero1 = document.getElementById('inlineRadio1');
    var genero2 = document.getElementById('inlineRadio2');
    var Edad = document.getElementById('edad').value.trim();
    var Telefono = document.getElementById('tel').value.trim();
    var Localidad = document.getElementById('localidad').value.trim();
    var Pais = document.getElementById('ciudad').value.trim();
    var Municipio = document.getElementById('municipio').value.trim();
    var Estado = document.getElementById('estado').value.trim();
    var correo = document.getElementById('Email-encuestado').value.trim();
    var Contrasenia = document.getElementById('contra-encuestado').value.trim();
    var Contrasenia2 = document.getElementById('contra-encuestado2').value.trim();
    if (genero1.checked) {
        generoSeleccionado = genero1.value;
    } else if (genero2.checked) {
        generoSeleccionado = genero2.value;
    }
  
    // Crear objeto FormData y agregar datos
    var formData = new FormData();
    formData.append('Email-encuestado', correo);
    formData.append('contra-encuestado', Contrasenia);
    formData.append('contra-encuestado2', Contrasenia2);
    formData.append('nombrecompletos', Nombre);
    formData.append('apellidopaterno', ApellidoP);
    formData.append('apellidomaterno', ApellidoM);
    formData.append('genero', generoSeleccionado);
    formData.append('edad', Edad);
    formData.append('tel', Telefono);
    formData.append('localidad', Localidad);
    formData.append('ciudad', Pais);
    formData.append('municipio',Municipio);
    formData.append('ciudad', Pais);
  
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }
    // Enviar datos mediante AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/BD/guardar.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            //window.location.href = "/login.html";
        }
    };
    xhr.send(formData);
  })
  