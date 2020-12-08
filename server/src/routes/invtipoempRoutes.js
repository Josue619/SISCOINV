const express =  require('express');
const router =  express.Router();
const tipoempaqueControllers =  require('../controllers/tipoemapqueController');
//const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea tipo de empaque
router.post('/creartipoempaque',
   /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()

    ],*/
    tipoempaqueControllers.crearTipoEmpaque
);

//Obtener toda unidades medida
router.get('/obtienetipoempaque',tipoempaqueControllers.obtenerTiposEmpaques);

//Actualizar proyecto via ID
router.put('/actualizartipoempaque',
    //auth,
    /*[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],*/
    tipoempaqueControllers.actualizarTipoEmpaque
);

//Eliminar un proyecto
//Actualizar proyecto via ID
router.post('/eliminartipoempaque',
    //auth,
    tipoempaqueControllers.eliminarTipoEmpaque
);



module.exports = router;