gpg.controller('scholarship__', function($http, $scope, $sessionStorage) {
	var request = {
		method: 'POST',
        url: 'http://owen.exall.za.net/gpg/IPO18__search_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: { id: $sessionStorage.user_id }
	};
	$http(request).then(function successCallback(response) {
		console.log(response);

		$scope.surname = response.data.surname;
		$scope.name = response.data.first_name;
		$scope.address = response.data.address_1;
		$scope.province = response.data.province;
		$scope.district = response.data.suburb;
		$scope.email = response.data.email;
		$scope.cellphone = response.data.cell_num;
		$scope.postalAddress = response.data.po_box;

	}, function errorCallback(response) {
		console.log("Error");
	});

	$scope.submit = function (ev) {
		var insert = {
			insert: "yes",
			user_id: $sessionStorage.user_id,
			nationality: $scope.nationality,
			racial_group: $scope.racialGroup,
			local_mani: $scope.municipality,
			ward: $scope.ward,
			youth_care: $scope.childCare,
			has_disability: $scope.disability,
			disability: $scope.disabilityDetail,
			uniAddmission: $scope.uniAdmission,
			studyingUni: $scope.uniStudy,
			institution: $scope.institution,
			degree: $scope.degree,
			cyos: $scope.currYear,
			gauName: $scope.gauName,
			gauSurname: $scope.gauSurname,
			gauID: $scope.gauId,
			gauTelephone: $scope.gauTelephone,
			gauCellphone: $scope.gauCellphone,
			gauEmail: $scope.gauEmail,
			gauEmp: $scope.employment
		};
		console.log(insert);
		var request = {
			method: 'POST',
			url: 'http://owen.exall.za.net/gpg/submit_social_scholarship.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: insert
		};
		$http(request).then(function successCallback(response) {
			if (response.data == "true")
				alert("Submitted Application for processing.");
			else
				alert("Application Submission failed.");
		}, function errorCallback(response) {
			console.log("Error");
			console.log(response);
		});
	}
});