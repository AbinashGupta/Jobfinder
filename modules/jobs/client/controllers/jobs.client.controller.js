'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs', 'searchFactory', '$http',
	function($scope, $stateParams, $location, Authentication, Jobs, searchFactory, $http) {
        
		$scope.authentication = Authentication;
//        console.log("authentication user: " + $scope.authentication.user._id);
		// Create new Job
		$scope.create = function() {
            console.log('create called --------');
			// Create new Job object
			var job = new Jobs({
				title: this.title,
				company: this.company,
				description: this.description,
				hourly_wage: this.hourly_wage,
				requirements: this.requirements,
				state: this.state,
				contact_email: this.contact_email
			});
            
            console.log('save hone wala hai');

			// Redirect after save
			job.$save(function(response) {
                console.log('save ho gya !');
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.company = '';
				$scope.description = '';
				$scope.requirements = '';
				$scope.hourly_wage = '';
				$scope.state = '';
				$scope.contact_email = '';
			}, function(errorResponse) {
                console.log('error occurred !');
				$scope.error = errorResponse.data.message;
			});

		};

		// Remove existing Job
		$scope.remove = function(job) {
			if (job) {
				job.$remove();

				for (var i in $scope.jobs) {
					if ($scope.jobs[i] === job) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobs
		$scope.find = function() {
			$scope.jobs = Jobs.query();
            console.log($scope.jobs);
		};

		// Find existing Job
		$scope.findOne = function() {
			$scope.job = Jobs.get({
				jobId: $stateParams.jobId
			});
            
		};

        $scope.search = function() {
            console.log('searchKeyword from jobs controller : ' + searchFactory.getSearchKey());
            $scope.searchKeyword = searchFactory.getSearchKey();
            $scope.jobs = searchFactory.execSearch($scope.searchKeyword, $scope);
//            console.log('search res :' + searchRes[0] + ' ' + searchRes[1]);
        }
	}
]);