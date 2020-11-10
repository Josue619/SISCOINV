import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
//import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import paginationFactory from "react-bootstrap-table2-paginator";

import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { borrarProductoAction, obternerProductoEditar } from '../../../actions/productoActions';


const Producto = ({producto}) => {
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    //Columns
    const columns = [
        {dataField: "ATO_CODIGO",
         text: "Código Artículo",
         headerTitle: true,
         headerClasses: "bg-dark text-white",
         sort: true,
         classes: "btn btn-outline-dark col-md-12",
         events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              redireccionarEdicion(row);
            }
         }
        },
        {dataField: "ATO_DESCRIPCION", 
         text: "Descripción Artículo",
         sort: true,
         headerTitle: true,
         headerClasses: "bg-dark text-white",
        },
        {dataField: "ATO_MAR_MARCA", 
         text: "Marca Artículo",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true
        },
        {dataField: "ATO_MOD_MODELO", 
         text: "Modelo Artículo",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true
        },
        {dataField: "Unidad_medida", 
         text: "Unidad Medida", 
         sort: true, 
         headerClasses: "bg-dark text-white",  
         headerTitle: true
        },
        {dataField: "ATO_FECHA_INGRESO",
         text: "Fecha Ingreso", 
         sort: true, 
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
              dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
          }

        }
        
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

    const selectRow = {
        mode: 'radio',
        clickToSelect: false,
        onSelect: (row, isSelect, rowIndex, e) => {
          confirmarEliminarProducto(row);
        }
        
      };

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
                        <hr />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        <Link className="btn btn-success" to={"/inv/productos/nuevo"} >Nuevo Artículo &#43;</Link>
                        <hr />
                        <BootstrapTable
                            disableSelectText={true}
                            striped
                            hover
                            //condensed
                            bordered={ true }
                            selectRow={ selectRow }
                            noDataIndication="No hay datos que mostrar"
                            { ...props.baseProps }
                            pagination={paginationFactory()}
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    );
}
 
export default Producto;