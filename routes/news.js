var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs(require('../db'), ['listings']);
var listingsCollection = db.collection('listings');

/*GET user page*/
router.get('/', function(req, res, next) {
        res.render('viewList', {
            title: '华人生活网',
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
