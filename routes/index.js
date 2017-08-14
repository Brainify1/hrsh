var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test', ['listings']);
var listingsCollection = db.collection('listings');
var videosCollection = db.collection('videos');
var randomstring = require("randomstring");
var refString  = randomstring.generate(32);



router.get('/', function(req, res, next){
  res.redirect('/a/ny');
});

var allStates = ['ny', 'la', 'van', 'sea', 'chi', 'lv', 'hou', 'bos', 'sfr', 'was', 'sdi', 'syd', 'phi', 'hwi', 'atl', 'dal', 'flo'];

var allCategory = ['news', 'videos', 're', 'secondHand', 'travel', 'law', 'education', 'hire', 'service'];

var allCategoryCN = ['新闻', '影片', '房产服务', '二手市场', '旅游酒店', '法律经济', '教育培训', '招聘信息', '生活服务'];

/* Make sure user is logged in before viewing user page. */
function loginRequired(req,res,next){
  if(!req.isAuthenticated()){
    return res.redirect("/")
  }
  next()
}

/* GET user page. */
router.get('/a/:states/userpage', function(req, res, next) {
  var states = req.params.states;
  if (allStates.indexOf(states) === -1) {
    res.render('error');
  } else {
    listingsCollection.find({author: req.session.passport.user.username}).sort({_id: -1}, function(err, listings) {
      console.log(listings)
    res.render('userpage', {
      title : '华人生活网',
      link : states,
      listings,
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
  }
});

router.get('/a/:states', function(req, res, next) {
  var states = req.params.states;
  if (allStates.indexOf(states) === -1) {
    res.render('error');
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

router.get('/a/:states/:category', function(req, res, next) {
  var states = req.params.states;
  var category = req.params.category;
  var index_category = allCategory.indexOf(category);
  var categoryCN = allCategoryCN[index_category];
  if (allStates.indexOf(states) === -1 || allCategory.indexOf(category) === -1) {
    res.render('error');
  } else {
    listingsCollection.find({"data.category": category}).sort({_id: -1}, function(err, listings) {

        // var video1 = videosCollection.find({'name' : 'video1'}, function(err, obj){
          
        // })
        console.log(listings)
        res.render('category', {
          title : '华人生活网',
          link : states,
          categ: category,
          categCn: categoryCN,
          listings,
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
        // console.log(video1);
    })
  }
});
  

router.get('/a/:states/:category/postList', function(req, res, next) {
  var states = req.params.states;
  var category = req.params.category;
  if (allStates.indexOf(states) === -1 | allCategory.indexOf(category) === -1) {
    res.render('error');
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

router.post('/a/:states/:category/postList', function(req, res, next) {
  var states = req.params.states;
  var category = req.params.category;
  var author;
  if (req.isAuthenticated()) {
      author = req.session.passport.user.username
  } else {
      author = 'Guest'
  }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  var today = mm+'/'+dd+'/'+ yyyy;


  var listing = {
    refId: refString,
    data: req.body,
    created_at: today,
    views: 0,
    author
  }
	listingsCollection.save(listing, function(err, newListing) {
    if (err) {
      return err
    }
    res.redirect(`/a/${states}/${category}`)
  })
})

module.exports = router;
