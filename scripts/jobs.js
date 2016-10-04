angular.module('jobs', ['ngMaterial', 'ngMessages'])

.controller('jobs__', function ($scope, $timeout, $mdSidenav, $mdDialog) {
	$scope.jobListings = [
		{
			id: 0,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: true
		},
		{
			id: 1,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: false
		},
		{
			id: 2,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 0,
			title: "Data Analyst",
			company: "Discovey",
			location: "Sandton, Gauteng",
			created: "7 hours ago",
			recruiter: false
		},
		{
			id: 1,
			title: "Invoice Clerk",
			company: "Creativ Crew",
			location: "Sandton, Gauteng",
			created: "23 hours ago",
			recruiter: true
		},
		{
			id: 2,
			title: "Administrative Position",
			company: "University Online",
			location: "Sandton, Gauteng",
			created: "1 day ago",
			recruiter: false
		},
		{
			id: 3,
			title: "Senior Sales Account Manager ",
			company: "Verifone",
			location: "Johannesburg, Gauteng",
			created: "1 day ago",
			recruiter: false
		}
	];

	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle();
	};

	$scope.close = function() {
		console.log("Nav close");
		$mdSidenav('left').close();
	};

	$scope.login = function() {
		if (!$scope.userId) {

		}
		console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
		$mdSidenav('left').close();
	};

	$scope.showInfo = function(ev, id) {
		console.log("Showing info for job of ID: " + id);
		$scope.selectedJob = id;
		$mdDialog.show({
			controller: DialogController,
			templateUrl: "jobs_info.html",
			parent: angular.element(document.body),
			targetEvent: ev,
			fullscreen: true
		});
	};

	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.apply = function() {
			$mdDialog.hide();
			apply();
		};
	}

	function apply() {
		if (!$scope.userId) {
			$mdSidenav('left').open();
		}
	}

});