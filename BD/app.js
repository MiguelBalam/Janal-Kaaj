var url = window.location.href;
var swLocation = '/Janal-Kaaj/sw.js';


if (navigator.serviceWorker){

  if (url.includes('localhost')){
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
      

        //Noticias
        ObjectStore = db.createObjectStore('Noticias', {keyPath:'id', autoIncrement: true});
        ObjectStore.createIndex('titulo', 'titulo', { unique: false });
        ObjectStore.createIndex('cuerpo', 'cuerpo', { unique: false });
        
        //Usuarios Administrador
        ObjectStore = db.createObjectStore('Administrador', {keyPath:'id', autoIncrement: true});
        ObjectStore.createIndex('Nombre', 'Nombre', { unique: true });

        //usuario

        ObjectStore = db.createObjectStore("Usuariosactivo", {keyPath: "id"});
        ObjectStore = db.createObjectStore("Usuarios", {autoIncrement: true});

        ObjectStore = db.createObjectStore("EncuestaFinal", {autoIncrement: true});
        ObjectStore.createIndex("encuestaId","",{unique:true});
        ObjectStore=db.createObjectStore("Autenticasion",{keyPath:"correo", autoIncrement: true});
        ObjectStore.createIndex("correo","correo",{unique:true});

        ObjectStore = db.createObjectStore("EncuestaVariablesFinal", {keypth:"IdV" ,autoIncrement: true});
       ObjectStore.createIndex("encuestaVarId","encuestaVarId",{unique:true});

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
      
        ObjectStore = db.createObjectStore("predeSelec", {autoIncrement: true});

       

        
        ObjectStore= db.createObjectStore("Variables", {autoIncrement: true});
        ObjectStore.createIndex("NombreVar","NombreVar", {unique: true});
      
        ObjectStore= db.createObjectStore("Encuesta_Variables", {keyPath:"IdV",autoIncrement: true});
        ObjectStore.createIndex("encuestaVarId","encuestaVarId",{unique:true});
        ObjectStore.createIndex("fechaCreacionE","fechaCreacionE",{unique:true});
        ObjectStore.createIndex("EncuestaTitulo","Titulo",{unique:true});
        ObjectStore.createIndex("EncuestaObjetivoV","Objetivo",{unique:true});
        ObjectStore.createIndex("EncuestaInstruccionV","Instrucciones",{unique:true});

        ObjectStore= db.createObjectStore("VariableC", {keyPath:'id',autoIncrement: true});

        ObjectStore=db.createObjectStore("selecVariables", {keypth:"VariablesId",autoIncrement: true});
        ObjectStore=db.createObjectStore("selecVariablesCre", {keypth:"VariablesId",autoIncrement: true});
        console.log('upgrade',db);
       
    });
    
    //sube la imagen a la base de datos
			
    
    // document.addEventListener('DOMContentLoaded', function() {
    //   obtenerValorYVerificarLabel();
    //   obtenerValorTd();
    //   console.log("triste");
    // });
    //funciones para cursores
    DBOpenReq.addEventListener('success',(ev)=>{
     
      db= ev.target.result;
      EncuestaVistaPV2()
      reactivoscrear()
      buscar()
      Encuesta1()
      mostrarVarSelec() 
      EncuestaVarMostrar()
   EncuestaVarMostrar(encuestaVarId)

   mostrarEncuestaDatos()
      buscarVar()
      Encuesta1()
      agregarDatosAdmin()
      mostrarNoticiasEnTarjetas();
      mostrarNoticiasIndex();
      crearCardNoticias();
      mostrarVarSelec() 
      EncuestaVarMostrar()
      //EncuestaVarMostrar() 
      cargarPagina()
      
      buscarE()
     
      //mostrarEncuestaVar(encuestaVarId)
   

     
     
    
    //  EncuestaVistaVariables()
      Variables()
      mostrarEncuestaV() 
    
     
      mostrarVarSelec()
      buscarV()
      
     
      //EncaEncuestaVista()
      
     // buscarEVar()

     buildList()
 
      buscarEVar()
     
     //mostrarPreguntas();
 
    
     
    // EncuestaVistaP()
      //mostrarSelecReac()
      predeSelecMos()
      // cargarPagina()
      //buscar2()
     // Usuariosactivo()
    
    
      //ReacPredeVista()
      // refrescarAlmacen()
     
       mostrarPreguntas();
     
    
  
   
      
      EncuestaV()
      
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
        var generoSeleccionado = '';
        var genero1 = document.getElementById('inlineRadio1');
        var genero2 = document.getElementById('inlineRadio2');
        var Edad= document.getElementById('edad').value.trim();
        // var Proce= document.getElementById('procedencia').value.trim();
        var Telefono = document.getElementById('tel').value.trim();
        // var localidad =document.getElementById('localidad').value.trim();
        // var ciudad =document.getElementById('cuidad').value.trim();
        // var Municipio =document.getElementById('municipio').value.trim();
        // var Encuestado = document.getElementById('estado').value.trim();
        // var telefono = document.getElementById('tel-encuestado').value.trim();

      if (genero1.checked) {
        generoSeleccionado = genero1.value;
      } else if (genero2.checked) {
        generoSeleccionado = genero2.value;
      }
        
        verificarPasswords();

        let Usuario = {
        Nombre,
        ApellidoP,
        ApellidoM,
        Genero: generoSeleccionado,
        Edad,
        Telefono,
        correo

        }
        let Autenticasion = {
            correo,
            Contrasenia,
            Contrasenia2
            }
            // let Encuestador = {
            //   Proce

            //      }
             
        
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
         
            // console.log (ev);

            // Aquí se muestra la alerta SweetAlert2
          Swal.fire({
            icon: 'success',

            title: '¡Datos enviados correctamente!',
            text: 'Gracias por completar la encuesta.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirige a la página "login.html" en español
              window.location.href = 'login.html';
            }
          });
            
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
          document.getElementById('EncuestadoForm').reset(); 
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


    });

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


//Subir Noticas


function agregarEventoFormulario() {
  const formulario = document.getElementById('formularioNews');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const titulo = document.getElementById('titulo').value;
    const cuerpo = document.getElementById('noticia').value;
    const imagen = document.getElementById('image').files[0];

    // Llama a la función para almacenar los datos en la base de datos
    guardarDatos(titulo, cuerpo, imagen);

    Swal.fire({
      title: 'Se han enviado los datos',
      text: 'Datos enviados correctamente',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
    });

    document.getElementById("formularioNews").reset();

  });
}

function guardarDatos(titulo, cuerpo, imagen) {
  const request = indexedDB.open('Janal', 1); // Abre la base de datos 'Janal' con la versión 1

  request.onerror = function(event) {
    console.log('Error al abrir la base de datos'); // Maneja el evento de error si hay un problema al abrir la base de datos
  };

  request.onsuccess = function(event) {
    const db = event.target.result; // Obtiene la referencia a la base de datos
    var reader = new FileReader(); // Crea una instancia de FileReader, que se utiliza para leer el contenido del archivo
  
    // reader.readAsDataURL(file); 
    reader.readAsBinaryString(imagen); // Lee el contenido del archivo como una cadena binaria
    reader.onload = function(e) {
      let bits = e.target.result;
      const transaction = db.transaction('Noticias', 'readwrite');
      const objectStore = transaction.objectStore('Noticias');
      const nuevaNoticia = { titulo: titulo, cuerpo: cuerpo, data: bits };
      const requestAdd = objectStore.add(nuevaNoticia);
    
      requestAdd.onsuccess = function(event) {
        console.log('Datos almacenados con éxito'); // Maneja el evento de éxito cuando los datos se almacenan correctamente en IndexedDB
      };
  
      requestAdd.onerror = function(event) {
        console.log('Error al almacenar los datos'); // Maneja el evento de error si hay un problema al almacenar los datos en IndexedDB
      };
  
      transaction.oncomplete = function(event) {
        db.close(); // Cierra la conexión con la base de datos una vez que la transacción se completa
      };
    };
    
    
  };
}

