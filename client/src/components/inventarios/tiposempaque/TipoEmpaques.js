import React, { Fragment, useEffect } from 'react';
import TipoEmpaque from './TipoEmpaque';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerTipoEmpaqueAction } from '../../../actions/tipoempaqueActions';


const TipoEmpaques = () => {
    
    const dispatch = useDispatch();

    useEffect( ()=> {
        //consultar la api
        const cargarDatos = () => dispatch(obtenerTipoEmpaqueAction());
        
        cargarDatos();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const tiposempaques = useSelector(state => state.tipoempa.tipoempaque);
   const error =  useSelector( state => state.unimedi.error);
   const cargando =  useSelector(state => state.unimedi.loading);
   
   return (
        <Fragment>
            <h2>Listado de Tipos Empaques</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}

            <div className="form-group row  mx-auto ">
                <TipoEmpaque 
                    empaque = { tiposempaques }
                />
           
            </div>

            
        </Fragment>
        
     );
}
 
export default TipoEmpaques;