const express = require('express');
const User = require('../models/User');
const validator = require('express-validator');
const verifyUser = require('../libs/verifyUser');
const verifyToken = require('../libs/verifyToken');

const userController = require('../controllers/userController');

const router = express.Router();
const user = new User();


router.get('/users', verifyToken.TokenValidation, userController.getUsers);


module.exports = router;