//Mostrar datos noticias
/*
function mostrarDatos() {
  const request = indexedDB.open('Janal', 1);

  request.onerror = function(event) {
    console.log('Error al abrir la base de datos');
  };

  request.onsuccess = function(event) {
    const db = event.target.result;

    const transaction = db.transaction('Noticias', 'readonly');
    const objectStore = transaction.objectStore('Noticias');

    const requestGet = objectStore.get(id);

    requestGet.onsuccess = function(event) {
      const data = event.target.result;

      if (data) {
        const titulo = data.titulo;
        const cuerpo = data.cuerpo;

        const pElement = document.getElementById('titulo');
        pElement.textContent = `${titulo}`;

        const pElement2 = document.getElementById('cuerpo');
        pElement2.textContent = `${cuerpo}`;
      } else {
        console.log('No se encontraron datos con el ID especificado');
      }
    };

    requestGet.onerror = function(event) {
      console.log('Error al obtener los datos');
    };

    transaction.oncomplete = function(event) {
      db.close();
    };
  };
  doImageTest();
}
*/
/*function doImageTest() {
  console.log('doImageTest');
  let image = document.querySelector('#image');
  let recordToLoad = parseInt(3);
  if(recordToLoad === '') recordToLoad = 1;

  let trans = db.transaction(['Noticias'], 'readonly');
  //hard coded id
  let req = trans.objectStore('Noticias').get(recordToLoad);
  req.onsuccess = function(e) {
    let record = e.target.result;
    console.log('get success', record);
    image.src = 'data:image/jpeg;base64,' + btoa(record.data);
  }
}*/

function mostrarNoticiasEnTarjetas() {

    const transaction = db.transaction('Noticias', 'readonly');
    const objectStore = transaction.objectStore('Noticias');

    const requestGetAll = objectStore.getAll();

    requestGetAll.onsuccess = function(event) {
      const noticias = event.target.result;

      if (noticias && noticias.length > 0) {
        // Crea las tarjetas con la cantidad de noticias obtenidas
        crearTarjetas(noticias.length);
        

        // Llenar cada tarjeta con los datos de las noticias
        for (let i = 0; i < noticias.length; i++) {
          const noticia = noticias[i];
          const tituloElement = document.getElementById(`titulo${i + 1}`);
          const cuerpoElement = document.getElementById(`cuerpo${i + 1}`);
          const imageElement = document.getElementById(`image${i + 1}`);

          tituloElement.textContent = noticia.titulo;
          cuerpoElement.textContent = noticia.cuerpo;
          imageElement.src = 'data:image/jpeg;base64,' + btoa(noticia.data);
        }
      } else {
        console.log('No se encontraron noticias en la base de datos');
      }
    };

    requestGetAll.onerror = function(event) {
      console.log('Error al obtener las noticias');
    };

    transaction.oncomplete = function(event) {
      db.close();
    };
  
}

/*function mostrarNoticiasIndex() {

  const transaction = db.transaction('Noticias', 'readonly');
  const objectStore = transaction.objectStore('Noticias');

  const requestGetAll = objectStore.getAll();

  requestGetAll.onsuccess = function(event) {
    const noticias = event.target.result;

    if (noticias && noticias.length > 0) {
      // Crea las tarjetas con la cantidad de noticias obtenidas
      crearCardIndex(noticias.length);
      

      // Llenar cada tarjeta con los datos de las noticias
      for (let i = 0; i < noticias.length; i++) {
        const noticia = noticias[i];
        const tituloElement = document.getElementById(`titulo${i + 1}`);
        const cuerpoElement = document.getElementById(`cuerpo${i + 1}`);
        const imageElement = document.getElementById(`img${i + 1}`);

        tituloElement.textContent = noticia.titulo;
        cuerpoElement.textContent = noticia.cuerpo;
        imageElement.src = 'data:image/jpeg;base64,' + btoa(noticia.data);
      }
    } else {
      console.log('No se encontraron noticias en la base de datos');
    }
  };

  requestGetAll.onerror = function(event) {
    console.log('Error al obtener las noticias');
  };

  transaction.oncomplete = function(event) {
    db.close();
  };

}*/
function mostrarNoticiasIndex() {
  const transaction = db.transaction('Noticias', 'readonly');
  const objectStore = transaction.objectStore('Noticias');

  const requestGetAll = objectStore.getAll();

  requestGetAll.onsuccess = function(event) {
    const noticias = event.target.result;

    if (noticias && noticias.length > 0) {
      // Crea las tarjetas con la cantidad de noticias obtenidas
      crearCardIndex(noticias.length);

      // Llenar cada tarjeta con los datos de las noticias que tienen título "abc"
      for (let i = 0; i < noticias.length; i++) {
        const noticia = noticias[i];
        if (noticia.titulo === "abc") { // Filtrar por título "abc"
          const tituloElement = document.getElementById(`titulo${i + 1}`);
          const cuerpoElement = document.getElementById(`cuerpo${i + 1}`);
          const imageElement = document.getElementById(`img${i + 1}`);

          tituloElement.textContent = noticia.titulo;
          cuerpoElement.textContent = noticia.cuerpo;
          imageElement.src = 'data:image/jpeg;base64,' + btoa(noticia.data);
        }
      }
    } else {
      console.log('No se encontraron noticias en la base de datos');
    }
  };

  requestGetAll.onerror = function(event) {
    console.log('Error al obtener las noticias');
  };

  transaction.oncomplete = function(event) {
    db.close();
  };
}



function mostrarIDBoton2() {
  var urlParams = new URLSearchParams(window.location.search);
  var botonId = urlParams.get('id');
  console.log(botonId);
  guardarCambiosNoticia(botonId);
  
}
function mostrarIDBoton3() {
  const urlParams = new URLSearchParams(window.location.search);
  const botonId = urlParams.get('id');
  console.log(botonId);
  restablecer(botonId);
}
/*
function restablecer(id) {
  const idd = parseInt(id);
  const request = indexedDB.open('Janal', 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('Noticias', { keyPath: 'id', autoIncrement: true });
    // Puedes definir la estructura de la tabla 'Noticias' aquí si aún no existe
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log('Base de datos abierta correctamente.');

    const transaction = db.transaction('Noticias', 'readonly');
    const objectStore = transaction.objectStore('Noticias');

    const requestGetAll = objectStore.get(idd);

    requestGetAll.onsuccess = function (event) {
      const noticiaa = event.target.result;
      console.log('id:', id);
      if (noticiaa) {
        const tituloElement = document.getElementById('titulo');
        const cuerpoElement = document.getElementById('noticia');
        const imageElement = document.getElementById('img-result');

        tituloElement.textContent = noticiaa.titulo;
        cuerpoElement.textContent = noticiaa.cuerpo;
        imageElement.src = 'data:image/jpeg;base64,' + btoa(noticiaa.data);
      } else {
        console.log('No se encontró la noticia con el ID especificado');
      }
    };

    requestGetAll.onerror = function (event) {
      console.log('Error al obtener la noticia:', event.target.error);
    };

    transaction.oncomplete = function (event) {
      console.log('Transacción completada.');
      // Now you can perform additional read or write operations if needed.
      // Or if you don't need any further operations, you can close the connection here.
      db.close();
    };

    transaction.onerror = function (event) {
      console.log('Error en la transacción:', event.target.error);
      // Close the connection if an error occurs during the transaction.
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log('Error al abrir la base de datos:', event.target.error);
  };
}*/


function mostrarEditNoticias(id) {

  const idd = parseInt(id);
  const transaction = db.transaction('Noticias', 'readonly');
  const objectStore = transaction.objectStore('Noticias');

  const requestGetAll = objectStore.get(idd);

  requestGetAll.onsuccess = function (event) {
    const noticiaa = event.target.result;
    console.log('id:', id);
    if (noticiaa) {
      const tituloElement = document.getElementById('titulo');
      const cuerpoElement = document.getElementById('noticia');
      const imageElement = document.getElementById('img-result');

      tituloElement.textContent = noticiaa.titulo;
      cuerpoElement.textContent = noticiaa.cuerpo;
      imageElement.src = 'data:image/jpeg;base64,' + btoa(noticiaa.data);
    } else {
      console.log('No se encontró la noticia con el ID especificado');
    }
  };

  requestGetAll.onerror = function (event) {
    console.log('Error al obtener la noticia:', event.target.error);
  };

  transaction.oncomplete = function (event) {
    console.log('Transacción completada.');
    // Now you can perform additional read or write operations if needed.
    // Or if you don't need any further operations, you can close the connection here.
    db.close();
  };

  transaction.onerror = function (event) {
    console.log('Error en la transacción:', event.target.error);
    // Close the connection if an error occurs during the transaction.
    db.close();
  };
}

