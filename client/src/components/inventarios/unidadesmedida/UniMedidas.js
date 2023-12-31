import React, { Fragment, useEffect } from 'react';
import UniMedida from './UniMedida';

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

            <div className="form-group row  mx-auto ">
            <UniMedida
                unidad= {unidades}
            />
            </div>

            
        </Fragment>
        
     );
}
 
export default UniMedidas;