import {
    AGREGAR_UNIDAD_MEDIDA,
    AGREGAR_UNIDAD_MEDIDA_EXITO,
    AGREGAR_UNIDAD_MEDIDA_ERROR,
    COMENZAR_DESCARGA_UNIDADES,
    DESCARGA_UNIDADES_EXITO,
    DESCARGA_UNIDADES_ERROR,
    OBTENER_UNIDAD_MEDIDA_ELIMINAR,
    UNIDAD_MEDIDA_ELIMINADO_EXITO,
    UNIDAD_MEDIDA_ELIMINADO_ERROR,
    OBTENER_UNIDADMEDI_EDITAR,
    COMENZAR_EDICION_UNIDADMEDI,
    UNIDADMEDI_EDITADO_EXITO,
    UNIDADMEDI_EDITADO_ERROR

} from '../types';
import { obtenerListadoUnidadeMedi, agregarNuevaUnidadMedida, eliminarUnidadMedida, editarUnidadMedida} from '../services/inv.services';
import Swal from 'sweetalert2'

//Agrear nueva unidad medida
export function crearNuevaUniMediAction(unidadmedida){
    return async (dispatch) =>{
        dispatch( agregarUniMedi() );
        try {
            //Insertar en la api
            await agregarNuevaUnidadMedida(unidadmedida);
            
            //Si todo sale bien actualizar el state
            dispatch(agregarUniMediExito(unidadmedida));

            //Alerta
            alertaMensaje('La Unidad Medida se aagregó correctamente','success', 'Correcto');

        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarUniMediError(true));

            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');

        }
    }
}

const agregarUniMedi = () => ({
    type: AGREGAR_UNIDAD_MEDIDA,
    payload: true
});

//Si el producto se guarda en la base datos 
const agregarUniMediExito = unimedida => ({
    type: AGREGAR_UNIDAD_MEDIDA_EXITO,
    payload: unimedida
});

//si hubo un error
const agregarUniMediError = estado => ({
    type: AGREGAR_UNIDAD_MEDIDA_ERROR,
    payload: estado
});

//Selecciona y elimina unidad medida
export function borrarUniMediAction(unimedida) {
    return async (dispatch) => {
        dispatch(obtenerUniMediEliminar(unimedida.UNI_MED_ID) );

        try {
            const resultado = await eliminarUnidadMedida(unimedida);
            console.log(resultado);
            
            dispatch(eliminarUniMediExito());
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
              );
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarUniMediError() );
            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }
}

const obtenerUniMediEliminar = id => ({
    type: OBTENER_UNIDAD_MEDIDA_ELIMINAR,
    payload: id
});

const eliminarUniMediExito = () => ({
    type:UNIDAD_MEDIDA_ELIMINADO_EXITO    
});

const eliminarUniMediError = () => ({
    type: UNIDAD_MEDIDA_ELIMINADO_ERROR,
    payload: true
});

//Funcion que descarga los productos de la base datos.
export function obtenerUniMedisAction(){
    return async (dispatch) => {
        dispatch(descargarUnidadesMedi());
        
        try {
            const respuesta = await obtenerListadoUnidadeMedi();
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

const descargaUniMediExitosa = unidmedida => ({
    type: DESCARGA_UNIDADES_EXITO,
    payload: unidmedida.unidades
});

const descargaUniMediError = () => ({
    type:DESCARGA_UNIDADES_ERROR,
    payload: true
});

//Colocar prodcuto en edicion
export function obternerUniMediEditar(unimedida) {
    return (dispatch) => {
        dispatch(obtenerUniMediEditarAction(unimedida) );
    }
}

const obtenerUniMediEditarAction = unimedida => ({
    type: OBTENER_UNIDADMEDI_EDITAR,
    payload: unimedida
});

//Edita un registro en la api y state
export function editarUniMediAction(unimedida) {
    return async (dispatch) => {

        dispatch( editarUniMedi());

        try {
            
            await editarUnidadMedida(unimedida);
            dispatch(editarUniMediExito(unimedida));
            console.log('Actuzaliza');
        } catch (error) {
            console.log(error);
            dispatch( editarUniMediError() );
        }
    }
}

const editarUniMedi = () => ({
    type: COMENZAR_EDICION_UNIDADMEDI,
    //payload: producto
});

const editarUniMediExito = producto =>({
    type: UNIDADMEDI_EDITADO_EXITO,
    payload: producto
});

const editarUniMediError = () => ({
    type: UNIDADMEDI_EDITADO_ERROR,
    payload: true
});





 //Dispara mensaje
 const alertaMensaje = (msg, icon, title) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: msg
    });

}