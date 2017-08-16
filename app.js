var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require("connect-flash");
var multer = require("multer");
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var passport = require("passport");
var router = express.Router();

var db = require("./db");
require("./passport");


var index = require('./routes/index');
//var page_a = require('./routes/page_a')
var users = require('./routes/users');
var authRoutes = require("./routes/auth");
var userPage = require("./routes/userpage");
var postList = require('./routes/postList');
var admin = require('./routes/admin');
var viewList = require('./routes/viewList');
var api = require('./routes/api');
var content = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  store: new RedisStore(),
  secret: "i love dogs", 
  resave: false, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(authRoutes);

app.use('/', index);
//app.use('/page_a', page_a);
app.use('/users', users);
app.use('/userpage', userPage);
app.use('/postList', postList);
app.use('/admin', admin);
app.use('/viewList/d/d/d', viewList);
app.use('/api', api);
app.use('/content', content);
/*app.get("/userpage", (req, res, next) =>{
  res.send({ 
    session: req.session,
    user: req.user,
    authenticated: req.isAuthenticated(),
  })
})  
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});  


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


