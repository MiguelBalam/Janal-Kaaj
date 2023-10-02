
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

  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
}
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

document.formAplicador.addEventListener('submit', (ev) => {
  ev.preventDefault();

  // Obtener los valores del formulario
  var correo = document.getElementById('Correo').value.trim();
  var Contrasenia = document.getElementById('Contrasenia').value.trim();
  var Nombre = document.getElementById('nombrecompletos').value.trim();
  var ApellidoP = document.getElementById('apellidopaterno').value.trim();
  var ApellidoM = document.getElementById('apellidomaterno').value.trim();

  // Crear objeto FormData y agregar datos
  var formData = new FormData();
  formData.append('correo', correo);
    formData.append('Contrasenia', Contrasenia);
       formData.append('nombrecompletos', Nombre);
       formData.append('apellidopaterno', ApellidoP);
       formData.append('apellidomaterno', ApellidoM);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
}
  // Enviar datos mediante AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/BD/guardarApli.php', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
          window.location.href = "/pestanas_Encuestado/Aplicador.html";
      }
  };
  xhr.send(formData);
})


// function aplicador(){
//     // Obtener los valores del formulario
//     var correo = document.getElementById('Email-encuestado').value.trim();
//     var Contrasenia = document.getElementById('Contrasenia').value.trim();
//     var Nombre = document.getElementById('nombrecompleto').value.trim();
//     var ApellidoP = document.getElementById('apellidopaterno').value.trim();
//     var ApellidoM = document.getElementById('apellidomaterno').value.trim();

  
//     // Crear objeto FormData y agregar datos
//     var formData = new FormData();
//     formData.append('Email-encuestado', correo);
//     formData.append('Contrasenia', Contrasenia);
//     formData.append('nombrecompleto', Nombre);
//     formData.append('apellidopaterno', ApellidoP);
//     formData.append('apellidomaterno', ApellidoM);
   
//     for (var pair of formData.entries()) {
//       console.log(pair[0] + ', ' + pair[1]);
//   }
  
//     // Enviar datos mediante AJAX
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/BD/guardarApli.php', true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log(xhr.responseText);
//             //window.location.href = "/pestanas_Encuestado/Aplicador.html";
//         }
//     };
//     xhr.send(formData);
// }


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
//                   window.location.href = '/pestanas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
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

// function controlPHP() {
//     var correo = document.getElementById('Usuario').value;
//     var contraseniaL = document.getElementById('contraseniaL').value;

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/BD/login.php', true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 var response = JSON.parse(xhr.responseText);
                
//                 if (response.success) {
//                     localStorage.setItem('user_id', response.id);
//                     localStorage.setItem('user_correo', correo);
//                     window.location.href = '/pestanas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
//                 } else {
//                     alert(response.error); // Mostrar una alerta si el inicio de sesión falla
//                 }
//             } else {
//                 console.error('Error en la solicitud AJAX.');
//             }
//         }
//     };
    
//     var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contraseniaL);
//     xhr.send(data);
// }

// function controlLogin(event) {
//   event.preventDefault(); // Prevenir el envío del formulario por defecto

//   var correo = document.getElementById('Usuario').value;
//   var contraseniaL = document.getElementById('contraseniaL').value;

//   // Verificar si los datos de inicio de sesión existen en IndexedDB
//   buscarDatosEnIndexedDB(correo, contraseniaL, function (encontrado) {
//     if (encontrado) {
//       window.location.href = '/pestanas_Encuestador/dashboard.html'; // Redirigir al usuario si los datos se encuentran en IndexedDB
//       console.log('no se porque no jala')
//     } else {
//       // Los datos de inicio de sesión no están en IndexedDB, realizar solicitud al servidor
//       realizarSolicitudAlServidor(correo, contraseniaL);
     
//     }
//   });
//   return false; // Evita el envío del formulario
// }
// login.js


function controlLogin(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto
 console.log("controlLogin se llamó correctamente.");
  var correo = document.getElementById('correo').value;
  var contraseniaL = document.getElementById('contraseniaL').value;
  var tipoUsuario = document.getElementById("tipo_usuario").value;
  verificarConexionYRecuperarToken()
  if (navigator.onLine) {
    // La aplicación está en línea, realiza una solicitud al servidor
    realizarSolicitudAlServidor(correo, contraseniaL,tipoUsuario);
  } else {
  
    // La aplicación está fuera de línea
    if (typeof indexedDB === 'undefined') {
      // IndexedDB no está disponible en este navegador, maneja el error
      console.error('IndexedDB no está disponible en este navegador');
      // Puedes mostrar un mensaje de error al usuario aquí
    } else{
       buscarDatosEnIndexedDB(correo, contraseniaL, function (tokenAlmacenado) {
      if (tokenAlmacenado) {
        console.log('Token almacenado en IndexedDB:', tokenAlmacenado);
        contraseniaL.value = tokenAlmacenado; // Establecer el token almacenado en el campo de contraseña
        console.log('Contraseña establecida automáticamente desde IndexedDB');
      } else {
        console.log('Token no encontrado en IndexedDB');
        // Puedes mostrar un mensaje al usuario indicando que no se encontraron datos en IndexedDB
      }
      });
    }
  }
  return false; // Evita el envío del formulario
}
// Importa la biblioteca bcryptjs
 // Si la estás utilizando con ES6
