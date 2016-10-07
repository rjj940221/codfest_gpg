<?php
	header("Access-Control-Allow-Origin: *");

	$servername = "lin.arvixe.com";
	$username = "owen_gpg_super";
	$password = "password";
	$request = json_decode(file_get_contents("php://input"));

	if (is_numeric($request->id)) {
		$con = mysqli_connect($servername, $username, $password) or die("failed to connect to datasbase");
		$query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `id`='".$request->id."';"; 
		$result = mysqli_query($con, $query);
		if ($result)
		{
			$station = mysqli_fetch_object($result);
			echo json_encode($station);
		}
		else
			echo "false";
		mysqli_close($con);
	} else {
		echo "false";
	}
?>