import React, { Fragment, useEffect } from 'react';

import Producto from './Producto';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../../../actions/productoActions';
import { obtenerUniMedisAction } from '../../../actions/unimediActions';
import { obtenerTipoEmpaqueAction } from '../../../actions/tipoempaqueActions';


const Productos = () => {
    
    const dispatch = useDispatch();
   
    useEffect( ()=> {
        //consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        const cargarUniMedi = () => dispatch(obtenerUniMedisAction());
        const cargarTipoEmp = () => dispatch(obtenerTipoEmpaqueAction());
        
        
        cargarProductos();
        cargarUniMedi();
        cargarTipoEmp();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const productos =  useSelector(state => state.productos.productos);
   const error =  useSelector( state => state.productos.error);
   const cargando =  useSelector(state => state.productos.loading);

     return ( 
        <Fragment>
            <h2>Listado de Artículos Inventario</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}
            <div className="table-horiz-scroll">
                <Producto
                    producto={productos}
                />
            </div>
        </Fragment>
        
     );
}
 
export default Productos;