const express =  require('express');
const articulosControllers = require('../controllers/articulosControllers') ;
const unimediControllers = require('../controllers/unimediControllers');
const router =  express.Router();

//Obtiene los resultados de la consulta.
router.get('/obtieneArticulos',articulosControllers.obtieneArticulos);
router.get('/obtieneUnimedida',unimediControllers.obtenerUnidadMedida);

//Inserta o actualiza los aticulos.
router.post('/pr_insertActualizaArti',articulosControllers.pr_insertActualizaArti);


module.exports =  router;
