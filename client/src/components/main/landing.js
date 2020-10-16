import React, { Component } from 'react';

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados---------------
const Formulario = styled.div`
    background-color: var(--gris2);
    height: 100vh;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: auto;
    width: auto;
    background-color: var(--blanco);
    border-radius: 1rem;
`;

class Landing extends Component {
    render () {
        return (
            <Formulario>
                <Contenedor>
                    <h1 className="text-center">Bienvenido Sistema Control Inventarios</h1>                    
                </Contenedor>
            </Formulario>
        )
    }
}

export default Landing;