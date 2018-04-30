const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const auth = require('../controllers/auth');

router.get('/', auth.home);

router.get('/register', auth.register);

router.post('/register', auth.registerUser);

router.get('/login', auth.login);

router.post('/login', auth.loginUser);

router.get('/logout', auth.logout);

module.exports = router;
