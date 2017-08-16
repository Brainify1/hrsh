var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var newsCollection = db.collection('news');
router.post('/news/post', function(req, res, next) {
	const news = {
		title: req.body.title,
		content: req.body.content,
		views: 0,
		created_at: new Date()
	}
	newsCollection.save(news, function(err, newsDoc) {
		res.json(newsDoc)
	})
})
router.get('/news/fetch', function (req, res, next) {
	newsCollection.find(function(err, newsList) {
		res.json(newsList)
	})
})
router.post('/news/delete', function(req, res, next) {
    var newsId = req.body.id
	newsCollection.remove({_id: mongojs.ObjectId(newsId)}, function(err, removedNews) {
        res.json(removedNews)
        console.log(removedNews)
	})
})


module.exports = router;

