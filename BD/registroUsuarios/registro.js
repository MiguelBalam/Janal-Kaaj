


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
//                     window.location.href = '/pestañas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
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
//       window.location.href = '/pestañas_Encuestador/dashboard.html'; // Redirigir al usuario si los datos se encuentran en IndexedDB
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
 
  var correo = document.getElementById('Usuario').value;
  var contraseniaL = document.getElementById('contraseniaL').value;

  if (navigator.onLine) {
    // La aplicación está en línea, realiza una solicitud al servidor
    realizarSolicitudAlServidor(correo, contraseniaL);
  } else {
    // La aplicación está fuera de línea
    if (typeof indexedDB === 'undefined') {
      // IndexedDB no está disponible en este navegador, maneja el error
      console.error('IndexedDB no está disponible en este navegador');
      // Puedes mostrar un mensaje de error al usuario aquí
    } else {
      // IndexedDB está disponible, intenta buscar datos en IndexedDB
      buscarDatosEnIndexedDB(correo, contraseniaL, function (encontrado) {
        if (encontrado) {
              
          window.location.href = '/pestañas_Encuestador/dashboard.html'; // Redirigir al usuario si los datos se encuentran en IndexedDB
        } else {
          console.log('autenticación falló');
          // Puedes mostrar un mensaje al usuario indicando que la autenticación falló
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

      if (storedData) {
        // Recupera el token almacenado en IndexedDB
        var tokenAlmacenado = storedData.token;
        console.log('Token almacenado:', tokenAlmacenado);

        // Compara el token introducido por el usuario con el almacenado
        if (contrasenia === tokenAlmacenado) {
          // Token correcto
          console.log('Token correcto');
          // ... Resto del código
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
//             window.location.href = '/pestañas_Encuestador/dashboard.html'; // Redirigir al usuario si el inicio de sesión tiene éxito
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

function realizarSolicitudAlServidor(correo, contrasenia) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/BD/login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);

        if (response.success) {
          almacenarTokenEnIndexedDB(correo, response.token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_correo', correo);

          // Verificar si los datos ya se almacenaron en IndexedDB
        
        } else {
          alert(response.error); // Mostrar una alerta si el inicio de sesión falla
        }
      } else {
        console.error('Error en la solicitud AJAX.');
      }
    }
  };

  var data = 'correo=' + encodeURIComponent(correo) + '&contraseniaL=' + encodeURIComponent(contrasenia);
  xhr.send(data);
}


function almacenarTokenEnIndexedDB(correo, token) {
  // Nombre de la base de datos y versión
  const dbName = 'miBaseDeDatos';
  const dbVersion = 2;

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
    store.put({ correo: correo, token: token });

    // Cierra la transacción y la conexión a la base de datos
    transaction.oncomplete = () => {
      console.log('Token almacenado en IndexedDB correctamente');
      window.location.href = '/pestañas_Encuestador/dashboard.html'; 
      
    };

    transaction.onerror = (event) => {
      console.error('Error al almacenar el token en IndexedDB:', event.target.error);
    };

    db.close();
  };
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
  //           window.location.href = '/pestañas_Encuestador/dashboard.html'; // Página después del inicio de sesión exitoso
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
  
  