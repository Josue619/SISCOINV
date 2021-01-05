import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import { useSelector ,useDispatch } from 'react-redux';

import { obtenerUsuariosLogueoAction, permisoEjecutableActions } from '../../actions/usuarioActions';

import { useHistory } from 'react-router-dom';

//import Swal from 'sweetalert2';


const StyledLink = styled.button`
    color: darkslategrey;
    border: none;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 0.5rem;
    font-family: 'PT Sans', sans-serif;
    //text-decoration: none;
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
    const history = useHistory();// habilitar history para redirecion

    const dispatch = useDispatch();
    

    useEffect( ()=> {
        //consultar la api
        const cargarUsuarioLogueo = () => dispatch(obtenerUsuariosLogueoAction());
        
        cargarUsuarioLogueo();
      // eslint-disable-next-line
    },[]);

    const usuariologueo = useSelector(state => state.usuarios.usuariologue);

    const validaPermisoBodeVende = (pantalla, direccion) => {
        console.log(direccion);
        
        
        //console.log(usuariologueo.USU_CODIGO);
        const datos ={
            ejecutable: pantalla,
            usuario: usuariologueo.USU_CODIGO,
            direccion: direccion
        };
        dispatch(permisoEjecutableActions(datos));

        history.push(direccion);
    }
    
    return ( 
            <aside>
            <div className="panel panel-default">
                <div className="panel-heading"><h1>Mantenimientos</h1></div>
                <ul className="list-group">
                    <StyledLink className="btn btn-outline-dark col-md-12" onClick={e => validaPermisoBodeVende(9,'/inv/listbodven') }>Bodegueros y Vendedores</StyledLink>
                    <StyledLink className="btn btn-outline-dark col-md-12" onClick={e => validaPermisoBodeVende(12,'/inv/listtipoempaque') }>Tipos de Empaques</StyledLink>
                    <StyledLink className="btn btn-outline-dark col-md-12" onClick={e => validaPermisoBodeVende(6,"/inv/listunidadmedida") }>Unidades Medida</StyledLink>
                    <StyledLink className="btn btn-outline-dark col-md-12" onClick={e => validaPermisoBodeVende(15,"/inv/listlocalizacion") }>Ubicaciones</StyledLink>
                </ul>
            </div>
            <hr className="my-4"/>
            
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>Procesos</h1>
                </div>
                <div className="panel-body">
                    <ul  className="list-group">
                        <li>
                            <StyledLink className="btn btn-outline-dark col-md-12" onClick={e => validaPermisoBodeVende(15,"/inv/listarticulos") }> Artículos Inventarios</StyledLink>
                        </li>
                    </ul>
                </div>
            </div>
           

        </aside>
     );
}
 
export default Sidebar;