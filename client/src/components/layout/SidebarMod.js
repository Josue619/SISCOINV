import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';


const StyledLink = styled(Link)`
    color: darkgray;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 3rem;
    font-family: 'PT Sans', sans-serif;
    text-decoration: none;
    padding: 1rem;
    margin-right: 1rem;
    &:last-of-type {
        margin-right: 0;
    }
    &.pagina-actual {
        border-bottom: 5px solid #FFF;
    }
    .text-link {
    color: inherit;
    text-decoration: inherit;
    }
`;

const Sidebar = () => {
    return ( 
        <aside>
            <h1>Modulos</h1>
            <ul>
                <li><StyledLink to={"/inv/minventario"}>Módulo Inventario</StyledLink></li>
                <li><StyledLink to={"/users"}>Módulo Usuarios</StyledLink></li>
            </ul>
        </aside>
     );
}
 
export default Sidebar;