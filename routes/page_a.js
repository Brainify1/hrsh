var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page_a', { 
	partials: {
		header: '../views/partials/header',
		navbar: '../views/partials/navbar'
	}
	})
});

module.exports = router;