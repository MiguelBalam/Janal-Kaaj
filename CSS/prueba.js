
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
