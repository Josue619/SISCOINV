import React, { Fragment, useEffect } from 'react';
import BodeVende from './BodeVeden';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';

import { obtenerBodeVendAction } from '../../../actions/bodevendeActions';


const BodeVendes = () => {
    
    const dispatch = useDispatch();

    useEffect( ()=> {
        //consultar la api
        const cargarBodeVende = () => dispatch(obtenerBodeVendAction());
        
        cargarBodeVende();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const bodevende = useSelector(state => state.bodevend.bodevende);
   const error =  useSelector( state => state.bodevend.error);
   const cargando =  useSelector(state => state.bodevend.loading);

    return ( 
        <Fragment>
            <h2>Listado de Bodegueros y Vendedores</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Código Vendedor</th>
                        <th scope="col">Nombre Usuario</th>
                        <th scope="col">Tipo</th>
                        <th colSpan="2">
                            <Link to={"/inv/munidadmedi/nuevobodevende"} className="btn btn-success ">
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