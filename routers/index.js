const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const UserController = require('../controllers/User-controller.js');

// Post states
router.post('/registration',UserController.registration);
router.post('/login',UserController.login);
router.post('/logout',UserController.logout);

// Get states
router.get('/activate/:link',UserController.activate);
router.get('/refresh',UserController.refresh);
router.get('/users',UserController.getUser);

module.exports = router;