// Additional functions and event handlers...


function boton(id){
    // Obtener el ID del botón que se hizo clic
    
    const botonId = obtenerUltimoValorId(id);
    
    // Cambiar a una nueva pestaña
    window.location.href = './editarNoticias.html?id=' + encodeURIComponent(botonId);
}
  



// Crear Cards para noticias

function crearTarjetas(numTarjetas) {
  const container = document.getElementById('noticiass'); // El elemento contenedor donde se agregarán las tarjetas
  let contador = 1; // Contador para el ID de las tarjetas

  for (let i = 0; i < numTarjetas; i++) {
    // Creamos los elementos y configuramos sus atributos
    const divColSm12 = document.createElement('div');
    divColSm12.className = 'col-sm-12';
    divColSm12.id = `noticia${contador}`;

    const divCard2 = document.createElement('div');
    divCard2.className = 'card';

    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';

    const divRow = document.createElement('div');
    divRow.className = 'row';

    const divColLg3_1 = document.createElement('div');
    divColLg3_1.className = 'col-sm-3';

    const divColSm6 = document.createElement('div');
    divColSm6.className = 'col-sm-6 card-img';

    const img = document.createElement('img');
    img.id = `image${contador}`;
    img.className = 'img-fluid rounded';

    const divColLg3_2 = document.createElement('div');
    divColLg3_2.className = 'col-sm-3';

    const divCardTitulo = document.createElement('div');
    divCardTitulo.className = 'card-titulo';

    const pTitulo = document.createElement('p');
    pTitulo.className = 'fs-6 fw-bold p_top';
    pTitulo.id = `titulo${contador}`;
    //pTitulo.textContent = `CARD NUMERO ${contador}`;

    const divLineClamp = document.createElement('div');
    divLineClamp.className = 'card-texto';

    const pCuerpo = document.createElement('p');
    pCuerpo.id = `cuerpo${contador}`;
    //pCuerpo.textContent = 'Dolor modi';

    const divFlexRow = document.createElement('div');
    divFlexRow.className = 'flex-row text-end';

    // Construimos la estructura jerárquica
    divColSm12.appendChild(divCard2);
    divCard2.appendChild(divCardBody);
    divCardBody.appendChild(divRow);
    divRow.appendChild(divColLg3_1);
    divRow.appendChild(divColSm6);
    divColSm6.appendChild(img);
    divRow.appendChild(divColLg3_2);
    divCardBody.appendChild(divCardTitulo);
    divCardTitulo.appendChild(pTitulo);
    divCardBody.appendChild(divLineClamp);
    divLineClamp.appendChild(pCuerpo);
    divCardBody.appendChild(divFlexRow);

    // Agregamos la tarjeta al contenedor
    container.appendChild(divColSm12);

    contador++; 
  }
}

//cards para noticas index
function crearCardIndex(numero) {
  const container = document.getElementById('cardContainer'); // El elemento contenedor donde se agregarán las tarjetas
  let contador = 1; // Contador para el ID de las tarjetas

  for (let i = 0; i < numero; i++) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-lg-3';
  colDiv.id = `card${contador}`;

  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  const divimg = document.createElement('div');
    divimg.className = 'card-img';

  const imgElement = document.createElement("img");
  imgElement.className = "img-fluid rounded";
  imgElement.id = `img${contador}`;

  const cardTitleDiv = document.createElement("div");
  cardTitleDiv.className = "card-titulo";

  const titleParagraph = document.createElement("p");
  titleParagraph.className = "fs-6 fw-bold p_top";
  titleParagraph.id = `titulo${contador}`;

  const cardTextDiv = document.createElement("div");
  cardTextDiv.className = "card-texto";

  const bodyParagraph = document.createElement("p");
  bodyParagraph.id = `cuerpo${contador}`;

  const flexRowDiv = document.createElement("div");
  flexRowDiv.className = "flex-row text-end";

  const linkElement = document.createElement("a");
  linkElement.href = `seguridad-alimentaria.html#noticia${contador}`;
  linkElement.className = "link-card";
  linkElement.id = `link${contador}`;
  linkElement.textContent = `Ver más..`;

  flexRowDiv.appendChild(linkElement);
  cardTextDiv.appendChild(bodyParagraph);
  cardTitleDiv.appendChild(titleParagraph);
  divimg.appendChild(imgElement);
  cardBodyDiv.appendChild(divimg);
  cardBodyDiv.appendChild(cardTitleDiv);
  cardBodyDiv.appendChild(cardTextDiv);
  cardBodyDiv.appendChild(flexRowDiv);
  cardDiv.appendChild(cardBodyDiv);
  colDiv.appendChild(cardDiv);
  
  container.appendChild(colDiv);

  contador++;

}
}

function crearCardNoticias() {
  const container = document.getElementById('editarNoticias');

  const transaction = db.transaction('Noticias', 'readonly');
  const objectStore = transaction.objectStore('Noticias');
  const requestGetAll = objectStore.getAll();

  requestGetAll.onsuccess = (event) => {
    const noticiasData = event.target.result;
    console.log('Todos los datos de la tabla Noticias:', noticiasData);

    noticiasData.forEach((noticia) => {
      const contador = noticia.id; // Aquí obtienes el key path id de cada objeto
      console.log('ID:', contador);

      const colDiv = document.createElement('div');
      colDiv.className = 'col-lg-3';
      colDiv.id = `card${contador}`;

      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.className = "card-body";

      const divimg = document.createElement('div');
      divimg.className = 'card-img2';

      const imgElement = document.createElement("img");
      imgElement.className = "img-fluid rounded";
      imgElement.id = `img${contador}`;

      const cardTitleDiv = document.createElement("div");
      cardTitleDiv.className = "card-titulo";

      const titleParagraph = document.createElement("p");
      titleParagraph.className = "fs-6 fw-bold p_top";
      titleParagraph.id = `titulo${contador}`;

      const cardTextDiv = document.createElement("div");
      cardTextDiv.className = "card-texto2";

      const bodyParagraph = document.createElement("p");
      bodyParagraph.id = `cuerpo${contador}`;

      const flexRowDiv = document.createElement("div");

      const linkElement = document.createElement("button");
      linkElement.className = "btn";
      linkElement.id = `btnPubli${contador}`;
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-file-arrow-up";

      const linkElement2 = document.createElement("button");
      linkElement2.className = "btn";
      linkElement2.onclick = function() {
        boton(this.id);
      }
      linkElement2.id = `btnEditar${contador}`;
      const icon2 = document.createElement("i");
      icon2.className = "fa-solid fa-file-pen";

      const linkElement3 = document.createElement("button");
      linkElement3.className = "btn";
      linkElement3.onclick = function() {
        obtenerIdBoton(this.id);
      }
      linkElement3.id = `btnBorrar${contador}`;
      const icon3 = document.createElement("i");
      icon3.className = "fa-solid fa-trash";

      linkElement.appendChild(icon);
      flexRowDiv.appendChild(linkElement);
      linkElement2.appendChild(icon2);
      flexRowDiv.appendChild(linkElement2);
      linkElement3.appendChild(icon3);
      flexRowDiv.appendChild(linkElement3);
      cardTextDiv.appendChild(bodyParagraph);
      cardTitleDiv.appendChild(titleParagraph);
      divimg.appendChild(imgElement);
      cardBodyDiv.appendChild(divimg);
      cardBodyDiv.appendChild(cardTitleDiv);
      cardBodyDiv.appendChild(cardTextDiv);
      cardBodyDiv.appendChild(flexRowDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      container.appendChild(colDiv);

      // Llenar cada tarjeta con los datos de la noticia
      titleParagraph.textContent = noticia.titulo;
      bodyParagraph.textContent = noticia.cuerpo;
      imgElement.src = 'data:image/jpeg;base64,' + btoa(noticia.data);
    });
  };

  requestGetAll.onerror = (event) => {
    console.error('Error al obtener los datos de la tabla Noticias', event);
  };
}


//recien agregado
function obtenerUltimoValorId(id) { 
  const partes = id.split(/\D+/); 
  const numeros = partes.filter((parte) => parte !== '');
  if (numeros.length > 0) {
    return parseInt(numeros[numeros.length - 1]);     
  } else {
    return null; 
  }
}


function obtenerIdBoton(id) {
  const ultimoNumero = obtenerUltimoValorId(id);/*
  if (ultimoNumero !== null) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta noticia?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Noticia eliminada', '', 'success')
        console.log("Último número del ID:", ultimoNumero);*/
        console.log("Último número del ID:", ultimoNumero);
        eliminarUsuario(ultimoNumero);
     /* } else if (result.isDenied) {
        
      }
    })
    
  } else {
    console.log("No se encontró ningún número en el ID.");
  }*/
}
function publicarNoticia(id){ 
  const idnoti = document.getElementById(id);
  if(idnoti.value == 'Q'){
    Swal.fire({
      title: 'Desea Publicar esta noticia?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Proceso exitoso', '', 'success');
        idnoti.className ="btn btnUpload";
        idnoti.value = "P"
      } else if (result.isDenied) {
        
      }
    })
  }
  if(idnoti.value == 'P'){
    Swal.fire({
      title: 'Desea Quitar esta noticia?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Proceso exitoso', '', 'success');
        idnoti.className ="btn";
        idnoti.value = "Q"
      } else if (result.isDenied) {
        
      }
    })
  }
  
}

      

