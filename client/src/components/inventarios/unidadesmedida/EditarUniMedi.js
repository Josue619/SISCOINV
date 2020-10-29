import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useHistory } from 'react-router-dom';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarUniMediAction} from '../../../actions/unimediActions';

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

    
    //Nuevo state de producto
    const [ unidademedi, guardarProducto] = useState({
        UNI_MED_ID:'',
        UNI_MED_CODIUNIDAD:'',
        UNI_MED_DESCRIPCION:''
    });

    
    //Producto a editar
    const productoeditar =  useSelector(state => state.unimedi.unimedidaeditar);
    const error =  useSelector(state => state.unimedi.error);
    const alerta = useSelector(state => state.alerta.alerta);


    //Llenar el state automaticamente
    useEffect(() => {
        guardarProducto(productoeditar);

    }, [productoeditar]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...unidademedi,
            [e.target.name]: e.target.value
        });

    }

    if(!unidademedi) return history.push('/inv/listunidadmedida');

    //console.log(producto);
    const { UNI_MED_ID, UNI_MED_CODIUNIDAD, UNI_MED_DESCRIPCION } =  unidademedi;
   
    
    const submitEditarProducto = e => {
        e.preventDefault();

         //Validar formulario
        if(UNI_MED_DESCRIPCION.trim() === ''){

            const alerta = {
                msg: 'El campo Descripción del Artículo es obligatorio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        if(UNI_MED_CODIUNIDAD.trim() === ''){

            const alerta = {
                msg: 'El campo codigo abreviado no puede ser vacio',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //si no hay errores
        dispatch(ocultarAlertaAction());

        console.log(unidademedi);
        
        dispatch( editarUniMediAction(unidademedi));
        
        history.push('/inv/listunidadmedida');

        
    }

    return ( 
            <FormUsuario
                onSubmit={submitEditarProducto}
            >
                <div className="contenedor-form sombra-dark">
                    <h1>Edición Unida Medida: {UNI_MED_ID}</h1>
                    {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}

                    <Formulario>
                        <Campo>
                            <label htmlFor="descripcion">Descripción</label>
                            <input 
                              type="text"
                              name="UNI_MED_DESCRIPCION" 
                              placeholder="Descripción de la unidad medida"
                              value={UNI_MED_DESCRIPCION}
                              onChange={onChangeFormulario}
                            />
                        </Campo>

                        <Campo>
                            <label htmlFor="modelo">Siglas Unidad Medida</label>
                            <input 
                                type="text"
                                name="UNI_MED_CODIUNIDAD" 
                                placeholder="Modelo del artículo"
                                value={UNI_MED_CODIUNIDAD}
                                onChange={onChangeFormulario}
                            />
                        </Campo>
                
                <Boton>
                    Guardar Cambios
                </Boton>
            </Formulario>
            <div>
                <BotonUserCerrar to={'/inv/listunidadmedida'}>
                    Regresar Listado
                </BotonUserCerrar>
            </div>
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
        </div>

    </FormUsuario>
     );
}
 
export default EditarProducto;