angular.module('safety', ['ngMaterial', 'ngMessages'])

.controller('safety__', function ($scope, $timeout, $mdSidenav, $mdDialog) {
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
	};

	$scope.openMap = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;
		$mdDialog.show({
			controller: DialogController,
			templateUrl: "map.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			fullscreen: true
		});
	};

	function DialogController($scope, $mdDialog) {
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