document.formEncuestado.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // Obtener los valores del formulario
  var correo = document.getElementById('Correo').value.trim();
  var Contrasenia = document.getElementById('Contrasenia').value.trim();
  var Contrasenia2 = document.getElementById('Contrasenia2').value.trim();
  var Nombre = document.getElementById('nombrecompletos').value.trim();
  var ApellidoP = document.getElementById('apellidopaterno').value.trim();
  var ApellidoM = document.getElementById('apellidomaterno').value.trim();
  var generoSeleccionado = '';
  var genero1 = document.getElementById('inlineRadio1');
  var genero2 = document.getElementById('inlineRadio2');
  var Edad = document.getElementById('edad').value.trim();
  var Telefono = document.getElementById('tel').value.trim();
  var Procedencia = document.getElementById('procedencia').value.trim();
  var imagen = document.getElementById('imagen').files[0];

  if (genero1.checked) {
      generoSeleccionado = genero1.value;
  } else if (genero2.checked) {
      generoSeleccionado = genero2.value;
  }

  // Crear objeto FormData y agregar datos
  var formData = new FormData();
  formData.append('correo', correo);
  formData.append('Contrasenia', Contrasenia);
  formData.append('Contrasenia2', Contrasenia2);
  formData.append('nombrecompletos', Nombre);
  formData.append('apellidopaterno', ApellidoP);
  formData.append('apellidomaterno', ApellidoM);
  formData.append('genero', generoSeleccionado);
  formData.append('edad', Edad);
  formData.append('tel', Telefono);
  formData.append('procedencia', Procedencia);
  formData.append('imagen', imagen);

  // Enviar datos mediante AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/BD/guardar.php', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
          window.location.href = "/login.html";
      }
  };
  xhr.send(formData);
})

// function controlPHP() {
//   var correo = document.getElementById('Usuario').value;
//   var contraseniaL = document.getElementById('contraseniaL').value;

//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/BD/login.php', true);
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//               var response = JSON.parse(xhr.responseText);
             
//               if (response.success) {
//                 localStorage.setItem('user_id', response.id);
//                // localStorage.setItem('correo', correo);
//                   window.location.href = '/pestañas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
//               } 
              
              
//               else {
//                   alert(response.error); // Mostrar una alerta si el inicio de sesión falla
//               }
//           } else {
//               console.error('Error en la solicitud AJAX.');
//           }
//       }
//   };
  
//   var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contraseniaL);
//   xhr.send(data);
// }

function controlPHP() {
    var correo = document.getElementById('Usuario').value;
    var contraseniaL = document.getElementById('contraseniaL').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/BD/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                
                if (response.success) {
                    localStorage.setItem('user_id', response.id);
                    localStorage.setItem('user_correo', correo);
                    window.location.href = '/pestañas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
                } else {
                    alert(response.error); // Mostrar una alerta si el inicio de sesión falla
                }
            } else {
                console.error('Error en la solicitud AJAX.');
            }
        }
    };
    
    var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contraseniaL);
    xhr.send(data);
}


  