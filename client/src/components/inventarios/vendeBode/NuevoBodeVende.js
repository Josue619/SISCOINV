import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevoBodeVedenActions } from '../../../actions/bodevendeActions';
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';


import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Campo, Select } from '../../ui/Formulario';
import {FormUsuario} from '../../ui/FormUsuario';


//Elementos con estilos
const Boton = styled.button`
    display: block;
    font-weight: 700;
    //text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: .1rem auto; 
    text-align: center;
    background-color: ${props => props.bgColor ? '#DA552F' : '#2f3848'};
    color: ${props => props.bgColor ? 'blanco' : '#FFF'};

    &:last-of-type {
        margin-right:10;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--gris3);
        color: blue;
    }
`;

const NuevoBodeVende = ({history}) => {

    //Carga usuarios
    const usuarios =  useSelector(state => state.usuarios.usuario);
    //Carga el usuario logueado
    const usuariologueo = useSelector(state => state.usuarios.usuariologue);

    //console.log(usuariologueo);
    
     //State del componente
    const [BOD_VEN_CODIGO, guardarCodiBodeVend]= useState('');
    const [BOD_VEN_USUARIO, guardarUsuario]= useState('');
    const [BOD_VEN_TIPO, guardarTipo]= useState('');
    const [BOD_VEN_CREADO]= useState(usuariologueo.USU_LOGIN);
    const [BOD_VEN_FECHA]=useState(new Date());
   

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();
    
    const cargando = useSelector( state => state.bodevend.loading);
    const error =  useSelector(state => state.bodevend.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Manda a llamar el action del producto.
    const aregagrBodeVende = bodevende => dispatch( crearNuevoBodeVedenActions(bodevende) );
    

    //Agregar nuevo bodeguero o vendedor
    const submitNuevoBodeVende = e => {
        e.preventDefault(); 

        if(BOD_VEN_CODIGO.trim() ===''){
            const alerta = {
                msg: 'El campo Código Bodeguero o Vendedor es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(BOD_VEN_USUARIO <= 0){
            const alerta = {
                msg: 'Debe seleccionar un usuario para relacionarlo',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(BOD_VEN_TIPO.trim() === ''){
            const alerta = {
                msg: 'Debe seleccionar el tipo si es Bodeguero o Vendedor',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        //Crear el nuevo bodeguero vendedor
        aregagrBodeVende({BOD_VEN_CODIGO,
                         BOD_VEN_USUARIO,
                         BOD_VEN_TIPO,
                         BOD_VEN_CREADO,
                         BOD_VEN_FECHA
        });

        //redireccionar
        history.push('/inv/listbodven');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listbodven');
    }


    return ( 
        <FormUsuario
            onSubmit={submitNuevoBodeVende}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Nuevo Bodeguero / Vendedor</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="codi">Código</label>
                        <input 
                            type="text"
                            name="BOD_VEN_CODIGO" 
                            placeholder="Código del bodeguero o vendedor"
                            value={BOD_VEN_CODIGO} 
                            onChange={e => guardarCodiBodeVend(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="usuarios">Usuario Relacionado</label>
                        <Select 
                            id="BOD_VEN_USUARIO"
                            name="BOD_VEN_USUARIO"
                            value={BOD_VEN_USUARIO}
                            onChange={e => guardarUsuario(e.target.value)}
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
                            onChange={e => guardarTipo(e.target.value)}
                        >
                            <option defaultValue>Selecione...</option>
                            <option value="BO">Bodeguero</option>
                            <option value="VE">Vendedor</option>
                        </Select>
                    </Campo>

                    <Boton>
                        Agregar Bodeguero/Vendedor
                    </Boton>

                </Formulario>

                <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>

                { cargando ? <p>Cargando...</p> :null }
                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}

            </div>
        </FormUsuario>


       
     );
}
 
export default NuevoBodeVende;