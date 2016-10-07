gpg.controller('applicants__', function($scope, $http, $mdDialog, $mdSidenav, $sessionStorage, $q) {

        console.log("Showing info for job of ID: " + $sessionStorage.job_id);

        var request = {
            method: 'POST',
            url: 'http://owen.exall.za.net/gpg/IPO38_list_applicants.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $sessionStorage.job_id
        };
        $http(request).then(function successCallback(response) {

            console.log(response);
            if (response.data != "false"){
                console.log("Successful");
                $scope.applicants = [];
                //console.log(response);
                var res = angular.fromJson(response.data);
                console.log(res);
                angular.forEach(res, function(obj)
                {
                    console.log(obj);
                    var user = {
                        application_id: obj['application_id'],
                        first_name: obj['first_name'],
                        last_qualification:obj['last_qualification'],
                        status:obj['status'],
                        surname:obj['surname'],
                        user_id:obj['user_id']
                    };
                    $scope.applicants.push(user);
                });
                console.log("objects list ");
                console.log($scope.applicants);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });

    $scope.setOffer=function(application, state) {
        console.log("change app: " + application['application_id'] + " curent stateus " + application['status'] + " state "+state);
        var user = {
            application_id:application['application_id'],
            app_state: state
        };
        console.log(user);
        var request = {
            method: 'POST',
            url: 'PHP/update_app_id.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: user
        };
        $http(request).then(function successCallback(response) {
            if (response.data != "false"){
                console.log("Successful");
                console.log(response);
                $scope.$apply(application["status"] = state);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });
    };

    $scope.reactOffer=function(job, state) {
        console.log("change app: " + job['application_id'] + " curent stateus " + job['status'] + " state "+state);
        var user = {
            application_id:job['application_id'],
            app_state: state
        };
        console.log(user);
        var request = {
            method: 'POST',
            url: 'PHP/update_app_id.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: user
        };
        $http(request).then(function successCallback(response) {
            if (response.data != "false"){
                console.log("Successful");
                console.log(response);
                $scope.$apply(job["status"] = state);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });
    };

    $scope.toggleLeft = function()
    {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {

        $mdSidenav('left').close();
    };

    $scope.openMenu = function($mdOpenMenu, ev, job_id) {
        $sessionStorage.job_id = job_id;
        console.log("test job_id :" + $sessionStorage.job_id);
        $mdOpenMenu();
    };

});