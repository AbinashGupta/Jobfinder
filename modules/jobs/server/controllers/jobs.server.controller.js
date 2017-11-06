'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../../../core/server/controllers/errors.server.controller'),
	Job = mongoose.model('Job'),
	_ = require('lodash');

/**
 * Create a job
 */
exports.create = function(req, res) {
	var job = new Job(req.body);
	job.user = req.user;

	job.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(job);
		}
	});
};

/**
 * Show the current job
 */
exports.read = function(req, res) {
    console.log('read invoked');
    console.log(req.job);
	res.json(req.job);
};

/**
 * Update a job
 */
exports.update = function(req, res) {
	var job = req.job;

	job = _.extend(job, req.body);

	job.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(job);
		}
	});
};

/**
 * Delete an job
 */
exports.delete = function(req, res) {
	var job = req.job;

	job.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(job);
		}
	});
};

/**
 * List of Jobs
 */
exports.list = function(req, res) {
	Job.find().sort('-created').populate('user', 'displayName').exec(function(err, jobs) {
		if (err) {
            console.log('Error in server get');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log('response for get successful !');
			res.json(jobs);
		}
	});
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) {
    console.log('Jobbyid invoked');
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Job is invalid'
		});
	}

	Job.findById(id).populate('user', 'displayName').exec(function(err, job) {
		if (err) return next(err);
		if (!job) {
			return res.status(404).send({
				message: 'Job not found'
			});
		}
        console.log('job found !');
		req.job = job;
		next();
	});
};

/**
 * Job authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.job.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

exports.search = function(req, res) {
    console.log('search parms :' + req.query.searchKey)
    Job.find({$text: {$search: req.query.searchKey}})
       .limit(10)
       .exec(function(err, jobs) {
            if (err) {
                console.log('Error in server get  ' + err);
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else if (jobs) {
                console.log('Search successful !' + jobs);
                res.json(jobs);
            }
            else {
                return res.status(404).send({
                message: 'No jobs found'
                })
            }
    });
};