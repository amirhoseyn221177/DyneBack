var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var usersRouter = require('./routes/users');
var cookie_parser = require('cookie-parser')
var bod_parser = require('body-parser')
var app = express();
var db = require('./MongodDB/DBSetup');
const mongoose = require('./MongodDB/DBSetup');
var meetUp = require('./routes/meetUp')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(bod_parser.json())
app.use(cookie_parser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db
app.use('/user', usersRouter);
app.use('/meetup', meetUp)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
