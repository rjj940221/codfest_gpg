gpg.controller('complaint__', function($scope, $filter, $http, $sessionStorage, $mdSidenav) {
	document.title = "File Complaint";
	console.log("test complaint");

    $scope.stations = [];
    $http.get("http://owen.exall.za.net/gpg/select_all_police_stations.php")
    	.then(function (response) {
    		console.log(response.data);
    		response.data.map(function(station) {
    			console.log(station.name);
    			$scope.stations.push({
    				ID: station.id,
    				Name: station.name
    			});
    		});
    	});
    console.log($scope.stations);

	$scope.submit = function () {
		if ($sessionStorage.user_id === undefined || !sessionStorage) {
			$mdSidenav('account').open();
			return ;
		}
		var complaint = {
			insert: "yes",
			user_id: $sessionStorage.user_id,
			station_id: $scope.userStation,
			detail: $scope.description,
			officer: $scope.police_officer
		};

		var request = {
			method: 'POST',
			url: 'http://owen.exall.za.net/gpg/submit_complaint.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: complaint
		};
		$http(request).then(function successCallBack(response) {
			console.log(response);
			if (response.data == "true")
				alert("Submitted Complaint");
			else{
				alert("Failed to submit");
			}
		}, function errorCallBack(response) {
			console.log("Error");
			console.log(response);
		});
	};
});
