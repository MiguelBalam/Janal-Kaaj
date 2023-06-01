var url = window.location.href;
var swLocation = '/Janal-Kaaj/sw.js';

if (navigator.serviceWorker){

  if (url.includes('janalkaaj.com.mx')){
        swLocation = '/sw.js';
    }
  navigator.serviceWorker.register(swLocation);
}

// creacion de la base de datos
var db;
var ObjectStore;
var ObjectStoreReac;
 (function conectarDB(){
    
   // let objectStore = null;
    let DBOpenReq =indexedDB.open('Janal',1);

    DBOpenReq.addEventListener('error',(err)=>{
        console.warn(err);
    });
    
    //Creacion de tablas u objetos
    DBOpenReq.addEventListener('upgradeneeded',(ev)=>{
        db = ev.target.result;       
        
        ObjectStore = db.createObjectStore("Usuario", { keyPath : 'id', autoIncrement: true});
        ObjectStore.createIndex("Nombre","Nombre",{unique:true});
        ObjectStore = db.createObjectStore("relacionReactivo", { keyPath:"correo", autoIncrement: true});

        //usuario

        ObjectStore = db.createObjectStore("Usuariosactivo", {keyPath: "id"});
        ObjectStore = db.createObjectStore("Usuarios", {autoIncrement: true});

        ObjectStore = db.createObjectStore("EncuestaFinal", {autoIncrement: true});
        ObjectStore.createIndex("encuestaId","",{unique:true});
        ObjectStore=db.createObjectStore("Autenticasion",{keyPath:"correo", autoIncrement: true});
        ObjectStore.createIndex("correo","correo",{unique:true});

        db.createObjectStore("Encuestado",{autoIncrement: true});
        db.createObjectStore("Localidad", {autoIncrement: true});
        db.createObjectStore("Municipio", {autoIncrement: true});
        db.createObjectStore("Encuestador",{autoIncrement: true});
        //Encuestas
        ObjectStore= db.createObjectStore("Encuesta", {keyPath:"IdEn",autoIncrement: true});
        ObjectStore.createIndex("EncuestaTitulo","Titulo",{unique:true});
        ObjectStore.createIndex("EncuestaObjetivo","ObjetivoER",{unique:true});
        ObjectStore.createIndex("EncuestaInstruccion","Instrucciones",{unique:true});

        ObjectStore=db.createObjectStore("Encuesta_Reactivo", {autoIncrement: true});
        ObjectStore.createIndex("Descripcion","Descripcion",{unique:true});
        ObjectStore.createIndex("Cate","Cate",{unique:false});
        


        ObjectStore=db.createObjectStore("Reactivos", {keyPath: 'id',autoIncrement:true});
        // ObjectStore.createIndex("Reactivo","Reactivo",{unique:false});
        // ObjectStore.createIndex("CategoriaReactivo","CategoriaReactivo", {unique:false});

        ObjectStore=db.createObjectStore("TipoRes", {keyPath:'idR', autoIncrement: true});
       // ObjectStore.createIndex("relacionR","relacionR",{unique:false});

        ObjectStore=db.createObjectStore("ReacOpMul", {autoIncrement: true});
        ObjectStore=db.createObjectStore("ReOpM", {autoIncrement: true});
  
        db.createObjectStore("Categoria_encuesta", {autoIncrement: true});

        ObjectStore=db.createObjectStore("preguntaReactivos", {keypth:"idPreg",autoIncrement: true});
        ObjectStore.createIndex("Encuesta_Id","Encuesta_Id", {unique: true});
        ObjectStore=db.createObjectStore("selecVariables", {autoIncrement: true});
        //ObjectStoreReac=db.createObjectStore("Categorias", {autoIncrement: true});
        ObjectStore = db.createObjectStore("predeSelec", {autoIncrement: true});
        //ObjectStore.createIndex("Categoria","Categoria",{unique:true});
        
        ObjectStore= db.createObjectStore("Variables", {autoIncrement: true});
        ObjectStore.createIndex("NombreVar","NombreVar", {unique: true});
        ObjectStore= db.createObjectStore("Variables2", {autoIncrement: true});
        ObjectStore.createIndex("NombreVar2","NombreVar2", {unique: true});

        ObjectStore= db.createObjectStore("Encuesta_Variables", {autoIncrement: true});
        ObjectStore.createIndex("Titulo","Titulo",{unique:true});
        ObjectStore= db.createObjectStore("VariableC", {keyPath:"creV",autoIncrement: true});

        console.log('upgrade',db);
       
    });
    
    
    document.addEventListener('DOMContentLoaded', function() {
      obtenerValorYVerificarLabel();
      obtenerValorTd();
      console.log("triste");
    });
    //funciones para cursores
    DBOpenReq.addEventListener('success',(ev)=>{
     
      db= ev.target.result;
      //EncaEncuestaVista()
      buscarE()
     // buscarEVar()
     mostrarEncuesta()
     
     EncuestaVistaPV2()
      buscar()
      buscarEVar()
      mostrarEncuestaV() 
      
     //mostrarPreguntas();
      reactivoscrear()
    
     
    // EncuestaVistaP()
      //mostrarSelecReac()
      predeSelecMos()
      cargarPagina()
      //buscar2()
     // Usuariosactivo()
    
    
      //ReacPredeVista()
      // refrescarAlmacen()
     
       mostrarPreguntas();
     
      Encuesta1()
      EncuestaV()
      Variables()
  
  

      // buscarVar()
      // buscarVar2()
      // busVaC()
      //buildList()
      buildList()
    
      
     // buscarLista();
      
      
     // buscarLista(); 
      //buildList()
      //BusVa()
      
     // refrescarAlmacen()
    });


// registro de datos
//-----------------------------------------------------------------------------------------------------------------------
    document.formEncuestado.addEventListener('submit',(ev)=>{
        
        ev.preventDefault();
        var correo = document.getElementById('Correo').value.trim();
        var Contrasenia = document.getElementById('contrasenia').value.trim();
        var Contrasenia2 = document.getElementById('contrasenia2').value.trim();
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
        
        verificarPasswords();

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
            Contrasenia,
            Contrasenia2
            }
            let Encuestador = {
              Proce
                 }
             
        
        let tx = makeTX('Usuario','readwrite');
        let txA = makeTX2('Autenticasion','readwrite');
        let txB = makeTX3('Encuestador','readwrite');

        tx.oncomplete = (ev)=>{
            console.log (ev);
            var elementos = document.getElementsByName("inlineRadioOptions");
            for(var i=0; i<elementos.length; i++) {
              alert(" Elemento: " + elementos[i].value + "\n Seleccionado: " + elementos[i].checked);
        }
      };
        txA.oncomplete = (ev)=>{

          verificarPasswords();
         
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
          check();  
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

function load(id) {
                

  var active;
  var data = active.transaction(["Usuario"], "readonly");
  var object = data.objectStore("Usuario");
  
  var request = object.get(parseInt(id));
  
  request.onsuccess = function () {
      
      var result = request.result;

      const input = "result.name";
  document.getElementById("xd").innerHTML = input;
  
  console.log('Dato obtenido:', result.name);

  
  if (result !== undefined) {
          alert("ID: " + result.id + "\n\
          DNI: " + result.ApellidoM + "\n\
          Name: " + result.name + "\n\
          Surname: " + result.ApellidoP);
      }

  };
  
}







//Verificar que las dos contraseñas coincidan
//-----------------------------------------------------------------------------------------------------------------------

function verificarPasswords() {
 
 var pass1 = document.getElementById('contrasenia').value;
  var pass2 = document.getElementById('contrasenia2').value;
  
  if (pass1 != pass2) {

    // Si las constraseñas no coinciden mostramos un mensaje
   alert("Las contraseñas no coinciden")
   console.onerror();
    return pass1;
}else {
    // Si las contraseñas coinciden ocultamos el mensaje de error
  alert("Contarseña Correcta");

}
//return true;
}

// validar que los campos esten completos y evitar registro
function validar(){
  
 document.addEventListener("DOMContentLoaded", function(e) { 
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
//-----------------------------------------------------------------------------------------------------------------------
   
    
    function control(){
        //document.getElementById('controlE').addEventListener('submit',control);
            
            var Usuario= document.querySelector("#Usuario").value;
            var Contrasenia = document.querySelector("#contraseniaL").value;
           
            // console.log("apunto de iniciar"+ Usuario);
           
            var transaction = db.transaction(["Autenticasion"],"readonly"); //readonly
            var objectStore = transaction.objectStore("Autenticasion");
            var request = objectStore.get(Usuario);
           
            
    
            request.onerror = function() {
                alert("Unable to retrieve data from database!");
              
               };
               request.onsuccess = function () {
                
                if(Contrasenia == request.result.Contrasenia){
              
                  // alert("Inicio de sesion exitosa");
              
                 control (window.location.href='pestañas_Encuestador/reactivo_tipos_Encuestas.html');
                 //var correo = document.getElementById('Usuario').value;
                 //var idR = document.getElementById("ReactivoCre").value.trim();
               //var request2 = db.transaction(["Reactivos"], "readwrite").objectStore("Reactivos").put({creador:Usuario});
                //var request3 = db.transaction(["relacionReactivo"], "readwrite").objectStore("relacionReactivo")
                
          // var CategoriaReactivo=document.getElementById("CategoriaReactivos").value.trim();
          // var owned = document.getElementById('inlineCheckbox1').checked;
          // var TipoRes = document.getElementById('TipoRes').selectedIndex;
                
                 } else if ( Contrasenia !== request.result ) {
                  alert("Verifique su contraseña");
                }
              
        }
      }

      function enviarFormulario() {
        var valorInput1 = document.getElementById("Usuario").value;
        localStorage.setItem("valorInput1", valorInput1);
       
      }
    
      function cargarPagina() {
        var valorInput1 = localStorage.getItem("valorInput1");
        document.getElementById("aqui").value = valorInput1;
        
      }
     
      
      
      
      
// Encuesta predeterminada 1
//almacena predetermidos

//-----------------------------------------------------------------------------------------------------------------------

        function Encuesta1(){
          var   encuesta_prototipo = [
            { id: "1", Titulo: "Encuesta Apicultura", 
            ObjetivoER: "conocer_la_produccion_apicola", 
            Instrucciones: "responder todo los reactivos" }
          ];
    
          var reactivos =[
            {id:"1",Descripcion:"La miel que vende ¿en qué periodo del año se produjo (meses del año)?",Cate:"Miel"},
            {id:"2",Descripcion:"¿Cuantos años lleva trabajando con las abejas ?",Cate:"Miel"},
            {id:"3",Descripcion:"¿Cuantas cajas tiene?",Cate:"Ganaderia"},
            {id:"4",Descripcion:"¿Cuanta miel produce anualmente?",Cate:"Ganaeria"},
            {id:"5",Descripcion:"¿Cuantas veces al año extrae miel en una colmena?",Cate:"Otro"},
            {id:"6",Descripcion:"¿Su produccion comparte espacio con otros animales domesticos?", Cate:"Miel"},
            {id:"7",Descripcion:"¿Cuales?", Cate:"Miel"},
            {id:"8",Descripcion:"¿Como sabe cuando es el momento de la cosecha", Cate:"Agricultura"}
            
        ];
    
          var Categoria =[
          { id: "1", descripcion:"Apicultura"},
          { id: "2", descripcion:"Agricultura"},
          { id: "3", descripcion:"Ganderia"}
           ];
           
          var IniciarSesionTransac = db.transaction(["Encuesta"],'readwrite');
          IniciarSesionTransac.onerror = function (event) {
              console.log("error", event.target.error);
          };
          var IniciarSesionTransac2 = db.transaction(["Encuesta_Reactivo"],"readwrite");
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
        buscar();
       
        
           console.log('Nuevo item agregado a la base de datos');
       };
       
    
          console.log('suscess',db);
      
      };
      //termina
      function EncuestaV(){
        var   encuesta_prototipo = [
          { id: "1", Titulo: "Encuesta Apicola", 
          ObjetivoER: "conocer_la_produccion_apicola", 
          Instrucciones: "responder todo los reactivos" }
        ];
  
    
         
        var IniciarSesionTransac = db.transaction(["Encuesta_Variables"],'readwrite');
        IniciarSesionTransac.onerror = function (event) {
            console.log("error", event.target.error);
        };
        
  
        IniciarSesionTransac = IniciarSesionTransac.objectStore(["Encuesta_Variables"]);
       
     
     for ( var Encuesta of encuesta_prototipo ) {
         IniciarSesionTransac.add(Encuesta);
     }
    
     IniciarSesionTransac.onsucces = function (event) {
   
     
      
         console.log('Nuevo item agregado a la base de datos');
     };
     
  
        console.log('suscess',db);
    
    };
      function Variables(){
 

        var variables =[
          {id:"1",NombreVar:"Experiencia", Siglas:"T.P",Descripcion:"Experiencia del apicultor dónde se desarrolla la actividad (rentada, propia o ejido)"},
          {id:"2",NombreVar:"Tipo de producción de la miel.", Siglas:"P.M.",Descripcion:"Tipo de producción de miel en las zonas de estudio."},
          {id:"3",NombreVar:"Las Políticas Públicas en el sector.", Siglas:"P.P.",Descripcion:"Acciones y apoyos que el gobierno ofrece a este sector primario."},
          {id:"4",NombreVar:"Nivel de ingresos del Jornalero.", Siglas:"I.J.",Descripcion:"Rango de ingresos mensuales que percibe "},
          {id:"5",NombreVar:"Tipo de práctica empleada en el campo", Siglas:"P.E.",Descripcion:"Tipo de manejo de prácticas que se utilizan en esta actividad."},
          {id:"6",NombreVar:"Prácticas culturales", Siglas:"P.C",Descripcion:"prácticas culturales es usada y cuantas veces se realiza al año."},
          {id:"7",NombreVar:"Sanidad.", Siglas:"S",Descripcion:"Control y prevención de la presencia de plagas y enfermedades en la producción"},
          // {id:"8",NombreVar:"Documentación de procesos.", Siglas:"D.P.",Descripcion:"D de manuales de procedimientos y certificaciones como parte del proceso de esta actividad."},
          // {id:"9",NombreVar:"Tecnología especializada.", Siglas:"T.E.",Descripcion:"Maquinaria especializada para esta actividad o si aún se carece de ella."},
          // {id:"10",NombreVar:"Acceso a los medios de publicidad.", Siglas:"A.P.",Descripcion:"Publicidad entre ellos uso de internet, periódicos o algún medio que difunda sus productos"}
          
      ];
      
       
        var IniciarSesionTransac = db.transaction(["Variables"],'readwrite');
       
      
        IniciarSesionTransac = IniciarSesionTransac.objectStore(["Variables"]);
        
      
      for ( var Variables of variables ) {
         IniciarSesionTransac.add(Variables);
      }
      
      IniciarSesionTransac.onsucces = function (event) {
        //crearTabla();
        buscarV();
        BusVa();
        //BusVa2();
      
         console.log('Nuevo item agregado a la base de datos');
      };
      
      
        // console.log('suscess',db);
      
      }

  //salida para las preguntas de reactivos en crear.html
  //-----------------------------------------------------------------------------------------------------------------------
  //buscar 2
      function reactivoscrear(){
        var cadena ="<table class= 'table table-bordered'>";
        var num= 0;
        var ids_array = new Array();
        var objectStore = db.transaction("Reactivos").objectStore("Reactivos");
        objectStore.openCursor().onsuccess = function(e){
          var cursor = e.target.result;
          if(cursor){
            id = cursor.value.id;
            CategoriaReactivo=cursor.value.CategoriaReactivo;
            owned=cursor.value.owned;
            //id2 = cursor.value.TipoRes;
            cadena += "<tr>";
            cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
            cadena +="<td>"+id+"</td>"; 
            cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza  ' id='b" +id+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
            //cadena += "<td><button id= 'e"+id+"'>Editar</button></td>"
            //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
            cadena += "</tr>"; 
            ids_array.push(id); //para guardar / correr espacio
            num++; 
            cursor.continue();
      
          }else{
            cadena += "</table>"
            document.getElementById("salida2").innerHTML = cadena;
      
            for(var i=0; i<ids_array.length; i++){
              id = ids_array[i];
              document.getElementById("s"+id).onclick= selec;  // s para seleccionar checkbox
              document.getElementById("b"+id).onclick= borrar; 
            }
          }
         // Escucha el evento "change" en el checkbox

    }

    
  }



    function borrar(e){
      // console.log ('borrar',e)
      var id = e.target.id;
      
      var llave = id.substr(1)
      // console.log(id,llave);
      if(llave){
        db.transaction('Reactivos','readwrite')
        .objectStore('Reactivos')
        .delete(llave),
        
        borraactu2()
       
        
      }

      request.onsuccess =function (e){
     
       
       
        // alert("eliminado"+llave)
        
      };
      deleteRequest.onsuccess = function(event) {
        console.log("Registro eliminado con éxito");
      };
      reactivoscrear()
      mostrarPreguntas()
     }
    
    
 
    function mostrarSelecReac(){
      var cadena ="<table class= 'table table-bordered'>";
     var lastTimestamp = Date.now();
       //cadena += "";
       //leer cursor
       var objectStore = db.transaction("preguntaReactivos").objectStore("preguntaReactivos");
       objectStore.openCursor().onsuccess= function(e){
        var cursor = e.target.result;
        if(cursor){
          var item = cursor.value.id2
          var timestamp = item.fechaCreacion;

          if (timestamp > lastTimestamp) {
            
            cadena += "<tr>";
            //cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
            cadena +="<td>"+cursor.value.id2+"</td>";
            cadena += "<tr>";
            //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
           
          }   
          //cadena += "";
          
          //continuamos siguiente objeto
          cursor.continue();

        }else{
          cadena += "</table>";
          document.getElementById("salidaSelec").innerHTML = cadena;

          for(var i=0; i<id_array.length; i++){
            //document.getElementById("s"+id).onclick= selec;
            id = id_array[i];
            //document.getElementById("m"+id).onclick= Editar;

          }
        }
       }
    }

    // funcion para seleccionar checkbox
//-----------------------------------------------------------------------------------------------------------------------

    function selec(e){
      // console.log("seleccionar",e);
      var id = e.target.id;
      //var id2= e.target.result;
      var llave = id;
      //var llaveR = id2;

      console.log(id);
     // console.log(id2);

       llave = id.substring(1);
     //  llaveR = id2.substring(1)
      // llaveR = tipoRes.substring(1);
      // console.log(id,llave);
    

      if(llave){
        var tx =db.transaction(["Reactivos","preguntaReactivos"],"readwrite");
        var objectStore = tx.objectStore("Reactivos");
       // var tx2 =db.transaction("preguntaReactivos","readwrite");
        var storeOtroObjeto = tx.objectStore("preguntaReactivos");
        var request = objectStore.get(llave);

        request.onsuccess =function(e){
        var reactivo = e.target.result;
        console.log("Elementos seleccionados: ", reactivo.id, reactivo.TipoRes);
        storeOtroObjeto.add({id2:reactivo.id, TipoRes: reactivo.TipoRes, fechaCreacion: Date.now()});
          //alert ("Elementos seleccionados"+llave);
          //var id2 = llave.value
          
          // objectStore2.add({id2:llave,fechaCreacion:Date.now()})

        }
      
      }
      // if(llave){
      //   var tx =db.transaction("preguntaReactivos","readwrite");
      //   var objectStore = tx.objectStore("preguntaReactivos");
      //    objectStore.add(llave)
      //  }
    }


// termina 
//-----------------------------------------------------------------------------------------------------------------------
//para mostrar reactivos predeterminados pestaña reactivo_categoria
    function buscar(){
      var cadena ="<table class= 'table table-bordered'>";
       //cadena += "";
       var num =0;
       var id_array = new Array();

       //leer cursor
       var objectStore = db.transaction("Encuesta_Reactivo").objectStore("Encuesta_Reactivo");
       objectStore.openCursor().onsuccess= function(e){
        var cursor = e.target.result;
        if(cursor){
          id = cursor.value.Descripcion;
          //cadena += "";
          cadena += "<tr>";
          cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
          cadena +="<td>"+cursor.value.Descripcion+"</td>";
          cadena += "<tr>";
          //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
          id_array.push(id);
          num ++;
          //continuamos siguiente objeto
          cursor.continue();

        }else{
          cadena += "</table>";
          document.getElementById("salida").innerHTML = cadena;

          for(var i=0; i<id_array.length; i++){
            document.getElementById("s"+id).onclick= selec2;
            id = id_array[i];
            //document.getElementById("m"+id).onclick= Editar;

          }
        }
       }
      
    }

    function selec2(e){
      // console.log("seleccionar",e);
      var id= e.target.id;

      var llave = id;
      console.log(id,llave);

      var llave = id.substring(1);
      //console.log(id,llave);

    
      if(confirm(llave)){
        var tx =db.transaction("Encuesta_Reactivo","readwrite");
        var objectStore = tx.objectStore("Encuesta_Reactivo");
        var request = objectStore.get(llave)
        request.onsuccess =function(){
        

         // alert ("Elementos seleccionados"+llave);
          var idP = llave.value
          var tx = db.transaction("predeSelec","readwrite");
          var objectStore = tx.objectStore("predeSelec");
           objectStore.add({idP:llave})

          // alert ("Elementos seleccionados"+llave);
        }
      
      }
      // if(llave){
      
      //  }
    }

    function predeSelecMos(){
      var cadena ="<table class= 'table table-bordered'>";
       //cadena += "";
       var num =0;
       var id_array = new Array();

       //leer cursor
       var objectStore = db.transaction("predeSelec").objectStore("predeSelec");
       objectStore.openCursor().onsuccess= function(e){
        var cursor = e.target.result;
        if(cursor){
          id = cursor.value.idP;
          //cadena += "";
          cadena += "<tr>";
          //cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
          cadena +="<td>"+cursor.value.idP+"</td>";
          cadena += "<tr>";
          //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
          id_array.push(id);
          num ++;
          //continuamos siguiente objeto
          cursor.continue();

        }else{
          cadena += "</table>";
          document.getElementById("salidapredeSelec").innerHTML = cadena;

          // for(var i=0; i<id_array.length; i++){
          //   document.getElementById("s"+id).onclick= selec;
          //   id = id_array[i];
          //   //document.getElementById("m"+id).onclick= Editar;

          // }
        }
       }

    }
    //mostrar los reactivos predetermiandos a la vista previa
  /*   function ReacPredeVista(){
      var cadena ="<table class= 'table table-bordered'>";
       //cadena += "";
       var num =0;
       var id_array = new Array();

       //leer cursor
       var objectStore = db.transaction("predeSelec").objectStore("predeSelec");
       objectStore.openCursor().onsuccess= function(e){
        var cursor = e.target.result;
        if(cursor){
          id = cursor.value.idP;
          //cadena += "";
          cadena += "<tr>";
          //cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
          cadena +="<td>"+cursor.value.idP+"</td>";
          cadena += "<tr>";
          //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
          id_array.push(id);
          num ++;
          //continuamos siguiente objeto
          cursor.continue();

        }else{
          cadena += "</table>";
          document.getElementById("salidapredeSelec2").innerHTML = cadena;

          // for(var i=0; i<id_array.length; i++){
          //   document.getElementById("s"+id).onclick= selec;
          //   id = id_array[i];
          //   //document.getElementById("m"+id).onclick= Editar;

          // }
        }
       }

    } */
 

    function EncuestaVistaPV2(){
      var transaction = db.transaction(["Encuesta"], "readwrite");
      var objectStore = transaction.objectStore("Encuesta");
      var index = objectStore.index("EncuestaTitulo");
      var index2 = objectStore.index("EncuestaObjetivo");
      var index3 = objectStore.index("EncuestaInstruccion");
      var newestItem = null;
      var newestItem2 = null
      var newestItem3 = null
      var newestItem4 = null
// Crear un cursor para recorrer los objetos en el índice
        var request = index.openCursor(null,'prev');
        var request = index2.openCursor(null,'prev');
        var request = index3.openCursor(null,'prev');
      request.onsuccess = function(event) {
        var cursor = event.target.result;
        newestItem4 = cursor.value.TituloE;

      if (!newestItem || Titulo.fechaCreacionE > newestItem.fechaCreacionE && !newestItem2 || floatingTextarea2.fechaCreacionE > newestItem2.fechaCreacionE  && !newestItem3 || floatingTextarea21.fechaCreacionE > newestItem3.fechaCreacionE ) {
       newestItem = Titulo;
       newestItem2 = floatingTextarea2;
       newestItem3 = floatingTextarea21;
       //newestItem4 = TituloE;
       //newestItem3 = cursor.value.Instrucciones;
        cursor.continue();
      }
      else {
      //   cadena += "<tr>";
      //   //cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
      //   cadena +="<td> Titulo: "+newestItem+"</td>"; cadena += "<tr>";
      //   cadena +="<td> Objetivo: "+newestItem2+"</td>"; cadena += "<tr>";
      //   cadena +="<td> Instrucciones: "+newestItem3+"</td>"; cadena += "<tr>";
      // //  cadena += "<tr>"; cadena +="<td> Objetivo: "+Objetivo+"</td>"; cadena += "<tr>";
      //   //cadena += "<tr>"; cadena +="<td> Instrucciones: "+newestItem3+"</td>";
      //   cadena += "<tr>";
        var cadena ="<table>";
        cadena += "<table class='table'>";
        cadena += "<div class='row'>";
        cadena += "<div class='col'>";
        cadena += "<h5>Título:</h5>";
        cadena += "<p>" + newestItem + "</p>";
        cadena += "</div>";
        cadena += "<div class='row'>";
        cadena += "<div class='col'>";
        cadena += "<h5>Objetivo:</h5>";
        cadena += "<p>" + newestItem2 + "</p>";
        cadena += "</div>";
        cadena += "<div class='row'>";
        cadena += "<div class='col'>";
        cadena += "<h5>Instrucciones:</h5>";
        cadena += "<p>" + newestItem3 + "</p>";
        cadena += "</div>";
        cadena += "</div>";
        cadena += "</table>";
        // Mostrar el objeto más reciente en la pantalla
        console.log(newestItem);
        console.log(newestItem4);
        console.log(newestItem2);
        cadena += "</table>";
        document.getElementById("Encabezado").innerHTML = cadena;
        

}

};

}




//termina 
//variables predeterminadas
//-----------------------------------------------------------------------------------------------------------------------
    function buscarV(){
      var cadena ="<table class= 'table table-bordered'>";
     
     cadena += "";
     var num =0;
     var id_array = new Array();
   
     //leer cursor
     var objectStore = db.transaction("Variables").objectStore("Variables");
     objectStore.openCursor().onsuccess= function(e){
      var cursor =e.target.result;
      if(cursor){
         id = cursor.value.NombreVar;
         cadena += "<tr>";
         cadena +="<td><input type ='checkbox' name='checkbox[]' id='c"+id+"'></input></td>";
         cadena +="<td>"+cursor.value.NombreVar+"</td>";
        //cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+id+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
                   //cadena += "<td><button id= 'e"+id+"'>Editar</button></td>"
                   //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
          cadena += "</tr>";
        
        //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
        
        id_array.push(id);
        num ++;
        //continuamos siguiente objeto
        cursor.continue();
        
      }else{
       
        cadena += "";
        document.getElementById("salida4").innerHTML = cadena;
        
        for(var i=0; i<id_array.length; i++){
          id = id_array[i];
          document.getElementById("c"+id).onclick= selecVariables;
   
        }
      
      }
     
     };
   BusVa();
   
   }
   
   function selecVariables(e){

             console.log("seleccionar",e);
             var id= e.target.id;
             var llave = id;
            //  console.log(id,llave);
           
             if(confirm(llave)){
               var tx =db.transaction("selecVariables","readwrite");
               var objectStore = tx.objectStore("selecVariables");
               var request = objectStore.add(llave );
   
               request.onsuccess =function(){
              //  console.log(llave)
               };
          
             }
             //guardar()
            //  activarGuardar();
         }

// salida de tipos encuesta
//mostrar 
//-----------------------------------------------------------------------------------------------------------------------
      //    function buscarE(){ 
      //     var cadena ="<table class= 'table table-bordered'>";
      //     var cadena = "";
      //     cadena += "";
      //     var num =0;
      //     var id_array = new Array();

      //     //leer cursor
      //     var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
      //     objectStore.openCursor().onsuccess= function(e){
            
      //      var cursor = e.target.result;
      //      if(cursor){
      //        Descripcion = cursor.value.Titulo;
      //        cadena += "";
             
      //        //cadena += "<div class= 'modal fade' id='mymodal3' tabindex='-1' aria-labelledby='mymodal3' aria-modal='true' style='display: none;' aria-modal='true' role='dialog'><div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'><div class='modal-content'></div></div></div>";
      //       cadena += "<button data-bs-toggle='modal' data-bs-target='#mymodal' ><img src=../Img/Form1.png width=200px height=320px></button>";
      //       //cadena += "<label>"+cursor.value.Titulo+"</label>"
      //       cadena += "<div class='p-3'> <label>"+cursor.value.Titulo+"</label></div>"
      //       //cadena += "<div class='p-3'> <button onclick='location.href='../pestañas_Encuestador/EncuestaApi.html'>"+cursor.value.Instrucciones+"</button></div>"
      //        //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
      //        cadena += "<tr>";
      //        id_array.push(Descripcion);
      //        num ++;
      //        //continuamos siguiente objeto
      //        cursor.continue();

      //      }else{
      //        cadena += "";
      //        cadena += "</table>"
      //        document.getElementById("crear_encuesta").innerHTML = cadena;

      //        for(var i=0; i<id_array.length; i++){
      //          id = id_array[i];
      //          //document.getElementById("m"+id).onclick= Editar;

      //        }
      //      }
      //     };
   
      //  }

      // function buscarE() {
      //   var cadena = "<table class='table table-bordered'>";
      //   var num = 0;
      //   var id_array = new Array();
      
      //   // Leer cursor
      //   var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
      //   objectStore.openCursor().onsuccess = function(e) {
      //     var cursor = e.target.result;
      //     if (cursor) {
      //      // var encuestaId = cursor.; // Obtener el ID de la encuesta
      //       var descripcion = cursor.value.Titulo;
      //       cadena += "<tr>";
      //       cadena += "<td><button data-encuesta-id='' class='ver-formulario-btn'>Ver formulario</button></td>";
      //       cadena += "<td>" + cursor.value.Titulo + "</td>";
      //       cadena += "</tr>";
      //       id_array.push(encuestaId);
      //       num++;
      //       // Continuamos con el siguiente objeto
      //       cursor.continue();
      //     } else {
      //       cadena += "</table>";
      //       document.getElementById("crear_encuesta").innerHTML = cadena;
      
      //       // Agrega el evento click a los botones "Ver formulario"
      //       var btns = document.getElementsByClassName("ver-formulario-btn");
      //       for (var i = 0; i < btns.length; i++) {
      //         btns[i].addEventListener("click", function(event) {
      //           var IdEn = event.target.getAttribute("data-encuesta-id");
      //           abrirPestanaConFormulario(IdEn);
      //         });
      //       }
      //     }
      //   };
      // }
      
      // function abrirPestanaConFormulario(IdEn) {
      //   // Abre una nueva pestaña
      //   var nuevaPestana = window.open("", "_blank");
      
      //   // Construye el contenido del formulario en la nueva pestaña
      //   var contenidoHTML = "<h2>Título de la Encuesta</h2>";
      
      //   // Obtiene el título de la encuesta
      //   var transaction = db.transaction("Encuesta", "readonly");
      //   var encuestaObjectStore = transaction.objectStore("Encuesta");
      //   var encuestaRequest = encuestaObjectStore.get(IdEn);
      
      //   encuestaRequest.onsuccess = function(event) {
      //     var encuesta = event.target.result;
      //     if (encuesta) {
      //       contenidoHTML += "<p>" + encuesta.Titulo + "</p>";
      
      //       // Filtra los reactivos correspondientes a la encuesta
      //       var reactivosObjectStore = db.transaction("EncuestaFinal", "readonly").objectStore("EncuestaFinal");
      //       var reactivosRequest = reactivosObjectStore.getAll();
      
      //       reactivosRequest.onsuccess = function(event) {
      //         var reactivos = event.target.result;
      //         if (reactivos) {
      //           var reactivosFiltrados = reactivos.filter(function(reactivo) {
      //             return reactivo.encuestaId === IdEn;
      //           });
      
      //           reactivosFiltrados.forEach(function(reactivo) {
      //             contenidoHTML += "<label for='reactivo" + reactivo.reactivoId + "'>Reactivo " + reactivo.reactivoId + "</label>";
      //             contenidoHTML += "<input type='checkbox' id='reactivo" + reactivo.reactivoId + "' name='reactivo" + reactivo.reactivoId + "'><br>";
      //           });
      
      //           // Inserta el formulario en la nueva pestaña
      //           nuevaPestana.document.open();
      //           nuevaPestana.document.write(contenidoHTML);
      //           nuevaPestana.document.close();
      //         }
      //       };
      //     }
      //   };
      // }
      
      // function abrirPestanaConFormulario(IdEn) {
      //   // Abre una nueva pestaña
      //   var nuevaPestana = window.open("", "_blank");
      
      //   // Construye el contenido del formulario en la nueva pestaña
      //   var contenidoHTML = "<h2>Título de la Encuesta</h2>";
      
      //   // Obtiene el título de la encuesta
      //   var transaction = db.transaction("Encuesta", "readonly");
      //   var encuestaObjectStore = transaction.objectStore("Encuesta");
      //   var encuestaRequest = encuestaObjectStore.get(IdEn);
      
      //   encuestaRequest.onsuccess = function(event) {
      //     var encuesta = event.target.result;
      //     if (encuesta) {
      //       contenidoHTML += "<p>" + encuesta.Titulo + "</p>";
      
      //       // Filtra los reactivos correspondientes a la encuesta
      //       var reactivosObjectStore = db.transaction("EncuestaFinal", "readonly").objectStore("EncuestaFinal");
      //       var reactivosRequest = reactivosObjectStore.getAll();
      
      //       reactivosRequest.onsuccess = function(event) {
      //         var reactivos = event.target.result;
      //         if (reactivos) {
      //           var reactivosFiltrados = reactivos.filter(function(reactivo) {
      //             return reactivo.encuestaId === IdEn;
      //           });
      
      //           reactivosFiltrados.forEach(function(reactivo) {
      //             contenidoHTML += "<label for='reactivo" + reactivo.reactivoId + "'>Reactivo " + reactivo.reactivoId + "</label>";
      //             contenidoHTML += "<input type='checkbox' id='reactivo" + reactivo.reactivoId + "' name='reactivo" + reactivo.reactivoId + "'><br>";
      //           });
      
      //           // Inserta el formulario en la nueva pestaña
      //           nuevaPestana.document.open();
      //           nuevaPestana.document.write(contenidoHTML);
      //           nuevaPestana.document.close();
      //         }
      //       };
      //     }
      //   };
      // }
      // function buscarE() {
      //   var cadena = "<table class='table table-bordered'>";
      //   var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
      //   objectStore.openCursor().onsuccess = function(e) {
      //     var cursor = e.target.result;
      //     if (cursor) {
      //       var encuestaId = cursor.value.IdEn;
      //       var descripcion = cursor.value.Titulo;
      //       cadena += "<tr>";
      //       cadena += "<td><button data-encuesta-id='" + encuestaId + "' class='ver-formulario-btn'>Ver formulario</button></td>";
      //       cadena += "<td>" + descripcion + "</td>";
      //       cadena += "</tr>";
      //       cursor.continue();
      //     } else {
      //       cadena += "</table>";
      //       document.getElementById("crear_encuesta").innerHTML = cadena;
  
      //       var btns = document.getElementsByClassName("ver-formulario-btn");
      //       for (var i = 0; i < btns.length; i++) {
      //         btns[i].addEventListener("click", function(event) {
      //           var IdEn = event.target.getAttribute("data-encuesta-id");
      //           abrirPestanaConFormulario(IdEn);
      //         });
      //       }
      //     }
      //   };
      // }
  

      // function buscarE() {
      //   var cadena = "<table class='table table-bordered'>";
      //   var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
      //   objectStore.openCursor().onsuccess = function(e) {
      //     var cursor = e.target.result;
      //     if (cursor) {
      //       var encuestaId = cursor.value.IdEn;
      //       var descripcion = cursor.value.Titulo;
      //       cadena += "<tr>";
      //       cadena += "<td><button data-encuesta-id='" + encuestaId + "' class='ver-formulario-btn'>Ver formulario</button></td>";
      //       cadena += "<td>" + descripcion + "</td>";
      //       cadena += "</tr>";
      //       cursor.continue();
      //     } else {
      //       cadena += "</table>";
      //       document.getElementById("crear_encuesta").innerHTML = cadena;
  
      //       var btns = document.getElementsByClassName("ver-formulario-btn");
      //       for (var i = 0; i < btns.length; i++) {
      //         btns[i].addEventListener("click", function(event) {
      //           var IdEn = event.target.getAttribute("data-encuesta-id");
      //           abrirPestanaConFormulario(IdEn);
      //         });
      //       }
      //     }
      //   };
      // }


      function buscarE() {
        var cadena = "<table class='table table-bordered'>";
        var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
        objectStore.openCursor().onsuccess = function(e) {
          var cursor = e.target.result;
          if (cursor) {
            var encuestaId = cursor.value.IdEn;
            var descripcion = cursor.value.Titulo;
            cadena += "<tr>";
           cadena += "<td align='center'><button data-encuesta-id='" + encuestaId + "' class='ver-formulario2-btn btn btn-outline-success bg-border-mostaza bg-text-mostaza'>Ver formulario</button></td>";
            
            cadena += "<td>" + descripcion + "</td>";
            cadena += "<td align='center'><button data-encuesta-id='R" + encuestaId + "' class='btn btn-outline-success bg-border-mostaza bg-text-mostaza me-md-2'>Ver</button></td>";
            cadena += "</tr>";
            cursor.continue();
          } else {
            cadena += "</table>";
            document.getElementById("crear_encuesta").innerHTML = cadena;
      
            var btns = document.getElementsByClassName("ver-formulario2-btn");
            for (var i = 0; i < btns.length; i++) {
              btns[i].addEventListener("click", function(event) {
                var IdEn = event.target.getAttribute("data-encuesta-id");
                abrirPestanaConFormulario(IdEn);
              });
            }
      
            var redireccionarBtns = document.getElementsByClassName("btn btn-outline-success bg-border-mostaza bg-text-mostaza me-md-2");
            for (var i = 0; i < redireccionarBtns.length; i++) {
              redireccionarBtns[i].addEventListener("click", function(event) {
                var IdEn = event.target.getAttribute("data-encuesta-id");
                redireccionarPagina(IdEn);
              });
            }
          }
        };
      }
      
      function redireccionarPagina(encuestaId) {
        // Aquí puedes redirigir a la página deseada utilizando el ID de la encuesta
        // Por ejemplo:
        window.location.href = "../pestañas_Encuestador/EncuestaApi.html";
      }
      
    

      // Función para abrir una nueva pestaña con el formulario de la encuesta
      // function abrirPestanaConFormulario(IdEn) {
      //   var nuevaPestana = window.open("", "_blank");
      //   var contenidoHTML = "<h2></h2>";
  
      //   var transaction = db.transaction("Encuesta", "readonly");
      //   var encuestaObjectStore = transaction.objectStore("Encuesta");
      //   var encuestaRequest = encuestaObjectStore.get(parseInt(IdEn));
  
      //   encuestaRequest.onsuccess = function(event) {
      //     var encuesta = event.target.result;
      //     if (encuesta) {
      //       contenidoHTML += "<p>" + encuesta.Titulo + "</p>";
  
      //       var reactivosObjectStore = db.transaction("EncuestaFinal", "readonly").objectStore("EncuestaFinal");
      //       var reactivosRequest = reactivosObjectStore.getAll();
  
      //       reactivosRequest.onsuccess = function(event) {
      //         var reactivos = event.target.result;
      //         if (reactivos) {
      //           var reactivosFiltrados = reactivos.filter(function(reactivo) {
      //             return reactivo.encuestaId === parseInt(IdEn);
      //           });
  
      //           reactivosFiltrados.forEach(function(reactivo) {
      //             contenidoHTML += "<label class= 'bg-text-black text-center p-3 text-uppercase text-black' for='reactivo" + reactivo.reactivoId + "'>Reactivo " + reactivo.reactivoId + "</label>";
      //             contenidoHTML += "<input class='form-control' type='text' id='reactivo" + reactivo.reactivoId + "' name='reactivo" + reactivo.reactivoId + "'><br>";
      //           });
  
      //           nuevaPestana.document.open();
      //           nuevaPestana.document.write(contenidoHTML);
      //           nuevaPestana.document.close();
      //         }
      //       };
      //     }
      //   };
      // }

      function abrirPestanaConFormulario(IdEn) {
        var nuevaPestana = window.open("", "_blank");
        var contenidoHTML = "<h2 class='bg-text-black text-center p-3 text-uppercase text-black'></h2>";
      
        var transaction = db.transaction("Encuesta", "readonly");
        var encuestaObjectStore = transaction.objectStore("Encuesta");
        var encuestaRequest = encuestaObjectStore.get(parseInt(IdEn));
      
        encuestaRequest.onsuccess = function(event) {
          var encuesta = event.target.result;
          if (encuesta) {
            contenidoHTML += "<h1 class='bg-text-black text-center p-3 text-uppercase text-black' style='text-align: center' font-size: 'x-large' padding: '10px 50px 20px'; font-weight: bold;'>" + encuesta.Titulo + "</h1>";
      
            var reactivosObjectStore = db.transaction("EncuestaFinal", "readonly").objectStore("EncuestaFinal");
            var reactivosRequest = reactivosObjectStore.getAll();
      
            reactivosRequest.onsuccess = function(event) {
              var reactivos = event.target.result;
              if (reactivos) {
                var reactivosFiltrados = reactivos.filter(function(reactivo) {
                  return reactivo.encuestaId === parseInt(IdEn);
                });
      
                reactivosFiltrados.forEach(function(reactivo) {
                  contenidoHTML += "<div style='text-align: center;'>";
                  contenidoHTML += "<label style=' color: black; padding: 10px 50px 20px;; text-transform: uppercase; font-weight: bold;' for='reactivo" + reactivo.reactivoId + "'>"+ reactivo.reactivoId + "</label>";
                  contenidoHTML += "<br>";
                  contenidoHTML += "<input class='form-control' type='text' id='reactivo" + reactivo.reactivoId + "' name='reactivo" + reactivo.reactivoId + "'><br>";
                  contenidoHTML += "</div>";
                });
      
                nuevaPestana.document.open();
                nuevaPestana.document.write(contenidoHTML);
                nuevaPestana.document.close();
              }
            };
          }
        };
      }
      

      function buscarEVar() {
        var cadena = "<table class='table table-bordered'>";
        var objectStore = db.transaction("Encuesta_Variables").objectStore("Encuesta_Variables");
        objectStore.openCursor().onsuccess = function(e) {
          var cursor = e.target.result;
          if (cursor) {
            var encuestaIdVar = cursor.value.id;
            var descripcionVar = cursor.value.Titulo;
            cadena += "<tr>";
           // cadena += "<td><button data-encuesta-id='" + encuestaId + "' class='ver-formulario-btn'>Ver formulario</button></td>";
            
            cadena += "<td align='center'>" + descripcionVar + "</td>";
            cadena += "<td align='center'><button id='v" + encuestaIdVar + "' class='ver-formulario-btn btn bg-border-mostaza bg-text-mostaza me-md-2'>Ver</button></td>";
            cadena += "</tr>";
            cursor.continue();
          } else {
            cadena += "</table>";
            document.getElementById("crear_encuestaVar").innerHTML = cadena;
      
          
      
            var redireccionarBtnsVar = document.getElementsByClassName("ver-formulario-btn bg-border-mostaza bg-text-mostaza me-md-2");
            for (var i = 0; i < redireccionarBtnsVar.length; i++) {
              redireccionarBtnsVar[i].addEventListener("click", function(event) {
                var id = event.target.getAttribute("id");
                redireccionarPaginaVar(id);
              });
            }
          }
        };
      }
      
      function redireccionarPaginaVar(encuestaIdVar) {
        // Aquí puedes redirigir a la página deseada utilizando el ID de la encuesta
        // Por ejemplo:
        window.location.href = "../pestañas_Encuestador/EncuestaFinalVariable.html";
      }

      //  function buscarVar(){
      //   var cadena ="<table class= 'table table-bordered'>";
      //   var num= 0;
      //   var ids_array = new Array();
      //   var objectStore = db.transaction("VariableC").objectStore("VariableC");
      //   objectStore.openCursor().onsuccess = function(e){
      //     var cursor = e.target.result;
      //     if(cursor){
      //       creV= cursor.value.creV;
      //       cadena += "<tr>";
      //       //cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
      //       cadena +="<td>"+cursor.value.creV+"</td>";
      //       cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'bo"+creV+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
      //       //cadena += "<td><button id= 'e"+id+"'>Editar</button></td>"
      //       //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
      //       cadena += "</tr>";
      //       ids_array.push(creV);
      //       num++;
      //       cursor.continue();
      
      //     }else{
      //       cadena += "</table>"
      //       document.getElementById("salidaVarC").innerHTML = cadena;
      
      //       for(var i=0; i<ids_array.length; i++){
      //         creV = ids_array[i];
      //         //document.getElementById("s"+id).onclick= selec;
      //         document.getElementById("bo"+id).onclick= borrarV;
      //       }
      //     }
         
      // }
      // function borrarV(e){
      //   console.log ('borrar',e)
      //   var creV = e.target.creV;
      //   var seguro = creV.substr(1)
      
      //   console.log(creV,seguro);
      //   if(seguro){
      //     var tx= db.transaction('VariableC','readwrite')
      //     var objectStore =tx.objectStore('VariableC')
      //     var request= objectStore.delete(seguro);
          
      //   request.onsuccess =function (e){
      //     alert("eliminado"+seguro)
         
      //   }
      
      //   }
      //   buscarVar()
       
      //   }
        
      // }
//-----------------------------------------------------------------------------------------------------------------------
      function buscarVar2(){
        var cadena ="<table class= 'table table-bordered'>";
        var num= 0;
        var ids_array = new Array();
        var objectStore = db.transaction("VariableC").objectStore("VariableC");

        cadena +=  "<thead>";

        cadena += "<tr>";
        cadena +="<th scope='col' >Nombre</th>";
        cadena +="<th scope='col' >Sigla</th>";
        cadena +="<th scope='col' >Descripción</th>";
        cadena += "</tr>";
        cadena +=  "</thead>";
        objectStore.openCursor().onsuccess = function(e){
          var cursor2 = e.target.result;
          
          if(cursor2){
            creV= cursor2.value.creV;
            sigla = cursor2.value.sigla;
            descripcion = cursor2.value.descripcion;
            
            cadena += "<tr>";
            // cadena +="<td><input type ='checkbox' id='s"+creV+"'></input></td>";
            cadena +="<td>"+cursor2.value.creV+"</td>";
            cadena +="<td>"+cursor2.value.sigla+"</td>";
            cadena +="<td>"+cursor2.value.descripcion+"</td>";
            // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+creV+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
            // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'e"+creV+"'><img src='../Img/edit.svg' height='18px width='18px'></button></td>";
            //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
            cadena += "</tr>";
            ids_array.push(creV);
            num++;
            cursor2.continue();
      
          }else{
            cadena += "</table>"
            document.getElementById("salidaVarC2").innerHTML = cadena;
      
            for(var i=0; i<ids_array.length; i++){
              id = ids_array[i];
              document.getElementById("s"+id).onclick= selec;
              document.getElementById("e"+id).onclick= modificar;
              document.getElementById("b"+id).onclick= borrar;
            }
          }
         
    }
      }

    
      //Crear encuesta variable
//-----------------------------------------------------------------------------------------------------------------------
      function CrearEncuestaV() {
        
        var titulo = document.getElementById("Titulo").value.trim();
        var Objetivo = document.getElementById("floatingTextarea2").value.trim();
        var Instrucciones = document.getElementById('floatingTextarea21').value.trim();
        var form = document.getElementById('formularioCR');

      form.addEventListener('submit', function(eve){
      eve.preventDefault();
      var request = db.transaction(["Encuesta_Variables"], "readwrite").objectStore("Encuesta_Variables")
      .add({Titulo:titulo, Objetivo:Objetivo, Instrucciones:Instrucciones});

      request.onsuccess = function(e){
      
         console.log(e);
         alert("se inserto los datos");    
      };
      if(titulo.value === null ||  titulo.value === ''){
        alert("Ingrese un titulo");
      }
      if(Objetivo.value === null ||  Objetivo.value === ''){
        alert("Ingrese un Objetivo");
      }
      if(Instrucciones.value === null ||  Instrucciones.value === ''){
        alert("Ingrese Instrucciones");
      }
      return false;

    })
        //validarER() 
       }
// crear encuesta reactivos ------------------------------------------------------------------------------
        // function CrearEncuesta() {
        
        //   var Titulo = document.getElementById("Titulo").value.trim();
        //   var Objetivo = document.getElementById("floatingTextarea2").value.trim();
        //   var Instrucciones = document.getElementById('floatingTextarea21').value.trim();


        //   // Variable form confirmar funcionamiento
        //   // var form = document.getElementById('formularioR');

        // // form.addEventListener('submit', function(eve){
        // // eve.preventDefault();
        // var request = db.transaction(["Encuesta"], "readwrite").objectStore("Encuesta")
        // .add({Titulo:Titulo, Objetivo:Objetivo, Instrucciones:Instrucciones});

        // request.onsuccess = function(e){
        
        //    console.log(e);
        //    alert("Datos insertados", request.result);
        //   //  buscar();
        //   //  buscar2();
        //   //  buscarE();   
        // };
        // if(Titulo.value === null ||  Titulo.value === ''){
        //   alert("Ingrese un titulo");
        // }
        // if(Objetivo.value === null ||  Objetivo.value === ''){
        //   alert("Ingrese un Objetivo");
        // }
        // if(Instrucciones.value === null ||  Instrucciones.value === ''){
        //   alert("Ingrese Instrucciones");
        // } 
        // return false;


      
        //   //validarER() 
        //  }
        
      // function relacionReactivo(){
      
      // var correo = document.getElementById('Usuario').value;
      
      // var request = db.transaction(["relacionReactivo"], "readwrite").objectStore("relacionReactivo").put({correo:correo});
      

      // request.onsuccess = function(e){
      //  if (correo == request.value.correo){
      //   relacionReactivo (window.location.href='../pestañas_Encuestador/crear.html')
      //  }
      // //   var request2 = db.transaction(["relacionReactivo"], "readwrite").objectStore("relacionReactivo")
      // // .put({idR})
      // // var idR = document.getElementById("ReactivoCre").value.trim();
      // // request2.onsuccess = function(e){
        
      // //   console.log(e);
      
      // // }
      // //   console.log(e);
      
      // }
     
 
      // }
         function CrearReactivo(){
          //control();
          // var url_string = window.location.href="/pestañas_Encuestador/reactivo_crear_reactivos.html"; //
          // var url = new URL(url_string);
          // var c = url.searchParams.get("Usuario");
          // document.getElementById("aqui").value = c;

         var creador = document.getElementById("aqui").value; 
          var id = document.getElementById("ReactivoCre").value.trim();
          var CategoriaReactivo=document.getElementById("CategoriaReactivos").value.trim();
          var owned = document.getElementById('inlineCheckbox1').checked;
          var TipoRes = document.getElementById('TipoRes').selectedIndex;
          var fechaCreacionReactivo = document.getElementById("fechaCreacion");
          
          // var transaction = db.transaction(["Autenticasion"],"readonly");
          // var store2 = transaction.objectStore("Autenticasion");
          //var request2 = store2.get(Usuario)
          
          
          var Crear = {
           id,
           CategoriaReactivo,
            owned,
            TipoRes,
            creador,
            fechaCreacionReactivo:value= Date.now()
            
           // request2
          };

          let tx = makeTX('Reactivos','readwrite');
          tx.oncomplete = (ev) =>{
              console.log (ev);
          };
          let store = tx.objectStore('Reactivos');
          let request = store.put(Crear);

          request.onsuccess = (ev) => {
            //reactivoscrear();
            console.log('successfully added an object',ev);
            mostrarPreguntas(); 

          };

          function makeTX(storeName, mode) {
            let tx = db.transaction(storeName, mode);
            tx.onerror = (eve) => {
              console.warn(eve);
            };
            return tx;
        }
        buildList()
        //crearReactivos()
      }
      
      //para mostrar vista previa de reactivos creados / habilitado para editar
            //request an insert/add
    function buildList() {
      //use getAll to get an array of objects from our store
      let list = document.querySelector('.wList');
      list.innerHTML = '<li>Loading...</li>';
      let tx = db.transaction('Reactivos', 'readwrite');
      tx.oncomplete = (ev) => {
        //transaction for reading all objects is complete
      };
      let store = tx.objectStore('Reactivos');
      let getReq = store.getAll();
      console.log(getReq);
      //returns an array
      //option can pass in a key or a keyRange
      getReq.onsuccess = (ev) => {
        //getAll was successful
        let request = ev.target; //request === getReq === ev.target
        console.log({request});
        var Crear=[];
        list.innerHTML = request.result.map((Crear) => {
            return `<li data-key="${Crear.id}"><span>${Crear.id}</span></li>`;
            //return `<p>hola</p>`;
          })
          .join('\n');
      };
      getReq.onerror = (err) => {
        console.warn(err);
      };
      document.querySelector('.wList').addEventListener('click', (ev) => {
        let li = ev.target.closest('[data-key]');
        let id = li.getAttribute('data-key')  ;
        console.log(li, id);
    
        let tx = db.transaction('Reactivos', 'readwrite');
        let store = tx.objectStore('Reactivos');
        let req = store.get(id);
  
        req.onsuccess = (ev) => {
          let request = ev.target.result;
          document.getElementById("ReactivoCre").value=request.id;
          document.getElementById("CategoriaReactivos").value=request.CategoriaReactivo;
        document.getElementById('inlineCheckbox1').checked =request.owned;
        document.getElementById('TipoRes').checked =request.TipoRes;
     
   
          //document.whiskeyForm.setAttribute('data-key', request.id);
        };
        req.onerror = (err) => {
          console.warn(err);
        };
      });
    
      //CrearReactivo();

    // borrar();

     
    }
//-----------------------------------------------------------------------------------------------------------------------
//crear una nueva variable
    function CrearVariable(){
      var creV = document.getElementById("NomV").value.trim();
      var sigla = document.getElementById("SiglaV").value.trim();
      var descripcion = document.getElementById("desV").value.trim();
      let CrearV = {
       creV,
       sigla,
        descripcion,
        
      };

      let xt = makeXT('VariableC','readwrite');
      xt.oncomplete = (ev) =>{
          console.log (ev);
      };
      let object = xt.objectStore('VariableC');
      let request = object.put(CrearV);

      request.onsuccess = (ev) => {
        console.log('successfully added an object',ev);
      }

      function makeXT(storeName, mode) {
        let xt = db.transaction(storeName, mode);
        xt.onerror = (eve) => {
          console.warn(eve);
        };
        return xt;
    }
    buscarVar()
    busVaC()
   // buscarLista()
  }

  //crear una nueva variable
  function editarvariable(){
    var creV = document.getElementById("NomV").value.trim();
    var sigla = document.getElementById("SiglaV").value.trim();
    var descripcion = document.getElementById("desV").value.trim();
    let CrearV = {
     creV,
     sigla,
      descripcion,
      
    };

    let xt = makeXT('VariableC','readwrite');
    xt.oncomplete = (ev) =>{
        console.log (ev);
    };
    let object = xt.objectStore('VariableC');
    let request = object.put(CrearV);

    request.onsuccess = (ev) => {
      console.log('successfully added an object',ev);
    }

    function makeXT(storeName, mode) {
      let xt = db.transaction(storeName, mode);
      xt.onerror = (eve) => {
        console.warn(eve);
      };
      return xt;
  }
  buscarVar()
  busVaC()
 // buscarLista()
}



//-----------------------------------------------------------------------------------------------------------------------
  function buscarVar(){


    var cadena ="<table class= 'table table-bordered'>";
    
    var num= 0;
    var ids_array = new Array();
    var objectStore = db.transaction("VariableC").objectStore("VariableC");
    // var ObjectStore = db.transaction("Usuario").objectStore("Usuario");

    objectStore.openCursor().onsuccess = function(e){
      var cursor = e.target.result;
      if(cursor){
        creV= cursor.value.creV;
        cadena += "<tr>";
        cadena +="<td><input type ='checkbox' id='s"+creV+"'></input></td>";
        cadena +="<td>"+cursor.value.creV+"</td>";
        cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+creV+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
        cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'e"+creV+"'><img src='../Img/edit.svg' height='18px width='18px'></button></td>";
        //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
        cadena += "</tr>";
        ids_array.push(creV);
        num++;
        cursor.continue();
  
      }else{
        cadena += "</table>"
        document.getElementById("salidaVarC").innerHTML = cadena;
  
        for(var i=0; i<ids_array.length; i++){
          id = ids_array[i];
          document.getElementById("s"+id).onclick= selec;
          document.getElementById("e"+id).onclick= modificar;
          document.getElementById("b"+id).onclick= borrar;
        }
      }
    };
      //   ObjectStore.openCursor().onsuccess = function(e){
      //   var cursor = e.target.result;
      //   if(cursor){
      //     Nombre= cursor.value.Nombre;
      //     cadena += "<tr>";
      //     // cadena +="<td><input type ='checkbox' id='s"+Nombre+"'></input></td>";
      //     cadena +="<td>"+cursor.value.Nombre+"</td>";
      //     // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+creV+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
      //     // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'e"+creV+"'><img src='../Img/edit.svg' height='18px width='18px'></button></td>";
      //     // //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
      //     // cadena += "</tr>";
      //     ids_array.push(Nombre);
      //     num++;
      //     cursor.continue();
    
      //   }else{
      //     cadena += "</table>"
      //     document.getElementById("Prueba").innerHTML = cadena;
    
      //     // for(var i=0; i<ids_array.length; i++){
      //     //   id = ids_array[i];
      //     //   document.getElementById("s"+id).onclick= selec;
      //     //   document.getElementById("e"+id).onclick= modificar;
      //     //   document.getElementById("b"+id).onclick= borrar;
      //     // }
      //   }

        
      // }



function borrar(e){
  // console.log ('borrar',e)
  var id = e.target.id;
  var llave = id.substr(1)
  // console.log(id,llave);
  if(llave){
    db.transaction('VariableC','readwrite')
    .objectStore('VariableC')
    .delete(llave),
    borraactu();
  }

  request.onsuccess =function (e){
    // alert("eliminado"+llave)
   
  }
buscarVar();
 }





function modificar(e){


  var id = e.target.id;
  var llave = id.substr(1);
  // console.log(id,llave);

  var tx = db.transaction(["VariableC"],"readonly");
  var objectStore = tx.objectStore("VariableC");
  var request = objectStore.get(llave);

  request.onerror = function(e){
    alert("No se puedelos datos de la llave"+llave);
  };
  request.onsuccess = function(e){
    if(request.result){
 document.getElementById("NomV").value= request.result.creV;
 document.getElementById("SiglaV").value= request.result.sigla;
 document.getElementById("desV").value= request.result.descripcion;
 activarGuardar();
    }
else{
  //  alert("No se puede leer" +llave);
}
  };

} 
  }
//selecionar las variables 
//-----------------------------------------------------------------------------------------------------------------------
function seleccionarvar(){
  var cadena ="<table class= 'table table-bordered'>";
  var num= 0;
  var ids_array = new Array();
  var objectStore = db.transaction("VariableC").objectStore("VariableC");
  // var ObjectStore = db.transaction("Usuario").objectStore("Usuario");

  objectStore.openCursor().onsuccess = function(e){
    var cursor = e.target.result;
    if(cursor){
      creV= cursor.value.creV;
      cadena += "<tr>";
      cadena +="<td><input type ='checkbox' id='s"+creV+"'></input></td>";
      cadena +="<td>"+cursor.value.creV+"</td>";
      // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+creV+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
      // cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'e"+creV+"'><img src='../Img/edit.svg' height='18px width='18px'></button></td>";
      //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
      cadena += "</tr>";
      ids_array.push(creV);
      num++;
      cursor.continue();

    }else{
      cadena += "</table>";
      document.getElementById("salidaseleccionar").innerHTML = cadena;

      for(var i=0; i<ids_array.length; i++){
        id = ids_array[i];
        document.getElementById("s"+id).onclick= seleccionarr;

      }
    }
  };

}


function seleccionarr(e){
  // console.log("seleccionar",e);
  var id= e.target.id;
  var llave = id.substring(1);
  // console.log(id,llave);

  if(confirm(llave)){
    var tx =db.transaction("Reactivos","readwrite");
    var objectStore = tx.objectStore("Reactivos");
    var request = objectStore.get(llave);
    request.onsuccess =function(){
      let  nombres = [llave];

      for(var i=0; i<nombres.length; i++){
        nom = nombres[i];
        console.log(nom);
      }
     
    };
  
  }
  //  if(confirm(llave)){
  //   var tx =db.transaction("preguntaReactivos","readwrite");
  //   var objectStore = tx.objectStore("preguntaReactivos");
  //   var request = objectStore.get(llave);
  //   request.onsucces = function(){
  //     alert("No se puede leer" +llave)
  //   }
  //  }
}
//-----------------------------------------------------------------------------------------------------

        //request an insert/add
// function buscarLista() {
//   //use getAll to get an array of objects from our store
//   var list2 = document.querySelector('.listV');
//   list2.innerHTML = `<li>Loading...</li>`;
//   var xt = db.transaction('VariableC', 'readwrite');
//   xt.oncomplete = (ev) => {
//     //transaction for reading all objects is complete
//   };
//   let object = xt.objectStore('VariableC');
//   let req = object.getAll();
//   //returns an array
//   //option can pass in a key or a keyRange
//   req.onsuccess = (ev) => {
//     //getAll was successful
//     var request2 = ev.target; //request === getReq === ev.target
//     console.log({ request2 });
//     list2.innerHTML = request2.result
//       .map((CrearV) => {
//         return `<li data-key="${CrearV.creV}"><span>${CrearV.creV}</span></li>`;
//       })
//       .join('\n');
//   };
//   req.onerror = (err) => {
//     console.warn(err);
//   };
//   document.querySelector('.listV').addEventListener('click', (ev) => {
//     var li2 = ev.target.closest('[data-key]');
//     var creV = li2.getAttribute('data-key')  ;
//     console.log(li2, creV);

//     var xt = db.transaction('VariableC', 'readwrite');
//     var object = xt.objectStore('VariableC');
//     var req = object.get(creV);
//     req.onsuccess = (ev) => {
//       var request = ev.target.result;
     
//    document.getElementById("NomV").value= request.creV;
//      document.getElementById("SiglaV").value= request.sigla;
//      document.getElementById("desV").value= request.descripcion;
//       //document.whiskeyForm.setAttribute('data-key', request.id);
//     };
//     req.onerror = (err) => {
//       console.warn(err);
//     }
//   })
//   buscarVar()
//   busVaC()
// }
//busVaC()
//mostrar pestaña variable_crear_variable pulsando boton guardar 
function busVaC(){
  var columnas = parseInt(prompt("columnas"));
  var filas= parseInt(prompt("colum"));  
  var cadena ="<table class= 'table table-bordered'>"
  var cadena2 = document.querySelector("table>tbody")
  // var cadenaX = "<select class="+"form-select form-select-sm"+" aria-label="+".form-select-sm example"+">"+"<option selected>Opciones</option>"
  // +"<option value="+"0"+">0</option>"
  // +"<option value="+"1"+">1</option>"
  // +"<option value="+"2"+">2</option>"
  // +"<option value="+"3"+">3</option>"
  // +"<option value="+"4"+">P</option>"+
  // "</select>"
  var num = 0;
  var ids_array = new Array();

  cadena +="<th>#</th>"

  var objectStore = db.transaction("VariableC").objectStore("VariableC");

  
  objectStore.openCursor().onsuccess= function(e){
   

    
   var cursor = e.target.result;
   if(cursor){
   
 
    

  var columna = cursor.value.creV;
//  console.log(cursor.value.creV);
        
  cadena += "<th>"+cursor.value.creV+"</th>";
  //cadena+="<tr><td>"+ "<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td></tr>"
  
 
       
  for(i=0; i<filas;i++){
   cadena2 +="<tr>";
   
   // cadena += "<th>"+cursor.value.NombreVar+"</th>"
  
    for(j=0; j<columnas;j++){
      //"<th>"+cursor.value.NombreVar+"</th>"
      cadena2 += "<td>"+cursor.value.creV+"</td>";
      //cadena2 += "<td>"+cursor.value.NombreVar+"</td>";
       
      // if((filas>= 1 && filas<=2) && (columna >=1 && columna <=2)){
      //   let celdas = document.querySelector("table>tbody")
      // celdas[columna -1].innerHTML = "<td>"+ "<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td>"
      // }
      //cadena +="<th>"+curRes.value.NombreVar+","+curRes.value.NombreVar+"</th>"
       
    }
    for(i= 0; i<filas;i++){
      cadena2+= "<td>"+"<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td>";

    }
      }
      cadena2 +="</tr>"
   
    cursor.continue();
    num++
   }else{
   
document.getElementById("salidaV").innerHTML= cadena+cadena2;
    cadena +="</table>";
  
   }
  
  } 
}

  
function TiposOnChange(sel) {
          
  if (sel.value=="3"){ 
    var   divC = document.getElementById("Opcion");
       divC.style.display = "";

       divT = document.getElementById("Respuestas");
       divT.style.display = "none";

  }else if (sel.value=="4"){

    var   divC = document.getElementById("Respuestas");
       divC.style.display="none";

       divT = document.getElementById("Opcion");
       divT.style.display = "";
         
  }else {
   var divC = document.getElementById("Respuestas");
       divC.style.display="none";

       divT = document.getElementById("Opcion");
       divT.style.display = "none";
  }

  tipoR();
}



//Función para gusrdar tipo de respuesta
         function tipoR(){
          var TipoRes= document.getElementById("TipoRes").selectedIndex;
          var idR = document.getElementById("ReactivoCre").value

          var TipoR = db.transaction(["TipoRes"], "readwrite")
          .objectStore("TipoRes")
          if(TipoR == ''){
          TipoR.add({TipoRes:TipoRes});
          }else{
            if(TipoRes == 1){
              TipoR.add({TipoRes:'Abierta',idR:idR});
            }
            if(TipoRes == 2){
              TipoR.add({TipoRes:'Cerrada',idR:idR});
            }
            if(TipoRes == 3){
              TipoR.add({TipoRes:'Opcion_Mul',idR:idR});
             
             
          }
            if(TipoRes == 4){
              TipoR.add({TipoRes:'Opcion_Mul_Uno',idR:idR});
            }
          }

          TipoR.onsuccess = function(e){
            console.log(e);
          }
          ResOpMul();
         }

         function NumOpMul(){  
              var Res= document.getElementById("respuestasSelec").selectedIndex;
               var NumOpMul = db.transaction(["ReacOpMul"], "readwrite")
          .objectStore("ReacOpMul")
          if(Res == ''){
           alert('seleccione la cantidad de posibles respuestas');
            }else{
              if(Res == 1){
                NumOpMul.add({Res:'1'});
          
              }
              if(Res == 2){
                NumOpMul.add({Res:'2'});
                
              }
              if(Res == 3){
                NumOpMul.add({Res:'3'});
               
              }
              if(Res == 4){
                NumOpMul.add({Res:'4'});
               
              if(Res == 5){
                NumOpMul.add({Res:'5'});
              }
            }
          
            NumOpMul.onsuccess = function(e){
              console.log(e);
             
            }
         }
         ResOpMul()
        }

function ResOpMul(){
  var respuesta = document.getElementById("Respuesta1").value.trim();
  var respuesta2 = document.getElementById("Respuesta2").value.trim();
  var respuesta3 = document.getElementById("Respuesta3").value.trim();
  var respuesta4 = document.getElementById("Respuesta4").value.trim();
  var respuesta5 = document.getElementById("Respuesta5").value.trim();

  var ResOpMul = db.transaction(["ReOpM"], "readwrite").objectStore("ReOpM");

  if(respuesta ==''){
    alert("Escriba una respuesta ");
  }else{
      ResOpMul.add({Respuesta:respuesta,Respuesta2:respuesta2,Respuesta3:respuesta3,Respuesta4:respuesta4,Respuesta5:respuesta5})
  } 
    ResOpMul.onsuccess = function(e){
    console.log(e);
  }
}

       //cursor con preguntas ya predeterminadas
        

      
       var encuestaId;
          
        //guardar en base de datos
      function creEncuestaR(){
        var creador = document.getElementById("aqui").value; 
        var Titulo = document.getElementById("Titulo").value.trim();
        var Objetivo = document.getElementById("floatingTextarea2").value.trim();
        var Instrucciones = document.getElementById('floatingTextarea21').value.trim();
        var fechaCreacionE = document.getElementById("fechaCreacionE");
        var form = document.getElementById('formulario');

      form.addEventListener('submit', function(eve){
      eve.preventDefault();
      var request = db.transaction(["Encuesta"], "readwrite")
      .objectStore("Encuesta")
      .add({creador:creador,Titulo:Titulo, Objetivo:Objetivo, Instrucciones:Instrucciones,fechaCreacionE:value=Date.now()});

      request.onsuccess = function(e){
       encuestaId = e.target.result;
        console.log("Encuesta creada con id: ", encuestaId);
        reactivoscrear(encuestaId);
      
         console.log(e);
         alert("se inserto los datos");
         //buscar();
         //buscar2();
         buscarE();   
        // encuestaF()
        EncuestaVistaPV2()
       // Ef()
         //EncuestaVistaP();
         selec(encuestaId);
      };
      
    })
   
    }
          // Funcion para mostrar contenido de select 



// //Guardamos en una variable 
// var   idSelec = document.getElementById("respuestasSelec");
// var pro = idSelec.options[idSelect.selectedIndex].value;
// //Creamos un nodo de texto que agregaremos al div.
// pro.addEventListener('change', 

// function pro () {
//   var proOpcion = this.options[pro.selectedIndex];
//  // console.log(proOpcion.value + ': ' + proOpcion.value);

//   var CadeNumero = proOpcion ;

//   CadeNumero  = Number.parseFloat(proOpcion);
//   console.log(CadeNumero);


// // $(document).ready(function(){

// //   $(CadeNumero).click(function(){

// });
//      var contador = CadeNumero;

     function TiposOpciones(sel) {
        
      if (sel.value=="11"){ 
        var   divC = document.getElementById("Opcion1");
           divC.style.display = "";

       var   divT = document.getElementById("Opcion2");
           divT.style.display = "none";

       var    divX = document.getElementById("Opcion3");
           divX.style.display = "none";

       var    divA = document.getElementById("Opcion4");
           divA.style.display = "none";
           
       var    divT = document.getElementById("Opcion5");
           divT.style.display = "none";


      }else if (sel.value=="12"){
   
      var  divC = document.getElementById("Opcion1");
        divC.style.display = "";

      var divT = document.getElementById("Opcion2");
        divT.style.display = "";

      var  divX = document.getElementById("Opcion3");
        divX.style.display = "none";

      var  divA = document.getElementById("Opcion4");
        divA.style.display = "none";
        
      var  divT = document.getElementById("Opcion5");
        divT.style.display = "none";

             
      }else if (sel.value=="13") {
        divC = document.getElementById("Opcion1");
           divC.style.display = "";

           divT = document.getElementById("Opcion2");
           divT.style.display = "";

           divX = document.getElementById("Opcion3");
           divX.style.display = "";

           divA = document.getElementById("Opcion4");
           divA.style.display = "none";
           
           divT = document.getElementById("Opcion5");
           divT.style.display = "none";

      }else if (sel.value=="14") {
        divC = document.getElementById("Opcion1");
           divC.style.display = "";

           divT = document.getElementById("Opcion2");
           divT.style.display = "";

           divX = document.getElementById("Opcion3");
           divX.style.display = "";

           divA = document.getElementById("Opcion4");
           divA.style.display = "";
           
           divT = document.getElementById("Opcion5");
           divT.style.display = "none";

      }else if (sel.value=="15") {
        divC = document.getElementById("Opcion1");
           divC.style.display = "";

           divT = document.getElementById("Opcion2");
           divT.style.display = "";

           divX = document.getElementById("Opcion3");
           divX.style.display = "";

           divA = document.getElementById("Opcion4");
           divA.style.display = "";
           
           divT = document.getElementById("Opcion5");
           divT.style.display = "";

      }else{
        divC = document.getElementById("Opcion1");
           divC.style.display = "none";

           divT = document.getElementById("Opcion2");
           divT.style.display = "none";

           divX = document.getElementById("Opcion3");
           divX.style.display = "none";

           divA = document.getElementById("Opcion4");
           divA.style.display = "none";
           
           divT = document.getElementById("Opcion5");
           divT.style.display = "none";
      }
      NumOpMul();

}

   //mostrar reactivo segun categoria
function buscar3(){
  
  var cadena3 ="<table class= 'table table-bordered'>";
  cadena3 += "";
  var num =0;
   var id_array = new Array();

//   //leer cursor
  var objectStore = db.transaction("Encuesta_Reactivo").objectStore("Encuesta_Reactivo");
  var index = objectStore.index("Cate");
  var tipo= document.getElementById("Categorias_R").selectedIndex;
  
             if(tipo==""){
              alert("categoria no encontrada")

             } else{
              if(tipo==1){
                document.getElementById("salida").style.display ="none"
                index.openCursor("Miel").onsuccess= function(e){

                  var cursor = e.target.result;
                  if(cursor){
                    cadena3+= "<tr>"
                    id = cursor.value.Descripcion;
                    cadena3 +="<td><input type ='checkbox' id='s"+index+"'></input></td>";
                   // cadena3 +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
                    cadena3 +="<td>"+cursor.value.Descripcion+"</td>";
                    cadena3+= "<tr>";
                    //cadena3 += "";
                    // cadena3+="<input name='checkR'class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>"+cursor.value.Descripcion+"<br></td>"
                    //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
                    id_array.push(id);
                    num ++;
                    //continuamos siguiente objeto
                    cursor.continue();
      
                  }else{
                    cadena3 += "";
                    document.getElementById("salida3").innerHTML = cadena3;
      
                    for(var i=0; i<id_array.length; i++){
                      document.getElementById("s"+index).onclick= selec2;
                      id = id_array[i];
                      //document.getElementById("m"+id).onclick= Editar;
      
                    }
                  }
                 }
            
              }
              if(tipo==2){
             
                //document.getElementById("salida3").style.display ="none"
                //document.getElementById("salida").style.display ="none"
                index.openCursor("Agricultura").onsuccess= function(e){

                  var cursor = e.target.result;
                  if(cursor){
                    index = cursor.value.Descripcion;
                    cadena3 += "";
                    cadena3 +="<td><input type ='checkbox' id='s"+index+"'></input></td>";
                    cadena3 +="<td>"+cursor.value.Descripcion+"</td>";
                    //cadena3+="<input name='checkR'class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>"+cursor.value.Descripcion+"<br></td>"
                    //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
                    id_array.push(index);
                    num ++;
                    //continuamos siguiente objeto
                    cursor.continue();
      
                  }else{
                    cadena3 += "";
                    document.getElementById("salida3").innerHTML = cadena3;
      
                    for(var i=0; i<id_array.length; i++){
                      id = id_array[i];
                      document.getElementById("s"+index).onclick= selec2;
                      id = id_array[i];
                      //document.getElem
                      //document.getElementById("m"+id).onclick= Editar;
      
                    }
                  }
                 }
              }
              if(tipo==3){
             
                //document.getElementById("salida3").style.display ="none"
                //document.getElementById("salida").style.display ="none"
                index.openCursor("Ganaderia").onsuccess= function(e){

                  var cursor = e.target.result;
                  if(cursor){
                    index = cursor.value.Descripcion;
                    cadena3 += "";
                    cadena3+="<input name='checkR'class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>"+cursor.value.Descripcion+"<br></td>"
                    //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
                    id_array.push(index);
                    num ++;
                    //continuamos siguiente objeto
                    cursor.continue();
      
                  }else{
                    cadena3 += "";
                    document.getElementById("salida3").innerHTML = cadena3;
      
                    for(var i=0; i<id_array.length; i++){
                      id = id_array[i];
                      //document.getElementById("m"+id).onclick= Editar;
      
                    }
                  }
                 }
              }
              if(tipo==4){
             
                //document.getElementById("salida3").style.display ="none"
                //document.getElementById("salida").style.display ="none"
                index.openCursor("Otro").onsuccess= function(e){

                  var cursor = e.target.result;
                  if(cursor){
                    index = cursor.value.Descripcion;
                    cadena3 += "";
                    cadena3+="<input name='checkR'class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>"+cursor.value.Descripcion+"<br></td>"
                    id_array.push(index);
                    num ++;
                    //continuamos siguiente objeto
                    cursor.continue();
      
                  }else{
                    cadena3 += "";
                    document.getElementById("salida3").innerHTML = cadena3;
      
                    for(var i=0; i<id_array.length; i++){
                      id = id_array[i];
                      //document.getElementById("m"+id).onclick= Editar;
      
                    }
                  }
                 }
              }
   }      
             
};

        // function CrearVariable(){
        //   var VariableNombre = document.getElementById("NomV").value.trim();
        //   var sigla = document.getElementById("SiglaV").value.trim();
        //   var descripcion = document.getElementById("desV").value.trim();
          
        //   var request = db.transaction(["VariableC"], "readwrite")
        //   .objectStore("VariableC")
        //   .add({VariableNombre:VariableNombre, sigla:sigla, descripcion:descripcion});
          

        //   request.onsuccess = function(e){
        //      console.log(e);
        //      alert("se inserto los datos");
      
             
            
        //   };
        //  }
        //Funcion para habilitar boton crear encuesta
  // let form = document.querySelector("#formulario");
  // let btn = document.querySelector("#boton-crear-encuesta");

  // function validarbtn (){
  //   let desabilitar = false;

  //   if(form.Titulo.value === ""){
  //     desabilitar = true;
  //   }
  //   if(desabilitar === true){
  //     btn.disabled = true;
  //   }else {
  //     btn.disabled = false;
  //   }
  // }
  
  // form.addEventListener("keyup", validarbtn)
          

        

//VARIABLE




     
      
      //   var fila="<tr><td>"+id+"</td></tr>";
      //   var fila2="<th>"+id+"</th>";
      //   var btn = document.createElement("TR");
      //   btn.innerHTML=fila+fila2;
      //  document.getElementById("tablita").appendChild(btn);
          
      // }

//CHECAR TABLA PARA ENCUESTA
//mostrar variables predeterminadas con formato
function BusVa(){
 
  var cadena ="<table class= 'table table-bordered'>"
  var cadena2 = document.querySelector("table>tbody")
  var cadenaX = "<select class="+"form-select form-select-sm"+" aria-label="+".form-select-sm example"+">"+"<option selected>Opciones</option>"
  +"<option value="+"0"+">0</option>"
  +"<option value="+"1"+">1</option>"
  +"<option value="+"2"+">2</option>"
  +"<option value="+"3"+">3</option>"
  +"<option value="+"4"+">P</option>"+
  "</select>"

  var num = 0;
  var ids_array = new Array();

  cadena +="<th>#</th>"

  var objectStore = db.transaction("Variables").objectStore("Variables");

  
  objectStore.openCursor().onsuccess= function(e){
   

    
   var cursor = e.target.result;
   if(cursor){
   
 
    

  var columna = cursor.value.NombreVar;
 console.log(cursor.value.NombreVar);
        
  cadena += "<th>"+cursor.value.NombreVar+"</th>"
  
      cadena2 +="</tr>"
   
    cursor.continue();
    num++
   }else{
   
document.getElementById("salidaV").innerHTML= cadena+cadena2;
    cadena +="</table>";
   
    
  
   }
  
  } 
  var tabla = document.getElementById('TablaV');
  var columnass = tabla.getElementsByTagName('th');
  var numColum = columnass.length;
  // console.log(numColum);

  //cursor filas
  var celdas = db.transaction("Variables").objectStore("Variables");
  celdas.openCursor().onsuccess= function(e){
   var cursorX = e.target.result;
   if(cursorX){
     //NombreVarX = cursorX.value.NombreVar
     //continuamos siguiente objeto
     var n=1;
     //console.log(cursorX.value.id);
     cadena2 +="<tr>"
     cadena2 += "<th>"+cursorX.value.NombreVar+"</th>"
     for(var i=0; i<10;i++){
     cadena2 +="<th>"+cadenaX+"</th>"
     }
     cadena2 +="</tr>"
     cursorX.continue();



     
     //console.log(n);
     //}
   }}
}

//actualizar bd para vista previa 


// crear una función que refresque el almacén
function refrescarAlmacen() {
  const request = indexedDB.open('Janal', 1);
  request.onsuccess = function(event) {
    const db = event.target.result;
    const store = db.transaction('preguntaReactivos', 'readonly').objectStore('preguntaReactivos');
   
    // leer todos los objetos del almacén
    const getAllRequest = store.getAll();
    getAllRequest.onsuccess = function(event) {
      const objetos = event.target.result;
      

      // limpiar la lista del modal
      const miLista = document.getElementById('modalcuerpo');
      miLista.innerHTML = '';

      // agregar los valores a la lista del modal
      for (const objeto of objetos) {
        const li = document.createElement('p');
        li.textContent = objeto.id2;
        miLista.appendChild(li);
      }
    };
  };
}

// suscribirse al evento onchange del checkbox
const checkbox = document.getElementById('b');
checkbox.onchange = function(event) {
  console.log('El checkbox ha cambiado');
  refrescarAlmacen();
};

// abrir el modal cuando se hace clic en el botón
var miBoton = document.getElementById('boton-crear-encuesta');
miBoton.onclick = function() {
  var miModal = document.getElementById('Modal_vistaPrevia');
  miModal.style.display = 'block';
};

// // cerrar el modal cuando se hace clic en la X
// const miClose = document.getElementsByClassName('close')[0];
// miClose.onclick = function() {
//   const miModal = document.getElementById('miModal');
//   miModal.style.display = 'none';
// };

function mostrarElementosPorCategoria() {
  // Obtener el tipo de categoría seleccionada
  var tablaHTML = "<table class= 'table table-bordered'>";
  var tipoCategoria = document.getElementById("Categorias_R").value;
  var id_array = new Array();
  // Obtener la referencia al almacén de objetos
  var transaction = db.transaction(["Encuesta_Reactivo"], "readonly");
  var store = transaction.objectStore("Encuesta_Reactivo");

  // Crear un índice en la propiedad de categoría del objeto
  var index = store.index("Cate");


  // Iniciar la búsqueda de elementos por categoría
  var range = IDBKeyRange.only(tipoCategoria);
  var cursor = index.openCursor(range);
 

  // Construir la tabla HTML
 

  // Iterar sobre los resultados de la búsqueda y agregarlos a la tabla
  cursor.onsuccess = function(event) {
    var result = event.target.result;
    if(result) {
      document.getElementById("salida").style.display ="none";
       reactivoMostrado = result.value.Descripcion;
      //cadena3 +="<tr><td>" + id + "</td></tr>";
      tablaHTML += "<tr>";
      tablaHTML +="<td><input type ='checkbox' id='S"+reactivoMostrado+"'></input></td>";
      tablaHTML += "<td>" + reactivoMostrado+ "</td>";
      tablaHTML += "</tr>";
      result.continue();
    } 
    else {
      // Finalizar la construcción de la tabla y mostrarla en la página
      tablaHTML += "</table>";
      document.getElementById("tablaElementos").innerHTML = tablaHTML;
      document.getElementById("S"+reactivoMostrado).onclick= selec3;
      
    }
  
     
      //document.getElementById("m"+id).onclick= Editar;

    
  };
  
}
function selec3(e){
  // console.log("seleccionar",e);
  var reactivoMostrado= e.target.id;

  var llaveCate = id;
  console.log(llaveCate);

   llaveCate = id.substring(1);
  //console.log(id,llave);


  if(confirm(llaveCate)){
    var tx =db.transaction("Encuesta_Reactivo","readwrite");
    var objectStore = tx.objectStore("Encuesta_Reactivo");
    var request = objectStore.get(llaveCate)
    request.onsuccess =function(){
    

     // alert ("Elementos seleccionados"+llave);
      var idP = llaveCate.value
      var tx = db.transaction("predeSelec","readwrite");
      var objectStore = tx.objectStore("predeSelec");
       objectStore.add({idP:llaveCate})

      // alert ("Elementos seleccionados"+llave);
    }
  
  }
  // if(llave){
  
  //  }
}

function mostrarPreguntas() {

  var objectStore = db.transaction("preguntaReactivos").objectStore("preguntaReactivos");

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      var pregunta = cursor.value.id2;
      var tipoRespuesta = cursor.value.TipoRes;

      var preguntaDiv = document.createElement("div");
      var preguntaLabel = document.createElement("label");
      var preguntaInput = document.createElement("TEXTAREA");

      var respuestaDiv = document.createElement("div");

      var respuestaSi = document.createElement("input");
      var respuestaSiLabel = document.createElement("label");
      respuestaSiLabel.textContent ='Sí';
      var respuestaNo = document.createElement("input");
      var respuestaNoLabel = document.createElement("label");
      respuestaNoLabel.textContent = "No";
      preguntaLabel.textContent = pregunta + ": ";
      
      if (tipoRespuesta === 1) {
        preguntaDiv.appendChild(preguntaLabel);
        preguntaDiv.appendChild(preguntaInput);
        preguntaInput.setAttribute("type", "text");
        
      } else if (tipoRespuesta === 2) {
        preguntaDiv.appendChild(preguntaLabel);
      
        respuestaSi.setAttribute("type", "radio");
        respuestaSi.setAttribute("name", "respuesta");
        respuestaSi.setAttribute("value", "si");
        respuestaDiv.appendChild(respuestaSiLabel);
        respuestaDiv.appendChild(respuestaSi);
       
        respuestaNo.setAttribute("type", "radio");
        respuestaNo.setAttribute("name", "respuesta");
        respuestaNo.setAttribute("value", "no");
        respuestaDiv.appendChild(respuestaNoLabel);
        respuestaDiv.appendChild(respuestaNo);
        
        preguntaDiv.appendChild(respuestaDiv);

       
      } else if (tipoRespuesta === 3) {
        preguntaInput.setAttribute("type", "select");
      }

      document.getElementById("preguntas-container").appendChild(preguntaDiv);

      cursor.continue();
    }
  };

}


 
  var encuestaId;

function crearEncuestaFinal() {
  var creador = document.getElementById("aqui").value;
  var Titulo = document.getElementById("Titulo").value.trim();
  var Objetivo = document.getElementById("floatingTextarea2").value.trim();
  var Instrucciones = document.getElementById('floatingTextarea21').value.trim();
  var fechaCreacionE = Date.now(); // Obtener la fecha actual en milisegundos

  var form = document.getElementById('formulario');

  form.addEventListener('submit', async function(eve) {
    eve.preventDefault();

    var request = db.transaction(["Encuesta"], "readwrite")
      .objectStore("Encuesta")
      .add({
        creador: creador,
        Titulo: Titulo,
        Objetivo: Objetivo,
        Instrucciones: Instrucciones,
        fechaCreacionE: fechaCreacionE
      });

    request.onsuccess = async function(e) {
      encuestaId = e.target.result;
      console.log("Encuesta creada con id: ", encuestaId, Titulo);
      var reactivosSeleccionados = await obtenerReactivosSeleccionados() 
     
      var tx = db.transaction(["EncuestaFinal"], "readwrite");
      var store = tx.objectStore("EncuestaFinal");

      reactivosSeleccionados.forEach(function(reactivoId) {
        store.add({
          encuestaId: encuestaId,
          reactivoId: reactivoId
        });
      });
      
      tx.oncomplete = function() {
        console.log("Relación entre la encuesta y los reactivos creada correctamente");
      };

      console.log(e);
      alert("Se insertaron los datos");

      buscarE();

      EncuestaVistaPV2();
    };
  });
}

async function obtenerReactivosSeleccionados() {
  var reactivosSeleccionados = [];
  var checkboxes = document.querySelectorAll("input[type='checkbox'][id^='s']:checked");

  var transaction = db.transaction(["preguntaReactivos"], "readonly");
  var objectStore = transaction.objectStore("preguntaReactivos");
  var cursor = objectStore.openCursor(null, "prev");

  await new Promise((resolve) => {
    cursor.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var valor = cursor.value.id2;
        if (!reactivosSeleccionados.includes(valor) && contieneCheckboxId(checkboxes, valor)) {
          reactivosSeleccionados.push(valor);
        }
        cursor.continue();
      } else {
        resolve();
      }
    };
  });

  return reactivosSeleccionados;
}

function contieneCheckboxId(checkboxes, id) {
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].id === 's' + id) {
      return true;
    }
  }
  return false;
}


