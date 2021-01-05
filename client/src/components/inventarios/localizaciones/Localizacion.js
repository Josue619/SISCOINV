import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


//Bootstraptable liberia
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from "react-bootstrap-table2-paginator";

//Liberia de mensajes
import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { borrarLocalizacionAction, obternerLocalizacionEditar } from '../../../actions/localizacionActions';



const Localizacion = ({localizaciones}) => {
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    //Columns
    const columns = [
        {dataField: "LCN_LOCALIZACION",
         text: "Código Localización",
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

        {dataField: "LCN_DESCRIPCION", 
         text: "Descripción",
         sort: true,
         headerTitle: true,
         headerClasses: "bg-dark text-white",
        },
        
        {dataField: "LCN_NUM_ORDEN", 
        text: "Orden secuencial",
        sort: true,
        headerTitle: true,
        headerClasses: "bg-dark text-white",
        },
        
        {dataField: "LCN_DESCONTINUADA", 
        text: "Descontinuada S/N",
        sort: true,
        headerTitle: true,
        headerClasses: "bg-dark text-white",
        },

        /*{dataField: "LCN_DESCONTINUADA_POR", 
        text: "Descontinuada Por",
        sort: true,  
        headerTitle: true,
        headerClasses: "bg-dark text-white",
        },

        {dataField: "LCN_FECHA_DESCONTINUADA",
         text: "Fecha Descontinuada", 
         sort: true, 
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         formatter: (cell) => {
             let dateObj = cell;
            if (typeof cell !== 'object') {
              dateObj = new Date(cell);
            }
            
            if(localizaciones.LNC_FECHA_DESCONTINUADA !== null){
                console.log(2,localizaciones.LNC_FECHA_DESCONTINUADA );
                //return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
            }
            
          }

        },*/

        {dataField: "LCN_TELEFONO", 
        text: "Telefono",
        sort: true,
        headerTitle: true,
        headerClasses: "bg-dark text-white",
        },

    ];

    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
   

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = localizacion => {

        //Preguntar al usuario
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Un registo que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                 //pasarlo al action
                 dispatch(borrarLocalizacionAction(localizacion));
              
            }
          });
    }

    //funcion que redirige de forma programada
    const redireccionarEdicion =  localizacion => {
      console.log(localizacion);
        
        dispatch( obternerLocalizacionEditar(localizacion) );
        history.push(`/inv/mlocalizacion/editarloca/${localizacion.LCN_LOCALIZACION}`);
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
        keyField="LCN_LOCALIZACION"
        bootstrap4
        data={  localizaciones }
        columns={ columns }
        search
        >
            {
                props => (
                    <div style={{ padding: "20px" }}>
                        <h3>Busqueda Ubicaciones:</h3>
                        <SearchBar placeholder="Buscar...." { ...props.searchProps } />
                        <hr />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        <Link to={"/inv/mlocalizacion/nuevaloca"} className="btn btn-success ">Nueva Ubicación &#43;</Link>
                        <hr />
                        <BootstrapTable
                        classes = "table-responsive"
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
 
export default Localizacion;