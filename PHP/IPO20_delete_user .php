<?php
header("Access-Control-Allow-Origin: *");
$servername = "lin.arvixe.com";
$username = "owen_gpg_user";
$password = "password";
$request = json_decode(file_get_contents("php://input"));
if (is_numeric($request)) 
{
	$con = mysqli_connect($servername, $username, $password) or die("failed to connect to datasbase");
	$sql="DELETE FROM `owen_gpg`.`tb_user` WHERE `id`='".$request."';";
	if (mysqli_query($con, $sql)) {
	    echo "success";
	} else {
	    echo "fail";
	}
	mysqli_close($con);
} else {
	echo "false";
}
?>