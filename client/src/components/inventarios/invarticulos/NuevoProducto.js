import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
import { crearNuevoProductoAction } from '../../../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';

import styled from '@emotion/styled';

//Estilos personalizados
import { Formulario, Select } from '../../ui/Formulario';
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


const NuevoProductos = ({history}) => {

    //State del componente
    const [ATO_CODIGO, guardarCodiArti]= useState('');
    const [ATO_DESCRIPCION, guardarDescripcion]= useState('');
    const [ATO_DETALLE, guardarDetalle]= useState('');
    const [ATO_MAR_MARCA, guardarMarca]= useState('');
    const [ATO_MOD_MODELO, guardarModelo]= useState('');
    const [ATO_CANTIDAD_EMPAQUE, guardarCantidadEmpaque]= useState(0);
    const [ATO_MED_MEDIDA_EMPAQUE, guardarUnidadMedidaEmpaque]= useState(0);
    const [ATO_PIEZAS_UNIDADES, guardarPiezasEmpaque]= useState(0);
    const [ATO_TIPO_EMPAQUE, guardarTipoEmpaque]= useState(0);
    const [ATO_UNIDAD_MEDIDA, guardarUnidadMedida]= useState(0);

    const [ATO_FECHA_INGRESO] = useState(new Date());

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();

     //Carga datos combox
     const unidades = useSelector(state => state.unimedi.unimedida);
     const tiposempaques = useSelector(state => state.tipoempa.tipoempaque);
     

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
            //ATO_UNIDAD_MEDIDA = '1';
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
            ATO_UNIDAD_MEDIDA,
            ATO_CANTIDAD_EMPAQUE,
            ATO_MED_MEDIDA_EMPAQUE,
            ATO_PIEZAS_UNIDADES,
            ATO_TIPO_EMPAQUE,
            ATO_FECHA_INGRESO
        });
        
        //redireccionar
        history.push('/inv/listarticulos');
    }

    const onclickRegresar = () => {
        dispatch(ocultarAlertaAction());
        history.push('/inv/listarticulos');
    }
    
    return ( 
        <FormUsuario
            onSubmit={submitNuevoProducto}
        >
            <Contenedor>
                <h1>Nuevo Artículo</h1>
                {alerta ? <p className={alerta.clases}> {alerta.msg}</p> : null}
                <Formulario className="form-group">
                   
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
                        <Select 
                            id="ATO_UNIDAD_MEDIDA"
                            name="ATO_UNIDAD_MEDIDA"
                            className="custom-select"
                            value={ATO_UNIDAD_MEDIDA}
                            onChange={e => guardarUnidadMedida(e.target.value)}
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
                        <label htmlFor="Empacado en:">Empacado en:</label>
                        <input 
                            type="number"
                            step="0.01"
                            name="ATO_CANTIDAD_EMPAQUE" 
                            placeholder="Empacado en:"
                            value={ATO_CANTIDAD_EMPAQUE}
                            onChange={e => guardarCantidadEmpaque(e.target.value)}
                            
                        />
                    </Campo>
                    <Campo>
                        <label htmlFor="tipoempaque">Tipo Empaque</label>
                        <Select 
                                id="ATO_TIPO_EMPAQUE"
                                name="ATO_TIPO_EMPAQUE"
                                value={ATO_TIPO_EMPAQUE}
                                onChange={e => guardarTipoEmpaque(e.target.value)}
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
                        <label htmlFor="unidadmed">U.M Empaque</label>
                        <Select 
                                id="ATO_MED_MEDIDA_EMPAQUE"
                                name="ATO_MED_MEDIDA_EMPAQUE"
                                value={ATO_MED_MEDIDA_EMPAQUE}
                                onChange={e => guardarUnidadMedidaEmpaque(e.target.value)}
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
                                onChange={e => guardarPiezasEmpaque(e.target.value)}
                            />
                    </Campo>
                   
                    <Boton>
                        Agregar Artículo
                    </Boton>
                </Formulario>
                <button className="btn btn-light" onClick={onclickRegresar}>Regresar Listado</button>

                { cargando ? <p>Cargando...</p> :null }
                { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo error</p> : null}
            </Contenedor>

    
        </FormUsuario>
     );
}
 
export default NuevoProductos;