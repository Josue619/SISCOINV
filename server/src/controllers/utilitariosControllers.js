const db = require('../config/database');
const { validationResult } =  require('express-validator');

//Obtiene los datos del articulo
exports.obtenerPermisoPantalla = async (req, res) => {
   parametros = req.body;

   console.log(parametros);

    // Revisar si hay errores
    /*const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        console.log(errores);
        return res.status(400).json({errores: errores.array() });
    }*/

    try {
        const resultado =  await  db.query('CALL pr_permiso_pantallas(:ejecutable, :usuario);',{
        replacements : { ejecutable : parametros.ejecutable,
                         usuario : parametros.usuario
        }
     });
     res.json(resultado);
   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error: '+ error);
   }
   
    /*console.log(req.body);
    await db.query('SELECT fv_permiso_componente(:ejecutable, :usuario) permiso;',{ 
        
        replacements : {ejecutable : parametros.ejecutable,
                        usuario : parametros.usuario
                    }
     })
     .then(function(response){ 
         //res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });
         console.log(response);
         res.json(response); 
     })
      .catch(function(err){ 
          console.log(err,'Hubo un error');
          res.json({ success: false, error: {"msg": err + '.' } });
          res.json(err); 
     });*/
    
}