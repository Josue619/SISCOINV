import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Menu
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

//Actions Redux
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { editarProductoAction} from '../../../actions/productoActions';

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Select } from '../../ui/Formulario';

//import { Boton } from '../ui/Boton';
import {FormUsuario} from '../../ui/FormUsuario';

const Campo = styled.div`
    margin-bottom: 1.0rem;
    display:flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.6rem;
    }
    input, 
    textarea {
        flex: auto;
        padding: 1rem;
    }
    textarea {
        height: 100px;
    }
    
`;

const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: 800px;
    width: 100%;
    background-color: var(--gris1);
    border-radius: 3rem;
`;


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

const EditarProducto = () => {

    const history =  useHistory();

    const dispatch = useDispatch();

    //Carga Combox
    const unidades = useSelector(state => state.unimedi.unimedida);
    const tiposempaques = useSelector(state => state.tipoempa.tipoempaque);
    
    
    //Nuevo state de producto
    const [ producto, guardarProducto] = useState({
        ATO_CODIGO: '',
        ATO_DESCRIPCION: '',
        ATO_MAR_MARCA: '',
        ATO_MOD_MODELO: '',
        ATO_UNIDAD_MEDIDA: '',
        ATO_CANTIDAD_EMPAQUE:'',
        ATO_MED_MEDIDA_EMPAQUE: '',
        ATO_PIEZAS_UNIDADES: ''
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

    if(!producto) return history.push('/inv/listarticulos');

    const {ATO_CODIGO, ATO_DESCRIPCION, ATO_DETALLE, ATO_MAR_MARCA, ATO_MOD_MODELO, ATO_UNIDAD_MEDIDA, ATO_CANTIDAD_EMPAQUE, ATO_TIPO_EMPAQUE, ATO_MED_MEDIDA_EMPAQUE, ATO_PIEZAS_UNIDADES} =  producto;

   
    
    const submitEditarProducto = e => {
        e.preventDefault();
        console.log('Actualizado');
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
        
        history.push('/inv/listarticulos');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listarticulos');
    }

    const onclickLocalizaciones = () => {
        history.push(`/inv/productos/productolocali/${producto.ATO_CODIGO}`);
    }
   
    return ( 
        
        <FormUsuario
            onSubmit={submitEditarProducto}
        >
            <Contenedor>
                <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <>
                                <Button variant="outlined" color="primary" {...bindTrigger(popupState)}>
                                    Menu Opciones
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={onclickLocalizaciones}>Ubicaciones Artículo</MenuItem>
                                    <MenuItem onClick={onclickRegresar}>Regresar a Listado</MenuItem>
                                </Menu>
                            </>
                        )}
                    </PopupState>
                    <hr />

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
                            <Select 
                                id="UNIDAD_MEDIDA"
                                name="ATO_UNIDAD_MEDIDA"
                                value={ATO_UNIDAD_MEDIDA}
                                onChange={onChangeFormulario}
                            >
                                {unidades.length === 0 ? 'No hay productos' :(
                                    unidades.map(unidad =>(
                                        <option
                                            key={unidad.UNI_MED_ID}
                                            value={unidad.UNI_MED_ID}>
                                            {unidad.UNI_MED_DESCRIPCION}
                                        </option>
                                    ))
                                )}
                            </Select>
                        </Campo>
                        <Campo>
                            <label htmlFor="Empacado en:">Empacado en:</label>
                            <input 
                                type="number"
                                step="0.01"
                                name="ATO_CANTIDAD_EMPAQUE" 
                                placeholder="Empacado en:"
                                value={ATO_CANTIDAD_EMPAQUE}
                                onChange={onChangeFormulario}
                            />
                        </Campo>
                        <Campo>
                            <label htmlFor="tipoempaque">Tipo Empaque</label>
                            <Select 
                                    id="ATO_TIPO_EMPAQUE"
                                    name="ATO_TIPO_EMPAQUE"
                                    value={ATO_TIPO_EMPAQUE}
                                    onChange={onChangeFormulario}
                                >
                                    <option defaultValue>Selecione...</option>
                                    {tiposempaques.length === 0 ? 'No hay datos' :(
                                        tiposempaques.map(tipoemp =>(
                                            <option 
                                                key={tipoemp.TIPO_EMP_ID}
                                                value={tipoemp.TIPO_EMP_ID}
                                            >
                                                {tipoemp.TIPO_EMP_DESCRIPCION}
                                            </option>
                                        ))
                                    )}
                            </Select>
                        </Campo>
                        <Campo>
                            <label htmlFor="uniempaque">U.M Empaque</label>
                            <Select 
                                    id="ATO_MED_MEDIDA_EMPAQUE"
                                    name="ATO_MED_MEDIDA_EMPAQUE"
                                    value={ATO_MED_MEDIDA_EMPAQUE}
                                    onChange={onChangeFormulario}
                                >
                                    <option defaultValue>Selecione...</option>
                                    {unidades.length === 0 ? 'No hay productos' :(
                                        unidades.map(unidad =>(
                                            <option 
                                                key={unidad.UNI_MED_ID}
                                                value={unidad.UNI_MED_ID}
                                            >
                                                {unidad.UNI_MED_DESCRIPCION}
                                            </option>
                                        ))
                                    )}
                            </Select>
                        </Campo>
                        <Campo>
                            <label htmlFor="Piezas o Uds:">Piezas/Uds</label>
                                <input 
                                    type="number"
                                    //step="0.01"
                                    name="ATO_PIEZAS_UNIDADES" 
                                    placeholder="Empacado en:"
                                    value={ATO_PIEZAS_UNIDADES}
                                    onChange={onChangeFormulario}
                                />
                        </Campo>
                        <Boton> 
                            Guardar Datos
                        </Boton>
                    </Formulario>
                    <div>
                        <button className="btn btn-light btn-link" onClick={onclickRegresar}>Regresar Listado</button>
                    </div>
                    

                    { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}

            </Contenedor>
    </FormUsuario>

        
     );
}
 
export default EditarProducto;