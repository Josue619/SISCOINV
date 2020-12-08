import {
    COMENZAR_DESCARGA_ARTILOCA,
    DESCARGA_ARTILOCA_EXITO,
    DESCARGA_ARTILOCA_ERROR
} from '../types';

//Cada reducers tiene su propio state
const initialState = {
    productosloca: [],
    error: null,
    loading: false,
    //productoEliminar: null,
    //productoeditar: null,
}


/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_ARTILOCA:
            return{
                ...state,
                loading: action.payload
            }

        case DESCARGA_ARTILOCA_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productosloca: action.payload
            }
        
        case DESCARGA_ARTILOCA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}