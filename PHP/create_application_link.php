<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/x-www-form-urlencoded");

	$con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password", "owen_gpg");

	$post_data = file_get_contents("php://input");
	$request = json_decode($post_data);
	if ($request->insert == "yes")
	{
		$query = "INSERT INTO `owen_gpg`.`tb_application_link`(`user_id`, `job_id`, `status`) 
					VALUES ('".$request->user."','".$request->job."','pending');";
		$result = mysqli_query($con, $query);
		if ($result)
			echo "true";
		else
			echo "false";
	}
?>