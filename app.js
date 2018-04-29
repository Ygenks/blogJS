const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const logger = require('./logger');
const Article = require('./models/article.js');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.listen(PORT, function() {
    console.log('Listening app on port ' + PORT);
});

app.use(function(req, res, next) {
    logger.log('info', 'URL:', req.originalUrl, 'METHOD:', req.method, 'BODY:', req.body);
    next();
});

const articles = require('./routes/articles');
app.use('/articles', articles);

app.use(function(req, res) {
    res.render('404', { message: 'Route not found for ' + req.originalUrl });
});