// --Cierra mostrar datos noticias--

//Jalar datos del Administrador
/*
function obtenerUsuario(id) {


    const transaction = db.transaction('Administrador', 'readonly');
    const objectStore = transaction.objectStore('Administrador');

    const requestGet = objectStore.get(id);

    requestGet.onsuccess = function(event) {
      const usuario = event.target.result;

      if (usuario) {
        // Asignar los valores del usuario a los campos de los inputs
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("apellidoPa").value = usuario.apellidoPa;
        document.getElementById("apellidoMa").value = usuario.apellidoMa;
        document.getElementById("instituto").value = usuario.instituto;
        document.getElementById("edad").value = usuario.edad;
        document.getElementById("contra").value = usuario.contra;
        document.getElementById("telefono").value = usuario.telefono;
        document.getElementById("correo").value = usuario.correo;
        document.whiskeyForm.setAttribute('data-key', usuario.id);
      } else {
        console.log('No se encontró el usuario con el ID especificado');
      }
    };

}
*/
function abrirBaseDatos() {
  const request = indexedDB.open('Janal', 1);

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('Noticias', { keyPath: 'id', autoIncrement: true });
    // Puedes definir la estructura de la tabla 'Noticias' aquí si aún no existe
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Base de datos abierta correctamente.');
  };

  request.onerror = function(event) {
    console.log('Error al abrir la base de datos:', event.target.error);
  };
}
 
function guardarCambiosNoticia(idd) {
  const id = parseInt(idd);
  console.log("ddd", id);
  const titulo = document.getElementById('titulo').value;
  const cuerpo = document.getElementById('noticia').value;
  const imagenBase64 = document.getElementById('img-result').src.split(',')[1];

  const request = indexedDB.open('Janal', 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('Noticias', { keyPath: 'id', autoIncrement: true });
    // Puedes definir la estructura de la tabla 'Noticias' aquí si aún no existe
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log('Base de datos abierta correctamente.');

    const transaction = db.transaction('Noticias', 'readwrite');
    const objectStore = transaction.objectStore('Noticias');

    const requestUpdate = objectStore.get(id);

    requestUpdate.onsuccess = function (event) {
      const noticia = event.target.result;

      if (noticia) {
        noticia.titulo = titulo;
        noticia.cuerpo = cuerpo;
        noticia.data = atob(imagenBase64);

        const requestUpdateData = objectStore.put(noticia);

        requestUpdateData.onsuccess = function (event) {
          console.log('Noticia actualizada con éxito.');
        };

        requestUpdateData.onerror = function (event) {
          console.log('Error al actualizar la noticia:', event.target.error);
        };
      } else {
        console.log('No se encontró la noticia con el ID especificado.');
      }
    };

    requestUpdate.onerror = function (event) {
      console.log('Error al obtener la noticia:', event.target.error);
    };

    transaction.oncomplete = function (event) {
      console.log('Transacción completada.');
      db.close();
    };
  };

  request.onerror = function (event) {
    console.log('Error al abrir la base de datos:', event.target.error);
  };
}

  function makeTX(storeName, mode) {
  let tx = db.transaction(storeName, mode);
  tx.onerror = (err) => {
    console.warn(err);
  };
  return tx;
}


function eliminarUsuario(id) {
  if (id) {
    let tx = makeTX('Noticias', 'readwrite');
    tx.oncomplete = (ev) => {
    };

    let store = tx.objectStore('Noticias');
    let request = store.delete(id);
    request.onsuccess = (ev) => {
      console.log('Objeto eliminado exitosamente');
    };
    request.onerror = (err) => {
      console.log('Error al intentar eliminar el objeto');
    };
  }
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
               };

               request.onsuccess = function() {
                if (!request.result) {
                  mostrarAlertaCorreo();
                } else if (Contrasenia == request.result.Contrasenia) {
                  control(window.location.href = 'pestañas_Encuestador/dashboard.html');
                } else {
                  mostrarAlerta();
                }
              };
            

            function mostrarAlertaCorreo() {
              var alertaCorreoDiv = document.querySelector("#alertaCorreo");
              alertaCorreoDiv.textContent = "El correo ingresado es incorrecto o no existe";
              alertaCorreoDiv.style.color = "red";

              setTimeout(function() {
                alertaCorreoDiv.textContent = "";
              }, 3000); // 5 segundos de retardo (5000 milisegundos)
            }
          
            function mostrarAlerta() {
              var alertaDiv = document.querySelector("#alerta");
              alertaDiv.textContent = "Contraseña incorrecta";
              alertaDiv.style.color = "red";
              
              setTimeout(function() {
                alertaDiv.textContent = "";
              }, 3000); // 5 segundos de retardo (5000 milisegundos)
        }
    }

    function enviarFormulario() {
      
      var valorInput1 = document.getElementById("Usuario").value;
      // var valorInput2 = document.getElementById("contraseniaL").value;
      
      var datos = {
        valor1: valorInput1,
        // valor2: valorInput2
      };
      
      localStorage.setItem("datosUsuario", JSON.stringify(datos));
    }
    
    function cargarPagina() {
      var datosGuardados = localStorage.getItem("datosUsuario");
      
      if (datosGuardados) {
        var datos = JSON.parse(datosGuardados);
        var valorInput1 = datos.valor1;
        // var valorInput2 = datos.valor2;
        
        document.getElementById("aqui").value = valorInput1;
        // document.getElementById("contra").value = valorInput2;
      }
    }
  
    //Comparar datos 
    function miFuncion() {
      console.log("Iniciando ejecución de la función.");
    
      var datosUsuario = localStorage.getItem("datosUsuario");
      if (datosUsuario) {
        var datos = JSON.parse(datosUsuario);
        var primerValor = datos.valor1;
    
        console.log("El valor de primerValor es:", primerValor);
    
        var request = indexedDB.open('Janal', 1);
    
        request.onsuccess = function(event) {
          var db = event.target.result;
          var transaction = db.transaction(['Usuario'], 'readonly');
          var objectStore = transaction.objectStore('Usuario');
    
          var request = objectStore.openCursor();
          request.onsuccess = function(event) {
            var cursor = event.target.result;
    
            if (cursor) {
              var objeto = cursor.value;
              var correoUsuario = objeto.correo;

    
              if (correoUsuario === primerValor) {
                console.log("El valor coincide.");

                var nombreUsuario = objeto.Nombre;
                var EdadUsuario = objeto.Edad;
                var TelefonoUsuario = objeto.Telefono;
                var ApaUsuario = objeto.ApellidoP;
                var AmaUsuario = objeto.ApellidoM;
                var GeneroUsuario = objeto.Genero;
        
                if (GeneroUsuario === 'Masculino') {
                  document.getElementById('genMas').checked = true;
                } else if (GeneroUsuario === 'Femenino') {
                  document.getElementById('genfem').checked = true;
                }
        
                document.getElementById("nombre").value = nombreUsuario;
                document.getElementById("edad").value = EdadUsuario;
                document.getElementById("telefono").value = TelefonoUsuario;
                document.getElementById("apellidoPa").value = ApaUsuario;
                document.getElementById("apellidoMa").value = AmaUsuario;
                // Realiza alguna acción si el valor coincide
                var transactionAutenticasion = db.transaction(['Autenticasion'], 'readonly');
                var objectStoreAutenticasion = transactionAutenticasion.objectStore('Autenticasion');
    
                var requestAutenticasion = objectStoreAutenticasion.openCursor();
                requestAutenticasion.onsuccess = function(event) {
                  var cursorAutenticasion = event.target.result;
    
                  if (cursorAutenticasion) {
                    var objetoAutenticasion = cursorAutenticasion.value;
                    var correoAutentico = objetoAutenticasion.correo;
    
                    if (correoAutentico === primerValor) {
                      console.log("El valor del correo Autentico coincide en el almacén Autenticación");
                  // Realiza alguna acción si el valor del correo coincide

                  var ContraseniaAutenticasion = objetoAutenticasion.contrasenia;
              
                  document.getElementById("contra").value = ContraseniaAutenticasion;
                  // Suponiendo que "logoInstitucion" es un elemento de tipo <img>
                 
                }else {
                  console.log("No se encontró el objeto coincidente en el almacén Autenticacion");
                  // Realiza alguna acción si no se encontró el objeto coincidente
                }
              };

                cursorAutenticasion.continue(); // Continúa al siguiente objeto del almacén nombreEncuestador
              } 
                var transactionEncuestador = db.transaction(['Encuestador'], 'readonly');
                var objectStoreEncuestador = transactionEncuestador.objectStore('Encuestador');
    
                var requestEncuestador = objectStoreEncuestador.openCursor();
                requestEncuestador.onsuccess = function(event) {
                  var cursorEncuestador = event.target.result;
    
                  if (cursorEncuestador) {
                    var objetoEncuestador = cursorEncuestador.value;
                    var correoEncuestador = objetoEncuestador.correo;
    
                    if (correoEncuestador === primerValor) {
                      console.log("El valor del correo coincide en el almacén nombreEncuestador");
                  // Realiza alguna acción si el valor del correo coincide

                  var Nombreinstitucion = objetoEncuestador.proce;
                  var Logoinstitucion = objetoEncuestador.dataUrl;

                  document.getElementById("institucion").value = Nombreinstitucion;
                  // Suponiendo que "logoInstitucion" es un elemento de tipo <img>
                  document.getElementById("logoInstitucion").src = Logoinstitucion;
                  
                  ImagenLogo(Logoinstitucion);
                }

                cursorEncuestador.continue(); // Continúa al siguiente objeto del almacén nombreEncuestador
              } else {
                console.log("No se encontró el objeto coincidente en el almacén nombreEncuestador");
                // Realiza alguna acción si no se encontró el objeto coincidente
              }
            };
          }

          cursor.continue(); // Continúa al siguiente objeto del almacén Usuario
        } else {
          console.log("No se encontró el objeto coincidente.");
          // Realiza alguna acción si no se encontró el objeto coincidente
        }
      };
    };
  } else {
    console.log("No se encontraron datos en el almacenamiento local.");
    // Realiza alguna acción cuando no hay datos en el almacenamiento local
  }
}

