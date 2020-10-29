import React, { Fragment, useEffect } from 'react';
import UniMedida from './UniMedida';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';

import { obtenerUniMedisAction } from '../../../actions/unimediActions';


const UniMedidas = () => {
    
    const dispatch = useDispatch();

    useEffect( ()=> {
        //consultar la api
        const cargarUniMedi = () => dispatch(obtenerUniMedisAction());
        
        cargarUniMedi();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const unidades = useSelector(state => state.unimedi.unimedida);
   const error =  useSelector( state => state.unimedi.error);
   const cargando =  useSelector(state => state.unimedi.loading);

    return ( 
        <Fragment>
            <h2>Listado de Unidades Inventario</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Código Abreviado</th>
                        <th scope="col">Descripción</th>
                        <th colSpan="2">
                            <Link to={"/inv/munidadmedi/nuevo"} className="btn btn-success ">
                                Nueva Unidad Medida &#43;
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {//unidades.length === 0 ? 'No hay productos' :(
                            unidades.map(unidad =>(
                               <UniMedida
                                key={unidad.UNI_MED_ID}
                                unidad= {unidad}
                               />
                            //)
                            )
                        )}
                </tbody>
            </table>
        </Fragment>
        
     );
}
 
export default UniMedidas;