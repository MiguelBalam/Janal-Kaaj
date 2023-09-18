// Verificar el estado de la conexión al cargar la página

if (navigator.onLine) {
  // La aplicación está en línea, realiza una solicitud a la API para obtener datos
  obtenerDatosDesdeAPI();
 
  //sincronizarActualizacionesConMySQL()
} else {
  // La aplicación está fuera de línea, muestra un mensaje o realiza otras acciones apropiadas
 
 // mostrarDatosDesdeIndexedDB()
  mostrarEncuestas();
  // mostrarMensajeOffline();
  // mostrarDatosDesdeIndexedDB();
}

// Agregar un listener para el evento 'online'
window.addEventListener('online', () => {
  // La aplicación ha vuelto en línea, realiza una solicitud a la API para obtener datos

  //obtenerDatosDesdeAPI();
  //sincronizarActualizaciones();
 sincronizarActualizaciones()
});

// Agregar un listener para el evento 'offline'
window.addEventListener('offline', () => {
  // La aplicación ha pasado a estar fuera de línea, muestra un mensaje o realiza otras acciones apropiadas
  mostrarMensajeOffline();

});
  function obtenerDatosDesdeAPI() {
    // Realiza una solicitud a la API para obtener los datos más recientes
    fetch('/BD/src/sincronizar.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al recuperar los datos: ${response.status}`);
        }
        return response.json();
      })
     
      .then((data) => {
        // Almacena los datos en IndexedDB
        almacenarDatosEnIndexedDB(data);
       
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    function almacenarDatosEnIndexedDB(data) {
      // Nombre de la base de datos y versión
      const dbName = 'miBaseDeDatos';
      const tables = ['reactivos', 'encuestas', 'encuestado_respuesta', 'respuestas_encuesta','asignaciones','encuesta_FinalReactivos',
      'reactivosCreados'];
      // Abre una conexión con la base de datos o crea una nueva si no existe
      const request = indexedDB.open(dbName);
      let store;
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
      };
      
   
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        ObjectStore = db.createObjectStore("cola", {keyPath:'id',autoIncrement: true });
        ObjectStore = db.createObjectStore("RespuestasCola", {keyPath:'id',autoIncrement: true });
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
              keyPath;
              break;
            case 'encuestado_respuesta':
              keyPath;

              break;
            case 'respuestas_encuesta':
              keyPath;
              break;

              case 'asignaciones':
              keyPath;
              break;
              case 'encuesta_FinalReactivos':
              keyPath;
              break;
              case 'reactivosCreados':
              keyPath;
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
  
// Llama a la función para sincronizar las actualizaciones con MySQL cuando la aplicación está en línea
