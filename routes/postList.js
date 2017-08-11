var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/test');
var listingCollection = db.collection('listings');
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/listings/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage })

function loginRequired(req,res,next){
	if(!req.isAuthenticated()){
		return res.redirect("/");
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
router.post('/', upload.single('images'), function(req, res, next) {
	var listing = req.body;
	listing.img = req.file;
	listingCollection.save(listing, function(err, newListing) {
		if (err) {
			return err
		}
		res.json(newListing)
	})
})
module.exports = router;