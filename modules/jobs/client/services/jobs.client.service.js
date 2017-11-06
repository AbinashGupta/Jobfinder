'use strict';

//Jobs service used for communicating with the jobs REST endpoints
angular.module('jobs.services').factory('Jobs', ['$resource',
	function($resource) {
        console.log('setting resource');
		return $resource('/jobs/:jobId', {
			jobId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);