
// creacion de la base de datos
var db;
 (function conectarDB(){
    
   // let objectStore = null;
    let DBOpenReq =indexedDB.open('Janal',1);

    DBOpenReq.addEventListener('error',(err)=>{
        console.warn(err);
    });
    
    //Creacion de tablas u objetos
    DBOpenReq.addEventListener('upgradeneeded',(ev)=>{
        db = ev.target.result;
        buscar()
        ObjectStore= db.createObjectStore("Usuario", {autoIncrement: true});
        ObjectStore.createIndex("Nombre","Nombre",{unique:true});

        ObjectStore=db.createObjectStore("Autenticasion",{keyPath : "correo"});
        ObjectStore.createIndex("Correo","Correo",{unique:true});
        db.createObjectStore("Encuestado",{autoIncrement: true});
        db.createObjectStore("Localidad", {autoIncrement: true});
        db.createObjectStore("Municipio", {autoIncrement: true});
        db.createObjectStore("Encuestador",{autoIncrement: true});
        //Encuestas
        db.createObjectStore("Encuesta", {autoIncrement: true});
        db.createObjectStore("Encuesta_Reactivo", {autoIncrement: true});
        db.createObjectStore("Reactivos", {autoIncrement: true});
        db.createObjectStore("Categoria_encuesta", {autoIncrement: true});
        
        //Encuestas
        //db.createObjectStore("Encuesta", {autoIncrement: true});
   
        console.log('upgrade',db);
    });
    DBOpenReq.addEventListener('success',(ev)=>{
      buscar()
      db= ev.target.result;

    })




// registro de datos

    document.formEncuestado.addEventListener('submit',(ev)=>{
        
        ev.preventDefault();
        var correo = document.getElementById('Correo').value.trim();
        var Contraseña = document.getElementById('Contraseña').value.trim();
        var Nombre= document.getElementById('nombrecompletos').value.trim();
        var ApellidoP = document.getElementById('apellidopaterno').value.trim();
        var ApellidoM= document.getElementById('apellidomaterno').value.trim();
        var Genero= document.getElementById('inlineRadio1').value.trim();
        var Genero2= document.getElementById('inlineRadio2').value.trim();
        var Edad= document.getElementById('edad').value.trim();
        var Proce= document.getElementById('procedencia').value.trim();
        var Telefono = document.getElementById('tel').value.trim();
        // var localidad =document.getElementById('localidad').value.trim();
        // var ciudad =document.getElementById('cuidad').value.trim();
        // var Municipio =document.getElementById('municipio').value.trim();
        // var Encuestado = document.getElementById('estado').value.trim();
        // var telefono = document.getElementById('tel-encuestado').value.trim();
        

        let Usuario = {
        Nombre,
        ApellidoP,
        ApellidoM,
        Genero,
        Genero2,
        Edad,
        Telefono
        }
        let Autenticasion = {
            correo,
            Contraseña
            }
            let Encuestador = {
              Proce
                 }
             
        
        let tx = makeTX('Usuario','readwrite');
        let txA = makeTX2('Autenticasion','readwrite');
        let txB = makeTX3('Encuestador','readwrite');

        tx.oncomplete = (ev)=>{
            console.log (ev);
        };
        txA.oncomplete = (ev)=>{
            console.log (ev);
        };
        let store = tx.objectStore('Usuario');
        let request = store.add(Usuario);
        let store2 = txA.objectStore('Autenticasion');
        let request2 = store2.add(Autenticasion);
        let store3 = txB.objectStore('Encuestador');
        let request3 = store3.add(Encuestador);
        
        validar();
        request.onsuccess = (ev) => {
          
          console.log('successfully added an object',ev);
        };
        request.onerror = (eve) => {
          console.log('error in request to add',eve);
        };
        request2.onsuccess = (ev) => {
            console.log('successfully added an object',ev);
          };
          request2.onerror = (eve) => {
            console.log('error in request to add',eve);
          };
          request3.onsuccess = (ev) => {
            console.log('successfully added an object',ev);
          };
          request3.onerror = (eve) => {
            console.log('error in request to add',eve);
          }; 
    })
    function makeTX(storeName, mode) {
        let tx = db.transaction(storeName, mode);
        tx.onerror = (eve) => {
          console.warn(eve);
        };
        return tx;
    }
    function makeTX2(storeName, mode) {
        let tx = db.transaction(storeName, mode);
        tx.onerror = (eve) => {
          console.warn(eve);
        };
        return tx;
    }
    function makeTX3(storeName, mode) {
        let tx = db.transaction(storeName, mode);
        tx.onerror = (eve) => {
          console.warn(eve);
        };
        return tx;
    }
   

})();

// validar que los campos esten completos y evitar registro
function validar(){
 
 document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById('EncuestadoForm').addEventListener('submit',manejadorValidacion)
      });
      manejadorValidacion(e);
      e.preventDefault();
}

