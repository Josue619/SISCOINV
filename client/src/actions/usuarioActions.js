import {
    COMENZAR_DESCARGA_USUARIO,
    DESCARGA_USUARIO_EXITO,
    DESCARGA_USUARIO_ERROR,
    DESCARGA_USUARIO_LOGUEO
} from '../types';

import { getUsers, profile} from '../services/main.service'

const data = {
    page: 0,
    search: ''
}

//Funcion que descarga los vendedores.
export function obtenerUsuariosAction(){
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        
        try {
            const respuesta = await getUsers(data);
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
            dispatch( descargaUsuariosLogueoExitosa(respuesta.data.USU_LOGIN));
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