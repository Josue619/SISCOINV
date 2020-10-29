const InvUnidMedida =  require('../models/invUnidMedida');
const { validationResult } =  require('express-validator');

//Obtiene las uniades de medida
exports.obtenerUnidadMedida = async (req, res) => {
    try {
        const unidades = await InvUnidMedida.findAll();
        //console.log(unidades);
        res.json({ unidades });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

//Crea una nueva unidad medida
exports.crearUnidadMedi =  async (req, res) => {
   
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Creamos la unidad de medida
        const unimedi = new InvUnidMedida(req.body);
        await unimedi.save();
        res.json({ unimedi });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

// Actualizar unidad medida
exports.actualizarUnidadMedi = async (req, res ) => {
    
    try {
        // Extraer el Unidades medida y comprobar si existe
        const unidadmedida = req.body;
        console.log(unidadmedida);
        
        await InvUnidMedida.update({
            UNI_MED_CODIUNIDAD: unidadmedida.UNI_MED_CODIUNIDAD,
            UNI_MED_DESCRIPCION: unidadmedida.UNI_MED_DESCRIPCION
        },
            {
                where: { UNI_MED_ID: unidadmedida.UNI_MED_ID }
            });
        
            res.status(200).json({
                success: true,
                message: 'El usuario fue actualizado.'
            });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+error)
    }
}

// Elimina una tarea
exports.eliminarUniMedida = async (req, res) => {
    
    const errores = validationResult(req);
    
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {
       const resultado = await InvUnidMedida.destroy({
           where: {
                UNI_MED_ID:req.body.UNI_MED_ID
            }
        });
        console.log(resultado);
        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}
