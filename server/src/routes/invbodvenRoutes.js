const express =  require('express');
const router =  express.Router();
const BodvenControllers =  require('../controllers/bodvenControllers');
//const auth = require('../middleware/auth');
const { check } = require('express-validator');


//Crea
//api/
router.post('/crearbodven',
   /*[
        check('BOD_VEN_CODIGO', 'El codigo vendedor no puede ser nulo').not().isEmpty(),
        check('BOD_VEN_USUARIO', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        check('BOD_VEN_TIPO', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],*/
    BodvenControllers.crearBodVen
);

//Actualizar proyecto via ID
router.put('/actualizarbodven',
    //auth,
    /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],*/
    BodvenControllers.actualizarBodeVende
);

//Eliminar un proyecto
router.post('/eliminarbodven',
    //auth,
    BodvenControllers.eliminarBodeVende
);



//Obtener toda unidades medida
router.get('/obtienebodven',BodvenControllers.obtenerBodeVende);

//Obtiene los usuarios
router.get('/obtieneusuarios',BodvenControllers.obtenerUsuariosVende);



module.exports = router;