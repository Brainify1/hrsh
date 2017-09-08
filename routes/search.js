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

router.get('/', (req, res, next) => {
    var { keyword } = req.query;
    var decodeURI = decodeURIComponent(keyword);
    if (keyword == '') { res.json([]) } else {
        listingCollection.find({
            $and: [{
                $or: [
                    { 'data.title': { $regex: decodeURI, $options: 'i' } },
                    { 'data.content': { $regex: decodeURI, $options: 'i' } },
                    { 'data.author': { $regex: decodeURI, $options: 'i' } }
                ]
            }]
        }, (err, listings) => {
            if (err) {
                console.log(err)
                res.send(err)
            }
            res.render('serch', {
                title: '华人生活网',
                listings,
                searchCount: () => {
                    if (listings.length == 0) {
                        return 0;
                    } else {
                        return listings.length
                    }
                },
                keyword: () => {
                    function escapeHtml(text) {
                        return text
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;");
                    }
                    return escapeHtml(decodeURI)
                },
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