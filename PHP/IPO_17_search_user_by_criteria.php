<?php

header("Access-Control-Allow-Origin: *");


$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

if ($request->select != "") {
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");

    $name = mysqli_real_escape_string($con, $request->first_name);
    $surname = mysqli_real_escape_string($con, $request->surname);
    if (isset($request->dpoh_id) && $request->dpoh_id !== "") {
        $dpoh_id = mysqli_real_escape_string($con, hash("whirlpool", $request->dpoh_id));
    }
    $query;
    $outp;

    if (isset($name) && $name !== "" && isset($surname) && $surname !== "" && isset($dpoh_id) && $dpoh_id !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `first_name`='".$name."' AND `surname`='".$surname.
            "' AND `dpoh_id`='".$dpoh_id."';";
    }
    elseif (isset($name) && $name !== "" && isset($surname) && $surname !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `first_name`='".$name."' AND `surname`='".$surname."';";
    }
    elseif (isset($name) && $name !== "" && isset($dpoh_id) && $dpoh_id !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `first_name`='".$name."' AND `dpoh_id`='".$dpoh_id."';";
    }
    elseif (isset($surname) && $surname !== "" && isset($dpoh_id) && $dpoh_id !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `surname`='".$surname."' AND `dpoh_id`='".$dpoh_id."';";
    }
    elseif(isset($name) && $name !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `first_name`='".$name."';";
    }
    elseif (isset($surname) && $surname !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `surname`='".$surname."';";
    }
    elseif (isset($dpoh_id) && $outp_id !== "")
    {
        $query="SELECT * FROM `owen_gpg`.`tb_user` WHERE `dpoh_id`='".$dpoh_id."';";
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