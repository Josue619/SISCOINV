import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarLocalizacionAction } from '../../../actions/localizacionActions'

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

const EditarLocalizacion = () => {
    const history =  useHistory();

    const dispatch = useDispatch();

    //Nuevo state
    const [ localiza, guardarBodeVende] = useState({
        LCN_LOCALIZACION: '',
        LCN_DESCRIPCION: '',
        LCN_NUM_ORDEN: '',
        LCN_DESCONTINUADA: 'N',
        LCN_TELEFONO: ''
    });

    //Producto a editar
    const localizaeditar =  useSelector(state => state.localiza.localizacioneditar);
    const error =  useSelector(state => state.localiza.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarBodeVende({
            ...localiza,
            [e.target.name]: e.target.value
        })
    }

     //Llenar el state automaticamente
     useEffect(() => {
        guardarBodeVende(localizaeditar);

    }, [localizaeditar]);

    if(!localiza) return history.push('/inv/listlocalizacion');

    const {LCN_LOCALIZACION, LCN_DESCRIPCION, LCN_NUM_ORDEN, LCN_DESCONTINUADA, LCN_TELEFONO} =  localiza;    

    const submitEditarLocalizacion = e => {
        e.preventDefault();
        
        //Validar formulario
        if(LCN_DESCRIPCION.trim()=== ''){
            
            const alerta = {
                msg: 'El campo Descripción es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        dispatch( editarLocalizacionAction(localiza));

        //Redirecciona al listado
        history.push('/inv/listlocalizacion');

    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listlocalizacion');
    }

    return (
        <FormUsuario
            onSubmit={submitEditarLocalizacion}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Edición Código: {LCN_LOCALIZACION}</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}

                <Formulario>
                <Campo>
                        <label htmlFor="descripcion">Descripción</label>
                        <input 
                            type="text"
                            name="LCN_DESCRIPCION" 
                            placeholder="Descripción"
                            value={LCN_DESCRIPCION} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="orden">Orden</label>
                        <input 
                            type="number"
                            name="LCN_NUM_ORDEN" 
                            placeholder="Orden"
                            value={LCN_NUM_ORDEN} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="descontinuada">Descontinuada</label>
                        <Select 
                            id="LCN_DESCONTINUADA"
                            name="LCN_DESCONTINUADA"
                            value={LCN_DESCONTINUADA}
                            onChange={onChangeFormulario}
                        >
                            <option defaultValue>Selecione...</option>
                            <option value="S">Si</option>
                            <option value="N">No</option>
                        </Select>
                    </Campo>
                    <Campo>
                        <label htmlFor="codi">Télefono</label>
                        <input 
                            type="number"
                            name="LCN_TELEFONO" 
                            placeholder="LCN_TELEFONO"
                            value={LCN_TELEFONO} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>

                    <Boton>
                        Editar Ubicación
                    </Boton>
                </Formulario>

                <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>

                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </div>
            
        </FormUsuario>
    );
};

export default EditarLocalizacion;