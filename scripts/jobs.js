gpg.controller('jobs__', function($scope, $mdDialog, $mdSidenav, userId) {
	document.title = "Jobs";

	$scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {
        $mdSidenav('left').close();
    };
	$scope.jobListings = [
		{
			id: 6,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: true
		},
		{
			id: 7,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: false
		},
		{
			id: 8,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 6,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: false
		},
		{
			id: 7,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: true
		},
		{
			id: 8,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 6,
			title: "Senior Sales Account Manager ",
			company: "Verifone",
			location: "Johannesburg, Gauteng",
			created: "1 day ago",
			recruiter: false
		}
	];

	$scope.showInfo = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;
		$mdDialog.show({
			locals: {job_id: id, user_id: userId.getUserId()},
			controller: dialog__,
			templateUrl: "jobs_info.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			fullscreen: true
		});
	};
});