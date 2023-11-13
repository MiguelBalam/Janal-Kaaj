//importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js');

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
self.DYNAMIC_CACHE = DYNAMIC_CACHE;
const INMUTABLE_CACHE = "inmutable-v1";

// cosas que si van a cambiar
const APP_SHELL = [
  "/",
  "/conocenos.html",
  "/contactanos.html",
  "/editarNoticias.html",
  "/form_encuestador.html",
  "/form_encuestados.html",
  "/index.html",
  "/login.html",
  "/BD/sw-utils.js",
  "/BD/app.js",
  "/BD/sinInternet/encuesta.html",
  "/pestanas_Encuestador/crear_Evariables.html",
  "/pestanas_Encuestador/crear.html",
  "/pestanas_Encuestador/editR.html",
  "/pestanas_Encuestador/dashboard.html",
  "/pestanas_Encuestador/EncuestaFinalVariable.html",
  "/pestanas_Encuestador/EncuestaVariables.html",
  "/pestanas_Encuestador/EncuestasFinales.html",
  "/pestanas_Encuestador/perfil_Encuestador.html",
  "/pestanas_Encuestador/reactivo_categoria.html",
  "/pestanas_Encuestador/variable_crear_variable.html",
  "/pestanas_Encuestador/variable_tipo_variable_NoEdit.html",
  "/pestanas_Encuestador/variable_tipo_variable.html",
  "/pestanas_Encuestado/perfil.html",
  "/pestanas_SuperUsuario/dashboard.html",
  "/BD/registroUsuarios/registro.js",
  "/BD/registroUsuarios/registroEncuestado.js",
  "/BD/src/jsSC.js",
  "/BD/src/sync.js",
  "/BD/src/App.js",
  "/pestanas_Encuestado/dashAplicador.html",

];

// cosas que no van a cambiar
const APP_SHELL_INMUTABLE = [
  "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap",
  "https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js",
  "https://use.fontawesome.com/releases/v6.1.0/js/all.js",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
  "https://fonts.gstatic.com/s/ibmplexsans/v14/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2",
  "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
  "/pestanas_Encuestado/Img/1.jpg",
  "/pestanas_Encuestado/Img/2.jpg",
  "/pestanas_Encuestado/Img/3.jpg",
  "/pestanas_Encuestado/Img/4.jpg",
  "/pestanas_Encuestado/Img/5.jpg",
  "/Img/Blanco.png",
  "/Img/bloquear.png",
  "/Img/borrar.png",
  "/Img/Crear.svg",
  "/Img/edit.svg",
  "/Img/Fondo Transparente.png",
  "/Img/gmail.png",
  "/Img/Icono-Telefono.png",
  "/Img/usuario (2).png",
  "/Img/Form1.png",
  "/Img/From2.png",
  "/Img/From3.png",
  "/Img/lOGOCONACYT.png",
  "/Img/Oficial_JanalKaaj.png",
  "/Img/Oficial_JanalKaaj.jpg",
  "/CSS/funcion.js",
  "/CSS/prueba.js",
  "/CSS/style.css",
  "/CSS/style3.css",
  "/CSS/styleDashboard.css",
  "/CSS/SweetAlert.js",
  "/BD/prueva/encuesta.css",
  "/BD/prueva/encuesta.js",
  "/BD/prueva/encuestavariables.js",
  "/BD/prueva/estilostabla.css",
  "/BD/graficas.js",
  "/manifest.json",
  "/node_modules/@sweetalert2/themes/bootstrap-4/bootstrap-4.min.css"
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// self.addEventListener('activate', e => {

//     const respuesta = caches.keys().then( keys => {

//         keys.forEach( key => {

//             if (  key !== STATIC_CACHE && key.includes('static') ) {
//                 return caches.delete(key);
//             }

//             if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
//                 return caches.delete(key);
//             }

//         });

//     });

//     e.waitUntil( respuesta );
// });

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Si la solicitud se completó correctamente, actualiza la caché dinámico
        if (res && res.ok) {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(e.request, res.clone());
            return res;
          });
        }
        // Si la solicitud falla o no se puede actualizar la caché dinámico, devuelve la respuesta original en caché si está disponible
        return caches
          .match(e.request)
          .then((cachedResponse) => cachedResponse || res);
      })
      .catch((err) => {
        // En caso de error en la red, intenta obtener la respuesta desde la caché
        return caches.match(e.request);
      })
  );
});

// self.addEventListener('fetch', e => {
//     if (e.request.url.includes('formulario')) {
//       e.respondWith(
//         caches.match(e.request).then(cachedResponse => {
//           if (cachedResponse) {
//             return cachedResponse;
//           }

//          // Si no está en caché, busca en la red y almacena en caché dinámico
//           return fetch(e.request).then(newRes => {
//             return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
//           });
//         })
//       );
//     } else {
//       const respuesta = caches.match(e.request).then(res => {
//         if (res) {
//           return res;
//         } else {
//           return fetch(e.request).then(newRes => {
//             return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
//           });
//         }
//       });

//       e.respondWith(respuesta);
//     }
//   });

function actualizaCacheDinamico(dynamicCache, req, res) {
  if (res.ok) {
    return caches.open(dynamicCache).then((cache) => {
      cache.put(req, res.clone());

      return res.clone();
    });
  } else {
    return res;
  }
}
