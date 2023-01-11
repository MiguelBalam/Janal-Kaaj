
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