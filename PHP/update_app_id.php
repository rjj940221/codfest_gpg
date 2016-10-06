<?php
header("Access-Control-Allow-Origin: *");

$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

$state = $request->app_state;
$id = $request->application_id;

if (is_numeric($id) && ($state=="offer" || $state=="rejected" || $state=="pending" || $state=="accepted"))
{
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");

    $query="UPDATE `owen_gpg`.`tb_application_link` SET `status` = '".$state."' WHERE `id` = '".$id."';";


    if (isset($query)) {
        $result = mysqli_query($con, $query);
        if ($result) {
            echo "true";

        } else {
            echo "false";
        }
    }
    else
        echo "false";
    mysqli_close($con);
}
else
    echo "false";


?>
