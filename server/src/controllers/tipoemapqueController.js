const InvTipoEmpaque =  require('../models/tiposempaques');
const { validationResult } =  require('express-validator');

//Obtiene los tipos de empaques
exports.obtenerTiposEmpaques = async (req, res) => {
    try {
        const tipoempaque = await InvTipoEmpaque.findAll();
        res.json({ tipoempaque });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}

//Crea una tipo de empaque
exports.crearTipoEmpaque =  async (req, res) => {
   
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Creamos la unidad de medida
        const tipoempaque = new InvTipoEmpaque(req.body);
        await tipoempaque.save();
        res.json({ tipoempaque });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

// Actualizar unidad medida
exports.actualizarTipoEmpaque = async (req, res ) => {
    
    try {
        // Extraer el Unidades medida y comprobar si existe
        const tipoempaque = req.body;
        
        await InvTipoEmpaque.update({
            TIPO_EMP_DESCRIPCION: tipoempaque.TIPO_EMP_DESCRIPCION
        },
            {
                where: { TIPO_EMP_ID: tipoempaque.TIPO_EMP_ID }
            });
        
            res.status(200).json({
                success: true,
                message: 'Proceso actualizado.'
            });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+error)
    }
}

// Elimina una tarea
exports.eliminarTipoEmpaque = async (req, res) => {
    
    const errores = validationResult(req);
    
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {
       const resultado = await InvTipoEmpaque.destroy({
           where: {
                TIPO_EMP_ID:req.body.TIPO_EMP_ID
            }
        });
        console.log(resultado);
        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}