import {
    AGREGAR_BODEGUERO_VENDEDOR,
    AGREGAR_BODEGUERO_VENDEDOR_EXITO,
    AGREGAR_BODEGUERO_VENDEDOR_ERROR,
    OBTENER_BODEGUERO_VENDEDOR_ELIMINAR,
    BODEGUERO_VENDEDOR_ELIMINADO_EXITO,
    BODEGUERO_VENDEDOR_ELIMINADO_ERROR,
    OBTENER_BODEGUERO_VENDEDOR_EDITAR,
    //COMENZAR_EDICION_BODEGUERO_VENDEDOR,
    BODEGUERO_VENDEDOR_EDITADO_EXITO,
    BODEGUERO_VENDEDOR_EDITADO_ERROR,
    COMENZAR_DESCARGA_BODEGUERO_VENDEDOR,
    DESCARGA_BODEGUERO_VENDEDOR_EXITO,
    DESCARGA_BODEGUERO_VENDEDOR_ERROR,
    OBTENER_BODEVENDE_CONSULTAR,
    PRODUCTO_BODEVENDE_EXITO
} from '../types';

//Cada reducers tiene su propio state
const initialState = {
    bodevende: [],
    error: null,
    loading: false,
    bodevedeEliminar: null,
    bodevedeeditar: null,
    bodevedeconsultar: null
}

export default function(state = initialState, action) {
    
    switch(action.type) {

        case COMENZAR_DESCARGA_BODEGUERO_VENDEDOR:
        case AGREGAR_BODEGUERO_VENDEDOR: 
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_BODEGUERO_VENDEDOR_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                bodevende: [...state.bodevende, action.payload]
            }
        case DESCARGA_BODEGUERO_VENDEDOR_ERROR:
        case BODEGUERO_VENDEDOR_ELIMINADO_ERROR:
        case BODEGUERO_VENDEDOR_EDITADO_ERROR:
        case AGREGAR_BODEGUERO_VENDEDOR_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_BODEGUERO_VENDEDOR_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                bodevende: action.payload
            }
        case OBTENER_BODEGUERO_VENDEDOR_ELIMINAR:
            return{
                ...state,
                bodevedeEliminar: action.payload
            }
        case BODEGUERO_VENDEDOR_ELIMINADO_EXITO:
            return{
                ...state,
                bodevende: state.bodevende.filter(bodeven => bodeven.BOD_VEN_CODIGO !== state.bodevedeEliminar),
                bodevedeEliminar: null
            }
        case OBTENER_BODEGUERO_VENDEDOR_EDITAR:
            return{
                ...state,
                bodevedeeditar: action.payload
            }
        case BODEGUERO_VENDEDOR_EDITADO_EXITO:
            return{
                ...state,
                error: false,
                bodevedeeditar: null,
                bodevende: state.bodevende.map(bodeven =>
                    bodeven.BOD_VEN_CODIGO === action.payload.BOD_VEN_CODIGO ? bodeven =  action.payload : bodeven
                )
            }
        case OBTENER_BODEVENDE_CONSULTAR:
            return{
                ...state,
                bodevedeconsultar: action.payload
            }
        case PRODUCTO_BODEVENDE_EXITO:
            return{
                ...state,
                bodevende: state.bodevende.filter(bodven => bodven.BOD_VEN_CODIGO === state.bodevedeconsultar || bodven.descriptipo === state.bodevedeconsultar || bodven.USU_LOGIN.includes(state.bodevedeconsultar)),
                bodevedeconsultar: null
            }


        default:
            return state;
    }


}