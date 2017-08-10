var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('moreVideo', { 
  	title: '华人生活网',
  	isLoggedIn: req.isAuthenticated(),
	partials: {
		header: '../views/partials/header',
		navbar: '../views/partials/navbar',
		states: '../views/partials/states'
	}
	})
});

module.exports = router;