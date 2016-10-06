gpg.controller('jobs__', function($scope, $http, $mdDialog, userId, $mdSidenav) {
	document.title = "Jobs";

	var range = [2, 50];

	// console.log(range); //change the url below to the one on the website
	var request = {
		method: 'POST',
		url: 'http://owen.exall.za.net/gpg/IPO4_job_list.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: range
	};
	$http(request).then(function successCallback(response) {

		console.log(response);
		if (response.data != "false"){
			console.log("Successful");
			$scope.jobListings = [];
			//console.log(response);
			var res = angular.fromJson(response.data);
			console.log(res);
			angular.forEach(res, function(obj)
			{
				var job = {
					id: obj.id,
					title: obj.title,
					company: obj.listing_name,
					location: obj.city + " " + obj.province,
					created: obj.date_listed,
					recruiter: obj.type
				};
				$scope.jobListings.push(job);
			});
			console.log("objects list ");
			console.log($scope.jobListings);
		} else {
			console.log("Failed");
		}
	}, function errorCallback(response) {
		//console.log("Error");
		//console.log(response);
	});


	$scope.showInfo = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;

		console.log(id); //change the url below to the one on the website
		var request = {
			method: 'POST',
			url: 'PHP/IPO7_job_info.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: id
		};
		$http(request).then(function successCallback(response) {

				console.log(response);
				if (response.data != "false"){
					console.log("Successful call to job info");
					console.log(response);
					var obj = angular.fromJson(response.data);
					var job = {
						id: obj.id,
						title: obj.title,
						status: obj.status,
						company: obj.listing_name,
						location: obj.address1 +" " + obj.address2 + " " + obj.city + " " + obj.province + " " + obj.postalcode,
						created: obj.date_listed,
						recruiter: obj.type,
						description: obj.description
					};
					$scope.job_info = job;
					console.log("description: " + $scope.job_info.description);
					$mdDialog.show({
						locals: { user_id: userId.getUserId()},
						controller: dialog__,
						templateUrl: "jobs_info.html",
						parent: angular.element(document.body),
						targetEvent: ev,
						fullscreen: true,
						resolve: {
							job: function () {
								return $scope.job_info;
							}
						}
					});
				} else {
					console.log("Failed");
				}
			}, function errorCallback(response) {
				//console.log("Error");
				//console.log(response);
			});

	};

	$scope.myJobs=function(){
		var user_id = $sessionStorage.user_id;
		console.log("Showing info for job of ID: " + user_id);

		var request = {
			method: 'POST',
			url: 'PHP/IPO37_list_job_by_creating_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: user_id
		};
		$http(request).then(function successCallback(response) {

				console.log(response);
				if (response.data != "false"){
					console.log("Successful");
					$scope.jobListings = [];
					//console.log(response);
					var res = angular.fromJson(response.data);
					console.log(res);
					angular.forEach(res, function(obj)
					{
						var job = {
							id: obj.id,
							title: obj.title,
							company: obj.listing_name,
							location: obj.city + " " + obj.province,
							created: obj.date_listed,
							recruiter: obj.type
						};
						$scope.jobListings.push(job);
					});
					console.log("objects list ");
					console.log($scope.jobListings);
				} else {
					console.log("Failed");
				}
			}, function errorCallback(response) {
				console.log("Error");
				console.log(response);
			});
	};

	$scope.showApplicants= function (job_id)
	{
		console.log("Showing info for job of ID: " + job_id);

		var request = {
			method: 'POST',
			url: 'PHP/IPO38_list_aplicants.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: job_id
		};
		$http(request).then(function successCallback(response) {

				console.log(response);
				if (response.data != "false"){
					console.log("Successful");
					$scope.aplicants = [];
					//console.log(response);
					var res = angular.fromJson(response.data);
					console.log(res);
					angular.forEach(res, function(obj)
					{
						var user = {
							application_id:obj.tb_application_link.id,
							user_id: obj.tb_user.id,
							first_name: obj.first_name,
							surname: obj.surname,
							last_qualification:obj.last_qualification
						};
						$scope.aplicants.push(user);
					});
					console.log("objects list ");
					console.log($scope.aplicants);
				} else {
					console.log("Failed");
				}
			}, function errorCallback(response) {
				console.log("Error");
				console.log(response);
			});
	};

	$scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {
        $mdSidenav('left').close();
    };

	/*$scope.showInfo = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;
		$mdDialog.show({
			locals: {job_id: id, user_id: userId.getUserId()},
			controller: dialog__,
			templateUrl: "jobs_info.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			fullscreen: true
		});
	};*/
});