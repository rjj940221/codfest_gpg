<?php
	header("Access-Control-Allow-Origin: *");
	$post_data = file_get_contents("php://input");
	$request = json_decode($post_data);

	$con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password", "owen_gpg");

	if ($request->insert == "yes")
	{
		$stat_query = "SELECT `id`, `name`, SQRT((".$request->long." * `longitude`) + (".$request->lat." * `latitude`)) AS Dist FROM `owen_gpg`.`tb_police_station` ORDER BY Dist ASC LIMIT 1;";
		$station = mysqli_query($con, $stat_query);
		$arr = mysqli_fetch_assoc($station);

		$query = "INSERT INTO `owen_gpg`.`tb_incident`(`station_id`, `event`, `latitude`, `longitude`, `description`) VALUES ('".$arr['id']."','".$request->desc."','".$request->lat."','".$request->long."','".$request->desc."');";
		$result = mysqli_query($con, $query);
		if ($result)
			echo "true";
		else
			echo $stat_query . PHP_EOL . $query;
	}
	else
		echo "false";
?>