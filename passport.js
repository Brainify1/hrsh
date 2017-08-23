var mongojs = require('mongojs');
var db = mongojs(require('./db'));
var usersCollection = db.collection('users');
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({ passReqToCallback: true }, authenticate));
passport.use("local-register", new LocalStrategy({ passReqToCallback: true }, register));

function authenticate(req, email, password, done) {
    process.nextTick(function() {
        usersCollection
            .findOne({ email: email }, function(err, user) {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    console.log('not found')
                    return done(null, false, req.flash('loginMessage', 'Invalid username or password'));
                }
                done(null, user);
                console.log('logged in')
            }, done)
    })
}

function register(req, email, password, done) {
    usersCollection
        .findOne({ email: email }, function(err, user) {
            if (user) {
                console.log(email)
                return done(null, false);
            }
            if (password !== req.body.password2) {
                console.log(password)
                return done(null, false);
            }
     usersCollection
        .findOne({ username: req.body.nickname }, function(err, user) {
            if (user) {
                console.log(req.body.nickname)
                return done(null, false);
            }

            const newUser = {
                email: email,
                username: req.body.nickname,
                password: bcrypt.hashSync(req.body.password)
            }
            usersCollection
                .insert(newUser, function(ids) {
                    newUser.id = ids
                    done(null, newUser)
                    console.log('account created')
                })
        })
})
    }

passport.serializeUser(function(user, done) {
    done(null, user);

})

passport.deserializeUser(function(id, done) {
    usersCollection
        .find({ _id: id }, function(err, user) {
            done(null, user)
        }, done)
})