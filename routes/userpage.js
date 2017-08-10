var express = require('express');
var router = express.Router();

function loginRequired(req,res,next){
	if(!req.isAuthenticated()){
		return res.redirect("/")
	}
	next()
}

/* GET home page. */
router.get('/', loginRequired, function(req, res, next){
  res.render('userpage', { 
  	title: '华人生活网', 
    firstName: req.session.passport.user.first_name,
    lastName: req.session.passport.user.last_name,
    isLoggedIn: req.isAuthenticated(),
    partials: {
      navbar: '../views/partials/navbar',
      states: '../views/partials/states',
      header: '../views/partials/header'
  }
  });
  console.log(req.session)
}); 



module.exports = router;
