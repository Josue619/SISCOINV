    import {
    COMENZAR_DESCARGA_UNIDADES,
    DESCARGA_UNIDADES_EXITO,
    DESCARGA_UNIDADES_ERROR

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
        //case AGREGAR_PRODUCTO: 
            return{
                ...state,
                loading: action.payload
            }
        case DESCARGA_UNIDADES_ERROR:
        //case AGREGAR_PRODUCTO_ERROR:
        //case PRODUCTO_ELIMINADO_ERROR:
        //case PRODUCTO_EDITADO_ERROR:
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
            
        
        default:
            return state;
    }


    
}