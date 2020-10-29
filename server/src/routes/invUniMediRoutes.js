const express =  require('express');
const router =  express.Router();
const unimediControllers =  require('../controllers/unimediControllers');
//const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea un proyecto
//api/proyectos
router.post('/crearUnidadMedi',
   /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()

    ],*/
    unimediControllers.crearUnidadMedi
);

//Obtener toda unidades medida
router.get('/obtieneUnimedida',unimediControllers.obtenerUnidadMedida);

//Actualizar proyecto via ID
router.put('/actualizarUnidadMedi',
    //auth,
    /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],*/
    unimediControllers.actualizarUnidadMedi
);

//Eliminar un proyecto
//Actualizar proyecto via ID
router.post('/eliminarUniMedida',
    //auth,
    unimediControllers.eliminarUniMedida
);



module.exports = router;