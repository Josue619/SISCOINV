const db = require('../config/database');
const { validationResult } =  require('express-validator');

//Obtiene los datos del articulo
exports.obtieneArticulos = async (req, res) => {

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

//Obtiene las localizaciones de los articulos.
exports.obtieneArticulosLocalizacion = async (req, res) => {
    const producto = req.body;

    await db.query('CALL pr_obtener_articulo_localizacion(:ATO_CODIGO);',{ 
        
        replacements : {ATO_CODIGO: producto.ATO_CODIGO}
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
     });
    
}

//Obtiene los datos del articulo
exports.pr_insertActualizaArti = async (req, res) => {
    const producto = req.body;
   
    await db.query('CALL pr_inst_upd_inv_articulos(:codiArt, :descripcion, :detalle, :marca, :modelo, :empacadoen, :unidaMediEmp, :piezasunidades, :tipoempaque, :unidadmedida);',{
        replacements : {codiArt: producto.ATO_CODIGO,
                        descripcion : producto.ATO_DESCRIPCION,
                        detalle: producto.ATO_DETALLE,
                        marca: producto.ATO_MAR_MARCA,
                        modelo: producto.ATO_MOD_MODELO,
                        empacadoen: producto.ATO_CANTIDAD_EMPAQUE,
                        unidaMediEmp: producto.ATO_MED_MEDIDA_EMPAQUE,
                        piezasunidades: producto.ATO_PIEZAS_UNIDADES,
                        tipoempaque: producto.ATO_TIPO_EMPAQUE,
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

//Obtiene los datos del articulo
exports.pr_inv_del_articulo = async (req, res) => {
    const codiArti = req.body;
    console.log(codiArti);
    
    await db.query('CALL pr_inv_del_articulo(:codiArt);',{
        replacements : {codiArt: codiArti.ATO_CODIGO}
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