var express = require('express');
var router = express.Router();

function loginRequired(req,res,next){
	if(!req.isAuthenticated()){
		return res.redirect("#myModal");
	}
	next()
}
/* GET home page. */
router.get('/', loginRequired, function(req, res, next) {
  res.render('postList', { 
  	title: '华人生活网',
  	isLoggedIn: req.isAuthenticated(),
	partials: {
		header: '../views/partials/header',
		navbar: '../views/partials/navbar',
		states: '../views/partials/states',
		footer: '../views/partials/footer'
	}
	})
});

module.exports = router;