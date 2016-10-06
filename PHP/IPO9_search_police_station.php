<?php
$servername = "lin.arvixe.com";
$username = "owen_gpg_user";
$password = "password";
$request = json_decode(file_get_contents("php://input"));
if (is_numeric($request)) {
	$conn = mysqli_connect($servername, $username, $password) or die("failed to connect to datasbase");
	$query="SELECT * FROM `owen_gpg`.`tb_police_station` WHERE `id`='".$request."';";
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