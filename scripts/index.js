gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute']);

gpg.controller('home__', function($scope, $timeout, $mdSidenav, $mdDialog, userId) {
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

    function apply() {
        if (!userId.getUserId()) {
            $mdSidenav('left').open();
        }
    }


});

function dialog__($scope, $mdDialog) {
	console.log("Opening dialog");
	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.apply = function() {
		$mdDialog.hide();
		apply();
	};

	$scope.registerUser = function() {
		console.log("User registered");
	};
}

gpg.controller('safety__', function($scope) {
	document.title = "Community Safety";
});

gpg.controller('jobs__', function($scope, $mdDialog, userId) {
	document.title = "Jobs";
	$scope.jobListings = [
		{
			id: 0,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: true
		},
		{
			id: 1,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: false
		},
		{
			id: 2,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 0,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: false
		},
		{
			id: 1,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: true
		},
		{
			id: 2,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 3,
			title: "Senior Sales Account Manager ",
			company: "Verifone",
			location: "Johannesburg, Gauteng",
			created: "1 day ago",
			recruiter: false
		}
	];

	$scope.showInfo = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;
		$mdDialog.show({
			controller: dialog__,
			templateUrl: "jobs_info.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			fullscreen: true
		});
	};

	function apply() {
		if (!userId.getUserId()) {
			$mdSidenav('left').open();
		}
	}
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
})