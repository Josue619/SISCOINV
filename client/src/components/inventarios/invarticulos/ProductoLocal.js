import React from 'react';
//import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

//Bootstraptable liberia
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from "react-bootstrap-table2-paginator";

//Liberia de mensajes
//import Swal from 'sweetalert2';

//Redux
//import { useDispatch} from 'react-redux';
//import { borrarProductoAction, obternerProductoEditar } from '../../../actions/productoActions';


const ProductoLocal = ({producto}) => {
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

   
    const formatPrice = (cell, row, extra) => {
      let display = 0; 
      if (_.get(row, 'ALN_CANTIDAD_TOTAL')) { 
        display = `${_.get(row, 'ALN_CANTIDAD_TOTAL')}`
      }

      return (
        <div>
          <NumberFormat 
            value={parseFloat(display).toFixed(3)}
            displayType={'text'} thousandSeparator={true}
          />
        </div>
      )
    };
    const formatUltimoCosto = (cell, row, extra) => {
      let display = 0; 
      if (_.get(row, 'ALN_ULTIMO_COSTO')) { 
        display = `${_.get(row, 'ALN_ULTIMO_COSTO')}`
      }

      return (
        <div>
          <NumberFormat 
            value={parseFloat(display).toFixed(3)}
            displayType={'text'} thousandSeparator={true}
          />
        </div>
      )
    };

    const formatCostoUnitario = (cell, row, extra) => {
      let display = 0; 
      if (_.get(row, 'ALN_COSTO_UNITARIO')) { 
        display = `${_.get(row, 'ALN_COSTO_UNITARIO')}`
      }
      
      return (
        <div>
          <NumberFormat 
            value={parseFloat(display).toFixed(3)}
            displayType={'text'} thousandSeparator={true}
          />
        </div>
      )
    };

    //Columns
    const columns = [
      // omit...
        {dataField: "ALN_LCN_LOCALIZACION",
         text: "Código Ubicación",
         headerTitle: true,
         headerClasses: "bg-dark text-white",
         sort: true,
         footer: false
        },
        {dataField: "LCN_DESCRIPCION", 
         text: "Descripción",
         sort: true,
         headerTitle: true,
         headerClasses: "bg-dark text-white",
         footer: false
        },
        {dataField: "ALN_ATO_ARTICULO", 
         text: "Código Artículo",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         footer: "Totales:"
        },
        {dataField: "ALN_CANTIDAD_TOTAL", 
         text: "Cantidad Total",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         formatter: formatPrice,
         footer: columnData => { const total = columnData.reduce((acc, item) => (Number(acc) + Number(item)).toFixed(2), 0); 
                                 return (<> 
                                          <div //className= 'input-group-text'//'text-right'
                                               //style={{ fontWeight: 'bold', fontSize: '1.5rem'}}
                                          > 
                                            <div /*className='d-inline-block form-group ml-2'*/> 
                                              <span className="input-group-text"> 
                                                <NumberFormat
                                                  value={total} 
                                                  style={{width: '75px', fontWeight: 'bold', border:0, fontSize: '1.4rem'}}
                                                  displayType={'text'} 
                                                  thousandSeparator={true}
                                                /> 
                                              </span>
                                              
                                            </div> 
                                          </div>
                                        </>); 
                                }
        
        },
        {dataField: "ALN_ULTIMO_COSTO", 
         text: "Ultimo Costo",
         sort: true, 
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         formatter: formatUltimoCosto,
         footer: columnData => { const total = columnData.reduce((acc, item) => (Number(acc) + Number(item)).toFixed(2), 0); 
          return (<> 
                   <div //className= 'input-group-text'//'text-right'
                        //style={{ fontWeight: 'bold', fontSize: '1.5rem'}}
                   > 
                     <div /*className='d-inline-block form-group ml-2'*/> 
                       <span className="input-group-text"> 
                         <NumberFormat
                           //className= 'text-right form-control-md form-control' 
                           value={total} 
                           style={{width: '75px', fontWeight: 'bold', border:0, fontSize: '1.4rem'}}
                           displayType={'text'} 
                           thousandSeparator={true}
                         /> 
                       </span>
                     </div> 
                   </div>
                 </>); 
         }
        },
        {dataField: "ALN_FECHA_ULTIMO_COSTO",
         text: "Fecha Ultimo Costo",
         sort: true, 
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         footer: false,
         formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
              dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
          },
        },
        {dataField: "ALN_COSTO_UNITARIO",
         text: "Costo Unitario",
         sort: true,
         headerClasses: "bg-dark text-white",
         headerTitle: true,
         formatter:formatCostoUnitario,
         footer: columnData => { const total = columnData.reduce((acc, item) => (Number(acc) + Number(item)).toFixed(2), 0); 
          return (<> 
                   <div //className= 'input-group-text'//'text-right'
                        //style={{ fontWeight: 'bold', fontSize: '1.5rem'}}
                   > 
                     <div /*className='d-inline-block form-group ml-2'*/> 
                       <span className="input-group-text"> 
                          <NumberFormat
                          value={total} 
                          style={{width: '75px', fontWeight: 'bold', border:0, fontSize: '1.4rem'}}
                          displayType={'text'} 
                          thousandSeparator={true}
                          /> 
                       </span>
                       
                     </div> 
                   </div>
                 </>); 
         }
        }
    ];

    return (
        <ToolkitProvider
            keyField="ALN_LCN_LOCALIZACION"
            bootstrap4
            data={ producto }
            columns={ columns }
            search
        >
            {
                props => (
                    <div style={{ padding: "20px" }}>
                        <h3>Buscar Artículos Ubicaciones:</h3>
                        <SearchBar placeholder="Buscar....." { ...props.searchProps } />
                        <hr />
                        <ClearSearchButton className="button btn btn-info" text="Limpiar Busqueda" { ...props.searchProps } />
                        <ExportCSVButton className="button btn btn-link" { ...props.csvProps }>Exportar Archivo CSV!!</ExportCSVButton>
                        
                        <hr />
                        <BootstrapTable
                            classes = "table-responsive"
                            disableSelectText={true}
                            striped
                            hover
                            //condensed
                            bordered={ false }
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
 
export default ProductoLocal;