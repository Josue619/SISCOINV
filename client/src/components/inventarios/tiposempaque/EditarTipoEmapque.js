import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarTipoEmpaqueAction} from '../../../actions/tipoempaqueActions';

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Campo } from '../../ui/Formulario';

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

const EditarTipoEmpaque = () => {

    const history =  useHistory();

    const dispatch = useDispatch();

    
    //Nuevo state de producto
    const [ tipoempaque, guardarProducto] = useState({
        TIPO_EMP_ID:'',
        TIPO_EMP_SIGLAS:'',
        TIPO_EMP_DESCRIPCION:''
    });

    
    //Producto a editar
    const tipoempaqueeditar =  useSelector(state => state.tipoempa.tipoempeditar);
    const error =  useSelector(state => state.unimedi.error);
    const alerta = useSelector(state => state.alerta.alerta);


    //Llenar el state automaticamente
    useEffect(() => {
        guardarProducto(tipoempaqueeditar);

    }, [tipoempaqueeditar]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        
        guardarProducto({
            ...tipoempaque,
            [e.target.name]: e.target.value
        });

    }

    if(!tipoempaque) return history.push('/inv/listtipoempaque');

    const { TIPO_EMP_ID, TIPO_EMP_SIGLAS, TIPO_EMP_DESCRIPCION } =  tipoempaque;   
    
    const submitEditarProducto = e => {
        e.preventDefault();

         //Validar formulario
        if(TIPO_EMP_DESCRIPCION.trim() === ''){

            const alerta = {
                msg: 'El campo Descripción del Artículo es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(TIPO_EMP_SIGLAS.trim() === ''){

            const alerta = {
                msg: 'El campo codigo abreviado no puede ser vacio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        
        
        dispatch( editarTipoEmpaqueAction(tipoempaque));
        
        history.push('/inv/listtipoempaque');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listtipoempaque');
    }

    return ( 
            <FormUsuario
                onSubmit={submitEditarProducto}
            >
                <div className="contenedor-form sombra-dark">
                    <h1>Edición Tipo Empaque: {TIPO_EMP_ID}</h1>
                    {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}

                    <Formulario>
                        <Campo>
                            <label htmlFor="descripcion">Descripción</label>
                            <input 
                              type="text"
                              name="TIPO_EMP_DESCRIPCION" 
                              placeholder="Descripción tipo empaque"
                              value={TIPO_EMP_DESCRIPCION}
                              onChange={onChangeFormulario}
                            />
                        </Campo>

                        <Campo>
                            <label htmlFor="modelo">Siglas</label>
                            <input 
                                type="text"
                                name="TIPO_EMP_SIGLAS" 
                                placeholder="Siglas"
                                value={TIPO_EMP_SIGLAS}
                                onChange={onChangeFormulario}
                            />
                        </Campo>
                
                <Boton>
                    Guardar Cambios
                </Boton>
            </Formulario>
            <div>
            <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>
            </div>
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
        </div>

    </FormUsuario>
     );
}
 
export default EditarTipoEmpaque;