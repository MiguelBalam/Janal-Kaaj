
// ------------------------------ v1 de sw ---------------------------------
// const CACHE_NAME = 'my-site-cache-v1';
// const urlsToCache = [
//   '/',
//   '/styles.css',
//   '/index.html',
//   '/image.png'
// ];

// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Cache abierto');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         return fetch(event.request);
//       })
//   );
// });

const STATIC_CACHE = 'static-v1';
// const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// cosas que si van a cambiar
const APP_SHELL = [
    '/',
    'login.html',
    'index.html',
    'form_encuestador.html',
    'form_encuestados.html',
    'contactanos.html',
    'pestañas_Encuestador/crear_Evariables.html',
    'pestañas_Encuestador/crear.html',
    'pestañas_Encuestador/editar_Reactivos.html',
    'pestañas_Encuestador/editar_Variables.html',
    'pestañas_Encuestador/reactivo_categoria.html',
    'pestañas_Encuestador/reactivo_crear_reactivos.html',
    'pestañas_Encuestador/reactivo_tipos_Encuestas.html',
    'pestañas_Encuestador/variable_crear_variable.html',
    'pestañas_Encuestador/variable_datos_encuesta.html',
    'pestañas_Encuestador/variable_selec_variable.html',
    'pestañas_Encuestador/variable_tipo_variable_NoEdit.html',
    'pestañas_Encuestador/variable_tipo_variable.html',
    'pestañas_Encuestador/reactivo_categoria.html',
    'BD/app.js'
];

// cosas que no van a cambiar
const APP_SHELL_INMUTABLE = [

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
    'Img/OP1.png',
    'Img/usuario (2).png',
    'CSS/bootstrap.min.css',
    'CSS/style.css',
    'CSS/style3.css',
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

        }); 

    });



    e.waitUntil( respuesta );
});