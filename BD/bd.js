var db;
//creacion de la base de datos
var request = window.indexedDB.open("Janal ", 1);
request.onsuccess = function(event){
    db = request.result;
    console.log("OPEN",db);  
};
request.onerror= function(event){
    console.log("Error", event);
};

request.onupgradeneeded = function (event) {

    console.log("crear el esquema");

    db = event.target.result;

    // creacion de tablas

    var opciones = { keyPath: "id", autoIncrement: true };
     db.createObjectStore("Usuario", opciones);
     db.createObjectStore("Autenticasion",{keyPath: "correo"});
     db.createObjectStore("Encuestado",opciones);
     db.createObjectStore("Localidad", opciones);
     db.createObjectStore("Municipio", opciones);
     db.createObjectStore("Encuestador", opciones);

};

request.onerror = function(event){
    console.log("Error al abrir la base de datos", event);
};
 // insertar datos constantes
request.onsuccess = function(event){
    db = event.target.result;
   var AutenticasionDB =[
    {id:"1111",correo:"misyesenia12@gmail.com",contraseña:"12345"},
    {id:"112",correo:"191K0030@gmail.com",contraseña:"ISC12"}
   ];

   var IniciarSesionTransac = db.transaction('Autenticasion','readwrite');
   IniciarSesionTransac.onerror = function (event) {
       console.log("error", event.target.error);
   };

   IniciarSesionTransac.oncomplete = function (event) {
       console.log('Transacción hecha', event);
   };

   IniciarSesionTransac = IniciarSesionTransac.objectStore('Autenticasion');

for ( var Autenticasion of AutenticasionDB ) {
    IniciarSesionTransac.add( Autenticasion );
}

IniciarSesionTransac.onsucces = function (event) {
    console.log('Nuevo item agregado a la base de datos');
};


};

//registrar datos nuevos

function registrarse(){
 var Usuario = document.querySelector("#Usuario").value;
 var Contraseña = document.querySelector("#Contraseña").value;

 var request = db.transaction(["Autenticasion"], "readwrite")
 .objectStore("Autenticasion")
 .add({correo:Usuario, contraseña:Contraseña});

 request.onsuccess = function(e){
    console.log(e);
    alert("se inserto los datos");
 };



}
 // comprovacion de datos
function control(){
   
    var Usuario= document.querySelector("#Usuario").value;
    var Contraseña = document.querySelector("#Contraseña").value;
    console.log("About to login "+Usuario);

    var transaction = db.transaction(["Autenticasion"]); //readonly
    var objectStore = transaction.objectStore("Autenticasion");
    var request = objectStore.get(Usuario);

 request.onerror = function(e) {
  alert("Unable to retrieve data from database!");
  return;
 };
 request.onsuccess = function() {
  alert(Contraseña==" " + request.result.contraseña);
  if(Contraseña != request.result.contraseña) {
   alert("Could not log you in");
   return;
  } 
 control (window.location.href='https://www.freecodecamp.org/');

 };

}