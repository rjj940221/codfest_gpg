gpg.controller('my_jobs__', function($scope, $http, $mdDialog, $mdSidenav, $sessionStorage, $locale) {

        if ($sessionStorage.user_id === undefined || !sessionStorage) {
            $mdSidenav('account').open();
           // $locale.path("#/jobs");
            return;
        }
        else{
        document.title = "My Jobs";
        var user_id = $sessionStorage.user_id;
        console.log("Showing info for user of ID: " + user_id);

        var request = {
            method: 'POST',
            url: 'http://owen.exall.za.net/gpg/IPO37_list_job_by_creating_user.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
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
                        id: obj.id,
                        title: obj.itle,
                        company: obj.listing_name,
                        location: obj.city + " " + obj.province,
                        created: obj.date_listed,
                        recruiter: obj.type
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
        }

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
