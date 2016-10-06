<?php
/**
 * Created by PhpStorm.
 * User: arnovan-
 * Date: 2016/10/05
 * Time: 8:20 AM
 */

header("Access-Control-Allow-Origin: *");


$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

if ($request->select != "")
{
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");
    $name = mysqli_real_escape_string($con, $request->name);

    $badge = mysqli_real_escape_string($con, $request->badge_number);

    $query;
    $outp;

    if(isset($badge) && $badge !== "")
    {
        $query="SELECT `id` FROM `owen_gpg`.`tb_police_officer` WHERE `badge_number`='".$badge."';";
    }
    elseif (isset($name) && $name !== "")
    {
        $query="SELECT `id` FROM `owen_gpg`.`tb_police_officer` WHERE `name`='".$name."';";
    }
    if (isset($query)) {
        $result = mysqli_query($con, $query);
        if ($result) {
            while ($rs = mysqli_fetch_assoc($result)) {
                $outp[] = $rs;
            }
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


