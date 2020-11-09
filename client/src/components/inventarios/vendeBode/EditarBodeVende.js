import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useHistory } from 'react-router-dom';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarBodeVendeAction } from '../../../actions/bodevendeActions'

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Campo, Select } from '../../ui/Formulario';

//import { Boton } from '../ui/Boton';
import {FormUsuario} from '../../ui/FormUsuario';


const Boton = styled.button`
    display: block;
    font-weight: auto;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: auto auto; 
    text-align: center;
    background-color: ${props => props.bgColor ? '#DA552F' : '#2f3848'};
    color: ${props => props.bgColor ? 'blanco' : '#FFF'};

    &:last-of-type {
        margin-right:40;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--gris3);
        color: blue;
    }
`;

const BotonUserCerrar = styled(Link)`
    margin-top: 2rem;
    display: block;
    opacity: .50;
    font-size: 150%;
`;



const EditarBodeVende = () => {

    //Carga usuarios
    const usuarios =  useSelector(state => state.usuarios.usuario.data.users);
    //Carga el usuario logueado
    const usuariologueo = useSelector(state => state.usuarios.usuariologue);
    
    const history =  useHistory();

    const dispatch = useDispatch();

    //Nuevo state
    const [ bodevende, guardarBodeVende] = useState({
        BOD_VEN_CODIGO: '',
        BOD_VEN_USUARIO: '',
        BOD_VEN_TIPO: '',
        BOD_VEN_MODIFICADO: usuariologueo,
        BOD_VEN_FECHAMODO: new Date()
    });

    //Producto a editar
    const bodevendeditar =  useSelector(state => state.bodevend.bodevedeeditar);
    const error =  useSelector(state => state.bodevend.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarBodeVende({
            ...bodevende,
            [e.target.name]: e.target.value
        })
    }

     //Llenar el state automaticamente
     useEffect(() => {
        guardarBodeVende(bodevendeditar);

    }, [bodevendeditar]);

    if(!bodevende || !usuarios) return history.push('/inv/listbodven');

    const {BOD_VEN_CODIGO, BOD_VEN_USUARIO, BOD_VEN_TIPO} =  bodevende;

    const submitEditarBodeVende = e => {
        e.preventDefault();

         //Validar formulario
         if(BOD_VEN_USUARIO <= 0){

            const alerta = {
                msg: 'El campo Descripción del Artículo es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(BOD_VEN_TIPO.trim() === ''){

            const alerta = {
                msg: 'Debe selecionar la Unidad de Medida',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        dispatch( editarBodeVendeAction(bodevende));

        //Redirecciona al listado
        history.push('/inv/listbodven');

    }


    return ( 
        <FormUsuario
            onSubmit={submitEditarBodeVende}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Edición Código: {BOD_VEN_CODIGO}</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}

                <Formulario>
                <Campo>
                        <label htmlFor="usuarios">Usuario Relacionado</label>
                        <Select 
                            id="BOD_VEN_USUARIO"
                            name="BOD_VEN_USUARIO"
                            value={BOD_VEN_USUARIO}
                            onChange={onChangeFormulario}
                        >
                            <option defaultValue>Selecione...</option>
                            {usuarios.length === 0 ? 'No hay productos' :(
                                usuarios.map(usuario =>(
                                    <option 
                                        key={usuario.USU_CODIGO}
                                        value={usuario.USU_CODIGO}
                                    >
                                        {usuario.USU_LOGIN}
                                    </option>
                                ))
                             )}
                        </Select>
                    </Campo>

                    <Campo>
                        <label htmlFor="tipo">Tipo</label>
                        <Select 
                            id="BOD_VEN_TIPO"
                            name="BOD_VEN_TIPO"
                            value={BOD_VEN_TIPO}
                            onChange={onChangeFormulario}
                        >
                            <option defaultValue>Selecione...</option>
                            <option value="BO">Bodeguero</option>
                            <option value="VE">Vendedor</option>
                        </Select>
                    </Campo>

                    <Boton>
                        Editar Bodeguero/Vendedor
                    </Boton>
                </Formulario>

                <BotonUserCerrar to={'/inv/listbodven'}>
                    Regresar Listado
                </BotonUserCerrar>

                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </div>
            
        </FormUsuario>
        
     );
}
 
export default EditarBodeVende;