// importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js');
importScripts('BD/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// cosas que si van a cambiar
const APP_SHELL = [
    // '/',
    'conocenos.html',
    'contactanos.html',
    'editarNoticias.html',
    'form_encuestador.html',
    'form_encuestados.html',
    'index.html',
    'login.html',
    'noticias.html',
    'planes_servicios.html',
    'BD/sw-utils.js',
    'BD/app.js',
    'pestañas_Encuestador/crear_Evariables.html',
    'pestañas_Encuestador/crear.html',
    'pestañas_Encuestador/editR.html',
    'pestañas_Encuestador/dashboard.html',
    'pestañas_Encuestador/EncuestaFinalVariable.html',
    'pestañas_Encuestador/EncuestaVariables.html',
    'pestañas_Encuestador/EncuestasFinales.html',
    'pestañas_Encuestador/perfil_Encuestador.html',
    'pestañas_Encuestador/reactivo_categoria.html',
    'pestañas_Encuestador/reactivo_tipos_Encuestas.html',
    'pestañas_Encuestador/variable_crear_variable.html',
    'pestañas_Encuestador/variable_tipo_variable_NoEdit.html',
    'pestañas_Encuestador/variable_tipo_variable.html',
    'pestanas_Encuestado/perfil.html',
    'pestañas_SuperUsuario/dashboard.html',
    'pestañas_SuperUsuario/noticias.html',
    'pestañas_SuperUsuario/perfil_admin.html'
];

// cosas que no van a cambiar
const APP_SHELL_INMUTABLE = [

    'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap',
    'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
    'https://use.fontawesome.com/releases/v6.1.0/js/all.js',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
    'https://fonts.gstatic.com/s/ibmplexsans/v14/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2',
    'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
    'pestanas_Encuestado/Img/1.jpg',
    'pestanas_Encuestado/Img/2.jpg',
    'pestanas_Encuestado/Img/3.jpg',
    'pestanas_Encuestado/Img/4.jpg',
    'pestanas_Encuestado/Img/5.jpg',
    'Img/Blanco.png',
    'Img/bloquear.png',
    'Img/borrar.png',
    'Img/Crear.svg', 
    'Img/edit.svg',
    'Img/Fondo Transparente.png',
    'Img/gmail.png',
    'Img/Icono-Telefono.png',
    'Img/usuario (2).png',
    'Img/Form1.png',
    'Img/From2.png',
    'Img/From3.png',
    'Img/lOGOCONACYT.png',
    'Img/Oficial_JanalKaaj.png',
    'Img/Oficial_JanalKaaj.jpg',
    'CSS/funcion.js',
    'CSS/prueba.js',
    'CSS/style.css',
    'CSS/style3.css',
    'CSS/styleDashboard.css',
    'CSS/SweetAlert.js'
]; 

self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache => 
        cache.addAll(APP_SHELL));
    
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => 
        cache.addAll(APP_SHELL_INMUTABLE));


        e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        }); 

    });



    e.waitUntil( respuesta );
});

self.addEventListener('fetch', e => {
    if (e.request.url.includes('formulario')) {
      e.respondWith(
        caches.match(e.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          // Si no está en caché, busca en la red y almacena en caché dinámico
          return fetch(e.request).then(newRes => {
            return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
          });
        })
      );
    } else {
      const respuesta = caches.match(e.request).then(res => {
        if (res) {
          return res;
        } else {
          return fetch(e.request).then(newRes => {
            return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
          });
        }
      });
  
      e.respondWith(respuesta);
    }
  });