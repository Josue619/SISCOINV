import React, { Fragment, useEffect, useState } from 'react';
import Producto from './Producto';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction, consultarProductoAction } from '../../../actions/productoActions';
import { obtenerUniMedisAction } from '../../../actions/unimediActions';


const Productos = () => {
    
    const dispatch = useDispatch();

    //Nuevo state de producto
    const [ productoconsultar, guardarProducto] = useState('');

    useEffect( ()=> {
        //consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        const cargarUniMedi = () => dispatch(obtenerUniMedisAction());
        
        
        cargarProductos();
        cargarUniMedi();
       // eslint-disable-next-line
    },[]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        
        guardarProducto({
            ...productoconsultar,
            [e.target.name]: e.target.value
        });
    }

    

   //Obtener el state
   const productos =  useSelector(state => state.productos.productos);
   const error =  useSelector( state => state.productos.error);
   const cargando =  useSelector(state => state.productos.loading);

   //Consulta por articulo
   const consultarProducto = () => {
    
       if(productos.length !== 0 ){
            dispatch(consultarProductoAction(productoconsultar));
       }else{
           dispatch(obtenerProductosAction());
       }
    }
   
 
    return ( 
        <Fragment>
            <h2>Listado de Artículos Inventario</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}
            <div className="form-group row  mx-auto ">
                <div className="form-inline my-2 my-lg-0">

                <input 
                    className="form-control mr-sm-2" 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Buscar artículos por Código o Descripción"
                    aria-label="Search"
                    onChange={onChangeFormulario} 
                    />
                    <button 
                        type="submit" 
                        className="btn btn-outline-success my-2 my-sm-0" 
                        onClick={consultarProducto}
                    >
                            Buscar Artículos
                    </button>
                    </div>
                </div>
            
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Unidad Medida</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th colSpan="2">
                            <Link to={"/inv/productos/nuevo"} className="btn btn-success ">
                                Agregar Artículo &#43;
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {//productos.length === 0 ? 'No hay productos':(
                        productos.map(producto =>(
                            <Producto key={producto.ATO_CODIGO} producto={producto}/>
                        )
                        //)
                        )
                    }
                </tbody>
            </table>
        </Fragment>
        
     );
}
 
export default Productos;