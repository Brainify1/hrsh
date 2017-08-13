var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/test');
var listingCollection = db.collection('listings');
var imageCollection = db.collection('image')
var randomstring = require("randomstring");
var refString  = randomstring.generate(32);
var ObjectId = require('mongodb').ObjectID;
require("../app");
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/listings/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage });



router.post('/images', upload.any(),(req,res,next)=>{
	var files = req.files
	var imageJSON = {
		refId : refString,
		data: files
	}
	console.log(files)
	imageCollection.save(imageJSON,(err,docs)=>{
		if(err){
			console.log(err);
			return err;
		}
		res.sendStatus(200)
	})
})
module.exports = router;