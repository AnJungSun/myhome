var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var i18n = require('i18n');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

app.use(session({
  secret : 'MyHouse_session',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*
router.use(express.urlencoded({extended:false}));
router.use(bodyParser.json()); 
*/
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['ko', 'en'],
 
  // sets a custom cookie name to parse locale settings from
  cookie: 'MyHouselang',
 
  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales',
  defaultLocale :'ko'
});

app.use(i18n.init);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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


var port = process.env.PORT || 3000; //*
app.listen(port, function(){
  console.log('Server On!');
});