import React, { Fragment, useEffect } from 'react';

import Localizacion from './Localizacion';


//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerLocalizacionesActions } from '../../../actions/localizacionActions';


const Localizaciones = () => {
    
    const dispatch = useDispatch();

    useEffect( ()=> {
        //consultar la api
        const cargarLocalizaciones = () => dispatch(obtenerLocalizacionesActions());
        
        cargarLocalizaciones();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const localizaciones = useSelector(state => state.localiza.localizacion);
   const error =  useSelector( state => state.localiza.error);
   const cargando =  useSelector(state => state.localiza.loading);
   
    return ( 
        <Fragment>
            <h2>Listado Ubicaciones Inventario</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}

            <div className="table-horiz-scroll">
                <Localizacion 
                    localizaciones= {localizaciones}
                />
            
            </div>

            
        </Fragment>
        
     );
}
 
export default Localizaciones;