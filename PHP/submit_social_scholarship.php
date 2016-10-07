<?php
	header("Access-Control-Allow-Origin: *");
	$request = json_decode(file_get_contents("php://input"));

	$con = mysqli_connect("lin.arvixe.com", "owen_gpg_super", "password", "owen_gpg") or die("Failed to connect");

	if ($request->insert == "yes")
	{
		$query = "INSERT INTO `tb_social_scholarship`(`user_id`, `nationality`, `racial_group`, `local_municipality`, `ward_number`, `youth_care`, `has_disability`, `disability`, `university_admission`, `studying_university`, `institution`, `degree`, `curr_year_of_stdy`, `gauName`, `gauSurname`, `gauID`, `gauTelephone`, `gauCell`, `gauEmail`, `gauEmployment`) 
			VALUES ('".$request->user_id."','".$request->nationality."','".$request->racial_group."','".$request->local_mani."','".$request->ward."','".$request->youth_care."','".$request->has_disability."','".$request->disability."','".$request->uniAdmission."','".$request->studyingUni."','".$request->institution."','".$request->degree."','".$request->cyos."','".$request->gauName."','".$request->gauSurname."','".hash("whirlpool", $request->gauID)."','".$request->gauTelephone."','".$request->gauCellphone."','".$request->gauEmail."','".$request->gauEmp."')";
		if (mysqli_query($con, $query))
			echo "true";
		else
			echo "false";
	}
	else
		echo "false";
?>