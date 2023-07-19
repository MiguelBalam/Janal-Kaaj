
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


// Termina apartado noticias

function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
  }

  const greeting = limit('Hello Marcus', 8)  
  // 'Hello '
  document.getElementById("PB1").value = greeting;
  
  document.getElementById("PB2").innerHTML = greeting + '...';
  console.log(greeting);

  /*const Str = require('@supercharge/strings')

const limitt = Str('Hello Marcus').limitt(6, '...').get()  
// 'Hello …'

console.log(limitt);*/


