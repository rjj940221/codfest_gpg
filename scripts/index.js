gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngStorage']);

gpg.controller('home__', function($http, $scope, $timeout, $mdSidenav, $mdDialog, $sessionStorage, $window, $route) {
        document.title = "Home";
		$scope.user = [];
		if ($sessionStorage.user_id) {
			console.log("Session already exists " + $sessionStorage.user_id);
			$scope.user.id = $sessionStorage.user_id;
			$scope.user.first_name = $sessionStorage.user_name;
			$scope.user.admin_rights = $sessionStorage.rights;
		}

        $scope.toggleAccount = function () {
            $mdSidenav('account').toggle();
        };

        $scope.closeAccount = function () {
            console.log("Nav close");
            $mdSidenav('account').close();
        };

        $scope.show_admin = function () {
            $window.location.href = '#admin';
        };

        $scope.login = function (ev) {
            if (!$scope.userId) {
                alert("Please enter your login details.");
            }
            console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
            $scope.isLoading = true;
            var login = {
                login: "yes",
                type: undefined,
                value: $scope.userId,
                password: $scope.userPassword
            };

            if (/^([0-9]{13})$/.test($scope.userId))
                login.type = "id";
            else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.userId))
                login.type = "email";
            else {
                $scope.isLoading = false;
                $scope.DialogMsg = "Invalid ID, Email or Password!";
                $scope.DialogTitle = "Invalid Login";
                $mdDialog.show({
                    controller: dialog__,
                    locals: { job: undefined, user_id: undefined},
                    dialogMsg: "Invalid ID, E-mail or Password",
                    dialogTitle: "Invalid Login",
                    templateUrl: "dialogs/invalid_login.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: false
                });
                return;
            }

            console.log(login); //change the url below to the one on the website
            var request = {
                method: 'POST',
                url: 'http://owen.exall.za.net/gpg/authorize.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: login
            };
            var user = [];
            $http(request).then(function successCallback(response, ev) {
                console.log(response);
                if (response.data != "false" && response.data !== "") {
                    $scope.user = angular.fromJson(response.data);
                    $sessionStorage.user_id = $scope.user.id;
                    $sessionStorage.user_name = $scope.user.first_name;
                    $sessionStorage.rights = $scope.user.admin_rights;
                    $scope.isLoading = false;
                    console.log("Successful Login");
                    $mdSidenav('account').close();
                } else {
                    console.log("Failed Login");
                    $scope.isLoading = false;
                    $mdDialog.show({
                        controller: dialog__,
                        templateUrl: "dialogs/invalid_login.html",
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        fullscreen: false
                    });
                }
            }, function errorCallback(response) {
                console.log("Error");
                console.log(response);
            });
        };

        $scope.logout = function () {
            delete $scope.user;
            delete $sessionStorage.user_id;
            delete $sessionStorage.user_name;
            delete $sessionStorage.rights;
        };

        $scope.register = function (ev) {
            $mdSidenav('account').close();
            console.log("Opening register_form");
            $mdDialog.show({
                controller: dialog__,
                locals: { job: undefined, user_id: undefined},
                templateUrl: "register_form.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true
            });
        };

/*        $scope.openMap = function (ev, id) {
            $mdDialog.show({
                controller: dialog__,
                templateUrl: "map.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true
            });
        }; */
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
});
