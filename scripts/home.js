homeApp = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngStorage']);

homeApp.controller('home__', function ($scope, $http, $timeout, $mdSidenav, $mdDialog, $sessionStorage, $window) {
	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	};

	$scope.close = function() {
		console.log("Nav close");
		$mdSidenav('left').close();
	};

	$scope.login = function() {
		if (!$scope.userId) {
			alert("Please enter your login details.");
		}
		console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);

		var login = {
			login: "yes",
			id: $scope.userId,
			password: $scope.userPassword
		};
		console.log(login); //change the url below to the one on the website
		var request = {
			method: 'POST',
			url: '../PHP/authorize.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: login
		}
		var user = [];
		$http(request).then(function successCallback(response) {

			console.log(response);
			if (response.data != "false"){
				$scope.user = angular.fromJson(response.data);
				$sessionStorage.user_id = $scope.user.id;
				$sessionStorage.user_name = $scope.user.first_name;
				$sessionStorage.rights = $scope.user.admin_rights;
				console.log("Successful Login");
			} else {
				console.log("Failed Login");
				$scope.openMap();
			}
		}, function errorCallback(response) {
			console.log("Error");
			console.log(response);
		});

		$mdSidenav('left').close();
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

		$scope.registerUser = function () {
			console.log("Registering User");

			if ($scope.user.email != $scope.user.email2) {
				alert("Your e-mail's do not match.");

				return ;
			}
			if ($scope.user.password != $scope.user.password2)
			{
				alert("Your password's do not match");
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
				url: '../PHP/register_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: n_user				
			}).then(function successCallback(response) {
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
				}
				console.log(response);
			}, function errorCallback(response) {
				console.log("Error");
				console.log(response);
			});
		};
	}

	function apply() {
		if (!$scope.userId) {
			$mdSidenav('left').open();
		}
	}
});

homeApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:	'home.html',
			controller:		'home__'
		})
		.when('/comm_safety', {
			templateUrl:	'comm_safety_home.html',
			controller:		'safety__'
		})
		.when('/jobs', {
			templateUrl:	'jobs.html',
			controller:		'jobs__'
		});
});