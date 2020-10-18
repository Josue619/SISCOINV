import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useHistory } from 'react-router-dom';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarProductoAction} from '../../../actions/productoActions';

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

const BotonUserCerrar = styled(Link)`
    margin-top: 2rem;
    display: block;
    opacity: .50;
    font-size: 150%;
`;


const EditarProducto = () => {

    const history =  useHistory();

    const dispatch = useDispatch();

    //Carga Unidades
    const unidades = useSelector(state => state.unimedi.unimedida);
    
    
    //Nuevo state de producto
    const [ producto, guardarProducto] = useState({
        ATO_CODIGO: '',
        ATO_DESCRIPCION: '',
        ATO_MAR_MARCA: '',
        ATO_MOD_MODELO: '',
        ATO_UNIDAD_MEDIDA: ''
    });

    
    //Producto a editar
    const productoeditar =  useSelector(state => state.productos.productoeditar);
    const error =  useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);


    //Llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoeditar);

    }, [productoeditar]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    if(!producto) return history.push('/listarticulos');

    const {ATO_CODIGO, ATO_DESCRIPCION, ATO_DETALLE, ATO_MAR_MARCA, ATO_MOD_MODELO, ATO_UNIDAD_MEDIDA} =  producto;

   
    
    const submitEditarProducto = e => {
        e.preventDefault();

         //Validar formulario
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
        
        dispatch( editarProductoAction(producto));
        
        history.push('/listarticulos');

        
    }
   
    return ( 
        
        <FormUsuario
            onSubmit={submitEditarProducto}
        >
            <div className="contenedor-form sombra-dark">
                <h1>Edición Artículo: {ATO_CODIGO}</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario>
                    <Campo>
                        <label htmlFor="descripcion">Descripción Artículo</label>
                        <input 
                            type="text"
                            name="ATO_DESCRIPCION" 
                            placeholder="Descripción del artículo"
                            value={ATO_DESCRIPCION} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="detalle">Detalle Artículo</label>
                        <textarea 
                            id="noter-text-area" 
                            name="ATO_DETALLE" 
                            value={ATO_DETALLE}
                            onChange={onChangeFormulario}></textarea>
                    </Campo>

                    <Campo>
                        <label htmlFor="marca">Marca Artículo</label>
                        <input 
                            type="text"
                            name="ATO_MAR_MARCA" 
                            placeholder="Marca del artículo"
                            value={ATO_MAR_MARCA} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>

                    <Campo>
                        <label htmlFor="modelo">Modelo Artículo</label>
                        <input 
                            type="text"
                            name="ATO_MOD_MODELO" 
                            placeholder="Modelo del artículo"
                            value={ATO_MOD_MODELO} 
                            onChange={onChangeFormulario}
                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="unidadmed">Unidad Medida</label>
                        <select 
                            id="UNIDAD_MEDIDA"
                            name="ATO_UNIDAD_MEDIDA"
                            value={ATO_UNIDAD_MEDIDA}
                            onChange={onChangeFormulario}
                        >
                            {unidades.length === 0 ? 'No hay productos' :(
                                unidades.unidades.map(unidad =>(
                                    <option
                                        key={unidad.UNI_MED_ID}
                                        value={unidad.UNI_MED_ID}>
                                            {unidad.UNI_MED_DESCRIPCION}
                                    </option>
                                ))
                             )}

                        </select>
                        
                    </Campo>
                    <Boton>
                        Guardar Cambios
                    </Boton>
                </Formulario>
                
                <BotonUserCerrar to={'/listarticulos'}>
                    Regresar Listado
                </BotonUserCerrar>

                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </div>
       
    </FormUsuario>

        
     );
}
 
export default EditarProducto;