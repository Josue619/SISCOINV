import React, { Fragment, useEffect } from 'react';
import BodeVende from './BodeVeden';

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { obtenerBodeVendAction } from '../../../actions/bodevendeActions';
import { obtenerUsuariosAction, obtenerUsuariosLogueoAction } from '../../../actions/usuarioActions';


const BodeVendes = () => {
    
    const dispatch = useDispatch();

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

   //Obtener el state
   const bodevende = useSelector(state => state.bodevend.bodevende);
   const error =  useSelector( state => state.bodevend.error);
   const cargando =  useSelector(state => state.bodevend.loading);
   

    return ( 
        <Fragment>
            <h2>Listado de Bodegueros y Vendedores</h2>
            
            {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
            {cargando ? <p className="text-center">Cargando....</p> : null}
            <div  className="table-horiz-scroll">
                <BodeVende
                    bodven= {bodevende}
                />

            </div>
            
            
        </Fragment>
        
     );
}
 
export default BodeVendes;