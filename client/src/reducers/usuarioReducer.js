import {
    COMENZAR_DESCARGA_USUARIO,
    DESCARGA_USUARIO_EXITO,
    DESCARGA_USUARIO_ERROR,
    DESCARGA_USUARIO_LOGUEO
} from '../types';


//Cada reducers tiene su propio state
const initialState = {
    usuario: [],
    usuariologue: '',
    error: null,
    loading: false
}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action) {
    
    switch(action.type) {

        case COMENZAR_DESCARGA_USUARIO:
            return{
                ...state,
                loading: action.payload
            }
        case DESCARGA_USUARIO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_USUARIO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                usuario: action.payload
            }
        case DESCARGA_USUARIO_LOGUEO:
            return{
                ...state,
                loading: true,
                error: null,
                usuariologue: action.payload
            }

        default: 
            return state;
    }
}