gpg.controller('scholarship__', function($http, $scope, $sessionStorage) {
	var request = {
		method: 'POST',
        url: 'http://owen.exall.za.net/gpg/IPO18__search_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: { id: $sessionStorage.user_id }
	};
	$http(request).then(function successCallback(response) {
		console.log(response);

		$scope.surname = response.data.surname;
		$scope.name = response.data.first_name;
		$scope.address = response.data.address_1;
		$scope.province = response.data.province;
		$scope.district = response.data.suburb;
		$scope.email = response.data.email;
		$scope.cellphone = response.data.cell_num;
		$scope.postalAddress = response.data.po_box;

	}, function errorCallback(response) {
		console.log("Error");
	});
});