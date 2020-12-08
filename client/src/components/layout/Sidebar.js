import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';


const StyledLink = styled(Link)`
    color: darkslategrey;
    font-size: 1.3rem;
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
            <div className="panel panel-default">
                <div className="panel-heading"><h1>Mantenimientos</h1></div>
                <ul className="list-group">
                        <li ><StyledLink to={"/inv/listbodven"}>* Bodegueros y Vendedores</StyledLink></li>
                        <li ><StyledLink to={"/inv/listtipoempaque"}>* Tipos de Empaques</StyledLink></li>
                        <li ><StyledLink to={"/inv/listunidadmedida"}>* Unidades Medida</StyledLink></li>
                    </ul>
                
                
            </div>
            <hr className="my-4"/>
            
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>Procesos</h1>
                </div>
                <div className="panel-body">
                    <ul  className="list-group">
                        <li><StyledLink to={"/inv/listarticulos"}>* Artículos Inventarios</StyledLink></li>
                    </ul>
                </div>
            </div>
           
            
            
               
            
            
            
        </aside>
     );
}
 
export default Sidebar;