<?php

require_once "operaciones.php";

if(isset($_POST["valor1"]) && isset($_POST["valor2"])) {
	$valor1 = $_POST["valor1"];
	$valor2 = $_POST["valor2"];

	$operacion = $_POST["operacion"];

	switch ($operacion) {
		case 'restar':
			$resultado = restar($valor1,$valor2);
			echo json_encode($resultado);
			break;
		
		case 'sumar':
			$resultado = sumar($valor1,$valor2);
			echo json_encode($resultado);
			break;

		case 'multiplicar':
			$resultado = multiplicar($valor1,$valor2);
			echo json_encode($resultado);
			break;


		case 'dividir':
			$resultado = dividir($valor1,$valor2);
			echo json_encode($resultado);
			break;		
	}



}



?>