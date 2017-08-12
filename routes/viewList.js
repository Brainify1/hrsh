var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('viewList', { 
  	title: '华人生活网',
	partials: {
		head: '../views/partials/head',
		header: '../views/partials/header',
		navbar: '../views/partials/navbar',
		states: '../views/partials/states',
		footer: '../views/partials/footer',
		scripts: '../views/partials/scripts'
	}
	})
});

module.exports = router;