import React, { Fragment, useEffect, useState } from 'react';
import BodeVende from './BodeVeden';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { obtenerBodeVendAction, consultarBodeVendeAction } from '../../../actions/bodevendeActions';
import { obtenerUsuariosAction, obtenerUsuariosLogueoAction } from '../../../actions/usuarioActions';


const BodeVendes = () => {
    
    const dispatch = useDispatch();

    //Nuevo state de producto
    const [ bodevendeconsultar, guardarBodeVende] = useState('');

    useEffect( ()=> {
        //consultar la api
        const cargarBodeVende = () => dispatch(obtenerBodeVendAction());
        const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
        const cargarUsuarioLogueo = () => dispatch(obtenerUsuariosLogueoAction());
        
        cargarBodeVende();
        cargarUsuarios();
        cargarUsuarioLogueo();
       // eslint-disable-next-line
    },[]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        
        guardarBodeVende({
            ...bodevendeconsultar,
            [e.target.name]: e.target.value
        });
    }

   //Obtener el state
   const bodevende = useSelector(state => state.bodevend.bodevende);
   const error =  useSelector( state => state.bodevend.error);
   const cargando =  useSelector(state => state.bodevend.loading);

   //Consulta por articulo
   const consultarProducto = () => {
       if(bodevende.length !== 0 ){
           dispatch(consultarBodeVendeAction(bodevendeconsultar));
        }else{
            dispatch(obtenerBodeVendAction());
        }
   }
   //table table-hover

    return ( 
        <Fragment>
            <h2>Listado de Bodegueros y Vendedores</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}
            <div className="form-group row  mx-auto ">
                <div className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2" 
                        type="search" 
                        name="search" 
                        id="search" 
                        placeholder="Buscar Código, Tipo o Usuario"
                        aria-label="Search"
                        onChange={onChangeFormulario} 
                    />
                    <button 
                        type="submit" 
                        className="btn btn-outline-success my-2 my-sm-0" 
                        onClick={consultarProducto}
                    >
                        Buscar
                    </button>
                    </div>
            </div>
            

            <table className="table table-hover" width="5%">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre Usuario</th>
                        <th scope="col">Tipo</th>
                        <th colSpan="2">
                            <Link to={"/inv/mbodevende/nuevobodevende"} className="btn btn-success ">
                                Nuevo Bodeguero o Vendedor &#43;
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {//unidades.length === 0 ? 'No hay productos' :(
                        bodevende.map(bodven =>(
                            <BodeVende
                             key={bodven.BOD_VEN_CODIGO}
                             bodven= {bodven}
                            />
                         //)
                         )
                     )
                    }
                </tbody>
                
            </table>
        </Fragment>
        
     );
}
 
export default BodeVendes;