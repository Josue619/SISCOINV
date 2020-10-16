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
         //res.json({ success: false, error: { "msg": 'Ingrese el código de authenticación.' } });
         res.json(response); 
     })
      .catch(function(err){ 
          console.log(err,'Hubo un error');
          res.json({ success: false, error: {"msg": err + '.' } });
          res.json(err); 
     });
    
}

//Obtiene los datos del articulo
exports.pr_insertActualizaArti = async (req, res) => {
    const producto = req.body;
    console.log(producto);

    await db.query('CALL pr_inst_upd_inv_articulos(:codiArt, :descripcion, :detalle, :marca, :modelo, :unidadmedida);',{
        replacements : {codiArt: producto.ATO_CODIGO,
                        descripcion : producto.ATO_DESCRIPCION,
                        detalle: producto.ATO_DETALLE,
                        marca: producto.ATO_MAR_MARCA,
                        modelo: producto.ATO_MOD_MODELO,
                        unidadmedida: producto.ATO_UNIDAD_MEDIDA
        }
     })
     .then(function(response){
        res.json(response); 
    })
     .catch(function(err){ 
         console.log(err,'Hubo un error');
         res.json({ success: false, error: {"msg": err + '.' } });
         res.json(err); 
    });
   
}