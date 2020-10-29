import { AGREGAR_BODEGUERO_VENDEDOR,
         AGREGAR_BODEGUERO_VENDEDOR_EXITO,
         AGREGAR_BODEGUERO_VENDEDOR_ERROR,
         OBTENER_BODEGUERO_VENDEDOR_ELIMINAR,
         BODEGUERO_VENDEDOR_ELIMINADO_EXITO,
         BODEGUERO_VENDEDOR_ELIMINADO_ERROR,
         OBTENER_BODEGUERO_VENDEDOR_EDITAR,
         COMENZAR_EDICION_BODEGUERO_VENDEDOR,
         BODEGUERO_VENDEDOR_EDITADO_EXITO,
         BODEGUERO_VENDEDOR_EDITADO_ERROR,
         COMENZAR_DESCARGA_BODEGUERO_VENDEDOR,
         DESCARGA_BODEGUERO_VENDEDOR_EXITO,
         DESCARGA_BODEGUERO_VENDEDOR_ERROR
} from '../types';

import { agregarNuevoBodeVende, editarBodeVende, eliminarBodeVende, obtenerListadoBodeVede } from '../services/inv.services';

import Swal from 'sweetalert2';

export function crearNuevoBodeVeden(bodevende) {
    return async (dispatch) => {
        dispatch( agregarBodeVende() );

        try {
            //Insertar en la api
            await agregarNuevoBodeVende(bodevende);

            //Si no hay error
            dispatch(agregarBodeVendeExito(bodevende));


            //Alerta
            alertaMensaje('El registro se ha agregado correctamente','success', 'Correcto');
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarBodeVendeError(true));

            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }

}

const agregarBodeVende = () => ({
    type: AGREGAR_BODEGUERO_VENDEDOR,
    payload: true
});

//Si el producto se guarda en la base datos 
const agregarBodeVendeExito = unimedida => ({
    type: AGREGAR_BODEGUERO_VENDEDOR_EXITO,
    payload: unimedida
});

//si hubo un error
const agregarBodeVendeError = estado => ({
    type: AGREGAR_BODEGUERO_VENDEDOR_ERROR,
    payload: estado
});

//Funcion que descarga los vendedores.
export function obtenerBodeVendAction(){
    return async (dispatch) => {
        dispatch(descargarBodeVende());
        
        try {
            const respuesta = await obtenerListadoBodeVede();
            dispatch( descargaBodeVendeExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaBodeVendeError() )
        }
    }
}

const descargarBodeVende = () => ({
    type: COMENZAR_DESCARGA_BODEGUERO_VENDEDOR,
    payload: true
});

const descargaBodeVendeExitosa = bodevende => ({
    type: DESCARGA_BODEGUERO_VENDEDOR_EXITO,
    payload: bodevende
});

const descargaBodeVendeError = () => ({
    type:DESCARGA_BODEGUERO_VENDEDOR_ERROR,
    payload: true
});

//Selecciona y elimina unidad medida
export function borrarBodeVendeAction(bodevende) {
    return async (dispatch) => {
        dispatch(obtenerBodeVendeEliminar(bodevende.BOD_VEN_CODIGO) );

        try {
            const resultado = await eliminarBodeVende(bodevende);
            console.log(resultado);
            
            dispatch(eliminarBodeVendeExito());
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
              );
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarBodeVendeError() );
            //Alerta de error.
            alertaMensaje(error +'. Intenta de nuevo','error', 'Hubo un error');
        }
    }
}

const obtenerBodeVendeEliminar = id => ({
    type: OBTENER_BODEGUERO_VENDEDOR_ELIMINAR,
    payload: id
});

const eliminarBodeVendeExito = () => ({
    type: BODEGUERO_VENDEDOR_ELIMINADO_EXITO
});

const eliminarBodeVendeError = () => ({
    type: BODEGUERO_VENDEDOR_ELIMINADO_ERROR,
    payload: true
});

//Colocar prodcuto en edicion
export function obternerBodeVendeEditar(bodevende) {
    return (dispatch) => {
        dispatch(obtenerBodeVendeEditarAction(bodevende) );
    }
}

const obtenerBodeVendeEditarAction = bodevende => ({
    type: OBTENER_BODEGUERO_VENDEDOR_EDITAR,
    payload: bodevende
});

//Edita un registro en la api y state
export function editarBodeVendeAction(bodevende) {
    return async (dispatch) => {

        dispatch( editarBodVen());

        try {
            
            await editarBodeVende(bodevende);
            dispatch(editarBodeVendeExito(bodevende));
            console.log('Actuzaliza');
        } catch (error) {
            console.log(error);
            dispatch( editarUniMediError() );
        }
    }
}

const editarBodVen = () => ({
    type: COMENZAR_EDICION_BODEGUERO_VENDEDOR,
    //payload: producto
});

const editarBodeVendeExito = producto =>({
    type: BODEGUERO_VENDEDOR_EDITADO_EXITO,
    payload: producto
});

const editarUniMediError = () => ({
    type: BODEGUERO_VENDEDOR_EDITADO_ERROR,
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