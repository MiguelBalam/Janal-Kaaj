// creacion de la base de datos
var db;
var ObjectStore
var ObjectStoreReac
 (function conectarDB(){
    
   // let objectStore = null;
    let DBOpenReq =indexedDB.open('Janal',1);

    DBOpenReq.addEventListener('error',(err)=>{
        console.warn(err);
    });
    
    //Creacion de tablas u objetos
    DBOpenReq.addEventListener('upgradeneeded',(ev)=>{
        db = ev.target.result;
        
        ObjectStore = db.createObjectStore("Usuario", {autoIncrement: true});
        ObjectStore.createIndex("Nombre","Nombre",{unique:true});

        ObjectStore=db.createObjectStore("Autenticasion",{autoIncrement: true});
        ObjectStore.createIndex("correo","correo",{unique:true});

        db.createObjectStore("Encuestado",{autoIncrement: true});
        db.createObjectStore("Localidad", {autoIncrement: true});
        db.createObjectStore("Municipio", {autoIncrement: true});
        db.createObjectStore("Encuestador",{autoIncrement: true});
        //Encuestas
        ObjectStore= db.createObjectStore("Encuesta", {autoIncrement: true});
        ObjectStore.createIndex("Titulo","Titulo",{unique:true});

        ObjectStore=db.createObjectStore("Encuesta_Reactivo", {autoIncrement: true});
        ObjectStore.createIndex("Descripcion","Descripcion",{unique:true});
        ObjectStore.createIndex("Cate","Cate",{unique:false});
        


        ObjectStore=db.createObjectStore("Reactivos", {keyPath: 'id',autoIncrement:true});
        // ObjectStore.createIndex("Reactivo","Reactivo",{unique:false});
        // ObjectStore.createIndex("CategoriaReactivo","CategoriaReactivo", {unique:false});

        ObjectStore=db.createObjectStore("TipoRes", {autoIncrement: true});
        ObjectStore=db.createObjectStore("ReacOpMul", {autoIncrement: true});
        ObjectStore=db.createObjectStore("ReOpM", {autoIncrement: true});
  
        db.createObjectStore("Categoria_encuesta", {autoIncrement: true});

        ObjectStore=db.createObjectStore("preguntaReactivos", {autoIncrement: true});
        ObjectStore=db.createObjectStore("selecVariables", {autoIncrement: true});
        //ObjectStoreReac=db.createObjectStore("Categorias", {autoIncrement: true});
       
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
    DBOpenReq.addEventListener('success',(ev)=>{
     
      db= ev.target.result;
     
      Encuesta1()
      Variables()
      buscar()
      buscarV()
      buscarE()
      buscar2()
      buscarVar()
      
     // buscarLista();
      buildList();
    });
// registro de datos


    document.formEncuestado.addEventListener('submit',(ev)=>{
        
        ev.preventDefault();
        var correo = document.getElementById('Correo').value.trim();
        var Contraseña = document.getElementById('Contraseña').value.trim();
        var Contraseña2 = document.getElementById('Contraseña2').value.trim();
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
            Contraseña,
            Contraseña2
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
        };
      }
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

//Verificar que las dos contraseñas coincidan

function verificarPasswords() {
 
 var pass1 = document.getElementById('Contraseña').value;
  var pass2 = document.getElementById('Contraseña2').value;
  
  if (pass1 != pass2) {

    // Si las constraseñas no coinciden mostramos un mensaje
   alert("Las contraseñas no coinciden")
   console.onerror();
    return pass1;
}else {
    // Si las contraseñas coinciden ocultamos el mensaje de error
  alert("Contarseña Correcta");

}
return true;
}

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
      function Variables(){
 

        var variables =[
          {id:"1",NombreVar:"Experiencia", Siglas:"T.P",Descripcion:"Experiencia del apicultor dónde se desarrolla la actividad (rentada, propia o ejido)"},
          {id:"2",NombreVar:"Tipo de producción de la miel.", Siglas:"P.M.",Descripcion:"Tipo de producción de miel en las zonas de estudio."},
          {id:"3",NombreVar:"Las Políticas Públicas en el sector.", Siglas:"P.P.",Descripcion:"Acciones y apoyos que el gobierno ofrece a este sector primario."},
          {id:"4",NombreVar:"Nivel de ingresos del Jornalero.", Siglas:"I.J.",Descripcion:"Rango de ingresos mensuales que percibe "},
          {id:"5",NombreVar:"Tipo de práctica empleada en el campo", Siglas:"P.E.",Descripcion:"Tipo de manejo de prácticas que se utilizan en esta actividad."},
          {id:"6",NombreVar:"Prácticas culturales", Siglas:"P.C",Descripcion:"prácticas culturales es usada y cuantas veces se realiza al año."},
          {id:"7",NombreVar:"Sanidad.", Siglas:"S",Descripcion:"Control y prevención de la presencia de plagas y enfermedades en la producción"},
          {id:"8",NombreVar:"Documentación de procesos.", Siglas:"D.P.",Descripcion:"D de manuales de procedimientos y certificaciones como parte del proceso de esta actividad."},
          {id:"9",NombreVar:"Tecnología especializada.", Siglas:"T.E.",Descripcion:"Maquinaria especializada para esta actividad o si aún se carece de ella."},
          {id:"10",NombreVar:"Acceso a los medios de publicidad.", Siglas:"A.P.",Descripcion:"Publicidad entre ellos uso de internet, periódicos o algún medio que difunda sus productos"}
          
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
      
      
        console.log('suscess',db);
      
      };

  
//salida para las preguntas de reactivos en crear.html
      function buscar2(){
        var cadena ="<table class= 'table table-bordered'>";
        var num= 0;
        var ids_array = new Array();
        var objectStore = db.transaction("Reactivos").objectStore("Reactivos");
        objectStore.openCursor().onsuccess = function(e){
          var cursor = e.target.result;
          if(cursor){
            id= cursor.value.id;
            cadena += "<tr>";
            cadena +="<td><input type ='checkbox' id='s"+id+"'></input></td>";
            cadena +="<td>"+cursor.value.id+"</td>";
            cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+id+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
            //cadena += "<td><button id= 'e"+id+"'>Editar</button></td>"
            //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
            cadena += "</tr>"; 
            ids_array.push(id);
            num++;
            cursor.continue();
      
          }else{
            cadena += "</table>"
            document.getElementById("salida2").innerHTML = cadena;
      
            for(var i=0; i<ids_array.length; i++){
              id = ids_array[i];
              document.getElementById("s"+id).onclick= selec;
              document.getElementById("b"+id).onclick= borrar;
            }
          }
         
    }


    function borrar(e){
      console.log ('borrar',e)
      var id = e.target.id;
      var llave = id.substr(1)
      console.log(id,llave);
      if(llave){
        db.transaction('Reactivos','readwrite')
        .objectStore('Reactivos')
        .delete(llave);
        
      }

      request.onsuccess =function (e){
        alert("eliminado"+llave)
       
      }
  buscar2()
     }
    
    }
    function selec(e){
      console.log("seleccionar",e);
      var id= e.target.id;
      var llave = id.substring(1);
      console.log(id,llave);
    
      if(confirm(llave)){
        var tx =db.transaction("Reactivos","readwrite");
        var objectStore = tx.objectStore("Reactivos");
        var request = objectStore.get(llave)
        request.onsuccess =function(){
        
          alert ("Elementos seleccionados"+llave);
          
        }
      
      }
      if(llave){
        var tx =db.transaction("preguntaReactivos","readwrite");
        var objectStore = tx.objectStore("preguntaReactivos");
         objectStore.add(llave)
       }
    }


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
            document.getElementById("s"+id).onclick= selec;
            id = id_array[i];
            //document.getElementById("m"+id).onclick= Editar;

          }
        }
       }

    }

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
     
     }
   //BusVa();
   
   }
   
   function selecVariables(e){
             console.log("seleccionar",e);
             var id= e.target.id;
             var llave = id;
             console.log(id,llave);
           
             if(confirm(llave)){
               var tx =db.transaction("selecVariables","readwrite");
               var objectStore = tx.objectStore("selecVariables");
               var request = objectStore.add(llave)
   
               request.onsuccess =function(){
               console.log(llave)
               }
          
             }
             //guardar()
         }
