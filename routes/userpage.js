var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'), ['listings']);
var listingsCollection = db.collection('listings');

/* Make sure user is logged in before accessing user page. */
function loginRequired(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

/*GET user page*/
router.get('/', loginRequired, function(req, res, next) {
    listingsCollection.find({ author: req.session.passport.user.username }).sort({ _id: -1 }, function(err, listings) {
        console.log(listings)
        res.render('userpage', {
            title: '华人生活网',
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
});

router.post('/delete', function(req, res, next) {
        var newsId = req.body.refId
        console.log(newsId)
        listingsCollection.remove({ refId: newsId }, function(err, removedPost) {
            res.json(removedPost)
            console.log(removedPost)
        })
})




module.exports = router;