// Función para mostrar en el formulario los reactivos de una encuesta específica




  function mostrarEncuesta() {
    var transaction = db.transaction(["Encuesta", "Encuesta_Reactivo"], "readonly");
    var encuestaStore = transaction.objectStore("Encuesta");
    var reactivosStore = transaction.objectStore("Encuesta_Reactivo");
  
    var encuestaRequest = encuestaStore.get(1);
    encuestaRequest.onsuccess = function(event) {
      var encuesta = event.target.result;
  
      if (encuesta) {
        var reactivosRequest = reactivosStore.getAll();
        reactivosRequest.onsuccess = function(event) {
          var reactivos = event.target.result;
  
          construirFormulario(encuesta, reactivos);
        };
      } else {
        console.log("La encuesta con ID 1 no se encontró en la base de datos.");
      }
    };
  }
  
  function construirFormulario(encuesta, reactivos) {
    var form = document.getElementById("encuestaFormA");
    form.innerHTML = "";
  
    // Crear el elemento de título de la encuesta
    var tituloElement = document.createElement("h2");
    tituloElement.className = "bg-text-black text-center p-3 text-uppercase text-black";
    tituloElement.textContent = encuesta.Titulo;
    form.appendChild(tituloElement);
  
    // Recorrer los reactivos y agregarlos al formulario
    reactivos.forEach(function(reactivo) {
      // Crear un div para cada pregunta
      var preguntaDiv = document.createElement("div");
      preguntaDiv.className = "p-3";
  
      // Crear los elementos de etiqueta y campo de entrada
      var labelElement = document.createElement("label");
      labelElement.textContent = reactivo.Descripcion;
  
      var divInput = document.createElement("div");
      var inputElement = document.createElement("input");
      inputElement.className = "form-control";
      inputElement.type = "text";
      inputElement.name = "respuesta-" + reactivo.id; // Agregar un nombre único al input
  
      // Agregar los elementos al contenedor de pregunta
      divInput.appendChild(labelElement);
      divInput.appendChild(inputElement);
  
      preguntaDiv.appendChild(divInput);
  
      // Agregar el div de pregunta al formulario
      form.appendChild(preguntaDiv);
    });
  }
  
  function obtenerValorTd(event) {
    var boton = event.target;
    var botonId = boton.id;
    var td = document.getElementById(botonId + '-td');
    var valor = td.innerText;
    console.log(valor);
  }
  

  // Agregar el listener de eventos al <tbody> para capturar los eventos de los botones generados dinámicamente
  tablaBody.addEventListener('click', function(event) {
    // Verificar si el elemento que desencadenó el evento es un botón
    if (event.target && event.target.nodeName === 'BUTTON') {
      obtenerValorTd(event);
    }
  });




  function mostrarEncuestaV() {
    var tablaEncuesta = document.getElementById('tablaEncuesta');
  
    var table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
  
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.textContent = '#';
    tr.appendChild(th);
  
    var objectStore = db.transaction('Variables').objectStore('Variables');
  
    var numColumns = 7; // Número de columnas por variable
  
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var variable = cursor.value;
        var th = document.createElement('th');
        th.textContent = variable.NombreVar;
        tr.appendChild(th);
        cursor.continue();
      } else {
        thead.appendChild(tr);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
  
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.textContent = cursor.value.NombreVar;
            tr.appendChild(td);
  
            for (var i = 1; i <= numColumns; i++) {
              var td = document.createElement('td');
              var select = document.createElement('select');
              select.classList.add('form-select', 'form-select-sm');
              select.setAttribute('aria-label', '.form-select-sm example');
              var options = [
                { value: '0', text: '0' },
                { value: '1', text: '1' },
                { value: '2', text: '2' },
                { value: '3', text: '3' },
                { value: '4', text: 'P' }
              ];
  
              for (var j = 0; j < options.length; j++) {
                var option = document.createElement('option');
                option.value = options[j].value;
                option.textContent = options[j].text;
                select.appendChild(option);
              }
  
              td.appendChild(select);
              tr.appendChild(td);
            }
  
            tbody.appendChild(tr);
            cursor.continue();
          } else {
            table.appendChild(tbody);
            tablaEncuesta.innerHTML = '';
            tablaEncuesta.appendChild(table);
            console.log('Encuesta mostrada correctamente');
          }
        };
      }
    };
  }
  
  // Resto del código para conectar a la base de datos IndexedDB
  
  