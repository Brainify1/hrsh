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
  	userFirstName: req.session.passport.user.first_name,
  	userLastName: req.session.passport.user.last_name,
    partials: {
      navbar: '../views/partials/navbar',
      states: '../views/partials/states'
  }
  });
  console.log(req.session)
}); 



module.exports = router;
