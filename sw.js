importScripts('BD/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

// cosas que si van a cambiar
const APP_SHELL = [
    // '/',
    'login.html',
    'index.html',
    'form_encuestador.html',
    'form_encuestados.html',
    'contactanos.html',
    'pestañas_Encuestador/crear_Evariables.html',
    'pestañas_Encuestador/crear.html',
    'pestañas_Encuestador/editar_Reactivos.html',
    'pestañas_Encuestador/editar_Variables.html',
    'pestañas_Encuestador/editR.html',
    'pestañas_Encuestador/EncuestaApi.html',
    'pestañas_Encuestador/EncuestasFinales.html',
    'pestañas_Encuestador/reactivo_categoria.html',
    'pestañas_Encuestador/reactivo_crear_reactivos.html',
    'pestañas_Encuestador/reactivo_tipos_Encuestas.html',
    'pestañas_Encuestador/variable_crear_variable.html',
    'pestañas_Encuestador/variable_datos_encuesta.html',
    'pestañas_Encuestador/variable_selec_variable.html',
    'pestañas_Encuestador/variable_tipo_variable_NoEdit.html',
    'pestañas_Encuestador/variable_tipo_variable.html',
    'pestañas_Encuestador/vistaPreguntas.html',
    'pestanas_Encuestado/perfil.html',
    'planes_servicios.html',
    'Estadistica/index.html',
    'conocenos.html',
    'BD/sw-utils.js',
    'BD/app.js'
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
    'Estadistica/plugins/jqvmap/jquery.vmap.min.js',
    'Estadistica/plugins/jqvmap/maps/jquery.vmap.usa.js',
    'Estadistica/plugins/jquery-knob/jquery.knob.min.js',
    'Estadistica/plugins/moment/moment.min.js',
    'Estadistica/plugins/daterangepicker/daterangepicker.js',
    'Estadistica/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
    'Estadistica/plugins/summernote/summernote-bs4.min.js',
    'Estadistica/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
    'Estadistica/dist/js/adminlte.js',
    'Estadistica/dist/js/demo.js',
    'Estadistica/dist/js/pages/dashboard.js',
    'Estadistica/dist/img/AdminLTELogo.png',
    'Estadistica/dist/img/user3-128x128.jpg',
    'Estadistica/dist/img/user1-128x128.jpg',
    'Estadistica/dist/img/user7-128x128.jpg',
    'Estadistica/dist/img/user5-128x128.jpg',
    'Estadistica/dist/img/user6-128x128.jpg',
    'Estadistica/dist/img/user8-128x128.jpg',
    'Estadistica/plugins/jquery-ui/jquery-ui.min.js',
    'Estadistica/plugins/bootstrap/js/bootstrap.bundle.min.js',
    'Estadistica/plugins/chart.js/Chart.min.js',
    'Estadistica/plugins/sparklines/sparkline.js',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback',
    'Estadistica/plugins/-frefontawesomee/css/all.min.css',
    'Estadistica/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
    'Estadistica/plugins/icheck-bootstrap/icheck-bootstrap.min.css',
    'Estadistica/plugins/jqvmap/jqvmap.min.css',
    'Estadistica/dist/css/adminlte.min.css',
    'Estadistica/plugins/jquery/jquery.min.js',
    'Img/Oficial_JanalKaaj.png',
    'Img/Oficial_JanalKaaj.jpg',
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

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        }); 

    });



    e.waitUntil( respuesta );
});

self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });



    e.respondWith( respuesta );

}); 
