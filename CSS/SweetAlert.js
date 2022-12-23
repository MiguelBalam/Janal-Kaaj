

function cancelar () {

Swal.fire({
  title: '¿Estás seguro de cancelar?',
  text: "Se perderá los datos ingresados",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, seguro',
  cancelButtonText: 'Cancelar',
}).then((result) => {
    if(result.isConfirmed){
       function(){
        
       }
    }
})

}
