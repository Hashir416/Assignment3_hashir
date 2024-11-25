let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localtrategy = passportlocal.Strategy;
let flash = require ('connect-flash');

let app = express();
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let WtrackerRouter = require('../routes/Wtracker');

// view engine setup
app.set('views', path.join(__dirname, '../views')); // No changes needed here
app.set('view engine', 'ejs');

// MongoDB setup
const mongoose = require('mongoose');
let DB = require('./db');
// Point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Unified and corrected mongoose connection options
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');

//setting up flash 

});
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))
//setting up flash and passports
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); // Static files
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workouts-list', WtrackerRouter); // Updated from books-list to workouts-list

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' }); // Updated to ensure consistent title formatting
});

module.exports = app;

