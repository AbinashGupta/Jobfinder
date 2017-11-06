'use strict';

/**
 * Module dependencies.
 */
var users = require('../../../users/server/controllers/users.server.controller'),
	jobs = require('../controllers/jobs.server.controller');

module.exports = function(app) {
	// Job Routes
    console.log('---------------------------------------')
    console.log('requiresLogin :' + users.requiresLogin);
    console.log('jobs.create :' + jobs.create);
    console.log('---------------------------------------')
    
//    app.get('/jobes', function (req, res) {
//        console.log('route executed');
//        jobs.list(req, res);
//    })
    
	app.route('/jobs')
		.get(jobs.list, function() {console.log('routed to get');})
		.post(users.requiresLogin, jobs.create, function() {console.log('routed to get');});
    
    app.route('/jobs/search')
        .get(jobs.search);

	app.route('/jobs/:jobId')
		.get(jobs.read)
		.put(users.requiresLogin, jobs.hasAuthorization, jobs.update)
		.delete(users.requiresLogin, jobs.hasAuthorization, jobs.delete);
    


	// Finish by binding the job middleware
	app.param('jobId', jobs.jobByID);
};
