var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'));
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var newsCollection = db.collection('news');
var usersCollection = db.collection('users');
var statesEN = require('../statesEN');
var statesCN = require('../statesCN')
var categoryEN = require('../categoryEN');
var categoryCN = require('../categoryCN')
router.post('/news/post', function(req, res, next) {
    const news = {
        title: req.body.title,
        content: req.body.content,
        views: 0,
        type: req.body.type,
        created_at: new Date()
    }
    newsCollection.save(news, function(err, newsDoc) {
        res.json(newsDoc)
    })
})
router.get('/news/fetch', function(req, res, next) {
    newsCollection.find(function(err, newsList) {
        res.json(newsList)
    })
})
router.post('/news/delete', function(req, res, next) {
        var newsId = req.body.id
        newsCollection.remove({ _id: mongojs.ObjectId(newsId) }, function(err, removedNews) {
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

//get all news under category of type
router.get('/fetchNews/:type', function(req, res, next) {
    var { type } = req.params;
    newsCollection.find({ type }, function(err, kejiNews) {
        res.json(kejiNews)
    })
})

//get all EN states
router.get('/states/en/fetch', (req, res) => {
        res.json(statesEN)
    })
    //get all CN states
router.get('/states/cn/fetch', (req, res) => {
        res.json(statesCN)
    })
    //get all EN category
router.get('/category/en/fetch', (req, res) => {
        res.json(categoryEN)
    })
    //get all CN category
router.get('/category/cn/fetch', (req, res) => {
    res.json(categoryCN)
})

//get filtered listings
router.get('/listing/:state/:category/fetch', (req, res) => {
    var { state } = req.params;
    var { category } = req.params;
    listingCollection.find({ "data.state": state, "data.category": category }, function(err, doc) {
        res.json(doc)
    })
})
router.get('/listings/fetch', (req, res) => {
    listingCollection.find((err, doc) => {
        res.json(doc)
    })
})
router.get('/listing/delete/:id', (req, res) => {
    var { id } = req.params;
    listingCollection.remove({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        res.json(doc)
    })
})
router.get('/users/delete/:id', (req, res) => {
    var { id } = req.params;
    usersCollection.remove({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        res.json(doc)
    })
})
module.exports = router;