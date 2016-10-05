gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngStorage']);

gpg.controller('home__', function($http, $scope, $timeout, $mdSidenav, $mdDialog, userId, $sessionStorage, $window) {
        document.title = "Home";

        $scope.toggleAccount = function () {
            $mdSidenav('account').toggle();
        };

        $scope.closeAccount = function () {
            console.log("Nav close");
            $mdSidenav('account').close();
        };

        $scope.login = function () {
            if (!$scope.userId) {
                alert("Please enter your login details.");
            }
            console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
            $scope.isLoading = true;
            var login = {
                login: "yes",
                type: undefined,
                value: $scope.userId,
                password: $scope.userPassword
            };

            if (/^([0-9]{13})$/.test($scope.userId))
                login.type = "id";
            else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.userId))
                login.type = "email";
            else {
                $scope.isLoading = false;
                $scope.DialogMsg = "Invalid ID, Email or Password!";
                $scope.DialogTitle = "Invalid Login";
                $mdDialog.show({
                    controller: dialog__,
                    dialogMsg: "Invalid ID, E-mail or Password",
                    dialogTitle: "Invalid Login",
                    templateUrl: "genericDialog.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: false
                });
                return;
            }

            console.log(login); //change the url below to the one on the website
            var request = {
                method: 'POST',
                url: 'http://owen.exall.za.net/gpg/authorize.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: login
            };
            var user = [];
            $http(request).then(function successCallback(response, ev) {
                console.log(response);
                if (response.data != "false" && response.data !== "") {
                    $scope.user = angular.fromJson(response.data);
                    $sessionStorage.user_id = $scope.user.id;
                    $sessionStorage.user_name = $scope.user.first_name;
                    $sessionStorage.rights = $scope.user.admin_rights;
                    $scope.isLoading = false;
                    console.log("Successful Login");
                    $mdSidenav('account').close();
                } else {
                    console.log("Failed Login");
                    $scope.isLoading = false;
                    $mdDialog.show({
                        controller: dialog__,
                        templateUrl: "dialogs/invalid_login.html",
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        fullscreen: false
                    });
                }
            }, function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
        };

        $scope.register = function (ev) {
            $mdSidenav('account').close();
            console.log("Opening register_form");
            $mdDialog.show({
                controller: dialog__,
                templateUrl: "register_form.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true
            });
        };

        $scope.openMap = function (ev, id) {
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
	/*document.title = "Jobs";

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
    };*/

});

gpg.controller('map__', function($scope) {

  $scope.gimme_heat = function(){
    load_heatmap();
    heatmap.setMap(heatmap.getMap() ? null : map);
  };


  $scope.showme_saps = function() {
  	console.log("Initiating saps loop");
    marker_saps = marker_saps ? 0 : 1;
    if (marker_saps === 1)
    {
  	saps_db.forEach(function(item) {
  		var saps = new google.maps.Marker({
  			position: new google.maps.LatLng(item.latitude, item.longitude),
  			map: map,
  			icon: image_saps,
  			title: item.name,
  			zIndex: parseInt(item.id)
  		});
      saps_mark.push(saps);
  	});
    }
    else {
      for(i = 0 ; i< saps_mark.length; i++)
      saps_mark[i].setVisible(false);
    }
  };

  $scope.showme_crimes = function() {
    console.log("Initiating incident loop");
    marker_incident = marker_incident ? 0 : 1;
    if (marker_incident === 1)
    {
    incidents_db.forEach(function(item) {
        var crimes = new google.maps.Marker({
          position: new google.maps.LatLng(item.latitude, item.longitude),
          map: map,
          icon: image,
          title: item.event,
          zIndex: parseInt(item.id)
        });
        incident_mark.push(crimes);
      });
    }
    else {
        for(i = 0 ; i< incident_mark.length; i++)
        incident_mark[i].setVisible(false);
      }
    };
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
		})
		.when('/create_job', {
			templateUrl: 'create_job.html',
			controller: 'create_job__'
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
