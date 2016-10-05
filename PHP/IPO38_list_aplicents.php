<?php
header("Access-Control-Allow-Origin: *");


$post_data = file_get_contents("php://input");
$request = json_decode($post_data);


if (is_numeric($request))
{
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");

    $query;
    $outp;

    $query="SELECT `tb_application_link`.`id`, `tb_user`.`id`, `tb_user`.`first_name`, `tb_user`.`surname` ,
(
    SELECT `tb_qualification`.`name` 
 	FROM `owen_gpg`.`tb_qualification`
    WHERE `tb_qualification`.`user_id` = `tb_user`.`id` 
    ORDER BY `tb_qualification`.`end_date` DESC
    LIMIT 1
) AS 'last_qualification'
FROM `owen_gpg`.`tb_user` 
INNER JOIN `tb_application_link` ON `tb_user`.`id`=`tb_application_link`.`user_id`
WHERE `tb_application_link`.`job_id` = '".$request."';";

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