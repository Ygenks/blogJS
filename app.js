const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./logger');
const Blog = require('./models/blog');
const app = express();


const PORT = process.env.PORT || 5000;

const requestLogger = function(req, res, next) {
    logger.log('info', 'URL:', req.originalUrl, 'METHOD:', req.method, 'BODY:', req.body);
    next();
};

app.use(bodyParser.json());
app.use(requestLogger);
app.set('view engine', 'pug');

app.get('/blogs', function(req, res) {
    res.json([{title: 'First', body: 'First' }, {title: 'Second', body: 'Second' }]);
});

app.get('/blogs/:id', function(req, res) {
    res.json({title: 'First', body: 'First' });
});

app.post('/blogs', function(req, res) {
    res.json({ message: 'Article successfully created!' });
});

app.put('/blogs/:id', function(req, res) {
    res.json({ message: 'Article ' + req.params.id  + ' successfully modified!' });
});

app.delete('/blogs/:id', function(req, res) {
    res.json({ message: 'Article ' + req.params.id  + ' successfully deleted!' });
});

app.use(function(req, res) {
    res.render('404', { message: 'Route not found for ' + req.originalUrl  });
});

app.listen(PORT, function() {
    console.log('Listening app on port ' + PORT);
});
