import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import paginationFactory from "react-bootstrap-table2-paginator";


import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { obternerBodeVendeEditar ,borrarBodeVendeAction } from '../../../actions/bodevendeActions';

const BodeVende = (bodevende) => {

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    //const { BOD_VEN_CODIGO, USU_LOGIN, descriptipo } =  bodevende.bodven;
     //Columns
     const columns = [
        {dataField: "BOD_VEN_CODIGO",
         text: "Código",
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
        {dataField: "USU_LOGIN", 
         text: "Loguin ",
         sort: true,
         headerTitle: true,
         headerClasses: "bg-dark text-white",
        },
        {dataField: "descriptipo", 
         text: "Tipo",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true
        }
    ];


    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
    

    //Confirmar si desea eliminarlo
    const confirmarEliminar = bodevende => {

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
                 dispatch(borrarBodeVendeAction(bodevende));
              
            }
          });
    }
    

    //funcion que redirige de forma programada
    const redireccionarEdicion =  bodevende => {
        dispatch( obternerBodeVendeEditar(bodevende) );
        history.push(`/inv/mbodevende/editarbodevende/${bodevende.BOD_VEN_CODIGO}`);

    }

    const selectRow = {
        mode: 'radio',
        clickToSelect: false,
        onSelect: (row, isSelect, rowIndex, e) => {
            confirmarEliminar(row);
        }
        
    };

    return (  
        <ToolkitProvider
            keyField="BOD_VEN_CODIGO"
            bootstrap4
            data={  bodevende.bodven }
            columns={ columns }
            search
        >
            {
                props => (
                    <div style={{ padding: "20px" }}>
                        <h3>Busqueda de Bodeguero/Vendedor:</h3>
                        <SearchBar placeholder="Buscar....." { ...props.searchProps } />
                        <hr />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        <Link to={"/inv/mbodevende/nuevobodevende"} className="btn btn-success ">Nuevo Bodeguero o Vendedor &#43;</Link>
                        <hr />
                        <BootstrapTable
                            disableSelectText={true}
                            striped
                            hover
                            //condensed
                            bordered={ true }
                            selectRow={ selectRow }
                            noDataIndication="There is no data"
                            { ...props.baseProps }
                            pagination={paginationFactory()}
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    );
}
 
export default BodeVende;