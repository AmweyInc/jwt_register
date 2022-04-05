const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const UserController = require('../controllers/User-controller.js');
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth-middlewares.js')

// Post states
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:6,max:32})
    ,UserController.registration);
router.post('/login',UserController.login);
router.post('/logout',UserController.logout);

// Get states
router.get('/activate/:link',UserController.activate);
router.get('/refresh',UserController.refresh);
router.get('/users',authMiddleware,UserController.getUser);

module.exports = router;