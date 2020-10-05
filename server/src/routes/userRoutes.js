const express = require('express');
const User = require('../models/User');
const validator = require('express-validator');
const verifyUser = require('../libs/verifyUser');
const verifyToken = require('../libs/verifyToken');

const userController = require('../controllers/userController');

const router = express.Router();
const user = new User();

router.post('/user', 
[
    validator.check('email').isEmail().withMessage('Formato de correo electrónico incorrecto').custom(async email => {
      if (await user.verifyEmail(email)) {
        throw new Error('El correo electrónico ya existe en el registro.')
      }
    }),
    validator.check('password').isLength({ min: 8 }).withMessage('La contraseña debe contener 8 caracteres')
  ], 
  verifyUser.UserValidation, verifyToken.TokenValidation, userController.createUser
);

router.get('/users', verifyToken.TokenValidation, userController.getUsers);


module.exports = router;