// salida de tipos encuesta


         function buscarE(){
          var cadena = "";
          cadena += "";
          var num =0;
          var id_array = new Array();

          //leer cursor
          var objectStore = db.transaction("Encuesta").objectStore("Encuesta");
          objectStore.openCursor().onsuccess= function(e){
           var cursor = e.target.result;
           if(cursor){
             Descripcion = cursor.value.Titulo;
             cadena += "";
             
             //cadena += "<div class= 'modal fade' id='mymodal3' tabindex='-1' aria-labelledby='mymodal3' aria-modal='true' style='display: none;' aria-modal='true' role='dialog'><div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'><div class='modal-content'></div></div></div>";
            cadena += "<button data-bs-toggle='modal' data-bs-target='#mymodal' ><img src=../Img/Form1.png width=200px height=320px></button>";
            //cadena += "<label>"+cursor.value.Titulo+"</label>"
            cadena += "<div class='p-3'> <label>"+cursor.value.Titulo+"</label></div>"
             //cadena += "<td>+<button id='m"+Descripcion+"'>Seleccionar</button></td></tr>";
             id_array.push(Descripcion);
             num ++;
             //continuamos siguiente objeto
             cursor.continue();

           }else{
             cadena += "";
             document.getElementById("crear_encuesta").innerHTML = cadena;

             for(var i=0; i<id_array.length; i++){
               id = id_array[i];
               //document.getElementById("m"+id).onclick= Editar;

             }
           }
          }
   
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

      function buscarVar(){
        var cadena ="<table class= 'table table-bordered'>";
        var num= 0;
        var ids_array = new Array();
        var objectStore = db.transaction("VariableC").objectStore("VariableC");
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
         
    }


    function borrar(e){
      console.log ('borrar',e)
      var id = e.target.id;
      var llave = id.substr(1)
      console.log(id,llave);
      if(llave){
        db.transaction('VariableC','readwrite')
        .objectStore('VariableC')
        .delete(llave);
        
      }

      request.onsuccess =function (e){
        alert("eliminado"+llave)
       
      }
  buscarVar()
     }
    
    }
    function modificar(e){
      var id = e.target.id;
      var llave = id.substr(1)
      console.log(id,llave);

      var tx = db.transaction(["VariableC"],"readonly");
      var objectStore = tx.objectStore("VariableC")
      var request = objectStore.get(llave)
      request.onerror = function(e){
        alert("No se puedelos datos de la llave"+llave)
      }
      request.onsuccess = function(e){
        if(request.result){
          document.getElementById("NomV").value= request.result.creV;
     document.getElementById("SiglaV").value= request.result.sigla;
     document.getElementById("desV").value= request.result.descripcion;
        }
else{
  alert("No se puede leer" +llave)
}
      }
    } 
      //Crear encuesta
      function CrearEncuestaV() {
        
        var titulo = document.getElementById("Titulo").value.trim();
        var Objetivo = document.getElementById("floatingTextarea2").value.trim();
        var Instrucciones = document.getElementById('floatingTextarea21').value.trim();
        var form = document.getElementById('formularioCR');

      form.addEventListener('submit', function(eve){
      eve.preventDefault();
      var request = db.transaction(["Encuesta_Variables"], "readwrite")
      .objectStore("Encuesta_Variables")
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

      //   function CrearEncuesta() {
        
      //     var Titulo = document.getElementById("Titulo").value.trim();
      //     var Objetivo = document.getElementById("floatingTextarea2").value.trim();
      //     var Instrucciones = document.getElementById('floatingTextarea2').value.trim();
      //     var form = document.getElementById('formularioC');

      //   form.addEventListener('submit', function(eve){
      //   eve.preventDefault();
      //   var request = db.transaction(["Encuesta"], "readwrite")
      //   .objectStore("Encuesta")
      //   .add({Titulo:Titulo, Objetivo:Objetivo, Instrucciones:Instrucciones});

      //   request.onsuccess = function(e){
        
      //      console.log(e);
      //      alert("se inserto los datos");
      //      buscar();
      //      buscar2();
      //      buscarE();   
      //   };
      //   if(Titulo.value === null ||  Titulo.value === ''){
      //     alert("Ingrese un titulo");
      //   }
      //   if(Objetivo.value === null ||  Objetivo.value === ''){
      //     alert("Ingrese un Objetivo");
      //   }
      //   if(Instrucciones.value === null ||  Instrucciones.value === ''){
      //     alert("Ingrese Instrucciones");
      //   }
      //   return false;

      // })
      //     //validarER() 
      //    }
        
         function CrearReactivo(){
          var id = document.getElementById("ReactivoCre").value.trim();
          var CategoriaReactivo=document.getElementById("CategoriaReactivos").value.trim();
          var owned = document.getElementById('inlineCheckbox1').checked;
          
          var Crear = {
           id,
           CategoriaReactivo,
            owned,
          };

          let tx = makeTX('Reactivos','readwrite');
          tx.oncomplete = (ev) =>{
              console.log (ev);
          };
          let store = tx.objectStore('Reactivos');
          let request = store.put(Crear);

          request.onsuccess = (ev) => {
            buscar2();
            console.log('successfully added an object',ev);
          };

          function makeTX(storeName, mode) {
            let tx = db.transaction(storeName, mode);
            tx.onerror = (eve) => {
              console.warn(eve);
            };
            return tx;
        }
        buildList()
      }
      
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
   
          //document.whiskeyForm.setAttribute('data-key', request.id);
        };
        req.onerror = (err) => {
          console.warn(err);
        };
      });
    
     buscar2();

    // borrar();

     
    }

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
 console.log(cursor.value.creV);
        
  cadena += "<th>"+cursor.value.creV+"</th>"
  //cadena+="<tr><td>"+ "<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td></tr>"
  
 
       
  for(i=0; i<filas;i++){
   cadena2 +="<tr>"
   
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
//Función para gusrdar tipo de respuesta
         function tipoR(){
          var TipoRes= document.getElementById("TipoRes").selectedIndex;
         
          var TipoR = db.transaction(["TipoRes"], "readwrite")
          .objectStore("TipoRes")
          if(TipoR == ''){
          TipoR.add({TipoRes:TipoRes});
          }else{
            if(TipoRes == 1){
              TipoR.add({TipoRes:'Abierta'});
            }
            if(TipoRes == 2){
              TipoR.add({TipoRes:'Cerrada'});
            }
            if(TipoRes == 3){
              TipoR.add({TipoRes:'Opcion_Mul'});
             
             
          }
            if(TipoRes == 4){
              TipoR.add({TipoRes:'Opcion_Mul_Uno'});
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
           alert('selecciones cantidad de posibles respuestas');
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
    alert("Escriba una respuesta");
  }else{
      ResOpMul.add({Respuesta:respuesta,Respuesta2:respuesta2,Respuesta3:respuesta3,Respuesta4:respuesta4,Respuesta5:respuesta5})
  } 
    ResOpMul.onsuccess = function(e){
    console.log(e);
  }
}

       //cursor con preguntas ya predeterminadas
        

      

          
        
      function creEncuestaR(){

        var Titulo = document.getElementById("Titulo").value.trim();
        var Objetivo = document.getElementById("floatingTextarea2").value.trim();
        var Instrucciones = document.getElementById('floatingTextarea21').value.trim();
        var form = document.getElementById('formularioC');

      form.addEventListener('submit', function(eve){
      eve.preventDefault();
      var request = db.transaction(["Encuesta"], "readwrite")
      .objectStore("Encuesta")
      .add({Titulo:Titulo, Objetivo:Objetivo, Instrucciones:Instrucciones});

      request.onsuccess = function(e){
      
         console.log(e);
         alert("se inserto los datos");
         buscar();
         //buscar2();
         buscarE();   
      };
      
    })
   
    }
          // Funcion para mostrar contenido de select 
          
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

   
function buscar3(){
  var cadena3 = "";
  cadena3 += "";
  var num =0;
  var id_array = new Array();

  //leer cursor
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
                    index = cursor.value.Descripcion;
                    //cadena3 += "";
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
              if(tipo==2){
             
                //document.getElementById("salida3").style.display ="none"
                //document.getElementById("salida").style.display ="none"
                index.openCursor("Agricultura").onsuccess= function(e){

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
function BusVa(){
  // var columnas = parseInt(prompt("columnas"));
  // var filas= parseInt(prompt("colum"));  
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
  //cadena+="<tr><td>"+ "<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td></tr>"
  
 
       
  // for(i=0; i<filas;i++){
  //  cadena2 +="<tr>"
   
  //  // cadena += "<th>"+cursor.value.NombreVar+"</th>"
  
  //   for(j=0; j<columnas;j++){
  //     //"<th>"+cursor.value.NombreVar+"</th>"
  //     cadena2 += "<td>"+cursor.value.NombreVar+"</td>";
  //     //cadena2 += "<td>"+cursor.value.NombreVar+"</td>";
       
  //     // if((filas>= 1 && filas<=2) && (columna >=1 && columna <=2)){
  //     //   let celdas = document.querySelector("table>tbody")
  //     // celdas[columna -1].innerHTML = "<td>"+ "<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td>"
  //     // }
  //     //cadena +="<th>"+curRes.value.NombreVar+","+curRes.value.NombreVar+"</th>"
       
  //   }
  //   for(i= 0; i<filas;i++){
  //     cadena2+= "<td>"+"<select class='form-select form-select-sm' aria-label='.form-select-sm example'></select>"+"</td>";

  //   }
  //     }
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
  console.log(numColum);

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


