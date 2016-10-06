function dialog__($http, $scope, $mdDialog, $mdSidenav, $sessionStorage,job, user_id) {
    $scope.job_info = job;
    if (job !== undefined)
    	var job_id = job.id;
	console.log("Opening dialog");
	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.apply = function() {
		$mdDialog.hide();
		if ($sessionStorage.user_id === undefined || !sessionStorage) {
			$mdSidenav('account').open();
			return ;
		}
		console.log("Test");
		console.log(job_id);
		console.log($sessionStorage.user_id);

		var link = {
			insert: "yes",
			job: job_id,
			user: $sessionStorage.user_id
		};
		var request = {
            method: 'POST',
            url: 'PHP/create_application_link.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: link
        };
        $http(request).then(function successCallback(response) {
        	if (response.data == "true")
        	{
        		console.log("Application Accepted");
        	} else {
        		console.log("Error accepting application.");
        		console.log(response);
        	}
        }, function errorCallback(response) {
        	console.log("Error");
        	console.log(response);
        });
	};

	$scope.registerUser = function () {
		console.log("Registering User");
		$scope.isLoading = true;
		if ($scope.user.email != $scope.user.email2) {
			alert("Your e-mail IDs do not match.");
			return ;
		}
		if ($scope.user.password != $scope.user.password2)
		{
			alert("Your passwords do not match");
			return ;
		}
		console.log($scope);
		var n_user = {
			insert: "yes",
			name: $scope.user.firstName,
			surname: $scope.user.lastName,
			id: $scope.user.id,
			cellno: $scope.user.cellno,
			email: $scope.user.email,
			password: $scope.user.password,
			addr_1: $scope.user.address,
			addr_2: $scope.user.address2,
			city: $scope.user.city,
			postal_code: $scope.user.postalCode
		};
		console.log(n_user);
		var user = [];
		$http({
			method: 'POST',
			url: 'http://owen.exall.za.net/gpg/register_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: n_user
		}).then(function successCallback(response, ev) {
			console.log(response);
			if (response.data === "false") {
				console.log("Failed Registering.");
				alert("Sorry, we had an error.");
				//Failed Dialog Here
			} else if (response.data === "User_Exists") {
				console.log("User already exits");
				alert("User already exists.");
			}else {
				$scope.user = angular.fromJson(response.data);
				$sessionStorage.user_id = $scope.user.id;
				$sessionStorage.user_name = $scope.user.first_name;
				$sessionStorage.rights = $scope.user.admin_rights;
				console.log($scope.user);
				console.log("Successful Registering.");
				$scope.isLoading = false;
				$mdDialog.show({
					controller: dialog__,
					templateUrl: "dialogs/register_success.html",
					parent: angular.element(document.body),
					targetEvent: ev,
					fullscreen: false
				});
			}
			console.log(response);
		}, function errorCallback(response) {
			console.log("Error");
			console.log(response);
		});
	};
}