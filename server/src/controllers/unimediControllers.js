const invUnidMedida =  require('../models/invUnidMedida');
const { validationResult } =  require('express-validator');

//Obtiene las uniades de medida
exports.obtenerUnidadMedida = async (req, res) => {

    try {
        const unidades = await invUnidMedida.findAll();
        //console.log(unidades);
        res.json({ unidades });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error: '+ error);
    }

}
