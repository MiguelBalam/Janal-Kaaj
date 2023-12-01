<?php  

session_start(['cookie_lifetime' => 43200, 'cookie_secure' => false, 'cookie_httponly' => true]);

if(isset($_GET['addItem'])){
	fnAjax();
	$res = new stdClass;
	// $res->status = 'error-box';
	// 	$res->msg = 'Error - Producto no encontrado.';
	// 	echo json_encode($res);
	// 	exit;


	if(!isset($_POST['id']) or !isset($_POST['cantidad'])){
		$res->status = 'error-box';
		$res->msg = 'Error - Producto no encontrado.';
		echo json_encode($res);
		exit;
	}

	$_id = $_POST['id'];
	$_c = $_POST['cantidad'];	

	if(!is_numeric($_id) or !is_numeric($_c)){
		$res->status = 'error-box';
		$res->msg = 'Error - Producto no encontrado.';
		echo json_encode($res);
		exit;
	}
	
	$_SESSION['carrito'] = array();	


	
	$_SESSION['carrito'][] = array ('id'=> $_id, 'cantidad' => $_c);

	$_aTmp = planes($_id);

	$res->status = 'success';
	$res->msg = 'Producto Agregado.';
	$res->cant = $_c;
	$res->tot = @number_format($_aTmp['costo'], 2, '.', ',');
	echo json_encode($res);
	exit;
}

function fnAjax(){
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){}else{
		echo 'Error.';exit;
	}
}

function planes($_id){

	if($_id == 1){
		$plan = array('nombre'=> 'plan 1', 'costo' => '1000');
	  }else if($_id == 2){
		$plan = array('nombre'=> 'plan 2', 'costo' => '1299');
	  }else if($_id == 3) {
		$plan = array('nombre'=> 'plan 3', 'costo' => '1500');
	  }
	  return $plan;
}

?>