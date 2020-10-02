const express = require('express');
const User = require('../models/User');
const validator = require('express-validator');
const verifyUser = require('../libs/verifyUser');
const verifyToken = require('../libs/verifyToken');

const authController = require('../controllers/authController');

const router = express.Router();
const user = new User();

//router.post('/signup', authController.signup);
router.post('/admin_auth', authController.admin_auth);

router.post('/signup', 
[
    validator.check('email').isEmail().withMessage('Formato de correo electrónico incorrecto').custom(async email => {
      if (await user.verifyEmail(email)) {
        throw new Error('El correo electrónico ya existe en el registro.')
      }
    }),
    validator.check('password').isLength({ min: 8 }).withMessage('La contraseña debe contener 8 caracteres')
  ], 
  verifyUser.UserValidation, authController.signup
);

router.post('/signin', authController.signin);
router.get('/profile/:id', verifyToken.TokenValidation, authController.profile);
router.post('/procedimiento',
        //verifyToken.TokenValidation,
        [
          validator.check('descripcion').isEmpty().withMessage('La descripcion no puede ser nula')
          
        ],
        authController.procedimiento);

module.exports = router;