// O puedes incluirla con un CDN en tu HTML

function buscarDatosEnIndexedDB(correo, contrasenia, callback) {
  let request = indexedDB.open('miBaseDeDatos');

  request.onerror = function (event) {
    console.error('Error al abrir la base de datos:', event.target.error);
    callback(false);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    transaction = db.transaction('miAlmacen', 'readonly');
    store = transaction.objectStore('miAlmacen');

    // Buscar los datos de inicio de sesión en IndexedDB
    var getRequest = store.get(correo);
    console.log('Correo:', correo);
   
    getRequest.onsuccess = function (event) {
      storedData = event.target.result;
      //var contra = document.getElementById('aqui');
    
console.log(storedData)
      if (storedData) {
        // Recupera el token almacenado en IndexedDB
        var tipoUsuario = storedData.tipoUsuario;
        var tokenAlmacenado = storedData.token;
        var correo= storedData.correo;
        console.log('Token almacenado:', tokenAlmacenado);
        console.log('Tipo de usuario:', tipoUsuario);
        console.log('Tipo de usuario:', correo);
        // Compara el token introducido por el usuario con el almacenado
        if (contrasenia === tokenAlmacenado) {
          // Token correcto
          console.log('Token correcto');
          redirigirAlDashboard(tipoUsuario,correo);
       
          callback(true);
        } else {
          // Token incorrecto
          console.log('Token incorrecto');
          callback(false);
        }
      } else {
        // Los datos de inicio de sesión no se encontraron en IndexedDB
        console.log('Datos de inicio de sesión no encontrados en IndexedDB');
        callback(false);
      }
    };

    getRequest.onerror = function (event) {
      console.error('Error al buscar datos en IndexedDB:', event.target.error);
      callback(false);
     
    };
  
    db.close();
  }
}

function redirigirAlDashboard(tipoUsuario) {
  if (tipoUsuario === 'encuestador') {
    window.location.href = '/pestanas_Encuestador/dashboard.html';
    
  } else if (tipoUsuario === 'aplicador') {
    window.location.href = '/pestanas_Encuestado/dashAplicador.html'; // Redirigir al dashboard de otro tipo de usuario
  } else {
    console.log('Tipo de usuario desconocido');
    // Puedes manejar el caso de tipo de usuario desconocido aquí
  }
}
  
// function realizarSolicitudAlServidor(correo, contrasenia) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/BD/login.php', true);
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         try {
//           var response = JSON.parse(xhr.responseText);
//           if (response.success) {
//             localStorage.setItem('user_id', response.id);
//             localStorage.setItem('user_correo', correo);
//             window.location.href = '/pestanas_Encuestador/dashboard.html'; // Redirigir al usuario si el inicio de sesión tiene éxito
//           } else {
//             alert(response.error); // Mostrar una alerta si el inicio de sesión falla
//           }
//         } catch (error) {
//           console.error('Error al analizar la respuesta JSON:', error);
//         }
//       } else {
//         console.error('Error en la solicitud AJAX. Código de estado:', xhr.status);
//       }
//     }
//   };

//   var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contrasenia);
//   xhr.send(data);
// }

// function realizarSolicitudAlServidor(correo, contrasenia) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/BD/login.php', true);
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         var response = JSON.parse(xhr.responseText);

//         if (response.success) {
//           almacenarTokenEnIndexedDB(correo, response.token);
//           localStorage.setItem('user_id', response.id);
//           localStorage.setItem('user_correo', correo);
          
        
        
//         } else {
//           alert(response.error); // Mostrar una alerta si el inicio de sesión falla
//         }
//       } else {
//         console.error('Error en la solicitud AJAX.');
//       }
//     }
//   };

//   var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contrasenia);
//   xhr.send(data);
// }

function realizarSolicitudAlServidor(correo, contrasenia,tipoUsuario) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/BD/login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          almacenarTokenEnIndexedDB(correo, response.token, response.tipoUsuario);
   
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_correo', correo);
          localStorage.setItem('tipoUsuario', response.tipoUsuario);
        
        } else {
          alert(response.error); // Mostrar una alerta si el inicio de sesión falla
        }
        
      } else {
        console.error('Error en la solicitud AJAX.', xhr.status, xhr.statusText);
      }
    }
    console.log("Correo: " + correo);
    console.log("Contraseña: " + contrasenia);
    console.log("Tipo de Usuario: " + tipoUsuario);
    
  };

  var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contrasenia) + '&tipo_usuario=' + encodeURIComponent(tipoUsuario);
  xhr.send(data);
}


