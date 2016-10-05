function dialog__($scope, $mdDialog, $mdSidenav, userId) {
	console.log("Opening dialog");
	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.apply = function() {
		$mdDialog.hide();
		if (!userId.getUserId()) {
			$mdSidenav('left').open();
		}
	};

	$scope.registerUser = function() {
		console.log("User registered");
	};
}