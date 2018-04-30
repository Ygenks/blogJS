var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var AuthController = {};

AuthController.home = function(req, res) {
  res.render('index', { user : req.user });
};

AuthController.register = function(req, res) {
  res.render('register');
};

AuthController.registerUser = function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

AuthController.login = function(req, res) {
  res.render('login');
};

AuthController.loginUser = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

AuthController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = AuthController;
