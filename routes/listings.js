var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');

router.get('/', function(req, res, next){
  res.render('listings', { title: 'Yahello!' });
});

/* GET home page. */
router.get('/:type', function(req, res, next) {
  var {type} = req.params;
  listingCollection.find({type: type}, function(err, listings){
  	if(err){
  		return err;
  	} 
  	res.render('listings', { 
  		title: 'Listings',
  		listings: listings
	})
  })
});

module.exports = router;
