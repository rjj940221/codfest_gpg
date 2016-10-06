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
        .when('/incident', {
            templateUrl: 'incident.html',
            controller: 'incident__'
        })
        .when('/map', {
            templateUrl: 'map.html',
            controller: 'map__'
        })
        .when('/create_job', {
            templateUrl: 'create_job.html',
            controller: 'create_job__'
        })
        .when('/admin', {
            templateUrl: 'admin.html',
            controller: 'admin__'
        })
        .when ('/complaint', {
            templateUrl: 'complaint.html',
            controller: 'complaint__'
        })
        .when('/my_jobs', {
            templateUrl: 'my_jobs.html',
            controller: 'jobs__'
        })
        .when('/applicants', {
            templateUrl: 'applicants.html',
            controller: 'jobs__'
        })
        .when('/my_applications', {
            templateUrl: 'my_applications.html',
            controller: 'jobs__'
        })
        .when('/scholarship', {
            templateUrl: 'applicationForms/scholarship_form.html',
            controller: 'scholarship__'
        });
});