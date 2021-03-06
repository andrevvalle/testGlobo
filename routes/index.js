var express = require('express');
var router = express.Router();

var PostlistController = require('../api/controller/postlistController');

router.get('/', function(req, res){
	res.render('index', { title: "PostFeed Globo.com" });
});

router.get('/postfeed', PostlistController.findAll.bind(PostlistController));
router.put('/postfeed/:_id', PostlistController.update.bind(PostlistController));

module.exports = router;