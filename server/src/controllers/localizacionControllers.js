const InvLocalizacion =  require('../models/localizaciones');
const { validationResult } =  require('express-validator');

//Obtiene los datos
exports.obtenerLocalizacion = async (req, res) => {
    try {
        const localizacion = await InvLocalizacion.findAll();
        res.json({ localizacion });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

//Crear
exports.crearLocalizacion =  async (req, res) => {
   
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Creamos la localizacion
        const localiza = new InvLocalizacion(req.body);
        await localiza.save();
        res.json({ localiza });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

// Actualizar unidad medida
exports.actualizarLocalizacion = async (req, res ) => {
    
    try {
        // Extraer el Unidades medida y comprobar si existe
        const localiza = req.body;
        console.log('datos',localiza);
        
        await InvLocalizacion.update({
            LCN_DESCRIPCION: localiza.LCN_DESCRIPCION,
            LCN_NUM_ORDEN: localiza.LCN_NUM_ORDEN,
            LCN_DESCONTINUADA: localiza.LCN_DESCONTINUADA,
            LCN_DESCONTINUADA_POR: localiza.LCN_DESCONTINUADA_POR,
            LCN_FECHA_DESCONTINUADA: localiza.LCN_FECHA_DESCONTINUADA,
            LCN_TELEFONO: localiza.LCN_TELEFONO,
        },
            {
                where: { LCN_LOCALIZACION: localiza.LCN_LOCALIZACION }
            });
        
            res.status(200).json({
                success: true,
                message: 'El registro fue actualizado.'
            });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+error)
    }
}

// Elimina una tarea
exports.eliminarLocalizacion = async (req, res) => {
    
    const errores = validationResult(req);
    
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {
       const resultado = await InvLocalizacion.destroy({
           where: {
            LCN_LOCALIZACION: req.body.LCN_LOCALIZACION
            }
        });
        console.log(resultado);
        res.json({msg: 'Registro Eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}
