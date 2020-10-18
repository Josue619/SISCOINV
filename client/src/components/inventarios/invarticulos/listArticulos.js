import React from 'react';
import Productos from './Productos';



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
    max-width: 1200px;
    width: 100%;
    background-color: var(--blanco);
    border-radius: 1rem;
`;

const ListaArticulos = () => {

  // Extrar proyectos de state inicial
  return ( 
    <Formulario>
      <Contenedor>
      <div className="table-responsive">
        <Productos />
      </div>
        
      </Contenedor>
    </Formulario>
      
   );
}
 
export default ListaArticulos;
