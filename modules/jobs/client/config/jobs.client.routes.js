'use strict';

// Setting up route
angular.module('jobs.routes').config(['$stateProvider',
	function($stateProvider) {
		// Jobs state routing
		$stateProvider.
		state('listJob', {
			url: '/jobs',
			templateUrl: '/modules/jobs/client/views/list-jobs.client.view.html'
		}).
		state('createJob', {
			url: '/jobs/create',
			templateUrl: '/modules/jobs/client/views/create-job.client.view.html'
		}).
		state('viewJob', {
			url: '/jobs/:jobId',
			templateUrl: '/modules/jobs/client/views/view-job.client.view.html'
		}).
		state('editJob', {
			url: '/jobs/:jobId/edit',
			templateUrl: '/modules/jobs/client/views/edit-job.client.view.html'
		}).
        state('searchJobs', {
        url: '/search-jobs',
        templateUrl: '/modules/jobs/client/views/search-jobs.client.view.html',
        controller: 'JobsController'
      });
	}
]);