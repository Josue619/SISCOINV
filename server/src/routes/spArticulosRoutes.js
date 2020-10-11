const express =  require('express');
const articulosControllers = require('../controllers/articulosControllers') ;
const router =  express.Router();
const { check } = require('express-validator');
const verifyToken = require('../libs/verifyToken');

//Obtiene los resultados de la consulta.
router.get('/obtieneArticulos',articulosControllers.obtieneArticulos);


module.exports =  router;
