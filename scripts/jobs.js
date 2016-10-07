gpg.controller('jobs__', function($scope, $http, $mdDialog, $mdSidenav, $sessionStorage, $q) {
	$scope.user = [];
	if ($sessionStorage.user_id) {
        console.log("Session already exists " + $sessionStorage.user_id);
        $scope.user.id = $sessionStorage.user_id;
        $scope.user.first_name = $sessionStorage.user_name;
        $scope.user.admin_rights = $sessionStorage.rights;
    }
    document.title = "Jobs";
    var range = [2, 50];

    // console.log(range); //change the url below to the one on the website
    var request = {
        method: 'POST',
        url: 'http://owen.exall.za.net/gpg/IPO4_job_list.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
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
            angular.forEach(res, function(obj) {
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
                url: 'http://owen.exall.za.net/gpg/IPO7_job_info.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: id
            };
            $http(request).then(function successCallback(response) {

                console.log(response);
                if (response.data != "false") {
                    console.log("Successful call to job info");
                    console.log(response);
                    var obj = angular.fromJson(response.data);
                    var job = {
                        id: obj.id,
                        title: obj.title,
                        status: obj.status,
                        company: obj.listing_name,
                        location: obj.address1 + " " + obj.address2 + " " + obj.city + " " + obj.province + " " + obj.postalcode,
                        created: obj.date_listed,
                        recruiter: obj.type,
                        description: obj.description
                    };
                    $scope.job_info = job;
                    console.log($scope.job_info);
                    $mdDialog.show({
                        locals: {
                            user_id: $sessionStorage.user_id
                        },
                        controller: dialog__,
                        templateUrl: "jobs_info.html",
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        fullscreen: true,
                        resolve: {
                            job: function() {
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

		$scope.toggleLeft = function() {
			console.log("toggleLeft");
			$mdSidenav('left').toggle();
		};

		$scope.close = function() {
			console.log("close");
			$mdSidenav('left').close();
		};

		$scope.openMenu = function($mdOpenMenu, ev, job_id) {
			$sessionStorage.job_id = job_id;
			console.log("test job_id :" + $sessionStorage.job_id);
			$mdOpenMenu();
		};
    });

