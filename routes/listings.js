var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingCollection = db.collection('listings');

router.get('/', function(req, res, next){
  res.redirect('/listings/ny');
});


/* GET home page. */
router.get('/:states', function(req, res, next) {
  var states = req.params.states;
  res.render('index', {
    title : '华人生活网',
    partials : {
      header: '../views/partials/header',
      navbar: '../views/partials/navbar',
      states: '../views/partials/states',
      footer: '../views/partials/footer'
    }
  })
});



router.get('/:states/:listings', function(req, res, next) {
  var states = req.params.states;
  var listings = req.params.listings;
  // res.send('omg' + states + listings);
  res.render('realEstate', {
    title : '华人生活网',
    partials : {
      header: '../views/partials/header',
      navbar: '../views/partials/navbar',
      states: '../views/partials/states',
      footer: '../views/partials/footer'
    }
  })
})

router.get('/:states/:listings/:action', function(req, res, next) {
  var states = req.params.states;
  var listings = req.params.listings;
  var action = req.params.action;
  // res.send('omg' + states + listings + action);
  res.render('postList', {
    title : '华人生活网',
    partials : {
      header: '../views/partials/header',
      navbar: '../views/partials/navbar',
      states: '../views/partials/states',
      footer: '../views/partials/footer'
    }
  })
})
  // if (req.params.listings === undefined) {
  //   console.log(2)
  //   res.send("hi " + states)
  // } 

  // res.send("hi"+ states + listings)
  
  // res.render('states', {
  //   title : "ok",
  //   partials: {
  //     header: '../views/partials/header',
  //     navbar: '../views/partials/navbar',
  //     states: '../views/partials/states',
  //     footer: '../views/partials/footer'
  //   }
  // })
// })
  
  




module.exports = router;
