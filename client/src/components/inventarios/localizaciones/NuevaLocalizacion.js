import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevaLocalizacionAction } from '../../../actions/localizacionActions';
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


const NuevaLocalizacion = ({history}) => {


    //State del componente
    const [LCN_LOCALIZACION, guardarCodiLoca]= useState('');
    const [LCN_DESCRIPCION, guardarDescripcion]= useState('');
    const [LCN_NUM_ORDEN, guardarNumOrden]= useState('');
    const [LCN_DESCONTINUADA]= useState('N');
    const [LCN_TELEFONO, guardaTelefono]=useState('');

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();
    
    const cargando = useSelector( state => state.localiza.loading);
    const error =  useSelector(state => state.localiza.error);
    const alerta = useSelector(state => state.localiza.alerta);

    //Manda a llamar el action del producto.
    const aregagrBodeVende = localizacion => dispatch( crearNuevaLocalizacionAction(localizacion) );
    

    //Agregar nuevo bodeguero o vendedor
    const submitNuevaUbicacion = e => {
        e.preventDefault(); 

        if(LCN_LOCALIZACION.trim() ===''){
            const alerta = {
                msg: 'El campo Código es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(LCN_DESCRIPCION.trim() === ''){
            const alerta = {
                msg: 'El campo descripcion no puede ir vacio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        //Crear el nuevo bodeguero vendedor
        aregagrBodeVende({LCN_LOCALIZACION,
                         LCN_DESCRIPCION,
                         LCN_NUM_ORDEN,
                         LCN_DESCONTINUADA,
                         LCN_TELEFONO
        });

        //redireccionar
        history.push('/inv/listlocalizacion');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listlocalizacion');
    }

    return ( 
        <FormUsuario
            onSubmit={submitNuevaUbicacion}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Nueva Ubicación</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="codi">Código</label>
                        <input 
                            type="text"
                            name="LCN_LOCALIZACION" 
                            placeholder="Código Ubicación"
                            value={LCN_LOCALIZACION} 
                            onChange={e => guardarCodiLoca(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="descripcion">Descripción</label>
                        <input 
                            type="text"
                            name="LCN_DESCRIPCION" 
                            placeholder="Descripción"
                            value={LCN_DESCRIPCION} 
                            onChange={e => guardarDescripcion(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="orden">Orden</label>
                        <input 
                            type="number"
                            name="LCN_NUM_ORDEN" 
                            placeholder="Orden"
                            value={LCN_NUM_ORDEN} 
                            onChange={e => guardarNumOrden(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="codi">Télefono</label>
                        <input 
                            type="number"
                            name="LCN_TELEFONO" 
                            placeholder="LCN_TELEFONO"
                            value={LCN_TELEFONO} 
                            onChange={e => guardaTelefono(e.target.value)}
                        />
                    </Campo>

                    <Boton>
                        Agregar Nueva Ubicación
                    </Boton>

                </Formulario>

                <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>

                { cargando ? <p>Cargando...</p> :null }
                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}

            </div>
        </FormUsuario>
     );
}
 
export default NuevaLocalizacion;