function manejadorValidacion(e) {
    e.preventDefault();
    
    if(this.querySelector('[#nombrecompletos= #nombrecompletos]').value == '') {
    return;
    }

     this.submit();
    }
   
    // control de logueo 
   
    
    function control(){
        document.getElementById('controlE').addEventListener('submit',control);
       
           
            
            var Usuario= document.querySelector("#Usuario").value;
            var Contraseña = document.querySelector("#Contraseña").value;
            console.log("apunto de iniciar"+Usuario);
           
            var transaction = db.transaction(["Autenticasion"]); //readonly
            var objectStore = transaction.objectStore("Autenticasion");
            var request = objectStore.get(Usuario);
            
    
            request.onerror = function() {
                alert("Unable to retrieve data from database!");
              
               };
               request.onsuccess = function () {
                
                if(Contraseña == request.result.Contraseña){
              
                  alert("Inicio de sesion exitosa");
              
                 control (window.location.href='index.html');
                
                 }
                 
                 else if ( Contraseña !== request.result ) {
                  alert("Verifique su contraseña");
                }
                
               }
              
        }
// Encuesta predeterminada 1
        function Encuesta1(){
          var   encuesta_prototipo = [
            { id: "1", Titulo: "Encuesta_Apicultura", 
            Objetivo: "conocer_la_produccion_apicola", 
            instrucciones: "responder todo los reactivos" }
          ];
    
          var reactivos =[
            { id:"1", Descripcion: "La miel que vende ¿en qué periodo del año se produjo (meses del año)?"},
             { id: "2", Descripcion: "¿Cuantos años lleva trabajando con las abejas ?"},
              {id: "3", Descripcion: "¿Cuantas cajas tiene?"},
              {id: "4", Descripcion: "¿Cuanta miel produce anualmente?"},
              {id: "5", Descripcion: "¿Cuantas veces al año extrae miel en una colmena?"},
              { id: "6", Descripcion: "¿Su produccion comparte espacio con otros animales domesticos?¿Cuales?"},
              {id: "7", Descripcion: "¿Como sabe cuando es el momento de la cosecha"}
            
        ];
    
          var Categoria =[
          { id: "1", descripcion:"Apicultura"}
           ];
    
          var IniciarSesionTransac = db.transaction(["Encuesta"],'readwrite');
          IniciarSesionTransac.onerror = function (event) {
              console.log("error", event.target.error);
          };
          var IniciarSesionTransac2 = db.transaction(["Encuesta_Reactivo"], "readwrite");
          IniciarSesionTransac2.onerror = function (event) {
              console.log("error", event.target.error);
          };
          var IniciarSesionTransac3 = db.transaction(["Categoria_encuesta"], "readwrite");
          IniciarSesionTransac3.onerror = function (event) {
              console.log("error", event.target.error);
          };
    
          IniciarSesionTransac = IniciarSesionTransac.objectStore(["Encuesta"]);
          IniciarSesionTransac2 = IniciarSesionTransac2.objectStore(["Encuesta_Reactivo"]);
          IniciarSesionTransac3 = IniciarSesionTransac3.objectStore(["Categoria_encuesta"]);
       
       for ( var Encuesta of encuesta_prototipo ) {
           IniciarSesionTransac.add(Encuesta);
       }
       for(var Encuesta_Reactivo of reactivos){
        IniciarSesionTransac2.add(Encuesta_Reactivo);
       }
       for(var Categoria_encuesta of Categoria){
        IniciarSesionTransac3.add(Categoria_encuesta);
       }
       IniciarSesionTransac.onsucces = function (event) {
           console.log('Nuevo item agregado a la base de datos');
       };
       
    
          console.log('suscess',db);
      
      };
    
      //Crear encuesta
      
        function CrearEncuesta(){

          var titulo = document.getElementById("Titulo").value;
          var Objetivo = document.getElementById("floatingTextarea2").value;
          var Instrucciones = document.getElementById('floatingTextarea2').value;
         
          var request = db.transaction(["Encuesta"], "readwrite")
          .objectStore("Encuesta")
          .add({Titulo:titulo, Objetivo:Objetivo, Instrucciones:Instrucciones});

          request.onsuccess = function(e){
             console.log(e);
             alert("se inserto los datos");
          };
         
         
         
         }
        function buscar(){
          data_array =[]
          var filtro;
          var asc = "next"
          var objectStore = db.transaction("Encuesta_Reactivo").objectStore("Encuesta_Reactivo");
          objectStore.openCursor(filtro,asc).onsucces= function(e){
            var cursor = e.target.result;
            if(cursor){
              data_array.push(cursor.value);
              cursor.continue();
            }else{
              alert("No se abrio el cursor");
            }
          }
        }
        function Listado(data_array){
          Lista_array=[]
          for(var i= 0; i<data_array.length; i++){
            var f = Lista_array.indexOf(data_array[i].Encuesta_Reactivo);
            if(f==1){
              Lista_array.push(data_array[i].Encuesta_Reactivo)
            }
          }

        }
        // function AgregarFormulario(db,DBOpenReq){
          
          
        //     var transaction = db.transaction(['Encuesta'], "readwrite");
        //     var objectStore = transaction.objectStore('Encuesta');
    
        //     objectStore.add(DBOpenReq);
        //     transaction.onerror = () => {
        //         alert('Hubo un error', 'error');
        //         transaction.db.close();
        //     }
        //     transaction.oncomplete = () => {
        //         alert('El cliente se creo correctamente');
        //         transaction.db.close();
        //         setTimeout(() => {
        //             window.location.href = 'index.html';
        //         }, 3000);
        //     }
    
        // }
          
        

    
 
   