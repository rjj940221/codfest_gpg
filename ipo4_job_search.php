<?php

//allow you ajax to exchange data with the server
header("Access-Control-Allow-Origin: *");

//create connection
$db = mysql_connect("lin.arvixe.com", "owen_gpg_super", "password") or die ("failed to connect to database");

//select database to use
mysql_select_db('ldjfds', $db) or die (mysql_error($db));

//check if the search criteria is avail
if (isset($_POST['job_criteria']))
{
	//display all jobs 
	$query = 'SELECT * FROM job_table';

	$result = mysql_query($db, $query) or die (mysql_error($db));

	while ($rows  = mysql_fetch_assoc($result))
	{
		foreach ($rows as $values)
		{
			echo $value;
		}
	}

	//close connections
	mysql_close($db);	
}


?>
