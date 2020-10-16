const express =  require('express');
const articulosControllers = require('../controllers/articulosControllers') ;
const router =  express.Router();
const { check } = require('express-validator');
const verifyToken = require('../libs/verifyToken');

//Obtiene los resultados de la consulta.
router.get('/obtieneArticulos',articulosControllers.obtieneArticulos);

//Inserta o actualiza los aticulos.
router.post('/pr_insertActualizaArti',articulosControllers.pr_insertActualizaArti);


module.exports =  router;
