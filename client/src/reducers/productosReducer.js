import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_CONSULTAR,
    PRODUCTO_CONSULTAR_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';


//Cada reducers tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoeditar: null,
    productoconsultar: null

}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO: 
            return{
                ...state,
                loading: action.payload
            }       
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                productos: [...state.productos, action.payload]
            }
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoEliminar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter(producto => producto.ATO_CODIGO !== state.productoEliminar),
                productoEliminar: null
            }
        case OBTENER_PRODUCTO_CONSULTAR:
            return{
                ...state,
                productoconsultar: action.payload
               
            }
        case PRODUCTO_CONSULTAR_EXITO:
            return{
                ...state,
                productos: state.productos.filter(producto => producto.ATO_CODIGO === state.productoconsultar || producto.ATO_DESCRIPCION.includes(state.productoconsultar)),
                productoconsultar: null
            }
        
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar: action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                error: false,
                productoeditar: null,
                productos: state.productos.map(producto =>
                    producto.ATO_CODIGO === action.payload.ATO_CODIGO ? producto =  action.payload : producto
                )
            }
        


        default:
            return state;
    }
}