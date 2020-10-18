import {
    //AGREGAR_PRODUCTO,
    //AGREGAR_PRODUCTO_EXITO,
    //AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_UNIDADES,
    DESCARGA_UNIDADES_EXITO,
    DESCARGA_UNIDADES_ERROR/*,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR*/

} from '../types';
import { obtenerListadoUnidadeMedi } from '../services/inv.services';


//Funcion que descarga los productos de la base datos.
export function obtenerUniMedisAction(){
    return async (dispatch) => {
        dispatch(descargarUnidadesMedi());
        
        try {
            const respuesta = await obtenerListadoUnidadeMedi();
            //console.log(respuesta.data);
            dispatch( descargaUniMediExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaUniMediError() )
        }
    }
}

const descargarUnidadesMedi = () => ({
    type: COMENZAR_DESCARGA_UNIDADES,
    payload: true
});

const descargaUniMediExitosa = productos => ({
    type: DESCARGA_UNIDADES_EXITO,
    payload: productos
});

const descargaUniMediError = () => ({
    type:DESCARGA_UNIDADES_ERROR,
    payload: true
});