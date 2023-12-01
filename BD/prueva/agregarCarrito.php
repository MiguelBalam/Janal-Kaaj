<?php  
if(isset($_GET['addItem'])){
	//fnAjax();
	$res = new stdClass;
	
	if(!isset($_POST['id']) or !isset($_POST['cantidad'])){
		$res->status = 'error-box';
		$res->msg = 'Error - Producto no encontrado.';
		echo json_encode($res);
		exit;
	}

	$_id = ($_POST['id']);
	$_c = ($_POST['cantidad']);	

	if(!is_numeric($_id) or !is_numeric($_c)){
		$res->status = 'error-box';
		$res->msg = 'Error - Producto no encontrado.';
		echo json_encode($res);
		exit;
	}
	
	$_SESSION['carrito'] = array();	

	// $mysqli = conexion2();
	// $sql = $mysqli->query("SELECT * FROM hospedaje WHERE id = '".$_id."'");
	// if($row = $sql->fetch_object()){	
	// 	$car = $_SESSION['carrito'];
	// 	$_SESSION['carrito'][] = array('id'=>$_id, 'cantidad'=>$_c);

	// }else{
	// 	$res->status = 'error-box';
	// 	$res->msg = 'Error - Producto no encontrado.';
	// 	echo json_encode($res);
	// 	exit;
	// }
	// $sql->close(); 
	// $mysqli->close();

  if($_id == 1){
    $plan = array('nombre'=> 'plan 1', 'costo' => '1000');
  }else if($_id == 2){
    $plan = array('nombre'=> 'plan 2', 'costo' => '1299');
  }else if($_id == 3) {
    $plan = array('nombre'=> 'plan 3', 'costo' => '1500');
  }
	
	$_aTmp = ($_SESSION['carrito']);

	// $res->status = 'success-box';
	// $res->msg = 'Producto Agregado.';
	// $res->cant = $_aTmp['cantidad'];
	// $res->tot = @number_format($_aTmp['total'], 2, '.', ',');
	echo json_encode(["success" => true, "Producto agregado" . $_aTmp]);
	exit;
}


?>