function almacenarTokenEnIndexedDB(correo, token, tipoUsuario) {
  // Nombre de la base de datos y versión
  const dbName = 'miBaseDeDatos';
  const dbVersion = 2;
  var userId = localStorage.getItem('user_id');
  // Abre una conexión con la base de datos o crea una nueva si no existe
  const request = indexedDB.open(dbName, dbVersion);

  // Manejadores de eventos para la apertura de la base de datos
  request.onerror = (event) => {
    console.error('Error al abrir la base de datos:', event.target.error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('miAlmacen')) {
      db.createObjectStore('miAlmacen', { keyPath: 'correo' });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Inicia una transacción de lectura/escritura en el almacén de objetos
    const transaction = db.transaction('miAlmacen', 'readwrite');
    const store = transaction.objectStore('miAlmacen');

    // Almacena el token junto con el correo del usuario
    store.put({ correo: correo, token: token, tipoUsuario:tipoUsuario });

    // Cierra la transacción y la conexión a la base de datos
    transaction.oncomplete = () => {
      console.log('Token almacenado en IndexedDB correctamente');
      if (tipoUsuario === "encuestador") {
        window.location.href = '/pestanas_Encuestador/dashboard.html';
    
      } else if (tipoUsuario === "aplicador") {
        window.location.href = '/pestanas_Encuestado/dashAplicador.html';
      } else if (tipoUsuario === "encuestado") {
        window.location.href = '/pestanas_Encuestado/perfil.php?userId=' + userId; 
      }else {
        console.error('Tipo de usuario no reconocido:', tipoUsuario);
        // Puedes redirigir a una página de error o a una página predeterminada en caso de tipo de usuario desconocido.
      }
    }

    transaction.onerror = (event) => {
      console.error('Error al almacenar el token en IndexedDB:', event.target.error);
    };

    db.close();
  };
}


function verificarConexionYRecuperarToken() {
  if (!navigator.onLine) {
    // La aplicación no tiene conexión a internet, obtén el correo del LocalStorage
    var correo = localStorage.getItem('user_correo');

    if (correo) {
      // Si se encontró el correo en el LocalStorage, usa el correo como clave primaria para obtener el token de IndexedDB
      var request = indexedDB.open('miBaseDeDatos', 2);

      request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction('miAlmacen', 'readonly');
        var objectStore = transaction.objectStore('miAlmacen');

        var getRequest = objectStore.get(correo); // Usa el correo como clave primaria
        console.log(getRequest);
        getRequest.onsuccess = function(event) {
          var tokenData = event.target.result;
          console.log(tokenData);
          if (tokenData) {
            // Si se encontró el token en IndexedDB, colócalo en el campo de contraseña
            var contraseniaL = document.getElementById('contraseniaL');
            contraseniaL.value = tokenData.token;
          }
        };
      };
    } else {
      console.log('Correo no encontrado en el LocalStorage');
    }
  }
}

// Llama a la función para verificar la conexión y recuperar el token


// Llama a la función para verificar la conexión y recuperar el token



function mostrarEncuestasAsignadas(correo) {
  // Realizar una nueva solicitud AJAX para obtener las encuestas asignadas al aplicador
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/BD/sinInternet/mostrarEncuestasAp.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Manipula la respuesta del servidor para mostrar las encuestas asignadas
        var data = xhr.responseText;
        document.getElementById('tabla_Aplicador').innerHTML = data;
      } else {
        console.error('Error en la solicitud AJAX para mostrar encuestas asignadas.', xhr.status, xhr.statusText);
      }
    }
  };

  // Enviar el correo electrónico del aplicador al servidor para obtener las encuestas asignadas
  var data = 'correo=' + encodeURIComponent(correo);
  xhr.send(data);
}
  // function realizarSolicitudAlServidor(correo, contrasenia) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/BD/login.php', true);
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         var response = JSON.parse(xhr.responseText);
  
  //         if (response.success) {
  //           localStorage.setItem('user_id', response.id);
  //           localStorage.setItem('user_correo', correo);
  //           window.location.href = '/pestanas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
  //         } else {
  //           alert(response.error); // Mostrar una alerta si el inicio de sesión falla
  //         }
  //       } else {
  //         console.error('Error en la solicitud AJAX.');
  //       }
  //     }
  //   };
  
  //   var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contrasenia);
  //   xhr.send(data);
  // }
  // Obtener el ID del usuario almacenado en localStorage


  