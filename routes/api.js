var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Brainify1:hrsh123@ds163681.mlab.com:63681/hrshdatabase', ['listings']);
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');

router.get(':states/:category', function(req, res, next) {
	console.log(123);

	videoCollection.find({ name : video1}), function(err, doc) {
	}
	console.log(doc);
})


module.exports = router;
