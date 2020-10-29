import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

//Actions de Redux
//import { crearNuevoBodeVeden } from '../../../actions/bodevendeActions';
//import { mostrarAlerta, ocultarAlertaAction } from '../../../actions/alertaActions';
import { profile } from '../../../services/main.service';

import styled from '@emotion/styled';

//Estilos personalizados
//import { Formulario, Campo, Select } from '../../ui/Formulario';
//import {FormUsuario} from '../../ui/FormUsuario';
//import { Link } from 'react-router-dom';


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

const NuevoBodeVende = ({history}) => {
   
    //Carga usuario logueado
    
    const cargarUsuario = async(req, res) => {
        try {
              const resultado = await profile();
             
        } catch (error) {
            console.log(error);
        }
    }
    cargarUsuario();
    
    

    //State del componente
    /*const [BOD_VEN_CODIGO, guardarCodiBodeVend]= useState('');
    const [BOD_VEN_USUARIO, guardarUsuario]= useState('');
    const [BOD_VEN_TIPO, guardarTipo]= useState('');
    const [BOD_VEN_CREADO, guardarCreado]= useState('');
    const [BOD_VEN_FECHA]=useState(new Date());
    const [BOD_VEN_MODIFICADO, guardarModificado]= useState('');
    const [BOD_VEN_FECHAMODO] = useState(new Date());*/

    //utilizar use dispacth y te crea una funcion
    const dispatch = useDispatch();





    return ( 
        <h1>Nuevo vendedor</h1>
     );
}
 
export default NuevoBodeVende;