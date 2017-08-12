var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');

router.get('/', function(req, res, next){
  res.redirect('/ny');
});

var allStates = ['ny', 'la', 'van', 'sea', 'chi', 'lv', 'hou', 'bos', 'sfr', 'was', 'sdi', 'syd', 'phi', 'hwi', 'atl', 'dal', 'flo', ]

var allCategory = ['news', 'videos', 're', 'secondHand', 'travel', 'law', 'education', 'hire', 'service', ]

var allCategoryCN = ['']
/* GET home page. */
router.get('/:states', function(req, res, next) {
  var states = req.params.states;
  if (allStates.indexOf(states) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else {
    res.render('index', {
      title : '华人生活网',
      link : states,
      isLoggedIn: req.isAuthenticated(),
      partials : {
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



router.get('/:states/:category', function(req, res, next) {
  var states = req.params.states;
  var category = req.params.category;
  if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else if (allCategory.indexOf(category) === 0) {
    res.render('news', {
      title : '华人生活网',
      link : states,
      categ: category,
      isLoggedIn: req.isAuthenticated(),
      partials : {
        head: '../views/partials/head',
        header: '../views/partials/header',
        navbar: '../views/partials/navbar',
        states: '../views/partials/states',
        footer: '../views/partials/footer',
        scripts: '../views/partials/scripts'
      }
    })
  } else if (allCategory.indexOf(category) === 1) {
    res.render('videos', {
      title : '华人生活网',
      link : states,
      categ: category,
      isLoggedIn: req.isAuthenticated(),
      partials : {
        head: '../views/partials/head',
        header: '../views/partials/header',
        navbar: '../views/partials/navbar',
        states: '../views/partials/states',
        footer: '../views/partials/footer',
        scripts: '../views/partials/scripts'
      }
    })
  } else {
    res.render('category', {
      title : '华人生活网',
      link : states,
      categ : category,
      isLoggedIn: req.isAuthenticated(),
      partials : {
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
  


router.get('/:states/:category/:action', function(req, res, next) {
  var states = req.params.states;
  var category = req.params.category;
  var action = req.params.action;
  if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else {
    res.render('postList', {
      title : '华人生活网',
      link : states,
      categ : category,
      isLoggedIn: req.isAuthenticated(),
      partials : {
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




module.exports = router;
