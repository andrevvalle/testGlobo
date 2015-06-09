var mongojs = require('mongojs');
// FreeDevelopment --> var db = mongojs('mongodb://testglobo:1234@ds063899.mongolab.com:63899/testglobo', ['postfeed']);
// 15$ --> var db = mongojs('mongodb://heroku_app36897051:r365nfhknafacds4k5r66j92qb@ds037752-a0.mongolab.com:37752/heroku_app36897051?replicaSet=rs-ds037752', ['postfeed']);

// Free Produção
var db = mongojs('mongodb://heroku_app36897051:ls6tt8o4k595cai3hqqo6mjgcq@ds031972.mongolab.com:31972/heroku_app36897051', ['postfeed']);

module.exports = db;