function ImagenLogo(dataUrl) {
  console.log('doImageTest');
  var image = document.querySelector('#logoInstitucion');
  image.src = dataUrl;
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
        buscarE()
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

      function agregarDatosAdmin() {
           
          const admin = [
            { nombre: 'Admin1', apellidoPa: 'ApellidoP1', apellidoMa: 'ApellidoM1', genero: 'Masculino', edad: 99, 
            contra: 'jk1234', instituto: 'none', correo: 'admin1@example.com', telefono: '9998887777' },
            { nombre: 'Admin2', apellidoPa: 'ApellidoP2', apellidoMa: 'ApellidoM2', genero: 'Femenino', edad: 99, 
            contra: 'jk1234', instituto: 'none', correo: 'admin2@example.com', telefono: '9998887777' },
            { nombre: 'Admin3', apellidoPa: 'ApellidoP3', apellidoMa: 'ApellidoM3', genero: 'Masculino', edad: 99, 
            contra: 'jk1234', instituto: 'none', correo: 'admin3@example.com', telefono: '9998887777' },
            { nombre: 'Admin4', apellidoPa: 'ApellidoP4', apellidoMa: 'ApellidoM4', genero: 'Femenino', edad: 99, 
            contra: 'jk1234', instituto: 'none', correo: 'admin4@example.com', telefono: '9998887777' },
            { nombre: 'Admin5', apellidoPa: 'ApellidoP5', apellidoMa: 'ApellidoM5', genero: 'Masculino', edad: 99, 
            contra: 'jk1234', instituto: 'none', correo: 'admin5@example.com', telefono: '9998887777' },
          ];
      
          var transaction = db.transaction(['Administrador'], 'readwrite');
          var objectStore = transaction.objectStore('Administrador');

          // Verificar si los datos ya se han agregado previamente
          var requestGetAll = objectStore.getAll();
          requestGetAll.onsuccess = function(event) {
            var adminsExisten = event.target.result.length > 0;

            if (!adminsExisten) {
              // Si los datos no existen, agregarlos a la base de datos
              for (var Admin of admin) {
                var requestAdd = objectStore.add(Admin);
                requestAdd.onerror = function(event) {
                  console.error('Error al agregar administrador:', event.target.error);
                };
              }

              transaction.oncomplete = function(event) {
                console.log('Datos de administradores agregados exitosamente.');
              };
            } else {
              console.log('Los datos de administradores ya existen, no se agregarán nuevamente.');
            }
          };

          requestGetAll.onerror = function(event) {
            console.error('Error al obtener los administradores:', event.target.error);
          };
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
            //console.log(llave);
           
             if(confirm(llave)){
               var tx =db.transaction("selecVariables","readwrite");
               var objectStore = tx.objectStore("selecVariables");
               var request = objectStore.add({idV2:llave,fechaCreacion: Date.now()} );
             
               request.onsuccess =function(){
                mostrarVarSelec()
                //mostrarEncuestaVar()
              //  console.log(llave)
               };
          
             }
             //guardar()
            //  activarGuardar();
         }

        //  function mostrarVariablesSeleccionadas() {
        //   var transaction = db.transaction("selecVariables", "readonly");
        //   var store = transaction.objectStore("selecVariables");
        
        //   store.openCursor().onsuccess = function (event) {
        //     var cursor = event.target.result;
        
        //     if (cursor) {
        //       console.log(cursor.value);
        //       cursor.continue();
        //     }
        //   };
        // }
// salida de tipos encuesta
//mostrar 
//-----------------------------------------------------------------------------------------------------------------------
function mostrarVarSelec() {
  var cadena = "<table class='table table-bordered'>";
  var lastTimestamp = Date.now();

  var objectStore = db.transaction("selecVariables").objectStore("selecVariables");
  objectStore.openCursor().onsuccess = function (e) {
    var cursor = e.target.result;
    if (cursor) {
      var item = cursor.value;
      var timestamp = Date.now();

      if (timestamp > lastTimestamp) {
        cadena += "<tr>";
        cadena += "<td>" + item.idV2 + "</td>";
        cadena += "</tr>";
      }
      
      cursor.continue();
    } else {
      cadena += "</table>";
      document.getElementById("VariablesSeleccionadas").innerHTML = cadena;
    }
  };
  EncuestaVarMostrar(encuestaVarId)
}

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

     
//-----------------------------------------------------------------------------------------------------------------------
     

    
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
      .add({Titulo:titulo, Objetivo:Objetivo, Instrucciones:Instrucciones,fechaCreacionV:value=Date.now()});

      request.onsuccess = function(e){
        var encuestaId = e.target.result
        console.log("ID de la encuesta: ", encuestaId);
        // console.log(e);
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
    mostrarEncuestaDatos()
   // EncuestaVistaVariables();
        //validarER() 
       }

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

            Swal.fire({
              title: "Acción exitosa",
              text: "El reactivo se ha creado correctamente.",
              icon: "success",
              timer: 4000, // Mostrar el aviso por 3 segundos
              showConfirmButton: true,
              timerProgressBar: true,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Okay'
            }).then(function() {
              // Aquí puedes agregar el código que debe ejecutarse después de que el aviso desaparezca
              document.getElementById("ReactivoCre").value = '';
              document.getElementById("CategoriaReactivos").value = '';
              document.getElementById('TipoRes').selectedIndex = 0;
              mostrarPreguntas(); 
            });

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
      var id = document.getElementById("NomV").value.trim();
      var sigla = document.getElementById("SiglaV").value.trim();
      var descripcion = document.getElementById("desV").value.trim();
      
      var CrearV = {
       id,
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
        id = cursor.value.id;
        cadena += "<tr>";
        cadena +="<td><input type ='checkbox' name='selectedVariable' id='sV"+id+"'></input></td>";
        cadena +="<td>"+cursor.value.id+"</td>";
        cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'b"+id+"'><img src='../Img/borrar.png' height='18px width='18px'></button></td>";
        cadena += "<td><button class='btn btn-outline-success bg-border-mostaza bg-text-mostaza' id= 'e"+id+"'><img src='../Img/edit.svg' height='18px width='18px'></button></td>";
        //cadena +="<td><button id='m"+id+"'<img src='../Img/edit.svg'  height='18px'width='18px'>></button></td>";
        cadena += "</tr>";
        ids_array.push(id);
        num++;
        cursor.continue();
  
      }else{
        cadena += "</table>"
        document.getElementById("salidaVarC").innerHTML = cadena;
  
        for(var i=0; i<ids_array.length; i++){
          id = ids_array[i];
          document.getElementById("sV"+id).onclick= selecV;
          document.getElementById("e"+id).onclick= modificar;
          document.getElementById("b"+id).onclick= borrar;
        }
      }
    };




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
 document.getElementById("NomV").value= request.result.id;
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


