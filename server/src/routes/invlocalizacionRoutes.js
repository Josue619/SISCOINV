const express =  require('express');
const router =  express.Router();
const localizacionControllers =  require('../controllers/localizacionControllers');
//const auth = require('../middleware/auth');
const { check } = require('express-validator');


//Crea tipo de empaque
router.post('/crearlocalizacion',
   /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()

    ],*/
    localizacionControllers.crearLocalizacion
);

//Obtener toda unidades medida
router.get('/obtienelocalizacion',localizacionControllers.obtenerLocalizacion);

//Actualizar proyecto via ID
router.put('/actualizarlocalizacion',
    //auth,
    /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],*/
    localizacionControllers.actualizarLocalizacion
);

//Eliminar un proyecto
//Actualizar proyecto via ID
router.post('/eliminarlocalizacion',
    //auth,
    localizacionControllers.eliminarLocalizacion
);



module.exports = router;