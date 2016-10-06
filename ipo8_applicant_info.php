<?php

//enable front with server
header('Access-Control-Allow-Origin: *');

$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

if (isset($resquest))
{

	//initiate database connection
	$db = mysqli_connect("lin.arvixe.com", "owen_gpg_super","password") or die ("unable to connect to database");

	//select database
	mysqli_select_db('database_name', $db) or die (mysqli_error($db));

	//query to display job information
	$query = 'SELECT `tb_qualification`.*, `tb_work_experience`.*, `tb_user`.`first_name`, `tb_user`.`surname`, `tb_user`.`dpoh_id`, `tb_user`.`cell_num`, `tb_user`.`email`, `tb_user`.`address1`, `tb_user`.`city`, `tb_user`.province`, `tb_user`.`po_box`
		FROM tb_user 
		INNER JOIN tb_qualification ON tb_user.id = tb_qualification.user_id 
		INNER JOIN tb_work_experience ON tb_user.id = tb_work_experience.user_id';

//store results
$results = mysqli_query($db, $query) or die (mysqli_error($db));

//display results
if ($rows = mysqli_fetch_assoc($results))
{
	if ($rows )
	{
		echo json_encode($value);
	}
	else
	{
		echo "false";
	}
}
else
{
	echo "false";
}
//close connection
mysqli_close($db);
}
?>
