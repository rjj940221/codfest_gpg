gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute']);

gpg.controller('home__', function($scope, $http, $timeout, $mdSidenav, $mdDialog, userId, $sessionStorage) {
    document.title = "Home";

    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {
        console.log("Nav close");
        $mdSidenav('left').close();
    };

    $scope.login = function() {
        if (!$scope.userId) {

        }

        console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
        $mdSidenav('left').close();
        $scope.openMap();
    };

    $scope.register = function(ev) {
        $mdSidenav('left').close();
        console.log("Opening register_form");
        $mdDialog.show({
            controller: dialog__,
            templateUrl: "register_form.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            fullscreen: true
        });
    };

    $scope.openMap = function(ev, id) {
        $mdDialog.show({
            controller: dialog__,
            templateUrl: "map.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            fullscreen: true
        });
    };
});

gpg.controller('jobs__', function($scope, $http, $mdDialog, userId) {
	document.title = "Jobs";

    var range = [2, 50];

   // console.log(range); //change the url below to the one on the website
    var request = {
        method: 'POST',
        url: 'PHP/IPO4_job_list.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
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
                    id: obj['id'],
                    title: obj['title'],
                    status: obj['status'],
                    company: obj['listing_name'],
                    location: obj['address1'] +" " + obj['address2']+" " + obj['city'] + " " + obj['province'] + " " + obj['postalcode'],
                    created: obj['date_listed'],
                    recruiter: obj['type'],
                    description: obj['description']
                };
                $scope.job_info = job;
                console.log("description: "+$scope.job_info.description);
                $mdDialog.show({
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
                            application_id:obj['tb_application_link.id'],
                            user_id: obj['tb_user.id'],
                            first_name: obj['first_name'],
                            surname: obj['surname'],
                            last_qualification:obj['last_qualification']
                        };
                        $scope.aplicants.push(user);
                    });
                    console.log("objects list ");
                    console.log($scope.aplicants);
                } else {
                    console.log("Failed");
                }
            }
            , function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
    };
});

gpg.controller('map__', function($scope) {
	document.title = "Map";
});

gpg.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'home__'
        })
        .when('/comm_safety', {
            templateUrl: 'comm_safety_home.html',
            controller: 'safety__'
        })
        .when('/jobs', {
            templateUrl: 'jobs.html',
            controller: 'jobs__'
        })
		.when('/map', {
			templateUrl: 'map.html',
			controller: 'map__'
		});
});

gpg.factory('userId', function() {
	var data =
	{
		userId: null
	};

	return {
		getUserId: function () {
			return data.userId;
		},
		setUserId: function (userId) {
			data.userId = userId;
		}
	};
});