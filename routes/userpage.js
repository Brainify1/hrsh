var express = require('express');
var router = express.Router();

function loginRequired(req,res,next){
	if(!req.isAuthenticated()){
		return res.redirect("/login")
	}
	next()
}

/* GET home page. */
router.get('/', loginRequired, function(req, res, next){
  res.render('userpage', { 
  	title: 'Yahello!', 
  	userFirstName: req.session.passport.user.first_name,
  	userLastName: req.session.passport.user.last_name
  });
  console.log(req.session)
});



module.exports = router;
