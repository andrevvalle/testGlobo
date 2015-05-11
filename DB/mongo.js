var mongojs = require('mongojs');
var db = mongojs('mongodb://testglobo:1234@ds063899.mongolab.com:63899/testglobo', ['postfeed']);

module.exports = db;