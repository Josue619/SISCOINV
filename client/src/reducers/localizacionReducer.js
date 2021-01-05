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
    //COMENZAR_EDICION_UNIDADMEDI,
    EDITADO_EXITO,
    EDITADO_ERROR

} from '../types';


//Cada reducers tiene su propio state
const initialState = {
    localizacion: [],
    error: null,
    loading: false,
    localizacioneditar: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action) {

    switch(action.type){
        case COMENZAR_DESCARGA:
        case AGREGAR: 
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                localizacion: [...state.localizacion, action.payload]
            }
        case DESCARGA_ERROR:
        case AGREGAR_ERROR:
        case ELIMINADO_ERROR:
        case EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        
        case DESCARGA_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                localizacion: action.payload
            }
        case OBTENER_ELIMINAR:
            return{
                ...state,
                localizacionEliminar: action.payload
            }
        case ELIMINADO_EXITO:
            return{
                ...state,
                localizacion: state.localizacion.filter(local => local.LCN_LOCALIZACION !== state.localizacionEliminar),
                localizacionEliminar: null
            }
        case OBTENER_EDITAR:
            return{
                ...state,
                localizacioneditar: action.payload
            }
        case EDITADO_EXITO:
            return{
                ...state,
                error: false,
                localizacioneditar: null,
                localizacion: state.localizacion.map(local =>
                    local.LCN_LOCALIZACION === action.payload.LCN_LOCALIZACION ? local =  action.payload : local
                )
            }
            
        
        default:
            return state;
    }


    
}