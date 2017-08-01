var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: '华人生活网',
	partials: {
		header: '../views/partials/header',
	}
	})
});

module.exports = router;