function selecV(e) {
 
  var id = e.target.id.substring(2);

  if (id) {
 
    var tx = db.transaction(["VariableC", "selecVariablesCre"], "readwrite");
    var objectStore = tx.objectStore("VariableC");
    var storeOtroObjeto = tx.objectStore("selecVariablesCre");
    var request = objectStore.get(id);

    request.onsuccess = function (e) {
      var variable = e.target.result;
      if (variable) {
        console.log("Elemento seleccionado: ", variable.id);
        storeOtroObjeto.add({ VariablesId: variable.id,fechaCreacion: Date.now() });
      } else {
        console.log("No se encontró el objeto en el almacén 'VariableC'.");
      }
    };
  }

}



//-----------------------------------------------------------------------------------------------------


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

      Swal.fire({
        title: "Acción exitosa",
        text: "La encuesta se ha creado correctamente.",
        icon: "success",
        timer: 4000, // Mostrar el aviso por 3 segundos
        showConfirmButton: true,
        timerProgressBar: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay'
      }).then(function() {
        // Aquí puedes agregar el código que debe ejecutarse después de que el aviso desaparezca
        buscarE();
        EncuestaVistaPV2();
      });
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

function validarImagen() {
  var archivo = document.getElementById('imagen').files[0];
  
  if (archivo) {
    var img = new Image();
    var limiteAncho = 115; // Ancho máximo permitido en píxeles
    var limiteAlto = 115; // Alto máximo permitido en píxeles
    
    if (archivo.type === 'image/png') {
      img.onload = function() {
        if (img.width <= limiteAncho && img.height <= limiteAlto) {
          // Las dimensiones de la imagen son válidas, puedes proceder con el guardado
        } else {
          alert('Las dimensiones de la imagen exceden el límite permitido (115x115)');
          document.getElementById('imagen').value = null; // Restablecer el valor del input
        }
      };
      
      img.src = URL.createObjectURL(archivo);
    } else {
      alert('Seleccione un archivo PNG válido');
      document.getElementById('imagen').value = null; // Restablecer el valor del input
    }
  }
}

function guardarImagen() {
  var archivo = document.getElementById('imagen').files[0];
  var Proce = document.getElementById('procedencia').value.trim();
  var correo =document.getElementById('Correo').value.trim();
  
  if (archivo) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var imagenDataUrl = event.target.result;
      guardarEnIndexedDB(imagenDataUrl, Proce, correo);
    };
    reader.readAsDataURL(archivo);
  }else{
    alert('No existe archivo para guardar');
  }
}

function guardarEnIndexedDB(dataUrl, proce, correo) {
  var request = indexedDB.open('Janal', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['Encuestador'], 'readwrite');
    var objectStore = transaction.objectStore('Encuestador');

    var imagen = {
      dataUrl: dataUrl,
      proce: proce,
      correo: correo
    };

    var solicitud = objectStore.add(imagen);

    solicitud.onsuccess = function(event) {
      console.log('Imagen y valor de "Proce" guardados en IndexedDB');
      var claveGenerada = event.target.result;
      // mostrarImagenEnDiv(claveGenerada);
    };

    solicitud.onerror = function() {
      console.error('Error al guardar la imagen y el valor de "Proce" en IndexedDB');
    };
  };

  request.onerror = function() {
    console.error('Error al abrir la base de datos');
  };
}

// document.getElementById('guardarBoton').addEventListener('click', guardarImagen);

function mostrarImagenEnDiv(claveGenerada) {
  var request = indexedDB.open('Janal', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['Encuestador'], 'readonly');
    var objectStore = transaction.objectStore('Encuestador');
    var solicitud = objectStore.get(claveGenerada);

    solicitud.onsuccess = function(event) {
      var resultado = event.target.result;

      if (resultado) {
        var imagenDataUrl = resultado.dataUrl;
        var imagenDiv = document.getElementById('imagenDiv');
        imagenDiv.innerHTML = `<img src="${imagenDataUrl}" >`;
      } else {
        console.error('No se encontró la imagen en el almacén "Encuestador"');
      }
    };

    solicitud.onerror = function() {
      console.error('Error al obtener la imagen del almacén "Encuestador"');
    };
  };

  request.onerror = function() {
    console.error('Error al abrir la base de datos');
  };
}


// function mostrarAlerta() {
  
//   alert
// alert("¡Botón presionado!");
// }
  
//Función para buscar encuentas por nombre

// Obtener los elementos del DOM
// document.getElementById('boton_filtrar').addEventListener('click', 
function realizarBusqueda() {
  var searchTerm = document.getElementById('filtrar').value.toLowerCase();

  if (searchTerm.trim() !== '') {
    var elementosDiv = document.querySelectorAll('#crear_encuesta td');
    var resultados = buscarElementos(elementosDiv, searchTerm);

    if (resultados.length > 0) {
      mostrarResultados(resultados);
    } else {
      mostrarAlerta('Error: Ingresa un término de búsqueda válido.');
    }}
  // } else {
  //   mostrarAlerta('Error: Ingresa un término de búsqueda válido.');
  // }
}

function buscarElementos(elementos, searchTerm) {
  var resultados = [];

  for (var i = 0; i < elementos.length; i++) {
    var elemento = elementos[i];
    var texto = elemento.textContent.toLowerCase();

    if (texto.includes(searchTerm)) {
      resultados.push(elemento);
    }
  }

  return resultados;
}

