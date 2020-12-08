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
    //COMENZAR_EDICION_TIPOEMPAQUE,
    TIPOEMPAQUE_EDITADO_EXITO,
    TIPOEMPAQUE_EDITADO_ERROR,

} from '../types';

//Cada reducers tiene su propio state
const initialState = {
    tipoempaque: [],
    error: null,
    loading: false,
    tipoempeditar: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action) {

    switch(action.type){

        case COMENZAR_DESCARGA_TIPOEMPAQUE:
        case AGREGAR_TIPOEMPAQUE: 
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_TIPOEMPAQUE_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                tipoempaque: [...state.tipoempaque, action.payload]
            }
        case DESCARGA_TIPOEMPAQUE_ERROR:
        case AGREGAR_TIPOEMPAQUE_ERROR:
        case TIPOEMPAQUE_ELIMINADO_ERROR:
        case TIPOEMPAQUE_EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                 error: action.payload
            }
        case DESCARGA_TIPOEMPAQUE_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                tipoempaque: action.payload
            }
        case OBTENER_TIPOEMPAQUE_ELIMINAR:
            return{
                ...state,
                tipoempaqueEliminar: action.payload
            }
            case TIPOEMPAQUE_ELIMINADO_EXITO:
                return{
                    ...state,
                    tipoempaque: state.tipoempaque.filter(tipoemp => tipoemp.TIPO_EMP_ID !== state.tipoempaqueEliminar),
                    tipoempaqueEliminar: null
                }
            case OBTENER_TIPOEMPAQUE_EDITAR:
                return{
                    ...state,
                    tipoempeditar: action.payload
                }
            case TIPOEMPAQUE_EDITADO_EXITO:
                return{
                    ...state,
                    error: false,
                    tipoempeditar: null,
                    tipoempaque: state.tipoempaque.map(tipoemp =>
                        tipoemp.TIPO_EMP_ID === action.payload.TIPO_EMP_ID ? tipoemp =  action.payload : tipoemp
                    )
                }

        default:
            return state;
    }
}