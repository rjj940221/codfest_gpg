<?php
header("Access-Control-Allow-Origin: *");


$post_data = file_get_contents("php://input");
$request = json_decode($post_data);


if (is_numeric($request))
{
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");

    $query="UPDATE `owen_gpg`.`tb_application_link` SET `status`='rejected' WHERE `id`='".$request."';";

    if (isset($query)) {
        $result = mysqli_query($con, $query);
        if ($result) {
                echo "true";
            echo json_encode($outp);
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