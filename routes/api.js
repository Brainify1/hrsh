var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var newsCollection = db.collection('news');
var usersCollection = db.collection('users');

router.get('/:states/:category', function(req, res, next) {
	console.log(123);

	videoCollection.find({ name : video1}), function(err, doc) {
	}
	console.log(doc);
})
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
//get all users in json
router.get('/allUsers', function(req, res, next) {
	usersCollection.find({}, function(err, users) {
		res.json(users)
	})
})
//get the number of a specific user's posting
router.get('/userPostsAmount/:id', function(req, res, next) {
	var {userId} =  req.params;
	
})


module.exports = router;

