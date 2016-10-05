gpg.controller('create_job__', function($scope, $filter) {
	document.title = "Create Job";
	$scope.resps = [ { text: '' } ];
	$scope.quals = [ { text: '' } ];

	$scope.newItemResp = function() { $scope.resps.push( { text: '' } ); };
	$scope.deleteItemResp = function(index) { $scope.resps.splice(index, 1); };

	$scope.newItemQual = function() { $scope.quals.push( { text: '' } ); };
	$scope.deleteItemQual = function(index) { $scope.quals.splice(index, 1); };
});