import {
    COMENZAR_DESCARGA_ARTILOCA,
    DESCARGA_ARTILOCA_EXITO,
    DESCARGA_ARTILOCA_ERROR
} from '../types';

import { obtenerArticulosLocalizacion } from '../services/inv.services'; 

//Funcion que descarga las localizaciones de los productos de la base datos.
export function obtenerProductosLocalAction(productos){
    return async (dispatch) => {
        dispatch(descargarProductosLoca());
        
        try {
            const respuesta = await obtenerArticulosLocalizacion(productos);
            dispatch( descargaProductosLocaExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosLocaError() )
        }
    }
}

const descargarProductosLoca = () => ({
    type: COMENZAR_DESCARGA_ARTILOCA,
    payload: true
});

const descargaProductosLocaExitosa = productos => ({
    type: DESCARGA_ARTILOCA_EXITO,
    payload: productos
});

const descargaProductosLocaError = () => ({
    type:DESCARGA_ARTILOCA_ERROR,
    payload: true
});