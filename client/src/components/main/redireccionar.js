import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const RedireccionarPagina = () => {
    const history = useHistory();// habilitar history para redirecion

    const permisopantalla = useSelector(state => state.usuarios.permisoejecutable);


    console.log(permisopantalla);
    let mensaje;
    
    if(permisopantalla === 'S'){
      //  history.push('/inv/listbodven');
       
    }else{
        mensaje = 'No tiene permiso al sitio';
    }

    return ( 

        <h1>{mensaje}</h1>
     );
}
 
export default RedireccionarPagina;
