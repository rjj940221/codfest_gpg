angular.module('safety', ['ngMaterial', 'ngMessages'])

.controller('safety__', function ($scope, $timeout, $mdSidenav, $mdDialog, $http) {
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
	}

	function apply() {
		if (!$scope.userId) {
			$mdSidenav('left').open();
		}
	}

});