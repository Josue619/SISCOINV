import {
    AGREGAR_TIPOEMPAQUE,
    AGREGAR_TIPOEMPAQUE_EXITO,
    AGREGAR_TIPOEMPAQUE_ERROR,
    COMENZAR_DESCARGA_TIPOEMPAQUE,
    DESCARGA_TIPOEMPAQUE_EXITO,
    DESCARGA_TIPOEMPAQUE_ERROR,
    OBTENER_TIPOEMPAQUE_ELIMINAR,
    TIPOEMPAQUE_ELIMINADO_EXITO,
    TIPOEMPAQUE_ELIMINADO_ERROR,
    OBTENER_TIPOEMPAQUE_EDITAR,
    COMENZAR_EDICION_TIPOEMPAQUE,
    TIPOEMPAQUE_EDITADO_EXITO,
    TIPOEMPAQUE_EDITADO_ERROR,

} from '../types';

import {agregarNuevoTipoEmpaque, editarTipoEmpaque, eliminarTimpoEmpaque, obtenerListadoTipoEmpaque } from '../services/inv.services';
import Swal from 'sweetalert2';

//Agrear nueva unidad medida
export function crearNuevaTipoEmpaqueAction(tipoempaque){
    return async (dispatch) =>{
        dispatch( agregarTipoEmpaque() );
        console.log(tipoempaque);
        try {
            //Insertar en la api
            await agregarNuevoTipoEmpaque(tipoempaque);
            
            //Si todo sale bien actualizar el state
            dispatch(agregarTipoEmpaqueExito(tipoempaque));

            //Alerta
            alertaMensaje('El registro se agrego correctamente','success', 'Correcto');

        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarTipoEmpaqueError(true));

            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }
}

const agregarTipoEmpaque = () => ({
    type: AGREGAR_TIPOEMPAQUE,
    payload: true
});

//Si el producto se guarda en la base datos 
const agregarTipoEmpaqueExito = tipoempaque => ({
    type: AGREGAR_TIPOEMPAQUE_EXITO,
    payload: tipoempaque
});

//si hubo un error
const agregarTipoEmpaqueError = estado => ({
    type: AGREGAR_TIPOEMPAQUE_ERROR,
    payload: estado
});

//Selecciona y elimina unidad medida
export function borrarTipoEmpaqueAction(tipoempaque) {
    return async (dispatch) => {
        //console.log(tipoempaque);
        dispatch(obtenerTipoEmpaqueEliminar(tipoempaque.TIPO_EMP_ID) );

        try {

            await eliminarTimpoEmpaque(tipoempaque);
            dispatch(eliminarTipoEmpaqueExito());
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
              );
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarTipoEmpaqueError() );
            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }
}

const obtenerTipoEmpaqueEliminar = id => ({
    type: OBTENER_TIPOEMPAQUE_ELIMINAR,
    payload: id
});

const eliminarTipoEmpaqueExito = () => ({
    type:TIPOEMPAQUE_ELIMINADO_EXITO
});

const eliminarTipoEmpaqueError = () => ({
    type: TIPOEMPAQUE_ELIMINADO_ERROR,
    payload: true
});

//Funcion que descarga los productos de la base datos.
export function obtenerTipoEmpaqueAction(){
    return async (dispatch) => {
        dispatch(descargarTipoEmpaque());
        
        try {
            const respuesta = await obtenerListadoTipoEmpaque();
            dispatch( descargaTipoEmpaqueExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaTipoEmpaqueError() );
        }
    }
}

const descargarTipoEmpaque = () => ({
    type: COMENZAR_DESCARGA_TIPOEMPAQUE,
    payload: true
});

const descargaTipoEmpaqueExitosa = tipoempaque => ({
    type: DESCARGA_TIPOEMPAQUE_EXITO,
    payload: tipoempaque.tipoempaque
});

const descargaTipoEmpaqueError = () => ({
    type:DESCARGA_TIPOEMPAQUE_ERROR,
    payload: true
});

//Colocar prodcuto en edicion
export function obternerTipoEmpaqueEditar(tipoempaque) {
    return (dispatch) => {
        dispatch(obtenerTipoEmpaqueEditarAction(tipoempaque) );
    }
}

const obtenerTipoEmpaqueEditarAction = tipoempaque => ({
    type: OBTENER_TIPOEMPAQUE_EDITAR,
    payload: tipoempaque
});

//Edita un registro en la api y state
export function editarTipoEmpaqueAction(tipoempaque) {
    return async (dispatch) => {

        dispatch( comenzareditarTipoEmpaque());

        try {
            
            await editarTipoEmpaque(tipoempaque);
            dispatch(editarTipoEmpaqueiExito(tipoempaque));
        } catch (error) {
            console.log(error);
            dispatch( editarTipoEmpaqueError() );
        }
    }
}

const comenzareditarTipoEmpaque = () => ({
    type: COMENZAR_EDICION_TIPOEMPAQUE,
    //payload: producto
});

const editarTipoEmpaqueiExito = tipoempaque =>({
    type: TIPOEMPAQUE_EDITADO_EXITO,
    payload: tipoempaque
});

const editarTipoEmpaqueError = () => ({
    type: TIPOEMPAQUE_EDITADO_ERROR,
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