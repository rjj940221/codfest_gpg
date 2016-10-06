<?php

//allow your front to exchange data with the server
header("Access-Control-Allow-Origin: *");

//create connection
$db = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password") or die ("failed to connect to database");

//select database to use
mysqli_select_db('database_name', $db) or die (mysqli_error($db));

//check if the search criteria is avail
if (isset($_POST['criteria']))
{
	$query = 'SELECT * FROM user 
		INNER JOIN tb_application_link 
		ON user.id = tb_application_link.user_id 
		WHERE job_id =' $_POST['criteria'] 'ORDER BY time DESC';
	//store results
	$result = mysqli_query($db, $query) or die (mysqli_error($db));

	//display results
	while ($rows  = mysqli_fetch_assoc($result))
	{
		foreach ($rows as $values)
		{
			echo json_encode $value;
		}
	}

	//close connection
	mysql_close($db);
	
}


?>
