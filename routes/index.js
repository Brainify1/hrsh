var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'));
var listingsCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var imagesCollection = db.collection('image');
var newsCollection = db.collection('news');
var randomstring = require("randomstring");
var newsType = require('../newsType');
var allCategoryCN = require('../categoryCN');
var allCategory = require('../categoryEN');

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

<<<<<<< HEAD



=======
var allCategory = require('../categoryEN')

var allCategoryCN = require('../categoryCn')
>>>>>>> 1ff44fd5fb1fab1a094b78639444dbcca5b79cbc


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
/*Get more news page*/
router.get('/a/:states/:type/news', function(req, res, next) {
        var states = req.params.states;
        var type = req.params.type;
        var index_states = allStates.indexOf(states);
        var statesCN = allStatesCN[index_states];
        if (allStates.indexOf(states) === -1 || newsType.indexOf(type) === -1) {
            res.render('error');
        } else {
            newsCollection.find({ type }).sort({ _id: -1 }, function(err, news) {
                res.render('news', {
                    title: '华人生活网',
                    link: states,
                    type,
                    news,
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
            })
        }
})
/*Get specific news article*/
router.get('/a/:states/:type/news/:id', function(req, res, next) {
        var id = req.params.id;
        var states = req.params.states;
        var type = req.params.type;
        var index_states = allStates.indexOf(states);
        var statesCN = allStatesCN[index_states]
        if (allStates.indexOf(states) === -1) {
            res.render('error');
        } else {
            newsCollection.find({ _id: id }).sort({ _id: -1 }, function(err, news) {
                console.log(news)
                console.log(newsCollection.find({ _id : id }))
                console.log(id)
                res.render('viewList', {
                    title: '华人生活网',
                    link: states,
                    news,
                    type,
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
            })
        }
})

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
         
        imagesCollection.find({ refId: id},(function(err, doc){
            listingsCollection.find({ refId: id }).sort({ _id: -1 }, function(err, listings) {
                var docs=[];
                    for(var x = 0; x < Object.keys(doc[0].data).length; x++){
                        docs[x] = doc[0].data[x].filename
                }
                console.log(docs)
                res.render('content', {
                    title: '华人生活网',
                    link: states,
                    categ: category,
                    categCN: categoryCN,
                    listings,
                    docs,
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
        })
        )
    }
})


module.exports = router;