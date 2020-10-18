import React, { Fragment, useEffect } from 'react';
import Producto from './Producto';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../../../actions/productoActions';
import { obtenerUniMedisAction } from '../../../actions/unimediActions';


const Productos = () => {
    
    const dispatch = useDispatch();

    useEffect( ()=> {
        //consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        const cargarUniMedi = () => dispatch(obtenerUniMedisAction());
        
        
        cargarProductos();
        cargarUniMedi();
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

            <table className="table  table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Unidad Medida</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th colSpan="2">
                            <Link to={"/productos/nuevo"} className="btn btn-success ">
                                Agregar Artículo &#43;
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? 'No hay productos' :(
                        productos.map(producto =>(
                            <Producto 
                                key={producto.ATO_CODIGO}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
        
     );
}
 
export default Productos;