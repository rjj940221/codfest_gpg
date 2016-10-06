<?php
	header("Access-Control-Allow-Origin: *");
	$post_data = file_get_contents("php://input");
	$request = json_decode($post_data);

	$con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password", "owen_gpg");

	if ($request->insert == "yes")
	{
		$query = "INSERT INTO `owen_gpg`.`tb_complaints`(`user_id`, `detail`,  `station_id`, `police_officer_id`) VALUES ('".$request->user_id."','".$request->detail."', '".$request->station_id."','".$request->officer."')";
		$result = mysqli_query($con, $query);
		if ($result)
			echo "true";
		else
			echo "false";
	}
?>