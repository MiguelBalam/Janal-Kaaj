var $ = jQuery; 

jQuery( document ).ready(function() {
	// "use strict";
	// var LANG = 'es';
	// var espere = 'Espere';
	// var ancla='';
		
	
	$.xhrPool = [];
	$.xhrPool.abortAll = function() {
		$(this).each(function(idx, jqXHR) {
		jqXHR.abort();
		});
		$.xhrPool.length = 0
	};
		
	$.ajaxSetup({
		beforeSend: function(jqXHR) {
		$.xhrPool.push(jqXHR);
		},
		complete: function(jqXHR) {
		var index = $.xhrPool.indexOf(jqXHR);
		if (index > -1) {
		$.xhrPool.splice(index, 1);
		}
		}
	});

  $.fn.envDat = function (url, datos) {
    $.post(url, datos,
      function (data) {
        var result = jQuery.parseJSON(data);
        Swal.fire({
          title: 'Agregar a carrito',
          text: result.msg,
          icon: result.status,
          timer: 3500,
          timerProgressBar: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        
      }
    );
  };

});

window.onscroll = function(){miFuncion()};
var navbar = document.getElementById("mainNav");
var sticky= navbar.offsetTop;

function miFuncion(){
    if(window.pageYOffset >= sticky){
        navbar.classList.add("sticky-top");
    }else{
        navbar.classList.remove("sticky-top");
    }
}

//Apartado noticias 
function setupImageUploader() {
    const $fileInput = document.getElementById('image')
    const $dropZone = document.getElementById('result-image')
    const $img = document.getElementById('img-result')
  
    $dropZone.addEventListener('click', () => $fileInput.click())
  
    $dropZone.addEventListener('dragover', (e) => {
      e.preventDefault()
      $dropZone.classList.add('form-file__result--active')
    })
  
    $dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault()
      $dropZone.classList.remove('form-file__result--active')
    })
  
    const uploadImage = (file) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
  
      fileReader.addEventListener('load', (e) => {
        $img.setAttribute('src', e.target.result)
      })
      //$img.innerHTML = '';
    }
  
    $dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
  
      if (file && file.type.startsWith('image/')) {
        $fileInput.files = e.dataTransfer.files
        uploadImage(file)
      }
    })
  
    $fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
  
      if (file && file.type.startsWith('image/')) {
        uploadImage(file)
      }
    })
  }

  function addCard(div){
    var url = $(div).attr('data-href');
    var id = $(div).attr('data-id');
    datos = 'id=' + id+ '&cantidad=1';

    $(document).envDat(url, datos);
  }