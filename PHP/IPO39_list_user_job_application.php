<?php
header("Access-Control-Allow-Origin: *");

$post_data = file_get_contents("php://input");
$request = json_decode($post_data);

if (is_numeric($request))
{
    $con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password");

    $query;
    $outp;

    $query="SELECT `tb_job`.`id`,`tb_job`.`title`,`tb_job`.`city`, `tb_job`.`province`, `tb_job`.`type`, `tb_job`.`date_listed`, `tb_company`.`listing_name`, `tb_application_link`.`status`  FROM `owen_gpg`.`tb_job`
JOIN `owen_gpg`.`tb_company` ON `tb_company`.`id` = `tb_job`.`company_id`
INNER JOIN `owen_gpg`.`tb_application_link` ON `tb_application_link`.`job_id` = `tb_job`.`id`
WHERE `tb_application_link`.`user_id` = '".$request."'
ORDER BY `id` DESC;";

    //echo $query;

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