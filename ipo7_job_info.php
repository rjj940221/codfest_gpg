<?php

//enable front with server
header('Access-Control-Allow-Origin: *');

//initiate database connection
$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

if (is_numeric($request) === false)
    die("false");
$con = mysqli_connect("lin.arvixe.com", "owen_gpg_super","password") or die ("unable to connect to database");

if($con) {
//query to display job information
    $query = "SELECT `tb_job`.*, `tb_company`.`listing_name` FROM `owen_gpg`.`tb_job`".
        " JOIN `owen_gpg`.`tb_company` ON `tb_company`.`id` = `tb_job`.`company_id`".
        " WHERE `tb_job`.`id`='" . $request . "';";

    //echo $query;

//store results
    $results = mysqli_query($con, $query);

    if ($results) {
        $out = mysqli_fetch_assoc($results);
        if ($out)
        {
            echo json_encode($out);
        }
        else
            echo "false";
    } else
        echo "false";
//close connection
    mysqli_close($con);
}
else
    echo "false";
?>
