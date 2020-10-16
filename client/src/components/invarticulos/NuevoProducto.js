import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevoProductoAction } from '../../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../../actions/alertaActions';

import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Campo } from '../ui/Formulario';
import {FormUsuario} from '../ui/FormUsuario';


//Elementos con estilos
const Boton = styled.button`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
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

const BotonUserCerrar = styled.a`
    display: block;
    font-weight: auto;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: .1rem auto; 
    text-align: center;
    background-color: gray/*${props => props.bgColor ? '#DA552F' : '#2f3848'}*/;
    color: ${props => props.bgColor ? 'blanco' : '#FFF'};

    &:last-of-type {
        margin-right:10;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--gris1);
        color: red;
    }
`;


const NuevoProductos = ({history}) => {

    //State del componente
    const [ATO_CODIGO, guardarCodiArti]= useState('');
    const [ATO_DESCRIPCION, guardarDescripcion]= useState('');
    const [ATO_DETALLE, guardarDetalle]= useState('');
    const [ATO_MAR_MARCA, guardarMarca]= useState('');
    const [ATO_MOD_MODELO, guardarModelo]= useState('');
    const [ATO_UNIDAD_MEDIDA, guardarUnidadMedida]= useState(0);

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( state => state.productos.loading);
    const error =  useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Manda a llamar el action del producto.
    const aregagrProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();
        
        //Validar formulario
        if(ATO_CODIGO.trim() === ''){

            const alerta = {
                msg: 'El campo Código Artículo es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(ATO_DESCRIPCION.trim() === ''){

            const alerta = {
                msg: 'El campo Descripción del Artículo es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(ATO_UNIDAD_MEDIDA <= 0){

            const alerta = {
                msg: 'Debe selecionar la Unidad de Medida',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }



        //si no hay errores
        dispatch(ocultarAlertaAction());

        //crear el nuevo producto
        aregagrProducto({
            ATO_CODIGO,
            ATO_DESCRIPCION,
            ATO_DETALLE,
            ATO_MAR_MARCA,
            ATO_MOD_MODELO,
            ATO_UNIDAD_MEDIDA
        });

        //redireccionar
        history.push('/listarticulos');

    }

    const regresarListado = () => {
        history.push('/listarticulos');
    }
    
    return ( 
        <FormUsuario
            onSubmit={submitNuevoProducto}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Nuevo Artículo</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="codiArti">Código Artículo</label>
                        <input 
                            type="text"
                            name="ATO_CODIGO" 
                            placeholder="Código del artículo"
                            value={ATO_CODIGO} 
                            onChange={e => guardarCodiArti(e.target.value)}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="descripcion">Descripción Artículo</label>
                        <input 
                            type="text"
                            name="ATO_DESCRIPCION" 
                            placeholder="Descripción del artículo"
                            value={ATO_DESCRIPCION}
                            onChange={e => guardarDescripcion(e.target.value)}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="detalle">Detalle Artículo</label>
                        <textarea 
                            id="noter-text-area" 
                            name="ATO_DETALLE" 
                            value={ATO_DETALLE}
                            onChange={e => guardarDetalle(e.target.value)}
                            ></textarea>
                    </Campo>

                    <Campo>
                        <label htmlFor="marca">Marca Artículo</label>
                        <input 
                            type="text"
                            name="ATO_MAR_MARCA" 
                            placeholder="Marca del artículo"
                            value={ATO_MAR_MARCA}
                            onChange={e => guardarMarca(e.target.value)}
                        />
                    </Campo>

                    <Campo>
                        <label htmlFor="modelo">Modelo Artículo</label>
                        <input 
                            type="text"
                            name="ATO_MOD_MODELO" 
                            placeholder="Modelo del artículo"
                            value={ATO_MOD_MODELO}
                            onChange={e => guardarModelo(e.target.value)}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="unidadmed">Unidad Medida</label>
                        <select 
                            id="ATO_UNIDAD_MEDIDA"
                            name="ATO_UNIDAD_MEDIDA"
                            value={ATO_UNIDAD_MEDIDA}
                            onChange={e => guardarUnidadMedida(e.target.value)}
                        >
                            <option defaultValue>Selecione...</option>
                            <option value="1">Unidades</option>
                            <option value="2">Kilogramos</option>
                        </select>
                        
                    </Campo>

                    <Boton>
                        Agregar Artículo
                    </Boton>
                    <BotonUserCerrar onClick={regresarListado}>
                        Regresar Listado
                    </BotonUserCerrar>

                
                </Formulario>
                { cargando ? <p>Cargando...</p> :null }
                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </div>
    
        </FormUsuario>
     );
}
 
export default NuevoProductos;