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
            <h1>Mantenimientos</h1>

            <div className="form-group col-12">
                <ul>
                    <li><StyledLink to={"/inv/listunidadmedida"}>Unidades Medida</StyledLink></li>
                    <hr className="my-4" />
                    <li><StyledLink to={"/inv/listbodven"}>Bodegueros y Vendedores</StyledLink></li>
                    
                </ul>
            </div>
            <hr className="my-4" />
            
            
            <h1>Procesos</h1>
            <div className="form-group col-12">
                <ul>
                    <li><StyledLink to={"/inv/listarticulos"}>Artículos Inventarios</StyledLink></li>
                </ul>
            </div>
            
            
        </aside>
     );
}
 
export default Sidebar;