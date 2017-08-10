const passport = require("passport");
const router = require("express").Router();
var path = require('path');

router.get("/login", (req, res, next) =>{
	// res.sendFile(path.join(__dirname + "/views/partials/header.hjs"), {message: req.flash('loginMessage')});
	res.render("index", {
	 message: req.flash('loginMessage'),
	 title: '华人生活网',
	 partials: {
	 header: '../views/partials/header',
	 navbar: '../views/partials/navbar',
	 states: '../views/partials/states'
   }
   })
 })
 
 router.post("/login", passport.authenticate("local", {
	 successRedirect: "/userpage",
	 failureRedirect: "/", 
 }))
 router.get("/logout", (req, res, next) =>{
	 req.session.destroy((err) =>{
	   res.redirect("/")
	 })
 })
 router.get("/signup", (req, res, next) =>{
	// res.sendFile(path.join(__dirname + "/views/partials/header.hjs"), {message: req.flash('signupMessage')});
	res.render("index", {message: req.flash('loginMessage')});
 })
 router.post("/signup", passport.authenticate("local-register", {
	 successRedirect: "/userpage",
	 failureRedirect: "/",
 }))

module.exports = router;
