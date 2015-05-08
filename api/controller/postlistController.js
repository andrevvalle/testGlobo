var PostlistModel = require('../model/postlistModel');
var Promise = require('bluebird');

function PostlistController(Model) {
	this.Model = Promise.promisifyAll(Model);
}

PostlistController.fn = PostlistController.prototype;

PostlistController.fn.findAll = function(req, res) {
	var data = req.body;

	this.Model.findAllAsync()
		.then(function(result){
			res.json(result);
		})
		.catch( function(err){
			console.log(err);
		});
};

PostlistController.fn.update = function(req, res) {
	var data = req.body,
		_id = req.params._id;

	this.Model.updateAsync(data, _id)
		.then(function(result){
			res.json(result);
		})
		.catch( function(err){
			console.log(err);
		});
};

module.exports = new PostlistController(PostlistModel);