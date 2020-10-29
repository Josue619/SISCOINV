import React from 'react';
import { useHistory } from 'react-router-dom';


import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { borrarUniMediAction, obternerUniMediEditar } from '../../../actions/unimediActions';

const UniMedida = (unidades) => {

    const { UNI_MED_CODIUNIDAD, UNI_MED_DESCRIPCION } =  unidades.unidad;

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
    

    return (  
        <tr>
            <td>{UNI_MED_CODIUNIDAD}</td>
            <td>{UNI_MED_DESCRIPCION}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(unidades.unidad)}
                >
                    Editar
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarUnimedi(unidades.unidad)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
 
export default UniMedida;