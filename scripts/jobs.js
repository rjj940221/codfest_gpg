gpg.controller('jobs__', function($scope, $http, $mdDialog, userId, $mdSidenav, $sessionStorage, $q) {

    $scope.listJobs = function () {
        document.title = "Jobs";
        var range = [2, 50];

        // console.log(range); //change the url below to the one on the website
        var request = {
            method: 'POST',
            url: 'PHP/IPO4_job_list.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: range
        };
        $http(request).then(function successCallback(response) {

            console.log(response);
            if (response.data != "false") {
                console.log("Successful");
                $scope.jobListings = [];
                //console.log(response);
                var res = angular.fromJson(response.data);
                console.log(res);
                angular.forEach(res, function (obj) {
                    var job = {
                        id: obj['id'],
                        title: obj['title'],
                        company: obj['listing_name'],
                        location: obj['city'] + " " + obj['province'],
                        created: obj['date_listed'],
                        recruiter: obj['type']
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
    };

    $scope.showInfo = function (ev, id) {
        console.log("Showing info for job of ID: " + id);
        $scope.selectedJob = id;

        console.log(id); //change the url below to the one on the website
        var request = {
            method: 'POST',
            url: 'PHP/IPO7_job_info.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: id
        };
        $http(request).then(function successCallback(response) {

                console.log(response);
                if (response.data != "false") {
                    console.log("Successful call to job info");
                    console.log(response);
                    var obj = angular.fromJson(response.data);
                    var job = {
                        id: obj['id'],
                        title: obj['title'],
                        status: obj['status'],
                        company: obj['listing_name'],
                        location: obj['address1'] + " " + obj['address2'] + " " + obj['city'] + " " + obj['province'] + " " + obj['postalcode'],
                        created: obj['date_listed'],
                        recruiter: obj['type'],
                        description: obj['description']
                    };
                    $scope.job_info = job;
                    console.log("description: " + $scope.job_info.description);
                    $mdDialog.show({
                        locals: {user_id: userId.getUserId()},
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
            }
            , function errorCallback(response) {
                //console.log("Error");
                //console.log(response);
            });

    };

    $scope.myJobs = function () {
        $mdDialog.hide();
        if ($sessionStorage.user_id == undefined || !sessionStorage) {
            $mdSidenav('account').open();
            return;
        }
        document.title = "My Jobs";
        var user_id = $sessionStorage.user_id;
        console.log("Showing info for user of ID: " + user_id);

        var request = {
            method: 'POST',
            url: 'PHP/IPO37_list_job_by_creating_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: user_id
        };
        $http(request).then(function successCallback(response) {

                console.log(response);
                if (response.data != "false") {
                    console.log("Successful");
                    $scope.jobListings = [];
                    //console.log(response);
                    var res = angular.fromJson(response.data);
                    console.log(res);
                    angular.forEach(res, function (obj) {
                        var job = {
                            id: obj['id'],
                            title: obj['title'],
                            company: obj['listing_name'],
                            location: obj['city'] + " " + obj['province'],
                            created: obj['date_listed'],
                            recruiter: obj['type']
                        };
                        $scope.jobListings.push(job);
                    });
                    console.log("objects list ");
                    console.log($scope.jobListings);
                } else {
                    console.log("Failed");
                }
            }
            , function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
    };

    $scope.applicants = function() {
        console.log("Showing info for job of ID for applicants: " + $scope.job_id);

        var request = {
            method: 'POST',
            url: './PHP/IPO38_list_applicants.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $scope.job_id
        };
        $http(request).then(function successCallback(response) {

                console.log(response);
                if (response.data != "false") {
                    console.log("Successful request for applicants");
                    $scope.applicants = [];
                    //console.log(response);
                    var res = angular.fromJson(response.data);
                    console.log(res);
                    angular.forEach(res, function (obj) {
                        var user = {
                            application_id: obj['tb_application_link.id'],
                            user_id: obj['tb_user.id'],
                            first_name: obj['first_name'],
                            surname: obj['surname'],
                            last_qualification: obj['last_qualification']
                        };
                        $scope.applicants.push(user);
                    });

                    console.log("objects list ");
                    console.log($scope.applicants.length);
                    console.log($scope.applicants);
                    echo (true);
                } else {
                    console.log("Failed");
                    echo (false);
                }
            }
            , function errorCallback(response) {
                consoasyncGle.log("Error");
                console.log(response);
                echo(false);
            });
    };

    $scope.myApplications = function()
    {
        $mdDialog.hide();
        if ($sessionStorage.user_id == undefined || !sessionStorage) {
            $mdSidenav('account').open();
            return;
        }
        document.title = "My Jobs";
        var user_id = $sessionStorage.user_id;
        console.log("Showing applications of ID: " + user_id);

        var request = {
            method: 'POST',
            url: 'PHP/IPO39_list_user_job_application.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: user_id
        };
        $http(request).then(function successCallback(response) {

                console.log(response);
                if (response.data != "false") {
                    console.log("Successful");
                    $scope.jobListings = [];
                    //console.log(response);
                    var res = angular.fromJson(response.data);
                    console.log(res);
                    angular.forEach(res, function (obj) {
                        var job = {
                            id: obj['id'],
                            application_id:obj['application_id'],
                            title: obj['title'],
                            company: obj['listing_name'],
                            location: obj['city'] + " " + obj['province'],
                            created: obj['date_listed'],
                            recruiter: obj['type'],
                            status:obj['status']
                        };
                        $scope.jobListings.push(job);
                    });
                    console.log("objects list ");
                    console.log($scope.jobListings);
                } else {
                    console.log("Failed");
                }
            }
            , function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
    };

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

	$scope.showApplicants= function ()
	{
		console.log("Showing info for job of ID: " + $sessionStorage.job_id);

		var request = {
			method: 'POST',
			url: 'PHP/IPO38_list_applicants.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: $sessionStorage.job_id
		};
		$http(request).then(function successCallback(response) {

				console.log(response);
				if (response.data != "false"){
					console.log("Successful");
					$scope.applicants = [];
					//console.log(response);
					var res = angular.fromJson(response.data);
					console.log(res);
					angular.forEach(res, function(obj)
					{
					    console.log(obj);
						var user = {
                            application_id: obj['application_id'],
                            first_name: obj['first_name'],
                            last_qualification:obj['last_qualification'],
                            status:obj['status'],
                            surname:obj['surname'],
                            user_id:obj['user_id']
						};
						$scope.applicants.push(user);
					});
					console.log("objects list ");
					console.log($scope.applicants);
				} else {
					console.log("Failed");
				}
			}, function errorCallback(response) {
				console.log("Error");
				console.log(response);
			});
	};

	$scope.setOffer=function(application, state) {
	    var temp = {
            application_id: application['application_id'],
            first_name: application['first_name'],
            last_qualification: application['last_qualification'],
            status: application['status'],
            surname: application['surname'],
            user_id: application['user_id']
        };
        console.log("change app: " + application['application_id'] + " curent stateus " + application['status'] + " state "+state);
        var user = {
            application_id:application['application_id'],
            app_state: state
        };
        console.log(user);
        var request = {
            method: 'POST',
            url: 'PHP/update_app_id.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: user
        };
        $http(request).then(function successCallback(response) {
            if (response.data != "false"){
                console.log("Successful");
                console.log(response);
                     temp["status"] = state;
                var index = $scope.applicants.indexOf(application);
                console.log(index);
                $scope.applicants.splice(index, 1);
                $scope.applicants.splice(index, 0, temp);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });
    };

    $scope.reactOffer=function(job, state) {
        var temp = {
                id: job['id'],
                application_id:job['application_id'],
                title: job['title'],
                company: job['listing_name'],
                location: job['city'] + " " + job['province'],
                created: job['date_listed'],
                recruiter: job['type'],
                status:job['status']
            };
        console.log("change app: " + job['application_id'] + " curent stateus " + job['status'] + " state "+state);
        var user = {
            application_id:job['application_id'],
            app_state: state
        };
        console.log(user);
        var request = {
            method: 'POST',
            url: 'PHP/update_app_id.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: user
        };
        $http(request).then(function successCallback(response) {
            if (response.data != "false"){
                console.log("Successful");
                console.log(response);
                temp["status"] = state;
                var index = $scope.jobListings.indexOf(job);
                console.log(index);
                $scope.jobListings.splice(index, 1);
                $scope.jobListings.splice(index, 0, temp);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });
    };

	$scope.toggleLeft = function()
    {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {

        $mdSidenav('left').close();
    };

    $scope.openMenu = function($mdOpenMenu, ev, job_id) {
        $sessionStorage.job_id = job_id;
        console.log("test job_id :" + $sessionStorage.job_id);
        $mdOpenMenu();
    };

});