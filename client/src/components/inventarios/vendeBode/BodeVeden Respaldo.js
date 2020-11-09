import React from 'react';
import { useHistory } from 'react-router-dom';


import Swal from 'sweetalert2';

//Redux
import { useDispatch} from 'react-redux';
import { obternerBodeVendeEditar ,borrarBodeVendeAction } from '../../../actions/bodevendeActions';

const BodeVende = (bodevende) => {

    const { BOD_VEN_CODIGO, USU_LOGIN, descriptipo } =  bodevende.bodven;

    const dispatch = useDispatch();
    const history = useHistory();// habilitar history para redirecion
    

    //Confirmar si desea eliminarlo
    const confirmarEliminarUnimedi = bodevende => {

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
    

    return (  
        <tr>
            <td>{BOD_VEN_CODIGO}</td>
            <td>{USU_LOGIN}</td>
            <td>{descriptipo}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(bodevende.bodven)}
                >
                    Editar
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarUnimedi(bodevende.bodven)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
 
export default BodeVende;