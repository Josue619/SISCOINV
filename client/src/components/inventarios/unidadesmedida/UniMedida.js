import React from 'react';
import {Link, useHistory } from 'react-router-dom';



import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import paginationFactory from "react-bootstrap-table2-paginator";


import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { borrarUniMediAction, obternerUniMediEditar } from '../../../actions/unimediActions';

const UniMedida = (unidades) => {

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

     //Columns
     const columns = [
        {dataField: "UNI_MED_CODIUNIDAD",
         text: "Código Abreviado",
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
        {dataField: "UNI_MED_DESCRIPCION", 
         text: "Descripción Unidad Medida",
         sort: true,
         headerTitle: true,
         headerClasses: "bg-dark text-white",
        }
    ];

    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
   

    //Confirmar si desea eliminarlo
    const confirmarEliminarUnimedi = unidamedida => {


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
                 dispatch(borrarUniMediAction(unidamedida));
              
            }
          });
    }
    

    //funcion que redirige de forma programada
    const redireccionarEdicion =  unidadmedida => {
        dispatch( obternerUniMediEditar(unidadmedida) );
        history.push(`/inv/munidadmedi/editar/${unidadmedida.UNI_MED_ID}`);

    }
    const selectRow = {
        mode: 'radio',
        clickToSelect: false,
        onSelect: (row, isSelect, rowIndex, e) => {
          confirmarEliminarUnimedi(row);
        }
        
      };

      
    return (  
        <ToolkitProvider
            keyField="UNI_MED_ID"
            bootstrap4
            data={  unidades.unidad }
            columns={ columns }
            search
        >
            {
                props => (
                    <div style={{ padding: "20px" }}>
                        <h3>Busqueda de Unidades Medida:</h3>
                        <SearchBar placeholder="Buscar Artículos por sus características" { ...props.searchProps } />
                        <hr />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        <Link to={"/inv/munidadmedi/nuevo"} className="btn btn-success ">Nueva Unidad Medida &#43;</Link>
                        <hr />
                        <BootstrapTable
                            //classes = "table-responsive"
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
 
export default UniMedida;