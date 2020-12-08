import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevaTipoEmpaqueAction } from '../../../actions/tipoempaqueActions';
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';

import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Campo } from '../../ui/Formulario';
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

const NuevoTipoEmpaque = ({history}) => {

    //State del componente
    const [TIPO_EMP_ID, guardarId]= useState('');
    const [TIPO_EMP_SIGLAS, guardarCodigoUnidad]= useState('');
    const [TIPO_EMP_DESCRIPCION, guardarDescripcion]= useState('');

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( state => state.tipoempa.loading);
    const error = useSelector(state => state.tipoempa.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Manda a llamar el action del producto.
    const aregagrTipoEmpaque = tipoempaque => dispatch( crearNuevaTipoEmpaqueAction(tipoempaque) );
    

    //Cuando el usuario haga submit
    const submitNuevoUnidad = e => {
        e.preventDefault();

        guardarId(0);
        
        //Validar formulario
        if(TIPO_EMP_SIGLAS.trim() === ''){

            const alerta = {
                msg: 'El campo Código Unidad es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(TIPO_EMP_DESCRIPCION.trim() === ''){

            const alerta = {
                msg: 'El campo Descripción del Unidad Medida es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }
       
        
        //si no hay errores
        dispatch(ocultarAlertaAction());

        //crear el nuevo producto
        aregagrTipoEmpaque({
            TIPO_EMP_ID,
            TIPO_EMP_SIGLAS,
            TIPO_EMP_DESCRIPCION
        });
        
        //redireccionar
        history.push('/inv/listtipoempaque');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listtipoempaque');
    }
    
    return ( 
        <FormUsuario
            onSubmit={submitNuevoUnidad}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Nuevo Tipo Empaque</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="codiUnidMedi">Siglas</label>
                        <input 
                            type="text"
                            name="TIPO_EMP_SIGLAS" 
                            placeholder="Siglas tipo empaque"
                            value={TIPO_EMP_SIGLAS} 
                            onChange={e => guardarCodigoUnidad(e.target.value)}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="descripcion">Descripción</label>
                        <input 
                            type="text"
                            name="TIPO_EMP_DESCRIPCION" 
                            placeholder="Descripción tipo empaque"
                            value={TIPO_EMP_DESCRIPCION}
                            onChange={e => guardarDescripcion(e.target.value)}
                        />
                    </Campo>

                    <Boton>
                        Agregar Unidad Medida
                    </Boton>
                </Formulario>
                <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>

                { cargando ? <p>Cargando...</p> :null }
                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </div>
    
        </FormUsuario>
     );
}
 
export default NuevoTipoEmpaque;