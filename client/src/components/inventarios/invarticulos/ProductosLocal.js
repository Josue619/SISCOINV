import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ProductoLocal from './ProductoLocal';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosLocalAction } from '../../../actions/productolocalActions';

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados---------------
const Formulario = styled.div`
    background-color: var(--gris2);
    height: 100vh;
    min-height: 100px;
    display: flex;
    align-items: start;
    justify-content: center;
`;

const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: 1200px;
    width: 100%;
    background-color: var(--blanco);
    border-radius: 2rem;
`;

export const Boton = styled.button`
    //display: block;
    font-weight: 700;
    //text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto; 
    text-align: center;
    background-color: gray;// ${props => props.bgColor ? '#DA552F' : '#2f3848'};
    color: ${props => props.bgColor ? 'blanco' : '#FFF'};

    &:last-of-type {
        margin-right:0;
    }

    &:hover {
        cursor: pointer;
        background-color: green;
    }
`;

const ProductosLocal = () => {
    
    const history =  useHistory();
    
    const productoeditar =  useSelector(state => state.productos.productoeditar);

    const dispatch = useDispatch();
   
    useEffect( ()=> {
        //consultar la api
        const cargarProductosLoca = () => dispatch(obtenerProductosLocalAction(productoeditar));
        
        cargarProductosLoca();
       // eslint-disable-next-line
    },[]);

   //Obtener el state
   const productosloca =  useSelector(state => state.productoslocal.productosloca);
   const error =  useSelector( state => state.productoslocal.error);
   const cargando =  useSelector(state => state.productoslocal.loading);

   if(!productoeditar) return history.push('/inv/listarticulos');

   const redireccionarListado =  () => {
       history.push('/inv/listarticulos');
    }

     return ( 
        <Formulario>
            <Contenedor>
                <h2>Listado Ubicaciones de un Artículo</h2>
                
                {error ? <p className="font-weight-blod alert alert-danger text-center mt-4">Hubo un error: {error}</p> : null}
                {cargando ? <p className="text-center">Cargando....</p> : null}
                <ProductoLocal 
                    producto={productosloca}
                />
                
                <Boton onClick={redireccionarListado}>Regresar al Listado de Artículos</Boton>
            </Contenedor>
        </Formulario>
        
     );
}
 
export default ProductosLocal;