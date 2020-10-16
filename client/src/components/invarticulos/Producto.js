import React from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns'

//import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { /*borrarProductoAction, */obternerProductoEditar } from '../../actions/productoActions';

const Producto = ({producto}) => {
    const { ATO_CODIGO, ATO_DESCRIPCION, ATO_MAR_MARCA, ATO_MOD_MODELO, Unidad_medida,ATO_FECHA_INGRESO  } =  producto;

    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
   

    //Confirmar si desea eliminarlo
    /*const confirmarEliminarProducto = id => {

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
                 dispatch(borrarProductoAction(id));
              
            }
          });
    }*/

    //funcion que redirige de forma programada
    const redireccionarEdicion =  producto => {
        dispatch( obternerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.ATO_CODIGO}`);

    }

    return (  
        <tr>
            <td>{ATO_CODIGO}</td>
            <td>{ATO_DESCRIPCION}</td>
            <td>{ATO_MAR_MARCA}</td>
            <td>{ATO_MOD_MODELO}</td>
            <td>{Unidad_medida}</td>
            <td>{format(new Date(ATO_FECHA_INGRESO) ,'dd/MM/yyyy') }</td>
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
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
 
export default Producto;