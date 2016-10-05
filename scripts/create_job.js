gpg.controller('create_job__', function($scope, $filter) {
	document.title = "Create Job";
	$scope.resps = [
		{
			text: ''
		}
	];

	$scope.addItem = function(text) {
		$scope.resps.push({
			text: text,
		});
		console.log($scope.resps);
	};

	$scope.deleteItem = function(index) {
		console.log("removing: " + index);
		$scope.resps.splice(index, 1);
		console.log($scope.resps);
	}
});