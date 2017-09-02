var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'));
var listingCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var newsCollection = db.collection('news');
var usersCollection = db.collection('users');
var adsCollection = db.collection('ads');
var statesEN = require('../statesEN');
var statesCN = require('../statesCN');
var categoryEN = require('../categoryEN');
var categoryCN = require('../categoryCN');
var newsTypes = require('../newsTypes');

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
router.get('/listings/fetchAll/:state/:category', (req, res) => {
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
////fetch all new listings sorted by date
router.get('/listings/new/fetch', (req, res) => {
    listingCollection.find().limit(10).sort({_id: -1}, (err, doc) => {
        res.json(doc)
    })
})
//fetch all hot listings sorted by view count
router.get('/listings/hot/fetch', (req, res) => {
    listingCollection.find().limit(10).sort({views: -1}, (err, doc) => {
        res.json(doc)
    })
})
router.get('/listing/fetchOne/:id', (req, res) => {
    var { id } = req.params;
    var stringId = id.toString()
    listingCollection.findOne({ refId: id}, function(err, listing) {
        if (err) {
            console.log(err)
        } 
        res.json(listing)
    })
})


// *********************** ADS ****************************//

router.post('/ads/postAd1', function(req, res, next) {
    console.log(req.body)
    var ads1 = {
        comapany1: req.body.company1,
        url1: req.body.url1,
        created_at: new Date()
    }
    
    adsCollection.save(ads1, function(err, adsDoc) {
        if(err) {
            return err
        }
    })
})
// router.get('/ads/postAd1', function(req, res, next) {
//     adsCollection.find(function(err, adsList) {
//         res.json(adsList)
//     })
// })

router.post('/ads/delete1', function(req, res, next) {
        var adsId = req.body.id
        adsCollection.remove({ _id: mongojs.ObjectId(adsId) }, function(err, removedAds) {
            res.json(removedAds)
            console.log(removedAds)
        })
    })
router.get('/news/fetch/types/en', (req, res) => {
    res.json(newsTypes)
})
router.get('/news/fetch/ratio', (req, res) => {
    var ratio = []
    newsCollection.find((err, allNews) => {
        var allNewsRatio = allNews.length
        newsCollection.find({type: 'kj'}, (err, kjNews) => {
            ratio.push(Math.floor(kjNews.length / allNewsRatio * 100))
            newsCollection.find({type: 'sh'}, (err, shNews) => {
                ratio.push(Math.floor(shNews.length / allNewsRatio * 100))
                newsCollection.find({type: 'yl'}, (err, ylNews) => {
                    ratio.push(Math.floor(ylNews.length / allNewsRatio * 100))
                    newsCollection.find({type: 'yl'}, (err, zz) => {
                        ratio.push(Math.floor(zz.length / allNewsRatio * 100))
                        newsCollection.find({type: 'yl'}, (err, ty) => {
                            ratio.push(Math.floor(ty.length / allNewsRatio * 100))
                            newsCollection.find({type: 'yl'}, (err, ys) => {
                                ratio.push(Math.floor(ys.length / allNewsRatio * 100))
                                newsCollection.find({type: 'yl'}, (err, sy) => {
                                    ratio.push(Math.floor(sy.length / allNewsRatio * 100))
                                    res.send(ratio)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    
})

// router.post('/userpage/delete', function(req, res, next) {
//         var newsId = req.body.id
//         listingsCollection.remove({ _id: mongojs.ObjectId(newsId) }, function(err, removedNews) {
//             res.json(removedNews)
//             console.log(removedNews)
//         })
//     })
module.exports = router;
