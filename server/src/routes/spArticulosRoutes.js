const express =  require('express');
const articulosControllers = require('../controllers/articulosControllers') ;
const unimediControllers = require('../controllers/unimediControllers');
const router =  express.Router();

//Obtiene los resultados de la consulta.
router.get('/obtieneArticulos',articulosControllers.obtieneArticulos);

//Inserta o actualiza los aticulos.
router.post('/pr_insertActualizaArti',articulosControllers.pr_insertActualizaArti);

//Elimina un articulo
router.post('/pr_inv_del_articulo',articulosControllers.pr_inv_del_articulo);




module.exports =  router;
