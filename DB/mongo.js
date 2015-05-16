var mongojs = require('mongojs');
var db = mongojs('mongodb://heroku_app36897051:r365nfhknafacds4k5r66j92qb@ds037752-a0.mongolab.com:37752/heroku_app36897051?replicaSet=rs-ds037752', ['postfeed']);

module.exports = db;