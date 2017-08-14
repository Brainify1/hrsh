var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');

// function loginRequired(req,res,next){
// 	if(!req.isAuthenticated()){
// 		return res.redirect("/")
// 	}
// 	next()
// }

// /* GET home page. */
// router.get('/', loginRequired, function(req, res, next){

//     res.render('userpage', { 
//     	title: '华人生活网', 

//       isLoggedIn: req.isAuthenticated(),
//       partials: {
//         head: '../views/partials/head',
//         header: '../views/partials/header',
//         navbar: '../views/partials/navbar',
//         states: '../views/partials/states',
//         footer: '../views/partials/footer',
//         scripts: '../views/partials/scripts'
//       }

// })
// });



module.exports = router;
