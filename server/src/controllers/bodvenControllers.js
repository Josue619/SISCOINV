const InvBodeVende =  require('../models/invbodven');
const { validationResult } =  require('express-validator');
const db = require('../config/database');

//Obtiene los bodegueros o vendedores
/*exports.obtenerBodeVende = async (req, res) => {
    console.log(res);
    try {
        const bodevende = await InvBodeVende.findAll();
        //console.log(unidades);
        res.json({ bodevende });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}*/

//Obtiene los datos del articulo
exports.obtenerBodeVende = async (req, res) => {

    await db.query('CALL pr_obtener_bodevende();',{
        /*replacements : {codiArt: codiArt,
                        descripcion : descripcion
        }*/
     })
     .then(function(response){ 
         //res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });
         res.json(response); 
     })
      .catch(function(err){ 
          console.log(err,'Hubo un error');
          res.json({ success: false, error: {"msg": err + '.' } });
          res.json(err); 
     });
    
}

//Obtiene los usuarios del sistema para cargarlos.
//Obtiene los datos del articulo
exports.obtenerUsuariosVende = async (req, res) => {

    await db.query('CALL pr_obtener_usuarios();',{
        /*replacements : {codiArt: codiArt,
                        descripcion : descripcion
        }*/
     })
     .then(function(response){ 
         //res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });
         res.json(response); 
     })
      .catch(function(err){ 
          console.log(err,'Hubo un error');
          res.json({ success: false, error: {"msg": err + '.' } });
          res.json(err); 
     });
    
}

//Crea una nueva unidad medida
exports.crearBodVen =  async (req, res) => {
   
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Creamos la unidad de medida
        const bodevende = new InvBodeVende(req.body);
        await bodevende.save();
        res.json({ bodevende });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}

// Actualizar unidad medida
exports.actualizarBodeVende = async (req, res ) => {
    
    try {
        // Extraer el Unidades medida y comprobar si existe
        const bodevende = req.body;
        console.log(bodevende);
        
        await InvBodeVende.update({
            BOD_VEN_USUARIO: bodevende.BOD_VEN_USUARIO,
            BOD_VEN_TIPO: bodevende.BOD_VEN_TIPO,
            BOD_VEN_MODIFICADO: bodevende.BOD_VEN_MODIFICADO,
            BOD_VEN_FECHAMODO: bodevende.BOD_VEN_FECHAMODO,

        },
            {
                where: { BOD_VEN_CODIGO: bodevende.BOD_VEN_CODIGO }
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

//Elimina una tarea
exports.eliminarBodeVende = async (req, res) => {
    
    const errores = validationResult(req);
    
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() })
    }

    try {
       const resultado = await InvBodeVende.destroy({
           where: {
               BOD_VEN_CODIGO:req.body.BOD_VEN_CODIGO
            }
        });
        console.log(resultado);
        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }
}
