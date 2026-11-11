var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Load environment variables from .env file
require('dotenv').config();
const connectionString = process.env.MONGO_CON;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

// Get the default connection and check for errors/success
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){	
  console.log("Connection to DB succeeded");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource'); // Resource router for API endpoints

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter); // Mount resource router

// Import model and seed database on startup
var Costume = require("./models/costume");

async function recreateDB(){  
  await Costume.deleteMany();  
  
  let instance1 = new Costume({costume_type:"ghost", size:'large', cost:15.4});  
  instance1.save().then(doc => {    
    console.log("First object saved");
  }).catch(err => {    
    console.error(err);
  });

  let instance2 = new Costume({costume_type:"witch", size:'medium', cost:20.0});  
  instance2.save().then(doc => {    
    console.log("Second object saved");
  }).catch(err => {    
    console.error(err);
  });

  let instance3 = new Costume({costume_type:"goblin", size:'small', cost:12.5});  
  instance3.save().then(doc => {    
    console.log("Third object saved");
  }).catch(err => {    
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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