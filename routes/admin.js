var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./admin/admin', { 
  	title: '管理平台',
  	isLoggedIn: req.isAuthenticated(),
	partials: {
		header: '../views/partials/header',
		navbar: '../views/partials/navbar',
		states: '../views/partials/states',
		footer: '../views/partials/footer'
	}
	})
  console.log(req.session)
});

module.exports = router;
