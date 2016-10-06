<?php

//enable front with server
header('Access-Control-Allow-Origin: *');

//initiate database connection
$db = mysqli_connect("lin.arvixe.com", "owen_gpg_super","password") or die ("unable to connect to database");

//select database
mysqli_select_db('database_name', $db) or die (mysqli_error($db));

//query to display job information
$query = 'SELECT * FROM tb_job';

//store results
$results = mysqli_query($db, $query) or die (mysqli_error($db));

//display results
while ($rows = mysqli_fetch_assoc($results))
{
	foreach ($rows as $values)
	{
		echo json_encode($value);
	}
}

//close connection
mysqli_close($db);

?>
