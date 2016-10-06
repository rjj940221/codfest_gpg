gpg.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'home__'
        })
        .when('/comm_safety', {
            templateUrl: 'comm_safety_home.html',
            controller: 'safety__'
        })
        .when('/jobs', {
            templateUrl: 'jobs.html',
            controller: 'jobs__'
        })
        .when('/map', {
            templateUrl: 'map.html',
            controller: 'map__'
        })
        .when('/create_job', {
            templateUrl: 'create_job.html',
            controller: 'create_job__'
        })
        .when('/my_jobs', {
            templateUrl: 'my_jobs.html',
            controller: 'jobs__'
        })
        .when('/applicants', {
            templateUrl: 'applicants.html',
            controller: 'jobs__'
        })
    ;
});