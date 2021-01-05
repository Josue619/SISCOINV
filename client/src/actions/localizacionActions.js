import {
    AGREGAR,
    AGREGAR_EXITO,
    AGREGAR_ERROR,
    COMENZAR_DESCARGA,
    DESCARGA_EXITO,
    DESCARGA_ERROR,
    OBTENER_ELIMINAR,
    ELIMINADO_EXITO,
    ELIMINADO_ERROR,
    OBTENER_EDITAR,
    COMENZAR_EDICION,
    EDITADO_EXITO,
    EDITADO_ERROR

} from '../types';

import { obtenerListadoLocalizacion, agregarNuevaLocalizacion, eliminarLocalizacion, editarLocalizacion } from '../services/inv.services';
import Swal from 'sweetalert2';


//Agrear nueva unidad medida
export function crearNuevaLocalizacionAction(localizacion){
    return async (dispatch) =>{
        dispatch( agregar() );
        try {
            //Insertar en la api
            await agregarNuevaLocalizacion(localizacion);
            
            //Si todo sale bien actualizar el state
            dispatch(agregarExito(localizacion));

            //Alerta
            alertaMensaje('El registro se agrego correctamente','success', 'Correcto');

        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarError(true));

            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');

        }
    }
}

const agregar = () => ({
    type: AGREGAR,
    payload: true
});

//Si el producto se guarda en la base datos 
const agregarExito = localizacion => ({
    type: AGREGAR_EXITO,
    payload: localizacion
});

//si hubo un error
const agregarError = estado => ({
    type: AGREGAR_ERROR,
    payload: estado
});

//Selecciona y elimina unidad medida
export function borrarLocalizacionAction(localizacion) {
    return async (dispatch) => {
       
        dispatch(obtenerEliminar(localizacion.LCN_LOCALIZACION) );

        try {
            await eliminarLocalizacion(localizacion);
            
            dispatch(eliminarExito());
            Swal.fire(
                'Eliminado!',
                'El registro se ha eliminado correctamente.',
                'success'
              );
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarError() );
            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }
}

const obtenerEliminar = id => ({
    type: OBTENER_ELIMINAR,
    payload: id
});

const eliminarExito = () => ({
    type: ELIMINADO_EXITO
});

const eliminarError = () => ({
    type: ELIMINADO_ERROR,
    payload: true
});


//Funcion que descarga los productos de la base datos.
export function obtenerLocalizacionesActions(){
    return async (dispatch) => {
        dispatch(descargar());
        
        try {
            const respuesta = await obtenerListadoLocalizacion();
            dispatch( descargaExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaError() )

        }
    }
}

const descargar = () => ({
    type: COMENZAR_DESCARGA,
    payload: true
});

const descargaExitosa = localizaciones => ({
    type: DESCARGA_EXITO,
    payload: localizaciones.localizacion
});

const descargaError = () => ({
    type:DESCARGA_ERROR,
    payload: true
});

//Colocar prodcuto en edicion
export function obternerLocalizacionEditar(localizacion) {
    return (dispatch) => {
        dispatch(obtenerLocalizacionEditarAction(localizacion) );
    }
}

const obtenerLocalizacionEditarAction = localizacion => ({
    type: OBTENER_EDITAR,
    payload: localizacion
});

//Edita un registro en la api y state
export function editarLocalizacionAction(localizacion) {
    return async (dispatch) => {

        dispatch( comenzareditarLocalizacion());

        try {
            
            await editarLocalizacion(localizacion);
            dispatch(editarLocalizacionExito(localizacion));
            
        } catch (error) {
            console.log(error);
            dispatch( editarLocalizacionError() );
        }
    }
}

const comenzareditarLocalizacion = () => ({
    type: COMENZAR_EDICION,
    //payload: producto
});

const editarLocalizacionExito = localizacion =>({
    type: EDITADO_EXITO,
    payload: localizacion
});

const editarLocalizacionError = () => ({
    type: EDITADO_ERROR,
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