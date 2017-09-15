var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs(require('../db'));
var listingCollection = db.collection('listings');
var imageCollection = db.collection('image')
var randomstring = require("randomstring");
var ObjectId = mongojs.ObjectID;
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/listings/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})


var refString;
var upload = multer({ storage });

router.post('/images', upload.any(),(req, res, next) => {
    refString = randomstring.generate();
    console.log(refString)
    var files = req.files
    var imageJSON = {
        refId: refString,
        data: files
    }
    console.log(files)
    imageCollection.save(imageJSON, (err, docs) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.sendStatus(200)
    })
})
router.post('/a/:states/:category/postList', function(req, res, next) {
        console.log(refString)
        var states = req.params.states;
        var category = req.params.category;
        var author;
        if (req.isAuthenticated()) {
            author = req.session.passport.user.username
            console.log(req.session.passport.user.username)
        } else {
            author = 'Guest'
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = mm + '/' + dd + '/' + yyyy;

        var listing = {
            refId: refString,
            data: req.body,
            created_at: today,
            views: 0,
            author
        }
        listingCollection.save(listing, function(err, newListing) {
            if (err) {
                return err
            }
            res.redirect(`/a/${states}/${category}`)
        })

    })
module.exports = router;