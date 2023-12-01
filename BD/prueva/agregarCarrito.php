<?php
session_start(['cookie_lifetime' => 43200, 'cookie_secure' => false, 'cookie_httponly' => true]);

define('LANG', 'es');

if(isset($_GET['addItem'])){
	fnAjax();
	$res = new stdClass;

	if(!isset($_SESSION['id'])){
		$res->status = 'error';
		$res->msg = 'Necesita iniciar sesion para realizar la compra.';
		$res->url = '/login.html';
		echo json_encode($res);
		exit;
	}
	
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

if(isset($_GET['getPagoTarjeta'])){
	fnAjax();
	$Langs = (object)array();
	if(LANG == 'es'){
		$Langs->pagos = (object)array('tarjTitular'=>'Nombre del titular',
								  'tarjTitular2'=>'Escrito en el plástico',
							'lblTarjeta'=>'Tarjeta',
							'lblExpira'=>'Expira',
							'tarjNum'=>'Número de tarjeta',
							'tarjMes'=>'Mes',
							'tarjAnio'=>'Año',
							'tarjCodigo'=>'Código',
							'tarjCodigo1'=>'¿En dónde está ubicado?',
							'tarjCodigo2'=>'En American Express son los cuatro dígitos que aparecen en el anverso de la tarjeta.',
							'tarjCodigo3'=>'En Visa y MasterCard, son los tres últimos dígitos del área de firma al reverso de la tarjeta.',
							'regTarjeta'=>'Procesar Pago',
							'tarjE1'=>'Favor de escribir el nombre del titular.',
							'tarjE3'=>'Favor de escribir el número de tarjeta.',
							'tarjE4'=>'Favor de seleccionar el mes de expiración.',
							'tarjE5'=>'Favor de seleccionar el año de expiración.',
							'tarjE6'=>'Favor de escribir el código de seguridad de la tarjeta.'
							);
	}
	else{
		$Langs->pagos = (object)array('tarjTitular'=>'Card holder name',
								  'tarjTitular2'=>'As written in plastic',
							'lblTarjeta'=>'CC / DC',
							'lblExpira'=>'Expires',
							'tarjNum'=>'Credit card number',
							'tarjMes'=>'MM',
							'tarjAnio'=>'YY',
							'tarjCodigo'=>'CSC',
							'tarjCodigo1'=>'Where can I find it?',
							'tarjCodigo2'=>'With Amex you will find these 4 digits in the front of your card.',
							'tarjCodigo3'=>'With Visa or MasterCard, you will find these 3 digits in the back of your card.',
							'regTarjeta'=>'Process Payment'
							);
	}

	$v = $Langs->pagos;
	$meses = array('01','02','03','04','05','06','07','08','09','10','11','12');
	$anios = array();
	for($i = date('Y'); $i < date('Y') + 11; ++$i){
		$anios[] = $i;
	}
	$anios2 = array();
	for($i = date('Y')-80; $i < date('Y') - 16; ++$i){
		$anios2[] = $i;
	}
	?>
    <div class="tarjetas ">
    	<a data-id="2" id="visa" class=""></a>
    	<a data-id="1" id="mastercard" class=""></a>
    	<a data-id="3" id="amex" class=""></a>
    	<img class="openpayimg" src="/_src/images/fpagos/LogotipoOpenpay-01.jpg" style="margin-bottom: 5px;">
    </div>
    <form id="frmAddCard" action="/?ajax=<?=sha1('RPagoTarjetaV3')?>" style="padding-bottom:10px">
       	<input type="hidden" name="token_id" id="token_id">
   		<div class="col-2">
       		<p id="cntTitular">
           		<label class="lblTarj"><?=$v->tarjTitular?>:</label>
            	<input type="text" name="titular" class="input2" data-openpay-card="holder_name" placeholder="" required>
            </p>
        </div>
        <div class="col-2">
        	<p id="cntTarjeta">
           		<label class="lblTarj"><?=$v->tarjNum?>:</label>
				<input type="text" name="tarjeta" class="input2" maxlength="19" placeholder="" autocomplete="off" required>
         		<input type="hidden" data-openpay-card="card_number" id="cardNumber">
          	</p>
        </div>
        <div class="col-2 areaFExpira">
            <div class="clear"></div>
            <p class="fleft" style="width:68px">
              	<label style="line-height: 36px"><?=$v->lblExpira?>:</label>
            </p>
            <p class="fleft selectParent" style="width:64px">
               	<select class="form-control2" name="mes" id="mes" data-openpay-card="expiration_month" data-width="100%" required>
             		<option value=""><?=$v->tarjMes?></option>
                        <?php foreach($meses as $m):?>
                        <option value="<?=$m?>"><?=$m?></option>
                        <?php endforeach?>
                    </select>
                </p>
                <p class="fleft" style="width:10px; text-align: center; overflow: hidden; line-height: 45px; font-size: 15px; padding: 0;">
                   /
                </p>
                <p class="fleft selectParent" style="width:68px">
                    <select class="form-control2" name="anio" id="anio" data-openpay-card="expiration_year" data-width="100%" required>
                       <option value=""><?=$v->tarjAnio?></option>
                        <?php foreach($anios as $a):?>
                        <option value="<?=substr($a, -2)?>"><?=substr($a, -2)?></option>
                        <?php endforeach?>
                    </select>
                </p>
            </div>
            <div class="col-2">
            	<div class="fleft lblF2" style="width:112px; padding-top: 11px">
               		<div><label><?=$v->tarjCodigo?>:</label> <em></em></div>
                    <div class="tooltipC">
                    	<div class="tit"><?=$v->tarjCodigo1?></div>
                        <div class="a1"><?=$v->tarjCodigo2?></div>
                        <div class="a2"><?=$v->tarjCodigo3?></div>
                    </div>
                </div>
            	<p class="fleft" style="width:99px">
                    <input type="password" name="codigo" max="4" maxlength="4" autocomplete="off" data-openpay-card="cvv2" style="text-align:center; padding-left:0" required>
                </p>
            	<p class="fleft" style="width:20px">             
                </p>
            </div>
            <div class="clear"></div>
            <div class="cnt-pay-button"><button class="btn" id="pay-button" type="submit"><span><i class="fa fa-check"></i><?=$v->regTarjeta?></span></button></div>
        </form>
        <div class="footCart">
        	<img src="/_src/images/fpagos/logof.png">
        </div>
        <div class="card-wrapper" style="display:none !important;"></div>
    <?php	
	exit;
}

if(isset($_GET['ajax' ]) && $_GET['ajax'] == sha1('RPagoTarjetaV3')){
	fnAjax();	
	$res = new stdClass();	

	if(!isset($_POST['tokenp'])){
		$res->status = 'error-box';
		$res->msg = 'Error interno: 1';
		echo json_encode($res);
		exit;
	}

	$Langs = (object)array();
	$Langs->pagos = (object)array('tarjE1'=>'Favor de escribir el nombre del titular.',
							'tarjE2'=>'Favor de seleccionar la marca de la tarjeta.',
							'tarjE3'=>'Favor de escribir el número de tarjeta.',
							'tarjE4'=>'Favor de seleccionar el mes de expiración.',
							'tarjE5'=>'Favor de seleccionar el año de expiración.',
							'tarjE6'=>'Favor de escribir el código de seguridad de la tarjeta.',
							'tarjE7'=>'Favor de seleccionar una fecha válida.',
							'tarjE14'=>'El número de tarjeta es inválido.',
							'tarjOk'=>'Pago Realizado Exitosamente!');
	$v = $Langs->pagos;	

	$nombre 		= limpiar($_POST['titular']);	
	$ntarjeta 		= limpiar($_POST['tarjeta']);	
	$expiram 		= limpiar($_POST['mes']);
	$expiraa 		= limpiar($_POST['anio']);	
	$codigo 		= limpiar($_POST['codigo']);		
	$tokenPago 		= limpiar($_POST['tokenp']);

	$_nombre = $nombre;
	if($nombre == ''){
		$res->status = 'error-box';
		$res->msg = $v->tarjE1;
		echo json_encode($res);
		exit;
	}
	if($ntarjeta == ''){
		$res->status = 'error-box';
		$res->msg = $v->tarjE3;
		echo json_encode($res);
		exit;
	}
	if($expiram == '' or $expiraa == ''){
		$res->status = 'error-box';
		$res->msg = $v->tarjE5;
		echo json_encode($res);
		exit;
	}
	if($expiraa == date('Y') && $expiram < date('m')){
		$res->status = 'error-box';
		$res->msg = $v->tarjE7;
		echo json_encode($res);
		exit;
	}	

	if($codigo == ''){
		$res->status = 'error-box';
		$res->msg = $v->tarjE6;
		echo json_encode($res);
		exit;
	}	

	
	$mysqli = conexion2();
	$sql = $mysqli->query("SELECT * FROM pagos WHERE token_pago = '".$tokenPago."'");
	if($row = $sql->fetch_object()){
		$_row = $row;
		$datosAlumno = array();
		$sql2 = $mysqli->query("SELECT * FROM alumnos WHERE id = '".$row->idalumno."'");
		if($row2 = $sql2->fetch_object()){
			$datosAlumno = $row2;
			$sDatU = array('nombre'=>$row2->name,
					   'cel'=>$row2->cel,
					   'email'=>$row2->email,
					   'nivel'=>$row2->nivel, 
					   'concepto'=>$row->concepto, 
					   'horas'=>$row->horas, 
					   'monto'=>$row->monto
					  );
		}
		$sql2->close();
	}else{
		$res->status = 'error-box';
		$res->msg = 'Pago no encontrado.';
		echo json_encode($res);
		exit;
	}
	$sql->close();

	$sDatU = (object)$sDatU;

    //echo ($sDatU); exit;

	$_email = $sDatU->email;	
	$_tel 	= $sDatU->cel;	

	//echo 'email: '.$_email;exit;

	
	//print_r($carrito); exit;
	$lc = 'MX';	
	$divisa='MXN';
	if ($_row->concepto == 'SPANISH CLASSES') {
		$divisa='USD';
		$lc ='US';
	}

	$_tot = array();
	$_carrito = array();
	
	$_total = $_row->monto;
	$_monto = $_total;
   $_montoOpenPay = $_monto;

	// echo $_email; exit;
	//echo 'Monto: '.$_monto; exit;
	//print_r($_carrito); exit;

	
	$_dominio = str_replace(array('https://', 'http://', 'www.', '/'), '', $_SERVER['HTTP_HOST']);

	if($_dominio == 'englishandcoffee'){
		$_dominio = 'englishandcoffee.com.mx';
	}

	//fTarj($sDatU->cel, $_tarjeta, $m='', $sep=' ');
	$_exp = explode(' ', $ntarjeta);
	$_ftarj = end($_exp);
	$_exp_ = str_replace(' '.$_ftarj, '', $ntarjeta);
	//print_r($_exp_);

	
	require($_SERVER['DOCUMENT_ROOT'].'/_src/openpay/Openpay.php');

	$_marca = $_POST['marca'];
	$_expira = $expiram.'/'.$expiraa;
	$_numTarj = $ntarjeta;	
	$_concepto = 'Compra en: '.$_dominio;

	$adatos = array();
	$folio = $_row->folio;	

	$adatos[] = array('campo'=>'Folio de pago:','valor'=>$folio);
	$adatos[] = array('campo'=>'Nombre del comprador:','valor'=>$sDatU->nombre);
	$adatos[] = array('campo'=>'Nivel:','valor'=>$sDatU->nivel);
	$adatos[] = array('campo'=>'Tel&eacute;fono:','valor'=>$sDatU->cel);
	$adatos[] = array('campo'=>'Correo Electr&oacute;nico:','valor'=>$sDatU->email);

	$adatos[] = array('campo'=>'Concepto:','valor'=>$sDatU->concepto);
	$adatos[] = array('campo'=>'Horas:','valor'=>$sDatU->horas);
	$adatos[] = array('campo'=>'Monto:','valor'=>$sDatU->monto);
	
	/*$_direccionCliente = array(
				'line1' => html_entity_decode($sDatU->direccion),
				//'line2' => html_entity_decode($sDatU->col),
				'postal_code' => $sDatU->cp,
				'state' => html_entity_decode($sDatU->ciudad),
				'city' => html_entity_decode($sDatU->estado),
				'country_code' => 'MX'
			  );*/

	$adatos[] = array('campo'=>'Forma de pago seleccionado:','valor'=>'Tarjeta de Cr&eacute;dito/D&eacute;bito');
	$adatos[] = array('campo'=>'Status de Pago:','valor'=>'<span style="color:#ff7500; ">Pendiente</span>');

	//OpenPay	
	$tokenCorrecto = cadena_aleatoria(100,'si','si','si', 'no');
	$_OP = datOpenPay();
	try {		
		Openpay::setProductionMode(true); 
		$openpay = Openpay::getInstance($_OP->comercio, $_OP->token);
		$customerData = array(
		 'name' => $sDatU->nombre,
		 'email' => $_email,
		 'requires_account' => false,
		 'phone_number' => $_tel
		 //'address' => $_direccionCliente
	   	);
		$customer = $openpay->customers->add($customerData);
		$idClienteOP = $customer->id;
		$chargeRequest = array(
			'method' => 'card',
			'source_id' => $_POST["token_id"],
			'amount' => number_format($_montoOpenPay,2,'.',''),
			'description' => $_concepto,
			'device_session_id' => $_POST["deviceIdHiddenFieldName"],
			'order_id' => $folio.' - Int: '.rand(),
			'confirm' => true,
			'currency'=>$divisa
			//,'customer'=>$customerData
			,"redirect_url"=>"http://".str_replace('www.','',$_SERVER['HTTP_HOST'])."/PagoCorrecto?pagoToken=".$tokenCorrecto
			,"use_3d_secure"=> "true"
		);

		$customer = $openpay->customers->get($idClienteOP);
		$charge = $customer->charges->create($chargeRequest);

		$_autorizacion = '';
		$_sourceId = $charge->id;

		$_query = "UPDATE pagos SET source_id='$_sourceId', pagoCorrecto='$tokenCorrecto', id_op='$idClienteOP' WHERE folio = '".$folio."'";

		if(!$mysqli->query($_query)){
			echo $_query;
		}//*/
		
		$res->status = 'correcto';
		$res->url = $charge->payment_method->url;
		echo json_encode($res);
		exit;
	}
	catch (OpenpayApiTransactionError $e) {
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	} 
	catch (OpenpayApiRequestError $e) {
		//echo 'ERROR on the request: ' .$e->getMessage();
		error_log('ERROR on the request: ' . $e->getMessage(), 0);
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	} 
	catch (OpenpayApiConnectionError $e) {
		//echo 'ERROR while connecting to the API: '.$e->getMessage();
		error_log('ERROR while connecting to the API: ' . $e->getMessage(), 0);
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	} 
	catch (OpenpayApiAuthError $e) {
		//echo 'ERROR on the authentication: ' .$e->getMessage();
		error_log('ERROR on the authentication: ' . $e->getMessage(), 0);
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	} 
	catch (OpenpayApiError $e) {
		//echo 'ERROR on the API: ' .$e->getMessage();
		error_log('ERROR on the API: ' . $e->getMessage(), 0);
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	} 
	catch (Exception $e) {
		//echo 'Error on the script: '.$e->getMessage();
		error_log('Error on the script: ' . $e->getMessage(), 0);
		$_banco = 'La tarjeta ha sido rechazada.';
		$res->status = 'error';
		$res->msg = $_banco;
		echo json_encode($res);
		exit;
	}
	exit;
}

?>