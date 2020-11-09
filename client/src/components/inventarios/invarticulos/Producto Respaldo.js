import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import paginationFactory from "react-bootstrap-table2-paginator";

import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { borrarProductoAction, obternerProductoEditar } from '../../../actions/productoActions';


const Producto = ({producto}) => {
    //const { ATO_CODIGO, ATO_DESCRIPCION, ATO_MAR_MARCA, ATO_MOD_MODELO, Unidad_medida,ATO_FECHA_INGRESO  } =  producto;
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    //Columns
    const columns = [
        {dataField: "ATO_CODIGO",
         text: "Código Artículo",
         sort: true,
         //filter: textFilter(),// apply text filter
         events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              //console.log(e);
              //console.log(column);
              //console.log(columnIndex);
              //console.log(row);
              //console.log(rowIndex);
              //alert('Click on Product ID field');
              redireccionarEdicion(row);
            }
         }
        },
        {dataField: "ATO_DESCRIPCION", 
         text: "Descripción Artículo",
         sort: true,
         //filter: textFilter() // apply text filter
        },
        {dataField: "ATO_MAR_MARCA", 
         text: "Marca Artículo",
         sort: true,
         //filter: textFilter() // apply text filter 
        },
        {dataField: "ATO_MOD_MODELO", 
         text: "Modelo Artículo",
         sort: true,
         //filter: textFilter() // apply text filter
        },
        {dataField: "Unidad_medida", text: "Unidad Medida", sort: true},
        {dataField: "ATO_FECHA_INGRESO", text: "Fecha Ingreso", sort: true}
    ];

    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
   

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = producto => {

        //Preguntar al usuario
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                 //pasarlo al action
                 dispatch(borrarProductoAction(producto));
              
            }
          });
    }
    

    //funcion que redirige de forma programada
    const redireccionarEdicion =  producto => {
        
        dispatch( obternerProductoEditar(producto) );
        history.push(`/inv/productos/editar/${producto.ATO_CODIGO}`);

    }
    /*
    <tr>
            <td>{ATO_CODIGO}</td>
            <td>{ATO_DESCRIPCION}</td>
            <td>{ATO_MAR_MARCA}</td>
            <td>{ATO_MOD_MODELO}</td>
            <td>{Unidad_medida}</td>
            <td>{format(new Date(ATO_FECHA_INGRESO),'MM/dd/yyyy')}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarProducto(producto)}
                >
                    Eliminar
                </button>
            </td>
        </tr>

          <BootstrapTable
            bootstrap4
            keyField="id"
            data={producto}
            columns={columns}
            headerWrapperClasses="foo"
            filter={ filterFactory() }
            pagination={paginationFactory({sizePerPage: 5})}
            striped
            hover
            condensed
        />
            <Link to={"/inv/productos/nuevo"} className="btn btn-success col-md-1 ">Agregar Artículo &#43;</Link>
        */

    return (
        <ToolkitProvider
            keyField="ATO_CODIGO"
            bootstrap4
            data={ producto }
            columns={ columns }
            search
        >
            {
                props => (
                    <div style={{ padding: "20px" }}>
                        <h3>Busqueda de Artículos:</h3>
                        <SearchBar placeholder="Buscar Artículos por sus características" { ...props.searchProps } />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        <Link className="btn btn-success" to={"/inv/productos/nuevo"} >Nuevo Artículo &#43;</Link>
                        
                        <hr />
                        <BootstrapTable
                            pagination={paginationFactory({sizePerPage: 5})}
                            striped
                            hover
                            noDataIndication="There is no data"
                            classes="table-dark"

                            { ...props.baseProps }
                        />
                    </div>
                )
            }
        </ToolkitProvider>

    );
}
 
export default Producto;