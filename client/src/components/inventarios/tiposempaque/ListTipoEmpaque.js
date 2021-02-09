import React from 'react';
import { useHistory } from 'react-router-dom';
import TiposEmpaques from './TipoEmpaques';
import {  useSelector } from 'react-redux';


//Styled components
import styled from '@emotion/styled';

//Estilos personalizados---------------
const Formulario = styled.div`
    background-color: var(--gris2);
    height: 100vh;
    min-height: 800px;
    display: flex;
    align-items: start;
    justify-content: center;
`;

const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: 800px;
    width: 100%;
    background-color: var(--blanco);
    border-radius: 1rem;
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

const ListTipoEmpaque = () => {

    const permisopantalla =  useSelector(state => state.usuarios.permisoejecutable);

    const history = useHistory();// habilitar history para redirecion

    //funcion que redirige de forma programada
    const redireccionarMenu =  () => {
        history.push('/inv/minventario');
    }

    if(permisopantalla !== 'S'){
        console.log(permisopantalla);
        return (
            <Formulario>
                <Contenedor>
                    <h1>No posee permisos para este componente</h1>
                    
                    <Boton 
                        onClick={redireccionarMenu}>
                            Regresar al Menú
                    </Boton>
                
                </Contenedor>
            </Formulario>
        );
        //history.push('/inv/minventario');
        
    }else{
        console.log(permisopantalla);
        
    }


  // Extrar proyectos de state inicial
  return ( 
    <Formulario>
      <Contenedor>
      <div className="table-responsive">
          <TiposEmpaques />
          
          <Boton 
            onClick={redireccionarMenu}>
                Regresar al Menú
          </Boton>
      </div>
      </Contenedor>
    </Formulario>
      
   );
}
 
export default ListTipoEmpaque;