// Verificar el estado de la conexión al cargar la página
if (navigator.onLine) {
    // La aplicación está en línea, realiza una solicitud a la API para obtener datos
   obtenerDatosDesdeAPI();
  } else {
    // La aplicación está fuera de línea, muestra un mensaje o realiza otras acciones apropiadas
    mostrarDatosDesdeIndexedDB();
    mostrarMensajeOffline();
   
  }
  
  // Agregar un listener para el evento 'online'
  window.addEventListener('online', () => {
    // La aplicación ha vuelto en línea, realiza una solicitud a la API para obtener datos
   obtenerDatosDesdeAPI();
  });
  
  // Agregar un listener para el evento 'offline'
  window.addEventListener('offline', () => {
    // La aplicación ha pasado a estar fuera de línea, muestra un mensaje o realiza otras acciones apropiadas
    mostrarMensajeOffline();

    
   
  });


  
  
  // function obtenerDatosDesdeAPI() {
  //   // Realiza una solicitud a la API para obtener los datos más recientes
  //   fetch('/BD/src/sincronizar.php') // Reemplaza '/api/data' con la ruta real de tu API
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Error al recuperar los datos: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Almacena los datos en IndexedDB
  //       almacenarDatosEnIndexedDB(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

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
      const dbVersion = 1;
      const tables = ['reactivos', 'encuestas', 'encuestado_respuesta', 'respuestas_encuesta'];
    
      // Abre una conexión con la base de datos o crea una nueva si no existe
      const request = indexedDB.open(dbName, dbVersion);
      
      request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
      
        tables.forEach((table) => {
          let keyPath;

          // Asigna el campo clave apropiado según la tabla
          switch (table) {
            case 'reactivos':
              keyPath = 'id_pregunta';
              break;
            case 'encuestas':
              keyPath = 'id_encuesta';
              break;
            case 'encuestado_respuesta':
              keyPath = 'id';
              break;
            case 'respuestas_encuesta':
              keyPath = 'id';
              break;
            // Puedes agregar más casos para otras tablas si es necesario
          }
          if (!db.objectStoreNames.contains(table)) {
            db.createObjectStore(table, { keyPath }); // Asegúrate de especificar el campo clave correcto
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
  