function mostrarResultados(resultados) {
  for (var i = 0; i < resultados.length; i++) {
    var resultado = resultados[i];
    var texto = resultado.textContent;

    var spanResaltado = document.createElement('span');
    spanResaltado.classList.add('resaltado');
    spanResaltado.textContent = texto;

    resultado.innerHTML = '';
    resultado.appendChild(spanResaltado);

    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function mostrarAlerta(mensaje) {
  var alertaModalBody = document.getElementById('alertaModalBody');
  alertaModalBody.textContent = mensaje;

  var alertaModal = new bootstrap.Modal(document.getElementById('alertaModal'), { backdrop: 'static' });
  alertaModal.show();
}


//Mostrar cual usuario esta logueado actualmente 
function verificarUsuarioLogueado() {
  var request = indexedDB.open('Janal', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['Usuarios'], 'readonly');
    var objectStore = transaction.objectStore('Usuarios');
    var solicitud = objectStore.getAll();

    solicitud.onsuccess = function(event) {
      var usuarios = event.target.result;

      if (usuarios && usuarios.length > 0) {
        // El usuario está logueado, puedes mostrar sus datos
        var usuarioLogueado = usuarios[0];
        mostrarDatosUsuario(usuarioLogueado);
      } else {
        // No hay usuario logueado
        // Puedes redirigir al usuario a la página de inicio de sesión
      }
    };

    solicitud.onerror = function() {
      console.error('Error al obtener los usuarios desde IndexedDB');
    };
  };

  request.onerror = function() {
    console.error('Error al abrir la base de datos');
  };
}

function mostrarDatosUsuario(usuario) {
  // Aquí puedes mostrar los datos del usuario en la página
  console.log(usuario);
}

var  encuestaVarId;

function crearEncuestaFinalVariables() {
  var TituloVar = document.getElementById("TituloVar").value.trim();
  var Objetivo = document.getElementById("floatingTextarea22").value.trim();
  var Instrucciones = document.getElementById('floatingTextarea23').value.trim();
  var fechaCreacionE = Date.now(); // Obtener la fecha actual en milisegundos

  var form = document.getElementById('formularioCR');

  form.addEventListener('submit', async function(eve) {
    eve.preventDefault();

    var request = db.transaction(["Encuesta_Variables"], "readwrite")
      .objectStore("Encuesta_Variables")
      .add({
        TituloVar: TituloVar,
        Objetivo: Objetivo,
        Instrucciones: Instrucciones,
        fechaCreacionE: fechaCreacionE
      });

    request.onsuccess = async function(e) {
      encuestaVarId = e.target.result;
      console.log("Encuesta creada con id: ", encuestaVarId, TituloVar);
      
      var VariablesSeleccionados = await obtenerVariablesSeleccionados() 
     
      var tx = db.transaction(["EncuestaVariablesFinal"], "readwrite");
      var store = tx.objectStore("EncuestaVariablesFinal");

      VariablesSeleccionados.forEach(function(VariablesId) {
        store.add({
          encuestaVarId:encuestaVarId,
          VariablesId: VariablesId
        });
      });
      
      tx.oncomplete = function() {
        console.log("Relación entre la encuesta y los reactivos creada correctamente");
       
        EncuestaVarMostrar(encuestaVarId)
        var mostrarTablaBtn = document.getElementById('mostrarTablaBtn');
        mostrarTablaBtn.addEventListener('click', function () {
          mostrarTablaEnOtraPestana(encuestaVarId);
        });
        
        //mostrarEncuestaVar()
      };

      console.log(e);
      alert("Se insertaron los datos");
    
    };
  });
}

async function obtenerVariablesSeleccionados() {
  var VariablesSeleccionados = [];
  var checkboxes = document.querySelectorAll("input[type='checkbox'][id^='sV']:checked");

  var transaction = db.transaction(["selecVariablesCre"], "readonly");
  var objectStore = transaction.objectStore("selecVariablesCre");
  var cursor = objectStore.openCursor(null, "prev");

  await new Promise((resolve) => {
    cursor.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var valor = cursor.value.VariablesId;
        if (!VariablesSeleccionados.includes(valor) && contieneCheckboxId(checkboxes, valor)) {
          VariablesSeleccionados.push(valor);
        }
        cursor.continue();
      } else {
        resolve();
      }
    };
  });

  return VariablesSeleccionados;
}

function contieneCheckboxId(checkboxes, id) {
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].id === 'sV' + id) {
      return true;
    }
  }
  return false;
}
// async function obtenerVariablesSeleccionados() {
//   var VariablesSeleccionados = [];
//   var checkbox = document.querySelectorAll("input[type='checkbox'][name='selectedVariable']:checked");
//  // var checkbox = document.querySelectorAll("input[type='checkbox'][id^='sV']:checked");

//   for (var i = 0; i < checkbox.length; i++) {
//     var id = checkbox[i].id.substring(2); // Eliminamos el prefijo 'sV' del ID del checkbox
//     VariablesSeleccionados.push({id});
//   }

//   return VariablesSeleccionados;
// }




function mostrarTablaEnOtraPestana(encuestaVarId) {
 
  var nuevaVentana = window.open('/pestañas_Encuestador/EncuestaVariables.html');

  // Cuando la ventana se haya cargado, llama a la función EncuestaVarMostrar para mostrar la tabla
  nuevaVentana.onload = function () {
    nuevaVentana.EncuestaVarMostrar(encuestaVarId);
  };
}


async function EncuestaVarMostrar(encuestaVarId) {
  var tablaEncuesta = document.getElementById('tablaEncuestaVar');
  var table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  var thead = document.createElement('thead');
  var trHeader = document.createElement('tr');
  var thIndex = document.createElement('th');
  thIndex.textContent = '#';
  trHeader.appendChild(thIndex);

  var tx = db.transaction(["EncuestaVariablesFinal"], "readonly");
  var store = tx.objectStore("EncuestaVariablesFinal");
  var index = store.index("encuestaVarId");
  var numColumns = 7; // Número de columnas por variable

  // Create a map to store variable names as keys and their corresponding data as values
  var variableDataMap = new Map();

  var cursor = await index.openCursor(IDBKeyRange.only(encuestaVarId));

  cursor.onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      var variableId = cursor.value.VariablesId;

      // Store the variable ID and data in the map
      variableDataMap.set(variableId, cursor.value);

      var th = document.createElement('th');
      th.textContent = variableId;
      trHeader.appendChild(th);

      cursor.continue();
    } else {
      thead.appendChild(trHeader);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');

      // Loop through the map to create rows for each variable
      for (const [variableId, data] of variableDataMap) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.textContent = variableId;
        tr.appendChild(td);

        for (var i = 1; i <= numColumns; i++) {
          var td = document.createElement('td');
          var select = document.createElement('select');
          select.addEventListener('change', function () {
            var variableId = this.parentElement.parentElement.firstChild.textContent;
            var selectedValue = this.value;
            obtenerVariablesSeleccionados(variableId, selectedValue);
          });
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
      }

      table.appendChild(tbody);
      tablaEncuesta.innerHTML = '';
      tablaEncuesta.appendChild(table);

      console.log('Encuesta mostrada correctamente');
    }
  };
}


function mostrarEncuestaDatos() {
  var transaction = db.transaction(["Encuesta_Variables"], "readonly");
  var objectStore = transaction.objectStore("Encuesta_Variables");
  var index = objectStore.index("fechaCreacionE");

  var request = index.openCursor(null, 'prev');
  
  request.onsuccess = function(event) {
    var cursor = event.target.result;
    
    if (cursor) {
      var currentItem = cursor.value;
      
      var titulo = currentItem.TituloVar;
      var objetivo = currentItem.Objetivo;
      var instrucciones = currentItem.Instrucciones;
      
      var cadena = "<table>";
      cadena += "<tr>";
      cadena += "<th>Título:</th>";
      cadena += "<td>" + titulo + "</td>";
      cadena += "</tr>";
      cadena += "<tr>";
      cadena += "<th>Objetivo:</th>";
      cadena += "<td>" + objetivo + "</td>";
      cadena += "</tr>";
      cadena += "<tr>";
      cadena += "<th>Instrucciones:</th>";
      cadena += "<td>" + instrucciones + "</td>";
      cadena += "</tr>";
      cadena += "</table>";
      
      document.getElementById("EncabezadoVariables").innerHTML = cadena;
    }
  };
}

//Realizar la edición de información de perfil encuestador

