const express =  require('express');
const utilitariosControllers = require('../controllers/utilitariosControllers') ;
const router =  express.Router();

//Obtiene el permiso a la pantalla
//Obtiene los resultados de la consulta.
router.post('/permisopantalla',utilitariosControllers.obtenerPermisoPantalla);


module.exports =  router;