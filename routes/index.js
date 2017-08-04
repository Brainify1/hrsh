var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: '华人生活网',
	partials: {
		index_header: '../views/partials/index_header',
		navbar: '../views/partials/navbar'
	}
	})
});

module.exports = router;
