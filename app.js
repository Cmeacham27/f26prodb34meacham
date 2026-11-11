var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 1. Environment & Mongoose Setup
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

// Get default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connection to DB succeeded");
});

// Import Dragon Model
var Dragon = require('./models/dragon');

// Routers setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');
var dragonRouter = require('./routes/dragon');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database seeding function (Part 5)
async function recreateDB(){
    await Dragon.deleteMany();
    
    let instance1 = new Dragon({ kind: "fire", wings: true, teeth: 64 });
    let instance2 = new Dragon({ kind: "ice", wings: false, teeth: 32 });
    let instance3 = new Dragon({ kind: "poison", wings: true, teeth: 128 });

    await instance1.save();
    console.log("First object saved");
    await instance2.save();
    console.log("Second object saved");
    await instance3.save();
    console.log("Third object saved");
}

let reseed = true;
if (reseed) {
    recreateDB();
}

// Mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);
app.use('/dragons', dragonRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;