function deshabilitarBotones(aqui) {
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function (input) {
    // Habilitar todos los inputs, excepto aquel con el ID proporcionado en el parámetro 'aqui'
    if (input.id !== aqui && input.id !== 'procedenciaEditar' && input.id !== 'imagenEditar') {
      input.setAttribute('disabled', 'disabled');
    }
  });
}
function miFuncionEditar() {
  console.log("Iniciando ejecución de la función.");

  // Obtener los elementos de radio
  var radioMasculino = document.getElementById('genMas');
  var radioFemenino = document.getElementById('genfem');

  // Verificar si los elementos existen antes de acceder a sus propiedades
  if (!radioMasculino || !radioFemenino) {
    console.log("No se encuentran los elementos de radio.");
    return;
  }

  var generoSeleccionado;
  if (radioMasculino.checked) {
    generoSeleccionado = 'Masculino';
  } else if (radioFemenino.checked) {
    generoSeleccionado = 'Femenino';
  } else {
    console.log("No se ha seleccionado ningún género.");
    return; // Salimos de la función si no se ha seleccionado ningún género
  }

  var datosUsuario = localStorage.getItem("datosUsuario");
  if (datosUsuario) {
    var datos = JSON.parse(datosUsuario);
    var primerValor = datos.valor1;

    console.log("El valor de primerValor es:", primerValor);

    var request = indexedDB.open('Janal', 1);

    request.onsuccess = function (event) {
      var db = event.target.result;
      var transaction = db.transaction(['Usuario', 'Autenticasion'], 'readwrite'); // Transacción con ambos almacenes
      var objectStoreUsuario = transaction.objectStore('Usuario');
      var objectStoreAutenticasion = transaction.objectStore('Autenticasion');

      var request = objectStoreUsuario.openCursor();
      request.onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
          var objeto = cursor.value;
          var correoUsuario = objeto.correo;

          if (correoUsuario === primerValor) {
            console.log("El valor coincide.");

            // Realizar las ediciones necesarias en el objeto Usuario
            objeto.Nombre = document.getElementById("nombre").value;
            objeto.Edad = parseInt(document.getElementById("edad").value);
            objeto.ApellidoM = document.getElementById("apellidoMa").value;
            objeto.ApellidoP = document.getElementById("apellidoPa").value;
            objeto.Telefono = parseInt(document.getElementById("telefono").value);
            objeto.Genero = generoSeleccionado;

            // Actualizar el objeto Usuario en el almacén
            var updateRequestUsuario = cursor.update(objeto);
            updateRequestUsuario.onsuccess = function (event) {
              console.log("Objeto Usuario actualizado correctamente:", objeto);
            };

            // Luego, vamos a actualizar el objeto Autenticasion
            var requestAutenticasion = objectStoreAutenticasion.openCursor();
            requestAutenticasion.onsuccess = function(event) {
              var cursorAutenticasion = event.target.result;

              if (cursorAutenticasion) {
                var objetoAutenticasion = cursorAutenticasion.value;
                var correoAutentico = objetoAutenticasion.correo;

                if (correoAutentico === primerValor) {
                  console.log("El valor del correo Autentico coincide en el almacén Autenticacion");

                  // Realizar las ediciones necesarias en el objeto Autenticasion
                  objetoAutenticasion.Contrasenia = document.getElementById("contra").value;
                  objetoAutenticasion.Contrasenia2 = document.getElementById("contra").value;

                  // Actualizar el objeto Autenticasion en el almacén
                  var updateRequestAutenticasion = cursorAutenticasion.update(objetoAutenticasion);
                  updateRequestAutenticasion.onsuccess = function (event) {
                    console.log("Objeto Autenticasion actualizado correctamente:", objetoAutenticasion);
                  };
                } else {
                  console.log("No se encontró el objeto coincidente en el almacén Autenticacion");
                  // Realiza alguna acción si no se encontró el objeto coincidente
                }

                // Continuar buscando en el cursor de Autenticasion
                cursorAutenticasion.continue();
              } else {
                console.log("Fin de búsqueda en el almacén Autenticacion. No se encontró coincidencia.");
              }
            };
          } else {
            // Continuar buscando en el cursor de Usuario
            cursor.continue();
          }
        } else {
          console.log("Fin de búsqueda en el almacén Usuario. No se encontró coincidencia.");
        }
      };
    };

    request.onerror = function (event) {
      console.log("Error al abrir la base de datos:", event.target.error);
    };
  } else {
    console.log("No hay datos de usuario en el almacenamiento.");
  }
  deshabilitarBotones('aqui');
}

//Funcion para editar logo de Encuestador
// Función para leer el contenido de un archivo como data URL

var imageDataUrl;

function validarImagenLogo() {
  var archivo = document.getElementById('imagenEditar').files[0];

  if (archivo) {
    var limiteAncho = 115; // Ancho máximo permitido en píxeles
    var limiteAlto = 115; // Alto máximo permitido en píxeles

    if (archivo.type === 'image/png') {
      var img = new Image();

      // Utilizamos una nueva promesa para asegurar que la imagen se haya cargado completamente
      var imgPromise = new Promise((resolve, reject) => {
        img.onload = function () {
          resolve();
        };

        img.onerror = function () {
          reject(new Error("Error al cargar la imagen."));
        };
      });

      img.src = URL.createObjectURL(archivo);

      imgPromise
        .then(async function () {
          // Las dimensiones de la imagen son válidas
          console.log("Ancho de la imagen:", img.width);
          console.log("Alto de la imagen:", img.height);

          var reader = new FileReader();
          reader.onload = async function (event) {
            // Guardar el data URL en la variable imageDataUrl
            imageDataUrl = event.target.result;
            console.log("Data URL de la imagen:", imageDataUrl);

            // Llamar a editarLogo con el data URL y esperar a que se complete
            try {
              var objetoActualizado = await editarLogo(imageDataUrl);
              console.log("Objeto actualizado:", objetoActualizado);
            } catch (error) {
              console.error("Error al editar el logo:", error);
            }
          };

          reader.readAsDataURL(archivo);
        })
        .catch(function (error) {
          console.error("Error al cargar la imagen:", error);
        });
    } else {
      alert('Seleccione un archivo PNG válido');
      document.getElementById('imagenEditar').value = null; // Restablecer el valor del input
    }
  }
}


function imagenCargadaPromise() {
  return new Promise((resolve) => {
    // Espera un breve tiempo para asegurarse de que la carga de la imagen haya finalizado.
    // Puedes ajustar el tiempo según tus necesidades.
    setTimeout(resolve, 200);
  });
}

function editarLogo(imageDataUrl) {
  console.log("Data URL de la imagen:", imageDataUrl);

  return new Promise((resolve, reject) => {
    var datosUsuario = localStorage.getItem("datosUsuario");
    if (!datosUsuario) {
      console.log("No hay datos de usuario en el almacenamiento.");
      reject(new Error("No hay datos de usuario en el almacenamiento."));
      return;
    }

    var datos = JSON.parse(datosUsuario);
    var primerValor = datos.valor1;

    console.log("El valor de primerValor es:", primerValor);

    var db = indexedDB.open('Janal', 1);

    db.onsuccess = function (event) {
      var database = event.target.result;
      var transaction = database.transaction(['Encuestador'], 'readwrite');
      var objectStoreEncuestador = transaction.objectStore('Encuestador');

      var cursorRequest = objectStoreEncuestador.openCursor();

      cursorRequest.onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
          var objeto = cursor.value;
          var correoEncuestador = objeto.correo;

          if (correoEncuestador === primerValor) {
            console.log("El valor coincide.");

            // Realizar las ediciones necesarias en el objeto Encuestador
            objeto.proce = document.getElementById("procedenciaEditar").value;
            objeto.dataUrl = imageDataUrl;
            // Convertir el Data URL a Blob y asignarlo a la propiedad dataUrl
           

            // Actualizar el objeto Encuestador en el almacenamiento
            var updateRequestEncuestador = cursor.update(objeto);

            updateRequestEncuestador.onsuccess = function (event) {
              console.log("Objeto Encuestador actualizado correctamente:", objeto);
              resolve(objeto); // Resolvemos la promesa con el objeto actualizado

            };

            updateRequestEncuestador.onerror = function (event) {
              console.error("Error al actualizar el objeto Encuestador:", event.target.error);
              reject(event.target.error); // Rechazamos la promesa en caso de error
            };
          } else {
            console.log("No se encontró un objeto Encuestador con el correo proporcionado.");
            resolve(null); // Resolvemos la promesa con null si no se encuentra el objeto
          }

          cursor.continue(); // Continuar con el siguiente objeto del cursor
        } else {
          console.log("Se ha recorrido todo el almacen de Encuestador.");
          resolve(null); // Resolvemos la promesa con null si no se encuentra el objeto
        }
      };

      cursorRequest.onerror = function (event) {
        console.error("Error al abrir el cursor:", event.target.error);
        reject(event.target.error); // Rechazamos la promesa en caso de error
      };
    };

    db.onerror = function (event) {
      console.error("Error al abrir la base de datos:", event.target.error);
      reject(event.target.error); // Rechazamos la promesa en caso de error
    };
  });
}
/*
async function guardarDatos() {
  try {
    await validarImagenLogo();
    await editarLogo(imageDataUrl);
    // Ambas funciones se han completado con éxito, ahora recargamos la página.
    location.reload();
  } catch (error) {
    // Si hay algún error en alguna de las funciones, mostramos el mensaje de error.
    console.error("Error al guardar los datos:", error);
  }
}*/