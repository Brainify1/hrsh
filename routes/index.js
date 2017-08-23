var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'));
var listingsCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var imagesCollection = db.collection('image');
var randomstring = require("randomstring");


/*Redirect*/
router.get('/', function(req, res, next) {
    res.redirect('/a/ny');
});
router.get('/login', function(req, res, next) {
    res.redirect('/a/ny');
});
router.get('/signup', function(req, res, next) {
    res.redirect('/a/ny');
});

/*Array of all states and category*/
var allStates = ['ny', 'la', 'van', 'sea', 'chi', 'lv', 'hou', 'bos', 'sfr', 'was', 'sdi', 'syd', 'phi', 'hwi', 'atl', 'dal', 'flo'];

var allStatesCN = ['紐約', '洛杉矶', '温哥华', '西雅图', '芝加哥', '拉斯維加斯', '休斯敦', '波士顿', '旧金山', '华盛顿', '圣地亚哥', '悉尼', '费城', '夏威夷', '亚特兰大', '达拉斯', '佛罗里达']

var allCategory = ['news', 'videos', 're', 'secondHand', 'travel', 'law', 'education', 'hire', 'service'];

var allCategoryCN = ['新闻', '影片', '房产服务', '二手市场', '旅游酒店', '法律经济', '教育培训', '招聘信息', '生活服务'];


/* GET states */
router.get('/a/:states', function(req, res, next) {
    var states = req.params.states;
    if (allStates.indexOf(states) === -1) {
        res.render('error');
    } else {
        res.render('index', {
            title: '华人生活网',
            link: states,
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
    }
});
/* GET category */
router.get('/a/:states/:category', function(req, res, next) {
    var states = req.params.states;
    var category = req.params.category;
    var index_states = allStates.indexOf(states);
    var index_category = allCategory.indexOf(category);
    var categoryCN = allCategoryCN[index_category];
    var statesCN = allStatesCN[index_states];
    if (allStates.indexOf(states) === -1 || allCategory.indexOf(category) === -1) {
        res.render('error');
    } else if (allCategory.indexOf(category) === 1) {
        res.render('videos', {
            title: '华人生活网',
            link: states,
            categ: category,
            categCn: categoryCN,
            statesCn: statesCN,
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
    } else if (allCategory.indexOf(category) === 0) {
        res.render('news', {
            title: '华人生活网',
            link: states,
            categ: category,
            categCn: categoryCN,
            statesCn: statesCN,
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
    } else {
        listingsCollection.find({ "data.category": category, "data.state": states }).sort({ _id: -1 }, function(err, listings) {
            // var video1 = videosCollection.find({'name' : 'video1'}, function(err, obj){       
            // })
            //console.log(states)
            res.render('category', {
                    title: '华人生活网',
                    link: states,
                    categ: category,
                    categCn: categoryCN,
                    statesCn: statesCN,
                    listings,
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
                // console.log(video1);
        })
    }
});

/*GET postList page*/
router.get('/a/:states/:category/postList', function(req, res, next) {
    var states = req.params.states;
    var category = req.params.category;
    var index_states = allStates.indexOf(states);
    var index_category = allCategory.indexOf(category);
    var categoryCN = allCategoryCN[index_category];
    var statesCN = allStatesCN[index_states];
    if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
        res.render('error');
    } else {
        res.render('postList', {
            title: '华人生活网',
            link: states,
            categ: category,
            categCn: categoryCN,
            statesCn: statesCN,
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
    }
});

/*POST into Database*/
/*GET content page*/
router.get('/a/:states/:category/:id', function(req, res, next) {
    var states = req.params.states;
    var category = req.params.category;
    var id = req.params.id;
    var index_category = allCategory.indexOf(category);
    var categoryCN = allCategoryCN[index_category];
    if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
        res.render('error');
    } else {
        listingsCollection.find({ refId: id }).sort({ _id: -1 }, function(err, listings) {
            res.render('content', {
                title: '华人生活网',
                link: states,
                categ: category,
                categCN: categoryCN,
                listings,
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
        })
    }
})

module.exports = router;