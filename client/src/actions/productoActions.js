import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
import { obtenerArticulos, pr_insertActArticulos} from '../services/main.service';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) =>{
        dispatch( agregarProducto() );
        
        try {
            //Insertar en la api
            console.log(producto);
            /*await clienteAxios.post('/productos',producto);*/
            const resultado = await pr_insertActArticulos(producto);
            
            if(resultado.data[0].Lv_mensaje !== null){
                dispatch( agregarProductoError(true) );
                alertaMensajeError(resultado.data[0].Message,'error','Error MySQL: '+resultado.data[0].Code);
                
            }else{
                 //Si todo sale bien actualizar el state
                dispatch(agregarProductoExito(producto));

                //Alerta
                Swal.fire(
                    'Correcto',
                    'El producto se aagregó correctamente',
                    'success'
                );
            }
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error.
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error +'. Intenta de nuevo'
            });

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//Si el producto se guarda en la base datos 
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Funcion que descarga los productos de la base datos.
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());
        
        try {
            const respuesta = await obtenerArticulos();
            dispatch( descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            /*await clienteAxios.delete(`/productos/${id}`);*/
            dispatch(eliminarProductoExito());
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
              );
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type:PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//Colocar prodcuto en edicion
export function obternerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto());
        try {
            const resultado = await pr_insertActArticulos(producto);
            console.log(resultado);
            
            if(resultado.data[0].Lv_mensaje !== null){
                dispatch( editarProductoError() );
                alertaMensajeError(resultado.data[0].Message,'error','Error MySQL: '+resultado.data[0].Code);
                
            }else{
                dispatch(editarProductoExito(producto));
            }
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() );
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    //payload: producto
});

const editarProductoExito = producto =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
});

 //Dispara mensaje
const alertaMensajeError = (msg, icon, title) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: msg
    });

}

//Dispara mesanje temporal
/*const alertaMensajeTemporal = (msg, title) => {
    Swal.fire({
        title: title,
        text: msg,
        timer: 5000,
        showConfirmButton: false
        });
}*/