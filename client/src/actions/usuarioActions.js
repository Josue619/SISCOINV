import {
    COMENZAR_DESCARGA_USUARIO,
    DESCARGA_USUARIO_EXITO,
    DESCARGA_USUARIO_ERROR,
    DESCARGA_USUARIO_LOGUEO,
    OBTENER_CONSULTA
} from '../types';

import { profile , permisoEjecutable } from '../services/main.service';
import { obtenerUsuarios } from '../services/inv.services';
import Swal from 'sweetalert2';


//Funcion que descarga los vendedores.
export function obtenerUsuariosAction(){
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        
        try {
            const respuesta = await obtenerUsuarios();
            dispatch( descargaUsuariosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaUsuariosError() )
        }
    }
}

const descargarUsuarios = () => ({
    type: COMENZAR_DESCARGA_USUARIO,
    payload: true
});

const descargaUsuariosExitosa = usuarios => ({
    type: DESCARGA_USUARIO_EXITO,
    payload: usuarios
});

const descargaUsuariosError = () => ({
    type: DESCARGA_USUARIO_ERROR,
    payload: true
});

//Obtener usuario logue
export function obtenerUsuariosLogueoAction() {
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        
        try {
            const respuesta = await profile();
            
            dispatch( descargaUsuariosLogueoExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaUsuariosError() )
        }
    }
}

const descargaUsuariosLogueoExitosa = usuarios => ({
    type: DESCARGA_USUARIO_LOGUEO,
    payload: usuarios
});

export function permisoEjecutableActions(datos){
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        try {
            const respuesta = await permisoEjecutable(datos);
            dispatch( descargaResultado(respuesta.data[0]));

            if(respuesta.data[0].permiso === 'S'){
                console.log('Tiene permiso');
            }else{
                alertaMensaje('No tiene permiso para entrar a este ejecutable hable con el administrador','error','Permisos Usuario');
            }

        } catch (error) {
            console.log(error);
            dispatch( descargaUsuariosError() )
        }
    }
}


const descargaResultado = datos => ({
    type: OBTENER_CONSULTA,
    payload: datos.permiso
});

 //Dispara mensaje
 const alertaMensaje = (msg, icon, title) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: msg
    });

}

