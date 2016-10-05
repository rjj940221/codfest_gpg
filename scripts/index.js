gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute']);

gpg.controller('home__', function($scope, $timeout, $mdSidenav, $mdDialog, userId) {
    document.title = "Home";

    $scope.toggleAccount = function() {
        $mdSidenav('account').toggle();
    };

    $scope.closeAccount = function() {
        console.log("Nav close");
        $mdSidenav('account').close();
    };

    $scope.login = function() {
        if (!$scope.userId) {

        }

        console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
        $mdSidenav('account').close();
        $scope.openMap();
    };

    $scope.register = function(ev) {
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