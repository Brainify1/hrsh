var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'), ['listings']);
var listingsCollection = db.collection('listings');
var randomstring = require('randomstring')
var stripe = require("stripe")(
    "sk_test_06LcZ0PYx5HC0Yh02FiDxqLd"
);
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
});
router.get('/payment/:id/:month', loginRequired, function(req, res, next) {
    var { id, month } = req.params
    if (id && month) {
        listingsCollection.findOne({
            _id: mongojs.ObjectId(id)
        }, (err, docs) => {
            if (err) {
                console.log(err)
            }
            /*if (req.device.type.toUpperCase() == 'DESKTOP') {*/
            res.render('payment', {
                docs: docs,
                icon: req.user.icon,
                iconExt: req.user.iconExt,
                username: req.user.username,
                uid: randomstring.generate(),
                amount: () => {
                    if (month == 1) {
                        return 2000
                    } else if (month == 3) {
                        return 4000
                    } else if (month == 6) {
                        return 6000
                    }
                },
                month: () => {
                    if (month == 1) {
                        return 1
                    } else if (month == 3) {
                        return 3
                    } else if (month == 6) {
                        return 6
                    }
                },
                display_amount: () => {
                    if (month == 1) {
                        return 20
                    } else if (month == 3) {
                        return 40
                    } else if (month == 6) {
                        return 60
                    }
                },
                partials: {
                    head: '../views/partials/head',
                    header: '../views/partials/header',
                    navbar: '../views/partials/navbar',
                    states: '../views/partials/states',
                    footer: '../views/partials/footer',
                    scripts: '../views/partials/scripts'
                },
            });
            /*} else {
                res.render('payment', {
                    docs: docs,
                    icon: req.user.icon,
                    iconExt: req.user.iconExt,
                    username: req.user.username,
                    uid: randomstring.generate(),
                    partials: {
                        header: '../views/partials/header.hjs',
                        navbar: '../views/partials/navbar.hjs',
                        footer: '../views/partials/footer.hjs',
                    },
                });
            }*/
        })
    }
});

router.post('/payment/', (req, res, next) => {
    var token = req.body
    console.log(token)
    stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: token.token
    }, {
        idempotency_key: token.uid
    }, function(err, charge) {
        if (err) {
            res.send(err)
            console.log(err)
        }
        console.log(charge)
        if (charge && charge.amount == 2000) {
            listingsCollection.findAndModify({
                query: {
                    _id: mongojs.ObjectId(token.postID)
                },
                update: {
                    $set: {
                        paid: 'true',
                        expire: Date.now() + 2629746000
                    }
                },
                new: true
            }, (err, docs, leo) => {
                if (err) {
                    console.log(err)
                }
                res.sendStatus(200)
            })
        } else if (charge && charge.amount == 4000) {
            listingsCollection.findAndModify({
                query: {
                    _id: mongojs.ObjectId(token.postID)
                },
                update: {
                    $set: {
                        paid: 'true',
                        expire: Date.now() + 7889238000
                    }
                },
                new: true
            }, (err, docs, leo) => {
                if (err) {
                    console.log(err)
                }
                res.sendStatus(200)
            })
        } else if (charge && charge.amount == 6000) {
            listingsCollection.findAndModify({
                query: {
                    _id: mongojs.ObjectId(token.postID)
                },
                update: {
                    $set: {
                        paid: 'true',
                        expire: Date.now() + 15778476000
                    }
                },
                new: true
            }, (err, docs, leo) => {
                if (err) {
                    console.log(err)
                }
                res.sendStatus(200)
            })
        }
    });
})




module.exports = router;