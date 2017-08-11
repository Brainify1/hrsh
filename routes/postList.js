var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/test');
var listingCollection = db.collection('listings');
var ObjectId = require('mongodb').ObjectID;
require("../app");
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/listings/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('postList', { 
  	title: '华人生活网',
  	isLoggedIn: req.isAuthenticated(),
	partials: {
		head: '../views/partials/head',
		header: '../views/partials/header',
		navbar: '../views/partials/navbar',
		states: '../views/partials/states',
		footer: '../views/partials/footer',
		scripts: '../views/partials/scripts'
	}
	})
});
router.post('/', upload.single('images'), function(req, res, next) {
	var listing = req.body;
	listing.img = req.file;
	if(req.isAuthenticated()){
		var email = req.session.passport.user.email;
		console.log(listing)
		listingCollection.save(listing, function(err, newListing) {
			listingCollection.update(
				{'_id': newListing._id},
				{$set: {'email': email}}
			)
			console.log(email)
		if (err) {
			return err
		}
		res.redirect("/userpage")
	})
	}

	else{
	listingCollection.save(listing, function(err, newListing) {
		if (err) {
			return err
		}
		res.redirect("/postList")
	})
}
})
module.exports = router;