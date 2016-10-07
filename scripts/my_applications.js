gpg.controller('my_applications__', function($scope, $http, $mdDialog, $mdSidenav, $sessionStorage, $q) {

        $mdDialog.hide();
        if ($sessionStorage.user_id === undefined || !sessionStorage) {
            $mdSidenav('account').open();
            return;
        }
        document.title = "My Jobs";
        var user_id = $sessionStorage.user_id;
        console.log("Showing applications of ID: " + user_id);

        var request = {
            method: 'POST',
            url: 'http://owen.exall.za.net/gpg/IPO39_list_user_job_application.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: user_id
        };
        $http(request).then(function successCallback(response) {

            console.log(response);
            if (response.data != "false") {
                console.log("Successful");
                $scope.jobListings = [];
                //console.log(response);
                var res = angular.fromJson(response.data);
                console.log(res);
                angular.forEach(res, function (obj) {
                    var job = {
                        id: obj['id'],
                        application_id:obj['application_id'],
                        title: obj['title'],
                        company: obj['listing_name'],
                        location: obj['city'] + " " + obj['province'],
                        created: obj['date_listed'],
                        recruiter: obj['type'],
                        status:obj['status']
                    };
                    $scope.jobListings.push(job);
                });
                console.log("objects list ");
                console.log($scope.jobListings);
            } else {
                console.log("Failed");
            }
        }, function errorCallback(response) {
            console.log("Error");
            console.log(response);
        });

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
