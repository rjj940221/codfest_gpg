angular.module('jobs', ['ngMaterial', 'ngMessages'])

.controller('jobs__', function ($scope, $timeout, $mdSidenav, $mdDialog) {


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

	

});