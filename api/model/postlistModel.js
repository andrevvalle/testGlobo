var mongo = require('../../DB/mongo');

function PostlistModel() {}

PostlistModel.fn = PostlistModel.prototype;

PostlistModel.fn.findAll = function(callback) {
	mongo.collection('postfeed').find({}, callback);
};

PostlistModel.fn.update = function(data, _id, callback) {
	mongo.collection('postfeed').update({"_id" : mongo.ObjectId(_id)}, {$push:{postList: data}}, callback);
};

module.exports = new PostlistModel();