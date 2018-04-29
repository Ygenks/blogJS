const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Article = require('../models/article');

router.get('/', function(req, res, next) {
    Article.find(function(err, articles) {
        if(err) return next(err);
        res.json(articles);
    });
});

router.get('/:id', function(req, res, next) {
    Article.findById(req.params.id, function(err, article) {
        if (err) return next(err);
        res.json(article);
    });
});

router.post('/', function(req, res, next) {
    Article.create(req.body, function (err, article) {
        if (err) return next(err);
        res.json(article);
    });
});

router.put('/:id', function(req, res, next) {
    Article.findByIdAndUpdate(req.params.id, req.body, function (err, article) {
        if (err) return next(err);
        article.updated_at = Date.now;
        res.json(article);
    });
});

router.delete('/:id', function(req, res, next) {
    Article.findByIdAndRemove(req.params.id, req.body, function (err, article) {
        if (err) return next(err);
        res.json(article);
    });
});

module.exports = router;
