import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevaUniMediAction } from '../../../actions/unimediActions';
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

const NuevoUnidadMedida = ({history}) => {

    //State del componente
    const [UNI_MED_ID, guardarId]= useState('');
    const [UNI_MED_CODIUNIDAD, guardarCodigoUnidad]= useState('');
    const [UNI_MED_DESCRIPCION, guardarDescripcion]= useState('');

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( state => state.unimedi.loading);
    const error = useSelector(state => state.unimedi.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Manda a llamar el action del producto.
    const aregagrUnidadMedida = unidadmedida => dispatch( crearNuevaUniMediAction(unidadmedida) );
    

    //Cuando el usuario haga submit
    const submitNuevoUnidad = e => {
        e.preventDefault();

        guardarId(0);
        
        //Validar formulario
        if(UNI_MED_CODIUNIDAD.trim() === ''){

            const alerta = {
                msg: 'El campo Código Unidad es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(UNI_MED_DESCRIPCION.trim() === ''){

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
        aregagrUnidadMedida({
            UNI_MED_ID,
            UNI_MED_CODIUNIDAD,
            UNI_MED_DESCRIPCION
        });
        
        //redireccionar
        history.push('/inv/listunidadmedida');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listunidadmedida');
    }
    
    return ( 
        <FormUsuario
            onSubmit={submitNuevoUnidad}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Nuevo Unidad Medida</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="codiUnidMedi">Siglas Unidad Medida</label>
                        <input 
                            type="text"
                            name="UNI_MED_CODIUNIDAD" 
                            placeholder="Siglas Unidad Medida"
                            value={UNI_MED_CODIUNIDAD} 
                            onChange={e => guardarCodigoUnidad(e.target.value)}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="descripcion">Descripción Unidad Medida</label>
                        <input 
                            type="text"
                            name="UNI_MED_DESCRIPCION" 
                            placeholder="Descripción Unidad Medida"
                            value={UNI_MED_DESCRIPCION}
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
 
export default NuevoUnidadMedida;