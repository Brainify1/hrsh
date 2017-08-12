var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');

router.get('/', function(req, res, next){
  res.redirect('/ny');
});

var allStates = ['ny', 'la', 'van', 'sea', 'chi', 'lv', 'hou', 'bos', 'sfr', 'was', 'sdi', 'syd', 'phi', 'hwi', 'atl', 'dal', 'flo']

var allCategory = ['news', 'videos', 're', 'secondHand', 'travel', 'law', 'education', 'hire', 'service']

var allCategoryCN = ['']
/* GET home page. */
router.get('/:states', function(req, res, next) {
  var states = req.params.states;
  res.render('index', {
    title : states,
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

  if (allStates.indexOf(states) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else {
    res.render('index', {
      title : '华人生活网',
      link : states,
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
  var listings = req.params.listings;
  // res.send('omg' + states + listings);
  res.render('realEstate', {
    title : states,
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
})

  var category = req.params.category;
  if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else if (allCategory.indexOf(category) === 0) {
    res.render('news', {
      title : '华人生活网',
      link : states,
      categ: category,
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

  var listings = req.params.listings;
  var action = req.params.action;
  // res.send('omg' + states + listings + action);
  res.render('postList', {
    title : '华人生活网',
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
})
// router.get('/', function(req, res, next) {
//   res.render('index', { 
//   	title: '华人生活网',
//   	isLoggedIn: req.isAuthenticated(),
// 	partials: {
// 		header: '../views/partials/header',
// 		navbar: '../views/partials/navbar',
// 		states: '../views/partials/states',
// 		footer: '../views/partials/footer'
// 	}
// 	})
//   console.log(req.session)
// });

  var category = req.params.category;
  if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
    res.send('Wrong path! Please go back to previus page.');
  } else {
    res.render('postList', {
      title : '华人生活网',
      link : states,
      categ : category,
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
