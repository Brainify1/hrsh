var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var newsCollection = db.collection('news');
router.get('/:states/:category', function(req, res, next) {
	console.log(123);

	videoCollection.find({ name : video1}), function(err, doc) {
	}
	console.log(doc);
})
router.post('/postNews', function(req, res, next) {
	const news = req.body;
	console.log(news)
	newsCollection.save(news, function(err, newsDoc) {
		res.json(newsDoc)
	})
})


module.exports = router;

