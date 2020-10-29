    import {
    AGREGAR_UNIDAD_MEDIDA,
    AGREGAR_UNIDAD_MEDIDA_EXITO,
    AGREGAR_UNIDAD_MEDIDA_ERROR,
    COMENZAR_DESCARGA_UNIDADES,
    DESCARGA_UNIDADES_EXITO,
    DESCARGA_UNIDADES_ERROR,
    OBTENER_UNIDAD_MEDIDA_ELIMINAR,
    UNIDAD_MEDIDA_ELIMINADO_EXITO,
    UNIDAD_MEDIDA_ELIMINADO_ERROR,
    OBTENER_UNIDADMEDI_EDITAR,
    //COMENZAR_EDICION_UNIDADMEDI,
    UNIDADMEDI_EDITADO_EXITO,
    UNIDADMEDI_EDITADO_ERROR

} from '../types';


//Cada reducers tiene su propio state
const initialState = {
    unimedida: [],
    error: null,
    loading: false,
    unimedidaeditar: null
}

export default function(state = initialState, action) {

    switch(action.type){
        case COMENZAR_DESCARGA_UNIDADES:
        case AGREGAR_UNIDAD_MEDIDA: 
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_UNIDAD_MEDIDA_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                unimedida: [...state.unimedida, action.payload]
            }
        case DESCARGA_UNIDADES_ERROR:
        case AGREGAR_UNIDAD_MEDIDA_ERROR:
        case UNIDAD_MEDIDA_ELIMINADO_ERROR:
        case UNIDADMEDI_EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        
        case DESCARGA_UNIDADES_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                unimedida: action.payload
            }
        case OBTENER_UNIDAD_MEDIDA_ELIMINAR:
            return{
                ...state,
                unimediEliminar: action.payload
            }
        case UNIDAD_MEDIDA_ELIMINADO_EXITO:
            return{
                ...state,
                unimedida: state.unimedida.filter(unimedi => unimedi.UNI_MED_ID !== state.unimediEliminar),
                unimediEliminar: null
            }
        case OBTENER_UNIDADMEDI_EDITAR:
            return{
                ...state,
                unimedidaeditar: action.payload
            }
        case UNIDADMEDI_EDITADO_EXITO:
            return{
                ...state,
                error: false,
                unimedidaeditar: null,
                unimedida: state.unimedida.map(unidades =>
                    unidades.UNI_MED_ID === action.payload.UNI_MED_ID ? unidades =  action.payload : unidades
                )
            }
            
        
        default:
            return state;
    }


    
}