const passport = require("passport");
const router = require("express").Router();

router
	.get("/login", (req, res, next) =>{
		res.render("login", {message: req.flash('loginMessage')})
	})
	.post("/login", passport.authenticate("local", {
		successRedirect: "/userpage",
		failureRedirect: "/login",
	}))
	.get("/logout", (req, res, next) =>{
		req.session.destroy((err) =>{
			res.redirect("/login")
		})
	})
	.get("/signup", (req, res, next) =>{
		res.render("signup", {message: req.flash('signupMessage')})
	})
	.post("/signup", passport.authenticate("local-register", {
		successRedirect: "/userpage",
		failureRedirect: "/signup",
	}))
module.exports = router;
