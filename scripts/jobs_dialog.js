App.controller('AppController', function($scope, $mdDialog) {
	$scope.status = '    ';
	$scope.customFullscreen = false;

	$scope.showPrompt = function(ev) {
		var confirm = $mdDialog.prompt()
			.title("What is the new item on your todo list?")
			.placeholder("todo")
			.ariaLabel("New todo")
			.targetEvent(ev)
			.ok("Create new todo")
			.cancel("Cancel");

		$mdDialog.show(confirm).then(function(result) {
			$scope.status = result;
			console.log(result);
		}, function() {
			$scope.status = null;
			console.log(Cancel);
		});
	};
});