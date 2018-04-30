const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const logger = require('./logger');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user.js');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const auth = require('./routes/auth')
app.use('/', auth)

const Article = require('./models/article.js');
const articles = require('./routes/articles');
app.use('/articles', isLoggedIn, articles);

app.use(function(req, res) {
    res.render('404', { message: 'Route not found for ' + req.originalUrl });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.use(function(req, res, next) {
    logger.log('info', 'URL:', req.originalUrl, 'METHOD:', req.method, 'BODY:', req.body);
    next();
});

app.listen(PORT, function() {
    console.log('Listening app on port ' + PORT);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
