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
var multer = require('multer')
var adstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/ads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var newsStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/news/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var adUpload = multer({ storage: adstorage })
var newsUpload = multer({ storage: newsStorage })
// router.post('/news/post', newsUpload.single('newsPic'), function(req, res, next) {
//     const news = {
//         title: req.body.title,
//         content: req.body.content,
//         views: 0,
//         type: req.body.type,
//         created_at: Date.now(),
//         newsPicUrl: req.file.filename
//     }
//     console.log(req.body)
//     newsCollection.save(news, function(err, newsDoc) {
//         res.json(newsDoc)
//     })
// })

router.post('/news/post/server', newsUpload.single('newsPic'), function(req, res, next) {
    const news = req.body;
    news.file = req.file
    newsCollection.save(news, function(err, newsDoc) {
        res.redirect('/admin')
    })
})

router.get('/news/fetch', function(req, res, next) {
    newsCollection.find().sort({_id: -1}, function(err, newsList) {
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

// *********************** ADS ****************************//

router.post('/ads/postAd1', adUpload.single('ad1'), function(req, res, next) {
    var ad = {
        type: 1,
        company: req.body.company,
        url: req.body.url,
        imageName : req.file.filename,
        imageExt: req.file.mimetype,
        created_at: Date.now()
    }
    console.log(ad)
    adsCollection.save(ad, function(err, adsDoc) {
        if (err) {
            return err
        } else {
            res.redirect('/admin')
        }
    })
})
router.post('/ads/postAd2', adUpload.single('ad2'), function(req, res, next) {
    var ad = {
        type: 2,
        company: req.body.company,
        url: req.body.url,
        imageName : req.file.filename,
        imageExt: req.file.mimetype,
        created_at: Date.now()
    }
    adsCollection.save(ad, function(err, adsDoc) {
        if (err) {
            return err
        } else {
            res.redirect('/admin')
        }
    })
})
router.post('/ads/postAd3', adUpload.single('ad3'), function(req, res, next) {
    var ad = {
        type: 3,
        company: req.body.company,
        url: req.body.url,
        imageName : req.file.filename,
        imageExt: req.file.mimetype,
        created_at: Date.now()
    }
    adsCollection.save(ad, function(err, adsDoc) {
        if (err) {
            return err
        } else {
            res.redirect('/admin')
        }
    })
})
router.post('/ads/postAd4', adUpload.single('ad4'), function(req, res, next) {
    var ad = {
        type: 4,
        company: req.body.company,
        url: req.body.url,
        imageName : req.file.filename,
        imageExt: req.file.mimetype,
        created_at: Date.now()
    }
    adsCollection.save(ad, function(err, adsDoc) {
        if (err) {
            return err
        } else {
            res.redirect('/admin')
        }
    })
})
router.post('/ads/delete', function(req, res, next) {
    var adsId = req.body.id
    adsCollection.remove({ _id: mongojs.ObjectId(adsId) }, function(err, removedAds) {
        res.json(removedAds)
        console.log(removedAds)
    })
})
router.get('/ads/list',(req,res,next)=>{
    adsCollection.find({},(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})
router.get('/ads/fetch/:id',(req,res,next)=>{
    var { id } = req.params 
    var aid = parseInt(id)
    adsCollection.find({
        type:aid
    },(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
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
        listingCollection.find().limit(10).sort({ _id: -1 }, (err, doc) => {
            res.json(doc)
        })
    })
    //fetch all hot listings sorted by view count
router.get('/listings/hot/fetch', (req, res) => {
    listingCollection.find().limit(10).sort({ views: -1 }, (err, doc) => {
        res.json(doc)
    })
})
router.get('/listing/fetchOne/:id', (req, res) => {
    var { id } = req.params;
    var stringId = id.toString()
    listingCollection.findOne({ refId: id }, function(err, listing) {
        if (err) {
            console.log(err)
        }
        res.json(listing)
    })
})



////////////////////////////////NEWS SECTION////////////////////////////////////////
router.get('/news/fetch/types/en', (req, res) => {
    res.json(newsTypes)
})

////////////////////////////////videos SECTION////////////////////////////////////////
router.post('/videos/new', (req, res) => {
    var video = req.body
    video.created_at = Date.now()
    videosCollection.save(video, (err, newVideo) => {
        res.json(newVideo)
    })
})
router.get('/videos/fetch/list', (req, res) => {
    videosCollection.find({}, (err, videos) => {
        res.json(videos)
    })
})
router.get('/videos/delete/:id', (req, res) => {
    const { id } = req.params;
    videosCollection.remove({_id: mongojs.ObjectId(id)}, (err, video) => {
        res.json(video)
    })
})
module.exports = router;