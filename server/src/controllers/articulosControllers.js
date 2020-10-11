const db = require('../config/database');
const { validationResult } =  require('express-validator');

//Obtiene los datos del articulo
exports.obtieneArticulos = async (req, res) => {
    const {codiArt, descripcion } = req.query;

    await db.query('CALL pr_obtener_articulos();',{
        /*replacements : {codiArt: codiArt,
                        descripcion : descripcion
        }*/
     })
     .then(function(response){ 
         console.log(response);
         //res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });
         res.json(response); 
     })
      .catch(function(err){ 
          console.log(err,'Hubo un error');
          res.json({ success: false, error: {"msg": err + '.' } });
          res.json(err); 
     });
    
}