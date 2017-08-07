const passport = require("passport");
const router = require("express").Router();
var path = require('path');

/*router
	.post("/login", passport.authenticate("local", {
		successRedirect: "/userpage",
		failureRedirect: "/login",
	}))
	.get("/logout", (req, res, next) =>{
		req.session.destroy((err) =>{
			res.redirect("/")
		})
	})
	.get("/signup", (req, res, next) =>{
		res.render("signup", {message: req.flash('signupMessage')})
	})
	.post("/signup", passport.authenticate("local-register", {
		successRedirect: "/userpage",
		failureRedirect: "/signup",
	}))
*/
module.exports = router;
