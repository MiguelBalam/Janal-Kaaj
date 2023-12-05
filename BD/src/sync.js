
if (navigator.onLine) {
  const esPrimeraCarga = localStorage.getItem('primeraCarga') === null;

  if (esPrimeraCarga) {
    // Si es la primera carga, ejecuta obtenerDatosDesdeAPI()
    obtenerDatosDesdeAPI();
    
    // Establece la bandera para indicar que ya no es la primera carga
    localStorage.setItem('primeraCarga', 'false');
  } else {
  //  Si no es la primera carga, ejecuta ejecutarCiclo()
    ejecutarCiclo();
 }
} else {
  // La aplicación está fuera de línea, muestra un mensaje o realiza otras acciones apropiadas
 // mostrarDatosDesdeIndexedDB()
  //mostrarEncuestas();
  //mostrarEncuestasApli();
 // mostrarEncuestasApli(correo)
  // mostrarMensajeOffline();
  // mostrarDatosDesdeIndexedDB();
}

// Agregar un listener para el evento 'online'
window.addEventListener('online', () => {
  // La aplicación ha vuelto en línea, realiza una solicitud a la API para obtener datos
 sincronizarActualizaciones()
 sincronizarActualizacionesVariables()

});

// Agregar un listener para el evento 'offline'
window.addEventListener('offline', () => {
  mostrarMensajeOffline();

});

  // function obtenerDatosDesdeAPI() {
  //   // Realiza una solicitud a la API para obtener los datos más recientes
  //   fetch('/BD/src/sincronizar.php')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Error al recuperar los datos: ${response.status}`);
  //       }
  //       return response.json();
  //     })
     
  //     .then((data) => {
  //       // Almacena los datos en IndexedDB
  //       if (!localStorage.getItem('datosAlmacenados')) {
  //         almacenarDatosEnIndexedDB(data);
        
  //         // Actualiza la variable para indicar que los datos ya se han almacenado
  //         localStorage.setItem('datosAlmacenados', 'true');
  //        // localStorage.setItem('ultimaActualizacion', Date.now());
  //       }
  //       //almacenarDatosEnIndexedDB(data);
       
       
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  //   }


  function obtenerDatosDesdeAPI() {
    // Agregar cabecera Cache-Control para evitar el almacenamiento en caché
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store');
  
    // Realiza una solicitud a la API para obtener los datos más recientes
    fetch('/BD/src/sincronizar.php', { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al recuperar los datos: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Almacena los datos en IndexedDB
        almacenarDatosEnIndexedDB(data);
  
        // Actualiza la variable para indicar que los datos ya se han almacenado
        localStorage.setItem('datosAlmacenados', 'true');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

    function almacenarDatosEnIndexedDB(data) {
      // Nombre de la base de datos y versión
      const dbName = 'miBaseDeDatos';
      //const dbVersion = 1;
      const tables = ['reactivos', 'encuestas', 'encuestado_respuesta', 'respuestas_encuesta','encuesta_FinalReactivos',
      'reactivosCreados','tiposRespuesta','asignaciones','opciones_respuesta','Variable','Encuesta_Variables','VariableEncabezado','encuestasVariables','encuesta_FinalVariables'];
      // Abre una conexión con la base de datos o crea una nueva si no existe
      const request = indexedDB.open(dbName);
      let store;
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
      };
      
   
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        ObjectStore = db.createObjectStore("cola", {keyPath:'id',autoIncrement: true });
        ObjectStore = db.createObjectStore("cola-Encuestado-Var", {keyPath:'id',autoIncrement: true });
        ObjectStore = db.createObjectStore("RespuestasCola", {keyPath:'id',autoIncrement: true });
        ObjectStore = db.createObjectStore("VariablesCola", {keyPath:'id',autoIncrement: true });
        tables.forEach((table) => {
          let keyPath;
          let index

          // Asigna el campo clave apropiado según la tabla
          switch (table) {
            case 'reactivos':
              keyPath;
              index = 'id_encuesta';
              break;
            case 'encuestas':
            
              index = 'id_usuario';
              break;
            case 'encuestado_respuesta':
              keyPath;
              break;
            case 'respuestas_encuesta':
              keyPath;
              break;
                  case 'encuesta_FinalReactivos':
              keyPath;
              index = 'id_encuesta';
              break;
              case 'reactivosCreados':
              keyPath;
              index = 'id_tipoRespuesta';
              break;
              case 'tiposRespuesta':
                keyPath='id_tipoRespuesta';
                break;
                case 'asignaciones':
                  keyPath;
                  index = 'aplicador';
                  break;
                  case 'opciones_respuesta':
                    keyPath;
                    index = 'id_reactivoC';
                    break;
                    case 'Variable':
                      keyPath ='id_variable';
                      index = 'id_variable';
                      break;
                      case 'Encuesta_Variables':
                        keyPath ='id_Variables';
                        index = 'id_encuesta';
                        break;
                        case 'VariableEncabezado':
                          keyPath;
                          break;
                          case 'encuestasVariables':
                            keyPath;
                            index = 'id_usuario';
                            break;
                            case 'encuesta_FinalVariables':
                            index = 'id_encuesta';
                            break;
            // Puedes agregar más casos para otras tablas si es necesario
          }
          if (!db.objectStoreNames.contains(table)) {
            store =  db.createObjectStore(table, { keyPath, autoIncrement: true}); // Asegúrate de especificar el campo clave correcto
            if (index) {
              // Si se definió un índice, agrégalo al almacén de objetos
              store.createIndex(index, index, { unique: false });
            }
          }
        });
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        let transaction; // Declarar la variable transaction dentro de este manejador
    
        // Iterar sobre los datos y almacenarlos en los almacenes de objetos correspondientes
        data.forEach((item) => {
          const tableName = item.table; // Asegurarse de que los datos tengan una propiedad 'table'
          if (tables.includes(tableName)) {
            transaction = db.transaction(tableName, 'readwrite');
            const store = transaction.objectStore(tableName);
            store.put(item);
          }
        });
    
        // Manejadores de eventos para la transacción
        transaction.oncomplete = () => {
          console.log('Datos almacenados en IndexedDB correctamente');
          localStorage.setItem('datosAlmacenados', 'true');
          setTimeout(() => {
            //alert('Los datos se han cargado correctamente en IndexedDB.');
            cargarIndex()
          }, 10000); // 10000 milisegundos = 10 segundos
          db.close();
        };
    
        transaction.onerror = (event) => {
          console.error('Error al almacenar datos en IndexedDB:', event.target.error);
          db.close();
        };
      };
    }
    
  function mostrarMensajeOffline() {
    // Implementa la lógica para mostrar un mensaje al usuario
    // cuando la aplicación esté fuera de línea
    console.log('no se puede hacer nada')
    verificarConexionYRecuperarToken()
  }
  

 

  function sincronizarActualizaciones() {
    // Verifica si la aplicación está en línea
    if (navigator.onLine) {
      // Abre la cola de actualizaciones en IndexedDB
      const dbName = 'miBaseDeDatos';
      const objectStoreNameRespuestas = 'RespuestasCola';
      const objectStoreNameEncuestado = 'cola';
  
      const request = indexedDB.open(dbName);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([objectStoreNameRespuestas, objectStoreNameEncuestado], 'readonly');
        
        // Obtiene todas las actualizaciones pendientes de RespuestasCola
        const getRequestRespuestas = transaction.objectStore(objectStoreNameRespuestas).getAll();
  
        getRequestRespuestas.onsuccess = (event) => {
          const updatesRespuestas = event.target.result;
  
          // Obtiene todas las actualizaciones pendientes de EncuestadoCola
          const getRequestEncuestado = transaction.objectStore(objectStoreNameEncuestado).getAll();
  
          getRequestEncuestado.onsuccess = (event) => {
            const updatesEncuestado = event.target.result;
  
            // Combina las actualizaciones en un solo objeto JSON
            const combinedUpdates = {
              Respuestas: updatesRespuestas,
              Encuestado: updatesEncuestado,
            };
            console.log(combinedUpdates);
            console.log('Datos a enviar:', JSON.stringify(combinedUpdates, null, 2));
            // Envía las actualizaciones pendientes a la API de PHP para aplicarlas en MySQL
            fetch('/BD/src/actualizar.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(combinedUpdates),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error al enviar actualizaciones: ${response.status}`);
                }
                return response.json();
              })
              .then(() => {
                // Elimina las actualizaciones de la cola después de aplicarlas con éxito
                const deleteTransaction = db.transaction([objectStoreNameRespuestas, objectStoreNameEncuestado], 'readwrite');
                
                // Elimina las actualizaciones de RespuestasCola
                updatesRespuestas.forEach((update) => {
                  deleteTransaction.objectStore(objectStoreNameRespuestas).delete(update.id);
                });
  
                // Elimina las actualizaciones de EncuestadoCola
                updatesEncuestado.forEach((update) => {
                  deleteTransaction.objectStore(objectStoreNameEncuestado).delete(update.id);
                });
  
                deleteTransaction.oncomplete = () => {
                  console.log('Actualizaciones aplicadas con éxito en MySQL.');
                  setTimeout(() => {
                    //alert('Los datos se han cargado correctamente en IndexedDB.');
                    cargarIndex()
                  }, 10000);
                  db.close();
                };
              })
              .catch((error) => {
                console.error('Error al sincronizar actualizaciones con MySQL:', error);
                db.close();
              });
          };
  
          getRequestEncuestado.onerror = (event) => {
            console.error('Error al obtener actualizaciones pendientes de EncuestadoCola:', event.target.error);
            db.close();
          };
        };
  
        getRequestRespuestas.onerror = (event) => {
          console.error('Error al obtener actualizaciones pendientes de RespuestasCola:', event.target.error);
          db.close();
        };
      };
  
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
      };
    }
  }



  function sincronizarActualizacionesVariables() {
    // Verifica si la aplicación está en línea
    if (navigator.onLine) {
      // Abre la cola de actualizaciones en IndexedDB
      const dbName = 'miBaseDeDatos';
      const objectStoreNameRespuestas = 'VariablesCola';
      const objectStoreNameEncuestado = 'cola-Encuestado-Var';
  
      const request = indexedDB.open(dbName);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction([objectStoreNameRespuestas, objectStoreNameEncuestado], 'readonly');
        
        // Obtiene todas las actualizaciones pendientes de RespuestasCola
        const getRequestRespuestas = transaction.objectStore(objectStoreNameRespuestas).getAll();
  
        getRequestRespuestas.onsuccess = (event) => {
          const updatesRespuestas = event.target.result;
  
          // Obtiene todas las actualizaciones pendientes de EncuestadoCola
          const getRequestEncuestado = transaction.objectStore(objectStoreNameEncuestado).getAll();
  
          getRequestEncuestado.onsuccess = (event) => {
            const updatesEncuestado = event.target.result;
  
            // Combina las actualizaciones en un solo objeto JSON
            const combinedUpdates = {
              Respuestas: updatesRespuestas,
              Encuestado: updatesEncuestado,
            };
            console.log(combinedUpdates);
            console.log('Datos a enviar:', JSON.stringify(combinedUpdates, null, 2));
            // Envía las actualizaciones pendientes a la API de PHP para aplicarlas en MySQL
            fetch('/BD/src/actualizarVar.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(combinedUpdates),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error al enviar actualizaciones: ${response.status}`);
                }
                return response.json();
              })
              .then(() => {
                // Elimina las actualizaciones de la cola después de aplicarlas con éxito
                const deleteTransaction = db.transaction([objectStoreNameRespuestas, objectStoreNameEncuestado], 'readwrite');
                
                // Elimina las actualizaciones de RespuestasCola
                updatesRespuestas.forEach((update) => {
                  deleteTransaction.objectStore(objectStoreNameRespuestas).delete(update.id);
                });
  
                // Elimina las actualizaciones de EncuestadoCola
                updatesEncuestado.forEach((update) => {
                  deleteTransaction.objectStore(objectStoreNameEncuestado).delete(update.id);
                });
  
                deleteTransaction.oncomplete = () => {
                  console.log('Actualizaciones aplicadas con éxito en MySQL.');
                  setTimeout(() => {
                    //alert('Los datos se han cargado correctamente en IndexedDB.');
                    cargarIndex()
                  }, 10000);
                  db.close();
                };
              })
              .catch((error) => {
                console.error('Error al sincronizar actualizaciones con MySQL:', error);
                db.close();
              });
          };
  
          getRequestEncuestado.onerror = (event) => {
            console.error('Error al obtener actualizaciones pendientes de EncuestadoCola:', event.target.error);
            db.close();
          };
        };
  
        getRequestRespuestas.onerror = (event) => {
          console.error('Error al obtener actualizaciones pendientes de RespuestasCola:', event.target.error);
          db.close();
        };
      };
  
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
      };
    }
  }
  
  // function borrarDatosEnIndexedDB() {
  //   const dbName = 'miBaseDeDatos';
  //  // const dbVersion = 1;
  //   const tables = ['reactivos', 'encuestas', 'encuestado_respuesta', 'respuestas_encuesta','encuesta_FinalReactivos',
  //   'reactivosCreados','tiposRespuesta','asignaciones','opciones_respuesta','Variable','Encuesta_Variables','VariableEncabezado','encuestasVariables','encuesta_FinalVariables'];
  //   // Abre una conexión con la base de datos o crea una nueva si no existe
  //   const request = indexedDB.open(dbName);
  
  //   request.onerror = (event) => {
  //     console.error('Error al abrir la base de datos:', event.target.error);
  //   };
  
  //   request.onsuccess = (event) => {
  //     const db = event.target.result;
  //     const transaction = db.transaction(tables, 'readwrite');
  
  //     tables.forEach((table) => {
  //       const store = transaction.objectStore(table);
  //       const deleteRequest = store.clear(); // Borra todos los datos de la tabla
  //       deleteRequest.onsuccess = () => {
  //         console.log(`Datos en la tabla ${table} eliminados correctamente`);
  //       };
  //       deleteRequest.onerror = (event) => {
  //         console.error(`Error al eliminar datos en la tabla ${table}:`, event.target.error);
  //       };
  //     });
  
  //     transaction.oncomplete = () => {
  //       console.log('Datos en todas las tablas eliminados correctamente');
  //       db.close();
  //      // almacenarDatosEnIndexedDB(data); // Llama a la función para almacenar nuevos datos después de borrar los antiguos
  //     };
  
  //     transaction.onerror = (event) => {
  //       console.error('Error al abrir la transacción:', event.target.error);
  //       db.close();
  //     };
  //   };
  // }

  function borrarDatosEnIndexedDB() {
    const dbName = 'miBaseDeDatos';
    //const dbVersion = 1;
    const tables = ['reactivos', 'encuestas', 'encuestado_respuesta', 'respuestas_encuesta','encuesta_FinalReactivos',
     'reactivosCreados','tiposRespuesta','asignaciones','opciones_respuesta','Variable','Encuesta_Variables','VariableEncabezado','encuestasVariables','encuesta_FinalVariables'];
    //   // Abre una conexión con la base de datos o crea una nueva si no existe
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
  
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
        reject(event.target.error);
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(tables, 'readwrite');
  
        tables.forEach((table) => {
          const store = transaction.objectStore(table);
          const deleteRequest = store.clear(); // Borra todos los datos de la tabla
          deleteRequest.onsuccess = () => {
            console.log(`Datos en la tabla ${table} eliminados correctamente`);
          };
          deleteRequest.onerror = (event) => {
            console.error(`Error al eliminar datos en la tabla ${table}:`, event.target.error);
            reject(event.target.error);
          };
        });
  
        transaction.oncomplete = () => {
          console.log('Datos en todas las tablas eliminados correctamente');
          db.close();
          resolve();
        };
  
        transaction.onerror = (event) => {
          console.error('Error al abrir la transacción:', event.target.error);
          db.close();
          reject(event.target.error);
        };
      };
    });
  }
  
  // function ejecutarCiclo() {
  //   // Borra datos en IndexedDB
  //   borrarDatosEnIndexedDB()
  //     .then(() => {
    
  //       obtenerDatosDesdeAPI();
  //     })
  //     .catch((error) => {
  //       console.error('Error en el ciclo de sincronización:', error);
  //     });
  // }


  function ejecutarCiclo() {
    // Borra datos en IndexedDB solo si la versión coincide
    borrarDatosEnIndexedDB()
      .then(() => {
        obtenerDatosDesdeAPI();
      })
      .catch((error) => {
        console.error('Error en el ciclo de sincronización:', error);
      });
  }
  
// Crea un canal de difusión
const channel = new BroadcastChannel('miCanal');

// Agrega un evento para recibir mensajes en todas las pestañas
channel.onmessage = (event) => {
  if (event.data === 'ejecutarCiclo') {
    ejecutarCiclo();
  }
};

// Verifica si es la primera carga

// Llama a ejecutarCiclo() al cargar la página


// Llama a ejecutarCiclo() al cargar la página inicial
//ejecutarCiclo();

  // Llama a ejecutarCiclo() al cargar la página inicial
